export type SubItem = {
  id: string
  name: string
  price: number   // GBP, 0 = quote on request
  note?: string   // 'from' | 'quote'
}

export type ServiceCategory = {
  id: string
  name: string
  subtitle: string
  items: SubItem[]
}

export const services: ServiceCategory[] = [
  {
    id: 'trousers',
    name: 'Trousers & Jeans',
    subtitle: 'Hemming, waist & pockets',
    items: [
      { id: 'tr-1',  name: 'Trouser shortening',                                    price: 18 },
      { id: 'tr-2',  name: 'Trouser shortening — same finish / turn-ups / tape',    price: 25 },
      { id: 'tr-3',  name: 'Jeans shortening',                                      price: 18 },
      { id: 'tr-4',  name: 'Jeans shortening — same finish',                        price: 25 },
      { id: 'tr-5',  name: 'Tapering trousers — 2 seam',                            price: 18 },
      { id: 'tr-6',  name: 'Tapering trousers — 4 seam',                            price: 28 },
      { id: 'tr-7',  name: 'Trouser waist adjustment',                              price: 22 },
      { id: 'tr-8',  name: 'Jeans waist — same finish',                             price: 28 },
      { id: 'tr-9',  name: 'Full new pockets',                                      price: 45 },
      { id: 'tr-10', name: 'Half new pockets',                                      price: 25 },
      { id: 'tr-11', name: 'Patch repair — per patch',                              price: 18 },
      { id: 'tr-12', name: 'Trouser length alteration',                             price: 20 },
      { id: 'tr-13', name: 'New zip — trousers',                                    price: 20 },
      { id: 'tr-14', name: 'Rehem',                                                 price: 8  },
    ],
  },
  {
    id: 'jacket',
    name: 'Jackets & Coats',
    subtitle: 'Sleeves, body & lining',
    items: [
      { id: 'jc-1',  name: 'Jacket sleeves — shorten from cuff',                   price: 30 },
      { id: 'jc-2',  name: 'Jacket sleeves — shorten from shoulder',               price: 65 },
      { id: 'jc-3',  name: 'Jacket back take in — 1 seam',                         price: 18 },
      { id: 'jc-4',  name: 'Jacket back take in — 3 seam',                         price: 28 },
      { id: 'jc-5',  name: 'Suit jacket body shorten',                             price: 65 },
      { id: 'jc-6',  name: 'Nero shoulders',                                       price: 35 },
      { id: 'jc-7',  name: 'Arm hole drop',                                        price: 35 },
      { id: 'jc-8',  name: 'Sleeves lengthen',                                     price: 35 },
      { id: 'jc-9',  name: 'Jacket shorten',                                       price: 35 },
      { id: 'jc-10', name: 'Jacket shorten — with zip',                            price: 45 },
      { id: 'jc-11', name: 'Jacket relining',                                      price: 75, note: 'from' },
      { id: 'jc-12', name: 'Coat shortening',                                      price: 45, note: 'from' },
      { id: 'jc-13', name: 'Puffer jacket — sleeves shorten',                      price: 45 },
      { id: 'jc-14', name: 'Puffer jacket — new zip',                              price: 30, note: 'from' },
      { id: 'jc-15', name: 'Puffer jacket — body shortening',                      price: 65 },
    ],
  },
  {
    id: 'dress',
    name: 'Dresses',
    subtitle: 'Shortening, taking in & zips',
    items: [
      { id: 'dr-1', name: 'Plain dress shortening',                                price: 25 },
      { id: 'dr-2', name: 'Dress shortening — 2 layers',                          price: 35, note: 'from' },
      { id: 'dr-3', name: 'Dress take in sides',                                  price: 28 },
      { id: 'dr-4', name: 'Dress take in sides — through zip',                    price: 35, note: 'from' },
      { id: 'dr-5', name: 'New zip on dress',                                     price: 28, note: 'from' },
      { id: 'dr-6', name: 'Shorten straps',                                       price: 18 },
    ],
  },
  {
    id: 'leather',
    name: 'Leather Jackets',
    subtitle: 'Specialist — price on inspection',
    items: [
      { id: 'le-1', name: 'Leather jacket sleeves shorten',                       price: 0, note: 'quote' },
      { id: 'le-2', name: 'Leather jacket body shorten',                          price: 0, note: 'quote' },
      { id: 'le-3', name: 'Leather jacket — add zip',                             price: 0, note: 'quote' },
      { id: 'le-4', name: 'Leather jacket take in',                               price: 0, note: 'quote' },
      { id: 'le-5', name: 'Leather jacket repairs',                               price: 0, note: 'quote' },
    ],
  },
  {
    id: 'occasion',
    name: 'Wedding & Occasion Wear',
    subtitle: 'Bespoke — price on inspection',
    items: [
      { id: 'oc-1', name: 'Wedding dress alterations',                            price: 0, note: 'quote' },
      { id: 'oc-2', name: 'Beaded dress alterations',                             price: 0, note: 'quote' },
      { id: 'oc-3', name: 'Party dress alterations',                              price: 0, note: 'quote' },
      { id: 'oc-4', name: 'Delicate dress alterations',                           price: 0, note: 'quote' },
    ],
  },
]
