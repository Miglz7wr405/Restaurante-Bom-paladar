/**
 * Gera video/timeline.json a partir da voz: os blocos de locução ficam seguidos (sem buracos),
 * as cenas seguem a fala e a música é estendida na grelha de batidas até ao fim.
 *
 *   node scripts/build-timeline.cjs
 *
 * Entradas: assets/audio/<VO_DIR>/b01..b10.mp3 (um take por bloco), assets/audio/music/music.mp3.
 * Saídas: timeline.json e assets/audio/music/music-ext.wav.
 */
const fs = require('node:fs')
const path = require('node:path')
const { execFileSync } = require('node:child_process')

const ROOT = path.resolve(__dirname, '..')
const A = (p) => path.join(ROOT, 'assets/audio', p)
const FPS = 30
const START = 0.35 // a voz entra depois de um flash curto
const GAP = 0.1 // entre blocos

const probe = (file) => Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file]).toString().trim())
function silences(file, db = -40, d = 0.05) {
  const out = execFileSync('bash', ['-c', `ffmpeg -hide_banner -i "${file}" -af silencedetect=n=${db}dB:d=${d} -f null - 2>&1`]).toString()
  const starts = [...out.matchAll(/silence_start: ([\d.]+)/g)].map((m) => +m[1])
  const ends = [...out.matchAll(/silence_end: ([\d.]+)/g)].map((m) => +m[1])
  return starts.map((s, i) => [s, ends[i] ?? Infinity])
}

/**
 * Guião. `marks` são tempos dentro do take original (s), medidos nas pausas da fala
 * (silencedetect -34 dB): onde começa cada prato e onde a voz diz cada preço.
 * Se um bloco for regerado, os tempos mudam: confirmar com silencedetect e atualizar aqui.
 */
const VO_DIR = 'vo3' // voz Dinis (sotaque de Portugal), eleven_v3
const BLOCKS = [
  { id: 'b01', text: 'Bom Paladar, Restaurante e Bar! O sabor que Quelimane ADORA!', marks: { slogan: 2.1 } },
  { id: 'b02', text: 'Na Rua Robert Mugabe, aberto até à meia-noite, com nota quatro vírgula três no Google!', marks: { open: 2.38, rating: 4.08 } },
  { id: 'b03', text: 'Pizza Double Stack, duas camadas de puro sabor: MIL meticais! Pizza Seafood, com lula e camarão: setecentos!', marks: { priceA: 4.02, dishB: 5.9, priceB: 8.43 } },
  { id: 'b04', text: 'Tagliatelle Carbonara, bem cremosa: quinhentos e cinquenta! Lasanha de carne moída: setecentos!', marks: { priceA: 2.84, dishB: 4.25, priceB: 5.77 } },
  { id: 'b05', text: 'Aparelhada de mariscos, com lula, camarão e lagosta: a partir de mil e quinhentos meticais!', marks: { priceA: 3.4 } },
  { id: 'b06', text: 'Bife grelhado com molho demi-glace: mil e cem! Meia galinha cafreal: oitocentos!', marks: { priceA: 2.42, dishB: 3.6, priceB: 5.24 } },
  { id: 'b07', text: 'Para petiscar: asinhas crocantes e pão de alho com queijo, a partir de trezentos e cinquenta!', marks: { asinhas: 1.11, pao: 2.21, priceA: 3.7 } },
  { id: 'b08', text: 'E no bar: Mojito a trezentos e Piña Colada a quatrocentos e cinquenta!', marks: { priceA: 1.32, priceB: 2.95 } },
  { id: 'b09', text: 'São mais de cento e trinta pratos e bebidas no nosso cardápio!', marks: {} },
  {
    id: 'b10',
    text: 'Veja o menu completo no nosso site e reserve a sua mesa pelo WhatsApp: oitenta e sete... cento e oitenta e cinco... quarenta e quatro... dezassete! Bom Paladar: reserve JÁ!',
    marks: { reserve: 1.96, n1: 4.16, n2: 5.44, n3: 7.07, n4: 8.24, brand: 9.49, cta: 10.67 },
  },
]

// ---- Voz: corta o silêncio das pontas e põe os blocos seguidos ----------------
let t = START
const blocks = {}
const lines = []
for (const b of BLOCKS) {
  const file = A(`${VO_DIR}/${b.id}.mp3`)
  const dur = probe(file)
  const sil = silences(file)
  const lead = sil.length && sil[0][0] < 0.01 ? sil[0][1] : 0
  const tail = sil.length && sil[sil.length - 1][1] >= dur - 0.12 ? sil[sil.length - 1][0] : dur
  const from = Math.max(0, lead - 0.02)
  const to = Math.min(dur, tail + 0.04)
  const at = +t.toFixed(3)
  const abs = Object.fromEntries(Object.entries(b.marks).map(([k, v]) => [k, +(at + v - from).toFixed(3)]))
  blocks[b.id] = { start: at, end: +(at + to - from).toFixed(3), marks: abs }
  lines.push({ id: b.id, file: `${VO_DIR}/${b.id}.mp3`, from: +from.toFixed(3), to: +to.toFixed(3), at, end: blocks[b.id].end, text: b.text })
  t = at + (to - from) + GAP
}
const voiceEnd = blocks.b10.end

