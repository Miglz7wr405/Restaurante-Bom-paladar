import { photos } from './photos'
import type { ArtKind, CocktailTint, MenuItem, MenuSection, Photo, Visual } from './types'

// Transcribed from the restaurant's printed menus. Names marked "por confirmar" in the README
// came from AI-upscaled images and should be checked against the physical menu.

const it = (id: string, name: string, price: number | undefined, description?: string, visual?: Visual): MenuItem => ({
  id,
  name,
  price,
  description,
  visual,
})

const photo = (p: Photo, art: ArtKind, alt: string): Visual => ({ art, photo: p, alt })
const art = (kind: ArtKind, alt: string, tint?: CocktailTint): Visual => ({ art: kind, tint, alt })

const entradas: MenuItem[] = [
  it('pao-alho-queijo', 'Pão de Alho Recheado c/ Queijo', 350, undefined, photo(photos.paoAlho, 'grill', 'Pão de alho recheado com queijo gratinado numa tábua')),
  it('camarao-alho', 'Camarão ao Alho (7 unid.)', 400),
  it('bruschettas-bacalhau', 'Bruschettas de Bacalhau', 500),
  it('bruschettas-carne', 'Bruschettas de Carne Moída', 400),
  it('triangulos-carne', 'Triângulos de Carne de Vaca (3 unid.)', 400),
  it('asinhas-crocantes', 'Asinhas Crocantes', 400, undefined, photo(photos.asinhas, 'grill', 'Asinhas crocantes com molho e lima')),
  it('caranguejo-recheado', 'Caranguejo Recheado (4 unid.)', 500),
  it('caranguejo-grelhado', 'Caranguejo Grelhado (4 unid.)', 800),
  it('lagosta-recheada', 'Lagosta Recheada (2 unid.)', 800),
  it('salgados', 'Salgados (2 unid.)', 250, 'Rissóis, chamuças, pastéis, coxinhas e croquetes.'),
]

const sopas: MenuItem[] = [
  it('sopa-abobora-camarao', 'Sopa de Abóbora com Camarão', 150),
  it('sopa-legumes', 'Sopa de Legumes', 150),
  it('sopa-feijao-ervilhas', 'Sopa de Feijão / Ervilhas', 150),
]

const petiscos: MenuItem[] = [
  it('dobrada', 'Dobrada', 250),
  it('cabeca-peixe', 'Cabeça de Peixe', 250),
  it('congue', 'Congue', 250),
  it('cabeca-vaca', 'Cabeça de Vaca', 250),
  it('mao-vaca', 'Mão de Vaca', 250),
  it('carne-vaca-petisco', 'Carne de Vaca', 250),
  it('galinha-caipira', 'Galinha Caipira', 250),
  it('azeitonas-temperadas', 'Azeitonas Temperadas', 250),
  it('tripas-ovelha', 'Tripas de Ovelha', 250),
  it('salsichas-salteadas', 'Salsichas Salteadas', 250),
]

const saladas: MenuItem[] = [
  it('salada-mista', 'Salada Mista', 200, 'Alface, tomate, cebola, pepino, cenoura e azeitonas.'),
  it('salada-frango', 'Salada de Frango', 600, 'Alface, tomate, frango, pepino, pimento, cenoura e azeitonas.'),
  it('salada-frutos-mar', 'Salada de Frutos do Mar', 700, 'Alface, tomate, camarão, lula e mexilhão.'),
  it('salada-atum', 'Salada de Atum', 400, 'Alface, tomate, atum, cebola e pimento.'),
  it('salada-grega', 'Salada Grega', 300, 'Alface, tomate, pepino, cebola, azeitonas e queijo feta.'),
  it('salada-abacate-atum', 'Salada de Abacate c/ Atum', 400, 'Abacate, atum, alface, tomate e cebola.'),
  it('salada-casa', 'Salada da Casa', 200, 'Repolho, pimento, pepino, cenoura, cebola e tomate.'),
]

