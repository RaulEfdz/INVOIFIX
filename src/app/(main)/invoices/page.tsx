
"use client";

import * as React from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { Button } from "@/components/ui/button";
import { InvoiceTable } from "@/components/invoices/InvoiceTable";
import { InvoiceFilters } from "@/components/invoices/InvoiceFilters";
import type { Invoice, InvoiceStatus } from "@/types";
import { DUMMY_INVOICES } from "@/lib/constants"; 
import { PlusCircle } from "lucide-react";
import Link from "next/link";

const ITEMS_PER_PAGE = 5;

export default function InvoicesPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<InvoiceStatus | "all">("all");
  const [currentPage, setCurrentPage] = React.useState(1);

  const filteredInvoices = React.useMemo(() => {
    return DUMMY_INVOICES.filter(invoice => {
      const matchesSearch = searchTerm.toLowerCase() === "" ||
        invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || // clientName is fine
        invoice.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()); // clientEmail is fine
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
    setCurrentPage(1); 
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
