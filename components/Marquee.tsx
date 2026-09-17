'use client'

import { ReactNode } from 'react'
import styles from './Marquee.module.css'

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
      className={`marquee-track ${styles.track} ${pauseOnHover ? 'hover:[--play:paused]' : ''} ${className}`}
      style={{ '--speed': `${speed}s`, '--dir': dir } as React.CSSProperties}
    >
      <div className={`marquee-inner ${styles.inner}`}>
        <div className={styles.group}>{children}</div>
        <div
          className={`${styles.group} ${styles.copy}`}
          aria-hidden="true"
          inert
        >
          {children}
        </div>
      </div>
    </div>
  )
}
