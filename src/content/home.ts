import { findItem } from './menu'
import { photos } from './photos'
import type { CategoryLink, HeroSlide, MenuItem, NewsPost, Promo, TeamMember } from './types'

export const heroSlides: HeroSlide[] = [
  {
    id: 'pizza',
    kicker: 'Pizzaria da casa',
    title: ['Pizza', 'Double Stack'],
    script: 'Pizza',
    subtitle: 'Duas camadas de massa, queijo a derreter e o melhor da casa num só forno.',
    badge: { top: '1.000', bottom: 'MT' },
    visual: { art: 'pizza', photo: photos.pizzaDoubleStack, alt: 'Pizza Double Stack acabada de sair do forno' },
    decorations: ['basil', 'tomato', 'olive', 'chili', 'cheese'],
  },
  {
    id: 'massas',
    kicker: 'Massas & Lasanhas',
    title: ['Tagliatelle', 'Carbonara'],
    script: 'Pasta',
    subtitle: 'Tiras de frango, natas e cogumelos, envolvidos num tagliatelle sempre al dente.',
    badge: { top: '550', bottom: 'MT' },
    visual: { art: 'pasta', photo: photos.massaCarbonara, alt: 'Prato de tagliatelle carbonara' },
    decorations: ['basil', 'pepper', 'cheese', 'tomato'],
  },
  {
    id: 'cocktails',
    kicker: 'Serve ótimos cocktails',
    title: ['Cocktails', 'de Assinatura'],
    script: 'Cocktail',
    subtitle: 'Do Bom Paladar Intense ao Mojito: a carta de bar que faz as noites de Quelimane.',
    badge: { top: '350', bottom: 'MT' },
    visual: { art: 'cocktail', tint: 'sunrise', photo: photos.cocktailSignature, alt: 'Cocktail de assinatura Bom Paladar' },
    decorations: ['lime', 'mint', 'ice', 'lime'],
  },
  {
    id: 'mariscos',
    kicker: 'Do Índico para a mesa',
    title: ['Mariscos', '& Peixes'],
    script: 'Mariscada',
    subtitle: 'Combos de mariscada para partilhar, ao estilo da costa da Zambézia.',
    visual: { art: 'seafood', photo: photos.mariscada, alt: 'Travessa de mariscada com camarão' },
    decorations: ['lime', 'chili', 'basil', 'shrimp'],
  },
]

export const categoryLinks: CategoryLink[] = [
  { id: 'pizzas', label: 'Pizzas', art: 'pizza', photo: photos.pizzaChickenMushroom, menuTab: 'pizzas' },
  { id: 'massas', label: 'Massas', art: 'pasta', photo: photos.massaBolonhesa, menuTab: 'massas' },
  { id: 'lasanhas', label: 'Lasanhas', art: 'lasagna', photo: photos.lasanhaCarne, menuTab: 'massas' },
  { id: 'mariscos', label: 'Mariscos', art: 'seafood', photo: photos.mariscada },
  { id: 'carnes', label: 'Carnes', art: 'grill', photo: photos.carneGrelhada },
  { id: 'cocktails', label: 'Cocktails', art: 'cocktail', tint: 'blue', photo: photos.blueLagoon, menuTab: 'cocktails' },
]

export const dishOfMonth: { kicker: string; item: MenuItem; text: string; points: string[] } = {
  kicker: 'Prato do mês',
  item: findItem('lasanha-carne'),
  text: 'Camadas de massa fresca, carne moída estufada lentamente em molho de tomate e uma cobertura gratinada até ficar dourada. O conforto que se pede ao jantar.',
  points: ['Gratinada no forno', 'Dose generosa', 'Também de frango ou legumes'],
}

export const featuredIds = ['chicken-mushroom', 'fettuccine', 'lasanha-frango', 'mojito', 'pina-colada'] as const
export const featured: MenuItem[] = featuredIds.map(findItem)

export const promos: Promo[] = [
  {
    id: 'pizza-night',
    kicker: 'Para partilhar',
    title: 'Pizza Double Stack',
    text: 'Massa dupla recheada, para dividir à mesa (ou não).',
    cta: 'Encomendar',
    href: '#reservas',
    visual: { art: 'pizza', photo: photos.pizzaDoubleStack, alt: 'Pizza Double Stack' },
    tone: 'ember',
  },
  {
    id: 'sangria',
    kicker: 'Noites no bar',
    title: 'Sangria da Casa',
    text: 'Vinho branco ou tinto, fruta da época e brandy. 800 MT o jarro.',
    cta: 'Ver cocktails',
    href: '#menu',
    visual: { art: 'wine', photo: photos.sangria, alt: 'Jarro de sangria' },
    tone: 'ink',
  },
]

export const takeaway = {
  kicker: 'Take-away',
  title: ['Leve o Bom Paladar', 'para casa'],
  text: 'Ligue ou envie mensagem com o seu pedido e levante-o fresco no restaurante, na Rua Robert Mugabe.',
  features: ['Encomenda por telefone', 'Pronto a levantar', 'Pizzas, massas e cocktails'],
}

// Placeholder team: replace names/bios and team photos (visual.photo) once provided by the restaurant.
export const team: TeamMember[] = [
  { id: 'cozinha', name: 'Cozinha', role: 'Chef de cozinha', bio: 'Massas, lasanhas e grelhados preparados no momento.', visual: { art: 'pasta', photo: photos.massaBolonhesa, alt: 'Esparguete à bolonhesa da cozinha' }, socials: [] },
  { id: 'pizzaria', name: 'Pizzaria', role: 'Pizzaiolo', bio: 'Do Something Meating ao Double Stack, à saída do forno.', visual: { art: 'pizza', photo: photos.pizzaSomethingMeating, alt: 'Pizza acabada de sair do forno' }, socials: [] },
  { id: 'bar', name: 'Bar', role: 'Mixologia', bio: 'Os cocktails de assinatura que dão fama à casa.', visual: { art: 'cocktail', tint: 'blue', photo: photos.blueLagoon, alt: 'Cocktail Blue Lagoon do bar' }, socials: [] },
  { id: 'sala', name: 'Sala', role: 'Serviço', bio: 'Recebe-o com a hospitalidade de Quelimane.', visual: { art: 'wine', photo: photos.sangria, alt: 'Sangria servida à mesa' }, socials: [] },
]

// Editable news entries (ISO dates).
export const news: NewsPost[] = [
  { id: 'cocktails', date: '2026-09-20', title: 'A nova carta de cocktails chegou', excerpt: 'Blue Lagoon, Tequila Sunrise e os nossos Intense Man e Intense Girl. Venha provar ao fim da tarde.', visual: { art: 'cocktail', tint: 'sunrise', photo: photos.tequilaSunrise, alt: 'Tequila Sunrise no balcão' } },
  { id: 'double-stack', date: '2026-09-08', title: 'Double Stack: a pizza de massa dupla', excerpt: 'Duas camadas, muito queijo e um recheio generoso. A pizza mais pedida do mês.', visual: { art: 'pizza', photo: photos.pizzaDoubleStack, alt: 'Pizza de massa dupla' } },
  { id: 'sangria', date: '2026-08-28', title: 'Sangria para as noites quentes', excerpt: 'Branca ou tinta, com fruta da época. Perfeita para partilhar com amigos.', visual: { art: 'wine', photo: photos.sangria, alt: 'Copos de sangria' } },
]
