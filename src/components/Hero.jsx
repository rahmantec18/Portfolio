import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Code, Camera, Sparkles, Terminal, Layers } from "lucide-react";
import HeroScene3D from "./3d/HeroScene3D";
import Ridgelume from "./framer/Ridgelume";
import ShaderButton from "./framer/ShaderButton";
import FluidButton from "./framer/FluidButton";
import TubeLight from "./framer/TubeLight";

export default function Hero({ isEnhanced = true }) {
  const heroRef = useRef(null);

  const phrases = ["I DESIGN.", "I CAPTURE.", "I EDIT."];

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#020205]"
    >
      {/* 3D Canvas Background */}
      {isEnhanced && <HeroScene3D />}

      {/* Atmospheric Horizon Light */}
      <div className="absolute -bottom-20 left-0 right-0 h-40 opacity-40">
        <Ridgelume colorA="#0A9FBD" colorB="#00D2FF" colorC="#8b5cf6" />
      </div>

      {/* Ambient Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-cyan-500/10 via-purple-600/10 to-transparent blur-[140px] pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Subtle Tube Light accent */}
        <div className="w-48 mb-6">
          <TubeLight stop4="#00f2fe" stop3="#8b5cf6" height={2} />
        </div>

        {/* Small Intro Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 backdrop-blur-md mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-slate-300 font-semibold">
            ABDUR RAHMAN I
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black tracking-tight text-white max-w-5xl leading-[1.08]"
        >
          I BUILD{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-purple-400">
            DIGITAL EXPERIENCES.
          </span>
        </motion.h1>

        {/* Secondary Animated Phrases: I DESIGN. I CAPTURE. I EDIT. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 font-display font-bold text-lg sm:text-2xl text-slate-400"
        >
          {phrases.map((phrase, idx) => (
            <span key={phrase} className="flex items-center gap-3 sm:gap-6">
              <span className="hover:text-cyan-300 transition-colors duration-300 tracking-wider">
                {phrase}
              </span>
              {idx < phrases.length - 1 && (
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500/60" />
              )}
            </span>
          ))}
        </motion.div>

        {/* Supporting Line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 text-base sm:text-lg font-ui font-medium text-slate-300 max-w-2xl tracking-wide"
        >
          Web Developer • Creative Designer • Photographer • Video Editor
        </motion.p>

        {/* Additional Line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-3 text-xs sm:text-sm font-body text-slate-400 max-w-xl leading-relaxed"
        >
          A Cyber Security student with a creative mind and a passion for building experiences beyond code.
        </motion.p>

        {/* Floating Creative Tech Badges / Floating UI Fragments */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900/60 border border-cyan-500/20 text-cyan-300 text-xs font-mono backdrop-blur-sm">
            <Code className="w-3.5 h-3.5" />
            <span>Creative Tech</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900/60 border border-emerald-500/20 text-emerald-300 text-xs font-mono backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Cyber Security Focus</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900/60 border border-purple-500/20 text-purple-300 text-xs font-mono backdrop-blur-sm">
            <Camera className="w-3.5 h-3.5" />
            <span>Cinematic Visuals</span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <ShaderButton
            href="#projects"
            icon={ArrowRight}
            variant="primary"
          >
            EXPLORE WORK
          </ShaderButton>

          <a
            href="/Abdur_Rahman_I_Resume.pdf"
            download="Abdur_Rahman_I_Resume.pdf"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-ui font-semibold text-sm tracking-wide bg-gradient-to-r from-cyan-950/80 to-slate-900/80 text-cyan-300 border border-cyan-400/40 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,242,254,0.25)] transition-all duration-300 hover:-translate-y-0.5"
          >
            <span>DOWNLOAD RESUME</span>
            <span className="text-cyan-400 text-base">↓</span>
          </a>

          <FluidButton
            href="#photography"
          >
            VIEW PHOTOGRAPHY →
          </FluidButton>

          <ShaderButton
            href="#contact"
            variant="secondary"
          >
            START A PROJECT
          </ShaderButton>
        </motion.div>
      </div>

      {/* Floating Glassmorphic HUD Elements in Corners */}
      <div className="hidden lg:block absolute bottom-12 left-10 text-left font-mono text-[11px] text-slate-500 glass-card p-3 rounded-xl border border-slate-800 pointer-events-none">
        <div className="text-cyan-400 font-semibold mb-1 flex items-center gap-1.5">
          <Terminal className="w-3 h-3" />
          <span>SYS.TELEMETRY • SEC_OPS</span>
        </div>
        <div>ROLE: CREATIVE TECHNOLOGIST</div>
        <div>SEC_CORE: ZERO TRUST / SHA-256</div>
        <div>STATUS: ACTIVE &amp; VERIFIED</div>
      </div>

      <div className="hidden lg:block absolute bottom-12 right-10 text-right font-mono text-[11px] text-slate-500 glass-card p-3 rounded-xl border border-slate-800 pointer-events-none">
        <div className="text-purple-400 font-semibold mb-1 flex items-center justify-end gap-1.5">
          <Layers className="w-3 h-3" />
          <span>EXPERIENCE FLOW</span>
        </div>
        <div>SCROLL DOWN TO TRAVEL</div>
        <div>60FPS GSAP DRIVEN ENGINE</div>
      </div>
    </section>
  );
}
