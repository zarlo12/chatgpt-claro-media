/**
 * Paquetes Comerciales - Rueda de Negocios 2026 (Experiencias)
 * Claro Media - Soluciones DATA TECH
 *
 * Fuente: nuevoEventoExperiencias/Rueda de Negocios 2026 - 2_OF.pptx
 * Láminas "PAQUETES POR CATEGORIAS".
 *
 * Cada paquete se describe por sus FASES (tal como aparecen en la lámina).
 * Los campos `componentes` y `productos` se derivan de las fases para que
 * exista una sola fuente de verdad.
 */

import { ORDEN_JOURNEY } from "./journey";

const IMPUESTOS = "+ Impuestos (IVA 19% + impoconsumo 4% en mobile)";

/**
 * Definición de los paquetes tal como están en la presentación.
 *
 *  - claim               → bajada de la lámina
 *  - duracion            → vigencia declarada (null si la lámina no la indica)
 *  - etapasJourney       → etapas del customer journey que cubre mejor
 *  - sectoresDestacados  → criterio comercial, ajustable por el equipo
 *  - fases               → estructura numerada de la lámina
 */
const DEFINICION_PAQUETES = [
  {
    id: "elite-investigacion",
    nombre: "ELITE + Investigación",
    claim: "Llega al siguiente nivel",
    descripcion:
      "Investiga y conoce a tu audiencia, y con tus hallazgos crea una conversación propia en TV, aporta conocimiento y sé el líder de la categoría.",
    duracion: "6 meses",
    precio: 336234160,
    precioPreventa: 240000000,
    descuento: "36% de descuento",
    categoriaPresupuesto: "alto",
    etapasJourney: ["Conoce", "Encuentra", "Atrae"],
    sectoresDestacados: ["Gobierno", "Educación", "Consumo Masivo"],
    incluyeProduccion: true,
    fases: [
      {
        nombre: "1. Conoce tu audiencia",
        componentes: [
          {
            nombre: "Analítica geoespacial",
            detalle: "Interés por punto",
            alcance: "Puntos de análisis",
          },
          {
            nombre: "Sondeos",
            detalle: "1 variable de segmentación",
            alcance: "1.000 respuestas",
          },
        ],
      },
      {
        nombre: "2. Crea tu historia",
        componentes: [
          {
            nombre: "Entrevista",
            detalle: "NOT RED+",
            alcance: "3 entrevistas",
          },
          {
            nombre: "Café Claro en el set de la marca",
            detalle: "Bogotá, en vivo",
            alcance: "1 salida",
          },
        ],
      },
      {
        nombre: "3. Aporta conocimiento",
        componentes: [
          {
            nombre: "Sección patrocinada con contenido",
            detalle:
              "NOT RED+. Las secciones viven en fichas de video en Portal RED+, impulsadas por Push",
            alcance: "10 salidas",
          },
          {
            nombre: "Doble página de contenido orgánico",
            detalle: "Revista 15 Minutos",
            alcance: "1 salida",
          },
          {
            nombre: "Notas de contenido",
            detalle: "RED+ Noticias",
            alcance: "3 salidas",
          },
        ],
      },
      {
        nombre: "4. Domina la pantalla",
        componentes: [
          {
            nombre: 'Spots de 20"',
            detalle: "TV RED+ / NOT",
            alcance: "70 salidas",
          },
          {
            nombre: 'Corte único de 10"',
            detalle: "TV RED+ / NOT",
            alcance: "30 salidas",
          },
          {
            nombre: "Superimposiciones",
            detalle: "TV RED+ / NOT",
            alcance: "20 salidas",
          },
        ],
      },
      {
        nombre: "5. Extiende la conversación",
        componentes: [
          {
            nombre: "Nota web",
            detalle: "Portal RED+",
            alcance: "1 nota",
          },
          {
            nombre: "Mensajes RCS",
            detalle: "Mobile segmentado",
            alcance: "142.011 envíos",
          },
          {
            nombre: "Reel",
            detalle: "RRSS NOT RED+",
            alcance: "1 salida",
          },
        ],
      },
    ],
    beneficios: [
      "Arranca con investigación propia: analítica geoespacial y sondeos con 1.000 respuestas",
      "Conversación propia en TV con 3 entrevistas y un Café Claro en el set de la marca",
      "Contenido editorial en NOT RED+, Revista 15 Minutos y RED+ Noticias",
      "120 salidas en TV entre spots, cortes únicos y superimposiciones",
      "Extensión digital con nota web, RCS (142.011 envíos) y reel en redes",
      "Incluye producción",
    ],
    recomendadoPara: [
      "Marcas que necesitan datos antes de definir el mensaje",
      "Campañas de liderazgo de categoría a 6 meses",
      "Sectores: Gobierno, Educación, Consumo Masivo",
      "Proyectos que deben sustentar la estrategia con evidencia",
    ],
  },
  {
    id: "elite-360",
    nombre: "ELITE 360",
    claim: "Llega al siguiente nivel",
    descripcion:
      "Tu marca llega al siguiente nivel: crea una conversación propia en TV, aporta conocimiento, domina la pantalla y lleva ese contenido más allá de la TV, durante 6 meses.",
    duracion: "6 meses",
    precio: 330734160,
    precioPreventa: 200000000,
    descuento: "40% de descuento",
    categoriaPresupuesto: "alto",
    etapasJourney: ["Encuentra", "Atrae", "Conecta"],
    sectoresDestacados: ["Financiero", "Automotor", "Salud"],
    incluyeProduccion: true,
    fases: [
      {
        nombre: "1. Crea tu historia",
        componentes: [
          {
            nombre: "Entrevista",
            detalle: "NOT RED+",
            alcance: "3 entrevistas",
          },
          {
            nombre: "Café Claro en el set de la marca",
            detalle: "Bogotá, en vivo",
            alcance: "1 salida",
          },
        ],
      },
      {
        nombre: "2. Aporta conocimiento",
        componentes: [
          {
            nombre: "Sección patrocinada con contenido",
            detalle:
              "NOT RED+. Las secciones viven en fichas de video en Portal RED+, impulsadas por Push",
            alcance: "10 salidas",
          },
          {
            nombre: "Doble página de contenido orgánico",
            detalle: "Revista 15 Minutos",
            alcance: "1 salida",
          },
          {
            nombre: "Notas de contenido",
            detalle: "RED+ Noticias",
            alcance: "3 salidas",
          },
        ],
      },
      {
        nombre: "3. Domina la pantalla",
        componentes: [
          {
            nombre: 'Spots de 20"',
            detalle: "TV RED+ / NOT",
            alcance: "70 salidas",
          },
          {
            nombre: 'Corte único de 10"',
            detalle: "TV RED+ / NOT",
            alcance: "30 salidas",
          },
          {
            nombre: "Superimposiciones",
            detalle: "TV RED+ / NOT",
            alcance: "20 salidas",
          },
        ],
      },
      {
        nombre: "4. Extiende la conversación",
        componentes: [
          {
            nombre: "Nota web",
            detalle: "Portal RED+",
            alcance: "1 nota",
          },
          {
            nombre: "Mensajes RCS",
            detalle: "Mobile segmentado",
            alcance: "142.011 envíos",
          },
          {
            nombre: "Reel",
            detalle: "RRSS NOT RED+",
            alcance: "1 salida",
          },
        ],
      },
    ],
    beneficios: [
      "Conversación propia en TV: 3 entrevistas y un Café Claro en el set de la marca",
      "Sección patrocinada en NOT RED+ que revive como ficha de video en Portal RED+",
      "Contenido editorial en Revista 15 Minutos y RED+ Noticias",
      "120 salidas en TV entre spots, cortes únicos y superimposiciones",
      "El contenido sale de la TV con nota web, RCS y reel en redes",
      "Incluye producción",
    ],
    recomendadoPara: [
      "Marcas que quieren ser referentes de su categoría",
      "Campañas de 6 meses con narrativa continua",
      "Sectores: Financiero, Automotor, Salud",
      "Mensajes que necesitan credibilidad editorial y televisiva",
    ],
  },
  {
    id: "vip",
    nombre: "VIP",
    claim: "Liderazgo y autoridad de marca",
    descripcion:
      "Una solución integral de 6 meses para fortalecer la presencia de tu marca y conectar con audiencias estratégicas a través de data, contenido y medios.",
    duracion: "6 meses",
    precio: 171779063,
    precioPreventa: 100000000,
    descuento: "40% de descuento",
    categoriaPresupuesto: "medio-alto",
    etapasJourney: ["Conoce", "Encuentra", "Atrae"],
    sectoresDestacados: ["Tecnología", "Salud", "Educación"],
    incluyeProduccion: false,
    fases: [
      {
        nombre: "1. Descubre",
        componentes: [
          {
            nombre: "Sondeos",
            detalle: "Respuestas efectivas",
            alcance: "1.000 respuestas",
          },
          {
            nombre: "Analítica geoespacial",
            detalle: "Punto 1 a 3",
            alcance: "3 puntos",
          },
        ],
      },
      {
        nombre: "2. Construye autoridad",
        componentes: [
          {
            nombre: "Entrevista",
            detalle: "NOT RED+",
            alcance: "1 salida",
          },
          {
            nombre: "Cápsulas / nota pregrabada",
            detalle: "RED TV / RED+ Not",
            alcance: "5 salidas",
          },
          {
            nombre: "Nota destacada + landing",
            detalle: "REDMAS.COM, impulsada por SMS",
            alcance: "19.443 envíos",
          },
          {
            nombre: "Doble página de contenido",
            detalle: "Revista 15 Minutos",
            alcance: "1 salida",
          },
        ],
      },
      {
        nombre: "3. Gana presencia",
        componentes: [
          {
            nombre: "Superimposiciones",
            detalle: "RED TV / RED+ Not",
            alcance: "20 salidas",
          },
          {
            nombre: "Publicación orgánica",
            detalle: "RRSS RED+ Not",
            alcance: "2 salidas",
          },
        ],
      },
      {
        nombre: "4. Activa",
        componentes: [
          {
            nombre: "RCS con agente",
            detalle: "Mobile conversacional",
            alcance: "22.156 envíos",
          },
          {
            nombre: "Display programática",
            detalle: "Segmentado con data",
            alcance: "3.727 clics",
          },
          {
            nombre: "Push Multimedia",
            detalle: "Segmentado con data",
            alcance: "18.583 clics",
          },
        ],
      },
    ],
    beneficios: [
      "Data propia desde el inicio: sondeos y analítica geoespacial en 3 puntos",
      "Autoridad construida con entrevista, cápsulas y contenido en Revista 15 Minutos",
      "Landing de marca en REDMAS.COM impulsada con SMS",
      "Presencia sostenida en TV y redes de RED+",
      "Activación mobile con RCS con agente, display programática y Push Multimedia",
      "Solución integral de data, contenido y medios en un solo paquete",
    ],
    recomendadoPara: [
      "Marcas que buscan autoridad sin la inversión de un paquete ELITE",
      "Campañas de 6 meses que combinan data, contenido y medios",
      "Sectores: Tecnología, Salud, Educación",
      "Estrategias que necesitan cubrir todo el embudo con un presupuesto medio",
    ],
  },
  {
    id: "connect",
    nombre: "CONNECT",
    claim: "Acerca a tu marca",
    descripcion:
      "Genera interés en audiencias relevantes y llévalas a descubrir más sobre tu marca a través de contenidos y formatos que impulsan la interacción.",
    duracion: null,
    precio: 157560000,
    precioPreventa: 150000000,
    descuento: "5% de descuento",
    categoriaPresupuesto: "medio-alto",
    etapasJourney: ["Conecta", "Decide", "Descubre"],
    sectoresDestacados: ["Retail", "Consumo Masivo", "Entretenimiento"],
    incluyeProduccion: false,
    fases: [
      {
        nombre: "1. Genera interacción",
        componentes: [
          {
            nombre: "Post META",
            detalle: "Programmatic",
            alcance: "21.007 clics",
          },
          {
            nombre: "Post TikTok",
            detalle: "Programmatic",
            alcance: "21.907 clics",
          },
        ],
      },
      {
        nombre: "2. Impulsamos el clic",
        componentes: [
          {
            nombre: "Display",
            detalle: "Programmatic",
            alcance: "7.414 clics",
          },
          {
            nombre: "Push Multimedia",
            detalle: "Segmentado con data",
            alcance: "12.389 clics",
          },
        ],
      },
      {
        nombre: "3. Acerca a la decisión",
        componentes: [
          {
            nombre: "Tráfico calificado",
            detalle: "Audiencias con intención",
            alcance: "45.000 clics",
          },
        ],
      },
      {
        nombre: "4. Conecta con el producto",
        componentes: [
          {
            nombre: "Precargas virtuales",
            detalle: "App de marca en dispositivos",
            alcance: "18.800 instalaciones",
          },
          {
            nombre: "Shopping Live",
            detalle: "En la locación del cliente",
            alcance: "1 transmisión",
          },
        ],
      },
    ],
    beneficios: [
      "Más de 108.000 clics sumando redes, display, push y tráfico calificado",
      "Presencia programática en META y TikTok con data de audiencias",
      "45.000 clics de tráfico calificado hacia los activos de la marca",
      "18.800 instalaciones precargadas de la app de la marca",
      "Shopping Live grabado en la locación del cliente",
      "Todo el paquete está orientado a interacción medible",
    ],
    recomendadoPara: [
      "Marcas con objetivos de interacción y consideración",
      "Campañas que necesitan llevar audiencia a un destino digital",
      "Sectores: Retail, Consumo Masivo, Entretenimiento",
      "Productos con punto de venta o app propia",
    ],
  },
  {
    id: "smart",
    nombre: "SMART",
    claim: "Posiciona y amplifica",
    descripcion:
      "Una solución de 2 meses para fortalecer el posicionamiento de tu marca y amplificar tu mensaje en audiencias y medios estratégicos.",
    duracion: "2 meses",
    precio: 61600000,
    precioPreventa: 50000000,
    descuento: "19% de descuento",
    categoriaPresupuesto: "medio",
    etapasJourney: ["Conoce", "Encuentra"],
    sectoresDestacados: ["Moda", "Entretenimiento", "Tecnología"],
    incluyeProduccion: false,
    fases: [
      {
        nombre: "1. Conoce",
        componentes: [
          {
            nombre: "Sondeos",
            detalle: "Respuestas efectivas",
            alcance: "500 respuestas",
          },
          {
            nombre: "Analítica geoespacial",
            detalle: "Punto 1 a 3",
            alcance: "3 puntos",
          },
        ],
      },
      {
        nombre: "2. Posiciona",
        componentes: [
          {
            nombre: "Nota destacada + landing",
            detalle: "REDMAS.COM, impulsada por SMS",
            alcance: "10.911 envíos",
          },
          {
            nombre: "Entrevista",
            detalle: "NOT RED+",
            alcance: "1 salida",
          },
          {
            nombre: "Superimposiciones",
            detalle: "RED+ Not",
            alcance: "10 salidas",
          },
        ],
      },
      {
        nombre: "3. Impacta",
        componentes: [
          {
            nombre: "Display",
            detalle: "Segmentado con data",
            alcance: "3.892 clics",
          },
          {
            nombre: "Push Multimedia",
            detalle: "Segmentado con data",
            alcance: "12.389 clics",
          },
          {
            nombre: "Sat Push",
            detalle: "Mobile masivo",
            alcance: "16.163 envíos",
          },
        ],
      },
    ],
    beneficios: [
      "Arranca conociendo a la audiencia con sondeos y analítica geoespacial",
      "Entrevista en NOT RED+ y 10 superimposiciones para posicionar el mensaje",
      "Landing de marca en REDMAS.COM impulsada con SMS",
      "Más de 16.000 clics entre display y Push Multimedia",
      "Sat Push con 16.163 envíos para amplificar el alcance mobile",
      "Ciclo completo de posicionamiento en solo 2 meses",
    ],
    recomendadoPara: [
      "Campañas tácticas de posicionamiento",
      "Lanzamientos y activaciones de temporada",
      "Sectores: Moda, Entretenimiento, Tecnología",
      "Marcas que buscan resultados rápidos con inversión media",
    ],
  },
  {
    id: "basic",
    nombre: "BASIC",
    claim: "Conoce y conecta",
    descripcion:
      "Una solución de 2 meses para llevar tu mensaje a diferentes audiencias.",
    duracion: "2 meses",
    precio: 22320800,
    precioPreventa: 20000000,
    descuento: "10% de descuento",
    categoriaPresupuesto: "bajo",
    etapasJourney: ["Conoce"],
    sectoresDestacados: ["Retail", "Moda", "Gobierno"],
    incluyeProduccion: false,
    fases: [
      {
        nombre: "Descubre",
        componentes: [
          {
            nombre: "Sondeos",
            detalle: "Respuestas efectivas",
            alcance: "500 respuestas",
          },
        ],
      },
      {
        nombre: "Hazte visible",
        componentes: [
          {
            nombre: "Native",
            detalle: "Contenido nativo",
            alcance: "1.220.361 impresiones",
          },
          {
            nombre: "Display",
            detalle: "Segmentado con data",
            alcance: "839.043 impresiones",
          },
          {
            nombre: "Comerciales",
            detalle: "NOT RED+",
            alcance: "20 spots",
          },
        ],
      },
      {
        nombre: "Conecta",
        componentes: [
          {
            nombre: "Push Multimedia",
            detalle: "Segmentado con data",
            alcance: "3.767 clics",
          },
        ],
      },
    ],
    beneficios: [
      "Punto de entrada al portafolio con inversión controlada",
      "Sondeos con 500 respuestas efectivas para conocer a la audiencia",
      "Más de 2 millones de impresiones entre Native y Display",
      "20 comerciales en NOT RED+",
      "Push Multimedia segmentado con data de Claro",
      "Solución completa en 2 meses",
    ],
    recomendadoPara: [
      "PyMEs que inician en medios masivos",
      "Campañas locales o pruebas de mercado",
      "Sectores: Retail, Moda, Gobierno",
      "Marcas que quieren validar antes de escalar",
    ],
  },
];

