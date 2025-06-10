"use client";

import * as React from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { Button } from "@/components/ui/button";
import { KanbanBoard } from "@/components/tickets/KanbanBoard";
import { TicketDetailSheet } from "@/components/tickets/TicketDetailSheet";
import type { Ticket, ChecklistItem } from "@/types";
import { DUMMY_TICKETS as initialTickets } from "@/lib/constants"; // Import DUMMY_TICKETS
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function TicketsPage() {
  const [tickets, setTickets] = React.useState<Ticket[]>(initialTickets);
  const [selectedTicket, setSelectedTicket] = React.useState<Ticket | null>(
    null
  );
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  const handleTicketSelect = (ticket: Ticket) => {
    // Ensure the ticket has a checklist initialized
    const ticketWithChecklist = {
      ...ticket,
      checklist: ticket.checklist || [],
    };
    setSelectedTicket(ticketWithChecklist);
    setIsSheetOpen(true);
  };

  const handleSheetOpenChange = (open: boolean) => {
    setIsSheetOpen(open);
    if (!open) {
      setSelectedTicket(null);
    }
  };

  const handleTicketUpdate = (updatedTicket: Ticket) => {
    setTickets((prevTickets) =>
      prevTickets.map((t) => (t.id === updatedTicket.id ? updatedTicket : t))
    );
    // If the updated ticket is the one currently in the sheet, update it there too
    if (selectedTicket && selectedTicket.id === updatedTicket.id) {
      setSelectedTicket(updatedTicket);
    }
  };

  return (
    <>
      <AppHeader pageTitle="Tickets de soporte" />
      <main className="flex-1 flex flex-col p-6 space-y-6 overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-headline font-semibold">
              Tablero Kanban de Tickets
            </h2>
            <p className="text-muted-foreground font-light">
              Visualice y gestione los tickets de soporte a través de las
              diferentes etapas.
            </p>
          </div>
          <Button asChild className="font-medium w-full sm:w-auto">
            <Link href="/admin/tickets/submit">
              <PlusCircle className="mr-2 h-5 w-5" /> Enviar nuevo ticket
            </Link>
          </Button>
        </div>
        <div className="flex-1 min-h-0">
          <KanbanBoard tickets={tickets} onTicketSelect={handleTicketSelect} />
        </div>
      </main>
      {selectedTicket && (
        <TicketDetailSheet
          ticket={selectedTicket}
          isOpen={isSheetOpen}
          onOpenChange={handleSheetOpenChange}
          onTicketUpdate={handleTicketUpdate}
        />
      )}
    </>
  );
}
