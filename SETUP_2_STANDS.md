# 🎯 Sistema de 2 Stands - Documentación

## 📺 Configuración de Pantallas

### **Stand A**

#### Pantalla 1 (Conversación)

```
http://localhost:5173/?stand=A
```

- Usuario completa cuestionario
- IA genera propuesta
- Datos se guardan en Firebase con `standId: "A"`
- **NO muestra resultados**

#### Pantalla 2 (Resultados)

```
http://localhost:5173/display?stand=A
```

- Escucha cambios en Firebase para Stand A
- Muestra resultados **automáticamente** cuando se completan
- Sincronización en tiempo real

---

### **Stand B**

#### Pantalla 1 (Conversación)

```
http://localhost:5173/?stand=B
```

- Usuario completa cuestionario
- IA genera propuesta
- Datos se guardan en Firebase con `standId: "B"`
- **NO muestra resultados**

#### Pantalla 2 (Resultados)

```
http://localhost:5173/display?stand=B
```

- Escucha cambios en Firebase para Stand B
- Muestra resultados **automáticamente** cuando se completan
- Sincronización en tiempo real

---

## 🔄 Flujo Completo

### 1. **Usuario llega al Stand**

```
Pantalla 1: http://localhost:5173/?stand=A  (o B)
```

- Ve interface del chat
- Completa formulario de datos personales

### 2. **Conversación con IA**

- Responde preguntas demográficas
- Selecciona afinidades
- Completa journey map
- IA genera propuesta

### 3. **Datos se guardan en Firebase**

```javascript
{
  standId: "A",  // ← Identificador del stand
  nombre, correo, celular,
  sector, genero, edad,
  afinidades, journey,
  propuesta: { insights, recomendaciones, ... },
  estado: "completado"
}
```

### 4. **Pantalla 2 detecta cambio**

```
Pantalla 2: http://localhost:5173/display?stand=A
```

- Listener de Firebase detecta nuevo documento con `standId: "A"`
- Automáticamente muestra resultados
- Usuario ve su propuesta estratégica

---

## 🚫 Separación de Datos

### ¿Cómo se mantienen independientes?

Cada stand tiene su propio `standId`:

- Stand A → `standId: "A"`
- Stand B → `standId: "B"`

Firebase filtra por `standId`:

```javascript
query(
  collection(db, "ClaroMediaAgenteIA"),
  where("standId", "==", standId),  // Solo documentos de este stand
  where("estado", "==", "completado"),
  orderBy("ultimaActualizacion", "desc"),
  limit(1)
)
```

**Resultado**: Cada pantalla 2 solo ve datos de su propio stand ✅

---

## 🖥️ Setup Recomendado

### **Opción 1: 2 Computadoras**

**Computadora 1 (Stand A):**

- Monitor 1: `http://localhost:5173/?stand=A`
- Monitor 2: `http://localhost:5173/display?stand=A`

**Computadora 2 (Stand B):**

- Monitor 1: `http://localhost:5173/?stand=B`
- Monitor 2: `http://localhost:5173/display?stand=B`

### **Opción 2: 1 Computadora con 4 monitores**

- Monitor 1: `http://localhost:5173/?stand=A`
- Monitor 2: `http://localhost:5173/display?stand=A`
- Monitor 3: `http://localhost:5173/?stand=B`
- Monitor 4: `http://localhost:5173/display?stand=B`

---

## 📱 Modo Kiosko (Recomendado para evento)

### Chrome en Modo Kiosko:

**Windows:**

```bash
chrome.exe --kiosk --app="http://localhost:5173/?stand=A"
```

**Mac:**

```bash
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --kiosk --app="http://localhost:5173/?stand=A"
```

**Linux:**

```bash
google-chrome --kiosk --app="http://localhost:5173/?stand=A"
```

Esto abre Chrome en pantalla completa sin barras de navegación.

---

## 🎬 Inicio del Evento

### Antes del evento:

1. **Iniciar servidor de desarrollo:**

```bash
npm run dev
```

2. **Abrir Pantallas Stand A:**
   - Navegador 1: `http://localhost:5173/?stand=A`
   - Navegador 2: `http://localhost:5173/display?stand=A`

3. **Abrir Pantallas Stand B:**
   - Navegador 1: `http://localhost:5173/?stand=B`
   - Navegador 2: `http://localhost:5173/display?stand=B`

