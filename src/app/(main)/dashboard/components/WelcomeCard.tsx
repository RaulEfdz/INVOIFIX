import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function WelcomeCard() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline font-medium">
          ¡Bienvenido a InvoiFix!
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row items-center gap-6">
        <Image
          src="https://placehold.co/600x400.png"
          alt="Invoice management illustration"
          width={300}
          height={200}
          className="rounded-lg shadow-md"
          data-ai-hint="invoice management"
        />
        <div>
          <p className="mb-4 font-light text-muted-foreground">
            InvoiFix le ayuda a optimizar sus procesos de facturación y soporte.
            Cree y rastree facturas, administre los tickets de los clientes y
            manténgase organizado con nuestra plataforma intuitiva.
          </p>
          <p className="mb-4 font-light text-muted-foreground">
            Explore la barra lateral para navegar por las diferentes secciones,
            como Facturas y Tickets. Utilice las acciones rápidas anteriores
            para comenzar de inmediato.
          </p>
          <Button asChild className="font-medium">
            <Link href="/invoices">
              Manage Invoices <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
