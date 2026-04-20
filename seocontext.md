# Claude Code SEO Prompt — The Door Tailor
# Copy everything below this line and paste into Claude Code

My Next.js 14 App Router website for "The Door Tailor" already exists and is deployed. Do NOT rebuild from scratch. Upgrade and extend the existing codebase for maximum SEO performance. Keep the existing design system: Playfair Display (headings), DM Sans (body), hunter green #2A5220, parchment #F5F0E8, charcoal #1C1C1A. Do not change any visual design unless explicitly stated.

---

## 1. UPGRADE EXISTING FILES

### src/app/layout.tsx
Add or fix the following — do not remove anything already working:

ts
export const metadata: Metadata = {
  metadataBase: new URL('https://www.thedoortailor.co.uk'),
  title: {
    template: '%s | The Door Tailor',
    default: "London's Premium Door-to-Door Tailor | The Door Tailor",
  },
  description: 'The Door Tailor visits your home in Mayfair, Chelsea, Knightsbridge & central London. Expert tailoring & alterations with 10+ years experience. Book your home visit today.',
  keywords: ['door to door tailor London', 'tailor home visit London', 'clothing alterations at home', 'Mayfair tailor', 'Chelsea tailor', 'central London tailor', 'suit alterations home visit'],
  authors: [{ name: 'The Door Tailor' }],
  creator: 'The Door Tailor',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://www.thedoortailor.co.uk',
    siteName: 'The Door Tailor',
    title: "London's Premium Door-to-Door Tailor",
    description: 'Expert tailoring & alterations at your home in Mayfair, Chelsea, Knightsbridge & central London. 10+ years experience.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'The Door Tailor — Premium door-to-door tailoring in central London' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "London's Premium Door-to-Door Tailor | The Door Tailor",
    description: 'Expert tailoring at your home in Mayfair, Chelsea & central London.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.thedoortailor.co.uk',
  },
  verification: {
    google: 'REPLACE_WITH_GOOGLE_VERIFICATION_CODE',
  },
};


In the <head> section add:
html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
<link rel="preload" as="image" href="/hero.jpg" />
<link rel="manifest" href="/manifest.json" />


Inject this JSON-LD as a <Script id="schema-local-business" type="application/ld+json"> tag inside <body> using next/script strategy="afterInteractive":

json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "The Door Tailor",
  "url": "https://www.thedoortailor.co.uk",
  "telephone": "+44-XXXX-XXXXXX",
  "priceRange": "££££",
  "description": "Premium door-to-door tailoring and alterations service visiting homes across central London with 10+ years of experience.",
  "image": "https://www.thedoortailor.co.uk/og-image.jpg",
  "areaServed": ["Mayfair", "Chelsea", "Knightsbridge", "Kensington", "Belgravia", "City of London", "Marylebone", "Fitzrovia"],
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": { "@type": "GeoCoordinates", "latitude": 51.5074, "longitude": -0.1278 },
    "geoRadius": "5000"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Tailoring Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Suit Alterations at Home" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Dress Alterations Home Visit" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Garment Collection and Return" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bespoke Fitting at Your Door" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Trouser Hemming at Home" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Wedding Dress Alterations London" } }
    ]
  },
  "foundingDate": "2014",
  "sameAs": [
    "https://www.instagram.com/thedoortailor",
    "https://www.facebook.com/thedoortailor"
  ]
}


---

### src/app/page.tsx (homepage) — upgrade existing sections, do not redesign

- Ensure H1 is exactly: *"London's Premium Door-to-Door Tailor"* — one H1 only on the page
- H2s must be: "How It Works" / "Our Services" / "Areas We Visit" / "Why Choose The Door Tailor" / "Frequently Asked Questions"
- H3s used for individual service names, area names, FAQ questions
- Natural keyword placement throughout existing copy (do not stuff):
  - "door-to-door tailor London" — 2 times
  - "tailor home visit London" — 2 times
  - "clothing alterations at home" — 2 times
  - "Mayfair tailor" — 1 time
  - "Chelsea tailor" — 1 time
  - "central London tailor" — 3 times
- Add an "Areas We Visit" section with cards/links for all 6 location pages
- Add the FAQ component (built in step 4) to the bottom of the homepage
- Add FAQPage JSON-LD script on this page (see step 4 for Q&As)
- Add SpeakableSpecification schema pointing to the H1 and first paragraph

---

### All images site-wide
- Convert every <img> tag to next/image
- Every image must have a descriptive, keyword-rich alt e.g.:
  - Hero: "Expert tailor visiting client home in Mayfair London"
  - About: "Professional door-to-door tailor with 10 years experience in central London"
  - Services: "Suit alterations at home in Chelsea London"
- Add explicit width and height on every image to prevent layout shift
- Hero image: loading="eager" fetchPriority="high"
- All other images: loading="lazy"
- Use WebP where possible

---

### Footer — extend existing footer
Add text links (do not change footer design, just add to existing link list):
- Tailor in Mayfair → /tailor-mayfair
- Tailor in Chelsea → /tailor-chelsea
- Tailor in Knightsbridge → /tailor-knightsbridge
- Tailor in Kensington → /tailor-kensington
- Tailor in Belgravia → /tailor-belgravia
- Tailor in City of London → /tailor-city-of-london

