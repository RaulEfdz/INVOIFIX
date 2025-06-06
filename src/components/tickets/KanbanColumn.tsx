
"use client";

import type { Ticket, TicketStatus } from "@/types";
import { KanbanCard } from "./KanbanCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface KanbanColumnProps {
  status: TicketStatus;
  title: string;
  headerColorClass: string;
  tickets: Ticket[];
  onTicketSelect: (ticket: Ticket) => void;
}

export function KanbanColumn({ status, title, tickets, headerColorClass, onTicketSelect }: KanbanColumnProps) {
  return (
    <div className="flex flex-col w-full bg-secondary/50 rounded-lg shadow h-full min-h-[300px]"> 
      <div className={cn(
        "p-4 border-b border-border rounded-t-lg",
        headerColorClass 
      )}>
        <h3 className="text-base font-headline font-semibold text-foreground">
          {title}{" "}
          <span className={cn(
            "text-sm font-light",
            headerColorClass.includes("dark:") ? "text-slate-300" : "text-muted-foreground"
          )}>
            ({tickets.length})
          </span>
        </h3>
      </div>
      <ScrollArea className="flex-1 p-4">
        {tickets.length === 0 ? (
            <div className="flex items-center justify-center h-full min-h-[100px]">
                <p className="text-sm text-muted-foreground font-light">No tickets in this stage.</p>
            </div>
        ) : (
            tickets.map((ticket) => (
                <KanbanCard key={ticket.id} ticket={ticket} onTicketSelect={onTicketSelect} />
            ))
        )}
      </ScrollArea>
    </div>
  );
}
