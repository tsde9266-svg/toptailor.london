'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const credentials = [
  { stat: '10+',   label: 'Years Experience' },
  { stat: '1,000+', label: 'Garments Altered' },
  { stat: '20+',   label: 'London Areas Covered' },
  { stat: '5★',    label: 'Average Rating' },
]

export default function About() {
  const sectionRef = useScrollReveal<HTMLElement>()

  return (
    <section id="about" ref={sectionRef} className="bg-[#F2EDE5] reveal-on-scroll">

      {/* ══ DESKTOP (≥ lg) ═══════════════════════════════════════ */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-12">

          {/* Photo col 1 — main tailor photo */}
          <div className="col-span-4 relative" style={{ minHeight: '620px' }}>
            <Image
              src="/images/tailor.jpg"
              alt="Fine Tailors — precision cutting with vintage shears on dark green wool fabric"
              fill
              sizes="33vw"
              className="object-cover grayscale brightness-90"
              quality={90}
            />
          </div>

          {/* Photo col 2 — secondary craft photo */}
          <div className="col-span-3 relative border-l border-divider">
            <Image
              src="https://images.unsplash.com/photo-1625479144604-ae69462778b7?w=700&q=80&auto=format&fit=crop"
              alt="Fine Tailors — careful hand stitching in the workshop"
              fill
              sizes="25vw"
              className="object-cover grayscale brightness-90"
            />
          </div>

          {/* Text panel */}
          <div className="col-span-5 p-12 lg:p-16 flex flex-col justify-center bg-parchment border-l border-divider">
            <div className="rule-h mb-8" />
            <span className="font-sans text-[0.6875rem] uppercase tracking-[0.2em] text-muted block mb-4">
              THE SINGLE NEEDLE GUARANTEE
            </span>
            <h2 className="font-playfair text-[2rem] lg:text-[2.5rem] font-medium mb-6 leading-tight">
              One Tailor. <br />
              <em className="italic">Start to Finish.</em>
            </h2>
            <p className="font-sans text-[0.9375rem] font-light leading-relaxed text-muted mb-4">
              Unlike industrial tailors who pass your garment between multiple hands, every Fine Tailors project is handled by a single specialist — from the moment we collect your clothes to the moment we return them.
            </p>
            <p className="font-sans text-[0.9375rem] font-light leading-relaxed text-muted mb-10">
              This ensures that the tension of every thread, the angle of every cut, and the press of every seam is consistent with the initial vision established during your collection meeting. No handoffs. No production line.
            </p>

            {/* Credentials grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {credentials.map(({ stat, label }) => (
                <div key={stat} className="border border-divider p-4">
                  <p className="font-playfair text-[2rem] text-hunter">{stat}</p>
                  <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted">{label}</p>
                </div>
              ))}
            </div>

            <Link
              href="/book-visit"
              className="
                inline-block w-fit
                bg-hunter text-parchment
                px-10 py-5
                font-sans text-[0.75rem] font-medium tracking-[0.1em] uppercase
                hover:bg-[#1E3D17] transition-colors duration-200
              "
            >
              BOOK A HOME VISIT
            </Link>
          </div>
        </div>
      </div>

      {/* ══ MOBILE (< lg) ═══════════════════════════════════════ */}
      <div className="lg:hidden">
        {/* Main photo */}
        <div className="relative h-64">
          <Image
            src="/images/tailor.jpg"
            alt="Fine Tailors — precision tailoring and garment alterations"
            fill
            sizes="100vw"
            className="object-cover grayscale brightness-90"
          />
        </div>

        {/* Text */}
        <div className="px-8 py-12">
          <div className="rule-h mb-8" />
          <span className="font-sans text-[0.6875rem] uppercase tracking-[0.2em] text-muted block mb-4">
            THE SINGLE NEEDLE GUARANTEE
          </span>
          <h2 className="font-playfair text-[1.875rem] mb-6 leading-tight">
            One Tailor. <em className="italic">Start to Finish.</em>
          </h2>
          <p className="font-sans text-[0.9375rem] font-light leading-relaxed text-muted mb-4">
            Unlike industrial tailors who pass your garment between multiple hands, every Fine Tailors project is handled by a single specialist — from collection to return.
          </p>
          <p className="font-sans text-[0.9375rem] font-light leading-relaxed text-muted mb-8">
            No handoffs. No production line. Consistent quality you can rely on.
          </p>

          {/* Stats strip */}
          <div className="grid grid-cols-2 gap-3 mb-10">
            {credentials.map(({ stat, label }) => (
              <div key={stat} className="border border-divider p-4">
                <p className="font-playfair text-[1.75rem] text-hunter">{stat}</p>
                <p className="font-sans text-[0.625rem] uppercase tracking-widest text-muted">{label}</p>
              </div>
            ))}
          </div>

          {/* Second craft photo */}
          <div className="relative h-48 mb-8 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1625479144604-ae69462778b7?w=800&q=80&auto=format&fit=crop"
              alt="Fine Tailors — hand stitching detail"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <Link
            href="/book-visit"
            className="
              block w-full text-center
              bg-hunter text-parchment
              py-5
              font-sans text-[0.8125rem] font-medium tracking-[0.15em] uppercase
              hover:bg-[#1E3D17] transition-colors duration-200
            "
          >
            BOOK A HOME VISIT
          </Link>
        </div>
      </div>
    </section>
  )
}
