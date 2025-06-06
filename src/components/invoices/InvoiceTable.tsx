"use client";

import * as React from "react";
import type { Invoice } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InvoiceStatusBadge } from "./InvoiceStatusBadge";
import { MoreHorizontal, Edit, Trash2, Send, Eye } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

interface InvoiceTableProps {
  invoices: Invoice[];
  onPageChange: (page: number) => void;
  currentPage: number;
  totalPages: number;
}

export function InvoiceTable({ invoices, onPageChange, currentPage, totalPages }: InvoiceTableProps) {
  const [selectedRows, setSelectedRows] = React.useState<Set<string>>(new Set());

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(new Set(invoices.map(inv => inv.id)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (invoiceId: string, checked: boolean) => {
    const newSelectedRows = new Set(selectedRows);
    if (checked) {
      newSelectedRows.add(invoiceId);
    } else {
      newSelectedRows.delete(invoiceId);
    }
    setSelectedRows(newSelectedRows);
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  return (
    <div className="rounded-lg border shadow-sm bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedRows.size === invoices.length && invoices.length > 0}
                onCheckedChange={(checked) => handleSelectAll(Boolean(checked))}
                aria-label="Select all rows"
              />
            </TableHead>
            <TableHead>Invoice ID</TableHead>
            <TableHead>Client</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Issued Date</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right w-[80px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center text-muted-foreground font-light">
                No invoices found.
              </TableCell>
            </TableRow>
          ) : (
            invoices.map((invoice) => (
              <TableRow key={invoice.id} data-state={selectedRows.has(invoice.id) ? "selected" : ""}>
                <TableCell>
                  <Checkbox
                    checked={selectedRows.has(invoice.id)}
                    onCheckedChange={(checked) => handleSelectRow(invoice.id, Boolean(checked))}
                    aria-label={`Select row ${invoice.invoiceNumber}`}
                  />
                </TableCell>
                <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                <TableCell>
                  <div>{invoice.clientName}</div>
                  <div className="text-xs text-muted-foreground font-light">{invoice.clientEmail}</div>
                </TableCell>
                <TableCell className="text-right font-medium">
                  ${invoice.amount.toFixed(2)}
                </TableCell>
                <TableCell className="font-light">{formatDate(invoice.issuedDate)}</TableCell>
                <TableCell className="font-light">{formatDate(invoice.dueDate)}</TableCell>
                <TableCell>
                  <InvoiceStatusBadge status={invoice.status} />
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="font-light">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" /> View
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Send className="mr-2 h-4 w-4" /> Send
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {totalPages > 1 && (
        <div className="flex items-center justify-between p-4 border-t">
          <div className="text-sm text-muted-foreground font-light">
            Page {currentPage} of {totalPages}
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="font-medium"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="font-medium"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
