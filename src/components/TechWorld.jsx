import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code,
  FileCode,
  Layers,
  Server,
  Cpu,
  Terminal,
  Coffee,
  GitBranch,
  Globe,
  Cloud,
  Mail,
  Palette,
  Sparkles
} from "lucide-react";
import { techSkills } from "../data/skills";
import TubeLight from "./framer/TubeLight";
import MiniCyberTheme from "./MiniCyberTheme";

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  Code,
  Palette,
  FileCode,
  Layers,
  Server,
  Cpu,
  Terminal,
  Coffee,
  GitBranch,
  Globe,
  Cloud,
  Mail
};

export default function TechWorld() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 3D Depth Approach on Scroll: settles into full clarity when cards reach viewport center
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const depth = (i % 3 + 1) * 35;
        const rotateDir = i % 2 === 0 ? 5 : -5;
        const xOffset = ((i % 4) - 1.5) * 20;

        gsap.fromTo(
          card,
          {
            z: -depth,
            y: 45,
            x: xOffset,
            rotateX: 8,
            rotateY: rotateDir,
            opacity: 0.35
          },
          {
            z: 0,
            y: 0,
            x: 0,
            rotateX: 0,
            rotateY: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              end: "center center",
              scrub: 0.8
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="tech"
      ref={sectionRef}
      className="relative min-h-screen w-full py-28 bg-transparent text-slate-100 overflow-hidden flex flex-col justify-center"
    >
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Atmospheric Tech Orbs */}
      <div className="absolute top-1/4 -left-20 w-[550px] h-[550px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[550px] h-[550px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        {/* Section Heading & Description */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/50 border border-blue-500/30 text-xs font-mono text-cyan-400 tracking-[0.25em] uppercase">
            <Cpu className="w-3.5 h-3.5" />
            <span>DEVELOPMENT ENVIRONMENT</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-white">
            I BUILD DIGITAL EXPERIENCES.
          </h2>

          <div className="w-32 mx-auto py-2">
            <TubeLight stop4="#38bdf8" stop3="#6366f1" height={1.5} />
          </div>

          <p className="text-base sm:text-lg font-ui text-slate-300 leading-relaxed">
            From websites and interactive interfaces to backend systems and deployment, I enjoy turning ideas into functional digital experiences.
          </p>
        </div>

        {/* 3D Floating Tech Skill Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 perspective-1000">
          {techSkills.map((tech, idx) => {
            const IconComponent = iconMap[tech.icon] || Code;
            return (
              <div
                key={tech.name}
                ref={(el) => (cardsRef.current[idx] = el)}
                data-cursor="TECH"
                className="group relative p-6 rounded-2xl glass-card border border-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-2 preserve-3d"
              >
                {/* Dynamic Card Glow on Hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${tech.color}30 0%, transparent 70%)`
                  }}
                />

                <div className="relative z-10 flex flex-col items-start space-y-3">
                  {/* Icon & Category Pill */}
                  <div className="w-full flex items-center justify-between">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-lg"
                      style={{
                        backgroundColor: `${tech.color}15`,
                        border: `1px solid ${tech.color}40`,
                        color: tech.color
                      }}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800">
                      {tech.category}
                    </span>
                  </div>

                  {/* Name and Level */}
                  <div>
                    <h3 className="text-lg font-ui font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {tech.name}
                    </h3>
                    <p className="text-xs font-mono text-slate-400 mt-0.5">
                      {tech.level}
                    </p>
                  </div>
                </div>

                {/* Subtle bottom edge indicator */}
                <div
                  className="absolute bottom-0 left-6 right-6 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{ backgroundColor: tech.color }}
                />
              </div>
            );
          })}
        </div>

        {/* Mini Cyber Theme Component */}
        <MiniCyberTheme />
      </div>
    </section>
  );
}
