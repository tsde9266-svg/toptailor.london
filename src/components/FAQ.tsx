'use client'
import { useState } from 'react'

const faqs = [
  {
    q: 'How does the collection service work?',
    a: 'Book a collection slot online or by phone. At your chosen time we collect your garments directly from your door — no need to carry anything or visit a shop. We alter every piece in our workshop, then return everything pressed and perfect to your door, usually within 5–7 working days.',
  },
  {
    q: 'Do you enter my home?',
    a: 'No. Fine Tailors is a collection-based service — your garments are collected from your door and returned to your door. No tailor enters your home. This keeps things discreet, convenient, and means your garments are never left sitting in a public shop.',
  },
  {
    q: 'How much do alterations cost?',
    a: 'Trouser shortening from £18. Trouser tapering from £18. Jacket sleeve shortening from £30. Jacket back take-in from £18. Plain dress shortening from £25. Dress take-in from £28. Coat shortening from £45. Leather jacket and wedding dress alterations are quoted on inspection. Minimum order £20.',
  },
  {
    q: 'How long do alterations take?',
    a: 'Most alterations are returned within 5–7 working days. If you have an urgent requirement, mention it when booking and we will do our best to accommodate.',
  },
  {
    q: 'Which London areas do you cover?',
    a: 'We cover all Central London postcodes: W1 (Mayfair, Marylebone, Soho, Fitzrovia), SW1 (Westminster, Belgravia, Pimlico), SW3/SW10 (Chelsea), SW7 (South Kensington), W8 (Kensington), SW1X (Knightsbridge), WC1/WC2 (Bloomsbury, Covent Garden), EC1/EC2 (City of London, Clerkenwell, Shoreditch), E14 (Canary Wharf), N1 (Islington), W11 (Notting Hill), W2 (Paddington). If your postcode isn\'t listed, get in touch — we cover a wide area.',
  },
  {
    q: 'What alterations can you do?',
    a: 'Suit alterations, dress and occasion wear, trouser hemming and tapering, waist adjustments, jacket resizing, sleeve shortening, coat alterations, zip replacements, leather jacket alterations, and wedding dress alterations — all handled at the highest standard.',
  },
  {
    q: 'Do you work with designer and luxury garments?',
    a: 'Yes. We regularly handle luxury and designer pieces including suits, gowns, leather jackets and occasion wear. The collection model is particularly suited to valuable garments — they go straight from your door to our workshop and back, never sitting in a shop.',
  },
  {
    q: 'What makes Fine Tailors different from a high street shop?',
    a: 'No shop visit, no travel, no dropping off. Your garments are collected from your door, altered by a dedicated tailor, and returned pressed and perfect. One tailor handles your clothes from collection to return — not a different person each time.',
  },
  {
    q: 'Do you offer suit alterations in London?',
    a: 'Yes — suit alterations are our most requested service. We collect your suit from your Central London address, make precise alterations to the jacket, trousers or waistcoat, and return everything perfectly fitted within 5–7 days. We cover all Central London postcodes.',
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
    <section id="faq" className="px-8 lg:px-24 py-20 border-t border-divider">
      <h2 className="font-playfair text-[2rem] lg:text-[2.5rem] font-medium mb-12">
        Frequently Asked Questions
      </h2>
      <dl className="max-w-3xl space-y-0 divide-y divide-divider">
        {faqs.map((item, i) => (
          <div key={i}>
            <dt>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="
                  w-full flex justify-between items-center
                  py-5 text-left
                  font-playfair text-[1.0625rem] font-medium text-charcoal
                  hover:text-hunter transition-colors duration-150
                "
                aria-expanded={open === i}
              >
                <h3 className="font-playfair text-[1.0625rem] font-medium">{item.q}</h3>
                <span className="ml-6 shrink-0 text-hunter text-xl leading-none" aria-hidden="true">
                  {open === i ? '−' : '+'}
                </span>
              </button>
            </dt>
            {open === i && (
              <dd className="pb-6 font-sans font-light text-muted leading-relaxed">
                {item.a}
              </dd>
            )}
          </div>
        ))}
      </dl>
    </section>
  )
}
