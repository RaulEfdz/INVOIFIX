
import type { InvoiceStatus, TicketStatus, UserRole, CustomerType, CustomerStatus, BusinessSector, CustomerOrigin } from "@/types";

export const INVOICE_STATUSES: InvoiceStatus[] = ["Draft", "Sent", "Paid", "Overdue", "Cancelled"];
export const TICKET_STATUSES: TicketStatus[] = ["New", "In Review", "In Progress", "Resolved", "Closed"];
export const USER_ROLES: UserRole[] = ["Administrator", "Billing", "Technician", "Client"];

export const KANBAN_COLUMNS: { id: TicketStatus; title: string }[] = [
  { id: "New", title: "New" },
  { id: "In Review", title: "In Review" },
  { id: "In Progress", title: "In Progress" },
  { id: "Resolved", title: "Resolved" },
  { id: "Closed", title: "Closed" },
];

export const CUSTOMER_TYPES: CustomerType[] = ["Empresa", "Particular", "Freelancer"];
export const CUSTOMER_STATUSES: CustomerStatus[] = ["Activo", "Inactivo", "Con Deuda"];
export const CUSTOMER_ORIGINS: CustomerOrigin[] = ["Referido", "Google", "Redes Sociales", "Publicidad Online", "Evento", "Otro"];
export const BUSINESS_SECTORS: BusinessSector[] = ["Tecnología", "Diseño", "Retail", "Salud", "Consultoría", "Educación", "Finanzas", "Manufactura", "Otro"];
export const COUNTRIES: string[] = [ // A small list, can be expanded or use a library
  "Spain", "Mexico", "Argentina", "Colombia", "Chile", "Peru", "United States", "Canada", "Other"
];


// Dummy data for customers - to be expanded
export const DUMMY_CUSTOMERS = [
  {
    id: "cust_001",
    customerType: "Empresa" as CustomerType,
    firstName: "Elena",
    lastName: "Rodriguez",
    email: "elena.rodriguez@innovatech.com",
    phone: "+34 912 345 678",
    avatarUrl: "https://placehold.co/100x100.png?text=IR",
    companyName: "InnovaTech Solutions S.L.",
    taxId: "B12345678",
    address: {
      street: "Calle Falsa 123",
      city: "Madrid",
      state: "Madrid",
      postalCode: "28001",
      country: "Spain",
    },
    website: "https://innovatech.com",
    commercialInfo: {
      businessType: "Tecnología" as BusinessSector,
      origin: "Referido" as CustomerOrigin,
      internalNotes: "Cliente importante, contacto principal para proyectos de IA.",
    },
    status: "Activo" as CustomerStatus,
    totalBilled: 12500.00,
    pendingBalance: 2500.00,
    aiProfileSummary: "InnovaTech Solutions S.L. es una consultora tecnológica líder especializada en transformación digital para PYMEs. Parecen estar expandiendo sus servicios hacia el análisis de datos.",
    aiOpportunities: "Oportunidad: Ofrecer servicios de visualización de datos avanzados o capacitación en herramientas BI. Considerar un paquete de consultoría para optimizar sus flujos de trabajo con IA.",
    createdAt: "2023-01-15T09:30:00Z",
    updatedAt: "2024-07-20T14:00:00Z",
  },
  {
    id: "cust_002",
    customerType: "Particular" as CustomerType,
    firstName: "Carlos",
    lastName: "Gomez",
    email: "carlos.gomez.art@email.com",
    phone: "+52 55 1234 5678",
    avatarUrl: "https://placehold.co/100x100.png?text=CG",
    companyName: undefined,
    taxId: "GOCA800101XYZ",
    address: {
      street: "Avenida Siempre Viva 742",
      city: "Ciudad de México",
      state: "CDMX",
      postalCode: "01000",
      country: "Mexico",
    },
    website: undefined,
    commercialInfo: {
      businessType: "Diseño" as BusinessSector,
      origin: "Redes Sociales" as CustomerOrigin,
      internalNotes: "Diseñador gráfico freelance. Interesado en colaboraciones puntuales.",
    },
    status: "Activo" as CustomerStatus,
    totalBilled: 3200.00,
    pendingBalance: 0.00,
    aiProfileSummary: "Carlos Gomez es un diseñador gráfico freelance con un portafolio enfocado en branding y diseño web. Su presencia online es fuerte pero podría beneficiarse de una estrategia de contenido.",
    aiOpportunities: "Oportunidad: Proponer servicios de creación de contenido para su blog o redes sociales para atraer más clientes. Ofrecer un paquete de diseño de plantillas para presentaciones o ebooks.",
    createdAt: "2023-05-10T11:00:00Z",
    updatedAt: "2024-06-15T10:30:00Z",
  },
  {
    id: "cust_003",
    customerType: "Empresa" as CustomerType,
    firstName: "Laura",
    lastName: "Fernández",
    email: "laura@comerciojusto.org",
    phone: "+54 9 11 9876 5432",
    avatarUrl: "https://placehold.co/100x100.png?text=LF",
    companyName: "Comercio Justo Org",
    taxId: "30-12345678-9",
    address: {
      street: "Defensa 500",
      city: "Buenos Aires",
      state: "CABA",
      postalCode: "C1065AAB",
      country: "Argentina",
    },
    website: "https://comerciojusto.org",
    commercialInfo: {
      businessType: "Retail" as BusinessSector,
      origin: "Evento" as CustomerOrigin,
      internalNotes: "ONG enfocada en productos de comercio justo. Necesitan ayuda con su plataforma e-commerce.",
    },
    status: "Con Deuda" as CustomerStatus,
    totalBilled: 7500.00,
    pendingBalance: 1500.00,
    aiProfileSummary: "Comercio Justo Org es una organización sin fines de lucro que promueve productos de comercio justo a través de una tienda online. Su principal desafío podría ser la optimización de la experiencia de usuario y la logística de envíos.",
    aiOpportunities: "Oportunidad: Sugerir una auditoría UX/UI para su e-commerce. Ofrecer integración con pasarelas de pago más eficientes o herramientas de gestión de inventario.",
    createdAt: "2022-11-01T15:00:00Z",
    updatedAt: "2024-07-25T09:10:00Z",
  },
];
