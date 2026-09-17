import styles from './HomeClosing.module.css'

export default function HomeClosing() {
  return (
    <section
      id="start-a-project"
      className={styles.section}
      aria-labelledby="closing-title"
    >
      <div className={styles.divider} aria-hidden="true" />
      <div className={styles.container}>
        <h2 id="closing-title" className={styles.title}>
          Let’s build
          <br />
          what’s <span>next.</span>
        </h2>

        <div className={styles.invitation}>
          <p className={styles.intro}>
            Custom websites and AI systems, built with care and a process that
            keeps things moving. We’ll agree on a clear timeline based on what
            your project needs.
          </p>

          <div className={styles.actions}>
            <a
              href="https://calendly.com/julius-buildwithju/30min"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.primary}
            >
              Talk with Julius
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path d="M5 15 15 5M5 5h10v10" />
              </svg>
            </a>
            <a
              href="mailto:julius@buildwithju.com"
              aria-label="Email Julius at julius@buildwithju.com"
              className={styles.email}
            >
              <span className={styles.emailFull}>julius@buildwithju.com</span>
              <span className={styles.emailShort}>Email Julius</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
