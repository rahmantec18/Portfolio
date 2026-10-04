import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Globe, Layers, ArrowUpRight, Sparkles, Code2, Heart, Activity } from "lucide-react";
import { webProjects } from "../data/projects";
import ShaderButton from "./framer/ShaderButton";
import TubeLight from "./framer/TubeLight";

gsap.registerPlugin(ScrollTrigger);

// Custom adaptive lighting signatures for each project
const projectThemes = [
  {
    id: "jjk-cursed-energy",
    name: "JJK Cursed Energy",
    primaryGlow: "rgba(187, 0, 255, 0.18)",
    secondaryGlow: "rgba(244, 63, 94, 0.14)",
    accentColor: "#bb00ff",
    ringColor: "border-purple-500/40",
    glowFilter: "shadow-[0_0_35px_rgba(187,0,255,0.25)]",
    ambientGradient: "radial-gradient(circle at 75% 30%, rgba(187,0,255,0.18) 0%, rgba(244,63,94,0.1) 40%, transparent 70%)"
  },
  {
    id: "profolio",
    name: "Profolio",
    primaryGlow: "rgba(0, 242, 254, 0.18)",
    secondaryGlow: "rgba(59, 130, 246, 0.14)",
    accentColor: "#00f2fe",
    ringColor: "border-cyan-500/40",
    glowFilter: "shadow-[0_0_35px_rgba(0,242,254,0.25)]",
    ambientGradient: "radial-gradient(circle at 25% 45%, rgba(0,242,254,0.18) 0%, rgba(59,130,246,0.1) 40%, transparent 70%)"
  },
  {
    id: "crochet-house",
    name: "Crochet House",
    primaryGlow: "rgba(236, 72, 153, 0.18)",
    secondaryGlow: "rgba(251, 191, 36, 0.14)",
    accentColor: "#ec4899",
    ringColor: "border-pink-500/40",
    glowFilter: "shadow-[0_0_35px_rgba(236,72,153,0.25)]",
    ambientGradient: "radial-gradient(circle at 65% 60%, rgba(236,72,153,0.18) 0%, rgba(251,191,36,0.12) 40%, transparent 70%)"
  },
  {
    id: "profolio-healthcare",
    name: "Profolio Healthcare",
    primaryGlow: "rgba(56, 189, 248, 0.18)",
    secondaryGlow: "rgba(16, 185, 129, 0.14)",
    accentColor: "#38bdf8",
    ringColor: "border-sky-500/40",
    glowFilter: "shadow-[0_0_35px_rgba(56,189,248,0.25)]",
    ambientGradient: "radial-gradient(circle at 35% 75%, rgba(56,189,248,0.18) 0%, rgba(16,185,129,0.12) 40%, transparent 70%)"
  }
];

