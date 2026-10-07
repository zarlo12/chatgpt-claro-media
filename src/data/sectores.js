/**
 * Sectores de la experiencia - Rueda de Negocios 2026
 *
 * Fuente única de los sectores y del tamaño de audiencia (usuarios Claro) de
 * cada uno. Los mismos nombres se usan como llave en los ejemplos del journey,
 * los insights, los benchmarks de interacción, los paquetes y los estilos de vida.
 * Al agregar o quitar un sector hay que completar esos mismos archivos.
 */

export const SECTORES_DEL_EVENTO = [
  { nombre: "Automotor", usuarios: 2400000 },
  { nombre: "Financiero", usuarios: 7200000 },
  { nombre: "Retail", usuarios: 4600000 },
  { nombre: "Moda", usuarios: 3000000 },
  { nombre: "Entretenimiento", usuarios: 4200000 },
  { nombre: "Turismo", usuarios: 2800000 },
  { nombre: "B2B", usuarios: 950000 },
  { nombre: "Tecnología", usuarios: 15000000 },
  { nombre: "Salud", usuarios: 3100000 },
  { nombre: "Educación", usuarios: 1400000 },
  { nombre: "Gobierno", usuarios: 1100000 },
  { nombre: "Hogar", usuarios: 4200000 },
];

/** Nombres de los sectores, en el orden en que se muestran. */
export const SECTORES = SECTORES_DEL_EVENTO.map((s) => s.nombre);

/**
 * Cantidad de usuarios en formato corto: 2400000 → "2,4M", 950000 → "950K".
 * @param {number} usuarios
 * @returns {string}
 */
export const formatearUsuarios = (usuarios) => {
  if (usuarios >= 1000000) {
    const millones = Math.round(usuarios / 100000) / 10;
    return `${String(millones).replace(".", ",")}M`;
  }
  return `${Math.round(usuarios / 1000)}K`;
};

/** Texto del botón: "Automotor — 2,4M usuarios". */
export const etiquetaSector = (sector) =>
  `${sector.nombre} — ${formatearUsuarios(sector.usuarios)} usuarios`;

/** Etiquetas de los botones del chat, en el orden de la lista. */
export const OPCIONES_SECTOR = SECTORES_DEL_EVENTO.map(etiquetaSector);

/**
 * Busca un sector por su nombre.
 * @param {string} nombre
 * @returns {{nombre: string, usuarios: number}|null}
 */
export const obtenerSector = (nombre) =>
  SECTORES_DEL_EVENTO.find((s) => s.nombre === nombre) || null;

/**
 * Nombre del sector que corresponde a la etiqueta de un botón.
 * @param {string} etiqueta
 * @returns {string|null}
 */
export const sectorDesdeEtiqueta = (etiqueta) =>
  SECTORES_DEL_EVENTO.find((s) => etiquetaSector(s) === etiqueta)?.nombre ?? null;

export default {
  SECTORES,
  SECTORES_DEL_EVENTO,
  OPCIONES_SECTOR,
  formatearUsuarios,
  etiquetaSector,
  obtenerSector,
  sectorDesdeEtiqueta,
};
