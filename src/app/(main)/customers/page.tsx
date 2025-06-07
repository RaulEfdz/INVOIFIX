"use client";

import * as React from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ClientCard } from "@/components/clients/ClientCard"; // Changed from CustomerCard
import type { Client } from "@/types"; // Changed from Customer
import { DUMMY_CLIENTS } from "@/lib/constants"; // Changed from DUMMY_CUSTOMERS
import { PlusCircle, Search, LayoutGrid, List } from "lucide-react";
import Link from "next/link";

const ITEMS_PER_PAGE = 12;

export default function CustomersPage() {
  // Function name remains as per file, but logic changes to "Client"
  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");

  const filteredClients = React.useMemo(() => {
    // Renamed from filteredCustomers
    return DUMMY_CLIENTS.filter((client) => {
      // Changed from DUMMY_CUSTOMERS and customer to client
      const name = `${client.firstName} ${client.lastName}`;
      const matchesSearch =
        searchTerm.toLowerCase() === "" ||
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (client.companyName &&
          client.companyName
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSearch;
    });
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredClients.length / ITEMS_PER_PAGE);
  const paginatedClients = filteredClients.slice(
    // Renamed from paginatedCustomers
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <>
      <AppHeader pageTitle="Clientes (Ruta Antigua)" />{" "}
      {/* Changed pageTitle to indicate it's an old route */}
      <main className="flex-1 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Clientes</h1>
            <div className="mt-2 flex items-center space-x-1">
              <Button
                variant="link"
                className="p-1 h-auto text-foreground font-semibold text-sm hover:no-underline focus:no-underline active:no-underline"
              >
                Todos los clientes{" "}
                <Badge
                  variant="outline"
                  className="ml-2 bg-muted text-muted-foreground"
                >
                  {DUMMY_CLIENTS.length}
                </Badge>{" "}
                {/* Changed from DUMMY_CUSTOMERS */}
              </Button>
              <Button
                variant="link"
                className="p-1 h-auto text-muted-foreground font-normal text-sm hover:no-underline focus:no-underline active:no-underline"
              >
                Nuevo{" "}
                <Badge
                  variant="outline"
                  className="ml-2 bg-muted text-muted-foreground"
                >
                  5
                </Badge>{" "}
                {/* Placeholder count */}
              </Button>
            </div>
          </div>
          <Button
            asChild
            className="font-medium w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Link href="/clients/create">
              {" "}
              {/* Changed from /customers/create */}
              <PlusCircle className="mr-2 h-5 w-5" /> Nuevo Cliente
            </Link>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative flex-grow w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar clientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full bg-card font-light"
            />
          </div>
          <div className="flex items-center gap-1 p-0.5 bg-muted rounded-lg">
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 ${
                viewMode === "grid"
                  ? "bg-background shadow-sm text-primary"
                  : "text-muted-foreground"
              }`}
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="sr-only">Vista de cuadrícula</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 ${
                viewMode === "list"
                  ? "bg-background shadow-sm text-primary"
                  : "text-muted-foreground"
              }`}
              onClick={() => setViewMode("list")}
              disabled // List view not implemented yet
            >
              <List className="h-4 w-4" />
              <span className="sr-only">Vista de lista</span>
            </Button>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {paginatedClients.length > 0 ? ( // Renamed
              paginatedClients.map(
                (
                  client // Renamed
                ) => (
                  <ClientCard key={client.id} client={client} /> // Changed to ClientCard and client prop
                )
              )
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-muted-foreground font-light">
                  No se encontraron clientes que coincidan con sus criterios.
                </p>
              </div>
            )}
          </div>
        ) : (
          // Placeholder for List View
          <div className="p-4 border rounded-lg bg-card shadow-sm text-center text-muted-foreground font-light">
            La vista de lista se implementará aquí.
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 pt-4 border-t">
            <div className="text-sm text-muted-foreground font-light">
              Página {currentPage} de {totalPages}
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="font-medium"
              >
                Anterior
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="font-medium"
              >
                Siguiente
              </Button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
