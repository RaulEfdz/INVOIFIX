"use client";

import React, { useState } from "react";
import { UserRole } from "../../../types";

const roles: UserRole[] = [
  "Administrator",
  "Billing",
  "Technician",
  "Client",
  "Scrum",
  "Project Leader",
  "Programmer",
  "QA",
];

const RolesSliderPage: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedIndex(parseInt(event.target.value, 10));
  };

  return (
    <div className="p-8 max-w-xl mx-auto rounded-lg shadow-lg bg-white">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-blue-700">
        Select a Role
      </h1>
      <input
        type="range"
        min={0}
        max={roles.length - 1}
        value={selectedIndex}
        onChange={handleChange}
        step={1}
        className="w-full accent-blue-600"
      />
      <div className="flex justify-between mt-6 text-sm font-semibold text-gray-600 select-none">
        {roles.map((role, index) => (
          <span
            key={role}
            className={`cursor-pointer transition-colors duration-200 ${
              index === selectedIndex
                ? "text-blue-700 font-bold"
                : "text-gray-400 hover:text-blue-500"
            }`}
            onClick={() => setSelectedIndex(index)}
          >
            {role}
          </span>
        ))}
      </div>
      <div className="mt-10 text-center text-xl font-semibold text-gray-800">
        Selected Role:{" "}
        <span className="text-blue-700">{roles[selectedIndex]}</span>
      </div>
    </div>
  );
};

export default RolesSliderPage;
