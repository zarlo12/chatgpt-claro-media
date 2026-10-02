// API Service para integración con ChatGPT

import { calcularValorPropuesta } from "../data/banderasDemograficas";
import {
  PAQUETES_COMERCIALES,
  recomendarPaquete,
} from "../data/paquetesComerciales";
import {
  ESTILOS_DE_VIDA,
  REGLA_NARRATIVA,
  construirResumenEstilo,
  obtenerEstiloPorNombre,
} from "../data/estilosDeVida";
import {
  BENCHMARKS_POR_CATEGORIA,
  formatearInteraccion,
  obtenerBenchmarkPorSector,
} from "../data/benchmarksInteraccion";

/**
 * Configuración de la API
 * Variables de entorno (.env):
 * VITE_OPENAI_API_KEY=tu_api_key_aqui
 * VITE_OPENAI_MODEL=gpt-4 o gpt-3.5-turbo
 */

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const API_URL = "https://api.openai.com/v1/chat/completions";
const MODEL = import.meta.env.VITE_OPENAI_MODEL || "gpt-4";
const MODE = import.meta.env.VITE_MODE || "development";

// 🔍 DEBUG: Mostrar configuración al cargar el módulo
console.log("=== CONFIGURACIÓN API SERVICE ===");
console.log("🔧 Modo:", MODE);
console.log("🤖 Modelo:", MODEL);
console.log(
  "🔑 API Key presente:",
  API_KEY ? `Sí (${API_KEY.substring(0, 20)}...)` : "NO CONFIGURADA",
);
console.log("=================================");

const formatearPesos = (valor) => `$${valor.toLocaleString("es-CO")}`;

// ---------------------------------------------------------------------------
// Secciones del prompt generadas desde la data (una sola fuente de verdad)
// ---------------------------------------------------------------------------

const describirPaquete = (paquete) => {
  const componentes = paquete.componentes
    .map((c) => `${c.nombre} (${c.detalle}): ${c.alcance}`)
    .join("; ");

  return `**${paquete.nombre} — ${paquete.claim}**
- Inversión: ${formatearPesos(paquete.precio)} sin descuento / ${formatearPesos(paquete.precioPreventa)} en preventa (${paquete.descuento}). ${paquete.impuestos}
- Duración: ${paquete.duracion || "según cronograma de la campaña"}
- Etapas del journey que cubre: ${paquete.etapasJourney.join(", ")}
- ${paquete.productos} productos: ${componentes}
- Recomendado para: ${paquete.recomendadoPara.join("; ")}`;
};

const SECCION_PAQUETES = PAQUETES_COMERCIALES.map(describirPaquete).join("\n\n");

const SECCION_ESTILOS = ESTILOS_DE_VIDA.map(
  (e) =>
    `- ${e.nombre} (${e.afinidades.join(" + ")}) → sector ${e.sectorPrincipal}; conecta con ${e.sectoresConectados.join(", ")}.
  Dato observado: ${e.dato}
  Interpretación: ${e.interpretacion}`,
).join("\n");

const SECCION_BENCHMARKS = Object.entries(BENCHMARKS_POR_CATEGORIA)
  .map(
    ([categoria, formatos]) =>
      `- ${categoria}: ${formatos
        .map((f) => `${f.formato} ${formatearInteraccion(f.interaccion)}`)
        .join(", ")}`,
  )
  .join("\n");

/** Paquete de mayor valor del portafolio: define el tope de auto-cotización. */
const PAQUETE_TOPE = [...PAQUETES_COMERCIALES].sort(
  (a, b) => b.precio - a.precio,
)[0];

/**
 * Sistema de prompts para el agente de Claro Media
 * Basado en las instrucciones del GPT personalizado y en los contenidos de la
 * Rueda de Negocios 2026 (experiencia de Estilos de Vida).
 */
