import React, { useState, useEffect } from 'react';

const InsightCard = ({ insight, index }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 200);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 transform transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-10 h-10 bg-claro-red rounded-lg flex items-center justify-center">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </div>
        <p className="text-white text-sm md:text-base leading-relaxed flex-1">{insight}</p>
      </div>
    </div>
  );
};

const GeoInsightCard = ({ insight, index }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 200);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={`bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-md border border-blue-400/30 rounded-xl p-6 transform transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <p className="text-white text-sm md:text-base leading-relaxed flex-1">{insight}</p>
      </div>
    </div>
  );
};

const ResultsView = ({ propuesta, onReset }) => {
  const resultsContainerRef = React.useRef(null);

  // Scroll automático al top cuando se muestra la vista de resultados
  useEffect(() => {
    if (resultsContainerRef.current) {
      resultsContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
    // También hacer scroll del window por si acaso
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <div ref={resultsContainerRef} className="w-full h-full overflow-y-auto px-6 py-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Propuesta Estratégica
          </h1>
          <p className="text-xl text-white/80">
            Sector: <span className="text-claro-red font-semibold">{propuesta.sector}</span>
          </p>
        </div>

        {/* Datos de Contacto - Solo si existen */}
        {(propuesta.nombre || propuesta.correo || propuesta.celular) && (
          <div className="bg-gradient-to-br from-claro-red/10 to-claro-red/5 backdrop-blur-md border border-claro-red/30 rounded-2xl p-6 animate-slide-up">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-claro-red"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Información de Contacto
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {propuesta.nombre && (
                <div className="flex items-center space-x-2">
                  <span className="text-white/60 text-sm">Nombre:</span>
                  <span className="text-white font-medium">{propuesta.nombre}</span>
                </div>
              )}
              {propuesta.correo && (
                <div className="flex items-center space-x-2">
                  <span className="text-white/60 text-sm">Correo:</span>
                  <span className="text-white font-medium">{propuesta.correo}</span>
                </div>
              )}
              {propuesta.celular && (
                <div className="flex items-center space-x-2">
                  <span className="text-white/60 text-sm">Celular:</span>
                  <span className="text-white font-medium">{propuesta.celular}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Audiencia Section */}
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Perfil de Audiencia
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <p className="text-white/60 text-sm">Género</p>
              <p className="text-white text-lg font-semibold">{propuesta.audiencia.genero}</p>
            </div>
            <div className="space-y-2">
              <p className="text-white/60 text-sm">Edad</p>
              <p className="text-white text-lg font-semibold">
                {Array.isArray(propuesta.audiencia.edad) 
                  ? propuesta.audiencia.edad.join(', ') 
                  : propuesta.audiencia.edad}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-white/60 text-sm">Nivel Socioeconómico</p>
              <p className="text-white text-lg font-semibold">{propuesta.audiencia.nivelSocioeconomico}</p>
            </div>
          </div>
        </div>

        {/* Afinidades */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
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
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            Afinidades Identificadas
          </h2>
          <div className="flex flex-wrap gap-3">
            {propuesta.afinidades.map((afinidad, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-claro-red/20 border border-claro-red/50 rounded-lg text-white text-sm font-medium"
              >
                {afinidad}
              </span>
            ))}
          </div>
        </div>

        {/* Valor de la Propuesta */}
        {propuesta.valorPropuesta && (
          <div className="bg-gradient-to-br from-claro-red/20 to-purple-600/20 backdrop-blur-md border border-claro-red/30 rounded-2xl p-8 animate-slide-up" style={{ animationDelay: '150ms' }}>
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
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              Valor de la Propuesta
            </h2>
            
            {/* Alcance Total */}
            <div className="mb-8 text-center">
              <p className="text-white/70 text-sm uppercase tracking-wider mb-2">Alcance Potencial Estimado</p>
              <p className="text-5xl font-bold text-white mb-2">
                {propuesta.valorPropuesta.alcanceTotal}
              </p>
              <p className="text-white/60 text-sm">usuarios potenciales en Colombia</p>
            </div>

            {/* Banderas Principales */}
            <div>
              <p className="text-white/80 font-semibold mb-4 text-center">Segmentos Demográficos Principales:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {propuesta.valorPropuesta.banderasPrincipales.map((bandera, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center transform hover:scale-105 transition-transform"
                  >
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-8 h-8 bg-claro-red/30 rounded-full flex items-center justify-center mr-2">
                        <span className="text-claro-red font-bold">{index + 1}</span>
                      </div>
                    </div>
                    <p className="text-white font-semibold mb-1">{bandera.nombre}</p>
                    <p className="text-claro-red text-lg font-bold">{bandera.alcance}</p>
                    <p className="text-white/50 text-xs">usuarios</p>
                    <div className="mt-2">
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-claro-red to-pink-500 h-2 rounded-full"
                          style={{ width: `${bandera.score}%` }}
                        ></div>
                      </div>
                      <p className="text-white/60 text-xs mt-1">{bandera.score}% de afinidad</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Nota explicativa */}
            <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
              <p className="text-white/70 text-sm text-center">
                💡 Este alcance se calcula cruzando tu audiencia objetivo con nuestras banderas demográficas de Claro Media, 
                que identifican los segmentos con mayor afinidad a tu propuesta.
              </p>
            </div>
          </div>
        )}

        {/* Insights */}
        <div className="space-y-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
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
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            Insights Clave
          </h2>
          <div className="space-y-4">
            {propuesta.insights.map((insight, index) => (
              <InsightCard key={index} insight={insight} index={index} />
            ))}
          </div>
        </div>

        {/* Insights GeoEspaciales - Solo si hay datos disponibles */}
        {propuesta.insightsGeoespaciales && propuesta.insightsGeoespaciales.length > 0 && (
          <div className="space-y-4 animate-slide-up" style={{ animationDelay: '250ms' }}>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <svg
                className="w-8 h-8 mr-3 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Insights Estación Analítica GeoEspacial
            </h2>
            <div className="space-y-4">
              {propuesta.insightsGeoespaciales.map((insight, index) => (
                <GeoInsightCard key={index} insight={insight} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Recomendaciones */}
        <div className="bg-gradient-to-br from-claro-red/20 to-claro-red/10 backdrop-blur-md border border-claro-red/30 rounded-2xl p-8 animate-slide-up" style={{ animationDelay: '300ms' }}>
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Recomendaciones Estratégicas
          </h2>
          <ul className="space-y-3">
            {propuesta.recomendaciones.map((rec, index) => (
              <li key={index} className="flex items-start space-x-3 text-white">
                <span className="flex-shrink-0 w-6 h-6 bg-claro-red rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                  {index + 1}
                </span>
                <span className="text-sm md:text-base leading-relaxed">{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Próximos Pasos */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 animate-slide-up" style={{ animationDelay: '400ms' }}>
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
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
            Próximos Pasos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {propuesta.proximosPasos.map((paso, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center space-x-3"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-claro-red rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
                <p className="text-white text-sm">{paso}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reset Button */}
        {/* <div className="flex justify-center pt-8 pb-4">
          <button
            onClick={onReset}
            className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl text-white font-semibold hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
          >
            Crear Nueva Propuesta
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ResultsView;
