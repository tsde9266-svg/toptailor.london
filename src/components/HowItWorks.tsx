'use client'
import Image from 'next/image'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const steps = [
  {
    num:   '01',
    title: 'Book a Visit',
    body:  'Choose your services and book a collection slot. We come to your home or office anywhere in Central London — no travel, no drop-off, no shop visit required.',
    img:   'https://images.unsplash.com/photo-1533768488827-1ed0f9b03899?w=600&q=80&auto=format&fit=crop',
    imgAlt:'Booking a tailoring collection slot',
    cta:   true,
  },
  {
    num:   '02',
    title: 'Inspect & Quote',
    body:  'We collect your garments. Our tailor inspects every piece and sends you a confirmed written quote by email — you approve before we start a single stitch. No surprises.',
    img:   'https://images.pexels.com/photos/6461086/pexels-photo-6461086.jpeg?auto=compress&cs=tinysrgb&w=600',
    imgAlt:'Tailor inspecting and measuring a garment',
    cta:   false,
  },
  {
    num:   '03',
    title: 'Returned Perfect',
    body:  'Within 5–7 working days your garments are returned to your door, pressed and perfected. Payment is due only after you have approved the quote.',
    img:   'https://images.pexels.com/photos/5830661/pexels-photo-5830661.jpeg?auto=compress&cs=tinysrgb&w=600',
    imgAlt:'Perfectly altered and pressed garments returned to your door',
    cta:   false,
  },
]

export default function HowItWorks() {
  const sectionRef = useScrollReveal<HTMLElement>()

  return (
    <section id="how-it-works" ref={sectionRef} className="bg-hunter text-parchment reveal-on-scroll">

      {/* ══ DESKTOP (≥ lg) ══════════════════════════════════════ */}
      <div className="hidden lg:block">
        {/* Photo strip — full width, 3 equal panels */}
        <div className="grid grid-cols-3 h-64">
          {steps.map((step) => (
            <div key={step.num} className="relative overflow-hidden">
              <Image
                src={step.img}
                alt={step.imgAlt}
                fill
                sizes="33vw"
                className="object-cover opacity-60 hover:opacity-80 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-hunter/40" />
              {/* Step number watermark */}
              <span className="absolute top-4 left-6 font-playfair text-[3.5rem] leading-none text-parchment/20 select-none">
                {step.num}
              </span>
            </div>
          ))}
        </div>

        {/* Text content */}
        <div className="px-24 py-16">
          <span className="font-sans text-[9px] font-medium uppercase tracking-[0.3em] text-green-bright/70 block mb-12">
            THE PROCESS
          </span>
          <div className="grid grid-cols-3 gap-0 border-t border-parchment/20">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="relative pt-10 pr-16 pb-10 border-r border-parchment/20 last:border-r-0 reveal-on-scroll"
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <h3 className="font-playfair text-[1.5rem] mb-4">{step.title}</h3>
                <p className="font-sans text-[0.8125rem] leading-relaxed opacity-80 mb-8 max-w-[240px]">
                  {step.body}
                </p>
                {step.cta && (
                  <a
                    href="/book-visit"
                    className="
                      inline-block border border-parchment/60 px-8 py-4
                      font-sans text-[0.6875rem] font-medium tracking-widest uppercase
                      hover:bg-parchment hover:text-hunter transition-colors duration-200
                    "
                  >
                    BOOK A VISIT
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ MOBILE (< lg) ═══════════════════════════════════════ */}
      <div className="lg:hidden">
        <div className="py-12 px-8">
          <span className="font-sans text-[9px] font-medium uppercase tracking-[0.3em] text-green-bright/70 block mb-8">
            THE PROCESS
          </span>
          <h2 className="font-playfair text-[2rem] italic mb-10">How It Works</h2>
        </div>

        <div className="space-y-0">
          {steps.map((step, i) => (
            <div key={step.num} className="reveal-on-scroll" style={{ transitionDelay: `${i * 100}ms` }}>
              {/* Step photo */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={step.img}
                  alt={step.imgAlt}
                  fill
                  sizes="100vw"
                  className="object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-hunter/50" />
                <span className="absolute top-4 left-6 font-playfair text-[4rem] leading-none text-parchment/25 select-none">
                  {step.num}
                </span>
                <h3 className="absolute bottom-4 left-8 font-playfair text-[1.375rem] text-parchment">
                  {step.title}
                </h3>
              </div>

              {/* Step text */}
              <div
                className="px-8 py-8 border-t border-parchment/20"
                style={{ borderBottom: i < steps.length - 1 ? '0.5px solid rgba(197,221,151,0.2)' : undefined }}
              >
                <p className="font-sans text-[0.9375rem] opacity-80 leading-relaxed mb-6">
                  {step.body}
                </p>
                {step.cta && (
                  <a
                    href="/book-visit"
                    className="
                      inline-block border border-parchment/60 py-4 px-8
                      font-sans text-[0.6875rem] font-medium tracking-widest uppercase
                      hover:bg-parchment hover:text-hunter transition-colors duration-200
                    "
                  >
                    BOOK A VISIT
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
