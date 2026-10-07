// Datos mock basados en el CSV del agente de IA de Claro Media

import { calcularValorPropuesta } from "./banderasDemograficas";
import { recomendarPaquete } from "./paquetesComerciales";
import {
  AFINIDADES_DE_ESTILOS,
  construirResumenEstilo,
  interpretacionNarrada,
  obtenerEstiloPorNombre,
} from "./estilosDeVida";
import { ORDEN_JOURNEY } from "./journey";
export { SECTORES } from "./sectores";
import {
  formatearInteraccion,
  formatoLiderPorSector,
  obtenerBenchmarkPorSector,
} from "./benchmarksInteraccion";


export const GENEROS = ["Mujeres", "Hombres", "Todos"];

export const RANGOS_EDAD = [
  "18+",
  "18 a 24",
  "25 a 34",
  "35 a 44",
  "45 a 54",
  "55 a 64",
  "65 a 74",
  "75+",
];

export const NIVELES_SOCIOECONOMICOS = [
  "Todos",
  "Bajo (E1-E2)",
  "Medio (E3-E4)",
  "Alto (E5-E6)",
];

// Catálogo base de afinidades del tablero interactivo
const AFINIDADES_BASE = [
  "Educación financiera",
  "Construcción",
  "Tecnología",
  "Turismo",
  "Noticias nacionales",
  "Deportes",
  "Música",
  "Movilidad",
  "Gastronomía",
  "Entretenimiento y OTT",
  "Educación",
  "Participación ciudadana",
  "Salud",
  "Criptomonedas",
  "Telemedicina",
  "E-Commerce",
  "Fotografía",
  "Bienestar y Fitness",
  "Centro comercial",
  "Ofertas y descuentos",
];

// El tablero muestra el catálogo base más las afinidades que aportan los
// estilos de vida, sin duplicados.
export const TODAS_AFINIDADES = [
  ...new Set([...AFINIDADES_BASE, ...AFINIDADES_DE_ESTILOS]),
];

// Mapa de iconos para las afinidades
export const ICONOS_AFINIDADES = {
  "Educación financiera": "📈",
  Construcción: "🏗️",
  Tecnología: "📱",
  Turismo: "✈️",
  "Noticias nacionales": "📰",
  Deportes: "⚽",
  Música: "🎵",
  Movilidad: "🚗",
  Gastronomía: "🍽️",
  "Entretenimiento y OTT": "🎬",
  Educación: "🎓",
  "Participación ciudadana": "🗳️",
  Salud: "❤️",
  Criptomonedas: "💰",
  Telemedicina: "🩺",
  "E-Commerce": "🛒",
  Fotografía: "📸",
  "Bienestar y Fitness": "🏋️",
  "Centro comercial": "🏬",
  "Ofertas y descuentos": "🔖",
  // Afinidades que aporta la experiencia de Estilos de Vida
  "Domótica y eficiencia energética": "🏠",
  Gaming: "🎮",
  "Idiomas y contenidos internacionales": "🌎",
  "Negocios y B2B": "💼",
  "Productividad digital": "⚙️",
};

export const AFINIDADES_POR_SECTOR = {
  Financiero: ["Educación financiera", "Tecnología", "Construcción", "Turismo"],
  Automotor: ["Turismo", "Deportes", "Música", "Movilidad"],
  Educación: ["Tecnología", "Turismo", "Gastronomía", "Entretenimiento y OTT"],
  Gobierno: [
    "Educación",
    "Movilidad",
    "Salud",
    "Participación ciudadana",
    "Noticias nacionales",
  ],
  Salud: ["Tecnología", "Gastronomía", "Deportes", "Educación"],
  Tecnología: [
    "Educación",
    "Entretenimiento y OTT",
    "Criptomonedas",
    "Telemedicina",
    "E-Commerce",
  ],
  Moda: ["Fotografía", "Turismo", "Deportes", "Bienestar y Fitness"],
  Entretenimiento: [
    "Gastronomía",
    "Turismo",
    "Deportes",
    "Tecnología",
    "Educación",
  ],
  Retail: ["Ofertas y descuentos", "Centro comercial", "Tecnología"],
  Turismo: ["Turismo", "Movilidad", "Gastronomía", "Deportes"],
  B2B: [
    "Negocios y B2B",
    "Productividad digital",
    "Tecnología",
    "Educación financiera",
  ],
  Hogar: [
    "Construcción",
    "Educación financiera",
    "Domótica y eficiencia energética",
    "Centro comercial",
  ],
};

