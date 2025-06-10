"use client";
import React, { useState } from "react";
import { Settings, Pencil, Trash2, PlusCircle, Check, X } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";

interface RoleFunction {
  id: number;
  name: string;
  description: string;
  maxRequired?: number;
}

const initialRolesFunctions: RoleFunction[] = [
  {
    id: 1,
    name: "Administrador",
    description: "Acceso completo al sistema y configuración general.",
    maxRequired: 1,
  },
  {
    id: 2,
    name: "Líder de Proyecto",
    description: "Gestiona proyectos, equipos y asignación de tareas.",
    maxRequired: 2,
  },
  {
    id: 3,
    name: "Scrum Master",
    description: "Facilita la metodología ágil y remueve impedimentos.",
    maxRequired: 1,
  },
  {
    id: 4,
    name: "Desarrollador Backend",
    description: "Implementa lógica de negocio y APIs.",
    maxRequired: 5,
  },
  {
    id: 5,
    name: "Desarrollador Frontend",
    description: "Desarrolla interfaces de usuario y experiencia UX/UI.",
    maxRequired: 5,
  },
  {
    id: 6,
    name: "QA / Tester",
    description: "Realiza pruebas y asegura la calidad del software.",
    maxRequired: 3,
  },
  {
    id: 7,
    name: "DevOps",
    description: "Gestiona infraestructura, despliegues y CI/CD.",
    maxRequired: 2,
  },
  {
    id: 8,
    name: "Diseñador UI/UX",
    description: "Diseña la experiencia y apariencia visual del producto.",
    maxRequired: 2,
  },
  {
    id: 9,
    name: "Soporte Técnico",
    description: "Atiende incidencias y soporte a usuarios.",
    maxRequired: 2,
  },
  {
    id: 10,
    name: "Product Owner",
    description: "Define requerimientos y prioridades del producto.",
    maxRequired: 1,
  },
];

