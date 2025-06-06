
"use client";

import * as React from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { Button } from "@/components/ui/button";
import { KanbanBoard } from "@/components/tickets/KanbanBoard";
import type { Ticket } from "@/types";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

// Dummy data for tickets
const DUMMY_TICKETS: Ticket[] = [
  { id: "t1", ticketNumber: "TKT001", title: "Login button not working on Safari", description: "Users on Safari are reporting that the login button is unresponsive. Tested on Safari 15.2.", status: "New", priority: "High", submittedBy: "client1", role: "Client", createdAt: "2024-07-27T10:00:00Z", updatedAt: "2024-07-27T10:00:00Z", assignedTo: "TechGuy1", clientId: "client_001" },
  { id: "t2", ticketNumber: "TKT002", title: "Invoice PDF generation error", description: "Getting a 500 error when trying to download invoice #INV005 as PDF.", status: "In Progress", priority: "High", submittedBy: "billingTeamUser2", role: "Billing", createdAt: "2024-07-26T14:30:00Z", updatedAt: "2024-07-27T11:00:00Z", assignedTo: "DevLead", clientId: "client_002" },
  { id: "t3", ticketNumber: "TKT003", title: "Feature request: Dark mode", description: "It would be great to have a dark mode option for the application interface.", status: "In Review", priority: "Medium", submittedBy: "client3", role: "Client", createdAt: "2024-07-25T09:15:00Z", updatedAt: "2024-07-26T16:00:00Z", clientId: "client_003" },
  { id: "t4", ticketNumber: "TKT004", title: "Typo on the contact page", description: "The phone number on the contact us page has a typo. It should be 555-1234, not 555-1235.", status: "Resolved", priority: "Low", submittedBy: "techSupportUser4", role: "Technician", createdAt: "2024-07-24T11:00:00Z", updatedAt: "2024-07-25T10:00:00Z", assignedTo: "ContentEditor" },
  { id: "t5", ticketNumber: "TKT005", title: "Unable to update profile picture", description: "When I try to upload a new profile picture, it shows an 'Upload failed' message.", status: "New", priority: "Medium", submittedBy: "client5", role: "Client", createdAt: "2024-07-28T08:00:00Z", updatedAt: "2024-07-28T08:00:00Z", clientId: "client_001" },
  { id: "t6", ticketNumber: "TKT006", title: "Add recurring invoice option", description: "Need ability to set up invoices that recur monthly or annually.", status: "In Review", priority: "High", submittedBy: "billingManager", role: "Billing", createdAt: "2024-07-28T10:00:00Z", updatedAt: "2024-07-28T10:00:00Z", assignedTo: "ProductTeam", clientId: "client_004" },
];

export default function TicketsPage() {
  const [tickets, setTickets] = React.useState<Ticket[]>(DUMMY_TICKETS);

  return (
    <>
      <AppHeader pageTitle="Support Tickets" />
      <main className="flex-1 flex flex-col p-6 space-y-6 overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-headline font-semibold">Ticket Kanban Board</h2>
            <p className="text-muted-foreground font-light">
              Visualize and manage support tickets through different stages.
            </p>
          </div>
          <Button asChild className="font-medium w-full sm:w-auto">
            <Link href="/tickets/submit">
              <PlusCircle className="mr-2 h-5 w-5" /> Submit New Ticket
            </Link>
          </Button>
        </div>
        <div className="flex-1 min-h-0">
          <KanbanBoard tickets={tickets} />
        </div>
      </main>
    </>
  );
}
