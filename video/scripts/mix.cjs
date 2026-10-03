/**
 * Mistura de áudio a partir do timeline.json (ffmpeg).
 *
 *   node scripts/mix.cjs
 *
 * - Voz: cada fala (ou parte dela) no seu tempo; highpass 80 Hz, compressor, +2 dB de presença.
 * - Música: baixa sozinha quando há voz (sidechaincompress com a voz como chave); fade final.
 * - Efeitos nos cortes e nos momentos marcados.
 * - Loudness em duas passagens: -14 LUFS integrados, true peak -1 dBTP. Saída: out/mix.wav (48 kHz, estéreo).
 */
const fs = require('node:fs')
const path = require('node:path')
const { execFileSync } = require('node:child_process')

const ROOT = path.resolve(__dirname, '..')
const A = (p) => path.join(ROOT, 'assets/audio', p)
const T = JSON.parse(fs.readFileSync(path.join(ROOT, 'timeline.json'), 'utf8'))
const out = path.join(ROOT, 'out')
fs.mkdirSync(out, { recursive: true })

const inputs = [A(T.music.file)]
const f = []
const ms = (s) => Math.max(0, Math.round(s * 1000))

// Voz
const voLabels = []
for (const l of T.lines) {
  if (!l.file) {
    console.warn(`aviso: ${l.id} em falta — fica só a música nesse ponto`)
    continue
  }
  const i = inputs.push(A(l.file)) - 1
  const lab = `v${voLabels.length}`
  f.push(`[${i}:a]aformat=sample_rates=48000:channel_layouts=mono,atrim=${l.from}:${l.to},asetpts=PTS-STARTPTS,afade=t=in:d=0.01,afade=t=out:st=${(l.to - l.from - 0.03).toFixed(3)}:d=0.03,adelay=${ms(l.at)}[${lab}]`)
  voLabels.push(`[${lab}]`)
}
f.push(`${voLabels.join('')}amix=inputs=${voLabels.length}:normalize=0:duration=longest,apad=whole_dur=${T.duration},highpass=f=80,acompressor=threshold=-20dB:ratio=3:attack=5:release=120:makeup=2,equalizer=f=3200:width_type=o:width=1.4:g=2,pan=stereo|c0=c0|c1=c0,asplit=2[vo][key]`)

// Música com ducking
const [fo0] = T.music.fadeOut
f.push(`[0:a]aformat=sample_rates=48000:channel_layouts=stereo,atrim=0:${T.duration},volume=-5dB,afade=t=in:d=0.4,afade=t=out:st=${fo0}:d=${(T.duration - fo0).toFixed(2)}[mus]`)
f.push(`[mus][key]sidechaincompress=threshold=0.03:ratio=8:attack=15:release=380:makeup=1[duck]`)

// Efeitos
const sfxLabels = []
for (const s of T.sfx) {
  const i = inputs.push(A(s.file)) - 1
  const lab = `s${sfxLabels.length}`
  f.push(`[${i}:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=${s.gain}dB,adelay=${ms(s.at)}|${ms(s.at)}[${lab}]`)
  sfxLabels.push(`[${lab}]`)
}
f.push(`${sfxLabels.join('')}amix=inputs=${sfxLabels.length}:normalize=0:duration=longest[sfx]`)
f.push('[vo]asplit=2[vo1][voS]', '[duck]asplit=2[duck1][duckS]')
f.push(`[vo1][duck1][sfx]amix=inputs=3:normalize=0:duration=first,atrim=0:${T.duration}[pre]`)

const args = (tail) => ['-v', 'error', '-y', ...inputs.flatMap((p) => ['-i', p]), '-filter_complex', f.join(';') + tail]
const premix = path.join(out, 'premix.wav')
// Também guarda as stems de voz e de música (já com ducking) para verificação
execFileSync('ffmpeg', [
  ...args(''),
  ...['-map', '[pre]', '-ar', '48000', '-c:a', 'pcm_s24le', premix],
  ...['-map', '[voS]', '-ar', '48000', '-c:a', 'pcm_s16le', path.join(out, 'stem-voice.wav')],
  ...['-map', '[duckS]', '-ar', '48000', '-c:a', 'pcm_s16le', path.join(out, 'stem-music.wav')],
])

// Loudness em duas passagens (o ffmpeg escreve as medições em JSON no stderr)
const measure = execFileSync('bash', ['-c', `ffmpeg -hide_banner -i "${premix}" -af loudnorm=I=-14:TP=-1:LRA=9:print_format=json -f null - 2>&1`]).toString()
const json = JSON.parse(measure.slice(measure.lastIndexOf('{'), measure.lastIndexOf('}') + 1))
const ln = `loudnorm=I=-14:TP=-1:LRA=9:measured_I=${json.input_i}:measured_TP=${json.input_tp}:measured_LRA=${json.input_lra}:measured_thresh=${json.input_thresh}:offset=${json.target_offset}:linear=true`
execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', premix, '-af', `${ln},aresample=48000`, '-c:a', 'pcm_s24le', path.join(out, 'mix.wav')])
console.log(`mix.wav pronto (entrada ${json.input_i} LUFS → -14 LUFS)`)
