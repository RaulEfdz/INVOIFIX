import { supabase } from "@/lib/supabase";
import { Database } from "@/types/database";

type Invoice = Database["public"]["Tables"]["invoices"]["Row"];
type InvoiceInsert = Database["public"]["Tables"]["invoices"]["Insert"];
type InvoiceUpdate = Database["public"]["Tables"]["invoices"]["Update"];
type InvoiceItem = Database["public"]["Tables"]["invoice_items"]["Row"];
type InvoiceItemInsert =
  Database["public"]["Tables"]["invoice_items"]["Insert"];

export class InvoiceService {
  // Obtener todas las facturas
  static async getAll() {
    const { data, error } = await supabase
      .from("invoices")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }

  // Obtener factura por ID con items
  static async getById(id: string) {
    const { data: invoice, error: invoiceError } = await supabase
      .from("invoices")
      .select("*")
      .eq("id", id)
      .single();

    if (invoiceError) throw invoiceError;

    const { data: items, error: itemsError } = await supabase
      .from("invoice_items")
      .select("*")
      .eq("invoice_id", id)
      .order("created_at", { ascending: true });

    if (itemsError) throw itemsError;

    return { ...invoice, items };
  }

  // Crear nueva factura con items
  static async create(invoice: InvoiceInsert, items: InvoiceItemInsert[]) {
    // Crear la factura
    const { data: newInvoice, error: invoiceError } = await supabase
      .from("invoices")
      .insert({
        ...invoice,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (invoiceError) throw invoiceError;

    // Crear los items de la factura
    if (items.length > 0) {
      const itemsWithInvoiceId = items.map((item) => ({
        ...item,
        invoice_id: newInvoice.id,
        created_at: new Date().toISOString(),
      }));

      const { error: itemsError } = await supabase
        .from("invoice_items")
        .insert(itemsWithInvoiceId);

      if (itemsError) throw itemsError;
    }

    return newInvoice;
  }

  // Actualizar factura
  static async update(id: string, updates: InvoiceUpdate) {
    const { data, error } = await supabase
      .from("invoices")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Eliminar factura
  static async delete(id: string) {
    // Primero eliminar los items
    await supabase.from("invoice_items").delete().eq("invoice_id", id);

    // Luego eliminar la factura
    const { error } = await supabase.from("invoices").delete().eq("id", id);

    if (error) throw error;
  }

  // Obtener facturas por cliente
  static async getByClient(clientId: string) {
    const { data, error } = await supabase
      .from("invoices")
      .select("*")
      .eq("client_id", clientId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }

  // Obtener facturas por estado
  static async getByStatus(
    status: "Draft" | "Sent" | "Paid" | "Overdue" | "Cancelled"
  ) {
    const { data, error } = await supabase
      .from("invoices")
      .select("*")
      .eq("status", status)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }

  // Buscar facturas
  static async search(query: string) {
    const { data, error } = await supabase
      .from("invoices")
      .select("*")
      .or(
        `invoice_number.ilike.%${query}%,client_name.ilike.%${query}%,client_email.ilike.%${query}%`
      )
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }

  // Obtener estadísticas de facturas
  static async getStats() {
    const { data, error } = await supabase
      .from("invoices")
      .select("status, amount");

    if (error) throw error;

    const stats = {
      total: data.length,
      draft: data.filter((inv) => inv.status === "Draft").length,
      sent: data.filter((inv) => inv.status === "Sent").length,
      paid: data.filter((inv) => inv.status === "Paid").length,
      overdue: data.filter((inv) => inv.status === "Overdue").length,
      cancelled: data.filter((inv) => inv.status === "Cancelled").length,
      totalAmount: data.reduce((sum, inv) => sum + inv.amount, 0),
      paidAmount: data
        .filter((inv) => inv.status === "Paid")
        .reduce((sum, inv) => sum + inv.amount, 0),
      pendingAmount: data
        .filter((inv) => ["Sent", "Overdue"].includes(inv.status))
        .reduce((sum, inv) => sum + inv.amount, 0),
    };

    return stats;
  }

  // Actualizar estado de factura
  static async updateStatus(
    id: string,
    status: "Draft" | "Sent" | "Paid" | "Overdue" | "Cancelled"
  ) {
    const { data, error } = await supabase
      .from("invoices")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Generar número de factura único
  static async generateInvoiceNumber() {
    const year = new Date().getFullYear();
    const { data, error } = await supabase
      .from("invoices")
      .select("invoice_number")
      .like("invoice_number", `INV-${year}-%`)
      .order("invoice_number", { ascending: false })
      .limit(1);

    if (error) throw error;

    let nextNumber = 1;
    if (data && data.length > 0) {
      const lastNumber = data[0].invoice_number.split("-")[2];
      nextNumber = parseInt(lastNumber) + 1;
    }

    return `INV-${year}-${nextNumber.toString().padStart(4, "0")}`;
  }
}
