import React from 'react';

const Chip = ({ children, tono = 'neutro' }) => (
  <span
    className={`px-3 py-1 rounded-lg text-sm font-medium border ${
      tono === 'marca'
        ? 'bg-claro-red/20 border-claro-red/50 text-white'
        : 'bg-white/10 border-white/20 text-white/80'
    }`}
  >
    {children}
  </span>
);

/**
 * Lectura de audiencia a partir del estilo de vida elegido.
 * El dato observado y la interpretación se muestran siempre separados,
 * según la regla narrativa del contenido de Estilos de Vida.
 */
const EstiloVidaCard = ({ estilo }) => {
  if (!estilo) return null;

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 animate-slide-up">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <svg
          className="w-8 h-8 mr-3 text-claro-red"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
        Lectura de Audiencia
      </h2>

      <div className="flex items-start gap-5 mb-6">
        <div className="text-5xl leading-none">{estilo.icono}</div>
        <div className="flex-1">
          <h3 className="text-3xl font-black text-white mb-2">{estilo.nombre}</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {estilo.afinidades?.map((afinidad) => (
              <Chip key={afinidad} tono="marca">
                {afinidad}
              </Chip>
            ))}
          </div>
          <p className="text-white/80 leading-relaxed">{estilo.descripcion}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white/5 border border-white/15 rounded-xl p-5">
          <p className="text-white/50 text-xs uppercase tracking-widest mb-2">
            📊 Dato observado
          </p>
          <p className="text-white text-sm leading-relaxed">{estilo.dato}</p>
        </div>
        <div className="bg-gradient-to-br from-claro-red/15 to-claro-red/5 border border-claro-red/30 rounded-xl p-5">
          <p className="text-white/50 text-xs uppercase tracking-widest mb-2">
            🔎 Esto sugiere
          </p>
          <p className="text-white text-sm leading-relaxed">
            {estilo.interpretacion}
          </p>
        </div>
      </div>

      {estilo.respuesta && (
        <div className="bg-white/5 border border-white/15 rounded-xl p-5 mb-6">
          <p className="text-white/60 text-sm mb-2">{estilo.pregunta}</p>
          <p className="text-white text-lg font-semibold">"{estilo.respuesta}"</p>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <span className="text-white/60 text-sm">Ruta de negocio:</span>
        <Chip tono="marca">{estilo.sectorPrincipal}</Chip>
        {estilo.sectoresConectados?.length > 0 && (
          <>
            <span className="text-white/40">→</span>
            {estilo.sectoresConectados.map((sector) => (
              <Chip key={sector}>{sector}</Chip>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default EstiloVidaCard;
