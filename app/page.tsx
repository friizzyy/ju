'use client'

import Link from 'next/link'
import type { CSSProperties } from 'react'
import styles from './ServiceCards.module.css'
import HomeHero from '@/components/HomeHero'
import Marquee from '@/components/Marquee'
import ProofStrip from '@/components/ProofStrip'
import PantheonSection from '@/components/PantheonSection'
import HomeClosing from '@/components/HomeClosing'
import MobileCarousel from '@/components/MobileCarousel'
import Disclosure from '@/components/Disclosure'

const SectionDivider = () => (
  <div className="max-w-6xl mx-auto px-6">
    <div
      className="h-px w-full"
      style={{
        background:
          'linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)',
      }}
    />
  </div>
)

const services = [
  {
    num: '01',
    tag: 'Websites',
    nameAccent: 'Studio',
    color: '#8B5CF6',
    rgb: '139,92,246',
    ink: '#C4AEFF',
    description:
      'A custom website that feels like your business. Designed around your brand and built to work beautifully on every screen.',
    features: [
      'Custom design for your business',
      'Built for phones and desktops',
      'Fast-loading, responsive pages',
      'Clear editing and hand-off guidance',
    ],
    price: '$750–$4,000',
    priceLabel: 'One-time project',
    priceDetail: null,
    link: '/studio',
    linkLabel: 'View portfolio',
  },
  {
    num: '02',
    tag: 'AI Automation',
    nameAccent: 'Systems',
    color: '#6366F1',
    rgb: '99,102,241',
    ink: '#B7BEFF',
    description:
      'AI agents and automations that take repetitive work off your plate. We find the right place to start, then build it into your existing tools.',
    features: [
      'Find the work worth automating',
      'Agents built around your workflow',
      'Connected to the tools you use',
      'Ongoing monitoring and improvements',
    ],
    price: 'From $1,500',
    priceLabel: 'One-time audit',
    priceDetail: 'Ongoing service · $5,000/month',
    link: '/systems',
    linkLabel: 'Learn more',
  },
]

export default function Home() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <HomeHero />

      {/* ═══ MARQUEE ═══ */}
      <section className={`${styles.ribbon} py-8 border-y border-white/[0.03]`}>
        <Marquee speed={30} className={styles.marquee}>
          {[
            'Custom Websites',
            'AI Automation',
            'Next.js',
            'Autonomous Agents',
            'Audit & Strategy',
            'San Francisco CA',
            'Systems That Ship',
          ].map((t) => (
            <span
              key={t}
              className="text-[13px] font-mono tracking-[0.15em] uppercase whitespace-nowrap flex shrink-0 items-center"
            >
              {t}
              <span
                aria-hidden="true"
                className="mx-10 sm:mx-14 w-1 h-1 shrink-0 rounded-full bg-accent/50"
              />
            </span>
          ))}
        </Marquee>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section
        id="services"
        className={`${styles.section} py-20 sm:py-28 px-6 relative`}
        aria-label="Websites and AI automation"
      >
        <div className="max-w-6xl mx-auto">
          <header className={styles.mobileHeading}>
            <p>Two ways to build.</p>
            <span>Websites & AI systems</span>
          </header>
          <MobileCarousel label="Services" desktopGrid>
            {services.map((service) => (
              <article
                key={service.num}
                className={`${styles.card} group relative flex flex-col rounded-2xl border overflow-hidden cursor-default h-full`}
                style={
                  {
                    '--service-rgb': service.rgb,
                    '--service-ink': service.ink,
                  } as CSSProperties
                }
                aria-labelledby={`service-${service.nameAccent.toLowerCase()}`}
              >
                <div
                  className={`${styles.wash} absolute inset-0 pointer-events-none rounded-2xl`}
                  aria-hidden="true"
                />

                <div
                  className={`${styles.body} relative flex flex-col h-full p-5 sm:p-10`}
                >
                  <div
                    className={`${styles.category} flex items-center justify-between mb-10`}
                  >
                    <p
                      className="font-mono text-[11px] tracking-[0.2em] uppercase"
                      style={{ color: service.ink }}
                    >
                      {service.num}: {service.tag}
                    </p>
                    <div
                      className="w-2 h-2 rounded-full opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: service.color }}
                      aria-hidden="true"
                    />
                  </div>

                  <h2
                    id={`service-${service.nameAccent.toLowerCase()}`}
                    className={`${styles.title} font-bold tracking-[-0.04em] pb-2 mb-5`}
                  >
                    JU<span style={{ color: service.color }}>.</span>{' '}
                    {service.nameAccent}
                  </h2>

                  <p
                    className={`${styles.description} text-white/70 text-sm leading-relaxed max-w-sm mb-8`}
                  >
                    {service.description}
                  </p>

                  <ul
                    className={`${styles.desktopFeatures} space-y-2 sm:space-y-2.5 flex-1 mb-10`}
                  >
                    {service.features.map((feature, fi) => (
                      <li key={fi} className="flex items-start gap-3">
                        <span
                          className="w-3 h-px mt-2.5 flex-shrink-0"
                          style={{ background: `rgba(${service.rgb}, 0.4)` }}
                          aria-hidden="true"
                        />
                        <span className="text-sm text-white/65">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Disclosure
                    label="What’s included"
                    className={styles.mobileFeatures}
                  >
                    <ul className={styles.featureList}>
                      {service.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </Disclosure>

                  <div
                    className={`${styles.pricing} flex flex-wrap items-center justify-between gap-x-4 gap-y-5 pt-5 sm:pt-6 border-t`}
                    style={{ borderColor: `rgba(${service.rgb}, 0.10)` }}
                  >
                    <div>
                      <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-white/60 mb-1.5">
                        {service.priceLabel}
                      </p>
                      <p
                        className="font-bold text-lg tracking-tight"
                        style={{ color: service.ink }}
                      >
                        {service.price}
                      </p>
                      {service.priceDetail && (
                        <p className="text-xs leading-relaxed text-white/65 mt-1.5">
                          {service.priceDetail}
                        </p>
                      )}
                    </div>
                    <Link
                      href={service.link}
                      className={`${styles.link} inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium`}
                    >
                      {service.linkLabel} <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </MobileCarousel>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ STATS ═══ */}
      <ProofStrip />

      {/* ═══ THE PANTHEON ═══ */}
      <PantheonSection />

      {/* ═══ CTA ═══ */}
      <HomeClosing />
    </>
  )
}
