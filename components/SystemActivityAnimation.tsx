"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"

const ACTIVITY_LOGS = [
  { agent: "Hermes", color: "#00D4FF", action: "scout", message: "3 new leads found · San Francisco, CA", time: "now" },
  { agent: "Athena", color: "#38BDF8", action: "enrich", message: "Contact found · mike@snroofing.com", time: "12s ago" },
  { agent: "Zeus", color: "#FFD700", action: "strategy", message: "Review angle selected · 47 reviews, 4.8★", time: "28s ago" },
  { agent: "Ares", color: "#8B5CF6", action: "draft", message: "Cold email queued for approval · 112 words", time: "41s ago" },
  { agent: "Hephaestus", color: "#F59E0B", action: "audit", message: "Site scored 34/100 · Missing mobile, no SEO", time: "1m ago" },
  { agent: "Apollo", color: "#6366F1", action: "proposal", message: "Proposal ready · $1,500 Multi-Page tier", time: "2m ago" },
  { agent: "Prometheus", color: "#10B981", action: "onboard", message: "Client assets received · project folder created", time: "5m ago" },
  { agent: "Dionysus", color: "#EC4899", action: "pipeline", message: "16 leads in outreach · 0 replies · following up", time: "8m ago" },
  { agent: "Iris", color: "#A78BFA", action: "content", message: "Case study drafted · Rancho Machete project", time: "12m ago" },
]

const STATUS_ITEMS = [
  { label: "AGENTS", value: "9/9", color: "#10B981" },
  { label: "UPTIME", value: "24/7", color: "#00D4FF" },
  { label: "PIPELINE", value: "LIVE", color: "#FFD700" },
]

export default function SystemActivityAnimation() {
  const [visibleLogs, setVisibleLogs] = useState<typeof ACTIVITY_LOGS>([])
  const [syncSeconds, setSyncSeconds] = useState(0)
  const indexRef = useRef(0)

  useEffect(() => {
    let cycleInterval: ReturnType<typeof setInterval>

    // Show first 3 logs staggered
    const initialTimers = [0, 1, 2].map((i) =>
      setTimeout(() => {
        setVisibleLogs((prev) => [ACTIVITY_LOGS[i], ...prev])
        indexRef.current = i + 1
      }, i * 300)
    )

    // Then cycle every 1800ms after initial logs
    const startCycling = setTimeout(() => {
      cycleInterval = setInterval(() => {
        const nextIndex = indexRef.current % ACTIVITY_LOGS.length
        setVisibleLogs((prev) => {
          const next = [ACTIVITY_LOGS[nextIndex], ...prev]
          return next.slice(0, 5)
        })
        indexRef.current += 1
      }, 1800)
    }, 3 * 300 + 1800)

    // Sync counter
    const syncInterval = setInterval(() => {
      setSyncSeconds((s) => s + 1)
    }, 1000)

    return () => {
      initialTimers.forEach(clearTimeout)
      clearTimeout(startCycling)
      clearInterval(cycleInterval)
      clearInterval(syncInterval)
    }
  }, [])

  return (
    <div
      className="rounded-2xl overflow-hidden border border-white/[0.06]"
      style={{
        background: "rgba(8,11,16,0.97)",
        boxShadow: "0 40px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)",
      }}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{
          background: "rgba(13,17,23,0.95)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Window dots */}
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }} />
        </div>

        {/* Title */}
        <span className="font-mono text-[11px] text-white/20 hidden sm:block">
          friz@ju.systems ~ activity
        </span>

        {/* Status pills */}
        <div className="flex items-center gap-3">
          {STATUS_ITEMS.map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: item.color }}
              />
              <span className="font-mono text-[9px] text-white/30 tracking-wider">
                {item.label}
              </span>
              <span className="font-mono text-[9px] text-white/50">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Log area */}
      <div
        className="relative px-4 py-4 h-[240px] sm:h-[320px] overflow-hidden"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.01) 1px, rgba(255,255,255,0.01) 2px)",
          backgroundSize: "100% 2px",
        }}
      >
        <AnimatePresence initial={false}>
          {visibleLogs.map((log, i) => (
            <motion.div
              key={`${log.agent}-${indexRef.current - visibleLogs.length + i}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex items-baseline gap-3 py-2.5 border-b border-white/[0.03]"
            >
              {/* Timestamp */}
              <span className="font-mono text-[10px] text-white/20 shrink-0 w-14 text-right hidden sm:block">
                {log.time}
              </span>

              {/* Agent dot + name */}
              <div className="flex items-center gap-1.5 shrink-0">
                <div
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: log.color }}
                />
                <span
                  className="font-mono text-[11px] font-medium"
                  style={{ color: log.color }}
                >
                  {log.agent}
                </span>
              </div>

              {/* Action tag */}
              <span className="font-mono text-[10px] text-white/15 shrink-0">
                [{log.action}]
              </span>

              {/* Message */}
              <span className="text-[12px] text-white/55 truncate">
                {log.message}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Blinking cursor */}
        <div className="mt-4 font-mono text-[12px] text-white/20 flex items-center gap-1">
          <span>&gt;</span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
          >
            _
          </motion.span>
        </div>
      </div>

      {/* Bottom status bar */}
      <div
        className="px-4 py-2.5 flex items-center gap-2"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        <motion.div
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: "#10B981" }}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="font-mono text-[10px] text-white/15">
          system operational · 9 agents active · last sync {syncSeconds}s ago
        </span>
      </div>
    </div>
  )
}
