
"use client";

import * as React from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { Button } from "@/components/ui/button";
// import { CustomerTable } from "@/components/customers/CustomerTable"; // To be created
// import { CustomerFilters } from "@/components/customers/CustomerFilters"; // To be created
import type { Customer, CustomerStatus, CustomerType } from "@/types";
import { DUMMY_CUSTOMERS } from "@/lib/constants"; // Using dummy data for now
import { PlusCircle } from "lucide-react";
import Link from "next/link";

const ITEMS_PER_PAGE = 10; // Adjust as needed

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [typeFilter, setTypeFilter] = React.useState<CustomerType | "all">("all");
  const [statusFilter, setStatusFilter] = React.useState<CustomerStatus | "all">("all");
  const [currentPage, setCurrentPage] = React.useState(1);

  // TODO: Replace with actual data fetching and filtering logic
  const filteredCustomers = React.useMemo(() => {
    return DUMMY_CUSTOMERS.filter(customer => {
      const name = `${customer.firstName} ${customer.lastName}`;
      const matchesSearch = searchTerm.toLowerCase() === "" ||
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (customer.companyName && customer.companyName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = typeFilter === "all" || customer.customerType === typeFilter;
      const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
      
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [searchTerm, typeFilter, statusFilter]);

  const totalPages = Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE);
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  React.useEffect(() => {
    setCurrentPage(1); // Reset to first page on filter change
  }, [searchTerm, typeFilter, statusFilter]);

  // TODO: Create CustomerTable and CustomerFilters components
  // For now, displaying a placeholder message.

  return (
    <>
      <AppHeader pageTitle="Customers" />
      <main className="flex-1 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-headline font-semibold">Customer Management</h2>
            <p className="text-muted-foreground font-light">
              View, manage, and analyze your customer base.
            </p>
          </div>
          <Button asChild className="font-medium w-full sm:w-auto">
            {/* <Link href="/customers/create">  TODO: Link to modal or create page */}
            <Link href="#"> 
              <PlusCircle className="mr-2 h-5 w-5" /> Add Customer
            </Link>
          </Button>
        </div>
        
        {/* Placeholder for CustomerFilters */}
        <div className="p-4 border rounded-lg bg-card shadow-sm">
          <p className="text-muted-foreground font-light">Customer Filters component will be here.</p>
          <input 
            type="text" 
            placeholder="Search customers..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-2 p-2 border rounded w-full md:w-1/2 font-light bg-background"
          />
        </div>

        {/* Placeholder for CustomerTable */}
        <div className="p-4 border rounded-lg bg-card shadow-sm">
          <h3 className="font-semibold mb-2">Customer List (Paginated)</h3>
          {paginatedCustomers.length > 0 ? (
            <ul className="space-y-2">
              {paginatedCustomers.map(customer => (
                <li key={customer.id} className="p-2 border-b font-light">
                  <Link href={`/customers/${customer.id}`} className="text-primary hover:underline">
                    {customer.firstName} {customer.lastName} ({customer.companyName || 'N/A'}) - {customer.email}
                  </Link>
                  <span className="ml-2 text-sm text-muted-foreground">({customer.status})</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground font-light">No customers found.</p>
          )}
           {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground font-light">
                Page {currentPage} of {totalPages}
              </div>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="font-medium"
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="font-medium"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
