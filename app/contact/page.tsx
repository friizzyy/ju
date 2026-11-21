import type { Metadata } from 'next'
import Image from 'next/image'
import CopyEmail from '@/components/CopyEmail'
import { BookingDays, LocalTime } from '@/components/BookingLive'
import s from './Contact.module.css'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'A new website, a smarter workflow, or an idea worth exploring. Book a 30-minute conversation with Julius or email directly.',
}

const email = 'julius@buildwithju.com'
const booking = 'https://calendly.com/julius-buildwithju/30min'

function Arrow() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

const questions = [
  { title: 'Do I need a finished brief?', answer: 'No. Bring what you have: an idea, your current website, or a process that takes too much of your time. We’ll work out what matters and where to start.' },
  { title: 'Who will I be working with?', answer: 'Me, Julius. I handle the design and the build, and you work directly with me throughout the project.' },
  { title: 'What happens after the call?', answer: 'We’ll agree on the next step. For a website, that means defining the scope and timeline. For systems, we’ll decide whether an audit is the right place to begin.' },
  { title: 'Can we meet in person?', answer: 'I split my time between San Francisco and Grass Valley, California, and can meet in between. I also work remotely with clients across the country.' },
]

export default function ContactPage() {
  return <div id="contact-page" className={s.page}>
    <section className={s.hero} aria-labelledby="contact-title">
      <div className={s.intro}>
        <p className={s.eyebrow}><span className={s.studioDot} /> JU. Studio <span className={s.separator}>/</span><span className={s.systemsDot} /> JU. Systems</p>
        <h1 id="contact-title">Let’s <span className={s.lastWord}><span className={s.outline}>talk</span><span className={s.period}>.</span></span></h1>
        <p className={s.lead}>A new website. A smarter workflow.<br />Tell me what you have in mind.</p>
      </div>
      <div className={s.invitation}>
        <div className={s.conversation}>
          <p className={s.kicker}>A CONVERSATION WITH JULIUS <span className={s.kickerSep}>·</span> 30 MIN</p>
          <h2>A good place <br />to start.</h2>
          <p className={s.description}>You don’t need all the answers. <br />Just something you’d like to make better.</p>
          <ol className={s.agenda} aria-label="What we’ll talk about">
            <li><span>01</span>Your idea, your business, your goals.</li>
            <li><span>02</span>What’s working. What could work better.</li>
            <li><span>03</span>A clear next step, together.</li>
          </ol>
        </div>
        <div className={s.booking}>
          <div className={s.presence}>
            <Image src="/images/about/julius-williams.png" alt="" width={864} height={1080} sizes="52px" quality={80} className={s.portrait} />
            <div><p className={s.name}>Julius Williams</p><LocalTime /></div>
          </div>
          <p className={s.pickLabel}>Choose a day</p>
          <BookingDays booking={booking} />
          <div className={s.actions}>
            <a href={booking} target="_blank" rel="noopener noreferrer" className={s.bookButton}>See all times <Arrow /></a>
            <p className={s.or} aria-hidden="true"><span>or</span></p>
            <div className={s.emailActions}>
              <a className={s.emailLink} href={`mailto:${email}`}>{email}</a>
              <CopyEmail email={email} />
            </div>
          </div>
        </div>
      </div>
      <div className={s.location}><span>Based in California.</span><span>San Francisco <span aria-hidden="true">↔</span> Grass Valley</span><span>Working together, wherever you are.</span></div>
    </section>
    <section className={s.questions} aria-labelledby="contact-questions-title">
      <div className={s.questionsIntro}><p className={s.kicker}>A FEW USEFUL DETAILS</p><h2 id="contact-questions-title">Before we <br /><span>get started.</span></h2><p>No intake forms. No chatbots. <br />A direct line to the person building it.</p></div>
      <div className={s.answers}>{questions.map(question => <details key={question.title} className={s.answer}><summary>{question.title}<span className={s.plus} aria-hidden="true" /></summary><p>{question.answer}</p></details>)}</div>
    </section>
  </div>
}
