"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { client } from "@/sanity/lib/client";

/* ─── Custom GitHub icon ─── */
const GithubIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

interface Project {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  gallery: { asset: { url: string } }[];
}

const StackedCard = ({ project, index, totalCards, scrollYProgress }: { project: Project; index: number; totalCards: number; scrollYProgress: any }) => {
  const scale = useTransform(scrollYProgress, [index / totalCards, 1], [1, 1 - (totalCards - index) * 0.05]);

  const img1 = project.gallery?.[0]?.asset?.url;
  const img2 = project.gallery?.[1]?.asset?.url;
  const img3 = project.gallery?.[2]?.asset?.url;

  return (
    <div className="h-screen w-full flex items-center justify-center sticky top-0">
      <motion.div
        /* මෙතන top අගය වෙනස් කළා (10vh අයින් කරලා 30px දැම්මා) කාඩ් උඩට ගන්න */
        style={{ scale, top: `calc(${index * 30}px)` }}
        /* මෙතන h-[80vh] වෙනුවට h-[75vh] සහ p-10 වෙනුවට p-8 දැම්මා */
        className="relative w-full max-w-[1300px] h-[75vh] bg-[#09090b] rounded-[2.5rem] border border-white/10 p-8 flex flex-col overflow-hidden shadow-2xl"
      >

        {/* --- Header Area --- */}
        {/* මෙතන mb-8, pb-8 වෙනුවට mb-6, pb-6 දැම්මා */}
        <div className="flex justify-between items-start mb-6 z-10 w-full border-b border-white/5 pb-6">
          <div className="flex items-start gap-8">
            {/* Loku Number */}
            <h2 className="text-[80px] sm:text-[110px] font-black text-white leading-none tracking-tighter mt-[-10px]">
              0{index + 1}
            </h2>
            {/* Title & Description */}
            <div className="flex flex-col max-w-2xl">
              <span className="text-xs font-semibold tracking-[0.2em] text-white/50 mb-1 uppercase">
                {project.subtitle || "PERSONAL"}
              </span>
              <h3 className="text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight mb-3">
                {project.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4 shrink-0">
            {project.githubUrl && (
              <Link href={project.githubUrl} target="_blank" className="p-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all">
                <GithubIcon className="w-5 h-5" />
              </Link>
            )}
            {project.liveUrl && (
              <Link href={project.liveUrl} target="_blank" className="px-6 py-3 rounded-full border border-white/20 text-xs font-bold tracking-widest hover:bg-white text-white hover:text-black transition-all flex items-center gap-2 uppercase">
                LIVE PROJECT <ExternalLink className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>

        {/* --- Image Grid --- */}
        <div className="flex-grow grid grid-cols-12 gap-6 min-h-0 z-10">
          {/* Left Column: 2 smaller images */}
          <div className="col-span-5 flex flex-col gap-6 h-full">
            <div className="h-1/2 w-full rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 relative group">
              {img1 && <img src={img1} alt="p1" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />}
            </div>
            <div className="h-1/2 w-full rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 relative group">
              {img2 && <img src={img2} alt="p2" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />}
            </div>
          </div>

          {/* Right Column: 1 Big Image */}
          <div className="col-span-7 h-full rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 relative group">
            {img3 && <img src={img3} alt="p3" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const query = `*[_type == "project"]{_id, title, subtitle, description, githubUrl, liveUrl, gallery[]{asset->{url}}}`;
        const data = await client.fetch(query);
        const titleOrder = [
          "Forever – E-Commerce Web App",
          "KV-Audio Rentals Platform",
          "nextgen app",
          "whether app",
        ];
        data.sort((a: Project, b: Project) => {
          const aIndex = titleOrder.indexOf(a.title);
          const bIndex = titleOrder.indexOf(b.title);
          return (aIndex === -1 ? titleOrder.length : aIndex) - (bIndex === -1 ? titleOrder.length : bIndex);
        });
        setProjects(data);
      } catch (error) { console.error(error); } finally { setIsLoading(false); }
    };
    fetchProjects();
  }, []);

  return (
    <main className="relative min-h-screen bg-[#09090b] w-full">
      <section className="h-[40vh] w-full flex items-end justify-center pb-20 relative z-0">
        <h1 className="text-[12vw] sm:text-[8rem] font-black tracking-tighter uppercase text-white/90 leading-none">PROJECTS</h1>
      </section>

      <section ref={containerRef} className="relative z-10 w-full px-8 pb-32 flex flex-col items-center" style={{ height: `${Math.max(projects.length, 1) * 100}vh` }}>
        {projects.map((project, index) => <StackedCard key={project._id} project={project} index={index} totalCards={projects.length} scrollYProgress={scrollYProgress} />)}
      </section>
    </main>
  );
}