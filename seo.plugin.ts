import type { Plugin } from 'vite'
import { menuCategories } from './src/content/menu'
import { restaurant } from './src/content/restaurant'

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function jsonLd() {
  const { address, siteUrl } = restaurant
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: restaurant.legalName,
    description: restaurant.description,
    url: siteUrl,
    image: `${siteUrl}/og-image.png`,
    telephone: restaurant.phone.display.replace(/\s/g, ''),
    servesCuisine: ['Pizza', 'Italiana', 'Mariscos', 'Grelhados', 'Cocktails'],
    priceRange: '300–1.200 MT',
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
      inLanguage: 'pt',
      hasMenuSection: menuCategories.map((cat) => ({
        '@type': 'MenuSection',
        name: cat.label,
        hasMenuItem: cat.items.map((item) => ({
          '@type': 'MenuItem',
          name: item.name,
          ...(item.description ? { description: item.description } : {}),
          offers: { '@type': 'Offer', price: item.price, priceCurrency: restaurant.currency },
        })),
      })),
    },
  }
}

function headTags() {
  const { siteUrl } = restaurant
  const title = `${restaurant.legalName} | Pizzas, Massas e Cocktails em Quelimane`
  const description = escapeHtml(restaurant.description)
  return [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${description}" />`,
    `<link rel="canonical" href="${siteUrl}/" />`,
    `<meta property="og:type" content="restaurant" />`,
    `<meta property="og:site_name" content="${escapeHtml(restaurant.legalName)}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${siteUrl}/" />`,
    `<meta property="og:locale" content="${restaurant.locale}" />`,
    `<meta property="og:image" content="${siteUrl}/og-image.png" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${siteUrl}/og-image.png" />`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd()).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ')
}

/** Injects meta tags + JSON-LD from src/content and emits sitemap.xml / robots.txt, so SEO never drifts from the content. */
export function seoPlugin(): Plugin {
  return {
    name: 'bom-paladar-seo',
    transformIndexHtml(html) {
      return html.replace('<!-- %SEO% -->', headTags())
    },
    generateBundle() {
      const { siteUrl } = restaurant
      const today = new Date().toISOString().slice(0, 10)
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${siteUrl}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      })
    },
  }
}
