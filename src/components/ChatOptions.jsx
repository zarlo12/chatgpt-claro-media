import React from 'react';

const OptionButton = ({ option, onClick, selected }) => {
  return (
    <button
      onClick={() => onClick(option)}
      className={`px-6 py-3 rounded-xl text-sm md:text-base font-medium transition-all duration-300 transform hover:scale-105 ${
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
  const handleSelect = (option) => {
    if (multiSelect) {
      const newSelection = selectedOptions.includes(option)
        ? selectedOptions.filter(o => o !== option)
        : [...selectedOptions, option];
      onSelect(newSelection);
    } else {
      onSelect(option);
    }
  };

  return (
    <div className="flex flex-wrap gap-3 mb-6 animate-slide-up">
      {options.map((option, index) => (
        <OptionButton
          key={index}
          option={option}
          onClick={handleSelect}
          selected={multiSelect ? selectedOptions.includes(option) : false}
        />
      ))}
      {multiSelect && selectedOptions.length > 0 && (
        <button
          onClick={() => onSelect(selectedOptions, true)}
          className="w-full px-6 py-3 rounded-xl text-sm md:text-base font-medium bg-claro-red text-white shadow-lg shadow-claro-red/50 hover:bg-red-700 transition-all duration-300"
        >
          Continuar con {selectedOptions.length} seleccionadas
        </button>
      )}
    </div>
  );
};

export default ChatOptions;
