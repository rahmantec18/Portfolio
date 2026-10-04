import React, { useEffect, useRef, useState } from "react";

/**
 * VolumetricCursorLighting
 * 
 * High-performance WebGL 2D Volumetric Light Scattering (God Rays) shader.
 * Casts dynamic, interactive volumetric light shafts and occlusion shadows
 * from the stroked architectural typography "ABDUR RAHMAN" originating from
 * the user's cursor position.
 * 
 * Features:
 * - Buttery lerp tracking of cursor position
 * - Volumetric light scattering with 64 dithered samples (eliminates banding)
 * - Atmospheric film grain & dust motes in light shafts
 * - Point-light radial halo around cursor
 * - Responsive typographic outline (single-line on wide desktop, stacked on mobile)
 * - IntersectionObserver to sleep when out of viewport (0% CPU/GPU overhead)
 * - Reduced default opacity for harmonious blending with portfolio hero text
 */
export default function VolumetricCursorLighting({
  className = "",
  opacity = 0.42,
  isEnhanced = true
}) {
  const canvasRef = useRef(null);
  const [fontLoaded, setFontLoaded] = useState(false);

  // Ensure fonts are ready before initial texture generation
  useEffect(() => {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => setFontLoaded(true)).catch(() => setFontLoaded(true));
    } else {
      setFontLoaded(true);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Get WebGL context
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

    if (!gl) {
      console.warn("WebGL not supported for VolumetricCursorLighting.");
      return;
    }

    // Vertex Shader: Fullscreen quad
    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = (a_position + 1.0) * 0.5;
        // Invert Y for texture mapping
        v_uv.y = 1.0 - v_uv.y;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment Shader: Kenny Mitchell Volumetric Light Scattering + Dithering + Filmic Grain
    const fsSource = `
      precision highp float;
      varying vec2 v_uv;

      uniform sampler2D u_textTexture;
      uniform vec2 u_mouse;       // In 0.0 -> 1.0 UV space
      uniform vec2 u_resolution;  // Screen dimensions
      uniform float u_time;
      uniform float u_opacity;

      // Hash for spatial dithering to eliminate ray stepping bands
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      void main() {
        vec2 uv = v_uv;
        vec2 lightPos = u_mouse;

        // Aspect ratio correction for radial distance
        float aspect = u_resolution.x / max(u_resolution.y, 1.0);
        vec2 aspectVec = vec2(aspect, 1.0);

        // Vector from current pixel uv to light position
        vec2 delta = uv - lightPos;

        // 64 samples for smooth, dense god rays
        const int SAMPLES = 64;
        float density = 0.88;
        float decay = 0.962;
        float weight = 0.046;

        vec2 stepVec = delta * (1.0 / float(SAMPLES)) * density;

        // Spatial and temporal dither jitter to break ray banding
        float dither = hash(uv * 180.0 + fract(u_time * 0.04));
        vec2 curUv = uv - stepVec * dither;

        float rayAccum = 0.0;
        float currentDecay = 1.0;

        for (int i = 0; i < SAMPLES; i++) {
          curUv -= stepVec;
          if (curUv.x >= 0.0 && curUv.x <= 1.0 && curUv.y >= 0.0 && curUv.y <= 1.0) {
            float textVal = texture2D(u_textTexture, curUv).a;
            rayAccum += textVal * currentDecay * weight;
          }
          currentDecay *= decay;
        }

        // Direct stroke outline value at this pixel
        float directStroke = texture2D(u_textTexture, uv).a;

        // Cursor point-light radial halo / spotlight
        vec2 mouseDeltaAspect = (uv - lightPos) * aspectVec;
        float distToMouse = length(mouseDeltaAspect);
        float halo = 0.16 / (1.0 + distToMouse * 3.8 + distToMouse * distToMouse * 22.0);

        // Atmospheric micro-grain inside volumetric shafts
        float grain = (hash(gl_FragCoord.xy + fract(u_time * 0.08)) - 0.5) * 0.055;
        float totalLight = (rayAccum * 1.55 + directStroke * 1.25 + halo * 0.45) * u_opacity;
        totalLight = clamp(totalLight + grain * rayAccum, 0.0, 1.0);

        // Palette color mixing:
        // Deep rays: Electric Sky Cyan vec3(0.0, 0.92, 1.0)
        // Core strokes & cursor halo: Brilliant Pure White vec3(0.96, 0.99, 1.0)
        vec3 rayColor = vec3(0.0, 0.88, 1.0);
        vec3 coreColor = vec3(0.96, 0.99, 1.0);
        vec3 finalColor = mix(rayColor, coreColor, clamp(directStroke * 0.85 + halo * 0.5, 0.0, 1.0));

        // Output with premultiplied alpha for smooth CSS blending
        gl_FragColor = vec4(finalColor * totalLight, totalLight);
      }
    `;

    // Compile helper
    const compileShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
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

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Fullscreen quad buffer
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

    // Uniform locations
    const uTextTextureLoc = gl.getUniformLocation(program, "u_textTexture");
    const uMouseLoc = gl.getUniformLocation(program, "u_mouse");
    const uResolutionLoc = gl.getUniformLocation(program, "u_resolution");
    const uTimeLoc = gl.getUniformLocation(program, "u_time");
    const uOpacityLoc = gl.getUniformLocation(program, "u_opacity");

    // Offscreen 2D canvas for rendering the crisp outline text
    const offscreen = document.createElement("canvas");
    const offCtx = offscreen.getContext("2d", { willReadFrequently: false });

    // WebGL Texture
    const textTexture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.uniform1i(uTextTextureLoc, 0);

    // State
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Mouse coordinates (normalized 0 -> 1)
    let targetMouseX = 0.5;
    let targetMouseY = 0.45;
    let smoothMouseX = 0.5;
    let smoothMouseY = 0.45;
    let hasUserMovedMouse = false;

    // Render text to offscreen canvas and upload to WebGL texture
    const updateTextTexture = () => {
      if (!offCtx || width === 0 || height === 0) return;

      offscreen.width = width;
      offscreen.height = height;

      offCtx.clearRect(0, 0, width, height);

      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;

      // High-impact architectural geometric typography
      const fontFamily = `'Syne', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, Roboto, sans-serif`;

      try {
        if ("letterSpacing" in offCtx) {
          offCtx.letterSpacing = "0.16em";
        }
      } catch (e) {}

      if (isMobile) {
        // Stacked 2 lines on small screens
        const fontSize = Math.min(width * 0.15, 68);
        const strokeWidth = Math.max(2, Math.round(fontSize * 0.038));
        offCtx.font = `900 ${fontSize}px ${fontFamily}`;
        offCtx.textAlign = "center";
        offCtx.textBaseline = "middle";
        offCtx.strokeStyle = "#ffffff";
        offCtx.lineWidth = strokeWidth;

        const centerY = height * 0.45;
        const lineOffset = fontSize * 0.62;

        offCtx.strokeText("ABDUR", width / 2, centerY - lineOffset);
        offCtx.strokeText("RAHMAN", width / 2, centerY + lineOffset);
      } else if (isTablet) {
        // Stacked 2 lines on tablet for grand architectural presence
        const fontSize = Math.min(width * 0.13, 98);
        const strokeWidth = Math.max(2.5, Math.round(fontSize * 0.035));
        offCtx.font = `900 ${fontSize}px ${fontFamily}`;
        offCtx.textAlign = "center";
        offCtx.textBaseline = "middle";
        offCtx.strokeStyle = "#ffffff";
        offCtx.lineWidth = strokeWidth;

        const centerY = height * 0.45;
        const lineOffset = fontSize * 0.64;

        offCtx.strokeText("ABDUR", width / 2, centerY - lineOffset);
        offCtx.strokeText("RAHMAN", width / 2, centerY + lineOffset);
      } else {
        // Desktop: Majestic architectural presence with wide tracking
        const fontSize = Math.min(width * 0.11, 128);
        const strokeWidth = Math.max(3, Math.round(fontSize * 0.032));
        offCtx.font = `900 ${fontSize}px ${fontFamily}`;
        offCtx.textAlign = "center";
        offCtx.textBaseline = "middle";
        offCtx.strokeStyle = "#ffffff";
        offCtx.lineWidth = strokeWidth;

        const centerY = height * 0.44;
        const lineOffset = fontSize * 0.65;

        offCtx.strokeText("ABDUR", width / 2, centerY - lineOffset);
        offCtx.strokeText("RAHMAN", width / 2, centerY + lineOffset);
      }

      // Upload to WebGL texture
      gl.bindTexture(gl.TEXTURE_2D, textTexture);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        offscreen
      );
    };

    // Handle Resize
    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 1.5); // Cap at 1.5 for superb performance
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

    // Mouse Move listener
    const handleMouseMove = (e) => {
      hasUserMovedMouse = true;
      const rect = canvas.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        targetMouseX = (e.clientX - rect.left) / rect.width;
        targetMouseY = (e.clientY - rect.top) / rect.height;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Touch support for mobile
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

    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // Pause rendering when hero is not visible
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Animation Render Loop
    let animId;
    const startTime = performance.now();

    const render = (now) => {
      animId = requestAnimationFrame(render);

      if (!isVisible || !isEnhanced) return;

      const elapsed = (now - startTime) * 0.001;

      // If user hasn't moved mouse yet, gently drift in a smooth infinity curve
      if (!hasUserMovedMouse) {
        targetMouseX = 0.5 + Math.sin(elapsed * 0.8) * 0.22;
        targetMouseY = 0.45 + Math.cos(elapsed * 1.1) * 0.16;
      }

      // Buttery smooth physical spring / lerp
      smoothMouseX += (targetMouseX - smoothMouseX) * 0.085;
      smoothMouseY += (targetMouseY - smoothMouseY) * 0.085;

      gl.useProgram(program);

      // Pass uniforms
      gl.uniform2f(uMouseLoc, smoothMouseX, smoothMouseY);
      gl.uniform2f(uResolutionLoc, width, height);
      gl.uniform1f(uTimeLoc, elapsed);
      gl.uniform1f(uOpacityLoc, opacity);

      // Render fullscreen quad
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
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
  }, [fontLoaded, opacity, isEnhanced]);

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-[2] mix-blend-screen transition-opacity duration-700 ${
        isEnhanced ? "opacity-100" : "opacity-0"
      } ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block pointer-events-none"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
