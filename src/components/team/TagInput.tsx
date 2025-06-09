"use client";
import React, { useState, KeyboardEvent } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { X } from "lucide-react";

interface TagInputProps {
  name: string;
  label: string;
}

export const TagInput: React.FC<TagInputProps> = ({ name, label }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [inputValue, setInputValue] = useState("");
  const error = errors[name];

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={[]}
      render={({ field }) => {
        const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter" && inputValue.trim()) {
            e.preventDefault();
            if (!field.value.includes(inputValue.trim())) {
              field.onChange([...field.value, inputValue.trim()]);
            }
            setInputValue("");
          }
        };

        const removeTag = (tagToRemove: string) => {
          field.onChange(
            field.value.filter((tag: string) => tag !== tagToRemove)
          );
        };

        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {label}
            </label>
            <div
              className={`flex flex-wrap items-center gap-2 p-2 border rounded-md ${
                error ? "border-red-500" : "border-gray-300"
              }`}
            >
              {field.value.map((tag: string) => (
                <div
                  key={tag}
                  className="flex items-center gap-1 bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded-full"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                    aria-label={`Eliminar etiqueta ${tag}`}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-grow bg-transparent focus:outline-none p-1"
                placeholder="Añadir..."
              />
            </div>
            {error && (
              <p className="mt-1 text-xs text-red-600">
                {String(error.message)}
              </p>
            )}
          </div>
        );
      }}
    />
  );
};
