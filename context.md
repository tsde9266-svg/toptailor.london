
# Top Tailor — Claude Code Project Context

## Project overview
Premium personal tailoring website. One sole practitioner,
central London, door-to-door service. Not a company.

## File structure
top-tailor/
├── CONTEXT.md          ← this file
├── desktop.html        ← Stitch export, desktop design reference
├── mobile.html         ← Stitch export, mobile design reference
├── public/
│   └── video/
│       └── craft.mp4   ← place your video here before build
└── src/
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx        ← desktop homepage
    │   └── book/
    │       └── page.tsx    ← booking page
    ├── components/
    │   ├── Navbar.tsx
    │   ├── Hero.tsx        ← video hero, both versions
    │   ├── Services.tsx
    │   ├── HowItWorks.tsx
    │   ├── About.tsx
    │   ├── Reviews.tsx
    │   ├── BookingForm.tsx
    │   ├── Footer.tsx
    │   └── StickyBar.tsx   ← mobile only, appears after hero
    └── styles/
        └── globals.css

## Which file is which
desktop.html = reference for screens ≥ 1024px
mobile.html  = reference for screens < 768px
Tablet (768–1023px): split the difference — single column
layout from mobile, larger text sizes from desktop. No new
design decisions needed, just scale proportionally.

## Tech stack
- Next.js 14 App Router
- Tailwind CSS
- Google Fonts: Playfair Display + DM Sans
- Cal.com embed on /book page
- Deployment: Vercel

## Colours — Tailwind custom tokens (add to tailwind.config.ts)
parchment:    '#F5F0E8'
hunter:       '#2A5220'
forest:       '#3B6D11'
sage:         '#EAF0E2'
charcoal:     '#1C1C1A'
muted:        '#5C5C52'
divider:      '#C4B99A'
green-soft:   '#A8C490'
green-bright: '#97C459'
placeholder:  '#B4B099'

## Typography rules
- Playfair Display: logo, all h1/h2/h3, service names,
  step numbers, review quotes, blockquotes, footer logo
- DM Sans: everything else
- Nav links: DM Sans 500, uppercase, tracking-widest, 10px
- Section eyebrows: DM Sans 500, uppercase, tracking-[0.3em], 9px
- Body: DM Sans 300, 13px, leading-[1.85]
- Buttons: DM Sans 500, uppercase, tracking-[0.2em], 10–11px

## Design rules — never break these
- All dividers: 1px solid #C4B99A — horizontal between
  sections, vertical between two-column splits on desktop
- Buttons: background #2A5220, text #F5F0E8, border-radius 0
  (sharp corners — never rounded, never pill shape)
- No card boxes with four-sided borders — only top-border
  row dividers in the services list
- No drop shadows anywhere
- No gradients anywhere
- No icons on desktop except the single needle SVG divider
- Mobile icons: thin single-weight SVG, stroke #2A5220,
  stroke-width 0.8, fill none, 28×28px

## Video hero — critical implementation
Desktop: video in the RIGHT column of the split hero
Mobile:  video is the FULL BACKGROUND of the hero (100vh)
Both:    <video autoplay muted loop playsinline>
         autoplay + muted + playsinline are ALL required
         for iOS Safari — missing any one breaks it
Video source: /video/craft.mp4
Fallback: if video fails to load, show bg colour #1A1A18
Overlay desktop: rgba(0,0,0,0.18) flat overlay on video
Overlay mobile:  gradient rgba(0,0,0,0.05) top →
                 rgba(0,0,0,0.82) bottom

## Sticky booking bar (mobile only)
Component: StickyBar.tsx
Behaviour: hidden until hero CTA scrolls out of viewport.
           Use IntersectionObserver on the hero CTA button.
           When CTA leaves viewport → bar slides up into view.
Position: sticky bottom-0, z-index 50
Design: bg #2A5220, height 52px, two elements:
        left — "Ready to book?" DM Sans 500 uppercase 9px
                color rgba(197,221,151,0.7)
        right — "Schedule a Collection →" DM Sans 500 11px
                #F5F0E8, arrow → in #97C459
Animation: translateY(100% → 0) opacity 0→1 over 0.3s

## Animations — implement exactly
Hero load sequence (both desktop and mobile):
  1. Eyebrow: opacity 0→1, translateY(10px→0), 0.5s, delay 0.2s
  2. H1 lines: each word translateY(100%→0) from clip mask,
     cubic-bezier(0.16,1,0.3,1), 0.7s, staggered 160ms per line
  3. Subtext: opacity 0→1, translateY(16px→0), 0.6s, delay 0.5s
  4. Button: opacity 0→1, 0.5s, delay 0.7s

Scroll reveals (IntersectionObserver, threshold 0.12):
  All sections: translateY(20px→0) + opacity 0→1, 0.6s ease
  Service rows: stagger 60ms desktop / 50ms mobile
  Step items:   stagger 120ms desktop / 100ms mobile
  Review cards: stagger 100ms desktop / 80ms mobile

Hover (desktop only):
  Service name: color → #2A5220, 200ms
  Service underline: width 0→100%, 1px solid #3B6D11, 300ms
  CTA buttons: #2A5220 → #1E3D17, 200ms
  Form inputs: border-bottom-color → #2A5220 on focus, 200ms

## Pages
/ — homepage (all sections, long scroll)
/book — booking page with Cal.com embed, same nav + footer

## Booking form fields (exact order)
Name + Phone (two-column row on desktop, stacked on mobile)
Email
Service dropdown — options:
  Suit & Jacket Alterations
  Trouser Tailoring
  Dress & Skirt Alterations
  Shirt & Blouse Tailoring
  Wedding & Occasion Wear
  Leather & Specialist Fabric
  Invisible Mending
  Zip, Button & Clasp Repairs
  Wardrobe Refresh
  Something else / not sure
Preferred day + Postcode (two-column row on desktop,
  stacked on mobile)
Notes textarea (3 rows)
Submit button: "Send my request →"
Note below: "We typically respond within a few hours.
  No payment is taken at this stage."

## Needle SVG — desktop only, paste exactly
<svg width="48" height="20" viewBox="0 0 48 20" fill="none">
  <line x1="0" y1="10" x2="16" y2="10"
        stroke="#C4B99A" stroke-width="0.8"/>
  <ellipse cx="20" cy="10" rx="3" ry="6"
        stroke="#C4B99A" stroke-width="0.8" fill="none"/>
  <line x1="23" y1="10" x2="44" y2="1"
        stroke="#C4B99A" stroke-width="0.8"/>
  <line x1="44" y1="1" x2="48" y2="19"
        stroke="#C4B99A" stroke-width="0.8"/>
</svg>
Place between services section and how-it-works section.
Centred in a full-width row with a 1px #C4B99A line either
side. Opacity 0.6.

## Content rules — hard constraints
- Zero prices anywhere on the site
- No business address, no map, no shop location
- No payment widget of any kind
- No trust badges, press strips, or accreditation logos
- No carousel or slider
- No popups or chat widgets
- Every CTA button says exactly: "Schedule a Collection"
- One person — never "our team" or "our experts"

## First message to send Claude Code
"I have desktop.html and mobile.html as design references,
and CONTEXT.md with all specs. Build the Top Tailor website
exactly as specified. Use desktop.html for ≥1024px,
mobile.html for <768px, and scale proportionally for tablet.
Start with: tailwind.config.ts colour tokens, globals.css
fonts, then layout.tsx, then build each component in order.
Ask me before making any decision not covered in CONTEXT.md."