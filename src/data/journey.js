/**
 * Etapas del customer journey - Experiencia Claro Media
 *
 * Fuente única: la usan el selector del chat, los ejemplos por sector,
 * la recomendación de paquetes y la pantalla de resultados.
 * Para cambiar una etapa (nombre, icono o descripción) basta editarla aquí.
 */

export const ETAPAS_JOURNEY = [
  {
    id: "conoce",
    nombre: "Conoce",
    icono: "🧠",
    descripcion: "Entiende a tu audiencia",
    color: "from-blue-500/20 to-blue-600/10",
    borderColor: "border-blue-500/50",
    shadowColor: "shadow-blue-500/30",
  },
  {
    id: "encuentra",
    nombre: "Encuentra",
    icono: "🎯",
    descripcion: "Llega donde ella está",
    color: "from-cyan-500/20 to-cyan-600/10",
    borderColor: "border-cyan-500/50",
    shadowColor: "shadow-cyan-500/30",
  },
  {
    id: "atrae",
    nombre: "Atrae",
    icono: "✨",
    descripcion: "Gana su atención",
    color: "from-purple-500/20 to-purple-600/10",
    borderColor: "border-purple-500/50",
    shadowColor: "shadow-purple-500/30",
  },
  {
    id: "conecta",
    nombre: "Conecta",
    icono: "🤝",
    descripcion: "Crea la conversación",
    color: "from-amber-500/20 to-amber-600/10",
    borderColor: "border-amber-500/50",
    shadowColor: "shadow-amber-500/30",
  },
  {
    id: "decide",
    nombre: "Decide",
    icono: "💡",
    descripcion: "Impulsa la acción",
    color: "from-orange-500/20 to-orange-600/10",
    borderColor: "border-orange-500/50",
    shadowColor: "shadow-orange-500/30",
  },
  {
    id: "descubre",
    nombre: "Descubre",
    icono: "🔍",
    descripcion: "Se queda y descubre más",
    color: "from-claro-red/20 to-claro-red/10",
    borderColor: "border-claro-red/50",
    shadowColor: "shadow-claro-red/30",
  },
];

/** Nombres de las etapas, en orden. */
export const ORDEN_JOURNEY = ETAPAS_JOURNEY.map((e) => e.nombre);

/**
 * Busca una etapa por su nombre.
 * @param {string} nombre
 * @returns {Object|null}
 */
export const obtenerEtapa = (nombre) =>
  ETAPAS_JOURNEY.find((e) => e.nombre === nombre) || null;

export default { ETAPAS_JOURNEY, ORDEN_JOURNEY, obtenerEtapa };
