import type { ReactElement } from 'react'
import type { DecorationKind } from '@/content/types'

const SHAPES: Record<DecorationKind, ReactElement> = {
  basil: (
    <>
      <path d="M8 52C8 24 30 6 56 8c2 28-18 48-48 44z" fill="#3f7d3a" />
      <path d="M10 50C24 36 38 24 54 10" stroke="#7bbf6a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </>
  ),
  mint: (
    <>
      <path d="M10 50c-4-24 14-42 40-40 4 26-14 44-40 40z" fill="#4e9146" />
      <path d="M12 48 46 14M22 38l-6-10M30 30l-4-12M30 30l12 2M22 38l14 4" stroke="#9ad38a" strokeWidth="2" fill="none" strokeLinecap="round" />
    </>
  ),
  tomato: (
    <>
      <circle cx="32" cy="32" r="26" fill="#d62f2a" />
      <circle cx="32" cy="32" r="20" fill="#ef4a3f" />
      {[0, 60, 120, 180, 240, 300].map((r) => (
        <ellipse key={r} cx="32" cy="20" rx="4" ry="7" fill="#ffd25e" opacity="0.85" transform={`rotate(${r} 32 32)`} />
      ))}
      <circle cx="32" cy="32" r="5" fill="#f9a39b" />
    </>
  ),
  chili: (
    <>
      <path d="M14 18c10 2 34 6 40 30 2 10-8 12-12 4-6-14-20-20-30-24z" fill="#d62f2a" />
      <path d="M12 20c-2-6 2-12 8-12" stroke="#3f7d3a" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M24 22c8 2 16 8 20 16" stroke="#ff8a7a" strokeWidth="2" fill="none" strokeLinecap="round" />
    </>
  ),
  olive: (
    <>
      <ellipse cx="32" cy="32" rx="18" ry="22" fill="#1d1d1f" transform="rotate(-25 32 32)" />
      <ellipse cx="32" cy="32" rx="7" ry="9" fill="#4a4a50" transform="rotate(-25 32 32)" />
      <ellipse cx="25" cy="22" rx="3" ry="5" fill="#ffffff" opacity="0.3" transform="rotate(-25 25 22)" />
    </>
  ),
  lime: (
    <>
      <circle cx="32" cy="32" r="26" fill="#9cc43c" />
      <circle cx="32" cy="32" r="21" fill="#dff29a" />
      {Array.from({ length: 8 }, (_, i) => (
        <path key={i} d="M32 32 32 13" stroke="#b6d65a" strokeWidth="2.5" transform={`rotate(${i * 45} 32 32)`} />
      ))}
    </>
  ),
  ice: (
    <>
      <rect x="10" y="10" width="44" height="44" rx="9" fill="#e8f6ff" opacity="0.55" stroke="#ffffff" strokeWidth="2" />
      <path d="M18 20h14" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  shrimp: (
    <>
      <path d="M12 34c0-16 16-24 30-18 12 6 12 22 0 26-8 2-10-4-6-8" stroke="#f08a4b" strokeWidth="10" strokeLinecap="round" fill="none" />
      <path d="M8 34l-6-6m6 6-7 4" stroke="#e2582c" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  cheese: (
    <>
      <path d="M6 44 54 18v30H6z" fill="#f7d77a" />
      <path d="M6 44 54 18l4 6-46 26z" fill="#fbe7a1" />
      <circle cx="24" cy="44" r="4" fill="#e0b85a" />
      <circle cx="42" cy="38" r="3" fill="#e0b85a" />
    </>
  ),
  pepper: (
    <>
      {[
        [16, 20],
        [34, 14],
        [44, 34],
        [24, 40],
        [12, 52],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5" fill="#2a2a2e" stroke="#4a4a50" strokeWidth="1.5" />
      ))}
    </>
  ),
}

export function Decoration({ kind, className }: { kind: DecorationKind; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      {SHAPES[kind]}
    </svg>
  )
}
