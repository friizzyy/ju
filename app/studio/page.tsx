import type { Metadata } from 'next'
import StudioWork from '@/components/StudioWork'
import StudioEnding from '@/components/StudioEnding'
import type { PricingPlan } from '@/components/PricingCards'
import StudioPricing from '@/components/StudioPricing'
import StudioHero from '@/components/StudioHero'
import StudioApproach from '@/components/StudioApproach'
import StudioApproachConcept from '@/components/StudioApproachConcept'
import flow from './StudioFlow.module.css'

export const metadata: Metadata = {
  title: 'JU. Studio',
  description: 'Custom websites built in Next.js. No templates. Starting at $750.',
}

const studioPricing: PricingPlan[] = [
  { title: 'Landing Page', price: '$750', period: 'one-time', label: 'Starter', description: 'One page. One purpose. Built to convert.', features: ['Custom design', 'Mobile responsive', 'SEO-ready', '1 revision round', 'Hosting setup'], cta: 'Get started', ctaHref: 'https://calendly.com/julius-buildwithju/studio-quick-look', accentColor: '#8B5CF6', glowRgb: '139,92,246' },
  { title: 'Multi-Page', price: '$1,500', period: 'one-time', label: 'Foundation', description: '3-5 pages. Room to breathe and grow.', features: ['Up to 5 pages', 'Contact form', 'Basic SEO', '2 revision rounds', 'Hosting setup', 'Hand-off docs'], cta: 'Get started', ctaHref: 'https://calendly.com/julius-buildwithju/studio-quick-look', accentColor: '#8B5CF6', glowRgb: '139,92,246' },
  { title: 'Full Site', price: '$3,000', period: 'one-time', label: 'Most popular', featured: true, description: 'The full build. Nothing held back.', features: ['Up to 10 pages', 'Design system', 'CMS integration', 'Advanced SEO', 'Analytics setup', '3 revision rounds', 'Hand-off docs'], cta: 'Get started', ctaHref: 'https://calendly.com/julius-buildwithju/studio-quick-look', accentColor: '#8B5CF6', glowRgb: '139,92,246' },
  { title: 'Premium', price: '$4,000', period: 'one-time', label: 'Enterprise', description: 'For businesses that want the best.', features: ['Unlimited pages', 'E-commerce or booking', 'Structured data', 'Conversion tracking', '30-day post-launch support'], cta: 'Get started', ctaHref: 'https://calendly.com/julius-buildwithju/studio-quick-look', accentColor: '#8B5CF6', glowRgb: '139,92,246' },
]

export default async function StudioPage({ searchParams }: { searchParams: Promise<{ approach?: string }> }) {
  const { approach } = await searchParams
  const concept = approach === 'original' ? null : approach === 'layers' ? 'layers' : 'evolving'
  return (
    <>
      <StudioHero />

      {concept ? <StudioApproachConcept key={concept} concept={concept} showPreview={concept === 'layers'} /> : <StudioApproach />}

      <StudioPricing plans={studioPricing} />

      <div className={flow.continuation}>
        <StudioWork />

        <StudioEnding />
      </div>
    </>
  )
}
