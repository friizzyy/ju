"use client"
import { useEffect, useRef, useState, useCallback } from "react"

const BUILDINGS = [
  { x: 0.02, w: 0.04, h: 0.45 },
  { x: 0.07, w: 0.03, h: 0.60 },
  { x: 0.11, w: 0.05, h: 0.75 },
  { x: 0.17, w: 0.04, h: 0.55 },
  { x: 0.22, w: 0.06, h: 0.50 },
  { x: 0.29, w: 0.03, h: 0.65 },
  { x: 0.33, w: 0.04, h: 0.70 },
  { x: 0.38, w: 0.05, h: 0.80 },
  { x: 0.44, w: 0.03, h: 0.60 },
  { x: 0.50, w: 0.03, h: 0.55 },
  { x: 0.54, w: 0.05, h: 0.72 },
  { x: 0.60, w: 0.04, h: 0.65 },
  { x: 0.65, w: 0.06, h: 0.58 },
  { x: 0.72, w: 0.03, h: 0.70 },
  { x: 0.76, w: 0.05, h: 0.50 },
  { x: 0.82, w: 0.04, h: 0.45 },
  { x: 0.87, w: 0.03, h: 0.60 },
  { x: 0.91, w: 0.05, h: 0.40 },
  { x: 0.97, w: 0.03, h: 0.35 },
]

const TERMINAL_FRAGMENTS = [
  "agent.run()", "scout()", "04:23", "OK", "→", "128", "deploy()",
  "sync", "pipe", "0x3F", "true", ">>", "null", "ACK", "cfg.load",
  "emit()", "ws://", "node_3", "pid:92", "rpc.ok", "Job #41",
]

const BASELINE = 0.85

interface Star {
  x: number
  y: number
  phase: number
  side: "left" | "right"
}

interface WindowRect {
  bx: number
  by: number
  bw: number
  bh: number
  wx: number
  wy: number
  lit: boolean
}

interface TerminalLine {
  buildingIdx: number
  text: string
  y: number
  x: number
}

function generateStars(): Star[] {
  const stars: Star[] = []
  for (let i = 0; i < 40; i++) {
    stars.push({
      x: Math.random(),
      y: Math.random() * 0.15,
      phase: Math.random() * Math.PI * 2,
      side: Math.random() < 0.5 ? "left" : "right",
    })
  }
  return stars
}

function generateWindows(): WindowRect[] {
  const windows: WindowRect[] = []
  for (let i = 0; i < BUILDINGS.length; i++) {
    const b = BUILDINGS[i]
    const count = 2 + Math.floor(Math.random() * 3)
    for (let j = 0; j < count; j++) {
      windows.push({
        bx: b.x,
        by: BASELINE - b.h,
        bw: b.w,
        bh: b.h,
        wx: b.x + b.w * (0.15 + Math.random() * 0.6),
        wy: BASELINE - b.h + b.h * (0.1 + Math.random() * 0.75),
        lit: Math.random() < 0.4,
      })
    }
  }
  return windows
}

function generateTerminalLines(): TerminalLine[] {
  const lines: TerminalLine[] = []
  for (let i = 9; i < BUILDINGS.length; i++) {
    const b = BUILDINGS[i]
    const count = 3 + Math.floor(Math.random() * 5)
    for (let j = 0; j < count; j++) {
      lines.push({
        buildingIdx: i,
        text: TERMINAL_FRAGMENTS[Math.floor(Math.random() * TERMINAL_FRAGMENTS.length)],
        y: Math.random(),
        x: b.x + b.w * (0.1 + Math.random() * 0.5),
      })
    }
  }
  return lines
}

