import { photos } from './photos'
import { formatPrice } from './restaurant'
import type { ArtKind, GalleryEntry, MenuGroup, MenuItem, MenuSection, Photo, Visual } from './types'

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
    photo(photos.buffet, 'grill', 'Travessas do buffet com carnes, galinha, arroz e guarnições'),
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
    photo(photos.buffetMesa, 'grill', 'Mesa de buffet com arroz, feijão, carnes, saladas e batata frita'),
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
    photo(photos.buffetVariado, 'grill', 'Buffet completo com carnes, frango, legumes, saladas, sobremesas e fruta'),
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
  tile('Peixe grelhado', photos.peixeGrelhado),
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

const cocktails: MenuItem[] = [
  it('margarita', 'Margarita', 350, 'Tequila branca, triple sec, lima e sumo de lima.', drink(photos.margarita, 'Margarita com sal e lima')),
  it(
    'intense-girl',
    'Bom Paladar Intense Girl',
    400,
    'Licor de morango, piña colada, rum e sumo de ananás.',
    drink(photos.intenseGirl, 'Cocktail de assinatura Intense Girl, de morango e ananás'),
  ),
  it(
    'caipirinha',
    'Caipirinha',
    350,
    'Cachaça, lima, maracujá, frutos vermelhos, kiwi, tangerina e xarope de açúcar.',
    drink(photos.caipirinha, 'Caipirinha de maracujá'),
  ),
  it(
    'caipirosca',
    'Caipirosca',
    300,
    'Vodka, lima, maracujá, frutos vermelhos, kiwi, tangerina e xarope de açúcar.',
    drink(photos.caipirosca, 'Caipirosca de morango e lima'),
  ),
  it('mojito', 'Mojito', 300, 'Rum branco, lima, hortelã, Sprite ou água tónica.', drink(photos.mojito, 'Mojito com hortelã e lima')),
  it(
    'tequila-sunrise',
    'Tequila Sunrise',
    500,
    'Tequila branca, sumo de laranja e grenadine.',
    drink(photos.tequilaSunrise, 'Tequila Sunrise em degradê de laranja e vermelho'),
  ),
  it('gin-tonico', 'Gin Tónico à Bom Paladar', 400, undefined, drink(photos.ginTonico, 'Gin tónico em copo balão')),
  it('sexy-on-the-beach', 'Sexy on the Beach', 400, 'Vodka, licor de pêssego e sumo de laranja.', drink(photos.sexyOnTheBeach, 'Cocktail Sexy on the Beach com laranja e cereja')),
  it('blue-lagoon', 'Blue Lagoon', 300, 'Vodka, licor Blue Curaçao, sumo de limão e Sprite.', drink(photos.blueLagoon, 'Blue Lagoon azul com limão')),
  it('blue-hawaii', 'Blue Hawaii', 350, 'Vodka, licor de pêssego, licor Piña Curaçao e Sprite.', drink(photos.blueHawaii, 'Blue Hawaii com ananás e cereja')),
  it(
    'pina-colada',
    'Piña Colada',
    450,
    'Rum branco, cocktail base de piña colada e sumo de ananás.',
    drink(photos.pinaColada, 'Piña Colada cremosa com ananás'),
  ),
  it('caipirinha-cerveja', 'Caipirinha de Cerveja à Bom Paladar', 400, undefined, drink(photos.caipirinhaCerveja, 'Caipirinha de cerveja com lima numa caneca')),
  it(
    'sangria',
    'Sangria de Vinho Branco / Tinto',
    800,
    'Aguardente de cana, triple sec, xarope de menta, brandy, vinho e Sprite.',
    photo(photos.sangria, 'wine', 'Copo de sangria com fruta e jarro ao fundo'),
  ),
  it(
    'shots',
    'Shots',
    undefined,
    'Blow Job, Guitinha, B52, Tequila Gold, Tequila Branca, Blue Kamikaze, Jägermeister e Jägerbomb. Preços em Espirituosas & Shots.',
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

// Carta de bebidas e extras (folha "Extras / Sobremesas / Águas / … / Aguardentes").
const extras: MenuItem[] = [
  it('arroz-branco-coco-legumes', 'Arroz Branco / de Coco / de Legumes', 200, undefined, photo(photos.arrozLegumes, 'grill', 'Arroz de legumes')),
  it('arroz-tomate-feijao', 'Arroz de Tomate e Arroz de Feijão c/ Salsicha', 300),
  it('xima', 'Xima / Xima Caracata', 200),
  it('legumes-salteados', 'Legumes Salteados', 200),
  it('feijao-preto', 'Feijão Preto', 200),
  it('salada-mista', 'Salada Mista', 200),
]

const sobremesas: MenuItem[] = [
  it('pudim-ovos', 'Pudim de Ovos', 250),
  it('mousse-malambe', 'Mousse de Malambe', 250, undefined, photo(photos.mousseMalambe, 'grill', 'Mousse de malambe')),
  it('salada-frutas', 'Salada de Frutas da Época', 300),
]

const espumantes: MenuItem[] = [
  it('annabelle', 'Annabelle', 1600),
  it('tosti-moscato', 'Tosti Moscato', 1700),
  it('jc-le-roux', 'J.C. Le Roux', 1300),
  it('espumante-sem-alcool', 'Espumante sem Álcool', 1200),
]

const cervejaPressao: MenuItem[] = [
  it('pressao-mini', 'Copo Mini (20 cl)', 140),
  it('pressao-medio', 'Copo Médio (35 cl)', 190),
  it('pressao-caneca', 'Caneca (50 cl)', 250),
]

const cervejas: MenuItem[] = [
  it('super-bock-castle-lite', 'Super Bock / Castle Lite', 120),
  it('manica-2m-laurentina', 'Manica (lata) / 2M (lata ou garrafa) / Laurentina Preta / Txilar', 100),
  it('heineken-mini', 'Heineken Mini', 130),
  it('heineken-sem-alcool-stella', 'Heineken sem Álcool / Stella Artois', 160),
  it('corona', 'Corona', 140),
  it('heineken-silver-castle-double', 'Heineken Silver / Castle Double Malt', 160),
]

const sidras: MenuItem[] = [
  it('brutal-hunters-savanna', "Brutal / Hunter's Gold / Savanna Dry / Lemon", 150),
  it('bernini', 'Bernini', 200),
  it('breezer', 'Breezer (vários sabores)', 150),
]

const espirituosas: MenuItem[] = [
  it('gordons', "Gordon's Gin", 100),
  it('tanqueray-london-dry', 'Tanqueray London Dry', 170),
  it('tanqueray-ten-botanist', 'Tanqueray Nº Ten / Tanqueray Blackcurrant / The Botanist', 240),
  it('bulldog-hendricks', "Bulldog / Hendrick's / Beefeater Pink / Beefeater Orange / Musgrave", 170),
  it('streeton', 'Streeton Blue / Orange / Pink', 150),
  it('inverroche-tanqueray-sevilla', 'Inverroche Classic / Verdant / Tanqueray Sevilla', 180),
  it('beefeater-london', 'Beefeater London', 150),
  it('bombay-sapphire', 'Bombay Sapphire', 170),
  it('sambuca', 'Sambuca Black / White (shot)', 250),
  it('shot-blow-job', 'Blow Job (shot)', 250),
  it('shot-jagermeister', 'Jägermeister (shot)', 250),
  it('lovoka', 'Lovoka de Caramelo / de Chocolate (shot)', 250),
  it('tequila-cactus-jack', 'Tequila Cactus Jack Azul (shot)', 250),
  it('tequila-olmeca-silver', 'Tequila Olmeca Silver (shot)', 170),
]

const whisky: MenuItem[] = [
  it('grants-ballantines-jameson', "Grant's / Ballantine's / Jameson / Dewar's", 125),
  it('jw-red', 'Johnnie Walker Red Label', 125),
  it('jw-black-jameson-ipa-jack', "Johnnie Walker Black Label / Jameson IPA / Jack Daniel's", 180),
  it('glenfiddich-12-jameson-black', 'The Glenfiddich 12 / Jameson Black Barrel', 230),
  it('jw-green-gold', 'Johnnie Walker Green Label / Gold Label', 330),
  it('glenfiddich-15', 'The Glenfiddich 15', 280),
  it('chivas-12', 'Chivas 12 Anos', 200),
]

const aguardentes: MenuItem[] = [
  it('brandy-1920-smirnoff', '1920 Brandy / Vodka Smirnoff', 150),
  it('sao-domingos', 'São Domingos', 150),
  it('crf-hennessy-remy', 'CRF Reserva / Hennessy / Rémy Martin', 270),
  it('vodka-absolut', 'Vodka Absolut', 200),
  it('captain-morgan', 'Captain Morgan Black / Gold', 150),
  it('martini-amarula', 'Martini Tinto / Branco / Amarula', 150),
  it('tia-maria-porto-beirao', 'Tia Maria / Vinho do Porto Ferreira / Licor Beirão', 200),
]

const refrigerantes: MenuItem[] = [
  it('coca-zero-dry-lemon-ginger', 'Coca-Cola Zero / Dry Lemon / Ginger Ale', 100),
  it('coca-cola', 'Coca-Cola e outros', 100),
  it('red-bull', 'Red Bull', 200),
  it('guarana', 'Guaraná', 100),
  it('cappy', 'Cappy (todos os sabores)', 100),
  it('compal', 'Compal (grande)', 200),
  it('sumo-natural-1', 'Sumo Natural c/ 1 Sabor', 200),
  it('sumo-natural-2', 'Sumo Natural até 2 Sabores', 250),
]

const aguasCafetaria: MenuItem[] = [
  it('agua-05', 'Água sem Gás 0,5 L', 50),
  it('agua-15', 'Água sem Gás 1,5 L', 120),
  it('agua-com-gas', 'Água com Gás Salgada / Outros Sabores', 120),
  it('tonica-soda', 'Tónica / Soda', 100),
  it('cafe-expresso', 'Café Expresso', 100),
  it('cha', 'Chá Verde / Chá Preto', 200),
]

export const menuSections: MenuSection[] = [
  {
    id: 'buffet',
    label: 'Buffet',
    note: 'Preço por pessoa',
    intro: 'Três opções de buffet com entradas, bebidas, pratos de carne, aves e peixe, guarnições, saladas e sobremesa.',
    cover: { art: 'grill', photo: photos.buffetCapa, alt: 'Mesa de buffet com arroz, feijão, carnes, frango, saladas, batata frita e fruta' },
    gallery: buffetGallery,
    items: buffets,
  },
  { id: 'massas', label: 'Menu Pasta', items: massas },
  { id: 'lasanhas', label: 'Lasanhas', items: lasanhas },
  { id: 'extras', label: 'Extras', items: extras },
  { id: 'sobremesas', label: 'Sobremesas', items: sobremesas },
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
  { id: 'espumantes', label: 'Espumantes', note: 'Garrafa', items: espumantes },
  { id: 'cerveja-pressao', label: 'Cerveja à Pressão Super Bock', items: cervejaPressao },
  { id: 'cervejas', label: 'Cervejas Lata / Garrafa', items: cervejas },
  { id: 'sidras', label: 'Sidras', items: sidras },
  { id: 'espirituosas', label: 'Espirituosas (Gin) & Shots', note: 'Dose', items: espirituosas },
  { id: 'whisky', label: 'Whisky Blended, Scotch & Single Malt', note: 'Dose', items: whisky },
  { id: 'aguardentes', label: 'Aguardentes, Digestivos & Cognac', note: 'Dose', items: aguardentes },
  { id: 'refrigerantes', label: 'Refrigerantes & Sumos', items: refrigerantes },
  { id: 'aguas', label: 'Águas & Cafetaria', items: aguasCafetaria },
]

export const priceNote = 'Preços em meticais (MT), sujeitos a alteração sem aviso prévio.'

export const barNote = 'Cocktails, vinhos, cervejas, gins, whiskies e muito mais. Peça ao empregado as sugestões do bar.'

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
