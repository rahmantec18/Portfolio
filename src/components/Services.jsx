import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Camera, Palette, Video, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { portfolioServices, pricingNotice } from "../data/services";
import ShaderButton from "./framer/ShaderButton";
import TubeLight from "./framer/TubeLight";

gsap.registerPlugin(ScrollTrigger);

const serviceIcons = {
  Code2,
  Camera,
  Palette,
  Video,
  Sparkles
};

export default function Services() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards emerge and reorganize on scroll (Section 9 & 32)
      cardsRef.current.forEach((card, idx) => {
        if (!card) return;

        gsap.fromTo(
          card,
          {
            y: 80,
            opacity: 0,
            scale: 0.92
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
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
      id="services"
      ref={sectionRef}
      className="relative min-h-screen w-full py-28 bg-transparent text-slate-100 overflow-hidden"
    >
      {/* Ambient Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-r from-cyan-600/10 via-purple-600/10 to-transparent blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300 tracking-[0.25em] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SOLUTIONS &amp; COLLABORATION</span>
          </div>

          <h2 className="text-3xl xs:text-4xl sm:text-6xl font-display font-black tracking-tight text-white break-words">
            LET'S BUILD SOMETHING.
          </h2>

          <div className="w-36 mx-auto py-2">
            <TubeLight stop4="#00f2fe" stop3="#8b5cf6" height={1.5} />
          </div>

          <p className="text-sm sm:text-lg font-ui text-slate-300 leading-relaxed px-2">
            Multidisciplinary capabilities bridging digital engineering, visual art, and creative media.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioServices.map((service, idx) => {
            const Icon = serviceIcons[service.icon] || Sparkles;
            return (
              <div
                key={service.id}
                ref={(el) => (cardsRef.current[idx] = el)}
                data-cursor="SERVICE"
                className="p-6 sm:p-8 rounded-3xl glass-card border border-white/10 hover:border-cyan-400/40 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group shadow-xl"
              >
                <div className="space-y-4">
                  {/* Service Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/15 to-purple-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform shadow-lg">
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl sm:text-2xl font-ui font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-body text-slate-400 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Capabilities Bullet Checklist */}
                  <ul className="pt-3 space-y-2 text-xs font-mono text-slate-300">
                    {service.capabilities.map((cap) => (
                      <li key={cap} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA Link */}
                <div className="pt-6 mt-6 border-t border-slate-800">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-xs font-ui font-semibold text-cyan-400 hover:text-cyan-300 tracking-wider"
                  >
                    <span>INQUIRE FOR PROJECT</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Authentic Transparent Pricing Statement Banner */}
        <div className="max-w-3xl mx-auto p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md text-center space-y-2">
          <span className="text-[11px] font-mono tracking-widest uppercase text-cyan-400 font-semibold">
            PRICING TRANSPARENCY
          </span>
          <p className="text-sm sm:text-base font-ui font-medium text-slate-200">
            "{pricingNotice}"
          </p>
          <p className="text-xs text-slate-500 font-body">
            Every client project receives a customized proposal calibrated to scope, timelines, and technical demands.
          </p>
        </div>
      </div>
    </section>
  );
}
