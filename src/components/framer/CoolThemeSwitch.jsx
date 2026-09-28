import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Eye } from "lucide-react";

export default function CoolThemeSwitch({ onToggleAesthetics, isEnhanced = true }) {
  const [active, setActive] = useState(isEnhanced);

  const toggle = () => {
    const next = !active;
    setActive(next);
    if (onToggleAesthetics) onToggleAesthetics(next);
  };

  return (
    <button
      onClick={toggle}
      data-cursor="FX MODE"
      aria-label="Toggle Cinematic FX"
      className="relative flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-700/60 backdrop-blur-md text-xs font-mono tracking-wider transition-all duration-300 hover:border-cyan-400/50 group"
    >
      <motion.div
        animate={{ rotate: active ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="text-cyan-400"
      >
        {active ? <Sparkles className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
      </motion.div>
      <span className="text-slate-300 group-hover:text-cyan-300 text-[11px]">
        {active ? "CINEMATIC 3D" : "MINIMAL FX"}
      </span>
      <div
        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
          active ? "bg-cyan-400 shadow-[0_0_8px_#00f2fe]" : "bg-slate-600"
        }`}
      />
    </button>
  );
}
