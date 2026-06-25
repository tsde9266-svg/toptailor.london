# WhatsApp Booking System — Plan & Continuity Doc
_Last updated: 2026-06-25_

## Problem Summary

Current painful workflow:
1. Customer messages on WhatsApp
2. Assistant has conversation to collect: service type, address, preferred time slot
3. Assistant manually writes notes
4. Notes sent to tailor
5. Tailor reads through notes to find info
6. Nothing is connected to the admin system

Breaks down at scale because:
- Every booking = a new note-writing + forwarding task for the assistant
- Tailor has no organised view of their day (digs through WhatsApp/notes)
- No single source of truth — customer details scattered across notes
- Returning customers have to re-provide address/details every time

Key constraint: **Do NOT force customers to fill forms** — human WhatsApp touch is intentional and kept.
Cal.com is no longer used.

---

## Existing System (what's already built)

- Next.js app on Vercel, Redis via Upstash (env: KV_REST_API_URL / KV_REST_API_TOKEN)
- Telegram bot for admin notifications (env: TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID)
- `src/lib/kv.ts` — all data types and Redis functions
- `src/lib/telegram.ts` — `notifyTelegram()` + `escHtml()`
- `src/lib/greeting.ts` — WhatsApp link builders (wa.me links)
- Admin panel at `/admin` with: Orders, Invoices, Bookings, Calendar, Deliveries, Customers, Consultations, Inquiries, Book Visits, POS
- Existing data types in kv.ts: Order, CalBooking, Consultation, QuickInquiry, BookVisit, Delivery, CalEntry, Invoice, Voucher
- `CalBooking` has status flow: pending → awaiting_customer → approved → cancelled (was for Cal.com, now unused)

---

## Proposed System — 3 Components

### Component 1: Quick-Log Form `/admin/quick-book`
**Purpose:** Assistant fills this (~45 seconds) right after WhatsApp chat ends. Replaces note-writing entirely.

**Form fields:**
- Phone number (first) → auto-searches existing customers → pulls name + address instantly for returning customers
- Name (pre-filled for returning)
- Full address + postcode (pre-filled for returning, just confirm)
- Service selection — large tap buttons (not dropdown): Suit & Jacket, Trousers, Dress/Skirt, Wedding, Leather, Mending, Other — multi-select
- Date picker — shows existing calendar alongside so assistant can see if tailor is busy
- Time slot (start + end)
- Short notes (optional)

**On submit:**
1. New `WhatsAppBooking` record saved to Redis
2. Calendar entry auto-created in the admin calendar
3. Telegram fires to tailor with: name, phone (tap to WhatsApp), full address, Google Maps link, services, time, notes
4. Booking appears in Schedule view

### Component 2: Schedule View `/admin/schedule`
**Purpose:** Tailor's primary view of their day. Replaces notes/WhatsApp searching entirely.

**What it shows:**
- Default: Today's bookings sorted by time
- Toggle: Tomorrow / This Week
- Each card: customer name + phone (tap to WhatsApp), full address, Google Maps link, services (tags), time window, notes, status (Upcoming / Done)

**Tailor's morning:** Open `/admin/schedule` → see full day → tap Maps on first address → go.

### Component 3: Returning Customer Auto-fill
**Purpose:** For repeat customers, assistant entry drops to ~20 seconds.

When assistant types a phone number in Quick-Log:
- System searches across orders, invoices, previous bookings
- Auto-fills: name, address, postcode
- Shows last 3 services as quick-add buttons
- Shows any preference notes (e.g. "prefers morning", "pay on day")

---

## New Workflow (after build)

**Before:** WhatsApp chat → notes (5 min) → send to tailor → tailor reads → questions → chaos

**After:**
1. WhatsApp chat with customer, agree on slot (unchanged, human touch kept)
2. Assistant opens `/admin/quick-book` → fills 6 fields → 45 seconds → submit
3. Tailor gets Telegram: "New booking — John Smith · 47 Belgrave Sq SW1 · [Maps] · Mon 2–3pm · Suit jacket + trousers · [WhatsApp link]"
4. Tailor checks `/admin/schedule` on the day — everything organised

---

## What This Does NOT Require

- No WhatsApp Business API (no Meta verification, no Twilio cost)
- No new third-party services
- Runs entirely on existing Vercel + Redis + Telegram stack

---

## Build Order

| Step | What | Effort |
|------|------|--------|
| 1 | Add `WhatsAppBooking` type + KV functions to `src/lib/kv.ts` | 30 min |
| 2 | API route `POST /api/admin/whatsapp-bookings` | 1–2 hours |
| 3 | `/admin/quick-book` page (the form) | 1 day |
| 4 | Telegram notification on booking log | 2 hours (uses existing telegram.ts) |
| 5 | `/admin/schedule` view | 1 day |
| 6 | Returning customer auto-fill (phone lookup API) | 1 day |

**Total: ~3–4 days of focused work**

---

## Future (not yet — only when volume justifies it)

- Travel distance calculation per booking (Google Maps Distance Matrix API)
- Drag-to-reorder bookings within a day for optimal travel routing
- WhatsApp Business API auto-intake (Twilio / 360dialog) — only needed at 100+ bookings/month

---

## Files to Create/Modify

- `src/lib/kv.ts` — add WhatsAppBooking type and CRUD functions
- `src/app/api/admin/whatsapp-bookings/route.ts` — new
- `src/app/api/admin/whatsapp-bookings/[id]/route.ts` — new (update/delete)
- `src/app/api/admin/customers/search/route.ts` — new (phone lookup for auto-fill)
- `src/app/admin/quick-book/page.tsx` — new
- `src/app/admin/schedule/page.tsx` — new
- `src/app/admin/page.tsx` — add "Quick Book" and "Schedule" links to nav

---

## Status

- [ ] Step 1: WhatsAppBooking type in kv.ts
- [ ] Step 2: API route
- [ ] Step 3: Quick-book form page
- [ ] Step 4: Telegram notification
- [ ] Step 5: Schedule view
- [ ] Step 6: Returning customer auto-fill
