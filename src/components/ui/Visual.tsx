import type { Visual as VisualData } from '@/content/types'
import { DishArt } from './DishArt'

interface VisualProps {
  visual: VisualData
  className?: string
  /** Hero / LCP images should load eagerly with high priority. */
  priority?: boolean
  sizes?: string
}

/** Renders the dish photo (WebP with JPG fallback) when provided, otherwise the brand illustration. */
export function Visual({ visual, className, priority = false, sizes = '(min-width: 1024px) 33vw, 90vw' }: VisualProps) {
  const { photo } = visual
  if (!photo) {
    return <DishArt kind={visual.art} tint={visual.tint} className={className} title={visual.alt} />
  }
  return (
    <picture className="contents">
      <source srcSet={photo.webpSet ?? photo.webp} type="image/webp" sizes={sizes} />
      <img
        src={photo.jpg}
        srcSet={photo.jpgSet}
        sizes={photo.jpgSet ? sizes : undefined}
        alt={visual.alt}
        width={photo.width}
        height={photo.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        className={className}
      />
    </picture>
  )
}
