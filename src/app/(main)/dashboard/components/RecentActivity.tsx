import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { DUMMY_INVOICES } from "@/lib/constants";

function timeAgo(date: Date) {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  if (diffSeconds < 60) return `hace ${diffSeconds} segundos`;
  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) return `hace ${diffMinutes} minutos`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `hace ${diffHours} horas`;
  const diffDays = Math.floor(diffHours / 24);
  return `hace ${diffDays} días`;
}

export function RecentActivity() {
  // Extraer eventos recientes de facturas
  const recentInvoiceEvents = DUMMY_INVOICES.filter(
    (inv) => inv.status === "Paid" || inv.status === "Sent"
  )
    .sort(
      (a, b) =>
        new Date(b.issuedDate).getTime() - new Date(a.issuedDate).getTime()
    )
    .slice(0, 5)
    .map((inv) => {
      const action = inv.status === "Paid" ? "pagada" : "enviada";
      return {
        id: inv.id,
        description: `Factura #${inv.invoiceNumber} ${action}`,
        timeAgo: timeAgo(new Date(inv.issuedDate)),
      };
    });

  // Datos de ejemplo para tickets recientes (puedes reemplazar con datos reales)
  const recentTicketEvents = [
    {
      id: "TKT005",
      description: "Nuevo Ticket #TKT005 enviado",
      timeAgo: "hace 5 horas",
    },
    {
      id: "TKT004",
      description: "Ticket #TKT004 cerrado",
      timeAgo: "hace 1 día",
    },
  ];

  // Combinar eventos y ordenar por tiempo (simplificado)
  const recentEvents = [...recentInvoiceEvents, ...recentTicketEvents].slice(
    0,
    5
  );

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline font-medium">
          Actividad reciente
        </CardTitle>
        <CardDescription className="font-light">
          Descripción general de los eventos recientes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {recentEvents.map((event) => (
            <li
              key={event.id}
              className="flex items-center justify-between text-sm font-light"
            >
              <span>{event.description}</span>
              <span className="text-muted-foreground">{event.timeAgo}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
