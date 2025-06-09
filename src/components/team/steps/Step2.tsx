"use client";
import React from "react";
import { Input } from "../Input";

export const Step2: React.FC = () => (
  <div className="space-y-4">
    <Input
      name="email"
      label="Correo Electrónico"
      type="email"
      placeholder="ana.garcia@ejemplo.com"
    />
    <Input
      name="phone"
      label="Teléfono (Opcional)"
      type="tel"
      placeholder="+507 6123-4567"
    />
    <Input
      name="location"
      label="Ubicación (Opcional)"
      placeholder="Ciudad, País"
    />
  </div>
);
