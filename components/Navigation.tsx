'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const links = [
  { href: '/studio', label: 'Studio', activeColor: 'text-studio' },
  { href: '/systems', label: 'Systems', activeColor: 'text-zeus' },
  { href: '/about', label: 'About', activeColor: 'text-foreground' },
  { href: '/contact', label: 'Contact', activeColor: 'text-foreground' },
]

const MobileNav = () => {
  const pathname = usePathname()

  const tabs = [
    { href: '/', label: 'Home', accent: null },
    { href: '/studio', label: 'Studio', accent: '#8B5CF6' },
    { href: '/systems', label: 'Systems', accent: '#6366F1' },
    { href: '/about', label: 'About', accent: null },
    { href: '/contact', label: 'Contact', accent: '#00D4FF' },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>

      {/* Outer glow — very subtle, bleeds upward */}
      <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(8,11,16,0.6) 0%, transparent 100%)' }} />

      {/* Glass pill */}
      <div className="relative mx-4 mb-4">
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(16, 20, 28, 0.72)',
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            border: '1px solid rgba(255,255,255,0.09)',
            boxShadow: '0 0 0 0.5px rgba(255,255,255,0.04) inset, 0 -1px 0 rgba(255,255,255,0.05) inset, 0 16px 48px rgba(0,0,0,0.5)',
          }}
        >
          {/* Top highlight line — the Apple glass signature */}
          <div className="absolute top-0 left-6 right-6 h-px"
            style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.12), transparent)' }} />

          <div className="flex items-center justify-around px-2 py-2.5">
            {tabs.map(({ href, label, accent }) => {
              const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
              const activeColor = accent || 'rgba(255,255,255,0.85)'

              return (
                <Link key={href} href={href}
                  className="relative flex flex-col items-center justify-center gap-1.5 px-3 py-1.5 min-w-[48px] rounded-xl transition-all duration-300 active:scale-95"
                >
                  {/* Active background pill */}
                  {active && (
                    <motion.div
                      layoutId="tab-active-bg"
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: accent
                          ? `rgba(${parseInt(accent.slice(1,3),16)},${parseInt(accent.slice(3,5),16)},${parseInt(accent.slice(5,7),16)}, 0.12)`
                          : 'rgba(255,255,255,0.07)',
                        border: accent
                          ? `1px solid rgba(${parseInt(accent.slice(1,3),16)},${parseInt(accent.slice(3,5),16)},${parseInt(accent.slice(5,7),16)}, 0.18)`
                          : '1px solid rgba(255,255,255,0.08)',
                      }}
                      transition={{ type: 'spring', stiffness: 500, damping: 42 }}
                    />
                  )}

                  {/* SVG icon */}
                  <div className="relative z-10 transition-all duration-300"
                    style={{ color: active ? activeColor : 'rgba(255,255,255,0.28)' }}>
                    {href === '/' && (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M3 9L10 3l7 6v8.5a.5.5 0 01-.5.5h-4.25V13H7.75v5H3.5a.5.5 0 01-.5-.5V9z"
                          stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round"
                          fill={active ? 'currentColor' : 'none'} fillOpacity="0.15"/>
                      </svg>
                    )}
                    {href === '/studio' && (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <rect x="2" y="3" width="16" height="11" rx="2"
                          stroke="currentColor" strokeWidth="1.35"
                          fill={active ? 'currentColor' : 'none'} fillOpacity="0.12"/>
                        <path d="M7 17h6M10 14v3" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round"/>
                      </svg>
                    )}
                    {href === '/systems' && (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <circle cx="10" cy="4" r="2" stroke="currentColor" strokeWidth="1.35"
                          fill={active ? 'currentColor' : 'none'} fillOpacity="0.2"/>
                        <circle cx="4" cy="15.5" r="2" stroke="currentColor" strokeWidth="1.35"
                          fill={active ? 'currentColor' : 'none'} fillOpacity="0.2"/>
                        <circle cx="16" cy="15.5" r="2" stroke="currentColor" strokeWidth="1.35"
                          fill={active ? 'currentColor' : 'none'} fillOpacity="0.2"/>
                        <path d="M10 6L4 13.5M10 6L16 13.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.45"/>
                      </svg>
                    )}
                    {href === '/about' && (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.35"
                          fill={active ? 'currentColor' : 'none'} fillOpacity="0.15"/>
                        <path d="M4 18c0-3.314 2.686-6 6-6s6 2.686 6 6"
                          stroke="currentColor" strokeWidth="1.35" strokeLinecap="round"/>
                      </svg>
                    )}
                    {href === '/contact' && (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <rect x="2.5" y="4.5" width="15" height="11" rx="1.5"
                          stroke="currentColor" strokeWidth="1.35"
                          fill={active ? 'currentColor' : 'none'} fillOpacity="0.12"/>
                        <path d="M2.5 6.5l7.5 5 7.5-5"
                          stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>

                  {/* Label */}
                  <span className="relative z-10 text-[9px] font-medium tracking-wide transition-all duration-300"
                    style={{
                      color: active ? activeColor : 'rgba(255,255,255,0.2)',
                      fontFamily: 'var(--font-geist-sans, system-ui)',
                    }}>
                    {label}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
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
