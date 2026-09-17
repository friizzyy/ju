import { studioFacts } from './studio-facts'

export interface StudioProject {
  slug: string
  title: string
  category: string
  description: string
  location?: string
  image?: string
  imageAlt?: string
  presentation: 'website' | 'cover'
  coverName?: string
  url?: string
  accent: string
}

// Seven selected projects; Julius removed Nuri from this gallery.
// The completed-project record and shared homepage collection stay independent.
const details: StudioProject[] = [
  { slug: 'engineered-adherence', title: 'Engineered Adherence', category: 'Research compounds', description: 'Research peptides, batch documentation and a direct line to the founder.', image: 'engineered-adherence-home-20260916', imageAlt: 'Fresh homepage screenshot of Engineered Adherence', presentation: 'website', url: 'https://engineeredadherence.com', accent: '#c5beb2' },
  { slug: 'algx', title: 'ALGX', category: 'Cannabis', description: 'Ranch-grown cannabis flower and pre-rolls, refined through field data and hands-on cultivation.', location: 'Grass Valley, California', image: 'algx-home-20260916', imageAlt: 'Fresh homepage screenshot of ALGX', presentation: 'website', url: 'https://algx.ai', accent: '#afc6ae' },
  { slug: 'ulixes-corp', title: 'Ulixes Corp', category: 'Capital markets advisory', description: 'Helping banks and hedge funds modernize trading platforms, manage risk and improve operations.', location: 'San Francisco, California', image: 'ulixes-home-20260916', imageAlt: 'Fresh homepage screenshot of Ulixes Corp', presentation: 'website', url: 'https://www.ulixescorp.com', accent: '#b899f6' },
  { slug: 'rancho-machete', title: 'Rancho Machete', category: 'Ranch & agriculture', description: 'Grass-fed beef raised on the ranch and sold directly as cuts and shares.', location: 'Grass Valley, California', image: 'rancho-machete-home-20260916', imageAlt: 'Fresh homepage screenshot of Rancho Machete', presentation: 'website', url: 'https://ranchomachete.com', accent: '#d9b486' },
  { slug: 'sarf', title: 'SARF', category: 'Agricultural nonprofit', description: 'Helping local farmers improve water and soil management and prepare projects for funding.', location: 'Nevada County, California', image: 'sarf-home-20260916', imageAlt: 'Fresh homepage screenshot of SARF', presentation: 'website', url: 'https://www.sarf.ag', accent: '#b7c29c' },
  { slug: 'askarr-healthcare', title: 'ASKARR Healthcare', category: 'Healthcare consulting', description: 'Helping healthcare teams improve daily operations, make use of their data and choose the right technology.', location: 'Tallinn, Estonia / Skopje, North Macedonia', image: 'askarr-home-20260916', imageAlt: 'Fresh homepage screenshot of ASKARR Healthcare', presentation: 'website', url: 'https://www.askarr.io', accent: '#a5b9db' },
  { slug: 'home-choice', title: 'Home Choice Health Care Services', category: 'Home care', description: 'Personal care, companionship and respite for families who need support at home.', location: 'Mount Holly, New Jersey', image: 'home-choice-home-20260916', imageAlt: 'Fresh homepage screenshot of Home Choice Health Care Services', presentation: 'website', url: 'https://homechoicehcs.com', accent: '#9dbcca' },
]

if (details.some(project => !studioFacts.completedWebsites.some(title => title === project.title))) {
  throw new Error('Selected Studio work must reference a confirmed completed website.')
}

export const studioProjects = [...details].sort((a, b) =>
  b.title.length - a.title.length || a.title.localeCompare(b.title)
)
