"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useEffect, useState, useRef, useCallback } from "react";
import { Play, Pause, Download } from "lucide-react";

/* ─── Typewriter ─── */
const TypewriterText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let i = 0;
    setDisplayedText("");
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className="inline-block">
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-[3px] h-[1em] bg-[#F37512] ml-1 align-middle"
      />
    </span>
  );
};

/* ─── Tiny Star Particles ─── */
const StarParticles = () => {
  const [stars] = useState(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: (i * 37 + 13) % 100,
      y: (i * 53 + 7) % 100,
      size: (i % 3) * 0.7 + 1,
      duration: (i % 5) + 5,
      delay: (i % 4),
      opacity: ((i % 6) * 0.05) + 0.05,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
          }}
          animate={{
            opacity: [s.opacity, s.opacity * 2.5, s.opacity],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: s.delay,
          }}
        />
      ))}
    </div>
  );
};

/* ─── Tech Tags ─── */
const techTags = ["React", "Node.js", "JavaScript", "MongoDB", "MySQL", "QA Testing"];

/* ═══════════════════════════════════════ */
/*                 HERO                    */
/* ═══════════════════════════════════════ */
export function Hero({ entered }: { entered: boolean }) {
  const [isPlaying, setIsPlaying] = useState(true); // Default true due to autoPlay
  const [userPaused, setUserPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const hasAutoScrolled = useRef(false);
  const userHasScrolled = useRef(false);

  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
        setUserPaused(true);
      } else {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              setUserPaused(false);
            })
            .catch(console.error);
        }
      }
    }
  }, [isPlaying]);

  // Handle Initial Play Safely
  useEffect(() => {
    if (entered && videoRef.current && !userPaused) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Silently handle autoplay prevention errors
            setIsPlaying(false);
          });
      }
    }
  }, [entered, userPaused]);

  // Detect manual user scroll to cancel auto-scroll
  useEffect(() => {
    if (!entered) return;

    const handleScroll = () => {
      userHasScrolled.current = true;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [entered]);

  // Auto-scroll to About section after video ends + brief pause (once only)
  useEffect(() => {
    if (!entered) return;
    const video = videoRef.current;
    if (!video) return;

    let timer: ReturnType<typeof setTimeout>;

    const handleEnded = () => {
      if (hasAutoScrolled.current || userHasScrolled.current) return;
      
      // Check if it already auto-scrolled this session
      if (sessionStorage.getItem("hasAutoScrolled")) return;

      hasAutoScrolled.current = true;
      sessionStorage.setItem("hasAutoScrolled", "true");

      timer = setTimeout(() => {
        const aboutSection = document.getElementById("about");
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 500); // Small 500ms delay after video ends
    };

    video.addEventListener("ended", handleEnded);
    return () => {
      video.removeEventListener("ended", handleEnded);
      clearTimeout(timer);
    };
  }, [entered]);

  // Intersection Observer — Safely pause / resume on scroll
  useEffect(() => {
    if (!entered) return;

    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    let playPromise: Promise<void> | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !userPaused) {
          playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => setIsPlaying(true))
              .catch(() => { /* Ignore abort errors silently */ });
          }
        } else if (!entry.isIntersecting) {
          // If a play promise is pending, wait for it to resolve before pausing to prevent AbortError
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                video.pause();
                setIsPlaying(false);
              })
              .catch(() => { /* Ignore */ });
          } else {
            video.pause();
            setIsPlaying(false);
          }
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [entered, userPaused]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative w-full min-h-screen lg:h-screen overflow-hidden flex flex-col lg:block"
    >
      {/* ═══ RIGHT: VIDEO (60%) ═══ */}
      <div className="relative lg:absolute lg:top-0 lg:right-0 w-full h-[55vh] lg:inset-y-0 lg:h-full lg:w-[68%] lg:right-[-6%] z-10 shrink-0">


        <video
          ref={videoRef}
          autoPlay
          loop={false}

          playsInline
          preload="auto"
          className="w-full h-full object-cover object-[center_20%] lg:object-right"
        >
          <source src="/my.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-y-0 left-0 w-[35%] bg-gradient-to-r from-[#050505] to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-[40%] lg:h-[8%] bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-[5%] bg-gradient-to-b from-[#050505] to-transparent pointer-events-none" />
      </div>

      {/* ═══ LEFT: CONTENT (40%) ═══ */}
      <div className="relative lg:absolute lg:inset-y-0 lg:left-0 w-full lg:w-[42%] z-20 flex items-center flex-grow">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        <StarParticles />

        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.18, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[280px] h-[280px] bg-[#F37512]/20 rounded-full blur-[100px] pointer-events-none"
        />

        <div className="relative px-6 md:px-10 lg:px-20 xl:px-30 w-full pt-4 pb-16 lg:pt-[70px] lg:pb-0 z-30 flex flex-col items-center lg:items-start text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={entered ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 opacity-0"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide text-[#F37512] border border-[#F37512]/20 bg-[#F37512]/[0.06]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F37512] opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F37512]" />
              </span>
              Open to Opportunities
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25, filter: "blur(8px)" }}
            animate={entered ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-bold font-heading mb-5 tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 leading-[1.15] opacity-0"
          >
            Sajitha Bandara
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 18, filter: "blur(5px)" }}
            animate={entered ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5 flex flex-col gap-1 opacity-0"
          >
            <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#F37512]">Full Stack Developer</span>
            <span className="text-[#F2F2F2]/85 font-medium text-base sm:text-lg md:text-xl">
              <TypewriterText text="Software QA Enthusiast" />
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={entered ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base text-[#F2F2F2]/40 font-light mb-8 max-w-sm leading-relaxed opacity-0"
          >
            Passionate about building modern web applications, exploring new technologies, and creating better digital experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={entered ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-2.5 mb-10 opacity-0"
          >
            {techTags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={entered ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 1.3 + i * 0.08 }}
                className="px-3.5 py-1.5 rounded-md text-xs font-medium text-[#F2F2F2]/60 bg-white/[0.04] border border-white/[0.06] hover:border-[#F37512]/40 hover:text-[#F37512] hover:bg-[#F37512]/[0.06] hover:shadow-[0_0_12px_rgba(243,117,18,0.15)] transition-all duration-300 cursor-default"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={entered ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-4 opacity-0 w-full sm:w-auto"
          >
            <motion.a
              href="/Sajitha_Bandara_CV  FULL Stack.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-8 py-3 rounded-full font-medium tracking-wide overflow-hidden group transition-colors duration-300 bg-[#F37512] text-black hover:bg-[#ff8f36] inline-flex items-center gap-2 justify-center"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download CV
              </span>
              <span className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-in-out z-0" />
            </motion.a>
            <Button variant="outline" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
              Contact Me
            </Button>
          </motion.div>
        </div>
      </div>

      {/* ═══ SCROLL INDICATOR — bottom center ═══ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={entered ? { opacity: 1 } : {}}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-2 opacity-0"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2 relative">
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2.5 bg-[#F37512] rounded-full"
          />
        </div>
        <motion.span
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-[9px] uppercase tracking-[0.25em] text-white/30 font-mono"
        >
          Scroll
        </motion.span>
      </motion.div>

      {/* ═══ VIDEO CONTROL (Play/Pause only) ═══ */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={entered ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 right-8 md:bottom-10 md:right-10 z-30 flex items-center gap-2 opacity-0"
      >
        <button
          onClick={togglePlay}
          className="group flex items-center justify-center w-10 h-10 rounded-full bg-black/25 backdrop-blur-lg border border-white/10 hover:border-[#F37512]/40 active:scale-95 transition-all duration-300"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
          ) : (
            <Play className="w-4 h-4 text-[#F37512] transition-colors translate-x-[1px]" />
          )}
        </button>
      </motion.div>
    </section>
  );
}