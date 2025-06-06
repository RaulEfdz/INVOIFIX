
"use client";

import * as React from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Customer, Invoice, CustomerDocument, CustomerProject } from "@/types";
import { DUMMY_CUSTOMERS, DUMMY_INVOICES } from "@/lib/constants";
import { ArrowLeft, Edit, FileText, Briefcase, DollarSign, Activity, FileArchive, UploadCloud, LinkIcon, MapPin, Building, Phone, Globe, Info } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation"; // Added useRouter
import { InvoiceStatusBadge } from "@/components/invoices/InvoiceStatusBadge"; // To display status correctly
import { Badge } from "@/components/ui/badge";

const DUMMY_DOCUMENTS: CustomerDocument[] = [
    // Add some dummy documents if needed
];
const DUMMY_PROJECTS: CustomerProject[] = [
    // Add some dummy projects if needed
];


export default function CustomerDetailPage() {
  const params = useParams();
  const router = useRouter(); // For programmatic navigation
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
      // Simulating fetching documents and projects if they were customer-specific
      setDocuments(DUMMY_DOCUMENTS.filter(doc => doc.customerId === customerId));
      setProjects(DUMMY_PROJECTS.filter(proj => proj.customerId === customerId));
    } else {
      // Handle customer not found, maybe redirect or show a specific message
      // router.push('/customers'); // Example redirect
    }
  }, [customerId, router]);

  if (!customer) {
    return (
      <>
        <AppHeader pageTitle="Customer Details" />
        <main className="flex-1 p-6 text-center">
          <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
            <Info className="w-16 h-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Customer Not Found</h2>
            <p className="font-light text-muted-foreground mb-6">The customer you are looking for could not be found or does not exist.</p>
            <Button onClick={() => router.push("/customers")} variant="outline" className="font-medium">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Customers
            </Button>
          </div>
        </main>
      </>
    );
  }

  const getInitials = (firstName?: string, lastName?: string): string => {
    const first = firstName ? firstName.charAt(0) : "";
    const last = lastName ? lastName.charAt(0) : "";
    if (!first && !last && customer.companyName) return customer.companyName.substring(0,2).toUpperCase();
    if (!first && !last) return "NN";
    return `${first}${last}`.toUpperCase();
  };
  
  const calculateCustomerAge = (createdAt: string) => {
    const createdDate = new Date(createdAt);
    const today = new Date();
    let years = today.getFullYear() - createdDate.getFullYear();
    let months = today.getMonth() - createdDate.getMonth();
    if (months < 0 || (months === 0 && today.getDate() < createdDate.getDate())) {
        years--;
        months = (months + 12) % 12;
    }
    if (years === 0 && months === 0) return "New Customer";
    
    const parts = [];
    if (years > 0) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
    if (months > 0) parts.push(`${months} mo${months > 1 ? 's' : ''}`);
    return parts.join(' ');
  };

  const totalPaid = invoices.filter(inv => inv.status === 'Paid').reduce((sum, inv) => sum + inv.amount, 0);
  const totalPendingFromInvoices = invoices.filter(inv => inv.status === 'Sent' || inv.status === 'Overdue' || inv.status === 'Draft').reduce((sum, inv) => sum + inv.amount, 0);

  const fullAddress = [
    customer.address.street,
    customer.address.city,
    customer.address.state,
    customer.address.postalCode,
    customer.address.country
  ].filter(Boolean).join(', ').replace(/ , $|^, |,$/g, '') || "N/A";


  return (
    <>
      <AppHeader pageTitle={`${customer.firstName} ${customer.lastName}`} />
      <main className="flex-1 p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-between">
            <Button variant="outline" asChild className="font-medium">
                <Link href="/customers">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Customers
                </Link>
            </Button>
            <Button variant="default" className="font-medium bg-primary text-primary-foreground hover:bg-primary/90">
                <Edit className="mr-2 h-4 w-4" /> Edit Customer
            </Button>
        </div>

        <Card className="shadow-lg overflow-hidden rounded-xl">
          <CardHeader className="bg-card p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6 border-b">
            <Avatar className="h-24 w-24 border-2 border-primary/20 shrink-0">
              <AvatarImage 
                src={customer.avatarUrl || `https://placehold.co/120x120.png?text=${getInitials(customer.firstName, customer.lastName)}`} 
                alt={`${customer.firstName} ${customer.lastName}`} 
                data-ai-hint="company logo person"
              />
              <AvatarFallback className="text-3xl bg-muted">{getInitials(customer.firstName, customer.lastName)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                 <CardTitle className="text-3xl font-bold text-foreground">{customer.firstName} {customer.lastName}</CardTitle>
                 <Badge variant={customer.status === "Activo" ? "default" : customer.status === "Con Deuda" ? "destructive" : "secondary"} 
                        className={`capitalize ${customer.status === "Activo" ? "bg-status-paid text-primary-foreground" : ""}`}>
                    {customer.status}
                </Badge>
              </div>
              {customer.companyName && <p className="text-base font-medium text-muted-foreground flex items-center gap-2"><Building className="h-4 w-4"/> {customer.companyName}</p>}
              <p className="text-sm text-primary font-light mt-1 flex items-center gap-2"><LinkIcon className="h-4 w-4"/> {customer.email}</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-x-4 gap-y-2 text-sm text-right mt-4 sm:mt-0 w-full sm:w-auto">
                <div className="p-3 rounded-lg bg-secondary/70 text-center sm:text-right">
                    <p className="text-xs text-muted-foreground font-light mb-0.5">Total Billed</p>
                    <p className="font-semibold text-xl text-foreground">${customer.totalBilled.toFixed(2)}</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/70 text-center sm:text-right">
                     <p className="text-xs text-muted-foreground font-light mb-0.5">Pending</p>
                    <p className="font-semibold text-xl text-destructive">${customer.pendingBalance.toFixed(2)}</p>
                </div>
                 <div className="p-3 rounded-lg bg-secondary/70 col-span-2 sm:col-span-1 text-center sm:text-right">
                    <p className="text-xs text-muted-foreground font-light mb-0.5">Customer Since</p>
                    <p className="font-semibold text-xl text-foreground">{calculateCustomerAge(customer.createdAt)}</p>
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
            <Card className="shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="font-bold text-xl">Customer Summary</CardTitle>
                <CardDescription className="font-light">Overview of customer information and AI insights.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="space-y-3">
                        <h4 className="font-semibold text-md text-foreground border-b pb-2 mb-3">Contact Information</h4>
                        <p className="font-light text-sm flex items-start gap-2"><LinkIcon className="h-4 w-4 text-muted-foreground mt-0.5"/> <div><strong>Email:</strong> {customer.email}</div></p>
                        <p className="font-light text-sm flex items-start gap-2"><Phone className="h-4 w-4 text-muted-foreground mt-0.5"/> <div><strong>Phone:</strong> {customer.phone || "N/A"}</div></p>
                        {customer.website && <p className="font-light text-sm flex items-start gap-2"><Globe className="h-4 w-4 text-muted-foreground mt-0.5"/> <div><strong>Website:</strong> <a href={customer.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{customer.website}</a></div></p>}
                        <p className="font-light text-sm flex items-start gap-2"><MapPin className="h-4 w-4 text-muted-foreground mt-0.5"/> <div><strong>Address:</strong> {fullAddress}</div></p>
                    </div>
                    <div className="space-y-3">
                        <h4 className="font-semibold text-md text-foreground border-b pb-2 mb-3">Fiscal Information</h4>
                        {customer.companyName && <p className="font-light text-sm flex items-start gap-2"><Building className="h-4 w-4 text-muted-foreground mt-0.5"/> <div><strong>Company:</strong> {customer.companyName}</div></p>}
                        <p className="font-light text-sm flex items-start gap-2"><Info className="h-4 w-4 text-muted-foreground mt-0.5"/> <div><strong>Tax ID:</strong> {customer.taxId || "N/A"}</div></p>
                        <p className="font-light text-sm flex items-start gap-2"><Briefcase className="h-4 w-4 text-muted-foreground mt-0.5"/> <div><strong>Type:</strong> {customer.customerType} - {customer.commercialInfo?.businessType || "N/A"}</div></p>
                        <p className="font-light text-sm flex items-start gap-2"><Info className="h-4 w-4 text-muted-foreground mt-0.5"/> <div><strong>Origin:</strong> {customer.commercialInfo?.origin || "N/A"}</div></p>
                    </div>
                </div>
                 <div className="space-y-3">
                    <h4 className="font-semibold text-md text-foreground border-b pb-2 mb-3">AI Analysis & Notes</h4>
                    <div className="p-4 bg-secondary/50 rounded-lg space-y-3">
                        <p className="font-light text-sm text-muted-foreground italic">
                            {customer.aiProfileSummary || "AI analysis not yet performed. Click 'Edit Customer' to generate."}
                        </p>
                        {customer.aiOpportunities && (
                            <div className="p-3 bg-primary/10 rounded-md border border-primary/30">
                                <p className="font-medium text-sm text-primary mb-1">Opportunities:</p>
                                <p className="font-light text-sm text-muted-foreground italic">
                                {customer.aiOpportunities}
                                </p>
                            </div>
                        )}
                         {customer.commercialInfo?.internalNotes && (
                            <div className="p-3 bg-accent/10 rounded-md border border-accent/30">
                                <p className="font-medium text-sm text-accent-foreground mb-1">Internal Notes:</p>
                                <p className="font-light text-sm text-muted-foreground italic whitespace-pre-line">
                                {customer.commercialInfo.internalNotes}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                 <div>
                    <h4 className="font-semibold text-md text-foreground border-b pb-2 mb-3">Recent Activity</h4>
                    <ul className="space-y-2 text-sm font-light border p-4 rounded-lg bg-secondary/30 max-h-60 overflow-y-auto">
                        {/* Placeholder for activity feed */}
                        <li className="border-b pb-1.5 pt-0.5">Invoice #INV001 sent - 3 days ago</li>
                        <li className="border-b pb-1.5 pt-0.5">Payment received for Invoice #INV000 - 1 week ago</li>
                        <li className="border-b pb-1.5 pt-0.5">Customer details updated - 2 weeks ago</li>
                        <li>Customer account created - {new Date(customer.createdAt).toLocaleDateString()}</li>
                    </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invoices">
            <Card className="shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="font-bold text-xl">Invoices & Payments</CardTitle>
                 <CardDescription className="font-light">History of invoices and payment status for {customer.firstName} {customer.lastName}.</CardDescription>
              </CardHeader>
              <CardContent>
                {invoices.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-border">
                            <thead className="bg-muted/50">
                                <tr>
                                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Number</th>
                                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Issued</th>
                                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Due</th>
                                    <th className="px-4 py-2.5 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount</th>
                                    <th className="px-4 py-2.5 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                                    <th className="px-4 py-2.5 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-card divide-y divide-border">
                                {invoices.map(inv => (
                                    <tr key={inv.id} className="font-light hover:bg-secondary/30 transition-colors">
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-primary hover:underline">
                                          <Link href={`/invoices/${inv.id}`}>{inv.invoiceNumber}</Link>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">{new Date(inv.issuedDate).toLocaleDateString()}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">{new Date(inv.dueDate).toLocaleDateString()}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-medium text-foreground">${inv.amount.toFixed(2)}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                                            <InvoiceStatusBadge status={inv.status} />
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                                            <Button variant="ghost" size="sm" className="font-light text-xs h-auto py-1 px-2">Download</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : <p className="text-muted-foreground font-light text-center py-8">No invoices found for this customer.</p>}
                
                {invoices.length > 0 && (
                    <div className="mt-6 pt-4 border-t">
                        <h4 className="font-semibold text-md text-foreground mb-3">Financial Summary</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-4 bg-secondary/50 rounded-lg">
                                <p className="text-xs text-muted-foreground mb-1">Total Paid</p>
                                <p className="font-bold text-xl text-status-paid">${totalPaid.toFixed(2)}</p>
                            </div>
                            <div className="p-4 bg-secondary/50 rounded-lg">
                                <p className="text-xs text-muted-foreground mb-1">Total Pending / Overdue</p>
                                <p className="font-bold text-xl text-status-overdue">${totalPendingFromInvoices.toFixed(2)}</p>
                            </div>
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
                    <CardDescription className="font-light">Contracts, proposals, and other files for {customer.firstName}.</CardDescription>
                </div>
                <Button className="font-medium bg-primary text-primary-foreground hover:bg-primary/90">
                    <UploadCloud className="mr-2 h-4 w-4"/> Upload Document
                </Button>
              </CardHeader>
              <CardContent>
                {documents.length > 0 ? (
                    <ul className="divide-y divide-border">{documents.map(doc => <li key={doc.id} className="font-light py-3 flex justify-between items-center"><span>{doc.fileName} <Badge variant="outline" className="ml-2 font-normal">{doc.fileType}</Badge></span> <Button variant="ghost" size="sm">Download</Button></li>)}</ul>
                ) : <p className="text-muted-foreground font-light text-center py-8">No documents uploaded for this customer.</p>}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card className="shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="font-bold text-xl">Projects & Services</CardTitle>
                <CardDescription className="font-light">Active and past projects associated with {customer.firstName}.</CardDescription>
              </CardHeader>
              <CardContent>
                {projects.length > 0 ? (
                    <ul className="divide-y divide-border">{projects.map(proj => <li key={proj.id} className="font-light py-3 flex justify-between items-center"><span>{proj.projectName}</span> <Badge variant={proj.status === "Active" ? "default" : "secondary"}>{proj.status}</Badge></li>)}</ul>
                ) : <p className="text-muted-foreground font-light text-center py-8">No projects or services associated with this customer.</p>}
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </main>
    </>
  );
}

