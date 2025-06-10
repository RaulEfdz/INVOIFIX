# INVOIFIX - Sistema de Gestión de Facturas y Tickets

Sistema completo de gestión empresarial desarrollado con Next.js 15, que incluye facturación, gestión de clientes, tickets de soporte y dashboard analítico.

## 🚀 Características

- **Dashboard Analítico**: Visualización de métricas clave con gráficos interactivos
- **Gestión de Clientes**: CRUD completo de clientes con perfiles detallados
- **Sistema de Facturación**: Creación y gestión de facturas con múltiples estados
- **Tickets de Soporte**: Sistema Kanban para gestión de tickets
- **Gestión de Equipo**: Administración de empleados y roles
- **Autenticación**: Sistema de login y protección de rutas
- **Responsive Design**: Interfaz adaptable a todos los dispositivos
- **Integración AI**: Powered by Google Genkit para funcionalidades inteligentes

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 15.2.3 con App Router
- **Lenguaje**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Charts**: Recharts + D3.js
- **AI Integration**: Google Genkit
- **Database**: Firebase (opcional)
- **Deployment**: Optimizado para Vercel

## 📦 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <tu-repositorio>
   cd INVOIFIX
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env.local
   ```
   Edita `.env.local` con tus credenciales:
   - Google AI API Key para Genkit
   - Configuración de Firebase (si se usa)

4. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

## 🌐 Despliegue en Vercel

### Método Rápido
```bash
./deploy.sh
```

### Método Manual
1. Ve a [vercel.com](https://vercel.com)
2. Conecta tu repositorio Git
3. Configura las variables de entorno
4. Despliega automáticamente

📖 **Guía completa**: Ver [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── (auth)/            # Rutas de autenticación
│   ├── (main)/            # Rutas principales protegidas
│   │   ├── dashboard/     # Dashboard principal
│   │   ├── clients/       # Gestión de clientes
│   │   ├── customers/     # Gestión de customers
│   │   ├── invoices/      # Sistema de facturación
│   │   ├── tickets/       # Sistema de tickets
│   │   ├── team/          # Gestión de equipo
│   │   └── settings/      # Configuraciones
│   └── globals.css        # Estilos globales
├── components/            # Componentes reutilizables
│   ├── ui/               # Componentes base (shadcn/ui)
│   ├── charts/           # Componentes de gráficos
│   ├── layout/           # Componentes de layout
│   └── [feature]/        # Componentes por funcionalidad
├── hooks/                # Custom hooks
├── lib/                  # Utilidades y configuraciones
├── types/                # Definiciones de TypeScript
└── ai/                   # Configuración de Genkit
```

## 🎯 Funcionalidades Principales

### Dashboard
- Tarjetas de resumen con métricas clave
- Gráficos interactivos de ingresos y tickets
- Actividad reciente
- Acciones rápidas

### Gestión de Clientes
- Perfiles completos de clientes
- Información comercial y de contacto
- Historial de facturación
- Documentos asociados

### Sistema de Facturación
- Creación de facturas con múltiples items
- Estados: Draft, Sent, Paid, Overdue, Cancelled
- Generación de PDF
- Filtros y búsqueda avanzada

### Tickets de Soporte
- Vista Kanban con drag & drop
- Estados: New, In Review, In Progress, Resolved, Closed
- Asignación de técnicos
- Prioridades y categorías

### Gestión de Equipo
- Roles: Administrator, Billing, Technician, Client, etc.
- Perfiles de empleados
- Gestión de permisos

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Servidor de desarrollo
npm run dev:genkit       # Genkit en modo desarrollo

# Build y Producción
npm run build            # Build de producción
npm run start            # Servidor de producción
npm run lint             # Linting
npm run typecheck        # Verificación de tipos

# Despliegue
./deploy.sh              # Script de despliegue automatizado
```

## 🔐 Variables de Entorno

```env
# Google AI (Genkit)
GOOGLE_GENAI_API_KEY=tu_clave_api

# Firebase (opcional)
NEXT_PUBLIC_FIREBASE_API_KEY=tu_clave
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=proyecto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_proyecto_id
# ... más configuraciones de Firebase

# Entorno
NODE_ENV=production
```

## 🎨 Personalización

### Temas
El proyecto usa `next-themes` para soporte de tema oscuro/claro automático.

### Componentes UI
Basado en shadcn/ui, fácilmente personalizable editando:
- `tailwind.config.ts` - Configuración de Tailwind
- `src/components/ui/` - Componentes base
- `src/app/globals.css` - Variables CSS

### Colores y Estilos
```css
/* Personaliza en globals.css */
:root {
  --primary: 210 40% 98%;
  --primary-foreground: 222.2 84% 4.9%;
  /* ... más variables */
}
```

## 🔍 Desarrollo

### Agregar Nueva Funcionalidad
1. Crear tipos en `src/types/index.ts`
2. Crear componentes en `src/components/[feature]/`
3. Agregar rutas en `src/app/(main)/[feature]/`
4. Actualizar navegación en `AppSidebar.tsx`

### Integración AI
```typescript
// Ejemplo de uso de Genkit
import { ai } from '@/ai/genkit';

const result = await ai.generate({
  prompt: 'Tu prompt aquí',
  model: 'googleai/gemini-2.0-flash'
});
```

## 📊 Performance

- **Optimización de imágenes**: Next.js Image con WebP/AVIF
- **Code splitting**: Automático por rutas
- **Bundle optimization**: Configurado en `next.config.ts`
- **Caching**: Headers optimizados para Vercel

## 🐛 Troubleshooting

### Errores Comunes
1. **Error de build**: Ejecuta `npm run typecheck` para ver errores de TypeScript
2. **Variables de entorno**: Verifica que estén configuradas correctamente
3. **Dependencias**: Ejecuta `npm install` para actualizar

### Logs
- **Desarrollo**: Revisa la consola del navegador y terminal
- **Producción**: Usa Vercel Dashboard para logs en tiempo real

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Soporte

- **Documentación**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Issues**: Usa GitHub Issues para reportar bugs
- **Discussions**: Para preguntas y discusiones generales

---

**Desarrollado con ❤️ usando Next.js y Vercel**
