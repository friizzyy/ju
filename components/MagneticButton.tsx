'use client'

import { useRef, useCallback, ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  as?: 'button' | 'a' | 'div'
  strength?: number
  [key: string]: unknown
}

export default function MagneticButton({
  children,
  className = '',
  as: Tag = 'div',
  strength = 0.35,
  ...rest
}: Props) {
  const ref = useRef<HTMLElement>(null)

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }, [strength])

  const onLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)'
  }, [])

  return (
    <Tag
      ref={ref as never}
      className={`transition-transform duration-300 ease-out ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...rest}
    >
      {children}
    </Tag>
  )
}
