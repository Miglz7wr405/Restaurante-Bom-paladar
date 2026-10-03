/**
 * Grava o site frame a frame, com tempo determinístico.
 *
 *   node scripts/capture-site.cjs [desktop|mobile] [--base http://localhost:4173]
 *
 * Precisa do site a correr (`npm run build && npx vite preview` na raiz).
 * - O relógio da página é falso (`page.clock`): cada frame avança exatamente 1/30 s,
 *   por isso rAF, timers e performance.now (Framer Motion, GSAP, carrossel) ficam sincronizados.
 * - As animações CSS/WAAPI ficam em pausa e são avançadas à mão com o mesmo passo.
 * - As Google Fonts são servidas a partir do @fontsource local (sem rede).
 * Saída: assets/site/<take>/f00001.jpg …
 */
const fs = require('node:fs')
const path = require('node:path')
const { chromium } = require('playwright')

const FPS = 30
const DT = 1000 / FPS
const ROOT = path.resolve(__dirname, '..')
const args = process.argv.slice(2)
const base = args.includes('--base') ? args[args.indexOf('--base') + 1] : 'http://localhost:4173'
const only = args.find((a) => !a.startsWith('--') && a !== base)

const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)

// ---- Fontes locais ---------------------------------------------------------
const FONT_DIR = path.join(ROOT, 'node_modules/@fontsource')
const fontFiles = {
  'Great Vibes': [[400, 'great-vibes/files/great-vibes-latin-400-normal.woff2'], [400, 'great-vibes/files/great-vibes-latin-ext-400-normal.woff2']],
  Inter: [400, 500, 600, 700].map((w) => [w, `inter/files/inter-latin-${w}-normal.woff2`]),
  Oswald: [400, 500, 600, 700].map((w) => [w, `oswald/files/oswald-latin-${w}-normal.woff2`]),
}
const fontCss = Object.entries(fontFiles)
  .flatMap(([family, list]) =>
    list.map(([w, f]) => `@font-face{font-family:'${family}';font-style:normal;font-weight:${w};font-display:block;src:url(https://fonts.gstatic.com/local/${f}) format('woff2');}`),
  )
  .join('\n')

async function routeFonts(context) {
  await context.route('https://fonts.googleapis.com/**', (r) => r.fulfill({ contentType: 'text/css', body: fontCss }))
  await context.route('https://fonts.gstatic.com/local/**', (r) => {
    const rel = new URL(r.request().url()).pathname.replace('/local/', '')
    r.fulfill({ contentType: 'font/woff2', body: fs.readFileSync(path.join(FONT_DIR, rel)) })
  })
}

// ---- Takes -----------------------------------------------------------------
// Cada take: url, viewport, duração e uma lista de "eventos" no tempo (s).
// scroll: [t0, t1, alvo] (alvo = número ou função que corre na página); act: [t, fn(page)]
const takes = {
  desktop: {
    url: '/',
    viewport: { width: 1440, height: 900 },
    scale: 1,
    duration: 13.5,
    scroll: [
      [2.0, 3.6, `(() => { const e = document.getElementById('hoje-title'); return e.getBoundingClientRect().top + scrollY - 140 })()`],
      [5.0, 6.4, `(() => { const e = document.getElementById('menu-title'); return e.getBoundingClientRect().top + scrollY - 120 })()`],
      [8.6, 10.0, `(() => { const e = document.getElementById('reservas-title'); return e.getBoundingClientRect().top + scrollY - 200 })()`],
      [11.2, 12.8, `document.documentElement.scrollHeight - innerHeight`],
    ],
    act: [
      [6.8, `[...document.querySelectorAll('[role=tab]')].find(b => b.textContent.trim() === 'Mariscos')?.click()`],
    ],
  },
  mobile: {
    url: '/menu/',
    viewport: { width: 390, height: 844 },
    scale: 2,
    mobile: true,
    duration: 13.5,
    scroll: [
      [1.6, 4.4, `(() => { const e = document.getElementById('pizzas'); return e.getBoundingClientRect().top + scrollY - 110 })()`],
      [5.0, 5.9, `(() => { const e = document.querySelector('[aria-label="Forma de ver o menu"]'); return e.getBoundingClientRect().top + scrollY - 80 })()`],
      [6.8, 8.6, `(() => { const e = document.getElementById('pizzas'); return e.getBoundingClientRect().top + scrollY - 110 })()`],
      [9.0, 9.6, `(() => { const e = document.querySelector('[aria-label="Forma de ver o menu"]'); return e.getBoundingClientRect().top + scrollY - 80 })()`],
    ],
    act: [
      [6.2, `[...document.querySelectorAll('button[aria-pressed]')].find(b => b.textContent.includes('Cardápio'))?.click()`],
      [9.8, `document.querySelector('input[type=search]').focus()`],
    ],
    type: [10.0, 'camarão', 0.13],
  },
}

