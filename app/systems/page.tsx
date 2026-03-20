import type { Metadata } from 'next'
import Link from 'next/link'
import Reveal from '@/components/Reveal'
import ClipReveal from '@/components/ClipReveal'
import MagneticButton from '@/components/MagneticButton'
import Counter from '@/components/Counter'
import Marquee from '@/components/Marquee'
import ParallaxSection from '@/components/ParallaxSection'
import { agents } from '@/data/agents'

export const metadata: Metadata = {
  title: 'JU. Systems',
  description: 'AI audit and automation consulting. We find what\'s costing you money and fix it. Audits start at $997.',
}

const packages = [
  { name: 'Snapshot Audit', price: '$997', period: null, desc: 'A 45-minute call. A full report on what\'s costing you money.', includes: '45-min discovery, written audit with 3-5 opportunities, ROI projections, prioritized roadmap, 48hr delivery' },
  { name: 'Deep Systems Audit', price: '$2,500', period: null, desc: 'Every workflow. Every gap. Every fix.', includes: 'Everything in Snapshot + full workflow mapping, tool/vendor audit, custom agent specs, implementation timeline, 60-min strategy session', featured: true },
  { name: 'Embedded Consultant', price: '$5,000', period: '/mo', desc: 'I build it, deploy it, run it.', includes: 'Everything in Deep Audit + custom agent development, deployment, weekly optimization, direct Slack/email, monthly strategy call' },
]

