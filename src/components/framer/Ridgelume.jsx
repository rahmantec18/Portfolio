import React, { useEffect, useRef } from "react";

export default function Ridgelume({
  className = "",
  colorA = "#0A9FBD",
  colorB = "#00D2FF",
  colorC = "#8b5cf6"
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId;
    let time = 0;

    const render = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
      }

      ctx.clearRect(0, 0, width, height);

      const lines = 28;
      const stepY = height / (lines + 6);
      time += 0.012;

      for (let i = 0; i < lines; i++) {
        const yBase = height * 0.25 + i * stepY;
        const progress = i / lines;

        ctx.beginPath();
        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(0.2, colorA);
        gradient.addColorStop(0.5, colorB);
        gradient.addColorStop(0.8, colorC);
        gradient.addColorStop(1, "transparent");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1 + progress * 1.5;
        ctx.globalAlpha = Math.sin(progress * Math.PI) * 0.45;

        for (let x = 0; x <= width; x += 15) {
          const wave1 = Math.sin(x * 0.008 + time + i * 0.2) * (20 + progress * 40);
          const wave2 = Math.cos(x * 0.015 - time * 0.5) * (10 + progress * 20);
          const y = yBase + wave1 + wave2;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [colorA, colorB, colorC]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}