export const RUTA_COMPORTAMIENTO = ORDEN_JOURNEY;

export const INSIGHTS_POR_SECTOR = {
  Financiero: [
    "Usuarios que frecuentan zonas con salas de ventas de proyectos inmobiliarios presentan alta afinidad con contenidos de financiación y simuladores de crédito.",
    "Usuarios que frecuentan aeropuertos y terminales de transporte muestran mayor interacción con billeteras digitales y seguros.",
    "En temporadas previas a vacaciones aumenta la navegación en destinos turísticos acompañada de consultas financieras.",
  ],
  Automotor: [
    "Detectamos que usuarios que visitan vitrinas automotrices posteriormente navegan comparadores digitales y contenidos de financiación.",
    "En la zona centro de Medellín se consultan principalmente vehículos con energías limpias (motos, carros, patinetas).",
    "En Cedritos, personas que han buscado productos para mascotas muestran interés en búsquedas de vehículos nuevos o usados.",
  ],
  Educación: [
    "Identificamos en eventos de música que un porcentaje significativo de la audiencia busca temas relacionados a pregrados y postgrados.",
    "En la localidad de Kennedy se registra alta búsqueda de programas técnicos de desarrollo y programación.",
    "Las zonas del país con mayor búsqueda de contenido educativo coinciden con áreas de desarrollo urbano.",
  ],
  Gobierno: [
    "80% de las visitas a Villa de Leyva provienen de la zona centro del país con interés en temas gastronómicos.",
    "En vacaciones de fin de año, personas de Bogotá se desplazan principalmente a Medellín, Cali y Neiva.",
    "Alta concentración de navegación en contenidos de empleabilidad y programas sociales en municipios específicos.",
  ],
  Salud: [
    "Personas que asisten a gimnasios consultan temas de cuidado de la piel y planes complementarios de salud.",
    "Usuarios que visitan zonas médicas presentan alto consumo de contenidos sobre bienestar y prevención.",
    "Incremento en navegación de servicios de salud digital en zonas residenciales como Usaquén en Bogotá y norte de Cali.",
  ],
  Tecnología: [
    "Personas que asisten a estadios incrementan la búsqueda de contenidos relacionados con compra de televisores y tecnología para el hogar.",
    "En temporadas de descuentos, usuarios que visitan centros comerciales tecnológicos incrementan la consulta de comparativos y precios online.",
    "Usuarios en zonas corporativas y coworkings muestran afinidad con laptops, tablets y software colaborativo.",
  ],
  Moda: [
    "Ante cambios de clima en ciertas zonas, aumenta la navegación en categorías como abrigos, calzado o ropa ligera.",
    "Usuarios que frecuentan zonas comerciales premium presentan alta afinidad con contenidos de belleza y marcas internacionales.",
    "Personas que asisten a eventos deportivos incrementan la navegación en categorías como tenis deportivos y ropa técnica.",
  ],
  Entretenimiento: [
    "Asistentes a conciertos y festivales presentan alto consumo de contenido en redes sociales y búsqueda de próximos eventos.",
    "Personas que asisten a partidos en estadios incrementan la búsqueda de contenidos deportivos en streaming.",
    "Usuarios que frecuentan zonas de bares y entretenimiento nocturno muestran afinidad con contenidos musicales y eventos en vivo.",
  ],
  Retail: [
    "Usuarios que visitan centros comerciales presentan afinidad con ofertas y descuentos en canales digitales.",
    "Usuarios que visitan tiendas especializadas incrementan la navegación en contenidos y reseñas de esa categoría días posteriores.",
    "Detectamos patrones diferenciados: compras grandes en fines de semana y compras rápidas de reposición entre semana.",
  ],
  Turismo: [
    "40% de las personas interesadas en vehículos híbridos también presenta afinidad con Viajes y Turismo.",
    "68% de las personas interesadas en viajes terrestres cruza con Deportes.",
    "Esto sugiere que elegir un destino puede estar conectado con cómo nos movemos y cómo queremos sentirnos: movilidad y bienestar influyen en el viaje.",
  ],
  B2B: [
    "82% de la audiencia empresarial cruza con Tecnología.",
    "Esto sugiere que crecer ya no depende solo de vender más: también pasa por digitalizar procesos, ganar productividad y tomar decisiones con información.",
    "La audiencia empresarial conecta además con Financiero y Educación, sectores que amplían la oportunidad.",
  ],
  Hogar: [
    "86% de la audiencia interesada en Vivienda VIS cruza con Financiero.",
    "Quienes investigan créditos hipotecarios muestran afinidad con Construcción.",
    "Esto sugiere que la vivienda y la financiación no son dos decisiones separadas: forman parte de un mismo proyecto de patrimonio.",
  ],
};

