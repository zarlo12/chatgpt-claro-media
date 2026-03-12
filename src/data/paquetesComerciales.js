/**
 * Paquetes Comerciales - Rueda de Negocios 2026
 * Claro Media - Soluciones DATA TECH
 *
 * Basado en: documentosAgente/Rueda de Negocios 2026.pdf
 */

export const PAQUETES_COMERCIALES = [
  {
    id: "vip",
    nombre: "VIP",
    productos: 12,
    precio: 220000000,
    precioPreventa: 107892900,
    descuento: "51% de descuento",
    descripcion:
      "Paquete premium con máxima cobertura multimedia, ideal para campañas de alto impacto con alcance masivo en TV, digital, data y experiencias interactivas.",
    categoriaPresupuesto: "alto", // >150M
    alcanceIdeal: ">2M usuarios",
    componentes: [
      {
        nombre: "PUSH MULTIMEDIA",
        detalle: "5001 a 10000 clics Segmentado",
        alcance: "13.034 clics",
      },
      {
        nombre: "RRSS Post video",
        detalle: "Instagram + Facebook con data",
        alcance: "347.109 Impresiones",
      },
      {
        nombre: "DISPLAY NAL",
        detalle: "Display nacional",
        alcance: "1'678.086 Impresiones",
      },
      {
        nombre: "Post + Historia",
        detalle: "Contenido orgánico",
        alcance: "N/A",
      },
      {
        nombre: "NATIVE",
        detalle: "Publicidad nativa",
        alcance: "1'627.148 Impresiones",
      },
      {
        nombre: "DATA REWARDS",
        detalle: "Incluye paquete de datos",
        alcance: "13.333 Views",
      },
      {
        nombre: "MENCION COMERCIAL",
        detalle: '15 de 20" RED TV / RED+ Not',
        alcance: "N/A",
      },
      {
        nombre: "COMERCIALES",
        detalle: '110 DE 10" Red+ TV / RED+ Not',
        alcance: "N/A",
      },
      {
        nombre: "REVISTA 15 MINUTOS",
        detalle: "1 página + Free press",
        alcance: "N/A",
      },
      {
        nombre: "Contenido Portal",
        detalle: "RRSS + Display + Native",
        alcance: "N/A",
      },
      {
        nombre: "SHOPPING LIVE",
        detalle: "Experiencia de compra en vivo",
        alcance: "N/A",
      },
      {
        nombre: "SMS Segmentado",
        detalle: "1.000 a 100.000 envíos",
        alcance: "21.823 envíos",
      },
    ],
    beneficios: [
      "Máxima cobertura multimedia (TV + Digital + Mobile + Data)",
      "Experiencias interactivas (Shopping Live)",
      "Alto alcance en impresiones (>3.3M impresiones totales)",
      "Segmentación avanzada con data de primera mano",
      "Contenido orgánico + pautado en RRSS",
      "Free press en Revista 15 Minutos",
    ],
    recomendadoPara: [
      "Lanzamientos de productos de alto perfil",
      "Campañas nacionales de awareness masivo",
      "Marcas premium con presupuestos altos",
      "Sectores: Tecnología, Automotriz, Banca, Retail (grandes marcas)",
    ],
    impuestos: "+ impuestos (IVA 19% + Impoconsumo 4% en mobile)",
  },
  {
    id: "editorial-red-plus",
    nombre: "EDITORIAL RED+",
    productos: 7,
    precio: 123000000,
    precioPreventa: 75000000,
    descuento: "39% de descuento",
    descripcion:
      "Paquete enfocado en contenido editorial y presencia en RED+, ideal para posicionamiento de marca con integración entre TV y digital.",
    categoriaPresupuesto: "medio-alto", // 80M-150M
    alcanceIdeal: "1M-2M usuarios",
    componentes: [
      {
        nombre: "COMERCIALES",
        detalle: '55 DE 10" en TV (RED+ / RED+ Not)',
        alcance: "N/A",
      },
      {
        nombre: "PUSH MULTIMEDIA",
        detalle: "5001 a 10000 clics Segmentado",
        alcance: "10.000 CLICS",
      },
      {
        nombre: "PATROCINIO DE SECCIÓN",
        detalle: 'RED+ / RED+ Not, 14 DE 10" en TV',
        alcance: "N/A",
      },
      {
        nombre: "MENCIONES COMERCIALES",
        detalle: 'RED+ / RED+ Not, 14 DE 20" en TV',
        alcance: "N/A",
      },
      {
        nombre: "REVISTA 15 MINUTOS",
        detalle: "1/2 página",
        alcance: "N/A",
      },
      {
        nombre: "Post",
        detalle: "Contenido orgánico",
        alcance: "N/A",
      },
      {
        nombre: "DATA REWARDS",
        detalle: "Incluye paquete de datos",
        alcance: "4.834 VIEWS",
      },
    ],
    beneficios: [
      "Patrocinio exclusivo de sección en RED+",
      "Integración TV + Digital con contenido editorial",
      "Presencia en revista impresa (15 Minutos)",
      "Comerciales + menciones en programación RED+",
      "Segmentación avanzada con Push Multimedia",
      "Reward marketing con paquetes de datos",
    ],
    recomendadoPara: [
      "Marcas que buscan posicionamiento editorial",
      "Campañas de awareness en TV + digital",
      "Sectores: Entretenimiento, Alimentación, Servicios",
      "Empresas con mensajes que requieren credibilidad editorial",
    ],
    impuestos: "+ impuestos (IVA 19% + Impoconsumo 4% en mobile)",
  },
  {
    id: "smart",
    nombre: "SMART",
    productos: 7,
    precio: 55000000,
    precioPreventa: 40000000,
    descuento: "27% de descuento",
    descripcion:
      "Paquete equilibrado con presencia en TV, digital y mobile. Óptimo para campañas con presupuesto moderado que buscan alcance efectivo.",
    categoriaPresupuesto: "medio", // 35M-80M
    alcanceIdeal: "500K-1M usuarios",
    componentes: [
      {
        nombre: "COMERCIALES",
        detalle: '55 DE 10" en TV (RED+ / RED+ Not)',
        alcance: "N/A",
      },
      {
        nombre: "REVISTA 15 MINUTOS",
        detalle: "1 página",
        alcance: "N/A",
      },
      {
        nombre: "RRSS Post",
        detalle: "Contenido orgánico",
        alcance: "N/A",
      },
      {
        nombre: "DISPLAY NAL",
        detalle: "Display nacional",
        alcance: "1'174.660 Impresiones",
      },
      {
        nombre: "ALTO IMPACTO",
        detalle: "Formatos de impacto",
        alcance: "3.000 unidades",
      },
      {
        nombre: "SMS Segmentado",
        detalle: "1.000 a 100.000 envíos",
        alcance: "19.204 envíos",
      },
      {
        nombre: "PUSH MULTIMEDIA",
        detalle: "+10000 clics Segmentado",
        alcance: "14.893 Clics",
      },
    ],
    beneficios: [
      'Presencia en TV con 55 comerciales de 10"',
      "Alto impacto digital con formatos especiales",
      "Alcance móvil directo con SMS segmentado",
      "Display nacional con +1M de impresiones",
      "Contenido en revista impresa (página completa)",
      "Push notifications con alto volumen de clics",
    ],
    recomendadoPara: [
      "Campañas tácticas con objetivos específicos",
      "Lanzamientos de productos nuevos",
      "Promociones y activaciones estacionales",
      "Sectores: Retail, Telecomunicaciones, Salud, Educación",
    ],
    impuestos: "+ impuestos (IVA 19% + Impoconsumo 4% en mobile)",
  },
  {
    id: "basic",
    nombre: "BASIC",
    productos: 6,
    precio: 20048500,
    precioPreventa: 17000000,
    descuento: "27% de descuento",
    descripcion:
      "Paquete de entrada ideal para pequeñas y medianas empresas. Combina TV, digital y mobile con un presupuesto accesible.",
    categoriaPresupuesto: "bajo", // <35M
    alcanceIdeal: "200K-500K usuarios",
    componentes: [
      {
        nombre: "COMERCIALES",
        detalle: '20 DE 10" en TV (RED+ / RED+ Not)',
        alcance: "N/A",
      },
      {
        nombre: "RRSS HISTORIA",
        detalle: "Contenido orgánico",
        alcance: "N/A",
      },
      {
        nombre: "REVISTA 15 MINUTOS",
        detalle: "1/3 página",
        alcance: "N/A",
      },
      {
        nombre: "NATIVE",
        detalle: "Publicidad nativa",
        alcance: "701.708 Impresiones",
      },
      {
        nombre: "DISPLAY NAL",
        detalle: "Display nacional",
        alcance: "423.297 Impresiones",
      },
      {
        nombre: "PUSH MULTIMEDIA",
        detalle: "1500 - 5000 clics Segmentado",
        alcance: "3.717 Clics",
      },
    ],
    beneficios: [
      "Acceso a TV con 20 comerciales",
      "Presencia digital con +1M impresiones totales",
      "Publicidad nativa para contenido menos intrusivo",
      "Revista impresa con espacio editorial",
      "Contenido orgánico en redes sociales",
      "Presupuesto accesible con descuento en preventa",
    ],
    recomendadoPara: [
      "PyMEs que inician en medios masivos",
      "Campañas locales o regionales",
      "Testing de mercado con inversión controlada",
      "Sectores: Servicios locales, Emprendimientos, Educación",
    ],
    impuestos: "+ impuestos (IVA 19% + Impoconsumo 4% en mobile)",
  },
];

