import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatOptions from './ChatOptions';
import DragDropBoard from './DragDropBoard';
import EstiloVidaSelector from './EstiloVidaSelector';
import JourneyStageSelector from './JourneyStageSelector';
import TransitionModal from './TransitionModal';
import ResultsView from './ResultsView';
import EscenarioVoz from './voz/EscenarioVoz';
import PantallaInicio from './voz/PantallaInicio';
import OndasVoz from './voz/OndasVoz';
import { useVoz } from '../hooks/useVoz';
import { generarPropuestaConIA } from '../services/apiService';
import { guardarDatosIniciales, actualizarConversacion } from '../services/firebaseService';
import {
  SECTORES,
  GENEROS,
  RANGOS_EDAD,
  NIVELES_SOCIOECONOMICOS,
  TODAS_AFINIDADES,
  ICONOS_AFINIDADES,
  MENSAJES_JOURNEY_POR_SECTOR,
  REVELACIONES_JOURNEY,
} from '../data/mockData';
import {
  afinidadesDeCatalogo,
  construirLecturaEstilo,
  construirResumenEstilo,
  construirRutaSectores,
} from '../data/estilosDeVida';
import { construirMensajeBenchmark } from '../data/benchmarksInteraccion';
import { ETAPAS_JOURNEY } from '../data/journey';
import {
  OPCIONES_PRESUPUESTO,
  anunciarPaquete,
  presupuestoDesdeEtiqueta,
} from '../data/paquetesComerciales';

// Ritmo de la conversación
const DURACION_TIPEO = 800;
const PAUSA_ENTRE_MENSAJES = 1200;
// Con voz, el propio habla marca el ritmo: basta una pausa corta entre frases.
const DURACION_TIPEO_VOZ = 500;
const PAUSA_TRAS_VOZ = 450;

const FRASE_ARMANDO_PROPUESTA =
  'Estoy cruzando el perfil de tu audiencia con el portafolio de la Rueda de Negocios para armar tu propuesta.';

// Pasos que se resuelven con un componente propio en lugar de ChatOptions
const PASOS_CON_COMPONENTE = [
  'datosPersonales',
  'estiloVida',
  'afinidades',
  'journey',
];

// Pasos que permiten elegir varias opciones
const PASOS_MULTISELECCION = ['edad', 'nivelSocioeconomico'];

const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Barra fija sobre los resultados: confirma el stand y permite reiniciar. */
const BarraResultados = ({ standId, onReset, voz }) => (
  <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3 px-6 py-3 bg-black/80 backdrop-blur-xl border-b border-white/10">
    <div className="flex items-center gap-3 text-white/80 text-sm font-medium">
      <span className="w-2 h-2 rounded-full bg-green-400"></span>
      Propuesta lista · Stand {standId}
      {voz.hablando && (
        <div className="relative w-32 h-8">
          <OndasVoz activo pulsoRef={voz.pulsoRef} />
        </div>
      )}
    </div>
    <button
      onClick={onReset}
      className="px-5 py-2 bg-white/10 border border-white/30 rounded-lg text-white text-sm font-semibold hover:bg-white/20 transition-all duration-300"
    >
      Crear nueva propuesta
    </button>
  </div>
);

