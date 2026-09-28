import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Palette, Layers, Image as ImageIcon, Sliders, Layout, Film, Sparkles } from "lucide-react";
import { designTools, designAreas } from "../data/skills";
import TubeLight from "./framer/TubeLight";

gsap.registerPlugin(ScrollTrigger);

const toolIcons = {
  Photoshop: ImageIcon,
  Lightroom: Sliders,
  Canva: Layout,
  CapCut: Film
};

export default function GraphicDesign() {
  const sectionRef = useRef(null);
  const layersContainerRef = useRef(null);
  const layer1Ref = useRef(null);
  const layer2Ref = useRef(null);
  const layer3Ref = useRef(null);
  const layer4Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Assemble layers on scroll: smoothly converges and finishes completely when centered in viewport
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: layersContainerRef.current,
          start: "top 85%",
          end: "center center",
          scrub: 0.8
        }
      });

      if (layer1Ref.current) {
        tl.fromTo(
          layer1Ref.current,
          { x: -60, rotate: -6, opacity: 0.2 },
          { x: 0, rotate: 0, opacity: 1, ease: "power2.out" },
          0
        );
      }
      if (layer2Ref.current) {
        tl.fromTo(
          layer2Ref.current,
          { y: 50, scale: 0.92, opacity: 0.3 },
          { y: 0, scale: 1, opacity: 1, ease: "power2.out" },
          0
        );
      }
      if (layer3Ref.current) {
        tl.fromTo(
          layer3Ref.current,
          { x: 60, rotate: 6, opacity: 0.2 },
          { x: 0, rotate: 0, opacity: 1, ease: "power2.out" },
          0
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="design"
      ref={sectionRef}
      className="relative min-h-screen w-full py-28 bg-transparent text-slate-100 overflow-hidden"
    >
      {/* Dynamic Creative Glows */}
      <div className="absolute top-1/3 left-10 w-[550px] h-[550px] bg-pink-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-[550px] h-[550px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full space-y-20">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-950/60 border border-pink-500/30 text-xs font-mono text-pink-300 tracking-[0.25em] uppercase">
            <Palette className="w-3.5 h-3.5" />
            <span>VISUAL IDENTITY &amp; CREATIVES</span>
          </div>

          <h2 className="text-3xl xs:text-4xl sm:text-6xl font-display font-black tracking-tight text-white break-words">
            I DESIGN VISUAL STORIES.
          </h2>

          <div className="w-36 mx-auto py-2">
            <TubeLight stop4="#ec4899" stop3="#8b5cf6" height={1.5} />
          </div>

          <p className="text-sm sm:text-lg font-ui text-slate-300 leading-relaxed px-2">
            From posters and social media creatives to photo editing and visual concepts, I enjoy turning simple ideas into visuals that stand out.
          </p>
        </div>

        {/* Section 30: Assemble Layer Interaction Graphic Studio Showcase */}
        <div
          ref={layersContainerRef}
          className="relative max-w-4xl mx-auto min-h-[360px] sm:min-h-[420px] rounded-3xl glass-panel p-4 sm:p-8 lg:p-12 border border-white/10 flex items-center justify-center overflow-hidden"
        >
          {/* Layer 1: Geometric Background Shape */}
          <div
            ref={layer1Ref}
            className="absolute w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-gradient-to-tr from-pink-500/20 via-purple-500/20 to-cyan-500/20 blur-xl pointer-events-none"
          />

          {/* Layer 2: Figma / Creative Canvas Artboard Frame */}
          <div
            ref={layer2Ref}
            className="relative z-10 w-full max-w-lg p-4 sm:p-6 rounded-2xl bg-slate-950/90 border border-pink-500/30 shadow-2xl space-y-4"
          >
            {/* Top Toolbar */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-[11px] sm:text-xs font-mono text-slate-400">
              <span className="text-pink-400 font-bold">ARTBOARD: SOCIAL_POSTER_01</span>
              <span>1080 × 1350 • CMYK</span>
            </div>

            {/* Poster Mock Content */}
            <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-slate-900 via-purple-950 to-deep-950 p-4 sm:p-6 flex flex-col justify-between border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/20 rounded-full blur-xl" />
              <div>
                <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase">
                  CREATIVE DIRECTION
                </span>
                <h4 className="text-lg xs:text-xl sm:text-2xl font-display font-black text-white leading-tight mt-1 break-words">
                  BOLD VISUAL IDENTITY &amp; DESIGN
                </h4>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/10 text-[10px] sm:text-[11px] font-mono text-slate-400">
                <span>BY ABDUR RAHMAN I</span>
                <span className="text-pink-400 font-bold">2026 EDITION</span>
              </div>
            </div>

            {/* Color Swatches Dock */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] font-mono text-slate-400">PALETTE:</span>
              <div className="flex gap-2">
                <span className="w-5 h-5 rounded-full bg-[#ec4899] shadow" />
                <span className="w-5 h-5 rounded-full bg-[#8b5cf6] shadow" />
                <span className="w-5 h-5 rounded-full bg-[#00f2fe] shadow" />
                <span className="w-5 h-5 rounded-full bg-[#fbbf24] shadow" />
              </div>
            </div>
          </div>

          {/* Layer 3: Floating Design Tools Badge */}
          <div
            ref={layer3Ref}
            className="hidden md:block absolute -bottom-4 right-6 p-4 rounded-xl glass-card border border-white/15 text-xs font-mono text-cyan-300 z-20 shadow-xl"
          >
            <span>LAYERS ASSEMBLED • 100% VECTOR PRECISION</span>
          </div>
        </div>

        {/* Design Tools & Creative Areas Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Tools Column (Canva, Photoshop, Lightroom, Capcut) */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-pink-400 font-semibold">
              PRIMARY DESIGN SUITE
            </h3>
            <div className="space-y-3">
              {designTools.map((tool) => {
                const IconComponent = toolIcons[tool.name] || Layout;
                return (
                  <div
                    key={tool.name}
                    data-cursor="TOOL"
                    className="p-4 rounded-2xl glass-card border border-white/10 hover:border-pink-500/40 transition-all flex items-center gap-4 group"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform"
                      style={{
                        backgroundColor: `${tool.color}15`,
                        border: `1px solid ${tool.color}40`,
                        color: tool.color
                      }}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-ui font-bold text-white text-base group-hover:text-pink-300 transition-colors">
                        {tool.name}
                      </h4>
                      <p className="text-xs text-slate-400 font-body">
                        {tool.role}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Creative Areas Column (Poster Design, Photo Editing, Event Creatives, Social Media Design, Creative Concepts) */}
          <div className="md:col-span-7 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-purple-400 font-semibold">
              AREAS OF CREATIVE EXECUTION
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {designAreas.map((area, idx) => (
                <div
                  key={area.title}
                  className={`p-5 rounded-2xl glass-card border border-white/10 space-y-2 hover:border-purple-400/40 transition-all ${
                    idx === designAreas.length - 1 ? "sm:col-span-2" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-ui font-bold text-white text-sm">
                      {area.title}
                    </h4>
                    <span className="text-[10px] font-mono text-purple-400">
                      0{idx + 1}
                    </span>
                  </div>
                  <p className="text-xs font-body text-slate-400 leading-relaxed">
                    {area.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