const sanduiches: MenuItem[] = [
  it('prego-simples', 'Prego no Pão Simples (200 g)', 200),
  it('prego-bom-paladar', 'Prego no Pão à Bom Paladar (250 g)', 500),
  it('omelete-simples', 'Omelete Simples', 250, 'Ovo, pimento, cebola, tomate e batata frita.'),
  it('omelete-mista', 'Omelete Mista', 400, 'Camarão, cogumelos, queijo, batata frita e salada.'),
  it('tosta-atum', 'Tosta de Atum', 250),
  it('tosta-3-queijos', 'Tosta de 3 Queijos à Bom Paladar', 300),
  it('hamburguer-chefe', 'Hambúrguer de Carne de Vaca à Moda do Chefe', 300),
]

const pizzas: MenuItem[] = [
  it('something-meating', 'Something Meeting', 700, 'Carne moída, bacon de vaca, salsicha, molho de tomate e queijo.', photo(photos.pizzaSomethingMeating, 'pizza', 'Pizza Something Meeting com carnes e queijo')),
  it('chicken-mushroom', 'Chicken Mushroom', 700, 'Frango, cogumelos, cebola e tomate em cubinhos.', photo(photos.pizzaChickenMushroom, 'pizza', 'Pizza Chicken Mushroom com frango e cogumelos')),
  it('pizza-club', 'Pizza Club', 700, 'Bacon de vaca e peito de frango.', photo(photos.pizzaSomethingMeating, 'pizza', 'Pizza Club com bacon e frango')),
  it('pizza-mexicana', 'Pizza Mexicana', 700, 'Carne moída, azeitonas, pimentos em cubinhos e cebola picada.', photo(photos.pizzaMexicana, 'pizza', 'Pizza Mexicana com carne moída e pimento')),
  it('pizza-regina', 'Pizza Regina', 700, 'Cogumelos e ananás.', photo(photos.pizzaChickenMushroom, 'pizza', 'Pizza Regina com cogumelos')),
  it('pizza-havaiana', 'Pizza Havaiana', 700, 'Ananás e fiambre em cubinhos.', photo(photos.pizzaHavaiana, 'pizza', 'Pizza Havaiana com ananás e fiambre')),
  it('pizza-seafood', 'Pizza Seafood', 700, 'Lula, camarão, ananás e pimentos.', photo(photos.pizzaSeafood, 'pizza-seafood', 'Pizza de marisco com camarão e lula')),
  it('cream-cheese-crust', 'Cream Cheese Crust', 800, 'Borda recheada com queijo creme e salsicha com sabor mexicano.', photo(photos.pizzaDoubleStack, 'pizza', 'Pizza com borda recheada de queijo creme')),
  it('double-stack', 'Double Stack', 1000, 'Duas camadas: uma com queijo creme, a outra com base de tomate. Recheio de carne ou de frango.', photo(photos.pizzaDoubleStack, 'pizza', 'Pizza Double Stack de massa dupla')),
  it('duas-estacoes', 'Pizza de Duas Estações', 800, undefined, photo(photos.pizzaMexicana, 'pizza', 'Pizza de duas estações')),
  it('quatro-estacoes', 'Pizza de Quatro Estações', 900, undefined, photo(photos.pizzaHavaiana, 'pizza', 'Pizza de quatro estações')),
  it('pizza-atum', 'Pizza de Atum', 700, undefined, photo(photos.pizzaSeafood, 'pizza', 'Pizza de atum')),
]

const massas: MenuItem[] = [
  it('carbonara', 'Massa Tagliatelle Carbonara', 550, 'Tiras de frango, salsicha, natas e cogumelos.', photo(photos.massaCarbonara, 'pasta', 'Tagliatelle carbonara cremoso')),
  it('fettuccine', 'Massa Fettuccine', 850, 'Tiras de frango, camarão, cebola picada e molho de tomate.', photo(photos.massaFettuccine, 'pasta-red', 'Fettuccine com frango e camarão')),
  it('bolonhesa', 'Massa Bolonhesa', 650, 'Esparguete com carne moída e molho de tomate.', photo(photos.massaBolonhesa, 'pasta-red', 'Esparguete à bolonhesa')),
  it('puttanesca-marisco', 'Massa Puttanesca de Marisco', 1200, 'Lulas, camarão e mexilhão em molho de tomate.', photo(photos.massaMarisco, 'pasta-red', 'Massa puttanesca com marisco')),
  it('lasanha-carne', 'Lasanha de Carne Moída', 700, undefined, photo(photos.lasanhaCarne, 'lasagna', 'Lasanha de carne moída gratinada')),
  it('lasanha-frango', 'Lasanha de Frango Desfiado', 700, undefined, photo(photos.lasanhaFrango, 'lasagna', 'Lasanha de frango desfiado')),
  it('lasanha-legumes', 'Lasanha de Legumes', 550, undefined, photo(photos.lasanhaFrango, 'lasagna', 'Lasanha de legumes')),
]