/** Paquetes listos para usar, con componentes y conteo derivados de las fases. */
export const PAQUETES_COMERCIALES = DEFINICION_PAQUETES.map((paquete) => {
  const componentes = paquete.fases.flatMap((fase) =>
    fase.componentes.map((componente) => ({ ...componente, fase: fase.nombre })),
  );

  return {
    ...paquete,
    componentes,
    productos: componentes.length,
    impuestos: IMPUESTOS,
  };
});

/** Paquetes ordenados de menor a mayor inversión de preventa. */
const PAQUETES_POR_INVERSION = [...PAQUETES_COMERCIALES].sort(
  (a, b) => a.precioPreventa - b.precioPreventa,
);

/**
 * Rangos de inversión que se le ofrecen al usuario en el chat.
 * `referencia` es el valor con el que se evalúa la recomendación.
 */
export const RANGOS_PRESUPUESTO = [
  { etiqueta: "Hasta $30 millones", referencia: 30000000 },
  { etiqueta: "Entre $30 y $70 millones", referencia: 70000000 },
  { etiqueta: "Entre $70 y $120 millones", referencia: 120000000 },
  { etiqueta: "Entre $120 y $180 millones", referencia: 180000000 },
  { etiqueta: "Más de $180 millones", referencia: 250000000 },
  { etiqueta: "Aún no lo defino", referencia: 0 },
];

