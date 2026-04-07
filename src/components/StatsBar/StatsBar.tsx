'use client'

import { useEffect, useRef, useState } from 'react'
import { Rocket, SmilePlus, CalendarDays, Wrench } from 'lucide-react'
import { stats } from '@/data/portfolio'
import styles from './StatsBar.module.scss'

const iconMap: Record<string, React.ReactNode> = {
  Rocket: <Rocket size={22} color="#F7F6E5" />,
  SmilePlus: <SmilePlus size={22} color="#F7F6E5" />,
  CalendarDays: <CalendarDays size={22} color="#F7F6E5" />,
  Wrench: <Wrench size={22} color="#F7F6E5" />,
}

function parseNumber(value: string): number {
  return parseInt(value.replace(/[^0-9]/g, ''), 10) || 0
}

function CounterNumber({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    const duration = 1500
    const steps = 60
    const increment = target / steps
    let current = 0
    let step = 0

    const timer = setInterval(() => {
      step++
      current = Math.min(Math.round(increment * step), target)
      setCount(current)
      if (step >= steps) clearInterval(timer)
    }, duration / steps)

    return () => clearInterval(timer)
  }, [active, target])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

export default function StatsBar() {
  const [active, setActive] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.statsBar} ref={ref}>
      <div className={styles.inner}>
        {stats.map((stat, i) => {
          const num = parseNumber(stat.value)
          const suffix = stat.value.replace(/[0-9]/g, '')
          return (
            <div
              key={i}
              className={`${styles.statItem} ${i < stats.length - 1 ? styles.bordered : ''}`}
            >
              <div className={styles.iconBox}>
                {iconMap[stat.icon]}
              </div>
              <div className={styles.statText}>
                <p className={styles.statValue}>
                  <CounterNumber target={num} suffix={suffix} active={active} />
                </p>
                <p className={styles.statLabel}>{stat.label}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
