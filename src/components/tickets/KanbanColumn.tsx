"use client";

import type { Ticket, TicketStatus } from "@/types";
import { KanbanCard } from "./KanbanCard";
import { ScrollArea } from "@/components/ui/scroll-area";

interface KanbanColumnProps {
  status: TicketStatus;
  title: string;
  tickets: Ticket[];
}

export function KanbanColumn({ status, title, tickets }: KanbanColumnProps) {
  return (
    <div className="flex flex-col w-full md:w-1/3 lg:w-1/4 xl:w-1/5 min-w-[280px] max-w-[320px] bg-secondary/50 rounded-lg shadow">
      <div className="p-4 border-b border-border">
        <h3 className="text-base font-headline font-semibold text-foreground">
          {title}{" "}
          <span className="text-sm font-light text-muted-foreground">({tickets.length})</span>
        </h3>
      </div>
      <ScrollArea className="flex-1 p-4">
        {tickets.length === 0 ? (
            <div className="flex items-center justify-center h-full min-h-[100px]">
                <p className="text-sm text-muted-foreground font-light">No tickets in this stage.</p>
            </div>
        ) : (
            tickets.map((ticket) => (
                <KanbanCard key={ticket.id} ticket={ticket} />
            ))
        )}
      </ScrollArea>
    </div>
  );
}
