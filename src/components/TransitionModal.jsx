import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const TransitionModal = ({ isOpen, onClose, mensaje, icono }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Bloquear scroll del body
      document.body.style.overflow = 'hidden';
    } else {
      setTimeout(() => setIsVisible(false), 300);
      // Restaurar scroll del body
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup: restaurar scroll al desmontar
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  const modalContent = (
    <>
      {/* Backdrop con blur */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ zIndex: 9998 }}
        onClick={onClose}
      />

      {/* Modal */}
      <div 
        className="fixed inset-0 flex items-center justify-center p-4"
        style={{ zIndex: 9999 }}
      >
        <div
          className={`bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl border-2 border-white/30 rounded-3xl shadow-2xl max-w-md w-full p-8 transform transition-all duration-500 ${
            isOpen
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-95 translate-y-8'
          }`}
        >
          {/* Icono animado */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Anillo pulsante de fondo */}
              <div className="absolute inset-0 bg-claro-red rounded-full animate-ping opacity-20" />
              <div className="absolute inset-0 bg-claro-red rounded-full animate-pulse opacity-30" />
              
              {/* Icono principal */}
              <div className="relative w-20 h-20 bg-gradient-to-br from-claro-red to-red-700 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                {icono === 'profile' && (
                  <svg
                    className="w-10 h-10 text-white"
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
                )}
                {icono === 'chart' && (
                  <svg
                    className="w-10 h-10 text-white"
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
                )}
                {icono === 'heart' && (
                  <svg
                    className="w-10 h-10 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                )}
                {icono === 'journey' && (
                  <svg
                    className="w-10 h-10 text-white"
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
                )}
                {icono === 'lightbulb' && (
                  <svg
                    className="w-10 h-10 text-white"
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
                )}
                {icono === 'star' && (
                  <svg
                    className="w-10 h-10 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                )}
                {!icono && (
                  <svg
                    className="w-10 h-10 text-white"
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
                )}
              </div>
            </div>
          </div>

          {/* Mensaje principal */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {mensaje || '¡Continúa con la siguiente experiencia!'}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-claro-red to-transparent mx-auto rounded-full" />
          </div>

          {/* Botón de continuar */}
          <button
            onClick={onClose}
            className="w-full py-4 bg-gradient-to-r from-claro-red to-red-700 hover:from-red-700 hover:to-claro-red text-white font-bold text-lg rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-claro-red/50"
          >
            <span className="flex items-center justify-center space-x-2">
              <span>Continuar</span>
              <svg
                className="w-6 h-6 animate-bounce"
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
            </span>
          </button>

          {/* Decoración inferior */}
          <div className="mt-6 flex justify-center space-x-2">
            <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </>
  );

  // Usar Portal para renderizar fuera del contenedor del chat
  return createPortal(modalContent, document.body);
};

export default TransitionModal;
