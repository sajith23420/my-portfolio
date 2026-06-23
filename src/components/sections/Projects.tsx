"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { createClient } from "next-sanity";
import Image from "next/image";

/* ─── Custom GitHub icon ─── */
const GithubIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

/* ─── Sanity Client ─── */
const client = createClient({
  projectId: "1gwpxpmy",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

export interface Project {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  featured: boolean;
  isFullStack: boolean;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
}

interface StickyScrollCardProps {
  project: Project;
  index: number;
  totalCards: number;
}

function StickyScrollCard({ project, index, totalCards }: StickyScrollCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Determine how much to scale down based on its position in the stack.
  // We use a constant scale down so it shrinks smoothly as the next card covers it.
  const targetScale = 1 - ((totalCards - index) * 0.04);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Scale goes from 1 (when pinned to the top) to targetScale (when next card arrives)
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  // Fade slightly to create depth illusion
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  // Adjust top padding dynamically for the stacking effect so cards pile up visually
  const cardTopOffset = `calc(10vh + ${index * 25}px)`;

  return (
    <div 
      ref={containerRef} 
      className="h-screen w-full flex items-start justify-center sticky top-0"
    >
      <motion.div 
        style={{ 
          scale, 
          opacity,
          top: cardTopOffset,
        }}
        className="relative flex flex-col bg-[#0f0f0f] rounded-[2.5rem] w-full max-w-5xl h-[75vh] md:h-[80vh] border border-white/10 p-6 md:p-10 shadow-2xl transform-origin-top overflow-hidden group"
      >
        {/* Subtle top glare/gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent h-32 pointer-events-none" />

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6 md:mb-8 z-10">
          
          {/* Left: Index + Title + Tags */}
          <div className="flex gap-4 md:gap-6 items-start">
            <span className="text-5xl md:text-7xl font-bold font-mono text-white/10 leading-none mt-[-5px]">
              {(index + 1).toString().padStart(2, '0')}
            </span>
            <div className="flex flex-col gap-2 md:gap-3 mt-1">
              <h3 className="text-3xl md:text-5xl font-heading font-bold text-white uppercase leading-none tracking-tight">
                {project.title}
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {(project.techStack || []).slice(0, 3).map((tech) => (
                  <span 
                    key={tech} 
                    className="text-[10px] md:text-xs font-mono font-semibold text-[#F37512] bg-[#F37512]/10 px-3 py-1.5 rounded-full tracking-widest uppercase border border-[#F37512]/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3 shrink-0 mt-2 md:mt-0">
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noreferrer"
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors shrink-0"
                aria-label="GitHub Repository"
              >
                <GithubIcon size={18} className="text-white/80" />
              </a>
            )}
            
            {project.liveUrl ? (
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noreferrer"
                className="group/btn flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/20 bg-white hover:bg-white/90 text-black text-xs md:text-sm font-bold tracking-widest uppercase transition-all whitespace-nowrap shrink-0"
              >
                Live Project <ArrowUpRight size={16} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </a>
            ) : (
              <button 
                disabled
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/10 bg-white/5 text-white/30 text-xs md:text-sm font-bold tracking-widest uppercase cursor-not-allowed whitespace-nowrap shrink-0"
              >
                Coming Soon
              </button>
            )}
          </div>
        </div>

        {/* Body Section: Image Mockup */}
        <div className="relative flex-1 w-full rounded-2xl overflow-hidden bg-[#151515] border border-white/5">
          {project.imageUrl ? (
            <img 
              src={project.imageUrl} 
              alt={project.title}
              className="w-full h-full object-cover object-top transition-transform duration-[1500ms] group-hover:scale-[1.03]"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-white/20 font-mono text-sm uppercase tracking-widest bg-gradient-to-br from-white/[0.02] to-transparent">
              No Preview Available
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent opacity-60 pointer-events-none" />
        </div>
      </motion.div>
    </div>
  );
}

export function Projects() {
  const [repos, setRepos] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSanityProjects() {
      try {
        const query = `*[_type == "project"] | order(_createdAt desc) {
          _id,
          title,
          description,
          "imageUrl": image.asset->url,
          featured,
          isFullStack,
          techStack,
          githubUrl,
          liveUrl
        }`;

        const data = await client.fetch(query);
        // Take featured projects or fallback to top 4 to ensure a perfect stacked effect
        const featuredData = data.filter((p: Project) => p.featured);
        const finalData = featuredData.length > 0 ? featuredData : data.slice(0, 4);
        setRepos(finalData);
      } catch (error) {
        console.error("Error fetching projects from Sanity:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSanityProjects();
  }, []);

  return (
    <section 
      id="projects" 
      className="w-full relative bg-transparent py-24 min-h-screen"
    >
      {/* Massive Sticky Header */}
      <div className="w-full flex justify-center mb-10 md:mb-0 md:sticky md:top-[10vh] z-0 pointer-events-none overflow-hidden">
        <h2 className="text-[18vw] md:text-[14vw] font-bold font-heading text-white/[0.03] tracking-tighter leading-none select-none">
          PROJECTS
        </h2>
      </div>

      <div className="relative z-10 w-full px-4 md:px-8 max-w-7xl mx-auto pb-[10vh] md:mt-[-25vh]">
        {isLoading ? (
           <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 border-2 border-[#F37512]/30 rounded-full" />
                <div className="absolute inset-0 border-2 border-transparent border-t-[#F37512] rounded-full animate-spin" />
              </div>
              <span className="text-xs font-mono tracking-widest uppercase text-white/40">Loading workspace</span>
           </div>
        ) : repos.length === 0 ? (
           <div className="flex items-center justify-center h-[50vh]">
             <span className="text-sm font-mono text-white/40">No projects found.</span>
           </div>
        ) : (
          repos.map((project, i) => (
            <StickyScrollCard 
              key={project._id} 
              project={project} 
              index={i} 
              totalCards={repos.length} 
            />
          ))
        )}
      </div>
    </section>
  );
}