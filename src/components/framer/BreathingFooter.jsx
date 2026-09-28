import React from "react";
import { motion } from "framer-motion";
import { ArrowUp, Heart, Github, Linkedin, Instagram, Mail, MessageSquare } from "lucide-react";
import { contactInfo } from "../../data/personal";
import TubeLight from "./TubeLight";

export default function BreathingFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-transparent text-slate-400 overflow-hidden border-t border-slate-800/80">
      {/* Top Breathing Glow & Tube Light */}
      <div className="absolute top-0 left-0 right-0 h-[2px]">
        <TubeLight stop4="#00f2fe" stop3="#8b5cf6" height={2} />
      </div>

      {/* Atmospheric Radial Breathing Gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[300px] bg-gradient-to-t from-cyan-950/20 via-purple-950/10 to-transparent blur-3xl pointer-events-none" />

      {/* Section 48: Final Screen Message */}
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-4 max-w-2xl"
        >
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-cyan-400 font-semibold">
            FINAL DESTINATION
          </span>
          <h2 className="text-3xl xs:text-4xl sm:text-6xl font-display font-black text-slate-100 tracking-tight break-words">
            THANKS FOR EXPLORING.
          </h2>
          <p className="text-lg xs:text-xl sm:text-2xl font-display text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-400 font-bold break-words">
            — ABDUR RAHMAN I
          </p>
          <p className="text-sm font-ui text-slate-400 tracking-wider">
            Keep exploring. Keep creating.
          </p>
        </motion.div>

        {/* Social dock buttons */}
        <div className="mt-8 sm:mt-12 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 max-w-full px-2">
          <a
            href={contactInfo.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="WHATSAPP"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900/80 border border-slate-700 hover:border-emerald-400/50 hover:text-emerald-300 transition-all text-xs font-ui tracking-wider"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp</span>
          </a>

          <a
            href={`mailto:${contactInfo.email}`}
            data-cursor="EMAIL"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900/80 border border-slate-700 hover:border-cyan-400/50 hover:text-cyan-300 transition-all text-xs font-ui tracking-wider"
          >
            <Mail className="w-4 h-4 text-cyan-400" />
            <span>Email</span>
          </a>

          <a
            href={contactInfo.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="INSTAGRAM"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900/80 border border-slate-700 hover:border-pink-400/50 hover:text-pink-300 transition-all text-xs font-ui tracking-wider"
          >
            <Instagram className="w-4 h-4 text-pink-400" />
            <span>@rahman__tec</span>
          </a>

          <a
            href={contactInfo.photographyInstagram.url}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="SHUTTERS"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900/80 border border-slate-700 hover:border-amber-400/50 hover:text-amber-300 transition-all text-xs font-ui tracking-wider"
          >
            <Instagram className="w-4 h-4 text-amber-400" />
            <span>@shuttersbytec</span>
          </a>

          <a
            href={contactInfo.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="LINKEDIN"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900/80 border border-slate-700 hover:border-blue-400/50 hover:text-blue-300 transition-all text-xs font-ui tracking-wider"
          >
            <Linkedin className="w-4 h-4 text-blue-400" />
            <span>LinkedIn</span>
          </a>

          <a
            href={contactInfo.github.url}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="GITHUB"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900/80 border border-slate-700 hover:border-purple-400/50 hover:text-purple-300 transition-all text-xs font-ui tracking-wider"
          >
            <Github className="w-4 h-4 text-purple-400" />
            <span>GitHub</span>
          </a>
        </div>

        {/* Scroll back to top button */}
        <div className="mt-14">
          <button
            onClick={scrollToTop}
            data-cursor="TOP"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 hover:border-cyan-400/40 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-all"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-16 pt-8 border-t border-slate-900/80 w-full flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 font-mono gap-4">
          <div>
            © {new Date().getFullYear()} ABDUR RAHMAN I • ALL RIGHTS RESERVED
          </div>
          <div className="flex items-center gap-2">
            <span>ENGINEERED WITH REACT, GSAP &amp; THREE.JS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
