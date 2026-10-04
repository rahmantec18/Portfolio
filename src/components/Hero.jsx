import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Code, Camera, Sparkles, Terminal, Layers, Eye, Download } from "lucide-react";
import HeroScene3D from "./3d/HeroScene3D";
import Ridgelume from "./framer/Ridgelume";
import ShaderButton from "./framer/ShaderButton";
import FluidButton from "./framer/FluidButton";
import TubeLight from "./framer/TubeLight";
import VolumetricCursorLighting from "./framer/VolumetricCursorLighting";

export default function Hero({ isEnhanced = true, onOpenResume }) {
  const heroRef = useRef(null);
  const [lightingOpacity, setLightingOpacity] = useState(0.38);

  const phrases = ["I DESIGN.", "I CAPTURE.", "I EDIT."];

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-16 overflow-hidden bg-transparent"
    >
      {/* 3D Canvas Background */}
      {isEnhanced && <HeroScene3D />}

      {/* Interactive Volumetric Cursor Lighting with ABDUR RAHMAN (Reduced opacity for subtle elegance) */}
      <VolumetricCursorLighting opacity={lightingOpacity} isEnhanced={isEnhanced} />

      {/* Atmospheric Horizon Light */}
      <div className="absolute -bottom-20 left-0 right-0 h-40 opacity-40">
        <Ridgelume colorA="#0A9FBD" colorB="#00D2FF" colorC="#8b5cf6" />
      </div>

      {/* Adaptive Hero Aurora Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[800px] h-[450px] bg-gradient-to-tr from-cyan-500/15 via-purple-600/15 to-transparent blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute -top-10 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 xs:px-6 flex flex-col items-center text-center">
        {/* Subtle Tube Light accent */}
        <div className="w-36 sm:w-48 mb-6">
          <TubeLight stop4="#00f2fe" stop3="#8b5cf6" height={2} />
        </div>

        {/* Small Intro Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 backdrop-blur-md mb-6 shadow-lg shadow-cyan-950/20"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-slate-300 font-semibold">
            ABDUR RAHMAN I
          </span>
        </motion.div>

        {/* Main Headline - Perfect 3-System Responsive Scaling */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-black tracking-tight text-white max-w-4xl leading-[1.08] break-words"
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
          className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-2 xs:gap-3 sm:gap-5 font-display font-bold text-xs xs:text-sm sm:text-lg md:text-xl text-slate-300"
        >
          {phrases.map((phrase, idx) => (
            <span key={phrase} className="flex items-center gap-2 xs:gap-3 sm:gap-5">
              <span className="hover:text-cyan-300 transition-colors duration-300 tracking-wider">
                {phrase}
              </span>
              {idx < phrases.length - 1 && (
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400/80" />
              )}
            </span>
          ))}
        </motion.div>

        {/* Supporting Line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-5 sm:mt-6 text-xs xs:text-sm sm:text-base md:text-lg font-ui font-semibold text-cyan-200/90 max-w-2xl tracking-wide px-2"
        >
          Web Developer • Creative Designer • Photographer • Video Editor
        </motion.p>

        {/* Additional Line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-3 text-xs sm:text-sm font-body text-slate-300/90 max-w-xl leading-relaxed px-2"
        >
          A Cyber Security student with a creative mind and a passion for building experiences beyond code.
        </motion.p>

        {/* Floating Creative Tech Badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-2"
        >
          <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-lg bg-slate-900/70 border border-cyan-500/25 text-cyan-300 text-[11px] sm:text-xs font-mono backdrop-blur-sm shadow-sm">
            <Code className="w-3.5 h-3.5" />
            <span>Creative Tech</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-lg bg-slate-900/70 border border-emerald-500/25 text-emerald-300 text-[11px] sm:text-xs font-mono backdrop-blur-sm shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Cyber Security Focus</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-lg bg-slate-900/70 border border-purple-500/25 text-purple-300 text-[11px] sm:text-xs font-mono backdrop-blur-sm shadow-sm">
            <Camera className="w-3.5 h-3.5" />
            <span>Cinematic Visuals</span>
          </div>
        </motion.div>

        {/* Action Buttons - Clean alignment across Laptop, Tablet, Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-2.5 xs:gap-3 sm:gap-4 max-w-2xl px-2 w-full"
        >
          <ShaderButton
            href="#projects"
            icon={ArrowRight}
            variant="primary"
            className="w-full xs:w-auto"
          >
            EXPLORE WORK
          </ShaderButton>

          <div className="inline-flex rounded-xl p-0.5 bg-gradient-to-r from-cyan-950/90 to-slate-900/90 border border-cyan-400/40 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,242,254,0.25)] transition-all duration-300 w-full xs:w-auto justify-between sm:justify-start">
            <button
              onClick={onOpenResume}
              className="flex-1 xs:flex-initial inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 rounded-lg font-ui font-semibold text-xs sm:text-sm tracking-wide text-cyan-200 hover:text-white hover:bg-cyan-500/15 transition-all cursor-pointer"
            >
              <Eye className="w-4 h-4 text-cyan-400" />
              <span>VIEW RESUME</span>
            </button>
            <a
              href={`${import.meta.env.BASE_URL}Abdur_Rahman_I_Resume.pdf`}
              download="Abdur_Rahman_I_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-3.5 py-3 rounded-lg hover:bg-white/10 text-cyan-300 text-xs font-mono font-semibold transition-all border-l border-cyan-400/30"
              title="Download Official PDF"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>PDF</span>
            </a>
          </div>

          <FluidButton
            href="#photography"
            className="w-full xs:w-auto"
          >
            VIEW PHOTOGRAPHY →
          </FluidButton>

          <ShaderButton
            href="#contact"
            variant="secondary"
            className="w-full xs:w-auto"
          >
            START A PROJECT
          </ShaderButton>
        </motion.div>
      </div>

      {/* Floating Glassmorphic HUD Elements in Corners - Safe for wide desktop, hidden on laptop/tablet to prevent layer overlap */}
      <div className="hidden xl:block absolute bottom-12 left-10 text-left font-mono text-[11px] text-slate-500 glass-card p-3 rounded-xl border border-slate-800">
        <div className="text-cyan-400 font-semibold mb-1 flex items-center gap-1.5">
          <Terminal className="w-3 h-3" />
          <span>SYS.TELEMETRY • SEC_OPS</span>
        </div>
        <div>ROLE: CREATIVE TECHNOLOGIST</div>
        <div>SEC_CORE: ZERO TRUST / SHA-256</div>
        <div>STATUS: ACTIVE &amp; VERIFIED</div>
        <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center gap-1.5 text-[10px]">
          <span className="text-cyan-300 font-semibold">LIGHTING:</span>
          {[0.2, 0.38, 0.65, 0.9].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setLightingOpacity(lvl)}
              className={`px-1.5 py-0.5 rounded cursor-pointer transition-all ${
                lightingOpacity === lvl
                  ? "bg-cyan-500/25 text-cyan-300 border border-cyan-400/50 shadow-[0_0_8px_rgba(0,242,254,0.3)]"
                  : "bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-700/60"
              }`}
              title={`Set cursor lighting opacity to ${lvl}`}
            >
              {lvl === 0.38 ? "0.4x (Def)" : `${lvl}x`}
            </button>
          ))}
        </div>
      </div>

      <div className="hidden xl:block absolute bottom-12 right-10 text-right font-mono text-[11px] text-slate-500 glass-card p-3 rounded-xl border border-slate-800 pointer-events-none">
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
