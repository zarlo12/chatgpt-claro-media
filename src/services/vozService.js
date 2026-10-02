/**
 * Servicio de voz del agente (Web Speech API del navegador).
 *
 * No tiene costo ni depende de internet. Concentra tres problemas conocidos
 * de la síntesis de voz para que el resto de la app no tenga que pensar en ellos:
 *  1. El texto del chat trae emojis, flechas y símbolos que se leerían mal.
 *  2. Chrome corta los textos largos a los ~15 segundos: se leen por fragmentos.
 *  3. A veces el evento "terminó" nunca llega: un vigilante evita que la
 *     conversación quede congelada esperando.
 */

const PREFERENCIA_REGION = ["es-co", "es-mx", "es-us", "es-419", "es-es"];
const VOCES_CON_BUENA_FAMA = /paulina|m[oó]nica|jorge|juan|diego|ang[eé]lica|soledad|marisol|luciana|francisca|sabina/i;
const VOCES_DE_NOVEDAD = /eddy|flo\b|grandma|grandpa|reed|rocko|sandy|shelley/i;
const VOCES_NATURALES = /natural|neural|online|google/i;

const MS_POR_CARACTER = 110; // cota alta para el vigilante, no para medir
const MARGEN_VIGILANTE_MS = 4000;
const MAX_FRAGMENTO = 170;

const sintesis = () =>
  typeof window !== "undefined" ? window.speechSynthesis : null;

const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const vozSoportada = () =>
  Boolean(sintesis()) && typeof window.SpeechSynthesisUtterance === "function";

// ---------------------------------------------------------------------------
// Texto
// ---------------------------------------------------------------------------

const ORDINALES = ["Primero", "Segundo", "Tercero", "Cuarto", "Quinto"];

/**
 * Deja el texto del chat listo para ser leído en voz alta.
 * @param {string} texto
 * @returns {string}
 */
