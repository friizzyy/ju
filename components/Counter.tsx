'use client'

import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'

interface Props {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

export default function Counter({ value, suffix = '', prefix = '', duration = 2, className = '' }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const step = (ts: number) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setDisplay(Math.floor(eased * value))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [isInView, value, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  )
}
