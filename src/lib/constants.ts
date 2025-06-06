
import type { Invoice, InvoiceStatus, TicketStatus, UserRole, ClientType, ClientStatus, BusinessSector, ClientOrigin, Client } from "@/types";

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

export const CLIENT_TYPES: ClientType[] = ["Empresa", "Particular", "Freelancer"];
export const CLIENT_STATUSES: ClientStatus[] = ["Activo", "Inactivo", "Con Deuda"];
export const CLIENT_ORIGINS: ClientOrigin[] = ["Referido", "Google", "Redes Sociales", "Publicidad Online", "Evento", "Otro"];
export const BUSINESS_SECTORS: BusinessSector[] = ["Tecnología", "Diseño", "Retail", "Salud", "Consultoría", "Educación", "Finanzas", "Manufactura", "Otro"];
export const COUNTRIES: string[] = [ 
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
  "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia (Czech Republic)",
  "Denmark", "Djibouti", "Dominica", "Dominican Republic",
  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini (fmr. Swaziland)", "Ethiopia",
  "Fiji", "Finland", "France",
  "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Holy See", "Honduras", "Hungary",
  "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast",
  "Jamaica", "Japan", "Jordan",
  "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
  "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (formerly Burma)",
  "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia (formerly Macedonia)", "Norway",
  "Oman",
  "Pakistan", "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar",
  "Romania", "Russia", "Rwanda",
  "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
  "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
  "Vanuatu", "Venezuela", "Vietnam",
  "Yemen",
  "Zambia", "Zimbabwe", "Other"
];


// Dummy data for clients
export const DUMMY_CLIENTS: Client[] = [
  {
    id: "client_001",
    clientType: "Empresa" as ClientType,
    firstName: "Elena",
    lastName: "Rodriguez",
    email: "elena.rodriguez@innovatech.com",
    phone: "+34 912 345 678",
    avatarUrl: "https://placehold.co/100x100.png?text=ER",
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
      origin: "Referido" as ClientOrigin,
      internalNotes: "Cliente importante, contacto principal para proyectos de IA.",
    },
    status: "Activo" as ClientStatus,
    totalBilled: 12500.00,
    pendingBalance: 2500.00,
    aiProfileSummary: "InnovaTech Solutions S.L. es una consultora tecnológica líder especializada en transformación digital para PYMEs. Parecen estar expandiendo sus servicios hacia el análisis de datos.",
    aiOpportunities: "Oportunidad: Ofrecer servicios de visualización de datos avanzados o capacitación en herramientas BI. Considerar un paquete de consultoría para optimizar sus flujos de trabajo con IA.",
    createdAt: "2023-01-15T09:30:00Z",
    updatedAt: "2024-07-20T14:00:00Z",
  },
  {
    id: "client_002",
    clientType: "Particular" as ClientType,
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
      origin: "Redes Sociales" as ClientOrigin,
      internalNotes: "Diseñador gráfico freelance. Interesado en colaboraciones puntuales.",
    },
    status: "Activo" as ClientStatus,
    totalBilled: 3200.00,
    pendingBalance: 0.00,
    aiProfileSummary: "Carlos Gomez es un diseñador gráfico freelance con un portafolio enfocado en branding y diseño web. Su presencia online es fuerte pero podría beneficiarse de una estrategia de contenido.",
    aiOpportunities: "Oportunidad: Proponer servicios de creación de contenido para su blog o redes sociales para atraer más clientes. Ofrecer un paquete de diseño de plantillas para presentaciones o ebooks.",
    createdAt: "2023-05-10T11:00:00Z",
    updatedAt: "2024-06-15T10:30:00Z",
  },
  {
    id: "client_003",
    clientType: "Empresa" as ClientType,
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
      origin: "Evento" as ClientOrigin,
      internalNotes: "ONG enfocada en productos de comercio justo. Necesitan ayuda con su plataforma e-commerce.",
    },
    status: "Con Deuda" as ClientStatus,
    totalBilled: 7500.00,
    pendingBalance: 1500.00,
    aiProfileSummary: "Comercio Justo Org es una organización sin fines de lucro que promueve productos de comercio justo a través de una tienda online. Su principal desafío podría ser la optimización de la experiencia de usuario y la logística de envíos.",
    aiOpportunities: "Oportunidad: Sugerir una auditoría UX/UI para su e-commerce. Ofrecer integración con pasarelas de pago más eficientes o herramientas de gestión de inventario.",
    createdAt: "2022-11-01T15:00:00Z",
    updatedAt: "2024-07-25T09:10:00Z",
  },
   {
    id: "client_004",
    clientType: "Freelancer" as ClientType,
    firstName: "Sophie",
    lastName: "Chen",
    email: "sophie.chen.dev@example.com",
    phone: "+1 415 555 1234",
    avatarUrl: "https://placehold.co/100x100.png?text=SC",
    companyName: "Chen Web Development",
    taxId: "ABN54321",
    address: {
      street: "123 Main Street",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      country: "United States",
    },
    website: "https://chenwebdev.com",
    status: "Activo" as ClientStatus,
    totalBilled: 22000.00,
    pendingBalance: 0.00,
    createdAt: "2022-03-20T10:00:00Z",
    updatedAt: "2024-07-28T12:00:00Z",
  },
];

