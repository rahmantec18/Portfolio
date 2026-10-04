import React, { useEffect, useState } from "react";
import { initSmoothScroll } from "./animations/lenisScroll";
import MinimalPreloader from "./components/framer/MinimalPreloader";
import SmoothCursor from "./components/framer/SmoothCursor";
import InteractiveContentBG from "./components/framer/InteractiveContentBG";
import SmoothScrollProgress from "./components/framer/SmoothScrollProgress";
import SectionTransitionDivider from "./components/framer/SectionTransitionDivider";
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
import CinematicIntroPage from "./components/framer/CinematicIntroPage";

export default function App() {
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [isEnhanced, setIsEnhanced] = useState(true);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    // If user accesses via #intro, ensure intro is shown
    if (window.location.hash === "#intro") {
      setShowIntro(true);
    }
  }, []);

  useEffect(() => {
    // Initialize Lenis smooth scrolling once DOM is ready
    const lenis = initSmoothScroll();

    return () => {
      if (lenis) lenis.destroy();
    };
  }, []);

  useEffect(() => {
    // Recalculate dimensions once preloader completes
    if (isPreloaded && window.lenis) {
      setTimeout(() => {
        window.lenis.resize();
      }, 350);
    }
  }, [isPreloaded]);

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-[#020205] text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* 1. Preloader */}
      <MinimalPreloader onLoaded={() => setIsPreloaded(true)} />

      {/* 1.5 Dedicated Cinematic Intro Page (Before home landing page, after loader) */}
      <CinematicIntroPage
        isVisible={isPreloaded && showIntro}
        onEnter={() => setShowIntro(false)}
      />

      {/* 2. Custom Smooth Spring Cursor */}
      <SmoothCursor />

      {/* 3. Global Interactive Content-Aware Background */}
      <InteractiveContentBG />

      {/* 3.5 Laser Scroll Progress & Circular Scroll-to-Top Navigator */}
      <SmoothScrollProgress />

      {/* 4. Fixed Breathing Navbar (Slides in after entering portfolio) */}
      {!showIntro && (
        <BreathingNavbar
          onToggleAesthetics={(val) => setIsEnhanced(val)}
          isEnhanced={isEnhanced}
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenIntro={() => setShowIntro(true)}
        />
      )}

      {/* 5. Main Cinematic Journey Sequence */}
      <main className="relative z-10 w-full overflow-hidden">
        {/* HERO */}
        <Hero isEnhanced={isEnhanced} onOpenResume={() => setIsResumeOpen(true)} />

        <SectionTransitionDivider
          gradient="from-transparent via-cyan-500/10 to-transparent"
          lineGradient="from-transparent via-cyan-400/30 to-transparent"
          glowColor="rgba(0, 242, 254, 0.15)"
        />

        {/* ABOUT ME: Authentic portrait with distant -> approach -> focus journey */}
        <About onOpenResume={() => setIsResumeOpen(true)} />

        <SectionTransitionDivider
          gradient="from-transparent via-amber-500/10 to-transparent"
          lineGradient="from-transparent via-amber-400/30 to-transparent"
          glowColor="rgba(245, 158, 11, 0.15)"
        />

        {/* TECH / WEB DEVELOPMENT: 3D skill cards with tilt, elevate, glow */}
        <ErrorBoundary>
          <TechWorld />
        </ErrorBoundary>

        <SectionTransitionDivider
          gradient="from-transparent via-blue-500/10 to-transparent"
          lineGradient="from-transparent via-blue-400/30 to-transparent"
          glowColor="rgba(59, 130, 246, 0.15)"
        />

        {/* WEB PROJECTS: 3D interactive browser environments */}
        <Projects />

        <SectionTransitionDivider
          gradient="from-transparent via-purple-500/10 to-transparent"
          lineGradient="from-transparent via-purple-400/30 to-transparent"
          glowColor="rgba(168, 85, 247, 0.15)"
        />

        {/* CODE -> CAMERA PHYSICAL TRANSFORMATION */}
        <CodeCameraTransition />

        <SectionTransitionDivider
          gradient="from-transparent via-amber-500/10 to-transparent"
          lineGradient="from-transparent via-amber-400/30 to-transparent"
          glowColor="rgba(251, 191, 36, 0.15)"
        />

        {/* PHOTOGRAPHY: 10 authentic moments, pinned 3D sequence & DNA Helix */}
        <Photography />

        <SectionTransitionDivider
          gradient="from-transparent via-rose-500/10 to-transparent"
          lineGradient="from-transparent via-rose-400/30 to-transparent"
          glowColor="rgba(244, 63, 94, 0.15)"
        />

        {/* VIDEO EDITING: Scroll-driven playhead timeline & Team O7 */}
        <ErrorBoundary>
          <VideoEditing />
        </ErrorBoundary>

        <SectionTransitionDivider
          gradient="from-transparent via-fuchsia-500/10 to-transparent"
          lineGradient="from-transparent via-fuchsia-400/30 to-transparent"
          glowColor="rgba(217, 70, 239, 0.15)"
        />

        {/* GRAPHIC DESIGN: Layer assembly & Creative suite */}
        <GraphicDesign />

        <SectionTransitionDivider
          gradient="from-transparent via-pink-500/10 to-transparent"
          lineGradient="from-transparent via-pink-400/30 to-transparent"
          glowColor="rgba(236, 72, 153, 0.15)"
        />

        {/* EXPERIENCE: 2025, 2026, Rotaract Club timeline */}
        <Experience />

        <SectionTransitionDivider
          gradient="from-transparent via-blue-500/10 to-transparent"
          lineGradient="from-transparent via-cyan-400/30 to-transparent"
          glowColor="rgba(37, 99, 235, 0.15)"
        />

        {/* SERVICES: Modern Web, Photography, Design, Video, Modelling */}
        <Services />

        <SectionTransitionDivider
          gradient="from-transparent via-violet-500/10 to-transparent"
          lineGradient="from-transparent via-violet-400/30 to-transparent"
          glowColor="rgba(139, 92, 246, 0.15)"
        />

        {/* BEYOND WORK: Personal passions */}
        <BeyondWork />

        <SectionTransitionDivider
          gradient="from-transparent via-emerald-500/10 to-transparent"
          lineGradient="from-transparent via-emerald-400/30 to-transparent"
          glowColor="rgba(16, 185, 129, 0.15)"
        />

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
