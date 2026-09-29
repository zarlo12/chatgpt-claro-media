/**
 * Benchmarks de interacción por categoría
 *
 * Fuente: nuevoEventoExperiencias/Rueda de Negocios 2026 - 2_OF.pptx
 *   Lámina "CONOCEMOS CÓMO INTERACTÚAN LAS AUDIENCIAS":
 *   "Cada categoría interactúa de forma diferente. Estos resultados nos
 *    permiten entender su respuesta a distintos formatos."
 *
 * Los porcentajes son tasas de interacción observadas por formato.
 */

export const TITULO_BENCHMARK = "Conocemos cómo interactúan las audiencias";
export const SUBTITULO_BENCHMARK =
  "Cada categoría interactúa de forma diferente. Estos resultados permiten entender su respuesta a distintos formatos.";

/** Tasas de interacción por categoría, ordenadas de mayor a menor. */
export const BENCHMARKS_POR_CATEGORIA = {
  Salud: [
    { formato: "Programmatic", interaccion: 3.13 },
    { formato: "Push Multimedia", interaccion: 2.7 },
    { formato: "SMS", interaccion: 1.52 },
  ],
  Educación: [
    { formato: "Redes sociales", interaccion: 5.42 },
    { formato: "Sat Push", interaccion: 4.19 },
    { formato: "Push Multimedia", interaccion: 2.47 },
  ],
  Automotor: [
    { formato: "SMS", interaccion: 7.1 },
    { formato: "Push Multimedia", interaccion: 3.18 },
    { formato: "Programmatic", interaccion: 2.86 },
  ],
  Belleza: [
    { formato: "Redes sociales", interaccion: 3.73 },
    { formato: "Push Multimedia", interaccion: 2.96 },
    { formato: "Programmatic", interaccion: 1.33 },
  ],
  Tecnología: [
    { formato: "Sat Push", interaccion: 4.93 },
    { formato: "Push Multimedia", interaccion: 3.77 },
    { formato: "Programmatic", interaccion: 2.53 },
    { formato: "Redes sociales", interaccion: 2.4 },
  ],
  Financiera: [
    { formato: "Sat Push", interaccion: 6.21 },
    { formato: "Push Multimedia", interaccion: 3.48 },
    { formato: "Programmatic", interaccion: 2.79 },
    { formato: "RCS", interaccion: 2.35 },
  ],
  Comercios: [
    { formato: "Push Multimedia", interaccion: 2.57 },
    { formato: "Programmatic", interaccion: 2.08 },
    { formato: "SMS", interaccion: 0.7 },
  ],
  Apuestas: [
    { formato: "Push Multimedia", interaccion: 5.09 },
    { formato: "Redes sociales", interaccion: 2.58 },
    { formato: "Programmatic", interaccion: 2.49 },
  ],
  Construcción: [
    { formato: "Push Multimedia", interaccion: 3.47 },
    { formato: "Redes sociales", interaccion: 2.47 },
    { formato: "Programmatic", interaccion: 1.39 },
  ],
  Gobiernos: [
    { formato: "SMS", interaccion: 3.21 },
    { formato: "Push Multimedia", interaccion: 3.0 },
    { formato: "Programmatic", interaccion: 1.12 },
  ],
  Servicios: [
    { formato: "Programmatic", interaccion: 3.68 },
    { formato: "Push Multimedia", interaccion: 2.96 },
    { formato: "SMS", interaccion: 1.3 },
  ],
};

/**
 * Categoría del estudio que corresponde a cada sector del chat.
 * Cuando el nombre no coincide exactamente se usa la categoría más cercana
 * y la UI lo indica como "categoría de referencia".
 */
export const SECTOR_A_CATEGORIA = {
  Financiero: "Financiera",
  Automotor: "Automotor",
  Educación: "Educación",
  Gobierno: "Gobiernos",
  Salud: "Salud",
  Tecnología: "Tecnología",
  Moda: "Belleza",
  Entretenimiento: "Servicios",
  Retail: "Comercios",
  "Consumo Masivo": "Comercios",
};

/** Tope de la escala: mayor tasa observada en todo el estudio. */
export const MAXIMA_INTERACCION = Math.max(
  ...Object.values(BENCHMARKS_POR_CATEGORIA)
    .flat()
    .map((f) => f.interaccion),
);

/**
 * Benchmark de interacción para un sector del chat.
 * @param {string} sector
 * @returns {{categoria: string, esReferencia: boolean, formatos: Array}|null}
 */
export const obtenerBenchmarkPorSector = (sector) => {
  const categoria = SECTOR_A_CATEGORIA[sector];
  const formatos = categoria ? BENCHMARKS_POR_CATEGORIA[categoria] : null;

  if (!formatos) return null;

  return {
    categoria,
    esReferencia: categoria !== sector,
    formatos,
  };
};

/**
 * Formato con mayor tasa de interacción para un sector.
 * @param {string} sector
 * @returns {{formato: string, interaccion: number}|null}
 */
export const formatoLiderPorSector = (sector) => {
  const benchmark = obtenerBenchmarkPorSector(sector);
  if (!benchmark) return null;

  return benchmark.formatos.reduce((mejor, actual) =>
    actual.interaccion > mejor.interaccion ? actual : mejor,
  );
};

/**
 * Porcentaje formateado al estilo del estudio original (coma decimal).
 * @param {number} valor
 * @returns {string}
 */
export const formatearInteraccion = (valor) =>
  `${valor.toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`;

/**
 * Mensaje de chat con el benchmark de la categoría del cliente.
 * @param {string} sector
 * @returns {string|null} null cuando el sector no tiene categoría asociada
 */
export const construirMensajeBenchmark = (sector) => {
  const benchmark = obtenerBenchmarkPorSector(sector);
  if (!benchmark) return null;

  const detalle = benchmark.formatos
    .map((f) => `${f.formato} ${formatearInteraccion(f.interaccion)}`)
    .join(" · ");

  const referencia = benchmark.esReferencia
    ? ` Tomo como referencia la categoría ${benchmark.categoria}.`
    : "";

  return `Cada categoría interactúa de forma diferente.${referencia} En ${benchmark.categoria} los formatos con mayor respuesta son: ${detalle}.`;
};

export default {
  BENCHMARKS_POR_CATEGORIA,
  MAXIMA_INTERACCION,
  construirMensajeBenchmark,
  SECTOR_A_CATEGORIA,
  obtenerBenchmarkPorSector,
  formatoLiderPorSector,
  formatearInteraccion,
};
