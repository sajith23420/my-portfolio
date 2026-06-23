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
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            About <span className="text-accent">Me</span>
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-6">
            {ABOUT_DATA.tagline}
          </p>
          <p className="text-base text-white/60 leading-relaxed mb-8">
            {ABOUT_DATA.bio}
          </p>

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

        {/* Right Column: Code-style card */}
        <div className="relative">
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
                <span className="text-accent">&quot;Sajith Bandara&quot;</span>,{"\n"}
                {"  "}
                <span className="text-green-400">role</span>
                <span className="text-white/60">:</span>{" "}
                <span className="text-accent">&quot;Software Engineer&quot;</span>,{"\n"}
                {"  "}
                <span className="text-green-400">university</span>
                <span className="text-white/60">:</span>{" "}
                <span className="text-accent">&quot;NSBM Green University&quot;</span>,{"\n"}
                {"  "}
                <span className="text-green-400">stack</span>
                <span className="text-white/60">:</span> [
                <span className="text-accent">&quot;React&quot;</span>,{" "}
                <span className="text-accent">&quot;Node.js&quot;</span>,{" "}
                <span className="text-accent">&quot;MySQL&quot;</span>],{"\n"}
                {"  "}
                <span className="text-green-400">openToWork</span>
                <span className="text-white/60">:</span>{" "}
                <span className="text-purple-400">true</span>,{"\n"}
                {`}`};
              </code>
            </pre>
          </div>

          {/* Decorative elements */}
          <div className="absolute -inset-4 border border-white/10 rounded-2xl -z-10" />
          <div className="absolute -inset-8 border border-white/5 rounded-2xl -z-10" />
        </div>
      </div>
    </Section>
  );
}
