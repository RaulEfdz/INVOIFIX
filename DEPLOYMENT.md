# Despliegue en Vercel - INVOIFIX

Este documento contiene las instrucciones para desplegar el proyecto INVOIFIX en Vercel.

## Prerrequisitos

1. Cuenta en [Vercel](https://vercel.com)
2. Repositorio Git (GitHub, GitLab, o Bitbucket)
3. Variables de entorno configuradas

## Variables de Entorno Requeridas

Configura las siguientes variables de entorno en tu proyecto de Vercel:

### Google AI (Genkit)
```
GOOGLE_GENAI_API_KEY=tu_clave_api_de_google_ai
```

### Supabase (Base de Datos)
```
NEXT_PUBLIC_SUPABASE_URL=tu_url_proyecto_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_supabase
SUPABASE_SERVICE_ROLE_KEY=tu_clave_service_role_supabase
```

### Configuración de Entorno
```
NODE_ENV=production
```

## Pasos para el Despliegue

### 1. Preparar el Repositorio
```bash
# Asegúrate de que todos los cambios estén committeados
git add .
git commit -m "Preparar proyecto para Vercel"
git push origin main
```

### 2. Conectar con Vercel

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Haz clic en "New Project"
3. Importa tu repositorio de Git
4. Vercel detectará automáticamente que es un proyecto Next.js

### 3. Configurar Variables de Entorno

1. En el dashboard de tu proyecto en Vercel, ve a "Settings" > "Environment Variables"
2. Agrega todas las variables listadas arriba
3. Asegúrate de seleccionar los entornos apropiados (Production, Preview, Development)

### 4. Configurar Dominios (Opcional)

1. Ve a "Settings" > "Domains"
2. Agrega tu dominio personalizado si tienes uno

## Configuraciones Incluidas

### `vercel.json`
- Configuración de build optimizada
- Headers de seguridad
- Configuración de funciones serverless
- Rewrites para API routes

### `next.config.ts`
- Optimizaciones para producción
- Configuración de imágenes
- Output standalone para mejor rendimiento
- Headers de caché optimizados

### `.env.example`
- Plantilla de variables de entorno
- Documentación de configuraciones requeridas

## Comandos de Build

El proyecto usa los siguientes comandos:

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Iniciar servidor de producción
npm run start

# Linting
npm run lint

# Type checking
npm run typecheck
```

## Características del Proyecto

- **Framework**: Next.js 15.2.3 con App Router
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **AI Integration**: Google Genkit
- **Database**: Firebase (opcional)
- **TypeScript**: Completamente tipado

## Troubleshooting

### Error de Build
Si encuentras errores de TypeScript o ESLint durante el build:
1. Ejecuta `npm run typecheck` localmente
2. Corrige los errores encontrados
3. Haz commit y push de los cambios

### Variables de Entorno
Si las variables de entorno no funcionan:
1. Verifica que estén configuradas en Vercel
2. Asegúrate de que los nombres coincidan exactamente
3. Redeploy el proyecto después de cambiar variables

### Performance
Para optimizar el rendimiento:
1. Las imágenes se optimizan automáticamente
2. Los componentes se cargan de forma lazy
3. El bundle se optimiza automáticamente

## Monitoreo

Una vez desplegado, puedes monitorear tu aplicación:
1. **Analytics**: Ve a "Analytics" en tu dashboard de Vercel
2. **Functions**: Monitorea el rendimiento de las funciones serverless
3. **Logs**: Revisa los logs en tiempo real para debugging

## Actualizaciones

Para actualizar la aplicación:
1. Haz cambios en tu código local
2. Commit y push a tu repositorio
3. Vercel automáticamente detectará los cambios y redesplegará

## Soporte

Si necesitas ayuda:
- [Documentación de Vercel](https://vercel.com/docs)
- [Documentación de Next.js](https://nextjs.org/docs)
- [Comunidad de Vercel](https://github.com/vercel/vercel/discussions)
