"use client";
import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  Star,
  TrendingUp,
} from "lucide-react";

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

interface EmployeeDetailProps {
  employee: Employee;
}

const EmployeeDetail: React.FC<EmployeeDetailProps> = ({ employee }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <img
          src={employee.avatarUrl}
          alt={employee.name}
          className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-100"
        />
        <h2 className="text-2xl font-bold text-gray-900">{employee.name}</h2>
        <p className="text-lg text-gray-600">{employee.role}</p>
        <div className="flex items-center justify-center space-x-2 mt-2">
          <div
            className={`w-3 h-3 rounded-full ${
              statusColors[employee.status || "active"]
            }`}
          />
          <span className="text-sm text-gray-600">
            {statusLabels[employee.status || "active"]}
          </span>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
        <h3 className="font-semibold text-gray-900 mb-3">
          Información de Contacto
        </h3>
        <div className="flex items-center space-x-3">
          <Mail className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-700">{employee.email}</span>
        </div>
        <div className="flex items-center space-x-3">
          <Phone className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-700">{employee.phone}</span>
        </div>
        <div className="flex items-center space-x-3">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-700">{employee.location}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <TrendingUp className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-blue-900">
            {employee.experience}
          </div>
          <div className="text-sm text-blue-700">Años de Experiencia</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 text-center">
          <Star className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-yellow-900">
            {employee.rating}
          </div>
          <div className="text-sm text-yellow-700">Calificación</div>
        </div>
      </div>

      {/* Skills */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">
          Habilidades Técnicas
        </h3>
        <div className="space-y-2">
          {employee.skills.map((skill) => (
            <div
              key={skill}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                skillIcons[skill]?.color || "bg-gray-100 text-gray-700"
              }`}
            >
              {skillIcons[skill]?.icon || (
                <span className="w-4 h-4 bg-gray-400 rounded-full" />
              )}
              <span className="text-sm font-medium">{skill}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-3">
          Información Adicional
        </h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700">
              Se unió el{" "}
              {new Date(employee.joinDate || "").toLocaleDateString("es-ES")}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <Users className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700">
              Departamento: {employee.department}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
