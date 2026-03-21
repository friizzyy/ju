'use client'

import { useEffect, useRef } from 'react'

interface Props {
  color?: [number, number, number]
  particleCount?: number
}

export default function AmbientBackground({ color = [0, 180, 220], particleCount = 40 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -9999, y: -9999 })
  const raf = useRef(0)

  useEffect(() => {
    const cvs = canvasRef.current
    if (!cvs) return
    const ctx = cvs.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0, h = 0

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.5 + Math.random() * 1.5,
      vx: (Math.random() - 0.5) * 0.0002,
      vy: (Math.random() - 0.5) * 0.0002,
      a: 0.03 + Math.random() * 0.08,
      phase: Math.random() * Math.PI * 2,
      speed: 0.3 + Math.random() * 1.5,
    }))

    // 2 color blobs
    const blobs = [
      { x: 0.25, y: 0.3, r: 300, speed: 0.03, phase: 0 },
      { x: 0.75, y: 0.7, r: 250, speed: 0.04, phase: 2 },
    ]

    function resize() {
      const r = cvs!.getBoundingClientRect()
      w = r.width; h = r.height
      cvs!.width = w * dpr; cvs!.height = h * dpr
      cvs!.style.width = '100%'; cvs!.style.height = '100%'
    }

    function draw(time: number) {
      const c = ctx!
      c.setTransform(dpr, 0, 0, dpr, 0, 0)
      c.clearRect(0, 0, w, h)

      const t = reduced ? 0 : time * 0.001
      const mx = mouse.current.x, my = mouse.current.y

      // Blobs
      for (const blob of blobs) {
        const bx = (blob.x + Math.sin(t * blob.speed + blob.phase) * 0.1) * w
        const by = (blob.y + Math.cos(t * blob.speed * 0.7 + blob.phase) * 0.08) * h
        const g = c.createRadialGradient(bx, by, 0, bx, by, blob.r)
        g.addColorStop(0, `rgba(${color[0]},${color[1]},${color[2]},0.03)`)
        g.addColorStop(1, `rgba(${color[0]},${color[1]},${color[2]},0)`)
        c.fillStyle = g
        c.fillRect(bx - blob.r, by - blob.r, blob.r * 2, blob.r * 2)
      }

      // Mouse glow
      if (mx > 0) {
        const g = c.createRadialGradient(mx, my, 0, mx, my, 180)
        g.addColorStop(0, `rgba(${color[0]},${color[1]},${color[2]},0.04)`)
        g.addColorStop(1, `rgba(${color[0]},${color[1]},${color[2]},0)`)
        c.fillStyle = g
        c.beginPath(); c.arc(mx, my, 180, 0, Math.PI * 2); c.fill()
      }

      // Particles
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < -0.05) p.x = 1.05
        if (p.x > 1.05) p.x = -0.05
        if (p.y < -0.05) p.y = 1.05
        if (p.y > 1.05) p.y = -0.05

        const twinkle = 0.5 + 0.5 * Math.sin(t * p.speed + p.phase)
        const a = p.a * twinkle

        const px = p.x * w, py = p.y * h
        c.beginPath()
        c.arc(px, py, p.r, 0, Math.PI * 2)
        c.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${a})`
        c.fill()
      }

      raf.current = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          raf.current = requestAnimationFrame(draw)
        } else {
          cancelAnimationFrame(raf.current)
        }
      },
      { threshold: 0.01 }
    )
    observer.observe(cvs)

    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(raf.current); observer.disconnect() }
  }, [color, particleCount])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const r = canvasRef.current?.getBoundingClientRect()
      if (r) mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 } }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseleave', onLeave) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, willChange: 'transform' }}
    />
  )
}
