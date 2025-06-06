# **App Name**: InvoiFix

## Core Features:

- Invoice Creation: Creation of single or recurring invoices, streamlining the billing process.
- Digital Signature Integration: Integrated digital signature for secure and legally compliant invoicing.
- Invoice Delivery and Payment: Email sending with attached PDF and online payment option for easy invoice delivery and payment processing.
- Invoice Status Tracking: Dynamic statuses (Draft, Sent, Paid, Overdue, Cancelled) to track the invoice lifecycle.
- Invoice Control Panel: Control panel with filters by status, pagination, and advanced search for efficient invoice management.
- Automated Email Notifications: Automatic email notifications (emission, expiration, payment) to keep users informed.
- Ticket Submission Form: Requirement submission form based on user role for targeted issue reporting.
- Kanban Ticket Board: Visual Kanban board with configurable columns (New, In Review, etc.) for intuitive ticket management.
- Ticket Management Features: Assignment of responsible parties, attachments, and internal comments for detailed ticket handling.
- Ticket Change History: History of changes per ticket for audit trails and accountability.
- Ticket Status Notifications: Automatic notifications for status changes to keep stakeholders updated.
- Role Definition: Definition of roles (Administrator, Billing, Technician, Client) for access control.
- Access and Functionality Management: Management of accesses and functionalities based on permissions for secure role-based access.
- Role-Based Authentication: Base for secure and personalized authentication by role for user-specific experiences.
- Customizable Email Templates: Customizable email templates for each system event for branded communications.
- Email Provider Integration: Integration with email provider (SendGrid, Resend, or similar) for reliable email delivery.
- Alert Management and Tracking: Management of automatic alerts and deliverability tracking for effective email communication.

## Style Guidelines:

- **Fuente Principal: Inter**

- *Diseñada para interfaces digitales, moderna, legible y profesional.*

**Usos:**

- **Titulares (H1–H3):** `Inter Bold` (700)

- **Subtítulos y botones:** `Inter Medium` (500)

- **Texto base y etiquetas:** `Inter Regular` (400)

- **Notas, tooltips:** `Inter Light` (300)

**Tamaños sugeridos:**

ElementoTamañoPesoTítulo Principal28–32px700Subtítulo20–24px500–600Texto Base14–16px400Notas o Secundario12–13px300–400
- NombreCódigo HEXUso principal**Primary Blue**`#2563EB`Botones principales, enlaces, acciones**Accent Indigo**`#4F46E5`Hover, íconos activos, badges**Success Green**`#22C55E`Estado "Pagado", confirmaciones**Warning Yellow**`#FACC15`Alertas suaves, aviso de vencimiento**Error Red**`#EF4444`Estado "Overdue", errores críticos**Neutral 900**`#111827`Títulos, texto principal**Neutral 700**`#374151`Subtítulos, menú lateral**Neutral 500**`#6B7280`Texto secundario, ítems inactivos**Neutral 100**`#F3F4F6`Fondos claros, separadores**White**`#FFFFFF`Fondos y tarjetas
- - **Botón Primario:** fondo `#2563EB`, texto blanco, hover `#1E40AF`.

- **Estados de Factura:**

  - Pagado: verde (`#22C55E`)

  - Pendiente: gris (`#6B7280`)

  - Vencido: rojo (`#EF4444`)
- Tabla de datos:** fondo blanco, encabezados en `#374151`, bordes suaves en `#E5E7EB`.