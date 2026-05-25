import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.finetailors.co.uk'
  return [
    // Core pages
    { url: base,                                        lastModified: new Date(), changeFrequency: 'daily',   priority: 1.0 },
    { url: `${base}/get-started`,                       lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.95 },
    { url: `${base}/how-it-works`,                      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/about`,                             lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },

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

    // Hub pages
    { url: `${base}/tailor-near-me`,                    lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.97 },
    { url: `${base}/locations`,                         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/services`,                          lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },

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
    { url: `${base}/tailor-victoria`,                    lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
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
    { url: `${base}/blog/how-to-know-if-suit-needs-altering`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/blog/suit-alterations-canary-wharf`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/blog/collection-tailor-vs-shop-london`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/blog/wedding-dress-alterations-london`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/blog/leather-jacket-alterations-london-guide`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/blog/best-tailor-london`,           lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/blog/suit-alteration-cost-london`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/blog/tailor-near-me-london`,        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/blog/master-tailor-home-visit-london`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/blog/how-door-to-door-tailoring-works-london`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.75 },
    { url: `${base}/blog/suit-alterations-at-home-london`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.75 },
    { url: `${base}/blog/why-mayfair-clients-choose-visiting-tailor`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/blog/difference-between-alterations-and-bespoke`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },

    // Service pages — new (Batch 5, May 2026)
    { url: `${base}/zip-repair-london`,                  lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/jeans-alterations-london`,           lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/alterations-near-me-london`,         lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.97 },

    // Service + location combo pages (Batch 7, May 2026)
    { url: `${base}/suit-alterations-mayfair`,           lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/suit-alterations-chelsea`,           lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/suit-alterations-knightsbridge`,     lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/dress-alterations-mayfair`,          lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/dress-alterations-chelsea`,          lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },

    // Blog — Tailor near me local guides (existing)
    { url: `${base}/blog/tailor-near-me-mayfair`,        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/blog/tailor-near-me-chelsea`,        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/blog/tailor-near-me-kensington`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/blog/tailor-near-me-canary-wharf`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/blog/tailor-near-me-shoreditch`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/blog/tailor-near-me-city-of-london`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },

    // Blog — Tailor near me local guides (Batch 6, May 2026 — completes all 22 areas)
    { url: `${base}/blog/tailor-near-me-knightsbridge`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/blog/tailor-near-me-belgravia`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/blog/tailor-near-me-marylebone`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/blog/tailor-near-me-westminster`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/blog/tailor-near-me-victoria`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/blog/tailor-near-me-pimlico`,        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/blog/tailor-near-me-fitzrovia`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/blog/tailor-near-me-bloomsbury`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/blog/tailor-near-me-soho`,           lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/blog/tailor-near-me-covent-garden`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/blog/tailor-near-me-islington`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/blog/tailor-near-me-notting-hill`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/blog/tailor-near-me-paddington`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/blog/tailor-near-me-fulham`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/blog/tailor-near-me-clerkenwell`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/blog/tailor-near-me-south-kensington`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },

    // Blog — FAQ posts
    { url: `${base}/blog/what-is-a-good-suit-fit`,            lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/blog/alterations-that-make-suit-look-expensive`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/blog/how-long-do-alterations-take`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/blog/how-to-prepare-for-tailor-visit`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/blog/is-it-worth-altering-cheap-clothes`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/blog/how-to-make-jeans-fit-better`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/blog/what-can-a-tailor-do-to-a-shirt`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/blog/can-a-tailor-make-clothes-bigger`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/blog/how-many-sizes-can-a-suit-be-altered`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/blog/dress-alteration-cost-london`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/blog/trouser-alteration-cost-london`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/blog/can-a-tailor-fix-a-broken-zip`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.75 },

    // Blog — Batch 4 (May 2026)
    { url: `${base}/blog/tailor-that-comes-to-you-london`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/blog/suit-alterations-near-me-london`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },

    // Blog — Batch 8 (May 2026)
    { url: `${base}/blog/how-much-do-suit-alterations-cost-london`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },

    // Service pages — Batch 8 (May 2026)
    { url: `${base}/can-tailor-collect-from-home-london`,    lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.95 },
    { url: `${base}/alteration-costs-london`,                lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.95 },
    { url: `${base}/evening-wear-alterations-london`,        lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/bridesmaid-dress-alterations-london`,    lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },

    // Legal
    { url: `${base}/terms`,                             lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${base}/privacy`,                           lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
  ]
}
