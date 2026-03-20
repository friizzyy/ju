"use client"
import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export interface PricingPlan {
  title: string
  price: string
  period?: string
  label: string
  description: string
  features: string[]
  cta: string
  ctaHref: string
  featured?: boolean
  accentColor: string
  glowRgb: string
}

const AnimatedDigit: React.FC<{ digit: string; index: number }> = ({ digit, index }) => (
  <div className="relative overflow-hidden inline-block min-w-[0.6ch] text-center">
    <AnimatePresence mode="wait">
      <motion.span
        key={digit}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05, ease: [0.4, 0, 0.2, 1] }}
        className="block"
      >
        {digit}
      </motion.span>
    </AnimatePresence>
  </div>
)

const AnimatedPrice: React.FC<{ price: string; color: string }> = ({ price, color }) => (
  <div className="flex items-end text-4xl sm:text-5xl font-bold tracking-[-0.04em] leading-none" style={{ color }}>
    {price.split('').map((char, i) => (
      <AnimatedDigit key={`${price}-${i}`} digit={char} index={i} />
    ))}
  </div>
)

const PricingCards: React.FC<{ plans: PricingPlan[]; columns?: 3 | 4 }> = ({ plans, columns = 3 }) => {
  return (
    <motion.div
      className={`grid grid-cols-1 sm:grid-cols-2 ${columns === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-4 lg:gap-5 items-end`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
    >
      {plans.map((plan) => (
        <motion.div
          key={plan.title}
          variants={{
            hidden: { opacity: 0, y: 28, scale: 0.97 },
            visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
          }}
          className={`relative flex flex-col rounded-2xl border transition-all duration-700 group cursor-default ${plan.featured ? 'lg:-translate-y-4' : ''}`}
          style={{
            background: plan.featured ? `rgba(${plan.glowRgb}, 0.04)` : 'rgba(255,255,255,0.02)',
            borderColor: plan.featured ? `rgba(${plan.glowRgb}, 0.30)` : 'rgba(255,255,255,0.06)',
          }}
          whileHover={{
            borderColor: plan.featured ? `rgba(${plan.glowRgb}, 0.55)` : 'rgba(255,255,255,0.12)',
            y: plan.featured ? -18 : -4,
            transition: { duration: 0.3 }
          }}
        >
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{ background: `radial-gradient(ellipse at top, rgba(${plan.glowRgb}, 0.07) 0%, transparent 65%)` }}
          />

          {plan.featured && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 400, damping: 22 }}
              className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10"
            >
              <div
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-semibold tracking-wider uppercase"
                style={{
                  background: `rgba(${plan.glowRgb}, 0.15)`,
                  border: `1px solid rgba(${plan.glowRgb}, 0.30)`,
                  color: plan.accentColor,
                }}
              >
                <span className="w-1 h-1 rounded-full animate-pulse" style={{ background: plan.accentColor }} />
                Most Popular
              </div>
            </motion.div>
          )}

          <div className="relative flex flex-col h-full p-7">
            <p className="font-mono text-[9px] tracking-[0.28em] uppercase text-white/20 mb-5">{plan.label}</p>

            <div className="mb-1">
              <AnimatedPrice price={plan.price} color={plan.featured ? plan.accentColor : 'rgba(255,255,255,0.9)'} />
            </div>

            {plan.period && (
              <p className="font-mono text-[10px] text-white/20 tracking-widest mb-5">{plan.period}</p>
            )}

            <div className="mb-6">
              <h3 className="text-sm font-bold text-white/80 mb-2 group-hover:text-white transition-colors duration-500">{plan.title}</h3>
              <p className="text-xs text-white/30 leading-relaxed">{plan.description}</p>
            </div>

            <div className="h-px mb-6 transition-colors duration-700" style={{ background: `rgba(${plan.glowRgb}, ${plan.featured ? 0.18 : 0.07})` }} />

            <div className="flex-1 space-y-2.5 mb-7">
              {plan.features.map((feature, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-2.5"
                  initial={{ opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.04, duration: 0.3 }}
                  viewport={{ once: true }}
                >
                  <span className="mt-[5px] w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-500" style={{ background: plan.featured ? plan.accentColor : 'rgba(255,255,255,0.18)' }} />
                  <span className="text-xs text-white/40 leading-relaxed group-hover:text-white/50 transition-colors duration-500">{feature}</span>
                </motion.div>
              ))}
            </div>

            <Link href={plan.ctaHref} target="_blank" rel="noopener noreferrer">
              <motion.div
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-medium transition-all duration-500"
                style={plan.featured ? { background: plan.accentColor, color: '#080B10' } : { border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.40)' }}
                whileHover={plan.featured ? { boxShadow: `0 0 35px rgba(${plan.glowRgb}, 0.35)` } : { borderColor: 'rgba(255,255,255,0.20)', color: 'rgba(255,255,255,0.80)' }}
                whileTap={{ scale: 0.98 }}
              >
                {plan.cta} <span>&rarr;</span>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default PricingCards