const arroz: MenuItem[] = [
  it('arroz-garoupa', 'Arroz de Garoupa', 1000),
  it('arroz-marisco', 'Arroz de Marisco', 1200),
  it('arroz-grego', 'Arroz Grego', 850),
  it('risoto-camarao-lagosta', 'Arroz Risoto de Camarão ou Lagosta', 1200),
  it('risoto-atum', 'Arroz Risoto de Atum Braseado', 1000),
  it('arroz-pato', 'Arroz de Pato', 900),
]

const mariscos: MenuItem[] = [
  it('peixe-peru', 'Peixe Peru', 750),
  it('posta-peixe', 'Posta de Peixe Grelhado', 850, 'Com salada, arroz, batata frita, vinagrete ou pirão.'),
  it('peixe-inteiro-2', 'Peixe Inteiro p/ 2 Pessoas', 1200, 'Com salada, arroz, batata frita e pirão.'),
  it('peixe-inteiro-4', 'Peixe Inteiro p/ 4 Pessoas', 2200, 'Com salada, arroz, batata frita e pirão.'),
  it('bacalhau-ze-pipo', 'Bacalhau à Zé do Pipo', 1400),
  it('bacalhau-lagareiro', 'Bacalhau à Lagareiro', 1500),
  it('bacalhau-bras', 'Bacalhau à Brás', 1400),
  it('bacalhau-braga', 'Bacalhau à Braga', 1500),
  it('bacalhau-natas', 'Bacalhau c/ Natas Gratinado no Forno', 1700),
  it('camarao-to', 'Camarão Tô Grelhado ou na Frigideira (8 unid.)', 1000, 'Com molho de coco ou de alho e manteiga.'),
  it('camarao-medio', 'Camarão Médio Grelhado ou na Frigideira (4 unid.)', 1000, 'Com molho de coco ou de alho.'),
  it('camarao-frigideira', 'Camarão na Frigideira (7 unid.)', 1200, 'Alho, manteiga e coentros.'),
  it('lula-grelhada', 'Lula Grelhada', 800),
  it('lagosta-grelhada', 'Lagosta Grelhada (4 unid.)', 1800),
]

const combos: MenuItem[] = [
  it('aparelhada-1', 'Aparelhada para 1 Pessoa', 1500, 'Lula, camarão e lagosta.', photo(photos.mariscada, 'seafood', 'Travessa de marisco com camarão, lula e lagosta')),
  it('aparelhada-2', 'Aparelhada para 2 Pessoas', 2800, 'Lula, camarão e lagosta.', photo(photos.mariscada, 'seafood', 'Travessa de marisco para duas pessoas')),
  it('aparelhada-bom-paladar', 'Aparelhada à Bom Paladar (3 pessoas)', 3800, 'Lula, camarão, caranguejos, lagosta, amêijoa e postinha de peixe.', photo(photos.mariscada, 'seafood', 'Grande travessa de marisco à Bom Paladar')),
]

const aves: MenuItem[] = [
  it('frango-mamae', 'Frango à Mamãe', 1200, 'Frango, ovo estrelado, batata frita e salada.'),
  it('meia-galinha', '½ Galinha Cafreal ou Frango', 800, undefined, photo(photos.meioFrango, 'grill', 'Meio frango grelhado com batata frita e lima')),
  it('galinha-grelhada', 'Galinha Cafreal Inteira Grelhada', 1000),
  it('galinha-pastora', 'Galinha Cafreal Inteira à Pastora', 1000),
  it('xatine-aves', 'Xatiné c/ Maço', 1500),
]

