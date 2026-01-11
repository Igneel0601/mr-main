// "use client";

// import React, { useEffect, useRef, useState } from 'react';

// export default function OurServicesSvg() {
//   // This component intentionally does not use NavContext — it stays fixed at top without moving down
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const [started, setStarted] = useState(false);

//   // animationSpeed: 1 = normal speed. Increase to speed up (e.g. 2 = 2x).
//   // Guard against zero to avoid division-by-zero.
//   const animationSpeed = 2; // change to 2 for 2x, etc.
//   const speed = Math.max(animationSpeed, 0.000001);

//   useEffect(() => {
//     function check() {
//       const el = containerRef.current;
//       if (!el) return;
//       const top = el.getBoundingClientRect().top;
//       // trigger when the element reaches 50% down the viewport
//       const viewportMid = (window.innerHeight || document.documentElement.clientHeight) * 1.0;
//       if (top <= viewportMid) setStarted(true);
//     }

//     check();
//     window.addEventListener('scroll', check, { passive: true });
//     window.addEventListener('resize', check);
//     return () => {
//       window.removeEventListener('scroll', check);
//       window.removeEventListener('resize', check);
//     };
//   }, []);

//   return (

//       <div className="h-screen w-screen">
//       <div ref={containerRef} className="w-[90vw] h-auto mx-auto flex-col sticky top-[40vh]">
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="50 430 1830 180" width="100%" height="100%" className=''>
//           <defs>
//             <style>{`
//           .draw-path {
//             fill: none;
//             stroke: #ffffff;
//             stroke-width: 15;
//             stroke-linecap: round;
//             stroke-linejoin: round;
//           }
//           @keyframes draw { to { stroke-dashoffset: 0; } }
//         `}</style>
//           </defs>

//           <path className="draw-path" d="M77.3142,579.511326v-107.811285h70.616092v108.299959" strokeDasharray="286.73" strokeDashoffset="286.73" style={{ animation: started ? `draw ${0.674 / speed}s linear ${0 / speed}s forwards` : undefined }} />

//           <path className="draw-path" d="M77.3142,564h70.616092" strokeDasharray="70.62" strokeDashoffset="70.62" style={{ animation: started ? `draw ${0.166 / speed}s linear ${0.674 / speed}s forwards` : undefined }} />

//           <path className="draw-path" d="M93,502.999999c12.634292,4.366094,30.329209,16.600586,37.377291,23.991994" strokeDasharray="44.71" strokeDashoffset="44.71" style={{ animation: started ? `draw ${0.105 / speed}s linear ${0.84 / speed}s forwards` : undefined }} />

//           <path className="draw-path" d="M221.999999,466.159873v92.657555h89v-92.657555v113.840125" strokeDasharray="388.16" strokeDashoffset="388.16" style={{ animation: started ? `draw ${0.912 / speed}s linear ${0.945 / speed}s forwards` : undefined }} />

//           <path className="draw-path" d="M365,590.95074c32.002772-25.936885,29-95.30731,29-133.475945h94v65.823754" strokeDasharray="300.41" strokeDashoffset="300.41" style={{ animation: started ? `draw ${0.706 / speed}s linear ${1.857 / speed}s forwards` : undefined }} />

//           <path className="draw-path" d="M488,503h-94" strokeDasharray="94" strokeDashoffset="94" style={{ animation: started ? `draw ${0.221 / speed}s linear ${2.563 / speed}s forwards` : undefined }} />

//           <path className="draw-path" d="M440.999999,502.679046c7.535469,45.474664,47.889688,75.425124,65,83.243492" strokeDasharray="109.33" strokeDashoffset="109.33" style={{ animation: started ? `draw ${0.257 / speed}s linear ${2.784 / speed}s forwards` : undefined }} />

//           <path className="draw-path" d="M624,459.760343h149" strokeDasharray="149" strokeDashoffset="149" style={{ animation: started ? `draw ${0.35 / speed}s linear ${3.041 / speed}s forwards` : undefined }} />

