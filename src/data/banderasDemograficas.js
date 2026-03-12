/**
 * Banderas Demográficas de Claro Media
 * Data extraída de análisis de segmentos de audiencia
 */

// Mapeo de rangos de edad del sistema a columnas del CSV
const MAPEO_EDAD = {
  "18+": ["18 a 24", "25 a 34", "35 a 44", "45 a 55", "56 +"],
  "18 a 24": ["18 a 24"],
  "25 a 34": ["25 a 34"],
  "35 a 44": ["35 a 44"],
  "45 a 54": ["45 a 55"], // Aproximación
  "55 a 64": ["56 +"], // Aproximación
  "65 a 74": ["56 +"],
  "75+": ["56 +"],
  "45 a 55": ["45 a 55"],
  "56 +": ["56 +"],
};

// Mapeo de NSE del sistema a columnas del CSV
const MAPEO_NSE = {
  Todos: ["NSE 1-2", "NSE 3-4", "NSE 5-6"],
  "Alto (1-2)": ["NSE 1-2"],
  "Medio (3-4)": ["NSE 3-4"],
  "Bajo (5-6)": ["NSE 5-6"],
};

// Base de datos de banderas demográficas
export const BANDERAS_DEMOGRAFICAS = [
  {
    nombre: "Familia",
    id: "ban_familia",
    alcance: 10419803,
    porcentajes: {
      mujeres: 46.97,
      hombres: 53.03,
      "18 a 24": 10.91,
      "25 a 34": 25.77,
      "35 a 44": 24.22,
      "45 a 55": 18.05,
      "56 +": 21.05,
      "NSE 1-2": 53.0,
      "NSE 3-4": 41.23,
      "NSE 5-6": 5.77,
    },
  },
  {
    nombre: "RCS (Registro de Conversaciones)",
    id: "ban_rcs",
    alcance: 14383372,
    porcentajes: {
      mujeres: 45.37,
      hombres: 54.63,
      "18 a 24": 9.06,
      "25 a 34": 23.66,
      "35 a 44": 24.29,
      "45 a 55": 19.05,
      "56 +": 23.94,
      "NSE 1-2": 57.81,
      "NSE 3-4": 38.47,
      "NSE 5-6": 3.72,
    },
  },
  {
    nombre: "Redes Sociales",
    id: "ban_redes_sociales",
    alcance: 13056872,
    porcentajes: {
      mujeres: 46.61,
      hombres: 53.39,
      "18 a 24": 10.65,
      "25 a 34": 25.0,
      "35 a 44": 23.77,
      "45 a 55": 18.22,
      "56 +": 22.35,
      "NSE 1-2": 54.38,
      "NSE 3-4": 40.28,
      "NSE 5-6": 5.34,
    },
  },
  {
    nombre: "Tecnología",
    id: "ban_tecnologia",
    alcance: 11774302,
    porcentajes: {
      mujeres: 46.65,
      hombres: 53.35,
      "18 a 24": 10.88,
      "25 a 34": 25.56,
      "35 a 44": 24.11,
      "45 a 55": 18.08,
      "56 +": 21.36,
      "NSE 1-2": 53.78,
      "NSE 3-4": 40.63,
      "NSE 5-6": 5.59,
    },
  },
  {
    nombre: "Comunicaciones",
    id: "ban_comunicaciones",
    alcance: 10851100,
    porcentajes: {
      mujeres: 46.61,
      hombres: 53.39,
      "18 a 24": 10.64,
      "25 a 34": 25.32,
      "35 a 44": 24.01,
      "45 a 55": 18.15,
      "56 +": 21.89,
      "NSE 1-2": 53.24,
      "NSE 3-4": 41.22,
      "NSE 5-6": 5.54,
    },
  },
  {
    nombre: "Marketplaces",
    id: "ban_marketplaces",
    alcance: 10791488,
    porcentajes: {
      mujeres: 46.68,
      hombres: 53.32,
      "18 a 24": 10.82,
      "25 a 34": 25.59,
      "35 a 44": 24.27,
      "45 a 55": 18.25,
      "56 +": 21.06,
      "NSE 1-2": 54.28,
      "NSE 3-4": 40.39,
      "NSE 5-6": 5.33,
    },
  },
  {
    nombre: "Celulares",
    id: "ban_celulares",
    alcance: 10031604,
    porcentajes: {
      mujeres: 46.8,
      hombres: 53.2,
      "18 a 24": 11.28,
      "25 a 34": 26.1,
      "35 a 44": 24.07,
      "45 a 55": 17.82,
      "56 +": 20.74,
      "NSE 1-2": 53.06,
      "NSE 3-4": 40.96,
      "NSE 5-6": 5.98,
    },
  },
  {
    nombre: "Grandes Superficies",
    id: "ban_grandes_superficies",
    alcance: 8495774,
    porcentajes: {
      mujeres: 46.48,
      hombres: 53.52,
      "18 a 24": 10.96,
      "25 a 34": 25.97,
      "35 a 44": 24.5,
      "45 a 55": 18.04,
      "56 +": 20.53,
      "NSE 1-2": 53.29,
      "NSE 3-4": 41.13,
      "NSE 5-6": 5.59,
    },
  },
  {
    nombre: "Entretenimiento",
    id: "ban_entretenimiento",
    alcance: 7661815,
    porcentajes: {
      mujeres: 47.2,
      hombres: 52.8,
      "18 a 24": 11.64,
      "25 a 34": 26.97,
      "35 a 44": 24.28,
      "45 a 55": 17.4,
      "56 +": 19.71,
      "NSE 1-2": 51.0,
      "NSE 3-4": 42.85,
      "NSE 5-6": 6.15,
    },
  },
  {
    nombre: "Gamers",
    id: "ban_gamers",
    alcance: 7636115,
    porcentajes: {
      mujeres: 45.99,
      hombres: 54.01,
      "18 a 24": 11.98,
      "25 a 34": 27.81,
      "35 a 44": 25.64,
      "45 a 55": 17.58,
      "56 +": 17.0,
      "NSE 1-2": 53.93,
      "NSE 3-4": 40.76,
      "NSE 5-6": 5.31,
    },
  },
  {
    nombre: "Finanzas",
    id: "ban_finanzas",
    alcance: 7455112,
    porcentajes: {
      mujeres: 46.33,
      hombres: 53.67,
      "18 a 24": 11.29,
      "25 a 34": 27.48,
      "35 a 44": 25.09,
      "45 a 55": 17.56,
      "56 +": 18.58,
      "NSE 1-2": 53.61,
      "NSE 3-4": 41.04,
      "NSE 5-6": 5.36,
    },
  },
  {
    nombre: "Empleo",
    id: "ban_empleo",
    alcance: 6823194,
    porcentajes: {
      mujeres: 46.19,
      hombres: 53.81,
      "18 a 24": 10.82,
      "25 a 34": 26.5,
      "35 a 44": 24.92,
      "45 a 55": 17.87,
      "56 +": 19.89,
      "NSE 1-2": 52.63,
      "NSE 3-4": 41.86,
      "NSE 5-6": 5.5,
    },
  },
  {
    nombre: "Banca",
    id: "ban_banca",
    alcance: 6531370,
    porcentajes: {
      mujeres: 46.7,
      hombres: 53.3,
      "18 a 24": 11.26,
      "25 a 34": 28.25,
      "35 a 44": 25.5,
      "45 a 55": 17.28,
      "56 +": 17.7,
      "NSE 1-2": 51.85,
      "NSE 3-4": 42.22,
      "NSE 5-6": 5.94,
    },
  },
  {
    nombre: "Música",
    id: "ban_musica",
    alcance: 5627632,
    porcentajes: {
      mujeres: 44.77,
      hombres: 55.23,
      "18 a 24": 12.3,
      "25 a 34": 27.49,
      "35 a 44": 24.74,
      "45 a 55": 17.36,
      "56 +": 18.11,
      "NSE 1-2": 50.97,
      "NSE 3-4": 42.53,
      "NSE 5-6": 6.5,
    },
  },
  {
    nombre: "Electrodomésticos (Tecnología)",
    id: "ban_tec_electrodomesticos",
    alcance: 5525265,
    porcentajes: {
      mujeres: 45.8,
      hombres: 54.2,
      "18 a 24": 10.7,
      "25 a 34": 24.9,
      "35 a 44": 24.65,
      "45 a 55": 18.42,
      "56 +": 21.33,
      "NSE 1-2": 55.96,
      "NSE 3-4": 39.33,
      "NSE 5-6": 4.71,
    },
  },
  {
    nombre: "Noticias",
    id: "ban_noticias",
    alcance: 4817937,
    porcentajes: {
      mujeres: 43.86,
      hombres: 56.14,
      "18 a 24": 7.96,
      "25 a 34": 23.95,
      "35 a 44": 25.49,
      "45 a 55": 19.05,
      "56 +": 23.55,
      "NSE 1-2": 50.98,
      "NSE 3-4": 42.88,
      "NSE 5-6": 6.14,
    },
  },
  {
    nombre: "Turismo",
    id: "ban_turismo",
    alcance: 4407954,
    porcentajes: {
      mujeres: 47.26,
      hombres: 52.74,
      "18 a 24": 11.93,
      "25 a 34": 28.55,
      "35 a 44": 24.76,
      "45 a 55": 16.99,
      "56 +": 17.79,
      "NSE 1-2": 48.2,
      "NSE 3-4": 44.6,
      "NSE 5-6": 7.19,
    },
  },
  {
    nombre: "Video",
    id: "ban_video",
    alcance: 4396169,
    porcentajes: {
      mujeres: 46.15,
      hombres: 53.85,
      "18 a 24": 12.94,
      "25 a 34": 29.17,
      "35 a 44": 24.68,
      "45 a 55": 16.9,
      "56 +": 16.31,
      "NSE 1-2": 55.32,
      "NSE 3-4": 39.87,
      "NSE 5-6": 4.82,
    },
  },
  {
    nombre: "Automotor",
    id: "ban_automotor",
    alcance: 4178652,
    porcentajes: {
      mujeres: 42.58,
      hombres: 57.42,
      "18 a 24": 9.53,
      "25 a 34": 25.8,
      "35 a 44": 25.13,
      "45 a 55": 18.27,
      "56 +": 21.28,
      "NSE 1-2": 51.72,
      "NSE 3-4": 42.69,
      "NSE 5-6": 5.59,
    },
  },
  {
    nombre: "Deportes",
    id: "ban_deportes",
    alcance: 4002075,
    porcentajes: {
      mujeres: 40.32,
      hombres: 59.68,
      "18 a 24": 9.6,
      "25 a 34": 26.21,
      "35 a 44": 25.6,
      "45 a 55": 17.99,
      "56 +": 20.61,
      "NSE 1-2": 52.75,
      "NSE 3-4": 41.81,
      "NSE 5-6": 5.44,
    },
  },
  {
    nombre: "Electrodomésticos",
    id: "ban_electrodomesticos",
    alcance: 3929072,
    porcentajes: {
      mujeres: 46.73,
      hombres: 53.27,
      "18 a 24": 10.69,
      "25 a 34": 27.28,
      "35 a 44": 25.4,
      "45 a 55": 17.89,
      "56 +": 18.75,
      "NSE 1-2": 53.51,
      "NSE 3-4": 40.68,
      "NSE 5-6": 5.8,
    },
  },
  {
    nombre: "Salud",
    id: "ban_salud",
    alcance: 3907247,
    porcentajes: {
      mujeres: 50.25,
      hombres: 49.75,
      "18 a 24": 11.65,
      "25 a 34": 27.57,
      "35 a 44": 24.78,
      "45 a 55": 17.44,
      "56 +": 18.55,
      "NSE 1-2": 51.6,
      "NSE 3-4": 42.53,
      "NSE 5-6": 5.87,
    },
  },
  {
    nombre: "Hogar",
    id: "ban_hogar",
    alcance: 3279946,
    porcentajes: {
      mujeres: 48.57,
      hombres: 51.43,
      "18 a 24": 11.99,
      "25 a 34": 29.09,
      "35 a 44": 25.12,
      "45 a 55": 16.72,
      "56 +": 17.07,
      "NSE 1-2": 49.57,
      "NSE 3-4": 44.17,
      "NSE 5-6": 6.26,
    },
  },
  {
    nombre: "Hobbies",
    id: "ban_hobbies",
    alcance: 3177431,
    porcentajes: {
      mujeres: 52.51,
      hombres: 47.49,
      "18 a 24": 9.73,
      "25 a 34": 27.82,
      "35 a 44": 26.06,
      "45 a 55": 18.07,
      "56 +": 18.33,
      "NSE 1-2": 55.16,
      "NSE 3-4": 39.95,
      "NSE 5-6": 4.89,
    },
  },
  {
    nombre: "Computadores (Tecnología)",
    id: "ban_tec_computadores",
    alcance: 3173777,
    porcentajes: {
      mujeres: 46.85,
      hombres: 53.15,
      "18 a 24": 8.43,
      "25 a 34": 26.19,
      "35 a 44": 26.04,
      "45 a 55": 18.8,
      "56 +": 20.53,
      "NSE 1-2": 53.38,
      "NSE 3-4": 40.87,
      "NSE 5-6": 5.75,
    },
  },
  {
    nombre: "Compras y Moda",
    id: "ban_comprasymoda",
    alcance: 3054438,
    porcentajes: {
      mujeres: 51.81,
      hombres: 48.19,
      "18 a 24": 12.23,
      "25 a 34": 29.12,
      "35 a 44": 25.31,
      "45 a 55": 16.76,
      "56 +": 16.59,
      "NSE 1-2": 49.53,
      "NSE 3-4": 44.1,
      "NSE 5-6": 6.37,
    },
  },
  {
    nombre: "Moda",
    id: "ban_moda",
    alcance: 2927255,
    porcentajes: {
      mujeres: 50.52,
      hombres: 49.48,
      "18 a 24": 11.54,
      "25 a 34": 28.84,
      "35 a 44": 25.58,
      "45 a 55": 17.03,
      "56 +": 17.0,
      "NSE 1-2": 49.68,
      "NSE 3-4": 43.9,
      "NSE 5-6": 6.42,
    },
  },
  {
    nombre: "Gastrobar",
    id: "ban_gastrobar",
    alcance: 2910901,
    porcentajes: {
      mujeres: 53.16,
      hombres: 46.84,
      "18 a 24": 10.34,
      "25 a 34": 29.16,
      "35 a 44": 26.36,
      "45 a 55": 17.56,
      "56 +": 16.58,
      "NSE 1-2": 55.14,
      "NSE 3-4": 40.0,
      "NSE 5-6": 4.86,
    },
  },
  {
    nombre: "Supermercados",
    id: "ban_supermercados",
    alcance: 2860079,
    porcentajes: {
      mujeres: 49.62,
      hombres: 50.38,
      "18 a 24": 12.99,
      "25 a 34": 29.34,
      "35 a 44": 24.82,
      "45 a 55": 16.43,
      "56 +": 16.43,
      "NSE 1-2": 52.21,
      "NSE 3-4": 42.55,
      "NSE 5-6": 5.24,
    },
  },
  {
    nombre: "Negocios",
    id: "ban_negocios",
    alcance: 2469743,
    porcentajes: {
      mujeres: 44.86,
      hombres: 55.14,
      "18 a 24": 7.17,
      "25 a 34": 25.96,
      "35 a 44": 26.98,
      "45 a 55": 19.26,
      "56 +": 20.62,
      "NSE 1-2": 57.3,
      "NSE 3-4": 38.54,
      "NSE 5-6": 4.16,
    },
  },
  {
    nombre: "Educación",
    id: "educacion",
    alcance: 2366063,
    porcentajes: {
      mujeres: 49.88,
      hombres: 50.12,
      "18 a 24": 13.32,
      "25 a 34": 28.08,
      "35 a 44": 25.25,
      "45 a 55": 17.15,
      "56 +": 16.21,
      "NSE 1-2": 51.0,
      "NSE 3-4": 43.24,
      "NSE 5-6": 5.77,
    },
  },
  {
    nombre: "Celulares (Tecnología)",
    id: "ban_tec_celulares",
    alcance: 2185105,
    porcentajes: {
      mujeres: 47.29,
      hombres: 52.71,
      "18 a 24": 8.82,
      "25 a 34": 26.43,
      "35 a 44": 25.42,
      "45 a 55": 18.57,
      "56 +": 20.76,
      "NSE 1-2": 51.65,
      "NSE 3-4": 41.43,
      "NSE 5-6": 6.92,
    },
  },
  {
    nombre: "Fútbol",
    id: "ban_futbol",
    alcance: 2050355,
    porcentajes: {
      mujeres: 36.59,
      hombres: 63.41,
      "18 a 24": 10.8,
      "25 a 34": 26.03,
      "35 a 44": 25.3,
      "45 a 55": 17.81,
      "56 +": 20.06,
      "NSE 1-2": 52.43,
      "NSE 3-4": 42.52,
      "NSE 5-6": 5.05,
    },
  },
  {
    nombre: "Pagos Online",
    id: "ban_pagos_online",
    alcance: 1926205,
    porcentajes: {
      mujeres: 46.5,
      hombres: 53.5,
      "18 a 24": 12.67,
      "25 a 34": 31.38,
      "35 a 44": 26.7,
      "45 a 55": 15.77,
      "56 +": 13.49,
      "NSE 1-2": 47.79,
      "NSE 3-4": 45.08,
      "NSE 5-6": 7.13,
    },
  },
  {
    nombre: "Billetera Digital",
    id: "ban_billetera",
    alcance: 1724043,
    porcentajes: {
      mujeres: 46.46,
      hombres: 53.54,
      "18 a 24": 12.2,
      "25 a 34": 31.58,
      "35 a 44": 26.09,
      "45 a 55": 16.27,
      "56 +": 13.86,
      "NSE 1-2": 50.91,
      "NSE 3-4": 43.36,
      "NSE 5-6": 5.73,
    },
  },
  {
    nombre: "Droguería",
    id: "ban_drogueria",
    alcance: 1687315,
    porcentajes: {
      mujeres: 56.17,
      hombres: 43.83,
      "18 a 24": 14.48,
      "25 a 34": 31.16,
      "35 a 44": 23.36,
      "45 a 55": 15.27,
      "56 +": 15.71,
      "NSE 1-2": 49.37,
      "NSE 3-4": 44.29,
      "NSE 5-6": 6.35,
    },
  },
  {
    nombre: "Salud y Fitness",
    id: "ban_salud_fitness",
    alcance: 1486353,
    porcentajes: {
      mujeres: 52.83,
      hombres: 47.17,
      "18 a 24": 16.15,
      "25 a 34": 30.39,
      "35 a 44": 21.84,
      "45 a 55": 15.26,
      "56 +": 16.36,
      "NSE 1-2": 48.28,
      "NSE 3-4": 44.91,
      "NSE 5-6": 6.81,
    },
  },
  {
    nombre: "Cine",
    id: "ban_cine",
    alcance: 1318981,
    porcentajes: {
      mujeres: 47.83,
      hombres: 52.17,
      "18 a 24": 13.28,
      "25 a 34": 32.47,
      "35 a 44": 25.91,
      "45 a 55": 15.86,
      "56 +": 12.48,
      "NSE 1-2": 48.67,
      "NSE 3-4": 44.48,
      "NSE 5-6": 6.85,
    },
  },
  {
    nombre: "Construcción",
    id: "ban_construccion",
    alcance: 1298746,
    porcentajes: {
      mujeres: 46.02,
      hombres: 53.98,
      "18 a 24": 9.13,
      "25 a 34": 29.93,
      "35 a 44": 26.01,
      "45 a 55": 17.21,
      "56 +": 17.72,
      "NSE 1-2": 49.73,
      "NSE 3-4": 43.9,
      "NSE 5-6": 6.37,
    },
  },
  {
    nombre: "Finanzas Personales",
    id: "ban_finanzas_pers",
    alcance: 1265058,
    porcentajes: {
      mujeres: 45.29,
      hombres: 54.71,
      "18 a 24": 7.77,
      "25 a 34": 28.58,
      "35 a 44": 27.7,
      "45 a 55": 18.4,
      "56 +": 17.55,
      "NSE 1-2": 57.42,
      "NSE 3-4": 38.69,
      "NSE 5-6": 3.9,
    },
  },
  {
    nombre: "Conciertos",
    id: "ban_conciertos",
    alcance: 1131758,
    porcentajes: {
      mujeres: 45.67,
      hombres: 54.33,
      "18 a 24": 12.85,
      "25 a 34": 29.2,
      "35 a 44": 23.82,
      "45 a 55": 15.96,
      "56 +": 18.16,
      "NSE 1-2": 49.37,
      "NSE 3-4": 44.55,
      "NSE 5-6": 6.09,
    },
  },
  {
    nombre: "Comida y Bebida",
    id: "ban_comidaybebida",
    alcance: 1096531,
    porcentajes: {
      mujeres: 49.64,
      hombres: 50.36,
      "18 a 24": 16.21,
      "25 a 34": 34.54,
      "35 a 44": 22.79,
      "45 a 55": 13.49,
      "56 +": 12.97,
      "NSE 1-2": 37.88,
      "NSE 3-4": 50.47,
      "NSE 5-6": 11.66,
    },
  },
  {
    nombre: "Cosméticos",
    id: "ban_cosmeticos",
    alcance: 1083887,
    porcentajes: {
      mujeres: 63.23,
      hombres: 36.77,
      "18 a 24": 17.2,
      "25 a 34": 31.0,
      "35 a 44": 22.78,
      "45 a 55": 14.66,
      "56 +": 14.35,
      "NSE 1-2": 51.32,
      "NSE 3-4": 42.55,
      "NSE 5-6": 6.13,
    },
  },
  {
    nombre: "Competencia",
    id: "ban_competencia",
    alcance: 1074241,
    porcentajes: {
      mujeres: 46.74,
      hombres: 53.26,
      "18 a 24": 12.93,
      "25 a 34": 29.96,
      "35 a 44": 25.63,
      "45 a 55": 15.88,
      "56 +": 15.6,
      "NSE 1-2": 51.82,
      "NSE 3-4": 42.36,
      "NSE 5-6": 5.81,
    },
  },
];

