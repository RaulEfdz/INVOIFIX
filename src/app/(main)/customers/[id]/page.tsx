"use client";

import * as React from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Client, Invoice, ClientDocument, ClientProject } from "@/types"; // Corrected import
import { DUMMY_CLIENTS, DUMMY_INVOICES } from "@/lib/constants"; // Corrected import
import {
  ArrowLeft,
  Edit,
  FileText,
  Briefcase,
  DollarSign,
  Activity,
  FileArchive,
  UploadCloud,
  LinkIcon,
  MapPin,
  Phone,
  Globe,
  Info,
  Users,
  CalendarDays,
  Building,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { InvoiceStatusBadge } from "@/components/invoices/InvoiceStatusBadge";
import { Badge } from "@/components/ui/badge";

const DUMMY_DOCUMENTS: ClientDocument[] = [
  // Add some dummy documents if needed for specific clients
];
const DUMMY_PROJECTS: ClientProject[] = [
  // Add some dummy projects if needed for specific clients
];

export default function CustomerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const clientId = params.id as string;

  const [client, setClient] = React.useState<Client | null>(null);
  const [invoices, setInvoices] = React.useState<Invoice[]>([]);
  const [documents, setDocuments] = React.useState<ClientDocument[]>([]);
  const [projects, setProjects] = React.useState<ClientProject[]>([]);

  React.useEffect(() => {
    const foundClient = DUMMY_CLIENTS.find((c) => c.id === clientId);
    if (foundClient) {
      setClient(foundClient);
      const clientInvoices = DUMMY_INVOICES.filter(
        (inv) => inv.clientId === clientId
      );
      setInvoices(clientInvoices); // Set invoices for the client
      setDocuments(DUMMY_DOCUMENTS.filter((doc) => doc.clientId === clientId));
      setProjects(DUMMY_PROJECTS.filter((proj) => proj.clientId === clientId));
    } else {
      // Consider redirecting if client not found, e.g., router.push('/clients');
    }
  }, [clientId, router]);

  if (!client) {
    return (
      <>
        <AppHeader pageTitle="Client Details (Legacy Route)" />
        <main className="flex-1 p-6 text-center">
          <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
            <Users className="w-16 h-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Client Not Found</h2>
            <p className="font-light text-muted-foreground mb-6">
              The client you are looking for could not be found or does not
              exist.
            </p>
            <Button
              onClick={() => router.push("/clients")}
              variant="outline"
              className="font-medium"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Clients
            </Button>
          </div>
        </main>
      </>
    );
  }

  const getInitials = (firstName?: string, lastName?: string): string => {
    const first = firstName ? firstName.charAt(0) : "";
    const last = lastName ? lastName.charAt(0) : "";
    if (!first && !last && client.companyName)
      return client.companyName.substring(0, 2).toUpperCase();
    if (!first && !last) return "NN";
    return `${first}${last}`.toUpperCase();
  };

  const calculateClientAge = (createdAt: string) => {
    const createdDate = new Date(createdAt);
    const today = new Date();
    let years = today.getFullYear() - createdDate.getFullYear();
    let months = today.getMonth() - createdDate.getMonth();
    if (
      months < 0 ||
      (months === 0 && today.getDate() < createdDate.getDate())
    ) {
      years--;
      months = (months + 12) % 12;
    }
    if (years === 0 && months === 0) return "New Client";

    const parts = [];
    if (years > 0) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
    if (months > 0) parts.push(`${months} mo${months > 1 ? "s" : ""}`);
    return parts.join(" ");
  };

  const totalPaid = invoices
    .filter((inv) => inv.status === "Paid")
    .reduce((sum, inv) => sum + inv.amount, 0);
  const totalPendingFromInvoices = invoices
    .filter(
      (inv) =>
        inv.status === "Sent" ||
        inv.status === "Overdue" ||
        inv.status === "Draft"
    )
    .reduce((sum, inv) => sum + inv.amount, 0);

  const fullAddress =
    [
      client.address.street,
      client.address.city,
      client.address.state,
      client.address.postalCode,
      client.address.country,
    ]
      .filter(Boolean)
      .join(", ")
      .replace(/ , $|^, |,$/g, "") || "N/A";

  return (
    <>
      <AppHeader pageTitle={`${client.firstName} ${client.lastName}`} />
      <main className="flex-1 p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" asChild className="font-medium">
            <Link href="/clients">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Clients
            </Link>
          </Button>
          <Button
            variant="default"
            className="font-medium bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Edit className="mr-2 h-4 w-4" /> Edit Client
          </Button>
        </div>

        <Card className="shadow-lg overflow-hidden rounded-xl">
          <CardHeader className="bg-card p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6 border-b">
            <Avatar className="h-28 w-28 border-4 border-primary/10 shrink-0 shadow-md">
              <AvatarImage
                src={
                  client.avatarUrl ||
                  `https://placehold.co/120x120.png?text=${getInitials(
                    client.firstName,
                    client.lastName
                  )}`
                }
                alt={`${client.firstName} ${client.lastName}`}
                data-ai-hint="company logo person"
              />
              <AvatarFallback className="text-4xl bg-muted">
                {getInitials(client.firstName, client.lastName)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1.5">
                <CardTitle className="text-3xl font-bold text-foreground">
                  {client.firstName} {client.lastName}
                </CardTitle>
                <Badge
                  variant={
                    client.status === "Activo"
                      ? "default"
                      : client.status === "Con Deuda"
                      ? "destructive"
                      : "secondary"
                  }
                  className={`capitalize text-xs px-3 py-1 ${
                    client.status === "Activo"
                      ? "bg-status-paid text-primary-foreground"
                      : ""
                  }`}
                >
                  {client.status}
                </Badge>
              </div>
              {client.companyName && (
                <p className="text-base font-medium text-muted-foreground flex items-center gap-2">
                  <Image
                    src="/logo.png"
                    alt="InvoiFix Logo"
                    width={16}
                    height={16}
                    className="h-4 w-4"
                  />{" "}
                  {client.companyName}
                </p>
              )}
              <p className="text-sm text-primary font-light mt-1.5 flex items-center gap-2">
                <LinkIcon className="h-4 w-4" /> {client.email}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-right mt-4 sm:mt-0 w-full sm:w-auto">
              <Card className="p-3.5 rounded-lg bg-secondary/70 text-center sm:text-left shadow-sm">
                <p className="text-xs text-muted-foreground font-light mb-0.5 flex items-center gap-1.5 justify-center sm:justify-start">
                  <DollarSign className="h-3.5 w-3.5" />
                  Total Billed
                </p>
                <p className="font-semibold text-xl text-foreground">
                  ${client.totalBilled.toFixed(2)}
                </p>
              </Card>
              <Card className="p-3.5 rounded-lg bg-secondary/70 text-center sm:text-left shadow-sm">
                <p className="text-xs text-muted-foreground font-light mb-0.5 flex items-center gap-1.5 justify-center sm:justify-start">
                  <DollarSign className="h-3.5 w-3.5 text-destructive" />
                  Pending
                </p>
                <p className="font-semibold text-xl text-destructive">
                  ${client.pendingBalance.toFixed(2)}
                </p>
              </Card>
              <Card className="p-3.5 rounded-lg bg-secondary/70 text-center sm:text-left shadow-sm">
                <p className="text-xs text-muted-foreground font-light mb-0.5 flex items-center gap-1.5 justify-center sm:justify-start">
                  <CalendarDays className="h-3.5 w-3.5" />
                  Client Since
                </p>
                <p className="font-semibold text-xl text-foreground">
                  {calculateClientAge(client.createdAt)}
                </p>
              </Card>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
            <TabsTrigger value="summary" className="font-medium">
              <Activity className="mr-2 h-4 w-4" />
              Summary
            </TabsTrigger>
            <TabsTrigger value="invoices" className="font-medium">
              <FileText className="mr-2 h-4 w-4" />
              Invoices & Payments
            </TabsTrigger>
            <TabsTrigger value="documents" className="font-medium">
              <FileArchive className="mr-2 h-4 w-4" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="projects" className="font-medium">
              <Briefcase className="mr-2 h-4 w-4" />
              Projects/Services
            </TabsTrigger>
          </TabsList>

          <TabsContent value="summary">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card className="shadow-lg rounded-xl">
                  <CardHeader>
                    <CardTitle className="font-bold text-xl">
                      Client Summary
                    </CardTitle>
                    <CardDescription className="font-light">
                      Overview of client information and AI insights.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-md text-foreground border-b pb-2 mb-3">
                          Contact Information
                        </h4>
                        <p className="font-light text-sm flex items-start gap-2">
                          <LinkIcon className="h-4 w-4 text-muted-foreground mt-0.5" />{" "}
                          <div>
                            <strong>Email:</strong> {client.email}
                          </div>
                        </p>
                        <p className="font-light text-sm flex items-start gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />{" "}
                          <div>
                            <strong>Phone:</strong> {client.phone || "N/A"}
                          </div>
                        </p>
                        {client.website && (
                          <p className="font-light text-sm flex items-start gap-2">
                            <Globe className="h-4 w-4 text-muted-foreground mt-0.5" />{" "}
                            <div>
                              <strong>Website:</strong>{" "}
                              <a
                                href={client.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline"
                              >
                                {client.website}
                              </a>
                            </div>
                          </p>
                        )}
                        <p className="font-light text-sm flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />{" "}
                          <div>
                            <strong>Address:</strong> {fullAddress}
                          </div>
                        </p>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-semibold text-md text-foreground border-b pb-2 mb-3">
                          Fiscal Information
                        </h4>
                        {client.companyName && (
                          <p className="font-light text-sm flex items-start gap-2">
                            <Building className="h-4 w-4 text-muted-foreground mt-0.5" />{" "}
                            <div>
                              <strong>Company:</strong> {client.companyName}
                            </div>
                          </p>
                        )}
                        <p className="font-light text-sm flex items-start gap-2">
                          <Info className="h-4 w-4 text-muted-foreground mt-0.5" />{" "}
                          <div>
                            <strong>Tax ID:</strong> {client.taxId || "N/A"}
                          </div>
                        </p>
                        <p className="font-light text-sm flex items-start gap-2">
                          <Briefcase className="h-4 w-4 text-muted-foreground mt-0.5" />{" "}
                          <div>
                            <strong>Type:</strong> {client.clientType} -{" "}
                            {client.commercialInfo?.businessType || "N/A"}
                          </div>
                        </p>
                        <p className="font-light text-sm flex items-start gap-2">
                          <Info className="h-4 w-4 text-muted-foreground mt-0.5" />{" "}
                          <div>
                            <strong>Origin:</strong>{" "}
                            {client.commercialInfo?.origin || "N/A"}
                          </div>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="shadow-lg rounded-xl">
                  <CardHeader>
                    <CardTitle className="font-bold text-xl">
                      AI Analysis & Notes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-secondary/50 rounded-lg space-y-3 border border-dashed">
                      <p className="font-light text-sm text-muted-foreground italic">
                        {client.aiProfileSummary ||
                          "AI analysis not yet performed. Click 'Edit Client' to generate."}
                      </p>
                      {client.aiOpportunities && (
                        <div className="p-3 bg-primary/10 rounded-md border border-primary/30">
                          <p className="font-medium text-sm text-primary mb-1">
                            Opportunities:
                          </p>
                          <p className="font-light text-sm text-muted-foreground italic">
                            {client.aiOpportunities}
                          </p>
                        </div>
                      )}
                    </div>
                    {client.commercialInfo?.internalNotes && (
                      <div className="space-y-2">
                        <h4 className="font-semibold text-md text-foreground">
                          Internal Notes
                        </h4>
                        <div className="p-3 bg-accent/10 rounded-md border border-accent/30">
                          <p className="font-light text-sm text-muted-foreground italic whitespace-pre-line">
                            {client.commercialInfo.internalNotes}
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              <div className="lg:col-span-1 space-y-6">
                <Card className="shadow-lg rounded-xl">
                  <CardHeader>
                    <CardTitle className="font-bold text-lg">
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm font-light max-h-96 overflow-y-auto">
                      <li className="border-b pb-2 pt-1 flex items-start gap-2">
                        <FileText className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <div>
                          Invoice #INV001 sent{" "}
                          <span className="text-xs text-muted-foreground block">
                            3 days ago
                          </span>
                        </div>
                      </li>
                      <li className="border-b pb-2 pt-1 flex items-start gap-2">
                        <DollarSign className="h-4 w-4 text-status-paid mt-0.5 shrink-0" />
                        <div>
                          Payment received for Invoice #INV000{" "}
                          <span className="text-xs text-muted-foreground block">
                            1 week ago
                          </span>
                        </div>
                      </li>
                      <li className="border-b pb-2 pt-1 flex items-start gap-2">
                        <Edit className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                        <div>
                          Client details updated{" "}
                          <span className="text-xs text-muted-foreground block">
                            2 weeks ago
                          </span>
                        </div>
                      </li>
                      <li className="pt-1 flex items-start gap-2">
                        <Users className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <div>
                          Client account created{" "}
                          <span className="text-xs text-muted-foreground block">
                            {new Date(client.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="invoices">
            <Card className="shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="font-bold text-xl">
                  Invoices & Payments
                </CardTitle>
                <CardDescription className="font-light">
                  History of invoices and payment status for {client.firstName}{" "}
                  {client.lastName}.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {invoices.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-border">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Number
                          </th>
                          <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Issued
                          </th>
                          <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Due
                          </th>
                          <th className="px-4 py-2.5 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-4 py-2.5 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-4 py-2.5 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-card divide-y divide-border">
                        {invoices.map((inv) => (
                          <tr
                            key={inv.id}
                            className="font-light hover:bg-secondary/30 transition-colors"
                          >
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-primary hover:underline">
                              <Link href={`/invoices/${inv.id}`}>
                                {inv.invoiceNumber}
                              </Link>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">
                              {new Date(inv.issuedDate).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">
                              {new Date(inv.dueDate).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-medium text-foreground">
                              ${inv.amount.toFixed(2)}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                              <InvoiceStatusBadge status={inv.status} />
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="font-light text-xs h-auto py-1 px-2"
                              >
                                Download
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-muted-foreground font-light text-center py-8">
                    No invoices found for this client.
                  </p>
                )}

                {invoices.length > 0 && (
                  <div className="mt-6 pt-4 border-t">
                    <h4 className="font-semibold text-md text-foreground mb-3">
                      Financial Summary
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Card className="p-4 bg-secondary/50 rounded-lg shadow-sm">
                        <p className="text-xs text-muted-foreground mb-1">
                          Total Paid
                        </p>
                        <p className="font-bold text-xl text-status-paid">
                          ${totalPaid.toFixed(2)}
                        </p>
                      </Card>
                      <Card className="p-4 bg-secondary/50 rounded-lg shadow-sm">
                        <p className="text-xs text-muted-foreground mb-1">
                          Total Pending / Overdue
                        </p>
                        <p className="font-bold text-xl text-status-overdue">
                          ${totalPendingFromInvoices.toFixed(2)}
                        </p>
                      </Card>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card className="shadow-lg rounded-xl">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <div>
                  <CardTitle className="font-bold text-xl">Documents</CardTitle>
                  <CardDescription className="font-light">
                    Contracts, proposals, and other files for {client.firstName}
                    .
                  </CardDescription>
                </div>
                <Button className="font-medium bg-primary text-primary-foreground hover:bg-primary/90">
                  <UploadCloud className="mr-2 h-4 w-4" /> Upload Document
                </Button>
              </CardHeader>
              <CardContent>
                {documents.length > 0 ? (
                  <ul className="divide-y divide-border">
                    {documents.map((doc) => (
                      <li
                        key={doc.id}
                        className="font-light py-3 flex justify-between items-center"
                      >
                        <span>
                          {doc.fileName}{" "}
                          <Badge variant="outline" className="ml-2 font-normal">
                            {doc.fileType}
                          </Badge>
                        </span>{" "}
                        <Button variant="ghost" size="sm">
                          Download
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground font-light text-center py-8">
                    No documents uploaded for this client.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card className="shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="font-bold text-xl">
                  Projects & Services
                </CardTitle>
                <CardDescription className="font-light">
                  Active and past projects associated with {client.firstName}.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {projects.length > 0 ? (
                  <ul className="divide-y divide-border">
                    {projects.map((proj) => (
                      <li
                        key={proj.id}
                        className="font-light py-3 flex justify-between items-center"
                      >
                        <span>{proj.projectName}</span>{" "}
                        <Badge
                          variant={
                            proj.status === "Active" ? "default" : "secondary"
                          }
                        >
                          {proj.status}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground font-light text-center py-8">
                    No projects or services associated with this client.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
