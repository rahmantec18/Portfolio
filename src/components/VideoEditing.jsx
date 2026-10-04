import React, { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Film,
  Play,
  Pause,
  FastForward,
  Rewind,
  SkipBack,
  SkipForward,
  Repeat,
  Scissors,
  Video,
  Sparkles,
  Layers,
  Volume2,
  VolumeX,
  Activity,
  Magnet,
  Eye,
  Lock,
  Sliders,
  Zap
} from "lucide-react";
import TubeLight from "./framer/TubeLight";

gsap.registerPlugin(ScrollTrigger);

const CLIPS = [
  {
    id: "clip-01",
    name: "CLIP 01: INTRO SEQUENCE",
    shortName: "CLIP 01",
    range: "00:00:00:00 – 00:00:05:00",
    start: 0,
    end: 25,
    duration: "5.0s (120f)",
    color: "#00f2fe",
    border: "border-cyan-400/80",
    bg: "from-cyan-950/70 via-blue-950/50 to-slate-900/60",
    activeText: "text-cyan-300",
    badge: "HOOK & PACING",
    lut: "Kodak 2383 D60 Cine Print",
    exposure: "+0.35 EV (Highlight Recovered)",
    shutter: "180° Shutter Angle (1/48s)",
    fps: "24.000 fps Native",
    audioProfile: "Dialogue & Sub-Ambience (-6.2 dB)",
    transition: "HARD CUT",
    description: "High-retention visual opening engineered to hook audience in the first 3 seconds."
  },
  {
    id: "clip-02",
    name: "CLIP 02: SPEED RAMP",
    shortName: "CLIP 02",
    range: "00:00:05:00 – 00:00:10:00",
    start: 25,
    end: 50,
    duration: "5.0s (120f)",
    color: "#c084fc",
    border: "border-purple-400/80",
    bg: "from-purple-950/70 via-indigo-950/50 to-slate-900/60",
    activeText: "text-purple-300",
    badge: "ACCELERATION",
    lut: "ARRI Alexa LogC ➔ Rec.709",
    exposure: "-0.15 EV (Controlled Shadows)",
    shutter: "90° Dynamic Ramped",
    fps: "120 fps ➔ 24 fps Bézier Curve",
    audioProfile: "Optical Flow Whoosh & Beat Drop",
    transition: "SPEED RAMP",
    description: "Kinetic velocity transition compressing time before landing precisely on the downbeat."
  },
  {
    id: "clip-03",
    name: "CLIP 03: COLOR GRADE",
    shortName: "CLIP 03",
    range: "00:00:10:00 – 00:00:15:00",
    start: 50,
    end: 75,
    duration: "5.0s (120f)",
    color: "#f43f5e",
    border: "border-pink-400/80",
    bg: "from-rose-950/70 via-pink-950/50 to-slate-900/60",
    activeText: "text-pink-300",
    badge: "LUT & CONTRAST",
    lut: "Teal & Orange Custom S-Curve",
    exposure: "+0.10 EV (Skin-Tone Masked)",
    shutter: "180° Motion Blur Balanced",
    fps: "24.000 fps Rec.709 Master",
    audioProfile: "Atmospheric Drone & Pad Layer",
    transition: "CROSS DISSOLVE",
    description: "Selective color grading separating skin tones from cinematic cyan-teal shadows."
  },
  {
    id: "clip-04",
    name: "CLIP 04: OUTRO CLIMAX",
    shortName: "CLIP 04",
    range: "00:00:15:00 – 00:00:20:00",
    start: 75,
    end: 100,
    duration: "5.0s (120f)",
    color: "#fbbf24",
    border: "border-amber-400/80",
    bg: "from-amber-950/70 via-orange-950/50 to-slate-900/60",
    activeText: "text-amber-300",
    badge: "AUDIO CRESCENDO",
    lut: "35mm Film Halation & Grain",
    exposure: "+0.45 EV Climax Peak",
    shutter: "180° Full Blur Finale",
    fps: "24.000 fps Deliverable",
    audioProfile: "Limiter Climax (-0.1 dB True Peak)",
    transition: "DIP TO BLACK",
    description: "Final rhythm crescendo pulling all sonic and visual threads together into a powerful fade."
  }
];

