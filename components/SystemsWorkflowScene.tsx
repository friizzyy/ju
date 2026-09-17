'use client'

import { useState } from 'react'
import type { SystemsWorkflow } from '@/data/systems-workflows'
import styles from './SystemsWorkflows.module.css'

const requests = {
  sales: { text: 'A new inquiry came through the website. Put the brief in our CRM, prepare a personal response and help them book the right conversation.', context: [['From', 'Website inquiry'], ['Connect', 'CRM, email, calendar'], ['Keep me involved', 'Review before sending']] },
  operations: { text: 'We have a new job to schedule. Find the right team, collect the documents and make sure everyone knows what needs to happen.', context: [['From', 'Intake form'], ['Connect', 'People, tasks, documents'], ['Keep me involved', 'Exceptions and approvals']] },
  commerce: { text: 'Check what is selling, what is running low and what we should buy next. Bring the useful decisions together for me.', context: [['From', 'Store and stockroom'], ['Connect', 'Orders, inventory, suppliers'], ['Keep me involved', 'Approve purchase orders']] },
  social: { text: 'We are launching something new. Turn the story into content for our social channels, newsletter and community, in our voice.', context: [['From', 'A launch brief'], ['Connect', 'Brand voice, channels, calendar'], ['Keep me involved', 'Approve the content']] },
  knowledge: { text: 'Our team keeps answering the same questions. Make our guides easy to search and help people find the right answer with its source.', context: [['From', 'A team question'], ['Connect', 'Guides, documents, support'], ['Keep me involved', 'Hand off uncertain answers']] },
  personal: { text: 'Help me plan a city break. Use the things I like, keep the route practical and leave enough room to enjoy it.', context: [['From', 'A conversation with you'], ['Connect', 'Preferences, research, calendar'], ['Keep me involved', 'My choices and bookings']] },
} as const

const mobileBriefs = {
  sales: { title: 'Follow up on an inquiry.', text: 'Add the brief to my CRM, draft a personal reply and help the client book a call.' },
  operations: { title: 'Get a new job moving.', text: 'Match the job to a team, gather the documents and share a clear handoff.' },
  commerce: { title: 'Plan the next stock order.', text: 'Review sales and stock, flag what’s running low and prepare a buying plan.' },
  social: { title: 'Turn one idea into content.', text: 'Turn this launch into drafts for social, email and our community, in our voice.' },
  knowledge: { title: 'Find the right answer.', text: 'Use our company guides to answer the question and show where the answer came from.' },
  personal: { title: 'Plan a trip around me.', text: 'Use my preferences to research a city break, with practical routes and time to explore.' },
} as const

