import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function ShaderButton({
  children,
  onClick,
  href,
  target,
  rel,
  className = "",
  cursorText = "OPEN",
  icon: Icon = null,
  variant = "primary"
}) {
  const [hovered, setHovered] = useState(false);
  const btnRef = useRef(null);

  const isPrimary = variant === "primary";

  const content = (
    <motion.div
      ref={btnRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      data-cursor={cursorText}
      className={`relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-ui font-semibold text-sm tracking-wide overflow-hidden transition-all duration-300 select-none cursor-pointer border ${
        isPrimary
          ? "bg-slate-900/90 text-slate-100 border-cyan-400/40 shadow-[0_0_20px_rgba(0,242,254,0.15)] hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,242,254,0.3)]"
          : "bg-slate-900/60 text-slate-300 border-slate-700 hover:border-slate-500 hover:text-white"
      } ${className}`}
    >
      {/* Subtle iridescent animated shader mesh / gradient on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-500"
        animate={{ opacity: hovered ? (isPrimary ? 0.35 : 0.15) : 0 }}
        style={{
          background: isPrimary
            ? "linear-gradient(135deg, rgba(0,242,254,0.6) 0%, rgba(139,92,246,0.6) 50%, rgba(244,63,94,0.4) 100%)"
            : "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(148,163,184,0.2) 100%)",
          filter: "blur(8px)"
        }}
      />

      {/* Shimmer light bar travelling across */}
      <div
        className={`absolute inset-0 -translate-x-full transition-transform duration-700 ease-out pointer-events-none ${
          hovered ? "translate-x-full" : ""
        }`}
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)",
          transform: hovered ? "translateX(150%) skewX(-20deg)" : "translateX(-150%) skewX(-20deg)",
          transition: "transform 0.75s ease-in-out"
        }}
      />

      {/* Label and Icon */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {Icon && (
          <motion.span
            animate={{ x: hovered ? 4 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Icon className="w-4 h-4" />
          </motion.span>
        )}
      </span>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className="inline-block">
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className="inline-block focus:outline-none">
      {content}
    </button>
  );
}
