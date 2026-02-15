import { useState, useEffect } from 'react'
import Header from './components/Header'
import Intro from './components/Intro'
import About from './components/About'
import Works from './components/Works'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'

function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [preloaderVisible, setPreloaderVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
      setTimeout(() => setPreloaderVisible(false), 1000)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="s-pagewrap">
      {preloaderVisible && <Preloader isLoaded={isLoaded} />}

      <div className="circles">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <Header />

      <main className="s-content">
        <Intro />
        <About />
        <Works />
        <Contact />
      </main>

      <Footer />
      <Cursor />
    </div>
  )
}

export default App
