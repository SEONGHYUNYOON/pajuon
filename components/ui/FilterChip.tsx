"use client";

interface FilterChipProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export default function FilterChip({ label, isActive, onClick }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
        isActive
          ? "bg-paju-blue text-white"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {label}
    </button>
  );
}

