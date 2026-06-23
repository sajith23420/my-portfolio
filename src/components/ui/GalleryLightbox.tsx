"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import Image from "next/image";

export function GalleryLightbox({ images }: { images: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setIsOpen(false);
    document.body.style.overflow = "unset";
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((src, idx) => (
          <div 
            key={idx}
            onClick={() => openLightbox(idx)}
            className="group relative w-full aspect-video bg-[#111] rounded-xl overflow-hidden cursor-pointer border border-white/5 hover:border-accent/40 transition-colors"
          >
            <Image 
              src={src} 
              alt={`Screenshot ${idx + 1}`} 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
              <Maximize2 className="text-white drop-shadow-md" size={24} />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]/95 backdrop-blur-md p-4 md:p-12"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors z-50"
              onClick={closeLightbox}
            >
              <X size={24} />
            </button>

            {/* Prev Button */}
            {images.length > 1 && (
              <button 
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-accent bg-[#0A0A0A] border border-white/10 hover:border-accent/50 p-3 rounded-full transition-all z-50 hover:scale-110 shadow-lg"
                onClick={prevImage}
              >
                <ChevronLeft size={24} />
              </button>
            )}

            {/* Main Image Container */}
            <motion.div 
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: -20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-6xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <Image 
                src={images[currentIndex]} 
                alt={`Screenshot ${currentIndex + 1}`}
                fill
                className="object-contain bg-[#0A0A0A]"
                priority
              />
            </motion.div>

            {/* Next Button */}
            {images.length > 1 && (
              <button 
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-accent bg-[#0A0A0A] border border-white/10 hover:border-accent/50 p-3 rounded-full transition-all z-50 hover:scale-110 shadow-lg"
                onClick={nextImage}
              >
                <ChevronRight size={24} />
              </button>
            )}

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 font-mono text-sm tracking-widest bg-[#0A0A0A]/80 px-4 py-2 rounded-full border border-white/5">
              {currentIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
