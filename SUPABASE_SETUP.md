# Configuración de Supabase para INVOIFIX

Esta guía te ayudará a configurar Supabase como base de datos para el proyecto INVOIFIX.

## 📋 Prerrequisitos

1. Cuenta en [Supabase](https://supabase.com)
2. Proyecto INVOIFIX clonado localmente

## 🚀 Configuración Paso a Paso

### 1. Crear Proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) e inicia sesión
2. Haz clic en "New Project"
3. Selecciona tu organización
4. Configura tu proyecto:
   - **Name**: `invoifix-db` (o el nombre que prefieras)
   - **Database Password**: Genera una contraseña segura (guárdala)
   - **Region**: Selecciona la región más cercana a tus usuarios
5. Haz clic en "Create new project"
6. Espera a que el proyecto se inicialice (puede tomar unos minutos)

### 2. Obtener Credenciales

Una vez creado el proyecto:

1. Ve a **Settings** > **API**
2. Copia las siguientes credenciales:
   - **Project URL**: `https://tu-proyecto.supabase.co`
   - **anon public key**: `eyJ...` (clave pública)
   - **service_role key**: `eyJ...` (clave privada - ¡manténla segura!)

### 3. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_publica_aqui
SUPABASE_SERVICE_ROLE_KEY=tu_clave_service_role_aqui

# Google AI (Genkit)
GOOGLE_GENAI_API_KEY=tu_clave_google_ai

# Environment
NODE_ENV=development
```

### 4. Crear Esquema de Base de Datos

1. Ve a **SQL Editor** en tu dashboard de Supabase
2. Copia todo el contenido del archivo `supabase-schema.sql`
3. Pégalo en el editor SQL
4. Haz clic en "Run" para ejecutar el script

Esto creará:
- ✅ Todas las tablas necesarias
- ✅ Índices para optimización
- ✅ Triggers para timestamps automáticos
- ✅ Políticas de seguridad (RLS)
- ✅ Datos de ejemplo
- ✅ Vistas para estadísticas

### 5. Verificar Configuración

Ejecuta el proyecto localmente para verificar la conexión:

```bash
npm run dev
```

Si todo está configurado correctamente, deberías poder:
- Acceder al dashboard sin errores de base de datos
- Ver los datos de ejemplo en las diferentes secciones

## 🔧 Configuración Avanzada

### Políticas de Seguridad (RLS)

El esquema incluye políticas básicas que permiten todas las operaciones para usuarios autenticados. Para producción, considera implementar políticas más específicas:

```sql
-- Ejemplo: Solo permitir a los usuarios ver sus propios datos
CREATE POLICY "Users can view own data" ON clients
    FOR SELECT USING (auth.uid() = user_id);
```

### Autenticación

Para habilitar autenticación:

1. Ve a **Authentication** > **Settings**
2. Configura los proveedores que desees (Email, Google, GitHub, etc.)
3. Actualiza las políticas RLS según tus necesidades

### Storage (Opcional)

Para subir archivos (avatares, documentos):

1. Ve a **Storage**
2. Crea un bucket llamado `invoifix-files`
3. Configura las políticas de acceso

## 📊 Monitoreo y Mantenimiento

### Dashboard de Supabase

Utiliza el dashboard para:
- **Database**: Ver y editar datos
- **Auth**: Gestionar usuarios
- **Storage**: Administrar archivos
- **Edge Functions**: Funciones serverless
- **Logs**: Monitorear actividad

### Backups

Supabase realiza backups automáticos, pero para proyectos críticos:
1. Ve a **Settings** > **Database**
2. Configura backups adicionales si es necesario

### Límites del Plan Gratuito

El plan gratuito incluye:
- 500MB de base de datos
- 1GB de almacenamiento
- 2GB de transferencia
- 50,000 usuarios activos mensuales

## 🚀 Despliegue en Vercel

### Variables de Entorno en Vercel

1. Ve a tu proyecto en Vercel
2. **Settings** > **Environment Variables**
3. Agrega las mismas variables del `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `GOOGLE_GENAI_API_KEY`

### Configuración de Dominio

Si usas un dominio personalizado:
1. Actualiza las URLs permitidas en Supabase
2. **Authentication** > **Settings** > **Site URL**

## 🔍 Troubleshooting

### Error de Conexión

```
Error: Invalid API key
```

**Solución**: Verifica que las variables de entorno estén correctamente configuradas.

### Error de Políticas RLS

```
Error: Row Level Security policy violation
```

**Solución**: Revisa las políticas en **Authentication** > **Policies**.

### Error de Schema

```
Error: relation "clients" does not exist
```

**Solución**: Ejecuta nuevamente el script `supabase-schema.sql`.

## 📚 Recursos Adicionales

- [Documentación de Supabase](https://supabase.com/docs)
- [Guía de Next.js + Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Políticas RLS](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase CLI](https://supabase.com/docs/reference/cli)

## 🆘 Soporte

Si encuentras problemas:
1. Revisa los logs en el dashboard de Supabase
2. Consulta la documentación oficial
3. Busca en la comunidad de Supabase
4. Crea un issue en el repositorio del proyecto

---

¡Tu base de datos Supabase está lista para INVOIFIX! 🎉
