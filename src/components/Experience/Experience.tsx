'use client'

import { useEffect, useRef } from 'react'
import { experience } from '@/data/portfolio'
import styles from './Experience.module.scss'

export default function Experience() {
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
    <section id="experience" className={styles.experience} ref={sectionRef}>
      <div className={styles.container}>
        <div className={`${styles.sectionHeader} reveal`}>
          <span className={styles.sectionTag}>Parcours</span>
          <h2 className={styles.sectionTitle}>
            Mon <span className={styles.accent}>Expérience</span>
          </h2>
          <p className={styles.sectionDesc}>
            Un parcours progressif vers la maîtrise du développement fullstack moderne.
          </p>
        </div>

        <div className={styles.timeline}>
          <div className={styles.timelineLine} />

          {experience.map((item, i) => (
            <div
              key={i}
              className={`${styles.timelineItem} reveal`}
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <div className={styles.timelineDot}>
                <div className={styles.dotInner} />
              </div>

              <div className={styles.timelinePeriod}>
                <span className={styles.period}>{item.period}</span>
              </div>

              <div className={styles.timelineCard}>
                <div className={styles.cardTopLine} />
                <span className={styles.period}>{item.period}</span>
                <h3 className={styles.role}>{item.role}</h3>
                <p className={styles.company}>{item.company}</p>
                <p className={styles.desc}>{item.description}</p>
                <div className={styles.tags}>
                  {item.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
