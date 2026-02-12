import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'Intro', href: '#intro' },
  { label: 'About', href: '#about' },
  { label: 'Works', href: '#works' },
  { label: 'Say Hello', href: '#contact' },
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('intro')

  useEffect(() => {
    const sections = document.querySelectorAll('.target-section')

    const handleScroll = () => {
      const scrollY = window.pageYOffset

      sections.forEach((section) => {
        const sectionHeight = section.offsetHeight
        const sectionTop = section.offsetTop - 50
        const sectionId = section.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActiveSection(sectionId)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia('(min-width: 801px)').matches) {
        setMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
    if (window.matchMedia('(max-width: 800px)').matches) {
      setMenuOpen(false)
    }
  }

  return (
    <header className={`s-header`}>
      <div className="header-mobile">
        <span className="mobile-home-link">
          <a href="/">Luther.</a>
        </span>
        <a
          className={`mobile-menu-toggle ${menuOpen ? 'is-clicked' : ''}`}
          href="#0"
          onClick={(e) => {
            e.preventDefault()
            setMenuOpen(!menuOpen)
          }}
        >
          <span>Menu</span>
        </a>
      </div>

      <div className="row wide main-nav-wrap">
        <nav className="column lg-12 main-nav">
          <ul>
            <li>
              <a href="/" className="home-link">
                Luther.
              </a>
            </li>
            {navLinks.map((link) => (
              <li
                key={link.href}
                className={activeSection === link.href.slice(1) ? 'current' : ''}
              >
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
