import type { Metadata } from 'next'
import Link from 'next/link'
import Reveal from '@/components/Reveal'
import ClipReveal from '@/components/ClipReveal'
import MagneticButton from '@/components/MagneticButton'
import ParallaxSection from '@/components/ParallaxSection'
import SplitBrainAnimation from '@/components/SplitBrainAnimation'

export const metadata: Metadata = {
  title: 'About',
  description: 'Julius Williams builds custom websites and AI systems. Based between San Francisco and Grass Valley, CA.',
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[100svh] flex flex-col justify-center relative px-5 sm:px-6 pt-20 pb-12 sm:pt-24 sm:pb-16">
        <div className="max-w-6xl mx-auto w-full">
          {/* Name */}
          <ClipReveal direction="up">
            <h1 className="text-[13vw] sm:text-[10vw] lg:text-[8vw] font-bold tracking-[-0.06em] leading-[0.95] pb-3 mb-4 sm:mb-6">
              Julius<br />Williams<span className="text-accent">.</span>
            </h1>
          </ClipReveal>

          {/* One-liner */}
          <Reveal delay={0.3}>
            <p className="text-white/35 text-sm sm:text-base font-light tracking-[0.02em] mb-8 sm:mb-12">
              One person. Two disciplines. Everything built from scratch.
            </p>
          </Reveal>

          {/* Skyline animation */}
          <Reveal delay={0.5}>
            <SplitBrainAnimation />
          </Reveal>

          {/* Stat strip */}
          <Reveal delay={0.7}>
            <div className="flex flex-wrap gap-x-8 sm:gap-x-12 gap-y-3 mt-6 sm:mt-8 pt-6 border-t border-white/[0.04]">
              {[
                { label: "SINCE", value: "2024" },
                { label: "STACK", value: "Next.js · React · Python · Claude" },
                { label: "MODEL", value: "Solo. No subcontractors." },
                { label: "BASED", value: "SF / Grass Valley, CA" },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="font-mono text-[9px] text-white/20 tracking-widest">{item.label}</span>
                  <span className="text-xs text-white/50">{item.value}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="py-12 sm:py-32 lg:py-44 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-4">
              <ParallaxSection speed={0.15}>
                <ClipReveal direction="left">
                  <p className="text-[4rem] sm:text-[8rem] font-bold tracking-[-0.06em] leading-[0.9] pb-4 text-outline select-none" aria-hidden="true">
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
                <p className="text-white/70 text-base sm:text-lg leading-[1.9] mb-8">
                  I don&apos;t subcontract. The person you talk to is the person who builds. The AI system handles the operational overhead so I can focus on the work.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="mt-4 space-y-3 border-t border-white/[0.04] pt-8">
                  {[
                    { label: "Stack", value: "Next.js, React, Python, Claude" },
                    { label: "Model", value: "Solo. No subcontractors." },
                    { label: "Since", value: "2024" },
                    { label: "Based", value: "SF / Grass Valley, CA" },
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-6">
                      <span className="font-mono text-[10px] text-white/20 tracking-widest w-14">{item.label}</span>
                      <span className="text-sm text-white/60">{item.value}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-12 sm:py-20 lg:py-28 px-6 relative">
        <div className="glow-divider max-w-4xl mx-auto mb-16" />

        <div className="max-w-5xl mx-auto">
          <ClipReveal direction="up">
            <h2 className="text-4xl sm:text-6xl font-bold tracking-[-0.04em] leading-[0.9] pb-2 mb-24">
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
                <div className="group grid grid-cols-1 lg:grid-cols-12 gap-6 py-8 sm:py-12 border-b border-white/[0.04] hover:border-studio/10 transition-colors duration-700">
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

      {/* Numbers */}
      <section className="py-12 sm:py-20 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <ClipReveal direction="up">
            <h2 className="text-4xl sm:text-6xl font-bold tracking-[-0.04em] leading-[0.9] pb-2 mb-10">
              By the<br />numbers<span className="text-accent">.</span>
            </h2>
          </ClipReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
            {[
              { value: "6+", label: "Sites shipped", sub: "All custom. Zero templates." },
              { value: "9", label: "AI agents running", sub: "24/7 across both businesses" },
              { value: "100%", label: "Custom code", sub: "Every build from scratch" },
              { value: "2wk", label: "Average delivery", sub: "From deposit to launch" },
            ].map((stat) => (
              <Reveal key={stat.label}>
                <div className="bg-background/80 p-6 sm:p-10 hover:bg-white/[0.02] transition-colors duration-500 group">
                  <p className="text-3xl sm:text-5xl font-bold tracking-[-0.04em] text-foreground mb-2">{stat.value}</p>
                  <p className="text-xs font-mono text-muted/40 uppercase tracking-[0.15em] mb-1">{stat.label}</p>
                  <p className="text-xs text-muted/25 leading-relaxed">{stat.sub}</p>
                </div>
              </Reveal>
            ))}
          </div>
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
                  href="https://calendly.com/julius-buildwithju/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-background font-semibold text-sm hover:shadow-[0_0_40px_rgba(0,212,255,0.2)] transition-all duration-300"
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
