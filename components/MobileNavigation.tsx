'use client'

import type { CSSProperties } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import s from './MobileNavigation.module.css'

const tabs = [
  { href: '/', label: 'Home', theme: 'home', tint: '161, 198, 219', ink: '#e3f0f7' },
  { href: '/studio', label: 'Studio', theme: 'studio', tint: '179, 151, 222', ink: '#e6daf8' },
  { href: '/systems', label: 'Systems', theme: 'systems', tint: '133, 166, 205', ink: '#d5e5f7' },
  { href: '/about', label: 'About', theme: 'about', tint: '204, 214, 223', ink: '#edf1f5' },
  { href: '/contact', label: 'Contact', theme: 'contact', tint: '175, 170, 207', ink: '#e4dff3' },
] as const

type Page = typeof tabs[number]['theme']

function Icon({ page }: { page: Page }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {page === 'home' && <><path d="m4 10 8-7 8 7v10H4Z" /><path d="M9 20v-7h6v7" /></>}
    {page === 'studio' && <><path d="m5 19 3-10 9-5 3 3-5 9Zm0 0 7-7" /><circle cx="12" cy="12" r="1.5" /><path d="m15 5 4 4" /></>}
    {page === 'systems' && <><rect x="9" y="9" width="6" height="6" rx="2" /><path d="M12 4v5m0 6v5M4 12h5m6 0h5" /><circle cx="12" cy="3" r="1.5" /><circle cx="21" cy="12" r="1.5" /><circle cx="12" cy="21" r="1.5" /><circle cx="3" cy="12" r="1.5" /></>}
    {page === 'about' && <><circle cx="12" cy="7" r="3.5" /><path d="M5 21v-2a7 7 0 0 1 14 0v2" /></>}
    {page === 'contact' && <><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></>}
  </svg>
}

export default function MobileNavigation() {
  const pathname = usePathname()
  const current = tabs.find(tab => tab.href === '/' ? pathname === '/' : pathname === tab.href || pathname.startsWith(`${tab.href}/`))
  const theme = current ?? tabs[3]

  return <nav
    aria-label="Primary"
    data-mobile-navigation
    data-page-theme={theme.theme}
    className={s.navigation}
    style={{ '--nav-tint': theme.tint, '--nav-ink': theme.ink } as CSSProperties}
  >
    <div className={s.glass}>
      {tabs.map(tab => <Link
        key={tab.href}
        href={tab.href}
        aria-current={current?.href === tab.href ? 'page' : undefined}
        className={s.tab}
      >
        <Icon page={tab.theme} />
        <span>{tab.label}</span>
      </Link>)}
    </div>
  </nav>
}
