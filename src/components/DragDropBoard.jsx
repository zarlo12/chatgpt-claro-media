import React, { useState } from 'react';

const DragDropBoard = ({ options, onComplete, iconMap = {} }) => {
  const [available, setAvailable] = useState(options);
  const [selected, setSelected] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverZone, setDragOverZone] = useState(null);

  const handleDragStart = (e, item, source) => {
    setDraggedItem({ item, source });
    e.dataTransfer.effectAllowed = 'move';
    e.currentTarget.style.opacity = '0.5';
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = '1';
    setDraggedItem(null);
    setDragOverZone(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (zone) => {
    setDragOverZone(zone);
  };

  const handleDragLeave = () => {
    setDragOverZone(null);
  };

  const handleDrop = (e, targetZone) => {
    e.preventDefault();
    
    if (!draggedItem) return;

    const { item, source } = draggedItem;

    if (source === targetZone) {
      setDragOverZone(null);
      return;
    }

    if (targetZone === 'selected') {
      // Mover de disponibles a seleccionados
      setAvailable(prev => prev.filter(i => i !== item));
      setSelected(prev => [...prev, item]);
    } else {
      // Mover de seleccionados a disponibles
      setSelected(prev => prev.filter(i => i !== item));
      setAvailable(prev => [...prev, item]);
    }

    setDragOverZone(null);
  };

  const handleDoubleClick = (item, source) => {
    if (source === 'available') {
      setAvailable(prev => prev.filter(i => i !== item));
      setSelected(prev => [...prev, item]);
    } else {
      setSelected(prev => prev.filter(i => i !== item));
      setAvailable(prev => [...prev, item]);
    }
  };

  const handleContinue = () => {
    if (selected.length > 0) {
      onComplete(selected, true);
    }
  };

  const getIcon = (text) => {
    return iconMap[text] || '';
  };

  const formatOption = (option) => {
    const icon = getIcon(option);
    return icon ? `${icon} ${option}` : option;
  };

  return (
    <div className="space-y-4 animate-slide-up">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Zona de Disponibles */}
        <div
          className={`min-h-[400px] bg-white/5 backdrop-blur-md border-2 rounded-xl p-4 transition-all duration-300 ${
            dragOverZone === 'available'
              ? 'border-claro-red bg-claro-red/10'
              : 'border-white/20'
          }`}
          onDragOver={handleDragOver}
          onDragEnter={() => handleDragEnter('available')}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, 'available')}
        >
          <div className="text-center mb-4">
            <h3 className="text-white font-semibold text-lg">Afinidades Disponibles</h3>
            <p className="text-white/60 text-sm mt-1">
              Arrastra o haz doble clic para seleccionar
            </p>
          </div>
          
          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
            {available.length === 0 ? (
              <div className="text-center py-8 text-white/40">
                Todas las afinidades seleccionadas
              </div>
            ) : (
              available.map((option, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={(e) => handleDragStart(e, option, 'available')}
                  onDragEnd={handleDragEnd}
                  onDoubleClick={() => handleDoubleClick(option, 'available')}
                  className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg p-3 cursor-move hover:bg-white/20 hover:scale-105 transform transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm font-medium flex-1">
                      {formatOption(option)}
                    </span>
                    <svg
                      className="w-5 h-5 text-white/40 group-hover:text-white/80 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 8h16M4 16h16"
                      />
                    </svg>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Zona de Seleccionados */}
        <div
          className={`min-h-[400px] bg-gradient-to-br from-claro-red/20 to-claro-red/5 backdrop-blur-md border-2 rounded-xl p-4 transition-all duration-300 ${
            dragOverZone === 'selected'
              ? 'border-claro-red bg-claro-red/20 shadow-lg shadow-claro-red/30'
              : 'border-claro-red/40'
          }`}
          onDragOver={handleDragOver}
          onDragEnter={() => handleDragEnter('selected')}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, 'selected')}
        >
          <div className="text-center mb-4">
            <h3 className="text-white font-semibold text-lg flex items-center justify-center">
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Afinidades Seleccionadas
            </h3>
            <p className="text-white/60 text-sm mt-1">
              {selected.length} {selected.length === 1 ? 'afinidad' : 'afinidades'}
            </p>
          </div>
          
          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
            {selected.length === 0 ? (
              <div className="text-center py-12 text-white/40 border-2 border-dashed border-white/20 rounded-lg">
                <svg
                  className="w-12 h-12 mx-auto mb-2 opacity-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                <p>Arrastra aquí las afinidades</p>
                <p className="text-xs mt-1">que apliquen a tu estrategia</p>
              </div>
            ) : (
              selected.map((option, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={(e) => handleDragStart(e, option, 'selected')}
                  onDragEnd={handleDragEnd}
                  onDoubleClick={() => handleDoubleClick(option, 'selected')}
                  className="bg-claro-red/30 backdrop-blur-sm border border-claro-red/60 rounded-lg p-3 cursor-move hover:bg-claro-red/40 hover:scale-105 transform transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm font-medium flex-1">
                      {formatOption(option)}
                    </span>
                    <svg
                      className="w-5 h-5 text-white/60 group-hover:text-white transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Botón Continuar */}
      {selected.length > 0 && (
        <div className="flex justify-center pt-4">
          <button
            onClick={handleContinue}
            className="px-8 py-4 bg-claro-red text-white rounded-xl font-semibold text-lg shadow-lg shadow-claro-red/50 hover:bg-red-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
          >
            <span>Continuar con {selected.length} {selected.length === 1 ? 'afinidad' : 'afinidades'}</span>
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
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Instrucciones */}
      <div className="text-center text-white/60 text-sm">
        💡 Tip: Arrastra las tarjetas o haz doble clic para moverlas entre columnas
      </div>
    </div>
  );
};

export default DragDropBoard;
