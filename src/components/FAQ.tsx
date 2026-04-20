'use client'
import { useState } from 'react'

const faqs = [
  {
    q: 'Do you come to my home?',
    a: 'Yes — One Click Tailor visits your home, apartment or office anywhere in central London including Mayfair, Chelsea, Knightsbridge and Kensington. You never need to travel to us.',
  },
  {
    q: 'Which areas do you cover?',
    a: 'We cover all central London postcodes including W1, SW1, SW3, EC1, WC1, WC2, W8 and SW7. If you\'re unsure whether we cover your address, just get in touch.',
  },
  {
    q: 'How do I book a home visit?',
    a: 'Contact us by phone or the booking form. We agree a convenient time, visit your home, assess your garments, collect them and return everything perfectly altered — usually within 3–5 days.',
  },
  {
    q: 'How much experience do you have?',
    a: 'Over 10 years of professional tailoring experience working with clients across central London, handling everything from everyday alterations to luxury designer garments.',
  },
  {
    q: 'What alterations can you do at home?',
    a: 'Suit alterations, dress and occasion wear, trouser hemming, waist adjustments, jacket resizing, sleeve shortening, zip replacements, and all clothing repairs — completed at the highest standard.',
  },
  {
    q: 'How long do alterations take?',
    a: 'Most alterations are returned within 3–5 days. An express 24–48 hour service is available for urgent requirements — just let us know when booking.',
  },
  {
    q: 'Do you work with designer and luxury garments?',
    a: 'Yes. We regularly work with luxury and designer pieces including suits, gowns and occasion wear, handling each garment with the care and expertise it deserves.',
  },
  {
    q: 'What makes One Click Tailor different from a shop?',
    a: 'We come to you. No travelling across London, no waiting rooms, no carrying garments on public transport. One dedicated tailor handles your clothes from collection to return.',
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
