'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import Image from 'next/image'
import { studioProjects, type StudioProject } from '@/data/studio-work'
import s from './StudioWork.module.css'

const number = (index: number) => String(index + 1).padStart(2, '0')

function ProjectImage({ project }: { project: StudioProject }) {
  const [failed, setFailed] = useState(false)
  const cover = project.presentation === 'cover'
  return (
    <div className={`${s.artwork} ${cover ? s.cover : ''} ${project.slug === 'askarr-healthcare' ? s.askarr : ''}`}>
      {project.image && !failed && (
        <Image
          src={`/images/studio-work/${project.image}.webp`}
          alt={project.imageAlt || project.title}
          fill
          sizes="(max-width: 1023px) calc(100vw - 48px), (max-width: 1208px) 63vw, 748px"
          className={cover ? s.coverImage : s.websiteImage}
          onError={() => setFailed(true)}
        />
      )}
      {(project.coverName || failed) && (
        <div className={`${s.coverType} ${project.slug === 'rancho-machete' ? s.ranchType : ''}`}>
          <span>{project.category}</span>
          <strong>{project.coverName || project.title}</strong>
          {project.slug === 'askarr-healthcare' && <span>Healthcare consulting</span>}
        </div>
      )}
    </div>
  )
}

export default function StudioWork() {
  const [selected, setSelected] = useState(0)
  const projectList = useRef<HTMLDivElement>(null)
  const gesture = useRef<{ x: number; y: number; id: number } | null>(null)
  const project = studioProjects[selected]

  useEffect(() => {
    const compact = matchMedia('(max-width: 1023px)')
    function keepSelectionVisible() {
      const list = projectList.current
      const button = list?.children[selected] as HTMLElement | undefined
      if (!compact.matches || !list || !button) return
      const listBounds = list.getBoundingClientRect()
      const buttonBounds = button.getBoundingClientRect()
      const offset = buttonBounds.left < listBounds.left + 4
        ? buttonBounds.left - listBounds.left - 4
        : buttonBounds.right > listBounds.right - 24
          ? buttonBounds.right - listBounds.right + 24
          : 0
      if (offset) list.scrollTo({ left: list.scrollLeft + offset, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
    }
    keepSelectionVisible()
    const list = projectList.current
    let width = list?.clientWidth
    const resize = new ResizeObserver(() => {
      if (list?.clientWidth === width) return
      width = list?.clientWidth
      keepSelectionVisible()
    })
    if (list) resize.observe(list)
    compact.addEventListener('change', keepSelectionVisible)
    return () => { compact.removeEventListener('change', keepSelectionVisible); resize.disconnect() }
  }, [selected])

  function moveProject(direction: number) {
    setSelected(current => (current + direction + studioProjects.length) % studioProjects.length)
  }

  return (
    <section id="portfolio" className={s.section} aria-labelledby="studio-work-title">
      <div className={s.inner}>
        <header className={s.intro}>
          <div className={s.heading}>
            <span className={s.eyebrow}>SELECTED WEBSITES</span>
            <h2 id="studio-work-title">The work<span>.</span><sup>{String(studioProjects.length).padStart(2, '0')}</sup></h2>
          </div>
          <div className={s.mobilePaging}>
            <button type="button" onClick={() => moveProject(-1)} aria-label="Previous project">←</button>
            <button type="button" onClick={() => moveProject(1)} aria-label="Next project">→</button>
          </div>
        </header>

        <div className={s.gallery}>
          <div className={s.index} role="group" aria-label="Choose a project">
            <p className={s.indexLabel}>EXPLORE THE COLLECTION <span aria-hidden="true">↘</span></p>
            <div className={s.projectList} ref={projectList}>
              {studioProjects.map((item, index) => (
                <button
                  key={item.slug}
                  type="button"
                  aria-label={item.title}
                  aria-pressed={selected === index}
                  aria-controls="studio-work-preview"
                  className={s.projectButton}
                  onClick={() => setSelected(index)}
                >
                  <span className={s.projectThumbnail} aria-hidden="true">
                    <span className={s.thumbnailFallback}>{item.coverName || item.title}</span>
                    {item.image && <Image src={`/images/studio-work/${item.image}.webp`} alt="" fill sizes="140px" onError={event => { event.currentTarget.style.display = 'none'; event.currentTarget.parentElement?.setAttribute('data-image-failed', 'true') }} />}
                  </span>
                  <span className={s.projectNumber} aria-hidden="true">{number(index)}</span>
                  <span className={s.projectName}>{item.title}</span>
                  <span className={s.selectedMark} aria-hidden="true">↗</span>
                </button>
              ))}
            </div>
          </div>

          <div id="studio-work-preview" className={s.preview} style={{ '--project-accent': project.accent } as CSSProperties}>
            <p className={s.previewIntro}>Different businesses. Their own kind of presence.</p>
            <div className={s.frame}
              onPointerDown={event => {
                if (event.pointerType === 'mouse' || !event.isPrimary || !matchMedia('(max-width: 1023px)').matches) return
                gesture.current = { x: event.clientX, y: event.clientY, id: event.pointerId }
                event.currentTarget.setPointerCapture(event.pointerId)
              }}
              onPointerUp={event => {
                const start = gesture.current
                gesture.current = null
                if (!start || start.id !== event.pointerId) return
                const x = event.clientX - start.x, y = event.clientY - start.y
                if (Math.abs(x) > 42 && Math.abs(x) > Math.abs(y) * 1.4) moveProject(x < 0 ? 1 : -1)
              }}
              onPointerCancel={() => { gesture.current = null }}
              onLostPointerCapture={() => { gesture.current = null }}
            >
              <div className={s.frameBar} aria-hidden="true">
                <span className={s.frameDots}><i /><i /><i /></span>
                <span>{project.presentation === 'website' ? 'WEBSITE DESIGN' : 'PROJECT IDENTITY'}</span>
                <span>{number(selected)} / {String(studioProjects.length).padStart(2, '0')}</span>
              </div>
              <div className={s.imageTransition} key={project.slug}>
                <ProjectImage project={project} />
              </div>
            </div>
            <div className={s.caption}>
              <div className={s.projectDetails} aria-live="polite" aria-atomic="true">
                <div className={s.projectHeading}>
                  <div>
                    <p className={s.category}>
                      <span>{project.category}</span>
                      {project.location && <span className={s.location}>{project.location}</span>}
                    </p>
                    <h3>{project.title}</h3>
                  </div>
                  {project.url && (
                    <a className={s.visit} href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.title} website (opens in a new tab)`}>
                      Visit website <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
                <p className={s.description}>{project.description}</p>
              </div>
            </div>
            <div className={s.galleryFooter}>
              <span>DESIGNED & BUILT BY JU.</span>
              <div className={s.paging}>
                <button type="button" onClick={() => moveProject(-1)} aria-label="Previous project">←</button>
                <span aria-hidden="true">{number(selected)}<span> / {String(studioProjects.length).padStart(2, '0')}</span></span>
                <button type="button" onClick={() => moveProject(1)} aria-label="Next project">→</button>
              </div>
            </div>
          </div>
        </div>

        <noscript>
          <div className={s.noScript}>
            <p>Explore the project websites:</p>
            {studioProjects.map((item) => item.url ? <a key={item.slug} href={item.url}>{item.title} ↗</a> : <span key={item.slug}>{item.title}</span>)}
          </div>
        </noscript>
        <div className={s.outro} aria-hidden="true"><span /><i /><span /></div>
      </div>
    </section>
  )
}
