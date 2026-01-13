"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
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
  const [hasEntered, setHasEntered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // hide/show based on scroll direction (no animation)
  useEffect(() => {
    let lastY = window.scrollY ?? 0;

    const onScroll = () => {
      if (mobileMenuOpen) return;

      const y = window.scrollY ?? 0;
      const delta = y - lastY;

      if (delta > 5 && y > 10) setNavHidden(true);
      else if (delta < -5) setNavHidden(false);

      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [setNavHidden, mobileMenuOpen]);

  // lock body scroll + close on ESC when mobile drawer is open
  useEffect(() => {
    if (!mobileMenuOpen) return;

    setNavHidden(false);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileMenuOpen, setNavHidden]);

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
  const closeMobileMenu = () => setMobileMenuOpen(false);
  const toggleMobileMenu = () => setMobileMenuOpen((v) => !v);
  const mobileMenuTop = navHeight || 80;

  const navLinkClassName =
    "relative hover:text-[#8d7aff] after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-[#8d7aff] after:transition-all after:duration-300 hover:after:w-full";

  return (
    <>
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
            navHidden || hasEntered
              ? { type: "spring", stiffness: 520, damping: 44, mass: 0.9 }
              : {
                  type: "tween",
                  delay: GLOBAL_ANIM_DELAY,
                  duration: 0.85,
                  ease: [0.22, 1, 0.36, 1],
                },
          opacity:
            navHidden || hasEntered
              ? { duration: 0.18 }
              : {
                  delay: GLOBAL_ANIM_DELAY,
                  duration: 0.85,
                  ease: [0.22, 1, 0.36, 1],
                },
        }}
        onAnimationComplete={() => {
          if (!hasEntered) setHasEntered(true);
        }}
        style={{ pointerEvents: navHidden ? "none" : "auto" }}
      >
        <div className="container h-full flex items-center justify-between px-4 md:px-0">
          <Link href="/" className="flex items-center gap-0 logo-link">
            <div className="flex items-center gap-0">
              <Image src="/logo_dark.svg" alt="Logo" width={64} height={64} />
            </div>
            <div className="hidden sm:flex flex-col leading-tight animate-slide-in-right overflow-hidden w-[120px]">
              <span className="text-sm whitespace-nowrap">MARKETING</span>
              <span className="text-sm whitespace-nowrap">RAVAN</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex gap-18">
            <a href="#" className={navLinkClassName}>
              PROJECTS
            </a>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("services");
              }}
              className={navLinkClassName}
            >
              SERVICES
            </a>
            <a href="#" className={navLinkClassName}>
              ABOUT
            </a>
          </div>

          <div className="hidden md:flex">
            <a href="/contact" className="rounded-full border border-[#8d7aff] py-3 px-8 no-scale">
              <span className="inline-block">GET IN TOUCH</span>
            </a>
          </div>

          {/* Mobile: logo left, MENU right */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className={`${navLinkClassName} no-scale`}
              aria-haspopup="dialog"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              onClick={toggleMobileMenu}
            >
              <AnimatePresence mode="wait" initial={false} custom={mobileMenuOpen ? 1 : -1}>
                <motion.span
                  key={mobileMenuOpen ? "close" : "menu"}
                  custom={mobileMenuOpen ? 1 : -1}
                  variants={{
                    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 12 : -12 }),
                    center: { opacity: 1, x: 0 },
                    // Exit slides the opposite way so it feels like a true toggle.
                    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -12 : 12 }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                >
                  {mobileMenuOpen ? "CLOSE" : "MENU"}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-998 md:hidden">
            {/* Full-screen area below navbar */}
            <div
              className="absolute inset-x-0 bottom-0"
              style={{ top: mobileMenuTop }}
              role="dialog"
              aria-modal="true"
              id="mobile-nav-drawer"
              onClick={closeMobileMenu}
            >
              {/* Backdrop: instant dark + blur */}
              <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" />

              {/* Animated menu content */}
              <motion.div
                className="relative h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] } }}
                exit={{ opacity: 0, transition: { duration: 0.34, ease: [0.4, 0, 0.6, 1] } }}
              >
                <div className="container h-full px-4 md:px-0" onClick={(e) => e.stopPropagation()}>
                  <nav className="py-10 text-2xl">
                  <a
                    href="#"
                    className="block py-4 border-b border-white/10 no-scale hover:text-[#8d7aff]"
                    onClick={(e) => {
                      e.preventDefault();
                      closeMobileMenu();
                    }}
                  >
                    PROJECTS
                  </a>

                  <a
                    href="#services"
                    className="block py-4 border-b border-white/10 no-scale hover:text-[#8d7aff]"
                    onClick={(e) => {
                      e.preventDefault();
                      closeMobileMenu();
                      scrollToSection("services");
                    }}
                  >
                    SERVICES
                  </a>

                  <a
                    href="#"
                    className="block py-4 border-b border-white/10 no-scale hover:text-[#8d7aff]"
                    onClick={(e) => {
                      e.preventDefault();
                      closeMobileMenu();
                    }}
                  >
                    ABOUT
                  </a>

                  <div className="pt-6 pb-2">
                    <button
                      type="button"
                      className="w-full rounded-full border border-[#8d7aff] py-3 px-6 no-scale"
                      onClick={() => {
                        closeMobileMenu();
                        router.push("/contact");
                      }}
                    >
                      CONTACT ME
                    </button>
                  </div>
                </nav>
              </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
