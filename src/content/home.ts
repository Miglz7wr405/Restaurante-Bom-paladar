import { findItem } from './menu'
import { photos } from './photos'
import type { CategoryLink, HeroSlide, MenuItem, NewsPost, Promo, TeamMember } from './types'

export const heroSlides: HeroSlide[] = [
  {
    id: 'buffet',
    kicker: 'Buffet à vontade',
    title: ['Buffet', 'Bom Paladar'],
    script: 'Buffet',
    subtitle: 'Feijoada, galinha à Zambeziana, peixe grelhado, mucuane e muito mais, com bebidas e sobremesa incluídas.',
    badge: { top: '1.500', bottom: 'MT' },
    visual: {
      art: 'grill',
      photo: photos.buffet,
      alt: 'Travessas do buffet com carnes, galinha, arroz e guarnições',
    },
    decorations: ['chili', 'lime', 'pepper', 'basil'],
  },
  {
    id: 'mariscos',
    kicker: 'Buffet 2.800',
    title: ['Lagosta', '& Camarão Tigre'],
    script: 'Mariscos',
    subtitle: 'O buffet completo, com lagosta, camarão tigre e lulas grelhadas, ao estilo da costa da Zambézia.',
    badge: { top: '2.800', bottom: 'MT' },
    visual: {
      art: 'seafood',
      photo: photos.lagostaGrelhada,
      alt: 'Lagosta grelhada com manteiga',
    },
    decorations: ['lime', 'chili', 'basil', 'shrimp'],
  },
  {
    id: 'massas',
    kicker: 'Menu Pasta',
    title: ['Tagliatelle', 'Carbonara'],
    script: 'Pasta',
    subtitle: 'Peito de frango, salsicha, natas e cogumelos, envolvidos num tagliatelle sempre al dente.',
    badge: { top: '950', bottom: 'MT' },
    visual: {
      art: 'pasta',
      photo: photos.massaCarbonara,
      alt: 'Prato de tagliatelle carbonara',
    },
    decorations: ['basil', 'pepper', 'cheese', 'tomato'],
  },
  {
    id: 'cocktails',
    kicker: 'Serve ótimos cocktails',
    title: ['Cocktails', 'de Assinatura'],
    script: 'Cocktail',
    subtitle: 'Da Margarita ao Bom Paladar Intense Girl: a carta de bar que faz as noites de Quelimane.',
    badge: { top: '300', bottom: 'MT' },
    visual: {
      art: 'cocktail',
      tint: 'mint',
      photo: photos.mojito,
      alt: 'Mojito com hortelã e lima',
    },
    decorations: ['lime', 'mint', 'ice', 'lime'],
  },
]

export const categoryLinks: CategoryLink[] = [
  {
    id: 'buffet',
    label: 'Buffet',
    art: 'grill',
    photo: photos.galinhaZambeziana,
    section: 'buffet',
  },
  {
    id: 'massas',
    label: 'Massas',
    art: 'pasta',
    photo: photos.massaBolonhesa,
    section: 'massas',
  },
  {
    id: 'lasanhas',
    label: 'Lasanhas',
    art: 'lasagna',
    photo: photos.lasanhaCarne,
    section: 'lasanhas',
  },
  {
    id: 'cocktails',
    label: 'Cocktails',
    art: 'cocktail',
    tint: 'blue',
    photo: photos.pinaColada,
    section: 'cocktails',
  },
  {
    id: 'mariscos',
    label: 'Mariscos',
    art: 'seafood',
    photo: photos.camaraoTigre,
    section: 'buffet',
  },
  {
    id: 'caipirinhas',
    label: 'Caipirinhas',
    art: 'cocktail',
    tint: 'lime',
    photo: photos.caipirinha,
    section: 'cocktails',
  },
]

export const dishOfMonth: {
  kicker: string
  item: MenuItem
  text: string
  points: string[]
} = {
  kicker: 'Sugestão da casa',
  item: findItem('buffet-2000'),
  text: 'Chamuças, rissóis e coxinhas para começar, feijoada, galinha cafreal, peixe grelhado, camarão e lulas, mucuane de mandioca e mousse de malambe para terminar. Bebidas incluídas.',
  points: ['Água, sumo e refrigerante incluídos', 'Camarão médio e lulas', 'Também a 1.500 e 2.800 MT'],
}

export const featuredIds = ['buffet-2800', 'carbonara', 'lasanha-carne', 'intense-girl', 'pina-colada'] as const
export const featured: MenuItem[] = featuredIds.map(findItem)

