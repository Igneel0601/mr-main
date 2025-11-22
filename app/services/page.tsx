'use client';
import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import styles from './services.module.scss'
import ServiceCard from '../../components/ServiceCard'

// Use a pages array (user will supply content). Set number of pages to 10.
const PAGES = 10
const pages = Array.from({ length: PAGES }, (_, i) => ({
  id: `page-${i + 1}`,
  title: `Page ${i + 1}`,
  subtitle: `Subtitle for page ${i + 1}`,
  // Optionally provide a `content` field with JSX to render inside the card.
  // If you prefer to keep content in separate files, set this to null and import
  // specific components where you map over pages.
  content: null,
}))

export default function Services() {
  const sectionRef = useRef<HTMLElement | null>(null)

  // Map the scroll progress of the section to a 0..1 range where
  // 0 = section top aligns with viewport top, and 1 = section bottom
  // aligns with viewport top. This ensures the first page reaches
  // the top of the viewport before horizontal translation begins.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })

  // Snap behavior:
  // - compute nearest page index from the continuous scroll progress
  // - smooth that integer with a spring so the transition feels natural
  // - map the smoothed index to a vw-based translateX value
  // Use PAGES (not PAGES - 1) when computing the rounded index so
  // the final page becomes reachable in edge cases where the progress
  // mapping slightly undershoots. Clamp the result to [0, PAGES-1].
  const pageIndex = useTransform(scrollYProgress, (v) => {
    const idx = Math.round(v * PAGES)
    return Math.min(Math.max(idx, 0), PAGES - 1)
  })

  const pageIndexSpring = useSpring(pageIndex, { stiffness: 60, damping: 16 })

  const x = useTransform(pageIndexSpring, (idx) => `-${idx * 100}vw`)

  return (
    <section ref={sectionRef} className={styles.section} style={{ height: `${PAGES * 100}vh` }}>
      <div className={styles.sticky}>
        <motion.div className={styles.horizontal} style={{ x, width: `${PAGES * 100}vw` }}>
          {pages.map((p, i) => (
            <article key={p.id} className={styles.card}>
              <div className={styles.number}>{String(i + 1).padStart(2, '0')}</div>

              <div className={styles.content}>
                <ServiceCard title={p.title} subtitle={p.subtitle}>
                  {/* If `p.content` is provided (JSX), render it. Otherwise render a
                      simple placeholder. The user can replace `p.content` with
                      custom JSX, components, or MDX output. */}
                  {p.content ?? (
                    <>
                      <p>
                        This is a placeholder for <strong>{p.title}</strong>. Replace
                        this with any JSX you want: lists, images, or even MDX.
                      </p>
                      <p>Examples: features list, links, or short descriptions.</p>
                    </>
                  )}
                </ServiceCard>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
