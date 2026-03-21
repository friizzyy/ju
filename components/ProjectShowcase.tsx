'use client'

import { useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import type { Project } from '@/data/projects'

interface Props {
  projects: Project[]
}

export default function ProjectShowcase({ projects }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [imgPos, setImgPos] = useState({ x: 0, y: 0 })
  const targetPos = useRef({ x: 0, y: 0 })
  const currentPos = useRef({ x: 0, y: 0 })
  const raf = useRef(0)

  const animate = useCallback(() => {
    currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.1
    currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.1
    setImgPos({ x: currentPos.current.x, y: currentPos.current.y })
    raf.current = requestAnimationFrame(animate)
  }, [])

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    targetPos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }, [])

  const onEnter = useCallback((i: number, e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      targetPos.current = { x, y }
      currentPos.current = { x, y }
      setImgPos({ x, y })
    }
    setActiveIndex(i)
    cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(animate)
  }, [animate])

  const onLeave = useCallback(() => {
    setActiveIndex(null)
    cancelAnimationFrame(raf.current)
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseMove={onMouseMove}
    >
      {/* Floating image that follows cursor */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute pointer-events-none z-20 hidden lg:block"
            style={{
              left: imgPos.x,
              top: imgPos.y,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="w-[360px] h-[220px] rounded-xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/40">
              <Image
                src={projects[activeIndex].image}
                alt={projects[activeIndex].title}
                width={720}
                height={440}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project list */}
      <div className="divide-y divide-white/[0.04]">
        {projects.map((project, i) => (
          <a
            key={project.slug}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="project"
            data-cursor-label="View"
            className="group relative block py-10 sm:py-14 min-h-[64px] border-l-2 border-transparent hover:border-accent/20 pl-0 hover:pl-4 transition-all duration-500"
            onMouseEnter={(e) => onEnter(i, e)}
            onMouseLeave={onLeave}
          >
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-6 sm:gap-10 flex-1 min-w-0">
                <span className="font-mono text-[11px] text-muted/20 tracking-wider w-8 shrink-0">
                  0{i + 1}
                </span>
                <div className="min-w-0">
                  <h3 className="text-lg sm:text-3xl lg:text-4xl font-bold tracking-[-0.03em] text-foreground/60 group-hover:text-foreground transition-colors duration-500 truncate">
                    {project.title}
                  </h3>
                  <p className="text-xs text-muted/55 mt-1 max-w-sm leading-relaxed hidden lg:block">{project.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 shrink-0">
                <span className="hidden sm:block font-mono text-[10px] tracking-[0.15em] uppercase text-muted/60 group-hover:text-muted/75 transition-colors">
                  {project.tag}
                </span>

                {/* Mobile image thumbnail */}
                <div className="block lg:hidden w-16 h-10 rounded-md overflow-hidden border border-white/[0.06] shrink-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={128}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>

                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted/15 group-hover:text-accent group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-500"
                >
                  <path d="M4 12L12 4M12 4H5M12 4v7" />
                </svg>
              </div>
            </div>

            {/* Hover line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-accent/0 group-hover:bg-accent/20 transition-colors duration-500" />
          </a>
        ))}
      </div>
    </div>
  )
}
