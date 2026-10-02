import { photos } from './photos'
import type { MenuCategory, MenuItem } from './types'

// Transcribed from the restaurant's printed menus (Pasta, Pizza, Cocktail boards).
// Source images were low resolution: verify names and prices against the physical menu before going live.

export const pizzas: MenuItem[] = [
  { id: 'something-meating', name: 'Something Meating', description: 'Carne moída, bacon de vaca, salsicha, molho de tomate e queijo.', price: 700, visual: { art: 'pizza', photo: photos.pizzaSomethingMeating, alt: 'Pizza Something Meating com carnes e queijo' } },
  { id: 'chicken-mushroom', name: 'Chicken Mushroom', description: 'Frango, cogumelos, cebola e tomate em cubinhos.', price: 700, visual: { art: 'pizza', photo: photos.pizzaChickenMushroom, alt: 'Pizza Chicken Mushroom com frango e cogumelos' } },
  { id: 'pizza-club', name: 'Pizza Club', description: 'Bacon de vaca e peito de frango.', price: 700, visual: { art: 'pizza', photo: photos.pizzaSomethingMeating, alt: 'Pizza Club com bacon e frango' } },
  { id: 'pizza-mexicana', name: 'Pizza Mexicana', description: 'Carne moída, azeitonas, pimento em cubinhos e cebola picada.', price: 700, visual: { art: 'pizza', photo: photos.pizzaMexicana, alt: 'Pizza Mexicana com carne moída e pimento' } },
  { id: 'pizza-regina', name: 'Pizza Regina', description: 'Cogumelos e fiambre.', price: 700, visual: { art: 'pizza', photo: photos.pizzaChickenMushroom, alt: 'Pizza Regina com cogumelos' } },
  { id: 'pizza-havaiana', name: 'Pizza Havaiana', description: 'Ananás e fiambre em cubinhos.', price: 700, visual: { art: 'pizza', photo: photos.pizzaHavaiana, alt: 'Pizza Havaiana com ananás' } },
  { id: 'pizza-seafood', name: 'Pizza Seafood', description: 'Lulas, camarão, mexilhão e pimentos.', price: 750, visual: { art: 'pizza-seafood', photo: photos.pizzaSeafood, alt: 'Pizza de marisco com camarão e lulas' } },
  { id: 'cream-cheese-crust', name: 'Cream Cheese Crust', description: 'Borda recheada com queijo creme.', price: 800, visual: { art: 'pizza', photo: photos.pizzaDoubleStack, alt: 'Pizza com borda recheada de queijo creme' } },
  { id: 'double-stack', name: 'Double Stack', description: 'Duas camadas de massa recheadas, com o melhor da casa.', price: 1000, visual: { art: 'pizza', photo: photos.pizzaDoubleStack, alt: 'Pizza Double Stack de massa dupla' } },
  { id: 'duas-estacoes', name: 'Pizza de Duas Estações', price: 800, visual: { art: 'pizza', photo: photos.pizzaMexicana, alt: 'Pizza de duas estações' } },
  { id: 'quatro-estacoes', name: 'Pizza de Quatro Estações', price: 800, visual: { art: 'pizza', photo: photos.pizzaHavaiana, alt: 'Pizza de quatro estações' } },
  { id: 'pizza-atum', name: 'Pizza de Atum', price: 700, visual: { art: 'pizza', photo: photos.pizzaSeafood, alt: 'Pizza de atum' } },
]

export const massas: MenuItem[] = [
  { id: 'carbonara', name: 'Massa Tagliatelle Carbonara', description: 'Tiras de frango, salsicha, natas e cogumelos.', price: 550, visual: { art: 'pasta', photo: photos.massaCarbonara, alt: 'Tagliatelle carbonara cremoso' } },
  { id: 'fettuccine', name: 'Massa Fettuccine', description: 'Tiras de frango, camarão, cebola picada e molho de tomate.', price: 850, visual: { art: 'pasta-red', photo: photos.massaFettuccine, alt: 'Fettuccine com frango e camarão' } },
  { id: 'bolonhesa', name: 'Massa Bolonhesa', description: 'Esparguete com carne moída e molho de tomate.', price: 650, visual: { art: 'pasta-red', photo: photos.massaBolonhesa, alt: 'Esparguete à bolonhesa' } },
  { id: 'puttanesca-marisco', name: 'Massa Puttanesca de Marisco', description: 'Lulas, camarão e mexilhão em molho de tomate.', price: 1200, visual: { art: 'pasta-red', photo: photos.massaMarisco, alt: 'Massa puttanesca com marisco' } },
  { id: 'lasanha-carne', name: 'Lasanha de Carne Moída', price: 700, visual: { art: 'lasagna', photo: photos.lasanhaCarne, alt: 'Lasanha de carne moída gratinada' } },
  { id: 'lasanha-frango', name: 'Lasanha de Frango Desfiado', price: 700, visual: { art: 'lasagna', photo: photos.lasanhaFrango, alt: 'Lasanha de frango desfiado' } },
  { id: 'lasanha-legumes', name: 'Lasanha de Legumes', price: 550, visual: { art: 'lasagna', photo: photos.lasanhaFrango, alt: 'Lasanha de legumes' } },
]

