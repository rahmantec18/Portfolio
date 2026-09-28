import React from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Compass,
  Car,
  Shirt,
  Utensils,
  PenTool,
  Brush,
  GraduationCap,
  Cpu,
  Heart
} from "lucide-react";
import { personalInterests } from "../data/personal";
import TubeLight from "./framer/TubeLight";

const interestIcons = {
  Sports: Trophy,
  Travel: Compass,
  Automotive: Car,
  Fashion: Shirt,
  Cooking: Utensils,
  Drawing: PenTool,
  Painting: Brush,
  Learning: GraduationCap,
  "Exploring Technology": Cpu
};

export default function BeyondWork() {
  return (
    <section
      id="beyond"
      className="relative min-h-[60vh] w-full py-24 bg-transparent text-slate-100 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10 w-full space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-400 tracking-[0.25em] uppercase">
            <Heart className="w-3.5 h-3.5 text-rose-400" />
            <span>PERSONAL PASSIONS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white">
            BEYOND THE SCREEN.
          </h2>

          <div className="w-28 mx-auto py-1">
            <TubeLight stop4="#38bdf8" stop3="#8b5cf6" height={1.5} />
          </div>

          <p className="text-xs sm:text-sm font-ui text-slate-400 leading-relaxed">
            There's more to me than technology and creative work. Subtle pursuits that keep curiosity alive.
          </p>
        </div>

        {/* Playful Interactive Interest Tags Grid (Section 33) */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
          {personalInterests.map((interest) => {
            const Icon = interestIcons[interest.name] || Heart;
            return (
              <motion.div
                key={interest.name}
                whileHover={{ y: -4, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-cursor="PASSION"
                className="group relative flex items-center gap-3 px-5 py-3 rounded-2xl glass-card border border-white/10 hover:border-cyan-400/40 bg-slate-900/50 cursor-pointer shadow-lg"
              >
                <div className="p-2 rounded-xl bg-cyan-400/10 text-cyan-300 border border-cyan-400/20 group-hover:bg-cyan-400 group-hover:text-slate-950 transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-ui font-semibold text-slate-200 group-hover:text-white transition-colors">
                    {interest.name}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-body hidden sm:block">
                    {interest.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
