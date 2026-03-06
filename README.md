# Agente IA - Claro Media

Landing page moderna e interactiva para el Agente de IA de Claro Media, desarrollado con React y Tailwind CSS. Este proyecto presenta un chat conversacional inteligente que recopila información del usuario y genera propuestas estratégicas personalizadas basadas en insights de datos.

## Características

- **Chat Conversacional**: Interfaz de chat intuitiva que guía al usuario a través de un proceso de perfilamiento
- **Recolección de Datos**: Captura información sobre sector, demografía y afinidades de la audiencia
- **Insights Personalizados**: Genera propuestas estratégicas basadas en los datos recopilados
- **Diseño Moderno**: Interfaz glassmorphism con animaciones fluidas
- **Responsive**: Diseño adaptable para todos los dispositivos
- **UX/UI Premium**: Experiencia de usuario profesional sin exceso de emojis

## Tecnologías

- React 18
- Tailwind CSS
- Vite
- Framer Motion (para animaciones)

## Estructura del Proyecto

```
chatgpt-claro-media/
├── public/
│   └── Fondo.jpeg          # Imagen de fondo
├── src/
│   ├── components/
│   │   ├── ChatAgent.jsx   # Componente principal del chat
│   │   ├── ChatMessage.jsx # Mensajes del chat
│   │   ├── ChatOptions.jsx # Botones de opciones
│   │   └── ResultsView.jsx # Vista de resultados
│   ├── data/
│   │   └── mockData.js     # Datos mock del agente
│   ├── App.jsx             # Componente principal
│   ├── main.jsx            # Punto de entrada
│   └── index.css           # Estilos globales
├── ejemplo_agente.csv      # Datos de referencia
└── package.json
```

## Instalación

1. Clona el repositorio
2. Instala las dependencias:

```bash
npm install
```

## Ejecución

Para ejecutar el proyecto en modo desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Build para Producción

Para crear una versión optimizada para producción:

```bash
npm run build
```

Los archivos compilados se generarán en la carpeta `dist/`

## Próximos Pasos

Este proyecto está configurado con datos de prueba. Para conectarlo con la API real de ChatGPT:

1. Crear un servicio en `src/services/apiService.js`
2. Integrar las llamadas a la API de ChatGPT en el componente `ChatAgent`
3. Configurar las variables de entorno para las credenciales de la API
4. Actualizar la función `generarPropuestaEstrategica` para usar respuestas reales

## Flujo del Usuario

1. **Bienvenida**: El agente se presenta y explica su función
2. **Sector**: Usuario selecciona el sector de su empresa
3. **Género**: Define el género de la audiencia objetivo
4. **Edad**: Selecciona el rango de edad
5. **Nivel Socioeconómico**: Define el nivel socioeconómico
6. **Afinidades**: Selecciona múltiples afinidades relevantes
7. **Resultados**: Se muestra la propuesta estratégica completa con:
   - Perfil de audiencia
   - Afinidades identificadas
   - Insights clave
   - Recomendaciones estratégicas
   - Próximos pasos

## Personalización

- **Colores**: Modificar en `tailwind.config.js` la sección `colors.claro`
- **Animaciones**: Ajustar en `tailwind.config.js` las animaciones personalizadas
- **Datos**: Actualizar `src/data/mockData.js` con nueva información

## Autor

Desarrollado para Claro Media - 2026
