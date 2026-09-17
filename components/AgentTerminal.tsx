'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import HeroAgentIcon from './HeroAgentIcon'
import s from './AgentTerminal.module.css'

const agents = [
  { id: 'zeus', name: 'Zeus', role: 'Coordinate', delay: 200 },
  { id: 'athena', name: 'Athena', role: 'Research', delay: 1300 },
  { id: 'hermes', name: 'Hermes', role: 'Draft', delay: 2400 },
  { id: 'ares', name: 'Ares', role: 'Organize', delay: 3500 },
] as const

const messages = [
  { from: 'Zeus', to: 'Athena', text: 'Assigning the inquiry.', delay: 200 },
  { from: 'Athena', to: 'Hermes', text: 'Context checked. Brief shared.', delay: 1300 },
  { from: 'Hermes', to: 'Ares', text: 'Follow-up drafted.', delay: 2400 },
  { from: 'Ares', to: 'Zeus', text: 'Review task created.', delay: 3500 },
]

const delayStyle = (delay: number) => ({ '--delay': `${delay}ms` }) as CSSProperties

export default function AgentTerminal() {
  const terminal = useRef<HTMLElement>(null)
  const [complete, setComplete] = useState(false)

  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    const finish = () => setComplete(true)
    const onPreference = () => { if (preference.matches) finish() }
    const onVisibility = () => { if (document.hidden) finish() }
    onPreference()
    onVisibility()
    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) finish() }, { threshold: 0 })
      : undefined
    if (terminal.current) observer?.observe(terminal.current)
    let width = terminal.current?.clientWidth
    const resize = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => {
      const nextWidth = terminal.current?.clientWidth
      if (nextWidth !== width) { width = nextWidth; finish() }
    }) : undefined
    if (terminal.current) resize?.observe(terminal.current)
    preference.addEventListener('change', onPreference)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      observer?.disconnect()
      resize?.disconnect()
      preference.removeEventListener('change', onPreference)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <div className={s.stage}>
      <figure ref={terminal} className={s.terminal} data-complete={complete} aria-label="Example of AI agents coordinating an inquiry follow-up">
        <div className={s.chrome}>
          <span className={s.dots} aria-hidden="true"><i /><i /><i /></span>
          <span className={s.windowTitle}>agent workspace</span>
          <span className={s.example}>Example workflow</span>
        </div>
        <div className={s.agents} aria-label="Agents in this example">
          {agents.map((agent, index) => (
            <div key={agent.id} className={s.agent} style={delayStyle(agent.delay)}>
              <span className={s.icon}><HeroAgentIcon id={agent.id} /></span>
              <span><strong>{agent.name}</strong><span className={s.role}>{agent.role}</span></span>
              {index < agents.length - 1 && <span className={s.connection} aria-hidden="true"><i /></span>}
            </div>
          ))}
        </div>
        <div className={s.workspace} aria-hidden="true">
          <div className={s.console}>
            <p className={s.command}><span>$</span> ju run follow-up</p>
            <ol className={s.transcript}>
              {messages.map((message, index) => (
                <li key={message.from} className={s.message} data-last={index === messages.length - 1} style={delayStyle(message.delay)}>
                  <span className={s.sender}><strong>{message.from}</strong><span className={s.arrow}>→</span><span>{message.to}</span></span>
                  <span className={s.messageText}>{message.text}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className={s.draft}>
            <div className={s.draftHeader}><svg viewBox="0 0 24 24" fill="none"><path d="M7 3h7l4 4v14H6V3h1Zm7 0v5h4M9 12h6M9 16h4" /></svg><span>follow-up.md</span></div>
            <div className={s.draftBody}>
              <span className={s.draftLabel}>DRAFT / INQUIRY RESPONSE</span>
              <p className={s.draftTitle}>A thoughtful next step.</p>
              <p className={s.draftCopy}>Thanks for getting in touch.{' '}<br />I’ve reviewed your brief.{' '}<br />Let’s talk through the next steps.</p>
            </div>
            <div className={s.result} onAnimationEnd={event => { if (event.target === event.currentTarget) setComplete(true) }}>
              <span className={s.check}>✓</span><span>Ready for your review</span>
            </div>
          </div>
        </div>
        <figcaption className={s.screenReader}>An illustrative workflow: Zeus assigns an inquiry to Athena, who checks the context and passes a brief to Hermes. Hermes drafts a reply, and Ares creates a review task. The draft is ready for your review.</figcaption>
      </figure>
    </div>
  )
}
