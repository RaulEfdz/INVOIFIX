
"use client";

import * as React from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ClientCard } from "@/components/clients/ClientCard";
import type { Client, ClientStatus, ClientType } from "@/types";
import { DUMMY_CLIENTS, CLIENT_STATUSES, CLIENT_TYPES } from "@/lib/constants";
import { PlusCircle, Search, LayoutGrid, List, Filter as FilterIcon, X } from "lucide-react";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ITEMS_PER_PAGE = 12;

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const [typeFilter, setTypeFilter] = React.useState<ClientType | "all">("all");
  const [statusFilter, setStatusFilter] = React.useState<ClientStatus | "all">("all");

  const filteredClients = React.useMemo(() => {
    return DUMMY_CLIENTS.filter(client => {
      const name = `${client.firstName} ${client.lastName}`;
      const matchesSearch = searchTerm.toLowerCase() === "" ||
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (client.companyName && client.companyName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = typeFilter === "all" || client.clientType === typeFilter;
      const matchesStatus = statusFilter === "all" || client.status === statusFilter;
      
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [searchTerm, typeFilter, statusFilter]);

  const totalPages = Math.ceil(filteredClients.length / ITEMS_PER_PAGE);
  const paginatedClients = filteredClients.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  React.useEffect(() => {
    setCurrentPage(1); 
  }, [searchTerm, typeFilter, statusFilter]);

  return (
    <>
      <AppHeader pageTitle="Clients" /> 
      <main className="flex-1 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Clients</h1>
            <div className="mt-2 flex items-center space-x-1">
              <Button variant="link" className="p-1 h-auto text-foreground font-semibold text-sm hover:no-underline focus:no-underline active:no-underline">
                All Clients <Badge variant="outline" className="ml-2 bg-muted text-muted-foreground">{DUMMY_CLIENTS.length}</Badge>
              </Button>
              <Button variant="link" className="p-1 h-auto text-muted-foreground font-normal text-sm hover:no-underline focus:no-underline active:no-underline">
                New <Badge variant="outline" className="ml-2 bg-muted text-muted-foreground">5</Badge> 
              </Button>
            </div>
          </div>
          <Button asChild className="font-medium w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/clients/create"> 
              <PlusCircle className="mr-2 h-5 w-5" /> New Client
            </Link>
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative flex-grow w-full md:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-10 w-full bg-card font-light"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1.5 top-1/2 h-7 w-7 -translate-y-1/2"
                onClick={() => setSearchTerm("")}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
            <div className="flex items-center gap-2">
                <FilterIcon className="h-4 w-4 text-muted-foreground" />
                <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as ClientType | "all")}>
                    <SelectTrigger className="w-full sm:w-[150px] bg-card font-light text-sm h-9">
                        <SelectValue placeholder="Client Type" />
                    </SelectTrigger>
                    <SelectContent className="font-light text-sm">
                        <SelectItem value="all">All Types</SelectItem>
                        {CLIENT_TYPES.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as ClientStatus | "all")}>
                    <SelectTrigger className="w-full sm:w-[150px] bg-card font-light text-sm h-9">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="font-light text-sm">
                        <SelectItem value="all">All Statuses</SelectItem>
                        {CLIENT_STATUSES.map(status => (
                            <SelectItem key={status} value={status}>{status}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="flex items-center gap-1 p-0.5 bg-muted rounded-lg">
              <Button 
                variant="ghost" 
                size="icon" 
                className={`h-8 w-8 ${viewMode === 'grid' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground'}`} 
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid className="h-4 w-4" />
                <span className="sr-only">Grid View</span>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className={`h-8 w-8 ${viewMode === 'list' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground'}`}
                onClick={() => setViewMode('list')}
                disabled 
              >
                <List className="h-4 w-4" />
                <span className="sr-only">List View</span>
              </Button>
            </div>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {paginatedClients.length > 0 ? (
              paginatedClients.map(client => (
                <ClientCard key={client.id} client={client} />
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-muted-foreground font-light">No clients found matching your criteria.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="p-4 border rounded-lg bg-card shadow-sm text-center text-muted-foreground font-light">
            List view will be implemented here.
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 pt-4 border-t">
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
      </main>
    </>
  );
}
