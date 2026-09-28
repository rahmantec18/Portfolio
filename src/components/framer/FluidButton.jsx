import React, { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function FluidButton({
  children,
  onClick,
  href,
  target,
  rel,
  className = "",
  cursorText = "EXPLORE"
}) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Springs for magnetic pull
  const x = useSpring(0, { stiffness: 220, damping: 18 });
  const y = useSpring(0, { stiffness: 220, damping: 18 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // Pull button up to 14px toward pointer
    x.set((e.clientX - centerX) * 0.35);
    y.set((e.clientY - centerY) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      data-cursor={cursorText}
      className={`relative inline-flex items-center justify-center px-7 py-3.5 rounded-full font-ui text-sm font-semibold tracking-wide overflow-hidden border border-white/15 bg-white/5 backdrop-blur-md text-white transition-all duration-300 hover:border-cyan-400/60 hover:bg-white/10 ${className}`}
    >
      <span className="relative z-10">{children}</span>

      {/* Fluid ripple accent */}
      {isHovered && (
        <motion.div
          layoutId="fluid-glow"
          className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-md pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
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
