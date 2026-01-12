'use client';
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styles from './services.module.scss'
import ServiceCard from '../ServiceCard'

type HTMLFlipBookComponent = React.ComponentType<React.PropsWithChildren<Record<string, unknown>>>

type PageFlipApi = {
  flip: (pageIndex: number, corner?: 'top' | 'bottom' | 'left' | 'right') => void
  turnToPage?: (pageIndex: number) => void
}

type PageFlipRef = {
  pageFlip?: () => PageFlipApi
}

const isModuleWithDefault = (mod: unknown): mod is { default: HTMLFlipBookComponent } => {
  return typeof mod === 'object' && mod !== null && 'default' in mod
}

const isComponent = (mod: unknown): mod is HTMLFlipBookComponent => {
  return typeof mod === 'function'
}

type ServicePage = {
  id: string
  title: string
  oneLiner: string
  points?: string[]
  imageSrc?: string
}

const pages: ServicePage[] = [
  {
    id: 'page-1',
    title: 'Brand Strategy',
    oneLiner: 'We define what your brand stands for — and why people should trust it.',
    points: ['Positioning', 'Tone & voice', 'Visual direction'],
    imageSrc: '/business-strategy.png',
  },
  {
    id: 'page-2',
    title: 'UI / UX Design',
    oneLiner: 'Interfaces that feel obvious, intuitive, and addictive to use.',
    points: ['User journeys', 'Wireframes → prototypes', 'Conversion-focused layouts'],
    imageSrc: '/ui-ux.png',
  },
  {
    id: 'page-3',
    title: 'Web Development',
    oneLiner: 'Fast, scalable, modern websites built for real users.',
    points: ['Next.js / React', 'Performance-first', 'Clean architecture'],
    imageSrc: '/web-dev.png',
  },
  {
    id: 'page-4',
    title: 'Motion & Interaction',
    oneLiner: 'Scroll, hover, and micro-interactions that bring products to life.',
    points: ['Framer Motion', 'Scroll storytelling', 'Micro-feedback'],
    imageSrc: '/motion.svg',
  },
  {
    id: 'page-5',
    title: '3D Experiences',
    oneLiner: 'Immersive visuals that make brands unforgettable.',
    points: ['Spline', 'Web-based 3D', 'Performance-aware'],
    imageSrc: '/3d.svg',
  },
  {
    id: 'page-6',
    title: 'Landing Pages',
    oneLiner: 'Pages designed to turn attention into action.',
    points: ['Funnels', 'CTA placement', 'Scroll psychology'],
    imageSrc: '/landing-page.png',
  },
  {
    id: 'page-7',
    title: 'MVP Development',
    oneLiner: 'From idea to launch — without wasting months.',
    points: ['Rapid prototyping', 'Scalable foundations', 'Founder-friendly iteration'],
    imageSrc: '/mvp.svg',
  },
  {
    id: 'page-8',
    title: 'Performance Optimization',
    oneLiner: 'Speed, smoothness, and stability at scale.',
    points: ['Lighthouse optimization', 'Animation performance', 'Load-time reduction'],
    imageSrc: '/perf-optimize.svg',
  },
  {
    id: 'page-9',
    title: 'Design Systems',
    oneLiner: 'Consistent UI that grows with your product.',
    points: ['Reusable components', 'Tokens & guidelines', 'Developer handoff'],
    imageSrc: '/server.svg',
  },
  {
    id: 'page-10',
    title: 'Long-Term Partnership',
    oneLiner: 'We don\'t disappear after launch.',
    points: ['Iterations', 'Feature expansion', 'Maintenance'],
    imageSrc: '/brand-loyal.png',
  },
]

