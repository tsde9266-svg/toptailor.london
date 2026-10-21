import Link from 'next/link'

const items = [
  {
    title: 'Trousers, hems & ski wear',
    body: 'Trouser hemming and tapering, waist adjustment, and hems on technical and ski trousers where the fabric allows. Ask us before you book if the garment is waterproof or taped.',
    href: '/trouser-alterations-london',
    cta: 'Trouser alterations',
  },
  {
    title: 'Leather & suede',
    body: 'Sleeve shortening and fit adjustments on leather and suede jackets, quoted after we inspect the garment because every hide behaves differently.',
    href: '/leather-jacket-alterations-london',
    cta: 'Leather jacket alterations',
  },
  {
    title: 'Jeans',
    body: 'Hemming (with the original hem kept if you want it), tapering and waist adjustment on everyday and designer denim.',
    href: '/jeans-alterations-london',
    cta: 'Jeans alterations',
  },
  {
    title: 'Bridal & occasion wear',
    body: 'Wedding, bridesmaid and evening dresses, handled with extra care and priced on inspection. Book early if the date is fixed.',
    href: '/wedding-dress-alterations-london',
    cta: 'Wedding dress alterations',
  },
]

export default function AreaAlterations({ area }: { area: string }) {
  return (
    <div className="px-8 lg:px-24 py-16 border-b border-divider">
      <h2 className="font-playfair text-[1.75rem] font-medium mb-3">
        Alterations People Ask For in {area}
      </h2>
      <p className="font-sans font-light text-muted leading-relaxed mb-8 max-w-2xl">
        If you searched for alterations in {area}, these are the jobs we collect for most often. Every one is collected from your {area} door and returned in 5–7 working days, with a written quote approved by you before any work starts.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-4xl">
        {items.map((it) => (
          <div key={it.title} className="border border-divider p-5">
            <h3 className="font-playfair text-base font-medium text-charcoal mb-2">{it.title}</h3>
            <p className="font-sans text-sm font-light text-muted leading-relaxed mb-3">{it.body}</p>
            <Link href={it.href} className="font-sans text-sm text-hunter underline">{it.cta}</Link>
          </div>
        ))}
      </div>
    </div>
  )
}