// Insights GeoEspaciales - Análisis de comportamiento basado en ubicación geográfica
export const INSIGHTS_GEOESPACIALES = {
  Financiero: [],
  Automotor: [
    "Detectamos que el 45% de los usuarios que visitan vitrinas automotrices posteriormente navegan en comparadores digitales y contenidos de financiación.",
    "Medellín y específicamente la av El Poblado (34%) y Av Las Vegas (29%) es donde más consultan vehículos con energías limpias (Motos, carros, patinetas)",
    "En Bogotá sector Cedritos, identificamos que el 41% de personas que han buscado productos para mascotas han estado interesados en búsquedas de vehículos nuevos o usados",
  ],
  Educación: [
    "Colegios: Detectamos que Bogotá y la Sabana Norte es la zona con mayor cantidad de búsquedas relacionadas a colegios. Aprox 1M de consultas realizadas, sobre colegios bilingües, calendario B entre otros.",
    "Universidades: Identificamos que de los asistentes a eventos de música, el 57% de la audiencia buscó temas relacionados a pregrados y postgrados",
    "Institutos de educación continua: Identificamos que en la localidad de Kennedy 18%, Itagüí 11% y Palmira 9%, son los puntos a nivel nacional que más buscaron programas técnicos en desarrollo y programación de software.",
  ],
  Gobierno: [
    "El 80% de las visitas a villa de leyva son de la zona centro del país y están interesadas en temas gastronómicos.",
    "En vacaciones de fin de año, el 23% de las personas que viven en Bogotá se desplazaron a ciudades como Barranquilla 8% Medellín 15% y Cali 19%",
    "Detectamos alta concentración de navegación en contenidos de empleabilidad y programas sociales en los municipios de Barranquilla 9%, Chía 10%, Mosquera 10%, Cali 11% y Soacha 21%",
  ],
  Salud: [
    "Identificamos que el 62% de personas que asisten a gimnasios, consultan temas cuidados para la piel y planes complementarios de salud",
    "El 72% de usuarios que visitan zonas médicas, presentan simultáneamente alto consumo de contenidos sobre bienestar y prevención.",
    "Detectamos incremento del 8% respecto al año anterior, en la navegación de servicios de salud digital en zonas residenciales como (Usaquén en Bogotá y Sur de Cali)",
  ],
  Tecnología: [
    "Identificamos que el 51% de las personas que asistieron a estadios de fútbol, posteriormente incrementaron la búsqueda de contenidos relacionados con compra de televisores y tecnología para el hogar.",
    "Detectamos que en temporadas de descuentos comerciales, el 76% de usuarios que visitan tiendas reconocidas de productos tecnológicos, incrementan la consulta de comparativos, reseñas y precios online desde el mismo punto físico, un 10% respecto al consumo habitual.",
    "Detectamos que usuarios que frecuentan zonas corporativas y coworkings en un 47% presentan mayor interés en contenidos sobre laptops, tablets, software colaborativo y soluciones de conectividad móvil.",
  ],
  Moda: [],
  Entretenimiento: [],
  Retail: [],
  Turismo: [],
  B2B: [],
  Hogar: [],
};

