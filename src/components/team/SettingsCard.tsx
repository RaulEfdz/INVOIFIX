"use client";
import React from "react";
import RoleManagementButton from "./RoleManagementButton";

interface SettingsCardProps {
  onManageRoles: () => void;
  // Puedes agregar más props para otras configuraciones si es necesario
}

const SettingsCard: React.FC<SettingsCardProps> = ({ onManageRoles }) => {
  return (
    <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl shadow-lg border border-green-200 p-8 mb-8 hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-xl font-bold text-green-900 mb-6 tracking-wide">
        Configuraciones
      </h3>
      <RoleManagementButton />
      {/* Aquí puedes agregar más botones para otras configuraciones */}
    </div>
  );
};

export default SettingsCard;
