"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  id?: string;
}

export function Section({ children, className, id, ...props }: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id={id}
      className={cn("w-full pt-16 pb-24 md:pt-20 md:pb-32 min-h-[calc(100vh-80px)] flex flex-col items-center justify-center relative overflow-hidden", className)}
      {...props}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-6xl px-6 md:px-12 relative z-10"
      >
        {children}
      </motion.div>
    </section>
  );
}
