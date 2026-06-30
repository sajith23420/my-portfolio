"use client";

import { Section } from "@/components/ui/Section";
import { ABOUT_DATA } from "@/lib/data";
import { motion } from "framer-motion";

const highlights = [
  { label: "GitHub Repos", value: "15+" },
  { label: "Tech Stack", value: "MERN" },
  { label: "Location", value: "Sri Lanka" },
  { label: "Status", value: "Open to Work" },
];

export function About() {
  return (
    <Section id="about">
      <div className="flex flex-col lg:flex-row gap-16 lg:items-stretch items-start">
        {/* Left Column: Text content – wider */}
        <div className="w-full lg:w-[60%]">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            About <span className="text-accent">Me</span>
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-6">
            {ABOUT_DATA.tagline}
          </p>
          {ABOUT_DATA.bio.map((paragraph, i) => (
            <p key={i} className="text-base text-white/60 leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
          <div className="mb-8" />

          {/* Highlight Stats */}
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                className="glass rounded-xl p-4"
              >
                <p className="text-2xl font-bold text-accent font-heading">{item.value}</p>
                <p className="text-sm text-white/50">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Code card + Blended Image */}
        <div className="w-full lg:w-[40%] lg:ml-auto flex flex-col items-end mt-12 lg:mt-0">
          <div className="relative w-full lg:mt-24">
            <div className="glass rounded-2xl p-6 overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-xs text-white/30 font-mono">about_sajith.ts</span>
              </div>

              {/* Code Content */}
              <pre className="text-sm font-mono leading-relaxed overflow-x-auto">
                <code>
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-blue-300">developer</span>{" "}
                  <span className="text-white/60">=</span> {`{`}{"\n"}
                  {"  "}
                  <span className="text-green-400">name</span>
                  <span className="text-white/60">:</span>{" "}
                  <span className="text-accent">&quot;Sajitha Bandara&quot;</span>,{"\n"}
                  {"  "}
                  <span className="text-green-400">roles</span>
                  <span className="text-white/60">:</span> [
                  <span className="text-accent">&quot;Full-Stack Dev&quot;</span>,{" "}
                  <span className="text-accent">&quot;AI Enthusiast&quot;</span>,{" "}
                  <span className="text-accent">&quot;SQA&quot;</span>],{"\n"}
                  {"  "}
                  <span className="text-green-400">stack</span>
                  <span className="text-white/60">:</span> [
                  <span className="text-accent">&quot;MERN&quot;</span>,{" "}
                  <span className="text-accent">&quot;Next.js&quot;</span>,{" "}
                  <span className="text-accent">&quot;JavaScript&quot;</span>,{" "}
                  <span className="text-accent">&quot;Java&quot;</span>],{"\n"}
                  {`}`};
                </code>
              </pre>
            </div>

            {/* Decorative elements */}
            <div className="absolute -inset-4 border border-white/10 rounded-2xl -z-10" />
            <div className="absolute -inset-8 border border-white/5 rounded-2xl -z-10" />
          </div>

          {/* Blended Developer Image – anchored to column bottom */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-auto w-full flex justify-center -mx-6 pt-8"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/developer.jpeg"
              alt="Sajitha Bandara – Developer"
              className="w-full max-w-[1000px] object-contain scale-125 origin-bottom"
              style={{
                mixBlendMode: "screen",
                maskImage:
                  "radial-gradient(ellipse at center, black 40%, transparent 70%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse at center, black 40%, transparent 70%)",
              }}
            />
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
