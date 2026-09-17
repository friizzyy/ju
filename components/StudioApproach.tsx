import styles from './StudioApproach.module.css'

const principles = [
  {
    title: 'Designed to feel like you',
    body: 'Your brand shapes the layout, typography and details. Together, we make it clear what you offer and easy for the right people to take the next step.',
  },
  {
    title: 'Fast. Clear. Easy to use.',
    body: 'Optimized images, lean pages and layouts made for every screen. Performance and usability are part of the build from the start.',
  },
  {
    title: 'Yours after launch',
    body: 'You get the source code, documentation and a clear handoff. If you need to update content yourself, we can include a CMS in the project scope.',
  },
]

export default function StudioApproach() {
  return (
    <section
      id="studio-approach"
      className={styles.section}
      aria-labelledby="studio-approach-title"
    >
      <div className={styles.inner}>
        <div className={styles.layout}>
          <div className={styles.introduction}>
            <h2 id="studio-approach-title" className={styles.title}>
              <span>Built around</span>{' '}
              <span>
                your business<span className={styles.dot}>.</span>
              </span>
            </h2>
            <p className={styles.description}>
              I work with you on the design and the build, so what makes your
              business different comes through in the finished site.
            </p>
          </div>
          <ul className={styles.principles} role="list">
            {principles.map((principle) => (
              <li key={principle.title} className={styles.principle}>
                <h3 className={styles.principleTitle}>{principle.title}</h3>
                <p className={styles.body}>{principle.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
