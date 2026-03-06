# Experiencia 3: Customer Journey Interactivo

## 📋 Descripción

Se ha implementado la "Experiencia 3" que demuestra que no basta con conocer a la audiencia, sino que la venta depende de activar el insight correcto en el momento correcto del journey.

## 🎯 Objetivo

Llevar al usuario a reflexionar sobre **cuándo** es más efectiva su comunicación, no solo **qué** comunicar.

## 🔄 Flujo de la Experiencia

### 1. **Primera Pregunta (Intuición)**

Después de seleccionar afinidades, el agente pregunta:

> "¿En qué momento crees que tu comunicación tiene más poder para influir en tu audiencia?"

**Componente:** `JourneyStageSelector`

- Muestra 5 etapas visuales: Descubre 🔍 → Explora 🌐 → Compara ⚖️ → Decide 💡 → Compra 🛍️
- Usuario selecciona intuitivamente una etapa
- Diseño tipo "alfombra digital" con tarjetas coloridas

**Expectativa común:** La mayoría elige "Decide" o "Compra"

### 2. **Intervención del Asesor (Insight + Mensaje)**

El agente introduce el concepto clave:

- Conecta con las afinidades descubiertas previamente
- Plantea: "No solo qué consume… sino cómo piensa"
- Reformula la pregunta: "¿Qué deberíamos decirle… y cuándo?"

### 3. **Escenario Aplicado con Ejemplos**

El agente muestra ejemplos **personalizados por sector**:

**Ejemplo Consumo Masivo:**

```
Contexto: "Una familia busca productos más saludables para su alimentación diaria."

🔍 Descubre: "Hay nuevas bebidas hechas con ingredientes 100% naturales."
🌐 Explora: "Sin conservantes, con fruta real y vitaminas esenciales."
⚖️ Compara: "30% menos azúcar que otras marcas, certificación orgánica."
💡 Decide: "Promoción en tu tienda cercana, encuentra el punto de venta."
🛍️ Compra: "Llévate 2 y paga 1 en toda la línea familiar."
```

**Otros sectores disponibles:**

- Financiero (inversiones familiares)
- Automotor (vehículos eléctricos)
- Educación (programas virtuales)
- Gobierno (vivienda social)
- Salud (planes integrales)
- Tecnología (equipamiento de oficina)
- Moda (moda sostenible)
- Entretenimiento (streaming)
- Retail (electrodomésticos)

### 4. **Segunda Selección (Replanteamiento)**

Después de ver los ejemplos, el agente pregunta nuevamente:

> "Ahora que viste los ejemplos... ¿Cambiarías tu respuesta?"

**Comportamiento esperado:**

- Los usuarios tienden a moverse hacia etapas tempranas: "Descubre", "Explora", "Compara"
- Comprenden que la decisión se construye gradualmente

### 5. **Revelación con Data**

El agente comparte tres aprendizajes clave:

**1️⃣ La decisión no ocurre en un solo momento**

- Se construye desde etapas tempranas del journey
- No es un evento único sino un proceso

**2️⃣ El insight correcto cambia la percepción antes de la compra**

- No se trata solo de promociones
- Es crear valor en cada etapa

**3️⃣ La comunicación efectiva acompaña el journey completo**

- Cada etapa requiere un mensaje diferente pero coherente
- Estrategia integrada, no mensajes aislados

### 6. **Cierre con Claro Media**

Conexión con la propuesta de valor:

> "La pregunta no es solo dónde pautar… es qué decir en cada momento del journey.
>
> Y ahí es donde Claro Media permite activar: **descubrimiento**, **consideración** y **decisión** con data real de audiencias."

### 7. **Generación de Propuesta Final**

Con toda esta información recopilada, se genera la propuesta estratégica completa.

## 🎨 Componentes Visuales

### JourneyStageSelector

**Características:**

- Grid responsive (2 columnas en móvil, 5 en desktop)
- Línea conectora con gradiente entre etapas
- Tarjetas con colores diferenciados:
  - Descubre: Azul
  - Explora: Morado
  - Compara: Amarillo
  - Decide: Naranja
  - Compra: Rojo Claro
- Efectos hover con escala
- Check mark animado en selección
- Números de etapa en esquina
- Botón "Confirmar selección" dinámico

