"use client";
import React from "react";
import { useFormContext } from "react-hook-form";

type InputProps = {
  label: string;
  name: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<InputProps> = ({ label, name, ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors[name];

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        id={name}
        {...register(name)}
        {...props}
        className={`mt-1 block w-full border rounded-md p-2.5 text-gray-800 shadow-sm
          ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          }`}
      />
      {error && (
        <p className="mt-1 text-xs text-red-600">{String(error.message)}</p>
      )}
    </div>
  );
};
