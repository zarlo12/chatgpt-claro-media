import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { exportarRegistrosAExcel } from '../services/excelService';

const AdminPanel = () => {
  const [exportando, setExportando] = useState(false);
  const [resultado, setResultado] = useState(null);

  const handleExportar = async () => {
    try {
      setExportando(true);
      setResultado(null);
      
      const resultado = await exportarRegistrosAExcel();
      
      setResultado({
        tipo: 'exito',
        mensaje: `✅ Exportado exitosamente: ${resultado.nombreArchivo}`,
        detalles: `${resultado.totalRegistros} registros con ${resultado.totalCampos} campos`,
      });
    } catch (error) {
      setResultado({
        tipo: 'error',
        mensaje: '❌ Error al exportar',
        detalles: error.message,
      });
    } finally {
      setExportando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-2xl w-full border border-white/20"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold text-white mb-2">
              Panel de Administración
            </h1>
            <p className="text-purple-200 text-lg">
              Exportar datos de conversaciones a Excel
            </p>
          </motion.div>
        </div>

        {/* Descripción */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 rounded-xl p-6 mb-6 border border-white/10"
        >
          <h2 className="text-white text-xl font-semibold mb-3">
            📊 ¿Qué se exportará?
          </h2>
          <ul className="text-purple-100 space-y-2">
            <li>• <strong>Todos los registros</strong> de ambos stands (A y B)</li>
            <li>• <strong>Todos los campos</strong> (incluso campos únicos de algunos registros)</li>
            <li>• <strong>Datos completos:</strong> personales, demográficos, afinidades, journey, propuestas IA</li>
            <li>• <strong>Propuestas desglosadas:</strong> insights, recomendaciones, próximos pasos en columnas separadas</li>
            <li>• <strong>Formato Excel:</strong> archivo .xlsx descargable</li>
          </ul>
        </motion.div>

        {/* Botón de exportación */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          <button
            onClick={handleExportar}
            disabled={exportando}
            className={`
              w-full py-4 px-8 rounded-xl font-bold text-lg
              transition-all duration-300 transform
              ${exportando 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:scale-105 active:scale-95'
              }
              text-white shadow-lg
            `}
          >
            {exportando ? (
              <span className="flex items-center justify-center gap-3">
                <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
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
                Exportando...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-3">
                <svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                  />
                </svg>
                Exportar a Excel
              </span>
            )}
          </button>

          {/* Mensaje de resultado */}
          {resultado && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`
                w-full p-4 rounded-xl border-2
                ${resultado.tipo === 'exito' 
                  ? 'bg-green-500/20 border-green-500/50 text-green-100' 
                  : 'bg-red-500/20 border-red-500/50 text-red-100'
                }
              `}
            >
              <p className="font-semibold text-lg mb-1">{resultado.mensaje}</p>
              <p className="text-sm opacity-90">{resultado.detalles}</p>
            </motion.div>
          )}
        </motion.div>

        {/* Footer con información */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 pt-6 border-t border-white/10"
        >
          <p className="text-purple-200 text-sm text-center">
            Los datos incluyen registros de ambos stands con todos sus campos
          </p>
          <p className="text-purple-300 text-xs text-center mt-2">
            El archivo se generará con todos los campos, incluso aquellos únicos de algunos registros
          </p>
        </motion.div>

        {/* Botón de regreso */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 text-center"
        >
          <a
            href="/"
            className="text-purple-300 hover:text-white transition-colors duration-200 text-sm underline"
          >
            ← Volver al inicio
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminPanel;
