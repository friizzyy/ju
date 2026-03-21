'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const links = [
  { href: '/studio', label: 'Studio', activeColor: 'text-studio' },
  { href: '/systems', label: 'Systems', activeColor: 'text-zeus' },
  { href: '/about', label: 'About', activeColor: 'text-foreground' },
  { href: '/contact', label: 'Contact', activeColor: 'text-foreground' },
]

const MobileNav = () => {
  const pathname = usePathname()
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden">
      <div
        className="flex items-center justify-around px-2 pt-2 pb-safe"
        style={{
          background: 'rgba(8,11,16,0.92)',
          backdropFilter: 'blur(24px)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
        }}
      >
        {[
          { href: '/', label: 'Home', icon: (active: boolean) => (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 9.5L10 3l7 6.5V17a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                fill={active ? 'currentColor' : 'none'} opacity={active ? 0.9 : 1}
              />
            </svg>
          )},
          { href: '/studio', label: 'Studio', icon: (active: boolean) => (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="2" y="3" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" fill={active ? 'currentColor' : 'none'} opacity={active ? 0.15 : 1}/>
              <rect x="2" y="3" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M7 17h6M10 15v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          )},
          { href: '/systems', label: 'Systems', icon: (active: boolean) => (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="4" r="2" stroke="currentColor" strokeWidth="1.5" fill={active ? 'currentColor' : 'none'}/>
              <circle cx="4" cy="15" r="2" stroke="currentColor" strokeWidth="1.5" fill={active ? 'currentColor' : 'none'}/>
              <circle cx="16" cy="15" r="2" stroke="currentColor" strokeWidth="1.5" fill={active ? 'currentColor' : 'none'}/>
              <path d="M10 6L4 13M10 6L16 13M4 15h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
            </svg>
          )},
          { href: '/about', label: 'About', icon: (active: boolean) => (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" fill={active ? 'currentColor' : 'none'} opacity={active ? 0.2 : 1}/>
              <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M4 17c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          )},
          { href: '/contact', label: 'Contact', icon: (active: boolean) => (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
                stroke="currentColor" strokeWidth="1.5" fill={active ? 'currentColor' : 'none'} opacity={active ? 0.15 : 1}/>
              <path d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M3 7l7 5 7-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          )},
        ].map(({ href, label, icon }) => {
          const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
          const accentColor = href === '/studio' ? '#8B5CF6' : href === '/systems' ? '#6366F1' : href === '/contact' ? '#00D4FF' : 'white'
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-1 min-w-[44px] min-h-[44px] justify-center px-3"
              style={{ color: active ? accentColor : 'rgba(255,255,255,0.35)' }}
            >
              {icon(active)}
              <span className="text-[9px] font-mono tracking-wider uppercase" style={{ opacity: active ? 1 : 0.6 }}>
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default function Navigation() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [lastY, setLastY] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 50)
      setHidden(y > 300 && y > lastY)
      setLastY(y)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [lastY])

  return (
    <>
      {/* Mobile top wordmark */}
      <div className="sm:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-center py-4"
        style={{ background: 'rgba(8,11,16,0.0)' }}>
        <Link href="/" className="text-[15px] font-bold tracking-[-0.02em] text-foreground">JU.</Link>
      </div>

      {/* Desktop pill nav */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`hidden sm:flex fixed top-4 left-1/2 -translate-x-1/2 z-50 items-center gap-0.5 px-1.5 py-1 rounded-full transition-all duration-500 ${
          scrolled
            ? 'bg-background/80 backdrop-blur-2xl border border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
            : 'bg-transparent'
        }`}
      >
        <Link
          href="/"
          className="px-4 py-2 text-[15px] font-bold tracking-[-0.02em] text-foreground hover:text-accent transition-colors duration-300"
        >
          JU.
        </Link>

        <div className={`h-3.5 w-px transition-colors duration-500 ${scrolled ? 'bg-white/[0.08]' : 'bg-white/[0.04]'}`} />

        {links.map(link => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className="relative px-3.5 py-2 text-[13px] transition-colors duration-300 group"
            >
              <span className={isActive ? link.activeColor : 'text-muted/70 group-hover:text-foreground'}>
                {link.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full bg-white/[0.06]"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
            </Link>
          )
        })}
      </motion.nav>

      {/* Mobile bottom tab bar */}
      <MobileNav />
    </>
  )
}
