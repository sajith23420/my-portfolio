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
  { name: "Vibe Coding", icon: "https://cdn.simpleicons.org/stackblitz/1389FD" } // Stackblitz lightning bolt looks perfectly like "vibe coding"
];

const BUBBLE_POSITIONS = [
  { top: "50%", left: "50%", scale: 1.2 },  // 0 (Center)

  // Inner ring
  { top: "22%", left: "50%", scale: 1.0 },  // 1
  { top: "36%", left: "74%", scale: 1.1 },  // 2
  { top: "64%", left: "74%", scale: 0.9 },  // 3
  { top: "78%", left: "50%", scale: 1.05 }, // 4
  { top: "64%", left: "26%", scale: 0.85 }, // 5
  { top: "36%", left: "26%", scale: 0.95 }, // 6

  // Outer ring
  { top: "5%",  left: "50%", scale: 0.8 },  // 7
  { top: "14%", left: "76%", scale: 0.9 },  // 8
  { top: "36%", left: "93%", scale: 0.75 }, // 9
  { top: "64%", left: "93%", scale: 0.85 }, // 10
  { top: "86%", left: "76%", scale: 0.8 },  // 11
  { top: "95%", left: "50%", scale: 0.75 }, // 12
  { top: "86%", left: "24%", scale: 0.9 },  // 13
  { top: "64%", left: "7%",  scale: 0.85 }, // 14
  { top: "36%", left: "7%",  scale: 0.8 },  // 15
  { top: "14%", left: "24%", scale: 0.95 }, // 16
];

const getGlowColor = (skill: typeof skillsData[0]) => {
  if (skill.color) return `${skill.color}66`;
  const parts = skill.icon.split('/');
  const hex = parts[parts.length - 1];
  if (hex.toLowerCase() === 'white') return 'rgba(255,255,255,0.4)';
  return `#${hex}66`; // 40% opacity hex
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
  const floatY = [0, -10 - (index % 3) * 5, 0];
  const floatX = [0, 5 - (index % 4) * 3, 0];
  const duration = 3 + (index % 3);
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
          animate={isHovered ? { scale: 1.2, y: 0, x: 0 } : { scale: 1, y: floatY, x: floatX }}
          transition={isHovered ? { duration: 0.3 } : { repeat: Infinity, duration, ease: "easeInOut", delay }}
        >
          <div className="flex flex-col items-center justify-center gap-3">
            <motion.div
              animate={{
                boxShadow: isHovered ? `0px 0px 20px ${glowColor}` : `0px 0px 0px rgba(0,0,0,0)`,
                borderColor: isHovered ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.05)',
                backgroundColor: isHovered ? '#1a1a1a' : 'rgba(10,10,10,0.8)'
              }}
              className="rounded-full backdrop-blur-md border flex items-center justify-center transition-colors w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 relative"
            >
              <img src={skill.icon} alt={skill.name} className="w-1/2 h-1/2 object-contain pointer-events-none" />
            </motion.div>
            <span className="text-[9px] sm:text-[10px] md:text-xs font-medium text-white/90 whitespace-nowrap bg-black/60 px-2 py-1 rounded-md backdrop-blur-sm border border-white/5 pointer-events-none mt-1">
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
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            My <span className="text-accent">Skills</span>
          </h2>
          <p className="text-[rgba(255,255,255,0.6)] max-w-xl mx-auto">
            Technologies I use to build scalable applications.
          </p>
        </motion.div>
      </div>

      {/* Desktop/Tablet Orbital Layout */}
      <div className="hidden md:block relative w-full max-w-[900px] h-[750px] sm:h-[800px] mx-auto mt-12">
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
