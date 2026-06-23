"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

/* ─── Custom GitHub icon ─── */
const GithubIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);
// Sanity client එක මෙතනට import කරගන්න ඕන. ඔයාගේ file path එක අනුව මේක වෙනස් වෙන්න පුළුවන්.
// උදාහරණයක් විදිහට: import { client } from "@/sanity/lib/client"; 
import { client } from "@/sanity/lib/client";
// 1. Define your TypeScript Interfaces
interface Project {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  mainImage: {
    asset: {
      url: string;
    };
  };
}

// --- STACKED CARD COMPONENT ---
const StackedCard = ({
  project,
  index,
  totalCards,
  scrollYProgress
}: {
  project: Project;
  index: number;
  totalCards: number;
  scrollYProgress: any;
}) => {
  const scale = useTransform(
    scrollYProgress,
    [index / totalCards, 1],
    [1, 1 - (totalCards - index) * 0.05]
  );

  const opacity = useTransform(
    scrollYProgress,
    [index / totalCards, 1],
    [1, 0.5]
  );

  return (
    <div className="h-screen w-full flex items-center justify-center sticky top-0">
      <motion.div
        style={{
          scale,
          opacity,
          top: `calc(10vh + ${index * 30}px)`,
        }}
        className="relative w-full max-w-5xl h-[75vh] sm:h-[80vh] bg-[#0f0f0f] rounded-[2.5rem] border border-white/10 p-8 sm:p-12 flex flex-col overflow-hidden shadow-2xl"
      >
        {/* --- Card Header --- */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 z-10">
          <div className="flex items-start gap-6">
            <h2 className="text-6xl sm:text-8xl font-black text-white/20 leading-none">
              0{index + 1}
            </h2>
            <div className="flex flex-col mt-2">
              <span className="text-xs font-semibold tracking-[0.2em] text-orange-500 mb-2 uppercase">
                {project.subtitle || "PROJECT"}
              </span>
              <h3 className="text-3xl sm:text-5xl font-bold text-white uppercase tracking-tight">
                {project.title}
              </h3>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mt-2 sm:mt-0">
            {project.githubUrl && (
              <Link
                href={project.githubUrl}
                target="_blank"
                className="p-3 rounded-full border border-white/10 hover:bg-white/10 transition-colors text-white"
              >
                <GithubIcon className="w-5 h-5" />
              </Link>
            )}
            {project.liveUrl ? (
              <Link
                href={project.liveUrl}
                target="_blank"
                className="px-6 py-3 rounded-full border border-white/20 text-sm font-semibold tracking-wide hover:bg-white text-white hover:text-black transition-all flex items-center gap-2"
              >
                LIVE PROJECT <ExternalLink className="w-4 h-4" />
              </Link>
            ) : (
              <span className="px-6 py-3 rounded-full border border-white/10 bg-white/5 text-sm font-semibold tracking-wide text-white/50">
                COMING SOON
              </span>
            )}
          </div>
        </div>

        {/* --- Technologies Tags --- */}
        <div className="flex flex-wrap gap-3 mt-8 z-10">
          {project.technologies?.map((tech, i) => (
            <span
              key={i}
              className="px-4 py-1.5 rounded-full border border-orange-500/30 text-orange-400 text-xs font-medium tracking-wider bg-orange-500/5"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* --- Card Body / Image Showcase --- */}
        <div className="relative mt-10 w-full flex-grow rounded-2xl overflow-hidden border border-white/5 bg-black/50 group">
          {project.mainImage?.asset?.url ? (
            <Image
              src={project.mainImage.asset.url}
              alt={project.title}
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-white/5 to-transparent">
              <p className="text-xl text-white/60 mb-4 max-w-lg">{project.description}</p>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent opacity-60" />
        </div>
      </motion.div>
    </div>
  );
};

// --- MAIN PROJECTS PAGE ---
export default function ProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Fetch data from Sanity
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Sanity query - මේක ඔයාගේ Sanity schema එකට ගැලපෙන විදිහට හදාගන්න
        const query = `*[_type == "project"]{
          _id,
          title,
          subtitle,
          description,
          technologies,
          githubUrl,
          liveUrl,
          mainImage{
            asset->{
              url
            }
          }
        }`;
        const data = await client.fetch(query);
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <p className="text-orange-500 font-bold tracking-widest animate-pulse">LOADING PROJECTS...</p>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen bg-transparent w-full">
      <section className="h-[40vh] w-full flex items-end justify-center pb-20 sticky top-0 -z-10">
        <h1 className="text-[12vw] sm:text-[8rem] font-black tracking-tighter uppercase text-white/90 leading-none">
          PROJECTS
        </h1>
      </section>

      <section
        ref={containerRef}
        className="relative w-full px-4 sm:px-6 md:px-8 pb-32"
        style={{ height: `${Math.max(projects.length, 1) * 100}vh` }}
      >
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <StackedCard
              key={project._id}
              project={project}
              index={index}
              totalCards={projects.length}
              scrollYProgress={scrollYProgress}
            />
          ))
        ) : (
          <div className="text-center text-white/50 mt-20">No projects found in Sanity.</div>
        )}
      </section>
    </main>
  );
}