// Dummy data for invoices
export const DUMMY_INVOICES: Invoice[] = [
  { id: "1", invoiceNumber: "INV001", clientName: "Alice Wonderland", clientEmail: "alice@example.com", clientId: "client_001", amount: 150.00, dueDate: "2024-08-15", issuedDate: "2024-07-15", status: "Paid", items: [{id: "item_1", description: "Consulting Hour", quantity: 1, unitPrice: 150, total: 150}] },
  { id: "2", invoiceNumber: "INV002", clientName: "Bob The Builder", clientEmail: "bob@example.com", clientId: "client_002", amount: 300.50, dueDate: "2024-07-20", issuedDate: "2024-07-01", status: "Overdue", items: [{id: "item_2", description: "Website Update", quantity: 1, unitPrice: 300.50, total: 300.50}] },
  { id: "3", invoiceNumber: "INV003", clientName: "Charlie Brown", clientEmail: "charlie@example.com", clientId: "client_001", amount: 75.20, dueDate: "2024-09-01", issuedDate: "2024-07-25", status: "Sent", items: [{id: "item_3", description: "Logo Sketch", quantity: 1, unitPrice: 75.20, total: 75.20}] },
  { id: "4", invoiceNumber: "INV004", clientName: "Diana Prince", clientEmail: "diana@example.com", clientId: "client_003", amount: 500.00, dueDate: "2024-08-10", issuedDate: "2024-07-10", status: "Draft", items: [{id: "item_4", description: "Full Branding Package", quantity: 1, unitPrice: 500, total: 500}] },
  { id: "5", invoiceNumber: "INV005", clientName: "Edward Scissorhands", clientEmail: "edward@example.com", clientId: "client_004", amount: 220.75, dueDate: "2024-07-30", issuedDate: "2024-07-12", status: "Paid", items: [] },
  { id: "6", invoiceNumber: "INV006", clientName: "Fiona Apple", clientEmail: "fiona@example.com", amount: 99.99, dueDate: "2024-06-30", issuedDate: "2024-06-01", status: "Overdue", items: [] },
  { id: "7", invoiceNumber: "INV007", clientName: "George Costanza", clientEmail: "george@example.com", clientId: "client_002", amount: 1250.00, dueDate: "2024-09-15", issuedDate: "2024-07-28", status: "Sent", items: [] },
  { id: "8", invoiceNumber: "INV008", clientName: "Harry Potter", clientEmail: "harry@example.com", clientId: "client_001", amount: 42.00, dueDate: "2024-08-20", issuedDate: "2024-07-20", status: "Cancelled", items: [] },
];
