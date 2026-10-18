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

// Wide (16:9) photo for section covers, served at 800/1440 px.
const wide = (name: string): Photo => ({
  webp: `/images/dishes/${name}-1440.webp`,
  jpg: `/images/dishes/${name}-1440.jpg`,
  webpSet: `/images/dishes/${name}-800.webp 800w, /images/dishes/${name}-1440.webp 1440w`,
  jpgSet: `/images/dishes/${name}-800.jpg 800w, /images/dishes/${name}-1440.jpg 1440w`,
  width: 1440,
  height: 810,
})

export const photos = {
  // Buffet
  buffet: dish('buffet'),
  buffetMesa: dish('buffet-mesa'),
  buffetVariado: dish('buffet-variado'),
  buffetCapa: wide('buffet-capa'),
  salgados: dish('salgados'),
  sopaAbobora: dish('sopa-abobora'),
  bifePanela: dish('bife-panela'),
  feijoada: dish('feijoada'),
  cabritoForno: dish('cabrito-forno'),
  galinhaZambeziana: dish('galinha-zambeziana'),
  espetadaFrango: dish('espetada-frango'),
  peixeGrelhado: dish('peixe-grelhado'),
  camaraoTigre: dish('camarao-tigre'),
  lulasGrelhadas: dish('lulas-grelhadas'),
  lagostaGrelhada: dish('lagosta-grelhada'),
  mucuane: dish('mucuane'),
  arrozLegumes: dish('arroz-legumes'),
  mousseMalambe: dish('mousse-malambe'),
  // Pasta & lasanhas
  massaCarbonara: dish('massa-carbonara'),
  massaBolonhesa: dish('massa-bolonhesa'),
  massaFettuccine: dish('massa-fettuccine'),
  massaMarisco: dish('massa-marisco'),
  lasanhaCarne: dish('lasanha-carne'),
  lasanhaFrango: dish('lasanha-frango'),
  lasanhaLegumes: dish('lasanha-legumes'),
  // Bar
  margarita: dish('cocktail-margarita'),
  intenseGirl: dish('cocktail-intense-girl'),
  caipirinha: dish('cocktail-caipirinha'),
  caipirosca: dish('cocktail-caipirosca'),
  mojito: dish('cocktail-mojito'),
  tequilaSunrise: dish('cocktail-tequila-sunrise'),
  ginTonico: dish('cocktail-gin-tonico'),
  sexyOnTheBeach: dish('cocktail-sexy-on-the-beach'),
  blueLagoon: dish('cocktail-blue-lagoon'),
  blueHawaii: dish('cocktail-blue-hawaii'),
  pinaColada: dish('cocktail-pina-colada'),
  shots: dish('shots'),
  caipirinhaCerveja: dish('cocktail-caipirinha-cerveja'),
  sangria: dish('sangria'),
  vinhos: dish('vinhos'),
}