const carnes: MenuItem[] = [
  it('bife-bom-paladar', 'Bife à Bom Paladar', 1100, 'Carne importada.'),
  it('bife-grelhado', 'Bife Grelhado c/ Molho Demi-Glace e Batata Chips', 1100, undefined, photo(photos.carneGrelhada, 'grill', 'Bife grelhado fatiado com alecrim')),
  it('bife-milanesa', 'Bife à Milanesa', 1150, 'Recheado com queijo parmesão.'),
  it('picanha-brasileira', 'Picanha Fatiada à Brasileira', 1250, 'Carne, arroz, feijão preto, mandioca frita, couve e anéis de cebola.'),
  it('t-bone', 'T-Bone Grelhado', 1150, undefined, photo(photos.carneGrelhada, 'grill', 'Carne grelhada no ponto')),
  it('alcatra-brasa', 'Alcatra na Brasa à Patrão', 1100),
  it('perna-cabrito', 'Perna de Cabrito no Forno', 1500, 'Por encomenda.'),
  it('costelas-cabrito', 'Costelas de Cabrito', 1000, 'Por encomenda.'),
]

const tabuas: MenuItem[] = [
  it('tabua-2', 'Tábua de Carne para 2 Pessoas', 1500, 'Picanha, lombo de vaca, batata frita ou arroz e salada.', photo(photos.carneGrelhada, 'grill', 'Tábua de carne grelhada')),
  it('tabua-3', 'Tábua de Carne para 3 Pessoas', 2800, 'Picanha, lombo de vaca, batata frita ou arroz e salada.'),
  it('tabua-4', 'Tábua de Carne para 4 Pessoas', 4100, 'Picanha, lombo de vaca, batata frita ou arroz e salada.'),
]

const guarnicoes: MenuItem[] = [
  it('arroz-branco', 'Arroz Branco / de Coco / de Legumes', 150),
  it('arroz-tomate', 'Arroz de Tomate c/ Salsicha', 250),
  it('arroz-feijao', 'Arroz de Feijão c/ Salsicha', 250),
  it('xima', 'Xima', 150),
  it('xima-caracata', 'Xima Caracata', 150),
  it('mandioca', 'Mandioca', 150, 'Frita, cozida ou refogada.'),
  it('batata-doce', 'Batata-Doce', 150, 'Cozida, assada ou frita.'),
  it('batata-reno', 'Batata Reno', 150, 'Frita, assada ou cozida.'),
  it('pure-abobora', 'Puré de Abóbora', 200),
  it('legumes-salteados', 'Legumes Salteados', 200),
  it('matapa', 'Matapa', 250),
  it('feijao-preto', 'Feijão Preto', 150),
  it('feijao-manteiga', 'Feijão Manteiga c/ Coco', 200),
  it('xatine-guarnicao', 'Xatiné c/ Maço', 150),
]

const sobremesas: MenuItem[] = [
  it('pudim-ovos', 'Pudim de Ovos', 200),
  it('bolo-bolacha', 'Bolo de Bolacha', 250),
  it('mousse-malambe', 'Mousse de Malambe', 200),
  it('mousse-maracuja', 'Mousse de Maracujá', 200),
  it('mousse-chocolate', 'Mousse de Chocolate', 200),
  it('salada-frutas', 'Salada de Frutas da Época', 200),
  it('semifrio-oreo', 'Semifrio de Bolacha Oreo', 200),
  it('semifrio-tiramisu', 'Semifrio de Tiramisù', 200),
  it('frutas-epoca', 'Frutas da Época', 100),
]