const SYSTEM_PROMPT = `**Rol del agente**

Actúa como consultor comercial de Claro Media especializado en soluciones DATA TECH.

Tu función es entender la necesidad de comunicación del cliente y recomendar el mejor paquete del portafolio Claro Media usando únicamente los productos disponibles en los archivos cargados.

Las soluciones pueden incluir:
- TV Claro
- Red+
- soluciones de data (analítica geoespacial, sondeos)
- programática
- mobile marketing (Push Multimedia, Sat Push, SMS, RCS)
- digital
- combinaciones incluidas en los paquetes comerciales

Tu objetivo es orientar al cliente hacia el paquete adecuado según su necesidad, sector, audiencia, estilo de vida y presupuesto.

**Forma de actuar**

Siempre sigue este proceso:

**1. Diagnóstico obligatorio**

Antes de dar cualquier recomendación debes hacer preguntas consultivas para entender la necesidad del cliente.

Debes preguntar obligatoriamente:
- Objetivo de la campaña
- Público objetivo
- Sector o industria
- Ciudad o cobertura geográfica
- Presupuesto estimado
- Duración de la campaña

Nunca hagas recomendaciones sin tener esta información.

**Experiencia de Estilos de Vida**

La experiencia parte de un estilo de vida elegido por el usuario. Cada estilo define una ruta de análisis:

${SECCION_ESTILOS}

**Regla narrativa obligatoria**

${REGLA_NARRATIVA.descripcion}

- Presenta primero el DATO OBSERVADO (evidencia cuantitativa).
- Presenta después la INTERPRETACIÓN, siempre separada del dato.
- Usa "${REGLA_NARRATIVA.conectorSinCausalidad}" cuando no exista causalidad directa.
- Nunca presentes una correlación como si fuera una causa.

**Cómo interactúan las audiencias por categoría**

Tasas de interacción observadas por formato (usar para priorizar la mezcla de medios):

${SECCION_BENCHMARKS}

**Reglas obligatorias de seguridad comercial**

Debes redirigir al equipo de preventa y NO generar propuesta automática en los siguientes casos:

**1. Categorías restringidas**

Si el cliente menciona productos o servicios relacionados con:
- licores o bebidas alcohólicas
- apuestas
- juegos de azar o casinos
- contenido o servicios sexuales
- juguetes sexuales
- campañas políticas
- candidatos políticos
- cigarrillos
- medicamentos
- armas
- artículos de defensa personal
- criptomonedas
- servicios de masajes o servicios sexuales
- cualquier producto para adultos

Debes responder:
"Este tipo de campaña requiere validación previa del equipo de preventa de Claro Media. Por favor contacta a la jefatura de preventa en: luisa.fajardoro@claro.com.co para recibir acompañamiento especializado."

No generes propuesta automática.

**2. Presupuesto alto**

Si el presupuesto de la campaña supera ${formatearPesos(PAQUETE_TOPE.precio)} COP (el valor del paquete más alto del portafolio, ${PAQUETE_TOPE.nombre}), debes redirigir al cliente al equipo de preventa:
"Para campañas de este nivel de inversión nuestro equipo de preventa diseña una propuesta personalizada. Por favor contacta a luisa.fajardoro@claro.com.co."

No generes propuesta automática.

**3. Campañas enfocadas en leads o ventas**

Si el cliente busca:
- generación de leads
- registros
- tráfico calificado
- ventas directas

Debes responder:
"Tenemos soluciones avanzadas para generación de leads y ventas, pero requieren requisitos técnicos y tecnológicos específicos, además de definir la etapa del embudo de conversión de la marca. Para diseñar correctamente esta solución te recomendamos contactar a la jefatura de preventa en luisa.fajardoro@claro.com.co."

**Uso obligatorio de archivos**

Debes utilizar únicamente la información contenida en los siguientes archivos cargados:
- Rueda de Negocios 2026 - 2_OF.pptx (paquetes vigentes y benchmarks de interacción)
- Contenidos_Estilos_de_Vida_ClaroMedia.xlsx (estilos de vida y reglas narrativas)
- banderas demográficas
- mediakit_final_final.pdf

Nunca inventes productos, cifras o soluciones que no estén en esos archivos.

**Paquetes comerciales disponibles (Rueda de Negocios 2026)**

Debes recomendar ÚNICAMENTE uno de estos ${PAQUETES_COMERCIALES.length} paquetes según el perfil del cliente:

${SECCION_PAQUETES}

**Reglas de recomendación**
- Evalúa primero el presupuesto del cliente y recomienda el paquete más completo que quepa en él.
- Considera el alcance potencial de su audiencia (banderas demográficas).
- Alinea la etapa del journey que el cliente prioriza con las etapas que cubre el paquete.
- Usa el estilo de vida para explicar el sector principal y los sectores conectados.
- Prioriza en la mezcla de medios los formatos con mayor interacción en la categoría del cliente.
- NUNCA mezcles componentes de diferentes paquetes.
- NUNCA inventes precios o productos fuera de estos paquetes.
- Siempre menciona el precio de preventa y el descuento incluido.

**Estructura obligatoria de respuesta**

Siempre responde usando esta estructura:

**Necesidad identificada**
Resumen simple de lo que el cliente busca.

**Lectura de audiencia**
Dato observado y, por separado, la interpretación (con "${REGLA_NARRATIVA.conectorSinCausalidad}").

**Solución DATA TECH Claro Media**
Explica qué paquete resuelve la necesidad.

**Beneficio para el cliente**
Explica cómo esta solución le ayuda a lograr su objetivo de comunicación.

**Alcance estimado**
Usa el archivo banderas demográficas para estimar cuántos usuarios Claro pueden tener las características del público objetivo. Indica el número aproximado de usuarios alcanzables.

**Explicación al cliente**
Después de presentar la solución debes preguntar:
"¿Te quedó clara la propuesta o quieres que te la explique con un ejemplo más práctico?"

Si el cliente no entiende la propuesta:
- cambia a un tono más simple
- usa ejemplos cotidianos
- evita tecnicismos

**Política de descuentos**

Nunca otorgues descuentos.

Si el cliente solicita descuentos debes responder:
"Los paquetes de la rueda de negocios ya cuentan con tarifas preferenciales y condiciones especiales, por lo que no es posible otorgar descuentos adicionales."

**Impuestos**

Siempre recuerda:
- Las soluciones móviles incluyen impoconsumo del 4%
- Todas las tarifas están antes de IVA del 19%

**Creación de propuesta comercial**

Si el cliente solicita una propuesta formal:
- Pregunta los datos del consultor comercial
- Genera la propuesta en formato PDF listo para entregar
- No uses emoticones en la propuesta

**Estilo de comunicación**

Mantén siempre:
- tono cercano
- lenguaje claro
- explicación simple
- enfoque consultivo
- orientación a negocio

Evita tecnicismos innecesarios.`;

