#!/bin/bash

# Script de despliegue para Vercel - INVOIFIX
# Este script prepara y despliega el proyecto en Vercel

echo "🚀 Preparando despliegue en Vercel..."

# Verificar que estamos en un repositorio git
if [ ! -d ".git" ]; then
    echo "❌ Error: Este directorio no es un repositorio Git"
    echo "Inicializa un repositorio con: git init"
    exit 1
fi

# Verificar que tenemos cambios para commitear
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 Detectados cambios sin commitear..."
    
    # Preguntar si quiere commitear los cambios
    read -p "¿Deseas commitear todos los cambios? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git add .
        read -p "Mensaje del commit: " commit_message
        git commit -m "$commit_message"
        echo "✅ Cambios commiteados"
    else
        echo "⚠️  Hay cambios sin commitear. Considera commitearlos antes del despliegue."
    fi
fi

# Ejecutar build local para verificar
echo "🔨 Ejecutando build local..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Error en el build local. Corrige los errores antes de desplegar."
    exit 1
fi

echo "✅ Build local exitoso"

# Verificar si Vercel CLI está instalado
if ! command -v vercel &> /dev/null; then
    echo "📦 Vercel CLI no encontrado. Instalando..."
    npm install -g vercel
fi

# Hacer push a Git (si hay un remote configurado)
if git remote | grep -q origin; then
    echo "📤 Haciendo push a Git..."
    git push origin main 2>/dev/null || git push origin master 2>/dev/null || echo "⚠️  No se pudo hacer push automático"
else
    echo "⚠️  No hay remote 'origin' configurado"
fi

echo ""
echo "🎉 Proyecto preparado para Vercel!"
echo ""
echo "Próximos pasos:"
echo "1. Ve a https://vercel.com"
echo "2. Conecta tu repositorio Git"
echo "3. Configura las variables de entorno (ver .env.example)"
echo "4. Despliega automáticamente"
echo ""
echo "O usa Vercel CLI:"
echo "  vercel --prod"
echo ""
echo "📖 Para más detalles, consulta DEPLOYMENT.md"
