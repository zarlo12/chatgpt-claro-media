# 🚀 DEPLOY RÁPIDO DE FIREBASE FUNCTIONS

## ⚡ Comandos Esenciales

### 1️⃣ Instalar dependencias de Functions
```bash
cd functions
npm install
cd ..
```

### 2️⃣ Configurar Gmail para envío
```bash
firebase functions:config:set gmail.email="tu-email@gmail.com" gmail.password="tu-app-password"
```

💡 **Obtener App Password**: https://myaccount.google.com/apppasswords

### 3️⃣ Deploy
```bash
firebase deploy --only functions
```

### 4️⃣ Ver URL de la función
Después del deploy, copia la URL que aparece, algo como:
```
https://us-central1-imagen-ia-845a3.cloudfunctions.net/enviarPropuestaPorCorreo
```

### 5️⃣ Actualizar frontend
Agrega en `.env`:
```env
VITE_FIREBASE_FUNCTIONS_URL=https://us-central1-TU-PROJECT-ID.cloudfunctions.net/enviarPropuestaPorCorreo
```

### 6️⃣ Rebuild frontend
```bash
npm run build
```

---

## 🧪 Testing Local (Opcional)

```bash
# Terminal 1: Emulator
firebase emulators:start

# Terminal 2: Frontend
npm run dev
```

---

## 📋 Checklist Pre-Deploy

- [ ] Firebase CLI instalado (`npm install -g firebase-tools`)
- [ ] Logged in (`firebase login`)
- [ ] Plan Blaze activado (requerido para functions)
- [ ] Gmail App Password generado
- [ ] Dependencias instaladas (`cd functions && npm install`)
- [ ] Variables configuradas (`firebase functions:config:set...`)

---

## ✅ Verificar Deploy

```bash
# Ver logs en tiempo real
firebase functions:log

# Ver configuración
firebase functions:config:get
```

---

**Documentación completa**: [functions/README.md](./functions/README.md)
