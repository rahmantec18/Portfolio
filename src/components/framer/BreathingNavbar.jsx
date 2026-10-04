import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Eye, Download } from "lucide-react";
import TubeLight from "./TubeLight";
import { smoothScrollTo } from "../../animations/lenisScroll";

const navItems = [
  { label: "ABOUT", href: "#about" },
  { label: "TECH", href: "#tech" },
  { label: "PROJECTS", href: "#projects" },
  { label: "PHOTOGRAPHY", href: "#photography" },
  { label: "VIDEO", href: "#video" },
  { label: "DESIGN", href: "#design" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "CONTACT", href: "#contact" }
];

export default function BreathingNavbar({ onToggleAesthetics, isEnhanced, onOpenResume, onOpenIntro }) {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ["hero", "about", "tech", "projects", "photography", "video", "design", "experience", "services", "beyond", "contact"];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      smoothScrollTo(el, { offset: -75, duration: 1.25 });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-2.5 xs:p-3 sm:p-5 pointer-events-none">
        <motion.nav
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto relative flex items-center justify-between gap-2.5 xs:gap-3 sm:gap-6 lg:gap-8 px-3.5 xs:px-4 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all duration-500 border ${
            isScrolled
              ? "bg-deep-950/85 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
              : "bg-deep-950/50 backdrop-blur-md border-white/5 shadow-lg"
          }`}
        >
          {/* Subtle Tube Light top accent glow */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[1px]">
            <TubeLight stop4="#00f2fe" stop3="#8b5cf6" height={1.5} />
          </div>

          {/* Brand Logo & Intro Stage Trigger */}
          <div className="flex items-center gap-2.5 group">
            <button
              onClick={() => {
                if (onOpenIntro) onOpenIntro();
              }}
              data-cursor="INTRO"
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 p-[1px] hover:scale-105 transition-transform cursor-pointer"
              title="Experience Cinematic Intro Stage"
            >
              <div className="w-full h-full bg-deep-950 rounded-[7px] flex items-center justify-center">
                <span className="font-display font-black text-xs text-cyan-300">AR</span>
              </div>
            </button>
            <a
              href="#hero"
              onClick={(e) => scrollToSection(e, "#hero")}
              data-cursor="TOP"
              className="font-ui font-bold text-xs tracking-wider uppercase text-slate-200 group-hover:text-cyan-400 transition-colors hidden sm:inline"
            >
              ABDUR RAHMAN I
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  data-cursor="GOTO"
                  className={`relative px-3.5 py-1.5 text-xs font-medium tracking-wider rounded-full transition-all duration-300 font-ui ${
                    isActive ? "text-cyan-300 font-semibold" : "text-slate-400 hover:text-slate-100"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-pill"
                      className="absolute inset-0 bg-cyan-500/15 border border-cyan-400/30 rounded-full shadow-[0_0_12px_rgba(0,242,254,0.2)]"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </div>

          {/* CTA & Resume */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-slate-800/80 hover:bg-cyan-500/20 text-slate-200 hover:text-cyan-300 border border-slate-700 hover:border-cyan-400/50 text-xs font-semibold tracking-wider font-ui transition-all cursor-pointer"
            >
              <span>RESUME</span>
              <Eye className="w-3 h-3 text-cyan-400" />
            </button>

            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "#contact")}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-cyan-400/10 hover:bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 text-xs font-semibold tracking-wider font-ui transition-all"
            >
              <span>CONNECT</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation"
              className="lg:hidden p-2 rounded-full text-slate-300 hover:text-white bg-slate-800/40 border border-slate-700/60"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Animated Slide-Down Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 top-20 z-50 p-6 rounded-3xl bg-deep-950/95 backdrop-blur-2xl border border-slate-700/60 shadow-2xl lg:hidden flex flex-col space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono tracking-widest text-cyan-400">NAVIGATION</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`p-3 rounded-xl text-xs font-medium font-ui tracking-wider transition-colors ${
                    activeSection === item.href.replace("#", "")
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                      : "bg-slate-900/50 text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume && onOpenResume();
              }}
              className="w-full py-3 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 flex items-center justify-center gap-2 text-xs font-mono font-semibold tracking-wider transition-all"
            >
              <Eye className="w-4 h-4" />
              <span>VIEW RESUME</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
