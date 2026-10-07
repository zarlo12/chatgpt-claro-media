/**
 * Estilos de Vida - Experiencia Claro Media
 *
 * Fuente: nuevoEventoExperiencias/Contenidos_Estilos_de_Vida_ClaroMedia.xlsx
 *   - Hoja "Estilos de vida": contenido completo de cada estilo
 *   - Hoja "Mapa rápido": sector principal y sectores conectados
 *   - Hoja "Estructura IA": reglas de uso para el agente
 *
 * Regla narrativa del archivo original:
 *   "Separar siempre dato observado de interpretación.
 *    Usar 'esto sugiere' cuando no exista causalidad directa."
 */

/** Reglas de narración que el agente (y el prompt de IA) deben respetar. */
export const REGLA_NARRATIVA = {
  separarDatoDeInterpretacion: true,
  conectorSinCausalidad: "esto sugiere",
  descripcion:
    "El dato observado se presenta como evidencia cuantitativa. La interpretación se presenta como hipótesis, nunca como causalidad.",
};

/**
 * Los 10 estilos de vida de la experiencia.
 *
 * Campos (según hoja "Estructura IA"):
 *  - nombre              → contexto inicial seleccionado por el usuario
 *  - afinidades          → intereses que definen la ruta de análisis
 *  - dato                → evidencia cuantitativa que sustenta la conexión
 *  - interpretacion      → qué puede significar el cruce (sin afirmar causalidad)
 *  - sectorPrincipal     → sector al que conduce la experiencia
 *  - sectoresConectados  → sectores secundarios que amplían la oportunidad
 *  - pregunta / opciones → profundizan la motivación del usuario
 */
