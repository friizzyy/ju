'use client'

import { useEffect, useId, useRef, useState, type CSSProperties } from 'react'
import { heroAgents } from '@/data/hero-agents'
import HeroAgentIcon from './HeroAgentIcon'
import styles from './PantheonExplorer.module.css'

export default function PantheonExplorer() {
  const [selected, setSelected] = useState(0)
  const detail = useRef<HTMLDivElement>(null)
  const id = useId()
  const agent = heroAgents[selected]

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const animation = detail.current?.animate?.(
      [
        { opacity: 0.55, transform: 'translateY(4px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ],
      { duration: 180, easing: 'cubic-bezier(.22,1,.36,1)' },
    )
    return () => animation?.cancel()
  }, [selected])

  return (
    <div className={styles.explorer}>
      <div
        className={styles.spotlight}
        style={{ '--agent-color': agent.color } as CSSProperties}
      >
        <div ref={detail} id={id} aria-live="polite" aria-atomic="true">
          <div className={styles.identity}>
            <span className={styles.emblem} aria-hidden="true">
              <HeroAgentIcon id={agent.id} />
            </span>
            <div>
              <h3>{agent.name}</h3>
              <p className={styles.role}>{agent.role}</p>
            </div>
          </div>
          <p className={styles.description}>{agent.description}</p>
        </div>
      </div>
      <div className={styles.directory}>
        <p className={styles.label}>
          Explore the team <span>{heroAgents.length} specialists</span>
        </p>
        <div
          className={styles.members}
          role="group"
          aria-label="Select a Pantheon agent"
        >
          {heroAgents.map((member, index) => (
            <button
              type="button"
              key={member.id}
              aria-pressed={selected === index}
              aria-controls={id}
              onClick={() => setSelected(index)}
              style={{ '--agent-color': member.color } as CSSProperties}
            >
              <span className={styles.memberEmblem} aria-hidden="true">
                <HeroAgentIcon id={member.id} />
              </span>
              <span>{member.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
