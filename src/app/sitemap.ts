import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.finetailors.co.uk'
  return [
    // Core pages
    { url: base,                                        lastModified: new Date(), changeFrequency: 'daily',   priority: 1.0 },
    { url: `${base}/get-started`,                       lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.95 },
    { url: `${base}/how-it-works`,                      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/get-started/call`,                  lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/book`,                              lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },

    // Service pages — core
    { url: `${base}/mobile-tailor-london`,              lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.95 },
    { url: `${base}/suit-alterations-london`,           lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.95 },
    { url: `${base}/dress-alterations-london`,          lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.95 },
    { url: `${base}/clothing-alterations-london`,       lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/trouser-alterations-london`,        lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/jacket-alterations-london`,         lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/coat-alterations-london`,           lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/shirt-alterations-london`,          lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/bespoke-tailoring-london`,          lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/wedding-dress-alterations-london`,  lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/leather-jacket-alterations-london`, lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/same-day-alterations-london`,       lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.85 },
    // Service pages — luxury brands
    { url: `${base}/canada-goose-alterations-london`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/moncler-jacket-alterations-london`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/barbour-alterations-london`,        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },

    // Location pages — existing
    { url: `${base}/tailor-mayfair`,                    lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/tailor-chelsea`,                    lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/tailor-knightsbridge`,              lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/tailor-kensington`,                 lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/tailor-belgravia`,                  lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/tailor-marylebone`,                 lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/tailor-westminster`,                lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/tailor-notting-hill`,               lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/tailor-south-kensington`,           lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/tailor-fulham`,                     lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/tailor-islington`,                  lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/tailor-soho`,                       lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/tailor-city-of-london`,             lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    // Location pages — new
    { url: `${base}/tailor-covent-garden`,              lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/tailor-canary-wharf`,               lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/tailor-fitzrovia`,                  lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/tailor-bloomsbury`,                 lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/tailor-paddington`,                 lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/tailor-pimlico`,                    lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/tailor-clerkenwell`,                lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/tailor-shoreditch`,                 lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },

    // Blog
    { url: `${base}/blog`,                              lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.75 },
    { url: `${base}/blog/complete-guide-suit-alterations-london`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/blog/suit-alterations-canary-wharf`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/blog/wedding-dress-alterations-london`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/blog/best-tailor-london`,           lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/blog/suit-alteration-cost-london`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/blog/tailor-near-me-london`,        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/blog/master-tailor-home-visit-london`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/blog/how-door-to-door-tailoring-works-london`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.75 },
    { url: `${base}/blog/suit-alterations-at-home-london`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.75 },
    { url: `${base}/blog/why-mayfair-clients-choose-visiting-tailor`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/blog/difference-between-alterations-and-bespoke`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },

    // About
    { url: `${base}/about`,                             lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },

    // Legal
    { url: `${base}/terms`,                             lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${base}/privacy`,                           lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
  ]
}
