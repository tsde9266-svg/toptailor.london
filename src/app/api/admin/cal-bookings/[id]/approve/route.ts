import { NextRequest, NextResponse } from 'next/server'
import { isAdmin } from '@/lib/auth'
import { getCalBooking, updateCalBooking } from '@/lib/kv'
import { sendMail } from '@/lib/mail'
import { notifyTelegram, escHtml } from '@/lib/telegram'
import { fmtBookingDate, fmt12h, bookingConfirmationWALink, BUSINESS_WHATSAPP } from '@/lib/greeting'

function confirmationEmail(name: string, startTime: string, endTime: string, location: string): string {
  const date   = fmtBookingDate(startTime)
  const start  = fmt12h(startTime)
  const end    = fmt12h(endTime)
  const safeName = escHtml(name)
  const safeLoc  = escHtml(location)

  return `
    <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#2C2C2C;background:#F5F0E8;padding:40px 32px;">
      <p style="font-family:sans-serif;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#888;margin-bottom:8px;">Fine Tailors</p>
      <h1 style="font-size:28px;font-weight:400;margin-bottom:8px;color:#2C2C2C;">Your Booking is Confirmed</h1>
      <p style="font-family:sans-serif;font-size:14px;color:#666;margin-bottom:32px;">Hi ${safeName}, your pick-up appointment with Fine Tailors has been confirmed.</p>

      <div style="background:#fff;border:1px solid #D9D3C3;padding:24px 28px;margin-bottom:28px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="font-family:sans-serif;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#888;padding-bottom:12px;width:90px;">Date</td>
            <td style="font-family:Georgia,serif;font-size:15px;color:#2C2C2C;text-align:right;padding-bottom:12px;">${date}</td>
          </tr>
          <tr>
            <td style="font-family:sans-serif;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#888;padding-bottom:${safeLoc ? '12px' : '0'};">Time</td>
            <td style="font-family:Georgia,serif;font-size:15px;color:#2C2C2C;text-align:right;padding-bottom:${safeLoc ? '12px' : '0'};">${start} – ${end}</td>
          </tr>
          ${safeLoc ? `
          <tr>
            <td style="font-family:sans-serif;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#888;">Location</td>
            <td style="font-family:sans-serif;font-size:13px;color:#444;text-align:right;">${safeLoc}</td>
          </tr>` : ''}
        </table>
      </div>

      <p style="font-family:sans-serif;font-size:13px;color:#444;margin-bottom:8px;">Please have your garments ready on the day.</p>
      <p style="font-family:sans-serif;font-size:13px;color:#444;margin-bottom:32px;">If you need to make any changes, please get in touch with us.</p>

      <a href="https://wa.me/${BUSINESS_WHATSAPP}" style="display:inline-block;background:#2A5220;color:#F5F0E8;text-decoration:none;padding:14px 32px;font-family:sans-serif;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:32px;">
        WhatsApp Us →
      </a>

      <p style="font-family:sans-serif;font-size:12px;color:#888;border-top:1px solid #D9D3C3;padding-top:24px;">
        Fine Tailors · London's finest tailors, at your door
      </p>
    </div>
  `
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const booking = await getCalBooking(params.id).catch(() => null)
  if (!booking) return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
  if (booking.status === 'cancelled') {
    return NextResponse.json({ error: 'Booking is cancelled' }, { status: 422 })
  }

  booking.status     = 'approved'
  booking.approvedAt = new Date().toISOString()
  await updateCalBooking(booking).catch(() => {})

  const waLink = booking.attendee.phone
    ? bookingConfirmationWALink(booking.attendee.phone, {
        startTime: booking.scheduledAt,
        endTime:   booking.endTime,
        location:  booking.location,
      })
    : null

  // Fire email + Telegram in background — don't block the response
  sendMail({
    to:      booking.attendee.email,
    subject: 'Your booking is confirmed — Fine Tailors',
    html:    confirmationEmail(
      booking.attendee.name,
      booking.scheduledAt,
      booking.endTime,
      booking.location,
    ),
    replyTo: 'tsde9266@gmail.com',
  }).then(() => {
    notifyTelegram(
      `✅ <b>Booking Approved</b> — ${escHtml(booking.attendee.name)}\nConfirmation email sent to ${escHtml(booking.attendee.email)}.`
    ).catch(() => {})
  }).catch((e) => {
    console.error('[cal-bookings/approve] email failed', e)
    notifyTelegram(
      `⚠️ <b>Booking Approved — EMAIL FAILED</b> — ${escHtml(booking.attendee.name)}\n${escHtml(e instanceof Error ? e.message : String(e))}`
    ).catch(() => {})
  })

  return NextResponse.json({ ok: true, waLink })
}
