
export type InvoiceStatus = "Draft" | "Sent" | "Paid" | "Overdue" | "Cancelled";
export type TicketStatus = "New" | "In Review" | "In Progress" | "Resolved" | "Closed";
export type UserRole = "Administrator" | "Billing" | "Technician" | "Client";

export type CustomerType = "Empresa" | "Particular" | "Freelancer";
export type CustomerStatus = "Activo" | "Inactivo" | "Con Deuda";
export type CustomerOrigin = "Referido" | "Google" | "Redes Sociales" | "Publicidad Online" | "Evento" | "Otro";
export type BusinessSector = "Tecnología" | "Diseño" | "Retail" | "Salud" | "Consultoría" | "Educación" | "Finanzas" | "Manufactura" | "Otro";


export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string; // This might become clientID linking to Customer
  clientEmail: string; // This might become redundant if linked to Customer
  customerId?: string; // Optional: Link to a customer
  amount: number;
  dueDate: string; // ISO string format e.g. "2024-07-28"
  issuedDate: string; // ISO string format
  status: InvoiceStatus;
  items: InvoiceItem[];
}

export interface InvoiceItem {
  id: string; // Could be a unique ID for the line item if needed for DB
  description: string;
  quantity: number;
  unitPrice: number;
  total: number; // quantity * unitPrice
}

export interface Ticket {
  id: string;
  ticketNumber: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: "Low" | "Medium" | "High";
  assignedTo?: string; // User ID
  submittedBy: string; // User ID or name
  role: UserRole; // Role of submitter for context
  createdAt: string; // ISO string format
  updatedAt: string; // ISO string format
  customerId?: string; // Optional: Link to a customer
}

export interface User {
  id:string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface Customer {
  id: string;
  customerType: CustomerType;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatarUrl?: string; // URL to avatar/logo
  companyName?: string;
  taxId?: string; // CIF, RUC, ABN, etc.
  address: {
    street?: string;
    city?: string;
    state?: string; // State/Province
    postalCode?: string;
    country?: string; // Could be a selector
  };
  website?: string;
  commercialInfo: {
    businessType?: BusinessSector;
    origin?: CustomerOrigin;
    internalNotes?: string;
  };
  status: CustomerStatus;
  // Financial summaries - these would likely be calculated
  totalBilled: number;
  pendingBalance: number;
  // AI Generated fields
  aiProfileSummary?: string;
  aiOpportunities?: string;
  // Timestamps
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export interface CustomerDocument {
  id: string;
  customerId: string;
  fileName: string;
  fileType: string; // e.g., 'pdf', 'docx', 'png'
  fileUrl: string; // URL to the document
  uploadedAt: string; // ISO string
  size: number; // in bytes
}

export interface CustomerProject {
  id: string;
  customerId: string;
  projectName: string;
  description?: string;
  startDate?: string; // ISO string
  endDate?: string; // ISO string
  status: "Active" | "Completed" | "On Hold" | "Cancelled";
}
