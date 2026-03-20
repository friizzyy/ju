'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const links = [
  { href: '/studio', label: 'Studio' },
  { href: '/systems', label: 'Systems' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

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
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-0.5 px-1.5 py-1 rounded-full transition-all duration-500 ${
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
            <span className={isActive ? 'text-foreground' : 'text-muted/70 group-hover:text-foreground'}>
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
  )
}
