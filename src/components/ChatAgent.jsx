import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatOptions from './ChatOptions';
import DragDropBoard from './DragDropBoard';
import JourneyStageSelector from './JourneyStageSelector';
import {
  SECTORES,
  GENEROS,
  RANGOS_EDAD,
  NIVELES_SOCIOECONOMICOS,
  AFINIDADES_POR_SECTOR,
  TODAS_AFINIDADES,
  ICONOS_AFINIDADES,
  MENSAJES_JOURNEY_POR_SECTOR,
  REVELACIONES_JOURNEY,
  generarPropuestaEstrategica
} from '../data/mockData';

const ChatAgent = ({ onComplete }) => {
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState('welcome');
  const [userData, setUserData] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedAfinidades, setSelectedAfinidades] = useState([]);
  const [primeraSeleccionJourney, setPrimeraSeleccionJourney] = useState(null);
  const [segundaSeleccionJourney, setSegundaSeleccionJourney] = useState(null);
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
      addAgentMessage(`Perfecto. Ahora utiliza el tablero interactivo para seleccionar las afinidades que mejor se ajusten a tu estrategia. Puedes arrastrar las opciones de la izquierda a la derecha o hacer doble clic en ellas.`);
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
      addAgentMessage('Perfecto. Ahora vamos a una reflexión estratégica importante...');
      setTimeout(() => {
        addAgentMessage('En tu experiencia: ¿En qué momento crees que tu comunicación tiene más poder para influir en tu audiencia?');
        setTimeout(() => {
          setCurrentStep('journeyPrimera');
          setShowOptions(true);
        }, 1000);
      }, 1500);
    }, 500);
  };

  const handlePrimeraSeleccionJourney = (etapa) => {
    addUserMessage(`Primera selección: ${etapa}`);
    setPrimeraSeleccionJourney(etapa);
    setShowOptions(false);
    
    setTimeout(() => {
      const afinidadPrincipal = userData.afinidades?.[0] || 'las afinidades';
      addAgentMessage(`Interesante elección. Hace unos minutos descubrimos que tu audiencia tiene afinidad con ${afinidadPrincipal}.`);
      
      setTimeout(() => {
        addAgentMessage('Eso nos dice algo clave: no solo qué consume… sino cómo piensa.');
        
        setTimeout(() => {
          addAgentMessage('Ahora la pregunta cambia: ¿Qué deberíamos decirle… y cuándo?');
          
          setTimeout(() => {
            mostrarEjemplosJourney();
          }, 1500);
        }, 1500);
      }, 1500);
    }, 500);
  };

  const mostrarEjemplosJourney = () => {
    const ejemplos = MENSAJES_JOURNEY_POR_SECTOR[userData.sector] || MENSAJES_JOURNEY_POR_SECTOR["Consumo Masivo"];
    
    addAgentMessage(`Veamos un ejemplo aplicado a ${userData.sector}:`);
    
    setTimeout(() => {
      addAgentMessage(`Contexto: ${ejemplos.contexto}`);
      
      setTimeout(() => {
        addAgentMessage('Observa cómo cambia el mensaje en cada etapa del journey:');
        
        setTimeout(() => {
          const mensajeCompleto = `
🔍 Descubre: "${ejemplos.descubre}"

🌐 Explora: "${ejemplos.explora}"

⚖️ Compara: "${ejemplos.compara}"

💡 Decide: "${ejemplos.decide}"

🛍️ Compra: "${ejemplos.compra}"`;
          
          addAgentMessage(mensajeCompleto);
          
          setTimeout(() => {
            addAgentMessage('Ahora, con esta nueva perspectiva: ¿En qué momento crees que el insight realmente cambia la decisión?');
            setTimeout(() => {
              setCurrentStep('journeySegunda');
              setShowOptions(true);
            }, 1500);
          }, 3000);
        }, 1500);
      }, 1500);
    }, 1500);
  };

  const handleSegundaSeleccionJourney = (etapa) => {
    addUserMessage(`Segunda selección (después de ver los ejemplos): ${etapa}`);
    setSegundaSeleccionJourney(etapa);
    setShowOptions(false);
    
    setTimeout(() => {
      mostrarRevelaciones();
    }, 500);
  };

  const mostrarRevelaciones = () => {
    addAgentMessage('Excelente. Déjame compartirte los aprendizajes clave:');
    
    setTimeout(() => {
      addAgentMessage(REVELACIONES_JOURNEY.titulo);
      
      setTimeout(() => {
        REVELACIONES_JOURNEY.aprendizajes.forEach((aprendizaje, index) => {
          setTimeout(() => {
            addAgentMessage(`${aprendizaje.numero} ${aprendizaje.texto}\n${aprendizaje.detalle}`);
          }, index * 2000);
        });
        
        setTimeout(() => {
          addAgentMessage(REVELACIONES_JOURNEY.cierre);
          
          setTimeout(() => {
            addAgentMessage('Ahora sí, con esta comprensión completa del journey, estoy generando tu propuesta estratégica personalizada...');
            setTimeout(() => {
              const propuesta = generarPropuestaEstrategica({ 
                ...userData, 
                primeraSeleccionJourney,
                segundaSeleccionJourney 
              });
              onComplete(propuesta);
            }, 2000);
          }, 2000);
        }, REVELACIONES_JOURNEY.aprendizajes.length * 2000 + 1000);
      }, 1500);
    }, 1000);
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
        {showOptions && currentStep !== 'afinidades' && currentStep !== 'journeyPrimera' && currentStep !== 'journeySegunda' && (
          <ChatOptions
            options={getCurrentOptions()}
            onSelect={handleOptionSelect}
            multiSelect={false}
            selectedOptions={selectedAfinidades}
          />
        )}
        {showOptions && currentStep === 'afinidades' && (
          <DragDropBoard
            options={TODAS_AFINIDADES}
            onComplete={handleAfinidadesSelect}
            iconMap={ICONOS_AFINIDADES}
          />
        )}
        {showOptions && currentStep === 'journeyPrimera' && (
          <JourneyStageSelector
            title="¿En qué momento tiene más impacto tu comunicación?"
            subtitle="Selecciona una etapa del journey (tu intuición)"
            onSelect={handlePrimeraSeleccionJourney}
          />
        )}
        {showOptions && currentStep === 'journeySegunda' && (
          <JourneyStageSelector
            title="Ahora que viste los ejemplos..."
            subtitle="¿Cambiarías tu respuesta? Selecciona nuevamente"
            onSelect={handleSegundaSeleccionJourney}
          />
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatAgent;
