import type { Metadata } from 'next'
import type { PricingPlan } from '@/components/PricingCards'
import SystemsHero from '@/components/SystemsHero'
import SystemsWorkflows from '@/components/SystemsWorkflows'
import SystemsProcess from '@/components/SystemsProcess'
import SystemsPricing from '@/components/SystemsPricing'
import SystemsEnding from '@/components/SystemsEnding'

export const metadata: Metadata = {
  title: 'JU. Systems',
  description: 'Modernize your workflows with custom software, AI agents and connected tools. Systems audits start at $1,500.',
}

const systemsPricing: PricingPlan[] = [
  { title: 'Snapshot Audit', price: '$1,500', period: 'one-time', label: 'Entry point', description: 'A focused review of where your workflows need attention.', features: ['45-min discovery call', 'Workflow review across core operations', '5–7 findings with real ROI estimates', 'Clear recommendation on what to automate first', 'Delivered in 5 business days'], cta: 'Book a call', ctaHref: 'https://calendly.com/julius-buildwithju/systems-audit-45-min', accentColor: '#7298D2', glowRgb: '114,152,210' },
  { title: 'Deep Systems Audit', price: '$3,500', period: 'one-time', label: 'Most popular', featured: true, description: 'A deeper look across your teams, with a prioritized roadmap.', features: ['Everything in Snapshot', 'Up to 5 departments reviewed', 'Custom agent architecture diagram', 'Prioritized automation roadmap', 'Delivered in 10 business days'], cta: 'Book a call', ctaHref: 'https://calendly.com/julius-buildwithju/systems-audit-45-min', accentColor: '#7298D2', glowRgb: '114,152,210' },
  { title: 'Embedded Consultant', price: '$5,000', period: '/month', label: 'Full service', description: 'I scope it, build it, deploy it, and keep it running.', features: ['Monthly strategy session to scope what gets built', 'Custom AI agents designed and deployed for your needs', 'All agents built under retainer monitored and maintained', 'Direct access to Julius via Telegram (within 24hrs)', 'Cancel anytime with 30 days notice'], cta: 'Book a call', ctaHref: 'https://calendly.com/julius-buildwithju/systems-audit-45-min', accentColor: '#7298D2', glowRgb: '114,152,210' },
]

export default function SystemsPage() {
  return (
    <>
      <SystemsHero />
      <SystemsWorkflows />
      <SystemsProcess />
      <SystemsPricing plans={systemsPricing} />
      <SystemsEnding />
    </>
  )
}
