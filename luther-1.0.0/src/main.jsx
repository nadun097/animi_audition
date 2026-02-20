import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import BlogPage from './pages/BlogPage.jsx'
import './styles/vendor.css'
import './styles/styles.css'

window.history.scrollRestoration = 'manual'
window.scrollTo(0, 0)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/blog" element={<BlogPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