// Ejemplos de mensajes por etapa del customer journey según sector
export const MENSAJES_JOURNEY_POR_SECTOR = {
  Financiero: {
    contexto:
      "Una familia está considerando opciones de inversión para el futuro de sus hijos.",
    conoce:
      "Existen soluciones de inversión diseñadas para el futuro de tu familia.",
    encuentra:
      "Planes de ahorro con rendimientos garantizados y respaldo bancario.",
    atrae: "Tasas de interés 2% superiores al promedio del mercado.",
    conecta: "Asesoría personalizada gratuita con expertos financieros.",
    decide: "Abre tu cuenta hoy y recibe bono de bienvenida de $500.",
    descubre: "Ya con tu cuenta, descubre los fondos que se ajustan a cada meta familiar.",
  },
  Automotor: {
    contexto:
      "Un cliente busca su primer vehículo eléctrico, valorando movilidad sostenible.",
    conoce: "Descubre los vehículos eléctricos más eficientes del mercado.",
    encuentra: "Autonomía de 400km, carga rápida y cero emisiones.",
    atrae: "30% menos costo de mantenimiento vs vehículos tradicionales.",
    conecta: "Prueba de manejo a domicilio sin compromiso.",
    decide: "Financiamiento especial 0% de interés por 12 meses.",
    descubre: "Después de la entrega, descubre la red de carga y el servicio a domicilio.",
  },
  Educación: {
    contexto: "Un joven profesional busca especializarse mientras trabaja.",
    conoce: "Programas de maestría 100% virtuales y flexibles.",
    encuentra: "Horarios adaptables, profesores con experiencia internacional.",
    atrae: "Certificación avalada, mismo título que modalidad presencial.",
    conecta: "Sesión informativa personalizada con coordinador académico.",
    decide: "Matrícula con 20% de descuento, inicia el próximo mes.",
    descubre: "Durante el programa, descubre la bolsa de empleo y la red de egresados.",
  },
  Gobierno: {
    contexto:
      "Una comunidad necesita información sobre programas de vivienda social.",
    conoce: "Nuevos programas de vivienda para familias colombianas.",
    encuentra:
      "Subsidios de hasta el 50% del valor, créditos con tasas preferenciales.",
    atrae:
      "Proyectos en ubicaciones estratégicas con acceso a transporte público.",
    conecta: "Jornada de inscripción en tu municipio este fin de semana.",
    decide: "Separa tu vivienda con solo el 10% de cuota inicial.",
    descubre: "Con tu vivienda asignada, descubre los programas de acompañamiento familiar.",
  },
  Salud: {
    contexto:
      "Una persona activa busca complementar su plan de salud para bienestar integral.",
    conoce: "Planes de salud que incluyen medicina preventiva y bienestar.",
    encuentra: "Telemedicina 24/7, gimnasios afiliados, nutrición personalizada.",
    atrae:
      "Cobertura más amplia con menores copagos que planes tradicionales.",
    conecta: "Evaluación médica inicial sin costo.",
    decide: "Primer mes gratis, activa tu plan hoy mismo.",
    descubre: "Con tu plan activo, descubre los chequeos y beneficios que ya están incluidos.",
  },
  Tecnología: {
    contexto:
      "Un emprendedor necesita equipar su oficina con tecnología moderna.",
    conoce: "Soluciones tecnológicas para impulsar tu negocio.",
    encuentra: "Laptops, tablets y software colaborativo en un solo paquete.",
    atrae:
      "Rendimiento superior, garantía extendida y soporte técnico incluido.",
    conecta: "Demo en vivo de cómo funciona integrado en tu negocio.",
    decide: "Pago en 18 meses sin intereses, envío e instalación gratis.",
    descubre: "Con los equipos funcionando, descubre las herramientas que automatizan tu operación.",
  },
  Moda: {
    contexto:
      "Una persona busca renovar su guardarropa con piezas sostenibles y versátiles.",
    conoce: "Moda consciente: estilo y sostenibilidad en cada prenda.",
    encuentra: "Materiales eco-friendly, diseños atemporales, producción ética.",
    atrae: "Calidad superior a fast fashion, durabilidad garantizada.",
    conecta: "Asesoría de estilo personal virtual gratuita.",
    decide: "Promoción: 3x2 en toda la colección primavera-verano.",
    descubre: "Después de tu compra, descubre cómo combinar cada prenda temporada tras temporada.",
  },
  Entretenimiento: {
    contexto:
      "Una familia busca opciones de entretenimiento para el fin de semana.",
    conoce: "Miles de películas, series y eventos en vivo en un solo lugar.",
    encuentra: "Contenido exclusivo, estrenos simultáneos, sin publicidad.",
    atrae: "Precio 40% menor que servicios competidores, más contenido.",
    conecta: "Prueba gratis por 30 días, cancela cuando quieras.",
    decide: "Plan familiar: 4 pantallas simultáneas por solo $25.000/mes.",
    descubre: "Con tu plan activo, descubre los estrenos y eventos exclusivos de cada mes.",
  },
  Retail: {
    contexto:
      "Una persona busca equipar su hogar con electrodomésticos eficientes.",
    conoce: "Los electrodomésticos más eficientes para tu hogar moderno.",
    encuentra:
      "Ahorro de energía hasta 50%, tecnología inteligente, diseño premium.",
    atrae:
      "Garantía extendida, instalación incluida, mejor precio garantizado.",
    conecta: "Visita showroom o programa asesoría virtual.",
    decide: "Cyber Monday: hasta 40% de descuento + 6 meses sin intereses.",
    descubre: "Ya instalado, descubre las funciones inteligentes que ahorran en tu factura.",
  },
  Turismo: {
    contexto:
      "Una pareja planea su próximo viaje por carretera y quiere llegar sin sorpresas.",
    conoce: "Descubre destinos cercanos para escaparte este puente festivo.",
    encuentra: "Rutas con paradas gastronómicas, peajes y clima en un solo lugar.",
    atrae: "Hospedajes con cancelación gratuita y 30% menos que en temporada alta.",
    conecta: "Un asesor de viajes te arma el itinerario por chat, sin costo.",
    decide: "Reserva hoy y paga en cuotas sin intereses hasta en 6 meses.",
    descubre: "Ya en el viaje, descubre los planes y restaurantes que casi nadie conoce.",
  },
  B2B: {
    contexto:
      "Un empresario quiere digitalizar su operación para vender más y gastar menos.",
    conoce: "Las empresas que digitalizan sus procesos ganan tiempo para crecer.",
    encuentra: "Facturación, inventario y atención al cliente conectados en una sola plataforma.",
    atrae: "Pymes como la tuya reducen costos operativos hasta 25% en el primer año.",
    conecta: "Diagnóstico gratuito de tu operación con un especialista.",
    decide: "Implementación en 15 días y primer mes sin costo.",
    descubre: "Ya implementado, descubre reportes que muestran dónde está tu próxima oportunidad.",
  },
  Hogar: {
    contexto:
      "Una familia busca su primera vivienda y quiere saber cuánto puede financiar.",
    conoce: "Conocer cuánto puedes financiar es el primer paso para encontrar tu hogar.",
    encuentra: "Proyectos de vivienda cerca de tu trabajo, con subsidio y crédito en un solo lugar.",
    atrae: "Cuotas desde el valor de un arriendo, con tasas preferenciales.",
    conecta: "Simula tu crédito hipotecario y agenda una visita a la sala de ventas.",
    decide: "Separa tu apartamento este mes con una cuota inicial reducida.",
    descubre: "Ya en casa, descubre cómo hacerla más eficiente y conectada.",
  },
};

