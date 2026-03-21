'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface Props {
  children: React.ReactNode
  className?: string
  direction?: 'up' | 'left' | 'right' | 'center'
  delay?: number
}

const clipPaths = {
  up: { hidden: 'inset(100% 0 0 0)', visible: 'inset(0 0 0 0)' },
  left: { hidden: 'inset(0 100% 0 0)', visible: 'inset(0 0 0 0)' },
  right: { hidden: 'inset(0 0 0 100%)', visible: 'inset(0 0 0 0)' },
  center: { hidden: 'inset(50% 50% 50% 50%)', visible: 'inset(0 0 0 0)' },
}

export default function ClipReveal({ children, className = '', direction = 'up', delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: clipPaths[direction].hidden, opacity: 0 }}
      animate={inView ? { clipPath: clipPaths[direction].visible, opacity: 1 } : {}}
      transition={{
        duration: 1.2,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
