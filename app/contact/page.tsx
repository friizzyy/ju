import type { Metadata } from 'next'
import Link from 'next/link'
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
            <h1 className="text-4xl sm:text-8xl lg:text-[11rem] font-bold tracking-[-0.06em] leading-[0.90]">
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Primary:book a call */}
            <div className="lg:col-span-7">
              <ClipReveal direction="left">
                <a
                  href="https://calendly.com/julius-systems"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  className="group block p-6 sm:p-14 rounded-3xl border border-accent/[0.1] hover:border-accent/[0.2] bg-accent/[0.02] hover:bg-accent/[0.04] transition-all duration-500 h-full"
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
              <ClipReveal direction="right" delay={0.1}>
                <a
                  href="mailto:julius@buildwithju.com"
                  data-cursor="link"
                  className="group block p-6 sm:p-10 rounded-2xl border border-white/[0.04] hover:border-white/[0.1] hover:bg-white/[0.01] transition-all duration-500 flex-1"
                >
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted/25 mb-6">Email</p>
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">julius@buildwithju.com</h3>
                  <p className="text-sm text-muted/50 leading-relaxed">
                    I read every email and respond within 24 hours.
                  </p>
                  <p className="font-mono text-[10px] text-muted/25 mt-4 tracking-wider">RESPONDS WITHIN 24 HOURS</p>
                </a>
              </ClipReveal>

              <ClipReveal direction="right" delay={0.2}>
                <div className="p-6 sm:p-10 rounded-2xl border border-white/[0.04]">
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted/25 mb-6">Location</p>
                  <h3 className="text-lg font-bold text-foreground mb-2">San Francisco, CA</h3>
                  <p className="text-sm text-muted/50 leading-relaxed">
                    Working with clients locally and across the country.
                  </p>
                  <p className="text-xs text-muted/30 mt-2 leading-relaxed">Available for in-person meetings in the Bay Area.</p>
                </div>
              </ClipReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Service split */}
      <section className="py-12 sm:py-32 lg:py-40 px-6 relative">
        <div className="glow-divider max-w-4xl mx-auto mb-20" />

        <div className="max-w-4xl mx-auto">
          <Reveal>
            <p className="text-center text-muted/30 text-sm mb-16">Not sure which service you need?</p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
            <ClipReveal direction="left">
              <Link href="/studio" data-cursor="link" className="group block p-10 bg-background hover:bg-white/[0.01] transition-colors duration-500">
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent/30 mb-4">Need a website?</p>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">JU. Studio</h3>
                <p className="text-sm text-muted/50 mb-8">Custom sites in Next.js. Starting at $750.</p>
                <span className="hover-line text-sm font-medium text-accent">
                  See portfolio &rarr;
                </span>
              </Link>
            </ClipReveal>

            <ClipReveal direction="right" delay={0.1}>
              <Link href="/systems" data-cursor="link" className="group block p-10 bg-background hover:bg-white/[0.01] transition-colors duration-500">
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-zeus/30 mb-4">Need AI systems?</p>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-zeus transition-colors">JU. Systems</h3>
                <p className="text-sm text-muted/50 mb-8">Audits and automation. Find the gaps. Build the fix.</p>
                <span className="hover-line text-sm font-medium text-zeus">
                  Learn more &rarr;
                </span>
              </Link>
            </ClipReveal>
          </div>
        </div>
      </section>
    </>
  )
}
