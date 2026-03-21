'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 50, restDelta: 0.001 })

  return (
    <motion.div
      className="fixed top-[57px] left-0 right-0 h-[2px] bg-accent/60 origin-left z-[60]"
      style={{ scaleX }}
    />
  )
}
