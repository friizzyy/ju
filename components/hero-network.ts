import { heroAgents as nodes } from '@/data/hero-agents'
import { heroOrbit } from './hero-layout'

export type HeroMotion = { paused: boolean; reduced: boolean }

/** The approved canvas scene. React owns selection, controls, and readable content. */
export function createHeroNetwork(
  hero: HTMLElement,
  canvas: HTMLCanvasElement,
  buttons: HTMLButtonElement[],
  onMotionChange: (motion: HeroMotion) => void,
) {
  const edges = [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [0, 6],
    [0, 7],
    [0, 8],
    [1, 2],
    [1, 5],
    [2, 7],
    [3, 4],
    [6, 8],
    [7, 8],
    [5, 3],
    [4, 6],
    [2, 4],
  ]
  const ctx = canvas.getContext('2d')
  const field = buttons[0].parentElement!
  const media = matchMedia('(prefers-reduced-motion: reduce)')
  let reduced = media.matches,
    paused = reduced,
    visible = true,
    disposed = false
  let frame = 0,
    last = 0,
    time = 0,
    width = 0,
    height = 0,
    dpr = 1
  let selected = -1,
    hovered = -1,
    selectedAt = -100
  let positions: [number, number][] = []
  let compact = false
  let fieldWidth = 0,
    fieldHeight = 0,
    fieldX = 0,
    fieldY = 0
  let orbit = { x: 0, y: 0 }

  const fract = (n: number) => n - Math.floor(n)
  const random = (i: number) => fract(Math.sin(i * 112.713 + 7) * 43758.54)
  const stars = Array.from({ length: 350 }, (_, i) => {
    const layer = random(i + 400) < 0.2 ? 2 : random(i + 800) < 0.5 ? 1 : 0
    return {
      x: random(i + 1),
      y: random(i + 101),
      r:
        layer === 2
          ? 1.2 + random(i + 1500) * 1.8
          : layer === 1
            ? 0.6 + random(i + 1500)
            : 0.3 + random(i + 1500) * 0.5,
      a:
        layer === 2
          ? 0.15 + random(i + 1600) * 0.35
          : layer === 1
            ? 0.08 + random(i + 1600) * 0.2
            : 0.04 + random(i + 1600) * 0.1,
      ts: 0.2 + random(i + 1700) * 2,
      tp: random(i + 1800) * Math.PI * 2,
      layer,
    }
  })
  const nebulae = [
    { x: 0.3, y: 0.25, r: 350, color: '0,60,120', speed: 0.08, phase: 0 },
    { x: 0.7, y: 0.35, r: 280, color: '0,140,180', speed: 0.06, phase: 2 },
    { x: 0.2, y: 0.65, r: 320, color: '40,10,90', speed: 0.05, phase: 4 },
    { x: 0.8, y: 0.7, r: 250, color: '120,100,0', speed: 0.07, phase: 1 },
    { x: 0.5, y: 0.5, r: 400, color: '0,100,140', speed: 0.04, phase: 3 },
  ]
  const rgb = (hex: string) =>
    [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(',')
  function glow(x: number, y: number, r: number, color: string, alpha: number) {
    if (!ctx) return
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, r)
    gradient.addColorStop(0, `rgba(${color},${alpha})`)
    gradient.addColorStop(1, `rgba(${color},0)`)
    ctx.fillStyle = gradient
    ctx.fillRect(x - r, y - r, r * 2, r * 2)
  }
  function updatePositions() {
    positions = nodes.map((node, i) => {
      // Drift is local and time-driven. Pointer position never affects the layout.
      const drift = reduced ? 0 : compact ? 2 : 6
      const offsetX = node.x * orbit.x
      const separatedX =
        compact && node.y > 0.8
          ? Math.sign(offsetX) * Math.max(28, Math.abs(offsetX))
          : offsetX
      const x =
        fieldWidth / 2 + separatedX + Math.sin(time * 0.12 + i * 1.73) * drift
      const y =
        fieldHeight / 2 +
        node.y * orbit.y +
        Math.cos(time * 0.1 + i * 1.31) * drift
      buttons[i].style.left = x + 'px'
      buttons[i].style.top = y + 'px'
      return [x + fieldX, y + fieldY] as [number, number]
    })
  }
  function draw() {
    if (!width || !height) return
    updatePositions()
    if (!ctx) return
    ctx.clearRect(0, 0, width, height)
    const mobile = compact
    for (const cloud of nebulae) {
      const x =
        (cloud.x + Math.sin(time * cloud.speed + cloud.phase) * 0.08) * width
      const y =
        (cloud.y + Math.cos(time * cloud.speed * 0.7 + cloud.phase) * 0.06) *
        height
      glow(x, y, cloud.r * (mobile ? 0.6 : 1), cloud.color, 0.06)
    }
    for (const star of stars) {
      const a = star.a * (0.5 + 0.5 * Math.sin(time * star.ts + star.tp))
      const x = star.x * width,
        y = star.y * height
      ctx.fillStyle = `rgba(200,220,255,${a})`
      ctx.beginPath()
      ctx.arc(x, y, star.r, 0, Math.PI * 2)
      ctx.fill()
      if (star.layer === 2) glow(x, y, star.r * 4, '200,220,255', a * 0.3)
    }
    for (let i = 0; i < edges.length; i++) {
      const [a, b] = edges[i],
        [ax, ay] = positions[a],
        [bx, by] = positions[b]
      const active = selected === a || selected === b
      const gradient = ctx.createLinearGradient(ax, ay, bx, by)
      gradient.addColorStop(
        0,
        `rgba(${rgb(nodes[a].color)},${active ? 0.24 : 0.12})`,
      )
      gradient.addColorStop(0.5, `rgba(0,180,220,${active ? 0.075 : 0.04})`)
      gradient.addColorStop(
        1,
        `rgba(${rgb(nodes[b].color)},${active ? 0.24 : 0.12})`,
      )
      ctx.strokeStyle = gradient
      ctx.lineWidth = mobile ? 0.75 : 1
      ctx.beginPath()
      ctx.moveTo(ax, ay)
      ctx.lineTo(bx, by)
      ctx.stroke()
      const cycle = (time / 23 + i * 0.381966) % 1
      const age = time - selectedAt
      const clicked = active && age >= 0 && age < 4 && !paused && !reduced
      if (cycle < 0.38 || clicked) {
        const p = clicked ? age / 4 : cycle / 0.38
        const progress = clicked && selected === b ? 1 - p : p
        const x = ax + (bx - ax) * progress,
          y = ay + (by - ay) * progress
        const distance = Math.hypot(
          x - (fieldX + fieldWidth / 2),
          y - (fieldY + fieldHeight / 2),
        )
        const protect =
          Math.min(fieldWidth, fieldHeight) * (mobile ? 0.28 : 0.18)
        const fade = Math.max(
          0,
          Math.min(
            1,
            (distance - protect) / (Math.min(fieldWidth, fieldHeight) * 0.14),
          ),
        )
        // One compact orb. No stacked trail, streak, or shooting-star tail.
        glow(x, y, 6, '123,226,247', 0.22 * fade)
        ctx.fillStyle = `rgba(154,235,251,${0.72 * fade})`
        ctx.beginPath()
        ctx.arc(x, y, mobile ? 1.2 : 1.7, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    nodes.forEach((node, i) => {
      const [x, y] = positions[i],
        active = i === selected || i === hovered
      const breathe = reduced ? 1 : 1 + Math.sin(time * 1.2 + i * 0.8) * 0.1
      glow(
        x,
        y,
        (mobile ? 40 : 80) * node.scale * breathe,
        rgb(node.color),
        active ? 0.19 : 0.105,
      )
    })
    const radius = Math.max(width, height) * 0.65
    const vignette = ctx.createRadialGradient(
      width / 2,
      height / 2,
      radius * 0.3,
      width / 2,
      height / 2,
      radius,
    )
    vignette.addColorStop(0, 'rgba(8,11,16,0)')
    vignette.addColorStop(1, 'rgba(8,11,16,.65)')
    ctx.fillStyle = vignette
    ctx.fillRect(0, 0, width, height)
  }

  function resize() {
    if (disposed) return
    const rect = hero.getBoundingClientRect()
    width = rect.width
    height = rect.height
    const fieldRect = field.getBoundingClientRect()
    fieldWidth = fieldRect.width
    fieldHeight = fieldRect.height
    fieldX = fieldRect.left - rect.left
    fieldY = fieldRect.top - rect.top
    compact =
      getComputedStyle(hero).getPropertyValue('--hero-compact').trim() === '1'
    orbit = heroOrbit(fieldWidth, fieldHeight, compact)
    dpr = Math.min(
      devicePixelRatio || 1,
      2,
      Math.sqrt(8_000_000 / Math.max(1, width * height)),
    )
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
    ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)
    draw()
  }
  function tick(now: number) {
    frame = 0
    if (disposed || paused || reduced || !visible || document.hidden) return
    if (now - last >= 30) {
      time += Math.min((now - last) / 1000, 0.06)
      last = now
      draw()
    }
    frame = requestAnimationFrame(tick)
  }
  function schedule() {
    cancelAnimationFrame(frame)
    frame = 0
    last = performance.now()
    if (!disposed && !paused && !reduced && visible && !document.hidden)
      frame = requestAnimationFrame(tick)
  }
  function syncMotion() {
    if (reduced) time = 0
    onMotionChange({ paused, reduced })
    draw()
    schedule()
  }
  function mediaChanged() {
    reduced = media.matches
    paused = reduced
    syncMotion()
  }
  const resizer = new ResizeObserver(resize)
  resizer.observe(hero)
  resizer.observe(field)
  const observer = new IntersectionObserver(
    (entries) => {
      visible = entries[0].isIntersecting
      schedule()
    },
    { threshold: 0.01 },
  )
  observer.observe(hero)
  media.addEventListener('change', mediaChanged)
  document.addEventListener('visibilitychange', schedule)
  document.fonts.ready.then(resize)
  resize()
  syncMotion()

  return {
    select(index: number) {
      selected = index
      selectedAt = time
      draw()
    },
    hover(index: number) {
      hovered = index
      draw()
    },
    toggleMotion() {
      if (reduced) return
      paused = !paused
      syncMotion()
    },
    destroy() {
      disposed = true
      cancelAnimationFrame(frame)
      resizer.disconnect()
      observer.disconnect()
      media.removeEventListener('change', mediaChanged)
      document.removeEventListener('visibilitychange', schedule)
    },
  }
}
