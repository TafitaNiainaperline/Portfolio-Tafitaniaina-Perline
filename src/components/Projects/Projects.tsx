'use client'

import { useEffect, useRef } from 'react'
import { projects } from '@/data/portfolio'
import styles from './Projects.module.scss'

export default function Projects() {
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
      { threshold: 0.1 }
    )
    const reveals = sectionRef.current?.querySelectorAll('.reveal')
    reveals?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className={styles.projects} ref={sectionRef}>
      <div className={styles.container}>
        <div className={`${styles.header} reveal`}>
          <div className={styles.headerLeft}>
            <span className={styles.sectionTag}>Portfolio</span>
            <h2 className={styles.sectionTitle}>
              Mes <span className={styles.accent}>Projets</span>
            </h2>
            <p className={styles.sectionDesc}>
              Une sélection de mes réalisations fullstack les plus récentes.
            </p>
          </div>
          <a href="#" className={styles.viewAll}>
            Voir tous les projets
            <span className={styles.viewAllArrow}>→</span>
          </a>
        </div>

        <div className={styles.grid}>
          {projects.map((project, i) => (
            <div
              key={project.id}
              className={`${styles.card} reveal`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className={styles.cardTopLine} />
              <div className={styles.cardNumber}>0{project.id}</div>

              <div className={styles.cardTags}>
                {project.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className={styles.cardTitle}>{project.title}</h3>
              <p className={styles.cardDesc}>{project.description}</p>

            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
