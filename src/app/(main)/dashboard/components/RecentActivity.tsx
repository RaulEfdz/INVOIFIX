import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export function RecentActivity() {
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
          <li className="flex items-center justify-between text-sm font-light">
            <span>Factura #INV001 pagada</span>
            <span className="text-muted-foreground">hace 2 horas</span>
          </li>
          <li className="flex items-center justify-between text-sm font-light">
            <span>Nuevo Ticket #TKT005 enviado</span>
            <span className="text-muted-foreground">hace 5 horas</span>
          </li>
          <li className="flex items-center justify-between text-sm font-light">
            <span>Factura #INV003 enviada</span>
            <span className="text-muted-foreground">hace 1 día</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
