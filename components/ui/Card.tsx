"use client";

import { ReactNode } from "react";
import Link from "next/link";

interface CardProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export default function Card({
  children,
  href,
  onClick,
  className = "",
  hover = true,
  padding = "md",
}: CardProps) {
  const baseStyles = "bg-white rounded-xl shadow-sm border border-gray-100";
  const hoverStyle = hover ? "hover:shadow-md hover:-translate-y-1 transition-all duration-300" : "";
  const paddingStyle = paddingStyles[padding];
  
  const combinedClassName = `${baseStyles} ${hoverStyle} ${paddingStyle} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClassName} onClick={onClick}>
        {children}
      </Link>
    );
  }

  if (onClick) {
    return (
      <div className={`${combinedClassName} cursor-pointer`} onClick={onClick}>
        {children}
      </div>
    );
  }

  return <div className={combinedClassName}>{children}</div>;
}