export default function SystemsPage() {
  return (
    <>
      {/* Hero — Full viewport, counter-driven visual */}
      <section className="min-h-screen flex items-center relative overflow-hidden px-6">
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: Content */}
            <div>
              <Reveal>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-zeus/30 mb-8">JU. Systems</p>
              </Reveal>

              <ClipReveal direction="up">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.04em] leading-[0.9]">
                  You&apos;re bleeding<br />
                  <span className="text-zeus">money</span> on<br />
                  manual work<span className="text-zeus">.</span>
                </h1>
              </ClipReveal>

              <Reveal delay={0.5}>
                <p className="text-muted text-base sm:text-lg max-w-md leading-relaxed mt-10">
                  We audit your business for automation gaps and build the
                  AI agents that close them. Not recommendations. Running systems.
                </p>
              </Reveal>

              <Reveal delay={0.7}>
                <div className="mt-10 flex items-center gap-6">
                  <MagneticButton>
                    <Link
                      href="https://calendly.com/julius-systems"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="link"
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-zeus text-white text-sm font-semibold hover:shadow-[0_0_40px_rgba(99,102,241,0.2)] transition-all duration-500"
                    >
                      Book a discovery call
                    </Link>
                  </MagneticButton>
                  <span className="text-xs text-muted/30 font-mono">Audits start at $997</span>
                </div>
              </Reveal>
            </div>

            {/* Right: Live stats visual — no agent pills */}
            <div className="relative">
              <ClipReveal direction="right" delay={0.3}>
                <div className="relative p-10 sm:p-14 rounded-3xl border border-zeus/[0.08] bg-zeus/[0.02]">
                  {/* Decorative grid */}
                  <div className="absolute inset-0 rounded-3xl overflow-hidden opacity-[0.03]" style={{
                    backgroundImage: `linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                  }} />

                  <div className="relative grid grid-cols-2 gap-10">
                    {[
                      { value: 9, suffix: '', label: 'Active agents', color: '#6366F1' },
                      { value: 24, suffix: '/7', label: 'Uptime', color: '#6366F1' },
                      { value: 52, suffix: '', label: 'Upgrades/yr', color: '#6366F1' },
                      { value: 0, suffix: '', label: 'Off-the-shelf tools', color: '#6366F1', display: '0' },
                    ].map(s => (
                      <div key={s.label} className="text-center">
                        <p className="text-4xl sm:text-5xl font-bold tracking-[-0.04em]" style={{ color: s.color }}>
                          {s.display ?? <Counter value={s.value} suffix={s.suffix} />}
                        </p>
                        <p className="text-[10px] font-mono text-muted/30 tracking-wider uppercase mt-2">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </ClipReveal>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem — Editorial asymmetric */}
      <section className="py-32 sm:py-44 px-6">
        <div className="max-w-5xl mx-auto">
          <ParallaxSection speed={0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
              <div className="lg:col-span-5">
                <ClipReveal direction="left">
                  <p className="text-[8rem] sm:text-[10rem] font-bold tracking-[-0.06em] leading-[0.75] text-outline select-none" aria-hidden="true">
                    The<br />gap
                  </p>
                </ClipReveal>
              </div>
              <div className="lg:col-span-7 lg:pt-8">
                <Reveal>
                  <p className="text-foreground text-lg sm:text-xl leading-relaxed mb-6">
                    Businesses doing <span className="text-zeus font-semibold">$500K&ndash;$10M</span> a year
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

      {/* Before / After — Dramatic contrast with color coding */}
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
                    <li key={item} className="flex items-start gap-3 text-sm text-muted/40 leading-relaxed">
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

      {/* Process — Unique staggered layout */}
      <section className="py-32 sm:py-44 px-6 relative">
        <div className="glow-divider-gold max-w-3xl mx-auto mb-28" />

        <div className="max-w-4xl mx-auto">
          <ClipReveal direction="up">
            <h2 className="text-4xl sm:text-6xl font-bold tracking-[-0.04em] leading-[0.9] mb-24">
              Three steps<span className="text-zeus">.</span><br />
              <span className="text-muted/20">That&apos;s it.</span>
            </h2>
          </ClipReveal>

          <div className="relative">
            <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-zeus/40 via-zeus/20 to-transparent" />

            {[
              { title: 'Discovery call', desc: 'I map your operation. You tell me what hurts, what takes too long, what falls through the cracks.', time: '45 min', detail: 'No prep needed. I ask the right questions.' },
              { title: 'Audit report', desc: 'Every gap. Every dollar it costs you. ROI projections for each fix. A prioritized roadmap — not a slide deck.', time: '48 hrs', detail: 'You\'ll know exactly what to fix and in what order.' },
              { title: 'Build & deploy', desc: 'Custom AI agents deployed into your existing tools. Slack, email, CRM, whatever you use. Running within weeks.', time: '2-4 weeks', detail: 'Not recommendations. Actual automation.' },
            ].map((step, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <div className="relative flex gap-8 mb-20 last:mb-0 group">
                  <div className="relative z-10 mt-2 shrink-0">
                    <div className="w-[23px] h-[23px] rounded-full border-2 border-zeus/40 bg-background flex items-center justify-center group-hover:border-zeus/60 transition-colors duration-500">
                      <div className="w-2 h-2 rounded-full bg-zeus/50 group-hover:bg-zeus transition-colors duration-500" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-baseline gap-4 mb-3">
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-zeus transition-colors duration-500">{step.title}</h3>
                      <span className="font-mono text-[10px] text-zeus/30 tracking-wider">{step.time}</span>
                    </div>
                    <p className="text-sm text-muted leading-relaxed mb-2 max-w-lg">{step.desc}</p>
                    <p className="text-xs text-muted/25 italic">{step.detail}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-32 sm:py-44 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <ClipReveal direction="up">
            <div className="mb-20">
              <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-zeus/30 mb-6">Investment</p>
              <h2 className="text-4xl sm:text-6xl font-bold tracking-[-0.04em] leading-[0.9]">
                Pick your<br />entry point<span className="text-zeus">.</span>
              </h2>
            </div>
          </ClipReveal>

          <div className="space-y-0">
            {packages.map((pkg, i) => (
              <Reveal key={pkg.name} delay={i * 0.08}>
                <div className={`group grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8 py-8 sm:py-10 border-b border-white/[0.04] hover:border-zeus/10 transition-all duration-500 ${
                  pkg.featured ? 'bg-zeus/[0.02] -mx-6 px-6 sm:-mx-8 sm:px-8 rounded-xl border-zeus/[0.08]' : ''
                }`}>
                  <div className="sm:col-span-3 flex items-center gap-3">
                    {pkg.featured && <span className="w-1.5 h-1.5 rounded-full bg-zeus shrink-0" />}
                    <div>
                      <h3 className="text-base font-bold text-foreground">{pkg.name}</h3>
                      <p className="text-xs text-muted/30 mt-0.5 sm:hidden">{pkg.desc}</p>
                    </div>
                  </div>
                  <div className="sm:col-span-2 flex items-center">
                    <p className="text-2xl font-bold tracking-tight text-foreground">
                      {pkg.price}{pkg.period && <span className="text-sm font-normal text-muted">{pkg.period}</span>}
                    </p>
                  </div>
                  <div className="sm:col-span-4 flex items-center">
                    <p className="text-xs text-muted/40 leading-relaxed">{pkg.includes}</p>
                  </div>
                  <div className="sm:col-span-3 flex items-center justify-start sm:justify-end">
                    <Link
                      href="https://calendly.com/julius-systems"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="link"
                      className={`text-sm font-medium transition-all duration-300 ${
                        pkg.featured
                          ? 'text-zeus hover:text-foreground'
                          : 'text-muted/30 group-hover:text-foreground'
                      }`}
                    >
                      Book a call &rarr;
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
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
      <section className="py-32 sm:py-40 px-6">
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
