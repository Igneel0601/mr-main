"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useNavContext } from "../context/NavContext";
import { GLOBAL_ANIM_DELAY } from "../exports/animationConfig";

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

export default function Navbar() {
  const { navHidden, setNavHidden, setNavHeight, navHeight } = useNavContext();
  const navRef = useRef<HTMLElement | null>(null);
  const hasEntered = useRef(false);
  const router = useRouter();
  const pathname = usePathname();

  // hide/show based on scroll direction (no animation)
  useEffect(() => {
    let lastY = window.scrollY ?? 0;

    const onScroll = () => {
      const y = window.scrollY ?? 0;
      const delta = y - lastY;

      if (delta > 5 && y > 10) setNavHidden(true);
      else if (delta < -5) setNavHidden(false);

      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [setNavHidden]);

  // measure nav height and expose it through context so other components can offset accordingly
  useEffect(() => {
    const updateHeight = () => {
      const h = document.getElementById("navbar")?.offsetHeight || 80;
      setNavHeight(h);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [setNavHeight]);

  const scrollToSection = (id: string) => {
    // If we are not on the home page, navigate there with a hash.
    // HashScrollHandler will take care of the slow scroll after navigation.
    if (pathname !== "/") {
      router.push(`/#${id}`);
      return;
    }

    const el = document.getElementById(id);
    if (!el) return;

    const lenis = (window as unknown as { lenis?: LenisLike }).lenis;
    if (lenis?.scrollTo) {
      lenis.scrollTo(el, {
        duration: 2.2,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
      });

      try {
        window.history.replaceState(null, "", `#${id}`);
      } catch {
        // ignore
      }
      return;
    }

    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const hideY = -(navHeight || 80);

  return (
    <motion.nav
      id="navbar"
      ref={navRef}
      className="fixed top-0 inset-x-0 z-999 h-20 bg-white/0 backdrop-blur-md text-white"
      initial={{ y: -8, opacity: 0 }}
      animate={{
        y: navHidden ? hideY : 0,
        opacity: navHidden ? 0 : 1,
      }}
      transition={{
        y:
          navHidden || hasEntered.current
            ? {
                type: "spring",
                stiffness: 520,
                damping: 44,
                mass: 0.9,
              }
            : {
                type: "tween",
                delay: GLOBAL_ANIM_DELAY,
                duration: 0.85,
                ease: [0.22, 1, 0.36, 1],
              },
        opacity:
          navHidden || hasEntered.current
            ? { duration: 0.18 }
            : {
                delay: GLOBAL_ANIM_DELAY,
                duration: 0.85,
                ease: [0.22, 1, 0.36, 1],
              },
      }}
      onAnimationComplete={() => {
        if (!hasEntered.current) hasEntered.current = true;
      }}
      style={{ pointerEvents: navHidden ? "none" : "auto" }}
    >
      <div className="container h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-0 logo-link">
          <div className="flex items-center gap-0">
            <Image src="/logo_dark.svg" alt="Logo" width={64} height={64} />
          </div>
          <div className="flex flex-col leading-tight animate-slide-in-right overflow-hidden w-[120px]">
            <span className="text-sm font-normal whitespace-nowrap">MARKETING</span>
            <span className="text-sm font-normal whitespace-nowrap">RAVAN</span>
          </div>
        </Link>

        <div className="flex gap-18">
          <a
            href="#"
            className="relative hover:text-[#8d7aff] after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-[#8d7aff] after:transition-all after:duration-300 hover:after:w-full"
          >
            PROJECTS
          </a>
          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("services");
            }}
            className="relative hover:text-[#8d7aff] after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-[#8d7aff] after:transition-all after:duration-300 hover:after:w-full"
          >
            SERVICES
          </a>
          <a
            href="#"
            className="relative hover:text-[#8d7aff] after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-[#8d7aff] after:transition-all after:duration-300 hover:after:w-full"
          >
            ABOUT
          </a>
        </div>

        <div className="flex">
          <a href="/contact" className="rounded-full border border-[#8d7aff] py-3 px-8 no-scale">
            <span className="inline-block">GET IN TOUCH</span>
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
