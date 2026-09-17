'use client'

import { useState } from 'react'
import Link from 'next/link'
import MobileCarousel from './MobileCarousel'
import s from './AboutDetails.module.css'

const steps = [
  {
    title: 'Understand the work.',
    cue: 'Start with the right questions',
    body: 'We talk about your business, what you want to improve and what gets in the way. Together, we turn that into a clear direction and a scope that makes sense.',
    outcome: 'A plan we both understand.',
    details: ['Your priorities', 'A defined scope', 'A realistic timeline'],
  },
  {
    title: 'Build it together.',
    cue: 'See it take shape',
    body: 'I bring the design and development together. You get working previews to explore, with room to try things, share feedback and refine the details along the way.',
    outcome: 'Something you can actually try.',
    details: ['Working previews', 'Direct feedback', 'Thoughtful refinements'],
  },
  {
    title: 'Make it ready.',
    cue: 'Take care of the details',
    body: 'I check the experience across screens, connect the tools it needs and prepare it for real use. We agree on the handoff and any ongoing support before it goes live.',
    outcome: 'A clear path beyond launch.',
    details: ['Real-world checks', 'A considered handoff', 'Agreed support'],
  },
]

function Arrow() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function StudioVisual() {
  return <div className={`${s.visual} ${s.studioVisual}`} aria-hidden="true">
    <div className={s.windowBack} />
    <div className={s.window}>
      <div className={s.windowChrome}><span><i /><i /><i /></span><span>your corner of the internet</span><b>↗</b></div>
      <div className={s.windowContent}>
        <span className={s.windowBrand}>Yours.</span>
        <span className={s.windowMenu}><i /><i /></span>
        <div className={s.windowHeadline}>Made to be<br /><em>remembered.</em></div>
        <div className={s.windowObject}><i /><i /><i /></div>
        <div className={s.windowBottom}><span>A presence all your own.</span><span>↗</span></div>
      </div>
    </div>
    <span className={s.visualCaption}>The part your customers experience.</span>
  </div>
}

function SystemsVisual() {
  return <div className={`${s.visual} ${s.systemsVisual}`} aria-hidden="true">
    <div className={s.network}>
      <svg className={s.networkLines} viewBox="0 0 420 270" fill="none" preserveAspectRatio="none">
        <path d="M68 54H158Q210 54 210 105M352 54H262Q210 54 210 105M68 216H158Q210 216 210 165M352 216H262Q210 216 210 165" />
        <path className={s.signal} d="M68 54H158Q210 54 210 105M352 54H262Q210 54 210 105M210 165Q210 216 262 216H352M210 165Q210 216 158 216H68" />
      </svg>
      <span className={`${s.node} ${s.nodeTools}`}><svg viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="6" height="6" rx="1.5"/><rect x="14" y="4" width="6" height="6" rx="1.5"/><rect x="4" y="14" width="6" height="6" rx="1.5"/><rect x="14" y="14" width="6" height="6" rx="1.5"/></svg>Your tools</span>
      <span className={`${s.node} ${s.nodeContext}`}><svg viewBox="0 0 24 24" fill="none"><path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5"/></svg>Your context</span>
      <div className={s.core}><span className={s.coreRim} /><b>JU.</b><span>CONNECTED</span></div>
      <span className={`${s.node} ${s.nodeAgents}`}><svg viewBox="0 0 24 24" fill="none"><rect x="6" y="6" width="12" height="12" rx="3"/><path d="M9 3v3m6-3v3M9 18v3m6-3v3M3 9h3m-3 6h3m12-6h3m-3 6h3"/><circle cx="12" cy="12" r="2"/></svg>AI agents</span>
      <span className={`${s.node} ${s.nodeWork}`}><svg viewBox="0 0 24 24" fill="none"><path d="m5 12 4 4L19 6M5 21h14"/></svg>Work in motion</span>
    </div>
    <span className={s.visualCaption}>The part that keeps everything moving.</span>
  </div>
}

