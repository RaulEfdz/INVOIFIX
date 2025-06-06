

export type InvoiceStatus = "Draft" | "Sent" | "Paid" | "Overdue" | "Cancelled";
export type TicketStatus = "New" | "In Review" | "In Progress" | "Resolved" | "Closed";
export type UserRole = "Administrator" | "Billing" | "Technician" | "Client";

export type ClientType = "Empresa" | "Particular" | "Freelancer";
export type ClientStatus = "Activo" | "Inactivo" | "Con Deuda";
export type ClientOrigin = "Referido" | "Google" | "Redes Sociales" | "Publicidad Online" | "Evento" | "Otro";
export type BusinessSector = "Tecnología" | "Diseño" | "Retail" | "Salud" | "Consultoría" | "Educación" | "Finanzas" | "Manufactura" | "Otro";

export interface InvoiceItem {
  id: string; 
  description: string;
  quantity: number;
  unitPrice: number;
  total: number; 
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string; 
  clientEmail: string; 
  clientId?: string; 
  amount: number;
  dueDate: string; 
  issuedDate: string; 
  status: InvoiceStatus;
  items: InvoiceItem[];
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface Ticket {
  id: string;
  ticketNumber: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: "Low" | "Medium" | "High";
  assignedTo?: string; 
  submittedBy: string; 
  role: UserRole; 
  createdAt: string; 
  updatedAt: string; 
  clientId?: string; 
  relatedTasks?: { id: string, title: string }[]; // Example structure
  checklist?: ChecklistItem[];
}

export interface User {
  id:string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface Client {
  id: string;
  clientType: ClientType;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatarUrl?: string; 
  companyName?: string;
  taxId?: string; 
  address: {
    street?: string;
    city?: string;
    state?: string; 
    postalCode?: string;
    country?: string; 
  };
  website?: string;
  commercialInfo?: {
    businessType?: BusinessSector;
    origin?: ClientOrigin;
    internalNotes?: string;
  };
  status: ClientStatus;
  totalBilled: number;
  pendingBalance: number;
  aiProfileSummary?: string;
  aiOpportunities?: string;
  createdAt: string; 
  updatedAt: string; 
}

export interface ClientDocument {
  id: string;
  clientId: string;
  fileName: string;
  fileType: string; 
  fileUrl: string; 
  uploadedAt: string; 
  size: number; 
}

export interface ClientProject {
  id: string;
  clientId: string;
  projectName: string;
  description?: string;
  startDate?: string; 
  endDate?: string; 
  status: "Active" | "Completed" | "On Hold" | "Cancelled";
}