export const limpiarParaVoz = (texto = "") => {
  const sinSimbolos = texto
    .replace(/[\p{Extended_Pictographic}️‍⃣]/gu, "")
    .replace(/\*+/g, "")
    .replace(/["“”«»]/g, "")
    .replace(/\s*[→·]\s*/g, ", ")
    .replace(/\s*\+\s*/g, " más ")
    .replace(/\$\s?([\d.,]+)/g, "$1 pesos")
    .replace(/\/mes\b/gi, " al mes")
    .replace(/24\/7/g, "las veinticuatro horas, los siete días")
    .replace(/(\d)\s?km\b/gi, "$1 kilómetros");

  // Cada línea es una frase: se cierra con punto para que la voz haga pausa.
  return sinSimbolos
    .split(/\n+/)
    .map((linea) => linea.trim())
    .filter(Boolean)
    .map((linea) =>
      linea.replace(/^([1-5])\s+(?=\S)/, (_, n) => `${ORDINALES[n - 1]}. `),
    )
    .map((linea) => (/[.!?…:]$/.test(linea) ? linea : `${linea}.`))
    .join(" ")
    .replace(/\s{2,}/g, " ")
    .trim();
};

/** Junta piezas cortas sin pasarse de `max` caracteres. */
const acumular = (piezas, max) => {
  const fragmentos = [];
  let actual = "";
  piezas.forEach((pieza) => {
    if (actual && (actual + pieza).length > max) {
      fragmentos.push(actual.trim());
      actual = "";
    }
    actual += pieza;
  });
  if (actual.trim()) fragmentos.push(actual.trim());
  return fragmentos;
};

/** Parte por comas y, en último caso, por palabras. */
const partirOracionLarga = (oracion, max) => {
  const porComas = oracion.match(/[^,;:]+[,;:]*\s*/g) || [oracion];
  return porComas.flatMap((pieza) =>
    pieza.length > max ? acumular(pieza.match(/\S+\s*/g) || [pieza], max) : [pieza],
  );
};

/**
 * Divide el texto en fragmentos que la voz pueda leer sin cortarse.
 * Respeta números como "1.000" y "7,10%": solo corta en puntuación seguida
 * de espacio o fin de texto.
 * @param {string} texto
 * @param {number} max
 * @returns {string[]}
 */
export const dividirEnFragmentos = (texto, max = MAX_FRAGMENTO) => {
  if (!texto) return [];

  const oraciones = texto.match(/[\s\S]+?(?:[.!?…]+(?=\s|$)|$)\s*/g) || [texto];
  const piezas = oraciones.flatMap((oracion) =>
    oracion.length > max ? partirOracionLarga(oracion, max) : [oracion],
  );

  return acumular(piezas, max).filter(Boolean);
};

// ---------------------------------------------------------------------------
// Voces
// ---------------------------------------------------------------------------

/**
 * Puntaje de una voz: región más cercana a Colombia, voces de calidad y sin
 * las voces "de novedad" que traen algunos sistemas.
 */
const puntuarVoz = (voz) => {
  const lang = voz.lang.toLowerCase().replace("_", "-");
  const region = PREFERENCIA_REGION.indexOf(lang);
  let puntos = region === -1 ? 0 : (PREFERENCIA_REGION.length - region) * 10;
  if (VOCES_NATURALES.test(voz.name)) puntos += 12;
  if (VOCES_CON_BUENA_FAMA.test(voz.name)) puntos += 8;
  if (VOCES_DE_NOVEDAD.test(voz.name)) puntos -= 40;
  return puntos;
};

/**
 * Voces en español disponibles, de la mejor a la menos recomendable.
 * @param {SpeechSynthesisVoice[]} todas
 */
export const filtrarVocesEnEspanol = (todas = []) =>
  todas
    .filter((voz) => voz.lang?.toLowerCase().startsWith("es"))
    .sort((a, b) => puntuarVoz(b) - puntuarVoz(a));

export const listarVocesEnEspanol = () =>
  filtrarVocesEnEspanol(sintesis()?.getVoices?.() ?? []);

/**
 * Elige la voz guardada o, si no existe en este equipo, la mejor disponible.
 * @param {SpeechSynthesisVoice[]} voces - Ya filtradas y ordenadas
 * @param {string} [voiceURI]
 */
export const elegirVoz = (voces, voiceURI) =>
  voces.find((v) => v.voiceURI === voiceURI) || voces[0] || null;

// ---------------------------------------------------------------------------
// Reproducción
// ---------------------------------------------------------------------------

// Cada llamada a hablar() abre una "sesión". Detener la voz cierra la sesión
// vigente, y los fragmentos pendientes de esa sesión dejan de leerse.
let sesionVigente = 0;

export const detenerVoz = () => {
  sesionVigente += 1;
  sintesis()?.cancel();
};

/**
 * Activa la voz dentro de un gesto del usuario. Algunos navegadores (Safari,
 * iOS) solo permiten hablar si la primera llamada nace de un toque.
 */
export const prepararVoz = () => {
  if (!vozSoportada()) return;
  const silencio = new window.SpeechSynthesisUtterance(" ");
  silencio.volume = 0;
  sintesis().speak(silencio);
};

const leerFragmento = (texto, opciones) =>
  new Promise((resolve) => {
    const { voz, velocidad = 1, tono = 1, volumen = 1, onPalabra } = opciones;
    const sintetizador = sintesis();
    const enunciado = new window.SpeechSynthesisUtterance(texto);

    enunciado.lang = voz?.lang || "es-MX";
    if (voz) enunciado.voice = voz;
    enunciado.rate = velocidad;
    enunciado.pitch = tono;
    enunciado.volume = volumen;

    let terminado = false;
    const terminar = () => {
      if (terminado) return;
      terminado = true;
      clearTimeout(vigilante);
      resolve();
    };

    const limite =
      (texto.length * MS_POR_CARACTER) / Math.max(velocidad, 0.5) +
      MARGEN_VIGILANTE_MS;
    const vigilante = setTimeout(() => {
      sintetizador.cancel();
      terminar();
    }, limite);

    enunciado.onend = terminar;
    enunciado.onerror = terminar;
    enunciado.onboundary = (evento) => {
      if (!evento.name || evento.name === "word") onPalabra?.(evento);
    };

    sintetizador.speak(enunciado);
  });

/**
 * Lee un texto en voz alta. La promesa se resuelve cuando termina de hablar
 * o cuando alguien la interrumpe con detenerVoz().
 * @param {string} texto
 * @param {Object} opciones - { voz, velocidad, tono, volumen, onPalabra }
 */
export const hablarTexto = async (texto, opciones = {}) => {
  if (!vozSoportada()) return;

  const fragmentos = dividirEnFragmentos(limpiarParaVoz(texto));
  if (fragmentos.length === 0) return;

  detenerVoz(); // una sola voz a la vez
  const miSesion = sesionVigente;
  await esperar(60); // Chrome ignora un speak() pegado a un cancel()

  for (const fragmento of fragmentos) {
    if (sesionVigente !== miSesion) return;
    await leerFragmento(fragmento, opciones);
  }
};

export default {
  vozSoportada,
  limpiarParaVoz,
  dividirEnFragmentos,
  filtrarVocesEnEspanol,
  listarVocesEnEspanol,
  elegirVoz,
  prepararVoz,
  hablarTexto,
  detenerVoz,
};
