import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

export default function DNACarousel({
  items = [],
  cardWidth = 240,
  cardHeight = 320,
  gap = 30,
  curveDepth = 180,
  curveHeight = 45,
  helixSpread = 70,
  perspective = 1000,
  autoPlay = true,
  autoSpeed = 0.25,
  onSelect = null,
  className = ""
}) {
  const containerRef = useRef(null);
  const [position, setPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const startPosRef = useRef(0);
  const velocityRef = useRef(0);
  const dragDeltaRef = useRef(0);
  const animFrameRef = useRef(null);

  const count = items.length || 1;

  // Animation Loop for inertia and autoPlay
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (now) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      if (!isDragging) {
        if (autoPlay && Math.abs(velocityRef.current) < 0.05) {
          setPosition((prev) => (prev + autoSpeed * dt) % count);
        } else {
          // Inertia damping
          velocityRef.current *= 0.94;
          setPosition((prev) => (prev + velocityRef.current * dt + count) % count);
        }
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isDragging, autoPlay, autoSpeed, count]);

  // Pointer event handlers for silky smooth drag
  const handlePointerDown = (e) => {
    setIsDragging(true);
    dragDeltaRef.current = 0;
    startXRef.current = e.clientX;
    startPosRef.current = position;
    velocityRef.current = 0;
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startXRef.current;
    dragDeltaRef.current = Math.abs(dx);
    const deltaPos = -dx / (cardWidth * 1.2);
    setPosition((startPosRef.current + deltaPos + count * 10) % count);
    velocityRef.current = deltaPos * 8;
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handleCardClick = (e, item, idx) => {
    e.stopPropagation();
    // Only trigger modal if user wasn't actively dragging
    if (dragDeltaRef.current < 10) {
      if (onSelect) onSelect(item, idx);
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`relative w-full h-[420px] overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing select-none touch-pan-y ${className}`}
      style={{ perspective: `${perspective}px` }}
    >
      <div className="relative w-full h-full flex items-center justify-center preserve-3d">
        {items.map((item, idx) => {
          // Calculate distance along the circular / helix track
          let dist = idx - position;
          while (dist > count / 2) dist -= count;
          while (dist < -count / 2) dist += count;

          const angle = (dist / count) * Math.PI * 2;
          const x = Math.sin(angle) * (cardWidth * 1.8 + helixSpread);
          const z = Math.cos(angle) * curveDepth - curveDepth;
          const y = Math.sin(angle * 2) * curveHeight;
          const rotY = (angle * 180) / Math.PI;

          const scale = Math.max(0.6, 1 - Math.abs(dist) * 0.18);
          const opacity = Math.max(0.2, 1 - Math.abs(dist) * 0.28);
          const zIndex = Math.round(100 + z);

          return (
            <div
              key={idx}
              onClick={(e) => handleCardClick(e, item, idx)}
              className="absolute transition-transform duration-75 will-change-transform rounded-2xl overflow-hidden glass-card shadow-2xl border border-white/10 group cursor-pointer hover:border-amber-400/60 hover:shadow-[0_0_35px_rgba(245,158,11,0.35)]"
              style={{
                width: `${cardWidth}px`,
                height: `${cardHeight}px`,
                transform: `translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotY}deg) scale(${scale})`,
                opacity,
                zIndex
              }}
            >
              <img
                src={item.image || item.src}
                alt={item.title || `Frame ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-950/90 via-deep-950/20 to-transparent flex flex-col justify-end p-4 pointer-events-none">
                <span className="text-[11px] font-mono text-cyan-400 font-medium">
                  {item.category || `FRAME ${String(idx + 1).padStart(2, "0")}`}
                </span>
                <h4 className="text-sm font-semibold text-slate-100 font-ui truncate">
                  {item.title || "Untitled Moment"}
                </h4>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
