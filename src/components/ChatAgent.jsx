import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatOptions from './ChatOptions';
import {
  SECTORES,
  GENEROS,
  RANGOS_EDAD,
  NIVELES_SOCIOECONOMICOS,
  AFINIDADES_POR_SECTOR,
  generarPropuestaEstrategica
} from '../data/mockData';

const ChatAgent = ({ onComplete }) => {
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState('welcome');
  const [userData, setUserData] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedAfinidades, setSelectedAfinidades] = useState([]);
  const messagesEndRef = useRef(null);
  const hasInitialized = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showOptions]);

  useEffect(() => {
    // Prevenir duplicación en React StrictMode
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    // Mensaje de bienvenida
    setTimeout(() => {
      addAgentMessage(
        'Bienvenido al Agente de IA de Claro Media. Desarrollado con tecnología ChatGPT y entrenado con nuestra data, estoy aquí para ayudarte a crear propuestas estratégicas personalizadas.'
      );
      setTimeout(() => {
        addAgentMessage('Empecemos conociendo tu empresa. ¿A qué sector perteneces?');
        setShowOptions(true);
      }, 1500);
    }, 500);
  }, []);

  const addAgentMessage = (message) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { text: message, isUser: false }]);
    }, 800);
  };

  const addUserMessage = (message) => {
    setMessages(prev => [...prev, { text: message, isUser: true }]);
    setShowOptions(false);
  };

  const handleSectorSelect = (sector) => {
    addUserMessage(sector);
    setUserData(prev => ({ ...prev, sector }));
    
    setTimeout(() => {
      addAgentMessage(`Perfecto, veo que trabajas en el sector ${sector}. Ahora, ¿a qué género está dirigida principalmente tu audiencia?`);
      setTimeout(() => {
        setCurrentStep('genero');
        setShowOptions(true);
      }, 1000);
    }, 500);
  };

  const handleGeneroSelect = (genero) => {
    addUserMessage(genero);
    setUserData(prev => ({ ...prev, genero }));
    
    setTimeout(() => {
      addAgentMessage('Excelente. ¿Cuál es el rango de edad de tu audiencia objetivo?');
      setTimeout(() => {
        setCurrentStep('edad');
        setShowOptions(true);
      }, 1000);
    }, 500);
  };

  const handleEdadSelect = (edad) => {
    addUserMessage(edad);
    setUserData(prev => ({ ...prev, edad }));
    
    setTimeout(() => {
      addAgentMessage('Perfecto. ¿Cuál es el nivel socioeconómico de tu audiencia?');
      setTimeout(() => {
        setCurrentStep('nivelSocioeconomico');
        setShowOptions(true);
      }, 1000);
    }, 500);
  };

  const handleNivelSocioeconomicoSelect = (nivel) => {
    addUserMessage(nivel);
    setUserData(prev => ({ ...prev, nivelSocioeconomico: nivel }));
    
    setTimeout(() => {
      const afinidades = AFINIDADES_POR_SECTOR[userData.sector] || [];
      addAgentMessage(`Basándome en el sector ${userData.sector}, he identificado algunas afinidades clave. Selecciona todas las que apliquen para tu estrategia:`);
      setTimeout(() => {
        setCurrentStep('afinidades');
        setShowOptions(true);
      }, 1000);
    }, 500);
  };

  const handleAfinidadesSelect = (afinidades, isConfirmed) => {
    if (!isConfirmed) {
      setSelectedAfinidades(afinidades);
      return;
    }

    addUserMessage(`${afinidades.length} afinidades seleccionadas: ${afinidades.join(', ')}`);
    setUserData(prev => ({ ...prev, afinidades }));
    
    setTimeout(() => {
      addAgentMessage('Excelente. Estoy procesando toda la información y generando tu propuesta estratégica personalizada...');
      setTimeout(() => {
        const propuesta = generarPropuestaEstrategica({ ...userData, afinidades });
        onComplete(propuesta);
      }, 2000);
    }, 500);
  };

  const getCurrentOptions = () => {
    switch (currentStep) {
      case 'welcome':
        return SECTORES;
      case 'genero':
        return GENEROS;
      case 'edad':
        return RANGOS_EDAD;
      case 'nivelSocioeconomico':
        return NIVELES_SOCIOECONOMICOS;
      case 'afinidades':
        return AFINIDADES_POR_SECTOR[userData.sector] || [];
      default:
        return [];
    }
  };

  const handleOptionSelect = (option, isConfirmed) => {
    switch (currentStep) {
      case 'welcome':
        handleSectorSelect(option);
        break;
      case 'genero':
        handleGeneroSelect(option);
        break;
      case 'edad':
        handleEdadSelect(option);
        break;
      case 'nivelSocioeconomico':
        handleNivelSocioeconomicoSelect(option);
        break;
      case 'afinidades':
        handleAfinidadesSelect(option, isConfirmed);
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg.text} isUser={msg.isUser} />
        ))}
        {isTyping && <ChatMessage isTyping={true} />}
        {showOptions && (
          <ChatOptions
            options={getCurrentOptions()}
            onSelect={handleOptionSelect}
            multiSelect={currentStep === 'afinidades'}
            selectedOptions={selectedAfinidades}
          />
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatAgent;
