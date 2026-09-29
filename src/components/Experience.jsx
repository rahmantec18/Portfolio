import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, Calendar, Award, Sparkles, Building, Video, Code, Camera, Palette } from "lucide-react";
import { timelineExperience } from "../data/experience";
import TubeLight from "./framer/TubeLight";

gsap.registerPlugin(ScrollTrigger);

const roleIcons = {
  "Web Developer": Code,
  "Video Editor": Video,
  "Photography & Videography Team Member": Camera,
  "Designing Team Member": Palette
};

export default function Experience() {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, idx) => {
        if (!item) return;

        gsap.fromTo(
          item,
          {
            x: idx % 2 === 0 ? -60 : 60,
            opacity: 0,
            scale: 0.95
          },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative min-h-screen w-full py-28 bg-transparent text-slate-100 overflow-hidden"
    >
      {/* Adaptive Career Journey & Milestone Beacon Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-[700px] h-[700px] bg-gradient-to-tr from-cyan-900/15 via-blue-900/10 to-transparent rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute top-20 right-10 w-44 h-44 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 xs:px-6 relative z-10 w-full space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300 tracking-[0.25em] uppercase">
            <Briefcase className="w-3.5 h-3.5" />
            <span>TRAJECTORY &amp; ENGAGEMENTS</span>
          </div>

          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-tight text-white break-words">
            EXPERIENCE.
          </h2>

          <div className="w-36 mx-auto py-1">
            <TubeLight stop4="#00f2fe" stop3="#8b5cf6" height={1.5} />
          </div>

          <p className="text-xs xs:text-sm sm:text-base md:text-lg font-ui text-slate-300 leading-relaxed max-w-xl mx-auto px-2">
            Practical development, visual media coverage, and collaborative team roles.
          </p>
        </div>

        {/* Cinematic Vertical Timeline - Clean 3-device alignment */}
        <div className="relative border-l border-slate-800/80 ml-2 pl-4 sm:ml-24 md:ml-28 sm:pl-8 md:pl-10 space-y-8 sm:space-y-10">
          {timelineExperience.map((exp, idx) => {
            const Icon = roleIcons[exp.role] || Briefcase;
            return (
              <div
                key={`${exp.organization}-${exp.role}-${idx}`}
                ref={(el) => (itemsRef.current[idx] = el)}
                className="relative group"
              >
                {/* Left Floating Year / Status (Desktop) - No circular dots */}
                <div className="hidden sm:block absolute -left-36 top-1 w-28 text-right">
                  <span className={`font-display font-black text-xl sm:text-2xl transition-colors ${
                    exp.year === "Active"
                      ? "text-emerald-400 font-bold tracking-wider"
                      : "text-slate-500 group-hover:text-cyan-400"
                  }`}>
                    {exp.year}
                  </span>
                </div>

                {/* Experience Card */}
                <div className="p-5 sm:p-8 rounded-3xl glass-card border border-white/10 hover:border-cyan-400/40 transition-all duration-300 space-y-3 shadow-xl">
                  {/* Top Year (Mobile) & Period */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="sm:hidden font-display font-bold text-lg text-cyan-400">
                      {exp.year}
                    </span>
                    <span className="text-xs font-mono text-cyan-400 tracking-wider">
                      {exp.period}
                    </span>
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700">
                      {exp.type}
                    </span>
                  </div>

                  {/* Role and Organization */}
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-cyan-400/10 text-cyan-300 border border-cyan-400/20 shrink-0 mt-1">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {exp.role}
                      </h3>
                      <h4 className="text-sm sm:text-base font-ui font-medium text-slate-400 mt-0.5">
                        {exp.organization}
                      </h4>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm font-body text-slate-400 leading-relaxed pt-2">
                    {exp.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
