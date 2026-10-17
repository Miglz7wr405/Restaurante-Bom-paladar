import { photos } from './photos'
import { formatPrice } from './restaurant'
import type { ArtKind, CocktailTint, GalleryEntry, MenuGroup, MenuItem, MenuSection, Photo, Visual } from './types'

// Transcribed from the restaurant's printed menus (buffets, pasta, cocktails and wine list).
// Wine names marked "por confirmar" in the README were hard to read on the printed card.

const it = (id: string, name: string, price: number | undefined, description?: string, visual?: Visual): MenuItem => ({
  id,
  name,
  price,
  description,
  visual,
})

const photo = (p: Photo, art: ArtKind, alt: string): Visual => ({
  art,
  photo: p,
  alt,
})
const g = (label: string, ...items: string[]): MenuGroup => ({ label, items })

const buffetDrinks = g('Bebidas', 'Água Vumba ou Gurué 1,5 L', 'Sumo Compal 1 L', 'Refrigerantes de 2 L (Coca-Cola, Fanta e Sprite)')
const buffetSalads = g('Saladas', 'Salada fria com maionese', 'Salada de alface ou pepino com tomate e repolho')

const buffet = (id: string, price: number, description: string, visual: Visual, groups: MenuGroup[]): MenuItem => ({
  ...it(id, `Buffet ${formatPrice(price).replace(' MT', '')}`, price, description, visual),
  priceUnit: 'p/ pessoa',
  groups,
})

const buffets: MenuItem[] = [
  buffet(
    'buffet-1500',
    1500,
    'O essencial da cozinha da casa, com bebidas e sobremesa.',
    photo(photos.bifePanela, 'grill', 'Bife na panela com molho de cebola'),
    [
      g('Entradas', 'Chamuças', 'Rissóis'),
      buffetDrinks,
      g('Carnes', 'Bife na panela', 'Feijoada à Bom Paladar'),
      g('Aves', 'Frango à Zambeziana ou água e sal de galinha cafreal'),
      g('Peixes', 'Peixe pedra ou garoupa grelhado'),
      g('Verduras', 'Quiabo ou couve mal passada'),
      g('Guarnições', 'Batata frita', 'Arroz branco', 'Arroz de legumes', 'Chima (branca)'),
      buffetSalads,
      g('Sobremesas', 'Mousse de malambe ou pudim'),
    ],
  ),
  buffet(
    'buffet-2000',
    2000,
    'Mais carnes e o marisco da casa: camarão e lulas.',
    photo(photos.camaraoTigre, 'seafood', 'Camarão grelhado com manteiga de alho'),
    [
      g('Entradas', 'Chamuças', 'Rissóis', 'Coxinhas'),
      buffetDrinks,
      g('Carnes', 'Bife na panela', 'Guisado de carne de vaca', 'Feijoada à Bom Paladar'),
      g('Aves', 'Galinha cafreal ou aviário à Zambeziana', 'Água e sal de galinha cafreal ou aviário'),
      g('Mariscos e peixes', 'Peixe grelhado (pedra, garoupa ou cherewa)', 'Camarão médio grelhado ou na frigideira', 'Lulas grelhadas ou na frigideira'),
      g('Verduras', 'Mucuane de mandioca, quiabo ou couve mal passada'),
      g('Guarnições', 'Batata frita', 'Arroz branco', 'Arroz de legumes', 'Mucapata', 'Chima (branca)'),
      buffetSalads,
      g('Sobremesas', 'Mousse de malambe ou mousse de chocolate'),
    ],
  ),
  buffet(
    'buffet-2800',
    2800,
    'O buffet completo: sopa, cabrito, camarão tigre e lagosta.',
    photo(photos.lagostaGrelhada, 'seafood', 'Lagosta grelhada com manteiga'),
    [
      g('Entradas e cafetaria', 'Café', 'Chá', 'Chamuças', 'Rissóis', 'Casquinhas de caranguejo'),
      g('Sopas', 'Sopa de legumes, abóbora ou feijão'),
      g('Bebidas', 'Água Vumba ou Gurué 1,5 L', 'Sumo Compal 1 L', 'Sumo natural (servido no jarro com torneira)'),
      g('Carnes', 'Bife na panela (carne importada)', 'Cabrito no forno (perna)', 'Feijoada à Bom Paladar'),
      g('Aves', 'Galinha cafreal ou aviário à Zambeziana', 'Espetada de peito de frango'),
      g(
        'Mariscos e peixes',
        'Peixe pedra ou garoupa grelhado com molho de manteiga ou coco',
        'Camarão tigre grelhado com molho de manteiga ou coco',
        'Lulas grelhadas',
        'Lagostas médias grelhadas',
      ),
      g('Verduras', 'Mucuane de mandioca, quiabo ou couve mal passada'),
      g('Guarnições', 'Batata frita', 'Arroz branco', 'Arroz de coco', 'Arroz de legumes', 'Mucapata', 'Legumes salteados'),
      g('Saladas', 'Salada fria com maionese', 'Salada de alface ou pepino', 'Salada de atum'),
      g('Sobremesas', 'Bolo gelado ou pudim', 'Mousse de malambe', 'Frutas'),
    ],
  ),
]

