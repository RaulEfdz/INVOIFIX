
"use client";

import * as React from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Customer, Invoice, CustomerDocument, CustomerProject } from "@/types";
import { DUMMY_CUSTOMERS, DUMMY_INVOICES } from "@/lib/constants";
import { ArrowLeft, Edit, FileText, Briefcase, DollarSign, Activity, FileArchive, UploadCloud } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

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
    const foundCustomer = DUMMY_CUSTOMERS.find(c => c.id === customerId);
    if (foundCustomer) {
      setCustomer(foundCustomer);
      const customerInvoices = DUMMY_INVOICES.filter(inv => inv.customerId === customerId);
      setInvoices(customerInvoices);
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
    if (years === 0 && months === 0) return "New Customer";
    return `${years > 0 ? `${years} yr${years > 1 ? 's' : ''}` : ''} ${months > 0 ? `${months} mo${months > 1 ? 's' : ''}` : ''}`.trim();
  };

  const totalPaid = invoices.filter(inv => inv.status === 'Paid').reduce((sum, inv) => sum + inv.amount, 0);
  const totalPendingFromInvoices = invoices.filter(inv => inv.status === 'Sent' || inv.status === 'Overdue').reduce((sum, inv) => sum + inv.amount, 0);


  return (
    <>
      <AppHeader pageTitle="Customer Details" />
      <main className="flex-1 p-4 md:p-6 space-y-6">
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

        <Card className="shadow-lg overflow-hidden">
          <CardHeader className="bg-card p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b">
            <Avatar className="h-20 w-20 border-2 border-primary/20 shrink-0">
              <AvatarImage src={customer.avatarUrl || `https://placehold.co/100x100.png?text=${getInitials(customer.firstName, customer.lastName)}`} alt={`${customer.firstName} ${customer.lastName}`} data-ai-hint="company logo"/>
              <AvatarFallback className="text-2xl bg-muted">{getInitials(customer.firstName, customer.lastName)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-2xl font-headline font-bold text-foreground">{customer.firstName} {customer.lastName}</CardTitle>
              {customer.companyName && <CardDescription className="text-base font-medium text-muted-foreground">{customer.companyName}</CardDescription>}
              <p className="text-sm text-primary font-light mt-1">{customer.email}</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-x-4 gap-y-2 text-sm text-right mt-4 sm:mt-0 w-full sm:w-auto">
                <div className="p-3 rounded-lg bg-secondary/70">
                    <p className="text-xs text-muted-foreground font-light mb-0.5">Total Billed</p>
                    <p className="font-semibold text-lg text-foreground">${customer.totalBilled.toFixed(2)}</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/70">
                     <p className="text-xs text-muted-foreground font-light mb-0.5">Pending Balance</p>
                    <p className="font-semibold text-lg text-destructive">${customer.pendingBalance.toFixed(2)}</p>
                </div>
                 <div className="p-3 rounded-lg bg-secondary/70 col-span-2 sm:col-span-1">
                    <p className="text-xs text-muted-foreground font-light mb-0.5">Customer Since</p>
                    <p className="font-semibold text-lg text-foreground">{calculateCustomerAge(customer.createdAt)}</p>
                </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
            <TabsTrigger value="summary" className="font-medium"><Activity className="mr-2 h-4 w-4"/>Summary</TabsTrigger>
            <TabsTrigger value="invoices" className="font-medium"><FileText className="mr-2 h-4 w-4"/>Invoices & Payments</TabsTrigger>
            <TabsTrigger value="documents" className="font-medium"><FileArchive className="mr-2 h-4 w-4"/>Documents</TabsTrigger>
            <TabsTrigger value="projects" className="font-medium"><Briefcase className="mr-2 h-4 w-4"/>Projects/Services</TabsTrigger>
          </TabsList>

          <TabsContent value="summary">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline font-semibold">Customer Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <div>
                        <h4 className="font-medium mb-2 text-foreground/90">Contact Information</h4>
                        <p className="font-light text-sm"><strong>Email:</strong> {customer.email}</p>
                        <p className="font-light text-sm"><strong>Phone:</strong> {customer.phone || "N/A"}</p>
                        <p className="font-light text-sm"><strong>Website:</strong> {customer.website ? <a href={customer.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{customer.website}</a> : "N/A"}</p>
                    </div>
                    <div>
                        <h4 className="font-medium mb-2 text-foreground/90">Fiscal Information</h4>
                        <p className="font-light text-sm"><strong>Company:</strong> {customer.companyName || "N/A"}</p>
                        <p className="font-light text-sm"><strong>Tax ID:</strong> {customer.taxId || "N/A"}</p>
                        <p className="font-light text-sm"><strong>Address:</strong> {`${customer.address.street || ''}${customer.address.street && (customer.address.city || customer.address.state || customer.address.postalCode || customer.address.country) ? ', ' : ''}${customer.address.city || ''}${customer.address.city && (customer.address.state || customer.address.postalCode || customer.address.country) ? ', ' : ''}${customer.address.state || ''}${customer.address.state && (customer.address.postalCode || customer.address.country) ? ' ' : ''}${customer.address.postalCode || ''}${customer.address.postalCode && customer.address.country ? ', ' : ''}${customer.address.country || ''}`.replace(/ , $|^, |,$/g, '') || "N/A"}</p>
                    </div>
                </div>
                 <div>
                    <h4 className="font-medium mb-2 text-foreground/90">AI Analysis & Opportunities</h4>
                    <div className="p-4 bg-secondary/50 rounded-lg space-y-3">
                        <p className="font-light text-sm text-muted-foreground italic">
                            {customer.aiProfileSummary || "AI analysis not yet performed for this customer."}
                        </p>
                        {customer.aiOpportunities && (
                            <div className="p-3 bg-accent/10 rounded-md border border-accent/30">
                                <p className="font-medium text-sm text-accent-foreground mb-1">Opportunities:</p>
                                <p className="font-light text-sm text-muted-foreground italic">
                                {customer.aiOpportunities}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                 <div>
                    <h4 className="font-medium mb-2 text-foreground/90">Recent Activity</h4>
                    <ul className="space-y-2 text-sm font-light border p-4 rounded-lg bg-secondary/30">
                        {/* Placeholder for activity feed */}
                        <li className="border-b pb-1.5 pt-0.5">Invoice #INV001 sent - 3 days ago</li>
                        <li className="border-b pb-1.5 pt-0.5">Payment received for Invoice #INV000 - 1 week ago</li>
                        <li>Customer account created - {new Date(customer.createdAt).toLocaleDateString()}</li>
                    </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invoices">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline font-semibold">Invoices & Payments</CardTitle>
                 <CardDescription className="font-light">History of invoices and payment status for {customer.firstName} {customer.lastName}.</CardDescription>
              </CardHeader>
              <CardContent>
                {invoices.length > 0 ? (
                    <ul className="divide-y divide-border">
                        {invoices.map(inv => (
                            <li key={inv.id} className="font-light py-2.5 flex justify-between items-center">
                                <span>{inv.invoiceNumber} - <span className="text-muted-foreground">${inv.amount.toFixed(2)}</span></span>
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${inv.status === 'Paid' ? 'bg-status-paid text-primary-foreground' : inv.status === 'Overdue' ? 'bg-status-overdue text-primary-foreground' : 'bg-status-pending text-primary-foreground'}`}>{inv.status}</span>
                            </li>
                        ))}
                    </ul>
                ) : <p className="text-muted-foreground font-light text-center py-8">No invoices found for this customer.</p>}
                
                {invoices.length > 0 && (
                    <div className="mt-6 pt-4 border-t">
                        <h4 className="font-medium mb-2">Financial Summary</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-secondary/50 rounded-md">
                                <p className="text-xs text-muted-foreground">Total Paid</p>
                                <p className="font-semibold text-lg text-status-paid">${totalPaid.toFixed(2)}</p>
                            </div>
                            <div className="p-3 bg-secondary/50 rounded-md">
                                <p className="text-xs text-muted-foreground">Total Pending</p>
                                <p className="font-semibold text-lg text-status-overdue">${totalPendingFromInvoices.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <div>
                    <CardTitle className="font-headline font-semibold">Documents</CardTitle>
                    <CardDescription className="font-light">Contracts, proposals, and other files for {customer.firstName}.</CardDescription>
                </div>
                <Button className="font-medium">
                    <UploadCloud className="mr-2 h-4 w-4"/> Upload Document
                </Button>
              </CardHeader>
              <CardContent>
                {documents.length > 0 ? (
                    <ul className="divide-y divide-border">{documents.map(doc => <li key={doc.id} className="font-light py-2">{doc.fileName}</li>)}</ul>
                ) : <p className="text-muted-foreground font-light text-center py-8">No documents uploaded for this customer.</p>}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline font-semibold">Projects & Services</CardTitle>
                <CardDescription className="font-light">Active and past projects for {customer.firstName}.</CardDescription>
              </CardHeader>
              <CardContent>
                {projects.length > 0 ? (
                    <ul className="divide-y divide-border">{projects.map(proj => <li key={proj.id} className="font-light py-2">{proj.projectName}</li>)}</ul>
                ) : <p className="text-muted-foreground font-light text-center py-8">No projects or services associated with this customer.</p>}
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </main>
    </>
  );
}
