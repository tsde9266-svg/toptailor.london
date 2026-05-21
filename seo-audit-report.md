# Fine Tailors — Brutal SEO Audit & Dominance Plan
**Site:** https://www.finetailors.co.uk  
**Audit date:** 21 May 2026  
**Purpose:** Give Claude Code a complete, actionable picture of the site's SEO state so any future session can pick up and push toward position 1 for any tailoring search in Central London.

---

## CURRENT SITE INVENTORY (as of this audit)

### Pages live
**Location pages (21):**
- /tailor-mayfair, /tailor-chelsea, /tailor-knightsbridge, /tailor-kensington, /tailor-belgravia
- /tailor-city-of-london, /tailor-westminster, /tailor-marylebone, /tailor-notting-hill
- /tailor-south-kensington, /tailor-fulham, /tailor-islington, /tailor-soho
- /tailor-covent-garden, /tailor-canary-wharf, /tailor-fitzrovia, /tailor-bloomsbury
- /tailor-paddington, /tailor-pimlico, /tailor-clerkenwell, /tailor-shoreditch

**Service pages (14):**
- /suit-alterations-london, /dress-alterations-london, /clothing-alterations-london, /mobile-tailor-london
- /trouser-alterations-london, /jacket-alterations-london, /coat-alterations-london
- /shirt-alterations-london, /bespoke-tailoring-london, /wedding-dress-alterations-london
- /leather-jacket-alterations-london, /same-day-alterations-london
- /canada-goose-alterations-london, /moncler-jacket-alterations-london, /barbour-alterations-london

**Blog (11 posts):**
- /blog/complete-guide-suit-alterations-london
- /blog/suit-alterations-canary-wharf
- /blog/wedding-dress-alterations-london
- /blog/best-tailor-london
- /blog/suit-alteration-cost-london
- /blog/tailor-near-me-london
- /blog/master-tailor-home-visit-london
- /blog/how-door-to-door-tailoring-works-london
- /blog/suit-alterations-at-home-london
- /blog/why-mayfair-clients-choose-visiting-tailor
- /blog/difference-between-alterations-and-bespoke

**Other pages:**
- / (homepage), /about, /how-it-works, /get-started, /get-started/call
- /book, /terms, /privacy

---

## TECHNICAL SEO — CURRENT STATE

### PASS ✓
- **robots.txt:** Correct. Allows all, disallows /admin/ /checkout/ /cart/ /?s=. Sitemap URL present.
- **sitemap.xml:** Dynamic, covers all pages. Homepage 1.0, service 0.9, location 0.8–0.9, blog 0.7–0.85, about 0.6.
- **Canonical tags:** Present on all pages.
- **Schema — Layout-level:** LocalBusiness, Organization, WebSite schemas in layout.tsx (sitewide). Includes GeoCircle, serviceArea, hasOfferCatalog with all 9 service types, 20 neighbourhoods in areaServed.
- **Schema — Page-level:** BreadcrumbList on every page. Service schema on service pages. FAQPage on every location + service + home page. BlogPosting on all blog posts. AboutPage on /about.
- **Meta tags:** Unique title + description on all pages. OG tags on all pages.
- **Geo tags:** geo.region, geo.placename, geo.position, ICBM in <head>.
- **Mobile-first:** Next.js static pages — excellent mobile performance baseline.
- **HTTPS:** Yes (Vercel deployment with auto SSL).
- **Font loading:** Google Fonts with display:swap — no render-blocking.
- **Internal linking (as of May 2026):**
  - Homepage → all 21 location pages ✓
  - All 21 location pages → 3 nearby areas + 3 service pages ✓
  - Service pages → 3–5 location pages ✓
  - Blog posts → 2–3 internal links each ✓
  - Footer → 9 primary location pages (not all 21)

### FAIL / GAPS ✗

1. **No Google reviews displayed dynamically** — testimonials are placeholder text. Google uses review signals heavily for local ranking. This is the single biggest gap.

2. **Service pages link to only 3–4 location pages** — plan requires 5. The original suit-alterations-london and dress-alterations-london link to Mayfair, Chelsea, Knightsbridge, Westminster (4). Should be 5.

