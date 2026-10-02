import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MenuPage from './pages/MenuPage'
import './styles/index.css'

const root = document.getElementById('root')
if (!root) throw new Error('Missing #root element')

createRoot(root).render(
  <StrictMode>
    <MenuPage />
  </StrictMode>,
)
