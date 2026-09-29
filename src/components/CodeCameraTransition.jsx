import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Aperture, Camera, Code2, Focus, Sparkles } from "lucide-react";
import TubeLight from "./framer/TubeLight";

gsap.registerPlugin(ScrollTrigger);

export default function CodeCameraTransition() {
  const containerRef = useRef(null);
  const apertureRef = useRef(null);
  const textRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Physical transformation: Code UI frame shrinks and rotates into Aperture blades, finishing when centered
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          end: "center center",
          scrub: 0.8
        }
      });

      if (apertureRef.current) {
        tl.fromTo(
          apertureRef.current,
          { scale: 0.7, rotate: 0, opacity: 0.4 },
          { scale: 1.25, rotate: 180, opacity: 1, ease: "power2.out" }
        );
      }

      if (frameRef.current) {
        tl.fromTo(
          frameRef.current,
          { borderRadius: "8px", borderColor: "rgba(0, 242, 254, 0.4)" },
          { borderRadius: "50%", borderColor: "rgba(251, 191, 36, 0.6)", ease: "power2.out" },
          0
        );
      }

      if (textRef.current) {
        tl.fromTo(
          textRef.current,
          { letterSpacing: "0.05em", opacity: 0.5 },
          { letterSpacing: "0.2em", opacity: 1, ease: "none" },
          0
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[60vh] w-full py-20 bg-transparent flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Adaptive Metamorphosis Lighting: Code Cyan blending into Camera Gold */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[70vw] max-w-[450px] h-[400px] bg-cyan-500/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[70vw] max-w-[450px] h-[400px] bg-amber-500/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Optic light streaks */}
      <div className="absolute w-[80vw] h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-sm opacity-30 transform -rotate-12 pointer-events-none" />
      <div className="absolute w-[80vw] h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent blur-sm opacity-25 transform rotate-12 pointer-events-none" />

      {/* Center Transforming Geometry: Code Frame -> Camera Aperture */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-6 px-4 xs:px-6">
        <div
          ref={frameRef}
          className="w-24 h-24 xs:w-28 xs:h-28 sm:w-36 sm:h-36 border-2 border-cyan-400/50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xl shadow-2xl transition-all duration-300"
        >
          <div ref={apertureRef} className="text-amber-400 flex items-center justify-center">
            <Aperture className="w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 animate-pulse-slow" />
          </div>
        </div>

        {/* Viewfinder crosshairs */}
        <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs font-mono text-slate-400">
          <span>[ 35MM OPTIC ]</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span>F/1.4 DEPTH OF FIELD</span>
        </div>

        {/* Climax Typography */}
        <div className="space-y-2 max-w-4xl mx-auto px-2">
          <p className="text-xs font-mono text-cyan-400 tracking-[0.3em] uppercase font-semibold">
            EVOLVING DIMENSIONS
          </p>
          <h3
            ref={textRef}
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-amber-200 to-purple-400 uppercase tracking-tight break-words leading-tight"
          >
            TECHNOLOGY BECOMES CREATIVITY.
          </h3>
        </div>

        <div className="w-48 pt-2">
          <TubeLight stop4="#fbbf24" stop3="#8b5cf6" height={1.5} />
        </div>
      </div>
    </div>
  );
}
