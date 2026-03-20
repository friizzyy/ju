export interface Project {
  slug: string
  title: string
  description: string
  tag: string
  color: 'emerald' | 'violet' | 'blue' | 'rose' | 'amber' | 'slate' | 'cyan'
  image: string
  url: string
  status: 'live' | 'in-progress' | 'archived'
}

export const projects: Project[] = [
  {
    slug: 'grantsby-ai',
    title: 'GrantsByAI',
    description: 'AI-powered grant discovery platform for nonprofits and researchers.',
    tag: 'SaaS / AI',
    color: 'emerald',
    image: '/images/grantsby.png',
    url: 'https://grantsbyai.com',
    status: 'live',
  },
  {
    slug: 'engineered-adherence',
    title: 'Engineered Adherence',
    description: 'Bio-longevity brand built around evidence-based health protocols.',
    tag: 'Bio-Longevity',
    color: 'slate',
    image: '/images/engineered-adherence.png',
    url: 'https://engineeredadherence.com',
    status: 'live',
  },
  {
    slug: 'algx',
    title: 'ALGX',
    description: 'Agricultural technology platform connecting growers with precision data.',
    tag: 'AgTech',
    color: 'emerald',
    image: '/images/algx.png',
    url: 'https://algx.com',
    status: 'live',
  },
  {
    slug: 'ulixes-corp',
    title: 'Ulixes Corp',
    description: 'Capital markets firm site built for credibility and investor trust.',
    tag: 'Capital Markets',
    color: 'violet',
    image: '/images/ulixes.png',
    url: 'https://ulixescorp.com',
    status: 'live',
  },
  {
    slug: 'crewlink',
    title: 'CrewLink',
    description: 'Marketplace connecting skilled tradespeople with construction projects.',
    tag: 'Marketplace',
    color: 'blue',
    image: '/images/crewlink.png',
    url: 'https://crewlink.com',
    status: 'live',
  },
  {
    slug: 'rancho-machete',
    title: 'Rancho Machete',
    description: 'Ranch and agriculture brand site with rugged, authentic positioning.',
    tag: 'Ranch & Agriculture',
    color: 'rose',
    image: '/images/rancho-machete.png',
    url: 'https://ranchomachete.com',
    status: 'live',
  },
]