const RolesAndFunctionsPage: React.FC = () => {
  const [rolesFunctions, setRolesFunctions] = useState<RoleFunction[]>(
    initialRolesFunctions
  );
  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    maxRequired: 1,
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState({
    name: "",
    description: "",
    maxRequired: 1,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleConfig = () => {
    alert("Funcionalidad de configuración pendiente");
  };

  const handleAdd = () => {
    if (!newRole.name.trim()) return;
    setRolesFunctions([
      ...rolesFunctions,
      {
        id: Date.now(),
        name: newRole.name,
        description: newRole.description,
        maxRequired: Number(newRole.maxRequired) || 1,
      },
    ]);
    setNewRole({ name: "", description: "", maxRequired: 1 });
    setModalOpen(false);
  };

  const handleEdit = (rf: RoleFunction) => {
    setEditingId(rf.id);
    setEditData({
      name: rf.name,
      description: rf.description,
      maxRequired: rf.maxRequired ?? 1,
    });
    setEditModalOpen(true);
  };

  const handleEditSave = (id: number) => {
    setRolesFunctions(
      rolesFunctions.map((rf) => (rf.id === id ? { ...rf, ...editData } : rf))
    );
    setEditingId(null);
    setEditModalOpen(false);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditModalOpen(false);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      setRolesFunctions(rolesFunctions.filter((rf) => rf.id !== deleteId));
      setDeleteId(null);
    }
  };

  const cancelDelete = () => setDeleteId(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">
          Roles y Funciones
        </h1>
        <p className="text-gray-600">
          Gestiona los roles y funciones del sistema
        </p>
      </header>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Roles y Funciones existentes
          </h2>
          {/* Botón de Configuraciones (sin acción útil por ahora) */}
          <button
            disabled
            className="inline-flex items-center px-4 py-2 bg-indigo-300 text-white text-sm font-semibold rounded-md shadow-lg gap-2 opacity-60 cursor-not-allowed"
            aria-label="Configuraciones"
          >
            <Settings className="w-5 h-5 mr-2" />
            Configuraciones
          </button>
        </div>
        {/* Botón para abrir modal de agregar */}
        <div className="mb-6">
          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger asChild>
              <button
                className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-md shadow-lg gap-2"
                aria-label="Agregar rol o función"
              >
                <PlusCircle className="w-5 h-5" />
                Agregar
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agregar nuevo rol o función</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-4 py-2">
                <input
                  className="border rounded-md px-3 py-2"
                  placeholder="Nombre del rol o función"
                  value={newRole.name}
                  onChange={(e) =>
                    setNewRole({ ...newRole, name: e.target.value })
                  }
                />
                <textarea
                  className="border rounded-md px-3 py-2 min-h-[60px]"
                  placeholder="Descripción"
                  value={newRole.description}
                  onChange={(e) =>
                    setNewRole({ ...newRole, description: e.target.value })
                  }
                />
                <input
                  type="number"
                  min={1}
                  className="border rounded-md px-3 py-2"
                  placeholder="Máximo requeridos en la empresa"
                  value={newRole.maxRequired}
                  onChange={(e) =>
                    setNewRole({
                      ...newRole,
                      maxRequired: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <DialogFooter>
                <button
                  onClick={handleAdd}
                  className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-md gap-2"
                >
                  <PlusCircle className="w-5 h-5" />
                  Guardar
                </button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        {/* Modal de edición */}
        <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar rol o función</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-2">
              <input
                className="border rounded-md px-3 py-2"
                placeholder="Nombre del rol o función"
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
              />
              <textarea
                className="border rounded-md px-3 py-2 min-h-[60px]"
                placeholder="Descripción"
                value={editData.description}
                onChange={(e) =>
                  setEditData({ ...editData, description: e.target.value })
                }
              />
              <input
                type="number"
                min={1}
                className="border rounded-md px-3 py-2"
                placeholder="Máximo requeridos en la empresa"
                value={editData.maxRequired ?? 1}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    maxRequired: parseInt(e.target.value),
                  })
                }
              />
            </div>
            <DialogFooter>
              <button
                onClick={() => handleEditSave(editingId as number)}
                className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-md gap-2"
              >
                <Check className="w-5 h-5" />
                Guardar
              </button>
              <button
                onClick={handleEditCancel}
                className="inline-flex items-center px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 text-sm font-semibold rounded-md gap-2"
              >
                <X className="w-5 h-5" />
                Cancelar
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/* Modal de confirmación para eliminar */}
        <AlertDialog open={deleteId !== null} onOpenChange={cancelDelete}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Eliminar rol o función?</AlertDialogTitle>
            </AlertDialogHeader>
            <p>
              ¿Estás seguro de que deseas eliminar este rol o función? Esta
              acción no se puede deshacer.
            </p>
            <AlertDialogFooter>
              <button
                onClick={confirmDelete}
                className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-md gap-2"
              >
                <Trash2 className="w-5 h-5" />
                Eliminar
              </button>
              <button
                onClick={cancelDelete}
                className="inline-flex items-center px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 text-sm font-semibold rounded-md gap-2"
              >
                Cancelar
              </button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        {rolesFunctions.length === 0 ? (
          <p className="text-gray-500">No hay roles ni funciones creados.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {rolesFunctions.map((rf) => (
              <li
                key={rf.id}
                className="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center flex-1">
                  <div className="flex-1">
                    <p className="text-lg font-medium text-gray-900">
                      {rf.name}
                    </p>
                    <p className="text-gray-600">{rf.description}</p>
                    <p className="text-gray-500 text-sm">
                      Máximo requeridos:{" "}
                      <span className="font-semibold">
                        {rf.maxRequired ?? 1}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    <button
                      onClick={() => handleEdit(rf)}
                      className="text-indigo-600 hover:text-indigo-800 p-1"
                      aria-label="Editar"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(rf.id)}
                      className="text-red-600 hover:text-red-800 p-1"
                      aria-label="Eliminar"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RolesAndFunctionsPage;
