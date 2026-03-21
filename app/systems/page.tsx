import type { Metadata } from 'next'
import Link from 'next/link'
import Reveal from '@/components/Reveal'
import ClipReveal from '@/components/ClipReveal'
import MagneticButton from '@/components/MagneticButton'
import Marquee from '@/components/Marquee'
import ParallaxSection from '@/components/ParallaxSection'
import PricingCards, { type PricingPlan } from '@/components/PricingCards'
import AgentPipelineAnimation from '@/components/AgentPipelineAnimation'
import { agents } from '@/data/agents'

export const metadata: Metadata = {
  title: 'JU. Systems',
  description: 'AI audit and automation consulting. We find what\'s costing you money and fix it. Audits start at $997.',
}

const systemsPricing: PricingPlan[] = [
  { title: 'Snapshot Audit', price: '$997', period: 'one-time', label: 'Entry point', description: "45 minutes. A full report on what's costing you money.", features: ['45-min discovery call', 'Written audit report', '3-5 opportunities', 'ROI projections', 'Prioritized roadmap', '48hr delivery'], cta: 'Book a call', ctaHref: 'https://calendly.com/julius-systems', accentColor: '#6366F1', glowRgb: '99,102,241' },
  { title: 'Deep Audit', price: '$2,500', period: 'one-time', label: 'Most popular', featured: true, description: 'Every workflow. Every gap. Every fix.', features: ['Everything in Snapshot', 'Full workflow mapping', 'Tool & vendor audit', 'Custom agent specs', 'Implementation timeline', '60-min strategy session'], cta: 'Book a call', ctaHref: 'https://calendly.com/julius-systems', accentColor: '#6366F1', glowRgb: '99,102,241' },
  { title: 'Embedded', price: '$5K', period: '/month', label: 'Full service', description: 'I build it, deploy it, run it.', features: ['Everything in Deep Audit', 'Custom agent development', 'Full deployment', 'Weekly optimization', 'Direct Slack access', 'Monthly strategy call'], cta: 'Book a call', ctaHref: 'https://calendly.com/julius-systems', accentColor: '#6366F1', glowRgb: '99,102,241' },
]

