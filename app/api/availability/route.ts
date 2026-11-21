import { NextResponse } from 'next/server'

const API = 'https://api.calendly.com'
const ZONE = 'America/Los_Angeles'
const BOOKING = 'https://calendly.com/julius-buildwithju/30min'
const SLUG = '30min'
const WANT_DAYS = 3
const WINDOWS = 2 // Calendly allows 7 days per request; look up to 14 days ahead

export type AvailableDay = { date: string; weekday: string; day: string; count: number; href: string }

async function calendly<T>(path: string, token: string): Promise<T> {
  const res = await fetch(`${API}${path}`, { headers: { Authorization: `Bearer ${token}` }, next: { revalidate: 300 } })
  if (!res.ok) throw new Error(`Calendly ${res.status} on ${path.split('?')[0]}`)
  return res.json() as Promise<T>
}

function dayParts(iso: string) {
  const p = new Intl.DateTimeFormat('en-US', { timeZone: ZONE, year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' }).formatToParts(new Date(iso))
  const get = (t: string) => p.find(x => x.type === t)?.value ?? ''
  return { y: get('year'), m: get('month'), d: get('day'), weekday: get('weekday') }
}

export async function GET() {
  const token = process.env.CALENDLY_TOKEN
  if (!token) return NextResponse.json({ configured: false })

  try {
    const me = await calendly<{ resource: { uri: string } }>('/users/me', token)
    const types = await calendly<{ collection: { uri: string; slug: string; scheduling_url: string }[] }>(`/event_types?user=${encodeURIComponent(me.resource.uri)}&active=true&count=100`, token)
    const type = types.collection.find(t => t.slug === SLUG || t.scheduling_url.endsWith(`/${SLUG}`))
    if (!type) throw new Error(`No active "${SLUG}" event type`)

    const days = new Map<string, AvailableDay>()
    let start = Date.now() + 60_000
    for (let w = 0; w < WINDOWS && days.size < WANT_DAYS; w++) {
      const end = start + 7 * 24 * 3600_000 - 60_000
      const slots = await calendly<{ collection: { status: string; start_time: string }[] }>(
        `/event_type_available_times?event_type=${encodeURIComponent(type.uri)}&start_time=${new Date(start).toISOString()}&end_time=${new Date(end).toISOString()}`, token)
      for (const slot of slots.collection) {
        if (slot.status !== 'available') continue
        const { y, m, d, weekday } = dayParts(slot.start_time)
        const date = `${y}-${m}-${d}`
        const existing = days.get(date)
        if (existing) existing.count++
        else days.set(date, { date, weekday, day: String(Number(d)), count: 1, href: `${BOOKING}?month=${y}-${m}&date=${date}` })
      }
      start = end
    }

    const list = [...days.values()].sort((a, b) => a.date.localeCompare(b.date)).slice(0, WANT_DAYS)
    return NextResponse.json({ configured: true, days: list }, { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' } })
  } catch (error) {
    console.error('[availability]', error)
    return NextResponse.json({ configured: false, error: true }, { status: 200 })
  }
}
