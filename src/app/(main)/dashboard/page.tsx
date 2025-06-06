import { AppHeader } from "@/components/layout/AppHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, PlusCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function DashboardPage() {
  return (
    <>
      <AppHeader pageTitle="Dashboard" />
      <main className="flex-1 p-6 space-y-6">
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-headline font-medium">Total Invoices</CardTitle>
              <FileText className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground font-light">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-headline font-medium">Paid Invoices</CardTitle>
              <span className="h-5 w-5 text-status-paid">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                </svg>
              </span>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">987</div>
              <p className="text-xs text-muted-foreground font-light">+15 from last month</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-headline font-medium">Overdue Invoices</CardTitle>
               <span className="h-5 w-5 text-status-overdue">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                 <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                </svg>
              </span>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">56</div>
              <p className="text-xs text-muted-foreground font-light">+5 since last week</p>
            </CardContent>
          </Card>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline font-medium">Quick Actions</CardTitle>
              <CardDescription className="font-light">Get started with common tasks.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full justify-start font-medium" variant="outline">
                <Link href="/invoices/create">
                  <PlusCircle className="mr-2 h-5 w-5" /> Create New Invoice
                </Link>
              </Button>
              <Button asChild className="w-full justify-start font-medium" variant="outline">
                <Link href="/tickets/submit">
                  <PlusCircle className="mr-2 h-5 w-5" /> Submit New Ticket
                </Link>
              </Button>
              <Button asChild className="w-full justify-start font-medium" variant="outline">
                <Link href="/invoices">
                  <ArrowRight className="mr-2 h-5 w-5" /> View All Invoices
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline font-medium">Recent Activity</CardTitle>
               <CardDescription className="font-light">Overview of recent events.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center justify-between text-sm font-light">
                  <span>Invoice #INV001 paid</span>
                  <span className="text-muted-foreground">2 hours ago</span>
                </li>
                <li className="flex items-center justify-between text-sm font-light">
                  <span>New Ticket #TKT005 submitted</span>
                  <span className="text-muted-foreground">5 hours ago</span>
                </li>
                <li className="flex items-center justify-between text-sm font-light">
                  <span>Invoice #INV003 sent</span>
                  <span className="text-muted-foreground">1 day ago</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>
        
        <section>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline font-medium">Welcome to InvoiFix!</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row items-center gap-6">
              <Image 
                src="https://placehold.co/600x400.png" 
                alt="Invoice management illustration" 
                width={300} 
                height={200} 
                className="rounded-lg shadow-md"
                data-ai-hint="invoice management"
              />
              <div>
                <p className="mb-4 font-light text-muted-foreground">
                  InvoiFix helps you streamline your billing and support processes. Create and track invoices, manage client tickets, and stay organized with our intuitive platform.
                </p>
                <p className="mb-4 font-light text-muted-foreground">
                  Explore the sidebar to navigate through different sections like Invoices and Tickets. Use the quick actions above to get started immediately.
                </p>
                <Button asChild className="font-medium">
                  <Link href="/invoices">
                    Manage Invoices <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
}
