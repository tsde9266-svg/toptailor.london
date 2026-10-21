import Link from 'next/link'

export default function BlogCTA({ heading = 'Want this done without a trip to a shop?' }: { heading?: string }) {
  return (
    <div className="bg-hunter/5 border border-hunter/20 p-8 my-10">
      <p className="font-playfair text-xl font-medium text-charcoal mb-2">{heading}</p>
      <p className="font-sans font-light text-muted leading-relaxed mb-5 max-w-xl">
        We collect from your door anywhere in Central London, alter in our workshop and return in 5–7 working days. You approve a written quote before any work starts. Trouser hems from £18, minimum order £20.
      </p>
      <div className="flex gap-6 flex-wrap items-center">
        <Link href="/get-started" className="bg-hunter text-parchment px-8 py-3 font-sans text-xs font-medium tracking-[0.15em] uppercase hover:bg-[#1E3D17] transition-colors">
          Book a Collection
        </Link>
        <Link href="/alteration-costs-london" className="font-sans text-sm text-hunter underline">See all prices</Link>
        <a href="tel:+447438145169" className="font-sans text-sm font-medium text-charcoal hover:text-hunter transition-colors">+44 7438 145169</a>
      </div>
    </div>
  )
}
