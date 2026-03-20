import Link from 'next/link'
import PantheonNetwork from '@/components/PantheonNetwork'
import Reveal from '@/components/Reveal'
import TextReveal from '@/components/TextReveal'
import Marquee from '@/components/Marquee'
import MagneticButton from '@/components/MagneticButton'
import Counter from '@/components/Counter'
import ClipReveal from '@/components/ClipReveal'
import ProjectShowcase from '@/components/ProjectShowcase'
import ParallaxSection from '@/components/ParallaxSection'
import { projects } from '@/data/projects'
import { agents } from '@/data/agents'

export default function Home() {
  return (
    <>
      {/* ═══ HERO — PantheonNetwork with simple overlay ═══ */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <PantheonNetwork />

        <div className="relative z-10 text-center px-6 pointer-events-none">
          <TextReveal
            text="JU."
            tag="h1"
            className="text-[32vw] sm:text-[24vw] md:text-[18vw] font-bold tracking-[-0.06em] leading-[0.85] text-foreground mix-blend-overlay opacity-40"
            stagger={0.15}
          />

          <Reveal delay={0.6}>
            <p className="mt-3 text-sm sm:text-base text-muted/50 font-light tracking-[0.05em]">
              We build the site. Then we build the system behind it.
            </p>
          </Reveal>

          <Reveal delay={0.9}>
            <div className="mt-10 flex items-center justify-center gap-6 pointer-events-auto">
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

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-white/15 animate-pulse" />
        </div>

        <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 font-mono text-[10px] tracking-[0.2em] text-white/[0.12] uppercase pointer-events-none">
          {agents.length} agents &middot; click anywhere
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-background pointer-events-none" />
      </section>

      {/* ═══ MARQUEE ═══ */}
      <section className="py-5 border-y border-white/[0.03]">
        <Marquee speed={30} className="text-muted/15">
          {['Custom Websites', 'AI Automation', 'Next.js', 'Autonomous Agents', 'Audit & Strategy', 'Grass Valley CA', 'Systems That Ship'].map(t => (
            <span key={t} className="mx-8 sm:mx-12 text-[13px] font-mono tracking-[0.15em] uppercase whitespace-nowrap flex items-center gap-4">
              {t} <span className="w-1 h-1 rounded-full bg-accent/20" />
            </span>
          ))}
        </Marquee>
      </section>

      {/* ═══ SELECTED WORK — Immersive title list with cursor-follow images ═══ */}
      <section className="py-32 sm:py-44 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <Reveal>
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-accent/30 mb-4">Portfolio</p>
              </Reveal>
              <ClipReveal direction="up">
                <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.04em] leading-[0.9]">
                  Selected<br />work<span className="text-accent">.</span>
                </h2>
              </ClipReveal>
            </div>
            <Reveal delay={0.3}>
              <Link href="/studio" data-cursor="link" className="hidden sm:block hover-line text-sm text-muted/40 hover:text-foreground transition-colors">
                All projects &rarr;
              </Link>
            </Reveal>
          </div>

          <ProjectShowcase projects={projects} />
        </div>
      </section>

      {/* ═══ THE SPLIT — Services with depth ═══ */}
      <section className="py-32 sm:py-44 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          {/* Studio */}
          <ParallaxSection speed={0.15}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-40">
              <div className="lg:col-span-5">
                <ClipReveal direction="left">
                  <p className="text-[8rem] sm:text-[12rem] lg:text-[14rem] font-bold tracking-[-0.06em] leading-[0.75] text-outline select-none" aria-hidden="true">
                    01
                  </p>
                </ClipReveal>
              </div>

              <div className="lg:col-span-7 lg:pt-12">
                <Reveal>
                  <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-accent/40 mb-4">Websites</p>
                  <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.03em] leading-[0.95] mb-6">
                    JU<span className="text-accent">.</span> Studio
                  </h2>
                  <p className="text-muted text-base leading-relaxed mb-8 max-w-lg">
                    Custom websites for businesses that are serious about how they
                    show up online. Next.js. No templates. No WordPress.
                  </p>
                </Reveal>
                <Reveal delay={0.2}>
                  <div className="flex items-center gap-8 mb-10">
                    <div>
                      <p className="text-3xl font-bold tracking-tight">$750</p>
                      <p className="text-[10px] font-mono text-muted/30 mt-1">STARTING</p>
                    </div>
                    <div className="w-12 h-px bg-white/[0.06]" />
                    <div>
                      <p className="text-3xl font-bold tracking-tight">$4K</p>
                      <p className="text-[10px] font-mono text-muted/30 mt-1">PREMIUM</p>
                    </div>
                  </div>
                  <MagneticButton>
                    <Link href="/studio" data-cursor="link" className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-accent/20 text-sm text-accent hover:bg-accent/[0.05] transition-all duration-500">
                      See the portfolio <span>&rarr;</span>
                    </Link>
                  </MagneticButton>
                </Reveal>
              </div>
            </div>
          </ParallaxSection>

          {/* Systems */}
          <ParallaxSection speed={0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              <div className="lg:col-span-7 order-2 lg:order-1 lg:pt-12">
                <Reveal>
                  <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-zeus/40 mb-4">AI Automation</p>
                  <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.03em] leading-[0.95] mb-6">
                    JU<span className="text-zeus">.</span> Systems
                  </h2>
                  <p className="text-muted text-base leading-relaxed mb-8 max-w-lg">
                    AI audit and automation for businesses still running on manual
                    processes. We find what&apos;s costing you. Then we fix it.
                  </p>
                </Reveal>
                <Reveal delay={0.2}>
                  <div className="flex items-center gap-8 mb-10">
                    <div>
                      <p className="text-3xl font-bold tracking-tight">$997</p>
                      <p className="text-[10px] font-mono text-muted/30 mt-1">AUDIT</p>
                    </div>
                    <div className="w-12 h-px bg-white/[0.06]" />
                    <div>
                      <p className="text-3xl font-bold tracking-tight">$5K<span className="text-sm font-normal text-muted">/mo</span></p>
                      <p className="text-[10px] font-mono text-muted/30 mt-1">EMBEDDED</p>
                    </div>
                  </div>
                  <MagneticButton>
                    <Link href="/systems" data-cursor="link" className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-zeus/20 text-sm text-zeus hover:bg-zeus/[0.05] transition-all duration-500">
                      Learn about audits <span>&rarr;</span>
                    </Link>
                  </MagneticButton>
                </Reveal>
              </div>

              <div className="lg:col-span-5 order-1 lg:order-2">
                <ClipReveal direction="right">
                  <p className="text-[8rem] sm:text-[12rem] lg:text-[14rem] font-bold tracking-[-0.06em] leading-[0.75] text-outline select-none text-right" aria-hidden="true">
                    02
                  </p>
                </ClipReveal>
              </div>
            </div>
          </ParallaxSection>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="py-20 px-6 border-y border-white/[0.03] relative">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8">
          {[
            { value: 9, suffix: '', label: 'Autonomous agents', context: 'Running 24/7 across both businesses' },
            { value: 6, suffix: '+', label: 'Sites shipped', context: 'All custom. None templated.' },
            { value: 24, suffix: '/7', label: 'System uptime', context: 'Pipelines never sleep' },
            { value: 48, suffix: 'hr', label: 'Audit delivery', context: 'From discovery call to written report' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl sm:text-5xl font-bold tracking-[-0.04em] text-foreground">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-xs text-muted/40 mt-2 font-mono tracking-wide uppercase">{stat.label}</p>
              <p className="text-[10px] text-muted/20 mt-1 font-mono">{stat.context}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ THE PANTHEON ═══ */}
      <section className="py-32 sm:py-44 px-6 relative">
        <div className="max-w-5xl mx-auto relative z-10">
          <ClipReveal direction="center">
            <div className="text-center mb-20">
              <p className="text-outline-accent text-6xl sm:text-8xl lg:text-9xl font-bold tracking-[-0.05em] leading-none select-none" aria-hidden="true">
                PANTHEON
              </p>
              <p className="text-muted/50 text-sm sm:text-base max-w-xl mx-auto mt-6 leading-relaxed">
                {agents.length} autonomous AI agents manage the entire pipeline. Self-improving every week.
              </p>
            </div>
          </ClipReveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
            {agents.map((agent, i) => (
              <Reveal key={agent.id} delay={i * 0.04}>
                <div className="bg-background/80 p-6 hover:bg-white/[0.02] transition-colors duration-500 group h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: agent.color }} />
                      <div className="absolute inset-0 rounded-full animate-pulse-glow" style={{ backgroundColor: agent.color, filter: 'blur(4px)' }} />
                    </div>
                    <span className="font-semibold text-sm text-foreground/90 group-hover:text-foreground transition-colors">{agent.name}</span>
                  </div>
                  <p className="text-xs text-muted/50 leading-relaxed">{agent.description}</p>
                  <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-muted/20 mt-3">{agent.domain}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-32 sm:py-44 px-6 relative">
        <div className="glow-divider max-w-lg mx-auto mb-20" />
        <div className="max-w-2xl mx-auto text-center">
          <ClipReveal direction="up">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.04em] leading-[0.95]">
              Let&apos;s build something<span className="text-accent">.</span>
            </h2>
          </ClipReveal>
          <Reveal delay={0.3}>
            <p className="text-muted mt-6 mb-12">No intake forms. No chatbots. Just a real conversation.</p>
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

      {/* ═══ FOOTER ═══ */}
      <footer className="px-6 py-8 border-t border-white/[0.03]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-muted/25 font-mono tracking-wider">
          <span>&copy; {new Date().getFullYear()} JU.</span>
          <span>Grass Valley, CA</span>
        </div>
      </footer>
    </>
  )
}
