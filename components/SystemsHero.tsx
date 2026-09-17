import AgentTerminal from './AgentTerminal'
import styles from './SystemsHero.module.css'

export default function SystemsHero() {
  return (
    <section id="systems-hero" className={styles.hero} aria-labelledby="systems-title">
      <div className={styles.composition}>
        <h1 id="systems-title" className={styles.wordmark}>
          JU<span className={styles.dot}>.</span>{' '}
          <span className={styles.outline}>Systems</span>
        </h1>
        <div className={styles.visual}>
          <AgentTerminal />
        </div>
        <p className={styles.statement}>
          <span className={styles.lead}>Less busywork<span className={styles.dot}>.</span> More time<span className={styles.dot}>.</span></span>
          <span className={styles.finish}>Agents at work.</span>
        </p>
      </div>
    </section>
  )
}
