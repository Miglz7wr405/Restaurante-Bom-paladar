/**
 * Renderiza a composição frame a frame (Chromium do Playwright).
 *
 *   node scripts/render.cjs --format 9x16|16x9 [--workers 3] [--from 0 --to 57] [--every 1]
 *
 * Cada worker abre a composição, faz `await comp.seek(t)` e tira um screenshot JPEG por frame.
 * Saída: out/<formato>/frames/f00001.jpg …
 */
const fs = require('node:fs')
const path = require('node:path')
const { chromium } = require('playwright')

const ROOT = path.resolve(__dirname, '..')
const arg = (k, d) => {
  const i = process.argv.indexOf(`--${k}`)
  return i > -1 ? process.argv[i + 1] : d
}
const format = arg('format', '16x9')
const workers = Number(arg('workers', 3))
const every = Number(arg('every', 1))
const timeline = JSON.parse(fs.readFileSync(path.join(ROOT, 'timeline.json'), 'utf8'))
const fps = timeline.fps
const from = Math.round(Number(arg('from', 0)) * fps)
const to = Math.min(timeline.frames, Math.round(Number(arg('to', timeline.duration)) * fps))
const [w, h] = format === '9x16' ? [1080, 1920] : [1920, 1080]
const outDir = path.join(ROOT, 'out', format, 'frames')
fs.mkdirSync(outDir, { recursive: true })

const frames = []
for (let f = from; f < to; f += every) frames.push(f)

async function worker(id, list) {
  const browser = await chromium.launch({ args: ['--allow-file-access-from-files', '--disable-web-security'] })
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 })
  page.on('pageerror', (e) => console.error(`[w${id}] pageerror`, e.message))
  page.on('console', (m) => m.type() === 'error' && console.error(`[w${id}]`, m.text()))
  await page.addInitScript((tlj) => (window.TIMELINE = tlj), timeline)
  await page.goto(`file://${path.join(ROOT, 'comp/index.html')}?format=${format}`)
  await page.evaluate(() => window.comp.ready)
  let n = 0
  for (const f of list) {
    await page.evaluate((t) => window.comp.seek(t), f / fps)
    await page.screenshot({ path: path.join(outDir, `f${String(f + 1).padStart(5, '0')}.jpg`), type: 'jpeg', quality: 95 })
    if (++n % 100 === 0) console.log(`[w${id}] ${n}/${list.length}`)
  }
  await browser.close()
}

;(async () => {
  const t0 = Date.now()
  // Blocos contíguos por worker (o seek para a frente é o mais barato)
  const size = Math.ceil(frames.length / workers)
  await Promise.all(Array.from({ length: workers }, (_, i) => worker(i, frames.slice(i * size, (i + 1) * size))))
  console.log(`${format}: ${frames.length} frames em ${((Date.now() - t0) / 1000).toFixed(0)} s → ${outDir}`)
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
