"use client";

import { AppHeader } from "@/components/layout/AppHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { ArrowLeft, Send } from "lucide-react";
import { USER_ROLES } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";

const ticketFormSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100),
  description: z.string().min(10, "Description must be at least 10 characters").max(1000),
  priority: z.enum(["Low", "Medium", "High"]),
  userRole: z.enum(["Administrator", "Billing", "Technician", "Client"]), // Assuming UserRole type from types/index.ts
});

type TicketFormValues = z.infer<typeof ticketFormSchema>;

export default function SubmitTicketPage() {
  const { toast } = useToast();
  const form = useForm<TicketFormValues>({
    resolver: zodResolver(ticketFormSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "Medium",
      userRole: "Client", // Default role, could be dynamically set based on logged-in user
    },
  });

  function onSubmit(data: TicketFormValues) {
    console.log("Ticket submitted:", data);
    // Here you would typically send the data to your backend
    toast({
      title: "Ticket Submitted!",
      description: "Your support ticket has been successfully submitted.",
      variant: "default", // or use a custom success variant if defined
    });
    form.reset(); 
    // Potentially redirect or show a success message inline
  }

  return (
    <>
      <AppHeader pageTitle="Submit Ticket" />
      <main className="flex-1 p-6">
        <div className="mb-6">
          <Button variant="outline" asChild className="font-medium">
            <Link href="/tickets">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tickets
            </Link>
          </Button>
        </div>
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-headline font-semibold">Submit a New Ticket</CardTitle>
            <CardDescription className="font-light">
              Describe your issue or request below. Our team will get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Unable to login" {...field} className="font-light bg-card" />
                      </FormControl>
                      <FormMessage className="font-light"/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please provide as much detail as possible..."
                          rows={5}
                          {...field}
                          className="font-light bg-card"
                        />
                      </FormControl>
                      <FormMessage className="font-light"/>
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Priority</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="font-light bg-card">
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="font-light">
                            <SelectItem value="Low">Low</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="font-light"/>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="userRole"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">I am reporting as a</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="font-light bg-card">
                              <SelectValue placeholder="Select your role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="font-light">
                            {USER_ROLES.map(role => (
                              <SelectItem key={role} value={role}>{role}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="font-light"/>
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full md:w-auto font-medium" disabled={form.formState.isSubmitting}>
                  <Send className="mr-2 h-4 w-4" />
                  {form.formState.isSubmitting ? "Submitting..." : "Submit Ticket"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
