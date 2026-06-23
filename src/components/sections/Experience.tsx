"use client";

import { Section } from "@/components/ui/Section";
import { EXPERIENCE_DATA } from "@/lib/data";
import { motion } from "framer-motion";

export function Experience() {
  return (
    <Section id="experience">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
          My <span className="text-accent">Experience</span>
        </h2>
      </div>

      <div className="max-w-3xl mx-auto relative">
        {/* Timeline Line */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent -translate-x-1/2 md:translate-x-0" />

        {EXPERIENCE_DATA.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className={`relative flex flex-col md:flex-row items-start md:items-center mb-12 last:mb-0 ${
              index % 2 === 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Timeline Dot */}
            <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-black border-2 border-accent -translate-x-[9px] md:-translate-x-1/2 z-10" />

            <div className={`w-full md:w-1/2 pl-8 md:pl-0 ${index % 2 === 0 ? "md:pr-12 text-left md:text-right" : "md:pl-12"}`}>
              <div className="glass p-6 rounded-2xl hover:border-accent/20 transition-colors">
                <h3 className="text-xl font-bold font-heading">{exp.title}</h3>
                <h4 className="text-accent text-lg mb-2">{exp.company}</h4>
                <p className="text-sm text-white/50 mb-4 font-mono">{exp.date}</p>
                <p className="text-[rgba(255,255,255,0.7)]">{exp.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
