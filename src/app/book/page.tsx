import type { Metadata } from 'next'
import BookRedirect from './BookRedirect'

export const metadata: Metadata = {
  title: 'Book a Home Visit — Fine Tailors',
  description: 'Book a tailor to come to your London home. £20 consultation fee, credited to your final order. Same unified booking flow — slot selection, address, and payment in one place.',
  openGraph: {
    title: 'Book a Home Visit — Fine Tailors',
    description: 'Book a tailor to come to your London home. £20 consultation fee, credited to your final order.',
    url: 'https://www.finetailors.co.uk/book',
    images: [
      {
        url: '/images/tailor.jpg',
        width: 1200,
        height: 630,
        alt: 'Book a tailoring home visit — Fine Tailors London',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book a Home Visit — Fine Tailors',
    description: 'Book a tailor to come to your London home.',
    images: ['/images/tailor.jpg'],
  },
  alternates: {
    canonical: 'https://www.finetailors.co.uk/book',
  },
}

const bookSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.finetailors.co.uk/book#webpage',
      url: 'https://www.finetailors.co.uk/book',
      name: 'Book a Home Visit — Fine Tailors',
      description: 'Book a tailor to come to your London home. £20 consultation fee, credited to your order.',
      isPartOf: { '@id': 'https://www.finetailors.co.uk/#website' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home',           item: 'https://www.finetailors.co.uk' },
          { '@type': 'ListItem', position: 2, name: 'Book a Visit',   item: 'https://www.finetailors.co.uk/book' },
        ],
      },
    },
  ],
}

export default function BookPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSchema) }}
      />
      <BookRedirect />
    </>
  )
}
