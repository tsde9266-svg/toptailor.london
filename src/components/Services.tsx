'use client'
import { useScrollReveal } from '@/hooks/useScrollReveal'

/* ─── Desktop: 4 grouped categories (matches desktop.html) ─── */
const desktopServices = [
  {
    num: '01',
    category: 'ALTERATIONS',
    title: 'The Architectural Fit',
    body: 'Suit resizing, trouser tapering, and shoulder reconstruction for a permanent, sharp silhouette.',
  },
  {
    num: '02',
    category: 'REPAIR',
    title: 'Heritage Restoration',
    body: 'Invisible mending of vintage silks, cashmere reweaving, and lining replacement with Bemberg cotton.',
  },
  {
    num: '03',
    category: 'BESPOKE',
    title: 'Personal Commissions',
    body: 'Custom-drafted patterns for unique wardrobe staples, built to last a lifetime.',
  },
  {
    num: '04',
    category: 'CURATION',
    title: 'Wardrobe Refinement',
    body: 'Consultation on garment longevity and seasonal rotation for the discerning professional.',
  },
]

/* ─── Mobile: 10 individual services (matches mobile.html + CONTEXT.md) ─── */
const mobileServices = [
  {
    name: 'Suit & Jacket Alterations',
    sub: 'Perfecting the silhouette',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2A5220" strokeWidth="0.8">
        <rect width="16" height="16" x="4" y="4" />
        <path d="M4 4L20 20M20 4L4 20" />
      </svg>
    ),
  },
  {
    name: 'Trouser Tailoring',
    sub: 'Hemming and waist adjustments',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2A5220" strokeWidth="0.8">
        <path d="M12 2L2 22H22L12 2Z" />
      </svg>
    ),
  },
  {
    name: 'Dress & Skirt Alterations',
    sub: 'Evening and day wear refinement',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2A5220" strokeWidth="0.8">
        <path d="M6 2L18 2L21 22H3L6 2Z" />
      </svg>
    ),
  },
  {
    name: 'Shirt & Blouse Tailoring',
    sub: 'Darting and sleeve shortening',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2A5220" strokeWidth="0.8">
        <path d="M4 6L12 2L20 6M4 6V22H20V6M4 6L12 10L20 6" />
      </svg>
    ),
  },
  {
    name: 'Wedding & Occasion Wear',
    sub: 'Bespoke bridal and groom fitting',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2A5220" strokeWidth="0.8">
        <path d="M12 2L4 8V22H20V8L12 2Z" />
      </svg>
    ),
  },
  {
    name: 'Leather & Specialist Fabric',
    sub: 'Specialist material handling',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2A5220" strokeWidth="0.8">
        <ellipse cx="12" cy="12" rx="8" ry="10" />
        <line x1="12" y1="2" x2="12" y2="22" />
      </svg>
    ),
  },
  {
    name: 'Invisible Mending',
    sub: 'Restoring fabric integrity',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2A5220" strokeWidth="0.8">
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7V22M10 15L14 17M10 18L14 20" />
      </svg>
    ),
  },
  {
    name: 'Zip, Button & Clasp Repairs',
    sub: 'Replacements and repairs',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2A5220" strokeWidth="0.8">
        <circle cx="12" cy="12" r="4" />
        <line x1="12" y1="2" x2="12" y2="8" />
        <line x1="12" y1="16" x2="12" y2="22" />
      </svg>
    ),
  },
  {
    name: 'Wardrobe Refresh',
    sub: 'Full collection assessment',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2A5220" strokeWidth="0.8">
        <rect width="16" height="4" x="4" y="4" />
        <rect width="16" height="4" x="4" y="10" />
        <rect width="16" height="4" x="4" y="16" />
      </svg>
    ),
  },
  {
    name: 'Something else / not sure',
    sub: 'Unique bespoke requests',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2A5220" strokeWidth="0.8">
        <path d="M12 5V19M5 12H19" />
      </svg>
    ),
  },
]

/* ─── Chevron icon (mobile rows) ─── */
function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C4B99A" strokeWidth="1">
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}

export default function Services() {
  const sectionRef = useScrollReveal<HTMLElement>()

  return (
    <section
      id="services"
      ref={sectionRef}
      className="reveal-on-scroll"
    >
      {/* ══ DESKTOP layout (≥ lg) ══════════════════════════════ */}
      <div className="hidden lg:block px-24 py-24">
        <div className="flex gap-24">
          {/* Left intro — 1/3 */}
          <div className="w-1/3">
            <h2 className="font-playfair text-[1.75rem] font-medium mb-6">
              SERVICES &amp; <br />
              <em className="font-playfair italic">Mastery</em>
            </h2>
            <div className="rule-h mb-8" />
            <p className="font-sans font-light text-sm leading-loose text-muted">
              Every garment undergoes a rigorous assessment. From structural
              reinforcements to delicate invisible mending, this one-person
              atelier ensures total consistency in every stitch.
            </p>
          </div>

          {/* Right grid — 2/3, 2 columns */}
          <div className="w-2/3 grid grid-cols-2 gap-12">
            {desktopServices.map((svc, i) => (
              <div
                key={svc.num}
                className="group border-b border-divider pb-8 reveal-on-scroll"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span className="font-sans text-[0.65rem] text-hunter font-medium block mb-4 uppercase tracking-tighter">
                  {svc.num}. {svc.category}
                </span>
                <h3
                  className="
                    font-playfair text-xl mb-4
                    group-hover:text-hunter transition-colors duration-200
                  "
                >
                  {svc.title}
                </h3>
                {/* Animated underline on hover */}
                <div className="h-px bg-forest w-0 group-hover:w-full transition-all duration-300 mb-4" />
                <p className="font-sans text-sm font-light text-muted leading-relaxed mb-6">
                  {svc.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ MOBILE layout (< lg) ══════════════════════════════ */}
      <div className="lg:hidden bg-parchment py-20 px-8">
        <div className="mb-12">
          <h2 className="font-playfair text-[2rem] text-hunter italic">
            Our Atelier
          </h2>
          <div className="w-12 h-px bg-hunter mt-2" />
        </div>

        <div>
          {mobileServices.map((svc, i) => (
            <div
              key={svc.name}
              className="
                grid items-center py-6
                reveal-on-scroll
                hairline-t
                last:hairline-b
              "
              style={{
                gridTemplateColumns: '40px 1fr 24px',
                transitionDelay: `${i * 50}ms`,
              }}
            >
              <div className="flex-shrink-0">{svc.icon}</div>
              <div className="px-4">
                <p className="font-playfair text-[1.0625rem] text-charcoal">
                  {svc.name}
                </p>
                <p className="font-sans text-[0.6875rem] text-muted uppercase tracking-wider">
                  {svc.sub}
                </p>
              </div>
              <ChevronRight />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
