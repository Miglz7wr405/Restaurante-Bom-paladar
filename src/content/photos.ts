import type { Photo } from './types'

// Studio photos of the menu dishes (1024 px source, black background), served at 512/1024 px in WebP + JPG.
const dish = (name: string): Photo => ({
  webp: `/images/dishes/${name}-1024.webp`,
  jpg: `/images/dishes/${name}-1024.jpg`,
  webpSet: `/images/dishes/${name}-512.webp 512w, /images/dishes/${name}-1024.webp 1024w`,
  jpgSet: `/images/dishes/${name}-512.jpg 512w, /images/dishes/${name}-1024.jpg 1024w`,
  width: 1024,
  height: 1024,
})

export const photos = {
  pizzaDoubleStack: dish('pizza-double-stack'),
  pizzaChickenMushroom: dish('pizza-chicken-mushroom'),
  pizzaSeafood: dish('pizza-seafood'),
  pizzaMexicana: dish('pizza-mexicana'),
  pizzaHavaiana: dish('pizza-havaiana'),
  pizzaSomethingMeating: dish('pizza-something-meating'),
  massaCarbonara: dish('massa-carbonara'),
  massaBolonhesa: dish('massa-bolonhesa'),
  massaFettuccine: dish('massa-fettuccine'),
  massaMarisco: dish('massa-marisco'),
  lasanhaCarne: dish('lasanha-carne'),
  lasanhaFrango: dish('lasanha-frango'),
  mariscada: dish('mariscada'),
  carneGrelhada: dish('carne-grelhada'),
  mojito: dish('cocktail-mojito'),
  pinaColada: dish('cocktail-pina-colada'),
}
