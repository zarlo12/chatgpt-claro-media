// Datos mock basados en el CSV del agente de IA de Claro Media

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

export const generarPropuestaEstrategica = (userData) => {
  const { sector, genero, edad, nivelSocioeconomico, afinidades } = userData;

  const insights = INSIGHTS_POR_SECTOR[sector] || [];
  const afinidadesSector = AFINIDADES_POR_SECTOR[sector] || [];

  return {
    sector,
    audiencia: {
      genero,
      edad,
      nivelSocioeconomico,
    },
    afinidades: afinidades || afinidadesSector,
    insights,
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
  };
};