export default function VideoEditing() {
  const sectionRef = useRef(null);
  const timelineStripRef = useRef(null);
  const rulerRef = useRef(null);
  const playheadRef = useRef(null);
  const playheadGlowRef = useRef(null);
  const playheadRulerHeadRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [playProgress, setPlayProgress] = useState(12);
  const [activeClipIndex, setActiveClipIndex] = useState(0);
  const [timecode, setTimecode] = useState("00:00:02:14");
  const [hoverPosition, setHoverPosition] = useState(null);
  const [isLooping, setIsLooping] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isSnapping, setIsSnapping] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  // Track lock/visibility interactive states
  const [trackStates, setTrackStates] = useState({
    v2: { visible: true, locked: false },
    v1: { visible: true, locked: false },
    a1: { muted: false, solo: false, locked: false },
    a2: { muted: false, solo: false, locked: false }
  });

  const progressRef = useRef(12);
  const isPlayingRef = useRef(true);
  const speedRef = useRef(1);
  const isLoopingRef = useRef(true);
  const isDraggingRef = useRef(false);

  // Sync refs with state
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    speedRef.current = playbackSpeed;
  }, [playbackSpeed]);

  useEffect(() => {
    isLoopingRef.current = isLooping;
  }, [isLooping]);

  useEffect(() => {
    isDraggingRef.current = isDragging;
  }, [isDragging]);

  // Compute SMPTE timecode (24fps format, 20s total timeline length)
  const formatTimecode = (pct) => {
    const totalSeconds = (pct / 100) * 20;
    const totalFrames = Math.floor(totalSeconds * 24);
    const seconds = Math.floor(totalFrames / 24);
    const frames = totalFrames % 24;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `00:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}:${String(frames).padStart(2, "0")}`;
  };

  // High-performance hardware-accelerated animation loop
  useEffect(() => {
    let animId;
    let lastTime = performance.now();
    let lastStateUpdateTime = performance.now();

    const loop = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (isPlayingRef.current && !isDraggingRef.current) {
        let next = progressRef.current + dt * (100 / 20) * speedRef.current;
        if (next >= 100) {
          if (isLoopingRef.current) {
            next = 0;
          } else {
            next = 100;
            setIsPlaying(false);
          }
        }
        progressRef.current = next;

        // Directly update DOM playhead positions for buttery smooth 120fps motion
        if (playheadRef.current) {
          playheadRef.current.style.left = `${next}%`;
        }
        if (playheadGlowRef.current) {
          playheadGlowRef.current.style.left = `${next}%`;
        }
        if (playheadRulerHeadRef.current) {
          playheadRulerHeadRef.current.style.left = `${next}%`;
        }

        // Throttle React state updates to ~24fps (40ms) for optimum UI performance
        if (now - lastStateUpdateTime > 40) {
          lastStateUpdateTime = now;
          setPlayProgress(next);
          setTimecode(formatTimecode(next));

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

  // Update playhead smoothly to a specific progress percentage
  const setPlayheadPct = useCallback((rawPct) => {
    let pct = Math.max(0, Math.min(100, rawPct));

    // Snapping logic to clip cuts if snapping is enabled
    if (isSnapping) {
      const snapPoints = [0, 25, 50, 75, 100];
      for (const sp of snapPoints) {
        if (Math.abs(pct - sp) < 1.5) {
          pct = sp;
          break;
        }
      }
    }

    progressRef.current = pct;
    setPlayProgress(pct);
    setTimecode(formatTimecode(pct));

    if (playheadRef.current) {
      playheadRef.current.style.left = `${pct}%`;
    }
    if (playheadGlowRef.current) {
      playheadGlowRef.current.style.left = `${pct}%`;
    }
    if (playheadRulerHeadRef.current) {
      playheadRulerHeadRef.current.style.left = `${pct}%`;
    }

    const idx = CLIPS.findIndex((c) => pct >= c.start && pct < c.end);
    if (idx !== -1) {
      setActiveClipIndex(idx);
    } else if (pct >= 100) {
      setActiveClipIndex(3);
    }
  }, [isSnapping]);

  // Scrub handler from mouse event
  const scrubFromMouseEvent = useCallback((e, containerRef) => {
    const el = containerRef?.current || timelineStripRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = (clickX / rect.width) * 100;
    setPlayheadPct(pct);
  }, [setPlayheadPct]);

  // Mouse down on timeline / ruler starts interactive drag
  const handleTimelineMouseDown = (e) => {
    setIsDragging(true);
    isDraggingRef.current = true;
    scrubFromMouseEvent(e, timelineStripRef);

    const handleMouseMove = (moveEvent) => {
      scrubFromMouseEvent(moveEvent, timelineStripRef);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      isDraggingRef.current = false;
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  // Hover preview tooltip
  const handleTimelineMouseMove = (e) => {
    if (!timelineStripRef.current) return;
    const rect = timelineStripRef.current.getBoundingClientRect();
    const hoverX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (hoverX / rect.width) * 100));
    setHoverPosition({ pct, x: hoverX, time: formatTimecode(pct) });
  };

  // Transport navigation controls
  const handleJumpToStart = () => {
    setPlayheadPct(0);
  };

  const handleJumpToEnd = () => {
    setPlayheadPct(100);
  };

  const handleNudge = (deltaSeconds) => {
    const deltaPct = (deltaSeconds / 20) * 100;
    setPlayheadPct(progressRef.current + deltaPct);
  };

  const handleSelectClip = (idx) => {
    const targetClip = CLIPS[idx];
    if (targetClip) {
      setPlayheadPct(targetClip.start + 0.5);
      setActiveClipIndex(idx);
    }
  };

  // Keyboard shortcuts listener for pro NLE feel
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing in an input
      if (["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) return;

      if (e.code === "Space") {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        handleNudge(-1);
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        handleNudge(1);
      } else if (e.key === "k" || e.key === "K") {
        setIsPlaying(false);
      } else if (e.key === "l" || e.key === "L") {
        setIsPlaying(true);
        setPlaybackSpeed((spd) => (spd === 1 ? 1.5 : spd === 1.5 ? 2 : 1));
      } else if (e.key === "j" || e.key === "J") {
        setPlaybackSpeed((spd) => (spd === 2 ? 1.5 : spd === 1.5 ? 1 : 0.5));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const activeClip = CLIPS[activeClipIndex] || CLIPS[0];

  // Dynamic Audio VU Meter values calculation
  const isAudioActive = isPlaying && !isMuted;
  const audioMeterL = isAudioActive
    ? Math.min(100, Math.max(15, (Math.sin(playProgress * 0.7) * 0.4 + 0.6) * 85 + (activeClipIndex === 3 ? 14 : 0)))
    : 0;
  const audioMeterR = isAudioActive
    ? Math.min(100, Math.max(15, (Math.cos(playProgress * 0.8) * 0.4 + 0.6) * 82 + (activeClipIndex === 1 ? 12 : 0)))
    : 0;
  const currentDb = isAudioActive
    ? (-18 + (audioMeterL / 100) * 16).toFixed(1)
    : "-∞";

  return (
    <section
      id="video"
      ref={sectionRef}
      className="relative min-h-screen w-full py-24 sm:py-28 bg-transparent text-slate-100 overflow-hidden"
    >
      {/* Cinematic Ambient Glow Lighting */}
      <div className="absolute top-1/4 -right-20 w-[85vw] max-w-[550px] h-[550px] bg-gradient-to-bl from-purple-600/15 via-rose-600/10 to-transparent rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-[85vw] max-w-[550px] h-[550px] bg-gradient-to-tr from-cyan-600/12 via-indigo-600/10 to-transparent rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:100%_2rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 xs:px-6 relative z-10 w-full space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-xs font-mono text-purple-300 tracking-[0.25em] uppercase">
            <Film className="w-3.5 h-3.5" />
            <span>NARRATIVE MOTION &amp; PACING</span>
          </div>

          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-tight text-white break-words">
            I EDIT. I CREATE. I TELL STORIES.
          </h2>

          <div className="w-36 mx-auto py-1">
            <TubeLight stop4="#c084fc" stop3="#f43f5e" height={1.5} />
          </div>

          <p className="text-xs xs:text-sm sm:text-base md:text-lg font-ui text-slate-300 leading-relaxed px-2">
            Where raw takes receive rhythm, intentional cuts, and audio pacing. Moving the viewer emotionally one frame at a time.
          </p>
        </div>

        {/* Video Production Milestone Card */}
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

        {/* Interactive NLE Video Editing Timeline Studio Interface */}
        <div className="rounded-3xl glass-panel border border-purple-500/20 p-3 xs:p-4 sm:p-8 space-y-5 sm:space-y-6 shadow-[0_0_50px_rgba(168,85,247,0.08)] relative">
          
          {/* Top Master Transport & Timecode Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
            {/* Left Transport Cluster & Project Status */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Transport Control Buttons */}
              <div className="inline-flex items-center gap-1 p-1 bg-slate-950/80 rounded-xl border border-slate-800 shadow-inner">
                {/* Jump To Start */}
                <button
                  onClick={handleJumpToStart}
                  title="Jump to Start (Home)"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all cursor-pointer"
                >
                  <SkipBack className="w-3.5 h-3.5" />
                </button>

                {/* Step Back 1s */}
                <button
                  onClick={() => handleNudge(-1)}
                  title="Step Back 1s (Left Arrow)"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all cursor-pointer"
                >
                  <Rewind className="w-3.5 h-3.5" />
                </button>

                {/* Primary Play / Pause Toggle Button */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-label={isPlaying ? "Pause Timeline" : "Play Timeline"}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-mono font-bold transition-all cursor-pointer ${
                    isPlaying
                      ? "bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/50 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.3)]"
                      : "bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span className="hidden xs:inline">PAUSE</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 ml-0.5" />
                      <span className="hidden xs:inline">PLAY</span>
                    </>
                  )}
                </button>

                {/* Step Forward 1s */}
                <button
                  onClick={() => handleNudge(1)}
                  title="Step Forward 1s (Right Arrow)"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all cursor-pointer"
                >
                  <FastForward className="w-3.5 h-3.5" />
                </button>

                {/* Jump To End */}
                <button
                  onClick={handleJumpToEnd}
                  title="Jump to End (End)"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all cursor-pointer"
                >
                  <SkipForward className="w-3.5 h-3.5" />
                </button>

                {/* Loop Toggle */}
                <button
                  onClick={() => setIsLooping(!isLooping)}
                  title={isLooping ? "Loop Enabled" : "Loop Disabled"}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                    isLooping
                      ? "text-purple-400 bg-purple-500/20 border border-purple-500/40"
                      : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/50"
                  }`}
                >
                  <Repeat className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Title & Metadata */}
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-ui font-bold text-xs sm:text-sm text-white tracking-wide">
                    TIMELINE 01: CINEMATIC REEL
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-mono bg-purple-950/80 text-purple-300 border border-purple-700/60">
                    <Activity className={`w-2.5 h-2.5 ${isPlaying ? "animate-pulse text-purple-400" : "text-slate-500"}`} />
                    <span>{isPlaying ? "LIVE REEL" : "PAUSED"}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                  <span>24 FPS • 4K ULTRA HD (3840×2160)</span>
                  <span className="hidden sm:inline text-slate-600">•</span>
                  <span className="hidden sm:inline text-purple-400/80">PRORES 422HQ</span>
                </div>
              </div>
            </div>

            {/* Middle Real-time Stereo VU Audio Level Meter */}
            <div className="hidden lg:flex items-center gap-3 px-3.5 py-1.5 rounded-xl bg-slate-950/90 border border-slate-800 shadow-inner">
              <button
                onClick={() => setIsMuted(!isMuted)}
                title={isMuted ? "Unmute Audio" : "Mute Audio"}
                className={`p-1 rounded-md transition-colors cursor-pointer ${isMuted ? "text-rose-400 bg-rose-500/20" : "text-emerald-400 hover:bg-slate-800"}`}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>

              <div className="space-y-1">
                {/* L Channel */}
                <div className="flex items-center gap-1.5 text-[9px] font-mono text-slate-400">
                  <span className="w-2.5 text-[8px] text-slate-500">L</span>
                  <div className="w-28 h-1.5 bg-slate-900 rounded-full overflow-hidden flex gap-0.5 p-0.5">
                    {Array.from({ length: 14 }).map((_, i) => {
                      const isActive = audioMeterL >= (i / 14) * 100;
                      return (
                        <div
                          key={i}
                          className={`flex-1 rounded-xs transition-opacity duration-75 ${
                            !isActive
                              ? "opacity-15 bg-slate-700"
                              : i > 11
                              ? "bg-rose-500 shadow-[0_0_6px_#f43f5e]"
                              : i > 8
                              ? "bg-amber-400"
                              : "bg-emerald-400"
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* R Channel */}
                <div className="flex items-center gap-1.5 text-[9px] font-mono text-slate-400">
                  <span className="w-2.5 text-[8px] text-slate-500">R</span>
                  <div className="w-28 h-1.5 bg-slate-900 rounded-full overflow-hidden flex gap-0.5 p-0.5">
                    {Array.from({ length: 14 }).map((_, i) => {
                      const isActive = audioMeterR >= (i / 14) * 100;
                      return (
                        <div
                          key={i}
                          className={`flex-1 rounded-xs transition-opacity duration-75 ${
                            !isActive
                              ? "opacity-15 bg-slate-700"
                              : i > 11
                              ? "bg-rose-500 shadow-[0_0_6px_#f43f5e]"
                              : i > 8
                              ? "bg-amber-400"
                              : "bg-emerald-400"
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="text-[10px] font-mono text-emerald-400 min-w-[50px] text-right">
                {currentDb} <span className="text-[8px] text-slate-500">dB</span>
              </div>
            </div>

            {/* Right Speed, Snapping & Timecode Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Snapping Magnet Toggle */}
              <button
                onClick={() => setIsSnapping(!isSnapping)}
                title={isSnapping ? "Magnet Snapping ON" : "Magnet Snapping OFF"}
                className={`hidden xs:flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-mono transition-all cursor-pointer ${
                  isSnapping
                    ? "bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 shadow-[0_0_10px_rgba(0,242,254,0.2)]"
                    : "bg-slate-900 border border-slate-800 text-slate-500 hover:text-slate-300"
                }`}
              >
                <Magnet className="w-3 h-3" />
                <span className="hidden sm:inline">SNAP</span>
              </button>

              {/* Speed Switcher */}
              <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5 text-[11px] font-mono">
                {[0.5, 1, 1.5, 2].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setPlaybackSpeed(spd)}
                    className={`px-1.5 sm:px-2 py-0.5 rounded transition-all cursor-pointer ${
                      playbackSpeed === spd
                        ? "bg-purple-500/30 text-purple-200 border border-purple-500/40 font-bold"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>

              {/* SMPTE Timecode Display */}
              <div className="flex items-center gap-1.5 font-mono">
                <span className="text-slate-500 text-xs hidden sm:inline">TC:</span>
                <div className="px-2.5 sm:px-3 py-1 rounded-lg bg-slate-950 border border-cyan-500/40 text-cyan-300 font-bold tracking-widest text-xs shadow-[0_0_15px_rgba(0,242,254,0.18)]">
                  {timecode}
                </div>
              </div>
            </div>
          </div>

          {/* SMPTE Timecode Ruler with Subdivision Ticks */}
          <div
            ref={rulerRef}
            onMouseDown={handleTimelineMouseDown}
            onMouseMove={handleTimelineMouseMove}
            onMouseLeave={() => setHoverPosition(null)}
            className="relative w-full h-7 bg-slate-950/90 rounded-t-xl border-t border-x border-slate-800 overflow-hidden select-none cursor-ew-resize flex items-end px-4"
          >
            {/* Major Markers (every 5 seconds) */}
            <div className="absolute inset-0 flex justify-between px-4 items-center pointer-events-none text-[9px] font-mono text-slate-500">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />00:00:00</span>
              <span className="hidden xs:inline">00:00:05</span>
              <span>00:00:10</span>
              <span className="hidden xs:inline">00:00:15</span>
              <span className="flex items-center gap-1">00:00:20<span className="w-1.5 h-1.5 rounded-full bg-amber-400" /></span>
            </div>

            {/* Sub-second Tick Marks across ruler */}
            <div className="absolute inset-x-4 bottom-0 flex justify-between pointer-events-none opacity-40">
              {Array.from({ length: 41 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-[1px] bg-slate-500 ${i % 10 === 0 ? "h-3 bg-cyan-400/80" : i % 5 === 0 ? "h-2 bg-slate-400" : "h-1"}`}
                />
              ))}
            </div>

            {/* Playhead Head Marker on the Ruler */}
            <div
              ref={playheadRulerHeadRef}
              className="absolute bottom-0 -translate-x-1/2 pointer-events-none z-30 transition-none"
              style={{ left: `${playProgress}%` }}
            >
              <div className="w-3.5 h-3.5 bg-red-500 rotate-45 rounded-xs shadow-[0_0_12px_#ef4444] border border-white flex items-center justify-center -mb-2" />
            </div>
          </div>

          {/* Interactive Scrubbable Film Strip & Clips Area */}
          <div
            ref={timelineStripRef}
            onMouseDown={handleTimelineMouseDown}
            onMouseMove={handleTimelineMouseMove}
            onMouseLeave={() => setHoverPosition(null)}
            className="relative w-full h-36 rounded-b-2xl overflow-hidden bg-slate-950 border border-slate-800 select-none cursor-ew-resize shadow-inner group"
          >
            {/* 35mm Cinema Sprocket Holes (Top & Bottom) */}
            <div className="absolute top-1 left-0 right-0 flex justify-between px-3 pointer-events-none opacity-25 z-10">
              {Array.from({ length: 36 }).map((_, i) => (
                <span key={i} className="w-2 h-1.5 bg-slate-300 rounded-[2px]" />
              ))}
            </div>
            <div className="absolute bottom-1 left-0 right-0 flex justify-between px-3 pointer-events-none opacity-25 z-10">
              {Array.from({ length: 36 }).map((_, i) => (
                <span key={i} className="w-2 h-1.5 bg-slate-300 rounded-[2px]" />
              ))}
            </div>

            {/* Video Frame Clips Grid with Waveforms & Transitions */}
            <div className="absolute inset-0 flex items-center px-4 gap-2 z-0">
              {CLIPS.map((clip, idx) => {
                const isActive = activeClipIndex === idx;
                const clipLength = clip.end - clip.start;
                const clipInternalPct = Math.max(
                  0,
                  Math.min(100, ((playProgress - clip.start) / clipLength) * 100)
                );

                return (
                  <div
                    key={clip.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectClip(idx);
                    }}
                    className={`relative flex-1 h-24 rounded-xl border transition-all duration-300 flex flex-col justify-between p-2.5 overflow-hidden shadow-md cursor-pointer ${
                      isActive
                        ? `${clip.border} bg-gradient-to-br ${clip.bg}`
                        : "border-slate-800/80 bg-slate-900/40 opacity-70 hover:opacity-95 hover:border-slate-700"
                    }`}
                    style={
                      isActive
                        ? {
                            boxShadow: `0 0 30px ${clip.color}40, inset 0 0 15px ${clip.color}20`
                          }
                        : undefined
                    }
                  >
                    {/* Active Clip Smooth Progress Fill */}
                    {isActive && (
                      <div
                        className="absolute bottom-0 left-0 top-0 opacity-20 pointer-events-none transition-all duration-75"
                        style={{
                          width: `${clipInternalPct}%`,
                          backgroundColor: clip.color
                        }}
                      />
                    )}

                    {/* Simulated Waveform Pattern embedded in Clip */}
                    <div className="absolute inset-x-2 bottom-6 h-4 opacity-25 flex items-center gap-0.5 pointer-events-none">
                      {Array.from({ length: 28 }).map((_, barIdx) => {
                        const h = Math.abs(Math.sin((barIdx + idx * 7) * 0.6)) * 14 + 2;
                        return (
                          <div
                            key={barIdx}
                            className="flex-1 rounded-full"
                            style={{
                              height: `${h}px`,
                              backgroundColor: clip.color
                            }}
                          />
                        );
                      })}
                    </div>

                    {/* Clip Header with Name and Badge */}
                    <div className="flex items-center justify-between z-10 gap-1">
                      <div className="flex items-center gap-1.5 truncate">
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: clip.color }}
                        />
                        <span className={`text-[9px] sm:text-[11px] font-mono font-bold tracking-wider truncate ${isActive ? clip.activeText : "text-slate-300"}`}>
                          <span className="sm:hidden">{clip.shortName}</span>
                          <span className="hidden sm:inline">{clip.name}</span>
                        </span>
                      </div>
                      <span className="text-[7px] sm:text-[8px] font-mono px-1 sm:px-1.5 py-0.5 rounded bg-black/70 border border-white/10 text-slate-300 shrink-0">
                        {clip.badge}
                      </span>
                    </div>

                    {/* Clip Footer with Duration & Status */}
                    <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-slate-400 z-10 gap-1">
                      <span className="truncate">
                        <span className="sm:hidden">{clip.duration}</span>
                        <span className="hidden sm:inline">{clip.range}</span>
                      </span>
                      {isActive ? (
                        <span className={`font-bold ${clip.activeText} flex items-center gap-1 shrink-0`}>
                          <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: clip.color }} />
                          <span className="hidden xs:inline">ACTIVE</span>
                        </span>
                      ) : (
                        <span className="text-[8px] text-slate-600 hidden sm:inline">24 FPS</span>
                      )}
                    </div>

                    {/* Transition badge between cuts */}
                    {idx < CLIPS.length - 1 && (
                      <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 pointer-events-none hidden sm:flex">
                        <div className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-700 text-[8px] font-mono text-cyan-300 shadow-lg flex items-center gap-0.5">
                          <Zap className="w-2.5 h-2.5 text-amber-400" />
                          <span>{clip.transition.split(" ")[0]}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Playhead Ambient Glow Sweep Column */}
            <div
              ref={playheadGlowRef}
              className="absolute top-0 bottom-0 w-20 -translate-x-1/2 pointer-events-none z-10 opacity-35 blur-md transition-none"
              style={{
                left: `${playProgress}%`,
                background: "radial-gradient(ellipse at center, rgba(239, 68, 68, 0.9), transparent 70%)"
              }}
            />

            {/* Sleek Neon Laser Playhead Line */}
            <div
              ref={playheadRef}
              className="absolute top-0 bottom-0 w-[2px] -translate-x-1/2 bg-red-500 shadow-[0_0_16px_#ef4444,0_0_3px_#ffffff] z-20 pointer-events-none transition-none"
              style={{ left: `${playProgress}%` }}
            >
              {/* Playhead Bottom Inverted Diamond */}
              <div className="absolute -bottom-1.5 -left-[5px] w-3 h-3 bg-red-500 rotate-45 rounded-xs shadow-[0_0_10px_#ef4444] border border-white/80" />
            </div>

            {/* Precision Hover Tooltip */}
            {hoverPosition && (
              <div
                className="absolute top-2 pointer-events-none z-30 transform -translate-x-1/2 px-2.5 py-1 rounded-md bg-slate-950/95 border border-cyan-400 text-cyan-300 font-mono text-[10px] shadow-xl backdrop-blur-md"
                style={{ left: `${hoverPosition.pct}%` }}
              >
                {hoverPosition.time}
              </div>
            )}
          </div>

          {/* Interactive NLE Multitrack Channel Stack (V2 FX, V1 VIDEO, A1 AUDIO, A2 FOLEY) */}
          <div className="space-y-2 pt-2 font-mono text-xs">
            {/* V2 FX Track: Speed Ramps & Keyframes */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-24 sm:w-28 text-slate-400 text-[10px] sm:text-[11px] font-semibold flex items-center justify-between px-2 py-1 rounded bg-slate-900 border border-slate-800 shrink-0">
                <span className="flex items-center gap-1.5 text-purple-300">
                  <Layers className="w-3 h-3 text-purple-400" />
                  V2 FX
                </span>
                <div className="flex items-center gap-1 text-slate-500">
                  <Eye className="w-2.5 h-2.5 hover:text-purple-300 cursor-pointer" />
                  <Lock className="w-2.5 h-2.5 hover:text-purple-300 cursor-pointer" />
                </div>
              </div>

              <div className="flex-1 h-7 rounded-lg bg-purple-950/40 border border-purple-500/30 flex items-center justify-between px-3 text-purple-300 text-[10px] sm:text-[11px] shadow-xs relative overflow-hidden">
                {/* Visual Keyframe Diamonds on V2 Track */}
                <div className="absolute inset-0 flex items-center justify-around px-8 pointer-events-none opacity-60">
                  <span className="text-[10px] text-purple-400">◇─────◆</span>
                  <span className="text-[10px] text-purple-400 hidden xs:inline">SPEED RAMP BÉZIER</span>
                  <span className="text-[10px] text-purple-400">◆─────◇</span>
                </div>
                <span className="z-10 truncate">DYNAMIC SPEED RAMPS &amp; MOTION GRAPHICS</span>
                <span className="text-[9px] text-purple-400/80 z-10 shrink-0 hidden xs:inline">KEYFRAMED</span>
              </div>
            </div>

            {/* V1 VIDEO Track: Primary Storyline */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-24 sm:w-28 text-slate-400 text-[10px] sm:text-[11px] font-semibold flex items-center justify-between px-2 py-1 rounded bg-slate-900 border border-slate-800 shrink-0">
                <span className="flex items-center gap-1.5 text-cyan-300">
                  <Video className="w-3 h-3 text-cyan-400" />
                  V1 VIDEO
                </span>
                <div className="flex items-center gap-1 text-slate-500">
                  <Eye className="w-2.5 h-2.5 hover:text-cyan-300 cursor-pointer" />
                  <Lock className="w-2.5 h-2.5 hover:text-cyan-300 cursor-pointer" />
                </div>
              </div>

              <div className="flex-1 h-7 rounded-lg bg-blue-950/40 border border-blue-500/30 flex items-center justify-between px-3 text-cyan-300 text-[10px] sm:text-[11px] shadow-xs relative overflow-hidden">
                <span className="z-10 truncate">MAIN NARRATIVE EDIT [4K 60FPS A-ROLL • REC.709]</span>
                <span className="text-[9px] text-cyan-400/80 z-10 shrink-0">SYNCED 24FPS</span>
              </div>
            </div>

            {/* A1 AUDIO Track: Master Audio & Waveform Envelope */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-24 sm:w-28 text-slate-400 text-[10px] sm:text-[11px] font-semibold flex items-center justify-between px-2 py-1 rounded bg-slate-900 border border-slate-800 shrink-0">
                <span className="flex items-center gap-1.5 text-emerald-300">
                  <Volume2 className="w-3 h-3 text-emerald-400" />
                  A1 AUDIO
                </span>
                <div className="flex items-center gap-1 text-slate-500">
                  <span className="text-[8px] font-bold px-1 rounded bg-slate-800 text-slate-400 hover:text-emerald-300 cursor-pointer">M</span>
                  <span className="text-[8px] font-bold px-1 rounded bg-slate-800 text-slate-400 hover:text-emerald-300 cursor-pointer">S</span>
                </div>
              </div>

              <div className="flex-1 h-7 rounded-lg bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between px-3 text-emerald-300 text-[10px] sm:text-[11px] shadow-xs relative overflow-hidden">
                {/* Visual Audio Waveform Envelope in Track */}
                <div className="absolute inset-0 flex items-center gap-0.5 px-3 opacity-20 pointer-events-none">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-emerald-400 rounded-full"
                      style={{ height: `${Math.abs(Math.sin(i * 0.35)) * 18 + 3}px` }}
                    />
                  ))}
                </div>
                <span className="z-10 truncate">MASTER AUDIO • CINEMATIC SCORE • BEAT DROPS</span>
                <span className="text-[9px] text-emerald-400/80 z-10 shrink-0">-6.0 dB PEAK</span>
              </div>
            </div>

            {/* A2 FOLEY Track: Sound Design Transient Markers */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-24 sm:w-28 text-slate-400 text-[10px] sm:text-[11px] font-semibold flex items-center justify-between px-2 py-1 rounded bg-slate-900 border border-slate-800 shrink-0">
                <span className="flex items-center gap-1.5 text-amber-300">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  A2 FOLEY
                </span>
                <div className="flex items-center gap-1 text-slate-500">
                  <span className="text-[8px] font-bold px-1 rounded bg-slate-800 text-slate-400 hover:text-amber-300 cursor-pointer">M</span>
                  <span className="text-[8px] font-bold px-1 rounded bg-slate-800 text-slate-400 hover:text-amber-300 cursor-pointer">S</span>
                </div>
              </div>

              <div className="flex-1 h-7 rounded-lg bg-amber-950/30 border border-amber-500/30 flex items-center justify-between px-3 text-amber-300 text-[10px] sm:text-[11px] shadow-xs relative overflow-hidden">
                <div className="flex items-center gap-4 text-[9px] text-amber-300/80 truncate">
                  <span className="px-1.5 py-0.5 rounded bg-amber-900/40 border border-amber-600/40">💥 WHOOSH TRANSITION</span>
                  <span className="px-1.5 py-0.5 rounded bg-amber-900/40 border border-amber-600/40 hidden sm:inline">⚡ BASS DROP</span>
                  <span className="px-1.5 py-0.5 rounded bg-amber-900/40 border border-amber-600/40 hidden md:inline">🎧 ATMOSPHERIC RISER</span>
                </div>
                <span className="text-[9px] text-amber-400/80 shrink-0">TRANSIENTS</span>
              </div>
            </div>
          </div>

          {/* Real-time Dynamic Clip Inspector & Grading HUD */}
          <div className="mt-4 p-3.5 sm:p-5 rounded-2xl bg-slate-950/90 border border-slate-800/90 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  ACTIVE CLIP INSPECTOR // {activeClip.shortName}
                </span>
                <span
                  className="px-2 py-0.5 rounded-full text-[9px] font-mono font-semibold"
                  style={{
                    backgroundColor: `${activeClip.color}20`,
                    color: activeClip.color,
                    border: `1px solid ${activeClip.color}40`
                  }}
                >
                  {activeClip.badge}
                </span>
              </div>

              {/* Dynamic Spectrum EQ Bar Visualizer */}
              <div className="flex items-center gap-1">
                <span className="text-[9px] font-mono text-slate-500 mr-1.5 hidden xs:inline">SPECTRUM:</span>
                {Array.from({ length: 18 }).map((_, barIdx) => {
                  const h = isPlaying
                    ? Math.abs(Math.sin(playProgress * 0.4 + barIdx * 0.4)) * 14 + 3
                    : 3;
                  return (
                    <div
                      key={barIdx}
                      className="w-1 rounded-full transition-all duration-100"
                      style={{
                        height: `${h}px`,
                        backgroundColor:
                          barIdx > 14
                            ? "#f43f5e"
                            : barIdx > 9
                            ? activeClip.color
                            : "#3b82f6"
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Inspector Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-3 font-mono text-[10px] sm:text-[11px]">
              <div className="space-y-1">
                <span className="text-slate-500 uppercase text-[9px] block">COLOR GRADE / LUT</span>
                <span className="text-slate-200 font-medium block truncate" title={activeClip.lut}>
                  {activeClip.lut}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 uppercase text-[9px] block">EXPOSURE &amp; SHUTTER</span>
                <span className="text-slate-200 font-medium block truncate">
                  {activeClip.exposure}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 uppercase text-[9px] block">TIMING &amp; OPTICAL FLOW</span>
                <span className="text-purple-300 font-medium block truncate">
                  {activeClip.fps}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 uppercase text-[9px] block">AUDIO MASTERING</span>
                <span className="text-emerald-300 font-medium block truncate">
                  {activeClip.audioProfile}
                </span>
              </div>
            </div>

            <p className="text-xs font-body text-slate-400 pt-2.5 border-t border-slate-900 mt-3 leading-relaxed">
              {activeClip.description}
            </p>
          </div>

          {/* Pro NLE Keyboard Shortcuts Legend */}
          <div className="flex flex-wrap items-center justify-between text-[10px] font-mono text-slate-500 pt-1 px-1">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">PRO SHORTCUTS:</span>
              <span>[SPACE] Play/Pause</span>
              <span>•</span>
              <span>[←/→] Nudge 1s</span>
              <span>•</span>
              <span className="hidden xs:inline">[J/K/L] Shuttle</span>
              <span className="hidden xs:inline">•</span>
              <span>[Click/Drag] Scrub</span>
            </div>
            <div className="text-cyan-400/80 hidden sm:block">
              DAVINCI RESOLVE &amp; PREMIERE PRO NLE PARADIGM
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
