"use client";

import { useState } from "react";
import Image from "next/image";

interface ProjectThumbnailProps {
  src: string;
  alt: string;
  title: string;
  tech?: string[];
  className?: string;
  fill?: boolean;
}

export function ProjectThumbnail({ src, alt, title, tech = [], className = "", fill = true }: ProjectThumbnailProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div className={`relative w-full h-full bg-gradient-to-br from-[#1A1A1A] via-[#0A0A0A] to-[#F37512]/10 overflow-hidden flex flex-col items-center justify-center p-6 text-center ${className}`}>
        {/* Decorative background blur */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#F37512]/20 blur-[60px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 blur-[50px] rounded-full pointer-events-none" />

        {/* Content */}
        <h3 className="relative z-10 text-xl md:text-2xl lg:text-3xl font-heading font-bold text-white mb-3 tracking-wide drop-shadow-md capitalize">
          {title}
        </h3>

        {tech.length > 0 && (
          <div className="relative z-10 flex flex-wrap justify-center gap-1.5 mt-2 opacity-80">
            {tech.slice(0, 3).map((t, idx) => (
              <span key={idx} className="text-[10px] sm:text-xs font-mono text-[#F37512] bg-[#F37512]/10 border border-[#F37512]/20 px-2 py-0.5 rounded-full">
                {t}
              </span>
            ))}
            {tech.length > 3 && (
              <span className="text-[10px] sm:text-xs font-mono text-white/50 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                +{tech.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={`object-cover ${className}`}
      onError={() => setHasError(true)}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
}