export default function SystemsPage() {
  return (
    <>
      {/* Hero:Full viewport, counter-driven visual */}
      <section className="min-h-screen flex items-center relative overflow-hidden px-6">
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: Content */}
            <div className="relative z-10">
              <Reveal>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-zeus/30 mb-6">JU. Systems</p>
                <div className="w-8 h-px bg-zeus/30 mb-8" />
              </Reveal>

              <ClipReveal direction="up">
                <h1 className="text-3xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.04em] leading-[0.9]">
                  You&apos;re losing<br />
                  <span className="text-zeus">hours</span> to work<br />
                  <span className="text-muted/15">a $50 agent</span>{' '}
                  <span className="text-muted/40">handles.</span>
                </h1>
              </ClipReveal>

              <Reveal delay={0.5}>
                <p className="text-muted/60 text-base max-w-xs leading-relaxed mt-8">
                  We find the gaps. We build the fix.
                </p>
              </Reveal>

              <Reveal delay={0.7}>
                <div>
                  <MagneticButton>
                    <Link
                      href="https://calendly.com/julius-systems"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="link"
                      className="inline-flex items-center gap-3 mt-10 px-7 py-3.5 rounded-full bg-zeus text-background text-sm font-semibold hover:shadow-[0_0_40px_rgba(99,102,241,0.25)] transition-all duration-500"
                    >
                      Book a discovery call
                      <span className="text-[10px] font-mono opacity-60">&rarr;</span>
                    </Link>
                  </MagneticButton>
                  <p className="text-xs text-muted/30 font-mono mt-4 tracking-wider">AUDITS START AT $997</p>
                </div>
              </Reveal>
            </div>

            {/* Right: Agent pipeline animation */}
            <ClipReveal direction="right" delay={0.3}>
              <div className="relative h-[380px] sm:h-[500px] overflow-hidden rounded-2xl">
                <AgentPipelineAnimation />
              </div>
            </ClipReveal>
          </div>
        </div>
      </section>

      {/* The Problem:Editorial asymmetric */}
      <section className="py-16 sm:py-32 lg:py-44 px-6">
        <div className="max-w-5xl mx-auto">
          <ParallaxSection speed={0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
              <div className="lg:col-span-5">
                <ClipReveal direction="left">
                  <p className="text-[5rem] sm:text-[10rem] font-bold tracking-[-0.06em] leading-[0.85] text-outline select-none" aria-hidden="true">
                    The<br />gap
                  </p>
                </ClipReveal>
              </div>
              <div className="lg:col-span-7 lg:pt-8">
                <Reveal>
                  <p className="text-foreground text-lg sm:text-xl leading-relaxed mb-6">
                    Businesses doing <span className="text-zeus font-semibold">$500K-$10M</span> a year
                    with processes that still depend on copy-paste, manual data
                    entry, or &quot;we&apos;ve always done it this way.&quot;
                  </p>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="text-muted text-sm leading-relaxed">
                    You&apos;re spending 10+ hours a week on tasks a $50/month agent
                    handles in minutes. That&apos;s not a tech problem. It&apos;s a visibility
                    problem. You can&apos;t fix what you can&apos;t see.
                  </p>
                </Reveal>
              </div>
            </div>
          </ParallaxSection>
        </div>
      </section>

      {/* Before / After:Dramatic contrast with color coding */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
            <ClipReveal direction="left">
              <div className="bg-rose-950/[0.04] p-8 sm:p-12 h-full border border-rose-900/[0.06]">
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted/20 mb-8">Before</p>
                <ul className="space-y-5">
                  {[
                    'Manual lead follow-up taking 8+ hrs/week',
                    'Client onboarding spread across 5 tools',
                    'Reports assembled by hand every Friday',
                    'Missed invoices and forgotten check-ins',
                    'Knowledge locked inside one person\'s head',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted/55 leading-relaxed">
                      <span className="w-4 h-px bg-rose-500/20 mt-2.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ClipReveal>

            <ClipReveal direction="right" delay={0.15}>
              <div className="bg-emerald-950/[0.04] p-8 sm:p-12 h-full border border-emerald-900/[0.06]">
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-zeus/40 mb-8">After</p>
                <ul className="space-y-5">
                  {[
                    'Leads contacted within 5 minutes, 24/7',
                    'Client onboarding: one trigger, fully automated',
                    'Reports generated and sent automatically',
                    'Invoicing and follow-ups on autopilot',
                    'Processes documented and repeatable by anyone',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-3 text-sm text-foreground/80 leading-relaxed">
                      <span className="w-4 h-px bg-emerald-500/30 mt-2.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ClipReveal>
          </div>
        </div>
      </section>

      {/* Process:Unique staggered layout */}
      <section className="py-16 sm:py-32 lg:py-44 px-6 relative">
        <div className="glow-divider-gold max-w-3xl mx-auto mb-28" />

        <div className="max-w-4xl mx-auto">
          <ClipReveal direction="up">
            <h2 className="text-4xl sm:text-7xl font-bold tracking-[-0.04em] leading-[0.9] mb-4">
              Three steps<span className="text-zeus">.</span>
            </h2>
            <p className="text-muted/25 text-2xl sm:text-4xl font-bold tracking-[-0.03em]">No more.</p>
          </ClipReveal>

          <div className="mt-24">
            {[
              { num: '01', title: 'Discovery call', time: '45 min', desc: 'I map your operation. You tell me what hurts, what takes too long, what falls through the cracks.', detail: 'No prep needed. I ask the right questions.' },
              { num: '02', title: 'Audit report', time: '48 hrs', desc: 'Every gap. Every dollar it costs you. ROI projections for each fix. A prioritized roadmap. Not a slide deck.', detail: 'You\'ll know exactly what to fix and in what order.' },
              { num: '03', title: 'Build & deploy', time: '2–4 weeks', desc: 'Custom AI agents deployed into your existing tools. Slack, email, CRM, whatever you use. Running within weeks.', detail: 'Not recommendations. Actual automation.' },
            ].map((step, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <div className="group grid grid-cols-12 gap-6 items-start py-16 border-b border-white/[0.04] hover:border-zeus/20 transition-colors duration-700 last:border-0">
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-[4rem] sm:text-[5rem] font-bold tracking-[-0.06em] leading-none text-white/[0.06] group-hover:text-zeus/20 transition-colors duration-700 select-none">
                      {step.num}
                    </span>
                  </div>
                  <div className="col-span-10 sm:col-span-7 pt-3">
                    <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 group-hover:text-zeus transition-colors duration-500">
                      {step.title}
                    </h3>
                    <p className="text-muted text-sm sm:text-base leading-relaxed mb-3 max-w-lg">
                      {step.desc}
                    </p>
                    <p className="text-muted/30 text-xs italic">{step.detail}</p>
                  </div>
                  <div className="hidden sm:flex col-span-4 pt-3 justify-end">
                    <div className="text-right">
                      <p className="text-3xl sm:text-4xl font-bold tracking-[-0.04em] text-zeus/20 group-hover:text-zeus/60 transition-colors duration-700">
                        {step.time}
                      </p>
                      <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted/20 mt-1">turnaround</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 sm:py-32 lg:py-44 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <ClipReveal direction="up">
            <div className="mb-20">
              <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-zeus/30 mb-6">Investment</p>
              <h2 className="text-4xl sm:text-6xl font-bold tracking-[-0.04em] leading-[0.9]">
                Pick your<br />entry point<span className="text-zeus">.</span>
              </h2>
            </div>
          </ClipReveal>

          <PricingCards plans={systemsPricing} columns={3} />
        </div>
      </section>

      {/* Bridge to Studio */}
      <div className="px-6 pb-8">
        <div className="max-w-4xl mx-auto p-10 rounded-2xl border border-white/[0.04] hover:border-studio/[0.10] transition-colors duration-700 group">
          <div className="grid sm:grid-cols-12 gap-8 items-center">
            <div className="sm:col-span-8">
              <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-studio/30 mb-3">Need the site first?</p>
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 group-hover:text-studio transition-colors duration-500">JU. Studio builds it from scratch<span className="text-studio">.</span></h3>
              <p className="text-sm text-muted/50 max-w-lg leading-relaxed">Custom Next.js. No templates. Built to rank, convert, and plug directly into the automation layer when you&apos;re ready.</p>
            </div>
            <div className="sm:col-span-4 sm:flex sm:justify-end">
              <Link href="/studio" data-cursor="link" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-studio/20 text-sm text-studio hover:bg-studio/[0.05] group-hover:border-studio/40 transition-all duration-500">See JU. Studio &rarr;</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Agent marquee */}
      <section className="py-24 relative overflow-hidden">
        <Marquee speed={50} pauseOnHover>
          {agents.map(agent => (
            <div key={agent.id} className="flex items-center gap-3 mx-5 px-5 py-3 rounded-full bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-colors whitespace-nowrap">
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: agent.color }} />
                <div className="absolute inset-0 rounded-full animate-pulse-glow" style={{ backgroundColor: agent.color, filter: 'blur(4px)' }} />
              </div>
              <span className="text-sm font-medium text-foreground/80">{agent.name}</span>
              <span className="font-mono text-[9px] tracking-wider uppercase text-muted/25">{agent.domain}</span>
            </div>
          ))}
        </Marquee>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-32 lg:py-40 px-6">
        <div className="glow-divider-gold max-w-sm mx-auto mb-20" />
        <div className="max-w-2xl mx-auto text-center">
          <ClipReveal direction="up">
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.04em] leading-[0.9]">
              Stop guessing<span className="text-zeus">.</span><br />
              <span className="text-muted/20">Start seeing.</span>
            </h2>
          </ClipReveal>
          <Reveal delay={0.3}>
            <p className="text-muted text-sm mt-6 mb-12">
              45 minutes. I&apos;ll show you exactly where you&apos;re losing money.
            </p>
          </Reveal>
          <Reveal delay={0.5}>
            <MagneticButton>
              <Link
                href="https://calendly.com/julius-systems"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-zeus text-white font-semibold text-sm hover:shadow-[0_0_50px_rgba(99,102,241,0.2)] transition-all duration-500"
              >
                Book a Discovery Call
              </Link>
            </MagneticButton>
          </Reveal>
        </div>
      </section>
    </>
  )
}
