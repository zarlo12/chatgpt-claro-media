// Firebase Service para guardar registros de conversaciones

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

// 🔧 Configuración de Firebase desde variables de entorno
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// 🔥 Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🗂️ Nombre de la colección
const COLLECTION_NAME = "ClaroMediaAgenteIA";

console.log("🔥 Firebase inicializado correctamente");
console.log("📁 Colección:", COLLECTION_NAME);

/**
 * Guardar una nueva conversación completa en Firestore
 * @param {Object} conversacion - Objeto con todos los datos de la conversación
 * @returns {Promise<string>} - ID del documento creado
 */
export const guardarConversacion = async (conversacion) => {
  try {
    console.log("💾 Guardando conversación en Firebase...", conversacion);

    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      // Datos personales
      nombre: conversacion.nombre || "",
      correo: conversacion.correo || "",
      celular: conversacion.celular || "",

      // Demografía
      sector: conversacion.sector || "",
      genero: conversacion.genero || "",
      edad: conversacion.edad || "",
      nivelSocioeconomico: conversacion.nivelSocioeconomico || "",

      // Afinidades
      afinidades: conversacion.afinidades || [],

      // Journey (si están disponibles)
      primeraSeleccionJourney: conversacion.primeraSeleccionJourney || null,
      segundaSeleccionJourney: conversacion.segundaSeleccionJourney || null,

      // Propuesta generada
      propuesta: conversacion.propuesta || null,

      // Metadata
      timestamp: serverTimestamp(),
      modo: import.meta.env.VITE_MODE || "development",
      modeloIA: import.meta.env.VITE_OPENAI_MODEL || "mock",
    });

    console.log("✅ Conversación guardada con ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("❌ Error guardando conversación:", error);
    throw error;
  }
};

/**
 * Guardar solo los datos iniciales del usuario (al completar el formulario)
 * @param {Object} datosPersonales - Datos del formulario: nombre, correo, celular
 * @returns {Promise<string>} - ID del documento creado
 */
export const guardarDatosIniciales = async (datosPersonales) => {
  try {
    console.log("💾 Guardando datos iniciales del usuario...", datosPersonales);

    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      nombre: datosPersonales.nombre || "",
      correo: datosPersonales.correo || "",
      celular: datosPersonales.celular || "",
      timestamp: serverTimestamp(),
      estado: "iniciado", // Para marcar que solo tiene datos iniciales
    });

    console.log("✅ Datos iniciales guardados con ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("❌ Error guardando datos iniciales:", error);
    throw error;
  }
};

/**
 * Actualizar una conversación existente con nuevos datos
 * @param {string} docId - ID del documento a actualizar
 * @param {Object} datosActualizados - Datos nuevos a agregar
 * @returns {Promise<void>}
 */
export const actualizarConversacion = async (docId, datosActualizados) => {
  try {
    console.log("🔄 Actualizando conversación:", docId, datosActualizados);

    const docRef = doc(db, COLLECTION_NAME, docId);
    await updateDoc(docRef, {
      ...datosActualizados,
      ultimaActualizacion: serverTimestamp(),
    });

    console.log("✅ Conversación actualizada");
  } catch (error) {
    console.error("❌ Error actualizando conversación:", error);
    throw error;
  }
};

export default {
  guardarConversacion,
  guardarDatosIniciales,
  actualizarConversacion,
};
