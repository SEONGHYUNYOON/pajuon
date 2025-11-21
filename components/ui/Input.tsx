"use client";

import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Input({ label, error, helperText, className = "", ...props }: InputProps) {
  const baseStyles = "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all";
  const errorStyles = error ? "border-red-300 focus:ring-red-500" : "border-gray-300";
  const combinedClassName = `${baseStyles} ${errorStyles} ${className}`;

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {props.required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input className={combinedClassName} {...props} />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
}

export function Textarea({ label, error, helperText, className = "", ...props }: TextareaProps) {
  const baseStyles = "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none";
  const errorStyles = error ? "border-red-300 focus:ring-red-500" : "border-gray-300";
  const combinedClassName = `${baseStyles} ${errorStyles} ${className}`;

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {props.required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea className={combinedClassName} {...props} />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
}