const tile = (label: string, p: Photo): GalleryEntry => ({
  label,
  visual: { art: 'grill', photo: p, alt: label },
})

/** Dishes served at the buffets, shown as photos above the three options. */
const buffetGallery: GalleryEntry[] = [
  tile('Chamuças, rissóis e coxinhas', photos.salgados),
  tile('Feijoada à Bom Paladar', photos.feijoada),
  tile('Bife na panela', photos.bifePanela),
  tile('Galinha à Zambeziana', photos.galinhaZambeziana),
  tile('Peixe grelhado com molho de coco', photos.peixeGrelhado),
  tile('Camarão tigre grelhado', photos.camaraoTigre),
  tile('Lulas grelhadas', photos.lulasGrelhadas),
  tile('Lagosta grelhada', photos.lagostaGrelhada),
  tile('Cabrito no forno', photos.cabritoForno),
  tile('Espetada de frango', photos.espetadaFrango),
  tile('Mucuane de mandioca', photos.mucuane),
  tile('Arroz de legumes', photos.arrozLegumes),
  tile('Sopa de abóbora', photos.sopaAbobora),
  tile('Mousse de malambe', photos.mousseMalambe),
]

const massas: MenuItem[] = [
  it(
    'carbonara',
    'Massa Tagliatelle Carbonara',
    950,
    'Peito de frango, salsicha, natas e cogumelos.',
    photo(photos.massaCarbonara, 'pasta', 'Tagliatelle carbonara cremoso'),
  ),
  it(
    'fettuccine',
    'Massa Fettuccine',
    850,
    'Peito de frango, cenoura raspada, salsa picada e molho de tomate.',
    photo(photos.massaFettuccine, 'pasta-red', 'Fettuccine com tiras de frango'),
  ),
  it('bolonhesa', 'Massa Bolonhesa', 850, 'Esparguete com carne moída e molho de tomate.', photo(photos.massaBolonhesa, 'pasta-red', 'Esparguete à bolonhesa')),
  it(
    'puttanesca-marisco',
    'Massa Putanesca de Marisco',
    1200,
    'Lulas, camarão, piri-piri, caranguejo desfiado e coentros.',
    photo(photos.massaMarisco, 'pasta-red', 'Massa putanesca com marisco'),
  ),
]

const lasanhas: MenuItem[] = [
  it('lasanha-carne', 'Lasanha de Carne Moída', 700, undefined, photo(photos.lasanhaCarne, 'lasagna', 'Lasanha de carne moída gratinada')),
  it('lasanha-frango', 'Lasanha de Frango Desfiado', 700, undefined, photo(photos.lasanhaFrango, 'lasagna', 'Lasanha de frango desfiado')),
  it('lasanha-legumes', 'Lasanha de Legumes', 500, undefined, photo(photos.lasanhaLegumes, 'lasagna', 'Lasanha de legumes')),
]

