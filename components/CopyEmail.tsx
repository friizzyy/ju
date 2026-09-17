'use client'

import { useState } from 'react'
import s from '@/app/contact/Contact.module.css'

export default function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle')

  async function copy() {
    try {
      await navigator.clipboard.writeText(email)
      setStatus('copied')
    } catch {
      setStatus('failed')
    }
  }

  return <div className={s.copyControl}>
    <button type="button" onClick={copy} className={s.copyButton} aria-label="Copy email address">
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">{status === 'copied'
        ? <path d="m4 10 4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        : <><rect x="7" y="7" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.3"/><path d="M13 4V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></>}</svg>
    </button>
    <span role="status" className={s.copyStatus}>{status === 'copied' ? 'Copied' : status === 'failed' ? 'Select the email address to copy it, or open the email link.' : ''}</span>
  </div>
}