/**
 * Función para enviar mensajes al API de ChatGPT
 * @param {Array} messages - Array de mensajes en formato ChatGPT
 * @returns {Promise<string>} - Respuesta del modelo
 */
export const sendMessageToChatGPT = async (messages) => {
  console.log("📤 Enviando mensaje a OpenAI API...");
  console.log("📝 Modo actual:", MODE);
  console.log("💬 Cantidad de mensajes:", messages.length);

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        temperature: 0.7,
        max_tokens: 1500,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ Respuesta recibida de OpenAI API");
    console.log("📊 Tokens usados:", data.usage);
    return data.choices[0].message.content;
  } catch (error) {
    console.error("❌ Error calling ChatGPT API:", error);
    throw error;
  }
};

/**
 * Bloque de contexto del estilo de vida para el prompt del usuario.
 * @param {Object|null} estilo
 * @param {string} respuestaEstilo
 * @returns {string}
 */
const contextoEstiloDeVida = (estilo, respuestaEstilo) => {
  if (!estilo) return "";

  return `
  ESTILO DE VIDA SELECCIONADO: ${estilo.nombre}
  - Afinidades que definen la ruta: ${estilo.afinidades.join(", ")}
  - Dato observado: ${estilo.dato}
  - Interpretación (sin causalidad): ${estilo.interpretacion}
  - Sector principal: ${estilo.sectorPrincipal}
  - Sectores conectados: ${estilo.sectoresConectados.join(", ")}
  - Pregunta de profundización: ${estilo.pregunta}
  - Respuesta del cliente: ${respuestaEstilo || "sin respuesta"}`;
};

/**
 * Bloque de contexto del benchmark de interacción para el prompt del usuario.
 * @param {Object|null} benchmark
 * @returns {string}
 */
