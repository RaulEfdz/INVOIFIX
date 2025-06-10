# Despliegue en Vercel - INVOIFIX con Supabase

Guía específica para desplegar INVOIFIX en Vercel con la base de datos Supabase configurada.

## 🚀 Variables de Entorno para Vercel

Configura estas variables exactas en tu proyecto de Vercel:

### 1. Supabase (Base de Datos)
```
NEXT_PUBLIC_SUPABASE_URL=https://zbkkydsuxrggwnfjsibp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpia2t5ZHN1eHJnZ3duZmpzaWJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1Njg3NDUsImV4cCI6MjA2NTE0NDc0NX0.ne1-4imuAH73uI39wpUIRdPP-AuDH7zHpEhY7ej05sg
```

### 2. Google AI (Opcional - para funcionalidades de IA)
```
GOOGLE_GENAI_API_KEY=tu_clave_google_ai_aqui
```

### 3. Entorno
```
NODE_ENV=production
```

## 📋 Pasos de Despliegue

### 1. Preparar Repositorio
```bash
# Asegúrate de que todos los cambios estén guardados
git add .
git commit -m "Configurar Supabase y preparar para Vercel"
git push origin main
```

### 2. Configurar en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en "New Project"
3. Importa tu repositorio
4. En "Environment Variables", agrega:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://zbkkydsuxrggwnfjsibp.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpia2t5ZHN1eHJnZ3duZmpzaWJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1Njg3NDUsImV4cCI6MjA2NTE0NDc0NX0.ne1-4imuAH73uI39wpUIRdPP-AuDH7zHpEhY7ej05sg` |
| `NODE_ENV` | `production` |

5. Haz clic en "Deploy"

### 3. Configurar Base de Datos

**IMPORTANTE**: Antes del primer despliegue, ejecuta el schema en Supabase:

1. Ve a tu proyecto Supabase: https://supabase.com/dashboard/project/zbkkydsuxrggwnfjsibp
2. Ve a "SQL Editor"
3. Copia y pega todo el contenido de `supabase-schema.sql`
4. Haz clic en "Run"

Esto creará todas las tablas, índices y datos de ejemplo necesarios.

## ✅ Verificación Post-Despliegue

Una vez desplegado, verifica que:

1. **La aplicación carga** sin errores 500
2. **Las páginas principales** son accesibles:
   - Dashboard: `/dashboard`
   - Clientes: `/customers`
   - Facturas: `/invoices`
   - Tickets: `/tickets`
3. **No hay errores de base de datos** en los logs de Vercel

## 🔧 Configuración Adicional

### Dominio Personalizado (Opcional)

Si tienes un dominio propio:
1. En Vercel: Settings > Domains
2. Agrega tu dominio
3. Configura los DNS según las instrucciones

### Monitoreo

- **Analytics**: Habilitado automáticamente en Vercel
- **Logs**: Disponibles en el dashboard de Vercel
- **Performance**: Métricas en tiempo real

## 🐛 Troubleshooting

### Error: "Invalid API key"
- Verifica que las variables de entorno estén correctamente copiadas
- Asegúrate de no tener espacios extra al inicio o final

### Error: "relation does not exist"
- Ejecuta el script `supabase-schema.sql` en Supabase
- Verifica que la URL de Supabase sea correcta

### Error de Build
- Revisa los logs en Vercel
- Ejecuta `npm run build` localmente para verificar

## 📞 URLs Importantes

- **Proyecto Supabase**: https://supabase.com/dashboard/project/zbkkydsuxrggwnfjsibp
- **Aplicación Local**: http://localhost:9002
- **Vercel Dashboard**: https://vercel.com/dashboard

## 🎉 ¡Listo!

Tu aplicación INVOIFIX estará disponible en la URL que Vercel te proporcione, completamente funcional con la base de datos Supabase.

### Próximos Pasos Recomendados:

1. **Configurar autenticación** en Supabase si es necesario
2. **Agregar Google AI API Key** para funcionalidades de IA
3. **Configurar backups** automáticos en Supabase
4. **Monitorear performance** en Vercel Analytics

---

**¡Tu aplicación está lista para producción!** 🚀