export const OPCIONES_PRESUPUESTO = RANGOS_PRESUPUESTO.map((r) => r.etiqueta);

/**
 * Convierte la etiqueta elegida en el chat a su valor de referencia.
 * @param {string} etiqueta
 * @returns {number} 0 cuando el usuario no definió presupuesto
 */
export const presupuestoDesdeEtiqueta = (etiqueta) =>
  RANGOS_PRESUPUESTO.find((r) => r.etiqueta === etiqueta)?.referencia || 0;

// ---------------------------------------------------------------------------
// Motor de recomendación
// ---------------------------------------------------------------------------

/** Peso máximo que puede aportar cada criterio. */
const PESOS = {
  presupuesto: 45,
  journey: 25,
  alcance: 15,
  sector: 15,
  nivelSocioeconomico: 8,
  edad: 8,
};

/**
 * Escala de alcance calibrada con la distribución real de banderas
 * demográficas (rango observado: 6,7M - 54,9M usuarios).
 */
const ESCALA_ALCANCE = [
  { desde: 30000000, etiqueta: "masivo", favoritos: ["elite-360", "elite-investigacion", "vip"] },
  { desde: 18000000, etiqueta: "amplio", favoritos: ["elite-360", "vip", "connect"] },
  { desde: 12000000, etiqueta: "medio", favoritos: ["vip", "connect", "smart"] },
  { desde: 9000000, etiqueta: "focalizado", favoritos: ["smart", "connect", "basic"] },
  { desde: 0, etiqueta: "de nicho", favoritos: ["basic", "smart", "connect"] },
];

