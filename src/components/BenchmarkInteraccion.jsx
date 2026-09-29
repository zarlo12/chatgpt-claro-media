import React from 'react';
import {
  MAXIMA_INTERACCION,
  SUBTITULO_BENCHMARK,
  formatearInteraccion,
} from '../data/benchmarksInteraccion';

// Un solo tono de marca en dos intensidades: el formato líder y el resto.
// Ambos superan 3:1 de contraste sobre la superficie oscura del tablero.
const COLOR_LIDER = '#E30613';
const COLOR_RESTO = '#F2828A';

/**
 * Tasas de interacción por formato para la categoría del cliente.
 * Todas las barras comparten la misma escala (0 a la mayor tasa del estudio)
 * para que los valores se puedan comparar entre categorías.
 */
const BenchmarkInteraccion = ({ benchmark }) => {
  if (!benchmark?.formatos?.length) return null;

  const formatos = [...benchmark.formatos].sort(
    (a, b) => b.interaccion - a.interaccion,
  );
  const lider = formatos[0];

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 animate-slide-up">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
        <h2 className="text-2xl font-bold text-white flex items-center">
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
              d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
            />
          </svg>
          Cómo interactúa tu categoría
        </h2>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-lg bg-claro-red/20 border border-claro-red/50 text-white text-sm font-medium">
            {benchmark.categoria}
          </span>
          {benchmark.esReferencia && (
            <span className="px-3 py-1 rounded-lg bg-white/10 border border-white/20 text-white/70 text-xs">
              categoría de referencia
            </span>
          )}
        </div>
      </div>

      <p className="text-white/60 text-sm mb-8">{SUBTITULO_BENCHMARK}</p>

      <div className="space-y-5">
        {formatos.map((formato) => {
          const esLider = formato.formato === lider.formato;
          const ancho = Math.max(
            2,
            (formato.interaccion / MAXIMA_INTERACCION) * 100,
          );

          return (
            <div key={formato.formato}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-white/90 text-sm md:text-base font-medium">
                    {formato.formato}
                  </span>
                  {esLider && (
                    <span className="px-2 py-0.5 rounded-md bg-claro-red/20 border border-claro-red/40 text-white/90 text-[11px] uppercase tracking-wide">
                      Mayor interacción
                    </span>
                  )}
                </div>
                <span className="text-white font-bold text-sm md:text-base tabular-nums">
                  {formatearInteraccion(formato.interaccion)}
                </span>
              </div>
              <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${ancho}%`,
                    backgroundColor: esLider ? COLOR_LIDER : COLOR_RESTO,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-white/40 text-xs mt-6">
        Tasa de interacción observada por formato. Escala común de 0% a{' '}
        {formatearInteraccion(MAXIMA_INTERACCION)} · Fuente: Rueda de Negocios 2026.
      </p>
    </div>
  );
};

export default BenchmarkInteraccion;
