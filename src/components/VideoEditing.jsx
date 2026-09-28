import React, { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Film, Play, Pause, FastForward, Clock, Scissors, Video, Sparkles, Layers, Volume2, Sliders, Activity } from "lucide-react";
import TubeLight from "./framer/TubeLight";

gsap.registerPlugin(ScrollTrigger);

const CLIPS = [
  {
    id: "clip-01",
    name: "CLIP 01: INTRO SEQUENCE",
    range: "00:00:00:00 – 00:00:05:00",
    start: 0,
    end: 25,
    color: "#00f2fe",
    border: "border-cyan-400/80",
    bg: "from-cyan-950/70 to-blue-900/40",
    activeText: "text-cyan-300",
    badge: "HOOK & PACING"
  },
  {
    id: "clip-02",
    name: "CLIP 02: SPEED RAMP",
    range: "00:00:05:00 – 00:00:10:00",
    start: 25,
    end: 50,
    color: "#c084fc",
    border: "border-purple-400/80",
    bg: "from-purple-950/70 to-indigo-900/40",
    activeText: "text-purple-300",
    badge: "ACCELERATION"
  },
  {
    id: "clip-03",
    name: "CLIP 03: COLOR GRADE",
    range: "00:00:10:00 – 00:00:15:00",
    start: 50,
    end: 75,
    color: "#f43f5e",
    border: "border-pink-400/80",
    bg: "from-rose-950/70 to-pink-900/40",
    activeText: "text-pink-300",
    badge: "LUT & CONTRAST"
  },
  {
    id: "clip-04",
    name: "CLIP 04: OUTRO CLIMAX",
    range: "00:00:15:00 – 00:00:20:00",
    start: 75,
    end: 100,
    color: "#fbbf24",
    border: "border-amber-400/80",
    bg: "from-amber-950/70 to-orange-900/40",
    activeText: "text-amber-300",
    badge: "AUDIO CRESCENDO"
  }
];

