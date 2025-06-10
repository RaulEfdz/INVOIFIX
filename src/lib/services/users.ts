import { supabase } from "@/lib/supabase";
import { Database } from "@/types/database";

type User = Database["public"]["Tables"]["users"]["Row"];
type UserInsert = Database["public"]["Tables"]["users"]["Insert"];
type UserUpdate = Database["public"]["Tables"]["users"]["Update"];

export class UserService {
  // Obtener todos los usuarios
  static async getAll() {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }

  // Obtener usuario por ID
  static async getById(id: string) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  }

  // Obtener usuario por email
  static async getByEmail(email: string) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error) throw error;
    return data;
  }

  // Crear nuevo usuario
  static async create(user: UserInsert) {
    const { data, error } = await supabase
      .from("users")
      .insert({
        ...user,
        role: user.role || "Client",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Actualizar usuario
  static async update(id: string, updates: UserUpdate) {
    const { data, error } = await supabase
      .from("users")
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

  // Eliminar usuario
  static async delete(id: string) {
    const { error } = await supabase.from("users").delete().eq("id", id);

    if (error) throw error;
  }

  // Obtener usuarios por rol
  static async getByRole(
    role:
      | "Administrator"
      | "Billing"
      | "Technician"
      | "Client"
      | "Scrum"
      | "Project Leader"
      | "Programmer"
      | "QA"
  ) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("role", role)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }

  // Buscar usuarios
  static async search(query: string) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .or(`name.ilike.%${query}%,email.ilike.%${query}%`)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }

  // Obtener técnicos (para asignación de tickets)
  static async getTechnicians() {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .in("role", ["Technician", "Administrator", "Project Leader"])
      .order("name", { ascending: true });

    if (error) throw error;
    return data;
  }

  // Obtener estadísticas de usuarios
  static async getStats() {
    const { data, error } = await supabase.from("users").select("role");

    if (error) throw error;

    const stats = {
      total: data.length,
      administrators: data.filter((user) => user.role === "Administrator")
        .length,
      billing: data.filter((user) => user.role === "Billing").length,
      technicians: data.filter((user) => user.role === "Technician").length,
      clients: data.filter((user) => user.role === "Client").length,
      scrum: data.filter((user) => user.role === "Scrum").length,
      projectLeaders: data.filter((user) => user.role === "Project Leader")
        .length,
      programmers: data.filter((user) => user.role === "Programmer").length,
      qa: data.filter((user) => user.role === "QA").length,
    };

    return stats;
  }

  // Actualizar rol de usuario
  static async updateRole(
    id: string,
    role:
      | "Administrator"
      | "Billing"
      | "Technician"
      | "Client"
      | "Scrum"
      | "Project Leader"
      | "Programmer"
      | "QA"
  ) {
    const { data, error } = await supabase
      .from("users")
      .update({
        role,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Verificar si el usuario existe
  static async exists(email: string) {
    const { data, error } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (error && error.code !== "PGRST116") throw error;
    return !!data;
  }

  // Obtener usuarios activos (para dashboard)
  static async getActiveUsers() {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .neq("role", "Client")
      .order("name", { ascending: true });

    if (error) throw error;
    return data;
  }
}
