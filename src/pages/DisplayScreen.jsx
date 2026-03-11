import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ResultsView from '../components/ResultsView';
import { escucharUltimaConversacion } from '../services/firebaseService';

const DisplayScreen = () => {
  const [searchParams] = useSearchParams();
  const standId = searchParams.get('stand') || 'A';
  const [propuesta, setPropuesta] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('📺 Pantalla de Resultados - Stand', standId);
    setIsLoading(true);

    // Escuchar cambios en tiempo real para este stand
    const unsubscribe = escucharUltimaConversacion(standId, (data) => {
      if (data) {
        console.log('✅ Datos recibidos en Display Screen:', data);
        // Construir estructura de propuesta compatible con ResultsView
        setPropuesta({
          sector: data.sector,
          nombre: data.nombre,
          correo: data.correo,
          celular: data.celular,
          audiencia: {
            genero: data.genero,
            edad: Array.isArray(data.edad) ? data.edad : (data.edad ? [data.edad] : []),
            nivelSocioeconomico: data.nivelSocioeconomico,
          },
          afinidades: data.afinidades || [],
          insights: data.propuesta?.insights || [],
          insightsGeoespaciales: data.propuesta?.insightsGeoespaciales || [],
          recomendaciones: data.propuesta?.recomendaciones || [],
          proximosPasos: data.propuesta?.proximosPasos || [],
        });
      } else {
        setPropuesta(null);
      }
      setIsLoading(false);
    });

    // Cleanup: cancelar suscripción al desmontar
    return () => {
      console.log('🛑 Cancelando listener de Firebase');
      unsubscribe();
    };
  }, [standId]);

  // Función de reset vacía (no se usa en pantalla de display)
  const handleReset = () => {
    console.log('🔄 Reset llamado desde Display Screen - No hace nada');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-24 h-24 border-8 border-claro-red/30 border-t-claro-red rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-claro-red"
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
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Pantalla de Resultados
            </h2>
            <p className="text-lg text-white/70">
              Stand <span className="text-claro-red font-bold">{standId}</span>
            </p>
            <p className="text-sm text-white/50 mt-4">
              Esperando nueva conversación...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!propuesta) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center space-y-6 max-w-2xl px-6">
          <div className="flex items-center justify-center">
            <svg
              className="w-32 h-32 text-claro-red/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white mb-3">
              Pantalla de Resultados
            </h2>
            <p className="text-xl text-white/70 mb-2">
              Stand <span className="text-claro-red font-bold">{standId}</span>
            </p>
            <p className="text-white/50 text-lg">
              Esperando que se complete una conversación en la pantalla principal...
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-left">
            <h3 className="text-white font-semibold mb-3 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-claro-red"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              ¿Cómo funciona?
            </h3>
            <ul className="text-white/60 text-sm space-y-2">
              <li className="flex items-start">
                <span className="text-claro-red mr-2">1.</span>
                El usuario completa el cuestionario en la pantalla principal
              </li>
              <li className="flex items-start">
                <span className="text-claro-red mr-2">2.</span>
                La IA genera una propuesta estratégica personalizada
              </li>
              <li className="flex items-start">
                <span className="text-claro-red mr-2">3.</span>
                Los resultados aparecerán aquí automáticamente
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <ResultsView propuesta={propuesta} onReset={handleReset} />
    </div>
  );
};

export default DisplayScreen;
