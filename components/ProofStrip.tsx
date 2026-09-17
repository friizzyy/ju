'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { agents } from '@/data/agents'
import { studioFacts } from '@/data/studio-facts'
import styles from './ProofStrip.module.css'

export default function ProofStrip() {
  const strip = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const element = strip.current
    if (!element || !element.animate || !('IntersectionObserver' in window))
      return
    const media = matchMedia('(prefers-reduced-motion: reduce)')
    if (media.matches) return
    let animation: Animation | undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        if (media.matches) return
        animation = element.animate(
          [
            { opacity: 0.6, transform: 'translateY(6px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          { duration: 500, easing: 'cubic-bezier(.22,1,.36,1)' },
        )
      },
      { threshold: 0.15 },
    )
    const reduceMotion = () => {
      if (media.matches) animation?.cancel()
    }
    observer.observe(element)
    media.addEventListener('change', reduceMotion)
    return () => {
      observer.disconnect()
      animation?.cancel()
      media.removeEventListener('change', reduceMotion)
    }
  }, [])

  const facts = [
    {
      value: studioFacts.websitesShipped,
      suffix: '',
      label: 'Websites shipped',
      detail: 'Custom builds and redesigns.',
      href: '/studio#portfolio',
      link: 'View the work',
    },
    {
      value: agents.length,
      suffix: '',
      label: 'Specialist agents',
      detail: 'Each with a defined role.',
      href: '#pantheon',
      link: 'Meet the agents',
    },
    {
      value: studioFacts.snapshotAuditBusinessDays,
      suffix: '',
      label: 'Business days',
      detail: 'Snapshot audit delivery.',
      href: '/systems#packages',
      link: 'Explore the audits',
    },
  ]

  return (
    <section id="proof" className={styles.section} aria-label="JU. in numbers">
      <ul ref={strip} className={styles.strip}>
        {facts.map((fact) => (
          <li key={fact.label} className={styles.fact}>
            <p className={styles.value}>
              {fact.value}
              <span className={styles.suffix}>{fact.suffix}</span>
            </p>
            <div className={styles.copy}>
              <h2 className={styles.label}>{fact.label}</h2>
              <p className={styles.detail}>{fact.detail}</p>
              <Link href={fact.href} className={styles.link}>
                {fact.link}
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
