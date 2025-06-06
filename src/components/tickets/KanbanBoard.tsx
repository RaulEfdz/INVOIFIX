
"use client";

import type { Ticket, TicketStatus } from "@/types";
import { KANBAN_COLUMNS } from "@/lib/constants";
import { KanbanColumn } from "./KanbanColumn";
import { ScrollArea } from "@/components/ui/scroll-area";

interface KanbanBoardProps {
  tickets: Ticket[];
  onTicketSelect: (ticket: Ticket) => void;
}

export function KanbanBoard({ tickets, onTicketSelect }: KanbanBoardProps) {
  const ticketsByStatus = KANBAN_COLUMNS.reduce((acc, column) => {
    acc[column.id] = tickets.filter((ticket) => ticket.status === column.id);
    return acc;
  }, {} as Record<TicketStatus, Ticket[]>);

  return (
    <ScrollArea className="w-full h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-1 pb-4">
        {KANBAN_COLUMNS.map((column) => (
          <KanbanColumn
            key={column.id}
            status={column.id}
            title={column.title}
            headerColorClass={column.headerColorClass}
            tickets={ticketsByStatus[column.id] || []}
            onTicketSelect={onTicketSelect}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
