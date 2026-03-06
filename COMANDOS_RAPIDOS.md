# Comandos Rápidos - Agente IA Claro Media

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
# Servidor en: http://localhost:5173

# Build para producción
npm run build

# Preview del build de producción
npm run preview
```

## 📦 Despliegue

### Vercel (Más Rápido)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

### GitHub Pages

```bash
# Agregar a vite.config.js: base: '/chatgpt-claro-media/'
npm run build
npm install -g gh-pages
gh-pages -d dist
```

## 🔧 Desarrollo

```bash
# Ver errores de lint
npm run lint

# Limpiar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install

# Limpiar cache de Vite
rm -rf .vite dist
npm run dev
```

## 🔌 Integración API

```bash
# Copiar template de variables de entorno
cp .env.example .env

# Editar .env y agregar tu API key
# VITE_OPENAI_API_KEY=sk-tu-key-aqui

# Seguir instrucciones en INTEGRACION_API.md
```

## 📁 Archivos Importantes

- `src/App.jsx` - Componente principal
- `src/components/ChatAgent.jsx` - Lógica del chat
- `src/data/mockData.js` - Datos de prueba
- `src/services/apiService.js` - Servicio de ChatGPT (preparado)
- `public/Fondo.jpeg` - Imagen de fondo

## 📚 Documentación

- `README.md` - Guía general
- `PRESENTACION_DEMO.md` - Presentación ejecutiva
- `INTEGRACION_API.md` - Cómo conectar ChatGPT
- `DOCUMENTACION_TECNICA.md` - Arquitectura técnica
- `MEJORAS_FUTURAS.md` - Roadmap de features

## 🐛 Troubleshooting

### Puerto ocupado

```bash
# Matar proceso en puerto 5173
npx kill-port 5173
npm run dev
```

### Estilos no se aplican

```bash
# Limpiar cache
rm -rf .vite
npm run dev
```

### Background no aparece

```bash
# Verificar que el archivo existe
ls public/Fondo.jpeg
# Si no existe, copiar
cp Fondo.jpeg public/
```

## 📊 Verificar Estado

```bash
# Ver versión de Node
node --version
# Debe ser >= 16

# Ver versión de npm
npm --version

# Verificar dependencias instaladas
npm list --depth=0

# Ver procesos corriendo
lsof -i :5173
```

## 🎯 Checklist Pre-Demo

```bash
✓ npm install (dependencias instaladas)
✓ npm run dev (servidor corriendo)
✓ Abrir http://localhost:5173
✓ Probar flujo completo (select sector → ... → ver resultados)
✓ Verificar responsive (F12 → Device toolbar)
✓ Probar en Chrome, Safari, Firefox
```

## 🚀 Para el Día del Evento

```bash
# Opción 1: Local
cd chatgpt-claro-media
npm run dev
# Mostrar: http://localhost:5173

# Opción 2: Desplegado (recomendado)
vercel --prod
# Usar la URL generada
```

## 💡 Tips

- **Mantén el servidor corriendo** durante el evento
- **Ten un backup desplegado** en Vercel por si hay problemas de red
- **Prueba el flujo completo** antes de presentar
- **Prepara 2-3 sectores de ejemplo** para demostrar variedad

---

¿Necesitas ayuda? Revisa la documentación completa en los archivos .md del proyecto.