const drink = (p: Photo, alt: string): Visual => photo(p, 'cocktail', alt)
// Cocktails still without a studio photo use the brand illustration in the drink's colour.
const mixed = (tint: CocktailTint, alt: string): Visual => ({ art: 'cocktail', tint, alt })

const cocktails: MenuItem[] = [
  it('margarita', 'Margarita', 350, 'Tequila branca, triple sec, lima e sumo de lima.', mixed('lime', 'Cocktail Margarita com sal e lima')),
  it(
    'intense-girl',
    'Bom Paladar Intense Girl',
    400,
    'Licor de morango, piña colada, rum e sumo de ananás.',
    mixed('berry', 'Cocktail de assinatura Intense Girl, cor-de-rosa'),
  ),
  it(
    'caipirinha',
    'Caipirinha',
    350,
    'Cachaça, lima, maracujá, frutos vermelhos, kiwi, tangerina e xarope de açúcar.',
    mixed('lime', 'Caipirinha de maracujá e frutos vermelhos'),
  ),
  it(
    'caipirosca',
    'Caipirosca',
    300,
    'Vodka, lima, maracujá, frutos vermelhos, kiwi, tangerina e xarope de açúcar.',
    mixed('berry', 'Caipirosca de frutos vermelhos'),
  ),
  it('mojito', 'Mojito', 300, 'Rum branco, lima, hortelã, Sprite ou água tónica.', drink(photos.mojito, 'Mojito com hortelã e lima')),
  it(
    'tequila-sunrise',
    'Tequila Sunrise',
    500,
    'Tequila branca, sumo de laranja e grenadine.',
    mixed('sunrise', 'Tequila Sunrise em degradê de laranja e vermelho'),
  ),
  it('gin-tonico', 'Gin Tónico à Bom Paladar', 400, undefined, mixed('mint', 'Gin tónico em copo balão com lima')),
  it('sexy-on-the-beach', 'Sexy on the Beach', 400, 'Vodka, licor de pêssego e sumo de laranja.', mixed('sunrise', 'Cocktail Sexy on the Beach')),
  it('blue-lagoon', 'Blue Lagoon', 300, 'Vodka, licor Blue Curaçao, sumo de limão e Sprite.', mixed('blue', 'Cocktail Blue Lagoon azul')),
  it('blue-hawaii', 'Blue Hawaii', 350, 'Vodka, licor de pêssego, licor Piña Curaçao e Sprite.', mixed('blue', 'Cocktail Blue Hawaii')),
  it(
    'pina-colada',
    'Piña Colada',
    450,
    'Rum branco, cocktail base de piña colada e sumo de ananás.',
    drink(photos.pinaColada, 'Piña Colada cremosa com ananás'),
  ),
  it('caipirinha-cerveja', 'Caipirinha de Cerveja à Bom Paladar', 400, undefined, mixed('amber', 'Caipirinha de cerveja com lima')),
  it(
    'sangria',
    'Sangria de Vinho Branco / Tinto',
    800,
    'Aguardente de cana, triple sec, xarope de menta, brandy, vinho e Sprite.',
    { art: 'wine', alt: 'Copo de sangria com fruta' },
  ),
  it(
    'shots',
    'Shots',
    undefined,
    'Blow Job, Guitinha, B52, Tequila Gold, Tequila Branca, Blue Kamikaze, Jägermeister e Jägerbomb.',
    drink(photos.shots, 'Shots: B52 e tequila com lima e sal'),
  ),
]

