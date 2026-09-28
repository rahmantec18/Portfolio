import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Reusable parallax effect for elements
 */
export function createParallax(element, distance = 100, trigger = null) {
  if (!element) return null;

  return gsap.to(element, {
    y: -distance,
    ease: "none",
    scrollTrigger: {
      trigger: trigger || element,
      start: "top bottom",
      end: "bottom top",
      scrub: 1
    }
  });
}

/**
 * Depth approach / camera push animation for 3D elements
 */
export function createDepthApproach(element, trigger, options = {}) {
  if (!element || !trigger) return null;

  const {
    startZ = -400,
    endZ = 0,
    startScale = 0.75,
    endScale = 1,
    startBlur = 10,
    endBlur = 0,
    scrub = 1
  } = options;

  return gsap.fromTo(
    element,
    {
      z: startZ,
      scale: startScale,
      filter: `blur(${startBlur}px)`,
      opacity: 0.3
    },
    {
      z: endZ,
      scale: endScale,
      filter: `blur(${endBlur}px)`,
      opacity: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger,
        start: "top 80%",
        end: "center center",
        scrub
      }
    }
  );
}

/**
 * Reusable text reveal on scroll
 */
export function createTextReveal(element, trigger = null) {
  if (!element) return null;

  return gsap.fromTo(
    element,
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: trigger || element,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    }
  );
}
