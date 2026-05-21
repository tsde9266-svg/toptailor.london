You are working on a live production website: https://www.finetailors.co.uk
Phone: +44 7438 145169 | Custom-built site — NOT WordPress

STOP BEFORE EVERY CHANGE:
1. Read the file fully before editing
2. State what you'll change and why — wait for confirmation on anything structural
3. One change → verify in browser → next change
4. Never alter booking flow, forms, or payment logic
5. Never change existing URL slugs
6. After each task: what changed, which files, confirm nothing broken

═══════════════════════════════
BUSINESS BRIEF — READ FIRST
═══════════════════════════════

Fine Tailors collects garments from the customer's door, alters them, 
and returns them pressed and perfect in 5–7 days.
No tailor enters the home. No shop visit needed.
This is the USP. Every page must lead with it.

No physical address. No office. Service Area Business only.
NEVER add an address to schema, GBP, directories, or content.

COMPETITIVE LANDSCAPE (researched May 2025):
- Golden Tailoring (goldentailoring.co.uk): Physical shop near Piccadilly, 
  500+ reviews at 4.9★, same-day alterations. Cannot be beaten on speed 
  or proximity. Beat them on convenience, discretion, and no shop visit.
- Alterations Boutique (alterationsboutique.co.uk): 40+ years, 4 physical 
  branches, expanding. Strong authority from age and volume of pages.
- Online Tailors (onlinetailors.co.uk): Same collection model as Fine Tailors 
  but has 100+ location pages AND terrible Trustpilot reviews (customers 
  reporting no-shows, no refunds, ignored messages). This is Fine Tailors' 
  biggest opportunity — own the "reliable collection service" positioning 
  they are failing at.
- Alteration Yard (alterationyard.co.uk): Liverpool Street shop, ranking 
  well for "suit alterations london" with long-form service pages.

WHAT WINS IN 2025 FOR AN SAB WITH NO ADDRESS:
1. Review volume and recency — most important signal
2. Location page count and quality — number of indexed area pages
3. Service page depth — one page per service, not one page for all
4. Keyword signals inside reviews — reviews mentioning area names + services
5. Citation consistency — same name/phone across all directories
6. Website relevance signals matching GBP categories

═══════════════════════════════
CONTENT RULES — NON-NEGOTIABLE
═══════════════════════════════

