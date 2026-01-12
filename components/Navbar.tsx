"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from 'react';
import { motion, useScroll, useAnimation } from 'framer-motion';
import { GLOBAL_ANIM_DELAY } from '../exports/animationConfig';
import { useNavContext } from '../context/NavContext';

export default function Navbar() {
  const { scrollY } = useScroll();
  const lastY = useRef(0);
  const { navHidden, setNavHidden, setNavHeight } = useNavContext();
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (y) => {
      const prev = lastY.current;
      const delta = y - prev;

      if (delta > 5 && y > 10) setNavHidden(true);
      else if (delta < -5) setNavHidden(false);

      lastY.current = y;
    });

    return () => unsubscribe();
  }, [scrollY, setNavHidden]);

  // measure nav height and expose it through context so other components can offset accordingly
  useEffect(() => {
    function updateHeight() {
      const h = document.getElementById("navbar")?.offsetHeight || 80;
      setNavHeight(h);
    }

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [setNavHeight]);

  const controls = useAnimation();

  useEffect(() => {
    // entrance using a tween (no spring) — apply global entrance delay
    controls.start({ y: 0, opacity: 1, transition: { type: 'tween', delay: GLOBAL_ANIM_DELAY, duration: 0.48, ease: [0.22, 1, 0.36, 1] } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // hide/show also uses the same tween to avoid switching animation types
    const hideY = -(document.getElementById("navbar")?.offsetHeight || 80);
    controls.start({ y: navHidden ? hideY : 0, opacity: navHidden ? 0 : 1, transition: { type: 'tween', duration: 0.38, ease: [0.22, 1, 0.36, 1] } });
  }, [navHidden, controls]);

  return (
    <motion.nav
      id="navbar"
      ref={navRef}
      className="fixed top-0 inset-x-0 z-999 h-20 bg-white/0 backdrop-blur-md text-white"
      initial={{ y: -(navRef.current?.offsetHeight ?? 80), opacity: 0 }}
      animate={controls}
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
          <a href="#" className="relative hover:text-[#8d7aff] after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-[#8d7aff] after:transition-all after:duration-300 hover:after:w-full">PROJECTS</a>
          <a href="#" className="relative hover:text-[#8d7aff] after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-[#8d7aff] after:transition-all after:duration-300 hover:after:w-full">SERVICES</a>
          <a href="#" className="relative hover:text-[#8d7aff] after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-[#8d7aff] after:transition-all after:duration-300 hover:after:w-full">ABOUT</a>
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
