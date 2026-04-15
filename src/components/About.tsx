'use client'
import Image from 'next/image'
import { useScrollReveal } from '@/hooks/useScrollReveal'
export default function About() {
  const sectionRef = useScrollReveal<HTMLElement>()

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-[#F2EDE5] reveal-on-scroll"
    >
      {/* ══ DESKTOP (≥ lg) — side-by-side grid ══════════════ */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-12 border border-divider">
          {/* Photo — 7 cols */}
          <div className="col-span-7 border-r border-divider relative h-[600px]">
            <Image
              src="/images/tailor.jpg"
              alt="Close-up of a tailor's hands precisely cutting heavy dark green wool fabric with vintage steel shears on a wooden table"
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover grayscale brightness-95"
              priority={false}
              quality={85}
            />
          </div>

          {/* Text panel — 5 cols */}
          <div className="col-span-5 p-12 flex flex-col justify-end bg-parchment">
            <div className="rule-h mb-8" />
            <h2 className="font-playfair text-2xl mb-6">
              The Single Needle <br />
              <em className="font-playfair italic">Guarantee</em>
            </h2>
            <p className="font-sans text-sm font-light leading-loose text-muted mb-12">
              Unlike industrial tailors, every project is handled personally.
              This ensures that the tension of every thread and the angle of
              every cut is consistent with the initial vision established during
              your collection meeting.
            </p>
            <a
              href="#book"
              className="
                inline-block w-fit
                bg-hunter text-parchment
                px-10 py-5
                font-sans text-[0.75rem] font-medium tracking-[0.1em] uppercase
                hover:bg-[#1E3D17] transition-colors duration-200
              "
            >
              SCHEDULE A COLLECTION
            </a>
          </div>
        </div>
      </div>

      {/* ══ MOBILE (< lg) — text only ════════════════════════ */}
      <div className="lg:hidden px-8 py-20">
        <div className="rule-h mb-8" />
        <h2 className="font-playfair text-[1.75rem] mb-6">
          The Single Needle <br />
          <em className="font-playfair italic">Guarantee</em>
        </h2>
        <p className="font-sans text-sm font-light leading-loose text-muted mb-10">
          Unlike industrial tailors, every project is handled personally.
          This ensures that the tension of every thread and the angle of every
          cut is consistent with the initial vision established during your
          collection meeting.
        </p>
        <a
          href="#book"
          className="
            block w-full text-center
            bg-hunter text-parchment
            py-5
            font-sans text-[0.8125rem] font-medium tracking-[0.15em] uppercase
            hover:bg-[#1E3D17] transition-colors duration-200
          "
        >
          SCHEDULE A COLLECTION
        </a>
      </div>
    </section>
  )
}
