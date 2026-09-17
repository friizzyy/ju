import Image from 'next/image'
import s from './AboutStory.module.css'

export default function AboutStory() {
  return <section id="about-julius" className={s.story} aria-labelledby="story-title">
    <header className={s.heading}>
      <p className={s.eyebrow}>A little about me</p>
      <h2 id="story-title">I’m Julius.</h2>
    </header>

    <figure className={s.portrait}>
      <div className={s.frame}>
        <div className={s.imageWindow}>
          <Image src="/images/about/julius-williams.png" alt="Julius Williams" width={864} height={1080} sizes="(max-width: 760px) 290px, (max-width: 900px) 330px, 340px" quality={85} />
        </div>
      </div>
      <figcaption><span>Julius Williams</span><span>Designer &amp; developer</span></figcaption>
    </figure>

    <div className={s.body}>
      <p className={s.lead}>From the first idea<br />to the finished build.</p>
      <p className={s.bio}>I start by understanding your business, what makes it different and where it could work better. Then I bring design and engineering together to build what it needs: websites, commerce platforms, internal tools and AI agents, with care for the details people actually use.</p>
      <aside className={s.personal} aria-labelledby="beyond-the-build">
        <h3 id="beyond-the-build">Beyond the build</h3>
        <p>I build personalized AI agents for different parts of my life, shaped around my routines, interests and goals. Away from the screen, I’m into photography and travel.</p>
      </aside>
      <p className={s.location}><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" stroke="currentColor" strokeWidth="1.4"/><circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.4"/></svg><span>San Francisco / Grass Valley, California</span></p>
    </div>
  </section>
}
