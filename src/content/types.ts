export type ArtKind =
  | 'pizza'
  | 'pizza-seafood'
  | 'pasta'
  | 'pasta-red'
  | 'lasagna'
  | 'cocktail'
  | 'seafood'
  | 'grill'
  | 'wine'

export type CocktailTint = 'lime' | 'blue' | 'sunrise' | 'berry' | 'mint' | 'cream' | 'wine' | 'amber'

/** Photo assets live in /public/images. Provide both formats; width/height prevent layout shift. */
export interface Photo {
  webp: string
  jpg: string
  width: number
  height: number
}

/** A real photo when available, otherwise a brand illustration is rendered. */
export interface Visual {
  art: ArtKind
  tint?: CocktailTint
  photo?: Photo
  alt: string
}

export interface MenuItem {
  id: string
  name: string
  description?: string
  /** Price in meticais (MT). */
  price: number
  visual: Visual
}

export interface MenuCategory {
  id: string
  label: string
  items: MenuItem[]
}

export interface DaySchedule {
  days: string
  /** Schema.org day names, e.g. "Monday". */
  schemaDays: string[]
  /** Leave undefined until confirmed; only the closing time is then shown. */
  opens?: string
  closes: string
}

export interface SocialLink {
  label: string
  href: string
  icon: 'whatsapp' | 'facebook' | 'instagram' | 'maps' | 'phone'
}

export interface HeroSlide {
  id: string
  kicker: string
  title: [string, string]
  script: string
  subtitle: string
  badge?: { top: string; bottom: string }
  visual: Visual
  decorations: DecorationKind[]
}

export type DecorationKind = 'basil' | 'tomato' | 'chili' | 'olive' | 'lime' | 'mint' | 'ice' | 'shrimp' | 'cheese' | 'pepper'

export interface CategoryLink {
  id: string
  label: string
  art: ArtKind
  tint?: CocktailTint
  menuTab?: string
}

export interface Promo {
  id: string
  kicker: string
  title: string
  text: string
  cta: string
  href: string
  visual: Visual
  tone: 'ember' | 'ink'
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  visual: Visual
  socials: SocialLink[]
}

export interface NewsPost {
  id: string
  date: string
  title: string
  excerpt: string
  visual: Visual
}