export default function Projects() {
  const sectionRef = useRef(null);
  const projectCardsRef = useRef([]);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      projectCardsRef.current.forEach((card, idx) => {
        if (!card) return;

        // 3D perspective shift on scroll
        gsap.fromTo(
          card,
          {
            rotateX: 8,
            rotateY: idx % 2 === 0 ? -3 : 3,
            z: -50,
            opacity: 0.4,
            scale: 0.96
          },
          {
            rotateX: 0,
            rotateY: 0,
            z: 0,
            opacity: 1,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "center center",
              scrub: 0.8,
              onEnter: () => setActiveProjectIdx(idx),
              onEnterBack: () => setActiveProjectIdx(idx)
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);


  const activeTheme = projectThemes[activeProjectIdx] || projectThemes[0];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen w-full py-24 sm:py-28 bg-transparent text-slate-100 overflow-hidden transition-colors duration-1000"
    >
      {/* Dynamic Adaptive Background System - Seamless transition behind all content */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-out"
        style={{
          background: activeTheme.ambientGradient
        }}
      />

      {/* Primary Adaptive Ambient Glow Orb 1 */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none transition-all duration-1000 ease-out"
        style={{
          top: "20%",
          right: "5%",
          backgroundColor: activeTheme.primaryGlow
        }}
      />

      {/* Secondary Adaptive Ambient Glow Orb 2 */}
      <div
        className="absolute w-[550px] h-[550px] rounded-full blur-[160px] pointer-events-none transition-all duration-1000 ease-out"
        style={{
          bottom: "15%",
          left: "5%",
          backgroundColor: activeTheme.secondaryGlow
        }}
      />

      {/* Subtle adaptive circuit line accents */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 xs:px-6 relative z-10 w-full space-y-12 sm:space-y-16">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-xs font-mono text-cyan-400 tracking-[0.25em] uppercase">
            <Layers className="w-3.5 h-3.5" />
            <span>FEATURED WEB PRODUCTIONS</span>
          </div>

          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-tight text-white break-words">
            WEB PROJECTS.
          </h2>

          <div className="w-32 mx-auto py-1">
            <TubeLight stop4="#00f2fe" stop3="#3b82f6" height={1.5} />
          </div>

          <p className="text-xs xs:text-sm sm:text-base md:text-lg font-ui text-slate-300 leading-relaxed px-2">
            Explorations in high-performance web development, digital storefronts, and 3D healthcare interfaces.
          </p>
        </div>


        {/* Cinematic Projects Showcase: Large 3D Browser Environments */}
        <div className="space-y-14 sm:space-y-20 perspective-2000">
          {webProjects.map((project, idx) => {
            const theme = projectThemes[idx] || projectThemes[0];
            const isActive = activeProjectIdx === idx;

            return (
              <div
                key={project.id}
                ref={(el) => (projectCardsRef.current[idx] = el)}
                onMouseEnter={() => setActiveProjectIdx(idx)}
                className={`group relative rounded-3xl glass-panel p-3 xs:p-4 sm:p-6 lg:p-8 border transition-all duration-500 shadow-2xl preserve-3d ${
                  isActive ? theme.ringColor : "border-white/10"
                }`}
                style={{
                  boxShadow: isActive
                    ? `0 20px 50px -10px ${theme.primaryGlow}, 0 0 30px -5px ${theme.secondaryGlow}`
                    : undefined
                }}
              >
                {/* Outer Browser Window Frame */}
                <div className="w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
                  {/* Browser Top Chrome / Nav Bar */}
                  <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-[#070b19] border-b border-slate-800/80 gap-2">
                    {/* Traffic Light Dots & Project Number */}
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500/80" />
                        <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500/80" />
                        <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/80" />
                      </div>
                      <span
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 font-bold ml-1"
                        style={{ color: theme.accentColor }}
                      >
                        0{idx + 1}
                      </span>
                    </div>

                    {/* Browser URL Input Bar Mockup */}
                    <div className="hidden xs:flex flex-1 max-w-xs sm:max-w-md mx-2 sm:mx-4 px-3 sm:px-4 py-1 rounded-md bg-slate-900/90 border border-slate-700/60 text-[10px] sm:text-[11px] font-mono text-slate-400 truncate items-center justify-between">
                      <span className="truncate">{project.url}</span>
                      <Globe className="w-3 h-3 text-cyan-400 shrink-0 ml-2" />
                    </div>

                    {/* Project Tag Badge */}
                    <div
                      className="text-[10px] sm:text-[11px] font-mono px-2.5 sm:px-3 py-0.5 rounded-full flex items-center gap-1.5 shrink-0"
                      style={{
                        backgroundColor: `${theme.accentColor}20`,
                        color: theme.accentColor,
                        borderColor: `${theme.accentColor}40`,
                        borderWidth: "1px"
                      }}
                    >
                      {project.id === "jjk-cursed-energy" && (
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
                      )}
                      <span>{project.badge}</span>
                    </div>
                  </div>

                  {/* Browser Content & Preview */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 p-4 sm:p-6 lg:p-10 items-center bg-gradient-to-b from-[#070b19] to-[#04060e]">
                    {/* Left Column: Visual Mockup / Interactive Frame */}
                    <div className="lg:col-span-7 rounded-xl overflow-hidden border border-slate-800 relative group-hover:border-cyan-400/30 transition-all duration-500 bg-slate-950 flex items-center justify-center">
                      <img
                        src={project.previewImage}
                        alt={`${project.title} Preview`}
                        className="w-full h-auto max-h-[420px] object-contain sm:object-cover transform group-hover:scale-[1.02] transition-transform duration-700"
                        loading="lazy"
                      />

                      {/* Gradient Overlay for Depth */}
                      <div className="absolute inset-0 bg-gradient-to-t from-deep-950/60 via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* Right Column: Project Details & Action */}
                    <div className="lg:col-span-5 space-y-4 sm:space-y-6">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="text-xs font-mono font-bold tracking-widest uppercase"
                            style={{ color: theme.accentColor }}
                          >
                            PROJECT 0{idx + 1} • {project.category}
                          </span>
                        </div>
                        <h3 className="text-xl xs:text-2xl sm:text-3xl font-display font-bold text-white mt-1 break-words">
                          {project.title}
                        </h3>
                      </div>

                      <p className="text-xs sm:text-sm font-body text-slate-300 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tech Badges */}
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 sm:px-3 py-1 rounded-lg bg-slate-900 border border-slate-700/80 text-[11px] sm:text-xs font-mono text-slate-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Interactive Button */}
                      <div className="pt-3 sm:pt-4 flex flex-wrap items-center gap-3">
                        <ShaderButton
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          cursorText={project.id === "jjk-cursed-energy" ? "LAUNCH" : "EXPLORE"}
                          icon={ArrowUpRight}
                          variant="primary"
                          className="w-full xs:w-auto"
                        >
                          {project.id === "jjk-cursed-energy" ? "LAUNCH 3D EXPERIENCE ⚡" : "EXPLORE PROJECT →"}
                        </ShaderButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
