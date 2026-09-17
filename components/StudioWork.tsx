'use client'

import { useState, type CSSProperties } from 'react'
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
  const project = studioProjects[selected]

  return (
    <section id="portfolio" className={s.section} aria-labelledby="studio-work-title">
      <div className={s.inner}>
        <header className={s.intro}>
          <div className={s.heading}>
            <span className={s.eyebrow}>SELECTED WEBSITES</span>
            <h2 id="studio-work-title">The work<span>.</span><sup>{String(studioProjects.length).padStart(2, '0')}</sup></h2>
          </div>
        </header>

        <div className={s.gallery}>
          <div className={s.index} role="group" aria-label="Choose a project">
            <p className={s.indexLabel}>EXPLORE THE COLLECTION <span aria-hidden="true">↘</span></p>
            <div className={s.projectList}>
              {studioProjects.map((item, index) => (
                <button
                  key={item.slug}
                  type="button"
                  aria-pressed={selected === index}
                  aria-controls="studio-work-preview"
                  className={s.projectButton}
                  onClick={() => setSelected(index)}
                >
                  <span className={s.projectNumber} aria-hidden="true">{number(index)}</span>
                  <span className={s.projectName}>{item.title}</span>
                  <span className={s.selectedMark} aria-hidden="true">↗</span>
                </button>
              ))}
            </div>
          </div>

          <div id="studio-work-preview" className={s.preview} style={{ '--project-accent': project.accent } as CSSProperties}>
            <p className={s.previewIntro}>Different businesses. Their own kind of presence.</p>
            <div className={s.frame}>
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
                <button type="button" onClick={() => setSelected(current => (current + studioProjects.length - 1) % studioProjects.length)} aria-label="Previous project">←</button>
                <span aria-hidden="true">{number(selected)}<span> / {String(studioProjects.length).padStart(2, '0')}</span></span>
                <button type="button" onClick={() => setSelected(current => (current + 1) % studioProjects.length)} aria-label="Next project">→</button>
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