Add this line of text to footer: "Service Area: Mayfair, Chelsea, Knightsbridge, Kensington, Belgravia, City of London, Central London, UK"

---

### src/app/sitemap.ts — regenerate completely

ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.thedoortailor.co.uk'
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${base}/services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/book`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/tailor-mayfair`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/tailor-chelsea`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/tailor-knightsbridge`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/tailor-kensington`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/tailor-belgravia`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/tailor-city-of-london`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/blog/how-door-to-door-tailoring-works-london`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/blog/suit-alterations-at-home-london`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/blog/why-mayfair-clients-choose-visiting-tailor`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/blog/difference-between-alterations-and-bespoke`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]
}


---

### public/robots.txt — create this file


User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/

Sitemap: https://www.thedoortailor.co.uk/sitemap.xml


---

### public/manifest.json — create this file

json
{
  "name": "The Door Tailor",
  "short_name": "Door Tailor",
  "description": "Premium door-to-door tailoring in central London",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#F5F0E8",
  "theme_color": "#2A5220",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}


---

## 2. CREATE 6 LOCATION PAGES

Create src/app/tailor-[area]/page.tsx for each area. Match existing site design exactly.

For each area (mayfair, chelsea, knightsbridge, kensington, belgravia, city-of-london):

*Metadata:*
ts
export const metadata: Metadata = {
  title: 'Tailor in [Area], London | Home Visits | The Door Tailor',
  description: 'The Door Tailor visits your home in [Area], London. Expert suit & dress alterations at your door. 10+ years experience. Book your [Area] home visit today.',
  alternates: { canonical: 'https://www.thedoortailor.co.uk/tailor-[area]' },
  openGraph: { title: 'Tailor in [Area], London | The Door Tailor', url: 'https://www.thedoortailor.co.uk/tailor-[area]' }
}


*Page structure:*
- H1: "Your Personal Tailor in [Area], London"
- H2: "Tailoring at Your [Area] Home"
- H2: "Services Available in [Area]"
- H2: "How It Works in [Area]"
- H2: "Frequently Asked Questions — [Area]"
- H2: "Book a Home Visit in [Area]"

*Content rules:*
- 350+ words unique per page
- Mention area name naturally 5–7 times
- Mention at least 2 adjacent areas by name (cross-linking opportunity)
- Include specific detail about that area (e.g. Mayfair = Grosvenor Square residents, Chelsea = King's Road, Knightsbridge = Harrods/Harvey Nichols proximity)
- 1 image with alt: "Tailor visiting client home in [Area] London"

*JSON-LD on each location page:*

BreadcrumbList:
json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.thedoortailor.co.uk" },
    { "@type": "ListItem", "position": 2, "name": "Tailor in [Area]", "item": "https://www.thedoortailor.co.uk/tailor-[area]" }
  ]
}


LocalBusiness with areaServed: "[Area]"

FAQPage with 4 area-specific Q&As (rendered via FAQ component).

*Internal links on each location page:*
- "← Back to home" → /
- "Book a visit" → /book
- Links to 2 nearest area pages with anchor: "Tailor in [Adjacent Area]"

---

## 3. CREATE BLOG

### src/app/blog/page.tsx — blog index

ts
export const metadata: Metadata = {
  title: 'Tailoring Advice & London Style Guide | The Door Tailor Blog',
  description: 'Expert tailoring advice, London style guides, and tips on clothing alterations at home from The Door Tailor.',
  alternates: { canonical: 'https://www.thedoortailor.co.uk/blog' },
}


Display all 4 posts as cards: title, excerpt, read time, date, link.
BreadcrumbList schema: Home → Blog.

---

### 4 Blog Posts — create as static pages in src/app/blog/[slug]/page.tsx

Write full content inline (not MDX), 650–800 words each, no filler.

---

*POST 1*
Slug: how-door-to-door-tailoring-works-london
Title: "How Door-to-Door Tailoring Works in London"
Meta description: "Discover how The Door Tailor's door-to-door tailoring service works in London. We visit your home, collect your garments and return them perfectly altered."
Target keyword: "door to door tailor London"

Content outline:
- Intro: The problem with traditional tailors (travel, time, carrying garments)
- Step 1: You book a home visit — we come to you in Mayfair, Chelsea or anywhere in central London
- Step 2: We assess garments at your door, take measurements, advise on alterations
- Step 3: We collect your clothes — no dropping off required
- Step 4: Expert alterations completed in our workspace
- Step 5: We return garments perfect to your door
- Why London professionals choose this service
- Closing CTA: "Book your home visit today"
- Internal links: /tailor-mayfair, /tailor-chelsea, /book
- Article JSON-LD schema

---

*POST 2*
Slug: suit-alterations-at-home-london
Title: "Suit Alterations at Home: What to Expect in London"
Meta description: "Everything you need to know about suit alterations at home in London. The Door Tailor visits Knightsbridge, Kensington & central London."
Target keyword: "suit alterations home visit London"

Content outline:
- Why suit fit matters and why shop alterations are inconvenient
- What we assess at your home fitting: shoulders, chest, waist, trouser break, sleeve length
- Common suit alterations: taking in/letting out waist, shortening sleeves, tapering trousers
- How long alterations take (3–5 days standard, express available)
- What to wear/bring ready for the home visit
- Designer and luxury suit experience
- Closing CTA
- Internal links: /tailor-knightsbridge, /tailor-kensington, /book
- Article JSON-LD schema

---

*POST 3*
Slug: why-mayfair-clients-choose-visiting-tailor
Title: "Why Mayfair Clients Choose a Visiting Tailor"
Meta description: "Mayfair residents choose The Door Tailor for premium tailoring at home. Discover why London's most discerning clients prefer a visiting tailor."
Target keyword: "tailor Mayfair home visit"

Content outline:
- The Mayfair lifestyle: time is the premium luxury
- Privacy and discretion — no public changing rooms
- The convenience of a tailor who knows Mayfair addresses
- Quality comparison: visiting master tailor vs. high-street chain
- What Mayfair clients typically need: suit alterations, occasion wear, wardrobe overhauls
- Testimonial-style paragraph (write in 3rd person, no fake names)
- The Door Tailor's 10+ years serving central London
- Closing CTA
- Internal links: /tailor-mayfair, /tailor-chelsea, /book
- Article JSON-LD schema

---

*POST 4*
Slug: difference-between-alterations-and-bespoke
Title: "The Difference Between Alterations and Bespoke Tailoring"
Meta description: "Not sure whether you need alterations or bespoke tailoring? The Door Tailor explains the difference and helps you choose the right service in London."
Target keyword: "clothing alterations London"

Content outline:
- Definition: alterations = adjusting existing garments; bespoke = made from scratch
- When you need alterations: off-the-rack suit that almost fits, weight change, inherited garment, occasion wear
- When you need bespoke: nothing fits your body shape, special occasion, investment piece
- The overlap: how expert alterations can make off-the-rack feel bespoke
- Price comparison: alterations from £X, bespoke from £X (leave as £X, client fills in)
- The Door Tailor does both — at your door
- Closing CTA
- Internal links: /services, /book
- Article JSON-LD schema

---

## 4. FAQ COMPONENT

Create src/components/FAQ.tsx

Build as an accessible accordion using existing design tokens. Each item: question as H3, answer expands on click. No external libraries needed — use React useState.

Use these 8 Q&As everywhere (homepage + all location pages):

1. *Do you come to my home?*
   Yes — The Door Tailor visits your home, apartment or office anywhere in central London including Mayfair, Chelsea, Knightsbridge and Kensington. You never need to travel to us.

2. *Which areas do you cover?*
   We cover all central London postcodes including W1, SW1, SW3, EC1, WC1, WC2, W8 and SW7. If you're unsure whether we cover your address, just get in touch.

3. *How do I book a home visit?*
   Contact us by phone or the booking form. We agree a convenient time, visit your home, assess your garments, collect them and return everything perfectly altered — usually within 3–5 days.

4. *How much experience do you have?*
   Over 10 years of professional tailoring experience working with clients across central London, handling everything from everyday alterations to luxury designer garments.

5. *What alterations can you do at home?*
   Suit alterations, dress and occasion wear, trouser hemming, waist adjustments, jacket resizing, sleeve shortening, zip replacements, and all clothing repairs — completed at the highest standard.

6. *How long do alterations take?*
   Most alterations are returned within 3–5 days. An express 24–48 hour service is available for urgent requirements — just let us know when booking.

7. *Do you work with designer and luxury garments?*
   Yes. We regularly work with luxury and designer pieces including suits, gowns and occasion wear, handling each garment with the care and expertise it deserves.

8. *What makes The Door Tailor different from a shop?*
   We come to you. No travelling across London, no waiting rooms, no carrying garments on public transport. One dedicated tailor handles your clothes from collection to return.

Render this FAQ component:
- On the homepage (below the services section)
- On every location page (before the CTA)
- Include FAQPage + Question + AcceptedAnswer JSON-LD as a <Script> tag on each page it appears

---

## 5. FINAL CHECKS — run before finishing

- [ ] Zero duplicate meta descriptions across all pages
- [ ] Every page has exactly one H1
- [ ] All internal links use descriptive anchor text (never "click here" or "read more")
- [ ] All <img> converted to next/image
- [ ] Sitemap includes every new route
- [ ] robots.txt references correct sitemap URL
- [ ] No TypeScript errors (check types on all new metadata exports)
- [ ] JSON-LD validated mentally — all required fields present
- [ ] Footer links to all 6 location pages
- [ ] Blog index links to all 4 posts
- [ ] Every blog post links to at least one location page and /book

---

## REPLACE BEFORE GOING LIVE
- +44-XXXX-XXXXXX → your real phone number
- REPLACE_WITH_GOOGLE_VERIFICATION_CODE → from Google Search Console
- Blog post prices marked £X → your real pricing
- "foundingDate": "2014" → your real start year
- Instagram/Facebook URLs → your real handles
- /og-image.jpg, /hero.jpg, /icon-192.png, /icon-512.png → your real image files