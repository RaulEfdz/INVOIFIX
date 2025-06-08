import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

import { FileText, Ticket, List, Settings, Users } from "lucide-react";

const actions = [
  {
    href: "/invoices/create",
    icon: PlusCircle,
    label: "Crear nueva factura",
  },
  {
    href: "/tickets/submit",
    icon: PlusCircle,
    label: "Enviar nuevo ticket",
  },
  {
    href: "/invoices",
    icon: ArrowRight,
    label: "Ver todas las facturas",
  },
  {
    href: "/tickets",
    icon: Ticket,
    label: "Ver todos los tickets",
  },
  {
    href: "/clients",
    icon: Users,
    label: "Gestionar clientes",
  },
  {
    href: "/reports",
    icon: List,
    label: "Ver reportes",
  },
  {
    href: "/settings",
    icon: Settings,
    label: "Configuración",
  },
  {
    href: "/invoices/drafts",
    icon: FileText,
    label: "Borradores de facturas",
  },
];

export function QuickActions() {
  return (
    <Card className="p-4 border border-gray-200 dark:border-gray-700 bg-transparent shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="font-headline font-medium text-lg mb-1">
          Acciones rápidas
        </CardTitle>
        <CardDescription className="font-light text-gray-500 dark:text-gray-400 mb-4">
          Comience con tareas comunes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4">
          {actions.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 px-3 py-2 rounded-md bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
              aria-label={label}
            >
              <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
              <span className="text-sm font-medium">{label}</span>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
