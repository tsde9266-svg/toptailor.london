import type { VoucherType } from './kv'

export const VOUCHER_TYPE_LABEL: Record<VoucherType, string> = {
  return_customer: 'Return Customer',
  special:         'Special',
  general:         'General',
}

// Badge colors — bg + text, used on list badges
export const VOUCHER_TYPE_COLOR: Record<VoucherType, string> = {
  return_customer: 'bg-amber-100 text-amber-800',
  special:         'bg-purple-100 text-purple-800',
  general:         'bg-blue-100 text-blue-700',
}

// Border color class only — for picker buttons that need their own width class
export const VOUCHER_TYPE_BORDER: Record<VoucherType, string> = {
  return_customer: 'border-amber-300',
  special:         'border-purple-300',
  general:         'border-blue-200',
}

export const BUSINESS = {
  name:            'Fine Tailors',
  email:           'tsde9266@gmail.com',
  phone:           '+44 7438 145169',
  city:            'London, United Kingdom',
  googleReviewUrl: 'https://g.page/r/CXKPw3jGYLPQEBM/review',
}

