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

/**
 * Sistema de prompts para el agente de Claro Media
 */
const SYSTEM_PROMPT = `Eres el Agente de IA de Claro Media, desarrollado con tecnología ChatGPT y entrenado con data de la compañía.

Tu función es ayudar a las empresas a crear propuestas estratégicas personalizadas basadas en:
- Sector de la empresa
- Perfil demográfico de su audiencia (género, edad, nivel socioeconómico)
- Afinidades y comportamientos de la audiencia
- Insights de ubicación y comportamiento en tiempo real

Debes ser profesional, conciso y proporcionar insights valiosos basados en los datos recopilados.`;

/**
 * Función para enviar mensajes al API de ChatGPT
 * @param {Array} messages - Array de mensajes en formato ChatGPT
 * @returns {Promise<string>} - Respuesta del modelo
 */
export const sendMessageToChatGPT = async (messages) => {
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
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling ChatGPT API:", error);
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

  const userPrompt = `Genera una propuesta estratégica personalizada para una empresa del sector ${sector} con la siguiente audiencia:
  - Género: ${genero}
  - Edad: ${edad}
  - Nivel Socioeconómico: ${nivelSocioeconomico}
  - Afinidades: ${afinidades.join(", ")}

  Proporciona:
  1. Insights clave basados en patrones de comportamiento y ubicación
  2. Recomendaciones estratégicas específicas
  3. Próximos pasos accionables
  
  Formatea la respuesta en JSON con la siguiente estructura:
  {
    "insights": ["insight1", "insight2", "insight3"],
    "recomendaciones": ["rec1", "rec2", "rec3", "rec4"],
    "proximosPasos": ["paso1", "paso2", "paso3", "paso4"]
  }`;

  try {
    const messages = [{ role: "user", content: userPrompt }];

    const response = await sendMessageToChatGPT(messages);

    // Parsear la respuesta JSON
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsedData = JSON.parse(jsonMatch[0]);

      return {
        sector,
        audiencia: {
          genero,
          edad,
          nivelSocioeconomico,
        },
        afinidades,
        insights: parsedData.insights,
        recomendaciones: parsedData.recomendaciones,
        proximosPasos: parsedData.proximosPasos,
      };
    }

    throw new Error("No se pudo parsear la respuesta del modelo");
  } catch (error) {
    console.error("Error generando propuesta con IA:", error);
    // Fallback a datos mock si falla la API
    const { generarPropuestaEstrategica } = await import("./data/mockData");
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
      context.edad +
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
    console.error("Error generating contextual message:", error);
    // Fallback a mensajes por defecto
    return "Perfecto, continuemos...";
  }
};

export default {
  sendMessageToChatGPT,
  generarPropuestaConIA,
  generarMensajeContextual,
};
