'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import styles from './Navigation.module.css'
import MobileNavigation from './MobileNavigation'

const links = [
  { href: '/studio', label: 'Studio', activeColor: '#c4aeff' },
  { href: '/systems', label: 'Systems', activeColor: '#b7beff' },
  { href: '/about', label: 'About', activeColor: '#f0f6fc' },
  { href: '/contact', label: 'Contact', activeColor: '#cbc5e5' },
]

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
      <MobileNavigation />
    </>
  )
}
