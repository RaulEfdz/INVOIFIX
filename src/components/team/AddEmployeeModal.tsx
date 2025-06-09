"use client";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { Step1 } from "./steps/Step1";
import { Step2 } from "./steps/Step2";
import { Step3 } from "./steps/Step3";

// Definimos el esquema de validación con Zod
const employeeSchema = z.object({
  name: z.string().min(3, "El nombre es requerido"),
  role: z.string().min(2, "El rol es requerido"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  location: z.string().optional(),
  joinDate: z.string().min(1, "La fecha de ingreso es requerida"),
  department: z.string().optional(),
  experience: z.coerce
    .number()
    .min(0, "La experiencia no puede ser negativa")
    .optional(),
  specialization: z.array(z.string()).optional(),
  skills: z.array(z.string()).min(1, "Añade al menos una habilidad"),
  status: z.enum(["active", "inactive"]).default("active"),
});

// Extraemos el tipo del esquema de Zod
type EmployeeFormData = z.infer<typeof employeeSchema>;

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newEmployee: any) => void;
}

const STEPS = [
  { id: 1, name: "Información Principal" },
  { id: 2, name: "Detalles de Contacto" },
  { id: 3, name: "Rol y Habilidades" },
];

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: "",
      role: "",
      email: "",
      joinDate: new Date().toISOString().split("T")[0],
      skills: [],
      specialization: [],
      status: "active",
    },
  });

  const { handleSubmit, trigger, reset } = methods;

  const handleNext = async () => {
    const fieldsToValidate: (keyof EmployeeFormData)[][] = [
      ["name", "role", "joinDate"],
      ["email", "phone", "location"],
      ["skills"],
    ];

    const isStepValid = await trigger(fieldsToValidate[currentStep]);
    if (isStepValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const processSubmit = async (data: EmployeeFormData) => {
    setIsSubmitting(true);
    // Simula una llamada a la API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Aquí puedes transformar la data si es necesario antes de enviarla
    const finalEmployeeData = {
      ...data,
      avatarUrl: `https://i.pravatar.cc/150?u=${data.email}`, // Generar avatar placeholder
      rating: 0, // Valor por defecto
    };

    onAdd(finalEmployeeData);
    setIsSubmitting(false);
    handleClose();
  };

  const handleClose = () => {
    reset();
    setCurrentStep(0);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl shadow-2xl max-w-lg w-full m-4"
          >
            <div className="p-6 relative">
              <button
                onClick={handleClose}
                aria-label="Cerrar"
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                Agregar Nuevo Integrante
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Paso {currentStep + 1} de {STEPS.length}:{" "}
                {STEPS[currentStep].name}
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
                <motion.div
                  className="bg-blue-600 h-2 rounded-full"
                  animate={{
                    width: `${((currentStep + 1) / STEPS.length) * 100}%`,
                  }}
                  transition={{ ease: "easeInOut", duration: 0.5 }}
                />
              </div>

              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(processSubmit)}
                  className="space-y-5"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ x: 30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -30, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {currentStep === 0 && <Step1 />}
                      {currentStep === 1 && <Step2 />}
                      {currentStep === 2 && <Step3 />}
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between items-center pt-4">
                    <button
                      type="button"
                      onClick={handlePrev}
                      disabled={currentStep === 0}
                      className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Atrás
                    </button>
                    {currentStep < STEPS.length - 1 && (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="px-6 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Siguiente
                      </button>
                    )}
                    {currentStep === STEPS.length - 1 && (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-400"
                      >
                        {isSubmitting ? "Guardando..." : "Agregar Integrante"}
                      </button>
                    )}
                  </div>
                </form>
              </FormProvider>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddEmployeeModal;