export const ESTILOS_DE_VIDA = [
  {
    id: 1,
    nombre: "Siempre en movimiento",
    icono: "🧭",
    afinidades: ["Viajes y Turismo", "Movilidad"],
    descripcion:
      "Para ti, desplazarte no es solo ir de un punto a otro: movilidad, autonomía y nuevas experiencias forman parte de una misma forma de vivir.",
    dato: "40% de las personas interesadas en vehículos híbridos también presenta afinidad con Viajes y Turismo; entre quienes investigan concesionarios, 73% cruza con Movilidad.",
    interpretacion:
      "Elegir un vehículo puede estar conectado tanto con resolver una necesidad cotidiana como con descubrir nuevos destinos.",
    sectorPrincipal: "Automotor",
    sectoresConectados: ["Turismo", "Entretenimiento"],
    pregunta:
      "¿Qué pesa más para ti: moverte mejor todos los días o tener mayor libertad para descubrir nuevos lugares?",
    opciones: [
      "Moverme mejor todos los días",
      "Tener libertad para descubrir nuevos lugares",
    ],
  },
  {
    id: 2,
    nombre: "Mi vida es smart",
    icono: "🏠",
    afinidades: ["Tecnología", "Domótica y eficiencia energética"],
    descripcion:
      "La tecnología para ti tiene valor cuando hace la vida más simple, eficiente y conectada.",
    dato: "82% de la audiencia empresarial cruza con Tecnología; quienes muestran interés en Domótica también conectan con seguridad y eficiencia energética.",
    interpretacion:
      "La tecnología deja de consumirse como dispositivos aislados y empieza a construir ecosistemas conectados entre movilidad, hogar y productividad.",
    sectorPrincipal: "Tecnología",
    sectoresConectados: ["Automotor", "Hogar", "B2B"],
    pregunta:
      "¿Qué valoras más de la tecnología: ahorrar tiempo, tener mayor control o hacer más eficiente tu día a día?",
    opciones: [
      "Ahorrar tiempo",
      "Tener mayor control",
      "Hacer más eficiente mi día a día",
    ],
  },
  {
    id: 3,
    nombre: "Activo por elección",
    icono: "🏃",
    afinidades: ["Deportes", "Bienestar y Fitness"],
    descripcion:
      "El movimiento, el bienestar y los retos personales forman parte de tu estilo de vida.",
    dato: "68% de las personas interesadas en viajes terrestres cruza con Deportes; 54% de quienes muestran interés en perfumes cruza con Bienestar y Fitness.",
    interpretacion:
      "El bienestar puede influir en decisiones que van mucho más allá del ejercicio: cómo viajamos, cómo nos vestimos y cómo queremos sentirnos.",
    sectorPrincipal: "Turismo",
    sectoresConectados: ["Salud", "Moda"],
    pregunta:
      "¿Qué te mueve más: superar nuevos retos, sentirte mejor o vivir nuevas experiencias?",
    opciones: [
      "Superar nuevos retos",
      "Sentirme mejor",
      "Vivir nuevas experiencias",
    ],
  },
  {
    id: 4,
    nombre: "Vivo para compartir",
    icono: "🍽️",
    afinidades: ["Gastronomía", "Centros Comerciales"],
    descripcion:
      "Para ti, consumir también significa encontrarte, descubrir y crear momentos con otras personas.",
    dato: "82% de la audiencia interesada en Gastronomía y Restaurantes cruza con Centros Comerciales.",
    interpretacion:
      "Una comida, una compra o una salida pueden ser parte de una misma experiencia social.",
    sectorPrincipal: "Retail",
    sectoresConectados: ["Entretenimiento", "Turismo"],
    pregunta:
      "Cuando haces un plan, ¿qué define primero tu decisión: dónde comer, qué hacer o con quién compartirlo?",
    opciones: ["Dónde comer", "Qué hacer", "Con quién compartirlo"],
  },
  {
    id: 5,
    nombre: "Entre pantallas y música",
    icono: "🎧",
    afinidades: ["Entretenimiento y OTT", "Música"],
    descripcion:
      "El entretenimiento acompaña tus desplazamientos, tus momentos de descanso y buena parte de tu vida cotidiana.",
    dato: "89% de la audiencia relacionada con motocicletas cruza con Música; 78% de quienes muestran interés en celulares tiene afinidad con Entretenimiento y OTT.",
    interpretacion:
      "Una pantalla, un dispositivo o incluso un medio de transporte pueden convertirse en vehículos de entretenimiento e identidad personal.",
    sectorPrincipal: "Tecnología",
    sectoresConectados: ["Entretenimiento", "Automotor"],
    pregunta:
      "¿Qué ocupa más espacio en tu día: escuchar música, ver contenido o descubrir nuevas experiencias digitales?",
    opciones: [
      "Escuchar música",
      "Ver contenido",
      "Descubrir nuevas experiencias digitales",
    ],
  },
  {
    id: 6,
    nombre: "Juego, compro y conecto",
    icono: "🎮",
    afinidades: ["Gaming", "E-Commerce y Retail"],
    descripcion:
      "Para ti, el mundo digital no separa entretenimiento y consumo: ambos forman parte de una misma experiencia.",
    dato: "62% de las personas interesadas en Juegos en Línea también cruza con E-Commerce y Retail.",
    interpretacion:
      "El gamer no solo juega: también construye un ecosistema alrededor de su experiencia con dispositivos, conectividad, periféricos, contenido y compras digitales.",
    sectorPrincipal: "Entretenimiento",
    sectoresConectados: ["Tecnología", "Retail"],
    pregunta:
      "Si pudieras mejorar hoy tu experiencia digital, ¿invertirías primero en entretenimiento, tecnología o conectividad?",
    opciones: ["Entretenimiento", "Tecnología", "Conectividad"],
  },
  {
    id: 7,
    nombre: "Nunca dejo de aprender",
    icono: "🎓",
    afinidades: ["Educación", "Idiomas y contenidos internacionales"],
    descripcion:
      "Adquirir nuevas habilidades significa ampliar oportunidades y mantenerte preparado para lo que viene.",
    dato: "91% de la audiencia interesada en créditos cruza con Educación; quienes buscan universidades privadas presentan afinidades con Tecnología.",
    interpretacion:
      "Aprender no es una decisión aislada: puede involucrar financiación, dispositivos, conectividad y nuevas aspiraciones profesionales.",
    sectorPrincipal: "Educación",
    sectoresConectados: ["Financiero", "Tecnología"],
    pregunta:
      "¿Qué te motiva más a seguir aprendiendo: crecer profesionalmente, acceder a mejores oportunidades o cumplir una meta personal?",
    opciones: [
      "Crecer profesionalmente",
      "Acceder a mejores oportunidades",
      "Cumplir una meta personal",
    ],
  },
  {
    id: 8,
    nombre: "Construyo mi futuro",
    icono: "🏗️",
    afinidades: ["Financiero", "Construcción y Vivienda"],
    descripcion:
      "Tus decisiones tienen una mirada de largo plazo: patrimonio, estabilidad y proyectos personales están conectados.",
    dato: "86% de la audiencia interesada en Vivienda VIS cruza con Financiero; quienes investigan créditos hipotecarios muestran afinidad con Construcción.",
    interpretacion:
      "La vivienda y la financiación no son dos decisiones separadas: forman parte de un mismo proyecto de patrimonio.",
    sectorPrincipal: "Hogar",
    sectoresConectados: ["Financiero"],
    pregunta:
      "¿Qué define primero tu decisión: encontrar la vivienda ideal o entender cuánto puedes financiar?",
    opciones: ["Encontrar la vivienda ideal", "Entender cuánto puedo financiar"],
  },
  {
    id: 9,
    nombre: "Creo y hago crecer",
    icono: "💼",
    afinidades: ["Empresarios / B2B", "Tecnología y productividad"],
    descripcion:
      "Piensas constantemente en cómo hacer más eficiente un proyecto, una empresa o una oportunidad de negocio.",
    dato: "82% de la audiencia empresarial también cruza con Tecnología.",
    interpretacion:
      "Crecer ya no depende únicamente de vender más: también significa digitalizar procesos, ganar productividad, administrar mejor los recursos y tomar decisiones con información.",
    sectorPrincipal: "B2B",
    sectoresConectados: ["Tecnología", "Financiero", "Educación"],
    pregunta:
      "¿Cuál es hoy tu mayor reto: vender más, reducir costos, incorporar tecnología o mejorar la productividad?",
    opciones: [
      "Vender más",
      "Reducir costos",
      "Incorporar tecnología",
      "Mejorar la productividad",
    ],
  },
  {
    id: 10,
    nombre: "Me cuido con información",
    icono: "🩺",
    afinidades: ["Salud", "Telemedicina"],
    descripcion:
      "Acceder a información clara y oportuna es parte fundamental de tomar mejores decisiones de bienestar.",
    dato: "78% de la audiencia interesada en Hospitales y Clínicas cruza con Tecnología; entre interesados en accesorios tecnológicos encontramos 88% de afinidad con Telemedicina.",
    interpretacion:
      "El cuidado está evolucionando hacia experiencias donde información, dispositivos y acceso digital pueden trabajar juntos.",
    sectorPrincipal: "Salud",
    sectoresConectados: ["Tecnología"],
    pregunta:
      "¿Qué valoras más al cuidar tu bienestar: acceso rápido a información, facilidad para recibir orientación o herramientas para hacer seguimiento?",
    opciones: [
      "Acceso rápido a información",
      "Facilidad para recibir orientación",
      "Herramientas para hacer seguimiento",
    ],
  },
];

