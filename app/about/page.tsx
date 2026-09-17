import type { Metadata } from 'next'
import AboutExperience from '@/components/AboutExperience'

export const metadata: Metadata = {
  title: 'About',
  description: 'Meet Julius Williams, the designer and developer behind JU. Custom websites, software and AI systems, built in direct collaboration with you.',
}

export default function AboutPage() {
  return <AboutExperience />
}