//           <path className="draw-path" d="M675.352463,463.874328c-.396252,15.179445-13.44829,49.346338-23.31258,68.56641" strokeDasharray="72.79" strokeDashoffset="72.79" style={{ animation: started ? `draw ${0.171 / speed}s linear ${3.391 / speed}s forwards` : undefined }} />

//           <path className="draw-path" d="M661.639181,509.128158L746,509.585267c-7.689186,63.729431-15.475593,88.565681-47.5,70.414732" strokeDasharray="190.33" strokeDashoffset="190.33" style={{ animation: started ? `draw ${0.447 / speed}s linear ${3.562 / speed}s forwards` : undefined }} />

//           <path className="draw-path" d="M809.999999,475.302063c25.309206.93957,75.780239-12.478929,101-24-683908" strokeDasharray="104.64" strokeDashoffset="104.64" style={{ animation: started ? `draw ${0.246 / speed}s linear ${4.009 / speed}s forwards` : undefined }} />

//           <path className="draw-path" d="M860.499999,463.874329v106.04938c1.381329,18.842429,44.98263,21.137264,62.605758,10.513516c6.488572-4.396399,10.992749-8.509164,10.894242-16.437225" strokeDasharray="197.62" strokeDashoffset="197.62" style={{ animation: started ? `draw ${0.465 / speed}s linear ${4.255 / speed}s forwards` : undefined }} />

//           <path className="draw-path" d="M794,527.641089l147-16.684493" strokeDasharray="147.95" strokeDashoffset="147.95" style={{ animation: started ? `draw ${0.348 / speed}s linear ${4.72 / speed}s forwards` : undefined }} />

//           <path className="draw-path" d="M961,586.735962c27.594174-33.879432,36.825454-46.96238,34.614591-129.261169h92.507661L1089,523.079938" strokeDasharray="296.37" strokeDashoffset="296.37" style={{ animation: started ? `draw ${0.696 / speed}s linear ${5.068 / speed}s forwards` : undefined }} />

//           <path className="draw-path" d="M1088.122251,506.842611l-90.507661.45711" strokeDasharray="90.51" strokeDashoffset="90.51" style={{ animation: started ? `draw ${0.213 / speed}s linear ${5.764 / speed}s forwards` : undefined }} />

//           <path className="draw-path" d="M1042.868422,508.213941c9.57415,27.930741,40.609801,68.272288,64.131578,78.622816" strokeDasharray="103.44" strokeDashoffset="103.44" style={{ animation: started ? `draw ${0.243 / speed}s linear ${5.977 / speed}s forwards` : undefined }} />

//           <path className="draw-path" d="M1143.432489,470.730969l42.968283,99.19274l41.139846-101.478287" strokeDasharray="217.6" strokeDashoffset="217.6" style={{ animation: started ? `draw ${0.511 / speed}s linear ${6.22 / speed}s forwards` : undefined }} />

//           <path className="draw-path" d="M1294.047109,452.446593l-.914219,134.390163" strokeDasharray="134.4" strokeDashoffset="134.4" style={{ animation: started ? `draw ${0.316 / speed}s linear ${6.731 / speed}s forwards` : undefined }} />

//           <path className="draw-path" d="M1367.867349,594.521835q0-.457109-.914219-135.304382l112.046868-.45711" strokeDasharray="255.08" strokeDashoffset="255.08" style={{ animation: started ? `draw ${0.599 / speed}s linear ${7.047 / speed}s forwards` : undefined }} />

//           <path className="draw-path" d="M1370.152896,577.151678h119.762663" strokeDasharray="119.77" strokeDashoffset="119.77" style={{ animation: started ? `draw ${0.281 / speed}s linear ${7.646 / speed}s forwards` : undefined }} />

//           <path className="draw-path" d="M1535,474.568739c25.380111,2.165106,80.700859-13.860975,102-28.343384" strokeDasharray="107.07" strokeDashoffset="107.07" style={{ animation: started ? `draw ${0.252 / speed}s linear ${7.927 / speed}s forwards` : undefined }} />

