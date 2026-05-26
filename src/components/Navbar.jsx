import { useState } from 'react'
import './Navbar.css'

const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Contato', href: '#contato' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('Início')

  const handleLinkClick = (label) => {
    setActiveLink(label)
    setMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <a href="#inicio" className="navbar__brand">
          <span className="navbar__logo">◆</span>
          AppTest
        </a>

        <button
          type="button"
          className={`navbar__toggle ${menuOpen ? 'navbar__toggle--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`navbar__menu ${menuOpen ? 'navbar__menu--open' : ''}`}>
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className={`navbar__link ${activeLink === label ? 'navbar__link--active' : ''}`}
                onClick={() => handleLinkClick(label)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