const cocktails: MenuItem[] = [
  it('margarita', 'Margarita', 350, 'Tequila branca, triple sec, lime e sumo de lima.', art('cocktail', 'Cocktail Margarita', 'lime')),
  it('savanarita', 'Savanarita & Coronarita', 500, 'Tequila branca, triple sec, lime, sumo de lima e sidra.', art('cocktail', 'Cocktail Savanarita', 'amber')),
  it('caipirinha', 'Caipirinha', 350, 'Cachaça, lima, maracujá, frutos vermelhos, kiwi, tangerina e xarope de açúcar.', photo(photos.mojito, 'cocktail', 'Caipirinha com lima e gelo')),
  it('caipiroska', 'Caipiroska', 300, 'Vodka, lima, maracujá, frutos vermelhos, kiwi, tangerina e xarope de açúcar.', art('cocktail', 'Caipiroska de frutos vermelhos', 'berry')),
  it('long-island', 'Long Island', 350, 'Vodka, rum branco, triple sec, Coca-Cola, sumo de lima e tequila branca.', art('cocktail', 'Cocktail Long Island', 'amber')),
  it('tequila-sunrise', 'Tequila Sunrise', 500, 'Tequila branca, sumo de laranja e grenadine.', art('cocktail', 'Tequila Sunrise', 'sunrise')),
  it('strawberry-daiquiri', 'Strawberry Daiquiri', 400, 'Rum, triple sec, morango e lime.', art('cocktail', 'Daiquiri de morango', 'berry')),
  it('intense-man', 'Bom Paladar Intense Man', 500, 'Rum branco, malambe e sumo de ananás.', art('cocktail', 'Cocktail de assinatura Intense Man', 'sunrise')),
  it('caipirinha-cerveja', 'Caipirinha de Cerveja', 400, undefined, art('cocktail', 'Caipirinha de cerveja', 'amber')),
  it('sexy-on-the-beach', 'Sexy on the Beach', 400, 'Vodka, licor de pêssego e sumo de laranja.', art('cocktail', 'Cocktail Sexy on the Beach', 'sunrise')),
  it('intense-girl', 'Bom Paladar Intense Girl', 400, 'Licor de morango, piña colada, rum e sumo de ananás.', art('cocktail', 'Cocktail de assinatura Intense Girl', 'berry')),
  it('blue-lagoon', 'Blue Lagoon', 300, 'Vodka, licor Blue Curaçao, sumo de limão e Sprite.', art('cocktail', 'Cocktail Blue Lagoon', 'blue')),
  it('blue-hawaii', 'Blue Hawaii', 350, 'Vodka, licor de pêssego, licor Blue Curaçao e Sprite.', art('cocktail', 'Cocktail Blue Hawaii', 'blue')),
  it('mojito', 'Mojito', 300, 'Rum branco, lima, hortelã, Sprite ou água tónica.', photo(photos.mojito, 'cocktail', 'Mojito com hortelã e lima')),
  it('pina-colada', 'Piña Colada', 450, 'Rum branco, cocktail base de piña colada e sumo de ananás.', photo(photos.pinaColada, 'cocktail', 'Piña Colada cremosa com ananás')),
  it('shots', 'Shots', undefined, 'Blow Job, Guitinha, B52, Tequila Gold, Tequila Branca, Blue Kamikaze, Jägermeister e Jägerbomb.', art('cocktail', 'Shots', 'amber')),
  it('sangria', 'Sangria de Vinho Branco / Tinto', 800, 'Aguardente de cana, triple sec, xarope de menta, brandy, vinho e Sprite.', art('wine', 'Jarro de sangria com fruta')),
]

export const menuSections: MenuSection[] = [
  { id: 'entradas', label: 'Entradas', items: entradas },
  { id: 'sopas', label: 'Sopas', note: 'Preço único', flatPrice: 150, items: sopas },
  { id: 'petiscos', label: 'Petiscos', note: 'Preço único', flatPrice: 250, items: petiscos },
  { id: 'saladas', label: 'Saladas', items: saladas },
  { id: 'sanduiches', label: 'Sanduíches & Omeletes', items: sanduiches },
  { id: 'pizzas', label: 'Pizzas', items: pizzas },
  { id: 'massas', label: 'Massas & Lasanhas', items: massas },
  { id: 'arroz', label: 'Arroz à Moda do Chefe', items: arroz },
  { id: 'mariscos', label: 'Mariscos & Peixes', items: mariscos },
  { id: 'combos', label: 'Combos de Mariscos', note: 'Aparelhada', items: combos },
  { id: 'aves', label: 'Aves', items: aves },
  { id: 'carnes', label: 'Carnes', items: carnes },
  { id: 'tabuas', label: 'Tábuas', items: tabuas },
  { id: 'guarnicoes', label: 'Guarnições & Tubérculos', items: guarnicoes },
  { id: 'sobremesas', label: 'Sobremesas', items: sobremesas },
  { id: 'cocktails', label: 'Cocktails', items: cocktails },
]

// The drinks pages of the printed menu could not be transcribed yet.
export const barNote =
  'Águas, refrigerantes, sumos, cafetaria, cervejas, vinhos, espumantes, whisky, aguardentes e licores: consulte a carta de bebidas no restaurante.'

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
