import type { Metadata } from 'next'
import Link from 'next/link'
import Reveal from '@/components/Reveal'
import ClipReveal from '@/components/ClipReveal'
import MagneticButton from '@/components/MagneticButton'
import Marquee from '@/components/Marquee'
import ParallaxSection from '@/components/ParallaxSection'
import { agents } from '@/data/agents'

export const metadata: Metadata = {
  title: 'About',
  description: 'Julius Williams builds custom websites and AI systems from San Francisco, CA.',
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-screen flex items-center relative overflow-hidden px-6">
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center">
            {/* Left: Name */}
            <div className="lg:col-span-7">
              <ClipReveal direction="up">
                <h1 className="text-5xl sm:text-9xl lg:text-[12rem] font-bold tracking-[-0.06em] leading-[0.90]">
                  Julius<br />
                  Williams<span className="text-accent">.</span>
                </h1>
              </ClipReveal>
            </div>

            {/* Right: Bio summary */}
            <div className="lg:col-span-5 lg:pl-12 lg:border-l lg:border-white/[0.04] pt-6 sm:pt-0">
              <Reveal delay={0.4}>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted/25 mb-6">About</p>
              </Reveal>
              <Reveal delay={0.5}>
                <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-4">
                  One person. Two businesses. Everything built from scratch.
                </p>
                <p className="text-white/40 text-sm leading-relaxed mb-8">
                  Websites through Studio. AI systems through Systems. Both running while you sleep.
                </p>
              </Reveal>
              <Reveal delay={0.6}>
                <p className="font-mono text-[11px] text-muted/30 tracking-wider">
                  San Francisco, CA
                </p>
                <div className="mt-8 space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-white/20 tracking-widest w-20">SINCE</span>
                    <span className="text-sm font-bold text-white/60">2024</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-white/20 tracking-widest w-20">STACK</span>
                    <span className="text-sm font-bold text-white/60">Next.js, React, Python, OpenClaw</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-white/20 tracking-widest w-20">MODEL</span>
                    <span className="text-sm font-bold text-white/60">Solo. No subcontractors.</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-12 sm:py-32 lg:py-44 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-4">
              <ParallaxSection speed={0.15}>
                <ClipReveal direction="left">
                  <p className="text-[4rem] sm:text-[8rem] font-bold tracking-[-0.06em] leading-[0.85] text-outline select-none" aria-hidden="true">
                    The<br />story
                  </p>
                </ClipReveal>
              </ParallaxSection>
            </div>
            <div className="lg:col-span-8">
              <Reveal delay={0.1}>
                <p className="text-white/70 text-base sm:text-lg leading-[1.9] mb-8">
                  I started JU. because most businesses need someone who understands the problem, builds the fix, and ships it. Not a team of consultants. Not another SaaS tool. Just a person who builds things that work.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-white/70 text-base sm:text-lg leading-[1.9]">
                  I don&apos;t subcontract. The person you talk to is the person who builds. The AI system handles the operational overhead so I can focus on the work.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-12 sm:py-32 lg:py-44 px-6 relative">
        <div className="glow-divider max-w-4xl mx-auto mb-28" />

        <div className="max-w-5xl mx-auto">
          <ClipReveal direction="up">
            <h2 className="text-4xl sm:text-6xl font-bold tracking-[-0.04em] leading-[0.9] mb-24">
              Systems<span className="text-studio">,</span><br />
              <span className="text-muted/40">not deliverables.</span>
            </h2>
          </ClipReveal>

          <div className="space-y-0">
            {[
              { title: 'Ship things that keep running', body: 'A deliverable is a PDF in a Google Drive. A system is infrastructure that runs while you sleep. Everything I build is designed to keep working after I\'m done.' },
              { title: 'Build from scratch', body: 'Templates look like templates. When I build a website or an AI workflow, it fits the business. Not the other way around. Custom code. Custom logic.' },
              { title: 'One person. Good infrastructure.', body: 'I don\'t subcontract. The person you talk to is the person who builds. The AI system handles the operational overhead so I can focus on the work.' },
              { title: 'Results over process', body: 'I don\'t sell discovery phases or strategy decks. I sell working websites and working AI agents. If it doesn\'t ship, it doesn\'t count.' },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="group grid grid-cols-1 lg:grid-cols-12 gap-6 py-16 border-b border-white/[0.04] hover:border-studio/10 transition-colors duration-700">
                  <div className="lg:col-span-1">
                    <span className="font-mono text-[11px] text-muted/15 group-hover:text-studio/40 transition-colors duration-500">0{i + 1}</span>
                  </div>
                  <div className="lg:col-span-4">
                    <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-studio transition-colors duration-500">{item.title}</h3>
                  </div>
                  <div className="lg:col-span-7">
                    <p className="text-sm text-muted/65 leading-relaxed max-w-lg group-hover:text-muted/80 transition-colors duration-500">{item.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pantheon */}
      <section className="py-12 sm:py-32 lg:py-44 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <ClipReveal direction="center">
            <div className="text-center mb-16">
              <p className="text-outline text-4xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.05em] leading-none select-none" aria-hidden="true">
                PANTHEON
              </p>
              <p className="text-muted text-sm mt-6 max-w-lg mx-auto leading-relaxed">
                The AI operating system behind JU. {agents.length} autonomous agents handle
                everything from lead sourcing to project delivery.
              </p>
            </div>
          </ClipReveal>

          <Marquee speed={50} pauseOnHover className="py-4">
            {agents.map(agent => (
              <div key={agent.id} className="flex items-center gap-3 mx-6 px-5 py-3 rounded-full bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-colors whitespace-nowrap">
                <div className="relative">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: agent.color }} />
                  <div className="absolute inset-0 rounded-full animate-pulse-glow" style={{ backgroundColor: agent.color, filter: 'blur(4px)' }} />
                </div>
                <span className="text-sm font-medium text-foreground/80">{agent.name}</span>
                <span className="font-mono text-[9px] tracking-wider uppercase text-muted/30">{agent.domain}</span>
              </div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-32 lg:py-40 px-6">
        <div className="glow-divider max-w-sm mx-auto mb-20" />
        <div className="max-w-2xl mx-auto text-center">
          <ClipReveal direction="up">
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.04em] leading-[0.9]">
              Got something<br />that needs<br />building<span className="text-accent">?</span>
            </h2>
          </ClipReveal>
          <Reveal delay={0.3}>
            <p className="text-white/50 text-sm mt-6 mb-12">No long timelines. No strategy decks. Just a real conversation.</p>
          </Reveal>
          <Reveal delay={0.5}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton>
                <Link
                  href="https://calendly.com/julius-systems"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-foreground text-background font-semibold text-sm hover:bg-accent transition-colors duration-300"
                >
                  Book a Call
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link href="/contact" data-cursor="link" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/[0.08] text-sm text-muted hover:text-foreground hover:border-white/[0.15] transition-all duration-300">
                  Contact
                </Link>
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