/** Proporción del peso que recibe cada posición de una lista de favoritos. */
const PROPORCION_FAVORITOS = [1, 0.7, 0.45];

const puntosPorFavoritos = (favoritos, peso) =>
  favoritos.reduce((acc, id, indice) => {
    acc[id] = Math.round(peso * (PROPORCION_FAVORITOS[indice] ?? 0.25));
    return acc;
  }, {});

const aNumero = (valor) =>
  typeof valor === "string"
    ? parseInt(valor.replace(/\D/g, ""), 10) || 0
    : valor || 0;

const formatearPesos = (valor) => `$${valor.toLocaleString("es-CO")}`;

/**
 * Criterio 1 - Presupuesto: gana el paquete más completo que cabe en la
 * inversión declarada.
 */
const criterioPresupuesto = ({ presupuesto }) => {
  const monto = aNumero(presupuesto);
  if (!monto) return null;

  const tolerancia = monto * 1.1;
  const asequibles = PAQUETES_COMERCIALES.filter(
    (p) => p.precioPreventa <= tolerancia,
  );

  if (asequibles.length === 0) {
    const entrada = PAQUETES_POR_INVERSION[0];
    return {
      puntos: { [entrada.id]: PESOS.presupuesto },
      razon: `Con una inversión de ${formatearPesos(monto)}, ${entrada.nombre} es el punto de entrada del portafolio`,
    };
  }

  const tope = Math.max(...asequibles.map((p) => p.precioPreventa));
  const puntos = {};
  PAQUETES_COMERCIALES.forEach((p) => {
    puntos[p.id] =
      p.precioPreventa <= tolerancia
        ? Math.round(PESOS.presupuesto * (p.precioPreventa / tope))
        : 0;
  });

  const mejor = asequibles.find((p) => p.precioPreventa === tope);
  return {
    puntos,
    razon: `La inversión de ${formatearPesos(monto)} alcanza para ${mejor.nombre} (preventa ${formatearPesos(mejor.precioPreventa)})`,
  };
};

