import React, { useEffect, useState, useRef } from "react";

export default function TimeBasedBG({ className = "" }) {
  const [timePeriod, setTimePeriod] = useState("night");
  const canvasRef = useRef(null);

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

  // Responsive, high-performance continuous constellation & cosmic dust canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    // Mouse coordinates for gentle interactive pull
    let mouse = { x: -1000, y: -1000 };
    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Generate floating cyber particles
    const count = Math.min(75, Math.floor((width * height) / 18000));
    const particles = Array.from({ length: count }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 1.8 + 0.6,
      baseAlpha: Math.random() * 0.45 + 0.25,
      alpha: Math.random() * 0.45 + 0.25,
      color: Math.random() > 0.4 ? "0, 242, 254" : "168, 85, 247"
    }));

    let lastDraw = performance.now();

    const draw = (now) => {
      animId = requestAnimationFrame(draw);

      // Skip rendering if page is hidden
      if (document.hidden) return;

      const dt = Math.min((now - lastDraw) / 1000, 0.1);
      lastDraw = now;

      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx * 60 * dt;
        p.y += p.vy * 60 * dt;

        // Wrap around viewport edges seamlessly
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Subtle reaction to mouse
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let currentAlpha = p.baseAlpha;
        if (dist < 120) {
          currentAlpha = Math.min(0.9, p.baseAlpha + (1 - dist / 120) * 0.5);
        }

        // Render particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${currentAlpha})`;
        ctx.fill();

        // Connect nearby particles with subtle cyber constellation vectors
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist2 < 95) {
            const lineAlpha = (1 - dist2 / 95) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 242, 254, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  // Theme palettes based on time
  const palette = {
    morning: {
      accentA: "rgba(56, 189, 248, 0.12)", // Light sky blue
      accentB: "rgba(251, 146, 60, 0.08)",  // Soft sunrise amber
      tag: "MORNING CYCLE"
    },
    day: {
      accentA: "rgba(0, 242, 254, 0.10)",  // Vibrant cyan
      accentB: "rgba(59, 130, 246, 0.09)",  // High-noon blue
      tag: "SOLAR CYCLE"
    },
    evening: {
      accentA: "rgba(244, 63, 94, 0.12)",   // Sunset rose
      accentB: "rgba(139, 92, 246, 0.10)",  // Twilight purple
      tag: "TWILIGHT CYCLE"
    },
    night: {
      accentA: "rgba(139, 92, 246, 0.12)",  // Deep violet
      accentB: "rgba(6, 182, 212, 0.09)",   // Ambient cyan
      tag: "NOCTURNAL CYCLE"
    }
  }[timePeriod];

  return (
    <div className={`fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#020205] ${className}`}>
      {/* 1. Time-reactive ambient glowing nebulae */}
      <div
        className="absolute -top-[20%] -left-[10%] w-[65vw] h-[65vw] rounded-full blur-[140px] transition-colors duration-1000"
        style={{ background: palette.accentA }}
      />
      <div
        className="absolute top-[35%] -right-[15%] w-[60vw] h-[60vw] rounded-full blur-[160px] transition-colors duration-1000"
        style={{ background: palette.accentB }}
      />
      <div
        className="absolute -bottom-[15%] left-[20%] w-[55vw] h-[55vw] rounded-full blur-[140px] opacity-60 transition-colors duration-1000"
        style={{ background: palette.accentA }}
      />

      {/* 2. Cybernetic Grid Matrix throughout website */}
      <div
        className="absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 242, 254, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(139, 92, 246, 0.035) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 95% 90% at 50% 50%, black 50%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 95% 90% at 50% 50%, black 50%, transparent 100%)"
        }}
      />

      {/* 3. Floating Cyber Particle & Constellation Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* 4. Film Grain Cinematic Overlay */}
      <div className="absolute inset-0 film-grain opacity-40 pointer-events-none" />
    </div>
  );
}
