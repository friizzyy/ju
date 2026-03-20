'use client'

import { useEffect, useRef, useCallback } from 'react'

const NODES = [
  { name: 'Zeus',       domain: 'Command',       color: '#FFD700', x:  0.00, y: -0.04, scale: 1.5 },
  { name: 'Athena',     domain: 'Intelligence',   color: '#00D4FF', x: -0.40, y: -0.36, scale: 1.0 },
  { name: 'Hermes',     domain: 'Outreach',       color: '#38BDF8', x:  0.42, y: -0.40, scale: 1.0 },
  { name: 'Ares',       domain: 'Execution',      color: '#06B6D4', x: -0.56, y:  0.10, scale: 1.0 },
  { name: 'Hephaestus', domain: 'Builder',        color: '#0891B2', x:  0.58, y:  0.06, scale: 1.0 },
  { name: 'Prometheus', domain: 'Learning',       color: '#22D3EE', x: -0.30, y:  0.42, scale: 1.0 },
  { name: 'Apollo',     domain: 'Creative',       color: '#67E8F9', x:  0.34, y:  0.38, scale: 1.0 },
  { name: 'Iris',       domain: 'Communication',  color: '#7DD3FC', x: -0.08, y:  0.54, scale: 1.0 },
  { name: 'Dionysus',   domain: 'Engagement',     color: '#A5F3FC', x:  0.22, y:  0.60, scale: 1.0 },
]

const EDGES: [number, number][] = [
  [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],
  [1,2],[1,5],[2,7],[3,4],[6,8],[7,8],[5,3],[4,6],[3,5],[2,4],
]

function hexRgb(hex: string) {
  return [parseInt(hex.slice(1,3),16), parseInt(hex.slice(3,5),16), parseInt(hex.slice(5,7),16)] as const
}

interface Props { className?: string; interactive?: boolean }

