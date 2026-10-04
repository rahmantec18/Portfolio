import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;
let tickerCallback = null;
let anchorClickListener = null;

export function initSmoothScroll() {
  if (typeof window === "undefined") return null;

  // Clean up previous instance and listeners if any
  if (lenisInstance) {
    lenisInstance.destroy();
  }
  if (tickerCallback) {
    gsap.ticker.remove(tickerCallback);
  }
  if (anchorClickListener) {
    document.removeEventListener("click", anchorClickListener);
  }

  // Initialize Lenis with cinematic physics curve
  const lenis = new Lenis({
    duration: 1.25,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.5,
    infinite: false,
    autoRaf: false
  });

  lenisInstance = lenis;
  window.lenis = lenis;

  // Keep GSAP ScrollTrigger synchronized on every scroll tick
  lenis.on("scroll", ScrollTrigger.update);

  // Drive Lenis via GSAP's high-precision 60/120 FPS ticker
  tickerCallback = (time) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(tickerCallback);
  gsap.ticker.lagSmoothing(0);

  // Global anchor click listener for buttery smooth scrolling everywhere
  anchorClickListener = (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    const href = anchor.getAttribute("href");
    if (!href || href === "#") return;

    const targetId = href.replace("#", "");
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      e.preventDefault();
      lenis.scrollTo(targetEl, {
        offset: -70,
        duration: 1.25,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });

      // Update URL hash without jumping
      if (window.history && window.history.pushState) {
        window.history.pushState(null, "", href);
      }
    }
  };

  document.addEventListener("click", anchorClickListener);

  // Refresh ScrollTrigger calculations after initial DOM layout stabilizes
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 250);

  return lenis;
}

export function getLenis() {
  return lenisInstance;
}
