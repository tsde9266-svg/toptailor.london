import Image from 'next/image'
import Link from 'next/link'

const offers = [
  {
    badge: '20% OFF',
    who:   'Designers & Fashion Houses',
    desc:  'Working on a collection or client wardrobe? We offer 20% off all alteration and tailoring work for designers and fashion professionals.',
    icon:  '✂️',
  },
  {
    badge: '20% OFF',
    who:   'Boutiques & Concept Stores',
    desc:  'Send your customers to us — or refer us to clients needing alterations. Trade accounts available for boutiques and independent retailers.',
    icon:  '🏪',
  },
  {
    badge: '20% OFF',
    who:   'Stylists & Personal Shoppers',
    desc:  'Dress your clients with confidence. We offer dedicated trade rates and priority turnaround for stylists working on shoots, events and wardrobes.',
    icon:  '👗',
  },
  {
    badge: '20% OFF',
    who:   'Hotels & Concierge Services',
    desc:  'Offer your guests a premium tailoring experience. We partner with hotels and concierge services across Central London for seamless collection and return.',
    icon:  '🏨',
  },
]

export default function OffersSection() {
  return (
    <section className="bg-charcoal text-parchment border-t border-parchment/10 overflow-hidden">

      {/* Top photo banner */}
      <div className="relative h-64 lg:h-80">
        <Image
          src="https://images.unsplash.com/photo-1580657018950-c7f7d6a6d990?w=1600&q=75&auto=format&fit=crop"
          alt="Professional tailoring for designers, boutiques and stylists"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(44,44,44,0.3) 0%, rgba(44,44,44,0.75) 60%, rgba(44,44,44,1) 100%)' }} />

        {/* Overlay text */}
        <div className="absolute inset-0 flex flex-col justify-end px-8 lg:px-24 pb-10">
          <span className="font-sans text-[0.6875rem] font-medium uppercase tracking-[0.3em] text-parchment/50 block mb-3">
            TRADE & PROFESSIONAL PROGRAMME
          </span>
          <h2 className="font-playfair text-[2rem] lg:text-[3rem] font-medium leading-tight">
            Exclusive <em className="italic">Trade Discounts</em>
          </h2>
        </div>
      </div>

      {/* Intro */}
      <div className="px-8 lg:px-24 pt-10 pb-8 max-w-3xl">
        <p className="font-sans font-light text-parchment/70 text-[1.0625rem] leading-relaxed">
          Fine Tailors works with designers, boutiques, stylists, hotels and creative professionals across London. Apply for a trade account and receive <strong className="text-parchment font-medium">20% off all services</strong>, priority turnaround and a dedicated point of contact.
        </p>
      </div>

      {/* Offer cards */}
      <div className="px-8 lg:px-24 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-parchment/10">
          {offers.map((offer) => (
            <div
              key={offer.who}
              className="bg-charcoal p-6 lg:p-8 flex flex-col gap-4 hover:bg-white/5 transition-colors duration-200"
            >
              {/* Badge */}
              <div className="flex items-center gap-3">
                <span className="text-2xl">{offer.icon}</span>
                <span className="
                  font-sans text-[0.75rem] font-medium tracking-[0.15em] uppercase
                  bg-hunter text-parchment px-3 py-1
                ">
                  {offer.badge}
                </span>
              </div>

              <h3 className="font-playfair text-[1.0625rem] text-parchment leading-tight">
                {offer.who}
              </h3>
              <p className="font-sans text-[0.8125rem] text-parchment/60 leading-relaxed flex-1">
                {offer.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Two-column bottom: additional image + CTA */}
      <div className="px-8 lg:px-24 py-10 grid lg:grid-cols-2 gap-10 items-center border-t border-parchment/10">
        <div className="relative aspect-[16/7] lg:aspect-[16/6] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=900&q=80&auto=format&fit=crop"
            alt="Fine Tailors trade service for fashion professionals"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover opacity-80"
          />
        </div>
        <div>
          <h3 className="font-playfair text-[1.5rem] lg:text-[1.875rem] font-medium mb-4">
            Apply for Your <em className="italic">Trade Account</em>
          </h3>
          <p className="font-sans font-light text-parchment/70 leading-relaxed mb-3">
            Tell us about your business and how we can work together. Trade accounts include 20% off all services, priority 3–5 day turnaround, monthly invoicing and a dedicated WhatsApp line.
          </p>
          <p className="font-sans text-[0.8125rem] text-parchment/50 mb-8">
            No minimum volume required. Available to registered businesses and sole traders.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/inquiry"
              className="
                text-center bg-parchment text-charcoal px-8 py-4
                font-sans text-[0.75rem] font-medium tracking-[0.15em] uppercase
                hover:bg-white transition-colors
              "
            >
              Apply Now →
            </Link>
            <a
              href="https://wa.me/447438145169?text=Hi%2C%20I%27d%20like%20to%20apply%20for%20a%20trade%20account%20with%20Fine%20Tailors."
              target="_blank"
              rel="noopener noreferrer"
              className="
                text-center border border-parchment/30 text-parchment px-8 py-4
                font-sans text-[0.75rem] font-medium tracking-[0.15em] uppercase
                hover:border-parchment transition-colors
              "
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
