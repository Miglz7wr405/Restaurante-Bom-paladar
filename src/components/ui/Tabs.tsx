import { m } from 'framer-motion'
import { useRef, type KeyboardEvent } from 'react'

interface TabsProps {
  idPrefix: string
  tabs: { id: string; label: string }[]
  active: string
  onChange: (id: string) => void
  label: string
}

export function Tabs({ idPrefix, tabs, active, onChange, label }: TabsProps) {
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  const onKeyDown = (e: KeyboardEvent, index: number) => {
    const last = tabs.length - 1
    const next =
      e.key === 'ArrowRight' ? (index === last ? 0 : index + 1)
      : e.key === 'ArrowLeft' ? (index === 0 ? last : index - 1)
      : e.key === 'Home' ? 0
      : e.key === 'End' ? last
      : null
    if (next === null) return
    e.preventDefault()
    const tab = tabs[next]
    if (!tab) return
    onChange(tab.id)
    refs.current[next]?.focus()
  }

  return (
    <div role="tablist" aria-label={label} className="inline-flex flex-wrap justify-center gap-1 rounded-full bg-ink-950 p-1.5">
      {tabs.map((tab, i) => {
        const selected = tab.id === active
        return (
          <button
            key={tab.id}
            ref={(el) => {
              refs.current[i] = el
            }}
            type="button"
            role="tab"
            id={`${idPrefix}-tab-${tab.id}`}
            aria-selected={selected}
            aria-controls={`${idPrefix}-panel-${tab.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`relative rounded-full px-5 py-2.5 font-display text-sm font-semibold uppercase tracking-wider transition-colors md:px-7 ${
              selected ? 'text-ink-950' : 'text-cream-50/80 hover:text-gold-300'
            }`}
          >
            {selected && (
              <m.span
                layoutId={`${idPrefix}-pill`}
                className="absolute inset-0 rounded-full bg-gold-400"
                transition={{ type: 'spring', stiffness: 400, damping: 34 }}
              />
            )}
            <span className="relative">{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}