async function capture(name, take) {
  const outDir = path.join(ROOT, 'assets/site', name)
  fs.rmSync(outDir, { recursive: true, force: true })
  fs.mkdirSync(outDir, { recursive: true })

  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: take.viewport,
    deviceScaleFactor: take.scale,
    isMobile: !!take.mobile,
    hasTouch: !!take.mobile,
    reducedMotion: 'no-preference',
  })
  await routeFonts(context)
  const page = await context.newPage()
  page.on('pageerror', (e) => console.error('[pageerror]', e.message))
  await page.clock.install({ time: new Date('2026-10-03T19:30:00') })
  await page.goto(base + take.url, { waitUntil: 'load' })
  await page.evaluate(() => document.fonts.ready)
  // Todas as imagens carregadas antes de começar (sem buracos pretos durante o scroll).
  await page.evaluate(() => document.querySelectorAll('img').forEach((i) => ((i.loading = 'eager'), (i.decoding = 'sync'))))
  await page.evaluate(() => Promise.all([...document.images].map((i) => (i.complete ? Promise.resolve() : new Promise((r) => (i.onload = i.onerror = r))).then(() => i.decode().catch(() => 0)))))
  await page.clock.pauseAt(new Date('2026-10-03T19:30:01'))
  await page.addStyleTag({ content: 'html{scroll-behavior:auto!important}' })

  // Avança animações CSS/WAAPI por `dt` ms em cada frame.
  await page.evaluate(() => {
    window.__stepAnimations = (dt) => {
      for (const a of document.getAnimations()) {
        if (a.playState === 'finished') continue
        a.pause()
        a.currentTime = (a.currentTime || 0) + dt
      }
    }
  })

  const total = Math.round(take.duration * FPS)
  const typed = new Set()
  const done = new Set()
  for (let f = 0; f < total; f++) {
    const t = f / FPS
    // Ações pontuais
    for (const [i, [at, code]] of (take.act || []).entries()) {
      if (!done.has(i) && t >= at) {
        done.add(i)
        await page.evaluate(code)
      }
    }
    // Escrita tecla a tecla
    if (take.type) {
      const [t0, text, step] = take.type
      const n = Math.min(text.length, Math.floor((t - t0) / step) + 1)
      for (let k = 0; k < n; k++) {
        if (!typed.has(k)) {
          typed.add(k)
          await page.keyboard.type(text[k])
        }
      }
    }
    // Scroll suave calculado por frame
    for (const seg of take.scroll || []) {
      const [t0, t1, target] = seg
      if (t >= t0 && t <= t1 + 1e-6) {
        if (!seg.from) {
          seg.from = await page.evaluate(() => scrollY)
          seg.to = await page.evaluate(target)
        }
        const y = seg.from + (seg.to - seg.from) * ease((t - t0) / (t1 - t0))
        await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), y)
      }
    }
    await page.clock.runFor(DT)
    await page.evaluate((dt) => window.__stepAnimations(dt), DT)
    await page.screenshot({ path: path.join(outDir, `f${String(f + 1).padStart(5, '0')}.jpg`), type: 'jpeg', quality: 90, caret: 'initial' })
    if (f % 60 === 0) process.stdout.write(`${name} ${f}/${total}\n`)
  }
  await browser.close()
  console.log(`${name}: ${total} frames → ${outDir}`)
}

;(async () => {
  for (const [name, take] of Object.entries(takes)) {
    if (only && only !== name) continue
    await capture(name, take)
  }
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
