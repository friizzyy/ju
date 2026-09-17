'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import s from './background-paths.module.css'

// Adapted from the Background Paths reference supplied by Julius.
// Fixed timing keeps the server and client render identical.
const paths = Array.from({ length: 36 }, (_, i) => ({
  id: i,
  width: .45 + i * .021,
  opacity: .065 + i * .0048,
  duration: 24 + (i % 9) * 1.3,
}))

function FloatingPaths({ position }: { position: number }) {
  return <svg viewBox="0 0 696 316" fill="none" preserveAspectRatio="xMidYMid slice" className={position === 1 ? s.first : s.second}>
    {paths.map(({ id: i, width, opacity, duration }) => {
      const d = `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`
      return <g key={i}>
        <path d={d} stroke="currentColor" strokeWidth={width} strokeOpacity={opacity} />
        <path d={d} pathLength={1} stroke="currentColor" strokeWidth={width + .12} className={s.current} style={{ '--duration': `${duration}s`, '--delay': `${-i * .67 - (position === -1 ? 9 : 0)}s`, '--strength': opacity + .17 } as CSSProperties} />
      </g>
    })}
  </svg>
}

export function BackgroundPaths() {
  const root = useRef<HTMLDivElement>(null)
  const [running, setRunning] = useState(false)
  useEffect(() => {
    let visible = false
    const motion = matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setRunning(visible && !document.hidden && !motion.matches)
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update() }, { threshold: .01 })
    if (root.current) observer.observe(root.current)
    document.addEventListener('visibilitychange', update)
    motion.addEventListener('change', update)
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', update); motion.removeEventListener('change', update) }
  }, [])
  return <div ref={root} className={s.field} data-running={running} aria-hidden="true"><FloatingPaths position={1} /><FloatingPaths position={-1} /></div>
}
