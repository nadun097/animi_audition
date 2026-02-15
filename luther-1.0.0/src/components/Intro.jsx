import { useEffect, useRef } from 'react'

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nadun-anjana' },
  { label: 'GitHub', href: 'https://github.com/nadun097' },
  { label: 'Instagram', href: 'https://www.instagram.com/kn_anjana_._/' },
]

function Intro() {
  const handleScrollDown = (e) => {
    e.preventDefault()
    const aboutSection = document.querySelector('#about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="intro" className="s-intro target-section">
      <div className="row intro-content wide">
        <div className="column">
          <div className="text-pretitle with-line">Hello World</div>

          <h1 className="text-huge-title">
            <span className="vline vline--1"></span>
            <span className="vline vline--2"></span>
            <span className="vline vline--3"></span>
            <span className="vline vline--4"></span>
            I am <span className="name-glow">Nadun Anjana</span>, <br />
            a Designer <br />
            &amp; Software <br />
            Engineering Student <br />
            based in Sri Lanka.
          </h1>
        </div>

        <ul className="intro-social">
          {socialLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </div>

      <a href="#about" className="intro-scrolldown" onClick={handleScrollDown}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
        >
          <path d="M11 21.883l-6.235-7.527-.765.644 7.521 9 7.479-9-.764-.645-6.236 7.529v-21.884h-1v21.883z" />
        </svg>
      </a>
    </section>
  )
}

export default Intro
