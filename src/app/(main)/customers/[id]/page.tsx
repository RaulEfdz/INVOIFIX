
"use client";

import * as React from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Customer, Invoice, CustomerDocument, CustomerProject } from "@/types";
import { DUMMY_CUSTOMERS, DUMMY_INVOICES } from "@/lib/constants"; // Assuming DUMMY_INVOICES is in constants
import { ArrowLeft, Edit, FileText, Briefcase, DollarSign, Activity, FileArchive } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Placeholder for DUMMY_INVOICES if not already in constants.ts
// import { DUMMY_INVOICES } from "@/app/(main)/invoices/page"; // Or wherever it's defined

const DUMMY_DOCUMENTS: CustomerDocument[] = [
    // Add some dummy documents if needed
];
const DUMMY_PROJECTS: CustomerProject[] = [
    // Add some dummy projects if needed
];


export default function CustomerDetailPage() {
  const params = useParams();
  const customerId = params.id as string;
  
  const [customer, setCustomer] = React.useState<Customer | null>(null);
  const [invoices, setInvoices] = React.useState<Invoice[]>([]);
  const [documents, setDocuments] = React.useState<CustomerDocument[]>([]);
  const [projects, setProjects] = React.useState<CustomerProject[]>([]);

  React.useEffect(() => {
    // In a real app, fetch customer data by ID
    const foundCustomer = DUMMY_CUSTOMERS.find(c => c.id === customerId);
    if (foundCustomer) {
      setCustomer(foundCustomer);
      // Filter dummy invoices for this customer (assuming customerId is added to Invoice type)
      // const customerInvoices = DUMMY_INVOICES.filter(inv => inv.customerId === customerId);
      // setInvoices(customerInvoices);

      // For now, let's show all invoices as a placeholder if customerId is not on DUMMY_INVOICES
      setInvoices(DUMMY_INVOICES.slice(0,3)); // Example: show first 3 invoices

      setDocuments(DUMMY_DOCUMENTS.filter(doc => doc.customerId === customerId));
      setProjects(DUMMY_PROJECTS.filter(proj => proj.customerId === customerId));
    }
  }, [customerId]);

  if (!customer) {
    return (
      <>
        <AppHeader pageTitle="Customer Not Found" />
        <main className="flex-1 p-6 text-center">
          <p className="font-light">The customer you are looking for could not be found.</p>
          <Button asChild variant="link" className="mt-4">
            <Link href="/customers">Back to Customers</Link>
          </Button>
        </main>
      </>
    );
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };
  
  const calculateCustomerAge = (createdAt: string) => {
    const createdDate = new Date(createdAt);
    const today = new Date();
    let years = today.getFullYear() - createdDate.getFullYear();
    let months = today.getMonth() - createdDate.getMonth();
    if (months < 0 || (months === 0 && today.getDate() < createdDate.getDate())) {
        years--;
        months += 12;
    }
    return `${years} years, ${months} months`;
  };

  return (
    <>
      <AppHeader pageTitle="Customer Details" />
      <main className="flex-1 p-6 space-y-6">
        <div className="flex items-center justify-between">
            <Button variant="outline" asChild className="font-medium">
                <Link href="/customers">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Customers
                </Link>
            </Button>
            <Button variant="default" className="font-medium">
                <Edit className="mr-2 h-4 w-4" /> Edit Customer
            </Button>
        </div>

        {/* Customer Header */}
        <Card className="shadow-lg">
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Avatar className="h-20 w-20 border">
              <AvatarImage src={customer.avatarUrl} alt={`${customer.firstName} ${customer.lastName}`} data-ai-hint="company logo"/>
              <AvatarFallback className="text-2xl">{getInitials(customer.firstName, customer.lastName)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-2xl font-headline font-bold">{customer.firstName} {customer.lastName}</CardTitle>
              {customer.companyName && <CardDescription className="text-lg font-medium text-muted-foreground">{customer.companyName}</CardDescription>}
              <p className="text-sm text-primary font-light">{customer.email}</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 text-sm text-right mt-4 sm:mt-0">
                <div className="p-2 rounded-md bg-secondary/50">
                    <p className="font-semibold text-foreground">${customer.totalBilled.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground font-light">Total Billed</p>
                </div>
                <div className="p-2 rounded-md bg-secondary/50">
                    <p className="font-semibold text-destructive">${customer.pendingBalance.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground font-light">Pending Balance</p>
                </div>
                 <div className="p-2 rounded-md bg-secondary/50 col-span-2 sm:col-span-1">
                    <p className="font-semibold text-foreground">{calculateCustomerAge(customer.createdAt)}</p>
                    <p className="text-xs text-muted-foreground font-light">Customer Since</p>
                </div>
            </div>
          </CardHeader>
        </Card>

        {/* Tabs for Customer Details */}
        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
            <TabsTrigger value="summary" className="font-medium"><Activity className="mr-2 h-4 w-4"/>Summary</TabsTrigger>
            <TabsTrigger value="invoices" className="font-medium"><FileText className="mr-2 h-4 w-4"/>Invoices & Payments</TabsTrigger>
            <TabsTrigger value="documents" className="font-medium"><FileArchive className="mr-2 h-4 w-4"/>Documents</TabsTrigger>
            <TabsTrigger value="projects" className="font-medium"><Briefcase className="mr-2 h-4 w-4"/>Projects/Services</TabsTrigger>
          </TabsList>

          {/* Summary Tab */}
          <TabsContent value="summary">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline font-semibold">Customer Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-medium mb-1">Contact Information</h4>
                        <p className="font-light text-sm"><strong>Email:</strong> {customer.email}</p>
                        <p className="font-light text-sm"><strong>Phone:</strong> {customer.phone || "N/A"}</p>
                        <p className="font-light text-sm"><strong>Website:</strong> <a href={customer.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{customer.website || "N/A"}</a></p>
                    </div>
                    <div>
                        <h4 className="font-medium mb-1">Fiscal Information</h4>
                        <p className="font-light text-sm"><strong>Company:</strong> {customer.companyName || "N/A"}</p>
                        <p className="font-light text-sm"><strong>Tax ID:</strong> {customer.taxId || "N/A"}</p>
                        <p className="font-light text-sm"><strong>Address:</strong> {`${customer.address.street || ''}, ${customer.address.city || ''}, ${customer.address.state || ''} ${customer.address.postalCode || ''}, ${customer.address.country || ''}`.replace(/ , |^, |,$/g, '') || "N/A"}</p>
                    </div>
                </div>
                 <div>
                    <h4 className="font-medium mb-1">AI Analysis & Opportunities</h4>
                    <p className="font-light text-sm text-muted-foreground italic p-3 bg-secondary/30 rounded-md">
                        {customer.aiProfileSummary || "AI analysis not yet performed."}
                    </p>
                    {customer.aiOpportunities && (
                         <p className="font-light text-sm text-muted-foreground italic p-3 bg-accent/10 rounded-md mt-2 border border-accent/30">
                            <strong>Opportunities:</strong> {customer.aiOpportunities}
                        </p>
                    )}
                </div>
                 <div>
                    <h4 className="font-medium mb-1">Recent Activity</h4>
                    <ul className="space-y-2 text-sm font-light">
                        {/* Placeholder for activity feed */}
                        <li className="border-b pb-1">Factura #INV001 enviada - 3 days ago</li>
                        <li className="border-b pb-1">Pago recibido por Factura #INV000 - 1 week ago</li>
                        <li>Cliente creado - {new Date(customer.createdAt).toLocaleDateString()}</li>
                    </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Invoices & Payments Tab */}
          <TabsContent value="invoices">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline font-semibold">Invoices & Payments</CardTitle>
                 <CardDescription className="font-light">History of invoices and payment status for {customer.firstName} {customer.lastName}.</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Placeholder for InvoicesTable specific to this customer */}
                <p className="text-muted-foreground font-light">Invoice table for this customer will be here.</p>
                {invoices.length > 0 ? (
                    <ul>{invoices.map(inv => <li key={inv.id} className="font-light p-1 border-b">{inv.invoiceNumber} - ${inv.amount} - {inv.status}</li>)}</ul>
                ) : <p className="text-muted-foreground font-light">No invoices found for this customer.</p>}
                <div className="mt-4 pt-4 border-t">
                    <h4 className="font-medium">Financial Summary</h4>
                    <p className="font-light text-sm">Total Paid: $XXXX.XX</p>
                    <p className="font-light text-sm">Total Pending: $YYYY.YY</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents">
            <Card className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="font-headline font-semibold">Documents</CardTitle>
                    <CardDescription className="font-light">Contracts, proposals, and other files related to {customer.firstName} {customer.lastName}.</CardDescription>
                </div>
                <Button className="font-medium"><FileArchive className="mr-2 h-4 w-4"/> Upload Document</Button>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-light">Document manager will be here.</p>
                {documents.length > 0 ? (
                    <ul>{documents.map(doc => <li key={doc.id} className="font-light p-1 border-b">{doc.fileName}</li>)}</ul>
                ) : <p className="text-muted-foreground font-light">No documents uploaded for this customer.</p>}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects/Services Tab */}
          <TabsContent value="projects">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline font-semibold">Projects & Services</CardTitle>
                <CardDescription className="font-light">List of projects or ongoing services for {customer.firstName} {customer.lastName}.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-light">List of projects/services will be here.</p>
                {projects.length > 0 ? (
                    <ul>{projects.map(proj => <li key={proj.id} className="font-light p-1 border-b">{proj.projectName}</li>)}</ul>
                ) : <p className="text-muted-foreground font-light">No projects or services associated with this customer.</p>}
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </main>
    </>
  );
}
