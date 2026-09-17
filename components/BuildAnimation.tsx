'use client'

import { useEffect, useId, useRef, useState, type CSSProperties } from 'react'
import styles from './BuildAnimation.module.css'

export default function BuildAnimation() {
  const scene = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState(4)
  const [cycle, setCycle] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [motion, setMotion] = useState(false)
  const id = useId().replace(/:/g, '')

  useEffect(() => {
    const element = scene.current
    if (!element) return
    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    let timers: ReturnType<typeof setTimeout>[] = []
    let inView = false
    let started = false
    const clear = () => {
      timers.forEach(clearTimeout)
      timers = []
    }
    const finish = () => {
      clear()
      setMotion(false)
      setPlaying(false)
      setPhase(4)
    }
    const play = () => {
      clear()
      if (preference.matches || document.hidden || !inView) {
        finish()
        return
      }
      started = true
      setCycle((value) => value + 1)
      setMotion(true)
      setPlaying(true)
      setPhase(0)
      timers = [450, 1150, 2200, 3200].map((delay, index) =>
        setTimeout(() => setPhase(index + 1), delay),
      )
      timers.push(setTimeout(finish, 4100))
    }
    const sync = () => {
      if (preference.matches) {
        started = true
        finish()
      } else if (document.hidden || !inView) {
        if (started) finish()
      } else if (!started) {
        play()
      }
    }
    let observer: IntersectionObserver | undefined
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          inView = entry.isIntersecting
          sync()
        },
        { threshold: 0.15 },
      )
      observer.observe(element)
    } else {
      inView = true
    }
    sync()
    preference.addEventListener('change', sync)
    document.addEventListener('visibilitychange', sync)
    return () => {
      clear()
      observer?.disconnect()
      preference.removeEventListener('change', sync)
      document.removeEventListener('visibilitychange', sync)
    }
  }, [])

  const reveal = (step: number, delay = 0) => ({
    'data-visible': phase >= step,
    style: { '--delay': `${delay}ms` } as CSSProperties,
  })

  const illustration = (wide: boolean) => {
    const extra = wide ? 240 : 0
    const variant = wide ? 'wide' : 'compact'
    const surfaceId = `build-surface-${id}-${variant}`
    const shadowId = `build-shadow-${id}-${variant}`
    return (
      <svg
        key={`${cycle}-${variant}`}
        className={`${styles.illustration} ${wide ? styles.wideIllustration : styles.compactIllustration}`}
        viewBox={`0 0 ${520 + extra} 470`}
        style={
          wide
            ? ({
                '--cursor-start-x': '647px',
                '--cursor-nav-x': '669px',
                '--cursor-hero-x': '435px',
                '--cursor-card-x': '422px',
                '--cursor-footer-x': '670px',
                '--cursor-end-x': '683px',
              } as CSSProperties)
            : undefined
        }
        role="img"
        aria-label="Illustration of a website taking shape: navigation, page content, cards, and a finished footer."
      >
        <defs>
          <linearGradient id={surfaceId} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#1d1d28" />
            <stop offset="0.68" stopColor="#12151c" />
            <stop offset="1" stopColor="#0c0f14" />
          </linearGradient>
          <filter id={shadowId} x="-15%" y="-12%" width="130%" height="135%">
            <feDropShadow
              dx="0"
              dy="12"
              stdDeviation="12"
              floodColor="#000"
              floodOpacity=".3"
            />
          </filter>
        </defs>
        <g filter={`url(#${shadowId})`}>
          <rect
            x="28"
            y="30"
            width={464 + extra}
            height="412"
            rx="20"
            fill={`url(#${surfaceId})`}
          />
          <rect
            x="28.5"
            y="30.5"
            width={463 + extra}
            height="411"
            rx="19.5"
            fill="none"
            stroke="#b8b5c8"
            strokeOpacity=".19"
          />
        </g>
        <path
          d={`M29 74H${491 + extra}`}
          stroke="#d5dbe4"
          strokeOpacity=".08"
        />
        <g fill="#c5ccd6" fillOpacity=".25">
          <circle cx="49" cy="52" r="3" />
          <circle cx="61" cy="52" r="3" />
          <circle cx="73" cy="52" r="3" />
        </g>
        <rect
          x="97"
          y="43"
          width={245 + extra}
          height="19"
          rx="5"
          fill="#ffffff"
          fillOpacity=".035"
          stroke="#ffffff"
          strokeOpacity=".04"
        />
        <text
          x="109"
          y="56"
          fill="#9da6b4"
          fontSize="8"
          fontFamily="var(--font-jetbrains-mono), monospace"
        >
          your next website
        </text>
        <g
          className={styles.status}
          data-complete={phase === 4}
          transform={`translate(${extra} 0)`}
        >
          <rect x="388" y="43" width="82" height="20" rx="10" />
          <circle cx="401" cy="53" r="2.5" />
          <text
            x="411"
            y="56"
            fontSize="8"
            fontFamily="var(--font-jetbrains-mono), monospace"
            letterSpacing=".6"
          >
            {phase === 4 ? 'LIVE' : 'BUILDING'}
          </text>
        </g>

        <g className={styles.reveal} {...reveal(1)}>
          <rect
            className={styles.bar}
            {...reveal(1)}
            x="52"
            y="99"
            width="36"
            height="12"
            rx="3"
            fill="#a391c5"
            fillOpacity=".8"
          />
          {[294, 331, 368].map((x, i) => (
            <rect
              key={x}
              className={styles.bar}
              {...reveal(1, 70 + i * 75)}
              x={x + extra}
              y="102"
              width="25"
              height="6"
              rx="2"
              fill="#d5dbe4"
              fillOpacity=".23"
            />
          ))}
          <rect
            className={styles.bar}
            {...reveal(1, 280)}
            x={413 + extra}
            y="96"
            width="55"
            height="19"
            rx="9.5"
            fill="#716682"
            fillOpacity=".28"
            stroke="#b3a3d1"
            strokeOpacity=".25"
          />
        </g>

        <g className={styles.reveal} {...reveal(2)}>
          <rect
            className={styles.bar}
            {...reveal(2)}
            x="52"
            y="146"
            width={283 + extra / 2}
            height="18"
            rx="4"
            fill="#edf1f6"
            fillOpacity=".7"
          />
          <rect
            className={styles.bar}
            {...reveal(2, 100)}
            x="52"
            y="174"
            width={233 + extra * 0.4}
            height="18"
            rx="4"
            fill="#a99abe"
            fillOpacity=".8"
          />
          <rect
            className={styles.bar}
            {...reveal(2, 200)}
            x="52"
            y="209"
            width={310 + extra}
            height="6"
            rx="2"
            fill="#c8ced8"
            fillOpacity=".18"
          />
          <rect
            className={styles.bar}
            {...reveal(2, 260)}
            x="52"
            y="221"
            width={258 + extra}
            height="6"
            rx="2"
            fill="#c8ced8"
            fillOpacity=".12"
          />
          <rect
            className={styles.bar}
            {...reveal(2, 340)}
            x="52"
            y="245"
            width="90"
            height="25"
            rx="12.5"
            fill="#242033"
          />
          <rect
            className={styles.bar}
            {...reveal(2, 400)}
            x="153"
            y="245"
            width="90"
            height="25"
            rx="12.5"
            fill="#ffffff"
            fillOpacity=".025"
            stroke="#d5dbe4"
            strokeOpacity=".14"
          />
        </g>

        {[52, 197 + extra / 3, 342 + (extra * 2) / 3].map((x, i) => (
          <g key={x} className={styles.reveal} {...reveal(3, i * 110)}>
            <rect
              x={x}
              y="292"
              width={126 + extra / 3}
              height="82"
              rx="8"
              fill="#b8b4c6"
              fillOpacity=".035"
              stroke="#b8b4c6"
              strokeOpacity=".1"
            />
            <rect
              x={x + 10}
              y="302"
              width={106 + extra / 3}
              height="34"
              rx="4"
              fill={i === 1 ? '#998eae' : '#d5dbe4'}
              fillOpacity={i === 1 ? '.16' : '.065'}
            />
            <rect
              x={x + 10}
              y="345"
              width={79 + extra * 0.2}
              height="5"
              rx="2"
              fill="#d5dbe4"
              fillOpacity=".22"
            />
            <rect
              x={x + 10}
              y="357"
              width={56 + extra * 0.12}
              height="4"
              rx="2"
              fill="#d5dbe4"
              fillOpacity=".1"
            />
          </g>
        ))}
        <g className={styles.reveal} {...reveal(4)}>
          <path
            d={`M52 396H${468 + extra}`}
            stroke="#d5dbe4"
            strokeOpacity=".08"
          />
          <rect
            x="52"
            y="410"
            width="25"
            height="6"
            rx="2"
            fill="#a99abe"
            fillOpacity=".45"
          />
          {[358, 398, 438].map((x) => (
            <rect
              key={x}
              x={x + extra}
              y="411"
              width="30"
              height="4"
              rx="2"
              fill="#d5dbe4"
              fillOpacity=".15"
            />
          ))}
        </g>
        <g className={styles.cursor} aria-hidden="true">
          <path
            d="M0 0 1 17 5.5 12.5 9 20 12 18.5 8.5 11 15 10Z"
            fill="#e7ecf4"
            stroke="#141820"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    )
  }

  return (
    <div
      ref={scene}
      className={styles.scene}
      data-phase={phase}
      data-playing={playing}
      data-motion={motion}
    >
      {illustration(false)}
      {illustration(true)}
    </div>
  )
}
