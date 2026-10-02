import type { Plugin } from 'vite'
import { menuItemCount, menuSections } from './src/content/menu'
import { formatPrice, MENU_URL, restaurant } from './src/content/restaurant'

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

interface PageSeo {
  path: string
  title: string
  description: string
}

const PAGES: Record<'home' | 'menu', PageSeo> = {
  home: {
    path: '/',
    title: `${restaurant.legalName} | Pizzas, Mariscos e Cocktails em Quelimane`,
    description: restaurant.description,
  },
  menu: {
    path: MENU_URL,
    title: `Menu | ${restaurant.legalName}, Quelimane`,
    description: `Menu completo do ${restaurant.legalName}: ${menuItemCount} pratos e bebidas, de entradas, mariscos e carnes a pizzas, massas, sobremesas e cocktails, com preços em meticais.`,
  },
}

const prices = menuSections.flatMap((s) => s.items.flatMap((i) => (i.price === undefined ? [] : [i.price])))

function jsonLd() {
  const { address, siteUrl } = restaurant
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: restaurant.legalName,
    description: restaurant.description,
    slogan: restaurant.slogan,
    url: `${siteUrl}/`,
    image: `${siteUrl}/og-image.png`,
    telephone: restaurant.phone.display.replace(/\s/g, ''),
    servesCuisine: ['Moçambicana', 'Portuguesa', 'Mariscos', 'Pizza', 'Grelhados', 'Cocktails'],
    priceRange: `${formatPrice(Math.min(...prices))} – ${formatPrice(Math.max(...prices))}`,
    currenciesAccepted: restaurant.currency,
    acceptsReservations: true,
    hasMap: restaurant.mapsUrl,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.region,
      addressCountry: address.countryCode,
    },
    // Schema.org needs both opens and closes; entries without a confirmed opening time are skipped.
    openingHoursSpecification: restaurant.hours.flatMap((h) =>
      h.opens
        ? [{ '@type': 'OpeningHoursSpecification', dayOfWeek: h.schemaDays, opens: h.opens, closes: h.closes === '00:00' ? '23:59' : h.closes }]
        : [],
    ),
    hasMenu: {
      '@type': 'Menu',
      name: 'Menu Bom Paladar',
      url: `${siteUrl}${MENU_URL}`,
      inLanguage: 'pt',
      hasMenuSection: menuSections.map((section) => ({
        '@type': 'MenuSection',
        name: section.label,
        hasMenuItem: section.items.map((item) => ({
          '@type': 'MenuItem',
          name: item.name,
          ...(item.description ? { description: item.description } : {}),
          ...(item.price !== undefined ? { offers: { '@type': 'Offer', price: item.price, priceCurrency: restaurant.currency } } : {}),
        })),
      })),
    },
  }
}

function headTags(page: PageSeo) {
  const url = `${restaurant.siteUrl}${page.path}`
  const image = `${restaurant.siteUrl}/og-image.png`
  const title = escapeHtml(page.title)
  const description = escapeHtml(page.description)
  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="restaurant" />`,
    `<meta property="og:site_name" content="${escapeHtml(restaurant.legalName)}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:locale" content="${restaurant.locale}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd()).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ')
}

/** Injects per-page meta tags + JSON-LD from src/content and emits sitemap.xml / robots.txt, so SEO never drifts from the content. */
export function seoPlugin(): Plugin {
  return {
    name: 'bom-paladar-seo',
    transformIndexHtml(html, ctx) {
      const page = /(^|\/)menu\/(index\.html)?$/.test(ctx.path) ? PAGES.menu : PAGES.home
      return html.replace('<!-- %SEO% -->', headTags(page))
    },
    generateBundle() {
      const { siteUrl } = restaurant
      const today = new Date().toISOString().slice(0, 10)
      const urls = Object.values(PAGES)
        .map(
          (p, i) =>
            `  <url>\n    <loc>${siteUrl}${p.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${i === 0 ? '1.0' : '0.9'}</priority>\n  </url>`,
        )
        .join('\n')
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      })
    },
  }
}