//           <path className="draw-path" d="M1584.994314,464.702765c1.386282,53.509772-4.508416,103.763834,3.199766,112.906022c12.291818,11.618146,50.291818,5.479166,58.291818.173989c6.601884-3.587819,16.135422-14.635906,12.514101-23.782778" strokeDasharray="203.12" strokeDashoffset="203.12" style={{ animation: started ? `draw ${0.477 / speed}s linear ${8.179 / speed}s forwards` : undefined }} />

//           <path className="draw-path" d="M1525.112983,525.955425l140.887016-17.827267" strokeDasharray="142.02" strokeDashoffset="142.02" style={{ animation: started ? `draw ${0.334 / speed}s linear ${8.656 / speed}s forwards` : undefined }} />

//           <path className="draw-path" d="M1689.999999,458.985698h148" strokeDasharray="148" strokeDashoffset="148" style={{ animation: started ? `draw ${0.348 / speed}s linear ${8.99 / speed}s forwards` : undefined }} />

//           <path className="draw-path" d="M1741.325729,461.04589c.616079,15.735872-11.483064,50.745389-25.32573,70.394848" strokeDasharray="75.67" strokeDashoffset="75.67" style={{ animation: started ? `draw ${0.178 / speed}s linear ${9.338 / speed}s forwards` : undefined }} />

//           <path className="draw-path" d="M1728.670838,507.213941h85.329162c1.357788,18.51293-3.014282,54.871841-19,71.786059-14,10.950741-33.8899,7.483272-41-1.848322" strokeDasharray="206.26" strokeDashoffset="206.26" style={{ animation: started ? `draw ${0.485 / speed}s linear ${9.516 / speed}s forwards` : undefined }} />
//         </svg>
//       </div>
//       </div>
//   );
// }
"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useTransform, circOut } from "framer-motion";

const FADE_RELEASE = 0; // fade to 0 smoothly