4. **Verificar:**
   - Firebase Console abierto
   - OpenAI Dashboard para monitorear costos

---

## 🔍 Monitoreo Durante el Evento

### Firebase Console:

```
https://console.firebase.google.com
→ proyecto: imagen-ia-845a3
→ Firestore Database
→ Colección: ClaroMediaAgenteIA
```

**Ver documentos por stand:**

- Filtrar por `standId == "A"`
- Filtrar por `standId == "B"`

### OpenAI Dashboard:

```
https://platform.openai.com/usage
```

- Ver tokens consumidos
- Costo en tiempo real

---

## 🛠️ Troubleshooting

### **Problema**: Pantalla 2 no muestra resultados

**Solución**:

1. Verificar que URL tiene `?stand=A` o `?stand=B`
2. Abrir consola del navegador (F12)
3. Buscar log: `🔊 Escuchando conversaciones del Stand X`
4. Verificar Firebase Console que documento tiene `standId` correcto

### **Problema**: Se mezclan datos entre stands

**Solución**:

1. Verificar que cada pantalla tiene el `standId` correcto en la URL
2. Revisar logs en consola:
   - `💾 Documento creado en Firebase con ID: xxx - Stand: A`
3. Confirmar en Firebase que docs tienen `standId` correcto

### **Problema**: Resultados no se actualizan automáticamente

**Solución**:

1. Recargar Pantalla 2 (F5)
2. Verificar conexión a internet
3. Revisar reglas de seguridad en Firebase:

```javascript
allow read, write: if true;
```

---

## 🎨 Personalización

### Cambiar nombres de stands:

Si quieres usar nombres en lugar de letras (ej: "Norte" y "Sur"):

**En la URL:**

```
http://localhost:5173/?stand=Norte
http://localhost:5173/?stand=Sur
```

**En el código**: Ya funciona automáticamente, solo cambia la URL.

---

## 📊 Datos Guardados

### Estructura en Firebase:

```javascript
{
  // Stand ID
  standId: "A",  // ← IMPORTANTE: Identifica el stand

  // Datos personales
  nombre: "Juan Pérez",
  correo: "juan@empresa.com",
  celular: "3001234567",

  // Demografía
  sector: "Tecnología",
  genero: "Hombres",
  edad: "25 a 34",
  nivelSocioeconomico: "Medio (C)",

  // Afinidades y Journey
  afinidades: ["Tecnología", "Educación"],
  primeraSeleccionJourney: "Explora",
  segundaSeleccionJourney: "Compara",

  // Propuesta IA
  propuesta: {
    insights: [...],
    recomendaciones: [...],
    proximosPasos: [...]
  },

  // Metadata
  timestamp: Timestamp,
  ultimaActualizacion: Timestamp,
  estado: "completado",
  modo: "production",
  modeloIA: "gpt-4o"
}
```

---

## 💰 Costos

### Por evento de 100 personas (50 por stand):

- **50 conversaciones Stand A**
- **50 conversaciones Stand B**
- **Total**: 100 conversaciones
- **Costo estimado**: $10-15 USD

### Firebase:

- **Gratis** (hasta 20,000 escrituras/día)
- 100 conversaciones = 200 escrituras (100 crear + 100 actualizar)

---

## ✅ Checklist Pre-Evento

### 1 día antes:

- [ ] Servidor funcionando: `npm run dev`
- [ ] URLs de Stand A abiertas y probadas
- [ ] URLs de Stand B abiertas y probadas
- [ ] Firebase guardando correctamente con `standId`
- [ ] OpenAI API key válida
- [ ] Modo production activado: `VITE_MODE=production`

### Día del evento:

- [ ] Computadoras encendidas
- [ ] Internet conectado
- [ ] Firebase Console abierto
- [ ] OpenAI Dashboard para monitoreo
- [ ] Pantallas en modo kiosko (opcional)

---

## 🚀 ¡Todo Listo!

Tu sistema ahora soporta 2 stands independientes con sincronización automática en tiempo real. Cada stand tiene su propia pantalla de conversación y su propia pantalla de resultados, sin mezclar datos.

**URLs Rápidas:**

- Stand A Chat: `http://localhost:5173/?stand=A`
- Stand A Display: `http://localhost:5173/display?stand=A`
- Stand B Chat: `http://localhost:5173/?stand=B`
- Stand B Display: `http://localhost:5173/display?stand=B`
