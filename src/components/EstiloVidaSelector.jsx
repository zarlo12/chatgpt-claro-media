import React, { useState } from 'react';
import { ESTILOS_DE_VIDA } from '../data/estilosDeVida';

/**
 * Tablero de estilos de vida de la experiencia.
 * El usuario elige el estilo con el que más se identifica y ese estilo define
 * la ruta de análisis del agente (afinidades, sector principal y conectados).
 */
const EstiloVidaSelector = ({ onSelect }) => {
  const [seleccionado, setSeleccionado] = useState(null);
  const [confirmando, setConfirmando] = useState(false);

  const estiloActivo = ESTILOS_DE_VIDA.find((e) => e.id === seleccionado);

  const handleConfirmar = async () => {
    if (!estiloActivo || confirmando) return;

    setConfirmando(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    onSelect(estiloActivo);
    setConfirmando(false);
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-white">Estilos de vida</h3>
        <p className="text-white/80">
          Elige el estilo con el que más se identifica tu audiencia
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ESTILOS_DE_VIDA.map((estilo) => {
          const activo = seleccionado === estilo.id;

          return (
            <button
              key={estilo.id}
              type="button"
              onClick={() => setSeleccionado(estilo.id)}
              className={`relative text-left rounded-2xl p-5 border-2 backdrop-blur-md transition-all duration-300 transform ${
                activo
                  ? 'bg-gradient-to-br from-claro-red/30 to-claro-red/10 border-claro-red shadow-lg shadow-claro-red/30 scale-105'
                  : 'bg-white/5 border-white/20 hover:border-white/40 hover:bg-white/10 hover:scale-105'
              }`}
            >
              <div className="text-4xl mb-3">{estilo.icono}</div>
              <h4 className="text-white font-bold text-lg leading-tight mb-2">
                {estilo.nombre}
              </h4>
              <div className="flex flex-wrap gap-2">
                {estilo.afinidades.map((afinidad) => (
                  <span
                    key={afinidad}
                    className={`text-xs px-2 py-1 rounded-md border ${
                      activo
                        ? 'bg-claro-red/30 border-claro-red/60 text-white'
                        : 'bg-white/10 border-white/20 text-white/70'
                    }`}
                  >
                    {afinidad}
                  </span>
                ))}
              </div>

              {activo && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-claro-red rounded-full flex items-center justify-center shadow-lg">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {estiloActivo && (
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 animate-fade-in">
          <p className="text-white/90 leading-relaxed">
            {estiloActivo.descripcion}
          </p>
        </div>
      )}

      {estiloActivo && (
        <div className="flex justify-center animate-fade-in">
          <button
            onClick={handleConfirmar}
            disabled={confirmando}
            className={`px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 flex items-center space-x-2 ${
              confirmando
                ? 'bg-gray-500 cursor-not-allowed text-white'
                : 'bg-claro-red text-white shadow-claro-red/50 hover:bg-red-700 transform hover:scale-105'
            }`}
          >
            {confirmando ? (
              <>
                <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Analizando...</span>
              </>
            ) : (
              <>
                <span>Continuar con "{estiloActivo.nombre}"</span>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </>
            )}
          </button>
        </div>
      )}

      <div className="text-center text-white/60 text-sm">
        💡 Cada estilo de vida abre una ruta distinta de análisis
      </div>
    </div>
  );
};

export default EstiloVidaSelector;
