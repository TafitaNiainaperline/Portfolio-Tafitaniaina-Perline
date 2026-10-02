import Image from 'next/image'
import { ArrowUpRight, Download } from 'lucide-react'
import { personalInfo, stats } from '@/data/portfolio'
import styles from './Hero.module.scss'

const technologies = ['Next.js', 'React', 'NestJS', 'TypeScript']

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.intro}>
          <div className={styles.badge}>
            <span aria-hidden="true" />{personalInfo.availabilityBadge}
          </div>
          <p className={styles.greeting}>Bonjour, je suis Perline.</p>
          <h1 className={styles.title}>Développeuse web.<br /><span>Des idées au concret.</span></h1>
          <p className={styles.description}>{personalInfo.description}</p>
          <div className={styles.actions}>
            <a href="#projects" className={styles.primary}>Découvrir mes projets <ArrowUpRight size={17} aria-hidden="true" /></a>
            <a href="/CV_Perline.pdf" download className={styles.secondary}><Download size={16} aria-hidden="true" /> Mon CV · PDF</a>
          </div>
          <div className={styles.technologies} aria-label="Technologies principales">
            {technologies.map((technology) => <span key={technology}>{technology}</span>)}
          </div>
          <div className={styles.stats}>
            {[stats[0], stats[2]].map((stat) => (
              <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>
            ))}
          </div>
        </div>
        <div className={styles.portrait}>
          <div className={styles.photo}>
            <Image src="/tafita.png" alt="Portrait de TAFITANIAINA Perline" fill priority sizes="(max-width: 600px) 260px, (max-width: 850px) 320px, 340px" className={styles.photoImage} />
          </div>
          <div className={styles.caption}>
            <span className={styles.captionMark} aria-hidden="true">&lt;/&gt;</span>
            <div><p>{personalInfo.name}</p><span>Développeuse Full Stack</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}
