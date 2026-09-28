import React, { useEffect, useState } from "react";
import { initSmoothScroll } from "./animations/lenisScroll";
import MinimalPreloader from "./components/framer/MinimalPreloader";
import SmoothCursor from "./components/framer/SmoothCursor";
import TimeBasedBG from "./components/framer/TimeBasedBG";
import BreathingNavbar from "./components/framer/BreathingNavbar";
import Hero from "./components/Hero";
import About from "./components/About";
import TechWorld from "./components/TechWorld";
import Projects from "./components/Projects";
import CodeCameraTransition from "./components/CodeCameraTransition";
import Photography from "./components/Photography";
import VideoEditing from "./components/VideoEditing";
import GraphicDesign from "./components/GraphicDesign";
import Experience from "./components/Experience";
import Services from "./components/Services";
import BeyondWork from "./components/BeyondWork";
import Contact from "./components/Contact";
import BreathingFooter from "./components/framer/BreathingFooter";
import ResumeModal from "./components/ResumeModal";
import ErrorBoundary from "./components/ErrorBoundary";

export default function App() {
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [isEnhanced, setIsEnhanced] = useState(true);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    // Initialize Lenis smooth scrolling once DOM is ready
    const lenis = initSmoothScroll();

    return () => {
      if (lenis) lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#020205] text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* 1. Preloader */}
      <MinimalPreloader onLoaded={() => setIsPreloaded(true)} />

      {/* 2. Custom Smooth Spring Cursor */}
      <SmoothCursor />

      {/* 3. Time of Day Ambient Glow System */}
      <TimeBasedBG />

      {/* 4. Fixed Breathing Navbar */}
      <BreathingNavbar
        onToggleAesthetics={(val) => setIsEnhanced(val)}
        isEnhanced={isEnhanced}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* 5. Main Cinematic Journey Sequence */}
      <main className="relative z-10 w-full overflow-hidden">
        {/* HERO */}
        <Hero isEnhanced={isEnhanced} onOpenResume={() => setIsResumeOpen(true)} />

        {/* ABOUT ME: Authentic portrait with distant -> approach -> focus journey */}
        <About onOpenResume={() => setIsResumeOpen(true)} />

        {/* TECH / WEB DEVELOPMENT: 3D skill cards with tilt, elevate, glow */}
        <ErrorBoundary>
          <TechWorld />
        </ErrorBoundary>

        {/* WEB PROJECTS: 3D interactive browser environments */}
        <Projects />

        {/* CODE -> CAMERA PHYSICAL TRANSFORMATION */}
        <CodeCameraTransition />

        {/* PHOTOGRAPHY: 10 authentic moments, pinned 3D sequence & DNA Helix */}
        <Photography />

        {/* VIDEO EDITING: Scroll-driven playhead timeline & Team O7 */}
        <ErrorBoundary>
          <VideoEditing />
        </ErrorBoundary>

        {/* GRAPHIC DESIGN: Layer assembly & Creative suite */}
        <GraphicDesign />

        {/* EXPERIENCE: 2025, 2026, Rotaract Club timeline */}
        <Experience />

        {/* SERVICES: Modern Web, Photography, Design, Video, Modelling */}
        <Services />

        {/* BEYOND WORK: Personal passions */}
        <BeyondWork />

        {/* CONTACT: Converging layout & All clickable channels */}
        <Contact />
      </main>

      {/* 6. Breathing Footer with Final Screen Message */}
      <BreathingFooter />

      {/* 7. High-Res Resume Lightbox Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </div>
  );
}
