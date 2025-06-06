
"use client";

import type { Client } from "@/types"; // Updated type
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Phone, MoreVertical, ChevronRight, Edit, FileText, Archive } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

interface ClientCardProps { // Updated interface name
  client: Client; // Updated prop type
}

// Helper function to get initials, checking for client.companyName as a fallback
const getInitials = (client: Client): string => {
  const first = client.firstName ? client.firstName.charAt(0) : "";
  const last = client.lastName ? client.lastName.charAt(0) : "";
  if (!first && !last && client.companyName) return client.companyName.substring(0,2).toUpperCase();
  if (!first && !last) return "NN"; // No Name
  return `${first}${last}`.toUpperCase();
};

export function ClientCard({ client }: ClientCardProps) { // Updated component name and prop name
  const initials = getInitials(client);

  return (
    <Card className="shadow-sm hover:shadow-lg transition-shadow bg-card rounded-xl overflow-hidden">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 min-w-0"> {/* Added min-w-0 for better truncation */}
            <Avatar className="h-10 w-10 border flex-shrink-0">
              <AvatarImage 
                src={client.avatarUrl || `https://placehold.co/100x100.png?text=${initials}`} 
                alt={`${client.firstName} ${client.lastName}`} 
                data-ai-hint="avatar person"
              />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="overflow-hidden"> {/* Added overflow-hidden for truncation */}
              <p className="font-semibold text-sm text-foreground truncate" title={`${client.firstName} ${client.lastName}`}>
                {client.firstName} {client.lastName}
              </p>
              <p className="text-xs text-muted-foreground font-light truncate" title={client.email}>
                {client.email}
              </p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground flex-shrink-0">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="font-light">
              <DropdownMenuItem onSelect={() => window.location.href = `/clients/${client.id}`}>
                <ChevronRight className="mr-2 h-4 w-4" /> View Details
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => window.location.href = `/clients/edit/${client.id}`}> {/* Assuming an edit route */}
                <Edit className="mr-2 h-4 w-4" /> Edit Client
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => window.location.href = `/invoices/create?clientId=${client.id}`}> {/* Pass clientId to create invoice */}
                <FileText className="mr-2 h-4 w-4" /> Create Invoice
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Archive className="mr-2 h-4 w-4" /> Archive Client
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="flex items-center text-xs text-muted-foreground font-light gap-1.5 pt-1">
          <Phone className="h-3.5 w-3.5" />
          <span>{client.phone || "N/A"}</span>
        </div>

        <div className="pt-1">
          <Link href={`/clients/${client.id}`} className="flex items-center justify-end text-xs text-primary hover:text-primary/80 font-medium transition-colors">
            See details <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
