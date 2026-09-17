import { heroAgents } from '@/data/hero-agents'
import AgentCard from './AgentCard'
import PantheonExplorer from './PantheonExplorer'
import styles from './PantheonSection.module.css'

const commandAgent = heroAgents.find((agent) => agent.id === 'zeus')
const specialists = heroAgents.filter((agent) => agent.id !== 'zeus')

export default function PantheonSection() {
  return (
    <section
      id="pantheon"
      className={styles.section}
      aria-labelledby="pantheon-title"
    >
      <div className={styles.container}>
        <div className={styles.overview}>
          <header className={styles.heading}>
            <p className={styles.eyebrow}>The Pantheon</p>
            <h2 id="pantheon-title" className={styles.title}>
              Nine agents.
              <br />
              <span>One system.</span>
            </h2>
            <p className={styles.intro}>
              Specialist AI agents working together across research, creation,
              and delivery.
            </p>
          </header>
          {commandAgent && (
            <ul className={styles.command} aria-label="Coordination">
              <AgentCard agent={commandAgent} featured />
            </ul>
          )}
        </div>
        <ul className={styles.roster} aria-label="Specialist agents">
          {specialists.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </ul>
        <div className={styles.mobileRoster}>
          <PantheonExplorer />
        </div>
      </div>
    </section>
  )
}
