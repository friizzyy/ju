'use client'

import { useRef, ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface Props {
  children: ReactNode
  className?: string
  speed?: number
}

export default function HorizontalScroll({ children, className = '', speed = 1 }: Props) {
  const container = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
  })

  const x = useTransform(scrollYProgress, [0, 1], [0, -600 * speed])

  return (
    <div ref={container} className={`overflow-hidden ${className}`}>
      <motion.div className="flex gap-6" style={{ x }}>
        {children}
      </motion.div>
    </div>
  )
}
