import React, { useState } from "react";
import { Camera, Sparkles, Maximize2, X, Zap, Aperture, Sun } from "lucide-react";
import { photoFramesData } from "../data/photography";
import DNACarousel from "./framer/DNACarousel";
import TubeLight from "./framer/TubeLight";

export default function Photography() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isFlashActive, setIsFlashActive] = useState(false);

  const triggerStudioFlash = () => {
    setIsFlashActive(true);
    setTimeout(() => setIsFlashActive(false), 260);
  };

  return (
    <section
      id="photography"
      className="relative min-h-screen w-full py-24 sm:py-28 bg-transparent text-slate-100 overflow-hidden flex flex-col justify-center"
    >
      {/* =========================================
          ADAPTIVE PHOTOGRAPHY STUDIO LIGHTING RIG
          ========================================= */}
      
      {/* 1. Studio Softbox Key Light (Upper Left Conical Wash) */}
      <div className="absolute -top-20 -left-20 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-amber-400/20 via-orange-500/10 to-transparent blur-[160px] pointer-events-none" />

      {/* 2. Studio Daylight Rim Light (Upper Right Cool Edge Beam) */}
      <div className="absolute top-10 -right-20 w-[550px] h-[550px] rounded-full bg-gradient-to-bl from-cyan-400/20 via-blue-600/10 to-transparent blur-[160px] pointer-events-none" />

      {/* 3. Darkroom Ambient Safe Light (Bottom Warm Glow) */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[85vw] max-w-[900px] h-[400px] rounded-full bg-gradient-to-t from-rose-600/15 via-amber-600/10 to-transparent blur-[140px] pointer-events-none" />

      {/* 4. Photographic Floating Optical Bokeh Orbs */}
      <div className="absolute top-1/4 left-1/6 w-32 h-32 rounded-full bg-amber-400/10 blur-2xl pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/3 right-1/5 w-44 h-44 rounded-full bg-rose-500/10 blur-3xl pointer-events-none animate-float-slow" />
      <div className="absolute top-2/3 left-1/3 w-28 h-28 rounded-full bg-cyan-400/10 blur-2xl pointer-events-none" />

      {/* 5. Camera Flash Strobe Overlay Effect */}
      <div
        className={`fixed inset-0 z-[100] bg-white pointer-events-none transition-opacity duration-200 ${
          isFlashActive ? "opacity-35" : "opacity-0"
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 xs:px-6 relative z-10 w-full space-y-10 sm:space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 rounded-full bg-amber-950/60 border border-amber-500/30 text-xs font-mono text-amber-300 tracking-[0.25em] uppercase">
            <Camera className="w-3.5 h-3.5" />
            <span>SPATIAL 3D ARCHIVE</span>
          </div>

          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-tight text-white uppercase break-words leading-tight">
            DRAG &amp; ROTATE THE HELIX ARCHIVE
          </h2>

          <div className="w-36 mx-auto py-1">
            <TubeLight stop4="#fbbf24" stop3="#f43f5e" height={1.5} />
          </div>

          <p className="text-xs xs:text-sm sm:text-base md:text-lg font-ui text-slate-300 leading-relaxed max-w-2xl mx-auto px-2">
            Explore all 10 moments in interactive 3D space with continuous physics.
          </p>

          {/* Photographic Lighting Telemetry & Interactive Studio Flash Trigger */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 pt-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/80 text-[11px] font-mono text-slate-400">
              <Aperture className="w-3 h-3 text-amber-400" />
              <span>50MM F/1.4 OPTIC</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/80 text-[11px] font-mono text-slate-400">
              <Sun className="w-3 h-3 text-cyan-400" />
              <span>STUDIO RIM &amp; SOFTBOX LIGHT</span>
            </div>
            <button
              onClick={triggerStudioFlash}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 text-[11px] font-mono font-semibold transition-all cursor-pointer shadow-[0_0_12px_rgba(251,191,36,0.2)]"
              title="Trigger camera studio strobe flash"
            >
              <Zap className="w-3 h-3 text-amber-400" />
              <span>TEST FLASH ⚡</span>
            </button>
          </div>
        </div>

        {/* 3D DNA Helix Archive Carousel */}
        <div className="py-2 sm:py-6 w-full max-w-full overflow-hidden">
          <DNACarousel
            items={photoFramesData}
            cardWidth={280}
            cardHeight={370}
            curveDepth={220}
            curveHeight={55}
            helixSpread={85}
            onSelect={(photo) => setSelectedPhoto(photo)}
          />
        </div>

        {/* Interaction Hint */}
        <div className="text-center pt-2 px-2">
          <span className="text-[10px] xs:text-[11px] sm:text-xs font-mono text-slate-400 tracking-widest uppercase">
            CLICK ANY FRAME TO EXPAND IN HIGH RESOLUTION • DRAG HORIZONTALLY TO SPIN
          </span>
        </div>
      </div>

      {/* Expanded Cinematic Lightbox Modal for Large High-Res Inspection */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-[10005] bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center p-3 sm:p-6 cursor-zoom-out animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-[94vw] max-h-[92vh] flex flex-col rounded-3xl overflow-hidden glass-panel border border-white/20 shadow-[0_0_80px_rgba(0,0,0,0.9)] p-3 sm:p-6 cursor-default"
          >
            {/* Top Close & Meta Bar */}
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-300 font-bold">
                  {selectedPhoto.category}
                </span>
                <span className="text-slate-600 hidden sm:inline">•</span>
                <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                  {selectedPhoto.meta}
                </span>
              </div>

              <button
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close Preview"
                className="p-2 sm:px-4 sm:py-1.5 rounded-xl bg-slate-800/90 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700 transition-colors flex items-center gap-2 text-xs font-ui"
              >
                <span>CLOSE</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Extra Large High-Res Image Viewport */}
            <div className="relative w-full flex-1 min-h-[50vh] max-h-[78vh] flex items-center justify-center overflow-hidden rounded-2xl bg-black/80">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="w-auto h-auto max-w-full max-h-[76vh] object-contain rounded-xl shadow-2xl transition-transform duration-300"
              />
            </div>

            {/* Bottom Caption */}
            <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-left">
              <div>
                <h4 className="text-lg sm:text-2xl font-bold text-white font-ui">
                  {selectedPhoto.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 font-body">
                  {selectedPhoto.description}
                </p>
              </div>

              <div className="text-[10px] sm:text-[11px] font-mono text-slate-500 tracking-wider">
                CAPTURED BY ABDUR RAHMAN I
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
