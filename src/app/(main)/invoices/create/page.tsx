import { AppHeader } from "@/components/layout/AppHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CreateInvoicePage() {
  return (
    <>
      <AppHeader pageTitle="Create Invoice" />
      <main className="flex-1 p-6">
        <div className="mb-6">
          <Button variant="outline" asChild className="font-medium">
            <Link href="/invoices">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Invoices
            </Link>
          </Button>
        </div>
        <Card className="max-w-4xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-headline font-semibold">New Invoice</CardTitle>
            <CardDescription className="font-light">
              Fill in the details below to create a new invoice. This feature is currently under development.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-border rounded-lg bg-muted/20">
              <p className="text-muted-foreground font-medium">Invoice Creation Form Coming Soon!</p>
              <p className="text-sm text-muted-foreground font-light mt-2">
                Imagine a beautiful form here to add client details, line items, and set due dates.
              </p>
              <img src="https://placehold.co/300x150.png?text=Invoice+Form+UI" alt="Placeholder for invoice form" className="mt-4 rounded opacity-50" data-ai-hint="form ui" />
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