const vinhosTintos: MenuItem[] = [
  it('silk-and-spice', 'Silk and Spice', 2100),
  it('cabriz-novo', 'Cabriz (Novo)', 1400),
  it('cabriz-reserva', 'Cabriz (Reserva)', 2800),
  it('mucho-mas', 'Mucho Más', 2800),
  it('cadao-novo', 'Cadão (Novo)', 1400),
  it('cadao-reserva', 'Cadão (Reserva)', 2200),
  it('reguengos-reserva', 'Reguengos (Reserva)', 2600),
  it('segredos-novo', 'Segredos de S. Miguel (Novo)', 1700),
  it('segredos-reserva', 'Segredos de S. Miguel (Reserva)', 3500),
  it('duas-quintas', 'Duas Quintas', 3500),
  it('pe-tinto', 'Pé Tinto', 1400),
  it('portada-tinto', 'Portada', 1400),
  it('quinta-bolota-prestige', 'Quinta da Bolota Prestige', 2200),
  it('chocolate-block', 'The Chocolate Block', 3000),
  it('spylano', 'Spylano', 1800),
  it('casa-santar', 'Casa de Santar', 2400),
  it('dona-vitoria', 'Dona Vitória', 2200),
  it('herdade-s-miguel', 'Herdade de S. Miguel', 4800),
  it('casa-insua', 'Casa da Ínsua', 3200),
  it('instinto', 'Instinto (1 L)', 1300),
]

const vinhosBrancos: MenuItem[] = [
  it('robertson-branco', 'Robertson Winery Branco', 1100),
  it('aveleda-alvarinho', 'Aveleda Alvarinho', 1500),
  it('aveleda-fonte', 'Aveleda Fonte', 1500),
  it('fleur-du-cap', 'Fleur du Cap', 1250),
  it('pacheca', 'Pacheca', 1700),
  it('casal-garcia-branco', 'Casal Garcia Branco', 1200),
  it('casal-garcia-verde', 'Casal Garcia Verde', 1500),
  it('nederburg-lyric', 'Nederburg Lyric (Branco)', 1250),
  it('quinta-bolota-verde', 'Quinta da Bolota Verde', 1000),
  it('portada-branco', 'Portada Branco', 1300),
  it('chardonnay-verde', 'Chardonnay Verde', 1200),
  it('spier-sauvignon', 'Sauvignon Blanc Spier', 1200),
  it('petusco-verde', 'Petusco Verde', 1500),
  it('robertson-rose', 'Robertson Rosé', 1250),
  it('pluma-verde', 'Pluma Verde', 1200),
]

const wineCover: Visual = {
  art: 'wine',
  photo: photos.vinhos,
  alt: 'Copo de vinho tinto e copo de vinho branco com garrafa e uvas',
}

export const menuSections: MenuSection[] = [
  {
    id: 'buffet',
    label: 'Buffet',
    note: 'Preço por pessoa',
    intro: 'Três opções de buffet com entradas, bebidas, pratos de carne, aves e peixe, guarnições, saladas e sobremesa.',
    cover: { art: 'grill', photo: photos.buffet, alt: 'Mesa de buffet com feijoada, peixe grelhado, camarão, mucuane, arroz de legumes, chamuças e salada' },
    gallery: buffetGallery,
    items: buffets,
  },
  { id: 'massas', label: 'Menu Pasta', items: massas },
  { id: 'lasanhas', label: 'Lasanhas', items: lasanhas },
  { id: 'cocktails', label: 'Cocktails', items: cocktails },
  {
    id: 'vinhos-tintos',
    label: 'Vinhos Tintos',
    note: 'Garrafa',
    intro: 'Descubra um mundo de sabores na nossa carta de vinhos!',
    cover: wineCover,
    items: vinhosTintos,
  },
  {
    id: 'vinhos-brancos',
    label: 'Brancos, Verdes & Rosé',
    note: 'Garrafa',
    items: vinhosBrancos,
  },
]

export const priceNote = 'Preços em meticais (MT), sujeitos a alteração sem aviso prévio.'

export const barNote = 'Águas, refrigerantes, sumos, cafetaria, cervejas e outras bebidas: consulte o empregado ou o balcão do bar.'

export const menuItemCount = menuSections.reduce((n, s) => n + s.items.length, 0)

export function findItem(id: string): MenuItem {
  for (const section of menuSections) {
    const item = section.items.find((i) => i.id === id)
    if (item) return item
  }
  throw new Error(`Menu item not found: ${id}`)
}

export function findSection(id: string): MenuSection {
  const section = menuSections.find((s) => s.id === id)
  if (!section) throw new Error(`Menu section not found: ${id}`)
  return section
}
