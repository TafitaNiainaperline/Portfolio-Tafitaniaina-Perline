import { Mail, Phone, Link, GitBranch } from 'lucide-react'
import { personalInfo } from '@/data/portfolio'
import styles from './Footer.module.scss'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Logo */}
        <a href="#hero" className={styles.logo}>
          Tafita<span>.dev</span>
        </a>

        {/* Copyright */}
        <p className={styles.copy}>
          &copy; {year} TAFITANIAINA Perline. Tous droits réservés.
        </p>

        {/* Socials */}
        <div className={styles.socials}>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            title="LinkedIn"
            aria-label="LinkedIn"
          >
            <Link size={16} className={styles.socialIcon} />
          </a>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            title="GitHub"
            aria-label="GitHub"
          >
            <GitBranch size={16} className={styles.socialIcon} />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className={styles.socialLink}
            title="Email"
            aria-label="Email"
          >
            <Mail size={16} className={styles.socialIcon} />
          </a>
          <a
            href={`tel:${personalInfo.phone.replace(/\s/g, '')}`}
            className={styles.socialLink}
            title="Téléphone"
            aria-label="Téléphone"
          >
            <Phone size={16} className={styles.socialIcon} />
          </a>
        </div>
      </div>

    </footer>
  )
}