/**
 * Criterio 2 - Etapa del journey: cada paquete declara las etapas que cubre
 * mejor; las etapas vecinas reciben puntaje parcial.
 */
const criterioJourney = ({ etapaJourney }) => {
  const indiceEtapa = ORDEN_JOURNEY.indexOf(etapaJourney);
  if (indiceEtapa === -1) return null;

  const puntos = {};
  PAQUETES_COMERCIALES.forEach((p) => {
    const distancia = Math.min(
      ...p.etapasJourney.map((etapa) =>
        Math.abs(ORDEN_JOURNEY.indexOf(etapa) - indiceEtapa),
      ),
    );
    puntos[p.id] = Math.round(PESOS.journey * Math.max(0, 1 - distancia * 0.35));
  });

  const cubren = PAQUETES_COMERCIALES.filter((p) =>
    p.etapasJourney.includes(etapaJourney),
  ).map((p) => p.nombre);

  return {
    puntos,
    razon: cubren.length
      ? `La etapa "${etapaJourney}" del journey se resuelve con ${cubren.join(" o ")}`
      : `La etapa "${etapaJourney}" se atiende con los paquetes más cercanos del portafolio`,
  };
};

/** Criterio 3 - Alcance potencial de la audiencia seleccionada. */
const criterioAlcance = ({ alcancePotencial }) => {
  const alcance = aNumero(alcancePotencial);
  if (!alcance) return null;

  const escalon = ESCALA_ALCANCE.find((e) => alcance >= e.desde);
  const millones = (alcance / 1000000).toFixed(1);

  return {
    puntos: puntosPorFavoritos(escalon.favoritos, PESOS.alcance),
    razon: `Alcance ${escalon.etiqueta} (${millones}M de usuarios potenciales) según banderas demográficas`,
  };
};

