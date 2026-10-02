import React from 'react';
import { urlFotografiaIA } from '../config/fotografiaIA';

/**
 * Lleva al kiosco de Fotografía IA arrastrando el ID de la conversación, para
 * que el póster quede en el mismo documento del visitante.
 *
 * Aparece dos veces en la propuesta —arriba y abajo— porque el resultado es
 * largo y hay que verlo sin tener que buscar el botón.
 *
 * Se navega con un enlace normal, no con el router: son dos despliegues
 * distintos (Vercel y Firebase Hosting), así que es una salida del sitio.
 */
const BotonFotografiaIA = ({ conversacionId, standId, variante = 'solido' }) => {
  const destino = urlFotografiaIA(conversacionId, standId);

  const estilos =
    variante === 'solido'
      ? 'bg-gradient-to-r from-claro-red to-pink-600 hover:from-claro-red hover:to-pink-700 shadow-lg shadow-claro-red/40 border-transparent'
      : 'bg-white/10 backdrop-blur-md border-white/30 hover:bg-white/20';

  return (
    <a
      href={destino}
      className={`group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl border text-white font-bold transition-all duration-300 transform hover:scale-105 ${estilos}`}
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <span>Fotografía IA</span>
      <svg
        className="w-5 h-5 group-hover:translate-x-1 transition-transform"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </a>
  );
};

export default BotonFotografiaIA;