const contextoBenchmark = (benchmark) => {
  if (!benchmark) return "";

  const formatos = benchmark.formatos
    .map((f) => `${f.formato} ${formatearInteraccion(f.interaccion)}`)
    .join(", ");

  return `
  INTERACCIÓN POR FORMATO (categoría ${benchmark.categoria}${benchmark.esReferencia ? ", usada como referencia" : ""}): ${formatos}`;
};

/**
 * Genera la propuesta estratégica combinando el cálculo local (banderas
 * demográficas, estilo de vida, benchmarks y paquete recomendado) con los
 * textos que produce el modelo.
 * @param {Object} userData - Datos recopilados durante la experiencia
 * @returns {Promise<Object>} - Propuesta estratégica completa
 */
export const generarPropuestaConIA = async (userData) => {
  const {
    empresa,
    sector,
    genero,
    edad,
    nivelSocioeconomico,
    afinidades = [],
    estiloVida,
    respuestaEstilo,
    etapaJourney,
    presupuesto = 0,
    presupuestoEtiqueta,
  } = userData;

  const edadText = Array.isArray(edad) ? edad.join(", ") : edad;
  const nseText = Array.isArray(nivelSocioeconomico)
    ? nivelSocioeconomico.join(", ")
    : nivelSocioeconomico;

  const estilo = obtenerEstiloPorNombre(estiloVida);
  const benchmark = obtenerBenchmarkPorSector(sector);

  // Alcance potencial según banderas demográficas
  const valorPropuesta = calcularValorPropuesta({
    genero,
    edad: Array.isArray(edad) ? edad : [edad],
    nivelSocioeconomico: Array.isArray(nivelSocioeconomico)
      ? nivelSocioeconomico
      : [nivelSocioeconomico],
  });

  console.log("📊 Valor de la Propuesta calculado:", valorPropuesta);

  // Paquete recomendado según perfil, journey e inversión declarada
  const recomendacion = recomendarPaquete({
    presupuesto,
    alcancePotencial: valorPropuesta.alcanceTotalNumerico,
    sector,
    etapaJourney,
    audiencia: {
      genero,
      edad: edadText,
      nivelSocioeconomico: nseText,
    },
  });

  console.log("📦 Paquete recomendado:", recomendacion.paquete.nombre);

  const banderasTexto = valorPropuesta.banderasPrincipales
    .map((b) => `${b.nombre} (${b.alcance} usuarios)`)
    .join(", ");

  const userPrompt = `Genera una propuesta estratégica personalizada para ${empresa || "una empresa"}, del sector ${sector}, con la siguiente audiencia:
  - Género: ${genero}
  - Edad: ${edadText}
  - Nivel Socioeconómico: ${nseText}
  - Afinidades: ${afinidades.join(", ")}
  - Etapa del journey priorizada: ${etapaJourney || "no definida"}
  - Inversión declarada: ${presupuestoEtiqueta || "no definida"}
${contextoEstiloDeVida(estilo, respuestaEstilo)}
${contextoBenchmark(benchmark)}

  ALCANCE POTENCIAL:
  - Alcance Total Estimado: ${valorPropuesta.alcanceTotal} usuarios
  - Segmentos Principales: ${banderasTexto}

  PAQUETE RECOMENDADO:
  - Nombre: ${recomendacion.paquete.nombre} (${recomendacion.paquete.claim})
  - Precio: ${formatearPesos(recomendacion.paquete.precio)} (Preventa: ${formatearPesos(recomendacion.paquete.precioPreventa)}, ${recomendacion.paquete.descuento})
  - Duración: ${recomendacion.paquete.duracion || "según cronograma"}
  - Productos incluidos: ${recomendacion.paquete.productos}
  - Razones: ${recomendacion.razonamiento.join(", ")}

  Proporciona:
  1. Insights clave que separen dato observado de interpretación, usando "${REGLA_NARRATIVA.conectorSinCausalidad}" cuando no haya causalidad directa (mínimo 3)
  2. Recomendaciones estratégicas específicas para el paquete ${recomendacion.paquete.nombre}, priorizando los formatos de mayor interacción en la categoría (mínimo 4)
  3. Próximos pasos accionables (mínimo 4)

  IMPORTANTE: Responde ÚNICAMENTE con un objeto JSON válido (sin texto adicional) con esta estructura exacta:
  {
    "insights": ["insight1", "insight2", "insight3"],
    "recomendaciones": ["rec1", "rec2", "rec3", "rec4"],
    "proximosPasos": ["paso1", "paso2", "paso3", "paso4"]
  }`;

  try {
    const messages = [{ role: "user", content: userPrompt }];

    const response = await sendMessageToChatGPT(messages);
    console.log("📥 Respuesta completa del modelo:", response);

    // Parsear la respuesta JSON
    let parsedData;
    try {
      // Intentar parsear directamente (si ya es JSON limpio)
      parsedData = JSON.parse(response);
    } catch (e) {
      // Si falla, buscar JSON dentro del texto
      console.log(
        "⚠️ Respuesta no es JSON directo, buscando dentro del texto...",
      );
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No se encontró JSON válido en la respuesta");
      }
    }

    console.log("✅ JSON parseado correctamente:", parsedData);

    return {
      sector,
      empresa,
      audiencia: {
        genero,
        edad: edadText,
        nivelSocioeconomico: nseText,
      },
      afinidades,
      estiloVida: construirResumenEstilo(estilo, respuestaEstilo),
      benchmarkCategoria: benchmark,
      presupuestoEstimado: presupuestoEtiqueta || null,
      etapaJourney: etapaJourney || null,
      insights: parsedData.insights || [],
      recomendaciones: parsedData.recomendaciones || [],
      proximosPasos: parsedData.proximosPasos || [],
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
  } catch (error) {
    console.error("❌ Error generando propuesta con IA:", error);
    console.warn("⚠️ Usando FALLBACK a datos MOCK");
    // Fallback a datos calculados localmente si falla la API
    const { generarPropuestaEstrategica } = await import("../data/mockData");
    return {
      ...generarPropuestaEstrategica(userData),
      presupuestoEstimado: presupuestoEtiqueta || null,
      etapaJourney: etapaJourney || null,
    };
  }
};

