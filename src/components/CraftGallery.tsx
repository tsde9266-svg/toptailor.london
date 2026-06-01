import Image from 'next/image'

const galleryImages = [
  {
    src:  'https://images.unsplash.com/photo-1625479144604-ae69462778b7?w=600&q=80&auto=format&fit=crop',
    alt:  'Tailor carefully stitching fabric by hand',
    span: 'lg:col-span-1',
  },
  {
    src:  'https://images.unsplash.com/photo-1606501126768-b78d4569d3f9?w=900&q=80&auto=format&fit=crop',
    alt:  'Expert tailor at work in the atelier',
    span: 'lg:col-span-2',
  },
  {
    src:  'https://images.unsplash.com/photo-1457972657980-4c9fddebec8d?w=600&q=80&auto=format&fit=crop',
    alt:  'Precision cutting of fine fabric',
    span: 'lg:col-span-1',
  },
  {
    src:  'https://images.unsplash.com/photo-1533758488827-1ed0f9b03899?w=600&q=80&auto=format&fit=crop',
    alt:  'Sewing machine in a tailoring studio',
    span: 'lg:col-span-1',
  },
  {
    src:  'https://images.unsplash.com/photo-1502217625004-89c03571bcca?w=600&q=80&auto=format&fit=crop',
    alt:  'Close-up of tailoring thread and needles',
    span: 'lg:col-span-1',
  },
]

export default function CraftGallery() {
  return (
    <section className="bg-charcoal py-16 lg:py-24 overflow-hidden">
      <div className="px-8 lg:px-24 mb-10">
        <span className="font-sans text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-parchment/40 block mb-3">
          THE ATELIER
        </span>
        <h2 className="font-playfair text-[2rem] lg:text-[2.5rem] font-medium text-parchment">
          The Craft Behind <em className="italic">Every Stitch</em>
        </h2>
        <p className="font-sans font-light text-parchment/60 mt-4 max-w-lg leading-relaxed">
          Every garment is handled by a single specialist tailor — from the first measurement to the final press. No production line. No handoffs.
        </p>
      </div>

      {/* Desktop mosaic grid */}
      <div className="hidden lg:grid grid-cols-4 gap-2 px-8 lg:px-24">
        {galleryImages.map((img, i) => (
          <div
            key={i}
            className={`relative overflow-hidden ${img.span} ${i === 0 ? 'aspect-[4/5]' : i === 1 ? 'aspect-[16/9]' : 'aspect-[4/5]'}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 1024px) 50vw, 33vw"
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        ))}
      </div>

      {/* Mobile horizontal scroll */}
      <div className="lg:hidden flex gap-3 px-8 overflow-x-auto scrollbar-none pb-2" style={{ scrollSnapType: 'x mandatory' }}>
        {galleryImages.map((img, i) => (
          <div
            key={i}
            className="relative flex-none w-64 aspect-[3/4] overflow-hidden"
            style={{ scrollSnapAlign: 'start' }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="256px"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Bottom strip */}
      <div className="px-8 lg:px-24 mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          {[
            ['10+', 'Years Experience'],
            ['1,000+', 'Garments Altered'],
            ['5–7', 'Day Turnaround'],
          ].map(([stat, label]) => (
            <div key={stat}>
              <p className="font-playfair text-[1.75rem] text-parchment">{stat}</p>
              <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-parchment/50">{label}</p>
            </div>
          ))}
        </div>
        <a
          href="/book-visit"
          className="
            font-sans text-[0.6875rem] font-medium tracking-[0.2em] uppercase
            border border-parchment/30 text-parchment px-8 py-3
            hover:bg-parchment hover:text-charcoal transition-colors duration-200
          "
        >
          Book a Visit →
        </a>
      </div>
    </section>
  )
}
