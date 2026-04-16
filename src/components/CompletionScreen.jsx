import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CompletionScreen = ({ standId, onReset }) => {
  const [showContent, setShowContent] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 300);
  }, []);

  const handleReset = async () => {
    if (isResetting) return;
    setIsResetting(true);
    
    // Pequeño delay para feedback visual
    await new Promise(resolve => setTimeout(resolve, 300));
    
    onReset();
    setIsResetting(false);
  };

  return (
    <div className="flex items-center justify-center min-h-full p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-gradient-to-br from-claro-red/20 to-claro-red/5 backdrop-blur-xl border border-claro-red/30 rounded-3xl p-8 md:p-12 shadow-2xl">
          {/* Icono de éxito */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-claro-red/30 rounded-full animate-ping"></div>
              <div className="relative w-24 h-24 bg-gradient-to-br from-claro-red to-red-700 rounded-full flex items-center justify-center shadow-xl">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Título */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl md:text-4xl font-bold text-white text-center mb-4"
          >
            ¡Propuesta Generada!
          </motion.h1>

        

          {/* Badge del Stand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 rounded-full px-6 py-3">
              <svg
                className="w-5 h-5 text-claro-red"
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
              <span className="text-white font-semibold">Stand {standId}</span>
            </div>
          </motion.div>

       

          {/* Botones */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="space-y-4"
          >
            {/* Botón principal - Información */}
            <div className="bg-gradient-to-r from-claro-red to-red-700 rounded-xl p-6 text-center shadow-lg">
              <div className="flex items-center justify-center space-x-3 mb-2">
                <svg
                  className="w-6 h-6 text-white animate-bounce"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
                <span className="text-xl font-bold text-white">
                  Ve a la Pantalla de Resultados
                </span>
              </div>
              <p className="text-white/80 text-sm">
                (Ubicada al final de este stand)
              </p>
            </div>

            {/* Botón secundario - Nueva propuesta */}
            <button
              onClick={handleReset}
              disabled={isResetting}
              className={`w-full px-8 py-4 backdrop-blur-md border rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                isResetting
                  ? 'bg-gray-500/50 border-gray-400 text-white/50 cursor-not-allowed'
                  : 'bg-white/10 border-white/30 text-white hover:bg-white/20 transform hover:scale-105'
              }`}
            >
              {isResetting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
                  <span>Reiniciando...</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  <span>Crear Nueva Propuesta</span>
                </>
              )}
            </button>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};

export default CompletionScreen;
