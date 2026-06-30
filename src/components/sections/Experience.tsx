"use client";

import { useEffect, useState } from "react";
import { Section } from "@/components/ui/Section";
import { motion, AnimatePresence } from "framer-motion";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import { ExternalLink, Play } from "lucide-react";

/* ─── Types ─── */
interface ExperienceItem {
  _id: string;
  title: string;
  company: string;
  date: string;
  description: string;
}

interface CertificationItem {
  _id: string;
  title: string;
  institution: string;
  date: string;
  image?: { asset: { url: string } };
  link?: string;
}

interface AcademicItem {
  _id: string;
  title: string;
  institution: string;
  date: string;
  description: string;
  image?: { asset: { url: string } };
  youtubeLink?: string;
}

const TABS = ["Experience", "Certifications & Academics"] as const;
type Tab = (typeof TABS)[number];

/* ─── Loading Skeletons ─── */
function TimelineSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-start gap-4">
          <div className="w-5 h-5 rounded-full bg-white/5 animate-pulse shrink-0 mt-5" />
          <div className="flex-1 p-6 rounded-[1.5rem] bg-white/[0.02] border border-white/[0.05]">
            <div className="h-4 w-24 bg-white/5 rounded-full animate-pulse mb-3" />
            <div className="h-6 w-48 bg-white/5 rounded-lg animate-pulse mb-2" />
            <div className="h-4 w-32 bg-white/5 rounded-lg animate-pulse mb-4" />
            <div className="h-4 w-full bg-white/5 rounded-lg animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

function CardSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="rounded-[1.5rem] bg-white/[0.02] border border-white/[0.05] overflow-hidden"
        >
          <div className="aspect-video bg-white/5 animate-pulse" />
          <div className="p-5 space-y-3">
            <div className="h-5 w-3/4 bg-white/5 rounded-lg animate-pulse" />
            <div className="h-4 w-1/2 bg-white/5 rounded-lg animate-pulse" />
            <div className="h-4 w-1/3 bg-white/5 rounded-lg animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Sub-Section Heading ─── */
function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <h3 className="text-sm md:text-base font-bold tracking-[0.2em] uppercase text-white/50 whitespace-nowrap">
        {children}
      </h3>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}

/* ─── Certificate Badge Icon (inline SVG) ─── */
function CertBadgeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
      />
    </svg>
  );
}

/* ─── Tab Animation Variants ─── */
const tabContentVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -40 : 40,
    opacity: 0,
  }),
};

