import { useId, type ReactElement } from 'react'
import type { ArtKind, CocktailTint } from '@/content/types'

interface DishArtProps {
  kind: ArtKind
  tint?: CocktailTint
  className?: string
  title?: string
}

const TINTS: Record<CocktailTint, [string, string]> = {
  lime: ['#d9ef8b', '#9cc43c'],
  blue: ['#6fd0ff', '#1673c9'],
  sunrise: ['#ffd25e', '#e2382c'],
  berry: ['#ff8fa7', '#c3173f'],
  mint: ['#e9fbe4', '#7bc76b'],
  cream: ['#fffaf0', '#f2dca6'],
  wine: ['#d84b5a', '#6f0f22'],
  amber: ['#f6c46a', '#8a4a12'],
}

function rand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

function polar(r: number, angle: number, cx = 100, cy = 100) {
  return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
}

function Pizza({ id, seafood }: { id: string; seafood?: boolean }) {
  const toppings = Array.from({ length: 9 }, (_, i) => {
    const a = (i / 9) * Math.PI * 2 + rand(i) * 0.5
    const r = 22 + rand(i + 20) * 42
    return polar(r, a)
  })
  return (
    <>
      <defs>
        <radialGradient id={`${id}-crust`} cx="45%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#f2c27a" />
          <stop offset="85%" stopColor="#d08a3c" />
          <stop offset="100%" stopColor="#9c5a22" />
        </radialGradient>
        <radialGradient id={`${id}-sauce`} cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#e2483a" />
          <stop offset="100%" stopColor="#a8231b" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="90" fill={`url(#${id}-crust)`} />
      <circle cx="100" cy="100" r="76" fill={`url(#${id}-sauce)`} />
      <path
        d="M52 78c10-22 40-34 64-26 22 6 38 22 36 46 0 22-18 42-44 46-26 4-50-10-58-30-6-14-4-24 2-36z"
        fill="#f7d77a"
        opacity="0.95"
      />
      <path d="M70 70c12-6 26-4 34 2M120 128c10-2 18-10 20-18" stroke="#fbe9ae" strokeWidth="5" strokeLinecap="round" fill="none" />
      {toppings.map((p, i) =>
        seafood ? (
          <path
            key={i}
            d={`M${p.x - 8} ${p.y}c0-8 10-12 16-6 4 4 2 10-3 11`}
            stroke="#f08a4b"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
        ) : (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={8 + rand(i + 3) * 2} fill="#9c1f1a" />
            <circle cx={p.x - 2} cy={p.y - 2} r="2" fill="#c8463d" />
          </g>
        ),
      )}
      {[0.4, 2.1, 3.8, 5.2].map((a, i) => {
        const p = polar(48, a)
        return (
          <path
            key={`b${i}`}
            d={`M${p.x} ${p.y}c6-10 18-10 22-2-8 8-18 8-22 2z`}
            fill="#3f7d3a"
            transform={`rotate(${a * 57} ${p.x} ${p.y})`}
          />
        )
      })}
      {[1.2, 2.9, 4.6, 6].map((a, i) => {
        const p = polar(30 + i * 9, a)
        return <circle key={`o${i}`} cx={p.x} cy={p.y} r="4.5" fill="none" stroke="#1d1d1f" strokeWidth="3" />
      })}
      <g stroke="#7a3c12" strokeWidth="1.5" opacity="0.35">
        <line x1="100" y1="10" x2="100" y2="190" />
        <line x1="10" y1="100" x2="190" y2="100" />
        <line x1="36" y1="36" x2="164" y2="164" />
        <line x1="164" y1="36" x2="36" y2="164" />
      </g>
    </>
  )
}

