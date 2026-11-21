'use client'

import { useEffect, useState } from 'react'
import s from '@/app/contact/Contact.module.css'

const zone = 'America/Los_Angeles'

function partsIn(date: Date) {
  const p = new Intl.DateTimeFormat('en-US', { timeZone: zone, year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' }).formatToParts(date)
  const get = (t: string) => p.find(x => x.type === t)?.value ?? ''
  return { y: get('year'), m: get('month'), d: get('day'), weekday: get('weekday') }
}

/** Live local time in California, e.g. "4:12 PM in California". */
export function LocalTime() {
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(id)
  }, [])
  const time = now ? new Intl.DateTimeFormat('en-US', { timeZone: zone, hour: 'numeric', minute: '2-digit' }).format(now) : ' '
  return <span className={s.localTime}><i className={s.liveDot} aria-hidden="true" />{now ? `${time} in California` : time}</span>
}

/** Next three weekdays (California time), each opening Calendly on that day. */
export function BookingDays({ booking }: { booking: string }) {
  const [days, setDays] = useState<{ key: string; weekday: string; day: string; href: string; label: string }[] | null>(null)

  useEffect(() => {
    const out: NonNullable<typeof days> = []
    const cursor = new Date()
    while (out.length < 3) {
      cursor.setUTCDate(cursor.getUTCDate() + 1)
      const { y, m, d, weekday } = partsIn(cursor)
      if (weekday === 'Sat' || weekday === 'Sun') continue
      const iso = `${y}-${m}-${d}`
      if (out.some(x => x.key === iso)) continue
      out.push({ key: iso, weekday, day: String(Number(d)), href: `${booking}?month=${y}-${m}&date=${iso}`, label: `See times on ${weekday} ${Number(d)}` })
    }
    setDays(out)
  }, [booking])

  return <div className={s.days}>
    {days
      ? days.map((day, i) => <a key={day.key} href={day.href} target="_blank" rel="noopener noreferrer" className={s.day} style={{ animationDelay: `${i * 70}ms` }} aria-label={day.label}><span>{day.weekday}</span><strong>{day.day}</strong></a>)
      : [0, 1, 2].map(i => <span key={i} className={`${s.day} ${s.dayPlaceholder}`} aria-hidden="true"><span>&nbsp;</span><strong>&nbsp;</strong></span>)}
  </div>
}
