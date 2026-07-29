import { NextRequest, NextResponse } from 'next/server'
import { isAdmin } from '@/lib/auth'
import { getCalBooking, updateCalBooking, type CalBookingSlot } from '@/lib/kv'
import { proposeTimesWALink, customerFollowUpLink, fmtSlotDate, fmtSlotTime } from '@/lib/greeting'
import { notifyTelegram, escHtml } from '@/lib/telegram'
import { sendMail } from '@/lib/mail'

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  let body: Record<string, unknown>
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const rawSlots  = (body.slots ?? []) as Array<{ date: string; startTime: string; endTime: string }>
  const adminNote = String(body.adminNote ?? '').trim()

  if (!rawSlots.length) {
    return NextResponse.json({ error: 'At least one slot is required' }, { status: 422 })
  }

  const slots: CalBookingSlot[] = rawSlots
    .filter(s => s.date && s.startTime && s.endTime)
    .map(s => ({
      start: `${s.date}T${s.startTime}`,
      end:   `${s.date}T${s.endTime}`,
    }))

  if (!slots.length) {
    return NextResponse.json({ error: 'No valid slots provided' }, { status: 422 })
  }

  const booking = await getCalBooking(params.id).catch(() => null)
  if (!booking) return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
  if (booking.status === 'cancelled') {
    return NextResponse.json({ error: 'Booking is cancelled' }, { status: 422 })
  }

  booking.status        = 'awaiting_customer'
  booking.proposedTimes = slots
  booking.adminNote     = adminNote || undefined

  // "reply only" — safe to send here IF the customer already messaged us on
  // WhatsApp. It must never be the only channel, since this booking may have
  // come from Cal.com's calendar UI with no prior WhatsApp contact at all.
  const waLink = booking.attendee.phone
    ? proposeTimesWALink(booking.attendee.phone, {
        name:      booking.attendee.name,
        slots,
        adminNote: adminNote || undefined,
      })
    : null

  const slotSummary = slots.map((s, i) =>
    `${i + 1}. ${fmtSlotDate(s.start)}, ${fmtSlotTime(s.start)} – ${fmtSlotTime(s.end)}`
  ).join('\n')

  // Email is the compliant default — it's the only channel guaranteed to
  // reach a customer who has never messaged us on WhatsApp.
  let emailSent = true
  let emailError: string | undefined
  if (booking.attendee.email) {
    const followUp = customerFollowUpLink('booking time change', booking.attendee.name)
    try {
      await sendMail({
        to:      booking.attendee.email,
        subject: 'Alternative times for your booking — Fine Tailors',
        text:
          `Hi ${booking.attendee.name},\n\n` +
          `Unfortunately we're unable to confirm your original appointment time. Here are some alternatives:\n\n` +
          `${slotSummary}\n\n` +
          (adminNote ? `${adminNote}\n\n` : '') +
          `Please reply to this email with your preferred option, or message us on WhatsApp here: ${followUp}\n\n` +
          `Fine Tailors`,
      })
    } catch (e) {
      emailSent = false
      emailError = e instanceof Error ? e.message : String(e)
    }
  } else {
    emailSent = false
    emailError = 'No email on file for this customer'
  }

  await Promise.allSettled([
    updateCalBooking(booking),
    notifyTelegram(
      `📋 <b>Alternative slots proposed</b> — ${escHtml(booking.attendee.name)}\n\n` +
      `${slotSummary}\n\n` +
      (emailSent
        ? `Emailed to the customer. Waiting for their reply.\n`
        : `⚠️ <b>Email failed</b> (${escHtml(emailError ?? '')}) — no automatic notification reached the customer.\n`) +
      `⚠️ <i>Only use WhatsApp below if they've already messaged you — this booking may have no prior WhatsApp contact.</i>`,
      waLink ? [[{ text: '💬 WhatsApp (reply only)', url: waLink }]] : undefined,
    ),
  ])

  return NextResponse.json({ ok: true, waLink, emailSent, emailError })
}
