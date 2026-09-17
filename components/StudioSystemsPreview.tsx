'use client'

import { useState } from 'react'
import s from './StudioSystemsPreview.module.css'

export default function StudioSystemsPreview() {
  const [organized, setOrganized] = useState(false)
  return <div className={s.workspace}>
    <div className={s.toolbar}>
      <span className={s.windowDots} aria-hidden="true"><i /><i /><i /></span>
      <span className={s.workspaceName}>Client workspace</span>
      <span className={s.example}>Example</span>
    </div>
    <div className={s.viewSwitch} role="group" aria-label="Explore an example inquiry workflow">
      <button type="button" aria-pressed={!organized} aria-controls="studio-inquiry-incoming" onClick={() => setOrganized(false)}><span className={s.stepNumber} aria-hidden="true">01</span>The inquiry</button>
      <button type="button" aria-pressed={organized} aria-controls="studio-inquiry-organized" onClick={() => setOrganized(true)}><span className={s.stepNumber} aria-hidden="true">02</span>The next step</button>
    </div>
    <div className={s.views}>
      <div className={s.view} id="studio-inquiry-incoming" aria-hidden={organized} inert={organized}>
        <div className={s.sender}>
          <span className={s.avatar} aria-hidden="true">M</span>
          <div><strong>Maya</strong><span>Via your website</span></div>
          <span className={s.newMessage}>New inquiry</span>
        </div>
        <h3>A second location.</h3>
        <p className={s.message}>Hi! We’re opening a second location and need a website with online booking. We’d love to launch this fall. Can you help?</p>
        <div className={s.context}><span className={s.contextIcon} aria-hidden="true">↳</span><p>A new lead. A project to scope.<br /><span>A conversation to keep moving.</span></p></div>
        <div className={s.status}><span className={s.statusDot} aria-hidden="true" />Received in your workspace</div>
      </div>
      <div className={s.view} id="studio-inquiry-organized" aria-hidden={!organized} inert={!organized}>
        <div className={s.ready}><span aria-hidden="true">✓</span>Organized for you</div>
        <h3>Ready for your reply.</h3>
        <dl className={s.brief}>
          <div><dt>Project</dt><dd>Website + online booking</dd></div>
          <div><dt>Target</dt><dd>Fall launch</dd></div>
        </dl>
        <div className={s.draft}>
          <div className={s.draftLabel}><span>Draft reply to Maya</span><span>Not sent</span></div>
          <p>Hi Maya, happy to help. Let’s talk through the new location, booking needs and your fall timeline.</p>
        </div>
        <div className={s.status}><span aria-hidden="true">✓</span>Lead saved<span className={s.review}>You review. Then send.</span></div>
      </div>
    </div>
  </div>
}
