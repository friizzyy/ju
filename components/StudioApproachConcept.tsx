'use client'

import { useState } from 'react'
import styles from './StudioApproachConcept.module.css'

export type ApproachConcept = 'evolving' | 'layers'

const principles = [
  { label: 'Design', title: 'Designed to feel like you.', body: 'We start with your business: who you serve, what you offer and what makes you different. That shapes the typography, colors, imagery and layout, so the design feels like you from the first impression.', extra: 'You’re part of the process. We work through the direction together, refine the details and give each page a clear purpose, from telling your story to helping someone take the next step.', note: 'Your identity, in every detail' },
  { label: 'Every Screen', title: 'A good fit. Everywhere.', body: 'Your site is designed for the way people actually browse: on a phone, a tablet or a big screen. Layouts adapt, type stays readable and navigation, forms and buttons are considered for both touch and keyboard.', extra: 'I check how the pages behave at different sizes, optimize images and keep the build lean. The goal is a clear, comfortable experience wherever someone meets your business.', note: 'From the big picture to the smallest screen' },
  { label: 'Ownership', title: 'Made for you. Yours to keep.', body: 'The finished website is yours, including the source code and documentation. We walk through the handoff so you understand how the site is set up, where it lives and what you need to manage it.', extra: 'Want to update text, images or articles yourself? We can include a content management system in the project scope. Ongoing support can be discussed separately, with clear expectations about what’s included.', note: 'The finished site. The keys included.' },
]

function BrowserChrome() {
  return <div className={styles.chrome}><span><i /><i /><i /></span><span>your next website</span><span>↗</span></div>
}

function SiteFace({ compact = false }: { compact?: boolean }) {
  return <div className={`${styles.siteFace} ${compact ? styles.compact : ''}`}>
    <div className={styles.siteNav}><strong>you<span>.</span></strong><span>STORY &nbsp; WORK &nbsp; CONTACT</span><i>↗</i></div>
    <div className={styles.siteHero}><div><span className={styles.micro}>DISTINCTLY YOURS</span><p>A little<br />different<span>.</span></p><span className={styles.siteCta}>Discover the difference ↗</span></div><div className={styles.sculpture}><i /><i /><i /><i /><i /></div></div>
    <div className={styles.siteFooter}><span>GOOD THINGS START HERE.</span><span>↓</span></div>
  </div>
}

function PreviewNav({ concept }: { concept: ApproachConcept }) {
  return <nav className={styles.previewNav} aria-label="Approach mockup options"><span>SECTION STUDIES</span><div><a href="/studio?approach=evolving#studio-approach" aria-current={concept === 'evolving' ? 'page' : undefined}>01 Evolving</a><a href="/studio?approach=layers#studio-approach" aria-current={concept === 'layers' ? 'page' : undefined}>02 Layers</a><a href="/studio?approach=original#studio-approach">Original ↗</a></div></nav>
}

