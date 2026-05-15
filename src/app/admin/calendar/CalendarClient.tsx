'use client'

import { useState, useMemo, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// ─── Types ────────────────────────────────────────────────────────────────────

type CalView = 'day' | 'week' | 'month'
type EventType = 'booking' | 'booking_pending' | 'delivery' | 'personal' | 'work' | 'blocked'

export type CalEvent = {
  id:         string
  title:      string
  subtitle?:  string
  date:       string       // YYYY-MM-DD
  startTime?: string       // HH:MM 24h
  endTime?:   string       // HH:MM 24h
  allDay?:    boolean
  type:       EventType
  href?:      string
  entryId?:   string
}

// ─── Style map ────────────────────────────────────────────────────────────────

const TYPE_STYLE: Record<EventType, { bg: string; border: string; text: string; dot: string; label: string }> = {
  booking:         { bg: '#DBEAFE', border: '#3B82F6', text: '#1E3A8A', dot: '#3B82F6', label: 'Booking' },
  booking_pending: { bg: '#FEF3C7', border: '#F59E0B', text: '#78350F', dot: '#F59E0B', label: 'Pending' },
  delivery:        { bg: '#D1FAE5', border: '#10B981', text: '#064E3B', dot: '#10B981', label: 'Delivery' },
  personal:        { bg: '#EDE9FE', border: '#7C3AED', text: '#4C1D95', dot: '#7C3AED', label: 'Personal' },
  work:            { bg: '#E2E8F0', border: '#64748B', text: '#1E293B', dot: '#64748B', label: 'Work' },
  blocked:         { bg: '#FEE2E2', border: '#EF4444', text: '#7F1D1D', dot: '#EF4444', label: 'Unavailable' },
}

// ─── Date helpers ─────────────────────────────────────────────────────────────

const toYMD = (d: Date) => d.toLocaleDateString('en-CA')
const parseYMD = (s: string) => { const [y,m,d] = s.split('-').map(Number); return new Date(y!,m!-1,d!) }
const addDays  = (d: Date, n: number) => { const r = new Date(d); r.setDate(r.getDate()+n); return r }
const startOfWeek = (d: Date) => addDays(new Date(d.getFullYear(), d.getMonth(), d.getDate()), -d.getDay())
const isSameDay = (a: Date, b: Date) => toYMD(a) === toYMD(b)

function fmtMonthYear(d: Date) {
  return d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
}
function fmtTime(t: string) {
  const [h, m] = t.split(':').map(Number)
  const ampm = h! >= 12 ? 'pm' : 'am'
  const h12 = h! % 12 || 12
  return m! > 0 ? `${h12}:${String(m).padStart(2,'0')}${ampm}` : `${h12}${ampm}`
}
function fmtDateLabel(d: Date) {
  const today = new Date(); today.setHours(0,0,0,0)
  const target = new Date(d); target.setHours(0,0,0,0)
  const diff = Math.round((target.getTime() - today.getTime()) / 86400000)
  if (diff === 0) return 'Today'
  if (diff === 1) return 'Tomorrow'
  if (diff === -1) return 'Yesterday'
  return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' })
}

const DAY_SHORT = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December']

// ─── Time grid ────────────────────────────────────────────────────────────────

const START_HOUR = 7
const END_HOUR   = 21
const HOUR_H     = 64
const TOTAL_H    = (END_HOUR - START_HOUR) * HOUR_H

function timeToY(t: string): number {
  const [h, m] = t.split(':').map(Number)
  return ((h! + m!/60) - START_HOUR) * HOUR_H
}
function timeToMins(t: string): number {
  const [h, m] = t.split(':').map(Number)
  return h!*60 + m!
}
function minsToTime(mins: number): string {
  const h = Math.floor(mins/60)
  const m = mins % 60
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CalendarClient({ events }: { events: CalEvent[] }) {
  const router = useRouter()
  const today  = new Date(); today.setHours(0,0,0,0)

  const [view,        setView]       = useState<CalView>('week')
  const [cursor,      setCursor]     = useState(today)   // anchor date for nav
  const [showModal,   setShowModal]  = useState(false)
  const [editEntry,   setEditEntry]  = useState<CalEvent | null>(null)
  const [prefillDate, setPrefillDate] = useState('')
  const [prefillTime, setPrefillTime] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  // Index events by date for fast lookup
  const byDate = useMemo(() => {
    const m: Record<string, CalEvent[]> = {}
    for (const e of events) {
      if (!m[e.date]) m[e.date] = []
      m[e.date]!.push(e)
    }
    return m
  }, [events])

  // Navigation
  const goToday  = () => setCursor(new Date(today))
  const goPrev   = () => {
    if (view === 'week')  setCursor(d => addDays(d, -7))
    else if (view === 'month') setCursor(d => new Date(d.getFullYear(), d.getMonth()-1, 1))
    else setCursor(d => addDays(d, -1))
  }
  const goNext   = () => {
    if (view === 'week')  setCursor(d => addDays(d, 7))
    else if (view === 'month') setCursor(d => new Date(d.getFullYear(), d.getMonth()+1, 1))
    else setCursor(d => addDays(d, 1))
  }

  // Open new event modal
  const openNew = useCallback((date = '', time = '') => {
    setEditEntry(null)
    setPrefillDate(date || toYMD(today))
    setPrefillTime(time)
    setShowModal(true)
  }, [today])

  // Open edit modal for personal entry
  const openEdit = useCallback((e: CalEvent) => {
    setEditEntry(e)
    setPrefillDate(e.date)
    setPrefillTime(e.startTime ?? '')
    setShowModal(true)
  }, [])

  // Delete entry
  const deleteEntry = useCallback(async (id: string) => {
    if (!confirm('Delete this event?')) return
    await fetch(`/api/admin/calendar/${id}`, { method: 'DELETE' })
    router.refresh()
  }, [router])

  // Week header label
  const weekStart = startOfWeek(cursor)
  const weekDays  = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))
  const headerLabel = view === 'week'
    ? `${weekStart.toLocaleDateString('en-GB',{month:'short',day:'numeric'})} – ${addDays(weekStart,6).toLocaleDateString('en-GB',{month:'short',day:'numeric', year:'numeric'})}`
    : view === 'month'
    ? fmtMonthYear(cursor)
    : cursor.toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric'})

  // Upcoming events for sidebar agenda
  const agendaDays = useMemo(() => {
    const days: Array<{ date: Date; events: CalEvent[] }> = []
    for (let i = -1; i <= 30; i++) {
      const d   = addDays(today, i)
      const ymd = toYMD(d)
      const evs = (byDate[ymd] ?? []).sort((a,b) => {
        if (!a.startTime && !b.startTime) return 0
        if (!a.startTime) return 1
        if (!b.startTime) return -1
        return timeToMins(a.startTime) - timeToMins(b.startTime)
      })
      if (evs.length > 0 || i >= 0) days.push({ date: d, events: evs })
      if (days.length >= 14) break
    }
    return days
  }, [byDate, today])

  return (
    <div className="flex flex-1 overflow-hidden h-full">

      {/* ── SIDEBAR ─────────────────────────────────────────────────────── */}
      <aside className="w-[280px] flex-shrink-0 bg-[#1a1a18] text-white flex flex-col overflow-hidden">

        {/* New Event button */}
        <div className="px-4 pt-4 pb-3">
          <button
            onClick={() => openNew()}
            className="w-full flex items-center justify-center gap-2 bg-[#2A5220] hover:bg-[#1E3D17] text-white py-2.5 text-[0.75rem] font-sans font-medium tracking-[0.15em] uppercase transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            New Event
          </button>
        </div>

        {/* Mini Calendar */}
        <MiniCalendar
          today={today}
          cursor={cursor}
          byDate={byDate}
          onSelectDay={d => { setCursor(d); setView('day') }}
          onSelectMonth={d => setCursor(d)}
        />

        {/* Legend */}
        <div className="px-4 py-3 border-t border-white/10">
          <p className="font-sans text-[0.625rem] uppercase tracking-widest text-white/40 mb-2">Legend</p>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
            {(Object.entries(TYPE_STYLE) as [EventType, typeof TYPE_STYLE[EventType]][]).map(([type, s]) => (
              <div key={type} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: s.dot }} />
                <span className="font-sans text-[0.625rem] text-white/60">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Agenda list */}
        <div className="flex-1 overflow-y-auto px-4 py-3 border-t border-white/10 space-y-4">
          {agendaDays.map(({ date, events: dayEvs }) => (
            <div key={toYMD(date)}>
              <p className={`font-sans text-[0.625rem] uppercase tracking-widest mb-1.5 ${
                isSameDay(date, today) ? 'text-[#97C459] font-medium' : 'text-white/40'
              }`}>
                {fmtDateLabel(date)}
              </p>
              {dayEvs.length === 0 ? (
                <p className="font-sans text-[0.6875rem] text-white/25 italic">No events</p>
              ) : (
                <div className="space-y-1">
                  {dayEvs.map(ev => (
                    <div key={ev.id} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                        style={{ backgroundColor: TYPE_STYLE[ev.type].dot }} />
                      <div className="flex-1 min-w-0">
                        {ev.startTime && (
                          <p className="font-sans text-[0.5625rem] text-white/40 leading-none mb-0.5">
                            {fmtTime(ev.startTime)}{ev.endTime ? ` – ${fmtTime(ev.endTime)}` : ''}
                          </p>
                        )}
                        <p className="font-sans text-[0.6875rem] text-white/80 truncate leading-snug">
                          {ev.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>

      {/* ── MAIN PANEL ───────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white">

        {/* Toolbar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={goPrev}
              className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-100 transition-colors text-gray-500">
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                <path d="M5 1L1 5l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button onClick={goToday}
              className="font-sans text-[0.75rem] font-medium text-[#2A5220] border border-[#2A5220]/30 px-3 py-1 hover:bg-[#2A5220]/5 transition-colors">
              Today
            </button>
            <button onClick={goNext}
              className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-100 transition-colors text-gray-500">
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <h2 className="font-sans text-[0.9375rem] font-medium text-gray-800 ml-2">{headerLabel}</h2>
          </div>

          {/* View toggle */}
          <div className="flex border border-gray-200 overflow-hidden">
            {(['day','week','month'] as CalView[]).map(v => (
              <button key={v} onClick={() => setView(v)}
                className={`font-sans text-[0.6875rem] uppercase tracking-widest px-4 py-2 transition-colors ${
                  view === v ? 'bg-[#2A5220] text-white' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                }`}>
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Calendar body */}
        {view === 'week' && (
          <WeekView
            weekDays={weekDays}
            today={today}
            byDate={byDate}
            onCellClick={(date, time) => openNew(date, time)}
            onEventClick={(ev) => ev.entryId ? openEdit(ev) : ev.href ? router.push(ev.href) : undefined}
            onDeleteEntry={deleteEntry}
            scrollRef={scrollRef}
          />
        )}
        {view === 'month' && (
          <MonthView
            cursor={cursor}
            today={today}
            byDate={byDate}
            onDayClick={d => { setCursor(d); setView('day') }}
            onEventClick={(ev) => ev.entryId ? openEdit(ev) : ev.href ? router.push(ev.href) : undefined}
          />
        )}
        {view === 'day' && (
          <DayView
            day={cursor}
            today={today}
            byDate={byDate}
            onCellClick={(date, time) => openNew(date, time)}
            onEventClick={(ev) => ev.entryId ? openEdit(ev) : ev.href ? router.push(ev.href) : undefined}
            onDeleteEntry={deleteEntry}
            scrollRef={scrollRef}
          />
        )}
      </div>

      {/* ── EVENT MODAL ─────────────────────────────────────────────────── */}
      {showModal && (
        <EventModal
          prefillDate={prefillDate}
          prefillTime={prefillTime}
          editEntry={editEntry}
          onClose={() => setShowModal(false)}
          onSaved={() => { setShowModal(false); router.refresh() }}
          onDeleted={() => { setShowModal(false); router.refresh() }}
        />
      )}
    </div>
  )
}

// ─── Mini Calendar ────────────────────────────────────────────────────────────

function MiniCalendar({ today, cursor, byDate, onSelectDay, onSelectMonth }: {
  today:         Date
  cursor:        Date
  byDate:        Record<string, CalEvent[]>
  onSelectDay:   (d: Date) => void
  onSelectMonth: (d: Date) => void
}) {
  const [miniMonth, setMiniMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1))

  const year  = miniMonth.getFullYear()
  const month = miniMonth.getMonth()
  const first = new Date(year, month, 1)
  const startPad = first.getDay() // 0=Sun
  const daysInM  = new Date(year, month+1, 0).getDate()
  const cells: Array<Date | null> = [
    ...Array(startPad).fill(null),
    ...Array.from({ length: daysInM }, (_, i) => new Date(year, month, i+1)),
  ]
  // Pad to full rows
  while (cells.length % 7 !== 0) cells.push(null)

  return (
    <div className="px-4 pb-3">
      <div className="flex items-center justify-between mb-3">
        <span className="font-sans text-[0.75rem] font-medium text-white/80">
          {miniMonth.toLocaleDateString('en-GB',{month:'short',year:'numeric'})}
        </span>
        <div className="flex gap-1">
          <button onClick={() => setMiniMonth(d => new Date(d.getFullYear(), d.getMonth()-1, 1))}
            className="w-5 h-5 flex items-center justify-center rounded hover:bg-white/10 text-white/50">
            <svg width="4" height="7" viewBox="0 0 4 7" fill="none"><path d="M3 .5L.5 3.5 3 6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
          </button>
          <button onClick={() => setMiniMonth(d => new Date(d.getFullYear(), d.getMonth()+1, 1))}
            className="w-5 h-5 flex items-center justify-center rounded hover:bg-white/10 text-white/50">
            <svg width="4" height="7" viewBox="0 0 4 7" fill="none"><path d="M1 .5L3.5 3.5 1 6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
          </button>
        </div>
      </div>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_SHORT.map(d => (
          <div key={d} className="text-center font-sans text-[0.5rem] uppercase text-white/30 py-0.5">{d[0]}</div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((cell, i) => {
          if (!cell) return <div key={i} />
          const ymd     = toYMD(cell)
          const isToday = isSameDay(cell, today)
          const hasBusiness  = (byDate[ymd] ?? []).some(e => e.type === 'booking' || e.type === 'booking_pending' || e.type === 'delivery')
          const hasPersonal  = (byDate[ymd] ?? []).some(e => e.type === 'personal' || e.type === 'work' || e.type === 'blocked')
          return (
            <button key={i} onClick={() => onSelectDay(cell)}
              className={`flex flex-col items-center py-0.5 rounded transition-colors ${
                isToday ? 'bg-[#2A5220]' : 'hover:bg-white/10'
              }`}>
              <span className={`font-sans text-[0.6875rem] ${isToday ? 'text-white font-medium' : 'text-white/70'}`}>
                {cell.getDate()}
              </span>
              {(hasBusiness || hasPersonal) && (
                <div className="flex gap-0.5 mt-0.5">
                  {hasBusiness && <div className="w-1 h-1 rounded-full bg-blue-400" />}
                  {hasPersonal && <div className="w-1 h-1 rounded-full bg-purple-400" />}
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Event Pill ───────────────────────────────────────────────────────────────

function EventPill({ ev, onClick, onDelete, compact = false }: {
  ev:       CalEvent
  onClick:  () => void
  onDelete: (id: string) => void
  compact?: boolean
}) {
  const s = TYPE_STYLE[ev.type]
  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden"
      style={{
        backgroundColor: s.bg,
        borderLeft: `3px solid ${s.border}`,
        padding:    compact ? '1px 6px' : '3px 6px 3px 7px',
        borderRadius: 0,
      }}
    >
      {ev.startTime && !compact && (
        <p className="font-sans leading-none mb-0.5" style={{ fontSize: 10, color: s.text, opacity: 0.75 }}>
          {fmtTime(ev.startTime)}{ev.endTime ? ` – ${fmtTime(ev.endTime)}` : ''}
        </p>
      )}
      <p className="font-sans font-medium truncate leading-snug"
        style={{ fontSize: compact ? 11 : 12, color: s.text }}>
        {ev.title}
      </p>
      {!compact && ev.subtitle && (
        <p className="font-sans truncate" style={{ fontSize: 10, color: s.text, opacity: 0.65 }}>{ev.subtitle}</p>
      )}
      {ev.entryId && (
        <button
          onClick={e => { e.stopPropagation(); onDelete(ev.entryId!) }}
          className="absolute top-0.5 right-0.5 opacity-0 group-hover:opacity-100 transition-opacity w-4 h-4 flex items-center justify-center"
          style={{ color: s.text }}
        >
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d="M1 1l6 6M7 1L1 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        </button>
      )}
    </div>
  )
}

// ─── Week View ────────────────────────────────────────────────────────────────

function WeekView({ weekDays, today, byDate, onCellClick, onEventClick, onDeleteEntry, scrollRef }: {
  weekDays:      Date[]
  today:         Date
  byDate:        Record<string, CalEvent[]>
  onCellClick:   (date: string, time: string) => void
  onEventClick:  (ev: CalEvent) => void
  onDeleteEntry: (id: string) => void
  scrollRef:     React.RefObject<HTMLDivElement>
}) {
  const allDayByDay = weekDays.map(d => (byDate[toYMD(d)] ?? []).filter(e => e.allDay || !e.startTime))
  const timedByDay  = weekDays.map(d => (byDate[toYMD(d)] ?? []).filter(e => !e.allDay && !!e.startTime))

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Day header row */}
      <div className="flex border-b border-gray-200 flex-shrink-0">
        <div className="w-14 flex-shrink-0" />
        {weekDays.map((day, i) => {
          const isToday = isSameDay(day, today)
          return (
            <div key={i} className="flex-1 border-l border-gray-100 py-2 text-center">
              <p className={`font-sans text-[0.5625rem] uppercase tracking-widest ${isToday ? 'text-[#2A5220]' : 'text-gray-400'}`}>
                {DAY_SHORT[day.getDay()]}
              </p>
              <div className={`mx-auto mt-0.5 w-8 h-8 flex items-center justify-center ${isToday ? 'bg-[#2A5220] rounded-full' : ''}`}>
                <p className={`font-sans text-[1rem] font-medium leading-none ${isToday ? 'text-white' : 'text-gray-700'}`}>
                  {day.getDate()}
                </p>
              </div>
              {/* All-day events */}
              <div className="mt-1 space-y-0.5 px-0.5">
                {allDayByDay[i]!.map(ev => (
                  <EventPill key={ev.id} ev={ev} compact
                    onClick={() => onEventClick(ev)}
                    onDelete={onDeleteEntry}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Scrollable time grid */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="flex" style={{ height: TOTAL_H }}>

          {/* Hour labels */}
          <div className="w-14 flex-shrink-0 relative">
            {Array.from({ length: END_HOUR - START_HOUR }, (_, i) => (
              <div key={i} className="absolute right-2 font-sans text-[0.5625rem] text-gray-400"
                style={{ top: i * HOUR_H - 6 }}>
                {i+START_HOUR > 12 ? `${i+START_HOUR-12}pm` : i+START_HOUR === 12 ? '12pm' : `${i+START_HOUR}am`}
              </div>
            ))}
          </div>

          {/* Day columns */}
          {weekDays.map((day, di) => {
            const ymd   = toYMD(day)
            const isToday = isSameDay(day, today)
            const evs   = timedByDay[di]!

            return (
              <div key={di} className="flex-1 border-l border-gray-100 relative cursor-pointer select-none"
                style={{ height: TOTAL_H }}
                onClick={e => {
                  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
                  const y    = e.clientY - rect.top
                  const mins = Math.round((y / HOUR_H + START_HOUR) * 60 / 15) * 15
                  onCellClick(ymd, minsToTime(Math.min(Math.max(mins, START_HOUR*60), (END_HOUR-1)*60)))
                }}
              >
                {/* Hour lines */}
                {Array.from({ length: END_HOUR - START_HOUR }, (_, i) => (
                  <div key={i} className="absolute left-0 right-0 border-t border-gray-100"
                    style={{ top: i * HOUR_H }} />
                ))}
                {/* Half-hour lines */}
                {Array.from({ length: END_HOUR - START_HOUR }, (_, i) => (
                  <div key={`h${i}`} className="absolute left-0 right-0 border-t border-gray-50"
                    style={{ top: i * HOUR_H + HOUR_H/2 }} />
                ))}

                {/* Today highlight */}
                {isToday && (
                  <div className="absolute inset-0 bg-[#2A5220]/[0.02] pointer-events-none" />
                )}

                {/* Timed events */}
                {evs.map(ev => {
                  const startY  = timeToY(ev.startTime!)
                  const endMins = ev.endTime ? timeToMins(ev.endTime) : timeToMins(ev.startTime!) + 60
                  const height  = Math.max(((endMins - timeToMins(ev.startTime!)) / 60) * HOUR_H, 24)
                  if (startY < 0 || startY > TOTAL_H) return null
                  return (
                    <div key={ev.id}
                      className="absolute left-0 right-1"
                      style={{ top: startY, height }}
                      onClick={e => { e.stopPropagation(); onEventClick(ev) }}
                    >
                      <EventPill ev={ev} onClick={() => onEventClick(ev)} onDelete={onDeleteEntry} />
                    </div>
                  )
                })}

                {/* Current time indicator */}
                {isToday && (() => {
                  const now = new Date()
                  const nowY = ((now.getHours() + now.getMinutes()/60) - START_HOUR) * HOUR_H
                  if (nowY < 0 || nowY > TOTAL_H) return null
                  return (
                    <div className="absolute left-0 right-0 flex items-center pointer-events-none" style={{ top: nowY }}>
                      <div className="w-2 h-2 rounded-full bg-red-500 -ml-1 flex-shrink-0" />
                      <div className="flex-1 border-t border-red-500" />
                    </div>
                  )
                })()}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─── Month View ───────────────────────────────────────────────────────────────

function MonthView({ cursor, today, byDate, onDayClick, onEventClick }: {
  cursor:       Date
  today:        Date
  byDate:       Record<string, CalEvent[]>
  onDayClick:   (d: Date) => void
  onEventClick: (ev: CalEvent) => void
}) {
  const year  = cursor.getFullYear()
  const month = cursor.getMonth()
  const first = new Date(year, month, 1)
  const pad   = first.getDay()
  const total = new Date(year, month+1, 0).getDate()
  const cells: Array<Date | null> = [
    ...Array(pad).fill(null),
    ...Array.from({ length: total }, (_, i) => new Date(year, month, i+1)),
  ]
  while (cells.length % 7 !== 0) cells.push(null)
  const weeks = Array.from({ length: cells.length/7 }, (_, i) => cells.slice(i*7, (i+1)*7))

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Day headers */}
      <div className="grid grid-cols-7 border-b border-gray-200">
        {DAY_SHORT.map(d => (
          <div key={d} className="py-2 text-center font-sans text-[0.625rem] uppercase tracking-widest text-gray-400">
            {d}
          </div>
        ))}
      </div>

      {/* Weeks grid */}
      <div className="flex-1 overflow-y-auto">
        {weeks.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 border-b border-gray-100" style={{ minHeight: 100 }}>
            {week.map((cell, di) => {
              if (!cell) return <div key={di} className="border-r border-gray-50 bg-gray-50/50" />
              const ymd      = toYMD(cell)
              const isToday  = isSameDay(cell, today)
              const isOtherM = cell.getMonth() !== month
              const dayEvs   = (byDate[ymd] ?? []).slice(0, 3)
              const more     = (byDate[ymd] ?? []).length - 3
              return (
                <div key={di}
                  className={`border-r border-gray-100 p-1 cursor-pointer hover:bg-gray-50 transition-colors ${isOtherM ? 'opacity-30' : ''}`}
                  onClick={() => onDayClick(cell)}
                >
                  <div className={`w-6 h-6 flex items-center justify-center mb-1 ${isToday ? 'bg-[#2A5220] rounded-full' : ''}`}>
                    <span className={`font-sans text-[0.75rem] font-medium ${isToday ? 'text-white' : 'text-gray-600'}`}>
                      {cell.getDate()}
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    {dayEvs.map(ev => (
                      <div key={ev.id} onClick={e => { e.stopPropagation(); onEventClick(ev) }}
                        className="px-1.5 py-0.5 truncate font-sans text-[0.625rem] font-medium cursor-pointer"
                        style={{ backgroundColor: TYPE_STYLE[ev.type].bg, color: TYPE_STYLE[ev.type].text, borderLeft: `2px solid ${TYPE_STYLE[ev.type].border}` }}>
                        {ev.startTime ? `${fmtTime(ev.startTime)} ` : ''}{ev.title}
                      </div>
                    ))}
                    {more > 0 && (
                      <p className="font-sans text-[0.5625rem] text-gray-400 pl-1">+{more} more</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Day View ─────────────────────────────────────────────────────────────────

function DayView({ day, today, byDate, onCellClick, onEventClick, onDeleteEntry, scrollRef }: {
  day:           Date
  today:         Date
  byDate:        Record<string, CalEvent[]>
  onCellClick:   (date: string, time: string) => void
  onEventClick:  (ev: CalEvent) => void
  onDeleteEntry: (id: string) => void
  scrollRef:     React.RefObject<HTMLDivElement>
}) {
  const ymd     = toYMD(day)
  const isToday = isSameDay(day, today)
  const allDay  = (byDate[ymd] ?? []).filter(e => e.allDay || !e.startTime)
  const timed   = (byDate[ymd] ?? []).filter(e => !e.allDay && !!e.startTime)

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className={`py-3 px-6 border-b border-gray-200 text-center flex-shrink-0 ${isToday ? 'bg-[#2A5220]/5' : ''}`}>
        <p className={`font-sans text-[0.625rem] uppercase tracking-widest ${isToday ? 'text-[#2A5220]' : 'text-gray-400'}`}>
          {DAY_SHORT[day.getDay()]}
        </p>
        <div className={`mx-auto mt-0.5 w-10 h-10 flex items-center justify-center ${isToday ? 'bg-[#2A5220] rounded-full' : ''}`}>
          <p className={`font-sans text-[1.5rem] font-medium ${isToday ? 'text-white' : 'text-gray-700'}`}>
            {day.getDate()}
          </p>
        </div>
        {allDay.map(ev => (
          <EventPill key={ev.id} ev={ev} compact onClick={() => onEventClick(ev)} onDelete={onDeleteEntry} />
        ))}
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="flex" style={{ height: TOTAL_H }}>
          <div className="w-14 flex-shrink-0 relative">
            {Array.from({ length: END_HOUR - START_HOUR }, (_, i) => (
              <div key={i} className="absolute right-2 font-sans text-[0.5625rem] text-gray-400"
                style={{ top: i*HOUR_H - 6 }}>
                {i+START_HOUR > 12 ? `${i+START_HOUR-12}pm` : i+START_HOUR === 12 ? '12pm' : `${i+START_HOUR}am`}
              </div>
            ))}
          </div>
          <div className="flex-1 border-l border-gray-100 relative cursor-pointer select-none" style={{ height: TOTAL_H }}
            onClick={e => {
              const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
              const mins = Math.round(((e.clientY - rect.top) / HOUR_H + START_HOUR) * 60 / 15) * 15
              onCellClick(ymd, minsToTime(Math.min(Math.max(mins, START_HOUR*60), (END_HOUR-1)*60)))
            }}>
            {Array.from({ length: END_HOUR - START_HOUR }, (_, i) => (
              <div key={i} className="absolute left-0 right-0 border-t border-gray-100" style={{ top: i*HOUR_H }} />
            ))}
            {Array.from({ length: END_HOUR - START_HOUR }, (_, i) => (
              <div key={`h${i}`} className="absolute left-0 right-0 border-t border-gray-50" style={{ top: i*HOUR_H + HOUR_H/2 }} />
            ))}
            {timed.map(ev => {
              const startY  = timeToY(ev.startTime!)
              const endMins = ev.endTime ? timeToMins(ev.endTime) : timeToMins(ev.startTime!) + 60
              const height  = Math.max(((endMins - timeToMins(ev.startTime!)) / 60) * HOUR_H, 24)
              return (
                <div key={ev.id} className="absolute left-0 right-2"
                  style={{ top: startY, height }}
                  onClick={e => { e.stopPropagation(); onEventClick(ev) }}>
                  <EventPill ev={ev} onClick={() => onEventClick(ev)} onDelete={onDeleteEntry} />
                </div>
              )
            })}
            {isToday && (() => {
              const now  = new Date()
              const nowY = ((now.getHours() + now.getMinutes()/60) - START_HOUR) * HOUR_H
              if (nowY < 0 || nowY > TOTAL_H) return null
              return (
                <div className="absolute left-0 right-0 flex items-center pointer-events-none" style={{ top: nowY }}>
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 -ml-1 flex-shrink-0" />
                  <div className="flex-1 border-t-2 border-red-500" />
                </div>
              )
            })()}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Event Modal ──────────────────────────────────────────────────────────────

function EventModal({ prefillDate, prefillTime, editEntry, onClose, onSaved, onDeleted }: {
  prefillDate: string
  prefillTime: string
  editEntry:   CalEvent | null
  onClose:     () => void
  onSaved:     () => void
  onDeleted:   () => void
}) {
  const [title,     setTitle]     = useState(editEntry?.title     ?? '')
  const [date,      setDate]      = useState(editEntry?.date      ?? prefillDate)
  const [startTime, setStartTime] = useState(editEntry?.startTime ?? prefillTime)
  const [endTime,   setEndTime]   = useState(editEntry?.endTime   ?? '')
  const [type,      setType]      = useState<'personal'|'work'|'blocked'>(
    (editEntry?.type as 'personal'|'work'|'blocked') ?? 'personal'
  )
  const [notes,  setNotes]  = useState(editEntry?.subtitle ?? '')
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  async function save() {
    if (!title.trim()) { setError('Title is required'); return }
    setLoading(true); setError('')
    try {
      const body = { title: title.trim(), date, startTime: startTime || undefined, endTime: endTime || undefined, type, notes: notes || undefined }
      const url  = editEntry?.entryId ? `/api/admin/calendar/${editEntry.entryId}` : '/api/admin/calendar'
      const method = editEntry?.entryId ? 'PUT' : 'POST'
      const res  = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      if (!res.ok) throw new Error('Failed to save')
      onSaved()
    } catch {
      setError('Something went wrong')
      setLoading(false)
    }
  }

  async function remove() {
    if (!editEntry?.entryId || !confirm('Delete this event?')) return
    await fetch(`/api/admin/calendar/${editEntry.entryId}`, { method: 'DELETE' })
    onDeleted()
  }

  const IN = 'w-full border border-divider px-3 py-2 font-sans text-[0.875rem] text-charcoal bg-white focus:outline-none focus:border-hunter'
  const LB = 'block font-sans text-[0.625rem] uppercase tracking-widest text-muted mb-1'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-parchment w-full max-w-sm mx-4 shadow-2xl">
        {/* Header */}
        <div className="bg-hunter text-parchment px-5 py-4 flex items-center justify-between">
          <span className="font-playfair text-[1rem]">{editEntry ? 'Edit Event' : 'New Event'}</span>
          <button onClick={onClose} className="text-parchment/60 hover:text-parchment text-xl leading-none">&times;</button>
        </div>

        <div className="p-5 space-y-4">
          {/* Title */}
          <div>
            <label className={LB}>Title *</label>
            <input className={IN} value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. School run" autoFocus />
          </div>

          {/* Type */}
          <div>
            <label className={LB}>Type</label>
            <div className="flex gap-0 border border-divider">
              {(['personal','work','blocked'] as const).map(t => (
                <button key={t} type="button" onClick={() => setType(t)}
                  className={`flex-1 py-2 font-sans text-[0.625rem] uppercase tracking-widest transition-colors ${
                    type === t ? 'text-white' : 'text-muted hover:text-charcoal'
                  }`}
                  style={type === t ? { backgroundColor: TYPE_STYLE[t].border } : {}}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Date */}
          <div>
            <label className={LB}>Date *</label>
            <input type="date" className={IN} value={date} onChange={e => setDate(e.target.value)} />
          </div>

          {/* Times */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={LB}>Start time</label>
              <input type="time" className={IN} value={startTime} onChange={e => setStartTime(e.target.value)} />
            </div>
            <div>
              <label className={LB}>End time</label>
              <input type="time" className={IN} value={endTime} onChange={e => setEndTime(e.target.value)} />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className={LB}>Notes (optional)</label>
            <textarea className={`${IN} resize-none`} rows={2} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Any notes…" />
          </div>

          {error && <p className="font-sans text-[0.8125rem] text-red-600">{error}</p>}

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button onClick={save} disabled={loading}
              className="flex-1 bg-hunter text-parchment py-3 font-sans text-[0.75rem] font-medium tracking-[0.15em] uppercase hover:bg-[#1E3D17] transition-colors disabled:opacity-60">
              {loading ? 'Saving…' : editEntry ? 'Update' : 'Save'}
            </button>
            {editEntry && (
              <button onClick={remove}
                className="px-4 py-3 border border-red-200 text-red-600 font-sans text-[0.75rem] uppercase tracking-widest hover:bg-red-50 transition-colors">
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
