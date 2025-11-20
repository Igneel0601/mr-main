"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function ScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Respect prefers-reduced-motion
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media && media.matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // expose lenis globally so other components can read scroll/velocity for parallax
    // attach carefully to avoid TS errors
    try {
      (window as any).lenis = lenis;
    } catch (e) {
      // ignore (server or non-window)
    }

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);

      // update background parallax — slowest layer
      try {
        const scroll = (lenis as any).scroll ?? window.scrollY ?? 0;
        // small factor so background moves slowest (e.g. 0.12)
        const factor = 0.12;
        const bgY = Math.round(-scroll * factor);
        document.body.style.setProperty("--bg-y", `${bgY}px`);
      } catch (e) {
        // ignore
      }

      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      try {
        delete (window as any).lenis;
      } catch (e) {}
    };
  }, []);

  return <>{children}</>;
}
