'use client'

import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import styles from './MobileCarousel.module.css'

// The final card can align at the end of a partially visible rail.
function destination(element: HTMLDivElement, index: number) {
  const slides = element.children as HTMLCollectionOf<HTMLElement>
  const left = (slides[index]?.offsetLeft || 0) - (slides[0]?.offsetLeft || 0)
  return Math.max(0, Math.min(left, element.scrollWidth - element.clientWidth))
}

export default function MobileCarousel({
  children,
  label,
  desktopGrid = false,
}: {
  children: ReactNode
  label: string
  desktopGrid?: boolean
}) {
  const count = Children.count(children)
  const track = useRef<HTMLDivElement>(null)
  const target = useRef(0)
  const programmatic = useRef(false)
  const settleTimer = useRef<number | undefined>(undefined)
  const [active, setActive] = useState(0)

  const nearest = useCallback(() => {
    const element = track.current
    if (!element) return 0
    const slides = [...element.children] as HTMLElement[]
    return slides.reduce(
      (best, _slide, index) =>
        Math.abs(destination(element, index) - element.scrollLeft) <
        Math.abs(destination(element, best) - element.scrollLeft)
          ? index
          : best,
      0,
    )
  }, [])

  const sync = useCallback(() => {
    target.current = nearest()
    programmatic.current = false
    setActive(target.current)
  }, [nearest])

  useEffect(() => {
    const element = track.current
    if (!element) return
    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    const finishWithoutMotion = () => {
      if (!preference.matches) return
      window.clearTimeout(settleTimer.current)
      element.scrollTo({
        left: destination(element, target.current),
        behavior: 'instant',
      })
      programmatic.current = false
    }
    let width = element.clientWidth
    const resize = new ResizeObserver(() => {
      if (element.clientWidth === width) return
      width = element.clientWidth
      window.clearTimeout(settleTimer.current)
      const left = destination(element, target.current)
      element.scrollTo({ left, behavior: 'instant' })
      programmatic.current = false
    })
    resize.observe(element)
    preference.addEventListener('change', finishWithoutMotion)
    return () => {
      resize.disconnect()
      preference.removeEventListener('change', finishWithoutMotion)
      window.clearTimeout(settleTimer.current)
    }
  }, [])

  function goTo(index: number) {
    const element = track.current
    if (!element) return
    window.clearTimeout(settleTimer.current)
    const next = Math.max(0, Math.min(count - 1, index))
    target.current = next
    programmatic.current = true
    setActive(next)
    element.scrollTo({
      left: destination(element, next),
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
    })
  }

  function interrupt() {
    const element = track.current
    if (!element) return
    window.clearTimeout(settleTimer.current)
    // Let native touch/wheel scrolling take over without forcing a snap mid-gesture.
    sync()
  }

  return (
    <div
      className={`${styles.carousel} ${desktopGrid ? styles.desktopGrid : ''}`}
      role="region"
      aria-label={label}
    >
      <div
        ref={track}
        className={styles.track}
        tabIndex={0}
        aria-label={`${label}, swipe or use arrow keys`}
        onPointerDown={interrupt}
        onWheel={interrupt}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return
          if (desktopGrid && matchMedia('(min-width: 1024px)').matches) return
          if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault()
            goTo(target.current + (event.key === 'ArrowRight' ? 1 : -1))
          }
        }}
        onScroll={() => {
          window.clearTimeout(settleTimer.current)
          if (!programmatic.current) setActive(nearest())
          settleTimer.current = window.setTimeout(sync, 160)
        }}
      >
        {Children.map(children, (child, index) => (
          <div
            className={styles.slide}
            role="group"
            aria-label={`${index + 1} of ${count}`}
          >
            {child}
          </div>
        ))}
      </div>
      <div className={styles.controls}>
        <p className={styles.position} aria-live="polite" aria-atomic="true">
          <span>{String(active + 1).padStart(2, '0')}</span> /{' '}
          {String(count).padStart(2, '0')}
        </p>
        <div className={styles.buttons}>
          <button
            type="button"
            aria-label={`Previous ${label.toLowerCase()}`}
            disabled={active === 0}
            onClick={() => goTo(target.current - 1)}
          >
            ←
          </button>
          <button
            type="button"
            aria-label={`Next ${label.toLowerCase()}`}
            disabled={active === count - 1}
            onClick={() => goTo(target.current + 1)}
          >
            →
          </button>
        </div>
      </div>
    </div>
  )
}
