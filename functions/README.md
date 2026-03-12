# 📧 Sistema de Envío de Propuestas por PDF

## 🎯 Funcionalidad Implementada

Sistema completo para enviar propuestas estratégicas por correo electrónico en formato PDF profesional con diseño ClaroMedia.

## 📁 Estructura

```
/functions
├── index.js          # Cloud Function principal
├── package.json      # Dependencias
├── .gitignore       # Archivos ignorados
└── .env.example     # Template de variables de entorno
```

## 🚀 Configuración e Instalación

### 1. Instalar Firebase CLI (si no lo tienes)

```bash
npm install -g firebase-tools
firebase login
```

### 2. Inicializar Firebase (si es primera vez)

```bash
firebase init
```

Selecciona:

- ✅ Functions
- ✅ Firestore
- ✅ Hosting (opcional)

### 3. Instalar dependencias de Functions

```bash
cd functions
npm install
```

### 4. Configurar Gmail para envío de correos

#### Opción A: Para Testing Local

1. Copia `.env.example` a `.env` en la carpeta `/functions`:

```bash
cd functions
cp .env.example .env
```

2. Edita `.env` y configura:

```env
GMAIL_EMAIL=tu-email@gmail.com
GMAIL_PASSWORD=tu-app-password-aqui
```

#### Opción B: Para Producción (RECOMENDADO)

Configura las variables directamente en Firebase:

```bash
firebase functions:config:set gmail.email="tu-email@gmail.com"
firebase functions:config:set gmail.password="tu-app-password-aqui"
```

### 📧 Cómo obtener App Password de Gmail

1. Ve a tu cuenta de Google: https://myaccount.google.com/
2. En "Seguridad", activa "Verificación en 2 pasos"
3. Vuelve a "Seguridad" → "Contraseñas de aplicaciones"
4. Genera una nueva contraseña para "Correo" → "Otro (nombre personalizado)"
5. Nombra como "ClaroMedia Functions"
6. Copia la contraseña de 16 caracteres generada
7. Úsala en el comando de arriba

### 5. Actualizar URL de la función en frontend

Edita `src/services/pdfService.js` y actualiza:

```javascript
const FIREBASE_FUNCTIONS_URL = 'https://us-central1-TU-PROJECT-ID.cloudfunctions.net/enviarPropuestaPorCorreo';
```

O mejor aún, crea variable de entorno en `.env`:

```env
VITE_FIREBASE_FUNCTIONS_URL=https://us-central1-TU-PROJECT-ID.cloudfunctions.net/enviarPropuestaPorCorreo
```

## 🔧 Comandos Útiles

### Testing Local (Emulador)

```bash
# Desde la raíz del proyecto
firebase emulators:start

# O solo functions
firebase emulators:start --only functions
```

La función estará disponible en:

```
http://localhost:5001/TU-PROJECT-ID/us-central1/enviarPropuestaPorCorreo
```

### Deploy a Producción

```bash
# Deploy solo functions
firebase deploy --only functions

# Deploy todo (functions + hosting + firestore)
firebase deploy
```

### Ver logs en tiempo real

```bash
firebase functions:log
```

### Ver configuración actual

```bash
firebase functions:config:get
```

## 📝 Uso del Botón en la Aplicación

1. Completa una propuesta estratégica
2. En la pantalla de resultados, haz clic en **"Enviar por Correo (PDF)"**
3. Ingresa el email de destino (o usa el del cliente)
4. Haz clic en **"Enviar Ahora"**
5. Espera confirmación (2-5 segundos)

## 🎨 PDF Generado

El PDF incluye:

- ✅ Header con logo ClaroMedia
- ✅ Información de contacto
- ✅ Perfil de audiencia detallado
- ✅ Afinidades identificadas
- ✅ **Paquete recomendado SÚPER DESTACADO** con:
  - Banner con gradiente rojo-rosa
  - Precio con descuento
  - Todos los componentes del paquete
  - Beneficios e "Ideal Para"
  - Argumento de la IA
- ✅ Insights clave
- ✅ Insights geoespaciales (si aplica)
- ✅ Recomendaciones estratégicas
- ✅ Próximos pasos
- ✅ Footer profesional

## 📧 Email Enviado

Incluye:

- ✅ HTML elegante con diseño ClaroMedia
- ✅ Mensaje personalizado
- ✅ PDF adjunto con nombre descriptivo
- ✅ Información sobre el contenido
- ✅ Call-to-action claro

## 🔍 Troubleshooting

### Error: "Auth failed"

- Verifica que hayas activado "Verificación en 2 pasos" en Google
- Usa App Password, NO tu contraseña normal de Gmail
- Revisa que el email y password estén correctamente configurados

### Error: "Function not found"

- Asegúrate de haber hecho `firebase deploy --only functions`
- Verifica la URL en `pdfService.js`
- Chequea que tu proyecto de Firebase esté correctamente configurado

### Error: "Timeout"

- Aumenta el timeout en `index.js` (ya está en 540 segundos)
- Verifica tu plan de Firebase (Blaze/Pay as you go requerido para functions)

### PDF no se genera bien

- Verifica que todos los datos de la propuesta estén completos
- Chequea los logs: `firebase functions:log`
- Prueba localmente con emulator primero

## 💰 Costos

Firebase Functions (Plan Blaze):

- **2M invocaciones gratis/mes**
- **400,000 GB-segundos gratis/mes**
- Esta función usa ~2-5 segundos por ejecución
- **Estimado**: Miles de PDFs gratis al mes

## 🔒 Seguridad

- ✅ CORS configurado para permitir solo tu dominio
- ✅ Validación de email en backend
- ✅ Timeout para prevenir abusos
- ✅ Variables de entorno protegidas
- ✅ No se expone información sensible

## 📚 Dependencias Usadas

- `firebase-functions`: Cloud Functions runtime
- `firebase-admin`: SDK de administración
- `nodemailer`: Envío de emails
- `puppeteer`: Generación de PDFs desde HTML
- `cors`: Control de acceso HTTP

## 🎯 Próximos Pasos

1. Deploy inicial: `firebase deploy --only functions`
2. Prueba local con emulator
3. Configura Gmail App Password
4. Actualiza URL en frontend
5. Prueba envío de PDF
6. ¡Listo para producción! 🚀

## 📞 Soporte

Si tienes problemas:

1. Revisa los logs: `firebase functions:log`
2. Prueba con emulator local primero
3. Verifica configuración de Gmail
4. Chequea que el plan de Firebase sea Blaze

---

**Creado por**: GitHub Copilot con Claude Sonnet 4.5 ✨  
**Fecha**: Marzo 2026