export default function OurServicesSvg() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Main scroll progress (moves up/down)
  const progressMV = useMotionValue(0);

  // Forward-only progress (drawing never reverses)
  const drawProgress = useMotionValue(0);

  // Stroke lengths
  const lengths = [
    286.73, 70.62, 44.71, 388.16, 300.41, 94, 109.33, 149, 72.79, 190.33,
    104.64, 197.62, 147.95, 296.37, 90.51, 103.44, 217.6, 134.4, 255.08,
    119.77, 107.07, 203.12, 142.02, 148, 75.67, 206.26,
  ];

  const total = lengths.reduce((a, b) => a + b, 0);
  const cumulative = lengths.map((_, i) =>
    lengths.slice(0, i).reduce((a, b) => a + b, 0)
  );

  // Scroll speed — slow draw
  const scrollSpeed = 0.5;
  const drawScreens = Math.min(Math.max(1 / scrollSpeed, 0.25), 6);

  const [containerHeightPx, setContainerHeightPx] = useState(0);

  // Set height = sticky + draw + fade space
  useEffect(() => {
    const vh = window.innerHeight;
    const fadeScreens = 0.45; // fade window
    setContainerHeightPx(vh * (1 + drawScreens + fadeScreens));
  }, [drawScreens]);

  // Sequential stroke animation — now driven by forward-only drawProgress
  const dashTransforms = lengths.map((len, i) =>
    useTransform(drawProgress, (v) => {
      const start = cumulative[i] / total;
      const end = (cumulative[i] + len) / total;

      if (v <= start) return len;
      if (v >= end) return 0;

      const local = (v - start) / (end - start);
      return len * (1 - local);
    })
  );

  // Scroll handler
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const viewportMid = window.innerHeight / 2;
    const scrolled = viewportMid - rect.top;

    const drawingZoneHeight = window.innerHeight * drawScreens;
    const fadeZoneHeight = window.innerHeight * 0.45;

    const rawProgress = scrolled / (drawingZoneHeight + fadeZoneHeight);
    const p = Math.min(1.45, Math.max(0, rawProgress));

    // normal progress (can go back)
    progressMV.set(p);

    // forward-only drawing
    drawProgress.set(Math.max(drawProgress.get(), p));
  }, [drawScreens, progressMV, drawProgress]);

  // Attach to Lenis (global)
  useEffect(() => {
    let rafId: number;

    function tryAttach() {
      const lenis = (window as any).lenis;
      if (!lenis) {
        rafId = requestAnimationFrame(tryAttach);
        return;
      }

      const update = () => handleScroll();
      lenis.on("scroll", update);

      handleScroll();

      return () => lenis.off("scroll", update);
    }

    rafId = requestAnimationFrame(tryAttach);
    return () => cancelAnimationFrame(rafId);
  }, [handleScroll]);

  // OUTRO ANIMATION — matches AnimatedWords behaviour
  const outroScale = useTransform(
    progressMV,
    [1.00, 1.35],
    [1.00, 1.95],
    { ease: circOut }
  );

  const outroOpacity = useTransform(
    progressMV,
    [1.05, 1.45],
    [1.00, FADE_RELEASE],
    { ease: circOut }
  );

  // All SVG paths
  const paths: string[] = [
    "M77.3142,579.511326v-107.811285h70.616092v108.299959",
    "M77.3142,564h70.616092",
    "M93,502.999999c12.634292,4.366094,30.329209,16.600586,37.377291,23.991994",
    "M221.999999,466.159873v92.657555h89v-92.657555v113.840125",
    "M365,590.95074c32.002772-25.936885,29-95.30731,29-133.475945h94v65.823754",
    "M488,503h-94",
    "M440.999999,502.679046c7.535469,45.474664,47.889688,75.425124,65,83.243492",
    "M624,459.760343h149",
    "M675.352463,463.874328c-.396252,15.179445-13.44829,49.346338-23.31258,68.56641",
    "M661.639181,509.128158L746,509.585267c-7.689186,63.729431-15.475593,88.565681-47.5,70.414732",
    "M809.999999,475.302063c25.309206.93957,75.780239-12.478929,101-24-683908",
    "M860.499999,463.874329v106.04938c1.381329,18.842429,44.98263,21.137264,62.605758,10.513516c6.488572-4.396399,10.992749-8.509164,10.894242-16.437225",
    "M794,527.641089l147-16.684493",
    "M961,586.735962c27.594174-33.879432,36.825454-46.96238,34.614591-129.261169h92.507661L1089,523.079938",
    "M1088.122251,506.842611l-90.507661.45711",
    "M1042.868422,508.213941c9.57415,27.930741,40.609801,68.272288,64.131578,78.622816",
    "M1143.432489,470.730969l42.968283,99.19274l41.139846-101.478287",
    "M1294.047109,452.446593l-.914219,134.390163",
    "M1367.867349,594.521835q0-.457109-.914219-135.304382l112.046868-.45711",
    "M1370.152896,577.151678h119.762663",
    "M1535,474.568739c25.380111,2.165106,80.700859-13.860975,102-28.343384",
    "M1584.994314,464.702765c1.386282,53.509772-4.508416,103.763834,3.199766,112.906022c12.291818,11.618146,50.291818,5.479166,58.291818.173989c6.601884-3.587819,16.135422-14.635906,12.514101-23.782778",
    "M1525.112983,525.955425l140.887016-17.827267",
    "M1689.999999,458.985698h148",
    "M1741.325729,461.04589c.616079,15.735872-11.483064,50.745389-25.32573,70.394848",
    "M1728.670838,507.213941h85.329162c1.357788,18.51293-3.014282,54.871841-19,71.786059-14,10.950741-33.8899,7.483272-41-1.848322",
  ];

  return (
    <div
      ref={containerRef}
      className="w-screen relative"
      style={{ height: containerHeightPx }}
    >
      <motion.div
        className="sticky top-1/2 -translate-y-1/2 flex items-center justify-center"
        style={{
          scale: outroScale,
          opacity: outroOpacity,
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="90%" viewBox="50 430 1830 180">
          {paths.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              fill="none"
              stroke="#fff"
              strokeWidth="15"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={lengths[i]}
              style={{
                strokeDashoffset: dashTransforms[i],
              }}
            />
          ))}
        </svg>
      </motion.div>
    </div>
  );
}
