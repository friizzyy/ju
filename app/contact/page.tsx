import type { Metadata } from 'next'
import Reveal from '@/components/Reveal'
import ClipReveal from '@/components/ClipReveal'
import MagneticButton from '@/components/MagneticButton'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch. Book a call or send an email. No intake forms. No chatbots.',
}

export default function ContactPage() {
  return (
    <>
      {/* Hero:Centered dramatic with oversized period */}
      <section className="min-h-[80vh] flex items-center justify-center relative overflow-hidden px-6">
        <div className="relative z-10 text-center max-w-4xl">
          <ClipReveal direction="up">
            <h1 className="text-4xl sm:text-8xl lg:text-[11rem] font-bold tracking-[-0.06em] leading-[0.95] pb-4">
              Let&apos;s<br />talk<span className="text-accent">.</span>
            </h1>
          </ClipReveal>

          <Reveal delay={0.4}>
            <p className="text-muted/60 text-base sm:text-lg mt-8 max-w-md mx-auto">
              No intake forms. No chatbots. Just a conversation about what you need.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Contact methods */}
      <section className="py-16 sm:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 lg:items-stretch">
            {/* Primary:book a call */}
            <div className="lg:col-span-7 flex flex-col">
              <ClipReveal direction="left" className="flex flex-col flex-1">
                <a
                  href="https://calendly.com/julius-systems"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  className="group flex flex-col flex-1 p-6 sm:p-14 rounded-3xl border border-accent/[0.1] hover:border-accent/[0.2] bg-accent/[0.02] hover:bg-accent/[0.04] transition-all duration-500"
                >
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent/30 mb-8">Recommended</p>

                  <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors duration-300">
                    Book a call
                  </h2>
                  <p className="text-muted text-sm leading-relaxed mb-10 max-w-md">
                    30 minutes. No pitch. Just a conversation about what you
                    need and whether I can help. The fastest way to get started.
                  </p>

                  <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-background text-sm font-semibold group-hover:shadow-[0_0_30px_rgba(0,212,255,0.2)] transition-all duration-300">
                    calendly.com/julius-systems
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12L12 4M12 4H5M12 4v7" /></svg>
                  </span>
                </a>
              </ClipReveal>
            </div>

            {/* Secondary:email + location */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <ClipReveal direction="right" delay={0.1} className="flex flex-col flex-1">
                <a
                  href="mailto:julius@buildwithju.com"
                  data-cursor="link"
                  className="group flex flex-col flex-1 p-6 sm:p-10 rounded-2xl border border-white/[0.04] hover:border-white/[0.1] hover:bg-white/[0.01] transition-all duration-500"
                >
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted/25 mb-6">Email</p>
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">julius@buildwithju.com</h3>
                  <p className="text-sm text-muted/50 leading-relaxed">
                    I read every email and respond within 24 hours.
                  </p>
                  <p className="font-mono text-[10px] text-muted/25 mt-4 tracking-wider">RESPONDS WITHIN 24 HOURS</p>
                </a>
              </ClipReveal>

              <ClipReveal direction="right" delay={0.2} className="flex flex-col flex-1">
                <div className="flex flex-col flex-1 p-6 sm:p-10 rounded-2xl border border-white/[0.04]">
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted/25 mb-6">Location</p>
                  <h3 className="text-lg font-bold text-foreground mb-2">San Francisco & Grass Valley, CA</h3>
                  <p className="text-sm text-muted/50 leading-relaxed">
                    I split time between my place in SF and a ranch in Grass Valley. If you&apos;re anywhere between the Bay and the foothills, I can meet you there.
                  </p>
                  <p className="text-xs text-muted/30 mt-3 leading-relaxed">Working with clients locally and across the country.</p>
                </div>
              </ClipReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="py-12 sm:py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
            {[
              { q: "How fast?", a: "Sites ship in 2 weeks. Audits delivered in 48 hours." },
              { q: "Do you subcontract?", a: "No. You talk to me, I build it. One person, start to finish." },
              { q: "Where are you based?", a: "Split between San Francisco and a ranch in Grass Valley. I can meet anywhere in between." },
            ].map((item) => (
              <Reveal key={item.q}>
                <div className="bg-background/80 p-8 sm:p-10 hover:bg-white/[0.02] transition-colors duration-500">
                  <p className="text-sm font-bold text-foreground mb-2">{item.q}</p>
                  <p className="text-sm text-muted/50 leading-relaxed">{item.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
