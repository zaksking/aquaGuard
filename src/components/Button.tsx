import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  to?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
};

export default function Button({
  children,
  variant = "primary",
  to,
  onClick,
  type = "button",
  className,
  disabled,
  size = "md",
}: ButtonProps) {
  const base = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none",
    size === "sm" && "px-4 py-2 text-sm",
    size === "md" && "px-6 py-3",
    size === "lg" && "px-8 py-4 text-lg",
    variant === "primary" && "bg-brand-600 text-white shadow-lg shadow-brand-600/30 hover:bg-brand-700 hover:shadow-brand-700/40",
    variant === "secondary" && "border-2 border-brand-200 bg-white text-brand-700 hover:border-brand-400 hover:bg-brand-50",
    className
  );

  if (to) {
    return (
      <Link to={to} className={base} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={base}>
      {children}
    </button>
  );
}
