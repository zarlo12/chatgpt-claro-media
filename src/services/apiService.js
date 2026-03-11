// API Service para integración futura con ChatGPT

// NOTA: Este es un archivo de ejemplo para cuando se integre la API real de ChatGPT
// Por ahora, el proyecto usa datos mock en src/data/mockData.js

/**
 * Configuración de la API
 * Agregar estas variables a un archivo .env:
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

/**
 * Sistema de prompts para el agente de Claro Media
 * Basado en las instrucciones del GPT personalizado
 */
const SYSTEM_PROMPT = `**Rol del agente**

Actúa como consultor comercial de Claro Media especializado en soluciones DATA TECH.

Tu función es entender la necesidad de comunicación del cliente y recomendar el mejor paquete del portafolio Claro Media usando únicamente los productos disponibles en los archivos cargados.

Las soluciones pueden incluir:
- TV Claro
- Red+
- soluciones de data
- programática
- mobile marketing
- digital
- combinaciones incluidas en los paquetes comerciales

Tu objetivo es orientar al cliente hacia el paquete adecuado según su necesidad, sector, audiencia y presupuesto.

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

Si el presupuesto de la campaña supera $220.000.000 COP, debes redirigir al cliente al equipo de preventa:
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
- Rueda de Negocios 2026.pdf
- banderas demográficas
- mediakit_final_final.pdf

Nunca inventes productos o soluciones que no estén en esos archivos.

**Uso de paquetes comerciales**

Cuando generes una recomendación:
- Usa únicamente los medios incluidos en los paquetes
- No sugieras medios fuera de los paquetes
- No inventes precios

**Estructura obligatoria de respuesta**

Siempre responde usando esta estructura:

**Necesidad identificada**
Resumen simple de lo que el cliente busca.

**Solución DATA TECH Claro Media**
Explica qué paquete o combinación de productos resuelve la necesidad.

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
 * Función para generar propuesta estratégica usando ChatGPT
 * @param {Object} userData - Datos recopilados del usuario
 * @returns {Promise<Object>} - Propuesta estratégica generada
 */
export const generarPropuestaConIA = async (userData) => {
  const { sector, genero, edad, nivelSocioeconomico, afinidades } = userData;

  const edadText = Array.isArray(edad) ? edad.join(", ") : edad;

  // Calcular valor de la propuesta usando banderas demográficas
  const valorPropuesta = calcularValorPropuesta({
    genero,
    edad: Array.isArray(edad) ? edad : [edad],
    nivelSocioeconomico,
  });

  console.log("📊 Valor de la Propuesta calculado:", valorPropuesta);

  const banderasTexto = valorPropuesta.banderasPrincipales
    .map((b) => `${b.nombre} (${b.alcance} usuarios)`)
    .join(", ");

  const userPrompt = `Genera una propuesta estratégica personalizada para una empresa del sector ${sector} con la siguiente audiencia:
  - Género: ${genero}
  - Edad: ${edadText}
  - Nivel Socioeconómico: ${nivelSocioeconomico}
  - Afinidades: ${afinidades.join(", ")}
  
  ALCANCE POTENCIAL:
  - Alcance Total Estimado: ${valorPropuesta.alcanceTotal} usuarios
  - Segmentos Principales: ${banderasTexto}

  Proporciona:
  1. Insights clave basados en patrones de comportamiento y ubicación (mínimo 3)
  2. Recomendaciones estratégicas específicas (mínimo 4)
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
      audiencia: {
        genero,
        edad: edadText,
        nivelSocioeconomico,
      },
      afinidades,
      insights: parsedData.insights || [],
      recomendaciones: parsedData.recomendaciones || [],
      proximosPasos: parsedData.proximosPasos || [],
      valorPropuesta: {
        alcanceTotal: valorPropuesta.alcanceTotal,
        alcanceTotalNumerico: valorPropuesta.alcanceTotalNumerico,
        banderasPrincipales: valorPropuesta.banderasPrincipales,
      },
    };
  } catch (error) {
    console.error("❌ Error generando propuesta con IA:", error);
    console.warn("⚠️ Usando FALLBACK a datos MOCK");
    // Fallback a datos mock si falla la API
    const { generarPropuestaEstrategica } = await import("../data/mockData");
    return generarPropuestaEstrategica(userData);
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
      "El usuario indicó nivel: " +
      context.nivelSocioeconomico +
      ". Confirma y menciona que identificarás afinidades basadas en el sector " +
      context.sector,
    afinidades:
      "El usuario seleccionó estas afinidades: " +
      context.afinidades.join(", ") +
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
