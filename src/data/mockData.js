// Datos mock basados en el CSV del agente de IA de Claro Media

import { calcularValorPropuesta } from "./banderasDemograficas";

export const SECTORES = [
  "Financiero",
  "Automotor",
  "Educación",
  "Gobierno",
  "Salud",
  "Tecnología",
  "Moda",
  "Entretenimiento",
  "Retail",
  "Consumo Masivo",
];

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

// Todas las afinidades disponibles con sus iconos
export const TODAS_AFINIDADES = [
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
  "Consumo Masivo": [
    "Entretenimiento y OTT",
    "Tecnología",
    "Centro comercial",
    "Turismo",
  ],
};

export const RUTA_COMPORTAMIENTO = [
  "Descubre",
  "Explora",
  "Compara",
  "Decide",
  "Compra",
];

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
  "Consumo Masivo": [
    "Usuarios que visitan supermercados y grandes superficies presentan alta afinidad con contenidos sobre productos para mascotas.",
    "Usuarios de zonas como Usaquén y Chapinero muestran alta afinidad con alimentación saludable y productos orgánicos.",
    "Personas que asisten a conciertos y eventos masivos incrementan el uso de apps de domicilios como Rappi.",
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
  "Consumo Masivo": [],
};

// Ejemplos de mensajes por etapa del customer journey según sector
export const MENSAJES_JOURNEY_POR_SECTOR = {
  Financiero: {
    contexto:
      "Una familia está considerando opciones de inversión para el futuro de sus hijos.",
    descubre:
      "Existen soluciones de inversión diseñadas para el futuro de tu familia.",
    explora:
      "Planes de ahorro con rendimientos garantizados y respaldo bancario.",
    compara: "Tasas de interés 2% superiores al promedio del mercado.",
    decide: "Asesoría personalizada gratuita con expertos financieros.",
    compra: "Abre tu cuenta hoy y recibe bono de bienvenida de $500.",
  },
  Automotor: {
    contexto:
      "Un cliente busca su primer vehículo eléctrico, valorando movilidad sostenible.",
    descubre: "Descubre los vehículos eléctricos más eficientes del mercado.",
    explora: "Autonomía de 400km, carga rápida y cero emisiones.",
    compara: "30% menos costo de mantenimiento vs vehículos tradicionales.",
    decide: "Prueba de manejo a domicilio sin compromiso.",
    compra: "Financiamiento especial 0% de interés por 12 meses.",
  },
  Educación: {
    contexto: "Un joven profesional busca especializarse mientras trabaja.",
    descubre: "Programas de maestría 100% virtuales y flexibles.",
    explora: "Horarios adaptables, profesores con experiencia internacional.",
    compara: "Certificación avalada, mismo título que modalidad presencial.",
    decide: "Sesión informativa personalizada con coordinador académico.",
    compra: "Matrícula con 20% de descuento, inicia el próximo mes.",
  },
  Gobierno: {
    contexto:
      "Una comunidad necesita información sobre programas de vivienda social.",
    descubre: "Nuevos programas de vivienda para familias colombianas.",
    explora:
      "Subsidios de hasta el 50% del valor, créditos con tasas preferenciales.",
    compara:
      "Proyectos en ubicaciones estratégicas con acceso a transporte público.",
    decide: "Jornada de inscripción en tu municipio este fin de semana.",
    compra: "Separa tu vivienda con solo el 10% de cuota inicial.",
  },
  Salud: {
    contexto:
      "Una persona activa busca complementar su plan de salud para bienestar integral.",
    descubre: "Planes de salud que incluyen medicina preventiva y bienestar.",
    explora: "Telemedicina 24/7, gimnasios afiliados, nutrición personalizada.",
    compara:
      "Cobertura más amplia con menores copagos que planes tradicionales.",
    decide: "Evaluación médica inicial sin costo.",
    compra: "Primer mes gratis, activa tu plan hoy mismo.",
  },
  Tecnología: {
    contexto:
      "Un emprendedor necesita equipar su oficina con tecnología moderna.",
    descubre: "Soluciones tecnológicas para impulsar tu negocio.",
    explora: "Laptops, tablets y software colaborativo en un solo paquete.",
    compara:
      "Rendimiento superior, garantía extendida y soporte técnico incluido.",
    decide: "Demo en vivo de cómo funciona integrado en tu negocio.",
    compra: "Pago en 18 meses sin intereses, envío e instalación gratis.",
  },
  Moda: {
    contexto:
      "Una persona busca renovar su guardarropa con piezas sostenibles y versátiles.",
    descubre: "Moda consciente: estilo y sostenibilidad en cada prenda.",
    explora: "Materiales eco-friendly, diseños atemporales, producción ética.",
    compara: "Calidad superior a fast fashion, durabilidad garantizada.",
    decide: "Asesoría de estilo personal virtual gratuita.",
    compra: "Promoción: 3x2 en toda la colección primavera-verano.",
  },
  Entretenimiento: {
    contexto:
      "Una familia busca opciones de entretenimiento para el fin de semana.",
    descubre: "Miles de películas, series y eventos en vivo en un solo lugar.",
    explora: "Contenido exclusivo, estrenos simultáneos, sin publicidad.",
    compara: "Precio 40% menor que servicios competidores, más contenido.",
    decide: "Prueba gratis por 30 días, cancela cuando quieras.",
    compra: "Plan familiar: 4 pantallas simultáneas por solo $25.000/mes.",
  },
  Retail: {
    contexto:
      "Una persona busca equipar su hogar con electrodomésticos eficientes.",
    descubre: "Los electrodomésticos más eficientes para tu hogar moderno.",
    explora:
      "Ahorro de energía hasta 50%, tecnología inteligente, diseño premium.",
    compara:
      "Garantía extendida, instalación incluida, mejor precio garantizado.",
    decide: "Visita showroom o programa asesoría virtual.",
    compra: "Cyber Monday: hasta 40% de descuento + 6 meses sin intereses.",
  },
  "Consumo Masivo": {
    contexto:
      "Una familia busca productos más saludables para su alimentación diaria.",
    descubre: "Hay nuevas bebidas hechas con ingredientes 100% naturales.",
    explora: "Sin conservantes, con fruta real y vitaminas esenciales.",
    compara: "30% menos azúcar que otras marcas, certificación orgánica.",
    decide: "Promoción en tu tienda cercana, encuentra el punto de venta.",
    compra: "Llévate 2 y paga 1 en toda la línea familiar.",
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

export const generarPropuestaEstrategica = (userData) => {
  const {
    sector,
    genero,
    edad,
    nivelSocioeconomico,
    afinidades,
    nombre,
    correo,
    celular,
  } = userData;

  const insights = INSIGHTS_POR_SECTOR[sector] || [];
  const insightsGeoespaciales = INSIGHTS_GEOESPACIALES[sector] || [];
  const afinidadesSector = AFINIDADES_POR_SECTOR[sector] || [];

  // Calcular valor de propuesta
  const valorPropuesta = calcularValorPropuesta({
    genero,
    edad: Array.isArray(edad) ? edad : [edad],
    nivelSocioeconomico,
  });

  return {
    sector,
    nombre,
    correo,
    celular,
    audiencia: {
      genero,
      edad,
      nivelSocioeconomico,
    },
    afinidades: afinidades || afinidadesSector,
    insights,
    insightsGeoespaciales,
    recomendaciones: [
      `Enfoque estratégico en ${sector.toLowerCase()} considerando el perfil demográfico seleccionado`,
      `Activación de contenidos basados en las afinidades: ${afinidadesSector.slice(0, 3).join(", ")}`,
      `Optimización de campañas según la ruta de comportamiento: ${RUTA_COMPORTAMIENTO.join(" → ")}`,
      `Segmentación geográfica basada en insights de ubicación y comportamiento`,
    ],
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
  };
};
