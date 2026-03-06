# Guía de Integración con ChatGPT API

Este documento explica cómo integrar la API real de ChatGPT al proyecto.

## Requisitos Previos

1. Cuenta en OpenAI (https://platform.openai.com/)
2. API Key de OpenAI
3. Créditos disponibles en la cuenta

## Configuración

### 1. Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
VITE_OPENAI_API_KEY=sk-your-api-key-here
VITE_OPENAI_MODEL=gpt-4
```

**Importante**: Agregar `.env` al `.gitignore` para no exponer tu API key

### 2. Instalar Dependencias Adicionales (opcional)

Si prefieres usar el cliente oficial de OpenAI:

```bash
npm install openai
```

## Pasos de Integración

### Opción 1: Usando Fetch API (Actual)

El archivo `src/services/apiService.js` ya está preparado con ejemplos usando fetch.

1. Descomentar las funciones en `apiService.js`
2. Actualizar `ChatAgent.jsx` para usar las funciones de la API:

```jsx
import { generarPropuestaConIA, generarMensajeContextual } from '../services/apiService';

// En lugar de usar mockData:
const propuesta = await generarPropuestaConIA(userData);
```

### Opción 2: Usando el SDK de OpenAI

Si instalaste el paquete `openai`:

```javascript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Solo para desarrollo
});

const completion = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: userPrompt }
  ],
});
```

## Modificaciones Requeridas

### 1. ChatAgent.jsx

Reemplazar la función `addAgentMessage` para usar respuestas reales:

```jsx
const addAgentMessage = async (message, useAI = false) => {
  setIsTyping(true);

  try {
    let finalMessage = message;

    if (useAI) {
      finalMessage = await generarMensajeContextual(currentStep, userData);
    }

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { text: finalMessage, isUser: false }]);
    }, 800);
  } catch (error) {
    // Fallback al mensaje original
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { text: message, isUser: false }]);
    }, 800);
  }
};
```

### 2. Generar Propuesta Final

En el paso de `afinidades`, reemplazar:

```jsx
const handleAfinidadesSelect = async (afinidades, isConfirmed) => {
  if (!isConfirmed) {
    setSelectedAfinidades(afinidades);
    return;
  }

  addUserMessage(`${afinidades.length} afinidades seleccionadas`);
  const updatedUserData = { ...userData, afinidades };
  setUserData(updatedUserData);

  setTimeout(async () => {
    addAgentMessage('Generando tu propuesta estratégica personalizada...');

    try {
      // Usar la API real
      const propuesta = await generarPropuestaConIA(updatedUserData);
      setTimeout(() => {
        onComplete(propuesta);
      }, 1500);
    } catch (error) {
      console.error('Error:', error);
      // Fallback a datos mock
      const propuesta = generarPropuestaEstrategica(updatedUserData);
      setTimeout(() => {
        onComplete(propuesta);
      }, 1500);
    }
  }, 500);
};
```

## Mejoras Adicionales

### 1. Streaming de Respuestas

Para respuestas más naturales en tiempo real:

```javascript
const stream = await openai.chat.completions.create({
  model: 'gpt-4',
  messages: messages,
  stream: true,
});

for await (const chunk of stream) {
  const content = chunk.choices[0]?.delta?.content || '';
  // Actualizar el mensaje en tiempo real
}
```

### 2. Cache de Respuestas

Para reducir costos, cachear respuestas similares:

```javascript
const cacheKey = JSON.stringify({ sector, genero, edad });
const cached = localStorage.getItem(cacheKey);
if (cached) {
  return JSON.parse(cached);
}
```

### 3. Rate Limiting

Implementar rate limiting para evitar exceder límites de la API:

```javascript
let lastRequest = 0;
const MIN_DELAY = 1000; // 1 segundo entre requests

const waitForRateLimit = async () => {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequest;
  if (timeSinceLastRequest < MIN_DELAY) {
    await new Promise(resolve =>
      setTimeout(resolve, MIN_DELAY - timeSinceLastRequest)
    );
  }
  lastRequest = Date.now();
};
```

## Seguridad

### ⚠️ IMPORTANTE: No exponer API Keys en el frontend

Para producción, se recomienda:

1. **Backend Proxy**: Crear un backend que maneje las llamadas a OpenAI
2. **Serverless Functions**: Usar funciones serverless (Vercel, Netlify, AWS Lambda)
3. **Rate Limiting**: Implementar límites en el backend
4. **Autenticación**: Agregar autenticación de usuarios

### Ejemplo de Backend Proxy (Node.js/Express)

```javascript
// server.js
import express from 'express';
import OpenAI from 'openai';

const app = express();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: messages,
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000);
```

## Testing

Antes de liberar a producción:

1. Probar con diferentes combinaciones de datos
2. Verificar manejo de errores cuando la API falla
3. Probar límites de rate
4. Validar costos (cada llamada a GPT-4 tiene un costo)

## Costos

Estimar costos aproximados:

- GPT-4: ~$0.03 por cada 1K tokens input, ~$0.06 por 1K tokens output
- GPT-3.5-turbo: Mucho más económico (~10x menos)
- Una conversación completa: ~500-1000 tokens aprox

Para el demo, considera usar GPT-3.5-turbo inicialmente.

## Troubleshooting

### Error: API key not found

- Verificar que `.env` esté en la raíz
- Reiniciar el servidor de desarrollo después de agregar `.env`
- Verificar que la variable empiece con `VITE_`

### Error: 429 Too Many Requests

- Has excedido el rate limit
- Implementar delays entre requests
- Considerar upgrade del plan en OpenAI

### Error: Insufficient quota

- Sin créditos en la cuenta de OpenAI
- Agregar método de pago o esperar reset mensual

## Recursos

- [OpenAI API Docs](https://platform.openai.com/docs)
- [Rate Limits](https://platform.openai.com/docs/guides/rate-limits)
- [Best Practices](https://platform.openai.com/docs/guides/production-best-practices)
