'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import styles from './Navigation.module.css'

const links = [
  { href: '/studio', label: 'Studio', activeColor: '#c4aeff' },
  { href: '/systems', label: 'Systems', activeColor: '#b7beff' },
  { href: '/about', label: 'About', activeColor: '#f0f6fc' },
  { href: '/contact', label: 'Contact', activeColor: '#f0f6fc' },
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
    <nav aria-label="Primary" data-mobile-navigation className="fixed bottom-0 left-0 right-0 z-50 sm:hidden"
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

          <div className="grid grid-cols-5 items-center px-2 py-2.5">
            {tabs.map(({ href, label, accent }) => {
              const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
              const activeColor = accent || 'rgba(255,255,255,0.85)'
              const labelColor = href === '/studio' ? '#c4aeff' : href === '/systems' ? '#b7beff' : '#e7eef5'

              return (
                <Link key={href} href={href}
                  aria-current={active ? 'page' : undefined}
                  className="relative flex min-w-0 min-h-[48px] flex-col items-center justify-center gap-1.5 px-1 py-1.5 rounded-xl transition-all duration-300 active:scale-95"
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
                  <div className="relative z-10 transition-colors duration-200" aria-hidden="true"
                    style={{ color: active ? activeColor : '#91a1b2' }}>
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
                  <span className="relative z-10 text-[10px] font-medium tracking-wide transition-colors duration-200"
                    style={{
                      color: active ? labelColor : '#9baab9',
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
    </nav>
  )
}

export default function Navigation() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const navigation = useRef<HTMLElement>(null)

  useEffect(() => {
    let lastY = window.scrollY
    let idleTimer: number | undefined
    const reveal = () => {
      window.clearTimeout(idleTimer)
      setHidden(false)
    }
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 50)
      setHidden(
        y > 300 && y > lastY &&
        !navigation.current?.contains(document.activeElement)
      )
      lastY = y
      window.clearTimeout(idleTimer)
      idleTimer = window.setTimeout(reveal, 120)
    }
    setScrolled(lastY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('scrollend', reveal)
    return () => {
      window.clearTimeout(idleTimer)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('scrollend', reveal)
    }
  }, [])

  return (
    <>
      {/* Desktop pill nav */}
      <motion.nav
        ref={navigation}
        aria-label="Primary"
        initial={false}
        animate={{ opacity: hidden ? 0 : 1 }}
        style={{ pointerEvents: hidden ? 'none' : 'auto' }}
        onFocusCapture={() => setHidden(false)}
        transition={{ duration: 0.16, ease: 'easeOut' }}
        className={`hidden sm:flex fixed top-4 left-1/2 -translate-x-1/2 z-50 items-center gap-0.5 px-1.5 py-1 rounded-full transition-colors duration-200 ${
          scrolled
            ? 'bg-background/80 backdrop-blur-2xl border border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
            : 'bg-transparent'
        }`}
      >
        <Link
          href="/"
          aria-label="JU. home"
          aria-current={pathname === '/' ? 'page' : undefined}
          className={`${styles.link} px-4 py-2 text-[15px] font-bold tracking-[-0.02em] text-foreground hover:text-accent transition-colors duration-200`}
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
              aria-current={isActive ? 'page' : undefined}
              className={`${styles.link} relative px-3.5 py-2 text-[13px] group`}
            >
              <span className={styles.label} style={isActive ? { color: link.activeColor } : undefined}>
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
