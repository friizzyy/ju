'use client'

import { useState } from 'react'
import type { Agent } from '@/data/agents'

function hoverBorder(domain: string) {
  if (domain === 'Command') return 'rgba(99,102,241,0.2)'
  if (['Intelligence', 'Builder', 'Learning'].includes(domain)) return 'rgba(139,92,246,0.1)'
  return 'rgba(0,212,255,0.1)'
}

export default function AgentCard({ agent }: { agent: Agent }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-background/80 p-4 sm:p-6 transition-all duration-500 group h-full"
      style={{
        backgroundColor: hovered ? 'rgba(255,255,255,0.02)' : undefined,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: hovered ? hoverBorder(agent.domain) : 'transparent',
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="relative">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: agent.color }} />
          <div className="absolute inset-0 rounded-full animate-pulse-glow" style={{ backgroundColor: agent.color, filter: 'blur(4px)' }} />
        </div>
        <span className="font-semibold text-sm text-foreground/90 group-hover:text-foreground transition-colors">{agent.name}</span>
      </div>
      <p className="text-xs text-muted/55 leading-relaxed group-hover:text-muted/70 transition-colors duration-500">{agent.description}</p>
      <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-muted/20 mt-3">{agent.domain}</p>
    </div>
  )
}
