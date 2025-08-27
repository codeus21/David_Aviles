import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import PersonalWebsite from './PersonalWebsite.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PersonalWebsite />
  </StrictMode>,
)
