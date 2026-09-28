import React, { useEffect, useState } from "react";

export default function TimeBasedBG({ className = "" }) {
  const [timePeriod, setTimePeriod] = useState("night");

  useEffect(() => {
    const updatePeriod = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) setTimePeriod("morning");
      else if (hour >= 12 && hour < 17) setTimePeriod("day");
      else if (hour >= 17 && hour < 20) setTimePeriod("evening");
      else setTimePeriod("night");
    };

    updatePeriod();
    const timer = setInterval(updatePeriod, 60000);
    return () => clearInterval(timer);
  }, []);

  // Theme palettes based on time
  const palette = {
    morning: {
      accentA: "rgba(56, 189, 248, 0.08)", // Light sky blue
      accentB: "rgba(251, 146, 60, 0.06)",  // Soft sunrise amber
      tag: "MORNING CYCLE"
    },
    day: {
      accentA: "rgba(0, 242, 254, 0.07)",  // Vibrant cyan
      accentB: "rgba(59, 130, 246, 0.06)",  // High-noon blue
      tag: "SOLAR CYCLE"
    },
    evening: {
      accentA: "rgba(244, 63, 94, 0.08)",   // Sunset rose
      accentB: "rgba(139, 92, 246, 0.07)",  // Twilight purple
      tag: "TWILIGHT CYCLE"
    },
    night: {
      accentA: "rgba(139, 92, 246, 0.08)",  // Deep violet
      accentB: "rgba(6, 182, 212, 0.05)",   // Ambient cyan
      tag: "NOCTURNAL CYCLE"
    }
  }[timePeriod];

  return (
    <div className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}>
      {/* Time-reactive ambient gradient spheres */}
      <div
        className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full blur-[140px] transition-colors duration-1000"
        style={{ background: palette.accentA }}
      />
      <div
        className="absolute top-[40%] -right-[15%] w-[55vw] h-[55vw] rounded-full blur-[150px] transition-colors duration-1000"
        style={{ background: palette.accentB }}
      />
      <div
        className="absolute -bottom-[10%] left-[20%] w-[50vw] h-[50vw] rounded-full blur-[130px] opacity-40 transition-colors duration-1000"
        style={{ background: palette.accentA }}
      />
    </div>
  );
}
