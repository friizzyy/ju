'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface Props {
  text: string
  className?: string
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  delay?: number
  stagger?: number
  once?: boolean
}

export default function TextReveal({
  text,
  className = '',
  tag: Tag = 'h2',
  delay = 0,
  stagger = 0.04,
  once = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-15% 0px' })

  const words = text.split(' ')

  return (
    <Tag ref={ref as never} className={`${className}`} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.28em] last:mr-0">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', rotateX: -80 }}
            animate={isInView ? { y: '0%', rotateX: 0 } : { y: '110%', rotateX: -80 }}
            transition={{
              duration: 0.7,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ transformOrigin: 'bottom', perspective: 600 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
