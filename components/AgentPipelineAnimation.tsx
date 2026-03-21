"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

const AGENTS = [
  { name: 'Zeus', domain: 'Command', color: '#6366F1' },
  { name: 'Hermes', domain: 'Outreach', color: '#00D4FF' },
  { name: 'Athena', domain: 'Intelligence', color: '#38BDF8' },
  { name: 'Ares', domain: 'Execution', color: '#06B6D4' },
  { name: 'Apollo', domain: 'Creative', color: '#67E8F9' },
]

const PIPELINE_EVENTS = [
  { agent: 'Hermes', action: 'Lead discovered', detail: 'Sierra Nevada Roofing, no website', status: 'complete' },
  { agent: 'Athena', action: 'Contact enriched', detail: 'Found owner: Mike Torres, mike@snroofing.com', status: 'complete' },
  { agent: 'Zeus', action: 'Strategy updated', detail: 'Review angle selected. 47 reviews, 4.8★', status: 'complete' },
  { agent: 'Ares', action: 'Email drafted', detail: 'Queued for approval. 118 words', status: 'pending' },
  { agent: 'Apollo', action: 'Proposal ready', detail: 'Waiting on reply to trigger', status: 'idle' },
]

const STATUS_COLORS = {
  complete: '#22C55E',
  pending: '#F59E0B',
  idle: 'rgba(255,255,255,0.15)',
}

export default function AgentPipelineAnimation() {
  const [activeEvent, setActiveEvent] = useState(0)
  const [visibleEvents, setVisibleEvents] = useState<number[]>([])

  useEffect(() => {
    // Reveal events one by one, then hold
    PIPELINE_EVENTS.forEach((_, i) => {
      setTimeout(() => {
        setVisibleEvents(prev => [...prev, i])
        setActiveEvent(i)
      }, i * 1200)
    })
  }, [])

  return (
    <div className="relative w-full h-full min-h-[500px] flex items-center justify-center overflow-hidden select-none">

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[100px] opacity-10" style={{ background: '#6366F1' }} />
      </div>

      <div className="relative w-full max-w-[420px]">

        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-xl border border-white/[0.08] overflow-hidden"
          style={{ background: 'rgba(8,11,16,0.97)', boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)' }}
        >
          {/* Terminal header */}
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/[0.05]">
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="ml-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1] animate-pulse" />
              <span className="font-mono text-[10px] text-white/25 tracking-wider">JU. Systems: Live Pipeline</span>
            </div>
          </div>

          {/* Pipeline events */}
          <div className="p-4 space-y-1 min-h-[280px]">
            <AnimatePresence>
              {PIPELINE_EVENTS.map((event, i) => (
                visibleEvents.includes(i) && (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12, height: 0 }}
                    animate={{ opacity: 1, x: 0, height: 'auto' }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-start gap-3 py-2 px-2 rounded-lg"
                    style={{ background: activeEvent === i ? 'rgba(99,102,241,0.04)' : 'transparent' }}
                  >
                    {/* Status dot */}
                    <div className="mt-[3px] flex-shrink-0">
                      <motion.div
                        className="w-2 h-2 rounded-full"
                        style={{ background: STATUS_COLORS[event.status as keyof typeof STATUS_COLORS] }}
                        animate={event.status === 'pending' ? { scale: [1, 1.4, 1], opacity: [1, 0.6, 1] } : {}}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-mono text-[10px] tracking-wider" style={{ color: AGENTS.find(a => a.name === event.agent)?.color || 'white' }}>
                          {event.agent}
                        </span>
                        <span className="text-[11px] text-white/60 font-medium">{event.action}</span>
                      </div>
                      <p className="font-mono text-[9px] text-white/25 truncate">{event.detail}</p>
                    </div>

                    {/* Timestamp */}
                    <span className="font-mono text-[9px] text-white/15 flex-shrink-0 mt-0.5">just now</span>
                  </motion.div>
                )
              ))}
            </AnimatePresence>

            {/* Blinking cursor */}
            <motion.div
              className="flex items-center gap-2 px-2 py-1"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <span className="font-mono text-[11px] text-[#6366F1]/50">▋</span>
            </motion.div>
          </div>

          {/* Footer stats bar */}
          <div className="px-4 py-2.5 border-t border-white/[0.04] flex items-center justify-between">
            <div className="flex items-center gap-4">
              {AGENTS.slice(0, 3).map(agent => (
                <div key={agent.name} className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: agent.color }} />
                  <span className="font-mono text-[9px] text-white/20">{agent.name}</span>
                </div>
              ))}
            </div>
            <span className="font-mono text-[9px] text-white/15">9 agents active</span>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
