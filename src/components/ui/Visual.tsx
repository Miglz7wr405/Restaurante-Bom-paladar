import type { Visual as VisualData } from '@/content/types'
import { DishArt } from './DishArt'

interface VisualProps {
  visual: VisualData
  className?: string
  /** Hero / LCP images should load eagerly with high priority. */
  priority?: boolean
  sizes?: string
  /** 'thumb' allows low-resolution photos; 'large' falls back to the illustration for them. */
  size?: 'thumb' | 'large'
}

/** Renders the dish photo (WebP with JPG fallback) when provided, otherwise the brand illustration. */
export function Visual({ visual, className, priority = false, sizes = '(min-width: 1024px) 33vw, 90vw', size = 'large' }: VisualProps) {
  const photo = visual.photo?.lowRes && size === 'large' ? undefined : visual.photo
  if (!photo) {
    return <DishArt kind={visual.art} tint={visual.tint} className={className} title={visual.alt} />
  }
  return (
    <picture>
      <source srcSet={photo.webp} type="image/webp" sizes={sizes} />
      <img
        src={photo.jpg}
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
