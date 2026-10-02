import type { Photo } from './types'

// Dish photos cropped from the restaurant's printed menus (Pasta and Pizza boards).
// The source images are tiny, so these are flagged lowRes and only used as thumbnails.
// Replace with full-size photos (and drop lowRes) when available.
const menuPhoto = (name: string): Photo => ({
  webp: `/images/menu/${name}.webp`,
  jpg: `/images/menu/${name}.jpg`,
  width: 240,
  height: 240,
  lowRes: true,
})

export const photos = {
  pizzaCogumelos: menuPhoto('pizza-cogumelos'),
  pizzaMilho: menuPhoto('pizza-milho'),
  pizzaMarisco: menuPhoto('pizza-marisco'),
  pizzaAzeitona: menuPhoto('pizza-azeitona'),
  pizzaQueijo: menuPhoto('pizza-queijo'),
  massaBolonhesa: menuPhoto('massa-bolonhesa'),
  massaMolho: menuPhoto('massa-molho'),
  massaEsparguete: menuPhoto('massa-esparguete'),
  lasanhaGratinada: menuPhoto('lasanha-gratinada'),
  lasanhaCarne: menuPhoto('lasanha-carne'),
}