function PageContent({ page }: { page: ServicePage }) {
  return (
    <ServiceCard title={page.title} subtitle={page.oneLiner}>
      {page.points && page.points.length > 0 && (
        <ul className={styles.bullets}>
          {page.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      )}

      {page.imageSrc && (
        <div className={styles.pageMedia}>
          <div className={styles.pageMediaFrame}>
            <Image
              src={page.imageSrc}
              alt={page.title ? `${page.title} illustration` : 'Service illustration'}
              width={1200}
              height={700}
              className={styles.pageMediaImg}
              priority={page.id === 'page-1'}
            />
          </div>
        </div>
      )}
    </ServiceCard>
  )
}

type FlipPageProps = {
  page: ServicePage
  pageNumber: number
  onGoToContents?: () => void
  showContentsButton?: boolean
}

const Page = React.forwardRef<HTMLDivElement, FlipPageProps>(function Page(
  { page, pageNumber, onGoToContents, showContentsButton = false },
  ref
) {
  const handleContentsClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (onGoToContents) onGoToContents()
  }

  return (
    <div ref={ref} className={styles.page}>
      <div className={styles.bigNumber}>{String(pageNumber).padStart(2, '0')}</div>
      {onGoToContents && showContentsButton && (
        <button 
          type="button" 
          className={styles.contentsJump} 
          onClick={handleContentsClick}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          Contents
        </button>
      )}
      <PageContent page={page} />
    </div>
  )
})

type ContentsPageProps = {
  items: ServicePage[]
  onSelect: (serviceIndex: number) => void
}

