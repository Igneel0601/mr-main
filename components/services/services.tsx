'use client';
import React, { useEffect, useRef, useState } from 'react'
import styles from './services.module.scss'
import ServiceCard from '../ServiceCard'

type HTMLFlipBookComponent = React.ComponentType<any>

type ServicePage = {
  id: string
  title: string
  oneLiner: string
  points?: string[]
}

const pages: ServicePage[] = [
  {
    id: 'page-1',
    title: 'Brand Strategy',
    oneLiner: 'We define what your brand stands for — and why people should trust it.',
    points: ['Positioning', 'Tone & voice', 'Visual direction'],
  },
  {
    id: 'page-2',
    title: 'UI / UX Design',
    oneLiner: 'Interfaces that feel obvious, intuitive, and addictive to use.',
    points: ['User journeys', 'Wireframes → prototypes', 'Conversion-focused layouts'],
  },
  {
    id: 'page-3',
    title: 'Web Development',
    oneLiner: 'Fast, scalable, modern websites built for real users.',
    points: ['Next.js / React', 'Performance-first', 'Clean architecture'],
  },
  {
    id: 'page-4',
    title: 'Motion & Interaction',
    oneLiner: 'Scroll, hover, and micro-interactions that bring products to life.',
    points: ['Framer Motion', 'Scroll storytelling', 'Micro-feedback'],
  },
  {
    id: 'page-5',
    title: '3D Experiences',
    oneLiner: 'Immersive visuals that make brands unforgettable.',
    points: ['Spline', 'Web-based 3D', 'Performance-aware'],
  },
  {
    id: 'page-6',
    title: 'Landing Pages',
    oneLiner: 'Pages designed to turn attention into action.',
    points: ['Funnels', 'CTA placement', 'Scroll psychology'],
  },
  {
    id: 'page-7',
    title: 'MVP Development',
    oneLiner: 'From idea to launch — without wasting months.',
    points: ['Rapid prototyping', 'Scalable foundations', 'Founder-friendly iteration'],
  },
  {
    id: 'page-8',
    title: 'Performance Optimization',
    oneLiner: 'Speed, smoothness, and stability at scale.',
    points: ['Lighthouse optimization', 'Animation performance', 'Load-time reduction'],
  },
  {
    id: 'page-9',
    title: 'Design Systems',
    oneLiner: 'Consistent UI that grows with your product.',
    points: ['Reusable components', 'Tokens & guidelines', 'Developer handoff'],
  },
  {
    id: 'page-10',
    title: 'Long-Term Partnership',
    oneLiner: 'We don\'t disappear after launch.',
    points: ['Iterations', 'Feature expansion', 'Maintenance'],
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
    </ServiceCard>
  )
}

type FlipPageProps = {
  page: ServicePage
  pageNumber: number
  onGoToContents?: () => void
}

const Page = React.forwardRef<HTMLDivElement, FlipPageProps>(function Page(
  { page, pageNumber, onGoToContents },
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
      {onGoToContents && (
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

export default function Services() {
  const stageRef = useRef<HTMLDivElement | null>(null)
  const bookRef = useRef<any>(null)
  const [pageSize, setPageSize] = useState<{ width: number; height: number } | null>(null)
  const [FlipBook, setFlipBook] = useState<HTMLFlipBookComponent | null>(null)
  const [currentPageIndex, setCurrentPageIndex] = useState(0)

  useEffect(() => {
    let mounted = true
    import('react-pageflip')
      .then((mod: any) => {
        if (!mounted) return
        setFlipBook(() => mod?.default ?? mod)
      })
      .catch((e) => {
        console.error('Failed to load react-pageflip:', e)
      })
    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    const el = stageRef.current
    if (!el) return

    const compute = () => {
      const rect = el.getBoundingClientRect()
      const bookW = Math.max(320, Math.floor(Math.min(rect.width * 0.92, 1400)))
      const bookH = Math.max(420, Math.floor(Math.min(rect.height * 0.78, 820)))
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
      const api = bookRef.current.pageFlip?.() ?? bookRef.current.pageFlip()
      // Animated navigation
      api.flip(pageIndex, 'top')
    } catch (e) {
      try {
        const api = bookRef.current?.pageFlip?.() ?? bookRef.current?.pageFlip?.()
        api?.turnToPage?.(pageIndex)
      } catch (e2) {
        console.error('Failed to flip/turn page:', e2)
      }
    }
  }

  const goToContents = () => goToPage(1)

  // Blank page is index 0, Contents is index 1, services start at index 2.
  const onSelectServiceFromContents = (serviceIndex: number) => {
    goToPage(serviceIndex + 2)
  }

  const onFlip = (e: { data: number | string }) => {
    const n = typeof e.data === 'number' ? e.data : Number.parseInt(String(e.data), 10)
    if (!Number.isNaN(n)) setCurrentPageIndex(n)
  }

  return (
    <section className={styles.section}>
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
              maxHeight={820}
              drawShadow
              flippingTime={700}
              usePortrait
              startZIndex={0}
              autoSize
              maxShadowOpacity={0.45}
              showCover={false}
              mobileScrollSupport
              clickEventForward={true}
              useMouseEvents={true}
              swipeDistance={30}
              showPageCorners
              disableFlipByClick={true}
              onFlip={onFlip}
            >
              <BlankPage />
              <ContentsPage items={pages} onSelect={onSelectServiceFromContents} />
              {pages.map((p, i) => (
                <Page key={p.id} page={p} pageNumber={i + 1} onGoToContents={goToContents} />
              ))}
            </FlipBook>
          )}
        </div>
      </div>
    </section>
  )
}