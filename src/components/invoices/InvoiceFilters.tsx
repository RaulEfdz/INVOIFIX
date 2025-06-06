"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { INVOICE_STATUSES } from "@/lib/constants";
import type { InvoiceStatus } from "@/types";
import { Search, X, Filter } from "lucide-react";

interface InvoiceFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  statusFilter: InvoiceStatus | "all";
  onStatusChange: (status: InvoiceStatus | "all") => void;
}

export function InvoiceFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
}: InvoiceFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
      <div className="relative w-full md:flex-grow">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search invoices (ID, client...)"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-10 w-full bg-card font-light"
        />
        {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1.5 top-1/2 h-7 w-7 -translate-y-1/2"
              onClick={() => onSearchChange("")}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
      </div>
      <div className="flex items-center gap-2 w-full md:w-auto">
        <Filter className="h-5 w-5 text-muted-foreground hidden sm:block" />
        <Select
            value={statusFilter}
            onValueChange={(value) => onStatusChange(value as InvoiceStatus | "all")}
        >
            <SelectTrigger className="w-full md:w-[180px] bg-card font-light">
            <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="font-light">
            <SelectItem value="all">All Statuses</SelectItem>
            {INVOICE_STATUSES.map((status) => (
                <SelectItem key={status} value={status}>
                {status}
                </SelectItem>
            ))}
            </SelectContent>
        </Select>
      </div>
    </div>
  );
}
