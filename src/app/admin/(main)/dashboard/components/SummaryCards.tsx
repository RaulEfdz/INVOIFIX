"use client";
// Este componente muestra tarjetas de resumen con gráficos de facturas
// que incluyen total de facturas, facturas pagadas y vencidas.
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";
import { FileText } from "lucide-react";
import {
  AnimatedDonutChart,
  type Item,
} from "../../../../../components/charts/Pie/PieChart";

export function SummaryCards() {
  // Datos de ejemplo para los últimos 6 meses y semanas por mes para cada tarjeta
  const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun"];

  const totalFacturasMeses: Item[] = [
    { name: "Ene", value: 15 },
    { name: "Feb", value: 20 },
    { name: "Mar", value: 25 },
    { name: "Abr", value: 10 },
    { name: "May", value: 20 },
    { name: "Jun", value: 10 },
  ];

  const totalFacturasSemanasPorMes: Record<string, Item[]> = {
    Ene: [
      { name: "Semana 1", value: 5 },
      { name: "Semana 2", value: 3 },
      { name: "Semana 3", value: 4 },
      { name: "Semana 4", value: 3 },
    ],
    Feb: [
      { name: "Semana 1", value: 6 },
      { name: "Semana 2", value: 5 },
      { name: "Semana 3", value: 4 },
      { name: "Semana 4", value: 5 },
    ],
    Mar: [
      { name: "Semana 1", value: 7 },
      { name: "Semana 2", value: 6 },
      { name: "Semana 3", value: 5 },
      { name: "Semana 4", value: 7 },
    ],
    Abr: [
      { name: "Semana 1", value: 3 },
      { name: "Semana 2", value: 2 },
      { name: "Semana 3", value: 3 },
      { name: "Semana 4", value: 2 },
    ],
    May: [
      { name: "Semana 1", value: 5 },
      { name: "Semana 2", value: 6 },
      { name: "Semana 3", value: 5 },
      { name: "Semana 4", value: 4 },
    ],
    Jun: [
      { name: "Semana 1", value: 2 },
      { name: "Semana 2", value: 3 },
      { name: "Semana 3", value: 2 },
      { name: "Semana 4", value: 3 },
    ],
  };

  const facturasPagadasMeses: Item[] = [
    { name: "Ene", value: 10 },
    { name: "Feb", value: 15 },
    { name: "Mar", value: 30 },
    { name: "Abr", value: 20 },
    { name: "May", value: 15 },
    { name: "Jun", value: 10 },
  ];

  const facturasPagadasSemanasPorMes: Record<string, Item[]> = {
    Ene: [
      { name: "Semana 1", value: 3 },
      { name: "Semana 2", value: 2 },
      { name: "Semana 3", value: 3 },
      { name: "Semana 4", value: 2 },
    ],
    Feb: [
      { name: "Semana 1", value: 4 },
      { name: "Semana 2", value: 5 },
      { name: "Semana 3", value: 6 },
      { name: "Semana 4", value: 5 },
    ],
    Mar: [
      { name: "Semana 1", value: 7 },
      { name: "Semana 2", value: 8 },
      { name: "Semana 3", value: 7 },
      { name: "Semana 4", value: 8 },
    ],
    Abr: [
      { name: "Semana 1", value: 5 },
      { name: "Semana 2", value: 4 },
      { name: "Semana 3", value: 5 },
      { name: "Semana 4", value: 6 },
    ],
    May: [
      { name: "Semana 1", value: 6 },
      { name: "Semana 2", value: 5 },
      { name: "Semana 3", value: 6 },
      { name: "Semana 4", value: 5 },
    ],
    Jun: [
      { name: "Semana 1", value: 3 },
      { name: "Semana 2", value: 4 },
      { name: "Semana 3", value: 3 },
      { name: "Semana 4", value: 4 },
    ],
  };

  const facturasVencidasMeses: Item[] = [
    { name: "Ene", value: 5 },
    { name: "Feb", value: 10 },
    { name: "Mar", value: 15 },
    { name: "Abr", value: 20 },
    { name: "May", value: 25 },
    { name: "Jun", value: 25 },
  ];

  const facturasVencidasSemanasPorMes: Record<string, Item[]> = {
    Ene: [
      { name: "Semana 1", value: 2 },
      { name: "Semana 2", value: 3 },
      { name: "Semana 3", value: 4 },
      { name: "Semana 4", value: 5 },
    ],
    Feb: [
      { name: "Semana 1", value: 5 },
      { name: "Semana 2", value: 6 },
      { name: "Semana 3", value: 7 },
      { name: "Semana 4", value: 8 },
    ],
    Mar: [
      { name: "Semana 1", value: 6 },
      { name: "Semana 2", value: 7 },
      { name: "Semana 3", value: 8 },
      { name: "Semana 4", value: 9 },
    ],
    Abr: [
      { name: "Semana 1", value: 3 },
      { name: "Semana 2", value: 4 },
      { name: "Semana 3", value: 5 },
      { name: "Semana 4", value: 6 },
    ],
    May: [
      { name: "Semana 1", value: 7 },
      { name: "Semana 2", value: 8 },
      { name: "Semana 3", value: 9 },
      { name: "Semana 4", value: 10 },
    ],
    Jun: [
      { name: "Semana 1", value: 4 },
      { name: "Semana 2", value: 5 },
      { name: "Semana 3", value: 6 },
      { name: "Semana 4", value: 7 },
    ],
  };

  // Datos totales de facturas por mes para mostrar en selector
  const totalFacturasPorMes: Record<string, number> = {
    Ene: 100,
    Feb: 120,
    Mar: 130,
    Abr: 90,
    May: 110,
    Jun: 95,
  };

  const facturasPagadasPorMes: Record<string, number> = {
    Ene: 80,
    Feb: 90,
    Mar: 100,
    Abr: 70,
    May: 85,
    Jun: 75,
  };

  const facturasVencidasPorMes: Record<string, number> = {
    Ene: 20,
    Feb: 30,
    Mar: 25,
    Abr: 20,
    May: 25,
    Jun: 20,
  };

  // Estados para el mes seleccionado para mostrar total facturas
  const [mesTotalFacturas, setMesTotalFacturas] = React.useState(meses[0]);
  const [mesTotalPagadas, setMesTotalPagadas] = React.useState(meses[0]);
  const [mesTotalVencidas, setMesTotalVencidas] = React.useState(meses[0]);

  // Estados para el mes seleccionado en cada tarjeta para semanas
  const [mesSeleccionadoTotal, setMesSeleccionadoTotal] = React.useState(
    meses[0]
  );
  const [mesSeleccionadoPagadas, setMesSeleccionadoPagadas] = React.useState(
    meses[0]
  );
  const [mesSeleccionadoVencidas, setMesSeleccionadoVencidas] = React.useState(
    meses[0]
  );

  return (
    <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Tarjeta Total de facturas */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-headline font-medium">
            Total de facturas
          </CardTitle>
          <FileText className="h-5 w-5 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="mb-2 flex items-center justify-between">
            <h4 className="text-sm font-semibold">Total en mes específico</h4>
            <select
              aria-label="Seleccionar mes para total de facturas"
              className="text-xs font-normal text-muted-foreground bg-transparent border border-muted-foreground rounded px-2 py-1"
              value={mesTotalFacturas}
              onChange={(e) => setMesTotalFacturas(e.target.value)}
            >
              {meses.map((mes) => (
                <option key={mes} value={mes}>
                  {mes}
                </option>
              ))}
            </select>
          </div>
          <div className="text-2xl font-bold mb-4">
            {totalFacturasPorMes[mesTotalFacturas].toLocaleString()}
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2">Por Mes</h4>
            <AnimatedDonutChart
              data={totalFacturasMeses}
              singleColor="purple"
            />
          </div>
          <div>
            <h4 className="text-sm font-semibold mt-4 mb-2 flex items-center justify-between">
              Por Semana
              <select
                aria-label="Seleccionar mes para semanas"
                className="text-xs font-normal text-muted-foreground bg-transparent border border-muted-foreground rounded px-2 py-1"
                value={mesSeleccionadoTotal}
                onChange={(e) => setMesSeleccionadoTotal(e.target.value)}
              >
                {meses.map((mes) => (
                  <option key={mes} value={mes}>
                    {mes}
                  </option>
                ))}
              </select>
            </h4>
            <AnimatedDonutChart
              data={totalFacturasSemanasPorMes[mesSeleccionadoTotal]}
              singleColor="blue"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tarjeta Facturas pagadas */}
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
          <div className="mb-2 flex items-center justify-between">
            <h4 className="text-sm font-semibold">Total en mes específico</h4>
            <select
              aria-label="Seleccionar mes para total de facturas pagadas"
              className="text-xs font-normal text-muted-foreground bg-transparent border border-muted-foreground rounded px-2 py-1"
              value={mesTotalPagadas}
              onChange={(e) => setMesTotalPagadas(e.target.value)}
            >
              {meses.map((mes) => (
                <option key={mes} value={mes}>
                  {mes}
                </option>
              ))}
            </select>
          </div>
          <div className="text-2xl font-bold mb-4">
            {facturasPagadasPorMes[mesTotalPagadas].toLocaleString()}
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2">Por Mes</h4>
            <AnimatedDonutChart
              data={facturasPagadasMeses}
              singleColor="fuchsia"
            />
          </div>
          <div>
            <h4 className="text-sm font-semibold mt-4 mb-2 flex items-center justify-between">
              Por Semana
              <select
                aria-label="Seleccionar mes para semanas"
                className="text-xs font-normal text-muted-foreground bg-transparent border border-muted-foreground rounded px-2 py-1"
                value={mesSeleccionadoPagadas}
                onChange={(e) => setMesSeleccionadoPagadas(e.target.value)}
              >
                {meses.map((mes) => (
                  <option key={mes} value={mes}>
                    {mes}
                  </option>
                ))}
              </select>
            </h4>
            <AnimatedDonutChart
              data={facturasPagadasSemanasPorMes[mesSeleccionadoPagadas]}
              singleColor="yellow"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tarjeta Facturas vencidas */}
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
          <div className="mb-2 flex items-center justify-between">
            <h4 className="text-sm font-semibold">Total en mes específico</h4>
            <select
              aria-label="Seleccionar mes para total de facturas vencidas"
              className="text-xs font-normal text-muted-foreground bg-transparent border border-muted-foreground rounded px-2 py-1"
              value={mesTotalVencidas}
              onChange={(e) => setMesTotalVencidas(e.target.value)}
            >
              {meses.map((mes) => (
                <option key={mes} value={mes}>
                  {mes}
                </option>
              ))}
            </select>
          </div>
          <div className="text-2xl font-bold mb-4">
            {facturasVencidasPorMes[mesTotalVencidas].toLocaleString()}
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2">Por Mes</h4>
            <AnimatedDonutChart
              data={facturasVencidasMeses}
              singleColor="blue"
            />
          </div>
          <div>
            <h4 className="text-sm font-semibold mt-4 mb-2 flex items-center justify-between">
              Por Semana
              <select
                aria-label="Seleccionar mes para semanas"
                className="text-xs font-normal text-muted-foreground bg-transparent border border-muted-foreground rounded px-2 py-1"
                value={mesSeleccionadoVencidas}
                onChange={(e) => setMesSeleccionadoVencidas(e.target.value)}
              >
                {meses.map((mes) => (
                  <option key={mes} value={mes}>
                    {mes}
                  </option>
                ))}
              </select>
            </h4>
            <AnimatedDonutChart
              data={facturasVencidasSemanasPorMes[mesSeleccionadoVencidas]}
              singleColor="yellow"
            />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
