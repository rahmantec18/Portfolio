import React, { useEffect, useRef, useState } from "react";
import { onSmoothScroll } from "../../animations/lenisScroll";

// Content-matched visual theme configurations tailored to Abdur Rahman's domains
const THEMES = {
  hero: {
    id: "hero",
    label: "CYBER HORIZON",
    sub: "Creative Technologist • Digital Architecture",
    primary: [0, 242, 254], // #00f2fe electric cyan
    secondary: [139, 92, 246], // #8b5cf6 violet
    accent: [56, 189, 248], // sky blue
    mode: "hero"
  },
  about: {
    id: "about",
    label: "STUDIO WARMTH",
    sub: "Personal Narrative • Authentic Portraiture",
    primary: [245, 158, 11], // amber
    secondary: [244, 63, 94], // soft rose
    accent: [251, 191, 36], // warm gold
    mode: "about"
  },
  tech: {
    id: "tech",
    label: "NEURAL CODE MATRIX",
    sub: "Full-Stack Dev • Cyber Security • Synapses",
    primary: [6, 182, 212], // cyan
    secondary: [59, 130, 246], // electric blue
    accent: [16, 185, 129], // emerald pulse
    mode: "tech"
  },
  projects: {
    id: "projects",
    label: "DIGITAL MULTIVERSE",
    sub: "Web Applications • Interactive Systems",
    primary: [168, 85, 247], // purple
    secondary: [14, 165, 233], // sky blue
    accent: [236, 72, 153], // pink
    mode: "projects"
  },
  photography: {
    id: "photography",
    label: "OPTICAL BOKEH & LENS",
    sub: "Spatial 3D Archive • Camera Optics • Anamorphic",
    primary: [251, 191, 36], // tungsten gold
    secondary: [244, 63, 94], // lens flare ruby
    accent: [56, 189, 248], // cool daylight
    mode: "photography"
  },
  video: {
    id: "video",
    label: "TIMELINE WAVEFORMS",
    sub: "Narrative Motion • Pacing • Frequency Dynamics",
    primary: [217, 70, 239], // cinema magenta
    secondary: [147, 51, 234], // ultraviolet
    accent: [244, 63, 94], // crimson cut
    mode: "video"
  },
  design: {
    id: "design",
    label: "ISOMETRIC VECTOR CANVAS",
    sub: "Visual Identity • CMYK Harmonies • Geometry",
    primary: [236, 72, 153], // fuchsia
    secondary: [6, 182, 212], // cyan
    accent: [234, 179, 8], // yellow
    mode: "design"
  },
  experience: {
    id: "experience",
    label: "STELLAR MILESTONES",
    sub: "Trajectory • Engagements • Leadership",
    primary: [37, 99, 235], // sapphire
    secondary: [124, 58, 237], // indigo
    accent: [34, 211, 238], // cyan
    mode: "experience"
  },
  services: {
    id: "services",
    label: "CREATIVE NEXUS",
    sub: "Multidisciplinary Offerings • Production",
    primary: [139, 92, 246], // violet
    secondary: [6, 182, 212], // cyan
    accent: [245, 158, 11], // amber
    mode: "services"
  },
  beyond: {
    id: "beyond",
    label: "WARM HORIZONS",
    sub: "Personal Passions • Curious Pursuits",
    primary: [244, 63, 94], // rose
    secondary: [245, 158, 11], // amber
    accent: [168, 85, 247], // purple
    mode: "beyond"
  },
  contact: {
    id: "contact",
    label: "PULSE TERMINAL",
    sub: "Direct Conduit • Cyber Connection",
    primary: [16, 185, 129], // emerald
    secondary: [6, 182, 212], // cyan
    accent: [139, 92, 246], // violet
    mode: "contact"
  }
};

const SECTION_KEYS = Object.keys(THEMES);

