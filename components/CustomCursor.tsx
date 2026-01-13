'use client';

import { useEffect } from 'react';

export default function CustomCursor() {
  useEffect(() => {
    // Disable custom cursor entirely on touch / coarse pointer devices.
    // These devices don't have a meaningful hover cursor and this can interfere with UX.
    const prefersNativeCursor =
      typeof window !== "undefined" &&
      (window.matchMedia?.("(hover: none)").matches || window.matchMedia?.("(pointer: coarse)").matches);

    if (prefersNativeCursor) return;

    const cursor = document.createElement('div');
    cursor.id = 'custom-cursor';
    document.body.appendChild(cursor);

    let currentHoveredElements: HTMLElement[] = [];
    let isHoveringInteractive = false;

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      
      // Check if hovering over interactive element
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, input, textarea, select, [role="button"]') as HTMLElement;
      const ignoreCursor = target.closest('.no-cursor') as HTMLElement;
      const disableHoverEffects = !!target.closest('.no-hover') || !!isInteractive?.classList.contains('no-hover');

      const textField = target.closest(
        'textarea, [contenteditable=""], [contenteditable="true"], input:not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="color"]):not([type="button"]):not([type="submit"]):not([type="reset"])'
      ) as HTMLElement | null;
      const isTextField = !!textField;

      const popUnderPointer = target.closest('.cursor-pop') as HTMLElement | null;

      if (!ignoreCursor && isTextField) {
        isHoveringInteractive = false;
        cursor.style.opacity = '1';
        cursor.classList.remove('hover');
        cursor.classList.add('text');

        for (const el of currentHoveredElements) el.classList.remove('cursor-hovered')
        currentHoveredElements = []
        return;
      }

      cursor.classList.remove('text');

      if (disableHoverEffects) {
        isHoveringInteractive = false;
        cursor.style.opacity = '1';
        cursor.classList.remove('hover');
        for (const el of currentHoveredElements) el.classList.remove('cursor-hovered')
        currentHoveredElements = []
        return;
      }
      
      // Exclude logo link from cursor effects
      if (!ignoreCursor && isInteractive && !isInteractive.classList.contains('logo-link')) {
        const allowCursorOnInteractive = isInteractive.classList.contains('cursor-show')
        const shouldHideCursor = !allowCursorOnInteractive

        isHoveringInteractive = shouldHideCursor;
        cursor.style.opacity = shouldHideCursor ? '0' : '1';
        cursor.classList.toggle('hover', shouldHideCursor);

        const popTargets = Array.from(isInteractive.querySelectorAll<HTMLElement>('.cursor-pop'))

        // If the interactive has cursor-pop targets, only highlight when pointer is over text.
        let nextHoveredElements: HTMLElement[] = []
        if (popTargets.length > 0) {
          if (popUnderPointer && isInteractive.contains(popUnderPointer)) {
            // Highlight all text spans in the item (num + name) once the pointer is over text
            nextHoveredElements = popTargets
          }
        } else {
          nextHoveredElements = [isInteractive]
        }
        
        // Remove class from previous elements
        for (const el of currentHoveredElements) el.classList.remove('cursor-hovered')

        // Add class to current elements
        for (const el of nextHoveredElements) el.classList.add('cursor-hovered')
        currentHoveredElements = nextHoveredElements
      } else {
        isHoveringInteractive = false;
        cursor.style.opacity = '1';
        cursor.classList.remove('hover');
        
        // Remove class when not hovering
        for (const el of currentHoveredElements) el.classList.remove('cursor-hovered')
        currentHoveredElements = []
      }
    };

    const hideCursor = () => {
      cursor.style.opacity = '0';
      for (const el of currentHoveredElements) el.classList.remove('cursor-hovered')
      currentHoveredElements = []
    };

    const showCursor = () => {
      cursor.style.opacity = isHoveringInteractive ? '0' : '1';
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', hideCursor);
    document.addEventListener('mouseenter', showCursor);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', hideCursor);
      document.removeEventListener('mouseenter', showCursor);
      cursor.remove();
    };
  }, []);

  return null;
}
