'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const faqs = [
  {
    q: 'How does the collection service work?',
    a: 'Book a visit online. At your chosen time we collect your garments directly from your door — no need to carry anything or visit a shop. We alter every piece in our workshop, then return everything pressed and perfect to your door, usually within 5–7 working days.',
  },
  {
    q: 'How much do alterations cost?',
    a: 'Trouser shortening from £25. Trouser tapering from £18. Jacket sleeve shortening from £30. Jacket back take-in from £18. Plain dress shortening from £25. Shirt alterations from £15. Coat shortening from £45. Leather jacket and wedding dress alterations are quoted on inspection. Minimum order £20.',
  },
  {
    q: 'How long do alterations take?',
    a: 'Most alterations are returned within 5–7 working days. Express and same-day service is available for urgent requirements — call or WhatsApp us to confirm availability before booking.',
  },
  {
    q: 'Which London areas do you cover?',
    a: 'All Central London postcodes: W1 (Mayfair, Marylebone, Soho, Fitzrovia), SW1 (Westminster, Belgravia, Pimlico), SW3/SW10 (Chelsea), SW7 (South Kensington), W8 (Kensington), SW1X (Knightsbridge), WC1/WC2 (Bloomsbury, Covent Garden), EC1/EC2 (City of London, Clerkenwell, Shoreditch), E14 (Canary Wharf), N1 (Islington), W11 (Notting Hill), W2 (Paddington). If your postcode isn\'t listed, get in touch.',
  },
  {
    q: 'What garments can you alter?',
    a: 'Suits, jackets, coats, trousers, jeans, dresses, skirts, shirts, blouses, ladies suits, jumpsuits, wedding and bridal wear, leather jackets, fur coats, and puffer jackets (including Canada Goose, Moncler and Barbour). Zip replacements and patch repairs across all garment types.',
  },
  {
    q: 'Do you offer trade discounts for designers and boutiques?',
    a: 'Yes — we offer 20% off for designers, fashion houses, boutiques, stylists and hotel concierge services. Apply for a trade account via our enquiry form and we will be in touch within one working day.',
  },
  {
    q: 'Do you work with designer and luxury garments?',
    a: 'Yes. We regularly handle luxury and designer pieces — suits, gowns, leather jackets and occasion wear. The collection model is particularly suited to valuable garments — they go straight from your door to our workshop and back, never sitting in a public shop.',
  },
  {
    q: 'What makes Fine Tailors different from a high street shop?',
    a: 'No shop visit, no travel, no dropping off. Your garments are collected from your door, altered by a single dedicated tailor — the Single Needle Guarantee — and returned pressed and perfect. One person handles your clothes from collection to return.',
  },
]

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="border-t border-divider bg-parchment">

      {/* Desktop: 2-column layout */}
      <div className="hidden lg:grid grid-cols-5">

        {/* Left: sticky image */}
        <div className="col-span-2 relative">
          <div className="sticky top-[65px] h-[calc(100vh-65px)]">
            <Image
              src="https://images.unsplash.com/photo-1560796952-f1c9b838544c?w=900&q=80&auto=format&fit=crop"
              alt="Fine Tailors — frequently asked questions about tailoring and alterations"
              fill
              sizes="40vw"
              className="object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(19,58,11,0.7) 0%, rgba(19,58,11,0.4) 50%, rgba(44,44,44,0.8) 100%)' }} />
            <div className="absolute inset-0 flex flex-col justify-end p-12">
              <span className="font-sans text-[0.6875rem] uppercase tracking-[0.2em] text-parchment/50 block mb-3">FAQ</span>
              <h2 className="font-playfair text-[2.25rem] font-medium text-parchment leading-tight mb-4">
                Got a <em className="italic">Question?</em>
              </h2>
              <p className="font-sans text-[0.875rem] text-parchment/70 leading-relaxed mb-8">
                Everything you need to know about how Fine Tailors works, our pricing and turnaround times.
              </p>
              <Link
                href="/inquiry"
                className="inline-block text-center border border-parchment/40 text-parchment px-8 py-3 font-sans text-[0.6875rem] font-medium tracking-[0.2em] uppercase hover:bg-parchment hover:text-charcoal transition-colors w-fit"
              >
                Ask Us →
              </Link>
            </div>
          </div>
        </div>

        {/* Right: accordion */}
        <div className="col-span-3 px-16 py-16">
          <dl className="space-y-0 divide-y divide-divider">
            {faqs.map((item, i) => (
              <div key={i}>
                <dt>
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="
                      w-full flex justify-between items-center py-6 text-left
                      font-playfair text-[1.0625rem] font-medium text-charcoal
                      hover:text-hunter transition-colors duration-150
                    "
                    aria-expanded={open === i}
                  >
                    <h3 className="font-playfair text-[1.0625rem] font-medium pr-4">{item.q}</h3>
                    <span className="flex-shrink-0 text-hunter text-xl leading-none" aria-hidden="true">
                      {open === i ? '−' : '+'}
                    </span>
                  </button>
                </dt>
                {open === i && (
                  <dd className="pb-6 font-sans font-light text-muted leading-relaxed text-[0.9375rem]">
                    {item.a}
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Mobile: full-width with header image */}
      <div className="lg:hidden">
        {/* Header image */}
        <div className="relative h-48">
          <Image
            src="https://images.unsplash.com/photo-1560796952-f1c9b838544c?w=800&q=80&auto=format&fit=crop"
            alt="Fine Tailors FAQ"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-hunter/80" />
          <div className="absolute inset-0 flex items-end px-8 pb-6">
            <h2 className="font-playfair text-[2rem] font-medium text-parchment">
              Questions? <em className="italic">We&apos;ve got answers.</em>
            </h2>
          </div>
        </div>

        {/* Accordion */}
        <div className="px-8 py-6">
          <dl className="space-y-0 divide-y divide-divider">
            {faqs.map((item, i) => (
              <div key={i}>
                <dt>
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="w-full flex justify-between items-center py-5 text-left"
                    aria-expanded={open === i}
                  >
                    <h3 className="font-playfair text-[1rem] font-medium text-charcoal pr-4">{item.q}</h3>
                    <span className="flex-shrink-0 text-hunter text-xl leading-none">{open === i ? '−' : '+'}</span>
                  </button>
                </dt>
                {open === i && (
                  <dd className="pb-5 font-sans font-light text-muted leading-relaxed text-[0.875rem]">
                    {item.a}
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </div>
      </div>

    </section>
  )
}
