import React from 'react';

const OptionButton = ({ option, onClick, selected, disabled }) => {
  return (
    <button
      onClick={() => onClick(option)}
      disabled={disabled}
      className={`px-6 py-3 rounded-xl text-sm md:text-base font-medium transition-all duration-300 transform ${
        disabled 
          ? 'opacity-50 cursor-not-allowed'
          : 'hover:scale-105'
      } ${
        selected
          ? 'bg-claro-red text-white shadow-lg shadow-claro-red/50'
          : 'bg-white/10 backdrop-blur-md text-white border border-white/30 hover:bg-white/20'
      }`}
    >
      {option}
    </button>
  );
};

const ChatOptions = ({ options, onSelect, multiSelect, selectedOptions = [] }) => {
  const [isConfirming, setIsConfirming] = React.useState(false);
  const [isSelecting, setIsSelecting] = React.useState(false);
  
  const handleSelect = async (option) => {
    if (multiSelect) {
      const newSelection = selectedOptions.includes(option)
        ? selectedOptions.filter(o => o !== option)
        : [...selectedOptions, option];
      onSelect(newSelection);
    } else {
      // Para selección simple, evitar múltiples clics
      if (isSelecting) return;
      setIsSelecting(true);
      
      // Pequeño delay para feedback visual
      await new Promise(resolve => setTimeout(resolve, 200));
      
      onSelect(option);
      setIsSelecting(false);
    }
  };

  const handleConfirm = async () => {
    if (isConfirming) return; // Evitar múltiples clics
    setIsConfirming(true);
    
    // Pequeño delay para mostrar el loading
    await new Promise(resolve => setTimeout(resolve, 300));
    
    onSelect(selectedOptions, true);
    setIsConfirming(false);
  };

  return (
    <div className="flex flex-wrap gap-3 mb-6 animate-slide-up">
      {options.map((option, index) => (
        <OptionButton
          key={index}
          option={option}
          onClick={handleSelect}
          selected={multiSelect ? selectedOptions.includes(option) : false}
          disabled={!multiSelect && isSelecting}
        />
      ))}
      {multiSelect && selectedOptions.length > 0 && (
        <button
          onClick={handleConfirm}
          disabled={isConfirming}
          className={`w-full px-6 py-3 rounded-xl text-sm md:text-base font-medium shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
            isConfirming
              ? 'bg-gray-500 cursor-not-allowed text-white'
              : 'bg-claro-red text-white shadow-claro-red/50 hover:bg-red-700'
          }`}
        >
          {isConfirming ? (
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
              Procesando...
            </>
          ) : (
            `Continuar con ${selectedOptions.length} seleccionadas`
          )}
        </button>
      )}
    </div>
  );
};

export default ChatOptions;
