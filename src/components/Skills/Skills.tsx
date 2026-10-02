'use client'

import { useEffect, useRef } from 'react'
import { Triangle, Atom, Server, FileCode, Database, Cloud, Hexagon } from 'lucide-react'
import { skills, techCards } from '@/data/portfolio'
import styles from './Skills.module.scss'

const iconMap: Record<string, React.ReactNode> = {
  Triangle: <Triangle size={22} color="var(--blue)" />,
  Atom: <Atom size={22} color="var(--blue)" />,
  Server: <Server size={22} color="var(--blue)" />,
  Hexagon: <Hexagon size={22} color="var(--blue)" />,
  FileCode: <FileCode size={22} color="var(--blue)" />,
  Database: <Database size={22} color="var(--blue)" />,
  Cloud: <Cloud size={22} color="var(--blue)" />,
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
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
            <h3 className={styles.colTitle}>Compétences en pratique</h3>
            <div className={styles.barsList}>
              {skills.map((skill) => (
                <div key={skill.name} className={styles.barItem}>
                  <div className={styles.barHeader}>
                    <span className={styles.barName}>{skill.name}</span>
                  </div>
                  <p className={styles.skillExample}>{skill.example}</p>
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
