'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -100, y: -100 })
  const target = useRef({ x: -100, y: -100 })
  const [hoverState, setHoverState] = useState<'default' | 'link' | 'project' | 'text'>('default')
  const [label, setLabel] = useState('')
  const raf = useRef(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Don't show custom cursor on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY }
      if (!visible) setVisible(true)
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t
    }

    function animate() {
      pos.current.x += (target.current.x - pos.current.x) * 0.35
      pos.current.y += (target.current.y - pos.current.y) * 0.35

      if (dot.current) {
        dot.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`
      }
      if (ring.current) {
        ring.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`
      }
      raf.current = requestAnimationFrame(animate)
    }

    // Detect hover targets
    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('[data-cursor]')
      if (el) {
        const type = el.getAttribute('data-cursor') as typeof hoverState
        setHoverState(type || 'link')
        const lbl = el.getAttribute('data-cursor-label')
        if (lbl) setLabel(lbl)
      }
    }

    const onOut = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('[data-cursor]')
      if (el) {
        setHoverState('default')
        setLabel('')
      }
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    raf.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(raf.current)
    }
  }, [visible])

  // Don't render on touch devices (SSR safe)
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null

  const ringSize = hoverState === 'project' ? 80 : hoverState === 'link' ? 44 : hoverState === 'text' ? 2 : 32

  return (
    <>
      {/* Dot */}
      <div
        ref={dot}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: '#fff',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s',
        }}
      />
      {/* Ring */}
      <div
        ref={ring}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
        style={{
          width: ringSize,
          height: ringSize,
          borderRadius: '50%',
          border: hoverState === 'text' ? 'none' : '1.5px solid rgba(255,255,255,0.5)',
          background: hoverState === 'project' ? 'rgba(255,255,255,0.06)' : 'transparent',
          opacity: visible ? 1 : 0,
          transition: 'width 0.4s cubic-bezier(0.22,1,0.36,1), height 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.3s, background 0.3s, border 0.3s',
        }}
      >
        {label && hoverState === 'project' && (
          <span className="text-[10px] font-medium text-white tracking-wider uppercase whitespace-nowrap">
            {label}
          </span>
        )}
      </div>
      {/* Hide default cursor globally */}
      <style jsx global>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>
    </>
  )
}