export default function SFSkylineAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mounted, setMounted] = useState(false)
  const [canvasHeight, setCanvasHeight] = useState("320px")
  const starsRef = useRef<Star[]>(generateStars())
  const windowsRef = useRef<WindowRect[]>(generateWindows())
  const terminalLinesRef = useRef<TerminalLine[]>(generateTerminalLines())

  const draw = useCallback((ctx: CanvasRenderingContext2D, W: number, H: number, progress: number, time: number) => {
    ctx.clearRect(0, 0, W, H)
    ctx.fillStyle = "#080B10"
    ctx.fillRect(0, 0, W, H)

    const baseY = H * BASELINE
    const halfW = W / 2

    // Ease progress
    const ease = (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
    const p = ease(Math.min(progress, 1))

    // ====== LEFT SIDE — Studio (wireframe) ======
    ctx.save()
    ctx.beginPath()
    ctx.rect(0, 0, halfW, H)
    ctx.clip()

    for (let i = 0; i < BUILDINGS.length; i++) {
      const b = BUILDINGS[i]
      const bx = b.x * W
      const bw = b.w * W
      if (bx + bw < 0 || bx > halfW) continue

      // Stagger: each building starts drawing at a different time
      const stagger = i * 0.04
      const buildP = Math.max(0, Math.min(1, (p - stagger) / (1 - stagger + 0.001)))
      if (buildP <= 0) continue

      const fullH = b.h * H
      const drawH = fullH * buildP
      const top = baseY - drawH
      const fullTop = baseY - fullH

      // Outline
      ctx.strokeStyle = "rgba(139,92,246,0.35)"
      ctx.lineWidth = 1
      ctx.strokeRect(bx, top, bw, drawH)

      // Horizontal scan lines
      if (buildP > 0.3) {
        ctx.strokeStyle = "rgba(139,92,246,0.08)"
        ctx.lineWidth = 0.5
        for (let sy = baseY - 12; sy > fullTop; sy -= 12) {
          if (sy < top) continue
          ctx.beginPath()
          ctx.moveTo(bx + 1, sy)
          ctx.lineTo(bx + bw - 1, sy)
          ctx.stroke()
        }
      }
    }

    // Left windows
    if (p > 0.4) {
      const wAlpha = Math.min(1, (p - 0.4) / 0.3)
      for (const win of windowsRef.current) {
        const wx = win.wx * W
        const wy = win.wy * H
        if (wx > halfW) continue
        if (wy < baseY - BUILDINGS.find(b => b.x === win.bx)!.h * H * p) continue
        ctx.strokeStyle = `rgba(139,92,246,${0.2 * wAlpha})`
        ctx.lineWidth = 0.5
        ctx.strokeRect(wx, wy, 4, 4)
        if (win.lit) {
          ctx.fillStyle = `rgba(139,92,246,${0.15 * wAlpha})`
          ctx.fillRect(wx, wy, 4, 4)
        }
      }
    }

    // Left stars
    for (const star of starsRef.current) {
      if (star.side !== "left") continue
      const sx = star.x * halfW
      const sy = star.y * H
      const alpha = 0.15 + 0.15 * Math.sin(time * 0.001 + star.phase)
      ctx.fillStyle = `rgba(139,92,246,${alpha * p})`
      ctx.fillRect(sx, sy, 1, 1)
    }

    ctx.restore()

    // ====== RIGHT SIDE — Systems (terminal) ======
    ctx.save()
    ctx.beginPath()
    ctx.rect(halfW, 0, halfW, H)
    ctx.clip()

    for (let i = 0; i < BUILDINGS.length; i++) {
      const b = BUILDINGS[i]
      const bx = b.x * W
      const bw = b.w * W
      if (bx + bw < halfW || bx > W) continue

      const stagger = i * 0.04
      const buildP = Math.max(0, Math.min(1, (p - stagger) / (1 - stagger + 0.001)))
      if (buildP <= 0) continue

      const fullH = b.h * H
      const drawH = fullH * buildP
      const top = baseY - drawH

      // Solid fill
      ctx.fillStyle = "rgba(99,102,241,0.06)"
      ctx.fillRect(bx, top, bw, drawH)
      ctx.strokeStyle = "rgba(99,102,241,0.25)"
      ctx.lineWidth = 1
      ctx.strokeRect(bx, top, bw, drawH)
    }

    // Terminal text scrolling
    if (p > 0.5) {
      const tAlpha = Math.min(1, (p - 0.5) / 0.3)
      ctx.font = "9px monospace"
      for (const line of terminalLinesRef.current) {
        const b = BUILDINGS[line.buildingIdx]
        const bx = b.x * W
        const bw = b.w * W
        if (bx + bw < halfW) continue

        const fullH = b.h * H
        const top = baseY - fullH
        // Scroll upward
        const scrollOffset = (time * 0.008 + line.y * 500) % (fullH + 20) - 10
        const ty = top + scrollOffset
        if (ty < top || ty > baseY - 4) continue
        const tx = line.x * W
        if (tx < bx + 2 || tx > bx + bw - 10) continue
        ctx.fillStyle = `rgba(99,102,241,${0.2 * tAlpha})`
        ctx.fillText(line.text, tx, ty)
      }
    }

    // Right windows
    if (p > 0.4) {
      const wAlpha = Math.min(1, (p - 0.4) / 0.3)
      for (const win of windowsRef.current) {
        const wx = win.wx * W
        const wy = win.wy * H
        if (wx < halfW) continue
        if (wy < baseY - BUILDINGS.find(b => b.x === win.bx)!.h * H * p) continue
        const blink = win.lit ? 0.5 + 0.5 * Math.sin(time * 0.003 + wx) : 1
        ctx.fillStyle = `rgba(99,102,241,${0.3 * wAlpha * blink})`
        ctx.fillRect(wx, wy, 4, 4)
      }
    }

    // Right stars
    for (const star of starsRef.current) {
      if (star.side !== "right") continue
      const sx = halfW + star.x * halfW
      const sy = star.y * H
      const alpha = 0.15 + 0.15 * Math.sin(time * 0.001 + star.phase)
      ctx.fillStyle = `rgba(99,102,241,${alpha * p})`
      ctx.fillRect(sx, sy, 1, 1)
    }

    ctx.restore()

    // ====== CENTER DIVIDING LINE ======
    // Soft glow behind
    const glowGrad = ctx.createLinearGradient(halfW - 10, 0, halfW + 10, 0)
    glowGrad.addColorStop(0, "transparent")
    glowGrad.addColorStop(0.5, "rgba(255,255,255,0.04)")
    glowGrad.addColorStop(1, "transparent")
    ctx.fillStyle = glowGrad
    ctx.fillRect(halfW - 10, 0, 20, H)

    // Center line
    ctx.strokeStyle = "rgba(255,255,255,0.12)"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(halfW, 0)
    ctx.lineTo(halfW, H)
    ctx.stroke()

    // ====== GROUND / HORIZON LINE ======
    // Left ground
    ctx.strokeStyle = "rgba(139,92,246,0.15)"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(0, baseY)
    ctx.lineTo(halfW, baseY)
    ctx.stroke()

    // Right ground
    ctx.strokeStyle = "rgba(99,102,241,0.15)"
    ctx.beginPath()
    ctx.moveTo(halfW, baseY)
    ctx.lineTo(W, baseY)
    ctx.stroke()

    // Faint white overlay on ground
    ctx.strokeStyle = "rgba(255,255,255,0.06)"
    ctx.beginPath()
    ctx.moveTo(0, baseY)
    ctx.lineTo(W, baseY)
    ctx.stroke()
  }, [])

  useEffect(() => {
    setMounted(true)
    if (typeof window !== "undefined" && window.innerWidth >= 640) {
      setCanvasHeight("480px")
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
      const progress = Math.min(elapsed / 1500, 1)

      const rect = canvas.getBoundingClientRect()
      draw(ctx, rect.width, rect.height, progress, elapsed)
      animId = requestAnimationFrame(animate)
    }

    animId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animId)
      observer.disconnect()
    }
  }, [draw])

  return (
    <div style={{ position: "relative", width: "100%", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.05)" }}>
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: canvasHeight }} />
      {mounted && (
        <>
          {/* Left label — Studio */}
          <div style={{ position: "absolute", left: "18%", bottom: "22%", transform: "translateX(-50%)" }}>
            <p style={{ fontFamily: "monospace", fontSize: "9px", color: "rgba(139,92,246,0.5)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "4px" }}>JU. Studio</p>
            <p style={{ fontFamily: "monospace", fontSize: "9px", color: "rgba(139,92,246,0.25)", letterSpacing: "0.15em" }}>Design &middot; Build &middot; Ship</p>
          </div>

          {/* Right label — Systems */}
          <div style={{ position: "absolute", right: "18%", bottom: "22%", transform: "translateX(50%)" }}>
            <p style={{ fontFamily: "monospace", fontSize: "9px", color: "rgba(99,102,241,0.5)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "4px", textAlign: "right" }}>JU. Systems</p>
            <p style={{ fontFamily: "monospace", fontSize: "9px", color: "rgba(99,102,241,0.25)", letterSpacing: "0.15em", textAlign: "right" }}>Automate &middot; Deploy &middot; Run</p>
          </div>

          {/* Center label */}
          <div style={{ position: "absolute", left: "50%", top: "10%", transform: "translateX(-50%)" }}>
            <div style={{ width: "1px", height: "20px", background: "rgba(255,255,255,0.1)", margin: "0 auto 8px" }} />
            <p style={{ fontFamily: "monospace", fontSize: "8px", color: "rgba(255,255,255,0.15)", letterSpacing: "0.25em", textTransform: "uppercase", whiteSpace: "nowrap" }}>San Francisco, CA</p>
          </div>
        </>
      )}
    </div>
  )
}
