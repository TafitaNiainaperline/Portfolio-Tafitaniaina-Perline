'use client'

import { useEffect, useRef, useState } from 'react'
import { Triangle, Atom, Server, FileCode, Database, Cloud, Hexagon } from 'lucide-react'
import { skills, techCards } from '@/data/portfolio'
import styles from './Skills.module.scss'

const iconMap: Record<string, React.ReactNode> = {
  Triangle: <Triangle size={24} color="#76D2DB" />,
  Atom: <Atom size={24} color="#76D2DB" />,
  Server: <Server size={24} color="#76D2DB" />,
  Hexagon: <Hexagon size={24} color="#76D2DB" />,
  FileCode: <FileCode size={24} color="#76D2DB" />,
  Database: <Database size={24} color="#76D2DB" />,
  Cloud: <Cloud size={24} color="#76D2DB" />,
}

export default function Skills() {
  const [barsActive, setBarsActive] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            setBarsActive(true)
          }
        })
      },
      { threshold: 0.15 }
    )

    const reveals = sectionRef.current?.querySelectorAll('.reveal')
    reveals?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" className={styles.skills} ref={sectionRef}>
      <div className={styles.container}>
        <div className={`${styles.sectionHeader} reveal`}>
          <span className={styles.sectionTag}>Expertise</span>
          <h2 className={styles.sectionTitle}>
            Mes <span className={styles.accent}>Compétences</span>
          </h2>
          <p className={styles.sectionDesc}>
            Technologies maîtrisées pour livrer des solutions fullstack performantes et modernes.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Left: Skill bars */}
          <div className={`${styles.skillBars} reveal`}>
            <h3 className={styles.colTitle}>Niveaux de maîtrise</h3>
            <div className={styles.barsList}>
              {skills.map((skill, i) => (
                <div key={skill.name} className={styles.barItem}>
                  <div className={styles.barHeader}>
                    <span className={styles.barName}>{skill.name}</span>
                    <span className={styles.barPercent}>{skill.percentage}%</span>
                  </div>
                  <div className={styles.barTrack}>
                    <div
                      className={styles.barFill}
                      style={{
                        width: barsActive ? `${skill.percentage}%` : '0%',
                        transitionDelay: `${i * 0.1}s`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Tech cards */}
          <div className={`${styles.techGrid} reveal`}>
            <h3 className={styles.colTitle}>Technologies</h3>
            <div className={styles.cardsGrid}>
              {techCards.map((card) => (
                <div key={card.name} className={styles.techCard}>
                  <span className={styles.techIcon}>{iconMap[card.icon]}</span>
                  <p className={styles.techName}>{card.name}</p>
                  <p className={styles.techSub}>{card.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
