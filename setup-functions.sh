#!/bin/bash

# 🚀 Script de Setup para Sistema de PDF por Email
# ClaroMedia - Agente IA

echo "🎯 Iniciando setup de Firebase Functions..."
echo ""

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Instalar dependencias de functions
echo "📦 Instalando dependencias de Firebase Functions..."
cd functions
npm install

if [ $? -eq 0 ]; then
    echo "${GREEN}✅ Dependencias instaladas correctamente${NC}"
else
    echo "${RED}❌ Error al instalar dependencias${NC}"
    exit 1
fi

cd ..

# 2. Verificar Firebase CLI
echo ""
echo "🔍 Verificando Firebase CLI..."
if ! command -v firebase &> /dev/null; then
    echo "${YELLOW}⚠️  Firebase CLI no encontrado${NC}"
    echo "Instalando Firebase CLI globalmente..."
    npm install -g firebase-tools
    
    if [ $? -eq 0 ]; then
        echo "${GREEN}✅ Firebase CLI instalado${NC}"
    else
        echo "${RED}❌ Error al instalar Firebase CLI${NC}"
        echo "Por favor instala manualmente: npm install -g firebase-tools"
        exit 1
    fi
else
    echo "${GREEN}✅ Firebase CLI ya está instalado${NC}"
fi

# 3. Verificar login
echo ""
echo "🔐 Verificando sesión de Firebase..."
firebase projects:list &> /dev/null

if [ $? -eq 0 ]; then
    echo "${GREEN}✅ Ya estás logueado en Firebase${NC}"
else
    echo "${YELLOW}⚠️  No estás logueado en Firebase${NC}"
    echo "Ejecutando: firebase login..."
    firebase login
fi

# 4. Instrucciones finales
echo ""
echo "${GREEN}========================================${NC}"
echo "${GREEN}✅ Setup completado exitosamente!${NC}"
echo "${GREEN}========================================${NC}"
echo ""
echo "📝 PRÓXIMOS PASOS:"
echo ""
echo "1️⃣  Configurar Gmail para envío de correos:"
echo "   ${YELLOW}firebase functions:config:set gmail.email=\"tu-email@gmail.com\" gmail.password=\"tu-app-password\"${NC}"
echo ""
echo "   💡 Obtén tu App Password aquí:"
echo "   https://myaccount.google.com/apppasswords"
echo ""
echo "2️⃣  Hacer deploy de las functions:"
echo "   ${YELLOW}firebase deploy --only functions${NC}"
echo ""
echo "3️⃣  Copiar la URL de la función y actualizar .env:"
echo "   ${YELLOW}VITE_FIREBASE_FUNCTIONS_URL=https://us-central1-TU-PROJECT.cloudfunctions.net/enviarPropuestaPorCorreo${NC}"
echo ""
echo "4️⃣  Rebuild del frontend:"
echo "   ${YELLOW}npm run build${NC}"
echo ""
echo "📚 Documentación completa:"
echo "   - functions/README.md"
echo "   - DEPLOY_FUNCTIONS.md"
echo "   - SISTEMA_PDF_EMAIL.md"
echo ""
echo "🎉 ¡Listo para usar!"
