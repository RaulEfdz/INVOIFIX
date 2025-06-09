"use client";
import React from "react";
import { Input } from "../Input";
import { TagInput } from "../TagInput";

export const Step3: React.FC = () => (
  <div className="space-y-4">
    <TagInput name="skills" label="Habilidades (Presiona Enter para agregar)" />
    <TagInput name="specialization" label="Especializaciones (Opcional)" />
    <Input
      name="department"
      label="Departamento (Opcional)"
      placeholder="Ej. Innovación y Desarrollo"
    />
  </div>
);
