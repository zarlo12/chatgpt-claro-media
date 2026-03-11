# 🔥 Firebase - Registro de Conversaciones

## ✅ Configuración Completa

### 1. Credenciales en `.env`

```env
VITE_FIREBASE_API_KEY=AIzaSyBQz_9uBt6nM4U4v9gnU17-9gsaJI_8QaM
VITE_FIREBASE_AUTH_DOMAIN=imagen-ia-845a3.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=imagen-ia-845a3
VITE_FIREBASE_STORAGE_BUCKET=imagen-ia-845a3.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=134868092813
VITE_FIREBASE_APP_ID=1:134868092813:web:1cff1980062644ffa25fc4
```

### 2. Colección de Firestore

**Nombre**: `ClaroMediaAgenteIA`

---

## 📊 ¿Qué se guarda?

### Al inicio (durante el formulario):

```javascript
{
  // 👤 Datos Personales
  nombre: "Juan Pérez",
  correo: "juan@empresa.com",
  celular: "3001234567",

  // 📅 Metadata
  timestamp: Timestamp, // Fecha y hora de inicio
  estado: "iniciado", // Marca que la conversación comenzó
}
```

### Al finalizar (después de generar propuesta):

El MISMO documento se actualiza con:

```javascript
{
  // ... datos personales anteriores ...

  // 📈 Demografía (AGREGADO)
  sector: "Tecnología",
  genero: "Hombres",
  edad: "25 a 34",
  nivelSocioeconomico: "Medio (C)",

  // 🎯 Afinidades (AGREGADO)
  afinidades: ["Tecnología", "Educación", "OTT"],

  // 🗺️ Customer Journey (AGREGADO)
  primeraSeleccionJourney: "Explora",
  segundaSeleccionJourney: "Compara",

  // 💡 Propuesta Generada (AGREGADO)
  propuesta: {
    insights: [...],
    recomendaciones: [...],
    proximosPasos: [...],
  },

  // 📅 Metadata (ACTUALIZADO)
  ultimaActualizacion: Timestamp, // Fecha y hora de finalización
  estado: "completado", // Conversación completa
  modo: "production",
  modeloIA: "gpt-4o",
}
```

---

## 🔄 Flujo de Guardado

### **Momento 1: Datos Personales (CREAR)**

Cuando el usuario completa el formulario:

```
✅ Crear documento nuevo en Firebase
- Nombre + Correo + Celular
- timestamp
- estado: "iniciado"

→ Devuelve ID del documento (ej: "abc123xyz")
→ Se guarda el ID para usar después
```

### **Momento 2: Conversación Completa (ACTUALIZAR)**

Al finalizar y generar la propuesta:

```
✅ Actualizar el MISMO documento (usando el ID guardado)
- Agregar: sector, genero, edad, nivel socioeconómico
- Agregar: afinidades, journey selections
- Agregar: propuesta completa con insights y recomendaciones
- Actualizar: estado → "completado"
- Agregar: modo, modeloIA, ultimaActualizacion

→ Un solo documento por conversación ✅
```

**Resultado**: 1 cliente = 1 documento (actualizado en 2 fases)

---

## 📍 Dónde ver los datos

1. **Firebase Console**: https://console.firebase.google.com
2. Ve a tu proyecto: `imagen-ia-845a3`
3. Menú lateral → **Firestore Database**
4. Colección: **`ClaroMediaAgenteIA`**
5. Verás cada conversación como un documento

---

## 🔍 Logs en la Consola

### Al guardar datos personales (CREAR):

```
💾 Guardando datos iniciales del usuario... {nombre, correo, celular}
✅ Datos iniciales guardados con ID: abc123xyz
📾 Documento creado en Firebase con ID: abc123xyz
```

### Al completar conversación (ACTUALIZAR):

```
🚀 Generando propuesta estratégica...
✅ Propuesta generada: {...}
🔄 Actualizando conversación: abc123xyz {...datos...}
✅ Conversación actualizada
📾 Conversación actualizada en Firebase con ID: abc123xyz
```

### Si hay error:

```
❌ Error guardando datos iniciales: [detalles]
❌ Error actualizando conversación: [detalles]
```

**La app continúa funcionando** aunque falle el guardado.

---

## 💰 Costos de Firebase

### Firestore (Base de datos)

- **Gratis hasta**:
  - 1 GB de almacenamiento
  - 50,000 lecturas/día
  - 20,000 escrituras/día
  - 20,000 eliminaciones/día

### Para tu evento:

- **500 conversaciones** ≈ 1000 operaciones (500 crear + 500 actualizar)
- **Tamaño promedio**: ~5 KB por conversación
- **Total**: ~2.5 MB de datos

**Conclusión**: **100% GRATIS** para tu evento 🎉
(Límite: 20,000 escrituras/día)

---

## 🔐 Seguridad

### ⚠️ Importante:

Las credenciales en `.env` son **públicas** (se exponen en el navegador).

Para producción real necesitas:

1. **Reglas de seguridad** en Firestore
2. **Validación de origen** (dominio permitido)
3. **Rate limiting** (límite de escrituras)

### Configurar reglas básicas:

1. Ve a **Firestore Database** → **Reglas**
2. Usa estas reglas básicas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /ClaroMediaAgenteIA/{document=**} {
      // Solo permitir escritura (no lectura pública)
      allow write: if true;
      allow read: if false;
    }
  }
}
```

Esto permite que tu app escriba pero no que terceros lean los datos.

---

## 📊 Consultar datos guardados

### Desde Firebase Console:

1. https://console.firebase.google.com
2. Proyecto → Firestore Database
3. Colección `ClaroMediaAgenteIA`
4. Ver/descargar/exportar documentos

### Exportar a CSV/Excel:

1. Usa extensiones de Firebase
2. O script personalizado para exportar

---

## 🛠️ Troubleshooting

### Error: "Firebase not initialized"

**Solución**: Verifica que las variables en `.env` estén correctas y que reiniciaste el servidor (`npm run dev`).

### Error: "Permission denied"

**Solución**: Revisa las reglas de seguridad en Firestore. Deben permitir `write`.

### No veo documentos en Firestore

**Solución**:

1. Abre la consola del navegador (F12)
2. Busca el log: `✅ Conversación guardada con ID: ...`
3. Si no aparece, verifica errores en consola
4. Confirma que Firestore está activado en Firebase Console

### Los datos no se guardan

**Solución**:

1. Verifica que Firebase esté instalado: `npm list firebase`
2. Confirma que `.env` tiene las credenciales correctas
3. Reinicia el servidor de desarrollo
4. Revisa logs en consola del navegador

---

## 🎯 Próximos pasos opcionales

### 1. Dashboard de análisis

- Crear vista para ver estadísticas
- Total de conversaciones
- Sectores más comunes
- Afinidades más seleccionadas

### 2. Exportación automática

- Configurar Cloud Functions
- Exportar a Google Sheets
- Enviar reportes por email

### 3. Autenticación

- Agregar login para el equipo
- Ver conversaciones en tiempo real
- Dashboard privado

---

## 📞 Soporte

- **Firebase Docs**: https://firebase.google.com/docs/firestore
- **Console**: https://console.firebase.google.com
- **Status**: https://status.firebase.google.com

---

**Estado actual**: ✅ **FUNCIONANDO**

Cada conversación se guarda automáticamente en Firestore sin intervención del usuario. 🚀
