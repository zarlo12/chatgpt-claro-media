/**
 * Enlace al kiosco de Fotografía IA (proyecto webcam-ia).
 *
 * Son dos aplicaciones desplegadas por separado —esta en Vercel, aquella en
 * Firebase Hosting— pero comparten el mismo proyecto de Firebase
 * (imagen-ia-845a3) y la misma colección, `ClaroMediaAgenteIA`.
 *
 * Por eso el puente es el ID del documento: se pasa por la URL y el kiosco de
 * fotos escribe el póster en ESE MISMO documento, en vez de pedirle otra vez
 * los datos al visitante y crear un registro suelto.
 */

const BASE = import.meta.env.VITE_FOTO_IA_URL || "https://claro-datatech.web.app";

/**
 * URL del kiosco de fotos para una conversación concreta.
 *
 * @param {string} conversacionId ID del documento en ClaroMediaAgenteIA.
 * @param {string} standId Stand de origen, para que el botón de volver
 *   regrese al mismo ("A" o "B").
 * @returns {string}
 */
export const urlFotografiaIA = (conversacionId, standId) => {
  const url = new URL(BASE);
  if (conversacionId) url.searchParams.set("doc", conversacionId);
  if (standId) url.searchParams.set("stand", standId);
  return url.toString();
};
