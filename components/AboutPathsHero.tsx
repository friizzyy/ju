'use client'

import { BackgroundPaths } from './ui/background-paths'
import s from './AboutPathsHero.module.css'

export default function AboutPathsHero() {
  return <section id="about-hero" aria-labelledby="about-title" className={s.hero}>
    <BackgroundPaths />
    <div className={s.readingSpace} aria-hidden="true" />
    <div className={s.content}>
      <p className={s.byline}><span className={s.bylineLine} /> Julius Williams <span className={s.bylineLine} /></p>
      <h1 id="about-title" className={s.title}>
        <span className={s.titleLine}>Good ideas<span className={s.period}>.</span></span>
        <span className={s.titleLine}><span className={s.outline}>Built to work</span><span className={s.period}>.</span></span>
      </h1>
      <p className={s.intro}>I bring design and engineering together<br className={s.desktopBreak} /> to build what your business needs next.</p>
      <p className={s.disciplines}><span>Websites</span><i /><span>Software</span><i /><span>AI systems</span></p>
      <a href="#about-julius" className={s.glassButton}><span>The person behind the work</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5v14m-6-6 6 6 6-6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg></a>
    </div>
    <div className={s.footnote}><span>Independent by design.</span><span>Based in California.</span></div>
  </section>
}
