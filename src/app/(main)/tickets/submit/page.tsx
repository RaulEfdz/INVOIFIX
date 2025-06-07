"use client";

import { AppHeader } from "@/components/layout/AppHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Keep if needed for other labels not in Form
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { ArrowLeft, Send, Paperclip, UserSquare } from "lucide-react";
import { USER_ROLES, DUMMY_CLIENTS } from "@/lib/constants"; // Added DUMMY_CLIENTS
import type { Client } from "@/types"; // Added Client type
import { useToast } from "@/hooks/use-toast";

const ticketFormSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000),
  priority: z.enum(["Low", "Medium", "High"]),
  userRole: z.enum(["Administrator", "Billing", "Technician", "Client"]),
  clientId: z.string().optional(), // Added clientId
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
      userRole: "Client",
      clientId: "",
    },
  });

  function onSubmit(data: TicketFormValues) {
    console.log("Ticket submitted:", data);
    // Here you would typically send the data to your backend
    toast({
      title: "Ticket Submitted!",
      description: `Your support ticket "${data.title}" has been successfully submitted.`,
      variant: "default",
    });
    form.reset();
  }

  return (
    <>
      <AppHeader pageTitle="Enviar Ticket" />
      <main className="flex-1 p-6">
        <div className="mb-6">
          <Button variant="outline" asChild className="font-medium">
            <Link href="/tickets">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a Tickets
            </Link>
          </Button>
        </div>
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-headline font-semibold">
              Enviar un Nuevo Ticket
            </CardTitle>
            <CardDescription className="font-light">
              Describa su problema o solicitud a continuación. Nuestro equipo se
              pondrá en contacto con usted lo antes posible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Título</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="p.ej., No se puede iniciar sesión"
                          {...field}
                          className="font-light bg-card"
                        />
                      </FormControl>
                      <FormMessage className="font-light" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Descripción</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Proporcione tantos detalles como sea posible..."
                          rows={5}
                          {...field}
                          className="font-light bg-card"
                        />
                      </FormControl>
                      <FormMessage className="font-light" />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Prioridad</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="font-light bg-card">
                              <SelectValue placeholder="Seleccionar prioridad" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="font-light">
                            <SelectItem value="Low">Baja</SelectItem>
                            <SelectItem value="Medium">Media</SelectItem>
                            <SelectItem value="High">Alta</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="font-light" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="userRole"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">
                          Estoy informando como
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="font-light bg-card">
                              <SelectValue placeholder="Seleccione su rol" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="font-light">
                            {USER_ROLES.map((role) => (
                              <SelectItem key={role} value={role}>
                                {role}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="font-light" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="clientId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium flex items-center">
                        <UserSquare className="mr-2 h-4 w-4 text-muted-foreground" />{" "}
                        Cliente asociado (Opcional)
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="font-light bg-card">
                            <SelectValue placeholder="Seleccione un cliente si corresponde" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="font-light">
                          <SelectItem value="">Ninguno</SelectItem>
                          {DUMMY_CLIENTS.map((client: Client) => (
                            <SelectItem key={client.id} value={client.id}>
                              {client.firstName} {client.lastName}{" "}
                              {client.companyName
                                ? `(${client.companyName})`
                                : ""}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="font-light" />
                    </FormItem>
                  )}
                />

                <div>
                  <FormLabel className="font-medium flex items-center">
                    <Paperclip className="mr-2 h-4 w-4 text-muted-foreground" />{" "}
                    Adjuntar archivos (Opcional)
                  </FormLabel>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-input px-6 py-10 bg-card">
                    <div className="text-center">
                      <Paperclip className="mx-auto h-10 w-10 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground font-light">
                        Arrastre y suelte archivos aquí, o{" "}
                        <Button
                          variant="link"
                          type="button"
                          className="font-medium p-0 h-auto"
                        >
                          haga clic para buscar
                        </Button>
                      </p>
                      <p className="text-xs text-muted-foreground/80 font-light">
                        Tamaño máximo de archivo: 5MB. Tipos permitidos: JPG,
                        PNG, PDF, DOCX.
                      </p>
                      {/* Actual file input would be hidden and triggered by the button/drop */}
                      {/* <Input id="file-upload" name="file-upload" type="file" className="sr-only" /> */}
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full md:w-auto font-medium"
                  disabled={form.formState.isSubmitting}
                >
                  <Send className="mr-2 h-4 w-4" />
                  {form.formState.isSubmitting
                    ? "Enviando..."
                    : "Enviar Ticket"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
