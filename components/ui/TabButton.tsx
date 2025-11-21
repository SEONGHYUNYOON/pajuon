"use client";

import { ReactNode } from "react";

interface TabButtonProps {
  id: string;
  label: string;
  icon?: ReactNode;
  isActive: boolean;
  onClick: () => void;
}

export default function TabButton({
  id,
  label,
  icon,
  isActive,
  onClick,
}: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
        isActive
          ? "bg-paju-blue text-white shadow-md"
          : "bg-gray-100 text-gray-500 hover:text-gray-700 hover:bg-gray-200"
      }`}
    >
      {icon && <span>{icon}</span>}
      <span>{label}</span>
    </button>
  );
}