function Pasta({ id, red }: { id: string; red?: boolean }) {
  const strands = Array.from({ length: 16 }, (_, i) => {
    const r = 12 + i * 3.4
    const start = rand(i) * Math.PI * 2
    const sweep = 2.4 + rand(i + 9) * 1.6
    const a = polar(r, start)
    const b = polar(r, start + sweep)
    return `M${a.x} ${a.y}A${r} ${r} 0 ${sweep > Math.PI ? 1 : 0} 1 ${b.x} ${b.y}`
  })
  return (
    <>
      <defs>
        <radialGradient id={`${id}-plate`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e5ddcc" />
        </radialGradient>
      </defs>
      <ellipse cx="100" cy="186" rx="80" ry="9" fill="#000" opacity="0.25" />
      <circle cx="100" cy="100" r="92" fill={`url(#${id}-plate)`} />
      <circle cx="100" cy="100" r="74" fill="none" stroke="#d8ccb2" strokeWidth="2" />
      <circle cx="100" cy="100" r="66" fill={red ? '#e8b45a' : '#f3d58c'} />
      <g fill="none" strokeLinecap="round" strokeWidth="5">
        {strands.map((d, i) => (
          <path key={i} d={d} stroke={i % 3 === 0 ? '#f8e2a4' : i % 3 === 1 ? '#ecc066' : '#f4cf7c'} />
        ))}
      </g>
      {red ? (
        <path d="M70 92c4-16 22-26 38-22 18 4 28 18 24 34-4 18-24 26-40 22-18-4-26-18-22-34z" fill="#b8301f" opacity="0.92" />
      ) : (
        <>
          {[0.3, 1.5, 2.7, 4, 5.2].map((a, i) => {
            const p = polar(30, a)
            return <ellipse key={i} cx={p.x} cy={p.y} rx="9" ry="6" fill="#c9a77a" stroke="#8a6a44" strokeWidth="1.5" />
          })}
        </>
      )}
      {Array.from({ length: 14 }, (_, i) => {
        const p = polar(10 + rand(i + 40) * 50, rand(i + 70) * Math.PI * 2)
        return <circle key={`p${i}`} cx={p.x} cy={p.y} r="1.8" fill="#2f6229" />
      })}
      <path d="M118 74c10-14 28-12 32 0-12 6-24 6-32 0z" fill="#3f7d3a" />
      <path d="M126 70c8-4 16-2 20 2" stroke="#5e9a52" strokeWidth="1.5" fill="none" />
    </>
  )
}

function Lasagna({ id }: { id: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-top`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f4c063" />
          <stop offset="100%" stopColor="#c46a23" />
        </linearGradient>
      </defs>
      <ellipse cx="104" cy="186" rx="80" ry="8" fill="#000" opacity="0.2" />
      <ellipse cx="100" cy="160" rx="92" ry="30" fill="#efe7d6" />
      <ellipse cx="100" cy="158" rx="78" ry="22" fill="#fbf8f1" />
      <path d="M38 92l92-26 42 28-92 30z" fill={`url(#${id}-top)`} />
      <path d="M38 92v54l42 28v-50z" fill="#d7a24c" />
      <path d="M80 124l92-30v52l-92 28z" fill="#f2d07d" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <path d={`M80 ${134 + i * 14}l92-30v6l-92 30z`} fill="#b3291f" />
          <path d={`M80 ${140 + i * 14}l92-30v3l-92 30z`} fill="#fbe7a1" />
          <path d={`M38 ${102 + i * 14}l42 28v6l-42-28z`} fill="#9f241b" />
        </g>
      ))}
      {[
        [70, 90],
        [96, 82],
        [122, 76],
        [110, 98],
        [84, 104],
        [140, 88],
      ].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="7" ry="3.5" fill="#8f3f12" opacity="0.6" />
      ))}
      <path d="M98 70c8-12 24-12 28-2-10 6-20 6-28 2z" fill="#3f7d3a" />
      <path d="M112 64c6-10 18-10 22-2-8 6-16 6-22 2z" fill="#4e9146" />
    </>
  )
}

