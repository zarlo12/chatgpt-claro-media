import React, { useEffect, useState } from 'react';
import OndasVoz from './OndasVoz';
import PanelVoz from './PanelVoz';
import IconoModo from './IconoModo';
import { MODOS_VOZ } from '../../hooks/useVoz';

// Alto de la zona de ondas según cómo se vive la conversación.
const ALTO_ONDAS = {
  ambos: 'h-24',
  audio: 'h-[clamp(7rem,20vh,13rem)]',
};

/**
 * Escenario de la voz, fijo en la parte superior del chat.
 * - Texto: una barra delgada para poder activar la voz.
 * - Texto y audio: una franja con las ondas.
 * - Audio: las ondas en grande, son el protagonista de la pantalla.
 */
const EscenarioVoz = ({ voz, estado }) => {
  const [ajustesAbiertos, setAjustesAbiertos] = useState(false);
  const conOndas = voz.usarVoz;

  useEffect(() => {
    if (!ajustesAbiertos) return undefined;
    const cerrarConEscape = (e) => e.key === 'Escape' && setAjustesAbiertos(false);
    window.addEventListener('keydown', cerrarConEscape);
    return () => window.removeEventListener('keydown', cerrarConEscape);
  }, [ajustesAbiertos]);

  return (
    <div className="relative flex-none border-b border-white/10 bg-black/30">
      {conOndas && (
        <div className={`relative ${ALTO_ONDAS[voz.modo]}`}>
          <OndasVoz activo={voz.hablando} pulsoRef={voz.pulsoRef} />
        </div>
      )}

      <div
        className={`flex items-center justify-between gap-3 px-3 py-2 ${
          conOndas ? 'absolute inset-x-0 top-0 z-10' : ''
        }`}
      >
        <div
          className="flex items-center gap-2 text-white/80 text-xs md:text-sm font-medium min-w-0"
          aria-live="polite"
        >
          <span
            className={`w-2 h-2 rounded-full flex-shrink-0 ${
              voz.hablando ? 'bg-claro-red animate-pulse' : 'bg-white/40'
            }`}
          />
          <span className="truncate">
            {conOndas ? estado || 'Agente en línea' : 'Voz desactivada'}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {voz.hablando && (
            <button
              onClick={voz.detener}
              className="px-3 py-1.5 bg-white/10 border border-white/30 rounded-lg text-white text-xs font-semibold hover:bg-white/20 transition-colors"
            >
              Saltar
            </button>
          )}

          <div
            className="flex items-center bg-black/40 border border-white/20 rounded-lg p-0.5"
            role="group"
            aria-label="Modo de la conversación"
          >
            {Object.values(MODOS_VOZ).map((modo) => {
              const activo = voz.modo === modo.id;
              const bloqueado = !voz.soportada && modo.id !== 'texto';
              return (
                <button
                  key={modo.id}
                  onClick={() => voz.actualizar({ modo: modo.id })}
                  disabled={bloqueado}
                  aria-pressed={activo}
                  title={bloqueado ? 'Este navegador no tiene voz' : modo.detalle}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                    activo
                      ? 'bg-claro-red text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  } ${bloqueado ? 'opacity-40 cursor-not-allowed' : ''}`}
                >
                  <IconoModo modo={modo.id} className="w-4 h-4" />
                  <span className="hidden md:inline">{modo.etiqueta}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setAjustesAbiertos((abierto) => !abierto)}
            aria-expanded={ajustesAbiertos}
            aria-label="Ajustes de voz"
            title="Ajustes de voz"
            className="p-2 bg-black/40 border border-white/20 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33h0a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51h0a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v0a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z" />
            </svg>
          </button>
        </div>
      </div>

      {ajustesAbiertos && (
        <PanelVoz
          voz={voz}
          onCerrar={() => setAjustesAbiertos(false)}
          className="absolute right-3 top-14 z-30 w-80 max-w-[calc(100%-1.5rem)]"
        />
      )}
    </div>
  );
};

export default EscenarioVoz;
