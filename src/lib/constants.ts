import type { InvoiceStatus, TicketStatus, UserRole } from "@/types";

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