3. **No /locations/ hub page** — a consolidated "Areas We Cover" page with all 21 areas and their descriptions would capture "tailor near me" + "tailor central london" intent and provide a strong internal linking hub.

4. **No /services/ hub page** — same logic. A single /services/ page listing all alteration types with links would reinforce topical authority.

5. **Blog posts don't cross-link to location pages** — most blog posts link to 1–2 location pages max. Should link to 3–5 relevant ones.

6. **Images have alt text in code but no actual images** — the og-image.jpg is referenced but actual per-page images don't exist. Google image search = zero contribution currently.

7. **No FAQ schema on the /about page** — missed opportunity.

8. **Existing service pages (suit-alterations-london, dress-alterations-london) don't use Next.js `<Script>` with afterInteractive** — they use raw `<script>` tags. Minor, but inconsistent.

---

## CONTENT QUALITY AUDIT

### Homepage
- H1: "Mobile Tailor Central London" — strong
- Areas section: 21 areas correctly linked
- Reviews: Reviews component exists but pulls from KV store. If no real reviews stored, this renders empty.
- FAQ: 9 questions with full schema
- Schema: LocalBusiness + Organization + Website + FAQPage + HowTo + WebPage
- **WEAKNESS:** No explicit "no stranger in your home" headline above the fold. The USP is buried in body text.

### Location pages (sample: Mayfair)
- Unique content ✓ (real street names, landmarks, client types)
- LocalBusiness schema with area-specific areaServed ✓
- Area-specific FAQs ✓
- Nearby area links ✓
- Service links ✓ (added in this audit)
- Real prices ✓
- Testimonial placeholder ✓
- **WEAKNESS:** Testimonials are placeholder, not real reviews

### Service pages
- Suit alterations: Strong. 700+ words, HOW it works, location links, FAQ.
- New service pages (trouser, jacket, coat, shirt, bespoke, wedding dress, leather, same-day): Created May 2026. All have schema, FAQs, location links.
- **WEAKNESS:** Existing suit-alterations-london and dress-alterations-london reference "3–5 days" while location pages say "5–7 days" — inconsistency that should be resolved.

### Blog
- 11 posts, all with BlogPosting schema, breadcrumbs, internal links.
- The 3 new posts (May 2026) target high-value keywords: suit alterations canary wharf, complete guide suit alterations, wedding dress alterations.
- **WEAKNESS:** No featured images. Estimated word counts are good but no actual images = no image search signal.

---

## COMPETITIVE ANALYSIS

### Fine Tailors' unique position (THE ANGLE)

Every competitor in London tailoring falls into one of two categories:

**Category A — Physical shops:**
- Golden Tailoring (Piccadilly): 500+ reviews, 4.9★, same-day service. Their moat is speed and review volume. Fine Tailors cannot win on speed (collection adds time). **Win angle:** No shop visit, no trust required, no carrying garments across London.
- Alterations Boutique: 4 physical branches, 40+ years authority. Cannot compete on age. **Win angle:** One tailor, one point of contact, no shop queue.
- Alteration Yard: Liverpool Street shop, ranking for "suit alterations london". **Win angle:** They can't come to you.

**Category B — Online collection services:**
- Online Tailors (onlinetailors.co.uk): Same collection model but terrible reviews — no-shows, no refunds, ignored messages. This is the BIGGEST opportunity. Anyone searching for "collection tailor london" or "tailor that comes to your home london" has likely already found Online Tailors and is looking for a reliable alternative.

**The angle Fine Tailors is NOT exploiting hard enough on the site:**

1. **"Your garment never sits in a public shop"** — This is genuinely different from any physical-shop competitor. Expensive suits, luxury leather jackets, wedding dresses — none of them spend a week in a shop window where anyone can look. This should be on the homepage hero.

2. **"No stranger enters your home"** — Compared to mobile tailors who come in and set up at your kitchen table, Fine Tailors only comes to your door. This is a privacy and security differentiator for residents of high-end properties. It's mentioned in the FAQ but not featured prominently enough.

