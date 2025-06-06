export type InvoiceStatus = "Draft" | "Sent" | "Paid" | "Overdue" | "Cancelled";
export type TicketStatus = "New" | "In Review" | "In Progress" | "Resolved" | "Closed";
export type UserRole = "Administrator" | "Billing" | "Technician" | "Client";

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  amount: number;
  dueDate: string; // ISO string format e.g. "2024-07-28"
  issuedDate: string; // ISO string format
  status: InvoiceStatus;
  items: InvoiceItem[];
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Ticket {
  id: string;
  ticketNumber: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: "Low" | "Medium" | "High";
  assignedTo?: string; // User ID
  submittedBy: string; // User ID
  role: UserRole; // Role of submitter for context
  createdAt: string; // ISO string format
  updatedAt: string; // ISO string format
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}
