
"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { AppHeader } from "@/components/layout/AppHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { Ticket, TicketStatus } from "@/types";
import { DUMMY_TICKETS, TICKET_STATUSES, KANBAN_COLUMNS } from "@/lib/constants";
import { ArrowLeft, Edit, MessageSquare, Send, Tag, UserCircle, CalendarDays, BarChartBig, Info, Link as LinkIcon, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function TicketDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const ticketId = params.id as string;

  const [ticket, setTicket] = React.useState<Ticket | null>(null);
  const [newStatus, setNewStatus] = React.useState<TicketStatus | undefined>(undefined);
  const [comment, setComment] = React.useState("");
  const [comments, setComments] = React.useState<Array<{ text: string; date: Date; author: string }>>([]); // Simple comment structure for now

  React.useEffect(() => {
    const foundTicket = DUMMY_TICKETS.find(t => t.id === ticketId);
    if (foundTicket) {
      setTicket(foundTicket);
      setNewStatus(foundTicket.status);
      // In a real app, load existing comments here
    } else {
      // router.push('/tickets'); // Or a 404 page
    }
  }, [ticketId, router]);

  const handleStatusUpdate = () => {
    if (ticket && newStatus) {
      // In a real app, call an API to update the ticket status
      // For now, update local state (which won't persist across navigation unless DUMMY_TICKETS is updated)
      setTicket({ ...ticket, status: newStatus, updatedAt: new Date().toISOString() });
      toast({
        title: "Status Updated",
        description: `Ticket #${ticket.ticketNumber} status changed to ${newStatus}.`,
      });
    }
  };

  const handleAddComment = () => {
    if (comment.trim() === "") {
      toast({ title: "Comment cannot be empty", variant: "destructive" });
      return;
    }
    // In a real app, call an API to add the comment
    const newCommentEntry = { text: comment, date: new Date(), author: "Current User" }; // Replace "Current User" with actual user
    setComments([...comments, newCommentEntry]);
    setComment("");
    toast({
      title: "Comment Added",
      description: "Your comment has been added to the ticket.",
    });
  };
  
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("en-US", {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  const getPriorityBadgeVariant = (priority: "Low" | "Medium" | "High") => {
    if (priority === "High") return "destructive";
    if (priority === "Medium") return "secondary";
    return "default"; // For Low
  };
  
  const getStatusColorClass = (status: TicketStatus) => {
    const column = KANBAN_COLUMNS.find(col => col.id === status);
    return column ? column.headerColorClass : 'bg-muted';
  };


  if (!ticket) {
    return (
      <>
        <AppHeader pageTitle="Ticket Details" />
        <main className="flex-1 p-6 text-center">
          <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
            <Info className="w-16 h-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Ticket Not Found</h2>
            <p className="font-light text-muted-foreground mb-6">The ticket you are looking for could not be found.</p>
            <Button onClick={() => router.push("/tickets")} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tickets
            </Button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <AppHeader pageTitle={`Ticket #${ticket.ticketNumber}`} />
      <main className="flex-1 p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" asChild className="font-medium">
            <Link href="/tickets">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tickets
            </Link>
          </Button>
          <Button variant="default" className="font-medium bg-primary text-primary-foreground hover:bg-primary/90">
            <Edit className="mr-2 h-4 w-4" /> Edit Ticket
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Ticket Details & Actions */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-lg rounded-xl">
              <CardHeader className="border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl font-bold text-foreground">{ticket.title}</CardTitle>
                    <CardDescription className="font-light text-muted-foreground">Ticket ID: {ticket.ticketNumber}</CardDescription>
                  </div>
                  <Badge 
                    variant={getPriorityBadgeVariant(ticket.priority)}
                    className={`text-sm px-3 py-1 ${ticket.priority === "Low" ? "bg-status-paid text-primary-foreground" : ""}`}
                  >
                    {ticket.priority} Priority
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h4 className="font-semibold text-md text-foreground mb-2">Description</h4>
                  <p className="font-light text-sm text-muted-foreground whitespace-pre-wrap">{ticket.description}</p>
                </div>
                
                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                  <div className="flex items-center">
                    <UserCircle className="h-4 w-4 mr-2 text-muted-foreground"/>
                    <span className="font-medium text-foreground mr-1">Submitted by:</span>
                    <span className="font-light text-muted-foreground">{ticket.submittedBy} ({ticket.role})</span>
                  </div>
                   <div className="flex items-center">
                    <UserCircle className="h-4 w-4 mr-2 text-muted-foreground"/>
                    <span className="font-medium text-foreground mr-1">Assigned to:</span>
                    <span className="font-light text-muted-foreground">{ticket.assignedTo || "Unassigned"}</span>
                  </div>
                  <div className="flex items-center">
                    <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground"/>
                    <span className="font-medium text-foreground mr-1">Created:</span>
                    <span className="font-light text-muted-foreground">{formatDate(ticket.createdAt)}</span>
                  </div>
                  <div className="flex items-center">
                    <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground"/>
                    <span className="font-medium text-foreground mr-1">Last Updated:</span>
                    <span className="font-light text-muted-foreground">{formatDate(ticket.updatedAt)}</span>
                  </div>
                   {ticket.clientId && (
                     <div className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-2 text-muted-foreground"/>
                      <span className="font-medium text-foreground mr-1">Client:</span>
                      <Link href={`/clients/${ticket.clientId}`} className="font-light text-primary hover:underline">{ticket.clientId}</Link>
                    </div>
                   )}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="font-bold text-xl flex items-center"><MessageSquare className="mr-2 h-5 w-5"/>Comments & Solution</CardTitle>
                <CardDescription className="font-light">Add notes, updates, or the solution for this ticket.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {comments.length > 0 && (
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                    {comments.map((c, index) => (
                      <div key={index} className="p-3 bg-secondary/50 rounded-md border text-sm">
                        <p className="font-light text-muted-foreground whitespace-pre-wrap">{c.text}</p>
                        <p className="text-xs text-muted-foreground/70 mt-1 text-right">
                          - {c.author} on {formatDate(c.date.toISOString())}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Type your comment or solution details here..."
                  rows={4}
                  className="font-light bg-card"
                />
                <Button onClick={handleAddComment} className="font-medium">
                  <Send className="mr-2 h-4 w-4"/> Add Comment / Update
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Status & Actions */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-lg rounded-xl">
              <CardHeader className={cn("rounded-t-xl", getStatusColorClass(ticket.status))}>
                <CardTitle className="font-bold text-lg text-foreground">Ticket Status</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="text-center mb-2">
                  <Badge 
                    variant={getPriorityBadgeVariant(ticket.status as any)} // Temp any for color match
                    className={cn(
                        "text-lg px-6 py-2 capitalize font-semibold",
                        getStatusColorClass(ticket.status).replace('bg-', 'text-').replace(/\/.*/, '-foreground') // Attempt to derive text color
                    )}
                    style={{ 
                        backgroundColor: `hsl(var(--${getStatusColorClass(ticket.status).split('-')[1]}-100))`, // This needs theme vars
                        color: `hsl(var(--${getStatusColorClass(ticket.status).split('-')[1]}-700))`
                    }}
                    >
                    {ticket.status}
                  </Badge>
                </div>
                
                <div>
                  <Label htmlFor="ticketStatus" className="font-medium text-sm">Change Status</Label>
                  <Select
                    value={newStatus}
                    onValueChange={(value) => setNewStatus(value as TicketStatus)}
                  >
                    <SelectTrigger id="ticketStatus" className="mt-1 font-light bg-card">
                      <SelectValue placeholder="Select new status" />
                    </SelectTrigger>
                    <SelectContent className="font-light">
                      {TICKET_STATUSES.map(statusVal => (
                        <SelectItem key={statusVal} value={statusVal}>{statusVal}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleStatusUpdate} className="w-full font-medium" disabled={newStatus === ticket.status}>
                  Update Status
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="font-bold text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start font-light"><LinkIcon className="mr-2 h-4 w-4"/> Attach File</Button>
                  <Button variant="outline" className="w-full justify-start font-light"><Tag className="mr-2 h-4 w-4"/> Add Tags</Button>
                  <Button variant="outline" className="w-full justify-start font-light"><BarChartBig className="mr-2 h-4 w-4"/> View Analytics</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
