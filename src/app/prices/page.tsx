import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PricesStickyBar from './PricesStickyBar'
import { services } from '@/data/services'

export const metadata: Metadata = {
  title: 'Services & Pricing | Fine Tailors London',
  description: 'Full pricing for suit alterations, dress alterations, trouser hemming, shirt tailoring and more — all collected from your Central London door. Minimum order £20.',
  alternates: { canonical: 'https://www.finetailors.co.uk/prices' },
}

const descriptions: Record<string, string> = {
  trousers: 'From everyday trousers to designer denim — hemming, tapering, waist and pocket work at your door.',
  jacket:   'Suit jackets, blazers, overcoats and puffers — sleeves, body and lining altered to a perfect fit.',
  shirts:   'Dress shirts, casual shirts and blouses — tailored to your exact measurements.',
  dress:    'From simple sundresses to evening gowns — shortening, taking in and zip replacements.',
  occasion: 'Bridal gowns, bridesmaid dresses, beaded and delicate occasion wear — handled with specialist care. Priced on inspection.',
  leather:  'Specialist leather jacket and suede garment alterations — all work priced on inspection after collection.',
  repairs:  'Zip replacements, patch repairs and rehems across all garment types.',
}

function fmt(price: number, note?: string) {
  if (note === 'quote') return 'Quote'
  return note === 'from' ? `from £${price}` : `£${price}`
}

export default function PricesPage() {
  const categories = services.filter(c => c.id !== 'consultation')

  return (
    <>
      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] min-h-screen bg-parchment pb-16">

        {/* Page header */}
        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <span className="font-sans text-[9px] font-medium uppercase tracking-[0.3em] text-muted block mb-4">
            FINE TAILORS · CENTRAL LONDON
          </span>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium mb-4">
            Services &amp; <em className="italic">Pricing</em>
          </h1>
          <p className="font-sans font-light text-muted max-w-lg leading-relaxed">
            All prices include collection and return to your London address. Specialist items are quoted on inspection — we confirm before any work begins. Minimum order £20.
          </p>
        </div>

        {/* Categories */}
        <div className="px-8 lg:px-24 py-12 space-y-12 max-w-4xl">
          {categories.map(cat => {
            const desc       = descriptions[cat.id]
            const hasQuotes  = cat.items.every(i => i.note === 'quote')
            const fixedItems = cat.items.filter(i => i.note !== 'quote')
            const quoteItems = cat.items.filter(i => i.note === 'quote')

            return (
              <div key={cat.id} className="border border-divider bg-white">
                {/* Category header */}
                <div className="px-6 py-5 border-b border-divider">
                  <h2 className="font-playfair text-[1.375rem] font-medium text-charcoal mb-1">
                    {cat.name}
                  </h2>
                  {desc && (
                    <p className="font-sans text-[0.8125rem] text-muted leading-relaxed">{desc}</p>
                  )}
                </div>

                {/* Price rows */}
                {fixedItems.length > 0 && (
                  <div>
                    {fixedItems.map((item, i) => (
                      <div
                        key={item.id}
                        className={`flex items-center justify-between px-6 py-3 ${i < fixedItems.length - 1 ? 'border-b border-divider/50' : ''} ${i % 2 === 1 ? 'bg-parchment/30' : ''}`}
                      >
                        <span className="font-sans text-[0.9rem] text-charcoal">{item.name}</span>
                        <span className="font-sans text-[0.9rem] font-medium text-hunter whitespace-nowrap ml-4">
                          {fmt(item.price, item.note)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Quote items */}
                {quoteItems.length > 0 && (
                  <div className={fixedItems.length > 0 ? 'border-t border-divider' : ''}>
                    {hasQuotes ? (
                      <div className="px-6 py-4">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {quoteItems.map(item => (
                            <span
                              key={item.id}
                              className="font-sans text-[0.8125rem] text-charcoal border border-divider px-3 py-1"
                            >
                              {item.name}
                            </span>
                          ))}
                        </div>
                        <p className="font-sans text-[0.75rem] text-muted italic">
                          Priced on inspection — we confirm your quote before any work begins.
                        </p>
                      </div>
                    ) : (
                      quoteItems.map((item, i) => (
                        <div key={item.id} className={`flex items-center justify-between px-6 py-3 ${i < quoteItems.length - 1 ? 'border-b border-divider/50' : ''}`}>
                          <span className="font-sans text-[0.9rem] text-charcoal">{item.name}</span>
                          <span className="font-sans text-[0.85rem] font-medium text-muted italic ml-4">Quote</span>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="px-8 lg:px-24 mt-8 pb-20 lg:pb-8">
          <div className="border border-divider bg-white p-8 max-w-4xl">
            <h2 className="font-playfair text-[1.5rem] font-medium mb-2">Ready to get started?</h2>
            <p className="font-sans font-light text-muted text-[0.9375rem] mb-6 leading-relaxed">
              We collect from your Central London door — Mayfair, Chelsea, Knightsbridge and 20+ areas. No shop visit needed.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/inquiry"
                className="
                  flex-1 text-center py-4
                  font-sans text-[0.75rem] font-medium tracking-[0.18em] uppercase
                  border border-charcoal text-charcoal
                  hover:bg-charcoal hover:text-parchment transition-colors
                "
              >
                ⚡ Quick Inquiry
              </Link>
              <Link
                href="/book-visit"
                className="
                  flex-1 text-center py-4
                  font-sans text-[0.75rem] font-medium tracking-[0.18em] uppercase
                  bg-hunter text-parchment
                  hover:bg-[#1E3D17] transition-colors
                "
              >
                📅 Book a Visit
              </Link>
            </div>
          </div>
        </div>

      </main>
      <Footer />
      <PricesStickyBar />
    </>
  )
}
