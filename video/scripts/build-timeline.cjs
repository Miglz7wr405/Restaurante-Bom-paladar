/**
 * Gera video/timeline.json: cenas alinhadas à batida da música, posição de cada fala e dos efeitos.
 *
 *   node scripts/build-timeline.cjs
 *
 * Entradas: assets/audio/music/music.mp3 (+ beats.py), assets/audio/vo/vo1..vo8.mp3.
 * Uma fala em falta usa a duração estimada (a fala 8 pode ainda não existir).
 */
const fs = require('node:fs')
const path = require('node:path')
const { execFileSync } = require('node:child_process')

const ROOT = path.resolve(__dirname, '..')
const A = (p) => path.join(ROOT, 'assets/audio', p)
const FPS = 30
const DURATION = 57

const probe = (file) => Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file]).toString().trim())
const music = JSON.parse(execFileSync('python3', [path.join(__dirname, 'beats.py'), A('music/music.mp3'), '112']).toString())
const beat = (n) => +(music.offset + n * (60 / music.bpm)).toFixed(3)

// Duração de cada fala (estimativa se o ficheiro ainda não existir)
const estimates = { vo8: 2.3 }
const vo = {}
for (let i = 1; i <= 8; i++) {
  const f = A(`vo/vo${i}.mp3`)
  vo[`vo${i}`] = fs.existsSync(f) ? { file: `vo/vo${i}.mp3`, dur: +probe(f).toFixed(3) } : { file: null, dur: estimates[`vo${i}`] }
}

// Cenas: limites em batidas (6 batidas por prato ≈ 3,2 s a 112 BPM)
const sceneBeats = [
  ['hook', 0, 6],
  ['logo', 6, 14],
  ['restaurant', 14, 22],
  ['dish-pizza', 22, 28],
  ['dish-massa', 28, 34],
  ['dish-mariscos', 34, 40],
  ['dish-carne', 40, 46],
  ['dish-cocktails', 46, 52],
  ['menu', 52, 64],
  ['website', 64, 88],
  ['cta', 88, null],
]
const scenes = sceneBeats.map(([id, b0, b1]) => ({ id, start: b0 === 0 ? 0 : beat(b0), end: b1 === null ? DURATION : beat(b1) }))
const S = Object.fromEntries(scenes.map((s) => [s.id, s]))

// Falas. A fala 4 é cortada nas pausas: uma frase por prato.
const vo4cuts = [0, 1.27, 2.41, 3.34, vo.vo4.dur]
const lines = [
  { id: 'vo1', at: 0.5, text: 'Em Quelimane, há um sabor que fica na memória.' },
  { id: 'vo2', at: S.logo.start + 0.35, text: 'Bom Paladar, Restaurante e Bar. Sabor, qualidade e boa companhia.' },
  { id: 'vo3', at: S.restaurant.start + 0.4, text: 'Na Rua Robert Mugabe, abertos até à meia-noite.' },
  { id: 'vo4', from: vo4cuts[0], to: vo4cuts[1], at: S['dish-pizza'].start + 0.3, text: 'Pizzas a sair do forno.' },
  { id: 'vo4', from: vo4cuts[1], to: vo4cuts[2], at: S['dish-massa'].start + 0.3, text: 'Massas cremosas.' },
  { id: 'vo4', from: vo4cuts[2], to: vo4cuts[3], at: S['dish-mariscos'].start + 0.3, text: 'Mariscos do Índico.' },
  { id: 'vo4', from: vo4cuts[3], to: vo4cuts[4], at: S['dish-carne'].start + 0.3, text: 'Carnes grelhadas no ponto.' },
  { id: 'vo5', at: S['dish-cocktails'].start + 0.35, text: 'E cocktails que fazem a noite!' },
  { id: 'vo6', at: S.menu.start + 0.5, text: 'Mais de cento e trinta pratos e bebidas, das entradas às sobremesas.' },
  { id: 'vo7', at: S.website.start + 0.6, text: 'Visite o nosso website: veja o menu completo e reserve a sua mesa pelo WhatsApp.' },
  { id: 'vo8', at: S.cta.start + 0.7, text: 'Bom Paladar. Reserve já a sua mesa!' },
].map((l) => {
  const v = vo[l.id]
  const from = l.from ?? 0
  const to = l.to ?? v.dur
  return { ...l, file: v.file, from, to, at: +l.at.toFixed(3), end: +(l.at + to - from).toFixed(3) }
})

// Efeitos
const cuts = scenes.slice(1).map((s) => s.start)
const sfx = [
  ...cuts.map((c) => ({ file: 'sfx/whoosh.mp3', at: +(c - 0.42).toFixed(3), gain: -6 })),
  { file: 'sfx/logo.mp3', at: S.logo.start, gain: -4 },
  { file: 'sfx/sizzle.mp3', at: S['dish-carne'].start + 0.15, gain: -6 },
  { file: 'sfx/ice.mp3', at: S['dish-cocktails'].start + 0.2, gain: -7 },
  // Cliques sincronizados com a gravação do site (ver capture-site.cjs: separador aos 6,8 s, Cardápio aos 6,2 s)
  { file: 'sfx/click.mp3', at: S.website.start + 6.2, gain: -10 },
  { file: 'sfx/click.mp3', at: S.website.start + 6.8, gain: -10 },
  { file: 'sfx/logo.mp3', at: S.cta.start + 0.1, gain: -5 },
]

const timeline = {
  fps: FPS,
  duration: DURATION,
  frames: DURATION * FPS,
  music: { file: 'music/music.mp3', bpm: music.bpm, offset: music.offset, fadeOut: [DURATION - 1.2, DURATION] },
  beats: music.beats.filter((b) => b < DURATION),
  scenes,
  lines,
  sfx,
  site: { start: S.website.start, desktop: 'site/desktop', mobile: 'site/mobile', frames: 405 },
}
fs.writeFileSync(path.join(ROOT, 'timeline.json'), JSON.stringify(timeline, null, 2) + '\n')
console.log(scenes.map((s) => `${s.id.padEnd(15)} ${s.start.toFixed(2)} → ${s.end.toFixed(2)}`).join('\n'))
console.log(lines.map((l) => `${l.id} ${l.at.toFixed(2)}–${l.end.toFixed(2)} ${l.file ? '' : '(em falta)'} ${l.text}`).join('\n'))
