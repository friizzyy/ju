'use client'

import { useRef, useCallback, ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  glowColor?: string
  borderRadius?: string
}

export default function GlowCard({
  children,
  className = '',
  glowColor = '0,212,255',
  borderRadius = 'rounded-2xl',
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const borderRef = useRef<HTMLDivElement>(null)

  const onMove = useCallback((e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect || !glowRef.current || !borderRef.current) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    glowRef.current.style.background =
      `radial-gradient(500px circle at ${x}px ${y}px, rgba(${glowColor},0.08), transparent 50%)`
    borderRef.current.style.background =
      `radial-gradient(400px circle at ${x}px ${y}px, rgba(${glowColor},0.25), transparent 40%)`
  }, [glowColor])

  return (
    <div
      ref={cardRef}
      className={`relative group ${borderRadius} ${className}`}
      onMouseMove={onMove}
    >
      {/* Fill glow */}
      <div
        ref={glowRef}
        className={`absolute -inset-px ${borderRadius} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
      />
      {/* Border glow (masked to border only) */}
      <div
        ref={borderRef}
        className={`absolute -inset-px ${borderRadius} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
        style={{
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor' as never,
          padding: '1px',
        }}
      />
      {/* Card body */}
      <div className={`relative ${borderRadius} bg-[#0D1117] border border-white/[0.06] group-hover:border-white/[0.01] transition-colors duration-500 h-full`}>
        {children}
      </div>
    </div>
  )
}
