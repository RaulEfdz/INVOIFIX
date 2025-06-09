"use client";
import React from "react";
import { Input } from "../Input";

export const Step1: React.FC = () => (
  <div className="space-y-4">
    <Input name="name" label="Nombre Completo" placeholder="Ej. Ana García" />
    <Input name="role" label="Rol" placeholder="Ej. Desarrollador Frontend" />
    <Input name="joinDate" label="Fecha de Ingreso" type="date" />
  </div>
);
