/* global gsap */
/**
 * Composição do anúncio do Bom Paladar (v2: conduzida pela voz).
 *
 * Uma timeline GSAP em pausa. O render chama `await comp.seek(t)` em cada frame: tudo o que aparece
 * é função de `t` (tweens, partículas com seed fixa, grão, tremor de câmara, gravações do site),
 * por isso o resultado é igual em qualquer worker e em qualquer ordem.
 *
 * ?format=9x16 (1080×1920) ou ?format=16x9 (1920×1080). Tempos de cada cena, de cada prato e de cada
 * preço vêm do timeline.json (gerado a partir das pausas da locução).
 */
;(() => {
  const TL = window.TIMELINE
  const FMT = new URLSearchParams(location.search).get('format') || '16x9'
  const V = FMT === '9x16'
  const W = V ? 1080 : 1920
  const H = V ? 1920 : 1080
  const C = { x: W / 2, y: H / 2 }
  const S = Object.fromEntries(TL.scenes.map((s) => [s.id, s]))
  const M = TL.marks
  const BL = TL.blocks
  const PHOTO = (n) => `../assets/photos/${n}.jpg`
  const BOARD = (n) => `../assets/menu/${n}.jpg`

  const stage = document.getElementById('stage')
  const scenesEl = document.getElementById('scenes')
  // Camada para elementos globais (faixa de informação, faixa dourada): os filhos diretos do #stage ocupam o ecrã todo
  const overlay = document.getElementById('overlay')
  Object.assign(stage.style, { width: `${W}px`, height: `${H}px` })

  gsap.defaults({ ease: 'power2.out' })
  const tl = gsap.timeline({ paused: true })

  // ---- Utilitários ---------------------------------------------------------
  const frag = (html) => {
    const t = document.createElement('template')
    t.innerHTML = html.trim()
    return t.content.firstElementChild
  }
  const add = (parent, html, css) => {
    const n = frag(html)
    parent.appendChild(n)
    if (css) gsap.set(n, css)
    return n
  }
  const at = (n, x, y, extra = {}) => gsap.set(n, { left: x, top: y, xPercent: -50, yPercent: -50, ...extra })

  function scene(id) {
    const s = S[id]
    const el = add(scenesEl, `<div class="scene" id="sc-${id}"></div>`)
    // display (não visibility): um filho com visibility:visible apareceria fora da sua cena
    gsap.set(el, { display: s.start === 0 ? 'block' : 'none', visibility: 'visible' })
    if (s.start > 0) tl.set(el, { display: 'block' }, s.start)
    tl.set(el, { display: 'none' }, s.end)
    return { el, s: s.start, e: s.end, d: s.end - s.start }
  }

  function mulberry(seed) {
    let a = seed >>> 0
    return () => {
      a = (a + 0x6d2b79f5) >>> 0
      let t = a
      t = Math.imul(t ^ (t >>> 15), t | 1)
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
  }

  const ICON = {
    whatsapp: '<path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3zm4.6 12.6c-.2.6-1.2 1.1-1.7 1.2-.4 0-1 .1-3-.7-2.6-1-4.2-3.6-4.3-3.8-.1-.2-1-1.4-1-2.6s.6-1.9.9-2.1c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.3.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.2z" fill="currentColor" stroke="none"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 1 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z" fill="currentColor" stroke="none"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    list: '<path d="M8 7h12M8 12h12M8 17h12"/><circle cx="4.5" cy="7" r="1" fill="currentColor"/><circle cx="4.5" cy="12" r="1" fill="currentColor"/><circle cx="4.5" cy="17" r="1" fill="currentColor"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>',
  }
  const icon = (name, cls = '', style = '') =>
    `<svg class="${cls}" style="${style}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICON[name]}</svg>`

  // Logótipo (paths de src/components/ui/Logo.tsx) com pathLength para o desenho a traço
  const LOGO = `<svg viewBox="-1 -1 42 50" style="overflow:visible;width:100%;height:100%"><g fill="currentColor" fill-opacity="0" stroke="currentColor" stroke-width="0.6">
    <ellipse pathLength="1" cx="9" cy="10" rx="6" ry="9"/><rect pathLength="1" x="7.5" y="16" width="3" height="30" rx="1.5"/>
    <rect pathLength="1" x="18.5" y="2" width="3" height="44" rx="1.5"/><rect pathLength="1" x="29" y="2" width="1.6" height="12" rx="0.8"/>
    <rect pathLength="1" x="32.5" y="2" width="1.6" height="12" rx="0.8"/><rect pathLength="1" x="36" y="2" width="1.6" height="12" rx="0.8"/>
    <path pathLength="1" d="M28 12h11v3a5.5 5.5 0 0 1-4 5.3V46h-3V20.3A5.5 5.5 0 0 1 28 15z"/></g></svg>`
  function drawLogo(wrap, t0, dur = 0.6) {
    const shapes = wrap.querySelectorAll('ellipse,rect,path')
    gsap.set(shapes, { strokeDasharray: 1, strokeDashoffset: 1 })
    tl.to(shapes, { strokeDashoffset: 0, duration: dur, stagger: 0.04, ease: 'power2.inOut' }, t0)
    tl.to(shapes, { fillOpacity: 1, duration: 0.35, stagger: 0.03 }, t0 + dur * 0.7)
  }

  const rise = (span, t, dur = 0.7) => tl.fromTo(span, { yPercent: 115 }, { yPercent: 0, duration: dur, ease: 'expo.out' }, t)
  const wipe = (n, t, dur = 0.7) =>
    tl.fromTo(n, { clipPath: 'inset(-30% 100% -30% -8%)' }, { clipPath: 'inset(-30% -8% -30% -8%)', duration: dur, ease: 'power2.inOut' }, t)
  const pop = (n, t, from = {}, dur = 0.5) =>
    tl.fromTo(n, { autoAlpha: 0, scale: 0.5, y: 24, ...from }, { autoAlpha: 1, scale: 1, x: 0, y: 0, rotation: from.toRotation ?? 0, duration: dur, ease: 'back.out(2.2)' }, t)
  /** Texto que "bate": entra grande e desfocado, assenta com tremor e flash. */
  function slam(n, t, { shake = 7, flash = 0.12, from = 2.2 } = {}) {
    tl.fromTo(n, { autoAlpha: 0, scale: from, filter: 'blur(14px)' }, { autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: 0.34, ease: 'power4.out' }, t)
    if (shake) shakes.push({ t: t + 0.12, amp: shake, dur: 0.35 })
    if (flash) flashes.push({ t: t + 0.1, peak: flash, decay: 0.35, color: '#fff3d6' })
  }
  const fmt = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  // ---- Efeitos globais (analíticos) -----------------------------------------
  const flashes = []
  const shakes = []
  const wipes = []
  const siteMaps = []
  const emitters = []
  const emit = (type, t0, t1, rect, rate, extra = {}) => emitters.push({ type, t0, t1, rect, rate, seed: emitters.length * 7919 + 13, layer: 'back', ...extra })
  const cuts = TL.scenes.slice(1).map((s) => s.start)

  // ---- Peças reutilizáveis ----------------------------------------------------
  function makeDish(parent, name, x, y, size) {
    const wrap = add(
      parent,
      `<div class="dish" style="width:${size}px;height:${size}px"><div class="shadow"></div><div class="plate"><img src="${PHOTO(name)}" alt=""><div class="sweep"></div></div></div>`,
    )
    at(wrap, x, y)
    return { wrap, sweep: wrap.querySelector('.sweep'), x, y, size }
  }
  function makeCard(parent, name, label, x, y, w, h, rot) {
    const wrap = add(
      parent,
      `<div class="card" style="width:${w}px;height:${h}px;font-size:${V ? 40 : 34}px"><img src="${PHOTO(name)}" alt=""><div class="sweep" style="position:absolute;inset:-20%;background:linear-gradient(105deg,transparent 38%,rgba(255,244,214,.35) 50%,transparent 62%);mix-blend-mode:screen"></div>${label ? `<div class="label">${label}</div>` : ''}</div>`,
    )
    at(wrap, x, y, { rotation: rot })
    return { wrap, sweep: wrap.querySelector('.sweep'), x, y, size: Math.max(w, h) }
  }
  const sweep = (d, t, dur = 0.85) => tl.fromTo(d.sweep, { xPercent: -120 }, { xPercent: 120, duration: dur, ease: 'power1.inOut' }, t)

  /** Etiqueta de preço que entra quando a voz diz o preço, com contador 0 → valor. */
  function priceTag(parent, value, x, y, size, t, { from = false, rot = -7 } = {}) {
    const tag = add(
      parent,
      `<div class="tag" style="font-size:${size}px">${from ? '<span class="from">a partir de</span>' : ''}<span class="row"><span class="num">0</span><span class="mt">MT</span></span></div>`,
    )
    at(tag, x, y, { rotation: rot })
    const num = tag.querySelector('.num')
    const o = { n: 0 }
    tl.fromTo(tag, { autoAlpha: 0, scale: 0, rotation: rot - 25 }, { autoAlpha: 1, scale: 1, rotation: rot, duration: 0.45, ease: 'back.out(2.6)' }, t - 0.08)
    tl.to(o, { n: value, duration: 0.28, ease: 'power2.out', onUpdate: () => (num.textContent = fmt(o.n)) }, t - 0.08)
    tl.to(tag, { scale: 1.08, duration: 0.12, ease: 'power1.out', yoyo: true, repeat: 1 }, t + 0.42)
    shakes.push({ t: t + 0.05, amp: 9, dur: 0.35 })
    flashes.push({ t: t + 0.02, peak: 0.16, decay: 0.3, color: '#ffd38a' })
    return tag
  }

  /** Bloco de texto do prato: categoria, nome e chips de ingredientes. */
  function dishText(parent, { kicker, name, chips = [] }, t, maxW) {
    const align = V ? 'center' : 'left'
    const box = add(
      parent,
      `<div class="abs" style="width:${maxW}px;text-align:${align}">
        <div class="mask"><span class="kicker" style="font-size:${V ? 34 : 30}px">${kicker}</span></div>
        <div class="oswald nm fit" data-max="${maxW}" style="font-size:${V ? 104 : 112}px;${V ? 'white-space:nowrap' : ''}">${name}</div>
        <div class="chips" style="margin-top:${V ? 20 : 26}px;display:flex;flex-wrap:wrap;gap:12px;justify-content:${V ? 'center' : 'flex-start'};font-size:${V ? 30 : 27}px">
          ${chips.map((c) => `<span class="chip">${c}</span>`).join('')}</div>
      </div>`,
    )
    if (V) gsap.set(box, { left: (W - maxW) / 2, top: 1265 })
    else gsap.set(box, { left: 110, top: 540, yPercent: -50 })
    rise(box.querySelector('.mask > span'), t)
    slam(box.querySelector('.nm'), t + 0.08)
    tl.fromTo(box.querySelectorAll('.chip'), { autoAlpha: 0, y: 20, scale: 0.8 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.09, ease: 'back.out(2)' }, t + 0.45)
    return box
  }

  /** Cardápio real em ecrã inteiro: destaca as linhas do prato e faz zoom (na foto do cardápio, se houver). */
  function boardIntro(parent, board, t0, { rows = [], target, zoomAt, zoomDur = 0.5 }) {
    const bw = V ? 1080 : 810
    const bh = (bw * 1448) / 1086
    const bx = (W - bw) / 2
    const by = (H - bh) / 2
    const k = bw / 1086
    const layer = add(parent, '<div class="layer"></div>')
    gsap.set(layer, { transformOrigin: `${C.x}px ${C.y}px` })
    add(layer, `<img src="${BOARD(board)}" alt="" style="position:absolute;left:${bx}px;top:${by}px;width:${bw}px;height:${bh}px;border-radius:10px;box-shadow:0 30px 80px rgba(0,0,0,.7)">`)
    rows.forEach(([x0, y0, x1, y1, ta], i) => {
      const hl = add(layer, `<div class="hl" style="left:${bx + x0 * k}px;top:${by + y0 * k}px;width:${(x1 - x0) * k}px;height:${(y1 - y0) * k}px"></div>`)
      tl.fromTo(hl, { autoAlpha: 0, scale: 1.15 }, { autoAlpha: 1, scale: 1, duration: 0.22, ease: 'power3.out' }, ta ?? t0 + 0.1 + i * 0.25)
    })
    tl.fromTo(layer, { scale: 1.12, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.35, ease: 'expo.out' }, t0)
    if (target) {
      const [x0, y0, x1, y1] = target
      const cx = bx + ((x0 + x1) / 2) * k
      const cy = by + ((y0 + y1) / 2) * k
      const kk = Math.min((W * 0.62) / ((x1 - x0) * k), (H * 0.5) / ((y1 - y0) * k))
      tl.to(layer, { x: -kk * (cx - C.x), y: -kk * (cy - C.y), scale: kk, duration: zoomDur, ease: 'power3.in' }, zoomAt)
    }
    tl.to(layer, { autoAlpha: 0, duration: 0.12 }, zoomAt + zoomDur - 0.02)
    flashes.push({ t: zoomAt + zoomDur, peak: 0.75, decay: 0.45, color: '#ffffff' })
    return layer
  }

  /** Plano de prato: fundo, palavra fantasma, foto em slow motion, texto, preço. */
  function plateShot(sc, cfg) {
    const { el, s, e, d } = sc
    const t0 = cfg.dishAt ?? s
    const P = V ? { x: 540, y: 800, size: 900 } : { x: 1300, y: 560, size: 880 }
    add(el, `<div class="layer" style="background:radial-gradient(circle at ${P.x}px ${P.y}px, ${cfg.bg} 0%, ${cfg.bg}55 32%, #0b0b0c 68%)"></div>`)
    const ghost = add(el, `<div class="abs ghost" style="font-size:${V ? 300 : 340}px">${cfg.ghost}</div>`)
    at(ghost, P.x, V ? P.y : P.y)
    tl.fromTo(ghost, { x: 140, autoAlpha: 0 }, { x: -140, autoAlpha: 1, duration: d, ease: 'none' }, s)
    const dish = cfg.card
      ? makeCard(el, cfg.img, null, P.x, P.y, V ? 820 : 760, V ? 820 : 760, -3)
      : makeDish(el, cfg.img, P.x, P.y, P.size)
    const inFrom = cfg.fromBoard ? { x: 0, scale: 0.35, rotation: 0, filter: 'blur(6px)', autoAlpha: 0.4 } : { x: V ? 560 : 800, scale: 1.5, rotation: cfg.spin || 10, filter: 'blur(18px)', autoAlpha: 0 }
    tl.fromTo(dish.wrap, inFrom, { x: 0, scale: 1, rotation: cfg.card ? -3 : 0, filter: 'blur(0px)', autoAlpha: 1, duration: 0.55, ease: 'expo.out' }, t0)
    tl.to(dish.wrap, { scale: 1.1, rotation: (cfg.card ? -3 : 0) + (cfg.spin > 15 ? 8 : 3), y: -16, duration: Math.max(0.5, e - t0 - 0.85), ease: 'sine.inOut' }, t0 + 0.55)
    tl.to(dish.wrap, { x: V ? -560 : -800, scale: 1.25, filter: 'blur(16px)', duration: 0.3, ease: 'power3.in' }, e - 0.3)
    sweep(dish, t0 + 0.7)
    const box = dishText(el, cfg, t0 + 0.05, V ? 1000 : 740)
    tl.to(box, { autoAlpha: 0, x: -50, duration: 0.25, ease: 'power2.in' }, e - 0.27)
    const tp = V ? { x: P.x + 300, y: P.y - 360, size: 96 } : { x: P.x - 330, y: P.y - 340, size: 92 }
    const tag = priceTag(el, cfg.price, tp.x, tp.y, tp.size, cfg.priceAt, { from: cfg.from })
    tl.to(tag, { autoAlpha: 0, scale: 0.6, duration: 0.22, ease: 'power2.in' }, e - 0.25)
    // efeitos por prato
    const r = { x: P.x - P.size * 0.28, y: P.y - P.size * 0.46, w: P.size * 0.56, h: P.size * 0.22 }
    if (cfg.fx?.includes('steam')) emit('steam', t0 + 0.3, e, r, 4, { layer: 'front' })
    if (cfg.fx?.includes('spark')) emit('spark', t0 + 0.2, e, { x: P.x - P.size * 0.3, y: P.y + P.size * 0.05, w: P.size * 0.6, h: P.size * 0.2 }, 30, { layer: 'front' })
    if (cfg.fx?.includes('ember')) emit('ember', s, e, { x: 0, y: H * 0.75, w: W, h: H * 0.3 }, 24)
    if (cfg.fx?.includes('bokeh')) emit('bokeh', s - 1, e, { x: 0, y: 0, w: W, h: H }, 3, { layer: 'front' })
    emit('dust', s, e, { x: 0, y: 0, w: W, h: H }, 10)
    return { dish, box, tag }
  }

  // =========================================================================
  // 1. Abertura: logótipo + "O sabor que Quelimane ADORA!"
  // =========================================================================
  ;(() => {
    const { el, s, e } = scene('intro')
    add(el, `<div class="layer" style="background:radial-gradient(circle at 50% ${V ? 42 : 45}%, #3a2a10 0%, #16120b 40%, #0b0b0c 75%)"></div>`)
    // Montagem rápida por trás das palavras
    const mont = add(el, '<div class="layer"></div>')
    const shots = ['pizza-double-stack', 'mariscada', 'carne-grelhada', 'cocktail-mojito', 'massa-carbonara']
    const t1 = M.slogan
    const step = (e - t1) / shots.length
    shots.forEach((n, i) => {
      const d = makeDish(mont, n, C.x, C.y + (V ? 120 : 0), V ? 1250 : 1100)
      gsap.set(d.wrap, { autoAlpha: 0 })
      tl.set(d.wrap, { autoAlpha: 1 }, t1 + i * step)
      tl.fromTo(d.wrap, { scale: 1.25, rotation: -6 }, { scale: 1.05, rotation: 4, duration: step + 0.05, ease: 'none' }, t1 + i * step)
      tl.set(d.wrap, { autoAlpha: 0 }, t1 + (i + 1) * step)
    })
    add(mont, '<div class="layer" style="background:rgba(11,11,12,.5)"></div>')
    tl.fromTo(mont, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.15 }, t1)

    const L = V ? { mark: [540, 720, 300], name: [540, 980, 190], tag: [540, 1110, 36] } : { mark: [960, 300, 260], name: [960, 560, 170], tag: [960, 680, 32] }
    const logo = add(el, '<div class="layer"></div>')
    gsap.set(logo, { transformOrigin: `${C.x}px ${C.y}px` })
    const mark = add(logo, `<div class="abs" style="height:${L.mark[2]}px;width:${L.mark[2] * 0.875}px;color:var(--gold-400);filter:drop-shadow(0 0 26px rgba(224,184,90,.55))">${LOGO}</div>`)
    at(mark, L.mark[0], L.mark[1])
    const name = add(logo, `<div class="abs script gold-text" style="font-size:${L.name[2]}px;padding:0 .2em">Bom Paladar</div>`)
    at(name, L.name[0], L.name[1])
    const tag = add(logo, `<div class="abs kicker" style="font-size:${L.tag[2]}px">Restaurante &amp; Bar</div>`)
    at(tag, L.tag[0], L.tag[1])
    drawLogo(mark, 0.3, 0.55)
    tl.fromTo(mark, { scale: 1.6, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.6, ease: 'expo.out' }, 0.3)
    wipe(name, 0.45, 0.65)
    tl.fromTo(tag, { autoAlpha: 0, letterSpacing: '0.05em' }, { autoAlpha: 1, letterSpacing: '0.5em', duration: 0.9, ease: 'expo.out' }, 1.0)
    tl.to(logo, { scale: 1.06, duration: t1 - 1, ease: 'none' }, 1)
    tl.to(logo, { autoAlpha: 0, scale: 1.4, filter: 'blur(10px)', duration: 0.25, ease: 'power2.in' }, t1 - 0.2)
    flashes.push({ t: 0.32, peak: 0.7, decay: 0.6, color: '#f3d48a' })
    shakes.push({ t: 0.35, amp: 10, dur: 0.4 })

    // "O SABOR QUE / QUELIMANE / ADORA!"
    const words = add(
      el,
      `<div class="abs" style="text-align:center;width:${V ? 1000 : 1700}px">
        <div class="oswald w1" style="font-size:${V ? 120 : 130}px">O sabor que</div>
        <div class="oswald w2 gold-text" style="font-size:${V ? 150 : 170}px">Quelimane</div>
        <div class="oswald w3 shine" style="font-size:${V ? 230 : 230}px;line-height:1">Adora!</div>
      </div>`,
    )
    at(words, C.x, C.y)
    slam(words.querySelector('.w1'), t1, { shake: 4, flash: 0.08 })
    slam(words.querySelector('.w2'), t1 + 0.9, { shake: 6, flash: 0.1 })
    slam(words.querySelector('.w3'), t1 + 1.6, { shake: 14, flash: 0.35, from: 3 })
    tl.fromTo(words.querySelector('.w3'), { backgroundPosition: '100% 0' }, { backgroundPosition: '0% 0', duration: 0.7, ease: 'power1.inOut' }, t1 + 1.9)
    tl.to(words, { autoAlpha: 0, scale: 1.3, filter: 'blur(10px)', duration: 0.22, ease: 'power2.in' }, e - 0.22)
    emit('ember', 0, e, { x: 0, y: H * 0.7, w: W, h: H * 0.35 }, 34)
    emit('burst', 0.32, 2.6, { x: L.mark[0], y: L.mark[1], w: 0, h: 0 }, 140)
  })()

  // =========================================================================
  // 2. Local: Rua Robert Mugabe · aberto até à meia-noite · 4,3 no Google
  // =========================================================================
  ;(() => {
    const { el, s, e } = scene('local')
    const pin = V ? { x: 540, y: 500 } : { x: 360, y: 430 }
    add(el, `<div class="layer" style="background:radial-gradient(circle at ${pin.x}px ${pin.y}px, #2a2112 0%, #121110 45%, #0b0b0c 80%)"></div>`)
    const rnd = mulberry(42)
    let roads = ''
    for (let i = 0; i < 9; i++) {
      const y0 = (H / 9) * i + rnd() * 80
      const y1 = y0 + (rnd() - 0.5) * 300
      roads += `<path pathLength="1" d="M-80 ${y0} C ${W * 0.3} ${y0 + (rnd() - 0.5) * 200}, ${W * 0.65} ${y1 + (rnd() - 0.5) * 200}, ${W + 80} ${y1}" stroke-width="${2 + rnd() * 5}"/>`
    }
    for (let i = 0; i < 8; i++) {
      const x0 = (W / 8) * i + rnd() * 90
      const x1 = x0 + (rnd() - 0.5) * 260
      roads += `<path pathLength="1" d="M${x0} -80 C ${x0 + (rnd() - 0.5) * 200} ${H * 0.35}, ${x1 + (rnd() - 0.5) * 200} ${H * 0.7}, ${x1} ${H + 80}" stroke-width="${2 + rnd() * 4}"/>`
    }
    const main = `M-80 ${pin.y + 60} C ${pin.x * 0.6} ${pin.y + 40}, ${pin.x * 1.3} ${pin.y + 90}, ${W + 80} ${pin.y + 20}`
    const map = add(
      el,
      `<svg class="layer" viewBox="0 0 ${W} ${H}" style="overflow:visible">
        <defs><pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M60 0H0V60" fill="none" stroke="rgba(224,184,90,.06)" stroke-width="1"/></pattern></defs>
        <rect x="-200" y="-200" width="${W + 400}" height="${H + 400}" fill="url(#grid)"/>
        <g class="roads" fill="none" stroke="rgba(236,208,138,.15)" stroke-linecap="round">${roads}</g>
        <path class="main" pathLength="1" d="${main}" fill="none" stroke="#e0b85a" stroke-width="7" stroke-linecap="round" style="filter:drop-shadow(0 0 10px rgba(224,184,90,.8))"/>
      </svg>`,
    )
    gsap.set(map, { transformOrigin: `${pin.x}px ${pin.y}px` })
    const roadEls = map.querySelectorAll('.roads path')
    gsap.set([...roadEls, map.querySelector('.main')], { strokeDasharray: 1, strokeDashoffset: 1 })
    tl.fromTo(map, { scale: 1.35, rotation: -4 }, { scale: 1, rotation: 0, duration: e - s, ease: 'power2.out' }, s)
    tl.to(roadEls, { strokeDashoffset: 0, duration: 0.9, stagger: 0.03, ease: 'power2.inOut' }, s)
    tl.to(map.querySelector('.main'), { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' }, s + 0.15)
    for (let i = 0; i < 4; i++) {
      const ring = add(el, `<div class="abs" style="width:120px;height:120px;border-radius:50%;border:3px solid var(--gold-400)"></div>`)
      at(ring, pin.x, pin.y + 10)
      tl.fromTo(ring, { scale: 0.2, autoAlpha: 0.9 }, { scale: 3.2, autoAlpha: 0, duration: 1.3, ease: 'power2.out' }, s + 0.5 + i * 1.2)
    }
    const pinEl = add(el, `<div class="abs" style="width:${V ? 140 : 120}px;height:${V ? 140 : 120}px;color:var(--gold-400);filter:drop-shadow(0 12px 18px rgba(0,0,0,.6))">${icon('pin')}</div>`)
    pinEl.querySelector('path').setAttribute('fill', 'currentColor')
    pinEl.querySelector('circle').setAttribute('fill', '#0b0b0c')
    gsap.set(pinEl, { left: pin.x, top: pin.y, xPercent: -50, yPercent: -100, transformOrigin: '50% 100%' })
    tl.fromTo(pinEl, { y: -300, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, ease: 'bounce.out' }, s + 0.05)

    const info = add(
      el,
      `<div class="abs" style="text-align:${V ? 'center' : 'left'};width:${V ? 1000 : 1300}px">
        <div class="oswald nm nowrap" style="font-size:${V ? 104 : 118}px">Rua Robert Mugabe</div>
        <div class="mask" style="margin-top:12px"><span class="kicker" style="font-size:${V ? 36 : 34}px">Quelimane · Moçambique</span></div>
        <div class="open" style="margin-top:${V ? 60 : 50}px;display:flex;justify-content:${V ? 'center' : 'flex-start'}"><span class="chip gold" style="font-size:${V ? 46 : 44}px">${icon('clock')} Aberto até à meia-noite</span></div>
        <div class="rate" style="margin-top:${V ? 56 : 46}px;display:flex;align-items:center;gap:.35em;justify-content:${V ? 'center' : 'flex-start'};font-size:${V ? 64 : 60}px">
          <span class="oswald gold-text" style="font-size:1.9em;line-height:1">4,3</span>
          <span class="stars">${icon('star').repeat(5)}<span class="on" style="width:0%">${icon('star').repeat(5)}</span></span>
          <span style="font:600 .55em Inter;color:var(--cream-100)">no Google</span>
        </div>
      </div>`,
    )
    if (V) gsap.set(info, { left: 40, top: 680 })
    else gsap.set(info, { left: pin.x + 130, top: pin.y - 110 })
    slam(info.querySelector('.nm'), s + 0.1)
    rise(info.querySelector('.mask > span'), s + 0.45)
    pop(info.querySelector('.open .chip'), M.open - 0.05, { x: -40 })
    const rate = info.querySelector('.rate')
    pop(rate, M.rating - 0.05, { y: 40 })
    tl.fromTo(rate.querySelector('.stars .on'), { width: '0%' }, { width: '86%', duration: 0.8, ease: 'power2.out' }, M.rating + 0.2)
    shakes.push({ t: M.rating + 0.05, amp: 7, dur: 0.3 })
    const root = add(el, '<div class="layer"></div>')
    ;[...el.children].filter((c) => c !== root).forEach((c) => root.appendChild(c))
    gsap.set(root, { transformOrigin: `${pin.x}px ${pin.y}px` })
    tl.to(root, { scale: 1.5, autoAlpha: 0, filter: 'blur(8px)', duration: 0.28, ease: 'power2.in' }, e - 0.28)
    emit('dust', s, e, { x: 0, y: 0, w: W, h: H }, 12)
  })()

  // =========================================================================
  // 3. Pratos (cada um com nome, ingredientes e preço quando a voz o diz)
  // =========================================================================
  const b3 = BL.b03
  ;(() => {
    // Do cardápio para a mesa: linha "Double Stack" no cardápio de pizzas → zoom na foto → prato HD
    const sc = scene('pizza1')
    const zoomAt = sc.s + 0.55
    boardIntro(sc.el, 'board1', sc.s, { rows: [[20, 1030, 790, 1135, sc.s + 0.12]], target: [840, 300, 1060, 580], zoomAt, zoomDur: 0.42 })
    plateShot(sc, {
      dishAt: zoomAt + 0.42, fromBoard: true, img: 'pizza-double-stack', bg: '#5c1f0c', ghost: 'Pizza', spin: 22, fx: ['steam', 'ember'],
      kicker: 'Pizzaria da casa', name: 'Pizza Double Stack', chips: ['Duas camadas', 'Queijo creme', 'Carne ou frango'], price: 1000, priceAt: b3.marks.priceA,
    })
  })()
  plateShot(scene('pizza2'), {
    img: 'pizza-seafood-cliente', bg: '#5a2a0c', ghost: 'Pizza', spin: 22, fx: ['steam'],
    kicker: 'Pizzaria da casa', name: 'Pizza Seafood', chips: ['Lula', 'Camarão', 'Ananás', 'Pimentos'], price: 700, priceAt: b3.marks.priceB,
  })
  plateShot(scene('massa1'), {
    img: 'massa-carbonara', bg: '#4e3810', ghost: 'Massas', spin: 10, fx: ['steam'],
    kicker: 'Massas &amp; lasanhas', name: 'Tagliatelle Carbonara', chips: ['Frango', 'Salsicha', 'Natas', 'Cogumelos'], price: 550, priceAt: BL.b04.marks.priceA,
  })
  plateShot(scene('massa2'), {
    img: 'lasanha-carne', bg: '#5a2410', ghost: 'Lasanha', spin: 8, fx: ['steam'],
    kicker: 'Massas &amp; lasanhas', name: 'Lasanha de Carne Moída', chips: ['Gratinada no forno'], price: 700, priceAt: BL.b04.marks.priceB,
  })
  ;(() => {
    // Combos de mariscos: linhas "Aparelhada" no cardápio → prato
    const sc = scene('mariscos')
    const zoomAt = sc.s + 1.0
    boardIntro(sc.el, 'board3', sc.s, {
      rows: [[560, 410, 1030, 455, sc.s + 0.15], [560, 460, 1030, 505, sc.s + 0.35], [560, 510, 1030, 560, sc.s + 0.55]],
      target: [560, 380, 1030, 560], zoomAt, zoomDur: 0.4,
    })
    plateShot(sc, {
      dishAt: zoomAt + 0.4, fromBoard: true, img: 'mariscada', bg: '#0d3b46', ghost: 'Mariscos', spin: 8, fx: ['bokeh'],
      kicker: 'Combos de mariscos', name: 'Aparelhada de Mariscos', chips: ['Lula', 'Camarão', 'Lagosta'], price: 1500, from: true, priceAt: BL.b05.marks.priceA,
    })
  })()
  plateShot(scene('carne1'), {
    img: 'carne-grelhada', bg: '#5a1511', ghost: 'Grelhados', spin: 8, fx: ['steam', 'spark'],
    kicker: 'Carnes', name: 'Bife Grelhado', chips: ['Molho demi-glace', 'Batata chips'], price: 1100, priceAt: BL.b06.marks.priceA,
  })
  plateShot(scene('carne2'), {
    img: 'real-meio-frango', card: true, bg: '#5a2a11', ghost: 'Aves', spin: 6, fx: ['spark'],
    kicker: 'Aves', name: '½ Galinha Cafreal', chips: ['Ou frango grelhado', 'Batata frita'], price: 800, priceAt: BL.b06.marks.priceB,
  })

  // Petiscos: linhas no cardápio de entradas → asinhas e pão de alho (fotos reais)
  ;(() => {
    const { el, s, e } = scene('petiscos')
    const m = BL.b07.marks
    add(el, `<div class="layer" style="background:radial-gradient(circle at 50% ${V ? 42 : 50}%, #4a2a10 0%, #1a120a 40%, #0b0b0c 75%)"></div>`)
    const ghost = add(el, `<div class="abs ghost" style="font-size:${V ? 300 : 340}px">Petiscos</div>`)
    at(ghost, C.x, V ? 800 : 560)
    tl.fromTo(ghost, { x: 140, autoAlpha: 0 }, { x: -140, autoAlpha: 1, duration: e - s, ease: 'none' }, s)
    const zoomAt = m.asinhas - 0.45
    boardIntro(el, 'board3', s, { rows: [[25, 150, 535, 188, s + 0.12], [25, 275, 535, 312, s + 0.4]], target: [25, 140, 535, 320], zoomAt, zoomDur: 0.4 })
    const cards = V
      ? [['real-asinhas', 'Asinhas crocantes', 300, 780, 470, 600, -4, m.asinhas], ['real-pao-alho', 'Pão de alho c/ queijo', 790, 820, 470, 600, 4, m.pao]]
      : [['real-asinhas', 'Asinhas crocantes', 1080, 540, 500, 620, -4, m.asinhas], ['real-pao-alho', 'Pão de alho c/ queijo', 1600, 560, 500, 620, 4, m.pao]]
    cards.forEach(([img, label, x, y, w, h, r, t]) => {
      const c = makeCard(el, img, label, x, y, w, h, r)
      tl.fromTo(c.wrap, { y: 500, rotation: r * 5, autoAlpha: 0, scale: 0.8 }, { y: 0, rotation: r, autoAlpha: 1, scale: 1, duration: 0.55, ease: 'expo.out' }, t - 0.1)
      tl.to(c.wrap, { scale: 1.06, duration: e - t - 0.5, ease: 'sine.inOut' }, t + 0.45)
      sweep(c, t + 0.6)
      tl.to(c.wrap, { x: V ? -560 : -800, filter: 'blur(14px)', duration: 0.3, ease: 'power3.in' }, e - 0.3)
    })
    const box = dishText(el, { kicker: 'Entradas &amp; petiscos', name: 'Para petiscar!', chips: ['Asinhas 400 MT', 'Pão de alho 350 MT'] }, m.asinhas - 0.15, V ? 1000 : 740)
    tl.to(box, { autoAlpha: 0, x: -50, duration: 0.25, ease: 'power2.in' }, e - 0.27)
    const tp = V ? { x: 540, y: 410 } : { x: 1340, y: 170 }
    const tag = priceTag(el, 350, tp.x, tp.y, V ? 96 : 88, m.priceA, { from: true })
    tl.to(tag, { autoAlpha: 0, scale: 0.6, duration: 0.22 }, e - 0.25)
    emit('dust', s, e, { x: 0, y: 0, w: W, h: H }, 10)
  })()

  // Bar: linhas Mojito e Piña Colada no cardápio de cocktails → os dois copos
  ;(() => {
    const { el, s, e } = scene('bar')
    const m = BL.b08.marks
    add(el, `<div class="layer" style="background:radial-gradient(circle at 50% ${V ? 42 : 50}%, #0b3d39 0%, #0a1f24 40%, #0b0b0c 78%)"></div>`)
    const ghost = add(el, `<div class="abs ghost" style="font-size:${V ? 280 : 340}px">Cocktails</div>`)
    at(ghost, C.x, V ? 800 : 560)
    tl.fromTo(ghost, { x: 140, autoAlpha: 0 }, { x: -140, autoAlpha: 1, duration: e - s, ease: 'none' }, s)
    boardIntro(el, 'board4', s, { rows: [[570, 776, 1050, 896, s + 0.08], [570, 912, 1050, 1028, s + 0.25]], target: [570, 770, 1050, 1030], zoomAt: m.priceA - 0.45, zoomDur: 0.38 })
    const glasses = V
      ? [['cocktail-mojito', 300, 800, 600, m.priceA, 'Mojito'], ['cocktail-pina-colada', 790, 780, 600, m.priceB, 'Piña Colada']]
      : [['cocktail-mojito', 1150, 600, 620, m.priceA, 'Mojito'], ['cocktail-pina-colada', 1620, 570, 620, m.priceB, 'Piña Colada']]
    const prices = [300, 450]
    glasses.forEach(([img, x, y, size, t, label], i) => {
      const d = makeDish(el, img, x, y, size)
      tl.fromTo(d.wrap, { y: 600, scale: 0.6, autoAlpha: 0, filter: 'blur(10px)' }, { y: 0, scale: 1, autoAlpha: 1, filter: 'blur(0px)', duration: 0.5, ease: 'expo.out' }, t - 0.12)
      tl.to(d.wrap, { scale: 1.08, y: -12, duration: e - t - 0.45, ease: 'sine.inOut' }, t + 0.38)
      tl.to(d.wrap, { x: V ? -560 : -800, filter: 'blur(14px)', duration: 0.3, ease: 'power3.in' }, e - 0.3)
      sweep(d, t + 0.5)
      const nm = add(el, `<div class="abs oswald nowrap" style="font-size:${V ? 54 : 50}px">${label}</div>`)
      at(nm, x, y + size * 0.47)
      slam(nm, t, { shake: 0, flash: 0 })
      tl.to(nm, { autoAlpha: 0, duration: 0.2 }, e - 0.25)
      const tag = priceTag(el, prices[i], x + size * 0.28, y - size * 0.36, V ? 84 : 78, t + 0.55)
      tl.to(tag, { autoAlpha: 0, scale: 0.6, duration: 0.22 }, e - 0.25)
      emit('bubbles', t + 0.2, e, { x: x - size * 0.12, y: y - size * 0.05, w: size * 0.24, h: size * 0.25 }, 16, { layer: 'front' })
    })
    const head = add(
      el,
      `<div class="abs" style="text-align:${V ? 'center' : 'left'};width:${V ? 1000 : 700}px">
        <div class="mask"><span class="kicker" style="font-size:${V ? 34 : 30}px">Bar &amp; cocktails</span></div>
        <div class="script gold-text hd" style="font-size:${V ? 120 : 130}px;padding:0 .25em;display:inline-block">E no bar…</div>
      </div>`,
    )
    if (V) gsap.set(head, { left: 40, top: 1280 })
    else gsap.set(head, { left: 110, top: 540, yPercent: -50 })
    rise(head.querySelector('.mask > span'), s + 0.1)
    wipe(head.querySelector('.hd'), s + 0.15, 0.6)
    tl.to(head, { autoAlpha: 0, duration: 0.2 }, e - 0.25)
    emit('bokeh', s - 1, e, { x: 0, y: 0, w: W, h: H }, 3, { layer: 'front' })
  })()

  // =========================================================================
  // 4. Cardápio: 4 cardápios reais + 135 + o menu no telemóvel
  // =========================================================================
  ;(() => {
    const { el, s, e } = scene('menu')
    add(el, `<div class="layer" style="background:radial-gradient(circle at 50% 45%, #2c2414 0%, #121110 45%, #0b0b0c 78%)"></div>`)
    const B = V ? { x: 540, y: 980, w: 330, gap: 190 } : { x: 600, y: 560, w: 400, gap: 200 }
    const persp = add(el, '<div class="layer" style="perspective:1800px"></div>')
    const group = add(persp, '<div class="layer" style="transform-style:preserve-3d"></div>')
    gsap.set(group, { transformOrigin: `${B.x}px ${B.y}px` })
    ;[1, 2, 3, 4].forEach((i) => {
      const b = add(group, `<div class="board" style="width:${B.w}px;height:${B.w * 1.3333}px"><img src="${BOARD('board' + i)}" alt=""></div>`)
      at(b, B.x, B.y)
      const k = i - 2.5
      tl.fromTo(b, { y: H * 0.9, rotationX: 55, rotation: k * 18, autoAlpha: 0 }, { x: k * B.gap, y: Math.abs(k) * 30, rotationY: -k * 14, rotation: k * 5, z: -Math.abs(k) * 80, rotationX: 0, autoAlpha: 1, duration: 0.7, ease: 'expo.out' }, s + (i - 1) * 0.07)
    })
    tl.fromTo(group, { rotationY: -6 }, { rotationY: 6, duration: 1.6, ease: 'sine.inOut' }, s + 0.6)
    // O menu no site (telemóvel) substitui os cardápios
    const PH = V ? { x: 540, y: 1075, h: 880 } : { x: 600, y: 560, h: 900 }
    const pw = (PH.h - 32) * (390 / 844) + 32
    const phone = add(el, `<div class="phone" style="width:${pw}px;height:${PH.h}px"><img alt=""><div class="island"></div><div class="glare"></div></div>`)
    at(phone, PH.x, PH.y)
    const swap = s + 1.45
    tl.to(group, { x: V ? 0 : 0, scale: 0.7, autoAlpha: 0, filter: 'blur(8px)', duration: 0.35, ease: 'power2.in' }, swap - 0.1)
    tl.fromTo(phone, { y: H, rotation: 8, autoAlpha: 0 }, { y: 0, rotation: 0, autoAlpha: 1, duration: 0.55, ease: 'expo.out' }, swap)
    siteMaps.push({ img: phone.querySelector('img'), take: 'mobile', t0: swap, t1: e, from: 0.25, rate: 1.1 })

    const CT = V ? { x: 540, y: 330 } : { x: 1440, y: 430 }
    const counter = add(el, `<div class="abs oswald shine" style="font-size:${V ? 230 : 300}px;line-height:1">0</div>`)
    at(counter, CT.x, CT.y)
    const label = add(el, `<div class="abs oswald nowrap" style="font-size:${V ? 50 : 54}px;font-weight:600;letter-spacing:.06em">Pratos &amp; bebidas</div>`)
    at(label, CT.x, CT.y + (V ? 150 : 195))
    const sub = add(el, `<div class="abs nowrap" style="font:600 ${V ? 30 : 32}px Inter;color:var(--gold-300)">${icon('list', '', 'width:1.1em;height:1.1em;vertical-align:-.2em')} 16 secções · fotos e preços</div>`)
    at(sub, CT.x, CT.y + (V ? 210 : 265))
    const o = { n: 0 }
    pop(counter, s + 0.15, { y: 0 })
    tl.to(o, { n: 135, duration: 1.5, ease: 'power2.out', onUpdate: () => (counter.textContent = String(Math.round(o.n))) }, s + 0.2)
    tl.fromTo(counter, { backgroundPosition: '100% 0' }, { backgroundPosition: '0% 0', duration: 1.0, ease: 'power1.inOut' }, s + 1.7)
    pop(label, s + 0.5)
    pop(sub, s + 0.9)
    shakes.push({ t: s + 1.7, amp: 7, dur: 0.3 })
    tl.to([counter, label, sub, phone], { autoAlpha: 0, y: -40, duration: 0.25, ease: 'power2.in' }, e - 0.27)
    emit('dust', s, e, { x: 0, y: 0, w: W, h: H }, 14)
  })()

  // =========================================================================
  // 5. Website: browser grande com a gravação real (hero → favoritos → reserva)
  // =========================================================================
  ;(() => {
    const { el, s, e } = scene('website')
    add(el, `<div class="layer" style="background:radial-gradient(ellipse at 50% 45%, #241d11 0%, #121110 50%, #0b0b0c 85%)"></div>`)
    const BW = V ? { x: 540, y: 830, w: 1010 } : { x: 760, y: 560, w: 1240 }
    const vh = (BW.w * 900) / 1440
    const cam = add(el, '<div class="layer"></div>')
    gsap.set(cam, { transformOrigin: `${C.x}px ${C.y}px` })
    const br = add(
      cam,
      `<div class="browser" style="width:${BW.w}px"><div class="bar"><b></b><b></b><b></b><span>🔒 Bom Paladar · Restaurante &amp; Bar</span></div><div class="view" style="height:${vh}px"><img alt=""></div></div>`,
    )
    at(br, BW.x, BW.y)
    tl.fromTo(br, { y: 300, scale: 0.85, autoAlpha: 0, rotationX: 18 }, { y: 0, scale: 1, autoAlpha: 1, rotationX: 0, duration: 0.55, ease: 'expo.out' }, s)
    const take = TL.site.desktop
    siteMaps.push({ img: br.querySelector('img'), take: 'desktop', t0: s + 0.05, t1: e, from: 0, rate: (take.frames / 30 - 0.1) / (e - s - 0.15) })
    // Zoom para o formulário de reserva quando a voz diz "reserve a sua mesa"
    const m = BL.b10.marks
    const fx = BW.x + BW.w * 0.24
    const fy = BW.y + 22 + vh * 0.02
    const k = V ? 1.35 : 1.4
    const q = V ? { x: C.x, y: 880 } : { x: 760, y: 560 }
    tl.to(cam, { x: q.x - C.x - k * (fx - C.x), y: q.y - C.y - k * (fy - C.y), scale: k, duration: 0.6, ease: 'power3.inOut' }, m.reserve + 0.15)

    const head = add(
      el,
      `<div class="abs" style="text-align:${V ? 'center' : 'left'};width:${V ? 1000 : 520}px">
        <div class="mask"><span class="kicker" style="font-size:${V ? 34 : 30}px">O nosso website</span></div>
        <div class="oswald nm" style="font-size:${V ? 92 : 84}px">Menu completo online</div>
      </div>`,
    )
    if (V) gsap.set(head, { left: 40, top: 255 })
    else gsap.set(head, { left: 1390, top: 200 })
    rise(head.querySelector('.mask > span'), s + 0.05)
    slam(head.querySelector('.nm'), s + 0.12, { shake: 4, flash: 0.06 })
    const chips = add(
      el,
      `<div class="abs" style="display:flex;flex-direction:column;gap:18px;align-items:${V ? 'center' : 'flex-start'};width:${V ? 1000 : 520}px;font-size:${V ? 40 : 36}px">
        <span class="chip">${icon('list')} 135 pratos com preços</span>
        <span class="chip wa">${icon('whatsapp', 'ic')} Reserva pelo WhatsApp</span>
      </div>`,
    )
    if (V) gsap.set(chips, { left: 40, top: 1300 })
    else gsap.set(chips, { left: 1390, top: 560 })
    const cs = chips.querySelectorAll('.chip')
    if (V) tl.to(head, { autoAlpha: 0, y: -40, duration: 0.3 }, m.reserve + 0.1)
    pop(cs[0], s + 0.7, { x: -30 })
    pop(cs[1], m.reserve + 0.9, { x: -30 })
    shakes.push({ t: m.reserve + 0.95, amp: 6, dur: 0.3 })
    tl.to([cam, head, chips], { autoAlpha: 0, scale: 0.9, filter: 'blur(8px)', duration: 0.22, ease: 'power2.in' }, e - 0.22)
    emit('bokeh', s - 1, e, { x: 0, y: 0, w: W, h: H }, 2)
  })()

  // =========================================================================
  // 6. Final: WhatsApp com o número (dito pela voz), logótipo e RESERVE JÁ
  // =========================================================================
  ;(() => {
    const { el, s, e } = scene('cta')
    const m = BL.b10.marks
    add(el, `<div class="layer" style="background:radial-gradient(ellipse at 50% 100%, rgba(214,47,42,.35), transparent 55%), radial-gradient(circle at 50% 35%, #2e2412 0%, #121110 45%, #0b0b0c 80%)"></div>`)
    const L = V
      ? { label: [540, 330, 34], wa: [540, 470, 150], num: [540, 680, 150], mark: [540, 930, 150], name: [540, 1090, 140], cta: [540, 1290, 180], addr: [540, 1440, 34] }
      : { label: [960, 90, 30], wa: [560, 230, 130], num: [1040, 230, 150], mark: [960, 430, 130], name: [960, 570, 130], cta: [960, 760, 180], addr: [960, 930, 34] }
    const label = add(el, `<div class="abs kicker" style="font-size:${L.label[2]}px">Reservas pelo WhatsApp</div>`)
    at(label, L.label[0], L.label[1])
    const wa = add(el, `<div class="abs" style="width:${L.wa[2]}px;height:${L.wa[2]}px;border-radius:50%;background:var(--wa);color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 0 60px rgba(37,211,102,.55)">${icon('whatsapp', '', 'width:62%;height:62%')}</div>`)
    at(wa, L.wa[0], L.wa[1])
    const num = add(
      el,
      `<div class="abs oswald nowrap" style="font-size:${L.num[2]}px;display:flex;gap:.28em;letter-spacing:.02em">
        <span class="g">87</span><span class="g">185</span><span class="g">44</span><span class="g">17</span></div>`,
    )
    at(num, L.num[0], L.num[1])
    const groups = num.querySelectorAll('.g')
    pop(label, s + 0.05)
    pop(wa, s + 0.05, { rotation: -90, scale: 0 })
    ;[m.n1, m.n2, m.n3, m.n4].forEach((t, i) => {
      slam(groups[i], t - 0.04, { shake: 6, flash: 0.08, from: 1.8 })
      tl.fromTo(groups[i], { color: '#ecd08a' }, { color: '#fbf8f1', duration: 0.6 }, t + 0.25)
    })
    tl.to(wa, { scale: 1.12, duration: 0.25, yoyo: true, repeat: 7, ease: 'sine.inOut' }, s + 0.6)

    const mark = add(el, `<div class="abs" style="height:${L.mark[2]}px;width:${L.mark[2] * 0.875}px;color:var(--gold-400);filter:drop-shadow(0 0 20px rgba(224,184,90,.45))">${LOGO}</div>`)
    at(mark, L.mark[0], L.mark[1])
    const name = add(el, `<div class="abs script gold-text" style="font-size:${L.name[2]}px;padding:0 .2em">Bom Paladar</div>`)
    at(name, L.name[0], L.name[1])
    const cta = add(el, `<div class="abs oswald shine nowrap" style="font-size:${L.cta[2]}px">Reserve já!</div>`)
    at(cta, L.cta[0], L.cta[1])
    const addr = add(
      el,
      `<div class="abs nowrap" style="display:flex;align-items:center;gap:.4em;font:500 ${L.addr[2]}px Inter;color:var(--cream-100)"><span style="color:var(--gold-400);width:1.2em;height:1.2em;display:flex">${icon('pin')}</span>Rua Robert Mugabe · Quelimane · Aberto até à meia-noite</div>`,
    )
    at(addr, L.addr[0], L.addr[1])
    drawLogo(mark, m.brand - 0.1, 0.5)
    tl.fromTo(mark, { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'expo.out' }, m.brand - 0.1)
    wipe(name, m.brand, 0.6)
    slam(cta, m.cta - 0.04, { shake: 14, flash: 0.4, from: 2.6 })
    tl.fromTo(cta, { backgroundPosition: '100% 0' }, { backgroundPosition: '0% 0', duration: 1.0, ease: 'power1.inOut' }, m.cta + 0.4)
    pop(addr, m.cta + 0.5, { y: 30 })
    TL.beats.filter((b, i) => b > m.cta + 1 && b < e - 0.4 && i % 2 === 0).forEach((b) => {
      tl.to(cta, { scale: 1.05, duration: 0.07, ease: 'power1.out' }, b)
      tl.to(cta, { scale: 1, duration: 0.4, ease: 'power2.out' }, b + 0.07)
    })
    tl.fromTo(cta, { backgroundPosition: '100% 0' }, { immediateRender: false, backgroundPosition: '0% 0', duration: 1.0, ease: 'power1.inOut' }, m.cta + 2.6)
    flashes.push({ t: s, peak: 0.35, decay: 0.5, color: '#f3d48a' })
    emit('ember', s, e, { x: 0, y: H * 0.8, w: W, h: H * 0.25 }, 30)
    emit('dust', s, e, { x: 0, y: 0, w: W, h: H }, 14)
    emit('burst', m.cta, m.cta + 2.5, { x: L.cta[0], y: L.cta[1], w: 0, h: 0 }, 120)
  })()

  // ---- Faixa de informação fixa (nos pratos) ------------------------------------
  ;(() => {
    const t0 = S.pizza1.start + 1.2
    const t1 = S.menu.start
    const bar = add(
      overlay,
      `<div class="infobar" style="font-size:${V ? 27 : 24}px">${icon('pin', '', 'color:var(--gold-400)')} Rua Robert Mugabe · Quelimane <i></i> <span class="wa" style="display:flex">${icon('whatsapp')}</span> 87 185 4417</div>`,
    )
    if (V) at(bar, C.x, 262)
    else gsap.set(bar, { left: 60, top: 1000, yPercent: -50 })
    gsap.set(bar, { autoAlpha: 0 })
    tl.fromTo(bar, { autoAlpha: 0, y: V ? -30 : 30 }, { autoAlpha: 1, y: 0, duration: 0.4 }, t0)
    tl.to(bar, { autoAlpha: 0, duration: 0.25 }, t1 - 0.25)
  })()

  // Faixas douradas a varrer entre dois pratos do mesmo bloco
  ;['pizza2', 'massa2', 'carne2', 'website'].forEach((id) => wipes.push({ t: S[id].start, dur: 0.38 }))

  tl.set({}, {}, TL.duration)

  // =========================================================================
  // Partículas (deterministas)
  // =========================================================================
  const fxBack = document.getElementById('fxBack')
  const fxFront = document.getElementById('fxFront')
  for (const c of [fxBack, fxFront]) {
    c.width = W
    c.height = H
  }
  const ctxB = fxBack.getContext('2d')
  const ctxF = fxFront.getContext('2d')
  const sprites = {}
  function sprite(color, hard = 0) {
    const key = color + hard
    if (sprites[key]) return sprites[key]
    const c = document.createElement('canvas')
    c.width = c.height = 128
    const g = c.getContext('2d')
    const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64)
    const a = Number(color.match(/([\d.]+)\)$/)[1])
    const withA = (k) => color.replace(/[\d.]+\)$/, `${(a * k).toFixed(4)})`)
    gr.addColorStop(0, color)
    gr.addColorStop(hard ? 0.7 : 0.25, hard ? color : withA(0.35))
    gr.addColorStop(1, withA(0))
    g.fillStyle = gr
    g.fillRect(0, 0, 128, 128)
    return (sprites[key] = c)
  }
  const EMBER = ['rgba(255,160,60,1)', 'rgba(255,200,90,1)', 'rgba(255,110,40,1)', 'rgba(255,225,150,1)']
  const TYPES = {
    ember: { life: [2.2, 4], size: [3, 9], vy: [-170, -70], vx: [-25, 25], sway: [10, 40], colors: EMBER, comp: 'lighter' },
    spark: { life: [0.5, 1.1], size: [2, 5], vy: [-480, -250], vx: [-120, 120], grav: 380, colors: EMBER, comp: 'lighter' },
    dust: { life: [2.5, 4.5], size: [2, 5], vy: [-30, -6], vx: [-15, 15], sway: [5, 15], colors: ['rgba(243,226,179,1)', 'rgba(224,184,90,1)'], comp: 'lighter', twinkle: true },
    bokeh: { life: [4, 7], size: [50, 170], vy: [-25, -8], vx: [-14, 14], colors: ['rgba(224,184,90,0.10)', 'rgba(251,248,241,0.07)', 'rgba(239,74,63,0.06)'], comp: 'lighter', hard: 1 },
    steam: { life: [2, 3.2], size: [60, 150], grow: 1.8, vy: [-90, -45], vx: [-12, 12], sway: [15, 35], colors: ['rgba(255,250,240,0.09)'], comp: 'screen' },
    bubbles: { life: [0.9, 1.8], size: [4, 10], vy: [-150, -60], vx: [-6, 6], sway: [2, 6], colors: ['rgba(255,255,255,0.55)'], ring: true },
    burst: { life: [1.2, 2.2], size: [2, 6], colors: ['rgba(243,226,179,1)', 'rgba(224,184,90,1)', 'rgba(255,255,255,1)'], comp: 'lighter' },
  }
  const lerp = (a, b, k) => a + (b - a) * k

  function drawFx(t) {
    ctxB.clearRect(0, 0, W, H)
    ctxF.clearRect(0, 0, W, H)
    for (const em of emitters) {
      const T = TYPES[em.type]
      const ctx = em.layer === 'front' ? ctxF : ctxB
      ctx.globalCompositeOperation = T.comp || 'source-over'
      if (em.type === 'burst') {
        const age = t - em.t0
        if (age < 0 || age > 2.3) continue
        for (let i = 0; i < em.rate; i++) {
          const r = mulberry(em.seed + i * 977)
          const life = lerp(T.life[0], T.life[1], r())
          if (age > life) continue
          const ang = r() * Math.PI * 2
          const v0 = lerp(220, V ? 900 : 760, r())
          const dist = (v0 / 2.6) * (1 - Math.exp(-2.6 * age))
          const x = em.rect.x + Math.cos(ang) * dist
          const y = em.rect.y + Math.sin(ang) * dist + 40 * age * age
          const size = lerp(T.size[0], T.size[1], r())
          ctx.globalAlpha = Math.min(1, age / 0.05) * (1 - age / life)
          const sp = sprite(T.colors[Math.floor(r() * T.colors.length)])
          ctx.drawImage(sp, x - size * 2, y - size * 2, size * 4, size * 4)
        }
        continue
      }
      if (t < em.t0 - 8 || t > em.t1 + 8) continue
      const n1 = Math.floor((Math.min(t, em.t1) - em.t0) * em.rate)
      const n0 = Math.max(0, Math.floor((t - T.life[1] - em.t0) * em.rate))
      for (let i = n0; i <= n1; i++) {
        const r = mulberry(em.seed * 131 + i * 7919)
        const birth = em.t0 + (i + r()) / em.rate
        const life = lerp(T.life[0], T.life[1], r())
        const age = t - birth
        if (age < 0 || age > life) continue
        const k = age / life
        const x0 = em.rect.x + r() * em.rect.w
        const y0 = em.rect.y + r() * em.rect.h
        const vx = lerp(T.vx[0], T.vx[1], r())
        const vy = lerp(T.vy[0], T.vy[1], r())
        const sway = T.sway ? lerp(T.sway[0], T.sway[1], r()) : 0
        const ph = r() * 6.28
        const fr = 0.6 + r() * 1.2
        let size = lerp(T.size[0], T.size[1], r())
        const color = T.colors[Math.floor(r() * T.colors.length)]
        const x = x0 + vx * age + Math.sin(ph + age * fr * 3) * sway
        const y = y0 + vy * age + (T.grav ? 0.5 * T.grav * age * age : 0)
        if (T.grow) size *= lerp(1, T.grow, k)
        let a = Math.min(1, k / 0.15) * Math.min(1, (1 - k) / 0.35)
        if (T.twinkle) a *= 0.45 + 0.55 * Math.abs(Math.sin(ph + age * 4))
        if (em.type === 'ember') a *= 0.75 + 0.25 * Math.sin(ph + age * 13)
        if (t > em.t1) a *= Math.max(0, 1 - (t - em.t1) / 0.25)
        if (a <= 0.003) continue
        ctx.globalAlpha = a
        if (T.ring) {
          ctx.strokeStyle = color
          ctx.lineWidth = 1.5
          ctx.beginPath()
          ctx.arc(x, y, size, 0, 6.283)
          ctx.stroke()
          continue
        }
        const sp = sprite(color, T.hard)
        if (em.type === 'steam') {
          ctx.drawImage(sp, x - size * 0.6, y - size * 1.3, size * 1.2, size * 2.6)
          continue
        }
        const g = T.hard ? 1 : 2
        ctx.drawImage(sp, x - size * g, y - size * g, size * g * 2, size * g * 2)
      }
    }
    ctxB.globalAlpha = ctxF.globalAlpha = 1
  }

  // ---- Grão, desfoque nos cortes, flashes, tremor, faixas douradas ---------------
  const grainEl = document.getElementById('grain')
  const grainTiles = [0, 1, 2, 3].map((k) => {
    const c = document.createElement('canvas')
    c.width = c.height = 256
    const g = c.getContext('2d')
    const img = g.createImageData(256, 256)
    const r = mulberry(1000 + k)
    for (let i = 0; i < img.data.length; i += 4) {
      const v = Math.floor(r() * 255)
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v
      img.data[i + 3] = 255
    }
    g.putImageData(img, 0, 0)
    return `url(${c.toDataURL()})`
  })
  function grain(t) {
    const f = Math.round(t * TL.fps)
    const r = mulberry(f + 77)
    grainEl.style.backgroundImage = grainTiles[f % 4]
    grainEl.style.backgroundPosition = `${Math.floor(r() * 256)}px ${Math.floor(r() * 256)}px`
  }
  const blurF = document.getElementById('hblurf')
  const flashEl = document.getElementById('flash')
  const wipeEl = add(document.getElementById('wipes'), '<div class="wipe"></div>')
  function post(t) {
    // Desfoque horizontal (whip pan) nos cortes
    let v = 0
    for (const c of cuts) {
      const dt = t - c
      if (dt > -0.18 && dt < 0) v = Math.max(v, 40 * Math.pow((dt + 0.18) / 0.18, 2))
      else if (dt >= 0 && dt < 0.22) v = Math.max(v, 40 * Math.pow(1 - dt / 0.22, 2))
    }
    // Tremor de câmara
    let sx = 0
    let sy = 0
    for (const sh of shakes) {
      const dt = t - sh.t
      if (dt < 0 || dt > sh.dur) continue
      const a = sh.amp * Math.exp(-dt / (sh.dur / 3))
      sx += a * Math.sin(dt * 71 + sh.t * 13)
      sy += a * Math.cos(dt * 63 + sh.t * 7)
    }
    scenesEl.style.transform = sx || sy ? `translate(${sx.toFixed(2)}px, ${sy.toFixed(2)}px) scale(1.012)` : 'none'
    if (v > 0.4) {
      blurF.setAttribute('stdDeviation', `${v.toFixed(2)} 0`)
      scenesEl.style.filter = 'url(#hblur)'
    } else scenesEl.style.filter = 'none'
    // Flash
    let best = 0
    let color = '#fff'
    for (const f of [...flashes, ...cuts.map((c) => ({ t: c, peak: 0.1, decay: 0.25, color: '#ffffff' }))]) {
      const dt = t - f.t
      const a = dt < -0.05 ? 0 : dt < 0 ? f.peak * (1 + dt / 0.05) : f.peak * Math.exp(-dt / (f.decay / 3))
      if (a > best) {
        best = a
        color = f.color
      }
    }
    flashEl.style.opacity = best.toFixed(3)
    flashEl.style.background = color
    // Faixa dourada
    let shown = false
    for (const w of wipes) {
      const p = (t - (w.t - w.dur / 2)) / w.dur
      if (p < 0 || p > 1) continue
      wipeEl.style.opacity = '1'
      wipeEl.style.left = `${(-0.8 + p * 1.9) * W}px`
      shown = true
    }
    if (!shown) wipeEl.style.opacity = '0'
  }

  // ---- Gravações do site -----------------------------------------------------------
  const pad = (n) => String(n).padStart(5, '0')
  async function siteFrame(t) {
    const jobs = []
    for (const m of siteMaps) {
      if (t < m.t0 - 0.6 || t > m.t1) continue
      const take = TL.site[m.take]
      const f = Math.max(1, Math.min(take.frames, Math.floor((m.from + Math.max(0, t - m.t0) * m.rate) * TL.fps) + 1))
      const src = `../assets/${take.dir}/f${pad(f)}.jpg`
      if (m.img.dataset.src !== src) {
        m.img.dataset.src = src
        m.img.src = src
        jobs.push(m.img.decode().catch(() => 0))
      }
    }
    await Promise.all(jobs)
  }

  // ---- Arranque ---------------------------------------------------------------------
  async function ready() {
    await Promise.all(['500 40px Oswald', '600 40px Oswald', '700 40px Oswald', '400 40px Inter', '600 40px Inter', '40px "Great Vibes"'].map((f) => document.fonts.load(f)))
    await document.fonts.ready
    document.querySelectorAll('.fit').forEach((n) => {
      // A cena pode estar com display:none: mostra-a só durante a medição
      const sc = n.closest('.scene')
      const scDisplay = sc.style.display
      sc.style.display = 'block'
      const max = Number(n.dataset.max)
      let fs = parseFloat(n.style.fontSize)
      const prev = n.style.display
      n.style.display = 'inline-block'
      while (n.scrollWidth > max && fs > 40) n.style.fontSize = `${(fs -= 2)}px`
      n.style.display = prev || 'block'
      sc.style.display = scDisplay
    })
    await Promise.all([...document.images].map((i) => (i.complete ? Promise.resolve() : new Promise((r) => (i.onload = i.onerror = r))).then(() => i.src && i.decode().catch(() => 0))))
    for (const m of siteMaps) await siteFrame(m.t0)
  }

  async function seek(t) {
    tl.seek(t, false)
    drawFx(t)
    grain(t)
    post(t)
    await siteFrame(t)
  }

  window.comp = { fps: TL.fps, duration: TL.duration, format: FMT, width: W, height: H, ready: ready(), seek }
})()
