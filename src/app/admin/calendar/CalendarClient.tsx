'use client'

import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'

// ─── Types ────────────────────────────────────────────────────────────────────

type CalView  = 'day' | 'week' | 'month' | 'agenda'
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

const TS: Record<EventType, { bg: string; border: string; text: string; dot: string; label: string }> = {
  booking:         { bg: '#DBEAFE', border: '#3B82F6', text: '#1E3A8A', dot: '#3B82F6', label: 'Booking' },
  booking_pending: { bg: '#FEF3C7', border: '#F59E0B', text: '#78350F', dot: '#F59E0B', label: 'Pending' },
  delivery:        { bg: '#D1FAE5', border: '#10B981', text: '#064E3B', dot: '#10B981', label: 'Delivery' },
  personal:        { bg: '#EDE9FE', border: '#7C3AED', text: '#4C1D95', dot: '#7C3AED', label: 'Personal' },
  work:            { bg: '#E2E8F0', border: '#64748B', text: '#1E293B', dot: '#64748B', label: 'Work' },
  blocked:         { bg: '#FEE2E2', border: '#EF4444', text: '#7F1D1D', dot: '#EF4444', label: 'Unavailable' },
}

// ─── Date helpers ─────────────────────────────────────────────────────────────

const toYMD     = (d: Date) => d.toLocaleDateString('en-CA')
const addDays   = (d: Date, n: number) => { const r = new Date(d); r.setDate(r.getDate()+n); return r }
const startOfWeek = (d: Date) => addDays(new Date(d.getFullYear(),d.getMonth(),d.getDate()), -d.getDay())
const isSameDay = (a: Date, b: Date) => toYMD(a) === toYMD(b)

const DAY_SHORT  = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
const DAY_LETTER = ['S','M','T','W','T','F','S']

function fmtTime(t: string) {
  const [h,m] = t.split(':').map(Number)
  const ap = h!>=12?'pm':'am', h12 = h!%12||12
  return m!>0 ? `${h12}:${String(m).padStart(2,'0')}${ap}` : `${h12}${ap}`
}
function fmtDateLabel(d: Date, today: Date) {
  const diff = Math.round((new Date(d).setHours(0,0,0,0) - new Date(today).setHours(0,0,0,0)) / 86400000)
  if (diff===0) return 'Today'
  if (diff===1) return 'Tomorrow'
  if (diff===-1) return 'Yesterday'
  return d.toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'short'})
}

// ─── Time grid ────────────────────────────────────────────────────────────────

const S_HOUR = 7, E_HOUR = 21, HOUR_H = 64, TOTAL_H = (E_HOUR-S_HOUR)*HOUR_H

