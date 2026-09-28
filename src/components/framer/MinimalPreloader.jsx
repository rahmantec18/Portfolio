import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MinimalPreloader({ onLoaded }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Smooth dynamic increments
      const step = Math.max(2, Math.floor((100 - current) * 0.18));
      current += step;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          if (onLoaded) onLoaded();
        }, 300);
      } else {
        setProgress(current);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [onLoaded]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -30,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020205] text-slate-100 select-none overflow-hidden"
        >
          {/* Subtle Ambient Radial Light */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center space-y-6 max-w-sm px-6 text-center">
            {/* Monogram / Brand mark */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 border border-cyan-400/30 flex items-center justify-center shadow-lg shadow-cyan-500/10"
            >
              <span className="font-display font-black text-2xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-purple-300">
                AR
              </span>
            </motion.div>

            {/* Title */}
            <div className="space-y-1">
              <h2 className="text-sm font-semibold tracking-[0.3em] uppercase text-slate-300 font-ui">
                ABDUR RAHMAN I
              </h2>
              <p className="text-xs text-slate-500 tracking-wider">
                Creative Technologist • Portfolio Journey
              </p>
            </div>

            {/* Progress Bar Track */}
            <div className="w-56 h-[3px] bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            {/* Progress Percentage */}
            <div className="font-mono text-xs text-cyan-400 font-medium tracking-widest">
              {progress.toString().padStart(2, "0")} %
            </div>
          </div>

          {/* Bottom subtle tag */}
          <div className="absolute bottom-8 text-[11px] font-mono tracking-widest text-slate-600">
            SYSTEM INITIALIZING • 60 FPS READY
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
