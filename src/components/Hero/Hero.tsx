'use client'

import { useEffect, useRef } from 'react'
import { Rocket, Clock, CheckCircle, Hand, ArrowRight, Download } from 'lucide-react'
import Image from 'next/image'
import { personalInfo } from '@/data/portfolio'
import styles from './Hero.module.scss'

const techLogos = [
  { label: 'Next.js', icon: '▲' },
  { label: 'React.js', icon: 'Re' },
  { label: 'Node.js', icon: 'No' },
  { label: 'TypeScript', icon: 'TS' },
  { label: 'PostgreSQL', icon: 'PG' },
]

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    const reveals = heroRef.current?.querySelectorAll('.reveal')
    reveals?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="hero" className={styles.hero} ref={heroRef}>
      <div className={styles.bgGlow1} />
      <div className={styles.bgGlow2} />

      <div className={styles.container}>
        {/* Left column */}
        <div className={styles.left}>
          <div className={`${styles.badge} reveal`}>
            <span className={styles.badgeDot} />
            {personalInfo.availabilityBadge}
          </div>

          <p className={`${styles.greeting} reveal`}>
            Bonjour, je suis <Hand size={20} style={{ display: 'inline', verticalAlign: 'middle', color: '#76D2DB' }} />
          </p>

          <h1 className={`${styles.name} reveal`}>
            {personalInfo.name.split(' ').map((word, i) => (
              <span key={i} className={i === 0 ? styles.nameHighlight : ''}>
                {word}{' '}
              </span>
            ))}
          </h1>

          <p className={`${styles.role} reveal`}>{personalInfo.role}</p>

          <p className={`${styles.description} reveal`}>
            {personalInfo.description}
          </p>

          <div className={`${styles.ctaGroup} reveal`}>
            <a href="#projects" className={styles.ctaPrimary}
              onClick={(e) => {
                e.preventDefault()
                window.history.replaceState(null, '', '#projects')
                document.getElementById('projects')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
              }}
            >
              Voir mes projets
              <ArrowRight size={16} className={styles.arrow} />
            </a>
            <a href="/CV_Perline.pdf" download className={styles.ctaSecondary}>
              <Download size={16} />
              Télécharger mon CV · PDF
            </a>
          </div>

          <div className={`${styles.techStack} reveal`}>
            <p className={styles.techLabel}>Stack technique</p>
            <div className={styles.techLogos}>
              {techLogos.map((t) => (
                <div key={t.label} className={styles.techLogo} title={t.label}>
                  <span>{t.icon}</span>
                  <span className={styles.techLogoLabel}>{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className={styles.right}>
          {/* Photo card */}
          <div className={`${styles.photoCard} reveal`}>
            <div className={styles.photoPlaceholder}>
              <Image src="/tafita.png" alt="TAFITANIAINA Perline" fill priority sizes="(max-width: 480px) 220px, (max-width: 900px) 280px, 400px" style={{ objectFit: 'cover', borderRadius: '24px' }} />
            </div>

            {/* Nametag overlay */}
            <div className={styles.nametag}>
              <div className={styles.nametagDot} />
              <div>
                <p className={styles.nametagName}>TAFITANIAINA Perline</p>
                <p className={styles.nametagRole}>Développeuse Full Stack</p>
              </div>
            </div>
          </div>

          {/* Floating stat cards */}
          <div className={styles.floatCards}>
            <div className={`${styles.floatCard} ${styles.floatCard1}`}>
              <Rocket size={22} color="#76D2DB" />
              <div>
                <p className={styles.floatValue}>10</p>
                <p className={styles.floatLabel}>Projets</p>
              </div>
            </div>

            <div className={`${styles.floatCard} ${styles.floatCard2}`}>
              <Clock size={22} color="#76D2DB" />
              <div>
                <p className={styles.floatValue}>2+</p>
                <p className={styles.floatLabel}>Ans</p>
              </div>
            </div>

            <div className={`${styles.floatCard} ${styles.floatCard3}`}>
              <CheckCircle size={22} color="#76D2DB" />
              <div>
                <p className={styles.floatValue}>100%</p>
                <p className={styles.floatLabel}>Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
