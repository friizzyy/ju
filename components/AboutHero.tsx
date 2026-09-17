'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import s from './AboutHero.module.css'
import EAWorkflow from './EAWorkflow'

export default function AboutHero() {
  const [reveal, setReveal] = useState(100)
  const [manual, setManual] = useState(false)
  const [run, setRun] = useState(0)
  const sceneRef = useRef<HTMLDivElement>(null)
  const engineVisible = reveal < 92

  useEffect(() => {
    if (manual) return
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    const desktop = matchMedia('(min-width: 901px)')
    let timer: ReturnType<typeof setTimeout> | undefined
    let visible = false
    const schedule = () => {
      clearTimeout(timer)
      if (visible && !document.hidden && desktop.matches && !reduced.matches) {
        timer = setTimeout(() => setReveal(0), 2800)
      }
    }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; schedule() }, { threshold: .35 })
    if (sceneRef.current) observer.observe(sceneRef.current)
    document.addEventListener('visibilitychange', schedule)
    reduced.addEventListener('change', schedule)
    desktop.addEventListener('change', schedule)
    return () => { clearTimeout(timer); observer.disconnect(); document.removeEventListener('visibilitychange', schedule); reduced.removeEventListener('change', schedule); desktop.removeEventListener('change', schedule) }
  }, [manual])

  const show = (position: number) => { setManual(true); setReveal(position); if (position === 0) setRun(current => current + 1) }

  return <section id="about-hero" className={s.hero} aria-labelledby="about-title">
    <div className={s.composition}>
      <p className={s.introduction}>The person behind JU.</p>
      <h1 id="about-title" className={s.name}>Julius <span>Williams</span><i>.</i></h1>
      <div ref={sceneRef} className={s.scene} data-engine={engineVisible} style={{ '--reveal': `${reveal}%`, '--mobile-clip': engineVisible ? '100%' : '0%' } as CSSProperties}>
        <EAWorkflow key={run} active={engineVisible} run={run} />
        <div className={s.website} aria-hidden={engineVisible}>
          <Image className={s.desktopSite} src="/images/studio-work/engineered-adherence-desktop-4k-20260917.png" alt="Engineered Adherence website, designed and built by Julius" fill priority sizes="(max-width: 760px) 100vw, 1200px" />
          <Image className={s.mobileSite} src="/images/studio-work/engineered-adherence-mobile-hd-20260917.png" alt="Engineered Adherence mobile website" fill sizes="(max-width: 760px) 100vw, 390px" />
        </div>

      </div>
      <div className={s.sceneFooter}>
        <div className={s.project}><b>Engineered Adherence</b><span>Website & custom Hermes system</span></div>
        <div className={s.views} role="group" aria-label="Explore the EA build"><button type="button" aria-pressed={reveal === 100} onClick={() => show(100)}>The website</button><button type="button" aria-pressed={reveal < 100} onClick={() => show(0)}>{engineVisible ? 'Run it again' : 'Watch Hermes work'} <span aria-hidden="true">↗</span></button></div>
      </div>
      <div className={s.personal}><h2>One person. <span>All the way through.</span></h2><p>I’m Julius. I design and build custom websites, software and AI systems. <br/>You work directly with me, from the first conversation to the finished build.</p><Link href="/contact" className={s.contact}>Let’s talk <span aria-hidden="true">↗</span></Link></div>
    </div>
  </section>
}