// Aprendizajes y revelaciones de la experiencia journey
export const REVELACIONES_JOURNEY = {
  titulo: "Tres aprendizajes clave:",
  aprendizajes: [
    {
      numero: "1️⃣",
      texto: "La decisión no ocurre en un solo momento",
      detalle: "Se construye desde etapas tempranas del journey.",
    },
    {
      numero: "2️⃣",
      texto:
        "El insight correcto cambia la percepción de marca antes de la compra",
      detalle:
        "No se trata solo de promociones, sino de crear valor en cada etapa.",
    },
    {
      numero: "3️⃣",
      texto:
        "La comunicación más efectiva es la que acompaña el journey completo",
      detalle: "Cada etapa requiere un mensaje diferente pero coherente.",
    },
  ],
  cierre:
    "La pregunta no es solo dónde pautar… es qué decir en cada momento del journey. Y ahí es donde una solución como Claro Media permite activar: descubrimiento, consideración y decisión con data real de audiencias.",
};

/**
 * Insights derivados de la experiencia: estilo de vida elegido + benchmark de
 * interacción de la categoría. Se anteponen a los insights fijos del sector.
 * @param {Object} estilo - Estilo de vida seleccionado (puede ser null)
 * @param {string} sector
 * @returns {string[]}
 */
export const construirInsightsDeExperiencia = (estilo, sector) => {
  const insights = [];

  if (estilo) {
    insights.push(`${estilo.dato} ${interpretacionNarrada(estilo)}`);
    insights.push(
      `El estilo de vida "${estilo.nombre}" conduce al sector ${estilo.sectorPrincipal} y abre oportunidad en ${estilo.sectoresConectados.join(", ")}.`,
    );
  }

  const lider = formatoLiderPorSector(sector);
  const benchmark = obtenerBenchmarkPorSector(sector);
  if (lider && benchmark) {
    const referencia = benchmark.esReferencia
      ? ` (categoría de referencia: ${benchmark.categoria})`
      : "";
    insights.push(
      `En tu categoría${referencia} el formato con mayor interacción es ${lider.formato}, con ${formatearInteraccion(lider.interaccion)} de respuesta.`,
    );
  }

  return insights;
};

