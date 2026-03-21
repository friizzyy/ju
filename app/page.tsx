"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import PantheonNetwork from '@/components/PantheonNetwork'
import Reveal from '@/components/Reveal'
import TextReveal from '@/components/TextReveal'
import Marquee from '@/components/Marquee'
import MagneticButton from '@/components/MagneticButton'
import Counter from '@/components/Counter'
import ClipReveal from '@/components/ClipReveal'
import { agents } from '@/data/agents'
import AgentCard from '@/components/AgentCard'

const SectionDivider = () => (
  <div className="max-w-6xl mx-auto px-6">
    <div className="h-px w-full" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)' }} />
  </div>
)

const services = [
  {
    num: '01',
    tag: 'Websites',
    nameAccent: 'Studio',
    color: '#8B5CF6',
    rgb: '139,92,246',
    description: 'Custom Next.js sites for businesses serious about how they show up online. No templates. No builders. Flat-rate from $750.',
    features: ['Custom React & Next.js', 'Mobile-first by default', '90+ PageSpeed baseline', 'CMS & hand-off docs'],
    price: '$750-$4,000',
    link: '/studio',
    linkLabel: 'View portfolio',
  },
  {
    num: '02',
    tag: 'AI Automation',
    nameAccent: 'Systems',
    color: '#6366F1',
    rgb: '99,102,241',
    description: "AI audit and automation for businesses still running on manual processes. We find what's costing you. Then we fix it.",
    features: ['AI audit & gap analysis', 'Custom agent development', 'Deployed in your tools', 'Weekly optimization'],
    price: '$997-$5K/mo',
    link: '/systems',
    linkLabel: 'Learn more',
  },
]