export default function AboutDetails() {
  const [openStep, setOpenStep] = useState<number | null>(0)

  return <div className={s.details}>
    <section id="about-practice" className={`${s.section} ${s.practice}`} aria-labelledby="practice-title">
      <header className={s.header}>
        <p className={s.eyebrow}>Design meets engineering</p>
        <h2 id="practice-title" className={s.heading}>One builder. <span>Both sides.</span></h2>
        <p>A considered presence. A better way to work.<br />I connect the two.</p>
      </header>
      <div className={s.rail}>
        <MobileCarousel label="Studio and Systems" desktopGrid>
          <article className={`${s.service} ${s.glass}`}>
            <div className={s.serviceTop}><span>01 / The experience</span><span>JU. Studio</span></div>
            <h3>A presence<br /><span>of your own.</span></h3>
            <StudioVisual />
            <p className={s.serviceCopy}>Custom websites that feel like your business. I bring the design and the build together, down to the details on every screen.</p>
            <Link href="/studio" className={`${s.serviceLink} ${s.glass}`}>Explore JU. Studio <Arrow /></Link>
          </article>
          <article className={`${s.service} ${s.glass}`}>
            <div className={s.serviceTop}><span>02 / The operation</span><span>JU. Systems</span></div>
            <h3>Less busywork.<br /><span>More possibility.</span></h3>
            <SystemsVisual />
            <p className={s.serviceCopy}>Software, AI agents and automations shaped around your work. Connect your tools, put information to use and keep things moving.</p>
            <Link href="/systems" className={`${s.serviceLink} ${s.glass}`}>Explore JU. Systems <Arrow /></Link>
          </article>
        </MobileCarousel>
      </div>
      <p className={s.practiceNote}><span />Separate starting points. The same care from start to finish.<span /></p>
    </section>

    <section id="about-approach" className={`${s.section} ${s.approach}`} aria-labelledby="approach-title">
      <header className={s.header}>
        <p className={s.eyebrow}>Working with me</p>
        <h2 id="approach-title" className={s.heading}>You’re part <span>of the build.</span></h2>
        <p>You talk directly with the person designing and building your project.<br className={s.wideBreak} /> Here’s how we get from the first conversation to something real.</p>
      </header>
      <div className={`${s.process} ${s.glass}`}>
        {steps.map((step, index) => {
          const open = openStep === index
          return <article className={s.step} key={step.title} data-open={open}>
            <h3>
              <button type="button" className={s.stepButton} id={`about-process-trigger-${index}`} aria-expanded={open} aria-controls={`about-process-panel-${index}`} onClick={() => setOpenStep(open ? null : index)}>
                <span className={s.stepNumber}>0{index + 1}</span>
                <span className={s.stepTitle}>{step.title}<span>{step.cue}</span></span>
                <span className={s.toggle} aria-hidden="true"><i /><i /></span>
              </button>
            </h3>
            <div className={s.expansion} id={`about-process-panel-${index}`} role="region" aria-labelledby={`about-process-trigger-${index}`} aria-hidden={!open} inert={!open}>
              <div className={s.expansionClip}>
                <div className={s.stepContent}>
                  <p>{step.body}</p>
                  <div className={s.outcome}><h4>{step.outcome}</h4><ul>{step.details.map(detail => <li key={detail}><span aria-hidden="true">✓</span>{detail}</li>)}</ul></div>
                </div>
              </div>
            </div>
          </article>
        })}
        <div className={s.processFooter}><span className={s.personalMark}>JU.</span><p>One conversation. One person to come back to.</p><Link href="/contact">Let’s connect <Arrow /></Link></div>
      </div>
    </section>

    <section id="start-a-project" className={`${s.section} ${s.closing}`} aria-labelledby="closing-title">
      <div className={`${s.invitation} ${s.glass}`}>
        <svg className={s.invitationLines} viewBox="0 0 1100 560" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden="true">{[0, 1, 2, 3, 4, 5].map(i => <path key={i} d={`M${-330 + i * 26} 560C${70 + i * 22} 530 ${-120 + i * 20} 20 ${230 + i * 22} -90M${830 + i * 26} 650C${1320 + i * 22} 520 ${850 + i * 22} -20 ${1360 + i * 22} -110`} />)}</svg>
        <p className={s.eyebrow}>The next good idea could be yours</p>
        <h2 id="closing-title" className={s.closingHeading}>Tell me what<br /><span>you’re thinking.</span></h2>
        <p className={s.invitationCopy}>An idea to build. A website to rethink.<br />A workflow to simplify. Let’s start there.</p>
        <a href="https://calendly.com/julius-buildwithju/30min" target="_blank" rel="noopener noreferrer" className={`${s.callButton} ${s.glass}`}>Talk with Julius <span><Arrow /></span></a>
        <span className={s.callNote}>30-minute intro call</span>
      </div>
    </section>
  </div>
}
