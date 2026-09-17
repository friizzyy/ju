'use client'

import { useId, useRef, useState, type ReactNode } from 'react'
import styles from './Disclosure.module.css'

export default function Disclosure({
  label,
  children,
  className = '',
}: {
  label: string
  children: ReactNode
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const id = useId()
  const trigger = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDivElement>(null)

  function close() {
    if (panel.current?.contains(document.activeElement))
      trigger.current?.focus({ preventScroll: true })
    setOpen(false)
  }

  return (
    <div className={`${styles.disclosure} ${className}`} data-open={open}>
      <button
        ref={trigger}
        className={styles.trigger}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((value) => !value)}
      >
        {label}
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path d="m5 8 5 5 5-5" />
        </svg>
      </button>
      <div
        ref={panel}
        id={id}
        className={styles.panel}
        aria-hidden={!open}
        inert={!open}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            event.stopPropagation()
            close()
          }
        }}
      >
        <div className={styles.clip}>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </div>
  )
}