/**
 * Calcula el score de afinidad entre la audiencia seleccionada y una bandera demográfica
 * @param {Object} audiencia - {genero, edad: [], nivelSocioeconomico: []}
 * @param {Object} bandera - Objeto de bandera demográfica
 * @returns {number} Score de 0 a 100
 */
export function calcularScoreBandera(audiencia, bandera) {
  let score = 0;
  let factores = 0;

  // Factor 1: Género (peso: 30%)
  if (audiencia.genero && audiencia.genero !== "Todos") {
    const generoKey = audiencia.genero === "Mujeres" ? "mujeres" : "hombres";
    const porcentajeGenero = bandera.porcentajes[generoKey];

    // Score basado en qué tan representado está el género
    if (porcentajeGenero >= 60) score += 30;
    else if (porcentajeGenero >= 50) score += 25;
    else if (porcentajeGenero >= 45) score += 20;
    else score += 10;

    factores++;
  }

  // Factor 2: Edad (peso: 40%)
  if (
    audiencia.edad &&
    Array.isArray(audiencia.edad) &&
    audiencia.edad.length > 0
  ) {
    let edadScore = 0;
    let edadCount = 0;

    audiencia.edad.forEach((rangoEdad) => {
      const columnasEdad = MAPEO_EDAD[rangoEdad] || [rangoEdad];

      columnasEdad.forEach((columna) => {
        const porcentajeEdad = bandera.porcentajes[columna];
        if (porcentajeEdad !== undefined) {
          edadScore += porcentajeEdad;
          edadCount++;
        }
      });
    });

    if (edadCount > 0) {
      const promedioEdad = edadScore / edadCount;
      // Normalizar a 40 puntos máximo
      score += Math.min(40, (promedioEdad / 35) * 40);
      factores++;
    }
  }

  // Factor 3: NSE (peso: 30%)
  if (
    audiencia.nivelSocioeconomico &&
    Array.isArray(audiencia.nivelSocioeconomico) &&
    audiencia.nivelSocioeconomico.length > 0
  ) {
    let nseScore = 0;
    let nseCount = 0;

    audiencia.nivelSocioeconomico.forEach((nivelNSE) => {
      const columnasNSE = MAPEO_NSE[nivelNSE] || [nivelNSE];

      columnasNSE.forEach((columna) => {
        const porcentajeNSE = bandera.porcentajes[columna];
        if (porcentajeNSE !== undefined) {
          nseScore += porcentajeNSE;
          nseCount++;
        }
      });
    });

    if (nseCount > 0) {
      const promedioNSE = nseScore / nseCount;
      // Normalizar a 30 puntos máximo
      score += Math.min(30, (promedioNSE / 50) * 30);
      factores++;
    }
  }

  return factores > 0 ? score : 0;
}