Every piece of content must:
- Open with the collection model, not "we come to you" (that's what 
  Online Tailors says — and they're unreliable. Fine Tailors is different.)
- Name real streets and landmarks for that specific area
- Name the client type for that area (finance workers, creatives, 
  residents, professionals, hotel guests, etc.)
- Include real prices pulled from the homepage price list — read it first
- Sound written by a human who knows London
- Pass this test: would a Mayfair resident feel this was written for them?
- Never keyword stuff. If it sounds unnatural, rewrite it.
- End with one clear CTA — phone number or booking link

═══════════════════════════════
PHASE 1 — AUDIT EVERYTHING FIRST
═══════════════════════════════

TASK 1: FULL SITE AUDIT — REPORT BEFORE TOUCHING ANYTHING

Check and report on ALL of the following:

INDEXATION:
- Search site:finetailors.co.uk — how many pages indexed?
- List all indexed pages found

TECHNICAL:
- robots.txt — does it exist? Contents?
- sitemap.xml — exists? Valid? Submitted to Search Console?
- HTTPS — full site on HTTPS? Any mixed content warnings?
- Canonical tags — present on all pages?
- Any 404 errors on existing pages?
- Duplicate title tags across pages?

PERFORMANCE:
- Mobile PageSpeed score (Google PageSpeed Insights)
- Desktop PageSpeed score
- Core Web Vitals: LCP, CLS, INP values
- Largest image files on the site — are they WebP?

CONTENT:
- Which location pages exist? List URLs
- Which service pages exist? List URLs
- Does a blog exist? How many posts?
- Does an About page exist?
- Are there any pages with duplicate or near-identical content?
- Images missing alt tags — how many?

ON-PAGE:
- Homepage H1 — what is it currently?
- Homepage title tag — what is it currently?
- Homepage meta description — what is it currently?
- Do existing location pages have unique H1s and meta descriptions?
- Do existing location pages have LocalBusiness schema?

TRUST SIGNALS:
- Are there any Google reviews displayed on the site?
- Is there a testimonials section anywhere?
- Is there an About page with business history/credentials?

Report all findings. I will confirm before you proceed.

═══════════════════════════════
PHASE 2 — TECHNICAL FOUNDATION
═══════════════════════════════

TASK 2: robots.txt
Create or update:
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /checkout/
Disallow: /cart/
Disallow: /?s=
Sitemap: https://www.finetailors.co.uk/sitemap.xml

TASK 3: LocalBusiness SCHEMA — every page <head>
Do not overwrite existing schema — add alongside.
Fields:
- @type: LocalBusiness
- name: Fine Tailors
- telephone: +447438145169
- url: https://www.finetailors.co.uk
- NO address field — SAB, privacy protected
- priceRange: ££
- areaServed: all 20 Central London neighbourhoods listed below
- hasOfferCatalog: Suit Alterations, Dress Alterations, Trouser Alterations, 
  Bespoke Tailoring, Shirt Alterations, Wedding Dress Alterations, 
  Jacket Alterations, Coat Alterations, Leather Jacket Alterations
- GeoCircle: 51.5074 / -0.1278, radius 10000

After adding, validate at schema.org/SchemaValidator.

TASK 4: FAQ SCHEMA — homepage and all service pages
Add 5 questions per page. Must include:
1. How does the collection service work? (explain collect → alter → return)
2. Do you enter my home? (no — collection from door only)
3. How much do alterations cost? (use real prices from site)
4. How long does it take? (5–7 working days)
5. Which London areas do you cover? (full postcode list)

TASK 5: HOMEPAGE META TAGS
Title: Mobile Tailor Central London | Suit & Clothing Alterations | Fine Tailors
Description (155 chars max): London's collection-based tailoring service. We collect from your door in Mayfair, Westminster, Knightsbridge & all Central London postcodes — returned perfect in 5–7 days.
og:title: Mobile Tailor Central London | Fine Tailors
og:description: Expert suit alterations and bespoke tailoring collected from your Central London door. No shop visit, no stranger in your home. Returned pressed and perfect.
Keep existing canonical tag. Do not remove it.

TASK 6: IMAGE SEO
For every image missing an alt tag, add one.
Format: "[service type] in [area], Central London"
Examples:
- "Suit alteration service collected from Mayfair, Central London"
- "Professional dress alteration collected from Knightsbridge residence"
Add missing width and height attributes.
Convert any PNG or JPG hero images to WebP if file size exceeds 150KB.

═══════════════════════════════
PHASE 3 — TRUST & AUTHORITY
═══════════════════════════════
This is what separates position 5 from position 1.
Golden Tailoring has 500+ reviews. Online Tailors has terrible ones.
Fine Tailors needs to look like the trustworthy, premium alternative.

TASK 7: REVIEWS / SOCIAL PROOF SECTION
On the homepage, check if a reviews section exists.
If yes — read it and see if it can be improved.
If no — add a social proof section near the bottom of the homepage 
containing:
- A heading: "What Our London Clients Say"
- 5 placeholder review cards with structure:
  [Star rating] | [First name, area] | [Short quote about the service]
  Example: ⭐⭐⭐⭐⭐ | James, Mayfair | "Collected Monday morning, 
  back by Thursday perfectly altered. Couldn't be easier."
Note: these are placeholder structures. I will replace text with 
real reviews. Do not fabricate specific details.
- Under the section add text: "Leave us a review on Google →" 
  linking to [GOOGLE_REVIEW_LINK — I will fill this in]

TASK 8: ABOUT PAGE
Check if /about exists.
If yes — read it and report what's there before editing.
If no — create /about with:

H1: About Fine Tailors — London's Collection-Based Tailoring Service
Content must include:
- Who Fine Tailors is and what makes the service different
- The story of why the collection model exists 
  (convenience, discretion, high-value garments, busy London life)
- What types of garments are specialised in
- Credentials or experience signals (years operating, garments handled, 
  types of clients served — use real numbers if known, placeholders if not)
- Why collection-based is safer for luxury and delicate garments than 
  leaving them in a shop
- A "How It Works" summary (Book → Collect → Alter → Return)
- CTA with phone number

Add About page link to the main navigation if not already there.

TASK 9: TRUST SIGNALS IN FOOTER
Check the current footer.
Add if not present:
- Phone number: +44 7438 145169 (clickable tel: link)
- Service description: "Mobile Tailoring & Alterations — Central London"
- List of 5 primary areas served as text links to location pages
- Link to Privacy Policy (check if one exists — if not, flag to me)

═══════════════════════════════
PHASE 4 — LOCATION PAGES
═══════════════════════════════

TASK 10: AUDIT EXISTING LOCATION PAGES FIRST
Read each of these fully before doing anything:
/tailor-mayfair, /tailor-chelsea, /tailor-knightsbridge, 
/tailor-kensington, /tailor-belgravia, /tailor-city-of-london

For each, check:
- Is the content genuinely unique or templated with area name swapped?
- Does it mention real streets and landmarks for that area?
- Does it have its own LocalBusiness schema with areaServed = that area?
- Does it have a unique meta title and description?
- Does it link to at least 3 other pages?
- Does it show real prices?
- Does it have a testimonial or review specific to that area?

Report findings. Fix any templated or thin pages before creating new ones.

TASK 11: CREATE MISSING LOCATION PAGES
Read /tailor-mayfair structure first. Match it exactly.
Create in this order (highest volume first):

1. /tailor-westminster
2. /tailor-soho  
3. /tailor-covent-garden
4. /tailor-marylebone
5. /tailor-canary-wharf
6. /tailor-fitzrovia
7. /tailor-bloomsbury
8. /tailor-islington
9. /tailor-paddington
10. /tailor-pimlico
11. /tailor-notting-hill
12. /tailor-clerkenwell
13. /tailor-shoreditch

MANDATORY LOCAL SPECIFICS PER PAGE:
Do not just swap the area name. Each page must include real details:

Westminster: Whitehall, Parliament Square, Victoria Street, SW1A/SW1P, 
  civil servants, government workers, international business visitors, 
  hotel guests at The Goring and Conrad London St James

Soho: Dean Street, Wardour Street, Carnaby Street, W1F/W1D, 
  media industry, advertising agencies, creative professionals, 
  mix of menswear and womenswear, fashion-conscious clientele

Covent Garden: Long Acre, Seven Dials, WC2E, theatre district, 
  performers needing precise-fit stage clothes, production staff, 
  restaurant and hospitality workers needing smart uniforms

Marylebone: Harley Street, High Street, Welbeck Street, W1G/W1U, 
  medical consultants, private practice professionals, 
  Chiltern Street boutique area residents, discreet premium service

Canary Wharf: Canada Square, Bank Street, E14, finance sector workers, 
  Bloomberg, HSBC, Deutsche Bank, Barclays staff, suits as daily workwear 
  not occasion wear, need fast reliable service around work hours

Fitzrovia: Charlotte Street, Goodge Street, W1T/W1W, 
  media and advertising agencies, BT Tower area, 
  creative and digital sector professionals

Bloomsbury: Russell Square, Gower Street, WC1B/WC1N, 
  university and publishing sector, UCL and SOAS staff, 
  academics who value quality but want convenience

Islington: Upper Street, Angel, Essex Road, N1, 
  mixed professional and creative residents, 
  families needing alterations without a long commute

Paddington: Praed Street, W2, business travellers staying at hotels, 
  quick-turnaround needs, professionals transiting through London

Pimlico: Warwick Way, Tachbrook Street, SW1V, 
  residential neighbourhood, close to Westminster and Victoria, 
  quiet professional clientele

Notting Hill: Portobello Road, Westbourne Grove, W11, 
  affluent residents, boutique fashion area, 
  high-value garments needing specialist care

Clerkenwell: Exmouth Market, Farringdon Road, EC1R/EC1V, 
  design studios, architecture firms, creative industry

Shoreditch: Brick Lane, Old Street, Commercial Street, E1/EC2A, 
  tech sector, fashion-forward clientele, startup workers, 
  garments from independent brands alongside premium labels

STRUCTURE FOR EVERY LOCATION PAGE:
- Title: Tailor in [AREA] London | Collection Service | Fine Tailors
- Meta: Professional collection-based tailor in [AREA]. 
  We collect from your [AREA] home or office, alter, and return perfect 
  in 5–7 days. Expert suit, dress & clothing alterations. [postcode]
- H1: Mobile Tailor in [AREA], London — Collected From Your Door
- Opening para (100+ words): [area] context + client type + 
  why collection model suits this neighbourhood specifically
- Services with real prices from homepage
- How it works: Book → We Collect → We Alter → We Return
- One testimonial placeholder: [Name, area] — [service received]
- Nearby areas: links to 2–3 geographically neighbouring pages
  (use real London geography — Mayfair→Marylebone+Knightsbridge, 
  NOT Mayfair→Canary Wharf)
- FAQ: 2 questions specific to that area's client type
- CTA: phone number + booking link
- LocalBusiness schema with areaServed = that neighbourhood only

Add to sitemap after each page is created.

TASK 12: INTERNAL LINKING MESH
After all location pages exist, ensure:
- Homepage links to all location pages (or a dedicated "Areas We Cover" 
  section if one exists)
- Each location page links to homepage + 2 nearby areas + 1 service page
- Each service page links to 5 most relevant location pages
- Anchor text must be descriptive: "suit alterations in Mayfair" 
  not "click here" or "read more"

═══════════════════════════════
PHASE 5 — SERVICE PAGES
═══════════════════════════════

TASK 13: SERVICE PAGE AUDIT AND BUILD
Check each URL. If exists: read and improve. If not: create.

/services/suit-alterations-london
/services/dress-alterations-london
/services/trouser-alterations-london
/services/bespoke-tailoring-london
/services/shirt-alterations-london
/services/wedding-dress-alterations-london
/services/jacket-alterations-london
/services/coat-alterations-london
/services/leather-jacket-alterations-london
/services/same-day-alterations-london

STRUCTURE FOR EVERY SERVICE PAGE:
- Title: [Service] in London | Collected From Your Door | Fine Tailors
- 700+ words of genuine content explaining:
  * What this alteration involves technically
  * What kinds of garments it applies to
  * Why the collection model is better than taking it to a shop
    (especially for valuable/delicate items)
  * How to know if you need this alteration
  * Real prices from the homepage price list
  * Turnaround time
- Internal links to 5 most relevant location pages
- 1 testimonial placeholder from a relevant area
- FAQ schema: 3 questions specific to this service
- CTA with phone number

TASK 14: LUXURY BRAND PAGES
These keywords have near-zero competition and Mayfair/Knightsbridge 
clients search for them. Create only if they don't exist:

/services/canada-goose-alterations-london
/services/moncler-jacket-alterations-london
/services/barbour-alterations-london
/services/leather-jacket-alterations-london (if not already in task 13)

Content for each:
- 400+ words explaining why this brand's garments need specialist handling
- Why collection is safer (garment never sits in a shop)
- Collection and return process
- CTA with phone number
- Internal links to /tailor-mayfair and /tailor-knightsbridge
- Do NOT claim brand certification — use "experienced with" only

═══════════════════════════════
PHASE 6 — BLOG CONTENT
═══════════════════════════════

TASK 15: CHECK BLOG — THEN CREATE
First: does a blog section exist on the site?
If no: flag to me — ask before creating a whole new section.
If yes: check what posts already exist, then create missing ones.

POST PRIORITY ORDER:

1. "How Much Does a Tailor Cost in London in 2025?"
   Target: tailor cost london, alteration prices london
   1200+ words. Price table using Fine Tailors' real prices.
   Sections: trouser alterations, jacket alterations, dress alterations, 
   wedding dress, bespoke. Explain what affects price. End with CTA.

2. "Why a Collection-Based Tailor Beats a High Street Shop in London"
   Target: mobile tailor london, tailor that collects london
   1000+ words. This post directly targets searches by people who found 
   Online Tailors (unreliable) or generic mobile tailors and want better.
   Cover: no strangers in your home, your garments never sit in a shop 
   window, fixed collection slots, fully insured while in transit.

3. "Suit Alterations in Canary Wharf: A Guide for Finance Professionals"
   Target: tailor canary wharf, suit alterations E14
   900+ words. Target E14 finance workers who wear suits daily and 
   need reliable, fast service without leaving Canary Wharf to shop.

4. "The Complete Guide to Suit Alterations in London"
   Target: suit alterations london
   1500+ words. Comprehensive. Cover every type of suit alteration, 
   what each costs, how to know what you need, the process, 
   and why collection-based works for London professionals.

5. "Wedding Dress Alterations in London: Timeline and What to Expect"
   Target: wedding dress alterations london
   1200+ words. Timeline from purchase to wedding day, types of 
   alterations, why collection is safer for a delicate dress, costs.

FOR EVERY POST:
- Target keyword in: title, first sentence, one H2, conclusion
- 2 internal links to relevant service or location pages
- 1 image with descriptive alt text including keyword + location
- FAQ schema at bottom — minimum 3 questions
- Word count is a floor — write more if it genuinely helps the reader
- Do not pad. Every sentence must earn its place.

═══════════════════════════════
PHASE 7 — SITEMAP + FINAL
═══════════════════════════════

TASK 16: COMPLETE SITEMAP
Generate full sitemap.xml covering every page on the site.
Priorities:
- Homepage: 1.0
- Service pages: 0.9
- Location pages: 0.8
- Blog posts: 0.7
- About page: 0.6
- Other pages: 0.5
lastmod = today's date on all entries.
Give me the URL to submit in Google Search Console.

TASK 17: PERFORMANCE CHECK
After all tasks are complete:
- Run PageSpeed Insights on homepage again
- Compare score to audit baseline
- Flag any regressions
- Check LCP, CLS, INP values

TASK 18: FINAL DELIVERY REPORT
Provide a complete list of:
- Every file created
- Every file modified
- Every URL now live on the site
- Any broken links found
- Schema validation results
- Anything that still needs manual action from me

MANUAL ACTIONS LIST (things Claude Code cannot do — flag clearly):
- Google Business Profile: set up as SAB, no address, add all Central 
  London service areas, fill in description, add services with prices, 
  upload 10+ photos, post weekly
- Google Search Console: submit sitemap, check coverage report
- Google Analytics 4: set up conversion tracking (calls + form submits)
- Review requests: ask every customer after delivery
- Citation submissions: Bing Places, Apple Maps, Yell, Yelp UK, 
  Checkatrade, Thomson Local, Scoot, FreeIndex
- Backlink outreach: contact London lifestyle press about the 
  "no stranger in your home" tailoring angle — genuinely newsworthy