const ChatAgent = ({ onComplete, standId = 'A' }) => {
  const voz = useVoz();
  // La conversación arranca con un toque: así el navegador permite el audio.
  const [iniciado, setIniciado] = useState(false);
  const [hablandoId, setHablandoId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState('welcome');
  const [userData, setUserData] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedEdades, setSelectedEdades] = useState([]);
  const [selectedNSE, setSelectedNSE] = useState([]);
  // Experiencia de estilos de vida
  const [estiloVida, setEstiloVida] = useState(null);
  const [respuestaEstilo, setRespuestaEstilo] = useState('');
  // Customer journey
  const [etapaJourney, setEtapaJourney] = useState(null);
  // Datos personales
  const [nombre, setNombre] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [correo, setCorreo] = useState('');
  const [celular, setCelular] = useState('');
  const [showFormulario, setShowFormulario] = useState(false);
  // Estados de carga para evitar múltiples envíos
  const [isSubmitting, setIsSubmitting] = useState(false);
  // ID del documento de Firebase para actualizar después
  const [conversacionId, setConversacionId] = useState(null);
  // Resultado final: la propuesta se muestra en el mismo flujo
  const [showCompletion, setShowCompletion] = useState(false);
  const [propuestaFinal, setPropuestaFinal] = useState(null);
  // Modal de transición
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({ mensaje: '', icono: '' });
  const [pendingAction, setPendingAction] = useState(null);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const resultadosRef = useRef(null);
  const opcionesRef = useRef(null);
  const idMensaje = useRef(0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollUpModerately = () => {
    // Scroll suave hacia arriba para ver mejor el modal
    if (chatContainerRef.current) {
      const currentScroll = chatContainerRef.current.scrollTop;
      const targetScroll = Math.max(0, currentScroll - 200); // Subir 200px
      chatContainerRef.current.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showOptions]);

  useEffect(() => {
    // Un bloque alto (los 10 estilos de vida, el tablero de afinidades) se muestra
    // desde su inicio; si se bajara al final quedaría fuera de vista el título.
    const contenedor = chatContainerRef.current;
    const bloque = opcionesRef.current;
    if ((!showOptions && !showFormulario) || !contenedor || !bloque) return;
    if (bloque.offsetHeight <= contenedor.clientHeight * 0.6) return;

    const arriba =
      bloque.getBoundingClientRect().top -
      contenedor.getBoundingClientRect().top +
      contenedor.scrollTop -
      16;
    contenedor.scrollTo({ top: arriba, behavior: 'smooth' });
  }, [showOptions, showFormulario, currentStep]);

  useEffect(() => {
    // Los resultados se leen desde el principio, no desde donde quedó el chat
    if (!showCompletion) return;
    window.scrollTo({ top: 0 });
    resultadosRef.current?.scrollTo({ top: 0 });
  }, [showCompletion]);

  // ---------------------------------------------------------------------
  // Utilidades de conversación
  // ---------------------------------------------------------------------

  /** Escribe un mensaje del agente (con indicador de tipeo) y espera. */
  const decir = async (texto, pausa = PAUSA_ENTRE_MENSAJES) => {
    setIsTyping(true);
    await esperar(voz.leerEstado().usarVoz ? DURACION_TIPEO_VOZ : DURACION_TIPEO);
    setIsTyping(false);

    const id = ++idMensaje.current;
    setMessages((prev) => [...prev, { id, text: texto, isUser: false }]);

    // El modo se lee de nuevo: el visitante pudo cambiarlo mientras el agente "pensaba".
    if (voz.leerEstado().usarVoz) {
      setHablandoId(id);
      await voz.hablar(texto);
      setHablandoId(null);
      await esperar(PAUSA_TRAS_VOZ);
    } else {
      await esperar(pausa);
    }
  };

  /** Escribe una secuencia de mensajes del agente, en orden. */
  const decirVarios = async (textos, pausa) => {
    for (const texto of textos.filter(Boolean)) {
      await decir(texto, pausa);
    }
  };

  const addUserMessage = (message) => {
    setMessages((prev) => [...prev, { id: ++idMensaje.current, text: message, isUser: true }]);
    setShowOptions(false);
  };

  /** Habilita el siguiente paso interactivo. */
  const irA = (paso) => {
    setCurrentStep(paso);
    setShowOptions(true);
  };

  const mostrarModalTransicion = (mensaje, icono, accion) => {
    setModalConfig({ mensaje, icono });
    setPendingAction(() => accion);
    setShowModal(true);
    if (voz.leerEstado().usarVoz) voz.hablar(mensaje);
    // Hacer scroll suave hacia arriba para mejor visibilidad del modal
    setTimeout(() => scrollUpModerately(), 100);
  };

  const handleModalContinuar = () => {
    voz.detener();
    setShowModal(false);
    if (pendingAction) {
      setTimeout(() => {
        pendingAction();
        setPendingAction(null);
      }, 300);
    }
  };

  const iniciarConversacion = async () => {
    await esperar(500);
    await decir(
      'Bienvenido al Agente de IA de Claro Media. Desarrollado con tecnología ChatGPT y entrenado con nuestra data, estoy aquí para ayudarte a crear propuestas estratégicas personalizadas.',
    );
    await decir('Antes de empezar, me gustaría conocerte mejor. Por favor ingresa tus datos:');
    setCurrentStep('datosPersonales');
    setShowFormulario(true);
  };

  const handleComenzar = () => {
    voz.preparar();
    setIniciado(true);
    iniciarConversacion();
  };

  const handleReset = () => {
    voz.detener();
    setHablandoId(null);
    // Reiniciar todo el estado: el siguiente visitante vuelve a la pantalla de inicio
    setIniciado(false);
    setShowCompletion(false);
    setMessages([]);
    setCurrentStep('welcome');
    setUserData({});
    setShowOptions(false);
    setSelectedEdades([]);
    setSelectedNSE([]);
    setEstiloVida(null);
    setRespuestaEstilo('');
    setEtapaJourney(null);
    setPropuestaFinal(null);
    setNombre('');
    setEmpresa('');
    setCorreo('');
    setCelular('');
    setShowFormulario(false);
    setConversacionId(null);
  };

  // ---------------------------------------------------------------------
  // Paso 1: datos personales
  // ---------------------------------------------------------------------

  const handleDatosPersonalesSubmit = async (e) => {
    e.preventDefault();

    // Evitar múltiples envíos
    if (isSubmitting) return;

    // Validar que todos los campos estén completos
    if (!nombre.trim() || !empresa.trim() || !correo.trim() || !celular.trim()) {
      alert('Por favor completa todos los campos');
      return;
    }

    // Validar formato de correo básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      alert('Por favor ingresa un correo válido');
      return;
    }

    setIsSubmitting(true);
    setUserData((prev) => ({ ...prev, nombre, empresa, correo, celular }));

    // 🔥 Guardar datos iniciales en Firebase (crear documento)
    try {
      const docId = await guardarDatosIniciales({
        nombre,
        empresa,
        correo,
        celular,
        standId, // Identificador del stand (A o B)
      });
      setConversacionId(docId); // Guardar ID para actualizar después
      console.log('💾 Documento creado en Firebase con ID:', docId, '- Stand:', standId);
    } catch (error) {
      console.error('❌ Error guardando datos iniciales:', error);
      // Continuar aunque falle el guardado
    } finally {
      setIsSubmitting(false);
    }

    addUserMessage(`${nombre} · ${empresa} - ${correo} - ${celular}`);
    setShowFormulario(false);

    mostrarModalTransicion(
      'Perfecto! Ahora vamos a descubrir el perfil de tu audiencia',
      'profile',
      async () => {
        await decir(
          `Perfecto ${nombre}, gracias por tu información. Ahora cuéntame sobre ${empresa}: ¿a qué sector pertenece?`,
        );
        irA('welcome');
      },
    );
  };

  // ---------------------------------------------------------------------
  // Paso 2: perfil demográfico
  // ---------------------------------------------------------------------

  const handleSectorSelect = async (sector) => {
    addUserMessage(sector);
    setUserData((prev) => ({ ...prev, sector }));

    await decir(`Perfecto, veo que trabajas en el sector ${sector}.`);
    await decirVarios([construirMensajeBenchmark(sector)]);
    await decir('Ahora, ¿a qué género está dirigida principalmente tu audiencia?');
    irA('genero');
  };

  const handleGeneroSelect = async (genero) => {
    addUserMessage(genero);
    setUserData((prev) => ({ ...prev, genero }));

    await decir('Excelente. ¿Cuál es el rango de edad de tu audiencia objetivo?');
    irA('edad');
  };

  const handleEdadSelect = async (edades, isConfirmed) => {
    if (!isConfirmed) {
      setSelectedEdades(edades);
      return;
    }

    const edadesText =
      edades.length === 1
        ? edades[0]
        : `${edades.length} rangos de edad: ${edades.join(', ')}`;

    addUserMessage(edadesText);
    setUserData((prev) => ({ ...prev, edad: edades }));

    await decir('Perfecto. ¿Cuál es el nivel socioeconómico de tu audiencia?');
    irA('nivelSocioeconomico');
  };

  const handleNivelSocioeconomicoSelect = (niveles, isConfirmed) => {
    if (!isConfirmed) {
      setSelectedNSE(niveles);
      return;
    }

    const nseText =
      niveles.length === 1
        ? niveles[0]
        : `${niveles.length} niveles socioeconómicos: ${niveles.join(', ')}`;

    addUserMessage(nseText);
    setUserData((prev) => ({ ...prev, nivelSocioeconomico: niveles }));

    mostrarModalTransicion(
      '¡Excelente! Ahora descubramos el estilo de vida de tu audiencia',
      'lightbulb',
      async () => {
        await decir(
          'Trabajamos con 10 estilos de vida construidos a partir del comportamiento real de las audiencias.',
        );
        await decir(
          'Elige el estilo con el que más se identifican las personas que quieres alcanzar. Ese estilo define la ruta de análisis.',
        );
        irA('estiloVida');
      },
    );
  };

  // ---------------------------------------------------------------------
  // Paso 3: estilo de vida (dato observado → interpretación → pregunta)
  // ---------------------------------------------------------------------

  const handleEstiloVidaSelect = async (estilo) => {
    addUserMessage(`Estilo de vida: ${estilo.nombre}`);
    setEstiloVida(estilo);
    setShowOptions(false);

    // El dato observado y la interpretación van siempre separados
    await decirVarios(construirLecturaEstilo(estilo));
    await decir(construirRutaSectores(estilo));
    await decir(estilo.pregunta);
    irA('preguntaEstilo');
  };

  const handleRespuestaEstiloSelect = async (respuesta) => {
    addUserMessage(respuesta);
    setRespuestaEstilo(respuesta);
    setShowOptions(false);

    await decir(
      `Tomo nota: "${respuesta}". Eso me dice cuál es la motivación detrás del interés, no solo el interés.`,
    );

    mostrarModalTransicion(
      'Ahora vamos a afinar las afinidades de tu audiencia',
      'heart',
      async () => {
        await decir(
          `Dejé marcadas las afinidades de "${estiloVida?.nombre}". Agrega o quita las que necesites en el tablero: arrastra las tarjetas o haz doble clic sobre ellas.`,
        );
        irA('afinidades');
      },
    );
  };

  // ---------------------------------------------------------------------
  // Paso 4: afinidades
  // ---------------------------------------------------------------------

  const handleAfinidadesSelect = (afinidades, isConfirmed) => {
    if (!isConfirmed) return;

    addUserMessage(`${afinidades.length} afinidades seleccionadas: ${afinidades.join(', ')}`);
    setUserData((prev) => ({ ...prev, afinidades }));

    mostrarModalTransicion(
      '¡Increíble! Ahora vamos a explorar el Customer Journey',
      'journey',
      async () => {
        await decir('Perfecto. Ahora vamos a una reflexión estratégica importante...');
        await decir(
          'En tu experiencia: ¿En qué momento crees que tu comunicación tiene más poder para influir en tu audiencia?',
        );
        irA('journey');
      },
    );
  };

  // ---------------------------------------------------------------------
  // Paso 5: customer journey
  // ---------------------------------------------------------------------

  const handleJourneySelect = async (etapa) => {
    addUserMessage(etapa);
    setEtapaJourney(etapa);
    setShowOptions(false);

    const afinidadPrincipal = userData.afinidades?.[0] || 'las afinidades';
    await decir(
      `Interesante elección. Hace unos minutos descubrimos que tu audiencia tiene afinidad con ${afinidadPrincipal}.`,
    );
    await decir('Eso nos dice algo clave: no solo qué consume… sino cómo piensa.');
    await decir('Ahora la pregunta cambia: ¿Qué deberíamos decirle… y cuándo?');
    await mostrarEjemplosJourney();
  };

  const mostrarEjemplosJourney = async () => {
    const ejemplos =
      MENSAJES_JOURNEY_POR_SECTOR[userData.sector] ||
      MENSAJES_JOURNEY_POR_SECTOR['Consumo Masivo'];

    await decir(`Veamos un ejemplo aplicado a ${userData.sector}:`);
    await decir(`Contexto: ${ejemplos.contexto}`);
    await decir('Observa cómo cambia el mensaje en cada etapa del journey:');
    await decir(
      ETAPAS_JOURNEY.map(
        (etapa) => `${etapa.icono} ${etapa.nombre}: "${ejemplos[etapa.id]}"`,
      ).join('\n\n'),
      2500,
    );
    await mostrarRevelaciones();
  };

  const mostrarRevelaciones = async () => {
    await decir('Excelente. Déjame compartirte los aprendizajes clave:');
    await decir(REVELACIONES_JOURNEY.titulo);
    await decirVarios(
      REVELACIONES_JOURNEY.aprendizajes.map(
        (a) => `${a.numero} ${a.texto}\n${a.detalle}`,
      ),
      1800,
    );
    await decir(REVELACIONES_JOURNEY.cierre);

    mostrarModalTransicion(
      'Última pregunta antes de armar tu propuesta',
      'chart',
      async () => {
        await decir(
          'Para ajustar la recomendación al portafolio de la Rueda de Negocios 2026, ¿qué rango de inversión tienes contemplado?',
        );
        await decir(
          'Si todavía no lo defines, lo calculo solo con el perfil de tu audiencia.',
        );
        irA('presupuesto');
      },
    );
  };

  // ---------------------------------------------------------------------
  // Paso 6: inversión y generación de la propuesta
  // ---------------------------------------------------------------------

  const handlePresupuestoSelect = async (etiqueta) => {
    addUserMessage(etiqueta);
    setShowOptions(false);

    mostrarModalTransicion(
      '¡Excelente trabajo! Ahora veamos tu propuesta estratégica completa',
      'star',
      () => generarYGuardarPropuesta(etiqueta),
    );
  };

  const generarYGuardarPropuesta = async (etiquetaPresupuesto) => {
    const datosExperiencia = {
      ...userData,
      estiloVida: estiloVida?.nombre,
      respuestaEstilo,
      etapaJourney,
      presupuesto: presupuestoDesdeEtiqueta(etiquetaPresupuesto),
      presupuestoEtiqueta: etiquetaPresupuesto,
    };

    console.log('🚀 Generando propuesta estratégica...');
    // La IA tarda unos segundos: el agente los llena hablando en lugar de dejar la pantalla quieta.
    const [propuesta] = await Promise.all([
      generarPropuestaConIA(datosExperiencia),
      decir(FRASE_ARMANDO_PROPUESTA, 600),
    ]);
    console.log('✅ Propuesta generada:', propuesta);

    // 🔥 Actualizar documento existente en Firebase
    if (conversacionId) {
      try {
        await actualizarConversacion(conversacionId, {
          sector: userData.sector,
          genero: userData.genero,
          edad: userData.edad,
          nivelSocioeconomico: userData.nivelSocioeconomico,
          afinidades: userData.afinidades,
          estiloVida: construirResumenEstilo(estiloVida, respuestaEstilo),
          presupuestoEstimado: etiquetaPresupuesto,
          etapaJourney,
          propuesta,
          estado: 'completado',
          modo: import.meta.env.VITE_MODE || 'development',
          modeloIA: import.meta.env.VITE_OPENAI_MODEL || 'mock',
        });
        console.log('💾 Conversación actualizada en Firebase con ID:', conversacionId);
      } catch (error) {
        console.error('❌ Error actualizando conversación:', error);
        // Continuar aunque falle el guardado
      }
    } else {
      console.warn('⚠️ No hay ID de conversación, no se puede actualizar');
    }

    // La propuesta se muestra en esta misma pantalla, con los datos de contacto
    // que la vista de resultados necesita para el envío por correo.
    setPropuestaFinal({
      ...propuesta,
      nombre: userData.nombre,
      empresa: userData.empresa,
      correo: userData.correo,
      celular: userData.celular,
    });

    onComplete?.(propuesta);
    setShowCompletion(true);

    // El momento de la revelación: el agente anuncia el paquete mientras se muestra.
    const paquete = propuesta.paqueteRecomendado?.paquete;
    if (paquete && voz.leerEstado().usarVoz) {
      voz.hablar(anunciarPaquete(paquete, userData.nombre));
    }
  };

  // ---------------------------------------------------------------------
  // Opciones por paso
  // ---------------------------------------------------------------------

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
      case 'preguntaEstilo':
        return estiloVida?.opciones || [];
      case 'presupuesto':
        return OPCIONES_PRESUPUESTO;
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
        handleEdadSelect(option, isConfirmed);
        break;
      case 'nivelSocioeconomico':
        handleNivelSocioeconomicoSelect(option, isConfirmed);
        break;
      case 'preguntaEstilo':
        handleRespuestaEstiloSelect(option);
        break;
      case 'presupuesto':
        handlePresupuestoSelect(option);
        break;
      default:
        break;
    }
  };

  const opcionesSeleccionadas = () => {
    if (currentStep === 'edad') return selectedEdades;
    if (currentStep === 'nivelSocioeconomico') return selectedNSE;
    return [];
  };

  const ultimoMensajeDelAgente = [...messages].reverse().find((m) => !m.isUser)?.text;

  const estadoEscenario = voz.hablando
    ? 'Hablando'
    : isTyping
      ? 'Pensando…'
      : showOptions || showFormulario
        ? 'Tu turno'
        : '';

  return (
    <div className="flex flex-col h-full min-h-0">
      {showCompletion && propuestaFinal ? (
        <div ref={resultadosRef} className="flex-1 min-h-0 overflow-y-auto">
          <BarraResultados standId={standId} onReset={handleReset} voz={voz} />
          <ResultsView propuesta={propuestaFinal} onReset={handleReset} />
          <div className="flex justify-center px-6 pb-10">
            <button
              onClick={handleReset}
              className="px-8 py-4 bg-claro-red text-white font-semibold rounded-xl shadow-lg shadow-claro-red/40 hover:bg-red-700 transform hover:scale-105 transition-all duration-300"
            >
              Crear nueva propuesta
            </button>
          </div>
        </div>
      ) : !iniciado ? (
        <PantallaInicio voz={voz} onComenzar={handleComenzar} />
      ) : (
        <>
          <EscenarioVoz voz={voz} estado={estadoEscenario} />
          <div ref={chatContainerRef} className="flex-1 min-h-0 overflow-y-auto px-4 py-6 space-y-4">
            {voz.mostrarTexto &&
              messages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  message={msg.text}
                  isUser={msg.isUser}
                  isSpeaking={msg.id === hablandoId}
                />
              ))}
            {voz.mostrarTexto && isTyping && <ChatMessage isTyping={true} />}
            {/* En modo solo audio el texto no se ve, pero sigue disponible para lectores de pantalla */}
            {!voz.mostrarTexto && (
              <p className="sr-only" aria-live="polite">
                {ultimoMensajeDelAgente}
              </p>
            )}

            <div ref={opcionesRef}>
            {showFormulario && currentStep === 'datosPersonales' && (
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 animate-slide-up">
                <form onSubmit={handleDatosPersonalesSubmit} className="space-y-4">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder="Ej: Juan Pérez"
                      className="w-full px-4 py-3 bg-white/5 border border-white/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-claro-red focus:border-transparent transition-all"
                      autoFocus
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Nombre de empresa *
                    </label>
                    <input
                      type="text"
                      value={empresa}
                      onChange={(e) => setEmpresa(e.target.value)}
                      placeholder="Ej: Claro Media"
                      className="w-full px-4 py-3 bg-white/5 border border-white/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-claro-red focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Correo electrónico *
                    </label>
                    <input
                      type="email"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                      placeholder="Ej: juan.perez@empresa.com"
                      className="w-full px-4 py-3 bg-white/5 border border-white/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-claro-red focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Número de celular *
                    </label>
                    <input
                      type="tel"
                      value={celular}
                      onChange={(e) => setCelular(e.target.value)}
                      placeholder="Ej: 3001234567"
                      className="w-full px-4 py-3 bg-white/5 border border-white/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-claro-red focus:border-transparent transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-6 py-3 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg flex items-center justify-center gap-2 ${
                      isSubmitting
                        ? 'bg-gray-500 cursor-not-allowed'
                        : 'bg-claro-red hover:bg-claro-red/90 transform hover:scale-105'
                    }`}
                  >
                    {isSubmitting ? (
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
                        Enviando...
                      </>
                    ) : (
                      'Continuar'
                    )}
                  </button>
                </form>
              </div>
            )}

            {showOptions && !PASOS_CON_COMPONENTE.includes(currentStep) && (
              <ChatOptions
                options={getCurrentOptions()}
                onSelect={handleOptionSelect}
                multiSelect={PASOS_MULTISELECCION.includes(currentStep)}
                selectedOptions={opcionesSeleccionadas()}
              />
            )}

            {showOptions && currentStep === 'estiloVida' && (
              <EstiloVidaSelector onSelect={handleEstiloVidaSelect} />
            )}

            {showOptions && currentStep === 'afinidades' && (
              <DragDropBoard
                options={TODAS_AFINIDADES}
                onComplete={handleAfinidadesSelect}
                iconMap={ICONOS_AFINIDADES}
                preseleccionadas={afinidadesDeCatalogo(estiloVida)}
              />
            )}

            {showOptions && currentStep === 'journey' && (
              <JourneyStageSelector
                title="¿En qué momento tiene más impacto tu comunicación?"
                subtitle="Selecciona la etapa del journey donde quieres estar presente"
                onSelect={handleJourneySelect}
              />
            )}
            </div>

            <div ref={messagesEndRef} />
          </div>

          {/* Modal de transición */}
          <TransitionModal
            isOpen={showModal}
            onClose={handleModalContinuar}
            mensaje={modalConfig.mensaje}
            icono={modalConfig.icono}
          />
        </>
      )}
    </div>
  );
};

export default ChatAgent;