export default function PantheonNetwork({ className = '', interactive = true }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -9999, y: -9999 })
  const ripples = useRef<{ x: number; y: number; r: number; a: number; maxR: number }[]>([])
  const raf = useRef(0)

  const onClick = useCallback((e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    ripples.current.push({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      r: 0, a: 0.5, maxR: 300 + Math.random() * 200,
    })
  }, [])

  useEffect(() => {
    const cvs = canvasRef.current
    if (!cvs) return
    const ctx = cvs.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0, h = 0

    // ── Nebula clouds — large color blobs that drift ──
    const nebulae = [
      { x: 0.3, y: 0.25, r: 350, color: [0, 60, 120],    speed: 0.08, phase: 0 },
      { x: 0.7, y: 0.35, r: 280, color: [0, 140, 180],    speed: 0.06, phase: 2 },
      { x: 0.2, y: 0.65, r: 320, color: [40, 10, 90],      speed: 0.05, phase: 4 },
      { x: 0.8, y: 0.7,  r: 250, color: [120, 100, 0],     speed: 0.07, phase: 1 },
      { x: 0.5, y: 0.5,  r: 400, color: [0, 100, 140],     speed: 0.04, phase: 3 },
    ]

    // ── Stars — 3 depth layers ──
    const stars = Array.from({ length: 350 }, () => {
      const layer = Math.random() < 0.2 ? 2 : Math.random() < 0.5 ? 1 : 0
      return {
        x: Math.random(), y: Math.random(),
        r: layer === 2 ? 1.2 + Math.random() * 1.8 : layer === 1 ? 0.6 + Math.random() * 1 : 0.3 + Math.random() * 0.5,
        a: layer === 2 ? 0.15 + Math.random() * 0.35 : layer === 1 ? 0.08 + Math.random() * 0.2 : 0.04 + Math.random() * 0.1,
        ts: 0.2 + Math.random() * 2,
        tp: Math.random() * Math.PI * 2,
        layer,
      }
    })

    // ── Node state ──
    const ns = NODES.map(() => ({
      px: 0, py: 0,
      pX: Math.random() * Math.PI * 2,
      pY: Math.random() * Math.PI * 2,
      spd: 0.10 + Math.random() * 0.06,
      amp: 5 + Math.random() * 15,
      hover: 0,
    }))

    // ── Pulses ──
    const pulses = EDGES.flatMap((_, i) =>
      Array.from({ length: 3 }, (__, j) => ({
        e: i, p: (j / 3 + Math.random() * 0.2) % 1,
        s: 0.0008 + Math.random() * 0.0025,
      }))
    )

    function resize() {
      const r = cvs!.parentElement?.getBoundingClientRect()
      if (!r) return
      w = r.width; h = r.height
      cvs!.width = w * dpr; cvs!.height = h * dpr
      cvs!.style.width = w + 'px'; cvs!.style.height = h + 'px'
    }

    function draw(time: number) {
      const c = ctx!
      c.setTransform(dpr, 0, 0, dpr, 0, 0)
      c.clearRect(0, 0, w, h)

      const t = reduced ? 0 : time * 0.001
      const mob = w < 640
      const sc = Math.min(w, h) * (mob ? 0.34 : 0.42)
      const cx = w / 2, cy = h / 2
      const mx = mouse.current.x, my = mouse.current.y

      // ━━ Nebula clouds ━━
      for (const nb of nebulae) {
        const nx = (nb.x + Math.sin(t * nb.speed + nb.phase) * 0.08) * w
        const ny = (nb.y + Math.cos(t * nb.speed * 0.7 + nb.phase) * 0.06) * h
        const nr = nb.r * (mob ? 0.6 : 1)
        const grad = c.createRadialGradient(nx, ny, 0, nx, ny, nr)
        grad.addColorStop(0, `rgba(${nb.color[0]},${nb.color[1]},${nb.color[2]},0.06)`)
        grad.addColorStop(0.5, `rgba(${nb.color[0]},${nb.color[1]},${nb.color[2]},0.025)`)
        grad.addColorStop(1, `rgba(${nb.color[0]},${nb.color[1]},${nb.color[2]},0)`)
        c.fillStyle = grad
        c.fillRect(nx - nr, ny - nr, nr * 2, nr * 2)
      }

      // ━━ Stars ━━
      for (const s of stars) {
        const twinkle = 0.5 + 0.5 * Math.sin(t * s.ts + s.tp)
        const a = s.a * twinkle
        // Slight parallax on mouse
        const parallax = s.layer * 0.015
        const sx = s.x * w + (mx > 0 ? (mx - w/2) * parallax : 0)
        const sy = s.y * h + (my > 0 ? (my - h/2) * parallax : 0)
        c.beginPath()
        c.arc(sx, sy, s.r, 0, Math.PI * 2)
        c.fillStyle = `rgba(200,220,255,${a})`
        c.fill()
        // Bigger stars get a glow
        if (s.layer === 2) {
          const sg = c.createRadialGradient(sx, sy, 0, sx, sy, s.r * 4)
          sg.addColorStop(0, `rgba(200,220,255,${a * 0.3})`)
          sg.addColorStop(1, `rgba(200,220,255,0)`)
          c.fillStyle = sg
          c.beginPath(); c.arc(sx, sy, s.r * 4, 0, Math.PI * 2); c.fill()
        }
      }

      // ━━ Mouse glow — soft light following cursor ━━
      if (mx > 0 && !mob) {
        const mgr = 220
        const mg = c.createRadialGradient(mx, my, 0, mx, my, mgr)
        mg.addColorStop(0, 'rgba(0,180,220,0.06)')
        mg.addColorStop(0.4, 'rgba(0,140,200,0.025)')
        mg.addColorStop(1, 'rgba(0,100,150,0)')
        c.fillStyle = mg
        c.beginPath(); c.arc(mx, my, mgr, 0, Math.PI * 2); c.fill()
      }

      // ━━ Click ripples ━━
      const rip = ripples.current
      for (let i = rip.length - 1; i >= 0; i--) {
        const r = rip[i]
        r.r += 3
        r.a *= 0.97
        if (r.a < 0.005 || r.r > r.maxR) { rip.splice(i, 1); continue }
        c.beginPath(); c.arc(r.x, r.y, r.r, 0, Math.PI * 2)
        c.strokeStyle = `rgba(0,212,255,${r.a})`
        c.lineWidth = 1.5; c.stroke()
        // Inner ripple
        if (r.r > 20) {
          c.beginPath(); c.arc(r.x, r.y, r.r * 0.6, 0, Math.PI * 2)
          c.strokeStyle = `rgba(0,212,255,${r.a * 0.4})`
          c.lineWidth = 1; c.stroke()
        }
      }

      // ━━ Update nodes ━━
      NODES.forEach((n, i) => {
        const s = ns[i]
        let px = cx + n.x * sc
        let py = cy + n.y * sc
        if (!reduced) {
          px += Math.sin(t * s.spd + s.pX) * s.amp
          py += Math.cos(t * s.spd * 0.7 + s.pY) * s.amp
        }
        if (interactive && !mob && mx > 0) {
          const dx = mx - px, dy = my - py
          const d = Math.sqrt(dx*dx + dy*dy)
          if (d < 300 && d > 1) {
            const f = ((300-d)/300) * 30
            px += (dx/d)*f; py += (dy/d)*f
          }
        }
        s.px = px; s.py = py
        if (interactive && !mob) {
          const dx = mx - px, dy = my - py
          const hov = Math.sqrt(dx*dx+dy*dy) < 70 ? 1 : 0
          s.hover += (hov - s.hover) * 0.08
        }
      })

      // ━━ Edges ━━
      for (const [fi, ti] of EDGES) {
        const a = ns[fi], b = ns[ti]
        const grad = c.createLinearGradient(a.px, a.py, b.px, b.py)
        const cA = hexRgb(NODES[fi].color), cB = hexRgb(NODES[ti].color)
        grad.addColorStop(0, `rgba(${cA[0]},${cA[1]},${cA[2]},0.12)`)
        grad.addColorStop(0.5, `rgba(0,180,220,0.04)`)
        grad.addColorStop(1, `rgba(${cB[0]},${cB[1]},${cB[2]},0.12)`)
        c.beginPath(); c.moveTo(a.px, a.py); c.lineTo(b.px, b.py)
        c.strokeStyle = grad; c.lineWidth = mob ? 1 : 1.5; c.stroke()
      }

      // ━━ Pulses ━━
      if (!reduced) {
        for (const pulse of pulses) {
          pulse.p = (pulse.p + pulse.s) % 1
          const [fi,ti] = EDGES[pulse.e]
          const a = ns[fi], b = ns[ti]
          for (let tr = 0; tr < 6; tr++) {
            const pp = pulse.p - tr * 0.015
            if (pp < 0 || pp > 1) continue
            const px = a.px + (b.px - a.px) * pp
            const py = a.py + (b.py - a.py) * pp
            const fade = 1 - tr / 6
            const rr = (mob ? 3 : 5) * fade + 1
            const al = fade * 0.6
            const g = c.createRadialGradient(px, py, 0, px, py, rr)
            g.addColorStop(0, `rgba(0,212,255,${al})`)
            g.addColorStop(1, `rgba(0,212,255,0)`)
            c.beginPath(); c.arc(px, py, rr, 0, Math.PI*2)
            c.fillStyle = g; c.fill()
          }
        }
      }

      // ━━ Nodes ━━
      NODES.forEach((n, i) => {
        const s = ns[i]
        const [r,g,b] = hexRgb(n.color)
        const isZeus = i === 0
        const breathe = reduced ? 1 : 1 + Math.sin(t * 1.2 + i * 0.8) * 0.15
        const hovBoost = 1 + s.hover * 0.6
        const baseGlow = (mob ? 55 : 100) * n.scale * breathe * hovBoost

        // ── Outer glow ──
        const og = c.createRadialGradient(s.px, s.py, 0, s.px, s.py, baseGlow)
        og.addColorStop(0, `rgba(${r},${g},${b},${0.14 * hovBoost})`)
        og.addColorStop(0.3, `rgba(${r},${g},${b},${0.06 * hovBoost})`)
        og.addColorStop(1, `rgba(${r},${g},${b},0)`)
        c.beginPath(); c.arc(s.px, s.py, baseGlow, 0, Math.PI*2)
        c.fillStyle = og; c.fill()

        // ── Mid glow ──
        const midR = (mob ? 20 : 35) * n.scale * hovBoost
        const mg = c.createRadialGradient(s.px, s.py, 0, s.px, s.py, midR)
        mg.addColorStop(0, `rgba(${r},${g},${b},0.4)`)
        mg.addColorStop(1, `rgba(${r},${g},${b},0)`)
        c.beginPath(); c.arc(s.px, s.py, midR, 0, Math.PI*2)
        c.fillStyle = mg; c.fill()

        // ── Ring — expands on hover ──
        const ringR = (mob ? 8 : 13) * n.scale * (1 + s.hover * 0.3)
        c.beginPath(); c.arc(s.px, s.py, ringR, 0, Math.PI*2)
        c.strokeStyle = `rgba(${r},${g},${b},${0.35 + s.hover * 0.4})`
        c.lineWidth = mob ? 1 : 1.5; c.stroke()

        // ── Second ring on hover ──
        if (s.hover > 0.1 && !mob) {
          const r2 = ringR * 1.6
          c.beginPath(); c.arc(s.px, s.py, r2, 0, Math.PI*2)
          c.strokeStyle = `rgba(${r},${g},${b},${s.hover * 0.15})`
          c.lineWidth = 1; c.stroke()
        }

        // ── Core ──
        const coreR = (mob ? 3 : 5) * n.scale
        c.beginPath(); c.arc(s.px, s.py, coreR, 0, Math.PI*2)
        c.fillStyle = `rgba(${r},${g},${b},${0.9 + s.hover * 0.1})`
        c.fill()

        // ── Zeus starburst ──
        if (isZeus && !mob) {
          for (let ray = 0; ray < 12; ray++) {
            const angle = (ray / 12) * Math.PI * 2 + t * 0.12
            const len = (28 + s.hover * 15) * breathe
            c.beginPath()
            c.moveTo(s.px + Math.cos(angle) * 16, s.py + Math.sin(angle) * 16)
            c.lineTo(s.px + Math.cos(angle) * len, s.py + Math.sin(angle) * len)
            c.strokeStyle = `rgba(${r},${g},${b},${(0.1 + s.hover * 0.1) * breathe})`
            c.lineWidth = 1; c.stroke()
          }
        }

        // ── Orbiting particles ──
        if (!reduced && !mob) {
          const nOrb = isZeus ? 5 : 3
          const orbR = (isZeus ? 30 : 22) * (1 + s.hover * 0.3)
          for (let o = 0; o < nOrb; o++) {
            const a = t * (0.35 + o * 0.12) + o * (Math.PI * 2 / nOrb) + i * 1.1
            const ox = s.px + Math.cos(a) * orbR * n.scale
            const oy = s.py + Math.sin(a) * orbR * n.scale
            const pr = 1.5 + s.hover * 0.8
            c.beginPath(); c.arc(ox, oy, pr, 0, Math.PI*2)
            c.fillStyle = `rgba(${r},${g},${b},${0.4 + s.hover * 0.3})`; c.fill()
          }
        }

        // ── Labels ──
        if (!mob) {
          const labelY = s.py + ringR * n.scale + 20
          const baseAlpha = 0.5 + s.hover * 0.45
          c.textAlign = 'center'
          c.font = `700 ${isZeus ? 14 : 12}px Inter, system-ui, sans-serif`
          c.fillStyle = `rgba(${r},${g},${b},${baseAlpha})`
          c.fillText(n.name, s.px, labelY)
          c.font = `500 9px "JetBrains Mono", monospace`
          c.fillStyle = `rgba(${r},${g},${b},${baseAlpha * 0.5})`
          c.fillText(n.domain.toUpperCase(), s.px, labelY + 15)
        }
      })

      // ━━ Vignette ━━
      const vr = Math.max(w, h) * 0.65
      const vig = c.createRadialGradient(cx, cy, vr * 0.3, cx, cy, vr)
      vig.addColorStop(0, 'rgba(8,11,16,0)')
      vig.addColorStop(1, 'rgba(8,11,16,0.65)')
      c.fillStyle = vig; c.fillRect(0, 0, w, h)

      raf.current = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    raf.current = requestAnimationFrame(draw)
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(raf.current) }
  }, [interactive])

  useEffect(() => {
    if (!interactive) return
    const onMove = (e: MouseEvent) => {
      const r = canvasRef.current?.getBoundingClientRect()
      if (r) mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 } }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseleave', onLeave) }
  }, [interactive])

  return <canvas ref={canvasRef} onClick={onClick} className={`absolute inset-0 ${className}`} />
}
