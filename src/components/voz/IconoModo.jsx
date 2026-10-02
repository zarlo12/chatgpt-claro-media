import React from 'react';

const TRAZOS = {
  texto: 'M4 6h16M4 12h16M4 18h10',
  audio:
    'M11 5L6 9H2v6h4l5 4V5zM15.5 8.5a5 5 0 010 7M18.5 5.5a9 9 0 010 13',
  ambos:
    'M4 5h9M4 9h6M4 13h4M15 11l-3 2.5H9v3h3l3 2.5V11zM18 12a3 3 0 010 4',
};

/** Icono de cada modo de presentación (texto, audio, ambos). */
const IconoModo = ({ modo, className = 'w-5 h-5' }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d={TRAZOS[modo]}
    />
  </svg>
);

export default IconoModo;
