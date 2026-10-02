import { Reveal, RevealGroup } from './Reveal'

interface SectionHeadingProps {
  id?: string
  script: string
  title: string
  text?: string
  tone?: 'light' | 'dark'
  align?: 'center' | 'left'
}

export function SectionHeading({ id, script, title, text, tone = 'light', align = 'center' }: SectionHeadingProps) {
  const alignment = align === 'center' ? 'mx-auto text-center items-center' : 'items-start text-left'
  return (
    <RevealGroup as="header" className={`flex max-w-2xl flex-col ${alignment}`}>
      <Reveal>
        <p className={`font-script text-3xl md:text-4xl ${tone === 'dark' ? 'text-gold-400' : 'text-ember-600'}`}>{script}</p>
      </Reveal>
      <Reveal>
        <h2 id={id} className={`font-display text-section font-bold uppercase ${tone === 'dark' ? 'text-cream-50' : 'text-ink-950'}`}>
          {title}
        </h2>
      </Reveal>
      {text && (
        <Reveal>
          <p className={`mt-4 text-base md:text-lg ${tone === 'dark' ? 'text-cream-100/80' : 'text-muted'}`}>{text}</p>
        </Reveal>
      )}
    </RevealGroup>
  )
}
