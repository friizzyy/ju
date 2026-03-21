"use client"
import { useEffect, useRef, useState } from "react"

const CODE_LINES = [
  'const agent = new Zeus()',
  'scout() → 3 leads found',
  '✓ contact enriched',
  'draft email · 112 words',
  'await approval...',
  'proposal.generate()',
  'client.onboard()',
  'system.uptime: 99.9%',
  '→ pipeline: LIVE',
  '[OK] all agents active',
]

interface FloatingNode {
  x: number
  y: number
  r: number
  phase: number
  speedX: number
  speedY: number
}

function generateNodes(): FloatingNode[] {
  const nodes: FloatingNode[] = []
  for (let i = 0; i < 7; i++) {
    nodes.push({
      x: 0.08 + Math.random() * 0.34,
      y: 0.1 + Math.random() * 0.75,
      r: 3 + Math.random() * 2,
      phase: Math.random() * Math.PI * 2,
      speedX: 0.3 + Math.random() * 0.4,
      speedY: 0.2 + Math.random() * 0.5,
    })
  }
  return nodes
}

export default function SplitBrainAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<FloatingNode[]>(generateNodes())
  const [canvasHeight, setCanvasHeight] = useState("280px")

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 640) {
      setCanvasHeight("420px")
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    let startTime: number | null = null

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const observer = new ResizeObserver(() => resize())
    observer.observe(canvas)
    resize()

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp
      const elapsed = timestamp - startTime
      const rect = canvas.getBoundingClientRect()
      const W = rect.width
      const H = rect.height
      const halfW = W / 2

      ctx.clearRect(0, 0, W * 2, H * 2)

      // Intro progress for draw-in (0→1 over 1.5s)
      const introP = Math.min(elapsed / 1500, 1)
      const ease = (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
      const p = ease(introP)

      // ====== LEFT HALF — Studio (Design) ======
      ctx.save()
      ctx.beginPath()
      ctx.rect(0, 0, halfW, H)
      ctx.clip()

      // Browser mockup dimensions
      const mockW = halfW * 0.55
      const mockH = H * 0.6
      const mockX = (halfW - mockW) / 2
      const mockY = (H - mockH) / 2

      // Wireframe blocks staggered draw-in
      const blocks = [
        // Browser outline
        { type: 'rect' as const, x: mockX, y: mockY, w: mockW, h: mockH, stroke: 'rgba(139,92,246,0.2)', delay: 0 },
        // Top bar
        { type: 'fill' as const, x: mockX, y: mockY, w: mockW, h: 24, fill: 'rgba(139,92,246,0.06)', delay: 0.05 },
        // Nav line
        { type: 'line' as const, x1: mockX + 40, y1: mockY + 12, x2: mockX + mockW - 10, y2: mockY + 12, stroke: 'rgba(139,92,246,0.15)', delay: 0.1 },
        // Hero block
        { type: 'rect' as const, x: mockX + 8, y: mockY + 32, w: mockW - 16, h: mockH * 0.3, stroke: 'rgba(139,92,246,0.12)', delay: 0.2 },
        // Two columns
        { type: 'rect' as const, x: mockX + 8, y: mockY + 40 + mockH * 0.3, w: (mockW - 24) * 0.48, h: mockH * 0.2, stroke: 'rgba(139,92,246,0.1)', delay: 0.35 },
        { type: 'rect' as const, x: mockX + 16 + (mockW - 24) * 0.48, y: mockY + 40 + mockH * 0.3, w: (mockW - 24) * 0.48, h: mockH * 0.2, stroke: 'rgba(139,92,246,0.1)', delay: 0.4 },
      ]

      for (const block of blocks) {
        const blockP = Math.max(0, Math.min(1, (p - block.delay) / (1 - block.delay + 0.001)))
        if (blockP <= 0) continue

        const alpha = blockP
        if (block.type === 'rect') {
          ctx.strokeStyle = block.stroke!.replace(/[\d.]+\)$/, `${parseFloat(block.stroke!.match(/[\d.]+\)$/)![0]) * alpha})`)
          ctx.lineWidth = 1
          const r = 4
          const bx = block.x, by = block.y, bw = block.w * blockP, bh = block.h
          ctx.beginPath()
          ctx.moveTo(bx + r, by)
          ctx.lineTo(bx + bw - r, by)
          ctx.arcTo(bx + bw, by, bx + bw, by + r, Math.min(r, bw / 2))
          ctx.lineTo(bx + bw, by + bh - r)
          ctx.arcTo(bx + bw, by + bh, bx + bw - r, by + bh, Math.min(r, bw / 2))
          ctx.lineTo(bx + r, by + bh)
          ctx.arcTo(bx, by + bh, bx, by + bh - r, r)
          ctx.lineTo(bx, by + r)
          ctx.arcTo(bx, by, bx + r, by, r)
          ctx.closePath()
          ctx.stroke()
        } else if (block.type === 'fill') {
          ctx.fillStyle = block.fill!.replace(/[\d.]+\)$/, `${parseFloat(block.fill!.match(/[\d.]+\)$/)![0]) * alpha})`)
          ctx.fillRect(block.x, block.y, block.w, block.h)
        } else if (block.type === 'line') {
          ctx.strokeStyle = block.stroke!.replace(/[\d.]+\)$/, `${parseFloat(block.stroke!.match(/[\d.]+\)$/)![0]) * alpha})`)
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(block.x1!, block.y1!)
          ctx.lineTo(block.x1! + (block.x2! - block.x1!) * blockP, block.y2!)
          ctx.stroke()
        }
      }

      // Browser dots (3 circles)
      if (p > 0.05) {
        const dotAlpha = Math.min(1, (p - 0.05) / 0.2)
        for (let i = 0; i < 3; i++) {
          ctx.fillStyle = `rgba(139,92,246,${0.15 * dotAlpha})`
          ctx.beginPath()
          ctx.arc(mockX + 10 + i * 10, mockY + 12, 3, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Shimmer lines (skeleton loader) — animated width
      if (p > 0.5) {
        const shimAlpha = Math.min(1, (p - 0.5) / 0.3)
        const shimmerLines = [0.38, 0.44, 0.50, 0.56, 0.68, 0.72]
        for (let i = 0; i < shimmerLines.length; i++) {
          const sy = shimmerLines[i]
          const lineY = mockY + mockH * sy
          const lineW = mockW * (0.2 + 0.15 * Math.abs(Math.sin(elapsed * 0.0008 + i * 0.8)))
          ctx.strokeStyle = `rgba(139,92,246,${0.06 * shimAlpha})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(mockX + 12, lineY)
          ctx.lineTo(mockX + 12 + lineW, lineY)
          ctx.stroke()
        }
        // Typewriter cursor at end of first shimmer line
        if (p >= 1) {
          const twLineY = mockY + mockH * shimmerLines[0]
          const twLineW = mockW * (0.2 + 0.15 * Math.abs(Math.sin(elapsed * 0.0008)))
          const twAlpha = Math.abs(Math.sin(elapsed * 0.004))
          ctx.fillStyle = `rgba(139,92,246,${0.4 * twAlpha})`
          ctx.fillRect(mockX + 12 + twLineW + 2, twLineY - 5, 1.5, 10)
        }
      }

      // Floating nodes
      const nodes = nodesRef.current
      if (p > 0.3) {
        const nodeAlpha = Math.min(1, (p - 0.3) / 0.4)
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i]
          const nx = n.x * halfW + Math.sin(elapsed * 0.001 * n.speedX + n.phase) * 6
          const ny = n.y * H + Math.cos(elapsed * 0.001 * n.speedY + n.phase) * 4

          ctx.fillStyle = `rgba(139,92,246,${0.2 * nodeAlpha})`
          ctx.beginPath()
          ctx.arc(nx, ny, n.r, 0, Math.PI * 2)
          ctx.fill()

          // Connect nearby nodes
          for (let j = i + 1; j < nodes.length; j++) {
            const m = nodes[j]
            const mx = m.x * halfW + Math.sin(elapsed * 0.001 * m.speedX + m.phase) * 6
            const my = m.y * H + Math.cos(elapsed * 0.001 * m.speedY + m.phase) * 4
            const dist = Math.hypot(nx - mx, ny - my)
            if (dist < 80) {
              ctx.strokeStyle = `rgba(139,92,246,${0.06 * nodeAlpha * (1 - dist / 80)})`
              ctx.lineWidth = 0.5
              ctx.beginPath()
              ctx.moveTo(nx, ny)
              ctx.lineTo(mx, my)
              ctx.stroke()
            }
          }
        }

        // Pulse glow on first node near mockup
        const pulseN = nodes[0]
        const pnx = pulseN.x * halfW + Math.sin(elapsed * 0.001 * pulseN.speedX + pulseN.phase) * 6
        const pny = pulseN.y * H + Math.cos(elapsed * 0.001 * pulseN.speedY + pulseN.phase) * 4
        const pulseR = 8 + 4 * Math.sin(elapsed * 0.002)
        const grad = ctx.createRadialGradient(pnx, pny, 0, pnx, pny, pulseR)
        grad.addColorStop(0, `rgba(139,92,246,${0.12 * nodeAlpha})`)
        grad.addColorStop(1, 'rgba(139,92,246,0)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(pnx, pny, pulseR, 0, Math.PI * 2)
        ctx.fill()
      }

      // ====== Left-side ongoing animations (after draw-in) ======
      if (p >= 1) {
        // A — Blinking cursor in hero block
        const cursorAlpha = Math.abs(Math.sin(elapsed * 0.003))
        ctx.fillStyle = `rgba(139,92,246,${0.5 * cursorAlpha})`
        ctx.fillRect(mockX + 16, mockY + 48, 2, 14)

        // B — Selection box cycling between blocks
        if (elapsed > 2000) {
          const cycleTime = 3000
          const selElapsed = elapsed - 2000
          const phase = (selElapsed % cycleTime) / cycleTime
          // 3 targets: hero, left col, right col
          const heroRect = { x: mockX + 8, y: mockY + 32, w: mockW - 16, h: mockH * 0.3 }
          const colW = (mockW - 24) * 0.48
          const colY = mockY + 40 + mockH * 0.3
          const colH = mockH * 0.2
          const leftCol = { x: mockX + 8, y: colY, w: colW, h: colH }
          const rightCol = { x: mockX + 16 + colW, y: colY, w: colW, h: colH }
          const targets = [heroRect, leftCol, rightCol]

          const segLen = 1 / 3
          const segIdx = Math.min(2, Math.floor(phase / segLen))
          const segP = (phase - segIdx * segLen) / segLen
          const tgt = targets[segIdx]

          // Grow from 0 to full width in first 0.5 of segment, hold, then fade
          const growP = Math.min(1, segP / 0.5)
          const fadeP = segP > 0.7 ? 1 - (segP - 0.7) / 0.3 : 1

          ctx.save()
          ctx.setLineDash([3, 3])
          ctx.strokeStyle = `rgba(139,92,246,${0.3 * fadeP})`
          ctx.lineWidth = 1
          ctx.strokeRect(tgt.x, tgt.y, tgt.w * growP, tgt.h)
          ctx.setLineDash([])
          ctx.restore()
        }

        // D — Hero block breathing highlight
        const breathAlpha = 0.02 + 0.015 * Math.sin(elapsed * 0.001)
        ctx.fillStyle = `rgba(139,92,246,${breathAlpha})`
        ctx.fillRect(mockX + 8, mockY + 32, mockW - 16, mockH * 0.3)
      }

      ctx.restore()

      // ====== RIGHT HALF — Systems (Code) ======
      ctx.save()
      ctx.beginPath()
      ctx.rect(halfW, 0, halfW, H)
      ctx.clip()

      // Terminal panel dimensions
      const termW = halfW * 0.6
      const termH = H * 0.6
      const termX = halfW + (halfW - termW) / 2
      const termY = (H - termH) / 2

      if (p > 0.1) {
        const termAlpha = Math.min(1, (p - 0.1) / 0.4)

        // Terminal background
        const r = 6
        ctx.fillStyle = `rgba(13,17,23,${0.8 * termAlpha})`
        ctx.strokeStyle = `rgba(99,102,241,${0.2 * termAlpha})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(termX + r, termY)
        ctx.lineTo(termX + termW - r, termY)
        ctx.arcTo(termX + termW, termY, termX + termW, termY + r, r)
        ctx.lineTo(termX + termW, termY + termH - r)
        ctx.arcTo(termX + termW, termY + termH, termX + termW - r, termY + termH, r)
        ctx.lineTo(termX + r, termY + termH)
        ctx.arcTo(termX, termY + termH, termX, termY + termH - r, r)
        ctx.lineTo(termX, termY + r)
        ctx.arcTo(termX, termY, termX + r, termY, r)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()

        // Top bar
        ctx.fillStyle = `rgba(99,102,241,${0.06 * termAlpha})`
        ctx.fillRect(termX + 1, termY + 1, termW - 2, 20)

        // Pulsing dot in top bar
        const dotPulse = 0.4 + 0.3 * Math.sin(elapsed * 0.003)
        ctx.fillStyle = `rgba(99,102,241,${dotPulse * termAlpha})`
        ctx.beginPath()
        ctx.arc(termX + 12, termY + 11, 3, 0, Math.PI * 2)
        ctx.fill()

        // Code lines — scrolling
        if (p > 0.35) {
          const codeAlpha = Math.min(1, (p - 0.35) / 0.3)
          ctx.save()
          ctx.beginPath()
          ctx.rect(termX + 4, termY + 24, termW - 8, termH - 28)
          ctx.clip()

          ctx.font = '10px Courier, monospace'
          const lineH = 18
          const totalLines = CODE_LINES.length
          const scrollOffset = (elapsed * 0.015) % (totalLines * lineH)

          for (let i = -1; i < Math.ceil((termH - 24) / lineH) + 1; i++) {
            const lineIdx = ((Math.floor(scrollOffset / lineH) + i) % totalLines + totalLines) % totalLines
            const yPos = termY + 38 + i * lineH - (scrollOffset % lineH)

            if (yPos < termY + 22 || yPos > termY + termH - 4) continue

            const text = CODE_LINES[lineIdx]
            // Prefix with > for some lines
            const prefix = text.startsWith('✓') || text.startsWith('→') || text.startsWith('[') ? '' : '> '

            // Color: brighter for active-looking lines
            const isActive = text.includes('LIVE') || text.includes('active') || text.startsWith('✓')
            const opacity = isActive ? 0.5 : 0.3

            ctx.fillStyle = `rgba(99,102,241,${opacity * codeAlpha})`
            ctx.fillText(prefix + text, termX + 10, yPos)
          }

          ctx.restore()
        }
      }

      ctx.restore()

      // ====== CENTER DIVIDING LINE ======
      // Soft glow
      const glowGrad = ctx.createLinearGradient(halfW - 8, 0, halfW + 8, 0)
      glowGrad.addColorStop(0, 'transparent')
      glowGrad.addColorStop(0.5, `rgba(255,255,255,${0.03 * p})`)
      glowGrad.addColorStop(1, 'transparent')
      ctx.fillStyle = glowGrad
      ctx.fillRect(halfW - 8, 0, 16, H)

      // The line itself
      ctx.strokeStyle = `rgba(255,255,255,${0.1 * p})`
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(halfW, 0)
      ctx.lineTo(halfW, H)
      ctx.stroke()


      animId = requestAnimationFrame(animate)
    }

    animId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animId)
      observer.disconnect()
    }
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: canvasHeight }} />
    </div>
  )
}