3. **"One tailor handles everything"** — The "Single Needle Guarantee" is mentioned in the Mayfair page but not consistently across all pages. This is a strong trust signal — your jacket goes to one person, not a production line of workers.

4. **"Garments insured while in transit"** — Mentioned in the seo-en.md plan but NOT on any page yet. This directly addresses the anxiety a customer has when handing a £1,500 suit to someone at the door.

---

## KEYWORD GAP ANALYSIS

### High-volume terms with no dedicated page
| Keyword | Monthly searches (est.) | Page needed |
|---------|------------------------|-------------|
| alterations near me london | High | /locations/ hub page |
| clothing alterations london | High | Covered by /clothing-alterations-london but thin |
| tailor comes to your home london | Medium | /mobile-tailor-london partially covers this |
| pressing service london | Low | Not targeted |
| clothing repairs london | Medium | No dedicated page |
| seamstress london | Medium | Not targeted |
| emergency alterations london | Medium | /same-day-alterations-london covers this |
| alterations london prices | Medium | /blog/suit-alteration-cost-london covers partially |

### Geographic gaps
All major Central London areas covered. The following remain untargeted:
- /tailor-victoria (SW1E — distinct enough from Westminster)
- /tailor-hampstead (NW3 — affluent, out-of-area but worth checking if coverable)
- /tailor-hackney (E8 — creative, adjacent to Shoreditch clientele)
- /tailor-greenwich (SE10 — long shot)

### Long-tail gaps
- "Canada Goose sleeve shortening london" — covered by /canada-goose-alterations-london
- "Moncler alterations london" — covered
- "Barbour alterations london" — covered
- "suit alteration cost Mayfair" — not targeted but /tailor-mayfair + /blog/suit-alteration-cost-london together cover this
- "tailor to come to house london" — not directly targeted, /mobile-tailor-london closest

---

## PRIORITY ACTION LIST FOR NEXT CLAUDE CODE SESSION

### CRITICAL (do first, highest ranking impact):

**1. Add real Google reviews to the Reviews component**
The Reviews component reads from a KV store. Someone needs to seed real Google reviews into the KV. This requires:
- Getting actual Google Business Profile reviews via API or manual entry
- Seeding them via the /api/reviews endpoint or directly into KV
- Without this, the reviews section is empty for real users and adds zero trust signal

**2. Fix turnaround time inconsistency**
- suit-alterations-london and dress-alterations-london say "3–5 days"
- All location pages and FAQ say "5–7 days"
- Pick one and make it consistent sitewide. Recommend "5–7 working days" (more honest, less likely to cause complaints)

**3. Add "insurance in transit" to service pages and location pages**
In each service page's intro section, add: "All garments are fully insured while in our care and in transit between your door and our workshop."
This is a direct objection-killer for the "handing my £800 suit to a stranger" anxiety.

**4. Add "no stranger in your home" as a prominent standalone section**
On the homepage, add a section (between Hero and Services, or between Services and HowItWorks):
- Heading: "Your Garments Never Leave Our Care"
- 3 bullet points: No tailor enters your home / Insured in transit / One tailor handles everything / Returns to your door pressed

**5. Fix service pages to link to 5 location pages (currently 3–4)**
- /suit-alterations-london: add /tailor-canary-wharf and /tailor-islington
- /dress-alterations-london: read and check, add 2 more location links

### HIGH VALUE (next batch):

**6. Create /locations/ hub page**
URL: /locations
H1: "Areas We Cover — Collection Tailoring Across Central London"
Content: list of all 21 areas with 2-sentence description each, map of coverage area concept (can be text), link to each location page. This page should also link to the Google Business Profile.
Schema: LocalBusiness with full areaServed list (already in layout but repeat here for emphasis).

**7. Create /services/ hub page**
URL: /services
H1: "Tailoring & Alteration Services — Collected From Your London Door"
List all 14 service pages with brief descriptions and links. Internal linking hub.

**8. Strengthen the "Single Needle Guarantee" — use it on every page**
Currently only on the Mayfair page body. Add it to every location page's opening section as a badge/callout: "Single Needle Guarantee — one tailor handles your garments from collection to return."

