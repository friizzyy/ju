import s from './SystemsFlow.module.css'

const steps = [
  { title: 'Map the work.', time: '30-minute discovery call', description: 'We walk through your tools, your team and the work that keeps piling up. No presentation needed. Just show me how things run.' },
  { title: 'Find the right fixes.', time: '5 or 10 business days', description: 'Your audit identifies the gaps, estimates the impact and puts the priorities in order. Choose a focused Snapshot or a deeper review.' },
  { title: 'Build it into your day.', time: 'Timeline agreed with scope', description: 'I build and test the systems around your existing tools. With an ongoing retainer, I keep them maintained as your business changes.' },
]

export default function SystemsProcess() {
  return <section id="process" className={s.process} aria-labelledby="systems-process-title">
    <div className={s.inner}>
      <header className={s.processIntro}>
        <p className={s.eyebrow}>FROM THE FIRST CONVERSATION</p>
        <h2 id="systems-process-title">A clear path forward<span>.</span></h2>
        <p>Understand the work. Decide what matters. Build what makes a difference.</p>
      </header>
      <ol className={s.steps}>
        {steps.map((step, index) => <li key={step.title}>
          <div className={s.stepMarker}><span>{String(index + 1).padStart(2, '0')}</span><i aria-hidden="true" /></div>
          <h3>{step.title}</h3>
          <p className={s.stepCopy}>{step.description}</p>
          <p className={s.stepTime}>{step.time}</p>
        </li>)}
      </ol>
    </div>
  </section>
}
