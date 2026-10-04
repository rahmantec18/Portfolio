import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Move, Compass, Volume2, VolumeX } from "lucide-react";

/**
 * CinematicIntroPage
 * 
 * A standalone, dedicated interactive intro experience that displays
 * after the preloader and before the home landing page.
 * 
 * Features:
 * - High-powered WebGL Volumetric Light Scattering (God Rays)
 * - Ultra-stylish typography options: "Britney" (signature fluid display),
 *   "Cinzel Decorative" (imperial luxury serif), and "Syne" (avant-garde cyber)
 * - Real-time point light tracking to cursor with spring physics
 * - Ambient automatic light sweeping during idle / touch
 * - Keyboard (Space / Enter / Down), scroll-wheel, and click-to-enter transitions
 * - Seamless Framer Motion exit animation leading into the home landing page
 */
export default function CinematicIntroPage({ onEnter, isVisible = true }) {
  const canvasRef = useRef(null);
  const [selectedFont, setSelectedFont] = useState("Britney"); // 'Britney' | 'Cinzel' | 'Syne'
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isEntering, setIsEntering] = useState(false);

  // Check fonts readiness
  useEffect(() => {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => setFontsLoaded(true)).catch(() => setFontsLoaded(true));
    } else {
      setFontsLoaded(true);
    }
  }, []);

  // WebGL Volumetric Light Engine
  useEffect(() => {
    if (!isVisible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl", {
        alpha: true,
        antialias: false,
        depth: false,
        stencil: false,
        premultipliedAlpha: false
      }) ||
      canvas.getContext("experimental-webgl", {
        alpha: true,
        antialias: false,
        depth: false,
        stencil: false,
        premultipliedAlpha: false
      });

    if (!gl) return;

    // Fullscreen quad vertex shader
    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = (a_position + 1.0) * 0.5;
        v_uv.y = 1.0 - v_uv.y;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Volumetric Light Scattering Fragment Shader
    const fsSource = `
      precision highp float;
      varying vec2 v_uv;

      uniform sampler2D u_textTexture;
      uniform vec2 u_mouse;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_intensity;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      void main() {
        vec2 uv = v_uv;
        vec2 lightPos = u_mouse;

        float aspect = u_resolution.x / max(u_resolution.y, 1.0);
        vec2 aspectVec = vec2(aspect, 1.0);

        vec2 delta = uv - lightPos;

        // 72 samples for dense, striking god rays on the dedicated intro page
        const int SAMPLES = 72;
        float density = 0.92;
        float decay = 0.966;
        float weight = 0.052;

        vec2 stepVec = delta * (1.0 / float(SAMPLES)) * density;

        // Dither jitter to eliminate stepping artifacts
        float dither = hash(uv * 180.0 + fract(u_time * 0.05));
        vec2 curUv = uv - stepVec * dither;

        float rayAccum = 0.0;
        float currentDecay = 1.0;

        for (int i = 0; i < SAMPLES; i++) {
          curUv -= stepVec;
          if (curUv.x >= 0.0 && curUv.x <= 1.0 && curUv.y >= 0.0 && curUv.y <= 1.0) {
            float textAlpha = texture2D(u_textTexture, curUv).a;
            rayAccum += textAlpha * currentDecay * weight;
          }
          currentDecay *= decay;
        }

        // Direct stroke outline at this pixel
        float directStroke = texture2D(u_textTexture, uv).a;

        // Radial spotlight halo around cursor
        vec2 mouseDeltaAspect = (uv - lightPos) * aspectVec;
        float distToMouse = length(mouseDeltaAspect);
        float halo = 0.28 / (1.0 + distToMouse * 3.2 + distToMouse * distToMouse * 18.0);

        // Filmic atmospheric dust motes
        float grain = (hash(gl_FragCoord.xy + fract(u_time * 0.09)) - 0.5) * 0.06;
        float totalLight = (rayAccum * 1.85 + directStroke * 1.5 + halo * 0.6) * u_intensity;
        totalLight = clamp(totalLight + grain * rayAccum, 0.0, 1.0);

        // Cinematic Color Palette: Electric Cyan and Pure White Core
        vec3 rayColor = vec3(0.0, 0.92, 1.0);
        vec3 coreColor = vec3(1.0, 1.0, 1.0);
        vec3 finalColor = mix(rayColor, coreColor, clamp(directStroke * 0.9 + halo * 0.6, 0.0, 1.0));

        gl_FragColor = vec4(finalColor * totalLight, totalLight);
      }
    `;

    const compileShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, vsSource);
    const fs = compileShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
         1.0, -1.0,
         1.0,  1.0,
      ]),
      gl.STATIC_DRAW
    );

    const aPosLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(aPosLoc);
    gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0, 0);

    const uTextTextureLoc = gl.getUniformLocation(program, "u_textTexture");
    const uMouseLoc = gl.getUniformLocation(program, "u_mouse");
    const uResolutionLoc = gl.getUniformLocation(program, "u_resolution");
    const uTimeLoc = gl.getUniformLocation(program, "u_time");
    const uIntensityLoc = gl.getUniformLocation(program, "u_intensity");

    const offscreen = document.createElement("canvas");
    const offCtx = offscreen.getContext("2d");

    const textTexture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.uniform1i(uTextTextureLoc, 0);

    let width = 0;
    let height = 0;
    let dpr = 1;

    let targetMouseX = 0.5;
    let targetMouseY = 0.45;
    let smoothMouseX = 0.5;
    let smoothMouseY = 0.45;
    let hasUserMovedMouse = false;

    // Render stylish text to offscreen canvas
    const updateTextTexture = () => {
      if (!offCtx || width === 0 || height === 0) return;

      offscreen.width = width;
      offscreen.height = height;
      offCtx.clearRect(0, 0, width, height);

      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1100;

      let fontSpec = "";
      if (selectedFont === "Britney") {
        // Stylish fluid signature display font
        fontSpec = `'Britney', cursive, sans-serif`;
      } else if (selectedFont === "Cinzel") {
        // High-fashion luxury decorative serif
        fontSpec = `'Cinzel Decorative', serif`;
      } else {
        // High-tech avant-garde geometric font
        fontSpec = `'Syne', sans-serif`;
      }

      try {
        if ("letterSpacing" in offCtx) {
          offCtx.letterSpacing = selectedFont === "Britney" ? "0.08em" : "0.18em";
        }
      } catch (e) {}

      if (isMobile) {
        // Responsive stacked 2-tier on mobile
        const fontSize = Math.min(width * 0.17, 78);
        const strokeWidth = Math.max(2, Math.round(fontSize * 0.038));
        offCtx.font = `900 ${fontSize}px ${fontSpec}`;
        offCtx.textAlign = "center";
        offCtx.textBaseline = "middle";
        offCtx.strokeStyle = "#ffffff";
        offCtx.lineWidth = strokeWidth;

        const centerY = height * 0.48;
        const lineOffset = fontSize * 0.62;

        offCtx.strokeText(selectedFont === "Britney" ? "Abdur" : "ABDUR", width / 2, centerY - lineOffset);
        offCtx.strokeText(selectedFont === "Britney" ? "Rahman" : "RAHMAN", width / 2, centerY + lineOffset);
      } else if (isTablet) {
        // Tablet stacked layout
        const fontSize = Math.min(width * 0.15, 120);
        const strokeWidth = Math.max(3, Math.round(fontSize * 0.034));
        offCtx.font = `900 ${fontSize}px ${fontSpec}`;
        offCtx.textAlign = "center";
        offCtx.textBaseline = "middle";
        offCtx.strokeStyle = "#ffffff";
        offCtx.lineWidth = strokeWidth;

        const centerY = height * 0.48;
        const lineOffset = fontSize * 0.64;

        offCtx.strokeText(selectedFont === "Britney" ? "Abdur" : "ABDUR", width / 2, centerY - lineOffset);
        offCtx.strokeText(selectedFont === "Britney" ? "Rahman" : "RAHMAN", width / 2, centerY + lineOffset);
      } else {
        // Desktop: Large, imposing, stylish lettering
        const fontSize = Math.min(width * 0.13, 160);
        const strokeWidth = Math.max(3.5, Math.round(fontSize * 0.032));
        offCtx.font = `900 ${fontSize}px ${fontSpec}`;
        offCtx.textAlign = "center";
        offCtx.textBaseline = "middle";
        offCtx.strokeStyle = "#ffffff";
        offCtx.lineWidth = strokeWidth;

        const centerY = height * 0.47;
        const lineOffset = fontSize * 0.64;

        offCtx.strokeText(selectedFont === "Britney" ? "Abdur" : "ABDUR", width / 2, centerY - lineOffset);
        offCtx.strokeText(selectedFont === "Britney" ? "Rahman" : "RAHMAN", width / 2, centerY + lineOffset);
      }

      gl.bindTexture(gl.TEXTURE_2D, textTexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, offscreen);
    };

    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.floor(rect.width * dpr);
      height = Math.floor(rect.height * dpr);

      if (width === 0 || height === 0) return;

      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
      updateTextTexture();
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e) => {
      hasUserMovedMouse = true;
      const rect = canvas.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        targetMouseX = (e.clientX - rect.left) / rect.width;
        targetMouseY = (e.clientY - rect.top) / rect.height;
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        hasUserMovedMouse = true;
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          targetMouseX = (touch.clientX - rect.left) / rect.width;
          targetMouseY = (touch.clientY - rect.top) / rect.height;
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    let animId;
    const startTime = performance.now();

    const render = (now) => {
      animId = requestAnimationFrame(render);

      const elapsed = (now - startTime) * 0.001;

      // Idle cinematic drift if mouse is still
      if (!hasUserMovedMouse) {
        targetMouseX = 0.5 + Math.sin(elapsed * 0.9) * 0.28;
        targetMouseY = 0.46 + Math.cos(elapsed * 1.3) * 0.2;
      }

      smoothMouseX += (targetMouseX - smoothMouseX) * 0.09;
      smoothMouseY += (targetMouseY - smoothMouseY) * 0.09;

      gl.useProgram(program);
      gl.uniform2f(uMouseLoc, smoothMouseX, smoothMouseY);
      gl.uniform2f(uResolutionLoc, width, height);
      gl.uniform1f(uTimeLoc, elapsed);
      // High dramatic opacity on this dedicated intro page
      gl.uniform1f(uIntensityLoc, 0.88);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      if (gl) {
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        gl.deleteBuffer(quadBuffer);
        gl.deleteTexture(textTexture);
      }
    };
  }, [selectedFont, fontsLoaded, isVisible]);

  // Handle entry transition
  const handleProceed = useCallback(() => {
    if (isEntering) return;
    setIsEntering(true);
    setTimeout(() => {
      if (onEnter) onEnter();
    }, 600);
  }, [isEntering, onEnter]);

  // Keyboard and wheel listeners
  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (e) => {
      if (e.code === "Space" || e.code === "Enter" || e.key === "ArrowDown") {
        e.preventDefault();
        handleProceed();
      }
    };

    const handleWheel = (e) => {
      if (e.deltaY > 35) {
        handleProceed();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [isVisible, handleProceed]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="cinematic-intro-stage"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{
          opacity: 0,
          scale: 1.04,
          filter: "blur(12px)",
          transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
        }}
        className="fixed inset-0 z-40 bg-[#020205] text-slate-100 flex flex-col justify-between overflow-hidden select-none"
      >
        {/* 1. Fullscreen WebGL Volumetric Cursor Lighting Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block z-10 pointer-events-none"
        />

        {/* 2. Ambient Deep Space Dust & Horizon Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020205]/40 via-transparent to-[#020205]/80 pointer-events-none z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-cyan-500/10 blur-[160px] pointer-events-none z-0" />

        {/* 3. Header Bar */}
        <header className="relative z-20 w-full px-5 sm:px-8 py-5 flex items-center justify-between text-xs font-mono tracking-widest text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00f2fe]" />
            <span className="text-cyan-300 font-bold uppercase">CINEMATIC INTRO STAGE</span>
          </div>

          {/* Stylish Font Selector Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-slate-900/80 border border-slate-700/60 backdrop-blur-md">
            <span className="text-[10px] text-slate-400 px-2 font-mono uppercase hidden sm:inline">FONT:</span>
            {[
              { id: "Britney", label: "Britney Signature" },
              { id: "Cinzel", label: "Cinzel Serif" },
              { id: "Syne", label: "Syne Modern" }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFont(f.id)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-sans transition-all cursor-pointer ${
                  selectedFont === f.id
                    ? "bg-cyan-500/30 text-cyan-200 border border-cyan-400/50 shadow-[0_0_10px_rgba(0,242,254,0.3)] font-semibold"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleProceed}
            className="hover:text-cyan-300 transition-colors uppercase cursor-pointer hidden md:flex items-center gap-1 text-[11px]"
          >
            <span>SKIP INTRO</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </header>

        {/* 4. Center Ambient Tagline */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 pointer-events-none mt-auto mb-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/60 border border-cyan-500/20 backdrop-blur-sm mb-4"
          >
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span className="text-[11px] font-mono tracking-[0.25em] text-cyan-300 uppercase">
              LIGHT SCATTERING ENGINE
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xs sm:text-sm font-ui tracking-[0.3em] uppercase text-slate-400/90"
          >
            CREATIVE TECHNOLOGIST • DEVELOPER • DESIGNER
          </motion.p>
        </div>

        {/* 5. Bottom Action Controls & Enter Button */}
        <footer className="relative z-20 w-full px-6 py-8 flex flex-col items-center justify-center text-center space-y-4">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleProceed}
            className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-cyan-500/20 via-sky-500/30 to-purple-500/20 border border-cyan-400/50 hover:border-cyan-300 text-white font-ui font-bold text-xs sm:text-sm tracking-[0.2em] uppercase backdrop-blur-xl shadow-[0_0_25px_rgba(0,242,254,0.25)] hover:shadow-[0_0_40px_rgba(0,242,254,0.5)] transition-all cursor-pointer"
          >
            <span>ENTER PORTFOLIO</span>
            <ArrowRight className="w-4 h-4 text-cyan-300 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-10 transition-opacity" />
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex items-center gap-2 text-[11px] font-mono text-slate-500 tracking-wider"
          >
            <Move className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span>MOVE CURSOR TO CAST LIGHT • PRESS [SPACE] OR SCROLL TO ENTER</span>
          </motion.div>
        </footer>
      </motion.div>
    </AnimatePresence>
  );
}
