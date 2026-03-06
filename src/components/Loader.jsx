import React from 'react';

const Loader = ({ message = 'Cargando...' }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative w-16 h-16">
        {/* Círculo exterior rotando */}
        <div className="absolute inset-0 border-4 border-claro-red/30 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-claro-red rounded-full animate-spin"></div>
        
        {/* Logo o ícono en el centro */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-claro-red rounded-full animate-pulse-soft"></div>
        </div>
      </div>
      
      {message && (
        <p className="text-white/80 text-sm animate-pulse-soft">{message}</p>
      )}
    </div>
  );
};

export default Loader;
