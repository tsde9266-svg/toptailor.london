import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Wedding Dress Alterations in London: Timeline and What to Expect | Fine Tailors',
  description: 'A practical guide to wedding dress alterations in London — when to book, what can be altered, typical costs, and why a collection service is safer for a delicate gown.',
  alternates: { canonical: 'https://www.finetailors.co.uk/blog/wedding-dress-alterations-london' },
  keywords: [
    'wedding dress alterations London',
    'bridal alterations London',
    'wedding dress alterations timeline',
    'wedding dress tailor London',
    'wedding dress hemming London',
  ],
  openGraph: {
    title: 'Wedding Dress Alterations in London: Timeline and What to Expect',
    description: 'When to book, what to expect and why collection is safer for your wedding dress. A practical guide to bridal alterations in London.',
    url: 'https://www.finetailors.co.uk/blog/wedding-dress-alterations-london',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Wedding dress alterations London guide' }],
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Wedding Dress Alterations in London: Timeline and What to Expect',
  description: 'A practical guide to wedding dress alterations in London — when to book, what can be altered, realistic costs and why a home collection service protects your dress.',
  image: 'https://www.finetailors.co.uk/og-image.png',
  author: { '@type': 'Organization', '@id': 'https://www.finetailors.co.uk/#organization', name: 'Fine Tailors' },
  publisher: { '@type': 'Organization', '@id': 'https://www.finetailors.co.uk/#organization', name: 'Fine Tailors', logo: { '@type': 'ImageObject', url: 'https://www.finetailors.co.uk/logo-icon.png' } },
  datePublished: '2026-05-21',
  dateModified: '2026-05-21',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.finetailors.co.uk/blog/wedding-dress-alterations-london' },
  keywords: 'wedding dress alterations London, bridal alterations London, wedding dress timeline London',
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.finetailors.co.uk/blog' },
    { '@type': 'ListItem', position: 3, name: 'Wedding Dress Alterations London', item: 'https://www.finetailors.co.uk/blog/wedding-dress-alterations-london' },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How far in advance should I book wedding dress alterations in London?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For complex alterations — significant hemming on layered gowns, structural bodice work, bustle fitting — book 10–12 weeks before your wedding date. For simpler work such as a single hem adjustment, 6–8 weeks is usually sufficient. Always contact a tailor as early as possible; popular dates fill quickly.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much do wedding dress alterations cost in London?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Wedding dress alteration costs in London vary significantly by gown complexity. Simple hemming on a straight gown may cost £80–£120. Complex work on a layered ball gown — multiple hem layers, bodice adjustment, bustle fitting — can cost £200–£400 or more. Every gown is quoted individually after inspection.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens if I lose or gain weight before my wedding?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This is common. The final fitting should happen as close to the wedding as possible — ideally 2–4 weeks before — to account for any weight changes. Do not have a complete alteration done months in advance if you expect your body to change. Book the initial consultation early but schedule the main work for closer to the date.',
      },
    },
  ],
}