**9. Add blog links to service pages**
- /suit-alterations-london → link to /blog/complete-guide-suit-alterations-london
- /wedding-dress-alterations-london → link to /blog/wedding-dress-alterations-london
- /trouser-alterations-london → link to /blog/suit-alteration-cost-london

**10. Update Footer to list all service pages**
Currently footer only shows location pages. Add a "SERVICES" column:
- Suit Alterations
- Dress Alterations
- Trouser Alterations
- Jacket Alterations
- Wedding Dress Alterations
- Leather Jacket Alterations
- Same Day Alterations

### MEDIUM VALUE:

**11. Create 3 more blog posts targeting remaining keyword gaps:**
- "How to Know If Your Suit Needs Altering" (targets informational searches before buying intent)
- "The Best Way to Get Your Clothes Altered in London Without Visiting a Shop" (directly positions against Online Tailors)
- "Leather Jacket Alterations in London: What to Expect" (supports the Canada Goose / Moncler / Barbour pages)

**12. Add /tailor-victoria page**
Victoria is adjacent to Westminster and Pimlico but has enough search intent of its own. Many hotels and government workers are in SW1E.

**13. Add Schema to /clothing-alterations-london and /mobile-tailor-london**
Check if these have full schema (Service + BreadcrumbList + FAQ). If not, add.

**14. Image SEO**
- Create a proper og-image.jpg that shows the collection model (door, garment bag)
- Add page-specific og images for service pages (each showing the service type)
- Add a real hero image to the homepage with descriptive alt text

---

## TASK 17 — PERFORMANCE BASELINE

PageSpeed Insights must be run manually at: https://pagespeed.web.dev/

**Expected performance indicators based on code review:**
- Next.js static generation (○) for all pages = good LCP baseline
- No large render-blocking resources (fonts use display:swap)
- Google Fonts are loaded — these add ~200ms on first load
- No large images identified in codebase (og-image.jpg is 1200x630 — check file size)
- Clarity analytics script loads afterInteractive — correct

**Run PageSpeed on these URLs and note scores:**
1. https://www.finetailors.co.uk (homepage)
2. https://www.finetailors.co.uk/suit-alterations-london (service page)
3. https://www.finetailors.co.uk/tailor-mayfair (location page)

**Target scores:** Mobile 85+, Desktop 95+. If below 85 on mobile, check:
- Images not in WebP format
- Render-blocking resources
- Unused JavaScript
- CLS issues (layout shift from dynamic content)

---

## TASK 18 — FINAL DELIVERY REPORT

### Files created in this SEO build (Phases 1–7)

**New service pages:**
- src/app/trouser-alterations-london/page.tsx
- src/app/jacket-alterations-london/page.tsx
- src/app/coat-alterations-london/page.tsx
- src/app/shirt-alterations-london/page.tsx
- src/app/bespoke-tailoring-london/page.tsx
- src/app/wedding-dress-alterations-london/page.tsx
- src/app/leather-jacket-alterations-london/page.tsx
- src/app/same-day-alterations-london/page.tsx
- src/app/canada-goose-alterations-london/page.tsx
- src/app/moncler-jacket-alterations-london/page.tsx
- src/app/barbour-alterations-london/page.tsx

**New location pages (created in previous sessions):**
- src/app/tailor-covent-garden/page.tsx
- src/app/tailor-canary-wharf/page.tsx
- src/app/tailor-fitzrovia/page.tsx
- src/app/tailor-bloomsbury/page.tsx
- src/app/tailor-paddington/page.tsx
- src/app/tailor-pimlico/page.tsx
- src/app/tailor-clerkenwell/page.tsx
- src/app/tailor-shoreditch/page.tsx
- src/app/about/page.tsx

**New blog posts:**
- src/app/blog/suit-alterations-canary-wharf/page.tsx
- src/app/blog/complete-guide-suit-alterations-london/page.tsx
- src/app/blog/wedding-dress-alterations-london/page.tsx

### Files modified in this SEO build

