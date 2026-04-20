/**
 * /book — dedicated booking page with Cal.com inline embed.
 *
 * Replace "yourusername/30min" below with your actual Cal.com link.
 * The embed is loaded via a Script tag with afterInteractive strategy.
 */
import Script from 'next/script'
import Navbar  from '@/components/Navbar'
import Footer  from '@/components/Footer'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book a Collection — Top Tailor',
  description:
    'Schedule your door-to-door tailoring collection in central London. Choose a convenient time — we come to your home or office, no travel needed.',
  openGraph: {
    title: 'Book a Collection — Top Tailor',
    description:
      'Schedule your door-to-door tailoring collection in central London. We come to your home or office.',
    url: 'https://toptailor.london/book',
    images: [
      {
        url: '/images/tailor.jpg',
        width: 1200,
        height: 630,
        alt: 'Book a tailoring collection — Top Tailor London',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book a Collection — Top Tailor',
    description:
      'Schedule your door-to-door tailoring collection in central London.',
    images: ['/images/tailor.jpg'],
  },
  alternates: {
    canonical: 'https://toptailor.london/book',
  },
}

const bookSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://toptailor.london/book#webpage',
      url: 'https://toptailor.london/book',
      name: 'Book a Collection — Top Tailor',
      description:
        'Schedule your door-to-door tailoring collection in central London. Choose a convenient time — we come to your home or office.',
      isPartOf: { '@id': 'https://toptailor.london/#website' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://toptailor.london' },
          { '@type': 'ListItem', position: 2, name: 'Book a Collection', item: 'https://toptailor.london/book' },
        ],
      },
    },
  ],
}

export default function BookPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSchema) }}
      />
      <Navbar solid />

      <main className="pt-[57px] lg:pt-[65px] min-h-screen bg-parchment">
        {/* Page heading */}
        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <span className="font-sans text-[9px] font-medium uppercase tracking-[0.3em] text-muted block mb-4">
            STEP ONE
          </span>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium">
            Schedule <br />
            <em className="font-playfair italic">your Collection.</em>
          </h1>
          <p className="font-sans font-light text-[1.0625rem] text-muted mt-6 max-w-sm leading-relaxed">
            Choose a time that works for you. We come to your door — bring
            nothing but your garments.
          </p>
        </div>

        {/* Cal.com inline embed */}
        <div
          id="cal-inline"
          className="w-full"
          style={{ minHeight: '700px' }}
        />

        {/* Cal.com embed script — replace calLink with your actual link */}
        <Script
          id="cal-embed"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function (C, A, L) {
                let p = function (a, ar) { a.q.push(ar); };
                let d = C.document;
                C.Cal = C.Cal || function () {
                  let cal = C.Cal;
                  let ar = arguments;
                  if (!cal.loaded) {
                    cal.ns = {};
                    cal.q = cal.q || [];
                    d.head.appendChild(d.createElement("script")).src = A;
                    cal.loaded = true;
                  }
                  if (ar[0] === L) {
                    const api = function () { p(api, arguments); };
                    const namespace = ar[1];
                    api.q = api.q || [];
                    if (typeof namespace === "string") {
                      cal.ns[namespace] = cal.ns[namespace] || api;
                      p(cal.ns[namespace], ar);
                      p(cal, ["initNamespace", namespace]);
                    } else p(cal, ar);
                    return;
                  }
                  p(cal, ar);
                };
              })(window, "https://app.cal.com/embed/embed.js", "init");

              Cal("init", { origin: "https://cal.com" });
              Cal("inline", {
                elementOrSelector: "#cal-inline",
                calLink: "toptailor/toptailor.london",
                layout: "month_view"
              });
              Cal("ui", {
                theme: "light",
                styles: { branding: { brandColor: "#2A5220" } },
                hideEventTypeDetails: false
              });
            `,
          }}
        />
      </main>

      <Footer />
    </>
  )
}
