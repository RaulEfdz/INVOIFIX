"use client";
import React from "react";
import { MapPin, Star } from "lucide-react";

const statusColors = {
  active: "bg-green-500",
  busy: "bg-yellow-500",
  away: "bg-red-500",
};

const statusLabels = {
  active: "Activo",
  busy: "Ocupado",
  away: "Ausente",
};

const skillIcons: Record<string, { icon: JSX.Element; color: string }> = {
  React: {
    icon: (
      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
        R
      </div>
    ),
    color: "bg-blue-100 text-blue-700",
  },
  TypeScript: {
    icon: (
      <div className="w-5 h-5 rounded bg-blue-700 flex items-center justify-center text-white text-xs font-bold">
        TS
      </div>
    ),
    color: "bg-blue-100 text-blue-700",
  },
  "Next.js": {
    icon: (
      <div className="w-5 h-5 rounded bg-black flex items-center justify-center text-white text-xs font-bold">
        N
      </div>
    ),
    color: "bg-gray-100 text-gray-700",
  },
  Tailwind: {
    icon: (
      <div className="w-5 h-5 rounded bg-cyan-500 flex items-center justify-center text-white text-xs font-bold">
        T
      </div>
    ),
    color: "bg-cyan-100 text-cyan-700",
  },
  Figma: {
    icon: (
      <div className="w-5 h-5 rounded bg-pink-500 flex items-center justify-center text-white text-xs font-bold">
        F
      </div>
    ),
    color: "bg-pink-100 text-pink-700",
  },
  Photoshop: {
    icon: (
      <div className="w-5 h-5 rounded bg-blue-900 flex items-center justify-center text-white text-xs font-bold">
        Ps
      </div>
    ),
    color: "bg-blue-100 text-blue-700",
  },
  Illustrator: {
    icon: (
      <div className="w-5 h-5 rounded bg-orange-500 flex items-center justify-center text-white text-xs font-bold">
        Ai
      </div>
    ),
    color: "bg-orange-100 text-orange-700",
  },
  Prototyping: {
    icon: (
      <div className="w-5 h-5 rounded bg-purple-500 flex items-center justify-center text-white text-xs font-bold">
        P
      </div>
    ),
    color: "bg-purple-100 text-purple-700",
  },
  "Node.js": {
    icon: (
      <div className="w-5 h-5 rounded bg-green-600 flex items-center justify-center text-white text-xs font-bold">
        N
      </div>
    ),
    color: "bg-green-100 text-green-700",
  },
  Docker: {
    icon: (
      <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
        D
      </div>
    ),
    color: "bg-blue-100 text-blue-700",
  },
  AWS: {
    icon: (
      <div className="w-5 h-5 rounded bg-orange-600 flex items-center justify-center text-white text-xs font-bold">
        A
      </div>
    ),
    color: "bg-orange-100 text-orange-700",
  },
  MongoDB: {
    icon: (
      <div className="w-5 h-5 rounded bg-green-700 flex items-center justify-center text-white text-xs font-bold">
        M
      </div>
    ),
    color: "bg-green-100 text-green-700",
  },
  Python: {
    icon: (
      <div className="w-5 h-5 rounded bg-yellow-600 flex items-center justify-center text-white text-xs font-bold">
        Py
      </div>
    ),
    color: "bg-yellow-100 text-yellow-700",
  },
  TensorFlow: {
    icon: (
      <div className="w-5 h-5 rounded bg-orange-600 flex items-center justify-center text-white text-xs font-bold">
        TF
      </div>
    ),
    color: "bg-orange-100 text-orange-700",
  },
  SQL: {
    icon: (
      <div className="w-5 h-5 rounded bg-blue-800 flex items-center justify-center text-white text-xs font-bold">
        S
      </div>
    ),
    color: "bg-blue-100 text-blue-700",
  },
  Tableau: {
    icon: (
      <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
        T
      </div>
    ),
    color: "bg-blue-100 text-blue-700",
  },
};

interface Employee {
  id: number;
  name: string;
  role: string;
  specialization: string[];
  skills: string[];
  avatarUrl?: string;
  email?: string;
  phone?: string;
  location?: string;
  experience?: number;
  rating?: number;
  status?: "active" | "busy" | "away";
  department?: string;
  joinDate?: string;
}

interface EmployeeCardProps {
  employee: Employee;
  onSelect: (id: number) => void;
  isSelected: boolean;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  employee,
  onSelect,
  isSelected,
}) => {
  return (
    <div
      onClick={() => onSelect(employee.id)}
      className={`bg-white rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-1 ${
        isSelected ? "border-blue-500 shadow-lg" : "border-gray-200"
      }`}
      style={{ minHeight: "300px" }}
    >
      <div className="p-10">
        {/* Header with avatar and status */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={employee.avatarUrl}
                alt={`${employee.name} avatar`}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md mb-3"
              />
              <div
                className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${
                  statusColors[employee.status || "active"]
                }`}
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 whitespace-normal max-w-xs">
                {employee.name}
              </h3>
              <p className="text-base text-gray-700">{employee.role}</p>
              <div className="flex items-center space-x-2 mt-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {employee.location}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <div className="flex items-center space-x-3">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="text-base font-medium text-gray-700">
                {employee.rating}
              </span>
            </div>
            <span className="text-sm text-gray-500">
              {employee.experience} años exp.
            </span>
          </div>
        </div>

        {/* Specializations */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-3">
            {employee.specialization.map((spec) => (
              <span
                key={spec}
                className="bg-gradient-to-r from-blue-600 to-purple-700 text-white text-sm font-semibold px-4 py-2 rounded-full"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-3">
            {employee.skills.slice(0, 4).map((skill) => (
              <div
                key={skill}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-semibold ${
                  skillIcons[skill]?.color || "bg-gray-100 text-gray-700"
                }`}
                title={skill}
              >
                {skillIcons[skill]?.icon || (
                  <span className="w-4 h-4 bg-gray-400 rounded-full" />
                )}
                <span>{skill}</span>
              </div>
            ))}
            {employee.skills.length > 4 && (
              <div className="flex items-center justify-center w-10 h-7 bg-gray-100 rounded-lg">
                <span className="text-sm text-gray-600">
                  +{employee.skills.length - 4}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-3">
            <div
              className={`w-3 h-3 rounded-full ${
                statusColors[employee.status || "active"]
              }`}
            />
            <span className="text-gray-700">
              {statusLabels[employee.status || "active"]}
            </span>
          </div>
          <span className="text-gray-600">{employee.department}</span>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
