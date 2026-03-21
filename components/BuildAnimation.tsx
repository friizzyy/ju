"use client"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

const CODE_TOKENS = [
  '<section>', 'font-bold', 'flex items-center',
  'border', 'transition-all', 'grid-cols-3',
  'export default', 'useEffect', 'max-w-6xl',
  'rgba(', 'animate-pulse',
]

export default function BuildAnimation() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 1800),
      setTimeout(() => setPhase(3), 3200),
      setTimeout(() => setPhase(4), 4200),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  const reached = (p: number) => phase >= p

  return (
    <div className="relative w-full h-full min-h-[520px] overflow-hidden select-none">

      {CODE_TOKENS.map((token, i) => (
        <motion.div
          key={token}
          className="absolute font-mono text-[11px] text-[#8B5CF6]/25 whitespace-nowrap pointer-events-none"
          style={{ left: `${5 + (i * 17) % 85}%`, top: `${15 + (i * 23) % 70}%` }}
          animate={{ y: [0, -40, -80], opacity: [0, 0.4, 0] }}
          transition={{ duration: 6 + (i % 4), delay: (i * 0.6) % 8, repeat: Infinity, ease: "easeInOut" }}
        >
          {token}
        </motion.div>
      ))}

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[340px] sm:w-[420px]">

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-xl border border-white/[0.08] overflow-hidden"
            style={{ background: 'rgba(13,17,23,0.95)', boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)' }}
          >
            {/* Browser chrome */}
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/[0.05]">
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="ml-3 flex-1 h-5 rounded-md bg-white/[0.04] border border-white/[0.05]" />

              {/* Status pill: Building → Live */}
              <motion.div
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full ml-2 flex-shrink-0"
                style={{
                  background: reached(4) ? 'rgba(34,197,94,0.10)' : 'rgba(139,92,246,0.10)',
                  border: reached(4) ? '1px solid rgba(34,197,94,0.20)' : '1px solid rgba(139,92,246,0.20)',
                  transition: 'background 0.5s, border 0.5s',
                }}
                animate={reached(4) ? {} : { opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: reached(4) ? '#22C55E' : '#8B5CF6',
                    transition: 'background 0.5s',
                  }}
                />
                <span
                  className="font-mono text-[8px] tracking-widest uppercase"
                  style={{
                    color: reached(4) ? 'rgba(34,197,94,0.7)' : 'rgba(139,92,246,0.7)',
                    transition: 'color 0.5s',
                  }}
                >
                  {reached(4) ? 'Live' : 'Building'}
                </span>
              </motion.div>
            </div>

            <div className="p-5 space-y-3">
              {/* Phase 1: Nav bar */}
              <motion.div
                className="flex items-center justify-between"
                initial={{ opacity: 0 }}
                animate={reached(1) ? { opacity: 1 } : {}}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className="h-3 rounded bg-[#8B5CF6]/40"
                  initial={{ width: 0 }}
                  animate={reached(1) ? { width: 32 } : {}}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
                <div className="flex gap-2">
                  {[1,2,3].map(i => (
                    <motion.div
                      key={i}
                      className="h-2.5 rounded bg-white/10"
                      initial={{ width: 0 }}
                      animate={reached(1) ? { width: 32 } : {}}
                      transition={{ duration: 0.4, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    />
                  ))}
                  <motion.div
                    className="h-6 rounded-full bg-[#8B5CF6]/30 border border-[#8B5CF6]/20"
                    initial={{ width: 0, opacity: 0 }}
                    animate={reached(1) ? { width: 56, opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </motion.div>

              {/* Phase 2: Hero section */}
              <div className="py-4 space-y-2">
                <motion.div
                  className="h-5 rounded bg-white/20"
                  initial={{ width: 0 }}
                  animate={reached(2) ? { width: '75%' } : {}}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.div
                  className="h-5 rounded bg-white/15"
                  initial={{ width: 0 }}
                  animate={reached(2) ? { width: '50%' } : {}}
                  transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.div
                  className="h-4 rounded bg-[#8B5CF6]/50"
                  initial={{ width: 0 }}
                  animate={reached(2) ? { width: '40%' } : {}}
                  transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.div
                  className="h-2.5 rounded bg-white/[0.06] mt-2"
                  initial={{ width: 0 }}
                  animate={reached(2) ? { width: '100%' } : {}}
                  transition={{ duration: 0.5, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.div
                  className="h-2.5 rounded bg-white/[0.06]"
                  initial={{ width: 0 }}
                  animate={reached(2) ? { width: '80%' } : {}}
                  transition={{ duration: 0.5, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                />
                <div className="flex gap-2 mt-3">
                  <motion.div
                    className="w-20 h-7 rounded-full bg-[#8B5CF6]/50 border border-[#8B5CF6]/30"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={reached(2) ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.35, delay: 0.7, type: 'spring', stiffness: 400, damping: 20 }}
                  />
                  <motion.div
                    className="w-20 h-7 rounded-full bg-white/[0.05] border border-white/10"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={reached(2) ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.35, delay: 0.8, type: 'spring', stiffness: 400, damping: 20 }}
                  />
                </div>
              </div>

              {/* Phase 3: Card grid */}
              <div className="grid grid-cols-3 gap-2">
                {[0,1,2].map(i => (
                  <motion.div
                    key={i}
                    className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5 space-y-1.5"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={reached(3) ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="w-full h-8 rounded bg-white/[0.05]" />
                    <div className="w-3/4 h-2 rounded bg-white/10" />
                    <div className="w-1/2 h-2 rounded bg-white/[0.06]" />
                  </motion.div>
                ))}
              </div>

              {/* Phase 4: Footer */}
              <motion.div
                className="flex justify-between items-center pt-1 border-t border-white/[0.04]"
                initial={{ opacity: 0, y: 8 }}
                animate={reached(4) ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="w-6 h-2.5 rounded bg-white/10" />
                <div className="flex gap-2">{[1,2,3].map(i => <div key={i} className="w-8 h-2 rounded bg-white/[0.06]" />)}</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Cursor */}
          <motion.div
            className="absolute w-4 h-4 pointer-events-none"
            animate={{ x: [120, 200, 80, 260, 150], y: [60, 120, 200, 90, 180], opacity: [0, 1, 1, 1, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2l8 12 2-5 5-2L2 2z" fill="white" opacity="0.8" />
            </svg>
          </motion.div>

          {/* Background glow */}
          <div className="absolute -inset-10 -z-10 blur-[60px] opacity-20 rounded-full" style={{ background: 'radial-gradient(ellipse, #8B5CF6 0%, transparent 70%)' }} />

        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(8,11,16,0.8) 100%)' }} />
    </div>
  )
}
