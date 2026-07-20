"use client";

import { type ReactNode } from "react";
import { motion } from "motion/react";
import { useMagnetic } from "@/hooks/useMagnetic";

interface MagneticButtonProps {
  variant?: "primary" | "secondary";
  icon?: ReactNode;
  iconPosition?: "leading" | "trailing";
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  "aria-label"?: string;
}

export function MagneticButton({
  variant = "primary",
  icon,
  iconPosition = "trailing",
  children,
  className = "",
  type = "button",
  onClick,
  ...buttonProps
}: MagneticButtonProps) {
  const { ref, x, y, onPointerMove, onPointerLeave } = useMagnetic<HTMLButtonElement>({
    range: variant === "primary" ? 14 : 10,
  });

  const base =
    "group relative inline-flex items-center gap-2.5 rounded-full font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A47C8]";
  const variants = {
    primary:
      "bg-[#1A47C8] text-white px-[clamp(1.25rem,2vw,1.6rem)] py-[clamp(0.7rem,1.4vw,0.9rem)] text-[clamp(0.85rem,1vw,0.95rem)] shadow-[0_14px_30px_-10px_rgba(26,71,200,0.55)] hover:bg-[#15379e]",
    secondary:
      "bg-transparent text-[#0a1128] px-[clamp(1.1rem,1.8vw,1.4rem)] py-[clamp(0.65rem,1.3vw,0.85rem)] text-[clamp(0.85rem,1vw,0.95rem)] ring-1 ring-[#0a1128]/15 hover:ring-[#0a1128]/30",
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ x, y }}
      whileTap={{ scale: 0.94 }}
      className={`group ${base} ${variants[variant]} ${className}`}
      {...buttonProps}
    >
      {icon && iconPosition === "leading" ? (
        <span className="inline-flex transition-transform duration-300 group-hover:-translate-x-0.5">
          {icon}
        </span>
      ) : null}
      <span>{children}</span>
      {icon && iconPosition === "trailing" ? (
        <span className="inline-flex transition-transform duration-300 group-hover:translate-x-1">
          {icon}
        </span>
      ) : null}
    </motion.button>
  );
}
