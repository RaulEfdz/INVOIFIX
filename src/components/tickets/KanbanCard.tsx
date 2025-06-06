
"use client";

import type { Ticket } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserCircle2, Clock } from "lucide-react";

interface KanbanCardProps {
  ticket: Ticket;
  onTicketSelect: (ticket: Ticket) => void;
}

export function KanbanCard({ ticket, onTicketSelect }: KanbanCardProps) {
  const priorityColor = {
    Low: "bg-green-500",
    Medium: "bg-yellow-500",
    High: "bg-red-500",
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: 'short', day: 'numeric'
    });
  };

  return (
    <div 
      onClick={() => onTicketSelect(ticket)} 
      className="block mb-4 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onTicketSelect(ticket);}}
    >
      <Card className="shadow-md hover:shadow-lg transition-shadow cursor-grab active:cursor-grabbing bg-card h-full flex flex-col">
        <CardHeader className="p-4">
          <div className="flex justify-between items-start">
              <CardTitle className="text-base font-medium leading-tight mb-1">{ticket.title}</CardTitle>
              <Badge variant={ticket.priority === "High" ? "destructive" : ticket.priority === "Medium" ? "secondary" : "default"} 
                     className={`text-xs ${ticket.priority === "Low" ? "bg-status-paid text-primary-foreground" : ""}`}>
                  {ticket.priority}
              </Badge>
          </div>
          <CardDescription className="text-xs text-muted-foreground font-light">#{ticket.ticketNumber}</CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0 flex-grow flex flex-col justify-between">
          <p className="text-sm text-muted-foreground mb-3 font-light leading-relaxed line-clamp-2 flex-grow">
            {ticket.description}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground font-light mt-auto">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{formatDate(ticket.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              {ticket.assignedTo ? (
                <>
                  <Avatar className="h-5 w-5">
                    <AvatarImage src={`https://placehold.co/40x40.png?text=${ticket.assignedTo.substring(0,1)}`} data-ai-hint="avatar placeholder"/>
                    <AvatarFallback>{ticket.assignedTo.substring(0,1)}</AvatarFallback>
                  </Avatar>
                  <span className="truncate max-w-[80px]">{ticket.assignedTo}</span>
                </>
              ) : (
                  <>
                  <UserCircle2 className="h-4 w-4" /> 
                  <span>Unassigned</span>
                  </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
