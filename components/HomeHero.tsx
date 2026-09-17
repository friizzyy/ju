'use client'

import Link from 'next/link'
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
} from 'react'
import { heroAgents } from '@/data/hero-agents'
import HeroAgentIcon from './HeroAgentIcon'
import { createHeroNetwork, type HeroMotion } from './hero-network'
import styles from './HomeHero.module.css'

export default function HomeHero() {
  const hero = useRef<HTMLElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const buttons = useRef<(HTMLButtonElement | null)[]>([])
  const note = useRef<HTMLElement>(null)
  const noteContent = useRef<HTMLDivElement>(null)
  const network = useRef<ReturnType<typeof createHeroNetwork> | null>(null)
  const previousSelection = useRef<number | null>(null)
  const [selected, setSelected] = useState<number | null>(null)
  const [motion, setMotion] = useState<HeroMotion>({
    paused: false,
    reduced: false,
  })
  const noteId = useId()
  const agent = selected === null ? null : heroAgents[selected]

  useEffect(() => {
    const card = note.current
    const section = hero.current
    if (!card || !section) return
    // Larger text must be able to expand the detail's reserved space.
    const observer = new ResizeObserver(() => {
      const height = Math.max(
        184,
        Math.ceil(card.getBoundingClientRect().height),
      )
      section.style.setProperty('--note-space', `${height}px`)
    })
    observer.observe(card)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!hero.current || !canvas.current) return
    const controls = buttons.current.filter(
      (button): button is HTMLButtonElement => button !== null,
    )
    const scene = createHeroNetwork(
      hero.current,
      canvas.current,
      controls,
      setMotion,
    )
    network.current = scene
    return () => {
      scene.destroy()
      network.current = null
    }
  }, [])

  const closeNote = useCallback(
    (restoreFocus = true) => {
      if (restoreFocus && selected !== null)
        buttons.current[selected]?.focus({ preventScroll: true })
      setSelected(null)
      network.current?.select(-1)
    },
    [selected],
  )

  useEffect(() => {
    if (selected === null) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') closeNote()
    }
    function onClick(event: MouseEvent) {
      if (!(event.target instanceof Node)) return
      if (
        !note.current?.contains(event.target) &&
        !buttons.current.some((button) =>
          button?.contains(event.target as Node),
        )
      ) {
        closeNote(false)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('click', onClick)
    }
  }, [selected, closeNote])

  useEffect(() => {
    const previous = previousSelection.current
    previousSelection.current = selected
    if (
      selected === null ||
      previous === selected ||
      motion.reduced ||
      motion.paused
    )
      return
    const wasOpen = previous !== null
    const target = wasOpen ? noteContent.current : note.current
    const animation = target?.animate?.(
      [
        { opacity: 0, transform: `translateY(${wasOpen ? 3 : 6}px)` },
        { opacity: 1, transform: 'translateY(0)' },
      ],
      { duration: wasOpen ? 180 : 260, easing: 'cubic-bezier(.2,.7,.2,1)' },
    )
    return () => animation?.cancel()
  }, [selected, motion.paused, motion.reduced])

  function selectAgent(index: number) {
    if (selected === index) {
      closeNote()
      return
    }
    setSelected(index)
    network.current?.select(index)
  }

  useEffect(() => {
    if (selected === null) return
    const frame = requestAnimationFrame(() => {
      const section = hero.current
      const card = note.current
      if (
        !section ||
        !card ||
        getComputedStyle(section).getPropertyValue('--hero-compact').trim() !==
          '1'
      )
        return
      const rect = card.getBoundingClientRect()
      const viewport = window.visualViewport
      const viewportBottom = viewport
        ? viewport.offsetTop + viewport.height
        : window.innerHeight
      const nav = document
        .querySelector('[data-mobile-navigation]')
        ?.getBoundingClientRect()
      const bottom =
        Math.min(
          viewportBottom,
          nav && nav.height > 0 ? nav.top : viewportBottom,
        ) - 16
      const top =
        (viewport?.offsetTop ?? 0) +
        (matchMedia('(min-width: 640px)').matches ? 80 : 16)
      if (rect.bottom <= bottom) return
      const offset =
        rect.height > bottom - top ? rect.top - top : rect.bottom - bottom
      window.scrollBy({
        top: Math.max(0, offset),
        behavior: matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'auto'
          : 'smooth',
      })
    })
    return () => cancelAnimationFrame(frame)
  }, [selected])

  return (
    <div id="ju-hero">
      <section ref={hero} aria-label="JU. Studio" className={styles.hero}>
        <canvas
          ref={canvas}
          className={styles['live-network']}
          aria-hidden="true"
        />
        <div className={styles['hero-core']}>
          <div className={styles['hero-brand']}>
            <h1 aria-label="JU." className={styles.wordmark}>
              JU.
            </h1>
          </div>
          <div className={styles['hero-copy']}>
            <p className={styles.tagline}>
              We build the site. Then we build the system behind it.
            </p>
            <div className={styles['hero-actions']}>
              <Link href="/studio" className={styles['work-link']}>
                View work <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link
                href="https://calendly.com/julius-buildwithju/30min"
                target="_blank"
                rel="noopener noreferrer"
                className={styles['project-link']}
              >
                Start a project
              </Link>
            </div>
            <div className={styles['agent-note-anchor']}>
              <aside
                ref={note}
                id={noteId}
                aria-label="Selected agent"
                hidden={!agent}
                className={styles['agent-note']}
                style={{ '--note-color': agent?.color } as CSSProperties}
              >
                <div
                  ref={noteContent}
                  className={styles['agent-note-content']}
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <span className={styles['note-emblem']} aria-hidden="true">
                    {agent && <HeroAgentIcon id={agent.id} />}
                  </span>
                  <div className={styles['note-text']}>
                    <div className={styles['note-heading']}>
                      <strong>{agent?.name}</strong>
                      <span className={styles['note-role']}>{agent?.role}</span>
                    </div>
                    <p>{agent?.description}</p>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Close agent details"
                  className={styles['close-note']}
                  onClick={() => closeNote()}
                >
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path d="m4 4 8 8M12 4l-8 8" />
                  </svg>
                </button>
              </aside>
            </div>
          </div>
        </div>
        <div className={styles['hero-caption']}>
          <span>{`${heroAgents.length}\u00a0agents`}</span>{' '}
          <span aria-hidden="true">&middot;</span> <span>explore a node</span>
        </div>
        <div className={styles['hero-fade']} aria-hidden="true" />
        <div
          className={styles['live-agents']}
          role="group"
          aria-label="Explore the agents behind JU."
        >
          {heroAgents.map((node, index) => (
            <button
              key={node.id}
              ref={(button) => {
                buttons.current[index] = button
              }}
              type="button"
              data-agent={node.id}
              aria-label={`${node.name}: ${node.role}`}
              aria-pressed={selected === index}
              aria-expanded={selected === index}
              aria-controls={noteId}
              className={styles['live-agent']}
              style={
                {
                  '--nx': node.x,
                  '--ny': node.y,
                  '--agent-color': node.color,
                } as CSSProperties
              }
              onClick={() => selectAgent(index)}
              onPointerEnter={() => network.current?.hover(index)}
              onPointerLeave={() => network.current?.hover(-1)}
              onFocus={() => network.current?.hover(index)}
              onBlur={() => network.current?.hover(-1)}
            >
              <span className={styles['live-agent-icon']}>
                <HeroAgentIcon id={node.id} />
              </span>
              <span className={styles['live-agent-name']}>{node.name}</span>
              <span className={styles['live-agent-role']}>{node.role}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