export default function WeddingDressAlterationsLondonBlog() {
  return (
    <>
      <Script id="schema-article-wd" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Script id="schema-breadcrumb-wd" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="schema-faq-wd" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">
        <article className="px-8 lg:px-24 py-20 max-w-3xl">

          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-hunter">Blog</Link>
            <span className="mx-2">/</span>
            <span>Wedding Dress Alterations London</span>
          </nav>

          <div className="font-sans text-xs text-muted mb-6">21 May 2026 · 8 min read</div>

          <h1 className="font-playfair text-[2.5rem] lg:text-[3rem] leading-[1.1] font-medium text-charcoal mb-8">
            Wedding Dress Alterations in London: Timeline and What to Expect
          </h1>

          <p className="font-sans font-light text-lg text-muted leading-relaxed mb-8">
            <strong>Wedding dress alterations in London</strong> are one of the most important and most anxiety-inducing parts of wedding preparation for many brides. The dress is often the most expensive single garment ever purchased. Getting the alterations wrong — or leaving them too late — is not an option.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            This guide covers the complete timeline, what alterations are possible, what they cost, and the practical logistics — including why having a tailor collect your dress rather than transporting it yourself is worth considering seriously.
          </p>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4 mt-10">The Wedding Dress Alteration Timeline</h2>

          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Most wedding dress alterations happen in stages. Here is the standard timeline for a gown requiring significant work:
          </p>

          <div className="space-y-4 mb-8">
            {[
              {
                time: '10–12 weeks before',
                title: 'First consultation and collection',
                desc: 'The dress is collected (or you attend a consultation) and inspected. A written quote is provided covering all required work. Work begins on the major structural alterations — bodice adjustment, hem marking, strap work.',
              },
              {
                time: '6–8 weeks before',
                title: 'First fitting',
                desc: 'Major alterations are reviewed. The dress is tried on and any adjustments to the first-stage work are noted. This is often where bustle options are discussed and decided.',
              },
              {
                time: '3–4 weeks before',
                title: 'Second fitting or final adjustment',
                desc: 'Any weight changes since the first fitting are accommodated. Final details — bustling, hook-and-eye placement, any embellishment work — are confirmed.',
              },
              {
                time: '1–2 weeks before',
                title: 'Final return',
                desc: 'The dress is returned pressed and perfectly finished. Minor emergency adjustments are accommodated if needed at this stage.',
              },
            ].map(({ time, title, desc }) => (
              <div key={time} className="border border-divider p-5">
                <div className="font-sans text-xs text-hunter uppercase tracking-[0.15em] mb-2">{time}</div>
                <h3 className="font-playfair font-medium text-charcoal mb-2">{title}</h3>
                <p className="font-sans font-light text-muted text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            For simpler alterations — a single hem adjustment on a straightforward gown, or strap shortening only — a 4–6 week timeline with one or two fittings is often sufficient. Contact the tailor early to discuss your specific dress and confirm what is needed.
          </p>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4 mt-10">What Can Be Altered on a Wedding Dress?</h2>

          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            The range of possible alterations depends heavily on the gown&apos;s construction. Here is what is achievable on most wedding dresses:
          </p>

          <div className="space-y-4 mb-8">
            {[
              {
                title: 'Hem shortening',
                possible: 'Almost always',
                desc: 'The hem is the most common wedding dress alteration. On a simple satin or crepe gown, hemming is relatively straightforward. On a layered gown with lace, tulle and multiple underskirts, hemming is complex — each layer must be handled individually and the finished length on each layer must be precise. This is where cheap alterations show.',
              },
              {
                title: 'Bodice taking-in',
                possible: 'Usually',
                desc: 'Reducing the bodice through the bust, waist and back is achievable on most gowns. How visible the alteration is depends on the fabric and construction — lace is particularly unforgiving of poorly placed seams.',
              },
              {
                title: 'Strap and neckline adjustment',
                possible: 'Yes',
                desc: 'Strap shortening and repositioning are among the simpler alterations. Neckline adjustments are more complex and depend on the construction — always discuss with the tailor.',
              },
              {
                title: 'Bustle fitting',
                possible: 'Yes',
                desc: 'A bustle lifts the train for the reception so you can move and dance without managing metres of fabric. There are several bustle styles — button, French, American — and the right choice depends on the dress. This is usually discussed at the second fitting.',
              },
              {
                title: 'Making the dress larger',
                possible: 'Depends on seam allowance',
                desc: 'Letting a dress out is only possible where there is sufficient seam allowance — this varies significantly by designer and construction. Some designer gowns have generous allowances; others are cut with no margin. Ask the tailor to assess this before purchasing a dress that is too small.',
              },
              {
                title: 'Zip replacement',
                possible: 'Yes',
                desc: 'A faulty zip can be replaced. This requires careful work to preserve the fabric and boning around the zip area.',
              },
            ].map(({ title, possible, desc }) => (
              <div key={title} className="border border-divider p-5">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-playfair text-base font-medium text-charcoal">{title}</h3>
                  <span className="font-sans text-xs text-hunter border border-hunter px-2 py-1 shrink-0 ml-4">{possible}</span>
                </div>
                <p className="font-sans font-light text-muted text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4 mt-10">What Wedding Dress Alterations Cost in London</h2>

          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Wedding dress alteration costs in London are highly variable — the most honest answer is that every gown is different. Here are typical ranges:
          </p>

          <div className="border border-divider divide-y divide-divider mb-6">
            {[
              ['Simple hem (straight gown)', '£80–£120', 'Single-layer satin or crepe'],
              ['Layered hem (tulle/lace)', '£150–£300+', 'Multiple layers, each cut separately'],
              ['Bodice taking-in', '£80–£150', 'Depends on construction and lace'],
              ['Strap adjustment', '£40–£80', 'Per strap'],
              ['Bustle fitting', '£60–£120', 'Depends on bustle type'],
              ['Full package (hem + bodice + bustle)', '£300–£500+', 'Complex gowns — quoted individually'],
            ].map(([service, range, note]) => (
              <div key={service} className="flex flex-wrap justify-between px-4 py-3 gap-2">
                <div>
                  <span className="font-sans font-light text-muted text-sm block">{service}</span>
                  <span className="font-sans font-light text-muted/70 text-xs">{note}</span>
                </div>
                <span className="font-sans font-medium text-charcoal text-sm">{range}</span>
              </div>
            ))}
          </div>

          <p className="font-sans text-sm font-light text-muted mb-8">All Fine Tailors wedding dress work is quoted individually after inspection. Collection and return to your London address included.</p>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4 mt-10">Why Collection Is Safer for a Wedding Dress</h2>

          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            A wedding dress is not like other garments. Transporting it is a genuine concern — lace catches, tulle crushes, structured bodices can be distorted by poor packing. Many brides travel to a tailor with the dress in a large bag or box, on public transport or in the back of a car, hoping nothing goes wrong.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            A collection-based service removes this entirely. Fine Tailors collects your dress from your Central London home, transports it carefully to our workshop, and returns it to your address. Your dress never sits in a shop window or communal storage. It is handled by one tailor throughout and returned directly to you.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            This is particularly relevant for brides in areas like <Link href="/tailor-mayfair" className="text-hunter underline">Mayfair</Link>, <Link href="/tailor-knightsbridge" className="text-hunter underline">Knightsbridge</Link> and <Link href="/tailor-chelsea" className="text-hunter underline">Chelsea</Link> who have purchased from nearby boutiques and simply want the dress altered without the logistical complexity.
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
            <p className="font-sans font-light text-muted mb-6 max-w-lg leading-relaxed">
              See our dedicated{' '}
              <Link href="/wedding-dress-alterations-london" className="text-hunter underline">wedding dress alterations service page</Link> for full details and to book a collection.
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