export default function StudioApproachConcept({ concept, showPreview = false }: { concept: ApproachConcept; showPreview?: boolean }) {
  const [selected, setSelected] = useState(0)
  const [assembled, setAssembled] = useState(false)
  const principle = principles[selected]

  return <section id="studio-approach" aria-labelledby="approach-title" className={`${styles.section} ${concept === 'evolving' ? styles.evolvingSection : ''}`}>
    <div className={styles.inner}>
      {showPreview && <PreviewNav concept={concept} />}
      {concept === 'evolving' ? <>
        <div className={styles.sectionDivider} aria-hidden="true"><span /></div>
        <div className={styles.intro}><h2 id="approach-title">Built around <span>your business.</span></h2><p className={styles.introCopy}>I work with you on the design and the build. What makes you different comes through.</p></div>
        <div className={styles.evolvingGrid}>
          <div className={styles.visualColumn}>
          <div className={styles.evolvingStage} data-state={selected} role="img" aria-label={`Illustrative website study: ${principle.note}`}>
            <div className={styles.stageRing} />
            <div className={styles.mainBrowser}><BrowserChrome /><SiteFace /></div>
            <div className={styles.typeSample}><span className={styles.micro}>YOUR CHARACTER</span><strong>Aa<span>.</span></strong><span>Considered. Down to the letter.</span></div>
            <div className={styles.palette}><i /><i /><i /><span>01 — YOUR PALETTE</span></div>
            <div className={styles.phone}><span className={styles.phoneNotch} /><SiteFace compact /></div>
            <div className={styles.handoff}><span className={styles.handoffIcon}>↗</span><strong>All yours.</strong><span>Source code <b>✓</b></span><span>Documentation <b>✓</b></span><span>A clear handoff <b>✓</b></span></div>
            <div className={styles.stageCaption}><span>0{selected + 1} / 03</span><span>{principle.note}</span></div>
          </div>
        <div className={styles.selectors} role="group" aria-label="Explore what goes into your website">{principles.map((item, index) => <button key={item.label} type="button" aria-pressed={selected === index} aria-controls="approach-detail" onClick={() => setSelected(index)}>{item.label}</button>)}</div>
          </div>
          <div className={styles.detailBar}>
            <div id="approach-detail" className={styles.detail} aria-live="polite"><span className={styles.detailLabel}>0{selected + 1} / {principle.label}</span><h3>{principle.title}</h3><p>{principle.body}</p><p>{principle.extra}</p></div>
          </div>
        </div>
      </> : <>
        <div className={styles.layerIntro}><div><p className={styles.eyebrow}>GOOD DESIGN GOES DEEPER</p><h2 id="approach-title">Every layer.<br /><span>Built for you.</span></h2></div><div><p className={styles.introCopy}>What you see is only the beginning.<br />The care runs all the way through.</p><button className={styles.assemble} type="button" aria-pressed={assembled} onClick={() => setAssembled(!assembled)}>{assembled ? 'Explore the layers' : 'Bring it all together'}<span aria-hidden="true">{assembled ? '↗' : '↙'}</span></button></div></div>
        <div className={styles.explodedStage} data-assembled={assembled} role="img" aria-label={assembled ? 'Illustration of the design, responsive layout and handoff assembled into one website' : 'Illustration of three separated website layers: identity, responsive layout and ownership'}>
          <div className={`${styles.layer} ${styles.baseLayer}`}><div className={styles.baseHeader}><span>03 / OWNERSHIP</span><span>YOURS, FROM DAY ONE ↗</span></div><div className={styles.fileList}><span><i>⌘</i> Your source code <b>✓</b></span><span><i>≡</i> Your documentation <b>✓</b></span><span><i>↗</i> Your next chapter <b>✓</b></span></div></div>
          <div className={`${styles.layer} ${styles.gridLayer}`}><span className={styles.gridLabel}>02 / RESPONSIVE BY DESIGN</span><div className={styles.wireNav} /><div className={styles.wireLayout}><div /><div /></div><div className={styles.wireBottom}><i /><i /><i /></div></div>
          <div className={`${styles.layer} ${styles.topLayer}`}><BrowserChrome /><SiteFace /></div>
          <span className={`${styles.layerMarker} ${styles.markerOne}`}>01 <i /> IDENTITY</span><span className={`${styles.layerMarker} ${styles.markerTwo}`}>02 <i /> EXPERIENCE</span><span className={`${styles.layerMarker} ${styles.markerThree}`}>03 <i /> OWNERSHIP</span>
          <span className={styles.illustrationNote}>AN ILLUSTRATION OF WHAT GOES INTO YOUR SITE</span>
        </div>
        <div className={styles.layerNotes}>{principles.map((item, index) => <div key={item.label}><span className={styles.noteNumber}>0{index + 1}<i /></span><h3>{item.title}</h3><p>{item.body} {item.extra}</p></div>)}</div>
      </>}
    </div>
  </section>
}
