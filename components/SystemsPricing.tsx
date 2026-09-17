import type { PricingPlan } from './PricingCards'
import MobileCarousel from './MobileCarousel'
import Disclosure from './Disclosure'
import s from './SystemsPricing.module.css'

function ScopeDrawing({ index }: { index: number }) {
  return <svg className={s.scopeDrawing} viewBox="0 0 80 52" fill="none" aria-hidden="true">
    {index === 0 ? <>
      <rect x="15" y="5" width="42" height="42" rx="5" /><path d="M24 16h23M24 23h16M24 30h10" />
      <circle cx="54" cy="32" r="10" /><path d="m61 39 8 8" />
    </> : index === 1 ? <>
      <rect x="28" y="4" width="24" height="14" rx="4" /><path d="M40 18v10M14 34v-6h52v6M40 28v6" />
      <rect x="5" y="34" width="18" height="14" rx="4" /><rect x="31" y="34" width="18" height="14" rx="4" /><rect x="57" y="34" width="18" height="14" rx="4" />
    </> : <>
      <path d="M19 18a23 23 0 0 1 41-2M61 34a23 23 0 0 1-41 2M60 7v10h-10M20 45V35h10" />
      <rect x="29" y="16" width="22" height="20" rx="5" /><path d="M35 26h10M40 21v10" />
    </>}
  </svg>
}

function Features({ plan }: { plan: PricingPlan }) {
  return <ul className={s.features} aria-label={`${plan.title} includes`}>
    {plan.features.map(feature => <li key={feature}><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m3 8 3 3 7-7" /></svg><span>{feature}</span></li>)}
  </ul>
}

export default function SystemsPricing({ plans }: { plans: PricingPlan[] }) {
  return <section id="packages" className={s.section} aria-labelledby="systems-pricing-title">
    <div className={s.inner}>
      <header className={s.intro}>
        <p className={s.eyebrow}>THE INVESTMENT</p>
        <h2 id="systems-pricing-title">Start with clarity<span>.</span></h2>
        <p className={s.lead}>A focused audit, a deeper roadmap, or an ongoing build partnership.</p>
      </header>
      <div className={s.cards}>
        <MobileCarousel label="Systems packages" desktopGrid desktopColumns={3}>
          {plans.map((plan, index) => <article key={plan.title} className={`${s.card} ${plan.featured ? s.featured : ''}`} aria-labelledby={`systems-plan-${index}`}>
            <div className={s.labelRow}><span className={plan.featured ? s.badge : s.label}>{plan.featured && <i aria-hidden="true" />}{plan.label}</span><ScopeDrawing index={index} /></div>
            <p className={s.price}>{plan.price}<span>{plan.period}</span></p>
            <h3 id={`systems-plan-${index}`} className={s.planName}>{plan.title}</h3>
            <p className={s.description}>{plan.description}</p>
            <div className={s.desktopFeatures}><Features plan={plan} /></div>
            <Disclosure label="What's included" className={s.mobileFeatures}><Features plan={plan} /></Disclosure>
            <noscript><div className={s.mobileFallback}><Features plan={plan} /></div></noscript>
            <a href={plan.ctaHref} target="_blank" rel="noopener noreferrer" className={s.cta} aria-label={`${plan.cta} about ${plan.title}`}>{plan.cta}<span aria-hidden="true">↗</span></a>
          </article>)}
        </MobileCarousel>
      </div>
      <p className={s.note}>Audits give you the plan. The ongoing retainer covers building and maintaining your systems.</p>
    </div>
  </section>
}
