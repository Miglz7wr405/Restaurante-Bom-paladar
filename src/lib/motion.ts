import type { Transition, Variants } from 'framer-motion'

export const EASE_SMOOTH: [number, number, number, number] = [0.22, 1, 0.36, 1]

export const revealTransition: Transition = { duration: 0.6, ease: EASE_SMOOTH }

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: revealTransition },
}

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE_SMOOTH } },
}

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE_SMOOTH } },
}

export const stagger = (delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren } },
})

// Trigger on first pixels (minus a bottom margin) rather than a ratio, so tall grids still reveal on small screens.
export const viewportOnce = { once: true, margin: '0px 0px -12% 0px' } as const
