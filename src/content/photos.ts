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

// Real photos of the restaurant's food, published on Google Maps by a customer (720 px source).
const real = (name: string, credit: string): Photo => ({
  webp: `/images/dishes/${name}-720.webp`,
  jpg: `/images/dishes/${name}-720.jpg`,
  webpSet: `/images/dishes/${name}-512.webp 512w, /images/dishes/${name}-720.webp 720w`,
  jpgSet: `/images/dishes/${name}-512.jpg 512w, /images/dishes/${name}-720.jpg 720w`,
  width: 720,
  height: 720,
  credit,
})

// Single-size crop of a real photo (source too small for a second resolution).
const realCrop = (name: string, width: number, height: number, credit: string): Photo => ({
  webp: `/images/dishes/${name}.webp`,
  jpg: `/images/dishes/${name}.jpg`,
  width,
  height,
  credit,
})

const GOOGLE_CREDIT = 'Foto: Arsénio Iade (Google Maps)'

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
  asinhas: realCrop('real-asinhas', 440, 330, GOOGLE_CREDIT),
  paoAlho: realCrop('real-pao-alho', 528, 396, GOOGLE_CREDIT),
  meioFrango: real('real-meio-frango', GOOGLE_CREDIT),
}
