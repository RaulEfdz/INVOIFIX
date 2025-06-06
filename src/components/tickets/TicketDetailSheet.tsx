
"use client";

import * as React from "react";
import type { Ticket, TicketStatus, ChecklistItem } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TICKET_STATUSES, KANBAN_COLUMNS } from "@/lib/constants";
import { MessageSquare, Send, Tag, UserCircle, CalendarDays, BarChartBig, Info, Link as LinkIcon, Briefcase, ListChecks, Plus, Trash2, Edit3, GripVertical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface TicketDetailSheetProps {
  ticket: Ticket | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onTicketUpdate: (updatedTicket: Ticket) => void;
}

export function TicketDetailSheet({ ticket, isOpen, onOpenChange, onTicketUpdate }: TicketDetailSheetProps) {
  const { toast } = useToast();
  const [currentTicket, setCurrentTicket] = React.useState<Ticket | null>(ticket);
  const [newStatus, setNewStatus] = React.useState<TicketStatus | undefined>(ticket?.status);
  const [comment, setComment] = React.useState("");
  const [comments, setComments] = React.useState<Array<{ text: string; date: Date; author: string }>>([]);
  const [newChecklistItem, setNewChecklistItem] = React.useState("");

  React.useEffect(() => {
    if (ticket) {
      setCurrentTicket(ticket);
      setNewStatus(ticket.status);
      // In a real app, load existing comments and checklist for the ticket
      // For now, if the ticket object has a checklist, use it, otherwise initialize empty
      if (!ticket.checklist) {
        setCurrentTicket(prev => prev ? {...prev, checklist: []} : null);
      }
    }
  }, [ticket]);

  if (!currentTicket) {
    return null;
  }

  const handleStatusUpdate = () => {
    if (currentTicket && newStatus && newStatus !== currentTicket.status) {
      const updatedTicketData = { 
        ...currentTicket, 
        status: newStatus, 
        updatedAt: new Date().toISOString() 
      };
      setCurrentTicket(updatedTicketData);
      onTicketUpdate(updatedTicketData);
      toast({
        title: "Status Updated",
        description: `Ticket #${currentTicket.ticketNumber} status changed to ${newStatus}.`,
      });
    }
  };

  const handleAddComment = () => {
    if (comment.trim() === "") {
      toast({ title: "Comment cannot be empty", variant: "destructive" });
      return;
    }
    const newCommentEntry = { text: comment, date: new Date(), author: "Current User" }; // Replace "Current User"
    setComments([...comments, newCommentEntry]);
    setComment("");
    toast({
      title: "Comment Added",
      description: "Your comment has been added to the ticket.",
    });
    // In a real app, you'd also save this comment to the backend and associate it with `currentTicket.id`
  };
  
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("en-US", {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  const getPriorityBadgeVariant = (priority: "Low" | "Medium" | "High") => {
    if (priority === "High") return "destructive";
    if (priority === "Medium") return "secondary"; // Using secondary for medium
    return "default"; // For Low, "default" often has a primary color background
  };
  
  const getStatusColorClass = (status: TicketStatus) => {
    const column = KANBAN_COLUMNS.find(col => col.id === status);
    return column ? column.headerColorClass : 'bg-muted border-muted-foreground';
  };

  const handleAddChecklistItem = () => {
    if (newChecklistItem.trim() === "") return;
    const newItem: ChecklistItem = {
      id: `checklist-${Date.now()}`,
      text: newChecklistItem,
      completed: false,
    };
    const updatedChecklist = [...(currentTicket.checklist || []), newItem];
    const updatedTicketData = { ...currentTicket, checklist: updatedChecklist };
    setCurrentTicket(updatedTicketData);
    onTicketUpdate(updatedTicketData);
    setNewChecklistItem("");
  };

  const handleToggleChecklistItem = (itemId: string) => {
    const updatedChecklist = (currentTicket.checklist || []).map(item =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );
    const updatedTicketData = { ...currentTicket, checklist: updatedChecklist };
    setCurrentTicket(updatedTicketData);
    onTicketUpdate(updatedTicketData);
  };
  
  const handleRemoveChecklistItem = (itemId: string) => {
    const updatedChecklist = (currentTicket.checklist || []).filter(item => item.id !== itemId);
    const updatedTicketData = { ...currentTicket, checklist: updatedChecklist };
    setCurrentTicket(updatedTicketData);
    onTicketUpdate(updatedTicketData);
  };


  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-3xl w-full p-0 flex flex-col">
        <SheetHeader className="p-6 border-b">
          <div className="flex justify-between items-center">
            <SheetTitle className="text-2xl font-bold text-foreground">Ticket #{currentTicket.ticketNumber}</SheetTitle>
            <SheetClose />
          </div>
          <SheetDescription className="font-light text-muted-foreground">{currentTicket.title}</SheetDescription>
        </SheetHeader>

        <ScrollArea className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Ticket Details & Actions */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="shadow-lg rounded-xl">
                  <CardHeader className="border-b">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl font-bold text-foreground">{currentTicket.title}</CardTitle>
                        <CardDescription className="font-light text-muted-foreground">ID: {currentTicket.ticketNumber}</CardDescription>
                      </div>
                      <Badge 
                        variant={getPriorityBadgeVariant(currentTicket.priority)}
                        className={`text-sm px-3 py-1 ${currentTicket.priority === "Low" ? "bg-status-paid text-primary-foreground" : ""}`}
                      >
                        {currentTicket.priority} Priority
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h4 className="font-semibold text-md text-foreground mb-1">Description</h4>
                      <p className="font-light text-sm text-muted-foreground whitespace-pre-wrap">{currentTicket.description}</p>
                    </div>
                    
                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                      <div className="flex items-center">
                        <UserCircle className="h-4 w-4 mr-2 text-muted-foreground"/>
                        <span className="font-medium text-foreground mr-1">Submitted by:</span>
                        <span className="font-light text-muted-foreground">{currentTicket.submittedBy} ({currentTicket.role})</span>
                      </div>
                      <div className="flex items-center">
                        <UserCircle className="h-4 w-4 mr-2 text-muted-foreground"/>
                        <span className="font-medium text-foreground mr-1">Assigned to:</span>
                        <span className="font-light text-muted-foreground">{currentTicket.assignedTo || "Unassigned"}</span>
                      </div>
                      <div className="flex items-center">
                        <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground"/>
                        <span className="font-medium text-foreground mr-1">Created:</span>
                        <span className="font-light text-muted-foreground">{formatDate(currentTicket.createdAt)}</span>
                      </div>
                      <div className="flex items-center">
                        <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground"/>
                        <span className="font-medium text-foreground mr-1">Last Updated:</span>
                        <span className="font-light text-muted-foreground">{formatDate(currentTicket.updatedAt)}</span>
                      </div>
                      {currentTicket.clientId && (
                        <div className="flex items-center">
                          <Briefcase className="h-4 w-4 mr-2 text-muted-foreground"/>
                          <span className="font-medium text-foreground mr-1">Client:</span>
                          <a href={`/clients/${currentTicket.clientId}`} className="font-light text-primary hover:underline">{currentTicket.clientId}</a>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg rounded-xl">
                    <CardHeader>
                        <CardTitle className="font-bold text-xl flex items-center"><ListChecks className="mr-2 h-5 w-5"/>Checklist</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex gap-2">
                            <Input 
                                value={newChecklistItem}
                                onChange={(e) => setNewChecklistItem(e.target.value)}
                                placeholder="Add new task..."
                                className="font-light bg-card flex-grow"
                                onKeyDown={(e) => { if (e.key === 'Enter') handleAddChecklistItem();}}
                            />
                            <Button onClick={handleAddChecklistItem} size="icon" className="shrink-0"><Plus className="h-4 w-4"/></Button>
                        </div>
                        {(currentTicket.checklist && currentTicket.checklist.length > 0) ? (
                            <ul className="space-y-2 max-h-48 overflow-y-auto pr-1">
                                {currentTicket.checklist.map((item) => (
                                    <li key={item.id} className="flex items-center justify-between p-2 bg-secondary/30 rounded-md hover:bg-secondary/50 group">
                                      <div className="flex items-center gap-2">
                                        <Checkbox
                                            id={`checklist-${item.id}`}
                                            checked={item.completed}
                                            onCheckedChange={() => handleToggleChecklistItem(item.id)}
                                        />
                                        <Label htmlFor={`checklist-${item.id}`} className={cn("font-light text-sm cursor-pointer", item.completed && "line-through text-muted-foreground")}>
                                            {item.text}
                                        </Label>
                                      </div>
                                      <Button variant="ghost" size="icon" className="h-6 w-6 opacity-50 group-hover:opacity-100" onClick={() => handleRemoveChecklistItem(item.id)}>
                                          <Trash2 className="h-3.5 w-3.5 text-destructive"/>
                                      </Button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-muted-foreground font-light text-center py-2">No tasks in checklist.</p>
                        )}
                    </CardContent>
                </Card>
                
                <Card className="shadow-lg rounded-xl">
                    <CardHeader>
                        <CardTitle className="font-bold text-xl flex items-center"><Info className="mr-2 h-5 w-5"/>Related Tasks</CardTitle>
                        <CardDescription className="font-light">Tasks associated with this ticket.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {currentTicket.relatedTasks && currentTicket.relatedTasks.length > 0 ? (
                             <ul className="space-y-2">
                                {currentTicket.relatedTasks.map(task => (
                                    <li key={task.id} className="text-sm font-light text-muted-foreground p-2 bg-secondary/30 rounded-md hover:bg-secondary/50">
                                      <LinkIcon className="h-3 w-3 inline mr-1.5" /> {task.title} (Placeholder)
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-muted-foreground font-light text-center py-2">No related tasks found.</p>
                        )}
                    </CardContent>
                </Card>

              </div>

              {/* Right Column: Status & Actions */}
              <div className="lg:col-span-1 space-y-6">
                <Card className="shadow-lg rounded-xl sticky top-6">
                  <CardHeader className={cn("rounded-t-xl py-4", getStatusColorClass(currentTicket.status))}>
                    <CardTitle className="font-bold text-lg text-foreground">Ticket Status</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="text-center mb-2">
                      <Badge 
                        className={cn(
                            "text-base px-6 py-2 capitalize font-semibold border",
                            getStatusColorClass(currentTicket.status), 
                            (getStatusColorClass(currentTicket.status).includes('dark:bg-sky-800') || getStatusColorClass(currentTicket.status).includes('dark:bg-amber-800') || getStatusColorClass(currentTicket.status).includes('dark:bg-indigo-800')) ? 'text-white' : 
                            (getStatusColorClass(currentTicket.status).includes('bg-sky-100') || getStatusColorClass(currentTicket.status).includes('bg-amber-100') || getStatusColorClass(currentTicket.status).includes('bg-indigo-100')) ? 'text-sky-800 dark:text-sky-100' :
                            (getStatusColorClass(currentTicket.status).includes('bg-emerald-100')) ? 'text-emerald-800 dark:text-emerald-100' :
                            (getStatusColorClass(currentTicket.status).includes('bg-slate-200')) ? 'text-slate-800 dark:text-slate-100' :
                            'text-foreground'
                        )}
                        >
                        {currentTicket.status}
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
                    <Button onClick={handleStatusUpdate} className="w-full font-medium" disabled={newStatus === currentTicket.status}>
                      Update Status
                    </Button>
                  </CardContent>
                </Card>

                <Card className="shadow-lg rounded-xl sticky top-[calc(theme(spacing.6)_+_260px)]"> {/* Adjust top based on previous card height */}
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
            
            <Card className="shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="font-bold text-xl flex items-center"><MessageSquare className="mr-2 h-5 w-5"/>Comments & Solution</CardTitle>
                <CardDescription className="font-light">Add notes, updates, or the solution for this ticket.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {comments.length > 0 && (
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-2 border-b pb-3 mb-3">
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
        </ScrollArea>
        
        <SheetFooter className="p-6 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

