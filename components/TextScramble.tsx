'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'

interface Props {
  text: string
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  className?: string
  delay?: number
  speed?: number
  trigger?: boolean
}

export default function TextScramble({
  text,
  tag: Tag = 'span',
  className = '',
  delay = 0,
  speed = 30,
  trigger,
}: Props) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const shouldAnimate = trigger !== undefined ? trigger : inView
  const [display, setDisplay] = useState(text.replace(/[^\s]/g, '\u00A0'))
  const animating = useRef(false)

  useEffect(() => {
    if (!shouldAnimate || animating.current) return
    animating.current = true

    const letters = text.split('')
    let frame = 0
    const totalFrames = letters.length * 2

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        const result = letters.map((char, i) => {
          if (char === ' ') return ' '
          const revealAt = i * 2
          if (frame >= revealAt + 4) return char
          if (frame >= revealAt) {
            return chars[Math.floor(Math.random() * chars.length)]
          }
          return '\u00A0'
        }).join('')

        setDisplay(result)
        frame++

        if (frame > totalFrames + 4) {
          clearInterval(interval)
          setDisplay(text)
          animating.current = false
        }
      }, speed)

      return () => clearInterval(interval)
    }, delay * 1000)

    return () => clearTimeout(timer)
  }, [shouldAnimate, text, delay, speed])

  return (
    <Tag ref={ref as React.Ref<HTMLHeadingElement>} className={className}>
      <span className="font-mono">{display}</span>
    </Tag>
  )
}