/** Criterio 4 - Sector de la marca. */
const criterioSector = ({ sector }) => {
  if (!sector) return null;

  const afines = PAQUETES_COMERCIALES.filter((p) =>
    p.sectoresDestacados.includes(sector),
  );
  if (afines.length === 0) return null;

  return {
    puntos: puntosPorFavoritos(
      afines.map((p) => p.id),
      PESOS.sector,
    ),
    razon: `El sector ${sector} responde bien a ${afines.map((p) => p.nombre).join(" y ")}`,
  };
};

/** Criterio 5 - Nivel socioeconómico de la audiencia. */
const criterioNivelSocioeconomico = ({ audiencia }) => {
  const nse = (audiencia?.nivelSocioeconomico || "").toLowerCase();
  if (!nse) return null;

  if (nse.includes("alto") || nse.includes("e5") || nse.includes("e6")) {
    return {
      puntos: puntosPorFavoritos(
        ["elite-360", "elite-investigacion", "vip"],
        PESOS.nivelSocioeconomico,
      ),
      razon: "El NSE alto justifica soluciones de contenido premium",
    };
  }

  if (nse.includes("bajo") || nse.includes("e1") || nse.includes("e2")) {
    return {
      puntos: puntosPorFavoritos(
        ["basic", "smart", "connect"],
        PESOS.nivelSocioeconomico,
      ),
      razon: "El NSE bajo se cubre con mayor eficiencia en formatos mobile y digitales",
    };
  }

  return {
    puntos: puntosPorFavoritos(
      ["vip", "connect", "smart"],
      PESOS.nivelSocioeconomico,
    ),
    razon: "El NSE medio permite combinar contenido y activación digital",
  };
};

