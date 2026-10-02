import type { DaySchedule, SocialLink } from './types'

const phoneDigits = '258871854417'

export const restaurant = {
  name: 'Bom Paladar',
  legalName: 'Bom Paladar Restaurante & Bar',
  tagline: 'Restaurante & Bar',
  description:
    'Restaurante & Bar em Quelimane com pizzas, massas, lasanhas, mariscos, carnes grelhadas e uma carta de cocktails de assinatura.',
  // TODO: replace with the final production domain before deploying (used in canonical, OG, sitemap).
  siteUrl: 'https://bompaladar.co.mz',
  locale: 'pt_MZ',
  currency: 'MZN',
  address: {
    street: 'Rua Robert Mugabe',
    city: 'Quelimane',
    region: 'Zambézia',
    country: 'Moçambique',
    countryCode: 'MZ',
  },
  phone: {
    display: '+258 87 185 4417',
    href: `tel:+${phoneDigits}`,
    whatsapp: `https://wa.me/${phoneDigits}`,
  },
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Bom%20Paladar%20Restaurante%20%26%20Bar%2C%20Rua%20Robert%20Mugabe%2C%20Quelimane',
  rating: { value: 4.3, count: 6, source: 'Google' },
  highlight: 'Serve ótimos cocktails',
  // Only the closing time (00:00) is confirmed. Set `opens` (e.g. '10:00') and check the days once confirmed.
  hours: [
    {
      days: 'Todos os dias',
      schemaDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      closes: '00:00',
    },
  ] as DaySchedule[],
}

// Add Facebook / Instagram here once confirmed; empty hrefs are not rendered.
export const socials: SocialLink[] = [
  { label: 'WhatsApp', href: restaurant.phone.whatsapp, icon: 'whatsapp' },
  { label: 'Google Maps', href: restaurant.mapsUrl, icon: 'maps' },
  { label: 'Ligar', href: restaurant.phone.href, icon: 'phone' },
  { label: 'Facebook', href: '', icon: 'facebook' },
  { label: 'Instagram', href: '', icon: 'instagram' },
]

export const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Menu', href: '#menu' },
  { label: 'Destaques', href: '#destaques' },
  { label: 'Equipa', href: '#equipa' },
  { label: 'Novidades', href: '#novidades' },
  { label: 'Contactos', href: '#contactos' },
] as const

export function formatPrice(value: number): string {
  return `${Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} MT`
}
