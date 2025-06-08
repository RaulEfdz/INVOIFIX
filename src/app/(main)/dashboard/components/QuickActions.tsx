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

export function QuickActions() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline font-medium">
          Acciones rápidas
        </CardTitle>
        <CardDescription className="font-light">
          Comience con tareas comunes.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          asChild
          className="w-full justify-start font-medium"
          variant="outline"
        >
          <Link href="/invoices/create">
            <PlusCircle className="mr-2 h-5 w-5" /> Crear nueva factura
          </Link>
        </Button>
        <Button
          asChild
          className="w-full justify-start font-medium"
          variant="outline"
        >
          <Link href="/tickets/submit">
            <PlusCircle className="mr-2 h-5 w-5" /> Enviar nuevo ticket
          </Link>
        </Button>
        <Button
          asChild
          className="w-full justify-start font-medium"
          variant="outline"
        >
          <Link href="/invoices">
            <ArrowRight className="mr-2 h-5 w-5" /> Ver todas las facturas
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
