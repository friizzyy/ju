import Link from 'next/link'
import s from './SystemsFlow.module.css'

function StudioIllustration() {
  return <div className={s.studioIllustration} aria-hidden="true">
    <div className={s.browserBar}><i /><i /><i /><span>your next website</span></div>
    <div className={s.browserPage}>
      <div className={s.browserNav}><b>JU<span>.</span></b><div><i /><i /><i /></div></div>
      <p>Your business.<br /><span>Its own presence.</span></p>
      <div className={s.browserLine} /><div className={s.browserButton} />
      <div className={s.browserTiles}><i /><i /><i /></div>
    </div>
  </div>
}

export default function SystemsEnding() {
  return <div className={s.continuation}>
    <section id="systems-studio" className={s.studioSection} aria-labelledby="systems-studio-title">
      <div className={s.inner}>
        <div className={s.studioPanel}>
          <div className={s.studioCopy}>
            <p className={s.serviceLabel}>JU<span>.</span> Studio</p>
            <h2 id="systems-studio-title">A better front door<br />for your business<span>.</span></h2>
            <p className={s.studioDescription}>Need a website to match the work behind it? I design and build custom sites that connect with your customers and the systems you use.</p>
            <Link href="/studio" className={s.studioLink}>Explore JU. Studio <span aria-hidden="true">↗</span></Link>
          </div>
          <StudioIllustration />
        </div>
      </div>
    </section>
    <section id="start-a-project" className={s.closing} aria-labelledby="systems-closing-title">
      <div className={s.inner}>
        <p className={s.eyebrow}>LET’S TALK ABOUT YOUR WORK</p>
        <h2 id="systems-closing-title">Make room for what’s next<span>.</span></h2>
        <p className={s.invitation}>Tell me what takes too much time, what keeps getting missed, or what you wish your tools could do. We’ll work out the right place to start.</p>
        <a href="https://calendly.com/julius-buildwithju/systems-audit-45-min" target="_blank" rel="noopener noreferrer" className={s.bookingLink}>Talk with Julius <span aria-hidden="true">↗</span></a>
        <p className={s.callNote}>45-minute discovery call</p>
      </div>
    </section>
  </div>
}