/** Criterio 6 - Edad de la audiencia. */
const criterioEdad = ({ audiencia }) => {
  const edad = (audiencia?.edad || "").toLowerCase();
  if (!edad) return null;

  const joven = ["18", "24", "25", "34"].some((r) => edad.includes(r));
  const mayor = ["55", "64", "65", "75"].some((r) => edad.includes(r));

  if (joven && !mayor) {
    return {
      puntos: puntosPorFavoritos(["connect", "smart", "vip"], PESOS.edad),
      razon: "La audiencia joven responde mejor a formatos digitales y mobile",
    };
  }

  if (mayor) {
    return {
      puntos: puntosPorFavoritos(["elite-360", "vip", "smart"], PESOS.edad),
      razon: "La audiencia adulta mantiene alto consumo de TV y contenido editorial",
    };
  }

  return {
    puntos: puntosPorFavoritos(["vip", "elite-360", "connect"], PESOS.edad),
    razon: "La audiencia 35-54 equilibra TV y digital",
  };
};

const CRITERIOS = [
  criterioPresupuesto,
  criterioJourney,
  criterioAlcance,
  criterioSector,
  criterioNivelSocioeconomico,
  criterioEdad,
];

/**
 * Recomienda el paquete más adecuado según el perfil del cliente.
 * @param {Object} perfil
 * @param {number|string} [perfil.presupuesto] - Inversión declarada (0 si no la definió)
 * @param {number|string} [perfil.alcancePotencial] - Alcance de banderas demográficas
 * @param {string} [perfil.sector]
 * @param {string} [perfil.etapaJourney] - Etapa elegida en la experiencia del journey
 * @param {Object} [perfil.audiencia] - {genero, edad, nivelSocioeconomico}
 * @returns {{paquete: Object, razonamiento: string[], alternativas: Array, mensajePersonalizado: string, puntuaciones: Object}}
 */
