import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroScene3D({ className = "" }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect mobile / low-power
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 80 : 220;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020205, 0.002);

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 32;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: "high-performance"
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for mouse parallax
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // 1. Abstract Geometric Crystal (Icosahedron Wireframe + Inner Core)
    const geom = new THREE.IcosahedronGeometry(7, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      wireframe: true,
      transparent: true,
      opacity: 0.28
    });
    const icosahedron = new THREE.Mesh(geom, wireMat);
    worldGroup.add(icosahedron);

    // Inner Glowing Core
    const innerGeom = new THREE.OctahedronGeometry(4, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const innerCore = new THREE.Mesh(innerGeom, innerMat);
    worldGroup.add(innerCore);

    // 2. Floating Particle Constellation
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    const scaleArray = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 80;
      posArray[i + 1] = (Math.random() - 0.5) * 60;
      posArray[i + 2] = (Math.random() - 0.5) * 60;
      scaleArray[i / 3] = Math.random() * 2 + 0.5;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.35,
      color: 0x00f2fe,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    worldGroup.add(particles);

    // Mouse movement state
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const onMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Handle Resize
    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", onResize);

    // IntersectionObserver to pause when not visible
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Slow geometric rotation
      icosahedron.rotation.x = elapsedTime * 0.15;
      icosahedron.rotation.y = elapsedTime * 0.2;
      innerCore.rotation.x = -elapsedTime * 0.25;
      innerCore.rotation.y = -elapsedTime * 0.3;

      particles.rotation.y = elapsedTime * 0.03;

      // Mouse Parallax with smooth interpolation
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      worldGroup.rotation.y = currentMouseX * 0.4;
      worldGroup.rotation.x = -currentMouseY * 0.3;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geom.dispose();
      wireMat.dispose();
      innerGeom.dispose();
      innerMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className={`absolute inset-0 pointer-events-none ${className}`} />;
}
