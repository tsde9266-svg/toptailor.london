import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProcessInteractive from './ProcessInteractive'

export const metadata: Metadata = {
  title: 'How It Works — Door-to-Door Tailoring in 3 Steps | Fine Tailors',
  description:
    "Tailoring as easy as 1, 2, 3. Book a pickup slot online, our tailor visits and pins your clothing, then delivers it back perfectly altered. Door-to-door tailoring across central London.",
  alternates: { canonical: 'https://www.finetailors.co.uk/how-it-works' },
  openGraph: {
    title: 'How It Works — Door-to-Door Tailoring in 3 Steps | Fine Tailors',
    description:
      'Book a pickup slot online, our tailor visits and pins your clothing, then delivers it back perfectly altered.',
    url: 'https://www.finetailors.co.uk/how-it-works',
    type: 'website',
  },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Book a Mobile Tailor in London',
  description:
    'Three simple steps to get your clothing altered without leaving home: book online, our tailor visits and pins, then we deliver it back perfectly altered.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Book a pickup slot online',
      text: 'You book a pickup slot online with the timing of your choice from the comfort of your home.',
      url: 'https://www.finetailors.co.uk/get-started',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Our tailor visits and pins',
      text: 'On the day, our tailor arrives and pins your clothing as you prefer. You will then receive a rough estimate of the pricing and a delivery day.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Tailor delivers and you pay',
      text: 'Our tailor delivers your clothing and you make the payment.',
    },
  ],
}

export default function HowItWorksPage() {
  return (
    <>
      <Script
        id="schema-howto-hiw"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] min-h-screen bg-parchment">

        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="px-8 lg:px-24 py-16 lg:py-24 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span>How It Works</span>
          </nav>

          <span className="font-sans text-[9px] font-medium uppercase tracking-[0.3em] text-muted block mb-4">
            The Process
          </span>

          <h1 className="font-playfair text-[2.25rem] lg:text-[3.75rem] leading-[1.05] font-medium max-w-3xl">
            Tailoring,{' '}
            <em className="font-playfair italic text-hunter">
              as easy as 1<span className="mx-1 text-divider not-italic">·</span>2<span className="mx-1 text-divider not-italic">·</span>3.
            </em>
          </h1>

          <p className="font-sans font-light text-[1rem] lg:text-[1.0625rem] text-muted mt-6 lg:mt-8 max-w-2xl leading-relaxed">
            That&apos;s why we&apos;ve formed an easy procedure for you to get your clothing altered.
            All you have to do is book a slot and have your clothes ready —
            <span className="text-charcoal"> we handle the rest.</span>
          </p>

          {/* Pillars row */}
          <div className="mt-10 lg:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 max-w-3xl">
            {[
              { kicker: 'No travel', body: 'We come to your door.' },
              { kicker: 'No upfront fees', body: 'Pay only on delivery.' },
              { kicker: 'Honest quote', body: 'Approve before we start.' },
              { kicker: 'Fast turnaround', body: 'Most pieces in 5–7 days.' },
            ].map((p) => (
              <div key={p.kicker} className="border-t border-divider pt-4">
                <p className="font-sans text-[9px] font-medium uppercase tracking-[0.25em] text-hunter mb-1">
                  {p.kicker}
                </p>
                <p className="font-sans font-light text-[0.8125rem] text-muted leading-snug">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Intro line ─────────────────────────────────── */}
        <div className="px-8 lg:px-24 pt-16 lg:pt-20">
          <p className="font-playfair italic text-[1.25rem] lg:text-[1.5rem] text-charcoal/80 max-w-2xl">
            This is how it works.
          </p>
        </div>

        {/* ── Interactive 3-step widget ──────────────────── */}
        <ProcessInteractive />

        {/* ── CTA Section ─────────────────────────────────── */}
        <section className="px-8 lg:px-24 pb-20 lg:pb-28">
          <div className="border border-divider bg-hunter text-parchment px-8 lg:px-16 py-12 lg:py-16 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <span className="font-sans text-[9px] font-medium uppercase tracking-[0.3em] text-green-bright block mb-3">
                Ready when you are
              </span>
              <h2 className="font-playfair text-[1.75rem] lg:text-[2.5rem] leading-[1.1] font-medium max-w-lg">
                Book your slot — we will take it from there.
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 shrink-0">
              <Link
                href="/get-started"
                className="
                  inline-block text-center
                  bg-parchment text-hunter
                  px-8 py-4
                  font-sans text-[0.75rem] font-medium tracking-[0.2em] uppercase
                  hover:bg-green-bright hover:text-charcoal transition-colors duration-200
                "
              >
                Book a slot →
              </Link>
              <Link
                href="/get-started/call"
                className="
                  inline-block text-center
                  border border-parchment/60 text-parchment
                  px-8 py-4
                  font-sans text-[0.75rem] font-medium tracking-[0.2em] uppercase
                  hover:bg-parchment hover:text-hunter transition-colors duration-200
                "
              >
                Speak to a tailor
              </Link>
            </div>
          </div>

          {/* WhatsApp soft prompt */}
          <p className="font-sans text-[0.8125rem] text-muted text-center mt-10">
            Still have a question?{' '}
            <a
              href="https://wa.me/447438145169?text=Hi%2C%20I%27d%20like%20to%20learn%20more%20about%20how%20your%20tailoring%20service%20works."
              target="_blank"
              rel="noopener noreferrer"
              className="text-hunter underline underline-offset-2"
            >
              Message us on WhatsApp
            </a>{' '}
            and we will walk you through it.
          </p>
        </section>
      </main>
      <Footer />
    </>
  )
}
