'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { projects, personalInfo } from '@/data/portfolio'
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
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className={styles.viewAll}>
            Explorer mon GitHub
            <span className={styles.viewAllArrow}>→</span>
          </a>
        </div>

        <div className={styles.grid}>
          {projects.map((project, i) => (
            <article
              key={project.id}
              className={`${styles.card} reveal`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {project.image && (
                <a href={project.image} target="_blank" rel="noopener noreferrer" className={styles.cardVisual} aria-label={`Agrandir ${project.isMockup ? 'la maquette' : 'la capture'} : ${project.title}`}>
                  <div className={styles.browserFrame}>
                    <div className={styles.browserBar} aria-hidden="true">
                      <span className={styles.browserDots}><i /><i /><i /></span>
                      <span className={styles.browserTitle}>{project.title}</span>
                    </div>
                    <div className={styles.imageViewport}>
                      <Image
                        src={project.image}
                        alt={project.imageAlt}
                        width={1280}
                        height={720}
                        sizes="(max-width: 480px) calc(100vw - 58px), (max-width: 640px) calc(100vw - 90px), (max-width: 1000px) calc((100vw - 136px) / 2), (max-width: 1264px) calc((100vw - 182px) / 3), 361px"
                        className={styles.cardImage}
                      />
                    </div>
                  </div>
                  <span className={styles.expandHint}>Agrandir <ArrowUpRight size={14} aria-hidden="true" /></span>
                </a>
              )}
              <div className={styles.cardContent}>
                <div className={styles.cardMeta}>
                  <span className={styles.cardNumber}>{String(i + 1).padStart(2, '0')} / Projet</span>
                  <div className={styles.cardTags}>
                    {project.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDesc}>{project.description}</p>
                <details className={styles.projectDetails}>
                  <summary>Détails du projet <ChevronDown size={16} aria-hidden="true" /></summary>
                  {project.role && <p className={styles.projectRole}><strong>Mon rôle :</strong> {project.role}</p>}
                  <ul className={styles.features}>
                    {project.features.map((feature) => <li key={feature}>{feature}</li>)}
                  </ul>
                </details>
                <div className={styles.cardActions}>
                  {project.demoUrl && project.demoUrl !== '#' && (
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className={styles.btnDemo} aria-label={`Voir la démo : ${project.title}`}>Voir la démo</a>
                  )}
                  {project.githubUrl && project.githubUrl !== '#' && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.btnGithub} aria-label={`Voir le code : ${project.title}`}>Voir le code</a>
                  )}
                  {project.demoUrl === '#' && project.githubUrl === '#' && (
                    <a href="#contact" className={styles.btnGithub} aria-label={`Discuter du projet : ${project.title}`}>Parlons de ce projet <ArrowUpRight size={16} aria-hidden="true" /></a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
