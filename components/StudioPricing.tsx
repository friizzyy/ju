import type { PricingPlan } from './PricingCards'
import styles from './StudioPricing.module.css'

function ScopeDrawing({ index }: { index: number }) {
  return <svg className={styles.scopeDrawing} viewBox="0 0 80 52" fill="none" aria-hidden="true">
    {index === 0 ? <>
      <rect x="13" y="5" width="54" height="42" rx="5" /><path d="M13 15h54M21 24h26M21 29h19" /><rect className={styles.drawingFill} x="21" y="35" width="17" height="5" rx="2.5" />
    </> : index === 1 ? <>
      <rect className={styles.drawingBack} x="29" y="3" width="40" height="34" rx="4" /><rect className={styles.drawingMiddle} x="20" y="10" width="40" height="34" rx="4" /><rect x="11" y="17" width="40" height="32" rx="4" /><path d="M11 25h40M18 32h22M18 37h16" />
    </> : index === 2 ? <>
      <rect x="5" y="7" width="53" height="36" rx="4" /><path d="M5 16h53M13 25h23M13 30h15" /><rect className={styles.drawingSolid} x="50" y="20" width="23" height="30" rx="4" /><path d="M57 26h9M57 32h9M57 37h6" />
    </> : <>
      <rect x="8" y="5" width="64" height="42" rx="5" /><path d="M8 15h64M20 23h22" /><rect className={styles.drawingFill} x="19" y="29" width="11" height="10" rx="2" /><rect x="35" y="29" width="11" height="10" rx="2" /><rect x="51" y="29" width="11" height="10" rx="2" />
    </>}
  </svg>
}

export default function StudioPricing({ plans }: { plans: PricingPlan[] }) {
  return (
    <section id="pricing" className={styles.section} aria-labelledby="studio-pricing-title">
      <div className={styles.inner}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>THE INVESTMENT</p>
          <h2 id="studio-pricing-title"><span className={styles.phrase}>Flat rate<span className={styles.dot}>.</span></span>{' '}<span className={styles.phrase}>No surprises<span className={styles.dot}>.</span></span></h2>
          <p className={styles.lead}>Choose the scope that fits your business. The same care goes into every build.</p>
        </header>

        <div className={styles.cards}>
          {plans.map((plan, index) => (
            <article key={plan.title} className={`${styles.card} ${plan.featured ? styles.featured : ''}`} aria-labelledby={`studio-plan-${index}`}>
              <div className={styles.labelRow}>
                <span className={plan.featured ? styles.badge : styles.label}>{plan.featured && <i aria-hidden="true" />}{plan.label}</span>
                <ScopeDrawing index={index} />
              </div>
              <p className={styles.price}>{plan.price}<span>{plan.period}</span></p>
              <h3 id={`studio-plan-${index}`} className={styles.planName}>{plan.title}</h3>
              <p className={styles.description}>{plan.description}</p>
              <ul className={styles.features} aria-label={`${plan.title} includes`}>
                {plan.features.map(feature => (
                  <li key={feature}>
                    <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m3 8 3 3 7-7" /></svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a href={plan.ctaHref} target="_blank" rel="noopener noreferrer" className={styles.cta} aria-label={`${plan.cta} with ${plan.title}`}>
                {plan.cta}<span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>

        <div className={styles.nextSection}>
          <p className={styles.included}>Every package includes <span>hosting setup</span>, <span>responsive design</span>, and <span>hand-off documentation</span>.</p>
          <a className={styles.workLink} href="#portfolio">See the work<span aria-hidden="true">↓</span></a>
        </div>
      </div>
    </section>
  )
}
