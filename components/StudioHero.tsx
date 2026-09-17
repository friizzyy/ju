import BuildAnimation from './BuildAnimation'
import styles from './StudioHero.module.css'

export default function StudioHero() {
  return (
    <section
      id="studio-hero"
      className={styles.hero}
      aria-labelledby="studio-title"
    >
      <div className={styles.composition}>
        <h1 id="studio-title" className={styles.wordmark}>
          JU<span className={styles.dot}>.</span>{' '}
          <span className={styles.outline}>Studio</span>
        </h1>
        <div className={styles.visual}>
          <BuildAnimation />
        </div>
        <p className={styles.statement}>
          <span className={styles.lead}>
            No templates<span className={styles.dot}>.</span> No shortcuts
            <span className={styles.dot}>.</span>
          </span>{' '}
          <span className={styles.code}>Just code.</span>
        </p>
      </div>
    </section>
  )
}