/**
 * Equivalencias entre las etiquetas de afinidad del Excel de estilos de vida
 * y los nombres del catálogo de afinidades del tablero (mockData.TODAS_AFINIDADES).
 * Solo se listan las que cambian de nombre.
 */
const EQUIVALENCIAS_CATALOGO = {
  "Viajes y Turismo": "Turismo",
  "Centros Comerciales": "Centro comercial",
  "E-Commerce y Retail": "E-Commerce",
  "Construcción y Vivienda": "Construcción",
  Financiero: "Educación financiera",
  "Empresarios / B2B": "Negocios y B2B",
  "Tecnología y productividad": "Productividad digital",
};

/** Nombres de los estilos, para listas de opciones. */
export const NOMBRES_ESTILOS_DE_VIDA = ESTILOS_DE_VIDA.map((e) => e.nombre);

/**
 * Busca un estilo de vida por su nombre exacto.
 * @param {string} nombre
 * @returns {Object|null}
 */
export const obtenerEstiloPorNombre = (nombre) =>
  ESTILOS_DE_VIDA.find((e) => e.nombre === nombre) || null;

/**
 * Traduce las afinidades de un estilo a los nombres del catálogo del tablero.
 * @param {Object} estilo
 * @returns {string[]}
 */
export const afinidadesDeCatalogo = (estilo) =>
  (estilo?.afinidades || []).map((a) => EQUIVALENCIAS_CATALOGO[a] || a);