function Cocktail({ id, tint = 'sunrise' }: { id: string; tint?: CocktailTint }) {
  const [light, dark] = TINTS[tint]
  return (
    <>
      <defs>
        <linearGradient id={`${id}-liquid`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={light} />
          <stop offset="100%" stopColor={dark} />
        </linearGradient>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="40%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="188" rx="46" ry="6" fill="#000" opacity="0.3" />
      <path d="M120 22l-14 70" stroke="#e2382c" strokeWidth="6" strokeLinecap="round" />
      <path d="M120 22l20-10" stroke="#e2382c" strokeWidth="6" strokeLinecap="round" />
      <path d="M62 52h76l-8 128a8 8 0 0 1-8 8H78a8 8 0 0 1-8-8z" fill={`url(#${id}-liquid)`} />
      {[
        [80, 74, 12],
        [104, 86, -10],
        [86, 110, 18],
        [110, 124, -6],
      ].map(([x, y, r], i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width="20"
          height="20"
          rx="4"
          fill="#ffffff"
          opacity="0.32"
          transform={`rotate(${r} ${(x ?? 0) + 10} ${(y ?? 0) + 10})`}
        />
      ))}
      {tint === 'mint' &&
        [70, 100, 130, 156].map((y, i) => (
          <path key={i} d={`M${80 + (i % 2) * 24} ${y}c6-8 16-8 18 0-6 6-14 6-18 0z`} fill="#2f7a2a" opacity="0.85" />
        ))}
      <path d="M58 46h84l-12 142a8 8 0 0 1-8 8H78a8 8 0 0 1-8-8z" fill={`url(#${id}-glass)`} stroke="#ffffff" strokeOpacity="0.6" strokeWidth="2.5" />
      <ellipse cx="100" cy="47" rx="42" ry="5" fill="none" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="2.5" />
      <g transform="translate(46 30)">
        <circle cx="16" cy="16" r="18" fill="#9cc43c" />
        <circle cx="16" cy="16" r="14" fill="#dff29a" />
        {Array.from({ length: 8 }, (_, i) => {
          const p = polar(13, (i / 8) * Math.PI * 2, 16, 16)
          return <line key={i} x1="16" y1="16" x2={p.x} y2={p.y} stroke="#9cc43c" strokeWidth="1.5" />
        })}
      </g>
      <path d="M72 70c2 30 0 70-2 100" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="4" strokeLinecap="round" />
    </>
  )
}

function Wine({ id }: { id: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-wine`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d84b5a" />
          <stop offset="100%" stopColor="#5e0c1c" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="190" rx="44" ry="6" fill="#000" opacity="0.3" />
      <path d="M58 20h84c4 46-8 84-42 86-34-2-46-40-42-86z" fill="#ffffff" fillOpacity="0.12" stroke="#ffffff" strokeOpacity="0.65" strokeWidth="2.5" />
      <path d="M61 52h78c-2 30-14 52-39 54-25-2-37-24-39-54z" fill={`url(#${id}-wine)`} />
      <circle cx="84" cy="70" r="9" fill="#f29a2e" />
      <circle cx="84" cy="70" r="6" fill="#ffc35a" />
      <circle cx="112" cy="80" r="8" fill="#9cc43c" />
      <circle cx="112" cy="80" r="5" fill="#dff29a" />
      <circle cx="100" cy="62" r="5" fill="#c3173f" />
      <path d="M100 106v66" stroke="#ffffff" strokeOpacity="0.65" strokeWidth="5" />
      <ellipse cx="100" cy="178" rx="34" ry="7" fill="#ffffff" fillOpacity="0.2" stroke="#ffffff" strokeOpacity="0.65" strokeWidth="2.5" />
      <path d="M70 34c-2 22 4 44 14 56" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="4" strokeLinecap="round" fill="none" />
    </>
  )
}

function Seafood({ id }: { id: string }) {
  const prawns = [
    [70, 80, -20],
    [118, 74, 30],
    [80, 122, 10],
    [124, 118, -40],
    [100, 98, 70],
  ]
  return (
    <>
      <defs>
        <radialGradient id={`${id}-plate`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#2a2a2e" />
          <stop offset="100%" stopColor="#131315" />
        </radialGradient>
        <linearGradient id={`${id}-prawn`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffb37a" />
          <stop offset="100%" stopColor="#e2582c" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="186" rx="80" ry="9" fill="#000" opacity="0.3" />
      <circle cx="100" cy="100" r="92" fill={`url(#${id}-plate)`} stroke="#c99a3b" strokeWidth="3" />
      {prawns.map(([x, y, r], i) => (
        <g key={i} transform={`rotate(${r} ${x} ${y})`}>
          <path
            d={`M${(x ?? 0) - 22} ${y}c0-18 18-28 34-20 14 7 14 26 0 30-8 2-12-4-8-10`}
            stroke={`url(#${id}-prawn)`}
            strokeWidth="13"
            strokeLinecap="round"
            fill="none"
          />
          {[0, 1, 2, 3].map((s) => (
            <path key={s} d={`M${(x ?? 0) - 16 + s * 9} ${(y ?? 0) - 18 + (s % 2) * 2}v10`} stroke="#c8461f" strokeWidth="1.5" opacity="0.6" />
          ))}
          <path d={`M${(x ?? 0) - 26} ${y}l-8 -6m8 6l-9 4`} stroke="#e2582c" strokeWidth="3" strokeLinecap="round" />
        </g>
      ))}
      <path d="M142 140a22 22 0 0 1 22-22v22z" fill="#f6e36a" stroke="#c9b13a" strokeWidth="2" />
      <path d="M40 112a20 20 0 0 1 20 20H40z" fill="#9cc43c" stroke="#6e9327" strokeWidth="2" />
      {Array.from({ length: 10 }, (_, i) => {
        const p = polar(20 + rand(i + 5) * 60, rand(i + 11) * Math.PI * 2)
        return <circle key={`h${i}`} cx={p.x} cy={p.y} r="2" fill="#3f7d3a" />
      })}
    </>
  )
}

function Grill({ id }: { id: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-meat`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a5502a" />
          <stop offset="100%" stopColor="#5a2410" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="188" rx="84" ry="8" fill="#000" opacity="0.3" />
      <rect x="14" y="60" width="172" height="118" rx="18" fill="#8a5a2b" />
      <rect x="14" y="60" width="172" height="118" rx="18" fill="none" stroke="#5f3b18" strokeWidth="3" />
      {[80, 100, 120, 140, 160].map((y) => (
        <line key={y} x1="24" y1={y} x2="176" y2={y} stroke="#6f4620" strokeWidth="1" opacity="0.6" />
      ))}
      <path d="M44 98c10-24 64-30 98-18 26 10 26 44 2 58-30 16-86 14-100-6-8-12-6-22 0-34z" fill={`url(#${id}-meat)`} />
      <path d="M50 100c14-16 58-22 86-12" stroke="#f3e2b3" strokeWidth="4" opacity="0.5" fill="none" strokeLinecap="round" />
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1={58 + i * 18} y1="90" x2={78 + i * 18} y2="140" stroke="#2b1006" strokeWidth="5" strokeLinecap="round" opacity="0.75" />
      ))}
      <path d="M140 64c6 18 4 40-4 58" stroke="#3f7d3a" strokeWidth="3" fill="none" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path key={i} d={`M${140 + (i % 2 ? 2 : -2)} ${70 + i * 8}l${i % 2 ? 10 : -10} -4`} stroke="#4e9146" strokeWidth="3" strokeLinecap="round" />
      ))}
      <circle cx="46" cy="150" r="5" fill="#f3e2b3" />
      <circle cx="58" cy="158" r="4" fill="#f3e2b3" />
    </>
  )
}

const RENDERERS: Record<ArtKind, (id: string, tint?: CocktailTint) => ReactElement> = {
  pizza: (id) => <Pizza id={id} />,
  'pizza-seafood': (id) => <Pizza id={id} seafood />,
  pasta: (id) => <Pasta id={id} />,
  'pasta-red': (id) => <Pasta id={id} red />,
  lasagna: (id) => <Lasagna id={id} />,
  cocktail: (id, tint) => <Cocktail id={id} tint={tint} />,
  wine: (id) => <Wine id={id} />,
  seafood: (id) => <Seafood id={id} />,
  grill: (id) => <Grill id={id} />,
}

export function DishArt({ kind, tint, className, title }: DishArtProps) {
  const id = useId().replace(/:/g, '')
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      {RENDERERS[kind](id, tint)}
    </svg>
  )
}
