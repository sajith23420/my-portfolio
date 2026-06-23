"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  const [entered, setEntered] = useState(false);

  return (
    <>
      {/* ═══ INTRO SCREEN ═══ */}
      <AnimatePresence>
        {!entered && (
          <motion.div
            key="intro"
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]"
          >
            {/* Subtle animated grid */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(243,117,18,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(243,117,18,0.4) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />

            {/* Centered glow */}
            <div className="absolute w-[400px] h-[400px] bg-[#F37512]/10 rounded-full blur-[150px] pointer-events-none" />

            {/* Brand */}
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm tracking-[0.3em] uppercase text-white/30 font-mono mb-8"
            >
              Sajith Bandara
            </motion.p>

            {/* Enter Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setEntered(true)}
              className="group relative px-10 py-4 rounded-full text-sm font-semibold tracking-[0.15em] uppercase text-[#050505] bg-[#F37512] shadow-[0_0_40px_rgba(243,117,18,0.3)] hover:shadow-[0_0_60px_rgba(243,117,18,0.5)] transition-shadow duration-500"
            >
              {/* Glow ring on hover */}
              <span className="absolute inset-0 rounded-full border border-[#F37512]/0 group-hover:border-[#F37512]/40 scale-110 transition-all duration-500" />
              Enter Portfolio
            </motion.button>

            {/* Subtle bottom hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="absolute bottom-10 text-[10px] tracking-[0.2em] uppercase text-white/15 font-mono"
            >
              Click to begin experience
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ PORTFOLIO ═══ */}
      <main className="flex min-h-screen flex-col w-full selection:bg-accent/30 selection:text-white">
        <Hero entered={entered} />
        <div className="relative z-10">
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </div>

        {/* Footer */}
        <footer className="relative z-10 py-8 text-center text-[rgba(255,255,255,0.4)] text-sm border-t border-[rgba(255,255,255,0.05)]">
          <p>© {new Date().getFullYear()} Sajith Bandara. All rights reserved.</p>
        </footer>
      </main>
    </>
  );
}