/**
 * Función para generar respuestas conversacionales del agente
 * @param {string} step - Paso actual del flujo
 * @param {Object} context - Contexto de la conversación
 * @returns {Promise<string>} - Mensaje generado
 */
export const generarMensajeContextual = async (step, context) => {
  const prompts = {
    welcome:
      "Genera un mensaje de bienvenida profesional para el Agente IA de Claro Media",
    sector:
      "El usuario seleccionó el sector: " +
      context.sector +
      ". Genera una respuesta confirmando y pidiendo información sobre el género de su audiencia.",
    genero:
      "El usuario indicó género: " +
      context.genero +
      ". Confirma y pregunta sobre el rango de edad.",
    edad:
      "El usuario indicó edad: " +
      (Array.isArray(context.edad) ? context.edad.join(", ") : context.edad) +
      ". Confirma y pregunta sobre nivel socioeconómico.",
    nivelSocioeconomico:
      "El usuario indicó nivel socioeconómico: " +
      (Array.isArray(context.nivelSocioeconomico)
        ? context.nivelSocioeconomico.join(", ")
        : context.nivelSocioeconomico) +
      ". Confirma y menciona que ahora elegirá el estilo de vida de su audiencia.",
    estiloVida:
      "El usuario seleccionó el estilo de vida: " +
      context.estiloVida +
      ". Presenta primero el dato observado y luego la interpretación, separados.",
    afinidades:
      "El usuario seleccionó estas afinidades: " +
      (context.afinidades || []).join(", ") +
      ". Confirma que procesarás la información para generar la propuesta.",
  };

  try {
    const response = await sendMessageToChatGPT([
      {
        role: "user",
        content: prompts[step] || "Continúa la conversación de forma natural",
      },
    ]);
    return response;
  } catch (error) {
    console.error("❌ Error generating contextual message:", error);
    console.warn("⚠️ Usando mensaje por defecto (FALLBACK)");
    // Fallback a mensajes por defecto
    return "Perfecto, continuemos...";
  }
};

export default {
  sendMessageToChatGPT,
  generarPropuestaConIA,
  generarMensajeContextual,
};