function Check() {
  return <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m3 8 3 3 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function SalesResult() {
  return <div className={styles.salesResult}>
    <div className={styles.resultLead}><span className={styles.resultStatus}><Check /> Brief organized</span><span>Follow-up / draft</span></div>
    <div className={styles.correspondence}>
      <div className={styles.correspondenceTo}><span>To</span><strong>Your next client</strong><span className={styles.recipientMark}>↗</span></div>
      <h4>Let’s talk about your project.</h4>
      <p>Thanks for sharing what you have in mind. I’ve pulled together the key details so we can start with the right conversation.</p>
      <p>Here’s a time to talk through the scope, priorities and next steps.</p>
      <div className={styles.meetingLine}><span className={styles.meetingIcon}>↗</span><div><strong>A conversation, ready to book</strong><span>Matched to your services and availability</span></div></div>
    </div>
    <div className={styles.resultFoot}><span><Check /> Saved to your client workspace</span><strong>Ready for your review</strong></div>
  </div>
}

function OperationsResult() {
  return <div className={styles.operationsResult}>
    <div className={styles.resultLead}><span className={styles.resultStatus}><Check /> Work coordinated</span><span>Team schedule</span></div>
    <h4 className={styles.compactResultTitle}>The right people.<br className={styles.resultLineBreak}/> The whole picture.</h4>
    <div className={styles.schedule}>
      {[['09:00', 'Site visit', 'Field team', 'Brief attached'], ['11:30', 'Document review', 'Operations', 'Files collected'], ['14:00', 'Client handoff', 'Account lead', 'Next steps prepared']].map(([time, task, team, detail],i) => <div className={styles.scheduleRow} key={task}><time>{time}</time><div className={styles.scheduleLine}><i /></div><div><strong>{task}</strong><span>{team}</span><div className={styles.scheduleTrack}><i style={{ width: `${[78,56,90][i]}%` }} /></div><small>{detail}</small></div></div>)}
    </div>
    <div className={styles.resultFoot}><span><Check /> Context travels with the task</span><strong>One shared view</strong></div>
  </div>
}

function CommerceResult() {
  return <div className={styles.commerceResult}>
    <div className={styles.resultLead}><span className={styles.resultStatus}><Check /> Stock reviewed</span><span>Buying overview</span></div>
    <div className={styles.inventoryHeadline}><h4>See what needs<br />your attention.</h4><span><i /> Stock level<br /><i /> Reorder point</span></div>
    <div className={styles.stockChart} role="img" aria-label="Illustrative stock level declining toward a reorder point, indicating an item to review.">
      <svg viewBox="0 0 620 130" preserveAspectRatio="none" aria-hidden="true"><path className={styles.chartGrid} d="M0 20H620M0 65H620M0 110H620"/><path className={styles.threshold} d="M0 92H620"/><path className={styles.chartArea} d="M0 25C60 25 80 18 120 32S205 35 255 55S330 41 382 68S485 70 532 86S588 89 620 102V130H0Z"/><path className={styles.chartLine} pathLength="1" d="M0 25C60 25 80 18 120 32S205 35 255 55S330 41 382 68S485 70 532 86S588 89 620 102"/><circle cx="532" cy="86" r="5"/></svg>
      <div><span>Recent stock movement</span><span>Time to review ↗</span></div>
    </div>
    <div className={styles.inventoryRows}>
      {[['Everyday essentials','Reorder recommended'],['Signature collection','Stock healthy'],['Seasonal range','Review slow movers']].map(([name,status])=><div key={name}><strong>{name}</strong><span>{status}</span></div>)}
    </div>
    <div className={styles.resultFoot}><span><Check /> Supplier context included</span><strong>Your buying decision</strong></div>
  </div>
}

function SocialResult() {
  return <div className={styles.socialResult}>
    <div className={styles.resultLead}><span className={styles.resultStatus}><Check /> One idea, adapted</span><span>Campaign workspace</span></div>
    <div className={styles.campaign}>
      <div className={styles.campaignArtwork} role="img" aria-label="Illustrative brand post reading The story behind the work, with an abstract navy print design."><span>your brand<span>.</span></span><div className={styles.printLines} aria-hidden="true"><i/><i/><i/><i/><i/></div><h4>The story<br />behind the work.</h4><span>A new chapter, in your voice.</span></div>
      <div className={styles.channelPlan}><h4>Made for each channel.</h4>{[['Social post','The first impression.'],['Newsletter','The story in more depth.'],['Community','Start a conversation.']].map(([channel,note])=><div key={channel}><span className={styles.channelMark}>↗</span><div><strong>{channel}</strong><span>{note}</span></div><Check/></div>)}<p>One brief. A consistent voice. A plan for each channel.</p></div>
    </div>
    <div className={styles.resultFoot}><span><Check /> Prepared for your content calendar</span><strong>You approve the final edit</strong></div>
  </div>
}

function KnowledgeResult() {
  return <div className={styles.knowledgeResult}>
    <div className={styles.resultLead}><span className={styles.resultStatus}><Check /> Sources connected</span><span>Team knowledge</span></div>
    <div className={styles.knowledgeQuestion}><span>Your team asks</span><h4 className={styles.compactResultTitle}>How do we onboard<br className={styles.resultLineBreak}/> a new client?</h4></div>
    <div className={styles.knowledgeAnswer}><span className={styles.answerMark}>JU<span>.</span></span><div><p>Start with a clear handoff.</p><ol><li>Confirm the agreed scope and key contacts.</li><li>Collect the project brief and required files.</li><li>Open the client portal and share the next steps.</li></ol><div className={styles.sourceReference}><span>↗</span><div><strong>Client onboarding guide</strong><span>Answer grounded in your documents</span></div></div></div></div>
    <div className={styles.resultFoot}><span><Check /> Context kept with the answer</span><strong>Human handoff when needed</strong></div>
  </div>
}

function PersonalResult() {
  return <div className={styles.personalResult}>
    <div className={styles.resultLead}><span className={styles.resultStatus}><Check /> Preferences considered</span><span>Your personal desk</span></div>
    <h4 className={styles.compactResultTitle}>A day that leaves<br className={styles.resultLineBreak}/> room for you.</h4>
    <div className={styles.dayPlan}>{[['A slow start','A good coffee near your stay.','A short walk'],['A little discovery','A neighborhood picked around your interests.','Time to explore'],['An easy evening','Dinner nearby, with the rest left open.','No rushing back']].map(([title,body,note],i)=><div key={title}><span className={styles.routeMark}>{i===0?'◉':'○'}</span><div><strong>{title}</strong><p>{body}</p><span>{note}</span></div></div>)}</div>
    <div className={styles.resultFoot}><span><Check /> Your feedback shapes the next plan</span><strong>Your choices, remembered</strong></div>
  </div>
}

function WorkflowResult({ id }: { id: SystemsWorkflow['id'] }) {
  if (id === 'sales') return <SalesResult />
  if (id === 'operations') return <OperationsResult />
  if (id === 'commerce') return <CommerceResult />
  if (id === 'social') return <SocialResult />
  if (id === 'knowledge') return <KnowledgeResult />
  return <PersonalResult />
}

export default function SystemsWorkflowScene({ workflow, prefix = 'workflow', staticPreview = false }: { workflow: SystemsWorkflow; prefix?: string; staticPreview?: boolean }) {
  const [view, setView] = useState<'request'|'result'>('result')
  const [exampleExpanded, setExampleExpanded] = useState(false)
  const request = requests[workflow.id]
  const brief = mobileBriefs[workflow.id]
  const base = `${prefix}-demo-${workflow.id}`
  return <div className={styles.scene} role="group" aria-label={`${workflow.label}: illustrative workflow`}>
    <div className={styles.mobileExample} data-expanded={staticPreview || exampleExpanded}>
      {!staticPreview && <button type="button" className={styles.exampleToggle} aria-expanded={exampleExpanded} aria-controls={`${base}-example`} onClick={() => setExampleExpanded(expanded => !expanded)}>
        See an example <span aria-hidden="true">+</span>
      </button>}
      <div id={`${base}-example`} className={styles.exampleDisclosure}><div className={styles.exampleContent}>
        <div className={styles.exampleRequest}>
          <span>Example request</span>
          <h4>{brief.title}</h4>
          <p>{brief.text}</p>
          <div className={styles.requestTools}><span>Works with</span><ul aria-label="Connected tools and context">{request.context[1][1].split(', ').map(tool => <li key={tool}>{tool}</li>)}</ul></div>
        </div>
        <p className={styles.exampleResultLabel}><span aria-hidden="true">↓</span>What the system prepares</p>
        <div className={`${styles.sceneState} ${styles.mobileResult}`}><WorkflowResult id={workflow.id}/></div>
      </div></div>
    </div>
    <div className={styles.desktopExample}>
      <div className={styles.sceneHeader}><span className={styles.exampleLabel}>Illustrative workflow</span>{!staticPreview && <div className={styles.sceneControls} role="group" aria-label={`${workflow.label} preview view`}>
        <button type="button" aria-pressed={view==='request'} aria-controls={`${base}-request`} onClick={()=>setView('request')}>Request</button>
        <button type="button" aria-pressed={view==='result'} aria-controls={`${base}-result`} onClick={()=>setView('result')}>Result</button>
      </div>}</div>
      <div className={styles.sceneStates}>
        {!staticPreview && <div id={`${base}-request`} className={`${styles.sceneState} ${styles.requestState}`} aria-hidden={view!=='request'} inert={view!=='request'}>
          <span className={styles.requestOverline}>It starts with your workflow.</span>
          <p className={styles.requestText}>{request.text}</p>
          <dl className={styles.requestContext}>{request.context.map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
          <p className={styles.requestHint}>Select Result to see what the system prepares.<span aria-hidden="true">↗</span></p>
        </div>}
        <div id={`${base}-result`} className={styles.sceneState} aria-hidden={staticPreview?undefined:view!=='result'} inert={staticPreview?undefined:view!=='result'}>
          <WorkflowResult id={workflow.id}/>
        </div>
      </div>
    </div>
  </div>
}
