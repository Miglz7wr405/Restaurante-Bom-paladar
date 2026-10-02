import { LazyMotion, MotionConfig, domMax } from 'framer-motion'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { Categories } from './components/sections/Categories'
import { DishOfMonth } from './components/sections/DishOfMonth'
import { Featured } from './components/sections/Featured'
import { Hero } from './components/sections/Hero'
import { News } from './components/sections/News'
import { Newsletter } from './components/sections/Newsletter'
import { PopularMenu } from './components/sections/PopularMenu'
import { Promos } from './components/sections/Promos'
import { Reservation } from './components/sections/Reservation'
import { Takeaway } from './components/sections/Takeaway'
import { Team } from './components/sections/Team'

export default function App() {
  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">
        <a
          href="#conteudo"
          className="sr-only z-[60] rounded-full bg-gold-400 px-5 py-3 font-semibold text-ink-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Saltar para o conteúdo
        </a>
        <Navbar />
        <main id="conteudo">
          <Hero />
          <Categories />
          <DishOfMonth />
          <Featured />
          <PopularMenu />
          <Promos />
          <Takeaway />
          <Team />
          <Reservation />
          <News />
          <Newsletter />
        </main>
        <Footer />
      </MotionConfig>
    </LazyMotion>
  )
}
