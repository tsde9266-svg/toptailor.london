export type SubItem = {
  id: string
  name: string
  price: number   // GBP
  note?: string   // e.g. "from" — price is a starting point
}

export type ServiceCategory = {
  id: string
  name: string
  subtitle: string
  items: SubItem[]
}

export const services: ServiceCategory[] = [
  {
    id: 'suit-jacket',
    name: 'Suit & Jacket Alterations',
    subtitle: 'Perfecting the silhouette',
    items: [
      { id: 'sj-1', name: 'Shorten sleeves',                    price: 18 },
      { id: 'sj-2', name: 'Shorten sleeves with buttonholes',   price: 28 },
      { id: 'sj-3', name: 'Take in / let out sides',            price: 45 },
      { id: 'sj-4', name: 'Shorten jacket body',                price: 55 },
      { id: 'sj-5', name: 'Alter shoulders',                    price: 85 },
      { id: 'sj-6', name: 'Reline jacket',                      price: 95 },
    ],
  },
  {
    id: 'trouser',
    name: 'Trouser Tailoring',
    subtitle: 'Hemming and waist adjustments',
    items: [
      { id: 'tr-1', name: 'Hem trousers — plain',               price: 14 },
      { id: 'tr-2', name: 'Hem trousers — turn-up',             price: 18 },
      { id: 'tr-3', name: 'Take in / let out waist',            price: 22 },
      { id: 'tr-4', name: 'Take in / let out seat',             price: 28 },
      { id: 'tr-5', name: 'Taper trouser legs',                 price: 35 },
    ],
  },
  {
    id: 'dress-skirt',
    name: 'Dress & Skirt Alterations',
    subtitle: 'Evening and day wear refinement',
    items: [
      { id: 'ds-1', name: 'Shorten — straight hem',             price: 28 },
      { id: 'ds-2', name: 'Shorten — layered or pleated',       price: 45 },
      { id: 'ds-3', name: 'Take in sides',                      price: 35 },
      { id: 'ds-4', name: 'Take in waist',                      price: 30 },
      { id: 'ds-5', name: 'Shorten straps',                     price: 18 },
    ],
  },
  {
    id: 'shirt-blouse',
    name: 'Shirt & Blouse Tailoring',
    subtitle: 'Darting and sleeve shortening',
    items: [
      { id: 'sb-1', name: 'Take in sides',                      price: 28 },
      { id: 'sb-2', name: 'Shorten body length',                price: 22 },
      { id: 'sb-3', name: 'Shorten sleeves',                    price: 22 },
      { id: 'sb-4', name: 'Slim fit conversion',                price: 45 },
    ],
  },
  {
    id: 'wedding',
    name: 'Wedding & Occasion Wear',
    subtitle: 'Bespoke bridal and groom fitting',
    items: [
      { id: 'wo-1', name: 'Bridal gown alterations',            price: 120, note: 'from' },
      { id: 'wo-2', name: 'Bridesmaid dress',                   price: 60,  note: 'from' },
      { id: 'wo-3', name: 'Shorten wedding dress',              price: 85,  note: 'from' },
      { id: 'wo-4', name: 'Groom suit alterations',             price: 80,  note: 'from' },
    ],
  },
  {
    id: 'leather',
    name: 'Leather & Specialist Fabric',
    subtitle: 'Specialist material handling',
    items: [
      { id: 'le-1', name: 'Leather jacket alteration',          price: 75,  note: 'from' },
      { id: 'le-2', name: 'Shorten leather jacket',             price: 95,  note: 'from' },
      { id: 'le-3', name: 'Technical fabric alteration',        price: 65,  note: 'from' },
    ],
  },
  {
    id: 'repairs',
    name: 'Zip, Button & Clasp Repairs',
    subtitle: 'Replacements and repairs',
    items: [
      { id: 're-1', name: 'Replace trouser zip',                price: 28 },
      { id: 're-2', name: 'Replace dress or jacket zip',        price: 38 },
      { id: 're-3', name: 'Replace buttons (set of 4)',         price: 22 },
      { id: 're-4', name: 'Replace clasp or hook',              price: 18 },
    ],
  },
]
