import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Reveal from '@/components/Reveal'
import ClipReveal from '@/components/ClipReveal'
import MagneticButton from '@/components/MagneticButton'
import ParallaxSection from '@/components/ParallaxSection'
import ProjectShowcase from '@/components/ProjectShowcase'
import { projects } from '@/data/projects'

export const metadata: Metadata = {
  title: 'JU. Studio',
  description: 'Custom websites built in Next.js. No templates. Starting at $750.',
}

const tiers = [
  { name: 'Landing Page', price: '$750', desc: 'One page. One purpose. Built to convert.', includes: 'Custom design, mobile responsive, SEO-ready, 1 revision round' },
  { name: 'Multi-Page', price: '$1,500', desc: '3-5 pages. Room to breathe.', includes: 'Up to 5 pages, contact form, basic SEO, 2 revision rounds' },
  { name: 'Full Site', price: '$3,000', desc: 'The full build.', includes: 'Up to 10 pages, design system, CMS, advanced SEO, analytics, 3 revision rounds', featured: true },
  { name: 'Premium', price: '$4,000', desc: 'For businesses that want the best.', includes: 'Unlimited pages, e-commerce or booking, structured data, conversion tracking, 30 days post-launch' },
]

export default function StudioPage() {
  return (
    <>
      {/* Hero — Split layout with featured project image reveal */}
      <section className="min-h-screen flex items-end relative overflow-hidden pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end">
            {/* Left: Typography */}
            <div>
              <Reveal>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent/30 mb-8">JU. Studio</p>
              </Reveal>

              <ClipReveal direction="up">
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-[-0.05em] leading-[0.85]">
                  Websites<br />
                  that<br />
                  <span className="text-outline-accent">perform</span>
                  <span className="text-accent">.</span>
                </h1>
              </ClipReveal>

              <Reveal delay={0.5}>
                <p className="text-muted text-base sm:text-lg max-w-md leading-relaxed mt-10">
                  Custom sites in Next.js and React. No page builders.
                  No WordPress. Flat-rate, starting at $750.
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
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent text-background text-sm font-semibold hover:shadow-[0_0_40px_rgba(0,212,255,0.2)] transition-all duration-500"
                    >
                      Start a project
                    </Link>
                  </MagneticButton>
                  <span className="text-xs text-muted/30 font-mono">$750 &ndash; $4,000</span>
                </div>
              </Reveal>
            </div>

            {/* Right: Featured project — clip-path reveal */}
            <ClipReveal direction="right" delay={0.3}>
              <a
                href={projects[0].url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="project"
                data-cursor-label="View"
                className="group block relative rounded-2xl overflow-hidden border border-white/[0.06] hover:border-white/[0.12] transition-all duration-700"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <Image
                    src={projects[0].image}
                    alt={projects[0].title}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-1000 ease-out"
                    priority
                  />
                </div>
                <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-background/90 via-background/40 to-transparent">
                  <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-accent/40">{projects[0].tag}</p>
                  <p className="text-base font-bold text-foreground mt-1">{projects[0].title}</p>
                </div>
              </a>
            </ClipReveal>
          </div>
        </div>
      </section>

      {/* Portfolio — Immersive title-based showcase */}
      <section className="py-32 sm:py-44 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-6 mb-4">
              <div className="h-px flex-1 bg-white/[0.04]" />
              <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted/25">All projects</p>
              <div className="h-px flex-1 bg-white/[0.04]" />
            </div>
          </Reveal>

          <ProjectShowcase projects={projects} />
        </div>
      </section>

      {/* How I build — Staggered reveals, not uniform cards */}
      <section className="py-32 sm:py-44 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <ParallaxSection speed={0.1}>
            <ClipReveal direction="left">
              <h2 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-[-0.05em] leading-[0.85] mb-24">
                Not like<br />other<br />
                <span className="text-outline">agencies</span><span className="text-accent">.</span>
              </h2>
            </ClipReveal>
          </ParallaxSection>

          <div className="space-y-0">
            {[
              { title: 'Custom code', body: 'React, Next.js, Tailwind. Every component built specifically for your brand. No WordPress. No Webflow. No Wix.', num: '01' },
              { title: 'Fast by default', body: 'Static generation, image optimization, lazy loading. Your site scores 90+ on PageSpeed before we even start optimizing.', num: '02' },
              { title: 'Built to hand off', body: 'Clean code, CMS integration, documentation. You can update content yourself or hand it to any developer.', num: '03' },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="group grid grid-cols-1 lg:grid-cols-12 gap-6 py-12 border-b border-white/[0.04] hover:border-accent/10 transition-colors duration-700">
                  <div className="lg:col-span-1">
                    <span className="font-mono text-[11px] text-muted/15 group-hover:text-accent/30 transition-colors duration-500">{item.num}</span>
                  </div>
                  <div className="lg:col-span-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-accent transition-colors duration-500">{item.title}</h3>
                  </div>
                  <div className="lg:col-span-7">
                    <p className="text-sm text-muted/50 leading-relaxed max-w-lg group-hover:text-muted/70 transition-colors duration-500">{item.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing — Dramatic layout */}
      <section className="py-32 sm:py-44 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <ClipReveal direction="up">
            <div className="mb-20">
              <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-accent/30 mb-6">Investment</p>
              <h2 className="text-4xl sm:text-6xl font-bold tracking-[-0.04em] leading-[0.9]">
                Flat rate<span className="text-accent">.</span><br />
                <span className="text-muted/30">No surprises.</span>
              </h2>
            </div>
          </ClipReveal>

          <div className="space-y-0">
            {tiers.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 0.06}>
                <div className={`group grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8 py-8 sm:py-10 border-b border-white/[0.04] hover:border-accent/10 transition-all duration-500 ${
                  tier.featured ? 'bg-accent/[0.02] -mx-6 px-6 sm:-mx-8 sm:px-8 rounded-xl border-accent/[0.08]' : ''
                }`}>
                  <div className="sm:col-span-3 flex items-center gap-3">
                    {tier.featured && <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />}
                    <div>
                      <h3 className="text-base font-bold text-foreground">{tier.name}</h3>
                      <p className="text-xs text-muted/30 mt-0.5 sm:hidden">{tier.desc}</p>
                    </div>
                  </div>
                  <div className="sm:col-span-2 flex items-center">
                    <p className="text-2xl font-bold tracking-tight text-foreground">{tier.price}</p>
                  </div>
                  <div className="sm:col-span-4 flex items-center">
                    <p className="text-xs text-muted/40 leading-relaxed">{tier.includes}</p>
                  </div>
                  <div className="sm:col-span-3 flex items-center justify-start sm:justify-end">
                    <Link
                      href="https://calendly.com/julius-systems"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="link"
                      className={`text-sm font-medium transition-all duration-300 ${
                        tier.featured
                          ? 'text-accent hover:text-foreground'
                          : 'text-muted/30 group-hover:text-foreground'
                      }`}
                    >
                      Get started &rarr;
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <p className="text-xs text-muted/20 mt-8 font-mono">
              All tiers include hosting setup, responsive design, and hand-off documentation.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 sm:py-40 px-6">
        <div className="glow-divider max-w-sm mx-auto mb-20" />
        <div className="max-w-2xl mx-auto text-center">
          <ClipReveal direction="up">
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.04em] leading-[0.9]">
              Ready to<br />build<span className="text-accent">?</span>
            </h2>
          </ClipReveal>
          <Reveal delay={0.3}>
            <p className="text-muted text-sm mt-6 mb-12">Book a call. Tell me what you need. I&apos;ll tell you what it takes.</p>
          </Reveal>
          <Reveal delay={0.5}>
            <MagneticButton>
              <Link
                href="https://calendly.com/julius-systems"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-background font-semibold text-sm hover:shadow-[0_0_50px_rgba(0,212,255,0.25)] transition-all duration-500"
              >
                Book a Call
              </Link>
            </MagneticButton>
          </Reveal>
        </div>
      </section>
    </>
  )
}
