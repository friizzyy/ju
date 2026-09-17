'use client'

import { useState } from 'react'
import { systemsWorkflows, type SystemsWorkflow } from '@/data/systems-workflows'
import SystemsWorkflowScene from './SystemsWorkflowScene'
import styles from './SystemsWorkflows.module.css'

const navigationLabels = ['Sales & clients', 'Operations', 'Commerce', 'Social media', 'Knowledge', 'Personal']
const compactDescriptions: Record<SystemsWorkflow['id'], string> = {
  sales: 'CRMs, proposals and client portals that carry the context from first inquiry to ongoing service.',
  operations: 'Scheduling, documents and team handoffs in one place, built around how your operation runs.',
  commerce: 'Connect your orders, stock and suppliers, with clearer buying decisions and customer updates.',
  social: 'Research, drafts, approvals and publishing, connected in your brand’s voice.',
  knowledge: 'Search your company’s knowledge, get answers with sources and hand off to a person when needed.',
  personal: 'An assistant for travel, planning and everyday tasks that remembers your preferences.',
}

const buildDescriptions: Record<SystemsWorkflow['id'], readonly string[]> = {
  sales: ['Find relevant leads and prepare replies with the right context.', 'Turn an agreed scope into proposals, forms and clear next steps.', 'Keep files, updates and appointments in one place.'],
  operations: ['Assign work, balance schedules and give each task an owner.', 'Collect the right files and route them to the right person.', 'See workloads, delays and decisions that need attention.'],
  commerce: ['Track stock and prepare reorder recommendations.', 'Keep customers informed as orders move through fulfillment.', 'Bring purchasing and sales information into one view.'],
  social: ['Plan posts and move approved content into your channels.', 'Adapt one idea for each format while keeping your voice.', 'Organize conversations, answer common questions and flag replies.'],
  knowledge: ['Search company documents and get answers with sources.', 'Prepare relevant replies and hand complex questions to your team.', 'Keep processes and guidance easy to find and maintain.'],
  personal: ['Research stays, routes and plans around your preferences.', 'Remember useful details, interests and past choices.', 'Organize tasks and follow through on reminders.'],
}

function BuildDetails({ workflow }: { workflow: SystemsWorkflow }) {
  return <div className={styles.buildDetails}>
    <h4 className={styles.buildLabel}>What I build<span className={styles.mobileBuildLabel}> for you</span></h4>
    <ul role="list">{workflow.builds.map((build, index) => <li key={build}>
      <span className={styles.buildArrow} aria-hidden="true">↗</span>
      <div><span>{build}</span><p className={styles.buildDescription}>{buildDescriptions[workflow.id][index]}</p></div>
    </li>)}</ul>
    <p className={styles.buildAudience}><span>Built for</span>{workflow.audience}</p>
  </div>
}

function WorkflowDetail({ workflow, prefix = 'workflow', staticPreview = false }: { workflow: SystemsWorkflow; prefix?: string; staticPreview?: boolean }) {
  return <>
    <div className={styles.panelHeading}>
      <h3 id={`${prefix}-title-${workflow.id}`}>{workflow.title}</h3>
      <p className={styles.fullDescription}>{workflow.description}</p>
      <p className={styles.compactDescription}>{compactDescriptions[workflow.id]}</p>
    </div>
    <div className={styles.workflowCard}>
      <BuildDetails workflow={workflow}/>
      <SystemsWorkflowScene workflow={workflow} prefix={prefix} staticPreview={staticPreview}/>
    </div>
  </>
}

export default function SystemsWorkflows() {
  const [selected, setSelected] = useState(0)
  return <section id="systems-workflows" aria-labelledby="systems-workflows-title" className={styles.section}>
    <div className={styles.inner}>
      <div className={styles.divider} aria-hidden="true"><span /></div>
      <header className={styles.intro}>
        <h2 id="systems-workflows-title">Modernizing <span>workflows.</span></h2>
        <p className={styles.fullDescription}>I build custom software, AI agents and automations around the way you work—from serving customers and running operations to creating content and planning your day.</p>
        <p className={styles.compactDescription}>Custom software. AI agents. Automations.</p>
      </header>
      <div className={styles.surface}>
        <div className={styles.navigation}>
          <div className={styles.selectors} role="group" aria-label="Explore systems for your work">
            {systemsWorkflows.map((workflow, index) => <button key={workflow.id} id={`workflow-button-${workflow.id}`} type="button" aria-label={workflow.label} aria-pressed={selected === index} aria-controls={`workflow-${workflow.id}`} onClick={() => setSelected(index)}>{navigationLabels[index]}</button>)}
          </div>
        </div>
        <div className={styles.panels}>
          {systemsWorkflows.map((workflow, index) => <section key={workflow.id} id={`workflow-${workflow.id}`} className={styles.panel} aria-labelledby={`workflow-title-${workflow.id}`} aria-hidden={selected !== index} inert={selected !== index}>
            <WorkflowDetail workflow={workflow}/>
          </section>)}
        </div>
        <noscript>
          <style>{`.${styles.navigation},.${styles.panels}{display:none}.${styles.staticPanel}+ .${styles.staticPanel}{border-top:1px solid rgba(164,187,220,.2)}`}</style>
          {systemsWorkflows.map(workflow => <section key={workflow.id} className={`${styles.panel} ${styles.staticPanel}`} aria-labelledby={`fallback-title-${workflow.id}`}><WorkflowDetail workflow={workflow} prefix="fallback" staticPreview/></section>)}
        </noscript>
      </div>
      <p className={styles.footer}>Your workflow. Your tools. <span>Built to work together.</span></p>
    </div>
  </section>
}