// Home page "Os mais pedidos" tabs: a short pick per category; the full list lives on /menu/.
export const popularTabs: { id: string; label: string; items: MenuItem[] }[] = [
  {
    id: 'buffet',
    label: 'Buffet',
    items: ['buffet-1500', 'buffet-2000', 'buffet-2800'],
  },
  {
    id: 'massas',
    label: 'Massas & Lasanhas',
    items: ['carbonara', 'fettuccine', 'bolonhesa', 'lasanha-carne', 'lasanha-frango', 'lasanha-legumes'],
  },
  {
    id: 'cocktails',
    label: 'Cocktails',
    items: ['mojito', 'pina-colada', 'margarita', 'intense-girl', 'caipirinha', 'tequila-sunrise'],
  },
  {
    id: 'vinhos',
    label: 'Vinhos',
    items: ['cabriz-reserva', 'chocolate-block', 'duas-quintas', 'casal-garcia-verde', 'aveleda-alvarinho', 'robertson-rose'],
  },
].map((tab) => ({ ...tab, items: tab.items.map(findItem) }))

export const promos: Promo[] = [
  {
    id: 'buffet',
    kicker: 'Para a família toda',
    title: 'Buffet a partir de 1.500 MT',
    text: 'Entradas, bebidas, carnes, aves, peixe, guarnições, saladas e sobremesa, por pessoa.',
    cta: 'Reservar',
    href: '/#reservas',
    visual: {
      art: 'grill',
      photo: photos.bifePanela,
      alt: 'Bife na panela com molho de cebola',
    },
    tone: 'ember',
  },
  {
    id: 'cocktails',
    kicker: 'Ao fim da tarde',
    title: 'Cocktails de Assinatura',
    text: 'Do Mojito ao Bom Paladar Intense Girl, a partir de 300 MT.',
    cta: 'Ver cocktails',
    href: '/menu/#cocktails',
    visual: {
      art: 'cocktail',
      tint: 'berry',
      photo: photos.intenseGirl,
      alt: 'Cocktail Intense Girl de morango e ananás',
    },
    tone: 'ink',
  },
]

export const takeaway = {
  kicker: 'Take-away',
  title: ['Leve o Bom Paladar', 'para casa'],
  text: 'Ligue ou envie mensagem com o seu pedido e levante-o fresco no restaurante, na Rua Robert Mugabe.',
  features: ['Encomenda por telefone', 'Pronto a levantar', 'Massas, lasanhas e cocktails'],
}

// Placeholder team: replace names/bios and team photos (visual.photo) once provided by the restaurant.
export const team: TeamMember[] = [
  {
    id: 'cozinha',
    name: 'Cozinha',
    role: 'Chef de cozinha',
    bio: 'Feijoada, galinha à Zambeziana e mucuane, como em casa.',
    visual: {
      art: 'grill',
      photo: photos.galinhaZambeziana,
      alt: 'Galinha à Zambeziana',
    },
    socials: [],
  },
  {
    id: 'grelha',
    name: 'Grelha',
    role: 'Peixe & marisco',
    bio: 'Camarão tigre, lulas, lagosta e peixe grelhados no ponto.',
    visual: {
      art: 'seafood',
      photo: photos.peixeGrelhado,
      alt: 'Peixe grelhado com molho de coco',
    },
    socials: [],
  },
  {
    id: 'bar',
    name: 'Bar',
    role: 'Mixologia',
    bio: 'Os cocktails de assinatura que dão fama à casa.',
    visual: {
      art: 'cocktail',
      tint: 'mint',
      photo: photos.mojito,
      alt: 'Mojito preparado no bar',
    },
    socials: [],
  },
  {
    id: 'sala',
    name: 'Sala',
    role: 'Serviço',
    bio: 'Recebe-o com a hospitalidade de Quelimane.',
    visual: { art: 'pasta', photo: photos.massaCarbonara, alt: 'Massa servida à mesa' },
    socials: [],
  },
]

// Editable news entries (ISO dates).
export const news: NewsPost[] = [
  {
    id: 'buffet',
    date: '2026-10-15',
    title: 'O novo buffet chegou',
    excerpt: 'Três opções, de 1.500 a 2.800 MT por pessoa, com bebidas, sobremesa e o melhor da cozinha moçambicana.',
    visual: {
      art: 'grill',
      photo: photos.salgados,
      alt: 'Chamuças, rissóis e coxinhas',
    },
  },
  {
    id: 'pasta',
    date: '2026-10-08',
    title: 'O novo Menu Pasta',
    excerpt: 'Tagliatelle Carbonara, Fettuccine, Bolonhesa e Putanesca de marisco, de 850 a 1.200 MT. E ainda três lasanhas.',
    visual: {
      art: 'pasta',
      photo: photos.massaCarbonara,
      alt: 'Tagliatelle carbonara com frango e cogumelos',
    },
  },
  {
    id: 'cocktails',
    date: '2026-09-20',
    title: 'Cocktails de assinatura',
    excerpt: 'Bom Paladar Intense Girl, Tequila Sunrise e a nova Caipirinha de Cerveja. Venha provar ao fim da tarde.',
    visual: {
      art: 'cocktail',
      tint: 'cream',
      photo: photos.pinaColada,
      alt: 'Piña Colada no balcão',
    },
  },
]
