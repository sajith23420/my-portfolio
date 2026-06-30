"use client";

import { Section } from "@/components/ui/Section";
import { motion } from "framer-motion";
import { useState } from "react";

const skillsData = [
  { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/F7DF1E" },
  { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6" },
  { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/white" },
  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/339933" },
  { name: "Express.js", icon: "https://cdn.simpleicons.org/express/white" },
  { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql/4479A1" },
  { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb/47A248" },
  { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  { name: "HTML / CSS", icon: "https://cdn.simpleicons.org/html5/E34F26" },
  { name: "Git & GitHub", icon: "https://cdn.simpleicons.org/github/6E5494" },
  { name: "REST APIs", icon: "https://cdn.simpleicons.org/postman/FF6C37" },
  { name: "Claude", icon: "https://cdn.simpleicons.org/claude/D97757" },
  { name: "VS Code", icon: "https://api.iconify.design/logos:visual-studio-code.svg", color: "#007ACC" },
  { name: "Gemini", icon: "https://cdn.simpleicons.org/googlegemini/8E75B2" },
  { name: "ChatGPT", icon: "/icons/chatgpt.png", color: "#10A37F" },
  { name: "Vibe Coding", icon: "https://cdn.simpleicons.org/stackblitz/1389FD" }
];

/* Closely-grouped orbital positions — icons cluster toward center with slight vertical overlap */
const BUBBLE_POSITIONS = [
  // Center hero
  { top: "50%", left: "50%", scale: 1.15 },   // 0: JavaScript (center)

  // Inner ring — tight
  { top: "24%", left: "50%", scale: 1.0 },    // 1: TypeScript
  { top: "35%", left: "72%", scale: 1.05 },   // 2: React
  { top: "60%", left: "72%", scale: 0.95 },   // 3: Next.js
  { top: "76%", left: "50%", scale: 1.0 },    // 4: Node.js
  { top: "60%", left: "28%", scale: 0.9 },    // 5: Express.js
  { top: "35%", left: "28%", scale: 1.0 },    // 6: MySQL

  // Outer ring — still grouped, not far-flung
  { top: "8%",  left: "50%", scale: 0.85 },   // 7: MongoDB
  { top: "16%", left: "74%", scale: 0.9 },    // 8: Tailwind CSS
  { top: "38%", left: "90%", scale: 0.8 },    // 9: HTML / CSS
  { top: "62%", left: "90%", scale: 0.85 },   // 10: Git & GitHub
  { top: "84%", left: "74%", scale: 0.8 },    // 11: REST APIs
  { top: "92%", left: "50%", scale: 0.85 },   // 12: Claude
  { top: "84%", left: "26%", scale: 0.9 },    // 13: VS Code
  { top: "62%", left: "10%", scale: 0.8 },    // 14: Gemini
  { top: "38%", left: "10%", scale: 0.85 },   // 15: ChatGPT
  { top: "16%", left: "26%", scale: 0.9 },    // 16: Vibe Coding
];

const getGlowColor = (skill: typeof skillsData[0]) => {
  if (skill.color) return `${skill.color}66`;
  const parts = skill.icon.split('/');
  const hex = parts[parts.length - 1];
  if (hex.toLowerCase() === 'white') return 'rgba(255,255,255,0.4)';
  return `#${hex}66`;
};

function SkillBubble({
  skill,
  index,
  pos
}: {
  skill: typeof skillsData[0];
  index: number;
  pos: { top: string; left: string; scale: number };
}) {
  const [isHovered, setIsHovered] = useState(false);
  const floatY = [0, -8 - (index % 3) * 4, 0];
  const floatX = [0, 4 - (index % 4) * 2, 0];
  const duration = 3.5 + (index % 3);
  const delay = (index % 5) * 0.2;
  const glowColor = getGlowColor(skill);

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ top: pos.top, left: pos.left, zIndex: isHovered ? 50 : 10 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: pos.scale, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: index * 0.05 }}
        viewport={{ once: true }}
      >
        <motion.div
          animate={isHovered ? { scale: 1.15, y: 0, x: 0 } : { scale: 1, y: floatY, x: floatX }}
          transition={isHovered ? { duration: 0.3 } : { repeat: Infinity, duration, ease: "easeInOut", delay }}
        >
          <div className="flex flex-col items-center justify-center gap-3">
            <motion.div
              animate={{
                boxShadow: isHovered ? `0px 0px 30px ${glowColor}` : `0px 0px 12px rgba(243,117,18,0.15)`,
                backgroundColor: isHovered ? 'rgba(243,117,18,0.08)' : 'rgba(10,10,10,0.85)'
              }}
              className="rounded-full backdrop-blur-md flex items-center justify-center transition-colors w-[100px] h-[100px] relative"
            >
              <img src={skill.icon} alt={skill.name} className="w-12 h-12 object-contain pointer-events-none" />
            </motion.div>
            <span className="text-xs font-semibold text-white/80 whitespace-nowrap bg-black/50 px-2.5 py-1 rounded-md backdrop-blur-sm border border-white/5 pointer-events-none">
              {skill.name}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function Skills() {
  return (
    <Section id="skills" className="w-full pt-16 pb-32">
      <div className="text-center mb-8 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-heading font-black mb-4 tracking-tight text-white">
            Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F37512] to-[#ffaa5c]">Technologies</span>
          </h2>
          <p className="text-[rgba(255,255,255,0.6)] max-w-xl mx-auto">
            Technologies I use to build scalable applications.
          </p>
        </motion.div>
      </div>

      {/* Desktop/Tablet Orbital Layout */}
      <div className="hidden md:block relative w-full max-w-[900px] h-[900px] mx-auto mt-12">
        <div className="absolute inset-0 z-10">
          {skillsData.map((skill, index) => (
            <SkillBubble
              key={skill.name}
              skill={skill}
              index={index}
              pos={BUBBLE_POSITIONS[index]}
            />
          ))}
        </div>
      </div>

      {/* Mobile Grid Layout */}
      <div className="md:hidden grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 px-4 mt-8 w-full max-w-2xl mx-auto">
        {skillsData.map((skill, index) => {
          const glowColor = getGlowColor(skill);
          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors relative overflow-hidden group"
            >
              <div
                className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity"
                style={{ background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)` }}
              />
              <img src={skill.icon} alt={skill.name} className="w-10 h-10 mb-3 object-contain relative z-10" />
              <span className="text-xs font-medium text-white/80 text-center relative z-10">{skill.name}</span>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
