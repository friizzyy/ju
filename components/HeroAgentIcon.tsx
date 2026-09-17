import type { HeroAgentId } from '@/data/hero-agents'

export default function HeroAgentIcon({ id }: { id: HeroAgentId }) {
  switch (id) {
    case 'zeus':
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="m13 3-7 10h5l-1 8 8-12h-6z"></path>
        </svg>
      )
    case 'athena':
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6Z"></path>
          <circle cx="12" cy="12" r="2.5"></circle>
        </svg>
      )
    case 'hermes':
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M4 8h14m-4-4 4 4-4 4M20 16H6m4-4-4 4 4 4"></path>
        </svg>
      )
    case 'ares':
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="m5 12 4 4L19 6M5 20h14"></path>
        </svg>
      )
    case 'hephaestus':
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="m8 5-5 7 5 7m8-14 5 7-5 7m-3-15-2 16"></path>
        </svg>
      )
    case 'prometheus':
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M4 18V9m7 9V5m7 13V2M3 21h18"></path>
        </svg>
      )
    case 'apollo':
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z"></path>
        </svg>
      )
    case 'iris':
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M4 5h16v11H9l-5 4V5Z"></path>
          <path d="M8 9h8m-8 3h5"></path>
        </svg>
      )
    case 'dionysus':
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <circle cx="8" cy="9" r="3"></circle>
          <path d="M2 20v-2a6 6 0 0 1 12 0v2M16 5a3 3 0 0 1 0 6m1 4a5 5 0 0 1 5 5"></path>
        </svg>
      )
  }
}
