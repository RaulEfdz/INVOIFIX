"use client";
import React from "react";
import { useRouter } from "next/navigation";

const RoleManagementButton: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/RandF");
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center px-5 py-3 border border-transparent text-base font-semibold rounded-lg shadow-md text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 transform hover:scale-105"
      type="button"
      aria-label="Gestionar Roles y Funciones"
    >
      <svg
        className="w-6 h-6 mr-3 text-white drop-shadow-md"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M12 12a4 4 0 100-8 4 4 0 000 8z"
        />
      </svg>
      Gestionar Roles y Funciones
    </button>
  );
};

export default RoleManagementButton;
