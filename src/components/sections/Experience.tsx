"use client";

import { Section } from "@/components/ui/Section";
import { EXPERIENCE_DATA } from "@/lib/data";
import { motion } from "framer-motion";

export function Experience() {
  return (
    <Section id="experience" className="overflow-hidden">

      {/* ─── TITLE SECTION ─── */}
      <div className="text-center mb-10 relative z-10">
        <h2 className="text-4xl md:text-5xl font-heading font-black mb-1 tracking-tight text-white">
          My <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F37512] to-[#ffaa5c]">Experience</span>
        </h2>
      </div>

      {/* ─── MAIN CONTAINER (SPLIT LAYOUT) ─── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col lg:flex-row gap-12 lg:gap-16 relative">

        {/* ─── LEFT SIDE: STICKY IMAGE ─── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full lg:w-5/12 lg:sticky lg:top-32 h-fit"
        >
          <div className="relative w-full max-w-[380px] mx-auto lg:mx-0 aspect-[4/5] group">

            <div className="absolute inset-0 bg-[#F37512]/20 rounded-[2.5rem] blur-[60px] group-hover:bg-[#F37512]/40 transition-colors duration-700 -z-10" />


            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden">
              <img
                src="/profile.png"
                alt="Sajitha Bandara"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent opacity-80" />

              {/* Image Overlay Text */}
              <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] md:text-xs font-medium text-white/80 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F37512] animate-pulse" />

                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white font-heading"></h3>
              </div>
            </div>
          </div>
        </motion.div>


        {/* ─── RIGHT SIDE: TIMELINE CARDS ─── */}
        <div className="w-full lg:w-7/12 relative">

          {/* Timeline Vertical Line */}
          <div className="absolute left-[19px] md:left-[23px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#F37512]/40 to-transparent z-0" />

          {EXPERIENCE_DATA.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative flex items-start mb-6 last:mb-0 group"
            >
              {/* Timeline Dot */}
              <div className="absolute left-[11px] md:left-[14px] top-5 w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#09090b] border-[2px] md:border-[3px] border-[#F37512] shadow-[0_0_10px_rgba(243,117,18,0.5)] group-hover:scale-125 transition-transform duration-300 flex items-center justify-center z-10">
                <div className="w-1.5 h-1.5 bg-[#F37512] rounded-full animate-pulse" />
              </div>

              {/* Card Container */}
              <div className="w-full pl-12 md:pl-16">

                {/* Premium Glassmorphism Card */}
                <div className="relative p-5 md:p-6 rounded-[1.5rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl overflow-hidden hover:bg-white/[0.04] hover:border-[#F37512]/30 hover:shadow-[0_0_30px_rgba(243,117,18,0.1)] transition-all duration-500 transform hover:-translate-y-1">

                  {/* Subtle Background Glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#F37512]/10 rounded-full blur-[50px] -z-10 transition-opacity duration-700 group-hover:opacity-100 opacity-0" />

                  {/* Date Tag */}
                  <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs text-[#F37512] font-mono mb-3">
                    {exp.date}
                  </div>

                  {/* Title & Company */}
                  <h3 className="text-xl md:text-2xl font-bold font-heading text-white/90 tracking-wide mb-1 group-hover:text-white transition-colors">
                    {exp.title}
                  </h3>
                  <h4 className="text-white/50 font-semibold text-xs md:text-sm uppercase tracking-[0.15em] mb-3">
                    {exp.company}
                  </h4>

                  {/* Description */}
                  <p className="text-white/60 text-sm md:text-base leading-snug font-light group-hover:text-white/80 transition-colors">
                    {exp.description}
                  </p>

                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </Section>
  );
}