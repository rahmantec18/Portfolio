import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Film, Play, Pause, FastForward, Clock, Scissors, Video, Sparkles, Layers, Volume2 } from "lucide-react";
import TubeLight from "./framer/TubeLight";

gsap.registerPlugin(ScrollTrigger);

export default function VideoEditing() {
  const sectionRef = useRef(null);
  const playheadRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playProgress, setPlayProgress] = useState(25);
  const [timecode, setTimecode] = useState("00:01:24:18");

  // Calibrated playback loop for TIMELINE 01: CINEMATIC REEL
  useEffect(() => {
    let animId;
    let lastTime = performance.now();

    const loop = (now) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      if (isPlaying) {
        setPlayProgress((prev) => {
          const next = prev + dt * 14; // Smooth cinematic progress speed
          if (next >= 94) return 6; // Loop back smoothly to beginning of reel
          return next;
        });

        // Compute realistic SMPTE timecode (24fps)
        const totalFrames = Math.floor((playProgress / 100) * 1440);
        const seconds = Math.floor(totalFrames / 24);
        const frames = totalFrames % 24;
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        setTimecode(`00:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}:${String(frames).padStart(2, "0")}`);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, playProgress]);

  // Connect scroll scrub to timecode when scrolling through
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 30%",
        onUpdate: (self) => {
          if (!isPlaying) {
            setPlayProgress(6 + self.progress * 88);
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isPlaying]);

  return (
    <section
      id="video"
      ref={sectionRef}
      className="relative min-h-screen w-full py-28 bg-[#04020a] text-slate-100 overflow-hidden"
    >
      {/* Film Spool / Timeline Background Accents */}
      <div className="absolute top-1/4 -right-20 w-[550px] h-[550px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-[550px] h-[550px] bg-rose-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-xs font-mono text-purple-300 tracking-[0.25em] uppercase">
            <Film className="w-3.5 h-3.5" />
            <span>NARRATIVE MOTION &amp; PACING</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-white">
            I EDIT. I CREATE. I TELL STORIES.
          </h2>

          <div className="w-36 mx-auto py-2">
            <TubeLight stop4="#c084fc" stop3="#f43f5e" height={1.5} />
          </div>

          <p className="text-base sm:text-lg font-ui text-slate-300 leading-relaxed">
            Where raw takes receive rhythm, intentional cuts, and audio pacing. Moving the viewer emotionally one frame at a time.
          </p>
        </div>

        {/* Video Production Milestone Card: Team O7 */}
        <div className="max-w-2xl mx-auto p-8 rounded-3xl glass-card border border-purple-500/30 text-center space-y-3 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />
          <span className="text-xs font-mono text-purple-400 tracking-widest uppercase font-semibold">
            KEY PRODUCTION MILESTONE
          </span>
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
            VIDEO EDITING — TEAM O7
          </h3>
          <p className="text-sm font-mono text-cyan-300">
            July – August 2025
          </p>
          <p className="text-xs font-body text-slate-400 max-w-md mx-auto pt-2">
            Dynamic video edits, short-form storytelling, and visual timing crafted for social distribution and audience engagement.
          </p>
        </div>

        {/* Interactive NLE Video Editing Timeline Studio Interface */}
        <div className="rounded-3xl glass-panel border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl">
          {/* Top Player & Timecode Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? "Pause Timeline" : "Play Timeline"}
                className="w-9 h-9 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 flex items-center justify-center text-red-400 transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
              <div>
                <span className="font-ui font-bold text-sm text-white block">TIMELINE 01: CINEMATIC REEL</span>
                <span className="text-[10px] font-mono text-slate-400">24 FPS • PRORES 422HQ • 4K</span>
              </div>
            </div>

            {/* Audio Waveform Equalizer Meters */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
              <Volume2 className="w-3.5 h-3.5 text-emerald-400 mr-1" />
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-gradient-to-t from-emerald-500 to-cyan-400 rounded-full transition-all duration-150"
                  style={{
                    height: isPlaying ? `${Math.sin(playProgress * 0.4 + i) * 10 + 14}px` : "6px"
                  }}
                />
              ))}
            </div>

            <div className="flex items-center gap-4 font-mono text-sm">
              <span className="text-slate-400 text-xs">TIMECODE:</span>
              <span className="px-3 py-1 rounded bg-slate-900 border border-slate-700 text-cyan-400 font-bold tracking-widest text-xs">
                {timecode}
              </span>
            </div>
          </div>

          {/* Film Strip Preview Mockup */}
          <div className="relative w-full h-28 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center select-none">
            {/* Film Perforations Top & Bottom */}
            <div className="absolute top-1 left-0 right-0 flex justify-between px-2 pointer-events-none opacity-40">
              {Array.from({ length: 24 }).map((_, i) => (
                <span key={i} className="w-2.5 h-1.5 bg-slate-400 rounded-sm" />
              ))}
            </div>
            <div className="absolute bottom-1 left-0 right-0 flex justify-between px-2 pointer-events-none opacity-40">
              {Array.from({ length: 24 }).map((_, i) => (
                <span key={i} className="w-2.5 h-1.5 bg-slate-400 rounded-sm" />
              ))}
            </div>

            {/* Video Frame Thumbnails with Clip Highlight on Playhead */}
            <div className="flex items-center w-full px-4 gap-2 opacity-85">
              <div
                className={`flex-1 h-18 rounded border transition-all duration-200 flex flex-col items-center justify-center p-2 text-center ${
                  playProgress < 28
                    ? "bg-blue-900/40 border-cyan-400/80 shadow-[0_0_15px_rgba(0,242,254,0.2)]"
                    : "bg-blue-950/40 border-white/10"
                }`}
              >
                <span className="text-[10px] font-mono text-cyan-300 font-bold">CLIP 01: INTRO SEQUENCE</span>
                <span className="text-[9px] font-mono text-slate-400">00:00:00:00 – 00:00:05:00</span>
              </div>

              <div
                className={`flex-1 h-18 rounded border transition-all duration-200 flex flex-col items-center justify-center p-2 text-center ${
                  playProgress >= 28 && playProgress < 52
                    ? "bg-purple-900/40 border-purple-400/80 shadow-[0_0_15px_rgba(192,132,252,0.2)]"
                    : "bg-purple-950/40 border-white/10"
                }`}
              >
                <span className="text-[10px] font-mono text-purple-300 font-bold">CLIP 02: SPEED RAMP</span>
                <span className="text-[9px] font-mono text-slate-400">00:00:05:00 – 00:00:10:00</span>
              </div>

              <div
                className={`flex-1 h-18 rounded border transition-all duration-200 flex flex-col items-center justify-center p-2 text-center ${
                  playProgress >= 52 && playProgress < 74
                    ? "bg-pink-900/40 border-pink-400/80 shadow-[0_0_15px_rgba(244,63,94,0.2)]"
                    : "bg-pink-950/40 border-white/10"
                }`}
              >
                <span className="text-[10px] font-mono text-pink-300 font-bold">CLIP 03: COLOR GRADE</span>
                <span className="text-[9px] font-mono text-slate-400">00:00:10:00 – 00:00:15:00</span>
              </div>

              <div
                className={`flex-1 h-18 rounded border transition-all duration-200 flex flex-col items-center justify-center p-2 text-center ${
                  playProgress >= 74
                    ? "bg-amber-900/40 border-amber-400/80 shadow-[0_0_15px_rgba(251,191,36,0.2)]"
                    : "bg-amber-950/40 border-white/10"
                }`}
              >
                <span className="text-[10px] font-mono text-amber-300 font-bold">CLIP 04: OUTRO CLIMAX</span>
                <span className="text-[9px] font-mono text-slate-400">00:00:15:00 – 00:00:20:00</span>
              </div>
            </div>

            {/* Calibrated Smooth Playhead with Neon Marker */}
            <div
              ref={playheadRef}
              className="absolute top-0 bottom-0 w-[2px] bg-red-500 shadow-[0_0_12px_#ef4444] z-20 pointer-events-none transition-all duration-75"
              style={{ left: `${playProgress}%` }}
            >
              <div className="absolute -top-1 -left-1.5 w-3.5 h-3.5 bg-red-500 rotate-45 rounded-sm shadow-md" />
            </div>
          </div>

          {/* Timeline Multitrack Channels */}
          <div className="space-y-2 pt-2 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="w-16 text-slate-400 text-[11px]">V1 VIDEO</span>
              <div className="flex-1 h-7 rounded bg-blue-950/60 border border-blue-500/30 flex items-center px-3 text-cyan-300">
                MAIN NARRATIVE EDIT [4K 60FPS A-ROLL]
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-16 text-slate-400 text-[11px]">V2 FX</span>
              <div className="flex-1 h-7 rounded bg-purple-950/60 border border-purple-500/30 flex items-center px-3 text-purple-300">
                DYNAMIC SPEED RAMPS &amp; MOTION GRAPHICS
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-16 text-slate-400 text-[11px]">A1 AUDIO</span>
              <div className="flex-1 h-7 rounded bg-emerald-950/60 border border-emerald-500/30 flex items-center px-3 text-emerald-300">
                MASTER AUDIO • FOLEY • BEAT DROPS • ATMOSPHERES
              </div>
            </div>
          </div>
        </div>

        {/* Section 28 Transition: MOTION BECOMES DESIGN */}
        <div className="pt-16 pb-8 text-center space-y-3 border-t border-slate-800/80">
          <span className="text-xs font-mono text-pink-400 tracking-[0.3em] uppercase font-semibold">
            WORKSPACE TRANSFORMATION
          </span>
          <h3 className="text-3xl sm:text-5xl font-display font-black text-white">
            MOTION BECOMES DESIGN.
          </h3>
          <p className="text-xs font-mono text-slate-400 max-w-md mx-auto">
            Film frames flatten into posters, typography layouts, color swatches, and vector compositions.
          </p>
        </div>
      </div>
    </section>
  );
}
