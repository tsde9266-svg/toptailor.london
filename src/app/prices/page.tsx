import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
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
  trousers:      'From everyday trousers to designer denim — hemming, tapering, waist and pocket work at your door.',
  jacket:        'Suit jackets, blazers, overcoats and puffers — sleeves, body and lining altered to a perfect fit.',
  shirts:        'Dress shirts, casual shirts and blouses — tailored to your exact measurements.',
  dress:         'From simple sundresses to evening gowns — shortening, taking in and zip replacements.',
  skirts:        'Pencil, A-line, midi and maxi skirts — shortening, waist adjustment and side seam work.',
  'ladies-suits':'Women\'s suit jackets and trousers altered as a coordinated set for a sharp, professional fit.',
  jumpsuits:     'Jumpsuits and playsuits — leg shortening, body take-in and zip replacement across all fabrics.',
  fur:           'Fur coats, faux fur and sheepskin jackets — all specialist work priced on inspection after collection.',
  occasion:      'Bridal gowns, bridesmaid dresses, beaded and delicate occasion wear — handled with specialist care. Priced on inspection.',
  leather:       'Specialist leather jacket and suede garment alterations — all work priced on inspection after collection.',
  repairs:       'Zip replacements, patch repairs and rehems across all garment types.',
}

const categoryImages: Record<string, string> = {
  trousers:      'https://images.unsplash.com/photo-1578353022142-09264fd64295?w=1200&q=70&auto=format&fit=crop',
  jacket:        'https://images.unsplash.com/photo-1491336477066-31156b5e4f35?w=1200&q=70&auto=format&fit=crop',
  shirts:        'https://images.unsplash.com/photo-1560796952-f1c9b838544c?w=1200&q=70&auto=format&fit=crop',
  dress:         'https://images.unsplash.com/photo-1521467752200-3bccf80f16ed?w=1200&q=70&auto=format&fit=crop',
  skirts:        'https://images.unsplash.com/photo-1630930678172-63343537a00a?w=1200&q=70&auto=format&fit=crop',
  'ladies-suits':'https://images.unsplash.com/photo-1603394151492-5e9b974b090b?w=1200&q=70&auto=format&fit=crop',
  jumpsuits:     'https://images.unsplash.com/photo-1625479142928-c2f2914318f2?w=1200&q=70&auto=format&fit=crop',
  fur:           'https://images.unsplash.com/photo-1602706294170-1fed8eecd9f9?w=1200&q=70&auto=format&fit=crop',
  occasion:      'https://images.unsplash.com/photo-1585241920473-b472eb9ffbae?w=1200&q=70&auto=format&fit=crop',
  leather:       'https://images.unsplash.com/photo-1593250816874-8edf4f732edb?w=1200&q=70&auto=format&fit=crop',
  repairs:       'https://images.unsplash.com/photo-1503792501406-2c40da09e1e2?w=1200&q=70&auto=format&fit=crop',
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

        {/* Page header with background image */}
        <div className="relative overflow-hidden border-b border-divider" style={{ minHeight: '280px' }}>
          <Image
            src="https://images.unsplash.com/photo-1503792501406-2c40da09e1e2?w=1600&q=75&auto=format&fit=crop"
            alt="Fine Tailors pricing — scissors, thread and tailoring tools"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(19,58,11,0.92) 0%, rgba(19,58,11,0.6) 60%, rgba(0,0,0,0.3) 100%)' }} />
          <div className="relative z-10 px-8 lg:px-24 py-16 lg:py-20">
            <span className="font-sans text-[9px] font-medium uppercase tracking-[0.3em] text-parchment/50 block mb-4">
              FINE TAILORS · CENTRAL LONDON
            </span>
            <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-parchment mb-4">
              Services &amp; <em className="italic">Pricing</em>
            </h1>
            <p className="font-sans font-light text-parchment/80 max-w-lg leading-relaxed">
              All prices include collection and return to your London address. Specialist items are quoted on inspection — we confirm before any work begins. Minimum order £20.
            </p>
          </div>
        </div>

        {/* Categories */}
        <div className="px-8 lg:px-24 py-12 space-y-12 max-w-4xl">
          {categories.map(cat => {
            const desc       = descriptions[cat.id]
            const hasQuotes  = cat.items.every(i => i.note === 'quote')
            const fixedItems = cat.items.filter(i => i.note !== 'quote')
            const quoteItems = cat.items.filter(i => i.note === 'quote')

            return (
              <div key={cat.id} className="border border-divider bg-white overflow-hidden">
                {/* Category header with image */}
                <div className="relative">
                  {categoryImages[cat.id] && (
                    <div className="relative h-32 lg:h-40">
                      <Image
                        src={categoryImages[cat.id]}
                        alt={cat.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 896px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(19,58,11,0.85) 0%, rgba(19,58,11,0.5) 100%)' }} />
                      <div className="absolute inset-0 flex flex-col justify-center px-6">
                        <h2 className="font-playfair text-[1.375rem] lg:text-[1.625rem] font-medium text-parchment mb-1">
                          {cat.name}
                        </h2>
                        {desc && (
                          <p className="font-sans text-[0.75rem] text-parchment/75 leading-relaxed max-w-lg">{desc}</p>
                        )}
                      </div>
                    </div>
                  )}
                  {!categoryImages[cat.id] && (
                    <div className="px-6 py-5 border-b border-divider">
                      <h2 className="font-playfair text-[1.375rem] font-medium text-charcoal mb-1">{cat.name}</h2>
                      {desc && <p className="font-sans text-[0.8125rem] text-muted leading-relaxed">{desc}</p>}
                    </div>
                  )}
                </div>

                {/* Price rows — each links to book form */}
                {fixedItems.length > 0 && (
                  <div>
                    {fixedItems.map((item, i) => (
                      <Link
                        key={item.id}
                        href="/book-visit"
                        className={`
                          flex items-center justify-between px-6 py-3
                          group hover:bg-hunter/5 transition-colors duration-150 cursor-pointer
                          ${i < fixedItems.length - 1 ? 'border-b border-divider/50' : ''}
                          ${i % 2 === 1 ? 'bg-parchment/30 hover:bg-hunter/5' : ''}
                        `}
                      >
                        <span className="font-sans text-[0.9rem] text-charcoal group-hover:text-hunter transition-colors">
                          {item.name}
                        </span>
                        <div className="flex items-center gap-3 ml-4 flex-shrink-0">
                          <span className="font-sans text-[0.9rem] font-medium text-hunter">
                            {fmt(item.price, item.note)}
                          </span>
                          <span className="font-sans text-[0.65rem] uppercase tracking-widest text-muted group-hover:text-hunter transition-colors hidden sm:inline">
                            Book →
                          </span>
                        </div>
                      </Link>
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
                        <Link key={item.id} href="/book-visit" className={`flex items-center justify-between px-6 py-3 group hover:bg-hunter/5 transition-colors ${i < quoteItems.length - 1 ? 'border-b border-divider/50' : ''}`}>
                          <span className="font-sans text-[0.9rem] text-charcoal group-hover:text-hunter transition-colors">{item.name}</span>
                          <span className="font-sans text-[0.85rem] font-medium text-muted italic ml-4">Quote</span>
                        </Link>
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
