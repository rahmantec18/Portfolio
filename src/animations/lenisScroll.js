import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;
let tickerCallback = null;
let anchorClickListener = null;
let resizeObserver = null;
const scrollCallbacks = new Set();

/**
 * Initialize Lenis with cinematic physics and high-precision GSAP synchronization
 */
export function initSmoothScroll() {
  if (typeof window === "undefined") return null;

  // Clean up previous instance and listeners if any
  destroySmoothScroll();

  // Initialize Lenis with tuned cinematic physics curve
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.6,
    infinite: false,
    autoRaf: false
  });

  lenisInstance = lenis;
  window.lenis = lenis;

  // Synchronize GSAP ScrollTrigger on every Lenis scroll tick
  lenis.on("scroll", (e) => {
    ScrollTrigger.update();
    scrollCallbacks.forEach((cb) => {
      try {
        cb(e);
      } catch (err) {
        console.error("Lenis scroll callback error:", err);
      }
    });
  });

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
        offset: -75,
        duration: 1.25,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });

      // Update URL hash cleanly without viewport jump
      if (window.history && window.history.pushState) {
        window.history.pushState(null, "", href);
      }
    }
  };

  document.addEventListener("click", anchorClickListener);

  // Auto-resize observer: monitors DOM changes (images loading, accordions expanding)
  // to ensure smooth scroll bounds never get miscalculated
  if (typeof ResizeObserver !== "undefined" && document.body) {
    let resizeTimeout = null;
    resizeObserver = new ResizeObserver(() => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (lenisInstance) {
          lenisInstance.resize();
          ScrollTrigger.refresh();
        }
      }, 150);
    });
    resizeObserver.observe(document.body);
  }

  // Refresh ScrollTrigger calculations after initial DOM layout stabilizes
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 250);

  return lenis;
}

/**
 * Register a callback for smooth scroll events
 */
export function onSmoothScroll(callback) {
  if (typeof callback === "function") {
    scrollCallbacks.add(callback);
    return () => scrollCallbacks.delete(callback);
  }
  return () => {};
}

/**
 * Smoothly scroll to target element or offset
 */
export function smoothScrollTo(target, options = {}) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      offset: -75,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      ...options
    });
  } else {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }
}

/**
 * Clean up Lenis instance, GSAP ticker, and event listeners
 */
export function destroySmoothScroll() {
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
  if (tickerCallback) {
    gsap.ticker.remove(tickerCallback);
    tickerCallback = null;
  }
  if (anchorClickListener) {
    document.removeEventListener("click", anchorClickListener);
    anchorClickListener = null;
  }
  if (resizeObserver) {
    resizeObserver.disconnect();
    resizeObserver = null;
  }
  scrollCallbacks.clear();
}

export function getLenis() {
  return lenisInstance;
}
