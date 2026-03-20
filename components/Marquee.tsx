'use client'

import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  speed?: number
  reverse?: boolean
  className?: string
  pauseOnHover?: boolean
}

export default function Marquee({
  children,
  speed = 40,
  reverse = false,
  className = '',
  pauseOnHover = false,
}: Props) {
  const dir = reverse ? 'reverse' : 'normal'
  return (
    <div
      className={`marquee-track overflow-hidden ${pauseOnHover ? 'hover:[--play:paused]' : ''} ${className}`}
      style={{ '--speed': `${speed}s`, '--dir': dir } as React.CSSProperties}
    >
      <div className="marquee-inner">
        {children}
        {children}
      </div>
    </div>
  )
}
