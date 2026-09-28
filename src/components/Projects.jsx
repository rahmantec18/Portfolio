import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Globe, Layers, ArrowUpRight, Shield } from "lucide-react";
import { webProjects } from "../data/projects";
import ShaderButton from "./framer/ShaderButton";
import TubeLight from "./framer/TubeLight";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef(null);
  const projectCardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      projectCardsRef.current.forEach((card, idx) => {
        if (!card) return;

        // 3D perspective shift on scroll: settles into full clarity when centered in viewport
        gsap.fromTo(
          card,
          {
            rotateX: 10,
            rotateY: idx % 2 === 0 ? -4 : 4,
            z: -60,
            opacity: 0.4,
            scale: 0.95
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
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen w-full py-28 bg-transparent text-slate-100 overflow-hidden"
    >
      {/* Background Lighting */}
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-10 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-400 tracking-[0.25em] uppercase">
            <Layers className="w-3.5 h-3.5" />
            <span>FEATURED WEB PRODUCTIONS</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-white">
            WEB PROJECTS.
          </h2>

          <div className="w-32 mx-auto py-2">
            <TubeLight stop4="#00f2fe" stop3="#3b82f6" height={1.5} />
          </div>

          <p className="text-base sm:text-lg font-ui text-slate-300 leading-relaxed">
            Explorations in high-performance web development, digital storefronts, and 3D healthcare interfaces.
          </p>
        </div>

        {/* Cinematic Projects Showcase: Large 3D Browser Environments */}
        <div className="space-y-24 perspective-2000">
          {webProjects.map((project, idx) => (
            <div
              key={project.id}
              ref={(el) => (projectCardsRef.current[idx] = el)}
              className="group relative rounded-3xl glass-panel p-4 sm:p-8 border border-white/10 hover:border-cyan-400/40 transition-all duration-500 shadow-2xl preserve-3d"
            >
              {/* Outer Browser Window Frame */}
              <div className="w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
                {/* Browser Top Chrome / Nav Bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#070b19] border-b border-slate-800/80">
                  {/* Traffic Light Dots */}
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>

                  {/* Browser URL Input Bar Mockup */}
                  <div className="flex-1 max-w-md mx-4 px-4 py-1 rounded-md bg-slate-900/90 border border-slate-700/60 text-[11px] font-mono text-slate-400 truncate flex items-center justify-between">
                    <span className="truncate">{project.url}</span>
                    <Globe className="w-3 h-3 text-cyan-400 shrink-0 ml-2" />
                  </div>

                  {/* Project Tag Badge */}
                  <div className={`text-[11px] font-mono px-3 py-0.5 rounded-full flex items-center gap-1.5 ${
                    project.id === "jjk-cursed-energy"
                      ? "bg-purple-500/20 text-purple-300 border border-purple-400/50 shadow-[0_0_12px_rgba(187,0,255,0.3)]"
                      : "bg-cyan-400/10 text-cyan-300 border border-cyan-400/20"
                  }`}>
                    {project.id === "jjk-cursed-energy" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
                    )}
                    <span>{project.badge}</span>
                  </div>
                </div>

                {/* Browser Content & Preview */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 items-center bg-gradient-to-b from-[#070b19] to-[#04060e]">
                  {/* Left Column: Visual Mockup / Interactive Frame */}
                  <div className="lg:col-span-7 rounded-xl overflow-hidden border border-slate-800 relative group-hover:border-cyan-400/30 transition-all duration-500">
                    <img
                      src={project.previewImage}
                      alt={`${project.title} Preview`}
                      className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-700"
                      loading="lazy"
                    />

                    {/* Gradient Overlay for Cinematic Depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-950/60 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Right Column: Project Details & Action */}
                  <div className="lg:col-span-5 space-y-6">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                        {project.category}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
                        {project.title}
                      </h3>
                    </div>

                    <p className="text-sm font-body text-slate-300 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-700/80 text-xs font-mono text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Interactive Button */}
                    <div className="pt-4 flex flex-wrap items-center gap-3">
                      <ShaderButton
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        cursorText={project.id === "jjk-cursed-energy" ? "LAUNCH" : "EXPLORE"}
                        icon={ArrowUpRight}
                        variant="primary"
                      >
                        {project.id === "jjk-cursed-energy" ? "LAUNCH 3D EXPERIENCE ⚡" : "EXPLORE PROJECT →"}
                      </ShaderButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
