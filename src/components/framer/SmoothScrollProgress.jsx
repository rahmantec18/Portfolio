import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Sparkles } from "lucide-react";
import { smoothScrollTo, onSmoothScroll } from "../../animations/lenisScroll";

export default function SmoothScrollProgress({ activeSection = "hero" }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(progress);
        setShowScrollTop(window.scrollY > 350);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Also listen to Lenis high-precision ticks
    const unregister = onSmoothScroll((e) => {
      if (e && typeof e.progress === "number") {
        setScrollProgress(e.progress * 100);
        setShowScrollTop(e.scroll > 350);
      }
    });

    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      unregister();
    };
  }, []);

  const handleScrollToTop = () => {
    smoothScrollTo(0, { duration: 1.3 });
  };

  // Circular progress calculations
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <>
      {/* 1. Global Laser Scroll Progress Bar at very top */}
      <div className="fixed top-0 left-0 right-0 z-[999] h-[3px] bg-transparent pointer-events-none">
        {/* Glowing gradient bar */}
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 transition-all duration-75 ease-out shadow-[0_0_12px_rgba(0,242,254,0.6)]"
          style={{ width: `${scrollProgress}%` }}
        />
        {/* Luminous laser tip spark */}
        {scrollProgress > 1 && scrollProgress < 99.5 && (
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-2 bg-white rounded-full blur-[2px] pointer-events-none transition-all duration-75"
            style={{ left: `calc(${scrollProgress}% - 8px)` }}
          />
        )}
      </div>

      {/* 2. Floating Circular Progress & Scroll-to-Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="fixed bottom-6 right-6 z-[80] flex items-center gap-3"
          >
            {/* Scroll-To-Top Circular Button */}
            <button
              onClick={handleScrollToTop}
              data-cursor="TOP"
              title="Scroll to Top"
              aria-label="Scroll to top of page"
              className="group relative w-12 h-12 rounded-full glass-panel border border-cyan-400/30 flex items-center justify-center text-slate-300 hover:text-cyan-300 hover:border-cyan-400/70 hover:shadow-[0_0_20px_rgba(0,242,254,0.3)] transition-all cursor-pointer"
            >
              {/* Circular SVG Progress Ring */}
              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-[2px]">
                <circle
                  cx="22"
                  cy="22"
                  r={radius}
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="2.5"
                  fill="none"
                />
                <circle
                  cx="22"
                  cy="22"
                  r={radius}
                  stroke="url(#progress-gradient)"
                  strokeWidth="2.5"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-100 ease-out"
                />
                <defs>
                  <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00f2fe" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Arrow Icon with Hover Bounce */}
              <ArrowUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
