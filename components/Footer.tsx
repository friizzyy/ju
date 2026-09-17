import Link from 'next/link'
import styles from './Footer.module.css'

const groups = [
  {
    name: 'JU. Studio',
    className: styles.studio,
    links: [
      { label: 'Portfolio', href: '/studio#portfolio' },
      { label: 'Pricing', href: '/studio#pricing' },
      {
        label: 'Start a project',
        href: 'https://calendly.com/julius-buildwithju/30min',
      },
    ],
  },
  {
    name: 'JU. Systems',
    className: styles.systems,
    links: [
      { label: 'How it works', href: '/systems#process' },
      { label: 'Packages', href: '/systems#packages' },
      {
        label: 'Book a call',
        href: 'https://calendly.com/julius-buildwithju/30min',
      },
    ],
  },
]

export default function Footer() {
  return (
    <footer id="site-footer" className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <p className={styles.wordmark}>
              JU<span>.</span>
            </p>
            <p className={styles.description}>
              Custom websites and AI systems. Built to run while you sleep.
            </p>
            <div className={styles.details}>
              <p className={`${styles.location} ${styles.meta}`}>
                San Francisco, CA
              </p>
              <p className={`${styles.copyright} ${styles.meta}`}>
                &copy; {new Date().getFullYear()} JU. All rights reserved.
              </p>
            </div>
          </div>

          {groups.map((group) => (
            <nav key={group.name} aria-label={`${group.name} footer`}>
              <h2 className={`${styles.heading} ${group.className}`}>
                {group.name}
              </h2>
              <ul className={styles.links}>
                {group.links.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className={styles.link}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
    </footer>
  )
}
