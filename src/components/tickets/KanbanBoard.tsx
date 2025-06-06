
"use client";

import type { Ticket, TicketStatus } from "@/types";
import { KANBAN_COLUMNS } from "@/lib/constants";
import { KanbanColumn } from "./KanbanColumn";
import { ScrollArea } from "@/components/ui/scroll-area"; // Removed ScrollBar as horizontal scroll is not the primary mode now

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
    <ScrollArea className="w-full h-full"> {/* Ensure ScrollArea takes available height */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-1 pb-4"> {/* Changed to grid layout */}
        {KANBAN_COLUMNS.map((column) => (
          <KanbanColumn
            key={column.id}
            status={column.id}
            title={column.title}
            tickets={ticketsByStatus[column.id] || []}
          />
        ))}
      </div>
      {/* Horizontal ScrollBar removed as it's now a grid that wraps or scrolls vertically */}
    </ScrollArea>
  );
}