const ContentsPage = React.forwardRef<HTMLDivElement, ContentsPageProps>(function ContentsPage(
  { items, onSelect },
  ref
) {
  const handleClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault()
    e.stopPropagation()
    onSelect(index)
  }

  return (
    <div ref={ref} className={styles.page}>
      <div className={styles.contents}>
        <div className={styles.contentsHeader}>
          <div className={styles.contentsTitle}>Contents</div>
          <div className={styles.contentsHint}>Tap a service to jump</div>
        </div>

        <div className={styles.contentsList}>
          {items.map((p, i) => (
            <button
              key={p.id}
              type="button"
              className={`${styles.contentsItem} no-scale cursor-show`}
              onClick={(e) => handleClick(e, i)}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
            >
              <span className={`${styles.contentsNum} cursor-pop`}>{String(i + 1).padStart(2, '0')}</span>
              <span className={`${styles.contentsName} cursor-pop`}>{p.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
})

const BlankPage = React.forwardRef<HTMLDivElement>(function BlankPage(props, ref) {
  return <div ref={ref} className={styles.page} />
})

type CoverPageProps = {
  onOpen?: () => void
  subtitle?: string
}

const CoverPage = React.forwardRef<HTMLDivElement, CoverPageProps>(function CoverPage(
  { onOpen, subtitle = 'Tap to open' },
  ref
) {
  return (
    <div ref={ref} className={`${styles.page} ${styles.coverPage}`}>
      <div
        className={`${styles.coverSurface} cursor-show`}
        role={onOpen ? 'button' : undefined}
        tabIndex={onOpen ? 0 : undefined}
        onClick={(e) => {
          if (!onOpen) return
          e.preventDefault()
          e.stopPropagation()
          onOpen()
        }}
        onKeyDown={(e) => {
          if (!onOpen) return
          if (e.key !== 'Enter' && e.key !== ' ') return
          e.preventDefault()
          e.stopPropagation()
          onOpen()
        }}
      >
        <div className={styles.coverGlow} aria-hidden="true" />

        <div className={styles.coverTop}>
          <div className={styles.coverMeta}>Brand • Design • Development</div>
        </div>

        <div className={styles.coverCenter}>
          <div className={styles.coverTitle}>Services</div>
          <div className={styles.coverSubtitle}>{subtitle}</div>
        </div>

        <div className={styles.coverBottom}>
          <div className={styles.coverRule} aria-hidden="true" />
          <div className={styles.coverFootnote}>A studio built for modern products</div>
        </div>
      </div>
    </div>
  )
})

export default function Services() {
  const stageRef = useRef<HTMLDivElement | null>(null)
  const bookRef = useRef<PageFlipRef | null>(null)
  const [pageSize, setPageSize] = useState<{ width: number; height: number } | null>(null)
  const [FlipBook, setFlipBook] = useState<HTMLFlipBookComponent | null>(null)
  const [usePortraitMode, setUsePortraitMode] = useState(false)

  useEffect(() => {
    let mounted = true
    import('react-pageflip')
      .then((mod: unknown) => {
        if (!mounted) return

        if (isModuleWithDefault(mod)) {
          setFlipBook(() => mod.default)
          return
        }

        if (isComponent(mod)) {
          setFlipBook(() => mod)
          return
        }

        console.error('Failed to load react-pageflip: unexpected module shape')
      })
      .catch((err) => {
        console.error('Failed to load react-pageflip:', err)
      })
    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    const el = stageRef.current
    if (!el) return

    const compute = () => {
      const cs = window.getComputedStyle(el)
      const paddingX =
        (Number.parseFloat(cs.paddingLeft) || 0) + (Number.parseFloat(cs.paddingRight) || 0)
      const paddingY =
        (Number.parseFloat(cs.paddingTop) || 0) + (Number.parseFloat(cs.paddingBottom) || 0)

      // Use the content box size so padding/scrollbars don't skew the math.
      const contentW = Math.max(0, el.clientWidth - paddingX)
      const contentH = Math.max(0, el.clientHeight - paddingY)

      // Keep 2-page spread for laptop/desktop; only allow portrait on small screens.
      // (react-pageflip switches to single page when portrait mode is enabled.)
      setUsePortraitMode(contentW < 720)

      const bookW = Math.max(320, Math.floor(Math.min(contentW * 0.92, 1400)))
      // Make the book taller to better fill the stage (reduce empty gap).
      const bookH = Math.max(460, Math.floor(Math.min(contentH * 0.90, 980)))
      const pageW = Math.floor(bookW / 2)
      setPageSize({ width: pageW, height: bookH })
    }

    compute()
    const ro = new ResizeObserver(compute)
    ro.observe(el)
    window.addEventListener('resize', compute)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', compute)
    }
  }, [])

  const goToPage = (pageIndex: number) => {
    if (!bookRef.current) return
    try {
      const api = bookRef.current.pageFlip?.()
      if (!api) return
      // Animated navigation
      api.flip(pageIndex, 'bottom')
    } catch {
      try {
        const api = bookRef.current?.pageFlip?.()
        if (!api) return
        api?.turnToPage?.(pageIndex)
      } catch (e2) {
        console.error('Failed to flip/turn page:', e2)
      }
    }
  }

  // Cover is page 0, empty page is page 1, Contents is page 2.
  const goToContents = () => goToPage(2)

  // Cover is index 0, Blank is index 1, Contents is index 2, services start at index 3.
  const onSelectServiceFromContents = (serviceIndex: number) => {
    // In 2-page spread mode, jump to the LEFT page of the spread so selecting 6 shows 5–6.
    const baseIndex = serviceIndex + 3
    const targetIndex = usePortraitMode ? baseIndex : serviceIndex % 2 === 1 ? baseIndex - 1 : baseIndex
    goToPage(targetIndex)
  }

  return (
    <section id="services" className={styles.section}>
      <div className={styles.sticky}>
        <div ref={stageRef} className={styles.stage}>
          {FlipBook && pageSize && (
            <FlipBook
              ref={bookRef}
              width={pageSize.width}
              height={pageSize.height}
              className={styles.flipBook}
              style={{}}
              startPage={0}
              size="fixed"
              minWidth={260}
              maxWidth={700}
              minHeight={420}
              maxHeight={980}
              drawShadow
              flippingTime={700}
              usePortrait={usePortraitMode}
              startZIndex={0}
              autoSize
              maxShadowOpacity={0.45}
              showCover
              mobileScrollSupport
              clickEventForward={true}
              useMouseEvents={true}
              swipeDistance={30}
              showPageCorners={false}
              disableFlipByClick={true}
            >
              <CoverPage onOpen={goToContents} />
              <BlankPage />
              <ContentsPage items={pages} onSelect={onSelectServiceFromContents} />
              {pages.map((p, i) => (
                <Page
                  key={p.id}
                  page={p}
                  pageNumber={i + 1}
                  onGoToContents={goToContents}
                  /* Only show on left pages after contents (even flipbook indices). */
                  showContentsButton={(i + 2) % 2 === 0}
                />
              ))}
            </FlipBook>
          )}
        </div>
      </div>
    </section>
  )
}