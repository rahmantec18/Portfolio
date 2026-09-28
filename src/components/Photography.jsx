import React, { useState } from "react";
import { Camera, Sparkles, Maximize2, X } from "lucide-react";
import { photoFramesData } from "../data/photography";
import DNACarousel from "./framer/DNACarousel";
import TubeLight from "./framer/TubeLight";

export default function Photography() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <section
      id="photography"
      className="relative min-h-screen w-full py-28 bg-[#040209] text-slate-100 overflow-hidden flex flex-col justify-center"
    >
      {/* Cinematic Ambient Glows */}
      <div className="absolute top-1/3 left-10 w-[550px] h-[550px] bg-amber-600/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-[550px] h-[550px] bg-rose-600/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full space-y-12">
        {/* Section Header - Requested Exact Phrasing */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-950/60 border border-amber-500/30 text-xs font-mono text-amber-300 tracking-[0.25em] uppercase">
            <Camera className="w-3.5 h-3.5" />
            <span>SPATIAL 3D ARCHIVE</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-black tracking-tight text-white uppercase">
            DRAG &amp; ROTATE THE HELIX ARCHIVE
          </h2>

          <div className="w-36 mx-auto py-2">
            <TubeLight stop4="#fbbf24" stop3="#f43f5e" height={1.5} />
          </div>

          <p className="text-base sm:text-lg font-ui text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Explore all 10 moments in interactive 3D space with continuous physics.
          </p>
        </div>

        {/* 3D DNA Helix Archive Carousel */}
        <div className="py-6">
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
        <div className="text-center pt-2">
          <span className="text-xs font-mono text-slate-500 tracking-widest uppercase">
            CLICK ANY FRAME TO EXPAND IN HIGH RESOLUTION • DRAG HORIZONTALLY TO SPIN
          </span>
        </div>
      </div>

      {/* Expanded Cinematic Lightbox Modal for Large High-Res Inspection */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-[10001] bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center p-3 sm:p-6 cursor-zoom-out animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-7xl w-[96vw] max-h-[94vh] flex flex-col rounded-3xl overflow-hidden glass-panel border border-white/20 shadow-[0_0_80px_rgba(0,0,0,0.9)] p-3 sm:p-6 cursor-default"
          >
            {/* Top Close & Meta Bar */}
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10">
              <div className="flex items-center gap-3">
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
                <h4 className="text-xl sm:text-2xl font-bold text-white font-ui">
                  {selectedPhoto.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 font-body">
                  {selectedPhoto.description}
                </p>
              </div>

              <div className="text-[11px] font-mono text-slate-500 tracking-wider">
                CAPTURED BY ABDUR RAHMAN I
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
