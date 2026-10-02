import React, { useState } from 'react';
import OndasVoz from './OndasVoz';
import PanelVoz from './PanelVoz';
import IconoModo from './IconoModo';
import { MODOS_VOZ } from '../../hooks/useVoz';

const DETALLE_INICIO = {
  texto: 'Lees los mensajes del agente',
  audio: 'El agente te habla, sin texto en pantalla',
  ambos: 'Lees y escuchas a la vez',
};

/**
 * Primera pantalla de cada visitante. Cumple dos funciones: deja elegir cómo
 * vivir la conversación y da el primer toque que el navegador exige para
 * poder reproducir audio.
 */
const PantallaInicio = ({ voz, onComenzar }) => {
  const [ajustesAbiertos, setAjustesAbiertos] = useState(false);

  return (
    <div className="flex-1 min-h-0 overflow-y-auto">
      <div className="min-h-full flex flex-col items-center justify-center gap-5 px-6 pt-4 text-center animate-fade-in">
        <div className="relative w-full max-w-3xl h-[clamp(3.5rem,14vh,9rem)] flex-none">
          <OndasVoz activo={voz.hablando} pulsoRef={voz.pulsoRef} reposo={0.2} />
        </div>

        <div className="space-y-3 max-w-2xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Agente de IA Claro Media
          </h1>
          <p className="hidden [@media(min-height:800px)]:block text-white/70 text-base md:text-lg">
            Una conversación para crear tu propuesta estratégica. Escucha al
            agente y responde con un toque.
          </p>
        </div>

        <div className="w-full max-w-3xl">
          <p className="text-white/60 text-xs uppercase tracking-widest mb-3">
            ¿Cómo quieres vivirla?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" role="radiogroup">
            {Object.values(MODOS_VOZ).map((modo) => {
              const activo = voz.modo === modo.id;
              const bloqueado = !voz.soportada && modo.id !== 'texto';
              return (
                <button
                  key={modo.id}
                  role="radio"
                  aria-checked={activo}
                  disabled={bloqueado}
                  onClick={() => voz.actualizar({ modo: modo.id })}
                  className={`flex flex-col items-center gap-1.5 rounded-2xl border-2 p-4 backdrop-blur-md transition-all duration-300 ${
                    activo
                      ? 'bg-gradient-to-br from-claro-red/30 to-claro-red/10 border-claro-red shadow-lg shadow-claro-red/30'
                      : 'bg-white/5 border-white/20 hover:border-white/40 hover:bg-white/10'
                  } ${bloqueado ? 'opacity-40 cursor-not-allowed' : ''}`}
                >
                  <IconoModo modo={modo.id} className="w-8 h-8 text-white" />
                  <span className="text-white font-bold">{modo.etiqueta}</span>
                  <span className="text-white/60 text-xs">{DETALLE_INICIO[modo.id]}</span>
                  {modo.id === 'ambos' && (
                    <span className="text-[10px] uppercase tracking-widest text-claro-red font-bold">
                      Recomendado
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          {!voz.soportada && (
            <p className="text-amber-300 text-sm mt-3">
              Este navegador no tiene voz disponible: la experiencia será en texto.
            </p>
          )}
        </div>

        <div className="sticky bottom-0 z-10 flex flex-col items-center gap-2 w-full py-3 bg-gradient-to-t from-black/90 via-black/70 to-transparent">
          <button
            onClick={onComenzar}
            className="px-10 py-4 bg-claro-red text-white text-lg font-semibold rounded-xl shadow-lg shadow-claro-red/50 hover:bg-red-700 transform hover:scale-105 transition-all duration-300"
          >
            Comenzar experiencia
          </button>
          <button
            onClick={() => setAjustesAbiertos((abierto) => !abierto)}
            aria-expanded={ajustesAbiertos}
            className="text-white/60 hover:text-white text-sm underline underline-offset-4"
          >
            Ajustes de voz
          </button>
        </div>

        {ajustesAbiertos && (
          <PanelVoz voz={voz} onCerrar={() => setAjustesAbiertos(false)} className="w-full max-w-sm" />
        )}
      </div>
    </div>
  );
};

export default PantallaInicio;
