"use client";
// This page is intentionally left blank or can be removed.
// Ticket details are now shown in a Sheet on the main /tickets page.
// You can redirect to /tickets or show a message if this route is accessed directly.

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TicketDetailPageRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/tickets");
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-semibold mb-4">Redirigiendo...</h1>
      <p className="text-muted-foreground">
        Los detalles del ticket ahora se ven en el tablero principal de tickets.
      </p>
      <p className="text-muted-foreground">
        Si no se le redirige,{" "}
        <a href="/tickets" className="text-primary hover:underline">
          haga clic aquí
        </a>
        .
      </p>
    </div>
  );
}
