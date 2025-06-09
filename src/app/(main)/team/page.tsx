"use client";
import React, { useState, useMemo } from "react";
import {
  Search,
  Users,
  Award,
  Grid3X3,
  List,
  Star,
  MapPin,
  Mail,
  Phone,
  Calendar,
  TrendingUp,
} from "lucide-react";
import EmployeeCard from "../../../components/team/EmployeeCard";
import EmployeeDetail from "../../../components/team/EmployeeDetail";
import AddEmployeeButton from "../../../components/team/AddEmployeeButton";
import AddEmployeeModal from "../../../components/team/AddEmployeeModal";
import RoleManagementButton from "../../../components/team/RoleManagementButton";
import SettingsCard from "../../../components/team/SettingsCard";

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

const employeesData: Employee[] = [
  {
    id: 1,
    name: "Alicia Martínez",
    role: "Desarrollador Senior",
    specialization: ["Frontend", "React"],
    skills: ["React", "TypeScript", "Next.js", "Tailwind"],
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    email: "alicia.martinez@company.com",
    phone: "+1 (555) 123-4567",
    location: "Madrid, España",
    experience: 5,
    rating: 4.8,
    status: "active",
    department: "Desarrollo",
    joinDate: "2019-03-15",
  },
  {
    id: 2,
    name: "Roberto Silva",
    role: "Diseñador UX/UI",
    specialization: ["UI/UX", "Branding"],
    skills: ["Figma", "Photoshop", "Illustrator", "Prototyping"],
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    email: "roberto.silva@company.com",
    phone: "+1 (555) 234-5678",
    location: "Barcelona, España",
    experience: 4,
    rating: 4.9,
    status: "busy",
    department: "Diseño",
    joinDate: "2020-07-22",
  },
  {
    id: 3,
    name: "Carlos Rodríguez",
    role: "Administrador de Sistemas",
    specialization: ["Backend", "DevOps"],
    skills: ["Node.js", "Docker", "AWS", "MongoDB"],
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    email: "carlos.rodriguez@company.com",
    phone: "+1 (555) 345-6789",
    location: "Valencia, España",
    experience: 7,
    rating: 4.7,
    status: "active",
    department: "Infraestructura",
    joinDate: "2017-11-08",
  },
  {
    id: 4,
    name: "María González",
    role: "Data Scientist",
    specialization: ["Machine Learning", "Analytics"],
    skills: ["Python", "TensorFlow", "SQL", "Tableau"],
    avatarUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    email: "maria.gonzalez@company.com",
    phone: "+1 (555) 456-7890",
    location: "Sevilla, España",
    experience: 3,
    rating: 4.6,
    status: "away",
    department: "Datos",
    joinDate: "2021-01-12",
  },
];

const departments = [
  "Todos",
  "Desarrollo",
  "Diseño",
  "Infraestructura",
  "Datos",
];

const statusColors: Record<string, string> = {
  active: "bg-green-500",
  busy: "bg-yellow-500",
  away: "bg-red-500",
};

const statusLabels: Record<string, string> = {
  active: "Activo",
  busy: "Ocupado",
  away: "Ausente",
};

const skillIcons: Record<string, { icon: JSX.Element; color: string }> = {
  React: {
    icon: (
      <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
        R
      </div>
    ),
    color: "bg-blue-100 text-blue-700",
  },
  TypeScript: {
    icon: (
      <div className="w-4 h-4 rounded bg-blue-700 flex items-center justify-center text-white text-xs font-bold">
        TS
      </div>
    ),
    color: "bg-blue-100 text-blue-700",
  },
  "Next.js": {
    icon: (
      <div className="w-4 h-4 rounded bg-black flex items-center justify-center text-white text-xs font-bold">
        N
      </div>
    ),
    color: "bg-gray-100 text-gray-700",
  },
  Tailwind: {
    icon: (
      <div className="w-4 h-4 rounded bg-cyan-500 flex items-center justify-center text-white text-xs font-bold">
        T
      </div>
    ),
    color: "bg-cyan-100 text-cyan-700",
  },
  Figma: {
    icon: (
      <div className="w-4 h-4 rounded bg-pink-500 flex items-center justify-center text-white text-xs font-bold">
        F
      </div>
    ),
    color: "bg-pink-100 text-pink-700",
  },
  Photoshop: {
    icon: (
      <div className="w-4 h-4 rounded bg-blue-900 flex items-center justify-center text-white text-xs font-bold">
        Ps
      </div>
    ),
    color: "bg-blue-100 text-blue-700",
  },
  Illustrator: {
    icon: (
      <div className="w-4 h-4 rounded bg-orange-500 flex items-center justify-center text-white text-xs font-bold">
        Ai
      </div>
    ),
    color: "bg-orange-100 text-orange-700",
  },
  Prototyping: {
    icon: (
      <div className="w-4 h-4 rounded bg-purple-500 flex items-center justify-center text-white text-xs font-bold">
        P
      </div>
    ),
    color: "bg-purple-100 text-purple-700",
  },
  "Node.js": {
    icon: (
      <div className="w-4 h-4 rounded bg-green-600 flex items-center justify-center text-white text-xs font-bold">
        N
      </div>
    ),
    color: "bg-green-100 text-green-700",
  },
  Docker: {
    icon: (
      <div className="w-4 h-4 rounded bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
        D
      </div>
    ),
    color: "bg-blue-100 text-blue-700",
  },
  AWS: {
    icon: (
      <div className="w-4 h-4 rounded bg-orange-600 flex items-center justify-center text-white text-xs font-bold">
        A
      </div>
    ),
    color: "bg-orange-100 text-orange-700",
  },
  MongoDB: {
    icon: (
      <div className="w-4 h-4 rounded bg-green-700 flex items-center justify-center text-white text-xs font-bold">
        M
      </div>
    ),
    color: "bg-green-100 text-green-700",
  },
  Python: {
    icon: (
      <div className="w-4 h-4 rounded bg-yellow-600 flex items-center justify-center text-white text-xs font-bold">
        Py
      </div>
    ),
    color: "bg-yellow-100 text-yellow-700",
  },
  TensorFlow: {
    icon: (
      <div className="w-4 h-4 rounded bg-orange-600 flex items-center justify-center text-white text-xs font-bold">
        TF
      </div>
    ),
    color: "bg-orange-100 text-orange-700",
  },
  SQL: {
    icon: (
      <div className="w-4 h-4 rounded bg-blue-800 flex items-center justify-center text-white text-xs font-bold">
        S
      </div>
    ),
    color: "bg-blue-100 text-blue-700",
  },
  Tableau: {
    icon: (
      <div className="w-4 h-4 rounded bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
        T
      </div>
    ),
    color: "bg-blue-100 text-blue-700",
  },
};