/**
 * Propuesta estratégica calculada localmente (fallback cuando la IA no responde).
 * @param {Object} userData - Datos recopilados durante la experiencia
 * @returns {Object}
 */
export const generarPropuestaEstrategica = (userData) => {
  const {
    sector,
    genero,
    edad,
    nivelSocioeconomico,
    afinidades,
    nombre,
    empresa,
    correo,
    celular,
    estiloVida,
    respuestaEstilo,
    etapaJourney,
    presupuesto,
  } = userData;

  const estilo = obtenerEstiloPorNombre(estiloVida);
  const insightsGeoespaciales = INSIGHTS_GEOESPACIALES[sector] || [];
  const afinidadesSector = AFINIDADES_POR_SECTOR[sector] || [];
  const benchmark = obtenerBenchmarkPorSector(sector);
  const formatoLider = formatoLiderPorSector(sector);

  const insights = [
    ...construirInsightsDeExperiencia(estilo, sector),
    ...(INSIGHTS_POR_SECTOR[sector] || []),
  ];

  // Calcular valor de propuesta
  const valorPropuesta = calcularValorPropuesta({
    genero,
    edad: Array.isArray(edad) ? edad : [edad],
    nivelSocioeconomico: Array.isArray(nivelSocioeconomico)
      ? nivelSocioeconomico
      : [nivelSocioeconomico],
  });

  // Recomendar paquete comercial
  const recomendacion = recomendarPaquete({
    presupuesto: presupuesto || 0,
    alcancePotencial: valorPropuesta.alcanceTotalNumerico,
    sector,
    etapaJourney,
    audiencia: {
      genero,
      edad: Array.isArray(edad) ? edad.join(", ") : edad,
      nivelSocioeconomico: Array.isArray(nivelSocioeconomico)
        ? nivelSocioeconomico.join(", ")
        : nivelSocioeconomico,
    },
  });

  const recomendaciones = [
    `Enfoque estratégico en ${sector.toLowerCase()} considerando el perfil demográfico seleccionado`,
    `Activación de contenidos basados en las afinidades: ${(afinidades || afinidadesSector).slice(0, 3).join(", ")}`,
    `Optimización de campañas según la ruta de comportamiento: ${RUTA_COMPORTAMIENTO.join(" → ")}`,
    `Segmentación geográfica basada en insights de ubicación y comportamiento`,
  ];

  if (formatoLider) {
    recomendaciones.push(
      `Priorizar ${formatoLider.formato} en la mezcla de medios: es el formato de mayor interacción en tu categoría`,
    );
  }

  if (estilo) {
    recomendaciones.push(
      `Construir el mensaje desde el estilo de vida "${estilo.nombre}", conectando ${estilo.afinidades.join(" y ")}`,
    );
  }

  return {
    sector,
    nombre,
    empresa,
    correo,
    celular,
    audiencia: {
      genero,
      edad,
      nivelSocioeconomico,
    },
    afinidades: afinidades || afinidadesSector,
    estiloVida: construirResumenEstilo(estilo, respuestaEstilo),
    benchmarkCategoria: benchmark,
    insights,
    insightsGeoespaciales,
    recomendaciones,
    proximosPasos: [
      "Activar campañas en zonas de alta concentración",
      "Personalizar mensajes según afinidades identificadas",
      "Implementar seguimiento en tiempo real de conversiones",
      "Optimizar presupuesto hacia segmentos de mayor rendimiento",
    ],
    valorPropuesta: {
      alcanceTotal: valorPropuesta.alcanceTotal,
      alcanceTotalNumerico: valorPropuesta.alcanceTotalNumerico,
      banderasPrincipales: valorPropuesta.banderasPrincipales,
    },
    paqueteRecomendado: {
      paquete: recomendacion.paquete,
      razonamiento: recomendacion.razonamiento,
      alternativas: recomendacion.alternativas,
      mensajePersonalizado: recomendacion.mensajePersonalizado,
    },
  };
};