**Props:**

- `title`: Título principal
- `subtitle`: Subtítulo explicativo
- `onSelect`: Callback con etapa seleccionada

## 📊 Datos Estructurados

### MENSAJES_JOURNEY_POR_SECTOR

Objeto con ejemplos para cada sector:

```javascript
{
  sector: {
    contexto: "Situación del consumidor",
    descubre: "Mensaje etapa 1",
    explora: "Mensaje etapa 2",
    compara: "Mensaje etapa 3",
    decide: "Mensaje etapa 4",
    compra: "Mensaje etapa 5"
  }
}
```

### REVELACIONES_JOURNEY

Estructura con aprendizajes y cierre:

```javascript
{
  titulo: "Tres aprendizajes clave:",
  aprendizajes: [
    { numero, texto, detalle },
    ...
  ],
  cierre: "Mensaje final conectando con Claro Media"
}
```

## 🔄 Estados Nuevos en ChatAgent

```javascript
const [primeraSeleccionJourney, setPrimeraSeleccionJourney] = useState(null);
const [segundaSeleccionJourney, setSegundaSeleccionJourney] = useState(null);
```

Estos estados capturan ambas selecciones del usuario para análisis posterior.

## 💬 Flujo de Mensajes

1. Confirmación de afinidades
2. Introducción a reflexión estratégica
3. Primera pregunta sobre impacto
4. **[Usuario selecciona]** → Captura primera intuición
5. Conexión con afinidades descubiertas
6. Replanteamiento: "¿Qué decir y cuándo?"
7. Presentación de contexto del sector
8. Ejemplos detallados de cada etapa del journey
9. Segunda pregunta (con nueva perspectiva)
10. **[Usuario selecciona nuevamente]** → Captura reflexión educada
11. Revelación: 3 aprendizajes clave (secuencial)
12. Cierre conectando con Claro Media
13. Generación de propuesta final

## ⏱️ Timing de Animaciones

- Mensajes con typing effect: 800ms
- Delays entre mensajes: 1000-1500ms
- Ejemplos del journey: 1500ms entre cada uno
- Revelaciones: 2000ms entre aprendizajes
- Total experiencia: ~30-40 segundos

## 🎯 Impacto Educativo

### Antes de la experiencia:

- Usuario piensa en "compra" o "decisión"
- Foco en momento transaccional
- Visión limitada del journey

### Después de la experiencia:

- Comprende la importancia de etapas tempranas
- Entiende que cada etapa necesita mensaje diferente
- Valora la comunicación integral
- Conecta insight con momento correcto

## 🚀 Mejoras de UX

1. **Visual:** Etapas coloridas con iconos claros
2. **Interactivo:** Dos oportunidades de selección
3. **Educativo:** Ejemplos contextuales por sector
4. **Memorable:** Revelaciones numeradas y espaciadas
5. **Relevante:** Conexión directa con Claro Media

## 📱 Responsive

- **Desktop:** 5 tarjetas horizontales con línea conectora
- **Tablet:** 3-2 distribución con ajuste de espaciado
- **Mobile:** 2 columnas apiladas, línea oculta

## ♿ Accesibilidad

- Hover states claros
- Selección visual con check mark
- Números de etapa como referencia
- Descripciones breves en cada tarjeta
- Botón grande y claro para confirmar

## 🎓 Valor Pedagógico

Esta experiencia transforma la conversación de **producto** (Claro Media) a **estrategia** (cómo comunicar efectivamente), posicionando a Claro Media como un partner estratégico, no solo un proveedor de medios.

## 📈 Métricas Potenciales

En una implementación con analytics, se podría capturar:

- Primera selección vs segunda selección
- Cambio de opinión post-ejemplos
- Sectores con mayor cambio de perspectiva
- Etapas más elegidas inicialmente
- Etapas más elegidas después de educación

---

**Implementado:** 6 de marzo de 2026  
**Componentes nuevos:** JourneyStageSelector.jsx  
**Componentes actualizados:** ChatAgent.jsx, ChatMessage.jsx, mockData.js  
**Duración de experiencia:** ~30-40 segundos  
**Sectores con ejemplos:** 10 (todos los disponibles)
