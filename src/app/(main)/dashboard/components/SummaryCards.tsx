import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export function SummaryCards() {
  return (
    <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-headline font-medium">
            Total de facturas
          </CardTitle>
          <FileText className="h-5 w-5 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">1,234</div>
          <p className="text-xs text-muted-foreground font-light">
            +20.1% desde el mes pasado
          </p>
        </CardContent>
      </Card>
      <Card className="shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-headline font-medium">
            Facturas pagadas
          </CardTitle>
          <span className="h-5 w-5 text-status-paid">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">987</div>
          <p className="text-xs text-muted-foreground font-light">
            +15 desde el mes pasado
          </p>
        </CardContent>
      </Card>
      <Card className="shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-headline font-medium">
            Facturas vencidas
          </CardTitle>
          <span className="h-5 w-5 text-status-overdue">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">56</div>
          <p className="text-xs text-muted-foreground font-light">
            +5 desde la semana pasada
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
