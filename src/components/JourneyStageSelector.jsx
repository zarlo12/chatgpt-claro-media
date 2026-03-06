import React, { useState } from 'react';

const JourneyStageSelector = ({ onSelect, title, subtitle }) => {
  const [selectedStage, setSelectedStage] = useState(null);
  const [hoveredStage, setHoveredStage] = useState(null);

  const stages = [
    { 
      id: 'descubre', 
      name: 'Descubre', 
      icon: '🔍',
      description: 'Primera toma de contacto',
      color: 'from-blue-500/20 to-blue-600/10',
      borderColor: 'border-blue-500/50',
      shadowColor: 'shadow-blue-500/30'
    },
    { 
      id: 'explora', 
      name: 'Explora', 
      icon: '🌐',
      description: 'Investiga opciones',
      color: 'from-purple-500/20 to-purple-600/10',
      borderColor: 'border-purple-500/50',
      shadowColor: 'shadow-purple-500/30'
    },
    { 
      id: 'compara', 
      name: 'Compara', 
      icon: '⚖️',
      description: 'Evalúa alternativas',
      color: 'from-yellow-500/20 to-yellow-600/10',
      borderColor: 'border-yellow-500/50',
      shadowColor: 'shadow-yellow-500/30'
    },
    { 
      id: 'decide', 
      name: 'Decide', 
      icon: '💡',
      description: 'Toma la decisión',
      color: 'from-orange-500/20 to-orange-600/10',
      borderColor: 'border-orange-500/50',
      shadowColor: 'shadow-orange-500/30'
    },
    { 
      id: 'compra', 
      name: 'Compra', 
      icon: '🛍️',
      description: 'Realiza la compra',
      color: 'from-claro-red/20 to-claro-red/10',
      borderColor: 'border-claro-red/50',
      shadowColor: 'shadow-claro-red/30'
    }
  ];

  const handleStageClick = (stage) => {
    setSelectedStage(stage.id);
  };

  const handleConfirm = () => {
    if (selectedStage) {
      const stage = stages.find(s => s.id === selectedStage);
      onSelect(stage.name);
    }
  };

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        {subtitle && <p className="text-white/80 text-lg">{subtitle}</p>}
      </div>

      {/* Journey Path Visual */}
      <div className="relative">
        {/* Línea conectora */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/30 via-purple-500/30 via-yellow-500/30 via-orange-500/30 to-claro-red/30 -translate-y-1/2 hidden md:block"></div>

        {/* Etapas */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 relative z-10">
          {stages.map((stage, index) => {
            const isSelected = selectedStage === stage.id;
            const isHovered = hoveredStage === stage.id;

            return (
              <div
                key={stage.id}
                onClick={() => handleStageClick(stage)}
                onMouseEnter={() => setHoveredStage(stage.id)}
                onMouseLeave={() => setHoveredStage(null)}
                className={`
                  relative cursor-pointer transition-all duration-300 transform
                  ${isSelected ? 'scale-110' : isHovered ? 'scale-105' : 'scale-100'}
                `}
              >
                <div
                  className={`
                    bg-gradient-to-br ${stage.color} backdrop-blur-md 
                    rounded-xl p-6 border-2 
                    ${isSelected 
                      ? `${stage.borderColor} ${stage.shadowColor} shadow-lg ring-2 ring-white/30` 
                      : 'border-white/20 hover:border-white/40'
                    }
                    transition-all duration-300
                  `}
                >
                  {/* Icono */}
                  <div className="text-5xl mb-3 text-center">{stage.icon}</div>
                  
                  {/* Nombre */}
                  <h4 className="text-white font-bold text-lg text-center mb-1">
                    {stage.name}
                  </h4>
                  
                  {/* Descripción */}
                  <p className="text-white/70 text-xs text-center">
                    {stage.description}
                  </p>

                  {/* Check mark cuando está seleccionado */}
                  {isSelected && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-claro-red rounded-full flex items-center justify-center animate-bounce">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Número de etapa */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Botón Confirmar */}
      {selectedStage && (
        <div className="flex justify-center pt-4 animate-fade-in">
          <button
            onClick={handleConfirm}
            className="px-8 py-4 bg-claro-red text-white rounded-xl font-semibold text-lg shadow-lg shadow-claro-red/50 hover:bg-red-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
          >
            <span>Confirmar selección</span>
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

      {/* Instrucción */}
      <div className="text-center text-white/60 text-sm">
        💡 Selecciona la etapa donde crees que tu comunicación tiene mayor impacto
      </div>
    </div>
  );
};

export default JourneyStageSelector;
