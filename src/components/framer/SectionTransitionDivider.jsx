import React from "react";

export default function SectionTransitionDivider({
  gradient = "from-transparent via-cyan-500/10 to-transparent",
  lineGradient = "from-transparent via-cyan-400/25 to-transparent",
  glowColor = "rgba(0, 242, 254, 0.12)"
}) {
  return (
    <div className="relative w-full h-16 sm:h-24 pointer-events-none z-20 flex items-center justify-center overflow-hidden">
      {/* Soft atmospheric gradient veil */}
      <div className={`w-full h-full bg-gradient-to-b ${gradient}`} />

      {/* Luminous fine beam line in center */}
      <div
        className={`absolute w-3/4 sm:w-1/2 h-[1px] bg-gradient-to-r ${lineGradient}`}
        style={{
          boxShadow: `0 0 12px ${glowColor}`
        }}
      />
    </div>
  );
}
