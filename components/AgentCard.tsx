import type { CSSProperties } from 'react'
import type { HeroAgent } from '@/data/hero-agents'
import HeroAgentIcon from './HeroAgentIcon'
import styles from './PantheonSection.module.css'

export default function AgentCard({ agent, featured = false }: { agent: HeroAgent; featured?: boolean }) {
  return (
    <li
      className={`${styles.agent}${featured ? ` ${styles.featured}` : ''}`}
      data-pantheon-agent={agent.id}
      style={{ '--agent-color': agent.color } as CSSProperties}
    >
      <span className={styles.emblem} aria-hidden="true">
        <HeroAgentIcon id={agent.id} />
      </span>
      <div className={styles.copy}>
        <div className={styles.identity}>
          <h3 className={styles.name}>{agent.name}</h3>
          <p className={styles.role}>{agent.role}</p>
        </div>
        <p className={styles.description}>{agent.description}</p>
      </div>
    </li>
  )
}
