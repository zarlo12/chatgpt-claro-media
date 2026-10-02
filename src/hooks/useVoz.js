import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  detenerVoz,
  elegirVoz,
  hablarTexto,
  listarVocesEnEspanol,
  prepararVoz,
  vozSoportada,
} from "../services/vozService";

/** Cómo se le presenta la conversación al visitante. */
export const MODOS_VOZ = {
  texto: { id: "texto", etiqueta: "Texto", detalle: "Solo mensajes escritos" },
  audio: { id: "audio", etiqueta: "Audio", detalle: "Solo la voz del agente" },
  ambos: { id: "ambos", etiqueta: "Texto y audio", detalle: "Lee y escucha a la vez" },
};

const CLAVE_STORAGE = "claro-media-voz";

const CONFIG_INICIAL = {
  modo: "ambos",
  voiceURI: "",
  velocidad: 1,
  tono: 1,
  volumen: 1,
};

const FRASE_DE_PRUEBA =
  "Hola, soy el agente de inteligencia artificial de Claro Media. Así sueno en este equipo.";

// localStorage puede no existir o estar bloqueado: la config es una comodidad.
const cargarConfig = () => {
  try {
    const guardada = JSON.parse(localStorage.getItem(CLAVE_STORAGE) || "{}");
    const modoValido = MODOS_VOZ[guardada.modo] ? guardada.modo : CONFIG_INICIAL.modo;
    return { ...CONFIG_INICIAL, ...guardada, modo: modoValido };
  } catch {
    return CONFIG_INICIAL;
  }
};

const guardarConfig = (config) => {
  try {
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(config));
  } catch {
    // sin almacenamiento: la config vale solo para esta sesión
  }
};

/**
 * Voz del agente: configuración persistente, voces del equipo y reproducción.
 *
 * Las funciones que devuelve son estables y leen la configuración vigente al
 * momento de llamarlas, así una conversación en curso respeta un cambio de
 * modo hecho a la mitad.
 */
export const useVoz = () => {
  const soportada = useMemo(() => vozSoportada(), []);
  const [config, setConfig] = useState(cargarConfig);
  const [voces, setVoces] = useState([]);
  const [hablando, setHablando] = useState(false);

  const configRef = useRef(config);
  const vocesRef = useRef(voces);
  const contadorRef = useRef(0);
  // Marca de tiempo de la última palabra pronunciada: las ondas la usan para
  // "golpear" al ritmo de la voz.
  const pulsoRef = useRef(0);

  configRef.current = config;
  vocesRef.current = voces;

  // Las voces del sistema cargan de forma asíncrona.
  useEffect(() => {
    if (!soportada) return undefined;

    const actualizar = () => setVoces(listarVocesEnEspanol());
    actualizar();
    window.speechSynthesis.addEventListener?.("voiceschanged", actualizar);
    return () =>
      window.speechSynthesis.removeEventListener?.("voiceschanged", actualizar);
  }, [soportada]);

  useEffect(() => () => detenerVoz(), []);

  // Sin voz en el equipo, la experiencia sigue en texto.
  const modo = soportada ? config.modo : "texto";

  const detener = useCallback(() => {
    detenerVoz();
    contadorRef.current += 1;
    setHablando(false);
  }, []);

  const hablar = useCallback(async (texto) => {
    if (!vozSoportada() || configRef.current.modo === "texto") return;

    const { voiceURI, velocidad, tono, volumen } = configRef.current;
    const mia = ++contadorRef.current;
    setHablando(true);

    await hablarTexto(texto, {
      voz: elegirVoz(vocesRef.current, voiceURI),
      velocidad,
      tono,
      volumen,
      onPalabra: () => {
        pulsoRef.current = performance.now();
      },
    });

    // Si otra frase tomó el relevo, ella se encarga del estado.
    if (contadorRef.current === mia) setHablando(false);
  }, []);

  const actualizar = useCallback(
    (cambios) => {
      setConfig((anterior) => {
        const siguiente = { ...anterior, ...cambios };
        guardarConfig(siguiente);
        return siguiente;
      });
      if (cambios.modo === "texto") detener();
    },
    [detener],
  );

  /** Reproduce la frase de prueba con los ajustes actuales, aunque el modo sea texto. */
  const probar = useCallback(() => {
    const { voiceURI, velocidad, tono, volumen } = configRef.current;
    const mia = ++contadorRef.current;
    setHablando(true);
    hablarTexto(FRASE_DE_PRUEBA, {
      voz: elegirVoz(vocesRef.current, voiceURI),
      velocidad,
      tono,
      volumen,
      onPalabra: () => {
        pulsoRef.current = performance.now();
      },
    }).then(() => {
      if (contadorRef.current === mia) setHablando(false);
    });
  }, []);

  /** Estado vigente sin depender del render (para usar dentro de async). */
  const leerEstado = useCallback(() => {
    const modoVigente = vozSoportada() ? configRef.current.modo : "texto";
    return {
      modo: modoVigente,
      usarVoz: modoVigente !== "texto",
      mostrarTexto: modoVigente !== "audio",
    };
  }, []);

  return {
    soportada,
    config,
    modo,
    usarVoz: modo !== "texto",
    mostrarTexto: modo !== "audio",
    voces,
    hablando,
    pulsoRef,
    hablar,
    detener,
    probar,
    preparar: prepararVoz,
    actualizar,
    leerEstado,
  };
};

export default useVoz;
