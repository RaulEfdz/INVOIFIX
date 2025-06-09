"use client";

import React from "react";
import { ClientRouteGuard } from "@/components/ClientRouteGuard";

export default function ClientDashboardPage() {
  return (
    <ClientRouteGuard>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Panel de Cliente</h1>
        <p>
          Bienvenido a tu panel de cliente. Aquí podrás gestionar tus tickets y
          facturas.
        </p>
      </div>
    </ClientRouteGuard>
  );
}
