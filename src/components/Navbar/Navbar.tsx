'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './Navbar.module.scss'

const navLinks = [
  { label: 'Accueil', href: '#hero' },
  { label: 'Projets', href: '#projects' },
  { label: 'Compétences', href: '#skills' },
  { label: 'Expérience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const burgerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
        burgerRef.current?.focus()
      }
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      const sections = navLinks.map((l) => l.href.replace('#', ''))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = (href: string) => {
    setMenuOpen(false)
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      window.history.replaceState(null, '', href)
      el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
    }
  }

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <a
          href="#hero"
          className={styles.logo}
          onClick={(e) => {
            e.preventDefault()
            handleLinkClick('#hero')
          }}
        >
          Tafita<span>.dev</span>
        </a>

        <ul id="navigation-links" className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
          {navLinks.map((link) => {
            const section = link.href.replace('#', '')
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={activeSection === section ? 'location' : undefined}
                  className={`${styles.navLink} ${
                    activeSection === section ? styles.active : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault()
                    handleLinkClick(link.href)
                  }}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>


        <a
          href="#contact"
          className={styles.cta}
          onClick={(e) => { e.preventDefault(); handleLinkClick('#contact') }}
        >
          Me contacter
        </a>

        <button
          ref={burgerRef}
          type="button"
          className={styles.burger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
          aria-controls="navigation-links"
        >
          <span className={menuOpen ? styles.burgerOpen : ''}></span>
          <span className={menuOpen ? styles.burgerOpen : ''}></span>
          <span className={menuOpen ? styles.burgerOpen : ''}></span>
        </button>
      </div>
    </nav>
  )
}
