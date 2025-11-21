"use client";

import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export default function PageHeader({
  title,
  description,
  icon,
  action,
}: PageHeaderProps) {
  return (
    <div className="bg-gray-50 rounded-xl p-8 mb-8 border border-gray-100">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          {icon && <div className="text-paju-blue">{icon}</div>}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
            {description && <p className="text-lg text-gray-600">{description}</p>}
          </div>
        </div>
        {action && <div>{action}</div>}
      </div>
    </div>
  );
}

