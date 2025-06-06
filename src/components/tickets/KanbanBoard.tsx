"use client";

import type { Ticket, TicketStatus } from "@/types";
import { KANBAN_COLUMNS } from "@/lib/constants";
import { KanbanColumn } from "./KanbanColumn";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface KanbanBoardProps {
  tickets: Ticket[];
}

export function KanbanBoard({ tickets }: KanbanBoardProps) {
  const ticketsByStatus = KANBAN_COLUMNS.reduce((acc, column) => {
    acc[column.id] = tickets.filter((ticket) => ticket.status === column.id);
    return acc;
  }, {} as Record<TicketStatus, Ticket[]>);

  // Drag and drop functionality would be added here in a real implementation
  // For now, it's a static display.

  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex gap-6 p-1 pb-4">
        {KANBAN_COLUMNS.map((column) => (
          <KanbanColumn
            key={column.id}
            status={column.id}
            title={column.title}
            tickets={ticketsByStatus[column.id] || []}
          />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