/**
 * Encuentra las banderas más relevantes para una audiencia específica
 * @param {Object} audiencia - {genero, edad: [], nivelSocioeconomico: []}
 * @param {number} limit - Número máximo de banderas a retornar
 * @returns {Array} Array de banderas ordenadas por relevancia con su score
 */
export function encontrarBanderasRelevantes(audiencia, limit = 10) {
  const banderasConScore = BANDERAS_DEMOGRAFICAS.map((bandera) => ({
    ...bandera,
    score: calcularScoreBandera(audiencia, bandera),
  }))
    .filter((b) => b.score > 0)
    .sort((a, b) => b.score - a.score);

  return banderasConScore.slice(0, limit);
}

/**
 * Calcula el alcance potencial total de una propuesta
 * @param {Object} audiencia - {genero, edad: [], nivelSocioeconomico: []}
 * @returns {Object} {alcanceTotal, banderasPrincipales}
 */
export function calcularValorPropuesta(audiencia) {
  const banderasTop = encontrarBanderasRelevantes(audiencia, 10);

  // Calcular alcance total (suma de las top 5 banderas para no sobre-estimar)
  const alcanceTotal = banderasTop
    .slice(0, 5)
    .reduce((sum, b) => sum + b.alcance, 0);

  // Banderas principales (top 3 con info detallada)
  const banderasPrincipales = banderasTop.slice(0, 3).map((b) => ({
    nombre: b.nombre,
    alcance: formatearNumero(b.alcance),
    score: Math.round(b.score),
  }));

  return {
    alcanceTotal: formatearNumero(alcanceTotal),
    alcanceTotalNumerico: alcanceTotal,
    banderasPrincipales,
    todasBanderas: banderasTop.map((b) => ({
      nombre: b.nombre,
      alcance: formatearNumero(b.alcance),
      score: Math.round(b.score),
    })),
  };
}

/**
 * Formatea números grandes con separadores de miles
 * @param {number} numero
 * @returns {string}
 */
function formatearNumero(numero) {
  return numero.toLocaleString("es-CO");
}
