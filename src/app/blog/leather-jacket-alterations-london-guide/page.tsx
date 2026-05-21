import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Leather Jacket Alterations in London: What to Expect | Fine Tailors',
  description: 'What can and cannot be altered on a leather jacket — and why specialist handling matters. A guide for London clients with premium leather garments.',
  alternates: { canonical: 'https://www.finetailors.co.uk/blog/leather-jacket-alterations-london-guide' },
  keywords: ['leather jacket alterations london', 'leather jacket tailor london', 'leather jacket sleeve shortening london', 'alter leather jacket london'],
  openGraph: {
    title: 'Leather Jacket Alterations in London: What to Expect',
    description: 'What can be altered on a leather jacket, what cannot, and why specialist handling is non-negotiable for premium leather.',
    url: 'https://www.finetailors.co.uk/blog/leather-jacket-alterations-london-guide',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Leather jacket alterations London guide' }],
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Leather Jacket Alterations in London: What to Expect',
  description: 'What can and cannot be altered on a leather jacket — and why specialist handling matters. For London clients with premium leather garments.',
  image: 'https://www.finetailors.co.uk/og-image.png',
  author: { '@type': 'Organization', '@id': 'https://www.finetailors.co.uk/#organization', name: 'Fine Tailors' },
  publisher: { '@type': 'Organization', '@id': 'https://www.finetailors.co.uk/#organization', name: 'Fine Tailors', logo: { '@type': 'ImageObject', url: 'https://www.finetailors.co.uk/logo-icon.png' } },
  datePublished: '2026-05-21',
  dateModified: '2026-05-21',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.finetailors.co.uk/blog/leather-jacket-alterations-london-guide' },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.finetailors.co.uk/blog' },
    { '@type': 'ListItem', position: 3, name: 'Leather Jacket Alterations London Guide', item: 'https://www.finetailors.co.uk/blog/leather-jacket-alterations-london-guide' },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can leather jacket sleeves be shortened in London?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, leather jacket sleeves can be shortened. It requires specialist equipment — leather needles, appropriate thread, and experience finishing leather at the cuff without distorting the hem. The result is generally clean and invisible when done correctly. Not all tailors have leather-capable equipment, so ask before booking.',
      },
    },
    {
      '@type': 'Question',
      name: 'Will there be visible marks after leather jacket alterations?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Needle holes in leather are more visible than in fabric, particularly immediately after alteration. On smooth leather, old seam lines may be faintly visible — this varies by leather type and colour. A specialist tailor will advise you on what to expect on your specific jacket before work begins.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does it cost to alter a leather jacket in London?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Leather jacket alteration costs in London vary by the type and extent of the work. Sleeve shortening typically costs £60–£120 depending on the cuff construction. Body take-in is assessed individually. All leather jacket work at Fine Tailors is quoted individually after inspection — there are no fixed prices because each jacket is different.',
      },
    },
  ],
}

