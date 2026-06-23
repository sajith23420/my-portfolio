"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Code2, Layers, Zap, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { ProjectThumbnail } from "@/components/ui/ProjectThumbnail";
import { GalleryLightbox } from "@/components/ui/GalleryLightbox";
import { GITHUB_USERNAME, PROJECT_ENHANCEMENTS } from "@/lib/data";

const GithubIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

export default function ProjectDetails() {
  const { slug } = useParams();
  const router = useRouter();
  const [project, setProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        const cvBuilderMock = PROJECT_ENHANCEMENTS["cv-builder"]?.mockData;
        
        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
        let data = await res.json();
        
        if (cvBuilderMock && !data.find((r: any) => r.name.toLowerCase() === "cv-builder")) {
          data = [cvBuilderMock, ...data];
        }

        const foundRepo = data.find((p: any) => p.name.toLowerCase() === slug);
        
        if (!foundRepo) {
          router.push("/#projects");
          return;
        }
        
        const enhancements = PROJECT_ENHANCEMENTS[slug as string] || {};
        
        setProject({
          ...foundRepo,
          title: enhancements.title || foundRepo.name.replace(/-/g, ' '),
          description: foundRepo.description || enhancements.overview,
          githubUrl: foundRepo.html_url,
          liveUrl: foundRepo.homepage,
          technologies: foundRepo.topics || [],
          gallery: enhancements.gallery || [],
          features: enhancements.features || [],
          longDescription: enhancements.challenges || "No further details provided.",
          slug: slug as string
        });
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    if (slug) {
      fetchProject();
    }
  }, [slug, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#F37512] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) return null;

  return (
    <main className="min-h-screen text-white selection:bg-accent/30 selection:text-white pt-[100px] pb-20">
      
      {/* Background elements */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none z-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/10 blur-[150px] pointer-events-none z-0 rounded-full" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-6xl">
        
        {/* Back Button */}
        <button 
          onClick={() => router.push("/#projects")}
          className="group flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono text-sm tracking-widest uppercase">Back to Projects</span>
        </button>

        {/* Hero Section */}
        <div className="mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-6"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold capitalize text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
              {project.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-white/50 font-light max-w-3xl leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-4 mt-4">
              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:scale-105"
                >
                  <GithubIcon size={18} /> Get Code
                </a>
              )}
              {project.liveUrl && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-accent text-[#050505] shadow-[0_0_20px_rgba(243,117,18,0.3)] hover:shadow-[0_0_30px_rgba(243,117,18,0.5)] transition-all hover:scale-105"
                >
                  <ExternalLink size={18} /> Watch Live
                </a>
              )}
            </div>
          </motion.div>
        </div>

        {/* Full Width Hero Preview Image */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-24 w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden border border-white/5 relative group shadow-2xl"
        >
          <ProjectThumbnail 
            src={`/projects/${project.slug}.jpg`}
            alt={project.title}
            title={project.title}
            tech={project.technologies}
            className="w-full h-full"
          />
        </motion.div>

        {/* Detailed Breakdown */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 mb-24">
          
          {/* Main Content */}
          <div className="md:col-span-2 space-y-16">
            
            {/* Gallery Lightbox */}
            {project.gallery && project.gallery.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold font-heading mb-6 flex items-center gap-3">
                  <Layers className="text-accent" /> Screenshot Gallery
                </h2>
                <GalleryLightbox images={project.gallery} />
              </section>
            )}

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold font-heading mb-6 flex items-center gap-3">
                  <Zap className="text-accent" /> Key Features
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {project.features.map((feature: string, idx: number) => (
                    <div key={idx} className="bg-white/[0.02] border border-white/5 p-4 rounded-xl flex items-start gap-3">
                      <ShieldCheck className="text-accent/70 shrink-0 mt-0.5" size={18} />
                      <span className="text-white/70 text-sm leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Challenges */}
            {project.longDescription && (
              <section>
                <h2 className="text-2xl font-bold font-heading mb-6 flex items-center gap-3">
                  <Code2 className="text-accent" /> Challenges & Solutions
                </h2>
                <div className="bg-white/[0.02] border border-white/5 p-6 md:p-8 rounded-2xl">
                  <p className="text-white/60 leading-relaxed whitespace-pre-wrap">
                    {project.longDescription}
                  </p>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar / Tech Stack */}
          <div className="space-y-8">
            <div className="bg-[#0A0A0A] border border-white/5 p-6 rounded-2xl sticky top-[100px]">
              <h3 className="text-lg font-bold font-heading mb-6 flex items-center gap-2">
                <Code2 className="text-accent" size={20} /> Technologies Used
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((topic: string) => (
                  <span key={topic} className="px-3 py-1.5 bg-accent/10 text-accent text-xs font-mono rounded-md border border-accent/20">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="border-t border-white/5 py-12 flex justify-center">
          <button 
            onClick={() => router.push("/#projects")}
            className="px-8 py-3 rounded-full text-sm font-mono tracking-widest uppercase text-white/50 border border-white/10 hover:bg-white/5 hover:text-white transition-all"
          >
            Return to Projects
          </button>
        </div>

      </div>
    </main>
  );
}
