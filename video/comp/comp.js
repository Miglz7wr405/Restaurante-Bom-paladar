/* global gsap */
/**
 * Composição do anúncio do Bom Paladar (motion design).
 *
 * Uma timeline GSAP em pausa. O render chama `await comp.seek(t)` para cada frame: tudo o que
 * aparece no ecrã é função de `t` (tweens, partículas com seed fixa, grão, gravações do site),
 * por isso o resultado é igual em qualquer worker e em qualquer ordem.
 *
 * ?format=9x16 (1080×1920) ou ?format=16x9 (1920×1080, por omissão). Mesma timeline, dois layouts.
 */
;(() => {
  const TL = window.TIMELINE
  const FMT = new URLSearchParams(location.search).get('format') || '16x9'
  const V = FMT === '9x16'
  const W = V ? 1080 : 1920
  const H = V ? 1920 : 1080
  const C = { x: W / 2, y: H / 2 }
  const S = Object.fromEntries(TL.scenes.map((s) => [s.id, s]))
  const PHOTO = (n) => `../assets/photos/${n}.jpg`

  const stage = document.getElementById('stage')
  const scenesEl = document.getElementById('scenes')
  Object.assign(stage.style, { width: `${W}px`, height: `${H}px` })
  document.body.classList.add(V ? 'v' : 'h')

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
  /** Posiciona pelo centro (x, y). */
  const at = (n, x, y, extra = {}) => gsap.set(n, { left: x, top: y, xPercent: -50, yPercent: -50, ...extra })

  function scene(id) {
    const s = S[id]
    const el = add(scenesEl, `<div class="scene" id="sc-${id}"></div>`)
    if (s.start === 0) gsap.set(el, { visibility: 'visible' })
    else tl.set(el, { visibility: 'visible' }, s.start)
    tl.set(el, { visibility: 'hidden' }, s.end)
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
    search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>',
    grid: '<rect x="4" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5"/>',
    list: '<path d="M8 7h12M8 12h12M8 17h12"/><circle cx="4.5" cy="7" r="1" fill="currentColor"/><circle cx="4.5" cy="12" r="1" fill="currentColor"/><circle cx="4.5" cy="17" r="1" fill="currentColor"/>',
  }
  const icon = (name, cls = '') =>
    `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICON[name]}</svg>`

  // Logótipo (paths de src/components/ui/Logo.tsx) com pathLength para o desenho a traço
  const LOGO = `<svg viewBox="-1 -1 42 50" style="overflow:visible"><g fill="currentColor" fill-opacity="0" stroke="currentColor" stroke-width="0.6">
    <ellipse pathLength="1" cx="9" cy="10" rx="6" ry="9"/><rect pathLength="1" x="7.5" y="16" width="3" height="30" rx="1.5"/>
    <rect pathLength="1" x="18.5" y="2" width="3" height="44" rx="1.5"/><rect pathLength="1" x="29" y="2" width="1.6" height="12" rx="0.8"/>
    <rect pathLength="1" x="32.5" y="2" width="1.6" height="12" rx="0.8"/><rect pathLength="1" x="36" y="2" width="1.6" height="12" rx="0.8"/>
    <path pathLength="1" d="M28 12h11v3a5.5 5.5 0 0 1-4 5.3V46h-3V20.3A5.5 5.5 0 0 1 28 15z"/></g></svg>`

  function drawLogo(svgWrap, t0, dur = 0.9) {
    const shapes = svgWrap.querySelectorAll('ellipse,rect,path')
    gsap.set(shapes, { strokeDasharray: 1, strokeDashoffset: 1 })
    tl.to(shapes, { strokeDashoffset: 0, duration: dur, stagger: 0.07, ease: 'power2.inOut' }, t0)
    tl.to(shapes, { fillOpacity: 1, duration: 0.5, stagger: 0.05 }, t0 + dur * 0.75)
  }

  /** Revela uma linha de texto de baixo para cima dentro de uma máscara. */
  const rise = (span, t, dur = 0.85) => tl.fromTo(span, { yPercent: 115 }, { yPercent: 0, duration: dur, ease: 'expo.out' }, t)
  /** "Escreve" um texto em script da esquerda para a direita. */
  const wipe = (n, t, dur = 0.9) =>
    tl.fromTo(n, { clipPath: 'inset(-30% 100% -30% -8%)' }, { clipPath: 'inset(-30% -8% -30% -8%)', duration: dur, ease: 'power2.inOut' }, t)
  const pop = (n, t, from = {}) =>
    tl.fromTo(n, { autoAlpha: 0, scale: 0.6, y: 20, ...from }, { autoAlpha: 1, scale: 1, y: 0, rotation: 0, duration: 0.6, ease: 'back.out(2)' }, t)

  function makeDish(parent, name, x, y, size) {
    const wrap = add(
      parent,
      `<div class="dish" style="width:${size}px;height:${size}px"><div class="shadow"></div><div class="plate"><img src="${PHOTO(name)}" alt=""><div class="sweep"></div></div></div>`,
    )
    at(wrap, x, y)
    return { wrap, sweep: wrap.querySelector('.sweep'), x, y, size }
  }
  const sweep = (d, t, dur = 0.9) => tl.fromTo(d.sweep, { xPercent: -120 }, { xPercent: 120, duration: dur, ease: 'power1.inOut' }, t)

  // ---- Partículas (deterministas) -----------------------------------------
  const emitters = []
  const emit = (type, t0, t1, rect, rate, extra = {}) => emitters.push({ type, t0, t1, rect, rate, seed: emitters.length * 7919 + 13, layer: 'back', ...extra })

  // ---- Efeitos globais: flash e desfoque horizontal nos cortes --------------
  const flashes = []
  const cuts = TL.scenes.slice(1).map((s) => s.start)

  // =========================================================================
  // 1. Gancho
  // =========================================================================
  ;(() => {
    const { el, e } = scene('hook')
    const P = V ? { x: 540, y: 1130, size: 1000 } : { x: 1380, y: 560, size: 880 }
    add(el, `<div class="layer" style="background:radial-gradient(circle at ${P.x}px ${P.y}px, #5a210c 0%, #24100a 30%, #0b0b0c 62%)"></div>`)
    const dish = makeDish(el, 'pizza-double-stack', P.x, P.y, P.size)
    const box = add(
      el,
      `<div class="abs" style="width:${V ? 1000 : 860}px;text-align:${V ? 'center' : 'left'}">
        <div class="mask"><span class="kicker" style="font-size:${V ? 42 : 36}px">Em Quelimane,</span></div>
        <div class="mask"><span class="script" style="font-size:${V ? 130 : 118}px">há um sabor que</span></div>
        <div class="mask"><span class="oswald gold-text nowrap" style="font-size:${V ? 132 : 108}px">fica na memória</span></div>
      </div>`,
    )
    if (V) at(box, 540, 400)
    else gsap.set(box, { left: 140, top: 540, yPercent: -50 })
    const [l1, l2, l3] = box.querySelectorAll('.mask > span')
    rise(l1, 0.5)
    rise(l2, 1.2)
    rise(l3, 1.9)
    tl.to(box, { autoAlpha: 0, y: -50, filter: 'blur(12px)', duration: 0.35, ease: 'power2.in' }, e - 0.4)

    tl.fromTo(dish.wrap, { scale: 1.35, autoAlpha: 0, filter: 'blur(22px)' }, { scale: 1, autoAlpha: 1, filter: 'blur(0px)', duration: 2.4 }, 0)
    tl.fromTo(dish.wrap, { rotation: -16 }, { rotation: 5, duration: e, ease: 'none' }, 0)
    tl.to(dish.wrap, { scale: 1.06, duration: 0.8, ease: 'none' }, 2.4)
    tl.to(dish.wrap, { scale: 2.6, filter: 'blur(18px)', duration: 0.42, ease: 'power3.in' }, e - 0.42)
    sweep(dish, 1.7, 1.0)
    emit('ember', 0, e, { x: 0, y: H * 0.7, w: W, h: H * 0.35 }, 38)
    emit('steam', 0.6, e, { x: P.x - P.size * 0.25, y: P.y - P.size * 0.42, w: P.size * 0.5, h: P.size * 0.2 }, 4, { layer: 'front' })
  })()

  // =========================================================================
  // 2. Logótipo
  // =========================================================================
  ;(() => {
    const { el, s, e, d } = scene('logo')
    const L = V
      ? { mark: [540, 690, 380], name: [540, 1010, 200], tag: [540, 1140, 36], words: [540, 1300, 54] }
      : { mark: [960, 300, 300], name: [960, 560, 170], tag: [960, 670, 30], words: [960, 820, 48] }
    const glow = add(el, `<div class="layer" style="background:radial-gradient(circle at ${L.mark[0]}px ${L.mark[1] + (V ? 220 : 180)}px, rgba(201,154,59,.35), rgba(201,154,59,.08) 35%, transparent 60%)"></div>`)
    const g = add(el, '<div class="layer"></div>')
    const mark = add(g, `<div class="abs" style="height:${L.mark[2]}px;width:${L.mark[2] * 0.875}px;color:var(--gold-400);filter:drop-shadow(0 0 24px rgba(224,184,90,.45))">${LOGO}</div>`)
    at(mark, L.mark[0], L.mark[1])
    const name = add(g, `<div class="abs script gold-text" style="font-size:${L.name[2]}px;padding:0 .2em">Bom Paladar</div>`)
    at(name, L.name[0], L.name[1])
    const tag = add(g, `<div class="abs kicker" style="font-size:${L.tag[2]}px">Restaurante &amp; Bar</div>`)
    at(tag, L.tag[0], L.tag[1])
    const lw = V ? 200 : 260
    const ll = add(g, `<div class="line" style="width:${lw}px"></div>`)
    const lr = add(g, `<div class="line r" style="width:${lw}px"></div>`)
    gsap.set(ll, { left: L.tag[0] - (V ? 260 : 240) - lw, top: L.tag[1], transformOrigin: '100% 50%' })
    gsap.set(lr, { left: L.tag[0] + (V ? 260 : 240), top: L.tag[1], transformOrigin: '0% 50%' })
    const words = add(
      g,
      `<div class="abs oswald nowrap" style="font-size:${L.words[2]}px;font-weight:600;display:flex;gap:.55em;align-items:center">
        <span>Sabor</span><i style="color:var(--gold-400);font-style:normal">·</i><span>Qualidade</span><i style="color:var(--gold-400);font-style:normal">·</i><span class="gold-text">Boa companhia</span></div>`,
    )
    at(words, L.words[0], L.words[1])
    const ws = words.querySelectorAll('span,i')

    tl.fromTo(glow, { opacity: 0 }, { opacity: 1, duration: 0.3 }, s)
    tl.to(glow, { opacity: 0.55, duration: 2.5, ease: 'sine.inOut' }, s + 0.4)
    tl.fromTo(g, { scale: 1 }, { scale: 1.05, duration: d, ease: 'none' }, s)
    drawLogo(mark, s + 0.05, 0.9)
    tl.fromTo(mark, { scale: 0.85 }, { scale: 1, duration: 1.4, ease: 'expo.out' }, s)
    wipe(name, s + 0.35, 1.0)
    tl.fromTo(tag, { autoAlpha: 0, letterSpacing: '0.05em' }, { autoAlpha: 1, letterSpacing: '0.5em', duration: 1.3, ease: 'expo.out' }, s + 1.0)
    tl.fromTo([ll, lr], { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'expo.out' }, s + 1.15)
    // "Sabor, qualidade e boa companhia." começa ~1,75 s depois do início da fala 2
    tl.fromTo(ws, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.17, ease: 'back.out(1.8)' }, s + 2.0)
    tl.to(g, { scale: 1.18, autoAlpha: 0, filter: 'blur(10px)', duration: 0.34, ease: 'power2.in' }, e - 0.34)
    flashes.push({ t: s, peak: 0.55, decay: 0.6, color: '#f3d48a' })
    emit('burst', s, s + 2.5, { x: L.mark[0], y: L.mark[1], w: 0, h: 0 }, 140)
    emit('dust', s, e, { x: 0, y: 0, w: W, h: H }, 22)
  })()

  // =========================================================================
  // 3. O restaurante: mapa, morada, avaliação, horário, fotos reais
  // =========================================================================
  ;(() => {
    const { el, s, e } = scene('restaurant')
    const pin = V ? { x: 540, y: 520 } : { x: 370, y: 470 }
    add(el, `<div class="layer" style="background:radial-gradient(circle at ${pin.x}px ${pin.y}px, #2a2112 0%, #121110 45%, #0b0b0c 80%)"></div>`)
    // Mapa estilizado (seed fixa)
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
    const river = V
      ? `M-100 ${H * 0.9} C ${W * 0.3} ${H * 0.82}, ${W * 0.6} ${H * 0.98}, ${W + 100} ${H * 0.86}`
      : `M-100 ${H * 0.95} C ${W * 0.35} ${H * 0.78}, ${W * 0.62} ${H * 1.02}, ${W + 100} ${H * 0.82}`
    const main = `M-80 ${pin.y + 60} C ${pin.x * 0.6} ${pin.y + 40}, ${pin.x * 1.3} ${pin.y + 90}, ${W + 80} ${pin.y + 20}`
    const map = add(
      el,
      `<svg class="layer" viewBox="0 0 ${W} ${H}" style="overflow:visible">
        <defs><pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M60 0H0V60" fill="none" stroke="rgba(224,184,90,.06)" stroke-width="1"/></pattern></defs>
        <rect x="-200" y="-200" width="${W + 400}" height="${H + 400}" fill="url(#grid)"/>
        <path d="${river}" stroke="#123742" stroke-width="${V ? 150 : 130}" fill="none" stroke-linecap="round" opacity=".65"/>
        <g class="roads" fill="none" stroke="rgba(236,208,138,.16)" stroke-linecap="round">${roads}</g>
        <path class="main" pathLength="1" d="${main}" fill="none" stroke="#e0b85a" stroke-width="7" stroke-linecap="round" style="filter:drop-shadow(0 0 10px rgba(224,184,90,.8))"/>
      </svg>`,
    )
    gsap.set(map, { transformOrigin: `${pin.x}px ${pin.y}px` })
    const roadEls = map.querySelectorAll('.roads path')
    gsap.set([...roadEls, map.querySelector('.main')], { strokeDasharray: 1, strokeDashoffset: 1 })
    tl.fromTo(map, { scale: 1.3, rotation: -3 }, { scale: 1, rotation: 0, duration: e - s, ease: 'power1.out' }, s)
    tl.to(roadEls, { strokeDashoffset: 0, duration: 1.3, stagger: 0.04, ease: 'power2.inOut' }, s)
    tl.to(map.querySelector('.main'), { strokeDashoffset: 0, duration: 1.0, ease: 'power2.inOut' }, s + 0.3)

    // Pin com anéis
    for (let i = 0; i < 3; i++) {
      const ring = add(el, `<div class="abs" style="width:120px;height:120px;border-radius:50%;border:3px solid var(--gold-400)"></div>`)
      at(ring, pin.x, pin.y + 10)
      tl.fromTo(ring, { scale: 0.2, autoAlpha: 0.9 }, { scale: 3.2, autoAlpha: 0, duration: 1.5, ease: 'power2.out' }, s + 0.9 + i * 0.9)
    }
    const pinEl = add(el, `<div class="abs" style="width:${V ? 130 : 110}px;height:${V ? 130 : 110}px;color:var(--gold-400);filter:drop-shadow(0 12px 18px rgba(0,0,0,.6))">${icon('pin')}</div>`)
    pinEl.querySelector('path').setAttribute('fill', 'currentColor')
    pinEl.querySelector('circle').setAttribute('fill', '#0b0b0c')
    gsap.set(pinEl, { left: pin.x, top: pin.y, xPercent: -50, yPercent: -100, transformOrigin: '50% 100%' })
    tl.fromTo(pinEl, { y: -320, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, ease: 'bounce.out' }, s + 0.4)

    // Morada e coordenadas
    const align = V ? 'center' : 'left'
    const info = add(
      el,
      `<div class="abs" style="text-align:${align};width:${V ? 1000 : 1000}px">
        <div class="mask"><span class="oswald nowrap" style="font-size:${V ? 92 : 84}px">Rua Robert Mugabe</span></div>
        <div class="mask" style="margin-top:14px"><span class="kicker" style="font-size:${V ? 34 : 30}px">Quelimane · Moçambique</span></div>
        <div style="margin-top:14px;font:600 ${V ? 30 : 28}px Inter;color:var(--gold-300);letter-spacing:.08em" class="coords">&nbsp;</div>
        <div class="chips" style="margin-top:${V ? 34 : 30}px;display:flex;gap:18px;justify-content:${V ? 'center' : 'flex-start'};font-size:${V ? 34 : 30}px">
          <span class="chip gold">${icon('star')} 4,3 no Google</span>
          <span class="chip">${icon('clock')} Aberto até à meia-noite</span>
        </div>
      </div>`,
    )
    if (V) gsap.set(info, { left: 40, top: 690 })
    else gsap.set(info, { left: pin.x + 120, top: pin.y - 120 })
    const [n1, n2] = info.querySelectorAll('.mask > span')
    rise(n1, s + 0.5)
    rise(n2, s + 0.8)
    const coords = info.querySelector('.coords')
    const COORD = '17°53′S · 36°53′E'
    const typer = { n: 0 }
    tl.to(typer, { n: COORD.length, duration: 0.8, ease: 'none', onUpdate: () => (coords.textContent = COORD.slice(0, Math.round(typer.n)) || ' ') }, s + 1.0)
    const chips = info.querySelectorAll('.chip')
    pop(chips[0], s + 1.45, { x: -30 })
    pop(chips[1], s + 1.75, { x: -30 })

    // Fotos reais (polaroids)
    const pol = V
      ? [ [300, 1290, -7, 340], [790, 1270, 6, 340] ]
      : [ [1530, 330, -6, 300], [1720, 700, 7, 300] ]
    const caps = ['Asinhas &amp; pão de alho', '½ frango grelhado']
    const imgs = ['real-asinhas-pao-alho', 'real-meio-frango']
    pol.forEach(([x, y, r, size], i) => {
      const p = add(el, `<div class="polaroid" style="width:${size + 36}px;height:${size + 82}px"><img src="${PHOTO(imgs[i])}" alt=""><div class="cap" style="font-size:${V ? 40 : 38}px">${caps[i]}</div></div>`)
      at(p, x, y)
      tl.fromTo(p, { y: V ? 700 : 600, rotation: r * 4, autoAlpha: 0 }, { y: 0, rotation: r, autoAlpha: 1, duration: 0.9, ease: 'power3.out' }, s + 2.0 + i * 0.25)
      tl.to(p, { y: -16, duration: 1.5, ease: 'sine.inOut' }, s + 2.9 + i * 0.25)
    })
    const credit = add(el, `<div class="abs" style="font:400 ${V ? 22 : 18}px Inter;color:rgba(244,238,225,.6);white-space:nowrap">Fotos: Arsénio Iade · Google Maps</div>`)
    at(credit, V ? 540 : 1640, V ? 1500 : 1000)
    tl.fromTo(credit, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, s + 2.6)

    const root = add(el, '<div class="layer"></div>')
    ;[...el.children].filter((c) => c !== root).forEach((c) => root.appendChild(c))
    gsap.set(root, { transformOrigin: `${pin.x}px ${pin.y}px` })
    tl.to(root, { scale: 1.6, autoAlpha: 0, filter: 'blur(8px)', duration: 0.34, ease: 'power2.in' }, e - 0.34)
    emit('dust', s, e, { x: 0, y: 0, w: W, h: H }, 10)
  })()

  // =========================================================================
  // 4. Pratos (5 planos "slow motion")
  // =========================================================================
  const DISHES = [
    { id: 'dish-pizza', imgs: ['pizza-double-stack'], kicker: 'Pizzaria da casa', name: 'Pizza Double Stack', prices: [['1.000']], phrase: 'Pizzas a sair do forno', ghost: 'Pizza', bg: '#5c1f0c', fx: ['steam', 'ember'], spin: 22 },
    { id: 'dish-massa', imgs: ['massa-carbonara'], kicker: 'Massas &amp; lasanhas', name: 'Tagliatelle Carbonara', prices: [['550']], phrase: 'Massas cremosas', ghost: 'Massas', bg: '#4e3810', fx: ['steam', 'dust'], spin: 10 },
    { id: 'dish-mariscos', imgs: ['mariscada'], kicker: 'Combos de mariscos', name: 'Aparelhada de Mariscos', prices: [['1.500', 'desde']], phrase: 'Mariscos do Índico', ghost: 'Mariscos', bg: '#0d3b46', fx: ['dust', 'bokeh'], spin: 8 },
    { id: 'dish-carne', imgs: ['carne-grelhada'], kicker: 'Grelhados', name: 'Bife Grelhado', prices: [['1.100']], phrase: 'Carnes grelhadas no ponto', ghost: 'Carnes', bg: '#5a1511', fx: ['steam', 'spark'], spin: 8 },
    { id: 'dish-cocktails', imgs: ['cocktail-mojito', 'cocktail-pina-colada'], kicker: 'Bar &amp; cocktails', name: 'Mojito · Piña Colada', prices: [['300'], ['450']], phrase: 'Cocktails que fazem a noite', ghost: 'Cocktails', bg: '#0b3d39', fx: ['bubbles', 'bokeh'], spin: 4 },
  ]
  DISHES.forEach((cfg) => {
    const { el, s, e, d } = scene(cfg.id)
    const two = cfg.imgs.length === 2
    const spots = two
      ? V ? [[300, 880, 620], [785, 850, 620]] : [[1190, 590, 600], [1620, 550, 600]]
      : V ? [[540, 860, 940]] : [[1260, 560, 900]]
    const cx = two ? (V ? 540 : 1400) : spots[0][0]
    const cy = two ? (V ? 860 : 570) : spots[0][1]
    add(el, `<div class="layer" style="background:radial-gradient(circle at ${cx}px ${cy}px, ${cfg.bg} 0%, ${cfg.bg}55 30%, #0b0b0c 66%)"></div>`)
    const ghost = add(el, `<div class="abs ghost" style="font-size:${V ? 330 : 360}px">${cfg.ghost}</div>`)
    at(ghost, cx, V ? cy - 40 : cy)
    tl.fromTo(ghost, { x: 160, autoAlpha: 0 }, { x: -160, autoAlpha: 1, duration: d, ease: 'none' }, s)
    tl.to(ghost, { autoAlpha: 0, duration: 0.3 }, e - 0.3)

    const dishes = spots.map(([x, y, size], i) => makeDish(el, cfg.imgs[i], x, y, size))
    const dx = V ? 520 : 760
    dishes.forEach((dh, i) => {
      const t = s + i * 0.12
      tl.fromTo(
        dh.wrap,
        { x: dx, scale: 1.5, rotation: cfg.spin, filter: 'blur(18px)', autoAlpha: 0 },
        { x: 0, scale: 1, rotation: 0, filter: 'blur(0px)', autoAlpha: 1, duration: 0.65, ease: 'expo.out' },
        t,
      )
      // "Slow motion": aproximação lenta e rotação contínua até ao corte
      tl.to(dh.wrap, { scale: 1.08, rotation: cfg.spin > 15 ? 7 : 2.5, y: -14, duration: d - 0.65 - 0.36 - i * 0.12, ease: 'sine.inOut' }, t + 0.65)
      tl.to(dh.wrap, { x: -dx, scale: 1.3, filter: 'blur(16px)', duration: 0.36, ease: 'power3.in' }, e - 0.36)
      sweep(dh, s + 1.25 + i * 0.2, 0.95)
      // Preço
      const [price, from] = cfg.prices[i]
      const bs = two ? (V ? 170 : 160) : V ? 220 : 200
      const badge = add(el, `<div class="badge" style="width:${bs}px;height:${bs}px;font-size:${bs * 0.3}px">${from ? `<span class="from">${from}</span>` : ''}${price}<small>MT</small></div>`)
      at(badge, dh.x + dh.size * (two ? 0.3 : 0.34), dh.y - dh.size * (two ? 0.33 : 0.34))
      pop(badge, s + 0.85 + i * 0.15, { rotation: -40, scale: 0 })
      tl.to(badge, { rotation: -8, duration: d - 1.6, ease: 'sine.inOut' }, s + 1.45 + i * 0.15)
      tl.to(badge, { autoAlpha: 0, scale: 0.6, duration: 0.25, ease: 'power2.in' }, e - 0.32)
    })

    // Texto
    let text
    if (V) {
      const phrase = add(el, `<div class="abs script gold-text" style="font-size:104px;padding:0 .25em">${cfg.phrase}</div>`)
      at(phrase, 540, 300)
      wipe(phrase, s + 0.3, 0.95)
      text = add(
        el,
        `<div class="abs" style="text-align:center;width:1000px">
          <div class="mask"><span class="kicker" style="font-size:36px">${cfg.kicker}</span></div>
          <div class="mask"><span class="oswald nowrap fit" data-max="1000" style="font-size:96px">${cfg.name}</span></div>
        </div>`,
      )
      gsap.set(text, { left: 40, top: 1330 })
      tl.to(phrase, { autoAlpha: 0, y: -30, duration: 0.3, ease: 'power2.in' }, e - 0.32)
    } else {
      text = add(
        el,
        `<div class="abs" style="width:${two ? 640 : 760}px">
          <div class="script gold-text phrase" style="font-size:${two ? 70 : 84}px;padding:0 .2em 0 0;display:inline-block">${cfg.phrase}</div>
          <div class="mask" style="margin-top:18px"><span class="kicker" style="font-size:30px">${cfg.kicker}</span></div>
          <div class="mask"><span class="oswald fit" data-max="${two ? 640 : 760}" style="font-size:${two ? 96 : 108}px">${cfg.name}</span></div>
          <div class="line" style="position:relative;width:240px;margin-top:26px"></div>
        </div>`,
      )
      gsap.set(text, { left: 120, top: 540, yPercent: -50 })
      wipe(text.querySelector('.phrase'), s + 0.3, 0.95)
      tl.fromTo(text.querySelector('.line'), { scaleX: 0, transformOrigin: '0 50%' }, { scaleX: 1, duration: 0.8, ease: 'expo.out' }, s + 0.8)
    }
    const spans = text.querySelectorAll('.mask > span')
    rise(spans[0], s + 0.45)
    rise(spans[1], s + 0.55, 0.9)
    tl.to(text, { autoAlpha: 0, x: -60, duration: 0.3, ease: 'power2.in' }, e - 0.32)

    // Efeitos por prato
    const main = dishes[0]
    const r = { x: cx - main.size * 0.28, y: cy - main.size * 0.46, w: main.size * 0.56, h: main.size * 0.22 }
    if (cfg.fx.includes('steam')) emit('steam', s + 0.4, e, r, 4, { layer: 'front' })
    if (cfg.fx.includes('ember')) emit('ember', s, e, { x: 0, y: H * 0.75, w: W, h: H * 0.3 }, 24)
    if (cfg.fx.includes('spark')) emit('spark', s + 0.2, e, { x: cx - main.size * 0.3, y: cy + main.size * 0.05, w: main.size * 0.6, h: main.size * 0.2 }, 30, { layer: 'front' })
    if (cfg.fx.includes('dust')) emit('dust', s, e, { x: 0, y: 0, w: W, h: H }, 14)
    if (cfg.fx.includes('bokeh')) emit('bokeh', s - 1, e, { x: 0, y: 0, w: W, h: H }, 3, { layer: 'front' })
    if (cfg.fx.includes('bubbles'))
      dishes.forEach((dh) => emit('bubbles', s + 0.5, e, { x: dh.x - dh.size * 0.15, y: dh.y - dh.size * 0.05, w: dh.size * 0.3, h: dh.size * 0.25 }, 16, { layer: 'front' }))
    flashes.push({ t: s, peak: 0.14, decay: 0.25, color: '#ffffff' })
  })

  // =========================================================================
  // 5. Menu: cardápios reais em 3D + contador 0 → 135 + 16 secções
  // =========================================================================
  ;(() => {
    const { el, s, e, d } = scene('menu')
    const B = V ? { x: 540, y: 640, w: 380, gap: 205 } : { x: 590, y: 560, w: 420, gap: 205 }
    add(el, `<div class="layer" style="background:radial-gradient(circle at ${B.x}px ${B.y}px, #2c2414 0%, #121110 45%, #0b0b0c 75%)"></div>`)
    const persp = add(el, '<div class="layer" style="perspective:1800px"></div>')
    const group = add(persp, '<div class="layer" style="transform-style:preserve-3d"></div>')
    gsap.set(group, { transformOrigin: `${B.x}px ${B.y}px` })
    const boards = [1, 2, 3, 4].map((i) => {
      const b = add(group, `<div class="board" style="width:${B.w}px;height:${B.w * 1.3333}px"><img src="../assets/menu/board${i}.jpg" alt=""></div>`)
      at(b, B.x, B.y)
      return b
    })
    boards.forEach((b, i) => {
      const k = i - 1.5
      tl.fromTo(b, { y: H * 0.9, rotationX: 55, rotation: k * 18, autoAlpha: 0 }, { y: 0, rotationX: 0, rotation: k * 2, autoAlpha: 1, duration: 0.75, ease: 'expo.out' }, s + i * 0.08)
      tl.to(b, { x: k * B.gap, y: Math.abs(k) * 34, rotationY: -k * 16, rotation: k * 5, z: -Math.abs(k) * 90, duration: 1.0, ease: 'power3.inOut' }, s + 0.95)
    })
    tl.fromTo(group, { rotationY: -8, y: 0 }, { rotationY: 8, y: -20, duration: d - 1.9, ease: 'sine.inOut' }, s + 1.9)

    const CT = V ? { x: 540, y: 1030 } : { x: 1500, y: 400 }
    const counter = add(el, `<div class="abs oswald shine" style="font-size:${V ? 270 : 300}px;line-height:1">0</div>`)
    at(counter, CT.x, CT.y)
    const label = add(el, `<div class="abs oswald nowrap" style="font-size:${V ? 54 : 50}px;font-weight:600;letter-spacing:.08em">Pratos &amp; bebidas</div>`)
    at(label, CT.x, CT.y + (V ? 175 : 190))
    const ctr = { n: 0 }
    tl.fromTo(counter, { autoAlpha: 0, scale: 0.7 }, { autoAlpha: 1, scale: 1, duration: 0.6, ease: 'back.out(1.6)' }, s + 0.4)
    tl.to(ctr, { n: 135, duration: 2.2, ease: 'power2.out', onUpdate: () => (counter.textContent = String(Math.round(ctr.n))) }, s + 0.5)
    tl.fromTo(counter, { backgroundPosition: '100% 0' }, { backgroundPosition: '0% 0', duration: 1.2, ease: 'power1.inOut' }, s + 2.8)
    tl.fromTo(label, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.6 }, s + 1.0)

    const SECTIONS = ['Entradas', 'Sopas', 'Petiscos', 'Saladas', 'Sanduíches', 'Pizzas', 'Massas', 'Arroz', 'Mariscos', 'Combos', 'Aves', 'Carnes', 'Tábuas', 'Guarnições', 'Sobremesas', 'Cocktails']
    const box = add(
      el,
      `<div class="abs" style="width:${V ? 1000 : 700}px;display:flex;flex-wrap:wrap;gap:${V ? 12 : 12}px;justify-content:center;font-size:${V ? 27 : 25}px">
        ${SECTIONS.map((x, i) => `<span class="chip${i === 0 || i === 14 ? ' gold' : ''}" style="padding:.45em 1em">${x}</span>`).join('')}</div>`,
    )
    gsap.set(box, { left: CT.x, top: V ? 1260 : 690, xPercent: -50 })
    tl.fromTo(box.children, { autoAlpha: 0, y: 30, scale: 0.8 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.07, ease: 'back.out(2)' }, s + 2.35)

    tl.to(group, { scale: 1.7, duration: 0.45, ease: 'power3.in' }, e - 0.45)
    tl.to([counter, label, box], { autoAlpha: 0, y: -40, duration: 0.3, ease: 'power2.in' }, e - 0.4)
    emit('dust', s, e, { x: 0, y: 0, w: W, h: H }, 14)
  })()

  // =========================================================================
  // 6. Website: portátil + telemóvel com a gravação real do site
  // =========================================================================
  const site = {}
  ;(() => {
    const { el, s, e } = scene('website')
    add(el, `<div class="layer" style="background:radial-gradient(ellipse at 50% 40%, #241d11 0%, #121110 50%, #0b0b0c 85%)"></div>`)
    const LP = V ? { x: 540, y: 760, w: 940 } : { x: 800, y: 600, w: 1120 }
    const PH = V ? { x: 790, y: 1300, w: 430 } : { x: 1490, y: 600, w: 380 }
    const lpH = (LP.w - 32) / 1.6 + 32
    const phH = (PH.w - 32) / (390 / 844) + 32

    const cam = add(el, '<div class="layer"></div>')
    gsap.set(cam, { transformOrigin: `${C.x}px ${C.y}px` })
    const persp = add(cam, '<div class="layer" style="perspective:2400px"></div>')
    const rig = add(persp, '<div class="layer" style="transform-style:preserve-3d"></div>')
    gsap.set(rig, { transformOrigin: `${C.x}px ${C.y}px` })
    const laptop = add(rig, `<div class="laptop" style="width:${LP.w}px;height:${lpH}px"><div class="screen"><img alt=""><div class="glare"></div></div><div class="base" style="top:${lpH}px"></div></div>`)
    at(laptop, LP.x, LP.y)
    const phone = add(rig, `<div class="phone" style="width:${PH.w}px;height:${phH}px"><img alt=""><div class="island"></div><div class="glare"></div></div>`)
    at(phone, PH.x, PH.y)
    site.desktop = laptop.querySelector('img')
    site.mobile = phone.querySelector('img')
    site.start = s
    site.end = e

    // Câmara: começa com o ecrã do portátil a encher o frame (vem do "zoom" no menu) e recua
    const k0 = (W / LP.w) * 1.02
    tl.fromTo(cam, { x: -k0 * (LP.x - C.x), y: -k0 * (LP.y - C.y), scale: k0 }, { x: 0, y: 0, scale: 1, duration: 1.5, ease: 'expo.inOut' }, s)
    tl.fromTo(laptop, { rotationY: 0, rotationX: 0 }, { rotationY: V ? 10 : 14, rotationX: 3, duration: 1.5, ease: 'expo.inOut' }, s)
    tl.fromTo(phone, { x: V ? 300 : 500, rotationY: -40, autoAlpha: 0 }, { x: 0, rotationY: V ? -10 : -12, autoAlpha: 1, duration: 1.1, ease: 'expo.out' }, s + 0.9)
    tl.fromTo(rig, { rotationY: -3, y: 10 }, { rotationY: 3, y: -12, duration: 7, ease: 'sine.inOut' }, s + 1.5)
    // Aproxima ao telemóvel (pesquisa "camarão")
    const k1 = V ? 1.32 : 1.5
    const p = { x: PH.x, y: PH.y - phH * (V ? 0.12 : 0.05) }
    const q = V ? { x: C.x, y: C.y - 60 } : { x: C.x + 160, y: C.y }
    tl.to(cam, { x: q.x - C.x - k1 * (p.x - C.x), y: q.y - C.y - k1 * (p.y - C.y), scale: k1, duration: 1.3, ease: 'power2.inOut' }, s + 8.5)
    tl.to(cam, { x: 0, y: 0, scale: 0.94, duration: 1.0, ease: 'power2.inOut' }, s + 11.3)
    tl.to(cam, { scale: 0.8, autoAlpha: 0, filter: 'blur(10px)', duration: 0.38, ease: 'power2.in' }, e - 0.38)

    // Título
    const title = add(
      el,
      `<div class="abs" style="text-align:center;width:1000px">
        <div class="mask"><span class="kicker" style="font-size:${V ? 36 : 28}px">O nosso website</span></div>
        <div class="script gold-text" style="font-size:${V ? 104 : 80}px;padding:0 .25em;display:inline-block">Visite-nos online</div>
      </div>`,
    )
    at(title, C.x, V ? 330 : 120)
    rise(title.querySelector('.mask > span'), s + 0.9)
    wipe(title.querySelector('.script'), s + 1.1, 0.9)
    tl.to(title, { autoAlpha: 0, y: -30, duration: 0.4, ease: 'power2.in' }, s + 8.3)

    // Etiquetas sincronizadas com a voz e com a gravação
    const fs = V ? 34 : 30
    const tags = [
      [`<span class="chip">${icon('list')} Menu completo · 135 pratos</span>`, V ? [330, 520] : [430, 260], 1.7, 5.4],
      [`<span class="chip wa">${icon('whatsapp', 'ic')} Reserve pelo WhatsApp</span>`, V ? [400, 1110] : [1150, 950], 4.3, 8.2],
      [`<span class="chip">${icon('grid')} Cartões ou Cardápio</span>`, V ? [330, 1250] : [1500, 160], 5.8, 8.3],
      [`<span class="chip gold">${icon('search')} Pesquisa rápida</span>`, V ? [540, 1440] : [480, 760], 9.9, 12.2],
    ]
    tags.forEach(([html, [x, y], t0, t1]) => {
      const n = add(el, `<div class="abs" style="font-size:${fs}px">${html}</div>`)
      at(n, x, y)
      pop(n, s + t0, { x: -20 })
      tl.to(n, { y: -10, duration: t1 - t0 - 0.6, ease: 'sine.inOut' }, s + t0 + 0.6)
      tl.to(n, { autoAlpha: 0, scale: 0.8, duration: 0.25, ease: 'power2.in' }, s + t1)
    })
    flashes.push({ t: s, peak: 0.4, decay: 0.5, color: '#ffffff' })
    emit('bokeh', s - 1, e, { x: 0, y: 0, w: W, h: H }, 2, { layer: 'back' })
  })()

  // =========================================================================
  // 7. Final: logótipo, RESERVE JÁ, WhatsApp e morada
  // =========================================================================
  ;(() => {
    const { el, s, e } = scene('cta')
    const L = V
      ? { mark: [540, 400, 190], name: [540, 600, 160], tag: [540, 700, 32], cta: [540, 880, 200], sub: [540, 1035, 112], wa: [540, 1205, 54], addr: [540, 1320, 36], slogan: [540, 1430, 54] }
      : { mark: [960, 150, 150], name: [960, 305, 128], tag: [960, 390, 26], cta: [960, 545, 184], sub: [960, 680, 96], wa: [960, 815, 50], addr: [960, 920, 32], slogan: [960, 995, 44] }
    add(el, `<div class="layer" style="background:radial-gradient(ellipse at 50% 100%, rgba(214,47,42,.35), transparent 55%), radial-gradient(circle at 50% ${V ? 40 : 45}%, #2e2412 0%, #121110 45%, #0b0b0c 80%)"></div>`)
    const mark = add(el, `<div class="abs" style="height:${L.mark[2]}px;width:${L.mark[2] * 0.875}px;color:var(--gold-400);filter:drop-shadow(0 0 20px rgba(224,184,90,.4))">${LOGO}</div>`)
    at(mark, L.mark[0], L.mark[1])
    const name = add(el, `<div class="abs script gold-text" style="font-size:${L.name[2]}px;padding:0 .2em">Bom Paladar</div>`)
    at(name, L.name[0], L.name[1])
    const tag = add(el, `<div class="abs kicker" style="font-size:${L.tag[2]}px;letter-spacing:.5em">Restaurante &amp; Bar</div>`)
    at(tag, L.tag[0], L.tag[1])
    const cta = add(el, `<div class="abs oswald shine nowrap" style="font-size:${L.cta[2]}px">Reserve já</div>`)
    at(cta, L.cta[0], L.cta[1])
    const sub = add(el, `<div class="abs script" style="font-size:${L.sub[2]}px;color:var(--cream-50);padding:0 .25em">a sua mesa!</div>`)
    at(sub, L.sub[0], L.sub[1], { rotation: -4 })
    const wa = add(
      el,
      `<div class="abs nowrap" style="display:flex;align-items:center;gap:.45em;font:600 ${L.wa[2]}px Oswald;letter-spacing:.04em;padding:.28em .9em .28em .32em;border-radius:999px;background:rgba(37,211,102,.12);border:3px solid var(--wa);box-shadow:0 0 40px rgba(37,211,102,.25)">
        <span style="width:1.35em;height:1.35em;border-radius:50%;background:var(--wa);color:#fff;display:flex;align-items:center;justify-content:center">${icon('whatsapp')}</span>+258 87 185 4417</div>`,
    )
    wa.querySelector('svg').setAttribute('style', 'width:.95em;height:.95em')
    at(wa, L.wa[0], L.wa[1])
    const addr = add(
      el,
      `<div class="abs nowrap" style="display:flex;align-items:center;gap:.4em;font:400 ${L.addr[2]}px Inter;color:var(--cream-100)"><span style="color:var(--gold-400);width:1.2em;height:1.2em;display:flex">${icon('pin')}</span>Rua Robert Mugabe · Quelimane</div>`,
    )
    at(addr, L.addr[0], L.addr[1])
    const slogan = add(el, `<div class="abs script gold-text" style="font-size:${L.slogan[2]}px;padding:0 .25em">Sabor, qualidade e boa companhia!</div>`)
    at(slogan, L.slogan[0], L.slogan[1])

    drawLogo(mark, s + 0.1, 0.8)
    tl.fromTo(mark, { scale: 0.7, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1.0, ease: 'expo.out' }, s)
    wipe(name, s + 0.5, 0.9)
    tl.fromTo(tag, { autoAlpha: 0, letterSpacing: '0.1em' }, { autoAlpha: 1, letterSpacing: '0.5em', duration: 1.1, ease: 'expo.out' }, s + 1.0)
    tl.fromTo(cta, { scale: 1.7, autoAlpha: 0, filter: 'blur(24px)' }, { scale: 1, autoAlpha: 1, filter: 'blur(0px)', duration: 0.6, ease: 'expo.out' }, s + 1.5)
    tl.fromTo(cta, { backgroundPosition: '100% 0' }, { backgroundPosition: '0% 0', duration: 1.1, ease: 'power1.inOut' }, s + 2.1)
    wipe(sub, s + 2.0, 0.8)
    tl.fromTo(wa, { autoAlpha: 0, y: 70, scale: 0.9 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.8)' }, s + 2.6)
    tl.fromTo(addr, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.6 }, s + 2.95)
    wipe(slogan, s + 3.3, 1.0)
    // Pulsar à batida (a cada 2 batidas) e brilho a passar de novo
    TL.beats.filter((b, i) => b > s + 3.6 && b < e - 0.4 && i % 2 === 0).forEach((b) => {
      tl.to(cta, { scale: 1.045, duration: 0.07, ease: 'power1.out' }, b)
      tl.to(cta, { scale: 1, duration: 0.42, ease: 'power2.out' }, b + 0.07)
    })
    tl.fromTo(cta, { backgroundPosition: '100% 0' }, { immediateRender: false, backgroundPosition: '0% 0', duration: 1.1, ease: 'power1.inOut' }, s + 5.6)
    tl.fromTo(wa, { boxShadow: '0 0 40px rgba(37,211,102,.25)' }, { boxShadow: '0 0 70px rgba(37,211,102,.55)', duration: 0.8, repeat: 5, yoyo: true, ease: 'sine.inOut' }, s + 3.4)
    flashes.push({ t: s, peak: 0.45, decay: 0.6, color: '#f3d48a' })
    emit('ember', s, e, { x: 0, y: H * 0.8, w: W, h: H * 0.25 }, 30)
    emit('dust', s, e, { x: 0, y: 0, w: W, h: H }, 14)
    emit('burst', s + 1.5, s + 4, { x: L.cta[0], y: L.cta[1], w: 0, h: 0 }, 110)
  })()

  tl.set({}, {}, TL.duration)

  // =========================================================================
  // Partículas
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
          const a = Math.min(1, age / 0.05) * (1 - age / life)
          ctx.globalAlpha = a
          const sp = sprite(T.colors[Math.floor(r() * T.colors.length)])
          ctx.drawImage(sp, x - size * 2, y - size * 2, size * 4, size * 4)
        }
        continue
      }
      if (t < em.t0 - 8 || t > em.t1 + 8) continue
      const maxLife = T.life[1]
      const n1 = Math.floor((Math.min(t, em.t1) - em.t0) * em.rate)
      const n0 = Math.max(0, Math.floor((t - maxLife - em.t0) * em.rate))
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
        // Desvanece fora do intervalo da cena (os que já nasceram não "saltam")
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

  // ---- Grão de filme --------------------------------------------------------
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

  // ---- Desfoque horizontal nos cortes e flashes (analíticos) ----------------
  const blurF = document.getElementById('hblurf')
  function hblur(t) {
    let v = 0
    for (const c of cuts) {
      const dt = t - c
      if (dt > -0.2 && dt < 0) v = Math.max(v, 42 * Math.pow((dt + 0.2) / 0.2, 2))
      else if (dt >= 0 && dt < 0.26) v = Math.max(v, 42 * Math.pow(1 - dt / 0.26, 2))
    }
    if (v > 0.4) {
      blurF.setAttribute('stdDeviation', `${v.toFixed(2)} 0`)
      scenesEl.style.filter = 'url(#hblur)'
    } else scenesEl.style.filter = 'none'
  }
  const flashEl = document.getElementById('flash')
  function flash(t) {
    let best = 0
    let color = '#fff'
    for (const f of flashes) {
      const dt = t - f.t
      const a = dt < -0.05 ? 0 : dt < 0 ? f.peak * (1 + dt / 0.05) : f.peak * Math.exp(-dt / (f.decay / 3))
      if (a > best) {
        best = a
        color = f.color
      }
    }
    flashEl.style.opacity = best.toFixed(3)
    flashEl.style.background = color
  }

  // ---- Gravações do site -----------------------------------------------------
  const pad = (n) => String(n).padStart(5, '0')
  async function siteFrame(t) {
    if (t < site.start - 0.5 || t > site.end) return
    const f = Math.max(1, Math.min(TL.site.frames, Math.floor((t - site.start) * TL.fps) + 1))
    const jobs = []
    for (const k of ['desktop', 'mobile']) {
      const src = `../assets/${TL.site[k]}/f${pad(f)}.jpg`
      if (site[k].dataset.src !== src) {
        site[k].dataset.src = src
        site[k].src = src
        jobs.push(site[k].decode().catch(() => 0))
      }
    }
    await Promise.all(jobs)
  }

  // ---- Arranque ---------------------------------------------------------------
  async function ready() {
    await Promise.all(
      ['500 40px Oswald', '600 40px Oswald', '700 40px Oswald', '400 40px Inter', '600 40px Inter', '40px "Great Vibes"'].map((f) => document.fonts.load(f)),
    )
    await document.fonts.ready
    // Nomes compridos cabem na largura máxima
    document.querySelectorAll('.fit').forEach((n) => {
      const max = Number(n.dataset.max)
      let fs = parseFloat(n.style.fontSize)
      n.style.display = 'inline-block'
      while (n.scrollWidth > max && fs > 40) n.style.fontSize = `${(fs -= 2)}px`
      n.style.display = 'block'
    })
    await Promise.all([...document.images].map((i) => (i.complete ? Promise.resolve() : new Promise((r) => (i.onload = i.onerror = r))).then(() => i.decode && i.src && i.decode().catch(() => 0))))
    await siteFrame(site.start)
  }

  async function seek(t) {
    tl.seek(t, false)
    drawFx(t)
    grain(t)
    hblur(t)
    flash(t)
    await siteFrame(t)
  }

  window.comp = { fps: TL.fps, duration: TL.duration, format: FMT, width: W, height: H, ready: ready(), seek }
})()