- src/app/page.tsx — added 9 missing areas to homepage Areas section
- src/app/sitemap.ts — added all new service pages, luxury brand pages, new blog posts
- src/app/tailor-mayfair/page.tsx — added service links in CTA
- src/app/tailor-chelsea/page.tsx — added service links in CTA
- src/app/tailor-knightsbridge/page.tsx — added service links in CTA
- src/app/tailor-kensington/page.tsx — added service links in CTA
- src/app/tailor-belgravia/page.tsx — added service links in CTA
- src/app/tailor-city-of-london/page.tsx — added service links in CTA
- src/app/tailor-westminster/page.tsx — added service links in CTA
- src/app/tailor-marylebone/page.tsx — added service links in CTA
- src/app/tailor-notting-hill/page.tsx — added service links in CTA
- src/app/tailor-south-kensington/page.tsx — added service links in CTA
- src/app/tailor-fulham/page.tsx — added service links in CTA
- src/app/tailor-islington/page.tsx — added service links in CTA
- src/app/tailor-soho/page.tsx — added service links in CTA
- src/app/tailor-fitzrovia/page.tsx — added service links in CTA
- src/app/tailor-bloomsbury/page.tsx — added service links in CTA (previously untracked)
- src/app/tailor-paddington/page.tsx — added service links in CTA (previously untracked)
- src/app/tailor-pimlico/page.tsx — added service links in CTA (previously untracked)
- src/app/tailor-clerkenwell/page.tsx — added service links in CTA (previously untracked)
- src/app/tailor-shoreditch/page.tsx — added service links in CTA (previously untracked)
- src/app/tailor-covent-garden/page.tsx — added service links in CTA (previously untracked)
- src/app/tailor-canary-wharf/page.tsx — added service links in CTA (previously untracked)
- src/app/blog/page.tsx — added 3 new posts to index
- public/robots.txt — verified correct (no changes needed)

### Manual actions still required (cannot be done by Claude Code)

**URGENT:**
1. **Google Search Console** — Submit sitemap: https://www.finetailors.co.uk/sitemap.xml. Check Coverage report for any indexing errors.
2. **Google Business Profile** — Ensure set up as Service Area Business (no address). Add all 21 service areas. Add all 9 service types with descriptions and prices. Upload 10+ photos. Fill in business description using the collection model as the USP.
3. **Real reviews** — Request a review from every customer after delivery. The /api/reviews endpoint or KV store needs to be seeded with real Google reviews via the admin interface.

**HIGH PRIORITY:**
4. **Bing Places** — Set up as SAB mirror of GBP.
5. **Apple Maps** — Business Connect listing.
6. **Yell, Yelp UK, Checkatrade, Thomson Local** — Citation submissions for NAP consistency.
7. **Google Analytics 4** — Set up conversion events: call button clicks, booking form submissions, WhatsApp button clicks.

**MEDIUM PRIORITY:**
8. **PageSpeed Insights** — Run on homepage and 2 sample pages. Target mobile 85+.
9. **Schema Validator** — Test homepage at schema.org/schemaValidator. Verify LocalBusiness, FAQPage, HowTo all validate.

---

## THE COMPETITIVE DIFFERENTIATION — HOW TO USE IT

Every page on the site should make this argument without saying it directly:

> "Every other London tailor either requires you to go to a shop (friction, time, carrying garments) or sends someone into your home (privacy concern, trust issue). Fine Tailors is the only service that collects from your door without entering, never leaves your garment in a public space, and returns it to your exact address. For residents of W1, SW1, SW3 and SW7, this is the obvious choice."

This argument is currently made, but it's buried in body copy. It should be:
- **In the H1 or immediately below it on the homepage** ("Collected From Your Door. Never From a Shop.")
- **In the meta description on every location page**
- **In the first paragraph of every service page**
- **In the FAQ Q8** (what makes Fine Tailors different) — currently good, keep it

The competitors you can beat WITHOUT having 500 reviews:
- Any physical shop (convenience argument wins for the right customer)
- Online Tailors (reliability argument wins — their Trustpilot is damning)

The competitor you cannot beat on:
- Golden Tailoring on speed (same-day vs 5–7 days — don't compete here, lean into "worth the wait, done right")
- Review volume in the short term (build this over 6–12 months)
