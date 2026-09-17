'use client'

import { useEffect, useRef, useState } from 'react'
import s from './EAWorkflow.module.css'

const stages = ['An order arrives from the storefront.', 'Hermes checks the payment.', 'The order is matched to its inventory lots.', 'Client documents take shape.', 'Fulfillment details come together.', 'Julius gets the update in Telegram.', 'Prepared. Julius approves the next move.']
const desktopPaths = ['M250 290H390Q410 290 410 260V160', 'M410 160V260Q410 290 450 290', 'M550 290H640Q665 290 665 190H710', 'M500 330V395Q500 420 455 420H435', 'M550 290H630Q665 290 665 435H710', 'M820 500V535H245']
const mobilePaths = ['M200 115V125H105V145', 'M105 235V270H165', 'M235 303H300V235', 'M200 336V365H105V390', 'M235 303H300V390', 'M300 512V542H235']

export default function EAWorkflow({ active, run }: { active: boolean; run: number }) {
  const [phase, setPhase] = useState(0)
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!active) { setPhase(0); return }
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    let timer: ReturnType<typeof setTimeout> | undefined
    let visible = false
    let current = 0
    const advance = () => {
      clearTimeout(timer)
      if (reduced.matches) { setPhase(6); return }
      if (!visible || document.hidden || current >= 6) return
      timer = setTimeout(() => { current += 1; setPhase(current); advance() }, current === 0 ? 1200 : 1700)
    }
    setPhase(reduced.matches ? 6 : 0)
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; advance() }, { threshold: .25 })
    if (root.current) observer.observe(root.current)
    document.addEventListener('visibilitychange', advance)
    reduced.addEventListener('change', advance)
    return () => { clearTimeout(timer); observer.disconnect(); document.removeEventListener('visibilitychange', advance); reduced.removeEventListener('change', advance) }
  }, [active, run])

  const wires = (paths: string[], className: string) => <svg className={className} viewBox={className === s.desktopWires ? '0 0 1000 600' : '0 0 400 620'} preserveAspectRatio="none" aria-hidden="true">{paths.map((d, i) => <g key={i}><path d={d} className={s.track}/>{active && phase >= i && <path key={`${run}-${i}`} d={d} pathLength="1" className={s.packet}/>}</g>)}</svg>
  return <div ref={root} className={s.machine} data-phase={phase} data-active={active} aria-hidden={!active} aria-label="Animated illustration of the EA Hermes order workflow">
    <div className={s.heading}><span><i/>EA Hermes</span><span>Workflow illustration</span></div>
    {wires(desktopPaths, s.desktopWires)}{wires(mobilePaths, s.mobileWires)}
    <div className={s.order}><div className={s.orderHeader}><span>EA</span><span>STOREFRONT</span></div><h3>New order<span>↗</span></h3><div className={s.receiptLines}><i/><i/><i/></div><p>Items & customer context</p><footer><span/>Received</footer></div>
    <div className={s.payment} data-ready={phase >= 1}><div><span>↗</span><b>Payment</b><i>{phase >= 1 ? '✓' : '·'}</i></div><p>{phase >= 1 ? 'Matched to the order' : 'Checking payment record'}</p><span className={s.progress}/></div>
    <div className={s.hub}><span className={s.orbit}/><div>H<span>HERMES</span></div><i className={s.hubLabel}>{phase < 6 ? 'Coordinating' : 'Ready for review'}</i></div>
    <div className={s.stock} data-ready={phase >= 2}><header><b>Inventory</b><span>{phase >= 2 ? 'Matched' : 'Lot lookup'}</span></header><div className={s.stockSlots}>{[0,1,2,3,4,5].map(i=><i key={i}/>)}</div><p>Order items → exact lots</p><div className={s.allocated}><span>↳</span>{phase >= 2 ? 'Lot records reconciled' : 'Awaiting order match'}</div></div>
    <div className={s.documents} data-ready={phase >= 3}><div className={s.paperBack}/><div className={s.paperFront}><header><span>EA</span><span>CLIENT PACKET</span></header><b>Built for this order.</b><div className={s.documentLines}><i/><i/><i/><i/></div><footer>{phase >= 3 ? '✓ Documents prepared' : 'Assembling documents'}</footer></div></div>
    <div className={s.shipping} data-ready={phase >= 4}><header><span>↗</span><b>Fulfillment</b><span>PREVIEW</span></header><div className={s.label}><span>SHIP TO</span><i/><i/><div><span>Service</span><b>For review</b></div><div><span>Tracking copy</span><b>Draft prepared</b></div></div><footer>{phase >= 4 ? 'Ready for your approval' : 'Preparing shipping details'}</footer></div>
    <div className={s.telegram} data-ready={phase >= 5}><span className={s.telegramIcon}>↗</span><div><b>EA Hermes <span>→ Julius / Telegram</span></b><p>Order checked. Documents prepared. Fulfillment ready to review.</p></div><i>✓</i></div>
    <div className={s.caption}><span key={`${run}-${phase}`}>{stages[phase]}</span><small>Shipping purchases and outgoing messages require Julius’s approval.</small></div>
  </div>
}