export const recomendarPaquete = (perfil) => {
  const puntuaciones = Object.fromEntries(
    PAQUETES_COMERCIALES.map((p) => [p.id, 0]),
  );
  const razonamiento = [];

  CRITERIOS.forEach((criterio) => {
    const resultado = criterio(perfil);
    if (!resultado) return;

    Object.entries(resultado.puntos).forEach(([id, valor]) => {
      if (puntuaciones[id] !== undefined) puntuaciones[id] += valor;
    });
    if (resultado.razon) razonamiento.push(resultado.razon);
  });

  // Gana el puntaje más alto; ante empate, la opción de menor inversión.
  const paquete = [...PAQUETES_POR_INVERSION].sort(
    (a, b) => puntuaciones[b.id] - puntuaciones[a.id],
  )[0];

  razonamiento.push(
    paquete.duracion
      ? `${paquete.nombre} despliega ${paquete.productos} productos durante ${paquete.duracion}`
      : `${paquete.nombre} concentra ${paquete.productos} productos orientados a interacción`,
  );

  console.log("📊 Puntuaciones de paquetes:", puntuaciones);
  console.log("🎯 Paquete recomendado:", paquete.nombre);

  return {
    paquete,
    razonamiento,
    alternativas: obtenerAlternativas(paquete),
    mensajePersonalizado: generarMensajePersonalizado(paquete, perfil),
    puntuaciones,
  };
};

/**
 * Alternativa inmediatamente menor y mayor en inversión.
 * @param {Object} paqueteActual
 * @returns {Array<{tipo: string, paquete: Object, razon: string}>}
 */
const obtenerAlternativas = (paqueteActual) => {
  const indice = PAQUETES_POR_INVERSION.findIndex(
    (p) => p.id === paqueteActual.id,
  );
  const alternativas = [];

  if (indice > 0) {
    const menor = PAQUETES_POR_INVERSION[indice - 1];
    alternativas.push({
      tipo: "menor",
      paquete: menor,
      razon: `Opción más económica: ${menor.claim.toLowerCase()} con ${menor.productos} productos`,
    });
  }

  if (indice < PAQUETES_POR_INVERSION.length - 1) {
    const mayor = PAQUETES_POR_INVERSION[indice + 1];
    alternativas.push({
      tipo: "mayor",
      paquete: mayor,
      razon: `Opción superior: ${mayor.claim.toLowerCase()} con ${mayor.productos} productos`,
    });
  }

  return alternativas;
};

/**
 * Mensaje de cierre que explica la recomendación en lenguaje de negocio.
 * @param {Object} paquete
 * @param {Object} perfil
 * @returns {string}
 */
const generarMensajePersonalizado = (paquete, perfil) => {
  const { sector, audiencia, etapaJourney } = perfil;
  const perfilAudiencia = [
    audiencia?.genero,
    audiencia?.edad,
    audiencia?.nivelSocioeconomico && `NSE ${audiencia.nivelSocioeconomico}`,
  ]
    .filter(Boolean)
    .join(", ");

  const momento = etapaJourney
    ? ` y el momento del journey que priorizaste (${etapaJourney})`
    : "";

  return `Por tu audiencia (${perfilAudiencia}), el sector ${sector}${momento}, el paquete **${paquete.nombre}** — ${paquete.claim} — es el que mejor combina inversión, formatos y resultados: ${paquete.productos} productos por ${formatearPesos(paquete.precioPreventa)} en preventa.`;
};

/**
 * Obtener paquete por ID
 * @param {string} id
 * @returns {Object|undefined}
 */
export const obtenerPaquetePorId = (id) =>
  PAQUETES_COMERCIALES.find((p) => p.id === id);

/**
 * Listar todos los paquetes ordenados de mayor a menor inversión.
 * @returns {Array}
 */
export const listarPaquetes = () => [...PAQUETES_POR_INVERSION].reverse();

export default {
  PAQUETES_COMERCIALES,
  RANGOS_PRESUPUESTO,
  OPCIONES_PRESUPUESTO,
  presupuestoDesdeEtiqueta,
  recomendarPaquete,
  obtenerPaquetePorId,
  listarPaquetes,
};
