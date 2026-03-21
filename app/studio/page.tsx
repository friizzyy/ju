import type { Metadata } from 'next'
import Link from 'next/link'
import Reveal from '@/components/Reveal'
import ClipReveal from '@/components/ClipReveal'
import MagneticButton from '@/components/MagneticButton'
import ParallaxSection from '@/components/ParallaxSection'
import ProjectShowcase from '@/components/ProjectShowcase'
import PricingCards, { type PricingPlan } from '@/components/PricingCards'
import BuildAnimation from '@/components/BuildAnimation'
import { projects } from '@/data/projects'

export const metadata: Metadata = {
  title: 'JU. Studio',
  description: 'Custom websites built in Next.js. No templates. Starting at $750.',
}

const studioPricing: PricingPlan[] = [
  { title: 'Landing Page', price: '$750', period: 'one-time', label: 'Starter', description: 'One page. One purpose. Built to convert.', features: ['Custom design', 'Mobile responsive', 'SEO-ready', '1 revision round', 'Hosting setup'], cta: 'Get started', ctaHref: 'https://calendly.com/julius-systems', accentColor: '#8B5CF6', glowRgb: '139,92,246' },
  { title: 'Multi-Page', price: '$1,500', period: 'one-time', label: 'Foundation', description: '3-5 pages. Room to breathe and grow.', features: ['Up to 5 pages', 'Contact form', 'Basic SEO', '2 revision rounds', 'Hosting setup', 'Hand-off docs'], cta: 'Get started', ctaHref: 'https://calendly.com/julius-systems', accentColor: '#8B5CF6', glowRgb: '139,92,246' },
  { title: 'Full Site', price: '$3,000', period: 'one-time', label: 'Most popular', featured: true, description: 'The full build. Nothing held back.', features: ['Up to 10 pages', 'Design system', 'CMS integration', 'Advanced SEO', 'Analytics setup', '3 revision rounds', 'Hand-off docs'], cta: 'Get started', ctaHref: 'https://calendly.com/julius-systems', accentColor: '#8B5CF6', glowRgb: '139,92,246' },
  { title: 'Premium', price: '$4,000', period: 'one-time', label: 'Enterprise', description: 'For businesses that want the best.', features: ['Unlimited pages', 'E-commerce or booking', 'Structured data', 'Conversion tracking', '30-day post-launch support'], cta: 'Get started', ctaHref: 'https://calendly.com/julius-systems', accentColor: '#8B5CF6', glowRgb: '139,92,246' },
]

