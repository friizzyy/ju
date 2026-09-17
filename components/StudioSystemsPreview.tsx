'use client'

import { useState } from 'react'
import s from './StudioSystemsPreview.module.css'

export default function StudioSystemsPreview() {
  const [organized, setOrganized] = useState(true)
  return <div className={s.workspace}>
    <div className={s.toolbar}>
      <span className={s.workspaceName}><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="3" y="3" width="14" height="14" rx="4" /><path d="M7 7h6M7 10h6M7 13h3" /></svg>Client workspace</span>
      <span className={s.example}>Example</span>
    </div>
    <div className={s.views}>
      <div className={s.view} id="studio-inquiry-incoming" aria-hidden={organized} inert={organized}>
        <div className={s.messageMeta}><span>Website contact form</span><span>New inquiry</span></div>
        <h3>A new project.</h3>
        <p className={s.message}>“We’re opening a new location and need a website. Can you help?”</p>
      </div>
      <div className={s.view} id="studio-inquiry-organized" aria-hidden={!organized} inert={!organized}>
        <div className={s.resultHeading}><h3>A clear next step.</h3><span className={s.review}><i aria-hidden="true" />For your review</span></div>
        <ul className={s.results}>
          <li><span className={s.stepIcon} aria-hidden="true">✓</span><span>Client record</span><strong>Details saved</strong></li>
          <li><span className={s.stepIcon} aria-hidden="true">✓</span><span>Project brief</span><strong>Prepared</strong></li>
          <li><span className={s.stepIcon} aria-hidden="true">↗</span><span>Follow-up</span><strong>Draft ready</strong></li>
        </ul>
      </div>
    </div>
    <div className={s.viewSwitch} role="group" aria-label="Explore an example inquiry workflow">
      <button type="button" aria-pressed={!organized} aria-controls="studio-inquiry-incoming" onClick={() => setOrganized(false)}>The inquiry</button>
      <button type="button" aria-pressed={organized} aria-controls="studio-inquiry-organized" onClick={() => setOrganized(true)}>The next step <span aria-hidden="true">↗</span></button>
    </div>
  </div>
}
