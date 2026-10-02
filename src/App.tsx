import { AppShell } from './components/layout/AppShell'
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
    <AppShell>
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
    </AppShell>
  )
}
