import React, { useEffect, useRef } from "react";

export default function PolygonMeshNet({
  meshColor = "#8b5cf6",
  gridSize = 65,
  distortion = 0.35,
  revealRadius = 320,
  className = ""
}) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      if (width === 0 || height === 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (canvas.width !== Math.floor(width * dpr) || canvas.height !== Math.floor(height * dpr)) {
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        ctx.scale(dpr, dpr);
      }

      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / gridSize) + 2;
      const rows = Math.ceil(height / gridSize) + 2;
      const grid = [];

      const time = performance.now() * 0.001;

      for (let r = 0; r < rows; r++) {
        grid[r] = [];
        for (let c = 0; c < cols; c++) {
          const baseX = (c - 0.5) * gridSize;
          const baseY = (r - 0.5) * gridSize;
          const offsetX = Math.sin(r * 1.8 + c + time * 0.6) * gridSize * distortion;
          const offsetY = Math.cos(c * 1.8 + r + time * 0.5) * gridSize * distortion;

          let finalX = baseX + offsetX;
          let finalY = baseY + offsetY;

          const dx = finalX - mouseRef.current.x;
          const dy = finalY - mouseRef.current.y;
          const dist = Math.hypot(dx, dy);

          if (dist < revealRadius && dist > 0) {
            const push = (1 - dist / revealRadius) * 32;
            finalX += (dx / dist) * push;
            finalY += (dy / dist) * push;
          }

          grid[r][c] = { x: finalX, y: finalY };
        }
      }

      ctx.strokeStyle = meshColor;
      ctx.lineWidth = 0.8;

      for (let r = 0; r < rows - 1; r++) {
        for (let c = 0; c < cols - 1; c++) {
          const n1 = grid[r][c];
          const n2 = grid[r][c + 1];
          const n3 = grid[r + 1][c];
          const n4 = grid[r + 1][c + 1];

          const distAvg =
            (Math.hypot(n1.x - mouseRef.current.x, n1.y - mouseRef.current.y) +
              Math.hypot(n4.x - mouseRef.current.x, n4.y - mouseRef.current.y)) /
            2;

          const alpha = Math.max(0.04, Math.min(0.6, 1 - distAvg / revealRadius));
          ctx.globalAlpha = alpha;

          // First triangle
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.lineTo(n3.x, n3.y);
          ctx.closePath();
          ctx.stroke();

          // Second triangle
          ctx.beginPath();
          ctx.moveTo(n2.x, n2.y);
          ctx.lineTo(n4.x, n4.y);
          ctx.lineTo(n3.x, n3.y);
          ctx.closePath();
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [meshColor, gridSize, distortion, revealRadius]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}
