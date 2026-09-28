import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, ShieldCheck, Sparkles, MapPin, Eye } from "lucide-react";
import { profileImage } from "../data/photography";
import TextRevealScroll from "./framer/TextRevealScroll";
import TubeLight from "./framer/TubeLight";

gsap.registerPlugin(ScrollTrigger);

export default function About({ onOpenResume }) {
  const sectionRef = useRef(null);
  const portraitContainerRef = useRef(null);
  const portraitImgRef = useRef(null);
  const infoRef = useRef(null);
  const quoteRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Clear Portrait Reveal: smoothly approaches and completely finishes when content reaches the center
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: portraitContainerRef.current || sectionRef.current,
          start: "top 90%",
          end: "center center",
          scrub: 0.8
        }
      });

      if (portraitContainerRef.current) {
        // Smoothly transitions from slight distance into crystal clear focus at center
        tl.fromTo(
          portraitContainerRef.current,
          {
            scale: 0.88,
            z: -80,
            rotateX: 8,
            rotateY: -6,
            filter: "blur(6px) brightness(0.7)",
            opacity: 0.35
          },
          {
            scale: 1,
            z: 0,
            rotateX: 0,
            rotateY: 0,
            filter: "blur(0px) brightness(1)",
            opacity: 1,
            ease: "power2.out"
          }
        );
      }

      // Subtle parallax on the portrait inside frame
      if (portraitImgRef.current && sectionRef.current) {
        gsap.to(portraitImgRef.current, {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }

      // Info card reveal
      if (infoRef.current) {
        gsap.fromTo(
          infoRef.current,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: infoRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen w-full py-28 bg-transparent text-slate-100 overflow-hidden flex flex-col justify-center"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-xs font-mono text-cyan-400 tracking-[0.25em] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE PERSON BEHIND THE WORK</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-black tracking-tight text-white">
            MORE THAN CODE.
          </h2>

          <div className="w-32 mx-auto pt-2">
            <TubeLight stop4="#00f2fe" stop3="#8b5cf6" height={1.5} />
          </div>
        </div>

        {/* 3D Cinematic Portrait & Bio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Authentic Portrait with 3D Depth & Camera Focus */}
          <div className="lg:col-span-6 flex justify-center perspective-1000">
            <div
              ref={portraitContainerRef}
              className="relative w-full max-w-md aspect-[3/4] rounded-3xl overflow-hidden glass-card p-2 border border-cyan-400/25 shadow-2xl shadow-cyan-500/10 preserve-3d"
            >
              {/* Glass Frame Bezel */}
              <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-slate-950">
                <img
                  ref={portraitImgRef}
                  src={profileImage}
                  alt="Abdur Rahman I - Authentic Portrait"
                  className="w-full h-[115%] object-cover object-top will-change-transform"
                  loading="eager"
                />

                {/* Subtle Cinematic Lighting Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-deep-950/90 via-transparent to-black/20 pointer-events-none" />

                {/* Portrait Overlay Metadata Tag */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-slate-950/70 backdrop-blur-md border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-ui font-bold text-white text-base">
                        Abdur Rahman I
                      </h4>
                      <p className="text-xs text-cyan-300 font-mono">
                        Web Developer &amp; Visual Technologist
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-cyan-400/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 font-mono text-xs">
                      AR
                    </div>
                  </div>
                </div>
              </div>

              {/* Glowing Corner Accents */}
              <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
              <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />
            </div>
          </div>

          {/* Right Column: Identity, Education & Vision */}
          <div ref={infoRef} className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-semibold">
                IDENTITY &amp; POSITIONING
              </span>
              <p className="text-xl sm:text-2xl font-ui font-medium text-slate-200 leading-relaxed">
                "I build digital experiences, create visual stories and explore technology through creativity."
              </p>
              <p className="text-sm font-body text-slate-400 leading-relaxed">
                A creative technologist who refuses to be confined to a single dimension. Where others see code as purely logical syntax, I see an interactive canvas for human storytelling, photography, and fluid visual design.
              </p>
            </div>

            {/* Academic Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl glass-card border border-white/10 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono text-purple-300 font-medium">EDUCATION</div>
                <div className="text-sm font-semibold text-white font-ui">
                  3rd-Year B.E. Computer Science &amp; Engineering
                </div>
                <div className="text-xs text-slate-400">
                  Dhanalakshmi College of Engineering
                </div>
              </div>

              <div className="p-5 rounded-2xl glass-card border border-white/10 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono text-cyan-300 font-medium">SPECIALIZATION</div>
                <div className="text-sm font-semibold text-white font-ui">
                  Cyber Security Focus
                </div>
                <div className="text-xs text-slate-400">
                  Analytical mindset, robust security principles, and systemic thinking.
                </div>
              </div>
            </div>

            {/* Location & Status Badge */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Based in Chennai, India • Open for Web, Visual, &amp; Media Collaborations</span>
            </div>

            {/* Resume Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-ui font-semibold text-xs tracking-wider bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 border border-cyan-400/50 hover:border-cyan-400 transition-all shadow-[0_0_15px_rgba(0,242,254,0.18)] cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                <span>VIEW RESUME</span>
              </button>

              <a
                href={`${import.meta.env.BASE_URL}Abdur_Rahman_I_Resume.pdf`}
                download="Abdur_Rahman_I_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-ui font-semibold text-xs tracking-wider bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700 hover:border-slate-600 transition-all"
              >
                <span>DOWNLOAD CV</span>
                <span className="text-cyan-400">↓</span>
              </a>

              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 px-3 py-2 rounded-xl bg-emerald-950/40 border border-emerald-800/60">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>CYBER DEFENSE FOCUS</span>
              </div>
            </div>

            {/* Section Climax Phrase */}
            <div ref={quoteRef} className="pt-4 border-t border-slate-800/80">
              <p className="text-lg sm:text-xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-400 tracking-wide uppercase">
                ONE PERSON. MANY CREATIVE WORLDS.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
