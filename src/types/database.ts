export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      clients: {
        Row: {
          id: string;
          client_type: "Empresa" | "Particular" | "Freelancer";
          first_name: string;
          last_name: string;
          email: string;
          phone: string | null;
          avatar_url: string | null;
          company_name: string | null;
          tax_id: string | null;
          address_street: string | null;
          address_city: string | null;
          address_state: string | null;
          address_postal_code: string | null;
          address_country: string | null;
          website: string | null;
          business_type: string | null;
          origin: string | null;
          internal_notes: string | null;
          status: "Activo" | "Inactivo" | "Con Deuda";
          total_billed: number;
          pending_balance: number;
          ai_profile_summary: string | null;
          ai_opportunities: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          client_type: "Empresa" | "Particular" | "Freelancer";
          first_name: string;
          last_name: string;
          email: string;
          phone?: string | null;
          avatar_url?: string | null;
          company_name?: string | null;
          tax_id?: string | null;
          address_street?: string | null;
          address_city?: string | null;
          address_state?: string | null;
          address_postal_code?: string | null;
          address_country?: string | null;
          website?: string | null;
          business_type?: string | null;
          origin?: string | null;
          internal_notes?: string | null;
          status?: "Activo" | "Inactivo" | "Con Deuda";
          total_billed?: number;
          pending_balance?: number;
          ai_profile_summary?: string | null;
          ai_opportunities?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          client_type?: "Empresa" | "Particular" | "Freelancer";
          first_name?: string;
          last_name?: string;
          email?: string;
          phone?: string | null;
          avatar_url?: string | null;
          company_name?: string | null;
          tax_id?: string | null;
          address_street?: string | null;
          address_city?: string | null;
          address_state?: string | null;
          address_postal_code?: string | null;
          address_country?: string | null;
          website?: string | null;
          business_type?: string | null;
          origin?: string | null;
          internal_notes?: string | null;
          status?: "Activo" | "Inactivo" | "Con Deuda";
          total_billed?: number;
          pending_balance?: number;
          ai_profile_summary?: string | null;
          ai_opportunities?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      invoices: {
        Row: {
          id: string;
          invoice_number: string;
          client_id: string;
          client_name: string;
          client_email: string;
          amount: number;
          due_date: string;
          issued_date: string;
          status: "Draft" | "Sent" | "Paid" | "Overdue" | "Cancelled";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          invoice_number: string;
          client_id: string;
          client_name: string;
          client_email: string;
          amount: number;
          due_date: string;
          issued_date: string;
          status?: "Draft" | "Sent" | "Paid" | "Overdue" | "Cancelled";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          invoice_number?: string;
          client_id?: string;
          client_name?: string;
          client_email?: string;
          amount?: number;
          due_date?: string;
          issued_date?: string;
          status?: "Draft" | "Sent" | "Paid" | "Overdue" | "Cancelled";
          created_at?: string;
          updated_at?: string;
        };
      };
      invoice_items: {
        Row: {
          id: string;
          invoice_id: string;
          description: string;
          quantity: number;
          unit_price: number;
          total: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          invoice_id: string;
          description: string;
          quantity: number;
          unit_price: number;
          total: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          invoice_id?: string;
          description?: string;
          quantity?: number;
          unit_price?: number;
          total?: number;
          created_at?: string;
        };
      };
      tickets: {
        Row: {
          id: string;
          ticket_number: string;
          title: string;
          description: string;
          status: "New" | "In Review" | "In Progress" | "Resolved" | "Closed";
          priority: "Low" | "Medium" | "High";
          assigned_to: string | null;
          submitted_by: string;
          client_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          ticket_number: string;
          title: string;
          description: string;
          status?: "New" | "In Review" | "In Progress" | "Resolved" | "Closed";
          priority?: "Low" | "Medium" | "High";
          assigned_to?: string | null;
          submitted_by: string;
          client_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          ticket_number?: string;
          title?: string;
          description?: string;
          status?: "New" | "In Review" | "In Progress" | "Resolved" | "Closed";
          priority?: "Low" | "Medium" | "High";
          assigned_to?: string | null;
          submitted_by?: string;
          client_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      users: {
        Row: {
          id: string;
          name: string;
          email: string;
          role:
            | "Administrator"
            | "Billing"
            | "Technician"
            | "Client"
            | "Scrum"
            | "Project Leader"
            | "Programmer"
            | "QA";
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          role?:
            | "Administrator"
            | "Billing"
            | "Technician"
            | "Client"
            | "Scrum"
            | "Project Leader"
            | "Programmer"
            | "QA";
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          role?:
            | "Administrator"
            | "Billing"
            | "Technician"
            | "Client"
            | "Scrum"
            | "Project Leader"
            | "Programmer"
            | "QA";
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      client_documents: {
        Row: {
          id: string;
          client_id: string;
          file_name: string;
          file_type: string;
          file_url: string;
          size: number;
          uploaded_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          file_name: string;
          file_type: string;
          file_url: string;
          size: number;
          uploaded_at?: string;
        };
        Update: {
          id?: string;
          client_id?: string;
          file_name?: string;
          file_type?: string;
          file_url?: string;
          size?: number;
          uploaded_at?: string;
        };
      };
      client_projects: {
        Row: {
          id: string;
          client_id: string;
          project_name: string;
          description: string | null;
          start_date: string | null;
          end_date: string | null;
          status: "Active" | "Completed" | "On Hold" | "Cancelled";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          project_name: string;
          description?: string | null;
          start_date?: string | null;
          end_date?: string | null;
          status?: "Active" | "Completed" | "On Hold" | "Cancelled";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          client_id?: string;
          project_name?: string;
          description?: string | null;
          start_date?: string | null;
          end_date?: string | null;
          status?: "Active" | "Completed" | "On Hold" | "Cancelled";
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
