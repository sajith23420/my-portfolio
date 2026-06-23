"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "outline";
  className?: string;
  onClick?: () => void;
}

export function Button({ children, className, variant = "primary", onClick }: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative px-8 py-3 rounded-full font-medium tracking-wide overflow-hidden group transition-colors duration-300",
        variant === "primary"
          ? "bg-[#F37512] text-black hover:bg-[#ff8f36]"
          : "bg-transparent border border-[rgba(255,255,255,0.2)] text-white hover:border-[#F37512] hover:text-[#F37512]",
        className
      )}
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>
      {variant === "primary" && (
        <span className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-in-out z-0" />
      )}
    </motion.button>
  );
}
