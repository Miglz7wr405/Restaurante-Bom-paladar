import { LazyMotion, MotionConfig, domMax } from 'framer-motion'
import type { ReactNode } from 'react'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

/** Shared page frame: motion config, skip link, navbar and footer. */
export function AppShell({ children, current }: { children: ReactNode; current?: string }) {
  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">
        <a
          href="#conteudo"
          className="sr-only z-[60] rounded-full bg-gold-400 px-5 py-3 font-semibold text-ink-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Saltar para o conteúdo
        </a>
        <Navbar current={current} />
        <main id="conteudo">{children}</main>
        <Footer />
      </MotionConfig>
    </LazyMotion>
  )
}
