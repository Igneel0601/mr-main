"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type LenisLike = {
  scrollTo: (
    target: string | number | HTMLElement,
    options?: {
      offset?: number;
      duration?: number;
      immediate?: boolean;
      easing?: (t: number) => number;
    }
  ) => void;
};

function getLenis(): LenisLike | null {
  try {
    const w = window as unknown as { lenis?: LenisLike };
    return w.lenis ?? null;
  } catch {
    return null;
  }
}

export default function HashScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    const scrollToCurrentHash = () => {
      const hash = window.location.hash;
      if (!hash) return;

      let id = hash.startsWith("#") ? hash.slice(1) : hash;
      if (!id) return;

      // Backward-compat: treat singular as plural
      if (id === "service") id = "services";

      // Retry a few frames to handle:
      // - navigation where hashchange doesn't fire (pushState)
      // - Lenis not ready yet
      // - target element rendering a moment later
      let tries = 0;
      const maxTries = 90; // ~1.5s at 60fps

      const scrollToEl = (el: HTMLElement) => {
        const lenis = getLenis();
        if (lenis) {
          lenis.scrollTo(el, {
            duration: 2.2,
            easing: (t) => 1 - Math.pow(1 - t, 3),
          });
          return;
        }

        el.scrollIntoView({ behavior: "smooth", block: "start" });
      };

      const attempt = () => {
        tries += 1;

        const el = document.getElementById(id);

        if (el) {
          scrollToEl(el);

          // If another component changes layout shortly after (e.g., SVG computes height),
          // re-scroll once so the anchor ends up in the right place.
          window.setTimeout(() => {
            const again = document.getElementById(id);
            if (again) scrollToEl(again);
          }, 350);

          return;
        }

        if (tries < maxTries) window.requestAnimationFrame(attempt);
      };

      window.requestAnimationFrame(attempt);
    };

    scrollToCurrentHash();
    window.addEventListener("hashchange", scrollToCurrentHash);
    return () => window.removeEventListener("hashchange", scrollToCurrentHash);
  }, [pathname]);

  return null;
}
