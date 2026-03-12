import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ResultsView from '../components/ResultsView';
import { escucharTodasLasConversaciones } from '../services/firebaseService';

const DisplayScreen = () => {
  const [searchParams] = useSearchParams();
  const standId = searchParams.get('stand') || 'A';
  
  // Estados principales
  const [view, setView] = useState('list'); // 'list' | 'detail'
  const [conversaciones, setConversaciones] = useState([]);
  const [conversacionSeleccionada, setConversacionSeleccionada] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Escuchar todas las conversaciones del stand
  useEffect(() => {
    console.log('📺 Pantalla de Display - Stand', standId);
    setIsLoading(true);

    const unsubscribe = escucharTodasLasConversaciones(standId, (data) => {
      console.log('✅ Conversaciones recibidas:', data.length);
      setConversaciones(data);
      setIsLoading(false);
    });

    return () => {
      console.log('🛑 Cancelando listener de Firebase');
      unsubscribe();
    };
  }, [standId]);

  // Formatear fecha de manera amigable
  const formatearFecha = (timestamp) => {
    if (!timestamp) return 'Fecha no disponible';
    
    const fecha = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const ahora = new Date();
    const diferencia = ahora - fecha;
    const minutos = Math.floor(diferencia / 60000);
    
    if (minutos < 1) return 'Hace un momento';
    if (minutos < 60) return `Hace ${minutos} min`;
    
    const horas = Math.floor(minutos / 60);
    if (horas < 24) return `Hace ${horas}h`;
    
    const dias = Math.floor(horas / 24);
    if (dias < 7) return `Hace ${dias}d`;
    
    return fecha.toLocaleDateString('es-ES', { 
      day: '2-digit', 
      month: 'short',
      year: 'numeric'
    });
  };

  // Filtrar conversaciones por búsqueda
  const conversacionesFiltradas = conversaciones.filter(conv => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    const nombre = (conv.nombre || '').toLowerCase();
    const sector = (conv.sector || '').toLowerCase();
    const correo = (conv.correo || '').toLowerCase();
    const paquete = (conv.propuesta?.paqueteRecomendado?.paquete?.nombre || '').toLowerCase();
    
    return nombre.includes(query) || 
           sector.includes(query) || 
           correo.includes(query) ||
           paquete.includes(query);
  });

  // Seleccionar conversación y cambiar a vista de detalle
  const seleccionarConversacion = (conversacion) => {
    console.log('👤 Conversación seleccionada:', conversacion.id);
    
    // Construir estructura compatible con ResultsView
    const propuesta = {
      sector: conversacion.sector,
      nombre: conversacion.nombre,
      correo: conversacion.correo,
      celular: conversacion.celular,
      audiencia: {
        genero: conversacion.genero,
        edad: Array.isArray(conversacion.edad) ? conversacion.edad : (conversacion.edad ? [conversacion.edad] : []),
        nivelSocioeconomico: Array.isArray(conversacion.nivelSocioeconomico) ? conversacion.nivelSocioeconomico : (conversacion.nivelSocioeconomico ? [conversacion.nivelSocioeconomico] : []),
      },
      afinidades: conversacion.afinidades || [],
      insights: conversacion.propuesta?.insights || [],
      insightsGeoespaciales: conversacion.propuesta?.insightsGeoespaciales || [],
      recomendaciones: conversacion.propuesta?.recomendaciones || [],
      proximosPasos: conversacion.propuesta?.proximosPasos || [],
      valorPropuesta: conversacion.propuesta?.valorPropuesta || null,
      paqueteRecomendado: conversacion.propuesta?.paqueteRecomendado || null,
    };
    
    setConversacionSeleccionada(propuesta);
    setView('detail');
  };

  // Volver a la lista
  const volverALista = () => {
    console.log('🔙 Volver a lista');
    setView('list');
    setConversacionSeleccionada(null);
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-24 h-24 border-8 border-claro-red/30 border-t-claro-red rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-12 h-12 text-claro-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Cargando Conversaciones</h2>
            <p className="text-lg text-white/70">Stand <span className="text-claro-red font-bold">{standId}</span></p>
          </div>
        </div>
      </div>
    );
  }

  // Vista de Detalle
  if (view === 'detail' && conversacionSeleccionada) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Breadcrumb y botón de regreso */}
        <div className="bg-gray-900/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Breadcrumb */}
              <div className="flex items-center space-x-3 text-sm">
                <button
                  onClick={volverALista}
                  className="text-white/60 hover:text-white transition-colors flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Conversaciones Stand {standId}
                </button>
                <span className="text-white/40">/</span>
                <span className="text-white font-medium">{conversacionSeleccionada.nombre || 'Sin nombre'}</span>
              </div>

              {/* Botón de regreso destacado */}
              <button
                onClick={volverALista}
                className="group flex items-center space-x-2 bg-claro-red/20 hover:bg-claro-red/30 border border-claro-red/50 hover:border-claro-red rounded-lg px-4 py-2 transition-all duration-300"
              >
                <svg className="w-5 h-5 text-claro-red group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="text-white font-medium">Volver al Listado</span>
              </button>
            </div>
          </div>
        </div>

        {/* ResultsView actual */}
        <ResultsView propuesta={conversacionSeleccionada} onReset={volverALista} />
      </div>
    );
  }

  // Vista de Lista
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-black text-white mb-2">Panel de Conversaciones</h1>
              <p className="text-white/60 text-lg">
                Stand <span className="text-claro-red font-bold">{standId}</span> • 
                <span className="ml-2">{conversaciones.length} conversación{conversaciones.length !== 1 ? 'es' : ''} {conversaciones.length !== 1 ? 'completadas' : 'completada'}</span>
              </p>
            </div>
            
            {/* Contador en tiempo real */}
            <div className="bg-gradient-to-br from-claro-red/20 to-pink-600/20 border border-claro-red/40 rounded-2xl px-6 py-4">
              <div className="text-center">
                <p className="text-white/60 text-xs uppercase tracking-wider mb-1">Total</p>
                <p className="text-5xl font-black text-claro-red">{conversaciones.length}</p>
              </div>
            </div>
          </div>

          {/* Barra de búsqueda */}
          <div className="relative">
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Buscar por nombre, sector, correo o paquete..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl pl-12 pr-4 py-4 text-white placeholder-white/40 focus:outline-none focus:border-claro-red/50 focus:ring-2 focus:ring-claro-red/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Resultados de búsqueda */}
          {searchQuery && (
            <p className="text-white/50 text-sm mt-3">
              {conversacionesFiltradas.length} resultado{conversacionesFiltradas.length !== 1 ? 's' : ''} encontrado{conversacionesFiltradas.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Empty State */}
        {conversaciones.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <div className="flex items-center justify-center mb-6">
              <svg className="w-32 h-32 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">No hay conversaciones aún</h2>
            <p className="text-white/60 max-w-md mx-auto">
              Cuando se complete una conversación en el Stand {standId}, aparecerá aquí automáticamente.
            </p>
          </div>
        )}

        {/* No Results State */}
        {conversaciones.length > 0 && conversacionesFiltradas.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <div className="flex items-center justify-center mb-6">
              <svg className="w-24 h-24 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">No se encontraron resultados</h2>
            <p className="text-white/60">Intenta con otros términos de búsqueda</p>
          </div>
        )}

        {/* Grid de conversaciones */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {conversacionesFiltradas.map((conversacion, index) => (
            <div
              key={conversacion.id}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:border-claro-red/50 hover:scale-[1.02] transition-all duration-300 cursor-pointer animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => seleccionarConversacion(conversacion)}
            >
              {/* Header de tarjeta */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-claro-red flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    {conversacion.nombre || 'Sin nombre'}
                  </h3>
                  <p className="text-white/50 text-sm">{formatearFecha(conversacion.timestamp)}</p>
                </div>
                
                <svg className="w-6 h-6 text-white/40 group-hover:text-claro-red transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {/* Info grid */}
              <div className="space-y-3 mb-4">
                {conversacion.sector && (
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-claro-red flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                    </svg>
                    <span className="text-white/70 text-sm">Sector: <span className="text-white font-medium">{conversacion.sector}</span></span>
                  </div>
                )}
                
                {conversacion.correo && (
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-claro-red flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span className="text-white/70 text-sm truncate">{conversacion.correo}</span>
                  </div>
                )}

                {conversacion.celular && (
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-claro-red flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span className="text-white/70 text-sm">{conversacion.celular}</span>
                  </div>
                )}
              </div>

              {/* Paquete recomendado - MUY DESTACADO */}
              {conversacion.propuesta?.paqueteRecomendado && (
                <div className="bg-gradient-to-r from-claro-red/20 to-pink-600/20 border border-claro-red/40 rounded-xl p-4 mt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-white/60 text-xs uppercase tracking-wider mb-1">Paquete Recomendado</p>
                      <p className="text-white font-bold text-lg">{conversacion.propuesta.paqueteRecomendado.paquete.nombre}</p>
                      <p className="text-claro-red font-bold text-sm mt-1">
                        ${conversacion.propuesta.paqueteRecomendado.paquete.precioPreventa.toLocaleString('es-CO')}
                      </p>
                    </div>
                    <div className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs font-bold">
                      {conversacion.propuesta.paqueteRecomendado.paquete.descuento}
                    </div>
                  </div>
                </div>
              )}

              {/* Hover indicator */}
              <div className="flex items-center justify-end mt-4 text-claro-red text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Ver detalles completos
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisplayScreen;