function timeToY(t: string)    { const [h,m]=t.split(':').map(Number); return ((h!+m!/60)-S_HOUR)*HOUR_H }
function timeToMins(t: string) { const [h,m]=t.split(':').map(Number); return h!*60+m! }
function minsToTime(mins: number) {
  const h=Math.floor(mins/60), m=mins%60
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`
}
function hourLabel(h: number) {
  return h>12?`${h-12}pm`:h===12?'12pm':h===0?'12am':`${h}am`
}

// ─── Responsive hook ──────────────────────────────────────────────────────────

function useIsMobile() {
  const [mobile, setMobile] = useState(false)
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 1024)
    fn(); window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return mobile
}

// ─── Root component ───────────────────────────────────────────────────────────

export default function CalendarClient({ events }: { events: CalEvent[] }) {
  const router   = useRouter()
  const isMobile = useIsMobile()
  const today    = useMemo(() => { const d=new Date(); d.setHours(0,0,0,0); return d }, [])

  const [view,        setView]        = useState<CalView>('week')
  const [cursor,      setCursor]      = useState(today)
  const [sideOpen,    setSideOpen]    = useState(false)
  const [showModal,   setShowModal]   = useState(false)
  const [editEntry,   setEditEntry]   = useState<CalEvent|null>(null)
  const [prefillDate, setPrefillDate] = useState('')
  const [prefillTime, setPrefillTime] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  // On mobile, default to agenda view
  useEffect(() => {
    if (isMobile && view === 'week') setView('agenda')
  }, [isMobile, view])

  const byDate = useMemo(() => {
    const m: Record<string,CalEvent[]> = {}
    for (const e of events) { if (!m[e.date]) m[e.date]=[]; m[e.date]!.push(e) }
    return m
  }, [events])

  const goPrev = () => {
    if (view==='week')  setCursor(d=>addDays(d,-7))
    else if (view==='month') setCursor(d=>new Date(d.getFullYear(),d.getMonth()-1,1))
    else setCursor(d=>addDays(d,-1))
  }
  const goNext = () => {
    if (view==='week')  setCursor(d=>addDays(d,7))
    else if (view==='month') setCursor(d=>new Date(d.getFullYear(),d.getMonth()+1,1))
    else setCursor(d=>addDays(d,1))
  }
  const goToday = () => setCursor(new Date(today))

  const openNew = useCallback((date='', time='') => {
    setEditEntry(null); setPrefillDate(date||toYMD(today)); setPrefillTime(time); setShowModal(true)
  }, [today])
  const openEdit = useCallback((e: CalEvent) => {
    setEditEntry(e); setPrefillDate(e.date); setPrefillTime(e.startTime??''); setShowModal(true)
  }, [])
  const deleteEntry = useCallback(async (id: string) => {
    if (!confirm('Delete this event?')) return
    await fetch(`/api/admin/calendar/${id}`, { method:'DELETE' })
    router.refresh()
  }, [router])

  const weekStart = startOfWeek(cursor)
  const weekDays  = Array.from({length:7},(_,i)=>addDays(weekStart,i))

  const headerLabel = view==='week'
    ? `${weekStart.toLocaleDateString('en-GB',{month:'short',day:'numeric'})} – ${addDays(weekStart,6).toLocaleDateString('en-GB',{month:'short',day:'numeric',year:'numeric'})}`
    : view==='month'
    ? cursor.toLocaleDateString('en-GB',{month:'long',year:'numeric'})
    : cursor.toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long'})

  const eventProps = { byDate, onCellClick:(d:string,t:string)=>openNew(d,t), onEventClick:(e:CalEvent)=>e.entryId?openEdit(e):e.href?router.push(e.href):undefined, onDeleteEntry:deleteEntry, scrollRef }

  return (
    <div className="flex flex-1 overflow-hidden h-full">

      {/* ── DESKTOP SIDEBAR ──────────────────────────────────────────── */}
      <aside className={`
        flex-shrink-0 bg-[#1a1a18] text-white flex-col overflow-hidden
        hidden lg:flex
        w-[272px]
      `}>
        <SidebarContent today={today} cursor={cursor} byDate={byDate}
          onNewEvent={()=>openNew()} onSelectDay={d=>{setCursor(d);setView('day')}} />
      </aside>

      {/* ── MOBILE SIDEBAR DRAWER ────────────────────────────────────── */}
      {sideOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="absolute inset-0 bg-black/50" onClick={()=>setSideOpen(false)} />
          <aside className="relative w-[272px] bg-[#1a1a18] text-white flex flex-col overflow-hidden z-50">
            <button onClick={()=>setSideOpen(false)}
              className="absolute top-3 right-3 text-white/50 hover:text-white text-xl leading-none z-10">
              ✕
            </button>
            <SidebarContent today={today} cursor={cursor} byDate={byDate}
              onNewEvent={()=>{setSideOpen(false);openNew()}} onSelectDay={d=>{setSideOpen(false);setCursor(d);setView('day')}} />
          </aside>
        </div>
      )}

      {/* ── MAIN PANEL ───────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white min-w-0">

        {/* ── DESKTOP TOOLBAR ──────────────────────────────────────── */}
        <div className="hidden lg:flex items-center justify-between px-5 py-3 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-2">
            <NavBtn dir="prev" onClick={goPrev} />
            <button onClick={goToday}
              className="font-sans text-[0.75rem] font-medium text-[#2A5220] border border-[#2A5220]/40 px-3 py-1.5 hover:bg-[#2A5220]/5 transition-colors">
              Today
            </button>
            <NavBtn dir="next" onClick={goNext} />
            <span className="font-sans text-[0.9375rem] font-medium text-gray-800 ml-2">{headerLabel}</span>
          </div>
          <div className="flex border border-gray-200">
            {(['day','week','month','agenda'] as CalView[]).map(v=>(
              <button key={v} onClick={()=>setView(v)}
                className={`font-sans text-[0.6875rem] uppercase tracking-widest px-4 py-2 transition-colors capitalize ${
                  view===v ? 'bg-[#2A5220] text-white' : 'text-gray-500 hover:bg-gray-50'
                }`}>
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* ── MOBILE TOOLBAR ───────────────────────────────────────── */}
        <div className="lg:hidden flex-shrink-0">
          {/* Top bar */}
          <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100">
            <button onClick={()=>setSideOpen(true)}
              className="w-8 h-8 flex items-center justify-center text-gray-500">
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                <path d="M1 1h16M1 7h16M1 13h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            <div className="flex items-center gap-1 flex-1">
              <NavBtn dir="prev" onClick={goPrev} />
              <span className="font-sans text-[0.875rem] font-medium text-gray-800 flex-1 text-center truncate">
                {view==='agenda'
                  ? cursor.toLocaleDateString('en-GB',{month:'long',year:'numeric'})
                  : view==='month'
                  ? cursor.toLocaleDateString('en-GB',{month:'long',year:'numeric'})
                  : cursor.toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})}
              </span>
              <NavBtn dir="next" onClick={goNext} />
            </div>
            <button onClick={()=>openNew()}
              className="w-8 h-8 flex items-center justify-center bg-[#2A5220] text-white">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Mobile week day strip */}
          {(view==='day' || view==='agenda') && (
            <div className="flex border-b border-gray-100 bg-white">
              {Array.from({length:7},(_,i)=>addDays(startOfWeek(cursor),i)).map((d,i)=>{
                const ymd = toYMD(d)
                const isT = isSameDay(d,today)
                const isSel = isSameDay(d,cursor)
                const hasBiz = (byDate[ymd]??[]).some(e=>e.type==='booking'||e.type==='booking_pending'||e.type==='delivery')
                const hasPer = (byDate[ymd]??[]).some(e=>e.type==='personal'||e.type==='work'||e.type==='blocked')
                return (
                  <button key={i} onClick={()=>{setCursor(d);if(view!=='agenda')setView('day')}}
                    className="flex-1 flex flex-col items-center py-2 transition-colors">
                    <span className={`font-sans text-[0.5625rem] uppercase tracking-wide mb-1 ${isT?'text-[#2A5220] font-semibold':'text-gray-400'}`}>
                      {DAY_LETTER[i]}
                    </span>
                    <div className={`w-7 h-7 flex items-center justify-center ${isSel?'bg-[#2A5220] rounded-full':isT?'border border-[#2A5220] rounded-full':''}`}>
                      <span className={`font-sans text-[0.8125rem] font-medium ${isSel?'text-white':isT?'text-[#2A5220]':'text-gray-700'}`}>
                        {d.getDate()}
                      </span>
                    </div>
                    <div className="flex gap-0.5 mt-1 h-1.5">
                      {hasBiz && <div className="w-1 h-1 rounded-full bg-blue-400" />}
                      {hasPer && <div className="w-1 h-1 rounded-full bg-purple-400" />}
                    </div>
                  </button>
                )
              })}
            </div>
          )}

          {/* Mobile view tabs */}
          <div className="flex border-b border-gray-100">
            {(['agenda','day','month'] as CalView[]).map(v=>(
              <button key={v} onClick={()=>setView(v)}
                className={`flex-1 py-2 font-sans text-[0.625rem] uppercase tracking-widest transition-colors capitalize ${
                  view===v ? 'text-[#2A5220] border-b-2 border-[#2A5220] font-semibold' : 'text-gray-400'
                }`}>
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* ── CALENDAR BODY ────────────────────────────────────────── */}
        {view==='week'   && <WeekView   weekDays={weekDays} today={today} {...eventProps} />}
        {view==='month'  && <MonthView  cursor={cursor} today={today} onDayClick={d=>{setCursor(d);setView('day')}} {...eventProps} />}
        {view==='day'    && <DayView    day={cursor} today={today} {...eventProps} />}
        {view==='agenda' && <AgendaView cursor={cursor} today={today} byDate={byDate}
          onEventClick={(e)=>e.entryId?openEdit(e):e.href?router.push(e.href):undefined}
          onDayClick={d=>{setCursor(d);setView('day')}}
          onDeleteEntry={deleteEntry} />}
      </div>

      {/* ── EVENT MODAL ─────────────────────────────────────────────── */}
      {showModal && (
        <EventModal
          prefillDate={prefillDate} prefillTime={prefillTime}
          editEntry={editEntry}
          onClose={()=>setShowModal(false)}
          onSaved={()=>{setShowModal(false);router.refresh()}}
          onDeleted={()=>{setShowModal(false);router.refresh()}}
        />
      )}
    </div>
  )
}

// ─── Sidebar Content (shared desktop + drawer) ────────────────────────────────

function SidebarContent({ today, cursor, byDate, onNewEvent, onSelectDay }: {
  today:       Date
  cursor:      Date
  byDate:      Record<string,CalEvent[]>
  onNewEvent:  () => void
  onSelectDay: (d: Date) => void
}) {
  const [miniMonth, setMiniMonth] = useState(new Date(today.getFullYear(),today.getMonth(),1))

  const year=miniMonth.getFullYear(), month=miniMonth.getMonth()
  const first=new Date(year,month,1), pad=first.getDay(), total=new Date(year,month+1,0).getDate()
  const cells:Array<Date|null>=[...Array(pad).fill(null),...Array.from({length:total},(_,i)=>new Date(year,month,i+1))]
  while(cells.length%7!==0) cells.push(null)

  const agendaDays = useMemo(()=>{
    const days:Array<{date:Date;events:CalEvent[]}>=[]
    for(let i=-1;i<=30;i++){
      const d=addDays(today,i), ymd=toYMD(d)
      const evs=(byDate[ymd]??[]).sort((a,b)=>{
        if(!a.startTime&&!b.startTime)return 0
        if(!a.startTime)return 1; if(!b.startTime)return -1
        return timeToMins(a.startTime)-timeToMins(b.startTime)
      })
      if(evs.length>0||i>=0) days.push({date:d,events:evs})
      if(days.length>=15) break
    }
    return days
  },[byDate,today])

  return (
    <>
      <div className="px-4 pt-4 pb-3">
        <button onClick={onNewEvent}
          className="w-full flex items-center justify-center gap-2 bg-[#2A5220] hover:bg-[#1E3D17] text-white py-2.5 font-sans text-[0.6875rem] font-medium tracking-[0.15em] uppercase transition-colors">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          New Event
        </button>
      </div>

      {/* Mini calendar */}
      <div className="px-4 pb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="font-sans text-[0.75rem] font-medium text-white/80">
            {miniMonth.toLocaleDateString('en-GB',{month:'short',year:'numeric'})}
          </span>
          <div className="flex gap-1">
            {[[-1,'‹'],[1,'›']].map(([d,lbl])=>(
              <button key={lbl as string}
                onClick={()=>setMiniMonth(m=>new Date(m.getFullYear(),m.getMonth()+(d as number),1))}
                className="w-5 h-5 text-white/50 hover:text-white text-sm flex items-center justify-center">
                {lbl as string}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-7 mb-1">
          {DAY_LETTER.map((l,i)=>(
            <div key={i} className="text-center font-sans text-[0.5rem] text-white/30 py-0.5">{l}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-y-0.5">
          {cells.map((cell,i)=>{
            if(!cell) return <div key={i}/>
            const ymd=toYMD(cell), isT=isSameDay(cell,today)
            const hasBiz=(byDate[ymd]??[]).some(e=>e.type==='booking'||e.type==='booking_pending'||e.type==='delivery')
            const hasPer=(byDate[ymd]??[]).some(e=>e.type==='personal'||e.type==='work'||e.type==='blocked')
            return (
              <button key={i} onClick={()=>onSelectDay(cell)}
                className={`flex flex-col items-center py-0.5 rounded transition-colors ${isT?'bg-[#2A5220]':'hover:bg-white/10'}`}>
                <span className={`font-sans text-[0.6875rem] leading-none ${isT?'text-white font-medium':'text-white/70'}`}>
                  {cell.getDate()}
                </span>
                {(hasBiz||hasPer)&&(
                  <div className="flex gap-0.5 mt-0.5">
                    {hasBiz&&<div className="w-1 h-1 rounded-full bg-blue-400"/>}
                    {hasPer&&<div className="w-1 h-1 rounded-full bg-purple-400"/>}
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="px-4 py-2 border-t border-white/10">
        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
          {(Object.entries(TS) as [EventType,typeof TS[EventType]][]).map(([type,s])=>(
            <div key={type} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{backgroundColor:s.dot}}/>
              <span className="font-sans text-[0.5625rem] text-white/55">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Agenda */}
      <div className="flex-1 overflow-y-auto px-4 py-2 border-t border-white/10 space-y-3">
        {agendaDays.map(({date,events:evs})=>(
          <div key={toYMD(date)}>
            <p className={`font-sans text-[0.5625rem] uppercase tracking-widest mb-1 ${isSameDay(date,today)?'text-[#97C459] font-semibold':'text-white/35'}`}>
              {fmtDateLabel(date,today)}
            </p>
            {evs.length===0
              ? <p className="font-sans text-[0.625rem] text-white/20 italic">Free</p>
              : evs.map(ev=>(
                <div key={ev.id} className="flex items-start gap-2 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0" style={{backgroundColor:TS[ev.type].dot}}/>
                  <div className="flex-1 min-w-0">
                    {ev.startTime&&<p className="font-sans text-[0.5rem] text-white/35 leading-none mb-0.5">{fmtTime(ev.startTime)}</p>}
                    <p className="font-sans text-[0.625rem] text-white/75 truncate leading-snug">{ev.title}</p>
                  </div>
                </div>
              ))
            }
          </div>
        ))}
      </div>
    </>
  )
}

// ─── Nav button ───────────────────────────────────────────────────────────────

function NavBtn({dir,onClick}:{dir:'prev'|'next';onClick:()=>void}) {
  return (
    <button onClick={onClick}
      className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded transition-colors text-gray-500">
      <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
        <path d={dir==='prev'?'M5 1L1 5l4 4':'M1 1l4 4-4 4'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  )
}

// ─── Event Pill ───────────────────────────────────────────────────────────────

function EventPill({ev,onClick,onDelete,compact=false}:{ev:CalEvent;onClick:()=>void;onDelete:(id:string)=>void;compact?:boolean}) {
  const s=TS[ev.type]
  return (
    <div onClick={onClick} className="group relative cursor-pointer overflow-hidden"
      style={{backgroundColor:s.bg, borderLeft:`3px solid ${s.border}`, padding:compact?'2px 6px':'4px 7px', marginBottom:1}}>
      {ev.startTime&&!compact&&(
        <p className="font-sans leading-none mb-0.5" style={{fontSize:10,color:s.text,opacity:0.7}}>
          {fmtTime(ev.startTime)}{ev.endTime?` – ${fmtTime(ev.endTime)}`:''}
        </p>
      )}
      <p className="font-sans font-medium truncate leading-snug" style={{fontSize:compact?10:12,color:s.text}}>
        {ev.title}
      </p>
      {!compact&&ev.subtitle&&(
        <p className="font-sans truncate" style={{fontSize:10,color:s.text,opacity:0.6}}>{ev.subtitle}</p>
      )}
      {ev.entryId&&(
        <button onClick={e=>{e.stopPropagation();onDelete(ev.entryId!)}}
          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{color:s.text,lineHeight:1,fontSize:12}}>✕</button>
      )}
    </div>
  )
}

// ─── Shared time grid rows ────────────────────────────────────────────────────

function TimeGridRows() {
  return <>
    {Array.from({length:E_HOUR-S_HOUR},(_,i)=>(
      <div key={i} className="absolute left-0 right-0 border-t border-gray-100" style={{top:i*HOUR_H}}/>
    ))}
    {Array.from({length:E_HOUR-S_HOUR},(_,i)=>(
      <div key={`h${i}`} className="absolute left-0 right-0 border-t border-gray-50" style={{top:i*HOUR_H+HOUR_H/2}}/>
    ))}
  </>
}

function CurrentTimeLine({today,day}:{today:Date;day:Date}) {
  if(!isSameDay(day,today)) return null
  const now=new Date(), nowY=((now.getHours()+now.getMinutes()/60)-S_HOUR)*HOUR_H
  if(nowY<0||nowY>TOTAL_H) return null
  return (
    <div className="absolute left-0 right-0 flex items-center pointer-events-none" style={{top:nowY}}>
      <div className="w-2.5 h-2.5 rounded-full bg-red-500 -ml-1 flex-shrink-0"/>
      <div className="flex-1 border-t-2 border-red-500"/>
    </div>
  )
}

// ─── Week View ────────────────────────────────────────────────────────────────

function WeekView({weekDays,today,byDate,onCellClick,onEventClick,onDeleteEntry,scrollRef}:{
  weekDays:Date[];today:Date;byDate:Record<string,CalEvent[]>
  onCellClick:(d:string,t:string)=>void;onEventClick:(e:CalEvent)=>void
  onDeleteEntry:(id:string)=>void;scrollRef:React.RefObject<HTMLDivElement>
}) {
  const allDayByDay = weekDays.map(d=>(byDate[toYMD(d)]??[]).filter(e=>e.allDay||!e.startTime))
  const timedByDay  = weekDays.map(d=>(byDate[toYMD(d)]??[]).filter(e=>!e.allDay&&!!e.startTime))

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Day headers */}
      <div className="flex border-b border-gray-200 flex-shrink-0 bg-white">
        <div className="w-14 flex-shrink-0 border-r border-gray-100"/>
        {weekDays.map((day,i)=>{
          const isToday=isSameDay(day,today)
          return (
            <div key={i} className="flex-1 py-2 text-center border-l border-gray-100">
              <p className={`font-sans text-[0.5625rem] uppercase tracking-widest ${isToday?'text-[#2A5220]':'text-gray-400'}`}>
                {DAY_SHORT[day.getDay()]}
              </p>
              <div className={`mx-auto mt-0.5 w-8 h-8 flex items-center justify-center ${isToday?'bg-[#2A5220] rounded-full':''}`}>
                <span className={`font-sans text-[1rem] font-medium ${isToday?'text-white':'text-gray-700'}`}>
                  {day.getDate()}
                </span>
              </div>
              <div className="mt-1 px-0.5 space-y-0.5">
                {allDayByDay[i]!.map(ev=>(
                  <EventPill key={ev.id} ev={ev} compact onClick={()=>onEventClick(ev)} onDelete={onDeleteEntry}/>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Scrollable grid */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="flex" style={{height:TOTAL_H}}>
          <div className="w-14 flex-shrink-0 border-r border-gray-100 relative">
            {Array.from({length:E_HOUR-S_HOUR},(_,i)=>(
              <div key={i} className="absolute right-2 font-sans text-[0.5625rem] text-gray-400" style={{top:i*HOUR_H-6}}>
                {hourLabel(i+S_HOUR)}
              </div>
            ))}
          </div>
          {weekDays.map((day,di)=>{
            const ymd=toYMD(day), isT=isSameDay(day,today)
            return (
              <div key={di}
                className={`flex-1 border-l border-gray-100 relative cursor-pointer select-none ${isT?'bg-[#2A5220]/[0.015]':''}`}
                style={{height:TOTAL_H}}
                onClick={e=>{
                  const rect=(e.currentTarget as HTMLElement).getBoundingClientRect()
                  const mins=Math.round(((e.clientY-rect.top)/HOUR_H+S_HOUR)*60/15)*15
                  onCellClick(ymd,minsToTime(Math.min(Math.max(mins,S_HOUR*60),(E_HOUR-1)*60)))
                }}>
                <TimeGridRows/>
                <CurrentTimeLine today={today} day={day}/>
                {timedByDay[di]!.map(ev=>{
                  const startY=timeToY(ev.startTime!)
                  const eMins=ev.endTime?timeToMins(ev.endTime):timeToMins(ev.startTime!)+60
                  const h=Math.max(((eMins-timeToMins(ev.startTime!))/60)*HOUR_H,22)
                  if(startY<0||startY>TOTAL_H) return null
                  return (
                    <div key={ev.id} className="absolute left-0 right-1"
                      style={{top:startY,height:h}}
                      onClick={e=>{e.stopPropagation();onEventClick(ev)}}>
                      <EventPill ev={ev} onClick={()=>onEventClick(ev)} onDelete={onDeleteEntry}/>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─── Month View ───────────────────────────────────────────────────────────────

function MonthView({cursor,today,byDate,onDayClick,onEventClick}:{
  cursor:Date;today:Date;byDate:Record<string,CalEvent[]>
  onDayClick:(d:Date)=>void;onEventClick:(e:CalEvent)=>void
  // these extra props come from spread — ignore them
  onCellClick?:unknown;onDeleteEntry?:unknown;scrollRef?:unknown
}) {
  const year=cursor.getFullYear(), month=cursor.getMonth()
  const pad=new Date(year,month,1).getDay(), total=new Date(year,month+1,0).getDate()
  const cells=[...Array(pad).fill(null),...Array.from({length:total},(_,i)=>new Date(year,month,i+1))]
  while(cells.length%7!==0) cells.push(null)
  const weeks=Array.from({length:cells.length/7},(_,i)=>cells.slice(i*7,(i+1)*7))

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="grid grid-cols-7 border-b border-gray-200 flex-shrink-0">
        {DAY_SHORT.map(d=>(
          <div key={d} className="py-2 text-center font-sans text-[0.5625rem] uppercase tracking-widest text-gray-400">{d}</div>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto">
        {weeks.map((week,wi)=>(
          <div key={wi} className="grid grid-cols-7 border-b border-gray-100" style={{minHeight:90}}>
            {week.map((cell,di)=>{
              if(!cell) return <div key={di} className="border-r border-gray-50 bg-gray-50/30"/>
              const ymd=toYMD(cell), isT=isSameDay(cell,today), isOther=cell.getMonth()!==month
              const dayEvs=(byDate[ymd]??[]).slice(0,3), more=(byDate[ymd]??[]).length-3
              return (
                <div key={di}
                  className={`border-r border-gray-100 p-1 cursor-pointer hover:bg-gray-50 transition-colors ${isOther?'opacity-25':''}`}
                  onClick={()=>onDayClick(cell)}>
                  <div className={`w-6 h-6 flex items-center justify-center mb-1 ${isT?'bg-[#2A5220] rounded-full':''}`}>
                    <span className={`font-sans text-[0.75rem] font-medium ${isT?'text-white':'text-gray-600'}`}>{cell.getDate()}</span>
                  </div>
                  <div className="space-y-0.5">
                    {dayEvs.map(ev=>(
                      <div key={ev.id}
                        onClick={e=>{e.stopPropagation();onEventClick(ev)}}
                        className="px-1.5 py-0.5 truncate font-sans text-[0.5625rem] font-medium cursor-pointer"
                        style={{backgroundColor:TS[ev.type].bg,color:TS[ev.type].text,borderLeft:`2px solid ${TS[ev.type].border}`}}>
                        {ev.startTime?`${fmtTime(ev.startTime)} `:''}{ev.title}
                      </div>
                    ))}
                    {more>0&&<p className="font-sans text-[0.5rem] text-gray-400 pl-1">+{more} more</p>}
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

function DayView({day,today,byDate,onCellClick,onEventClick,onDeleteEntry,scrollRef}:{
  day:Date;today:Date;byDate:Record<string,CalEvent[]>
  onCellClick:(d:string,t:string)=>void;onEventClick:(e:CalEvent)=>void
  onDeleteEntry:(id:string)=>void;scrollRef:React.RefObject<HTMLDivElement>
}) {
  const ymd=toYMD(day), isT=isSameDay(day,today)
  const allDay=(byDate[ymd]??[]).filter(e=>e.allDay||!e.startTime)
  const timed=(byDate[ymd]??[]).filter(e=>!e.allDay&&!!e.startTime)
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Day header */}
      <div className={`py-3 px-6 border-b border-gray-200 flex-shrink-0 text-center ${isT?'bg-[#2A5220]/5':''}`}>
        <p className={`font-sans text-[0.5625rem] uppercase tracking-widest ${isT?'text-[#2A5220]':'text-gray-400'}`}>
          {day.toLocaleDateString('en-GB',{weekday:'long'})}
        </p>
        <div className={`mx-auto mt-0.5 w-10 h-10 flex items-center justify-center ${isT?'bg-[#2A5220] rounded-full':''}`}>
          <span className={`font-sans text-[1.5rem] font-medium ${isT?'text-white':'text-gray-700'}`}>{day.getDate()}</span>
        </div>
        <p className={`font-sans text-[0.6875rem] ${isT?'text-[#2A5220]':'text-gray-400'}`}>
          {day.toLocaleDateString('en-GB',{month:'long',year:'numeric'})}
        </p>
        {allDay.map(ev=><EventPill key={ev.id} ev={ev} compact onClick={()=>onEventClick(ev)} onDelete={onDeleteEntry}/>)}
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="flex" style={{height:TOTAL_H}}>
          <div className="w-14 flex-shrink-0 border-r border-gray-100 relative">
            {Array.from({length:E_HOUR-S_HOUR},(_,i)=>(
              <div key={i} className="absolute right-2 font-sans text-[0.5625rem] text-gray-400" style={{top:i*HOUR_H-6}}>
                {hourLabel(i+S_HOUR)}
              </div>
            ))}
          </div>
          <div className="flex-1 relative cursor-pointer select-none" style={{height:TOTAL_H}}
            onClick={e=>{
              const rect=(e.currentTarget as HTMLElement).getBoundingClientRect()
              const mins=Math.round(((e.clientY-rect.top)/HOUR_H+S_HOUR)*60/15)*15
              onCellClick(ymd,minsToTime(Math.min(Math.max(mins,S_HOUR*60),(E_HOUR-1)*60)))
            }}>
            <TimeGridRows/>
            <CurrentTimeLine today={today} day={day}/>
            {timed.map(ev=>{
              const sY=timeToY(ev.startTime!), eMins=ev.endTime?timeToMins(ev.endTime):timeToMins(ev.startTime!)+60
              const h=Math.max(((eMins-timeToMins(ev.startTime!))/60)*HOUR_H,22)
              return (
                <div key={ev.id} className="absolute left-0 right-2"
                  style={{top:sY,height:h}}
                  onClick={e=>{e.stopPropagation();onEventClick(ev)}}>
                  <EventPill ev={ev} onClick={()=>onEventClick(ev)} onDelete={onDeleteEntry}/>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Agenda View (mobile-first) ───────────────────────────────────────────────

function AgendaView({cursor,today,byDate,onEventClick,onDayClick,onDeleteEntry}:{
  cursor:Date;today:Date;byDate:Record<string,CalEvent[]>
  onEventClick:(e:CalEvent)=>void;onDayClick:(d:Date)=>void;onDeleteEntry:(id:string)=>void
}) {
  const days = useMemo(()=>{
    const result:Array<{date:Date;events:CalEvent[]}>=[]
    for(let i=-7;i<=60;i++){
      const d=addDays(cursor,i), ymd=toYMD(d)
      const evs=(byDate[ymd]??[]).sort((a,b)=>{
        if(!a.startTime&&!b.startTime) return 0
        if(!a.startTime) return 1; if(!b.startTime) return -1
        return timeToMins(a.startTime)-timeToMins(b.startTime)
      })
      result.push({date:d,events:evs})
    }
    return result
  },[cursor,byDate])

  return (
    <div className="flex-1 overflow-y-auto">
      {days.map(({date,events:evs})=>{
        const ymd=toYMD(date), isT=isSameDay(date,today)
        const isPast=date<today&&!isT
        return (
          <div key={ymd} className={`border-b border-gray-100 ${isPast?'opacity-50':''}`}>
            {/* Date row */}
            <button
              onClick={()=>onDayClick(date)}
              className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors ${isT?'bg-[#2A5220]/5':''}`}>
              <div className={`w-9 h-9 flex-shrink-0 flex flex-col items-center justify-center ${isT?'bg-[#2A5220] rounded-full':''}`}>
                <span className={`font-sans text-[0.5rem] uppercase leading-none ${isT?'text-white/70':'text-gray-400'}`}>
                  {DAY_SHORT[date.getDay()]}
                </span>
                <span className={`font-sans text-[1rem] font-semibold leading-none ${isT?'text-white':'text-gray-700'}`}>
                  {date.getDate()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <span className={`font-sans text-[0.75rem] font-medium ${isT?'text-[#2A5220]':'text-gray-500'}`}>
                  {fmtDateLabel(date,today)}
                </span>
                {evs.length===0&&(
                  <span className="font-sans text-[0.6875rem] text-gray-300 ml-2">No events</span>
                )}
              </div>
              {evs.length>0&&(
                <div className="flex gap-1">
                  {Array.from(new Set(evs.map(e=>e.type))).slice(0,3).map(t=>(
                    <div key={t} className="w-2 h-2 rounded-full" style={{backgroundColor:TS[t].dot}}/>
                  ))}
                </div>
              )}
            </button>
            {/* Events for this day */}
            {evs.map(ev=>(
              <div key={ev.id}
                onClick={()=>onEventClick(ev)}
                className="flex items-start gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer border-t border-gray-50 group">
                <div className="w-9 flex-shrink-0 text-right">
                  <span className="font-sans text-[0.625rem] text-gray-400">
                    {ev.startTime?fmtTime(ev.startTime):ev.allDay?'All day':''}
                  </span>
                </div>
                <div className="w-1 self-stretch rounded-full flex-shrink-0" style={{backgroundColor:TS[ev.type].border}}/>
                <div className="flex-1 min-w-0 pb-0.5">
                  <p className="font-sans text-[0.875rem] font-medium text-gray-800 leading-snug">{ev.title}</p>
                  {ev.subtitle&&<p className="font-sans text-[0.75rem] text-gray-400 truncate">{ev.subtitle}</p>}
                  {ev.endTime&&ev.startTime&&(
                    <p className="font-sans text-[0.625rem] text-gray-400">until {fmtTime(ev.endTime)}</p>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-sans text-[0.5625rem] uppercase tracking-wider px-1.5 py-0.5 rounded-full"
                    style={{backgroundColor:TS[ev.type].bg,color:TS[ev.type].text}}>
                    {TS[ev.type].label}
                  </span>
                  {ev.entryId&&(
                    <button onClick={e=>{e.stopPropagation();onDeleteEntry(ev.entryId!)}}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500 text-sm ml-1">
                      ✕
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}

// ─── Event Modal ──────────────────────────────────────────────────────────────

function EventModal({prefillDate,prefillTime,editEntry,onClose,onSaved,onDeleted}:{
  prefillDate:string;prefillTime:string;editEntry:CalEvent|null
  onClose:()=>void;onSaved:()=>void;onDeleted:()=>void
}) {
  const [title,setTitle]=useState(editEntry?.title??'')
  const [date,setDate]=useState(editEntry?.date??prefillDate)
  const [startTime,setStartTime]=useState(editEntry?.startTime??prefillTime)
  const [endTime,setEndTime]=useState(editEntry?.endTime??'')
  const [type,setType]=useState<'personal'|'work'|'blocked'>((editEntry?.type as 'personal'|'work'|'blocked')?? 'personal')
  const [notes,setNotes]=useState(editEntry?.subtitle??'')
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState('')

  async function save(){
    if(!title.trim()){setError('Title required');return}
    setLoading(true);setError('')
    try{
      const body={title:title.trim(),date,startTime:startTime||undefined,endTime:endTime||undefined,type,notes:notes||undefined}
      const url=editEntry?.entryId?`/api/admin/calendar/${editEntry.entryId}`:'/api/admin/calendar'
      const res=await fetch(url,{method:editEntry?.entryId?'PUT':'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})
      if(!res.ok) throw new Error()
      onSaved()
    }catch{setError('Something went wrong');setLoading(false)}
  }

  const IN='w-full border border-gray-200 px-3 py-2.5 font-sans text-[0.875rem] text-gray-800 bg-white focus:outline-none focus:border-[#2A5220] rounded-sm'
  const LB='block font-sans text-[0.625rem] uppercase tracking-widest text-gray-500 mb-1.5'

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}/>
      <div className="relative bg-white w-full max-w-sm sm:mx-4 shadow-2xl sm:rounded-sm overflow-hidden">
        <div className="bg-[#1a1a18] text-white px-5 py-4 flex items-center justify-between">
          <span className="font-sans text-[0.75rem] font-medium uppercase tracking-widest">
            {editEntry?'Edit Event':'New Event'}
          </span>
          <button onClick={onClose} className="text-white/50 hover:text-white text-xl leading-none">✕</button>
        </div>
        <div className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          <div>
            <label className={LB}>Title *</label>
            <input className={IN} value={title} onChange={e=>setTitle(e.target.value)}
              placeholder="e.g. School run, Meeting" autoFocus/>
          </div>
          <div>
            <label className={LB}>Type</label>
            <div className="flex gap-0 border border-gray-200">
              {(['personal','work','blocked'] as const).map(t=>(
                <button key={t} type="button" onClick={()=>setType(t)}
                  className="flex-1 py-2.5 font-sans text-[0.625rem] uppercase tracking-widest transition-colors capitalize"
                  style={type===t?{backgroundColor:TS[t].border,color:'white'}:{color:'#6B7280'}}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className={LB}>Date *</label>
            <input type="date" className={IN} value={date} onChange={e=>setDate(e.target.value)}/>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={LB}>Start</label>
              <input type="time" className={IN} value={startTime} onChange={e=>setStartTime(e.target.value)}/></div>
            <div><label className={LB}>End</label>
              <input type="time" className={IN} value={endTime} onChange={e=>setEndTime(e.target.value)}/></div>
          </div>
          <div>
            <label className={LB}>Notes</label>
            <textarea className={`${IN} resize-none`} rows={2} value={notes}
              onChange={e=>setNotes(e.target.value)} placeholder="Any notes…"/>
          </div>
          {error&&<p className="font-sans text-[0.8125rem] text-red-500">{error}</p>}
          <div className="flex gap-3 pt-1">
            <button onClick={save} disabled={loading}
              className="flex-1 bg-[#2A5220] text-white py-3 font-sans text-[0.75rem] font-medium tracking-[0.1em] uppercase hover:bg-[#1E3D17] transition-colors disabled:opacity-60">
              {loading?'Saving…':editEntry?'Update':'Save Event'}
            </button>
            {editEntry&&(
              <button onClick={async()=>{if(!editEntry.entryId||!confirm('Delete?'))return;await fetch(`/api/admin/calendar/${editEntry.entryId}`,{method:'DELETE'});onDeleted()}}
                className="px-4 py-3 border border-red-200 text-red-500 font-sans text-[0.75rem] uppercase tracking-widest hover:bg-red-50 transition-colors">
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