/**
 * Función para recomendar el paquete más adecuado según perfil del cliente
 * @param {Object} perfil - Perfil del cliente con presupuesto, alcance potencial, sector
 * @returns {Object} - Paquete recomendado con justificación
 */
export const recomendarPaquete = (perfil) => {
  const { presupuesto, alcancePotencial, sector, audiencia } = perfil;

  // Normalizar presupuesto a número si viene como string
  const presupuestoNum =
    typeof presupuesto === "string"
      ? parseInt(presupuesto.replace(/\D/g, ""))
      : presupuesto || 0;

  // Normalizar alcance potencial
  const alcanceNum =
    typeof alcancePotencial === "string"
      ? parseInt(alcancePotencial.replace(/\D/g, ""))
      : alcancePotencial || 0;

  console.log("📊 Evaluando recomendación de paquete:");
  console.log("  - Presupuesto:", presupuestoNum.toLocaleString("es-CO"));
  console.log(
    "  - Alcance potencial:",
    alcanceNum.toLocaleString("es-CO"),
    "usuarios",
  );
  console.log("  - Sector:", sector);
  console.log("  - Audiencia:", audiencia);

  // Sistema de puntuación para cada paquete
  let scores = {
    vip: 0,
    "editorial-red-plus": 0,
    smart: 0,
    basic: 0,
  };
  let razonamiento = [];

  // FACTOR 1: ALCANCE POTENCIAL (peso: 40%)
  if (alcanceNum >= 3000000) {
    scores.vip += 40;
    scores["editorial-red-plus"] += 20;
    scores.smart += 10;
    razonamiento.push(
      `Alcance masivo (${(alcanceNum / 1000000).toFixed(1)}M usuarios) requiere máxima cobertura`,
    );
  } else if (alcanceNum >= 2000000) {
    scores.vip += 30;
    scores["editorial-red-plus"] += 35;
    scores.smart += 25;
    razonamiento.push(
      `Alcance alto (${(alcanceNum / 1000000).toFixed(1)}M usuarios) ideal para paquetes premium`,
    );
  } else if (alcanceNum >= 1000000) {
    scores["editorial-red-plus"] += 20;
    scores.smart += 40;
    scores.basic += 15;
    razonamiento.push(
      `Alcance medio (${(alcanceNum / 1000000).toFixed(1)}M usuarios) óptimo para SMART`,
    );
  } else if (alcanceNum >= 500000) {
    scores.smart += 30;
    scores.basic += 35;
    razonamiento.push(
      `Alcance moderado (${Math.round(alcanceNum / 1000)}K usuarios) eficiente con BASIC/SMART`,
    );
  } else {
    scores.basic += 40;
    scores.smart += 20;
    razonamiento.push(
      `Alcance focalizado (${Math.round(alcanceNum / 1000)}K usuarios) ideal para testing`,
    );
  }

  // FACTOR 2: SECTOR (peso: 30%)
  const sectorLower = sector?.toLowerCase() || "";

  // Sectores premium que requieren alto awareness
  if (
    [
      "tecnología",
      "tecnologia",
      "banca",
      "financiero",
      "automotriz",
      "automotor",
    ].some((s) => sectorLower.includes(s))
  ) {
    scores.vip += 30;
    scores["editorial-red-plus"] += 20;
    scores.smart += 10;
    razonamiento.push(
      `Sector ${sector} beneficia de campañas de alto impacto y awareness masivo`,
    );
  }
  // Sectores con foco editorial
  else if (
    [
      "entretenimiento",
      "moda",
      "alimentación",
      "alimentacion",
      "servicios",
    ].some((s) => sectorLower.includes(s))
  ) {
    scores["editorial-red-plus"] += 35;
    scores.smart += 20;
    scores.vip += 10;
    razonamiento.push(
      `Sector ${sector} se potencia con contenido editorial y branded content`,
    );
  }
  // Sectores tácticos (resultados directos)
  else if (
    [
      "retail",
      "telecomunicaciones",
      "salud",
      "educación",
      "educacion",
      "gobierno",
    ].some((s) => sectorLower.includes(s))
  ) {
    scores.smart += 30;
    scores.basic += 20;
    scores["editorial-red-plus"] += 10;
    razonamiento.push(
      `Sector ${sector} ideal para campañas tácticas con objetivos específicos`,
    );
  }
  // Sector consumo masivo
  else if (
    ["consumo masivo", "consumo", "masivo"].some((s) => sectorLower.includes(s))
  ) {
    scores.vip += 25;
    scores.smart += 30;
    scores["editorial-red-plus"] += 15;
    razonamiento.push(
      `Sector ${sector} requiere alcance masivo multiplataforma`,
    );
  }
  // Default para sectores no específicos
  else {
    scores.smart += 20;
    scores.basic += 15;
  }

  // FACTOR 3: PERFIL DE AUDIENCIA (peso: 20%)
  const audienciaGenero = audiencia?.genero?.toLowerCase() || "";
  const audienciaEdad = audiencia?.edad?.toLowerCase() || "";
  const audienciaNSE = audiencia?.nivelSocioeconomico?.toLowerCase() || "";

  // Género segmentado necesita más enfoque
  if (audienciaGenero === "mujeres" || audienciaGenero === "hombres") {
    scores.smart += 15;
    scores["editorial-red-plus"] += 10;
    razonamiento.push(
      `Audiencia segmentada por género permite enfoque preciso`,
    );
  } else {
    scores.vip += 10;
    scores.smart += 5;
  }

  // NSE Alto requiere paquetes premium
  if (
    audienciaNSE.includes("alto") ||
    audienciaNSE.includes("e5") ||
    audienciaNSE.includes("e6")
  ) {
    scores.vip += 20;
    scores["editorial-red-plus"] += 15;
    razonamiento.push(
      `NSE alto justifica inversión en paquetes premium con mayor ROI`,
    );
  }
  // NSE Medio es versátil
  else if (
    audienciaNSE.includes("medio") ||
    audienciaNSE.includes("e3") ||
    audienciaNSE.includes("e4")
  ) {
    scores.smart += 20;
    scores["editorial-red-plus"] += 10;
    scores.basic += 5;
  }
  // NSE Bajo necesita eficiencia
  else if (
    audienciaNSE.includes("bajo") ||
    audienciaNSE.includes("e1") ||
    audienciaNSE.includes("e2")
  ) {
    scores.basic += 20;
    scores.smart += 10;
  }

  // Jóvenes (18-34) prefieren digital/mobile
  if (
    audienciaEdad.includes("18") ||
    audienciaEdad.includes("24") ||
    audienciaEdad.includes("25") ||
    audienciaEdad.includes("34")
  ) {
    scores.smart += 10;
    scores.vip += 5;
    razonamiento.push(
      `Audiencia joven responde mejor a estrategias digitales y mobile`,
    );
  }
  // Adultos (35-54) balance TV + Digital
  else if (
    audienciaEdad.includes("35") ||
    audienciaEdad.includes("44") ||
    audienciaEdad.includes("45") ||
    audienciaEdad.includes("54")
  ) {
    scores["editorial-red-plus"] += 10;
    scores.smart += 10;
  }
  // Mayores (55+) más TV tradicional
  else if (
    audienciaEdad.includes("55") ||
    audienciaEdad.includes("64") ||
    audienciaEdad.includes("65") ||
    audienciaEdad.includes("75")
  ) {
    scores["editorial-red-plus"] += 15;
    scores.vip += 10;
  }

  // FACTOR 4: PRESUPUESTO (peso: 10% - solo si existe)
  if (presupuestoNum >= 150000000) {
    scores.vip += 10;
    razonamiento.push("Presupuesto alto permite máxima cobertura multimedia");
  } else if (presupuestoNum >= 80000000) {
    scores["editorial-red-plus"] += 10;
  } else if (presupuestoNum >= 35000000) {
    scores.smart += 10;
  } else if (presupuestoNum > 0) {
    scores.basic += 10;
  }

  // Determinar paquete ganador
  console.log("📊 Puntuaciones finales:", scores);

  const paqueteId = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b,
  );

  const paqueteRecomendado =
    PAQUETES_COMERCIALES.find((p) => p.id === paqueteId) ||
    PAQUETES_COMERCIALES[2];

  // 4. Calcular ROI estimado (impresiones totales / inversión)
  const impresionesTotales = calcularImpresionesTotales(paqueteRecomendado);
  const costoMilImpresiones =
    paqueteRecomendado.precioPreventa / (impresionesTotales / 1000);

  razonamiento.push(
    `CPM estimado: $${Math.round(costoMilImpresiones).toLocaleString("es-CO")} - excelente relación costo-beneficio`,
  );

  console.log(
    "🎯 Paquete recomendado:",
    paqueteRecomendado.nombre,
    "- Score:",
    scores[paqueteId],
  );

  return {
    paquete: paqueteRecomendado,
    razonamiento,
    alternativas: obtenerAlternativas(paqueteRecomendado),
    mensajePersonalizado: generarMensajePersonalizado(
      paqueteRecomendado,
      perfil,
    ),
  };
};

