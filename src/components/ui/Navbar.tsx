"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navItems.forEach((item) => {
      const section = document.getElementById(item.href.substring(1));
      if (section) observer.observe(section);
    });

    const heroSection = document.getElementById("home");
    if (heroSection) observer.observe(heroSection);

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.getElementById(href.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 h-[80px] flex items-center transition-all duration-500 ${
          isScrolled 
            ? "bg-[#050505]/80 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.1)] border-b border-white/10" 
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="w-full px-6 md:px-12 lg:px-20">
          <div className="flex items-center justify-between relative">
            {/* Logo — left */}
            <a 
              href="#home" 
              onClick={(e) => handleNavClick(e, "#home")}
              className="text-2xl font-bold font-heading text-[#F2F2F2] tracking-tight hover:opacity-80 transition-opacity"
            >
              Sajith Bandara<span className="text-[#F37512]">.</span>
            </a>

            {/* Desktop Navigation — centered */}
            <div className="hidden md:flex items-center space-x-10 absolute left-1/2 -translate-x-1/2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`text-sm tracking-wide font-medium transition-colors duration-300 relative group py-2 ${
                    activeSection === item.href.substring(1) ? "text-[#F37512]" : "text-[#F2F2F2]/70 hover:text-[#F37512]"
                  }`}
                >
                  {item.name}
                  {activeSection === item.href.substring(1) && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F37512]"
                    />
                  )}
                  {/* Hover Underline */}
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-[#F37512] transition-all duration-300 group-hover:w-full ${activeSection === item.href.substring(1) ? 'hidden' : 'block'}`} />
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-[#F2F2F2] p-2 hover:text-[#F37512] transition-colors absolute right-0"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-xl md:hidden pt-[80px]"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8 pb-20">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`text-2xl font-medium tracking-wider transition-colors duration-300 ${
                    activeSection === item.href.substring(1) ? "text-[#F37512]" : "text-[#F2F2F2]/80 hover:text-[#F37512]"
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
