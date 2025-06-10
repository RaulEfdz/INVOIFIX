import { supabase } from "@/lib/supabase";
import { Database } from "@/types/database";

type Ticket = Database["public"]["Tables"]["tickets"]["Row"];
type TicketInsert = Database["public"]["Tables"]["tickets"]["Insert"];
type TicketUpdate = Database["public"]["Tables"]["tickets"]["Update"];

export class TicketService {
  // Obtener todos los tickets
  static async getAll() {
    const { data, error } = await supabase
      .from("tickets")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }

  // Obtener ticket por ID
  static async getById(id: string) {
    const { data, error } = await supabase
      .from("tickets")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  }

  // Crear nuevo ticket
  static async create(ticket: TicketInsert) {
    const ticketNumber = await this.generateTicketNumber();

    const { data, error } = await supabase
      .from("tickets")
      .insert({
        ...ticket,
        ticket_number: ticketNumber,
        status: "New",
        priority: ticket.priority || "Medium",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Actualizar ticket
  static async update(id: string, updates: TicketUpdate) {
    const { data, error } = await supabase
      .from("tickets")
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

  // Eliminar ticket
  static async delete(id: string) {
    const { error } = await supabase.from("tickets").delete().eq("id", id);

    if (error) throw error;
  }

  // Obtener tickets por estado
  static async getByStatus(
    status: "New" | "In Review" | "In Progress" | "Resolved" | "Closed"
  ) {
    const { data, error } = await supabase
      .from("tickets")
      .select("*")
      .eq("status", status)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }

  // Obtener tickets por prioridad
  static async getByPriority(priority: "Low" | "Medium" | "High") {
    const { data, error } = await supabase
      .from("tickets")
      .select("*")
      .eq("priority", priority)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }

  // Obtener tickets asignados a un usuario
  static async getByAssignee(userId: string) {
    const { data, error } = await supabase
      .from("tickets")
      .select("*")
      .eq("assigned_to", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }

  // Obtener tickets por cliente
  static async getByClient(clientId: string) {
    const { data, error } = await supabase
      .from("tickets")
      .select("*")
      .eq("client_id", clientId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }

  // Buscar tickets
  static async search(query: string) {
    const { data, error } = await supabase
      .from("tickets")
      .select("*")
      .or(
        `ticket_number.ilike.%${query}%,title.ilike.%${query}%,description.ilike.%${query}%,submitted_by.ilike.%${query}%`
      )
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }

  // Asignar ticket a un usuario
  static async assign(id: string, userId: string) {
    const { data, error } = await supabase
      .from("tickets")
      .update({
        assigned_to: userId,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Actualizar estado del ticket
  static async updateStatus(
    id: string,
    status: "New" | "In Review" | "In Progress" | "Resolved" | "Closed"
  ) {
    const { data, error } = await supabase
      .from("tickets")
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

  // Actualizar prioridad del ticket
  static async updatePriority(id: string, priority: "Low" | "Medium" | "High") {
    const { data, error } = await supabase
      .from("tickets")
      .update({
        priority,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Obtener estadísticas de tickets
  static async getStats() {
    const { data, error } = await supabase
      .from("tickets")
      .select("status, priority");

    if (error) throw error;

    const stats = {
      total: data.length,
      new: data.filter((ticket) => ticket.status === "New").length,
      inReview: data.filter((ticket) => ticket.status === "In Review").length,
      inProgress: data.filter((ticket) => ticket.status === "In Progress")
        .length,
      resolved: data.filter((ticket) => ticket.status === "Resolved").length,
      closed: data.filter((ticket) => ticket.status === "Closed").length,
      highPriority: data.filter((ticket) => ticket.priority === "High").length,
      mediumPriority: data.filter((ticket) => ticket.priority === "Medium")
        .length,
      lowPriority: data.filter((ticket) => ticket.priority === "Low").length,
    };

    return stats;
  }

  // Obtener tickets agrupados por estado (para Kanban)
  static async getKanbanData() {
    const { data, error } = await supabase
      .from("tickets")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    const kanbanData = {
      New: data.filter((ticket) => ticket.status === "New"),
      "In Review": data.filter((ticket) => ticket.status === "In Review"),
      "In Progress": data.filter((ticket) => ticket.status === "In Progress"),
      Resolved: data.filter((ticket) => ticket.status === "Resolved"),
      Closed: data.filter((ticket) => ticket.status === "Closed"),
    };

    return kanbanData;
  }

  // Generar número de ticket único
  static async generateTicketNumber() {
    const year = new Date().getFullYear();
    const { data, error } = await supabase
      .from("tickets")
      .select("ticket_number")
      .like("ticket_number", `TKT-${year}-%`)
      .order("ticket_number", { ascending: false })
      .limit(1);

    if (error) throw error;

    let nextNumber = 1;
    if (data && data.length > 0) {
      const lastNumber = data[0].ticket_number.split("-")[2];
      nextNumber = parseInt(lastNumber) + 1;
    }

    return `TKT-${year}-${nextNumber.toString().padStart(4, "0")}`;
  }
}
