import type { MenuSection } from '@/content/types'

/** Lowercase and strip accents so "camarao" matches "Camarão". */
export function normalize(text: string): string {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()
}

export function filterSections(sections: MenuSection[], query: string): MenuSection[] {
  const q = normalize(query)
  if (!q) return sections
  return sections.flatMap((section) => {
    if (normalize(section.label).includes(q)) return [section]
    const items = section.items.filter((item) => normalize(`${item.name} ${item.description ?? ''}`).includes(q))
    return items.length ? [{ ...section, items }] : []
  })
}