/** Afinidades nuevas que aporta el catálogo de estilos de vida. */
export const AFINIDADES_DE_ESTILOS = [
  ...new Set(ESTILOS_DE_VIDA.flatMap((estilo) => afinidadesDeCatalogo(estilo))),
];

const primeraEnMinuscula = (texto = "") =>
  texto.charAt(0).toLowerCase() + texto.slice(1);

const primeraEnMayuscula = (texto = "") =>
  texto.charAt(0).toUpperCase() + texto.slice(1);

/**
 * Interpretación redactada según la regla narrativa: nunca afirma causalidad.
 * @param {Object} estilo
 * @returns {string}
 */
export const interpretacionNarrada = (estilo) =>
  `${primeraEnMayuscula(REGLA_NARRATIVA.conectorSinCausalidad)} que ${primeraEnMinuscula(
    estilo.interpretacion,
  )}`;

/**
 * Secuencia de mensajes con los que el agente revela la lectura del estilo
 * de vida: apertura, dato observado e interpretación (en ese orden y separados).
 * @param {Object} estilo
 * @returns {string[]}
 */
export const construirLecturaEstilo = (estilo) => {
  if (!estilo) return [];

  return [
    estilo.descripcion,
    `📊 Dato observado: ${estilo.dato}`,
    `🔎 ${interpretacionNarrada(estilo)}`,
  ];
};

/**
 * Cierre de la ruta: hacia qué sector conduce el estilo y qué sectores amplían
 * la oportunidad.
 * @param {Object} estilo
 * @returns {string}
 */
export const construirRutaSectores = (estilo) => {
  if (!estilo) return "";

  const conectados = estilo.sectoresConectados.join(", ");
  return `Esta ruta conduce al sector ${estilo.sectorPrincipal} y se amplía hacia ${conectados}.`;
};

/**
 * Resumen del estilo listo para guardar en Firebase, enviar a la IA
 * y renderizar en la pantalla de resultados.
 * @param {Object} estilo
 * @param {string} respuesta - Respuesta del usuario a la pregunta del estilo
 * @returns {Object|null}
 */
export const construirResumenEstilo = (estilo, respuesta = "") => {
  if (!estilo) return null;

  return {
    nombre: estilo.nombre,
    icono: estilo.icono,
    afinidades: estilo.afinidades,
    descripcion: estilo.descripcion,
    dato: estilo.dato,
    interpretacion: estilo.interpretacion,
    sectorPrincipal: estilo.sectorPrincipal,
    sectoresConectados: estilo.sectoresConectados,
    pregunta: estilo.pregunta,
    respuesta,
  };
};

export default {
  ESTILOS_DE_VIDA,
  NOMBRES_ESTILOS_DE_VIDA,
  AFINIDADES_DE_ESTILOS,
  REGLA_NARRATIVA,
  obtenerEstiloPorNombre,
  afinidadesDeCatalogo,
  interpretacionNarrada,
  construirLecturaEstilo,
  construirRutaSectores,
  construirResumenEstilo,
};
