import { supabase } from "@/lib/supabase";
import { Database } from "@/types/database";

type Client = Database["public"]["Tables"]["clients"]["Row"];
type ClientInsert = Database["public"]["Tables"]["clients"]["Insert"];
type ClientUpdate = Database["public"]["Tables"]["clients"]["Update"];

export class ClientService {
  // Obtener todos los clientes
  static async getAll() {
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }

  // Obtener cliente por ID
  static async getById(id: string) {
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  }

  // Crear nuevo cliente
  static async create(client: ClientInsert) {
    const { data, error } = await supabase
      .from("clients")
      .insert({
        ...client,
        total_billed: 0,
        pending_balance: 0,
        status: "Activo",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Actualizar cliente
  static async update(id: string, updates: ClientUpdate) {
    const { data, error } = await supabase
      .from("clients")
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

  // Eliminar cliente
  static async delete(id: string) {
    const { error } = await supabase.from("clients").delete().eq("id", id);

    if (error) throw error;
  }

  // Buscar clientes
  static async search(query: string) {
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .or(
        `first_name.ilike.%${query}%,last_name.ilike.%${query}%,email.ilike.%${query}%,company_name.ilike.%${query}%`
      )
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }

  // Obtener clientes por estado
  static async getByStatus(status: "Activo" | "Inactivo" | "Con Deuda") {
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .eq("status", status)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }

  // Actualizar totales de facturación
  static async updateBillingTotals(
    id: string,
    totalBilled: number,
    pendingBalance: number
  ) {
    const { data, error } = await supabase
      .from("clients")
      .update({
        total_billed: totalBilled,
        pending_balance: pendingBalance,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}