export default function StudioPage() {
  return (
    <>
      {/* Hero:Split layout with featured project image reveal */}
      <section className="min-h-[100svh] flex items-center relative overflow-hidden px-5 sm:px-6 pt-16 sm:pt-0">
        <div className="max-w-7xl mx-auto w-full relative z-10">
          {/* Mobile: stacked compact. Desktop: side by side */}
          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-6 lg:gap-20 items-center">
            {/* Text — always first */}
            <div>
              <Reveal>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-studio/30 mb-4 sm:mb-8">JU. Studio</p>
              </Reveal>

              <ClipReveal direction="up">
                <h1 className="text-3xl sm:text-7xl lg:text-8xl font-bold tracking-[-0.05em] leading-[0.92] pb-2">
                  No templates<span className="text-studio">.</span><br />
                  No shortcuts<span className="text-studio">.</span><br />
                  <span className="text-outline-studio">Just code.</span>
                </h1>
              </ClipReveal>

              <Reveal delay={0.5}>
                <p className="text-white/55 text-sm leading-relaxed max-w-sm mt-4 sm:mt-10 mb-6 sm:mb-0">
                  Custom Next.js sites. No templates. No builders. Flat-rate.
                </p>
              </Reveal>

              <Reveal delay={0.7}>
                <div className="flex items-center gap-3 mt-4 sm:mt-10">
                  <MagneticButton>
                    <Link
                      href="https://calendly.com/julius-systems"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="link"
                      className="inline-flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-studio text-white text-sm font-semibold hover:shadow-[0_0_40px_rgba(139,92,246,0.2)] transition-all duration-500"
                    >
                      Start a project
                    </Link>
                  </MagneticButton>
                  <span className="text-xs text-white/20 font-mono hidden sm:block">$750 — $4,000</span>
                </div>
              </Reveal>
            </div>

            {/* Animation — smaller on mobile */}
            <ClipReveal direction="right" delay={0.3}>
              <div className="relative h-[200px] sm:h-[520px] w-full">
                <BuildAnimation />
              </div>
            </ClipReveal>
          </div>
        </div>
      </section>

      {/* Portfolio:Immersive title-based showcase */}
      <section className="py-12 sm:py-32 lg:py-44 px-6 relative">
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

      {/* How I build:Convictions, not feature bullets */}
      <section className="py-12 sm:py-32 lg:py-44 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <ParallaxSection speed={0.1}>
            <ClipReveal direction="left">
              <h2 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-[-0.05em] leading-[0.92] mb-24">
                Not like<br />other<br />
                <span className="text-outline">agencies</span><span className="text-studio">.</span>
              </h2>
            </ClipReveal>
          </ParallaxSection>

          <div className="space-y-0">
            {[
              { title: 'Custom code only', body: 'Every component built for your brand. If it exists somewhere as a template, I don\'t use it.', num: '01' },
              { title: 'Fast as a baseline', body: '90+ PageSpeed isn\'t a goal. It\'s the floor. Static generation, image optimization, zero bloat. Built in from the start.', num: '02' },
              { title: 'Yours to own', body: 'Clean code, CMS if you need it, full documentation. Any developer can pick it up after I\'m done.', num: '03' },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="group grid grid-cols-1 lg:grid-cols-12 gap-6 py-8 sm:py-12 border-b border-white/[0.04] hover:border-studio/10 transition-colors duration-700">
                  <div className="lg:col-span-1">
                    <span className="font-mono text-[11px] text-muted/15 group-hover:text-studio/30 transition-colors duration-500">{item.num}</span>
                  </div>
                  <div className="lg:col-span-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-studio transition-colors duration-500">{item.title}</h3>
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

      {/* Pricing:Dramatic layout */}
      <section className="py-12 sm:py-32 lg:py-44 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <ClipReveal direction="up">
            <div className="mb-20">
              <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-studio/30 mb-6">Investment</p>
              <h2 className="text-4xl sm:text-6xl font-bold tracking-[-0.04em] leading-[0.9]">
                Flat rate<span className="text-studio">.</span><br />
                <span className="text-muted/30">No surprises.</span>
              </h2>
            </div>
          </ClipReveal>

          <PricingCards plans={studioPricing} columns={4} />

          <Reveal delay={0.3}>
            <p className="text-xs text-muted/40 mt-8 font-mono">
              All tiers include hosting setup, responsive design, and hand-off documentation.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Bridge to Systems */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="my-24 p-10 rounded-2xl border border-white/[0.04] hover:border-zeus/[0.10] transition-colors duration-700 group">
              <div className="grid sm:grid-cols-12 gap-8 items-center">
                <div className="sm:col-span-8">
                  <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-zeus/30 mb-3">Already have the site?</p>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-3 group-hover:text-zeus transition-colors duration-500">Now automate what runs behind it<span className="text-zeus">.</span></h3>
                  <p className="text-sm text-muted/50 max-w-lg leading-relaxed">JU. Systems audits your business for the workflows costing you time and builds the AI agents that handle them.</p>
                </div>
                <div className="sm:col-span-4 sm:flex sm:justify-end">
                  <Link href="/systems" data-cursor="link" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-zeus/20 text-sm text-zeus hover:bg-zeus/[0.05] group-hover:border-zeus/40 transition-all duration-500">See JU. Systems &rarr;</Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-32 lg:py-40 px-6">
        <div className="glow-divider max-w-sm mx-auto mb-20" />
        <div className="max-w-2xl mx-auto text-center">
          <ClipReveal direction="up">
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.04em] leading-[0.9]">
              Ready to<br />build<span className="text-studio">?</span>
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
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-studio text-white font-semibold text-sm hover:shadow-[0_0_50px_rgba(139,92,246,0.25)] transition-all duration-500"
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