export default function LeatherJacketAlterationsLondonGuide() {
  return (
    <>
      <Script id="schema-article-lj" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Script id="schema-breadcrumb-lj" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="schema-faq-lj" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">
        <article className="px-8 lg:px-24 py-20 max-w-3xl">

          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-hunter">Blog</Link>
            <span className="mx-2">/</span>
            <span>Leather Jacket Alterations London Guide</span>
          </nav>

          <div className="font-sans text-xs text-muted mb-6">21 May 2026 · 6 min read</div>

          <h1 className="font-playfair text-[2.5rem] lg:text-[3rem] leading-[1.1] font-medium text-charcoal mb-8">
            Leather Jacket Alterations in London: What to Expect
          </h1>

          <p className="font-sans font-light text-lg text-muted leading-relaxed mb-8">
            <strong>Leather jacket alterations</strong> are one of the more specialist areas of tailoring — not because the alterations are inherently more difficult, but because leather behaves fundamentally differently from fabric and requires different equipment, techniques and honesty about what is achievable. This guide covers what can be altered, what cannot, and what to look for in a tailor.
          </p>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4 mt-10">Why Leather Is Different</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            When you sew fabric, an unsuccessful stitch can be unpicked and the fabric springs back with minimal trace. When you sew leather, the needle hole is permanent. Unpicking a leather seam leaves visible perforations. This means that a tailor who makes an error on a leather jacket cannot simply undo it — and a client who approves an alteration needs to understand the commitment before it begins.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Leather also requires specific sewing equipment — industrial machines with leather-capable needles and appropriate thread tension. A standard domestic or light commercial machine will struggle with thick leather and may produce uneven or skipped stitches. Not every tailoring shop has this equipment.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            Finally, different leathers behave differently. Full-grain leather is more forgiving than corrected-grain. Lambskin is more delicate than cowhide. The specific jacket — its leather type, thickness, lining construction and brand — affects what is achievable and what the result will look like.
          </p>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4 mt-10">What Can Be Altered</h2>
          <div className="space-y-4 mb-8">
            {[
              {
                title: 'Sleeve shortening',
                achievable: 'Yes — most jackets',
                desc: 'The most commonly requested leather jacket alteration. The sleeve is shortened at the cuff, with the original cuff construction preserved where possible. On jackets with zip cuffs, the zip must be carefully detached and reattached. On plain leather cuffs, the hem is stitched with matching thread. The result is clean when done by a leather specialist.',
              },
              {
                title: 'Body take-in',
                achievable: 'Yes — assessed per jacket',
                desc: 'Taking in the side seams to slim the body of the jacket. The result depends heavily on the jacket\'s original seam construction. On well-constructed jackets with clean side seams, this works well. On jackets with detailed panel construction, the alteration may affect the panel alignment. Always discussed and agreed before work begins.',
              },
              {
                title: 'Length shortening',
                achievable: 'Sometimes',
                desc: 'Shortening the overall length of the jacket. Achievable on many styles, but the hem finish must be considered — rolled, stitched or raw edge depending on the original construction. Not all leather jackets are suitable for shortening.',
              },
              {
                title: 'Zip replacement',
                achievable: 'Yes',
                desc: 'Main zip and pocket zip replacement. Finding matching hardware is important — YKK and other quality zips are available in most finishes. A specialist tailor will source a close match.',
              },
              {
                title: 'Lining repair',
                achievable: 'Yes',
                desc: 'Replacing or repairing the interior lining. This is often separate from the leather work — fabric lining is handled with standard equipment after any leather work is complete.',
              },
            ].map(({ title, achievable, desc }) => (
              <div key={title} className="border border-divider p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-playfair text-base font-medium text-charcoal">{title}</h3>
                  <span className="font-sans text-xs text-hunter border border-hunter px-2 py-1 shrink-0 ml-4">{achievable}</span>
                </div>
                <p className="font-sans font-light text-muted text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4 mt-10">What Cannot Be Altered</h2>
          <div className="space-y-4 mb-8">
            {[
              ['Making it significantly larger', 'Leather cannot be stretched. If the jacket is too small in the chest or shoulders, it cannot be made larger. The seam allowance determines the maximum let-out — many leather jackets have limited allowance.'],
              ['Undoing prior alterations cleanly', 'If a jacket has been previously altered and you want to reverse it, the old needle holes will be visible. This is a fundamental property of leather.'],
              ['Shoulder alterations', 'Shoulder alterations on leather jackets are technically possible but extremely difficult. The cost is usually not justified unless the jacket is of very high value.'],
            ].map(([title, desc]) => (
              <div key={title} className="border-l-2 border-red-300 pl-4 mb-4">
                <p className="font-playfair font-medium text-charcoal mb-1">{title}</p>
                <p className="font-sans font-light text-muted text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4 mt-10">Why Collection Makes Sense for Leather</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            A quality leather jacket — from <Link href="/canada-goose-alterations-london" className="text-hunter underline">Canada Goose</Link>, <Link href="/moncler-jacket-alterations-london" className="text-hunter underline">Moncler</Link>, or a premium leather biker jacket — is a significant investment. Carrying it across London to a high-street shop introduces transport risk. Leaving it in a shop for a week introduces storage risk.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            Fine Tailors collects from your <Link href="/tailor-mayfair" className="text-hunter underline">Mayfair</Link>, <Link href="/tailor-knightsbridge" className="text-hunter underline">Knightsbridge</Link> or <Link href="/tailor-notting-hill" className="text-hunter underline">Notting Hill</Link> address, assesses the jacket, sends a written quote covering exactly what is achievable and what the result will look like, and proceeds only with your approval. The jacket goes from your door to our workshop and straight back — fully insured throughout.
          </p>

          <div className="border-t border-divider pt-8 mt-8">
            <h2 className="font-playfair text-[1.5rem] font-medium mb-6">Frequently Asked Questions</h2>
            <dl className="space-y-6">
              {faqSchema.mainEntity.map((item: { name: string; acceptedAnswer: { text: string } }) => (
                <div key={item.name} className="border-b border-divider pb-6 last:border-0">
                  <dt className="font-playfair font-medium text-charcoal mb-2">{item.name}</dt>
                  <dd className="font-sans font-light text-muted leading-relaxed text-sm">{item.acceptedAnswer.text}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="border-t border-divider pt-8 mt-8">
            <p className="font-sans font-light text-muted mb-6">
              See our dedicated <Link href="/leather-jacket-alterations-london" className="text-hunter underline">leather jacket alterations service</Link> for booking information.
            </p>
            <div className="flex gap-6 flex-wrap items-center">
              <Link href="/get-started" className="bg-hunter text-parchment px-10 py-4 font-sans text-xs font-medium tracking-[0.15em] uppercase hover:bg-[#1E3D17] transition-colors">
                Book a Collection
              </Link>
              <a href="tel:+447438145169" className="font-sans text-sm font-medium text-charcoal hover:text-hunter transition-colors">
                +44 7438 145169
              </a>
            </div>
          </div>

        </article>
      </main>
      <Footer />
    </>
  )
}
