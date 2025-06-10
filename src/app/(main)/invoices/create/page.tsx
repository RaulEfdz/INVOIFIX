"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { AppHeader } from "@/components/layout/AppHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Info,
  FileText,
  Mail,
  CreditCard,
  ChevronDown,
  Save,
  PencilLine,
  Building,
} from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const invoiceFormSchema = z.object({
  myCompanyName: z.string().optional(),
  myEmail: z.string().email().optional(),
  myAddress: z.string().optional(),
  clientName: z.string().min(1, "Client name is required"),
  clientEmail: z.string().email("Invalid email address"),
  clientAddress: z.string().optional(),
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  issueDate: z.string().min(1, "Issue date is required"),
  dueDate: z.string().min(1, "Due date is required"),
  projectName: z.string().optional(),
  paymentTerms: z.string().optional(),
  notes: z.string().optional(),
  signatureName: z.string().optional(),
  emailTo: z.string().email().optional(),
  emailSubject: z.string().optional(),
  emailBody: z.string().optional(),
  items: z
    .array(
      z.object({
        description: z.string().min(1, "Item description is required"),
        units: z.coerce.number().min(1, "Units must be at least 1"),
        price: z.coerce.number().min(0, "Price cannot be negative"),
        gst: z.coerce.number().min(0).optional().default(0),
      })
    )
    .min(1, "At least one item is required"),
});

type InvoiceFormValues = z.infer<typeof invoiceFormSchema>;

const defaultValues: Partial<InvoiceFormValues> = {
  myCompanyName: "RAUL FERNANDEZ",
  myEmail: "633116918",
  myAddress:
    "Av. Justo Arosemena 41, Panamá, Provincia de Panamá\n(507) 63116918",
  clientName: "Tony Stark",
  clientEmail: "tonystark@gmail.com",
  clientAddress:
    "Mirabazar, Sylhet, Bangladesh\n(209) 234-22435\ntonystark.com",
  invoiceNumber: "#12346",
  issueDate: "15 de febrero de 2025",
  dueDate: "20 de febrero de 2025",
  projectName: "Diseño de Producto Fillo",
  paymentTerms:
    "Transferencia bancaria\nNombre de la cuenta: RAUL FERNANDEZ\nCódigo: 123456\nNúmero de cuenta: 99118834344545123",
  notes:
    "Se aplicará un recargo por pago tardío del 10% anual calculado diariamente para pagos realizados después de la fecha de vencimiento.",
  signatureName: "RAUL FERNANDEZ",
  items: [
    { description: "Diseño Web y App", units: 1, price: 2500, gst: 0 },
    { description: "Otro servicio", units: 1, price: 500, gst: 0 },
  ],
};