export const cocktails: MenuItem[] = [
  { id: 'margarita', name: 'Margarita', description: 'Tequila branca, triple sec, lima e sumo de limão.', price: 350, visual: { art: 'cocktail', tint: 'lime', photo: photos.mojito, alt: 'Cocktail Margarita' } },
  { id: 'caipirinha', name: 'Caipirinha', description: 'Cachaça, lima, maracujá, frutos vermelhos, kiwi, tangerina e xarope de açúcar.', price: 350, visual: { art: 'cocktail', tint: 'lime', photo: photos.mojito, alt: 'Caipirinha com lima' } },
  { id: 'caipiroska', name: 'Caipiroska', description: 'Vodka, lima, maracujá, frutos vermelhos, kiwi, tangerina e xarope de açúcar.', price: 300, visual: { art: 'cocktail', tint: 'berry', photo: photos.cocktailSignature, alt: 'Caipiroska de frutos vermelhos' } },
  { id: 'long-island', name: 'Long Island', description: 'Vodka, rum branco, triple sec, gin, sumo de lima e tequila branca.', price: 350, visual: { art: 'cocktail', tint: 'amber', photo: photos.tequilaSunrise, alt: 'Cocktail Long Island' } },
  { id: 'tequila-sunrise', name: 'Tequila Sunrise', description: 'Tequila branca, sumo de laranja e grenadine.', price: 500, visual: { art: 'cocktail', tint: 'sunrise', photo: photos.tequilaSunrise, alt: 'Tequila Sunrise' } },
  { id: 'strawberry-daiquiri', name: 'Strawberry Daiquiri', description: 'Rum, triple sec, morango e lima.', price: 400, visual: { art: 'cocktail', tint: 'berry', photo: photos.cocktailSignature, alt: 'Daiquiri de morango' } },
  { id: 'intense-man', name: 'Bom Paladar Intense Man', description: 'Rum branco, malibu e sumo de ananás.', price: 500, visual: { art: 'cocktail', tint: 'sunrise', photo: photos.cocktailSignature, alt: 'Cocktail de assinatura Bom Paladar Intense Man' } },
  { id: 'intense-girl', name: 'Bom Paladar Intense Girl', description: 'Licor de morango, piña colada, rum e sumo de ananás.', price: 400, visual: { art: 'cocktail', tint: 'berry', photo: photos.cocktailSignature, alt: 'Cocktail de assinatura Bom Paladar Intense Girl' } },
  { id: 'sex-on-the-beach', name: 'Sex on the Beach', description: 'Vodka, licor de pêssego e sumo de laranja.', price: 400, visual: { art: 'cocktail', tint: 'sunrise', photo: photos.tequilaSunrise, alt: 'Cocktail Sex on the Beach' } },
  { id: 'blue-lagoon', name: 'Blue Lagoon', description: 'Vodka, licor Blue Curaçao, sumo de limão e Sprite.', price: 350, visual: { art: 'cocktail', tint: 'blue', photo: photos.blueLagoon, alt: 'Cocktail Blue Lagoon azul' } },
  { id: 'blue-hawaii', name: 'Blue Hawaii', description: 'Vodka, licor de morango, Blue Curaçao e Sprite.', price: 350, visual: { art: 'cocktail', tint: 'blue', photo: photos.blueLagoon, alt: 'Cocktail Blue Hawaii' } },
  { id: 'mojito', name: 'Mojito', description: 'Rum branco, lima, hortelã, Sprite ou água tónica.', price: 350, visual: { art: 'cocktail', tint: 'mint', photo: photos.mojito, alt: 'Mojito com hortelã' } },
  { id: 'pina-colada', name: 'Piña Colada', description: 'Rum branco, cocktail de piña colada e sumo de ananás.', price: 450, visual: { art: 'cocktail', tint: 'cream', photo: photos.pinaColada, alt: 'Piña Colada cremosa' } },
  { id: 'caipirinha-cerveja', name: 'Caipirinha de Cerveja', price: 400, visual: { art: 'cocktail', tint: 'amber', photo: photos.tequilaSunrise, alt: 'Caipirinha de cerveja' } },
  { id: 'sangria', name: 'Sangria de Vinho Branco / Tinto', description: 'Aperitivo da casa, triple sec, frutas da época, brandy, vinho e Sprite.', price: 800, visual: { art: 'wine', photo: photos.sangria, alt: 'Jarro de sangria com fruta' } },
]

export const menuCategories: MenuCategory[] = [
  { id: 'pizzas', label: 'Pizzas', items: pizzas },
  { id: 'massas', label: 'Massas & Lasanhas', items: massas },
  { id: 'cocktails', label: 'Cocktails', items: cocktails },
]

// Sections present on the printed menu whose items could not be transcribed from the source images.
export const otherMenuSections = [
  'Entradas',
  'Sanduíches & Omeletes',
  'Mariscos & Peixes',
  'Combos de Mariscada',
  'Aves',
  'Carnes',
  'Doces',
  'Cafetaria',
  'Refrigerantes & Sumos',
  'Cervejas',
  'Vinhos Tintos, Brancos & Rosé',
  'Espumantes',
  'Whisky',
  'Aguardentes & Licores',
  'Shots',
]

export function findItem(id: string): MenuItem {
  for (const cat of menuCategories) {
    const item = cat.items.find((i) => i.id === id)
    if (item) return item
  }
  throw new Error(`Menu item not found: ${id}`)
}
