/**
 * Servicio para enviar propuestas por correo mediante Firebase Functions
 */

const FIREBASE_FUNCTIONS_URL =
  import.meta.env.VITE_FIREBASE_FUNCTIONS_URL ||
  "https://us-central1-imagen-ia-845a3.cloudfunctions.net/enviarPropuestaPorCorreo";

/**
 * Enviar propuesta estratégica por correo como PDF
 * @param {Object} propuesta - Objeto completo de la propuesta
 * @param {string} destinatario - Email del destinatario
 * @returns {Promise<Object>} - Respuesta del servidor
 */
export const enviarPropuestaPorCorreo = async (propuesta, destinatario) => {
  try {
    console.log("📧 Enviando propuesta a:", destinatario);

    const response = await fetch(FIREBASE_FUNCTIONS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        propuesta,
        destinatario,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error al enviar la propuesta");
    }

    const data = await response.json();
    console.log("✅ Propuesta enviada exitosamente:", data);

    return {
      success: true,
      message: data.message,
    };
  } catch (error) {
    console.error("❌ Error enviando propuesta:", error);
    throw error;
  }
};

export default {
  enviarPropuestaPorCorreo,
};