// ---- Música estendida na grelha de batidas ------------------------------------
const music = JSON.parse(execFileSync('python3', [path.join(__dirname, 'beats.py'), A('music/music.mp3'), '112']).toString())
const beatLen = 60 / music.bpm
const bar = 4 * beatLen
const BUTTON = 55.4 // fim ("botão") da música original
const nBars = Math.max(0, Math.ceil((voiceEnd + 1.4 - BUTTON) / bar))
const insertAt = music.offset + 70 * beatLen // início de compasso a meio da música
const ext = nBars * bar
execFileSync('ffmpeg', [
  '-v', 'error', '-y', '-i', A('music/music.mp3'),
  '-filter_complex',
  `[0:a]asplit=3[a][b][c];[a]atrim=0:${insertAt.toFixed(4)},asetpts=PTS-STARTPTS[p1];` +
    `[b]atrim=${(insertAt - ext).toFixed(4)}:${insertAt.toFixed(4)},asetpts=PTS-STARTPTS[p2];` +
    `[c]atrim=${insertAt.toFixed(4)},asetpts=PTS-STARTPTS[p3];` +
    `[p1][p2]acrossfade=d=0.03:c1=tri:c2=tri[q];[q][p3]acrossfade=d=0.03:c1=tri:c2=tri[out]`,
  '-map', '[out]', '-ar', '48000', A('music/music-ext.wav'),
])
const DURATION = +Math.max(BUTTON + ext + 1.6, voiceEnd + 2.0).toFixed(2)
const beats = []
for (let b = music.offset; b < DURATION; b += beatLen) beats.push(+b.toFixed(3))

// ---- Cenas (seguem a voz; cortes puxados para a batida mais próxima, até 0,12 s) ----
const snap = (x) => {
  const near = beats.reduce((a, b) => (Math.abs(b - x) < Math.abs(a - x) ? b : a), beats[0])
  return Math.abs(near - x) <= 0.12 ? near : x
}
const B = blocks
const cutsRaw = [
  ['intro', 0],
  ['local', B.b02.start - 0.05],
  ['pizza1', B.b03.start - 0.05],
  ['pizza2', B.b03.marks.dishB - 0.1],
  ['massa1', B.b04.start - 0.05],
  ['massa2', B.b04.marks.dishB - 0.1],
  ['mariscos', B.b05.start - 0.05],
  ['carne1', B.b06.start - 0.05],
  ['carne2', B.b06.marks.dishB - 0.1],
  ['petiscos', B.b07.start - 0.05],
  ['bar', B.b08.start - 0.05],
  ['menu', B.b09.start - 0.05],
  ['website', B.b10.start - 0.05],
  ['cta', B.b10.marks.n1 - 0.12],
]
const scenes = cutsRaw.map(([id, s], i) => ({ id, start: i === 0 ? 0 : +snap(s).toFixed(3) }))
scenes.forEach((s, i) => (s.end = i + 1 < scenes.length ? scenes[i + 1].start : DURATION))

// ---- Efeitos sonoros ----------------------------------------------------------
const marks = Object.assign({}, ...Object.values(B).map((b) => b.marks))
const priceHits = []
for (const [id, b] of Object.entries(B)) for (const [k, v] of Object.entries(b.marks)) if (k.startsWith('price')) priceHits.push({ block: id, key: k, at: v })
const sfx = [
  ...scenes.slice(1).map((s) => ({ file: 'sfx/whoosh.mp3', at: +(s.start - 0.42).toFixed(3), gain: -11 })),
  ...priceHits.map((p) => ({ file: 'sfx/logo.mp3', at: +(p.at - 0.05).toFixed(3), gain: -12 })),
  { file: 'sfx/logo.mp3', at: 0.3, gain: -6 },
  { file: 'sfx/sizzle.mp3', at: scenes.find((s) => s.id === 'carne1').start + 0.1, gain: -9 },
  { file: 'sfx/ice.mp3', at: scenes.find((s) => s.id === 'bar').start + 0.1, gain: -9 },
  { file: 'sfx/click.mp3', at: B.b10.marks.reserve + 0.6, gain: -12 },
  { file: 'sfx/logo.mp3', at: B.b10.marks.cta - 0.05, gain: -6 },
]

const timeline = {
  fps: FPS,
  duration: DURATION,
  frames: Math.round(DURATION * FPS),
  music: { file: 'music/music-ext.wav', bpm: music.bpm, offset: music.offset, extendedBars: nBars, fadeOut: [+(DURATION - 0.8).toFixed(2), DURATION] },
  beats,
  blocks,
  marks,
  scenes,
  lines,
  sfx,
  site: {
    desktop: { dir: 'site/desktop', frames: fs.readdirSync(path.join(ROOT, 'assets/site/desktop')).length },
    mobile: { dir: 'site/mobile', frames: fs.readdirSync(path.join(ROOT, 'assets/site/mobile')).length },
  },
}
fs.writeFileSync(path.join(ROOT, 'timeline.json'), JSON.stringify(timeline, null, 2) + '\n')
console.log(`duração ${DURATION}s · voz ${START}–${voiceEnd}s (${((voiceEnd - START) / (DURATION) * 100).toFixed(0)}% do vídeo) · música +${nBars} compassos`)
console.log(scenes.map((s) => `${s.id.padEnd(9)} ${s.start.toFixed(2)} → ${s.end.toFixed(2)}`).join('\n'))