export default function VideoEditing() {
  const sectionRef = useRef(null);
  const timelineStripRef = useRef(null);
  const playheadRef = useRef(null);
  const playheadGlowRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [playProgress, setPlayProgress] = useState(12);
  const [activeClipIndex, setActiveClipIndex] = useState(0);
  const [timecode, setTimecode] = useState("00:00:02:14");
  const [hoverPosition, setHoverPosition] = useState(null);

  const progressRef = useRef(12);
  const isPlayingRef = useRef(true);
  const speedRef = useRef(1);

  // Sync refs with state
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    speedRef.current = playbackSpeed;
  }, [playbackSpeed]);

  // Compute SMPTE timecode (24fps format)
  const formatTimecode = (pct) => {
    const totalSeconds = (pct / 100) * 20; // 20s total timeline length
    const totalFrames = Math.floor(totalSeconds * 24);
    const seconds = Math.floor(totalFrames / 24);
    const frames = totalFrames % 24;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `00:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}:${String(frames).padStart(2, "0")}`;
  };

  // High-performance 60fps/120fps hardware-accelerated animation loop
  useEffect(() => {
    let animId;
    let lastTime = performance.now();
    let lastStateUpdateTime = performance.now();

    const loop = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1); // Guard against giant delta
      lastTime = now;

      if (isPlayingRef.current) {
        // Increment progress smoothly
        let next = progressRef.current + dt * (100 / 20) * speedRef.current; // 20s loop duration at 1x
        if (next >= 100) {
          next = 0; // Loop back seamlessly to start
        }
        progressRef.current = next;

        // Directly update DOM left position on the playhead for 120fps buttery smoothness
        if (playheadRef.current) {
          playheadRef.current.style.left = `${next}%`;
        }
        if (playheadGlowRef.current) {
          playheadGlowRef.current.style.left = `${next}%`;
        }

        // Throttle React state update to ~24fps (40ms) to eliminate React re-render jank
        if (now - lastStateUpdateTime > 40) {
          lastStateUpdateTime = now;
          setPlayProgress(next);
          setTimecode(formatTimecode(next));

          // Determine active clip
          const idx = CLIPS.findIndex((c) => next >= c.start && next < c.end);
          if (idx !== -1) {
            setActiveClipIndex(idx);
          } else if (next >= 100) {
            setActiveClipIndex(3);
          }
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Scrub timeline to click/drag position smoothly
  const handleTimelineScrub = useCallback((e) => {
    if (!timelineStripRef.current) return;
    const rect = timelineStripRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(4, Math.min(96, (clickX / rect.width) * 100));

    progressRef.current = pct;
    setPlayProgress(pct);
    setTimecode(formatTimecode(pct));

    if (playheadRef.current) {
      playheadRef.current.style.left = `${pct}%`;
    }
    if (playheadGlowRef.current) {
      playheadGlowRef.current.style.left = `${pct}%`;
    }

    const idx = CLIPS.findIndex((c) => pct >= c.start && pct < c.end);
    if (idx !== -1) setActiveClipIndex(idx);
  }, []);

  // Handle timeline hover for scrub preview
  const handleTimelineMouseMove = (e) => {
    if (!timelineStripRef.current) return;
    const rect = timelineStripRef.current.getBoundingClientRect();
    const hoverX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (hoverX / rect.width) * 100));
    setHoverPosition({ pct, x: hoverX, time: formatTimecode(pct) });
  };

  return (
    <section
      id="video"
      ref={sectionRef}
      className="relative min-h-screen w-full py-28 bg-transparent text-slate-100 overflow-hidden"
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

          <h2 className="text-3xl xs:text-4xl sm:text-6xl font-display font-black tracking-tight text-white break-words">
            I EDIT. I CREATE. I TELL STORIES.
          </h2>

          <div className="w-36 mx-auto py-2">
            <TubeLight stop4="#c084fc" stop3="#f43f5e" height={1.5} />
          </div>

          <p className="text-sm sm:text-lg font-ui text-slate-300 leading-relaxed px-2">
            Where raw takes receive rhythm, intentional cuts, and audio pacing. Moving the viewer emotionally one frame at a time.
          </p>
        </div>

        {/* Video Production Milestone Card: Team O7 */}
        <div className="max-w-2xl mx-auto p-5 sm:p-8 rounded-3xl glass-card border border-purple-500/30 text-center space-y-3 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />
          <span className="text-xs font-mono text-purple-400 tracking-widest uppercase font-semibold">
            KEY PRODUCTION MILESTONE
          </span>
          <h3 className="text-xl sm:text-3xl font-display font-bold text-white break-words">
            VIDEO EDITING — TEAM O7
          </h3>
          <p className="text-sm font-mono text-cyan-300">
            July – August 2025
          </p>
          <p className="text-xs font-body text-slate-400 max-w-md mx-auto pt-2 px-2">
            Dynamic video edits, short-form storytelling, and visual timing crafted for social distribution and audience engagement.
          </p>
        </div>

        {/* Interactive NLE Video Editing Timeline Studio Interface with Smooth Playhead Animation */}
        <div className="rounded-3xl glass-panel border border-purple-500/20 p-4 sm:p-8 space-y-6 shadow-[0_0_50px_rgba(168,85,247,0.08)] relative">
          {/* Top Player & Timecode Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              {/* Play / Pause Toggle Button */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? "Pause Timeline" : "Play Timeline"}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-lg ${
                  isPlaying
                    ? "bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.25)]"
                    : "bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                }`}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-ui font-bold text-sm text-white tracking-wide">
                    TIMELINE 01: CINEMATIC REEL
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-mono bg-purple-950 text-purple-300 border border-purple-800">
                    <Activity className="w-2.5 h-2.5 animate-pulse text-purple-400" />
                    <span>SMOOTH REEL</span>
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">
                  24 FPS • PRORES 422HQ • 4K ULTRA HD
                </span>
              </div>
            </div>

            {/* Dynamic Equalizer Audio Waveform Visualizer */}
            <div className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 shadow-inner">
              <Volume2 className="w-3.5 h-3.5 text-emerald-400 mr-1" />
              {Array.from({ length: 16 }).map((_, i) => {
                // Organic smooth sine wave calculation for audio bars
                const barHeight = isPlaying
                  ? Math.sin(playProgress * 0.45 + i * 0.5) * 8 + 14
                  : 5;
                return (
                  <div
                    key={i}
                    className="w-1 rounded-full transition-all duration-100"
                    style={{
                      height: `${barHeight}px`,
                      background:
                        i > 12
                          ? "linear-gradient(to top, #ef4444, #f59e0b)"
                          : i > 8
                          ? "linear-gradient(to top, #3b82f6, #06b6d4)"
                          : "linear-gradient(to top, #10b981, #34d399)"
                    }}
                  />
                );
              })}
            </div>

            {/* Playback Speed Switcher & SMPTE Timecode Display */}
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-[11px] font-mono">
                {[1, 1.5, 2].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setPlaybackSpeed(spd)}
                    className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                      playbackSpeed === spd
                        ? "bg-purple-500/30 text-purple-200 border border-purple-500/40"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 font-mono">
                <span className="text-slate-500 text-xs hidden sm:inline">TC:</span>
                <span className="px-3 py-1 rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-300 font-bold tracking-widest text-xs shadow-[0_0_10px_rgba(0,242,254,0.15)]">
                  {timecode}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Scrubbable Film Strip & Clips Area */}
          <div
            ref={timelineStripRef}
            onClick={handleTimelineScrub}
            onMouseMove={handleTimelineMouseMove}
            onMouseLeave={() => setHoverPosition(null)}
            className="relative w-full h-32 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 select-none cursor-ew-resize shadow-inner group"
          >
            {/* Film Perforations (Top & Bottom Sprockets) */}
            <div className="absolute top-1 left-0 right-0 flex justify-between px-3 pointer-events-none opacity-30 z-10">
              {Array.from({ length: 32 }).map((_, i) => (
                <span key={i} className="w-2 h-1.5 bg-slate-400 rounded-xs" />
              ))}
            </div>
            <div className="absolute bottom-1 left-0 right-0 flex justify-between px-3 pointer-events-none opacity-30 z-10">
              {Array.from({ length: 32 }).map((_, i) => (
                <span key={i} className="w-2 h-1.5 bg-slate-400 rounded-xs" />
              ))}
            </div>

            {/* Video Frame Clips with Smooth Highlighting & Internal Progress */}
            <div className="absolute inset-0 flex items-center px-4 gap-2.5 z-0">
              {CLIPS.map((clip, idx) => {
                const isActive = activeClipIndex === idx;
                // Calculate clip internal progress percentage (0 - 100%)
                const clipLength = clip.end - clip.start;
                const clipInternalPct = Math.max(
                  0,
                  Math.min(100, ((playProgress - clip.start) / clipLength) * 100)
                );

                return (
                  <div
                    key={clip.id}
                    className={`relative flex-1 h-22 rounded-xl border transition-all duration-300 flex flex-col justify-between p-2.5 overflow-hidden shadow-md ${
                      isActive
                        ? `${clip.border} bg-gradient-to-br ${clip.bg}`
                        : "border-slate-800/80 bg-slate-900/40 opacity-70 hover:opacity-90"
                    }`}
                    style={
                      isActive ? { boxShadow: `0 0 25px ${clip.color}40` } : undefined
                    }
                  >
                    {/* Active Clip Smooth Progress Bar Underlay */}
                    {isActive && (
                      <div
                        className="absolute bottom-0 left-0 top-0 opacity-25 pointer-events-none transition-all duration-75"
                        style={{
                          width: `${clipInternalPct}%`,
                          backgroundColor: clip.color
                        }}
                      />
                    )}

                    {/* Clip Header with Badge */}
                    <div className="flex items-center justify-between z-10 gap-1">
                      <span className={`text-[9px] sm:text-[10px] font-mono font-bold tracking-wider truncate max-w-[65px] sm:max-w-none ${isActive ? clip.activeText : "text-slate-300"}`}>
                        <span className="sm:hidden">{clip.name.split(':')[0]}</span>
                        <span className="hidden sm:inline">{clip.name}</span>
                      </span>
                      <span className="text-[7px] sm:text-[8px] font-mono px-1 sm:px-1.5 py-0.5 rounded bg-black/60 border border-white/10 text-slate-300 shrink-0">
                        {clip.badge}
                      </span>
                    </div>

                    {/* Clip Timestamp & Status */}
                    <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-slate-400 z-10 gap-1">
                      <span className="truncate">
                        <span className="sm:hidden">{clip.start}s – {clip.end}s</span>
                        <span className="hidden sm:inline">{clip.range}</span>
                      </span>
                      {isActive && (
                        <span className={`font-bold ${clip.activeText} flex items-center gap-1 shrink-0`}>
                          <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: clip.color }} />
                          <span className="hidden xs:inline">PLAYING</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Smooth Ambient Glow Column that sweeps behind playhead */}
            <div
              ref={playheadGlowRef}
              className="absolute top-0 bottom-0 w-16 -translate-x-1/2 pointer-events-none z-10 opacity-40 blur-md transition-none"
              style={{
                left: `${playProgress}%`,
                background: "radial-gradient(ellipse at center, rgba(239, 68, 68, 0.85), transparent 70%)"
              }}
            />

            {/* Smooth Neon Laser Playhead Marker */}
            <div
              ref={playheadRef}
              className="absolute top-0 bottom-0 w-[2px] -translate-x-1/2 bg-red-500 shadow-[0_0_16px_#ef4444,0_0_2px_#ffffff] z-20 pointer-events-none transition-none"
              style={{
                left: `${playProgress}%`
              }}
            >
              {/* Playhead Diamond Head (Centered on 2px playhead) */}
              <div className="absolute -top-1.5 -left-[5px] w-3 h-3 bg-red-500 rotate-45 rounded-xs shadow-[0_0_10px_#ef4444] border border-white/60" />
              {/* Playhead Bottom Inverted Diamond */}
              <div className="absolute -bottom-1.5 -left-[5px] w-3 h-3 bg-red-500 rotate-45 rounded-xs shadow-[0_0_10px_#ef4444] border border-white/60" />
            </div>

            {/* Hover Tooltip when hovering over timeline */}
            {hoverPosition && (
              <div
                className="absolute top-2 pointer-events-none z-30 transform -translate-x-1/2 px-2 py-1 rounded bg-black/90 border border-cyan-400 text-cyan-300 font-mono text-[10px] shadow-lg"
                style={{ left: `${hoverPosition.pct}%` }}
              >
                {hoverPosition.time}
              </div>
            )}
          </div>

          {/* Timeline Multitrack Channels (NLE Layer Tracks) */}
          <div className="space-y-2 pt-2 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="w-16 text-slate-400 text-[11px] font-semibold flex items-center gap-1.5">
                <Video className="w-3 h-3 text-cyan-400" />
                V1 VIDEO
              </span>
              <div className="flex-1 h-7 rounded-lg bg-blue-950/60 border border-blue-500/30 flex items-center justify-between px-3 text-cyan-300 text-[11px] shadow-xs">
                <span>MAIN NARRATIVE EDIT [4K 60FPS A-ROLL]</span>
                <span className="text-[9px] text-cyan-400/70">SYNCED</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-16 text-slate-400 text-[11px] font-semibold flex items-center gap-1.5">
                <Layers className="w-3 h-3 text-purple-400" />
                V2 FX
              </span>
              <div className="flex-1 h-7 rounded-lg bg-purple-950/60 border border-purple-500/30 flex items-center justify-between px-3 text-purple-300 text-[11px] shadow-xs">
                <span>DYNAMIC SPEED RAMPS &amp; MOTION GRAPHICS</span>
                <span className="text-[9px] text-purple-400/70">KEYFRAMED</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-16 text-slate-400 text-[11px] font-semibold flex items-center gap-1.5">
                <Volume2 className="w-3 h-3 text-emerald-400" />
                A1 AUDIO
              </span>
              <div className="flex-1 h-7 rounded-lg bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-between px-3 text-emerald-300 text-[11px] shadow-xs">
                <span>MASTER AUDIO • FOLEY • BEAT DROPS • ATMOSPHERES</span>
                <span className="text-[9px] text-emerald-400/70">-6.0 dB PEAK</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section Transition: MOTION BECOMES DESIGN */}
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
