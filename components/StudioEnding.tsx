import Link from 'next/link'
import StudioSystemsPreview from './StudioSystemsPreview'
import s from '@/app/studio/StudioFlow.module.css'

function WorkflowIllustration() {
  return (
    <figure className={s.workflow}>
      <svg className={s.wideWorkflow} viewBox="0 0 560 286" fill="none" aria-hidden="true" focusable="false">
        <path d="M174 143H235M307 143H347M347 77V209M347 77H373M347 143H373M347 209H373" stroke="#536282" strokeWidth="1.5" />
        <path d="m226 138 6 5-6 5" stroke="#a9b9da" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="347" cy="143" r="3.5" fill="#8597bd" />
        <rect x="10" y="51" width="166" height="184" rx="12" fill="#171421" stroke="#625071" />
        <path d="M10 79H176" stroke="#625071" strokeOpacity=".5" />
        <circle cx="23" cy="65" r="2" fill="#a18bbf" /><circle cx="31" cy="65" r="2" fill="#a18bbf" /><circle cx="39" cy="65" r="2" fill="#a18bbf" />
        <rect x="26" y="98" width="63" height="5" rx="2.5" fill="#d7c8e8" />
        <rect x="26" y="113" width="105" height="5" rx="2.5" fill="#d7c8e8" />
        <rect x="26" y="133" width="83" height="3" rx="1.5" fill="#806e92" />
        <rect x="26" y="143" width="97" height="3" rx="1.5" fill="#806e92" />
        <rect x="26" y="163" width="64" height="19" rx="9.5" fill="#8b5cf6" />
        <rect x="26" y="199" width="59" height="18" rx="3" fill="#30233f" />
        <rect x="95" y="199" width="64" height="18" rx="3" fill="#30233f" />
        <rect x="238" y="106" width="70" height="74" rx="19" fill="#19283e" stroke="#6c82a9" />
        <path d="M250 116H296" stroke="#a9bfe1" strokeOpacity=".3" strokeLinecap="round" />
        <text x="273" y="152" fill="#e2eaf7" textAnchor="middle" fontSize="25" fontWeight="600" letterSpacing="-2" fontFamily="Arial, sans-serif">JU.</text>
        <circle cx="273" cy="94" r="3" fill="#a3b7d8" />
        <path d="M273 99V105" stroke="#536282" />
        <g stroke="#afc2e2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="381" y="68" width="21" height="16" rx="3" /><path d="m382 70 9.5 7 9.5-7" />
          <rect x="381" y="133" width="21" height="19" rx="3" /><path d="M386 139H397M386 145H393" />
          <path d="M382 216V202H402M396 196l6 6-6 6" />
        </g>
        <g fill="#c4d1e7" fontSize="15" fontFamily="Arial, sans-serif">
          <text x="415" y="82">Inquiry received</text><text x="415" y="148">Details organized</text><text x="415" y="214">Follow-up drafted</text>
        </g>
        <path d="M415 94H537M415 160H537M415 226H537" stroke="#536282" strokeOpacity=".35" />
      </svg>
      <div className={s.compactWorkflow} aria-hidden="true">
        <div className={s.workflowSource}>
          <svg viewBox="0 0 72 92" fill="none">
            <rect x="1" y="1" width="70" height="90" rx="8" fill="#171921" stroke="#5d536f" />
            <path d="M1 17H71" stroke="#5d536f" />
            <circle cx="10" cy="9" r="1.5" fill="#a9a5bd" /><circle cx="16" cy="9" r="1.5" fill="#a9a5bd" />
            <path d="M11 30H50M11 37H42M11 48H60M11 54H53" stroke="#a9a5bd" strokeWidth="3" strokeLinecap="round" />
            <rect x="11" y="67" width="31" height="10" rx="5" fill="#8f7bb2" />
          </svg>
          <span>JU. Systems</span>
        </div>
        <ol className={s.workflowSteps}><li>Inquiry received</li><li>Details organized</li><li>Follow-up drafted</li></ol>
      </div>
      <figcaption>Example: an inquiry, organized details, a drafted follow-up.</figcaption>
    </figure>
  )
}

export default function StudioEnding() {
  return (
    <>
      <section id="studio-systems" className={s.systemsSection} aria-labelledby="studio-systems-title">
        <div className={s.inner}>
          <div className={s.systemsPanel}>
            <div className={s.systemsContent}>
              <p className={s.serviceLabel}>JU<span>.</span> Systems <span className={s.serviceNote}>BEYOND THE WEBSITE</span></p>
              <h2 id="studio-systems-title"><span className={s.desktopPitch}>Automate the admin behind your website<span className={s.pitchDot}>.</span></span><span className={s.compactPitch}>Your website is<br />just the beginning<span className={s.pitchDot}>.</span></span></h2>
              <p className={s.systemsCopy}><span className={s.desktopPitch}>Organize inquiries, update records and prepare follow-ups. JU. Systems starts with an audit, then builds AI agents for the workflows worth automating.</span><span className={s.compactPitch}>Custom tools and AI agents for the work that happens after someone hits send.</span></p>
              <Link href="/systems" className={`${s.systemsLink} ${s.desktopLink}`}>Explore JU. Systems <span aria-hidden="true">↗</span></Link>
            </div>
            <WorkflowIllustration />
            <div className={s.mobileWorkspace}><StudioSystemsPreview /></div>
            <Link href="/systems" className={`${s.systemsLink} ${s.mobileLink}`}>Explore JU. Systems <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>
      <section id="start-a-project" className={s.closingSection} aria-labelledby="studio-closing-title">
        <div className={s.inner}>
          <div className={s.closingLayout}>
            <h2 id="studio-closing-title">Let’s build your next website<span>.</span></h2>
            <div className={s.invitation}>
              <p>Have a new project or a website that needs a rethink? Tell me what you need. We’ll agree on the scope and timeline before the build begins.</p>
              <Link href="https://calendly.com/julius-buildwithju/studio-quick-look" target="_blank" rel="noopener noreferrer" className={s.bookingLink}>
                Talk with Julius <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