export function Experience() {
  const [activeTab, setActiveTab] = useState<Tab>("Experience");
  const [direction, setDirection] = useState(0);
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [certifications, setCertifications] = useState<CertificationItem[]>([]);
  const [academics, setAcademics] = useState<AcademicItem[]>([]);
  const [loadingExp, setLoadingExp] = useState(true);
  const [loadingCert, setLoadingCert] = useState(true);
  const [loadingAcad, setLoadingAcad] = useState(true);

  /* ─── Fetch Experience Data ─── */
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const query = `*[_type == "experience"] | order(_createdAt asc) {
          _id, title, company, date, description
        }`;
        const data = await client.fetch(query);
        setExperiences(data);
      } catch (error) {
        console.error("Failed to fetch experiences:", error);
      } finally {
        setLoadingExp(false);
      }
    };
    fetchExperiences();
  }, []);

  /* ─── Fetch Certification Data ─── */
  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const query = `*[_type == "certification"] | order(_createdAt asc) {
          _id, title, institution, date, link,
          image { asset-> { url } }
        }`;
        const data = await client.fetch(query);
        setCertifications(data);
      } catch (error) {
        console.error("Failed to fetch certifications:", error);
      } finally {
        setLoadingCert(false);
      }
    };
    fetchCertifications();
  }, []);

  /* ─── Fetch Academic Data ─── */
  useEffect(() => {
    const fetchAcademics = async () => {
      try {
        const query = `*[_type == "academic"] | order(_createdAt asc) {
          _id, title, institution, date, description, youtubeLink,
          image { asset-> { url } }
        }`;
        const data = await client.fetch(query);
        setAcademics(data);
      } catch (error) {
        console.error("Failed to fetch academics:", error);
      } finally {
        setLoadingAcad(false);
      }
    };
    fetchAcademics();
  }, []);

  const handleTabSwitch = (tab: Tab) => {
    const currentIndex = TABS.indexOf(activeTab);
    const newIndex = TABS.indexOf(tab);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setActiveTab(tab);
  };

  return (
    <Section id="background" className="overflow-hidden">
      {/* ─── TITLE ─── */}
      <div className="text-center mb-10 relative z-10">
        <h2 className="text-4xl md:text-5xl font-heading font-black mb-1 tracking-tight text-white">
          Experience &{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F37512] to-[#ffaa5c]">
            Academics
          </span>
        </h2>
      </div>

      {/* ─── TAB SWITCHER ─── */}
      <div className="flex justify-center mb-12 relative z-10 w-full px-4">
        <div className="relative flex items-center p-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl max-w-full overflow-x-auto whitespace-nowrap no-scrollbar">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabSwitch(tab)}
              className={`relative z-10 px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-wide rounded-full transition-colors duration-300 whitespace-nowrap ${
                activeTab === tab
                  ? "text-white"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              {/* Active pill background */}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTabPill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-[#F37512] to-[#e0600e] shadow-[0_0_20px_rgba(243,117,18,0.3)]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  style={{ zIndex: -1 }}
                />
              )}
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ─── TAB CONTENT ─── */}
      <div className="relative min-h-[400px]">
        <AnimatePresence mode="wait" custom={direction}>
          {activeTab === "Experience" ? (
            <motion.div
              key="experience"
              custom={direction}
              variants={tabContentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* ─── SPLIT LAYOUT (preserved from original) ─── */}
              <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 relative">
                {/* LEFT SIDE: STICKY IMAGE */}
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

                {/* RIGHT SIDE: TIMELINE CARDS */}
                <div className="w-full lg:w-7/12 relative">
                  {/* Timeline Vertical Line */}
                  <div className="absolute left-[19px] md:left-[23px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#F37512]/40 to-transparent z-0" />

                  {loadingExp ? (
                    <TimelineSkeleton />
                  ) : experiences.length === 0 ? (
                    <div className="text-center text-white/40 py-20">
                      <p className="text-lg">No experience entries yet.</p>
                      <p className="text-sm mt-2">Add them through Sanity Studio.</p>
                    </div>
                  ) : (
                    experiences.map((exp, index) => (
                      <motion.div
                        key={exp._id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: index * 0.15,
                          duration: 0.6,
                          ease: "easeOut",
                        }}
                        viewport={{ once: true }}
                        className="relative flex items-start mb-6 last:mb-0 group"
                      >
                        {/* Timeline Dot */}
                        <div className="absolute left-[11px] md:left-[14px] top-5 w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#09090b] border-[2px] md:border-[3px] border-[#F37512] shadow-[0_0_10px_rgba(243,117,18,0.5)] group-hover:scale-125 transition-transform duration-300 flex items-center justify-center z-10">
                          <div className="w-1.5 h-1.5 bg-[#F37512] rounded-full animate-pulse" />
                        </div>

                        {/* Card Container */}
                        <div className="w-full pl-10 md:pl-16">
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
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="certifications"
              custom={direction}
              variants={tabContentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="max-w-7xl mx-auto space-y-16">

                {/* ════════════════════════════════════════════════════
                    SECTION 1: CERTIFICATIONS
                    ════════════════════════════════════════════════════ */}
                <div>
                  <SubHeading>Certifications</SubHeading>

                  {loadingCert ? (
                    <CardSkeleton count={4} />
                  ) : certifications.length === 0 ? (
                    <div className="text-center text-white/40 py-12">
                      <p className="text-lg">No certifications yet.</p>
                      <p className="text-sm mt-2">Add them through Sanity Studio.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {certifications.map((cert, index) => (
                        <motion.div
                          key={cert._id}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: index * 0.1,
                            duration: 0.5,
                            ease: "easeOut",
                          }}
                          viewport={{ once: true }}
                          className="group"
                        >
                          <div className="relative rounded-[1.5rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl overflow-hidden hover:bg-white/[0.04] hover:border-[#F37512]/30 hover:shadow-[0_0_30px_rgba(243,117,18,0.1)] transition-all duration-500 transform hover:-translate-y-1">
                            {/* Subtle corner glow */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-[#F37512]/10 rounded-full blur-[60px] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            {/* Certificate Thumbnail */}
                            <div className="relative aspect-video overflow-hidden bg-white/[0.03]">
                              {cert.image?.asset?.url ? (
                                <img
                                  src={cert.image.asset.url}
                                  alt={cert.title}
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                  loading="lazy"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <CertBadgeIcon className="w-12 h-12 text-white/10" />
                                </div>
                              )}
                              {/* Gradient overlay on bottom of image */}
                              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#09090b]/80 to-transparent" />
                            </div>

                            {/* Card Body */}
                            <div className="p-5 md:p-6">
                              {/* Date Tag */}
                              {cert.date && (
                                <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs text-[#F37512] font-mono mb-3">
                                  {cert.date}
                                </div>
                              )}

                              <h3 className="text-lg md:text-xl font-bold font-heading text-white/90 tracking-wide mb-1 group-hover:text-white transition-colors">
                                {cert.title}
                              </h3>
                              <p className="text-white/50 font-semibold text-xs md:text-sm uppercase tracking-[0.15em] mb-4">
                                {cert.institution}
                              </p>

                              {/* View Credential Button */}
                              {cert.link && (
                                <Link
                                  href={cert.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#F37512]/40 text-[#F37512] text-xs font-bold tracking-widest uppercase hover:bg-[#F37512] hover:text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(243,117,18,0.3)]"
                                >
                                  View Credential
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </Link>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* ════════════════════════════════════════════════════
                    SECTION 2: ACADEMIC & CAMPUS ACTIVITIES
                    ════════════════════════════════════════════════════ */}
                <div>
                  <SubHeading>Academic &amp; Campus Activities</SubHeading>

                  {loadingAcad ? (
                    <CardSkeleton count={2} />
                  ) : academics.length === 0 ? (
                    <div className="text-center text-white/40 py-12">
                      <p className="text-lg">No academic activities yet.</p>
                      <p className="text-sm mt-2">Add them through Sanity Studio.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {academics.map((acad, index) => (
                        <motion.div
                          key={acad._id}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: index * 0.1,
                            duration: 0.5,
                            ease: "easeOut",
                          }}
                          viewport={{ once: true }}
                          className="group"
                        >
                          <div className="relative rounded-[1.5rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl overflow-hidden hover:bg-white/[0.04] hover:border-[#F37512]/30 hover:shadow-[0_0_30px_rgba(243,117,18,0.1)] transition-all duration-500 transform hover:-translate-y-1">
                            {/* Subtle corner glow */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-[#F37512]/10 rounded-full blur-[60px] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            {/* Activity Image */}
                            <div className="relative aspect-video overflow-hidden bg-white/[0.03]">
                              {acad.image?.asset?.url ? (
                                <img
                                  src={acad.image.asset.url}
                                  alt={acad.title}
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                  loading="lazy"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <svg
                                    className="w-12 h-12 text-white/10"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={1}
                                      d="M12 14l9-5-9-5-9 5 9 5z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={1}
                                      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={1}
                                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                                    />
                                  </svg>
                                </div>
                              )}

                              {/* YouTube play indicator overlay */}
                              {acad.youtubeLink && acad.image?.asset?.url && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                  <div className="w-14 h-14 rounded-full bg-[#F37512]/90 flex items-center justify-center shadow-[0_0_30px_rgba(243,117,18,0.5)] backdrop-blur-sm">
                                    <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
                                  </div>
                                </div>
                              )}

                              {/* Gradient overlay */}
                              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#09090b]/80 to-transparent" />
                            </div>

                            {/* Card Body */}
                            <div className="p-5 md:p-6">
                              {/* Date Tag */}
                              {acad.date && (
                                <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs text-[#F37512] font-mono mb-3">
                                  {acad.date}
                                </div>
                              )}

                              <h3 className="text-lg md:text-xl font-bold font-heading text-white/90 tracking-wide mb-1 group-hover:text-white transition-colors">
                                {acad.title}
                              </h3>
                              <p className="text-white/50 font-semibold text-xs md:text-sm uppercase tracking-[0.15em] mb-3">
                                {acad.institution}
                              </p>

                              {/* Description */}
                              {acad.description && (
                                <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-3 group-hover:text-white/70 transition-colors">
                                  {acad.description}
                                </p>
                              )}

                              {/* Watch Video Button */}
                              {acad.youtubeLink && (
                                <Link
                                  href={acad.youtubeLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#F37512] to-[#e0600e] text-white text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(243,117,18,0.25)] hover:shadow-[0_0_30px_rgba(243,117,18,0.5)] hover:scale-[1.03] transition-all duration-300"
                                >
                                  <Play className="w-3.5 h-3.5" fill="white" />
                                  Watch Video
                                </Link>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
}