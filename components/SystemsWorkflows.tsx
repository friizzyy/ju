'use client'

import { useState } from 'react'
import { systemsWorkflows, type SystemsWorkflow } from '@/data/systems-workflows'
import SystemsWorkflowScene from './SystemsWorkflowScene'
import styles from './SystemsWorkflows.module.css'

const navigationLabels = ['Sales & clients', 'Operations', 'Commerce', 'Social media', 'Knowledge', 'Personal']

function WorkflowDetail({ workflow, prefix = 'workflow', staticPreview = false }: { workflow: SystemsWorkflow; prefix?: string; staticPreview?: boolean }) {
  return <>
    <div className={styles.panelHeading}>
      <h3 id={`${prefix}-title-${workflow.id}`}>{workflow.title}</h3>
      <p>{workflow.description}</p>
    </div>
    <SystemsWorkflowScene workflow={workflow} prefix={prefix} staticPreview={staticPreview}/>
    <div className={styles.buildDetails}>
      <span>What I build</span>
      <ul role="list">{workflow.builds.map(build => <li key={build}><span aria-hidden="true">↗</span>{build}</li>)}</ul>
      <p><span>Built for</span>{workflow.audience}</p>
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
        <p>I build custom software, AI agents and automations around the way you work—from serving customers and running operations to creating content and planning your day.</p>
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