export default function InteractiveContentBG({ className = "" }) {
  const canvasRef = useRef(null);
  const [activeSectionId, setActiveSectionId] = useState("hero");
  const activeSectionRef = useRef(activeSectionId);

  // Keep ref synchronized with state for 60fps canvas loop without re-triggering effect
  useEffect(() => {
    activeSectionRef.current = activeSectionId;
  }, [activeSectionId]);

  // Active theme reference
  const currentTheme = THEMES[activeSectionId] || THEMES.hero;

  // Track active section automatically as user scrolls through the portfolio
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        ticking = false;
        const scrollPos = window.scrollY + window.innerHeight * 0.38;

        // Check sections from bottom to top
        for (let i = SECTION_KEYS.length - 1; i >= 0; i--) {
          const key = SECTION_KEYS[i];
          const el = document.getElementById(key);
          if (el) {
            const rect = el.getBoundingClientRect();
            const top = rect.top + window.scrollY;
            if (top <= scrollPos) {
              setActiveSectionId(key);
              break;
            }
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    const unregisterLenis = onSmoothScroll(handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      unregisterLenis();
    };
  }, []);

  // Main Interactive Canvas Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Responsive particle count
    const isMobile = width < 768;
    const particleCount = isMobile ? 55 : 105;

    // High DPI setup
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Interactive mouse tracking with lerped momentum
    const mouse = {
      x: width * 0.5,
      y: height * 0.4,
      smoothX: width * 0.5,
      smoothY: height * 0.4,
      vx: 0,
      vy: 0,
      lastX: width * 0.5,
      lastY: height * 0.4,
      isHovering: false
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.isHovering = true;
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        mouse.isHovering = true;
      }
    };

    const handleMouseLeave = () => {
      mouse.isHovering = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    // Shockwave ripple array
    const ripples = [];
    const triggerShockwave = (x, y, customColor = null) => {
      ripples.push({
        x: x || width * 0.5,
        y: y || height * 0.5,
        radius: 0,
        maxRadius: Math.max(width, height) * 0.55,
        speed: 7.5,
        alpha: 0.85,
        color: customColor || currentColors.primary
      });
    };

    // Global click / tap listener for interactive shockwaves
    const handleClick = (e) => {
      triggerShockwave(e.clientX, e.clientY);
    };

    window.addEventListener("pointerdown", handleClick, { passive: true });

    // Expose shockwave trigger to window for external triggers
    window.__triggerBgShockwave = triggerShockwave;

    // Interpolation state for smooth continuous color & mode transitions
    const currentColors = {
      primary: [...currentTheme.primary],
      secondary: [...currentTheme.secondary],
      accent: [...currentTheme.accent]
    };

    // Particles system
    const particles = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2.2 + 0.8,
      baseRadius: Math.random() * 2.2 + 0.8,
      alpha: Math.random() * 0.5 + 0.25,
      baseAlpha: Math.random() * 0.5 + 0.25,
      colorType: i % 3, // 0: primary, 1: secondary, 2: accent
      // Neural data packet traveler for Tech mode
      packetProgress: Math.random(),
      packetSpeed: Math.random() * 0.008 + 0.004,
      targetNodeIdx: (i + 1) % particleCount,
      // Bokeh disc for Photography & About modes
      bokehScale: Math.random() * 3 + 1,
      // Isometric geometry offset for Design mode
      rotationAngle: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.02
    }));

    // Mode-specific variables
    let playheadX = 0; // for Video timeline playhead
    let sonarRadius = 0; // for Contact pulse
    let time = 0;

    // Animation Loop
    let lastTime = performance.now();

    const draw = (now) => {
      animId = requestAnimationFrame(draw);

      if (document.hidden) return; // Tab inactive pause

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      time += dt;

      // 1. Mouse smoothing physics lerp
      mouse.smoothX += (mouse.x - mouse.smoothX) * 0.14;
      mouse.smoothY += (mouse.y - mouse.smoothY) * 0.14;
      mouse.vx = mouse.smoothX - mouse.lastX;
      mouse.vy = mouse.smoothY - mouse.lastY;
      mouse.lastX = mouse.smoothX;
      mouse.lastY = mouse.smoothY;

      // 2. Continuous color interpolation (smooth lerp 0.055)
      const target = THEMES[activeSectionRef.current] || THEMES.hero;
      for (let c = 0; c < 3; c++) {
        currentColors.primary[c] += (target.primary[c] - currentColors.primary[c]) * 0.055;
        currentColors.secondary[c] += (target.secondary[c] - currentColors.secondary[c]) * 0.055;
        currentColors.accent[c] += (target.accent[c] - currentColors.accent[c]) * 0.055;
      }

      const pCol = `${Math.round(currentColors.primary[0])}, ${Math.round(currentColors.primary[1])}, ${Math.round(currentColors.primary[2])}`;
      const sCol = `${Math.round(currentColors.secondary[0])}, ${Math.round(currentColors.secondary[1])}, ${Math.round(currentColors.secondary[2])}`;
      const aCol = `${Math.round(currentColors.accent[0])}, ${Math.round(currentColors.accent[1])}, ${Math.round(currentColors.accent[2])}`;

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      // =========================================================================
      // LAYER 1: AMBIENT INTERACTIVE CURSOR SPOTLIGHT & GRADIENT NEBULA
      // =========================================================================
      const mouseGrad = ctx.createRadialGradient(
        mouse.smoothX,
        mouse.smoothY,
        0,
        mouse.smoothX,
        mouse.smoothY,
        Math.min(width, height) * 0.45
      );
      mouseGrad.addColorStop(0, `rgba(${pCol}, 0.09)`);
      mouseGrad.addColorStop(0.5, `rgba(${sCol}, 0.04)`);
      mouseGrad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = mouseGrad;
      ctx.fillRect(0, 0, width, height);

      // =========================================================================
      // LAYER 2: SECTION-SPECIFIC GENERATIVE VISUAL CONTENT
      // =========================================================================
      const activeMode = target.mode;

      // --- HERO MODE: 3D Perspective Digital Cyber Grid ---
      if (activeMode === "hero" || activeMode === "projects") {
        ctx.save();
        ctx.strokeStyle = `rgba(${pCol}, 0.045)`;
        ctx.lineWidth = 1;
        const gridSize = 56;
        const gridOffY = (time * 12) % gridSize;

        // Subtle horizontal perspective scanlines
        for (let y = gridOffY; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
        for (let x = 0; x < width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        ctx.restore();
      }

      // --- ABOUT MODE: Warm Cinematic Portrait Bokeh Discs ---
      if (activeMode === "about") {
        ctx.save();
        const orbs = [
          { x: width * 0.25, y: height * 0.35, r: 80, pulse: Math.sin(time * 0.8) * 15 },
          { x: width * 0.75, y: height * 0.65, r: 110, pulse: Math.cos(time * 0.6) * 20 },
          { x: width * 0.5, y: height * 0.2, r: 60, pulse: Math.sin(time * 1.1) * 10 }
        ];

        orbs.forEach((orb) => {
          const rad = orb.r + orb.pulse;
          const orbGrad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, rad);
          orbGrad.addColorStop(0, `rgba(${pCol}, 0.12)`);
          orbGrad.addColorStop(0.6, `rgba(${sCol}, 0.05)`);
          orbGrad.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = orbGrad;
          ctx.beginPath();
          ctx.arc(orb.x, orb.y, rad, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.restore();
      }

      // --- PHOTOGRAPHY MODE: Anamorphic Lens Flare Beam & Aperture Glints ---
      if (activeMode === "photography") {
        ctx.save();
        // Horizontal Anamorphic Lens Streak that follows mouse Y smoothly
        const streakY = mouse.smoothY;
        const streakGrad = ctx.createLinearGradient(0, streakY, width, streakY);
        streakGrad.addColorStop(0, "rgba(0,0,0,0)");
        streakGrad.addColorStop(0.3, `rgba(${sCol}, 0.04)`);
        streakGrad.addColorStop(0.5, `rgba(${aCol}, 0.22)`);
        streakGrad.addColorStop(0.7, `rgba(${sCol}, 0.04)`);
        streakGrad.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = streakGrad;
        ctx.fillRect(0, streakY - 1.5, width, 3);

        // Core optical glint at mouse position
        const glintGrad = ctx.createRadialGradient(
          mouse.smoothX,
          streakY,
          0,
          mouse.smoothX,
          streakY,
          85
        );
        glintGrad.addColorStop(0, `rgba(${pCol}, 0.3)`);
        glintGrad.addColorStop(0.4, `rgba(${aCol}, 0.1)`);
        glintGrad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = glintGrad;
        ctx.beginPath();
        ctx.arc(mouse.smoothX, streakY, 85, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // --- VIDEO MODE: Flowing Audio/Video Waveforms & Playhead Scan ---
      if (activeMode === "video") {
        ctx.save();
        // Sweeping Playhead Beam
        playheadX = (playheadX + dt * 140) % width;
        const playheadGrad = ctx.createLinearGradient(playheadX - 15, 0, playheadX + 15, 0);
        playheadGrad.addColorStop(0, "rgba(0,0,0,0)");
        playheadGrad.addColorStop(0.5, `rgba(${pCol}, 0.18)`);
        playheadGrad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = playheadGrad;
        ctx.fillRect(playheadX - 15, 0, 30, height);

        // Flowing Harmonic Waveforms
        const waveCount = 3;
        for (let w = 0; w < waveCount; w++) {
          const baseY = height * (0.35 + w * 0.18);
          ctx.beginPath();
          ctx.moveTo(0, baseY);

          for (let x = 0; x <= width; x += 20) {
            const freq1 = 0.004 + w * 0.002;
            const freq2 = 0.008 + w * 0.003;
            const mouseProximity = Math.max(0, 1 - Math.hypot(x - mouse.smoothX, baseY - mouse.smoothY) / 220);
            const extraAmp = mouseProximity * 35;
            const y =
              baseY +
              Math.sin(x * freq1 + time * (2 + w)) * (20 + extraAmp) +
              Math.cos(x * freq2 - time * (1.5 + w)) * 12;
            ctx.lineTo(x, y);
          }

          ctx.strokeStyle = `rgba(${w === 0 ? pCol : w === 1 ? sCol : aCol}, ${0.14 - w * 0.03})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
        ctx.restore();
      }

      // --- GRAPHIC DESIGN MODE: Floating Geometric Polygons & Isometric Marks ---
      if (activeMode === "design") {
        ctx.save();
        // Isometric alignment crosshairs
        const crossSpacing = 120;
        ctx.fillStyle = `rgba(${sCol}, 0.12)`;
        for (let cx = crossSpacing; cx < width; cx += crossSpacing) {
          for (let cy = crossSpacing; cy < height; cy += crossSpacing) {
            ctx.fillRect(cx - 3, cy, 7, 1);
            ctx.fillRect(cx, cy - 3, 1, 7);
          }
        }
        ctx.restore();
      }

      // --- CONTACT MODE: Converging Energy Conduits & Sonar Radiations ---
      if (activeMode === "contact") {
        ctx.save();
        const centerX = width * 0.5;
        const centerY = height * 0.65;

        // Sonar expanding rings
        sonarRadius = (sonarRadius + dt * 60) % 260;
        ctx.beginPath();
        ctx.arc(centerX, centerY, sonarRadius, 0, Math.PI * 2);
        const ringAlpha = Math.max(0, 0.25 * (1 - sonarRadius / 260));
        ctx.strokeStyle = `rgba(${pCol}, ${ringAlpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Converging faint guide rays
        const rayCount = 8;
        ctx.strokeStyle = `rgba(${sCol}, 0.04)`;
        ctx.lineWidth = 1;
        for (let r = 0; r < rayCount; r++) {
          const angle = (r / rayCount) * Math.PI * 2 + time * 0.05;
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(centerX + Math.cos(angle) * width, centerY + Math.sin(angle) * width);
          ctx.stroke();
        }
        ctx.restore();
      }

      // =========================================================================
      // LAYER 3: INTERACTIVE PARTICLES & CONSTELLATION MESH
      // =========================================================================
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Normal drift
        p.x += p.vx * 60 * dt;
        p.y += p.vy * 60 * dt;

        // Screen wrap
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Cursor Physics: Distance to smoothed cursor
        const dx = mouse.smoothX - p.x;
        const dy = mouse.smoothY - p.y;
        const dist = Math.hypot(dx, dy);

        let particleAlpha = p.baseAlpha;
        let particleRadius = p.radius;

        // Magnetic Attraction & Repulsion
        if (dist < 160) {
          const factor = (1 - dist / 160);
          particleAlpha = Math.min(1, p.baseAlpha + factor * 0.55);
          particleRadius = p.radius + factor * 1.5;

          // Gentle gravitational orbit/pull
          p.x += (dx / dist) * factor * 1.2;
          p.y += (dy / dist) * factor * 1.2;

          // Interactive Constellation line from cursor to particle
          ctx.beginPath();
          ctx.moveTo(mouse.smoothX, mouse.smoothY);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = `rgba(${pCol}, ${factor * 0.28})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        // Particle Color Selection
        const colorStr =
          p.colorType === 0 ? pCol : p.colorType === 1 ? sCol : aCol;

        // Render Particle Body
        ctx.beginPath();
        ctx.arc(p.x, p.y, particleRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colorStr}, ${particleAlpha})`;
        ctx.fill();

        // TECH MODE: Neural Data Packets moving along connections
        if (activeMode === "tech") {
          const targetNode = particles[p.targetNodeIdx];
          const nodeDist = Math.hypot(p.x - targetNode.x, p.y - targetNode.y);

          if (nodeDist < 140) {
            // Draw connection wire
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(targetNode.x, targetNode.y);
            ctx.strokeStyle = `rgba(${pCol}, ${(1 - nodeDist / 140) * 0.16})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();

            // Animated Signal Packet bullet traveling from p to targetNode
            p.packetProgress = (p.packetProgress + p.packetSpeed) % 1;
            const packetX = p.x + (targetNode.x - p.x) * p.packetProgress;
            const packetY = p.y + (targetNode.y - p.y) * p.packetProgress;

            ctx.beginPath();
            ctx.arc(packetX, packetY, 1.4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${aCol}, 0.8)`;
            ctx.fill();
          }
        }

        // Constellation Lines between neighboring particles (all modes)
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);
          const maxLinkDist = activeMode === "tech" ? 110 : 85;

          if (dist2 < maxLinkDist) {
            const linkAlpha = (1 - dist2 / maxLinkDist) * 0.13;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${pCol}, ${linkAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // =========================================================================
      // LAYER 4: INTERACTIVE SHOCKWAVE RIPPLES (Expanding on click / tap)
      // =========================================================================
      for (let r = ripples.length - 1; r >= 0; r--) {
        const ripple = ripples[r];
        ripple.radius += ripple.speed;
        ripple.alpha *= 0.96;

        // Deflect particles touched by shockwave
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const distFromRipple = Math.hypot(p.x - ripple.x, p.y - ripple.y);
          if (Math.abs(distFromRipple - ripple.radius) < 30) {
            const angle = Math.atan2(p.y - ripple.y, p.x - ripple.x);
            p.x += Math.cos(angle) * 3.5;
            p.y += Math.sin(angle) * 3.5;
          }
        }

        if (ripple.alpha > 0.01 && ripple.radius < ripple.maxRadius) {
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${pCol}, ${ripple.alpha * 0.45})`;
          ctx.lineWidth = 2.5;
          ctx.stroke();

          // Inner luminous soft fill
          const rippleGrad = ctx.createRadialGradient(
            ripple.x,
            ripple.y,
            Math.max(0, ripple.radius - 20),
            ripple.x,
            ripple.y,
            ripple.radius + 10
          );
          rippleGrad.addColorStop(0, "rgba(0,0,0,0)");
          rippleGrad.addColorStop(0.5, `rgba(${sCol}, ${ripple.alpha * 0.12})`);
          rippleGrad.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = rippleGrad;
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, ripple.radius + 10, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ripples.splice(r, 1);
        }
      }
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("pointerdown", handleClick);
      document.removeEventListener("mouseleave", handleMouseLeave);
      delete window.__triggerBgShockwave;
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#020205] ${className}`}
      aria-hidden="true"
    >
      {/* Soft Multi-Octave Atmospheric Gradient Backdrop */}
      <div
        className="absolute -top-[25%] -left-[15%] w-[75vw] h-[75vw] rounded-full blur-[160px] transition-colors duration-1000 ease-out pointer-events-none opacity-80"
        style={{
          background: `radial-gradient(circle, rgba(${currentTheme.primary.join(",")}, 0.16) 0%, rgba(${currentTheme.secondary.join(",")}, 0.06) 50%, transparent 80%)`
        }}
      />
      <div
        className="absolute top-[40%] -right-[20%] w-[70vw] h-[70vw] rounded-full blur-[170px] transition-colors duration-1000 ease-out pointer-events-none opacity-70"
        style={{
          background: `radial-gradient(circle, rgba(${currentTheme.secondary.join(",")}, 0.14) 0%, rgba(${currentTheme.accent.join(",")}, 0.05) 50%, transparent 80%)`
        }}
      />
      <div
        className="absolute -bottom-[20%] left-[20%] w-[65vw] h-[65vw] rounded-full blur-[150px] transition-colors duration-1000 ease-out pointer-events-none opacity-60"
        style={{
          background: `radial-gradient(circle, rgba(${currentTheme.primary.join(",")}, 0.12) 0%, transparent 70%)`
        }}
      />

      {/* Generative Interactive Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Film Grain Texture Overlay */}
      <div className="absolute inset-0 film-grain opacity-[0.38] pointer-events-none" />
    </div>
  );
}