const TeamManagementPage: React.FC = () => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("Todos");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showDetail, setShowDetail] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>(employeesData);

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch =
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.skills.some((skill) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesDepartment =
        selectedDepartment === "Todos" ||
        employee.department === selectedDepartment;

      return matchesSearch && matchesDepartment;
    });
  }, [searchTerm, selectedDepartment, employees]);

  const selectedEmployee = employees.find(
    (emp) => emp.id === selectedEmployeeId
  );

  const handleEmployeeSelect = (id: number) => {
    setSelectedEmployeeId(id);
    setShowDetail(true);
  };

  const handleAddEmployee = (newEmployee: Employee) => {
    setEmployees((prev) => [
      ...prev,
      {
        ...newEmployee,
        id: prev.length > 0 ? prev[prev.length - 1].id + 1 : 1,
      },
    ]);
    setSelectedEmployeeId(employees.length + 1);
    setShowAddModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Mobile Detail Modal */}
      {showDetail && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="bg-white h-full overflow-y-auto">
            <div className="p-4">
              <EmployeeDetail employee={selectedEmployee} />
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Administración del Equipo
              </h1>
              <p className="text-gray-600 mt-1">
                Gestiona y visualiza tu equipo de trabajo
              </p>
            </div>
            <div className="mt-3 sm:mt-0">
              <div className="bg-blue-50 px-3 py-2 rounded-lg inline-flex items-center space-x-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">
                  {employees.length} Empleados
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6 w-full mx-auto">
          {/* Sidebar */}
          <aside className="w-full lg:w-80 bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6 h-fit">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Filtros
            </h2>

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar empleados..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Department Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Departamento
              </label>
              <select
                aria-label="Selecciona un departamento"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Department Stats */}
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-3">
                Estadísticas por Departamento
              </h3>
              <div className="space-y-2">
                {departments.slice(1).map((dept) => {
                  const count = employees.filter(
                    (emp) => emp.department === dept
                  ).length;
                  return (
                    <div
                      key={dept}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                    >
                      <span className="text-sm font-medium text-gray-700">
                        {dept}
                      </span>
                      <span className="text-sm font-bold text-blue-600">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Settings Card */}
            <div className="mt-6">
              <SettingsCard
                onManageRoles={() =>
                  alert("Funcionalidad para gestionar roles pendiente")
                }
              />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3 sm:mb-0">
                Empleados ({filteredEmployees.length})
              </h2>
              <div className="flex items-center space-x-2">
                <AddEmployeeButton onClick={() => setShowAddModal(true)} />
                <button
                  onClick={() => setViewMode("grid")}
                  title="Vista de cuadrícula"
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  title="Vista de lista"
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list"
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div
              className={`${
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4"
                  : "space-y-3"
              }`}
            >
              {filteredEmployees.map((employee) => (
                <EmployeeCard
                  key={employee.id}
                  employee={employee}
                  onSelect={handleEmployeeSelect}
                  isSelected={selectedEmployeeId === employee.id}
                />
              ))}
            </div>

            {filteredEmployees.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  No se encontraron empleados que coincidan con los filtros.
                </p>
              </div>
            )}
          </main>

          {/* Detail Panel - Desktop */}
          <aside className="hidden lg:block w-96 bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-fit sticky top-6">
            {selectedEmployee ? (
              <EmployeeDetail employee={selectedEmployee} />
            ) : (
              <div className="text-center text-gray-500 py-12">
                <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-400 mb-2">
                  Selecciona un empleado
                </p>
                <p className="text-sm text-gray-400">
                  Haz clic en cualquier tarjeta para ver los detalles completos
                </p>
              </div>
            )}
          </aside>
        </div>
      </div>
      <AddEmployeeModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddEmployee}
      />
    </div>
  );
};

export default TeamManagementPage;