export default function CreateInvoicePage() {
  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues,
  });

  const watchedValues = form.watch();

  const calculateTotalAmount = () => {
    return (
      watchedValues.items?.reduce((acc, item) => {
        const itemTotal = item.units * item.price;
        const itemGst = (itemTotal * (item.gst || 0)) / 100;
        return acc + itemTotal + itemGst;
      }, 0) || 0
    );
  };

  const onSubmit = (data: InvoiceFormValues) => {
    console.log("Invoice data:", data);
    // Handle actual submission here
  };

  const handleDownloadPdf = async () => {
    const input = document.getElementById("invoice-preview-area");
    if (input) {
      await new Promise((resolve) => setTimeout(resolve, 200)); // Ensure content is rendered

      html2canvas(input, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "p",
          unit: "px",
          format: [canvas.width, canvas.height],
        });
        pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
        const invoiceNumber = watchedValues.invoiceNumber || "invoice";
        pdf.save(`${invoiceNumber.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`);
      });
    } else {
      console.error("Invoice preview area not found for PDF generation.");
      // Optionally, show a toast notification to the user
    }
  };

  return (
    <>
      <AppHeader pageTitle="Crear Factura" />
      <main className="flex-1 p-4 md:p-6 space-y-6">
        <div className="mb-6">
          <Button variant="outline" asChild className="font-medium">
            <Link href="/invoices">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a Facturas
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Form */}
          <Card className="lg:col-span-4 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-headline font-semibold">
                Crear Nueva Factura
              </CardTitle>
              <CardDescription className="font-light">
                Rellene los detalles de la factura
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert variant="default" className="mb-6 bg-secondary/50">
                <Info className="h-4 w-4" />
                <AlertDescription className="font-light">
                  Puede guardar la factura sin terminar como borrador y
                  completarla más tarde.
                </AlertDescription>
              </Alert>

              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div>
                  <Label htmlFor="projectName" className="font-light text-xs">
                    Nombre del Proyecto / Servicio
                  </Label>
                  <Input
                    id="projectName"
                    {...form.register("projectName")}
                    className="font-light bg-card mt-1"
                  />
                </div>
                <Accordion
                  type="multiple"
                  defaultValue={["item-1", "item-2"]}
                  className="w-full"
                >
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="font-medium">
                      Mis Detalles
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 pt-3">
                      <div>
                        <Label
                          htmlFor="myCompanyName"
                          className="font-light text-xs"
                        >
                          Nombre de la Empresa
                        </Label>
                        <Input
                          id="myCompanyName"
                          {...form.register("myCompanyName")}
                          className="font-light bg-card mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="myEmail" className="font-light text-xs">
                          Correo Electrónico
                        </Label>
                        <Input
                          id="myEmail"
                          {...form.register("myEmail")}
                          className="font-light bg-card mt-1"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="myAddress"
                          className="font-light text-xs"
                        >
                          Dirección / Contacto
                        </Label>
                        <Textarea
                          id="myAddress"
                          {...form.register("myAddress")}
                          rows={3}
                          className="font-light bg-card mt-1"
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger className="font-medium">
                      Detalles del Cliente
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 pt-3">
                      <div>
                        <Label
                          htmlFor="clientName"
                          className="font-light text-xs"
                        >
                          Nombre del Cliente
                        </Label>
                        <Input
                          id="clientName"
                          {...form.register("clientName")}
                          className="font-light bg-card mt-1"
                        />
                        {form.formState.errors.clientName && (
                          <p className="text-destructive text-xs mt-1 font-light">
                            {form.formState.errors.clientName.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label
                          htmlFor="clientEmail"
                          className="font-light text-xs"
                        >
                          Correo Electrónico del Cliente
                        </Label>
                        <Input
                          id="clientEmail"
                          {...form.register("clientEmail")}
                          className="font-light bg-card mt-1"
                        />
                        {form.formState.errors.clientEmail && (
                          <p className="text-destructive text-xs mt-1 font-light">
                            {form.formState.errors.clientEmail.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label
                          htmlFor="clientAddress"
                          className="font-light text-xs"
                        >
                          Dirección / Contacto del Cliente
                        </Label>
                        <Textarea
                          id="clientAddress"
                          {...form.register("clientAddress")}
                          rows={3}
                          className="font-light bg-card mt-1"
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger className="font-medium">
                      Detalles de la Factura
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 pt-3">
                      <div>
                        <Label
                          htmlFor="invoiceNumber"
                          className="font-light text-xs"
                        >
                          Número de Factura
                        </Label>
                        <Input
                          id="invoiceNumber"
                          {...form.register("invoiceNumber")}
                          className="font-light bg-card mt-1"
                        />
                        {form.formState.errors.invoiceNumber && (
                          <p className="text-destructive text-xs mt-1 font-light">
                            {form.formState.errors.invoiceNumber.message}
                          </p>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label
                            htmlFor="issueDate"
                            className="font-light text-xs"
                          >
                            Fecha de Emisión
                          </Label>
                          <Input
                            id="issueDate"
                            type="text"
                            placeholder="e.g. Feb 15, 2025"
                            {...form.register("issueDate")}
                            className="font-light bg-card mt-1"
                          />
                          {form.formState.errors.issueDate && (
                            <p className="text-destructive text-xs mt-1 font-light">
                              {form.formState.errors.issueDate.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label
                            htmlFor="dueDate"
                            className="font-light text-xs"
                          >
                            Fecha de Vencimiento
                          </Label>
                          <Input
                            id="dueDate"
                            type="text"
                            placeholder="e.g. Feb 20, 2025"
                            {...form.register("dueDate")}
                            className="font-light bg-card mt-1"
                          />
                          {form.formState.errors.dueDate && (
                            <p className="text-destructive text-xs mt-1 font-light">
                              {form.formState.errors.dueDate.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-items">
                    <AccordionTrigger className="font-medium">
                      Artículos
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 pt-3">
                      {form.watch("items")?.map((item, index) => (
                        <Card key={index} className="p-3 bg-muted/30">
                          <div className="space-y-2">
                            <div>
                              <Label
                                htmlFor={`items.${index}.description`}
                                className="font-light text-xs"
                              >
                                Descripción
                              </Label>
                              <Input
                                id={`items.${index}.description`}
                                {...form.register(`items.${index}.description`)}
                                className="font-light bg-card mt-1"
                              />
                              {form.formState.errors.items?.[index]
                                ?.description && (
                                <p className="text-destructive text-xs mt-1 font-light">
                                  {
                                    form.formState.errors.items?.[index]
                                      ?.description?.message
                                  }
                                </p>
                              )}
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              <div>
                                <Label
                                  htmlFor={`items.${index}.units`}
                                  className="font-light text-xs"
                                >
                                  Unidades
                                </Label>
                                <Input
                                  type="number"
                                  id={`items.${index}.units`}
                                  {...form.register(`items.${index}.units`)}
                                  className="font-light bg-card mt-1"
                                />
                              </div>
                              <div>
                                <Label
                                  htmlFor={`items.${index}.price`}
                                  className="font-light text-xs"
                                >
                                  Precio
                                </Label>
                                <Input
                                  type="number"
                                  id={`items.${index}.price`}
                                  {...form.register(`items.${index}.price`)}
                                  className="font-light bg-card mt-1"
                                />
                              </div>
                              <div>
                                <Label
                                  htmlFor={`items.${index}.gst`}
                                  className="font-light text-xs"
                                >
                                  IVA (%)
                                </Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  id={`items.${index}.gst`}
                                  {...form.register(`items.${index}.gst`)}
                                  className="font-light bg-card mt-1"
                                />
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="font-light text-xs"
                              onClick={() => {
                                const currentItems = form.getValues("items");
                                form.setValue(
                                  "items",
                                  currentItems.filter((_, i) => i !== index)
                                );
                              }}
                            >
                              Eliminar Artículo
                            </Button>
                          </div>
                        </Card>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="font-medium text-xs"
                        onClick={() => {
                          const currentItems = form.getValues("items") || [];
                          form.setValue("items", [
                            ...currentItems,
                            {
                              description: "Descripción del Artículo",
                              units: 1,
                              price: 0,
                              gst: 0,
                            },
                          ]);
                        }}
                      >
                        Añadir Artículo
                      </Button>
                      {form.formState.errors.items &&
                        typeof form.formState.errors.items === "object" &&
                        !Array.isArray(form.formState.errors.items) && (
                          <p className="text-destructive text-xs mt-1 font-light">
                            {form.formState.errors.items.message}
                          </p>
                        )}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger className="font-medium">
                      Detalles de Pago
                    </AccordionTrigger>
                    <AccordionContent className="pt-3">
                      <Label
                        htmlFor="paymentTerms"
                        className="font-light text-xs"
                      >
                        Método / Términos de Pago
                      </Label>
                      <Textarea
                        id="paymentTerms"
                        {...form.register("paymentTerms")}
                        rows={4}
                        placeholder="e.g. Bank Transfer Details, PayPal email"
                        className="font-light bg-card mt-1"
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger className="font-medium">
                      Añadir Notas
                    </AccordionTrigger>
                    <AccordionContent className="pt-3">
                      <Label htmlFor="notes" className="font-light text-xs">
                        Notas Adicionales
                      </Label>
                      <Textarea
                        id="notes"
                        {...form.register("notes")}
                        rows={3}
                        placeholder="e.g. Late fee policy, thank you note"
                        className="font-light bg-card mt-1"
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-6">
                    <AccordionTrigger className="font-medium">
                      Añadir Firma
                    </AccordionTrigger>
                    <AccordionContent className="pt-3 space-y-3">
                      <Label
                        htmlFor="signatureName"
                        className="font-light text-xs"
                      >
                        Nombre del Firmante (aparece debajo de la firma)
                      </Label>
                      <Input
                        id="signatureName"
                        {...form.register("signatureName")}
                        placeholder="Su Nombre"
                        className="font-light bg-card"
                      />
                      <div className="p-4 border border-dashed rounded-md text-center bg-muted/30">
                        <PencilLine className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-xs text-muted-foreground font-light">
                          Funcionalidad de imagen/subida de firma próximamente.
                        </p>
                        <Image
                          src="https://placehold.co/150x50.png?text=Signature"
                          alt="Signature placeholder"
                          width={150}
                          height={50}
                          className="mt-2 mx-auto opacity-50"
                          data-ai-hint="signature drawing"
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-7">
                    <AccordionTrigger className="font-medium">
                      Detalles de Correo (Opcional)
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 pt-3">
                      <div>
                        <Label htmlFor="emailTo" className="font-light text-xs">
                          Correo del Destinatario
                        </Label>
                        <Input
                          id="emailTo"
                          type="email"
                          {...form.register("emailTo")}
                          className="font-light bg-card mt-1"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="emailSubject"
                          className="font-light text-xs"
                        >
                          Asunto
                        </Label>
                        <Input
                          id="emailSubject"
                          {...form.register("emailSubject")}
                          className="font-light bg-card mt-1"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="emailBody"
                          className="font-light text-xs"
                        >
                          Mensaje
                        </Label>
                        <Textarea
                          id="emailBody"
                          {...form.register("emailBody")}
                          rows={5}
                          className="font-light bg-card mt-1"
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Button type="submit" className="w-full font-medium mt-6">
                  <Save className="mr-2 h-4 w-4" /> Guardar Factura
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Right Column: Preview */}
          <div className="lg:col-span-8 space-y-4 sticky top-20">
            {" "}
            {/* Sticky for desktop preview */}
            <Card className="shadow-lg">
              <CardHeader className="flex-row items-center justify-between space-y-0 pb-3 border-b">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg font-medium">
                    Vista Previa
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="font-light text-xs h-auto py-1 px-2"
                    onClick={handleDownloadPdf}
                  >
                    <FileText className="mr-1 h-3 w-3" />
                    PDF
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="font-light text-xs h-auto py-1 px-2"
                  >
                    <Mail className="mr-1 h-3 w-3" />
                    Correo
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="font-light text-xs h-auto py-1 px-2"
                  >
                    <CreditCard className="mr-1 h-3 w-3" />
                    Pago Online
                  </Button>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="default"
                      size="sm"
                      className="font-medium text-xs h-auto py-1.5 px-3"
                    >
                      Guardar Factura <ChevronDown className="ml-2 h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="font-light">
                    <DropdownMenuItem>Guardar como Borrador</DropdownMenuItem>
                    <DropdownMenuItem>Guardar y Enviar</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="p-0">
                <div className="bg-secondary/20 p-4 md:p-6 max-h-[calc(100vh-12rem)] overflow-y-auto">
                  <Card
                    id="invoice-preview-area"
                    className="p-6 md:p-8 shadow-xl bg-card mx-auto max-w-2xl"
                  >
                    {/* Invoice Header */}
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-3xl font-bold text-primary mb-1">
                          FACTURA
                        </h2>
                        <p className="text-muted-foreground font-light">
                          {watchedValues.invoiceNumber || "#12346"}
                        </p>
                      </div>
                      {/* <div className="text-right">
                        <Building className="h-8 w-8 text-primary inline-block mb-1" />
                        <p className="text-2xl font-bold text-foreground">
                          InvoiFix
                        </p>
                      </div> */}
                    </div>

                    {/* Project and Dates */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                      <div>
                        <p className="text-xs text-muted-foreground font-light uppercase tracking-wider">
                          Proyecto
                        </p>
                        <p className="font-medium">
                          {watchedValues.projectName || "Fillo Product Design"}
                        </p>
                      </div>
                      <div className="sm:text-center">
                        <p className="text-xs text-muted-foreground font-light uppercase tracking-wider">
                          Fecha de Emisión
                        </p>
                        <p className="font-medium">
                          {watchedValues.issueDate || "Feb 15, 2025"}
                        </p>
                      </div>
                      <div className="sm:text-right">
                        <p className="text-xs text-muted-foreground font-light uppercase tracking-wider">
                          Fecha de Vencimiento
                        </p>
                        <p className="font-medium">
                          {watchedValues.dueDate || "Feb 20, 2025"}
                        </p>
                      </div>
                    </div>

                    <Separator className="mb-6" />

                    {/* From and To */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-8">
                      <div>
                        <p className="text-xs text-muted-foreground font-light uppercase tracking-wider mb-1">
                          De
                        </p>
                        <p className="font-semibold">
                          {watchedValues.myCompanyName || "Washim Chowdhury"}
                        </p>
                        <p className="text-sm text-muted-foreground font-light whitespace-pre-line">
                          {watchedValues.myAddress ||
                            "Zindabazar, Sylhet, Bangladesh\nABN 12345\nwashim@gmail.com\n+88 01725 214 992"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground font-light uppercase tracking-wider mb-1">
                          Para
                        </p>
                        <p className="font-semibold">
                          {watchedValues.clientName || "Tony Stark"}
                        </p>
                        <p className="text-sm text-muted-foreground font-light whitespace-pre-line">
                          {watchedValues.clientEmail}\n
                          {watchedValues.clientAddress ||
                            "Mirabazar, Sylhet, Bangladesh\n(209) 234-22435\ntonystark.com"}
                        </p>
                      </div>
                    </div>

                    {/* Items Table */}
                    <Table className="mb-6">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-semibold">
                            Descripción
                          </TableHead>
                          <TableHead className="text-center font-semibold">
                            Unidades
                          </TableHead>
                          <TableHead className="text-right font-semibold">
                            Precio
                          </TableHead>
                          <TableHead className="text-right font-semibold">
                            IVA
                          </TableHead>
                          <TableHead className="text-right font-semibold">
                            Importe
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {watchedValues.items?.map((item, index) => {
                          const itemTotal =
                            (item.units || 0) * (item.price || 0);
                          const itemGstAmount =
                            (itemTotal * (item.gst || 0)) / 100;
                          const lineTotal = itemTotal + itemGstAmount;
                          return (
                            <TableRow key={index}>
                              <TableCell className="font-light">
                                {item.description || "Item Description"}
                              </TableCell>
                              <TableCell className="text-center font-light">
                                {item.units || 1}
                              </TableCell>
                              <TableCell className="text-right font-light">
                                ${(item.price || 0).toFixed(2)}
                              </TableCell>
                              <TableCell className="text-right font-light">
                                ${itemGstAmount.toFixed(2)} ({item.gst || 0}%)
                              </TableCell>
                              <TableCell className="text-right font-medium">
                                ${lineTotal.toFixed(2)}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                        {!watchedValues.items?.length && (
                          <TableRow>
                            <TableCell
                              colSpan={5}
                              className="text-center text-muted-foreground font-light py-4"
                            >
                              No se han añadido artículos aún.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>

                    {/* Total Amount */}
                    <div className="flex justify-end mb-6">
                      <div className="w-full sm:w-1/2 md:w-1/3">
                        <div className="flex justify-between py-2 border-b">
                          <span className="font-light">Subtotal</span>
                          <span className="font-medium">
                            ${calculateTotalAmount().toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between py-2 text-lg">
                          <span className="font-semibold">Importe Total</span>
                          <span className="font-bold text-primary">
                            ${calculateTotalAmount().toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Notes */}
                    {watchedValues.notes && (
                      <div className="mb-6 p-3 bg-secondary/30 rounded-md">
                        <p className="text-xs font-semibold uppercase text-muted-foreground mb-1">
                          Notas
                        </p>
                        <p className="text-xs text-muted-foreground font-light whitespace-pre-line">
                          {watchedValues.notes}
                        </p>
                      </div>
                    )}

                    {/* Payment Method */}
                    {watchedValues.paymentTerms && (
                      <div className="mb-6">
                        <p className="text-xs font-semibold uppercase text-muted-foreground mb-1">
                          Método de Pago
                        </p>
                        <p className="text-xs text-muted-foreground font-light whitespace-pre-line">
                          {watchedValues.paymentTerms}
                        </p>
                      </div>
                    )}

                    {/* Signature */}
                    <div className="flex flex-col sm:flex-row justify-between items-end mt-10 pt-6 border-t">
                      <div>
                        {watchedValues.signatureName && (
                          <>
                            <Image
                              src="https://placehold.co/120x40.png?text=Signature"
                              alt="Signature"
                              width={120}
                              height={40}
                              className="mb-1 opacity-75"
                              data-ai-hint="signature drawing"
                            />
                            <p className="text-sm font-medium">
                              {watchedValues.signatureName}
                            </p>
                          </>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground font-light mt-2 sm:mt-0">
                        Nota: El IVA será pagado por mí,{" "}
                        {watchedValues.clientName || "Tony Stark"}.
                      </p>
                    </div>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