/**
 * Calcular total de impresiones del paquete
 */
const calcularImpresionesTotales = (paquete) => {
  let total = 0;
  paquete.componentes.forEach((comp) => {
    const match = comp.alcance.match(/[\d']+/);
    if (match) {
      total += parseInt(match[0].replace(/'/g, ""));
    }
  });
  return total || 1000000; // Fallback si no hay data
};

/**
 * Obtener paquetes alternativos (uno menor y uno mayor)
 */
const obtenerAlternativas = (paqueteActual) => {
  const index = PAQUETES_COMERCIALES.findIndex(
    (p) => p.id === paqueteActual.id,
  );
  const alternativas = [];

  if (index > 0) {
    alternativas.push({
      tipo: "menor",
      paquete: PAQUETES_COMERCIALES[index - 1],
      razon: "Opción más económica con cobertura reducida",
    });
  }

  if (index < PAQUETES_COMERCIALES.length - 1) {
    alternativas.push({
      tipo: "mayor",
      paquete: PAQUETES_COMERCIALES[index + 1],
      razon: "Opción premium con mayor alcance y componentes",
    });
  }

  return alternativas;
};

/**
 * Generar mensaje personalizado para la recomendación
 */
const generarMensajePersonalizado = (paquete, perfil) => {
  const { sector, audiencia } = perfil;

  return `Basado en tu perfil de audiencia (${audiencia?.genero}, ${audiencia?.edad}, NSE ${audiencia?.nivelSocioeconomico}) y sector ${sector}, el paquete **${paquete.nombre}** ofrece la mejor combinación de alcance, inversión y resultados para tu campaña.`;
};

/**
 * Obtener paquete por ID
 */
export const obtenerPaquetePorId = (id) => {
  return PAQUETES_COMERCIALES.find((p) => p.id === id);
};

/**
 * Listar todos los paquetes ordenados por precio
 */
export const listarPaquetes = () => {
  return [...PAQUETES_COMERCIALES].sort((a, b) => b.precio - a.precio);
};

export default {
  PAQUETES_COMERCIALES,
  recomendarPaquete,
  obtenerPaquetePorId,
  listarPaquetes,
};
