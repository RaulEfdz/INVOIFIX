"use client";

import * as React from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { Button } from "@/components/ui/button";
import { InvoiceTable } from "@/components/invoices/InvoiceTable";
import { InvoiceFilters } from "@/components/invoices/InvoiceFilters";
import type { Invoice, InvoiceStatus } from "@/types";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

// Dummy data for invoices
const DUMMY_INVOICES: Invoice[] = [
  { id: "1", invoiceNumber: "INV001", clientName: "Alice Wonderland", clientEmail: "alice@example.com", amount: 150.00, dueDate: "2024-08-15", issuedDate: "2024-07-15", status: "Paid", items: [] },
  { id: "2", invoiceNumber: "INV002", clientName: "Bob The Builder", clientEmail: "bob@example.com", amount: 300.50, dueDate: "2024-07-20", issuedDate: "2024-07-01", status: "Overdue", items: [] },
  { id: "3", invoiceNumber: "INV003", clientName: "Charlie Brown", clientEmail: "charlie@example.com", amount: 75.20, dueDate: "2024-09-01", issuedDate: "2024-07-25", status: "Sent", items: [] },
  { id: "4", invoiceNumber: "INV004", clientName: "Diana Prince", clientEmail: "diana@example.com", amount: 500.00, dueDate: "2024-08-10", issuedDate: "2024-07-10", status: "Draft", items: [] },
  { id: "5", invoiceNumber: "INV005", clientName: "Edward Scissorhands", clientEmail: "edward@example.com", amount: 220.75, dueDate: "2024-07-30", issuedDate: "2024-07-12", status: "Paid", items: [] },
  { id: "6", invoiceNumber: "INV006", clientName: "Fiona Apple", clientEmail: "fiona@example.com", amount: 99.99, dueDate: "2024-06-30", issuedDate: "2024-06-01", status: "Overdue", items: [] },
  { id: "7", invoiceNumber: "INV007", clientName: "George Costanza", clientEmail: "george@example.com", amount: 1250.00, dueDate: "2024-09-15", issuedDate: "2024-07-28", status: "Sent", items: [] },
  { id: "8", invoiceNumber: "INV008", clientName: "Harry Potter", clientEmail: "harry@example.com", amount: 42.00, dueDate: "2024-08-20", issuedDate: "2024-07-20", status: "Cancelled", items: [] },
];

const ITEMS_PER_PAGE = 5;

export default function InvoicesPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<InvoiceStatus | "all">("all");
  const [currentPage, setCurrentPage] = React.useState(1);

  const filteredInvoices = React.useMemo(() => {
    return DUMMY_INVOICES.filter(invoice => {
      const matchesSearch = searchTerm.toLowerCase() === "" ||
        invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.clientEmail.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredInvoices.length / ITEMS_PER_PAGE);
  const paginatedInvoices = filteredInvoices.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  React.useEffect(() => {
    setCurrentPage(1); // Reset to first page on filter change
  }, [searchTerm, statusFilter]);


  return (
    <>
      <AppHeader pageTitle="Invoices" />
      <main className="flex-1 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-headline font-semibold">Invoice Management</h2>
            <p className="text-muted-foreground font-light">
              View, manage, and track all your invoices.
            </p>
          </div>
          <Button asChild className="font-medium w-full sm:w-auto">
            <Link href="/invoices/create">
              <PlusCircle className="mr-2 h-5 w-5" /> Create New Invoice
            </Link>
          </Button>
        </div>
        <InvoiceFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
        />
        <InvoiceTable
          invoices={paginatedInvoices}
          onPageChange={handlePageChange}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </main>
    </>
  );
}
