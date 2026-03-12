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
              <p className="text-white text-lg font-semibold">
                {Array.isArray(propuesta.audiencia.nivelSocioeconomico)
                  ? propuesta.audiencia.nivelSocioeconomico.join(', ')
                  : propuesta.audiencia.nivelSocioeconomico}
              </p>
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

        {/* 🎯 PAQUETE RECOMENDADO - SÚPER DESTACADO */}
        {propuesta.paqueteRecomendado && (
          <div className="animate-slide-up" style={{ animationDelay: '150ms' }}>
            {/* BANNER DEL PAQUETE - MUY LLAMATIVO */}
            <div className="bg-gradient-to-r from-claro-red via-pink-600 to-purple-600 rounded-3xl p-1 mb-8 shadow-2xl">
              <div className="bg-gray-900/95 backdrop-blur-xl rounded-3xl p-10">
                {/* Header con nombre y precio */}
                <div className="text-center mb-8">
                  <div className="inline-block bg-gradient-to-r from-claro-red/20 to-purple-600/20 px-6 py-2 rounded-full mb-4">
                    <p className="text-claro-red font-bold text-sm uppercase tracking-widest">📦 Tu Paquete Ideal</p>
                  </div>
                  <h2 className="text-6xl font-black text-white mb-3 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                    {propuesta.paqueteRecomendado.paquete.nombre}
                  </h2>
                  <p className="text-white/70 text-xl mb-6">{propuesta.paqueteRecomendado.paquete.descripcion}</p>
                  
                  {/* Precio destacado */}
                  <div className="flex items-center justify-center gap-6 mb-4">
                    <div className="text-right">
                      <p className="text-white/50 text-lg line-through">
                        ${propuesta.paqueteRecomendado.paquete.precio.toLocaleString('es-CO')}
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-claro-red to-pink-600 rounded-2xl px-8 py-4">
                      <p className="text-white text-5xl font-black">
                        ${propuesta.paqueteRecomendado.paquete.precioPreventa.toLocaleString('es-CO')}
                      </p>
                    </div>
                    <div className="text-left">
                      <span className="bg-green-500/20 text-green-300 text-lg font-bold px-4 py-2 rounded-full">
                        {propuesta.paqueteRecomendado.paquete.descuento}
                      </span>
                    </div>
                  </div>
                  <p className="text-white/60 text-sm">{propuesta.paqueteRecomendado.paquete.impuestos}</p>
                </div>

                {/* Alcance comparativo */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white/5 rounded-2xl p-6 text-center border border-white/10">
                    <p className="text-white/60 text-sm uppercase tracking-wider mb-3">Alcance Ideal del Paquete</p>
                    <p className="text-5xl font-black text-white">{propuesta.paqueteRecomendado.paquete.alcanceIdeal}</p>
                  </div>
                  <div className="bg-gradient-to-br from-claro-red/20 to-purple-600/20 rounded-2xl p-6 text-center border-2 border-claro-red/40">
                    <p className="text-white/80 text-sm uppercase tracking-wider mb-3">✨ Tu Alcance Potencial</p>
                    <p className="text-5xl font-black text-claro-red">{propuesta.valorPropuesta.alcanceTotal}</p>
                  </div>
                </div>

                {/* TODOS LOS COMPONENTES DEL PAQUETE - MUY VISUAL */}
                <div className="mb-8">
                  <div className="flex items-center justify-center mb-6">
                    <div className="h-px bg-gradient-to-r from-transparent via-claro-red to-transparent flex-1"></div>
                    <h3 className="text-3xl font-black text-white px-6 flex items-center">
                      <svg className="w-8 h-8 mr-3 text-claro-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      TODO lo que Incluye
                    </h3>
                    <div className="h-px bg-gradient-to-r from-claro-red via-transparent to-transparent flex-1"></div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {propuesta.paqueteRecomendado.paquete.componentes.map((componente, index) => (
                      <div key={index} className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-5 border border-white/20 hover:border-claro-red/60 hover:scale-105 transition-all duration-300 cursor-pointer">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-claro-red to-pink-600 rounded-lg flex items-center justify-center text-white text-sm font-black shadow-lg">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="text-white font-bold text-base mb-2">{componente.nombre}</p>
                            <p className="text-white/70 text-xs mb-2">{componente.detalle}</p>
                            {componente.alcance !== "N/A" && (
                              <div className="bg-gradient-to-r from-claro-red to-pink-600 rounded-lg px-2 py-1 inline-block shadow-lg">
                                <p className="text-white text-xs font-bold">{componente.alcance}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center mt-6">
                    <div className="inline-block bg-gradient-to-r from-claro-red/30 to-pink-600/30 rounded-full px-6 py-3 border border-claro-red/40">
                      <p className="text-white font-bold text-lg">
                        🎁 Total: <span className="text-white">{propuesta.paqueteRecomendado.paquete.productos} productos completos</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Beneficios y Recomendado para - EN COLUMNAS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Beneficios */}
                  <div className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 rounded-2xl p-6 border border-green-500/30">
                    <h4 className="text-white font-black text-xl mb-4 flex items-center">
                      <svg className="w-7 h-7 mr-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Beneficios Clave
                    </h4>
                    <ul className="space-y-3">
                      {propuesta.paqueteRecomendado.paquete.beneficios.map((beneficio, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-400 mr-3 text-xl flex-shrink-0">✓</span>
                          <span className="text-white/90 text-sm leading-relaxed">{beneficio}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Ideal para */}
                  <div className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 rounded-2xl p-6 border border-purple-500/30">
                    <h4 className="text-white font-black text-xl mb-4 flex items-center">
                      <svg className="w-7 h-7 mr-3 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                      Ideal Para
                    </h4>
                    <ul className="space-y-3">
                      {propuesta.paqueteRecomendado.paquete.recomendadoPara.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-purple-400 mr-3 text-lg flex-shrink-0">★</span>
                          <span className="text-white/90 text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Alternativas compactas */}
                {propuesta.paqueteRecomendado.alternativas && propuesta.paqueteRecomendado.alternativas.length > 0 && (
                  <div>
                    <p className="text-white/60 text-center text-sm mb-4">💡 También disponibles:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {propuesta.paqueteRecomendado.alternativas.map((alt, index) => (
                        <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/30 transition-all">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="text-white font-bold text-base">{alt.paquete.nombre}</h5>
                            <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                              alt.tipo === 'menor' ? 'bg-blue-500/20 text-blue-300' : 'bg-purple-500/20 text-purple-300'
                            }`}>
                              {alt.tipo === 'menor' ? 'Más económico' : 'Premium'}
                            </span>
                          </div>
                          <p className="text-claro-red text-2xl font-bold mb-1">
                            ${alt.paquete.precioPreventa.toLocaleString('es-CO')}
                          </p>
                          <p className="text-white/60 text-xs">{alt.paquete.productos} productos • {alt.razon}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

         {/* ARGUMENTO FINAL DE LA IA - SECCIÓN PEQUEÑA AL FINAL */}
        {propuesta.paqueteRecomendado && (
          <div className="bg-gradient-to-br from-purple-600/15 to-claro-red/15 backdrop-blur-md border border-purple-500/30 rounded-2xl p-6 animate-slide-up" style={{ animationDelay: '450ms' }}>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              ¿Por qué {propuesta.paqueteRecomendado.paquete.nombre}?
            </h3>
            
            <div className="bg-white/5 rounded-xl p-4 mb-3">
              <p className="text-white/90 text-sm leading-relaxed">
                {propuesta.paqueteRecomendado.mensajePersonalizado}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {propuesta.paqueteRecomendado.razonamiento.map((razon, index) => (
                <div key={index} className="flex items-start">
                  <svg className="w-4 h-4 mr-2 text-claro-red flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white/80 text-xs">{razon}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recomendaciones Estratégicas de la IA */}
        <div className="bg-gradient-to-br from-claro-red/20 to-purple-600/20 backdrop-blur-md border border-claro-red/30 rounded-2xl p-8 animate-slide-up" style={{ animationDelay: '300ms' }}>
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
