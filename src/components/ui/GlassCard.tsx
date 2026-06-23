"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={cn(
        "glass rounded-2xl p-6 relative overflow-hidden group",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-[rgba(255,255,255,0.05)] before:to-transparent before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100",
        className
      )}
    >
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
