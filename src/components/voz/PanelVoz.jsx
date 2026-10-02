import React from 'react';

const Control = ({ id, etiqueta, valor, min, max, paso, formato, onChange }) => (
  <div>
    <div className="flex items-center justify-between mb-1">
      <label htmlFor={id} className="text-white/80 text-sm">
        {etiqueta}
      </label>
      <span className="text-white/60 text-xs tabular-nums">{formato(valor)}</span>
    </div>
    <input
      id={id}
      type="range"
      min={min}
      max={max}
      step={paso}
      value={valor}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full accent-claro-red"
    />
  </div>
);

/**
 * Ajustes de la voz: cuál voz, qué tan rápido, qué tono y qué volumen.
 * Los cambios se guardan en el equipo, así el stand queda configurado.
 */
const PanelVoz = ({ voz, onCerrar, className = '' }) => {
  const { config, voces, soportada, hablando } = voz;
  const vozActual = config.voiceURI || voces[0]?.voiceURI || '';

  return (
    <div
      className={`bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-2xl p-5 space-y-4 text-left shadow-2xl ${className}`}
      role="dialog"
      aria-label="Ajustes de voz"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-white font-semibold">Ajustes de voz</h3>
        {onCerrar && (
          <button
            onClick={onCerrar}
            className="text-white/60 hover:text-white text-sm"
            aria-label="Cerrar ajustes"
          >
            Cerrar
          </button>
        )}
      </div>

      {!soportada ? (
        <p className="text-amber-300 text-sm">
          Este navegador no tiene voz disponible. La experiencia seguirá en texto.
        </p>
      ) : (
        <>
          {voces.length === 0 ? (
            <p className="text-amber-300 text-sm">
              No se encontraron voces en español en este equipo. Se usará la voz
              predeterminada del sistema.
            </p>
          ) : (
            <div>
              <label htmlFor="voz-seleccion" className="block text-white/80 text-sm mb-1">
                Voz
              </label>
              <select
                id="voz-seleccion"
                value={vozActual}
                onChange={(e) => voz.actualizar({ voiceURI: e.target.value })}
                className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-claro-red"
              >
                {voces.map((v) => (
                  <option key={v.voiceURI} value={v.voiceURI} className="text-black">
                    {v.name} ({v.lang})
                  </option>
                ))}
              </select>
            </div>
          )}

          <Control
            id="voz-velocidad"
            etiqueta="Velocidad"
            valor={config.velocidad}
            min={0.7}
            max={1.3}
            paso={0.05}
            formato={(v) => `${v.toFixed(2)}x`}
            onChange={(velocidad) => voz.actualizar({ velocidad })}
          />
          <Control
            id="voz-tono"
            etiqueta="Tono"
            valor={config.tono}
            min={0.8}
            max={1.2}
            paso={0.05}
            formato={(v) => v.toFixed(2)}
            onChange={(tono) => voz.actualizar({ tono })}
          />
          <Control
            id="voz-volumen"
            etiqueta="Volumen"
            valor={config.volumen}
            min={0.2}
            max={1}
            paso={0.05}
            formato={(v) => `${Math.round(v * 100)}%`}
            onChange={(volumen) => voz.actualizar({ volumen })}
          />

          <button
            onClick={hablando ? voz.detener : voz.probar}
            className="w-full px-4 py-2 bg-claro-red text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors"
          >
            {hablando ? 'Detener' : 'Probar voz'}
          </button>
        </>
      )}
    </div>
  );
};

export default PanelVoz;