export default function Home() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden">
        <PantheonNetwork />

        <div className="relative z-10 text-center px-6 pointer-events-none">
          <div className="relative">
            <div className="absolute inset-0 -z-10 blur-[80px] bg-accent/[0.06] rounded-full scale-150" />
            <TextReveal
              text="JU."
              tag="h1"
              className="text-[28vw] sm:text-[24vw] md:text-[18vw] font-bold tracking-[-0.06em] leading-[0.92] text-foreground"
              stagger={0.15}
            />
          </div>

          <Reveal delay={0.6}>
            <p className="mt-3 text-xs sm:text-sm md:text-base text-muted/50 font-light tracking-[0.05em] sm:whitespace-nowrap">
              We build the site. Then we build the system behind it.
            </p>
          </Reveal>

          <Reveal delay={0.9}>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 pointer-events-auto">
              <MagneticButton>
                <Link
                  href="/studio"
                  data-cursor="link"
                  className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] text-sm font-medium text-foreground/90 hover:bg-white/[0.1] hover:border-white/[0.15] transition-all duration-300"
                >
                  View work
                  <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
                </Link>
              </MagneticButton>

              <MagneticButton>
                <Link
                  href="https://calendly.com/julius-systems"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-accent/90 text-background text-sm font-semibold hover:bg-accent hover:shadow-[0_0_40px_rgba(0,212,255,0.2)] transition-all duration-300"
                >
                  Start a project
                </Link>
              </MagneticButton>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 pointer-events-none">
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-white/15 animate-pulse" />
        </div>

        <div className="hidden sm:block absolute bottom-6 right-6 sm:bottom-8 sm:right-8 font-mono text-[10px] tracking-[0.2em] text-white/[0.12] uppercase pointer-events-none">
          {agents.length} agents &middot; click anywhere
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background pointer-events-none" />
      </section>

      {/* ═══ MARQUEE ═══ */}
      <section className="mt-16 sm:mt-24 py-8 border-y border-white/[0.03]">
        <Marquee speed={30} className="text-muted/40">
          {['Custom Websites', 'AI Automation', 'Next.js', 'Autonomous Agents', 'Audit & Strategy', 'San Francisco CA', 'Systems That Ship'].map(t => (
            <span key={t} className="mx-8 sm:mx-12 text-[13px] font-mono tracking-[0.15em] uppercase whitespace-nowrap flex items-center gap-4">
              {t} <span className="w-1 h-1 rounded-full bg-accent/50" />
            </span>
          ))}
        </Marquee>
      </section>

      <SectionDivider />

      {/* ═══ SERVICES ═══ */}
      <section className="py-20 sm:py-28 px-6 relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5">
          {services.map((service, i) => (
            <Reveal key={service.num} delay={i * 0.15}>
              <motion.div
                className="group relative flex flex-col rounded-2xl border overflow-hidden cursor-default transition-colors duration-700 h-full"
                style={{
                  background: `rgba(${service.rgb}, 0.03)`,
                  borderColor: `rgba(${service.rgb}, 0.12)`,
                }}
                whileHover={{
                  y: -6,
                  borderColor: `rgba(${service.rgb}, 0.35)`,
                  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
                  style={{ background: `radial-gradient(ellipse at top, rgba(${service.rgb}, 0.07) 0%, transparent 60%)` }}
                />

                <div className="relative flex flex-col h-full p-5 sm:p-10">
                  <div className="flex items-center justify-between mb-10">
                    <p
                      className="font-mono text-[9px] tracking-[0.3em] uppercase transition-colors duration-500"
                      style={{ color: `rgba(${service.rgb}, 0.5)` }}
                    >
                      {service.num}: {service.tag}
                    </p>
                    <div
                      className="w-2 h-2 rounded-full opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: service.color }}
                    />
                  </div>

                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.04em] leading-[0.9] mb-5">
                    JU<span style={{ color: service.color }}>.</span>{' '}
                    {service.nameAccent}
                  </h2>

                  <p className="text-white/55 text-sm leading-relaxed max-w-sm mb-8">
                    {service.description}
                  </p>

                  <div className="space-y-2 sm:space-y-2.5 flex-1 mb-10">
                    {service.features.map((feature, fi) => (
                      <div key={fi} className="flex items-center gap-3">
                        <span
                          className="w-3 h-px flex-shrink-0 transition-colors duration-500 group-hover:w-4"
                          style={{ background: `rgba(${service.rgb}, 0.4)` }}
                        />
                        <span className="text-sm text-white/50 group-hover:text-white/65 transition-colors duration-500">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 sm:pt-6 border-t" style={{ borderColor: `rgba(${service.rgb}, 0.10)` }}>
                    <div>
                      <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/20 mb-1">Investment</p>
                      <p
                        className="font-bold text-lg tracking-tight transition-colors duration-500"
                        style={{ color: `rgba(${service.rgb}, 0.7)` }}
                      >
                        {service.price}
                      </p>
                    </div>
                    <Link
                      href={service.link}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-500 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0"
                      style={{
                        background: `rgba(${service.rgb}, 0.12)`,
                        border: `1px solid rgba(${service.rgb}, 0.25)`,
                        color: service.color,
                      }}
                    >
                      {service.linkLabel} <span>&rarr;</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* ═══ STATS ═══ */}
      <section className="py-20 px-6 border-y border-white/[0.03] relative">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">
          {[
            { value: 9, suffix: '', label: 'Autonomous agents', context: 'Running 24/7 across both businesses' },
            { value: 6, suffix: '+', label: 'Sites shipped', context: 'All custom. None templated.' },
            { value: 24, suffix: '/7', label: 'System uptime', context: 'Pipelines never sleep' },
            { value: 48, suffix: 'hr', label: 'Audit delivery', context: 'From discovery call to written report' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl sm:text-5xl font-bold tracking-[-0.04em] text-foreground">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-xs text-muted/40 mt-2 font-mono tracking-wide uppercase">{stat.label}</p>
              <p className="text-[10px] text-muted/20 mt-1.5 font-mono leading-relaxed">{stat.context}</p>
            </div>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* ═══ THE PANTHEON ═══ */}
      <section className="py-12 sm:py-32 lg:py-44 px-6 relative">
        <div className="max-w-5xl mx-auto relative z-10">
          <ClipReveal direction="center">
            <div className="text-center mb-20">
              <p className="text-outline-accent text-4xl sm:text-8xl lg:text-9xl font-bold tracking-[-0.05em] leading-none select-none" aria-hidden="true">
                PANTHEON
              </p>
              <p className="text-muted/50 text-sm max-w-lg mx-auto text-center mt-4 mb-16 leading-relaxed">
                9 autonomous AI agents run JU. around the clock. Lead sourcing, outreach, proposals, delivery. Everything except the actual building.
              </p>
            </div>
          </ClipReveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
            {agents.map((agent, i) => (
              <Reveal key={agent.id} delay={i * 0.04}>
                <AgentCard agent={agent} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-12 sm:py-32 lg:py-44 px-6 relative">
        <div className="glow-divider max-w-lg mx-auto mb-20" />
        <div className="max-w-2xl mx-auto text-center">
          <ClipReveal direction="up">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.04em] leading-[1.05] text-center whitespace-nowrap">
              Your site ships<br />
              in <span className="text-accent">2 weeks</span>
              <span className="text-foreground/15">.</span>
              <br />
              <span className="text-muted/25 text-2xl sm:text-4xl lg:text-5xl font-bold">
                Your automation in 4.
              </span>
            </h2>
          </ClipReveal>
          <Reveal delay={0.3}>
            <p className="text-muted text-sm mt-6 mb-12">No intake forms. No 6-month timelines. Just a real conversation about what you need.</p>
          </Reveal>
          <Reveal delay={0.5}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton>
                <a href="https://calendly.com/julius-systems" target="_blank" rel="noopener noreferrer" data-cursor="link" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-background font-semibold text-sm hover:shadow-[0_0_50px_rgba(0,212,255,0.25)] transition-all duration-500">
                  Book a Call
                </a>
              </MagneticButton>
              <MagneticButton>
                <a href="mailto:julius@buildwithju.com" data-cursor="link" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/[0.08] text-sm text-muted hover:text-foreground hover:border-white/[0.15] transition-all duration-400">
                  julius@buildwithju.com
                </a>
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
