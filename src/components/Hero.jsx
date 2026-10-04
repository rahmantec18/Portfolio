import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Code, Camera, Sparkles, Terminal, Layers, Eye, Download } from "lucide-react";
import HeroScene3D from "./3d/HeroScene3D";
import ShaderButton from "./framer/ShaderButton";
import FluidButton from "./framer/FluidButton";

export default function Hero({ isEnhanced = true, onOpenResume }) {
  const heroRef = useRef(null);
  const nameRef = useRef(null);

  const phrases = ["I DESIGN.", "I CAPTURE.", "I EDIT."];

  // Interactive Cursor Color Fill tracking with smooth physics lerp
  useEffect(() => {
    let animId;
    let targetX = -1000;
    let targetY = -1000;
    let currentX = -1000;
    let currentY = -1000;
    let targetOpacity = 0;
    let currentOpacity = 0;

    const handleMouseMove = (e) => {
      const el = nameRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;

      // Distance from cursor to name rect boundaries
      const dx = Math.max(rect.left - e.clientX, 0, e.clientX - rect.right);
      const dy = Math.max(rect.top - e.clientY, 0, e.clientY - rect.bottom);
      const distance = Math.hypot(dx, dy);

      // Activate color fill when cursor goes over or around the name (within 280px radius)
      if (distance < 280) {
        targetOpacity = Math.max(0, Math.min(1, 1 - (distance / 280) * 0.65));
      } else {
        targetOpacity = 0;
      }
    };

    const handleMouseLeave = () => {
      targetOpacity = 0;
    };

    // Touch support for tablets & mobile devices
    const handleTouchMove = (e) => {
      if (!e.touches || e.touches.length === 0) return;
      const touch = e.touches[0];
      const el = nameRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      targetX = touch.clientX - rect.left;
      targetY = touch.clientY - rect.top;
      targetOpacity = 1;
    };

    const handleTouchEnd = () => {
      targetOpacity = 0;
    };

    // Continuous 60/120 FPS lerp loop for silky momentum
    const render = () => {
      animId = requestAnimationFrame(render);
      const el = nameRef.current;
      if (!el) return;

      currentX += (targetX - currentX) * 0.22;
      currentY += (targetY - currentY) * 0.22;
      currentOpacity += (targetOpacity - currentOpacity) * 0.16;

      el.style.setProperty("--mouse-x", `${currentX.toFixed(1)}px`);
      el.style.setProperty("--mouse-y", `${currentY.toFixed(1)}px`);
      el.style.setProperty("--mask-opacity", currentOpacity.toFixed(3));
    };

    animId = requestAnimationFrame(render);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-16 overflow-hidden bg-transparent"
    >
      {/* 3D Canvas Background with subtle, minimal wireframe crystal */}
      {isEnhanced && <HeroScene3D />}

      {/* Neat & Minimal Ambient Center Glow - Ultra-soft 3.5% opacity */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[320px] bg-cyan-500/[0.035] rounded-full blur-[100px] pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 xs:px-6 flex flex-col items-center text-center">
        {/* Minimal Kicker Badge */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/60 border border-slate-800 backdrop-blur-sm mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80 animate-pulse" />
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-slate-300 font-medium">
            PORTFOLIO &bull; ABDUR RAHMAN I
          </span>
        </motion.div>

        {/* Main Cinematic Name Headline with Interactive Cursor Color Fill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col items-center justify-center w-full my-2"
        >
          <div
            ref={nameRef}
            className="relative select-none text-center inline-block cursor-default"
            style={{
              "--mouse-x": "-1000px",
              "--mouse-y": "-1000px",
              "--mask-opacity": "0"
            }}
          >
            {/* Minimal ambient cursor spotlight glow behind the text */}
            <div
              className="absolute pointer-events-none rounded-full blur-2xl transition-opacity duration-200 -z-10"
              style={{
                width: "280px",
                height: "280px",
                transform: "translate(-50%, -50%)",
                left: "var(--mouse-x, -1000px)",
                top: "var(--mouse-y, -1000px)",
                background:
                  "radial-gradient(circle, rgba(0, 242, 254, 0.16) 0%, rgba(139, 92, 246, 0.08) 50%, transparent 75%)",
                opacity: "var(--mask-opacity, 0)"
              }}
            />

            {/* Base Typography Layer: Crisp Pure White */}
            <h1 className="font-['Syne',sans-serif] font-black tracking-tight text-white uppercase text-center leading-[0.92] text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl">
              <span className="block">ABDUR</span>
              <span className="block">RAHMAN</span>
            </h1>

            {/* Color Fill Layer: Dynamic Gradient revealed by Cursor Radial Mask */}
            <h1
              aria-hidden="true"
              className="absolute inset-0 font-['Syne',sans-serif] font-black tracking-tight uppercase text-center leading-[0.92] text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl pointer-events-none"
              style={{
                opacity: "var(--mask-opacity, 0)",
                WebkitMaskImage:
                  "radial-gradient(circle 240px at var(--mouse-x, -1000px) var(--mouse-y, -1000px), black 0%, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.2) 75%, transparent 100%)",
                maskImage:
                  "radial-gradient(circle 240px at var(--mouse-x, -1000px) var(--mouse-y, -1000px), black 0%, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.2) 75%, transparent 100%)"
              }}
            >
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400">
                <span className="block">ABDUR</span>
                <span className="block">RAHMAN</span>
              </div>
            </h1>
          </div>
        </motion.div>

        {/* Secondary Title / Creative Technologist Roles - Minimal Monospace */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 sm:mt-7 flex flex-wrap items-center justify-center gap-2 xs:gap-3 sm:gap-4 font-mono text-xs sm:text-sm tracking-[0.2em] text-slate-400 uppercase font-medium"
        >
          <span>CREATIVE TECHNOLOGIST</span>
          <span className="w-1 h-1 rounded-full bg-cyan-500/50" />
          <span>WEB DEVELOPER</span>
          <span className="w-1 h-1 rounded-full bg-purple-500/50" />
          <span>CYBER SECURITY</span>
        </motion.div>

        {/* Creative Disciplines: I DESIGN. I CAPTURE. I EDIT. */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-5 flex flex-wrap items-center justify-center gap-2 xs:gap-3 sm:gap-5 font-display font-bold text-xs xs:text-sm sm:text-lg text-slate-300"
        >
          {phrases.map((phrase, idx) => (
            <span key={phrase} className="flex items-center gap-2 xs:gap-3 sm:gap-5">
              <span className="hover:text-cyan-300 transition-colors duration-200 tracking-wider">
                {phrase}
              </span>
              {idx < phrases.length - 1 && (
                <span className="w-1 h-1 rounded-full bg-slate-600" />
              )}
            </span>
          ))}
        </motion.div>

        {/* Supporting Line */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-4 text-xs xs:text-sm sm:text-base font-ui font-medium text-slate-300 max-w-2xl tracking-wide px-2"
        >
          Web Developer &bull; Creative Designer &bull; Photographer &bull; Video Editor
        </motion.p>

        {/* Personal Mission Statement */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-2.5 text-xs sm:text-sm font-body text-slate-400 max-w-xl leading-relaxed px-2"
        >
          A Cyber Security student with a creative mind and a passion for building experiences beyond code.
        </motion.p>

        {/* Floating Creative Tech Badges - Neat & Clean */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-6 sm:mt-7 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 px-2"
        >
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/50 border border-slate-800 text-slate-300 text-[11px] sm:text-xs font-mono">
            <Code className="w-3.5 h-3.5 text-cyan-400" />
            <span>Creative Tech</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/50 border border-slate-800 text-slate-300 text-[11px] sm:text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Cyber Security Focus</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/50 border border-slate-800 text-slate-300 text-[11px] sm:text-xs font-mono">
            <Camera className="w-3.5 h-3.5 text-purple-400" />
            <span>Cinematic Visuals</span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-8 sm:mt-9 flex flex-wrap items-center justify-center gap-2.5 xs:gap-3 sm:gap-4 max-w-2xl px-2 w-full"
        >
          <ShaderButton
            href="#projects"
            icon={ArrowRight}
            variant="primary"
            className="w-full xs:w-auto"
          >
            EXPLORE WORK
          </ShaderButton>

          <div className="inline-flex rounded-xl p-0.5 bg-slate-900/80 border border-slate-700/60 hover:border-cyan-400/50 transition-all duration-300 w-full xs:w-auto justify-between sm:justify-start">
            <button
              onClick={onOpenResume}
              className="flex-1 xs:flex-initial inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 rounded-lg font-ui font-semibold text-xs sm:text-sm tracking-wide text-slate-200 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
            >
              <Eye className="w-4 h-4 text-cyan-400" />
              <span>VIEW RESUME</span>
            </button>
            <a
              href={`${import.meta.env.BASE_URL}Abdur_Rahman_I_Resume.pdf`}
              download="Abdur_Rahman_I_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-3.5 py-3 rounded-lg hover:bg-white/10 text-slate-300 text-xs font-mono font-semibold transition-all border-l border-slate-800"
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

      {/* Minimal Glassmorphic HUD Elements in Corners */}
      <div className="hidden xl:block absolute bottom-10 left-10 text-left font-mono text-[11px] text-slate-500 glass-card p-3 rounded-xl border border-slate-800/80 pointer-events-none">
        <div className="text-cyan-400 font-semibold mb-1 flex items-center gap-1.5">
          <Terminal className="w-3 h-3" />
          <span>SYS.TELEMETRY &bull; SEC_OPS</span>
        </div>
        <div>ROLE: CREATIVE TECHNOLOGIST</div>
        <div>SEC_CORE: ZERO TRUST / SHA-256</div>
        <div>STATUS: ACTIVE &amp; VERIFIED</div>
      </div>

      <div className="hidden xl:block absolute bottom-10 right-10 text-right font-mono text-[11px] text-slate-500 glass-card p-3 rounded-xl border border-slate-800/80 pointer-events-none">
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
