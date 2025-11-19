'use client';

import { useEffect } from 'react';

export default function CustomCursor() {
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.id = 'custom-cursor';
    document.body.appendChild(cursor);

    let currentHoveredElement: HTMLElement | null = null;

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      
      // Check if hovering over interactive element
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, input, textarea, select, [role="button"]') as HTMLElement;
      
      // Exclude logo link from cursor effects
      if (isInteractive && !isInteractive.classList.contains('logo-link')) {
        cursor.classList.add('hover');
        
        // Remove class from previous element
        if (currentHoveredElement && currentHoveredElement !== isInteractive) {
          currentHoveredElement.classList.remove('cursor-hovered');
        }
        
        // Add class to current element
        isInteractive.classList.add('cursor-hovered');
        currentHoveredElement = isInteractive;
      } else {
        cursor.classList.remove('hover');
        
        // Remove class when not hovering
        if (currentHoveredElement) {
          currentHoveredElement.classList.remove('cursor-hovered');
          currentHoveredElement = null;
        }
      }
    };

    const hideCursor = () => {
      cursor.style.opacity = '0';
      if (currentHoveredElement) {
        currentHoveredElement.classList.remove('cursor-hovered');
        currentHoveredElement = null;
      }
    };

    const showCursor = () => {
      cursor.style.opacity = '1';
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
