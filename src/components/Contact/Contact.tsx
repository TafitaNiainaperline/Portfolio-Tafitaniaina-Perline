'use client'

import { useEffect, useRef, useState, FormEvent } from 'react'
import { Mail, Phone, Link, GitBranch, ArrowRight, Send } from 'lucide-react'
import { personalInfo } from '@/data/portfolio'
import styles from './Contact.module.scss'

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [serviceError, setServiceError] = useState('')
  const [emailFallback, setEmailFallback] = useState(`mailto:${personalInfo.email}`)

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (loading) return
    setError('')
    setServiceError('')
    setSent(false)
    setLoading(true)
    const form = e.currentTarget
    const data = new FormData(form)
    const subject = String(data.get('subject') || 'Contact depuis le portfolio')
    const body = `Nom : ${data.get('name') || ''}\nEmail : ${data.get('email') || ''}\n\n${data.get('message') || ''}`
    setEmailFallback(`mailto:${personalInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 30000)
    try {
      const res = await fetch('https://formspree.io/f/mreoaqnz', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
        signal: controller.signal,
      })
      if (res.ok) {
        setSent(true)
        form.reset()
      } else {
        const response: unknown = await res.json().catch(() => null)
        if (response && typeof response === 'object') {
          const result = response as { errors?: { message?: unknown }[]; error?: unknown }
          const details = Array.isArray(result.errors)
            ? result.errors.map((item) => item?.message).filter((message): message is string => typeof message === 'string').join(' ')
            : typeof result.error === 'string' ? result.error : ''
          setServiceError(details)
        }
        if (res.status === 429) {
          setError('Le service d’envoi a atteint sa limite. Réessayez plus tard ou utilisez l’envoi par email ci-dessous.')
        } else if (res.status === 404) {
          setError('Le formulaire de contact est introuvable. Utilisez l’envoi par email ci-dessous.')
        } else if (res.status === 401 || res.status === 403) {
          setError('Le service d’envoi a refusé la demande. Utilisez l’envoi par email ci-dessous.')
        } else {
          setError(`L’envoi a échoué (code ${res.status}). Votre message est conservé ; vous pouvez réessayer.`)
        }
      }
    } catch {
      setError(controller.signal.aborted
        ? 'Le service d’envoi met trop de temps à répondre. La réception du message n’a pas pu être confirmée.'
        : 'Impossible de joindre le service d’envoi. Votre message est conservé ; vérifiez votre connexion ou utilisez l’envoi par email.')
    } finally {
      window.clearTimeout(timeout)
      setLoading(false)
    }
  }

  return (
    <section id="contact" className={styles.contact} ref={sectionRef}>
      <div className={styles.container}>
        <div className={`${styles.sectionHeader} reveal`}>
          <span className={styles.sectionTag}>Contact</span>
          <h2 className={styles.sectionTitle}>
            Travaillons <span className={styles.accent}>Ensemble</span>
          </h2>
          <p className={styles.sectionDesc}>
            Un projet en tête ? Discutons-en et voyons comment je peux vous aider.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Left: Contact info */}
          <div className={`${styles.info} reveal`}>
            <p className={styles.infoText}>
              Je suis disponible pour des missions freelance, des postes fullstack ou des collaborations sur des projets innovants.
            </p>

            <div className={styles.contactLinks}>
              <a href={`mailto:${personalInfo.email}`} className={styles.contactLink}>
                <span className={styles.linkIcon}><Mail size={18} /></span>
                <div>
                  <p className={styles.linkLabel}>Email</p>
                  <p className={styles.linkValue}>{personalInfo.email}</p>
                </div>
                <ArrowRight size={16} className={styles.linkArrow} />
              </a>

              <a href={`tel:${personalInfo.phone.replace(/\s/g, '')}`} className={styles.contactLink}>
                <span className={styles.linkIcon}><Phone size={18} /></span>
                <div>
                  <p className={styles.linkLabel}>Téléphone</p>
                  <p className={styles.linkValue}>{personalInfo.phone}</p>
                </div>
                <ArrowRight size={16} className={styles.linkArrow} />
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
              >
                <span className={styles.linkIcon}><Link size={18} /></span>
                <div>
                  <p className={styles.linkLabel}>LinkedIn</p>
                  <p className={styles.linkValue}>Tafita Niaina</p>
                </div>
                <ArrowRight size={16} className={styles.linkArrow} />
              </a>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
              >
                <span className={styles.linkIcon}><GitBranch size={18} /></span>
                <div>
                  <p className={styles.linkLabel}>GitHub</p>
                  <p className={styles.linkValue}>TafitaNiainaperline</p>
                </div>
                <ArrowRight size={16} className={styles.linkArrow} />
              </a>
            </div>

            <div className={styles.availability}>
              <div className={styles.availDot} />
              <span>{personalInfo.availabilityBadge}</span>
            </div>
          </div>

          {/* Right: Form */}
          <div className={`${styles.formWrap} reveal`}>
            <form className={styles.form} onSubmit={handleSubmit} onChange={() => setSent(false)} aria-busy={loading}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="name">
                    Nom complet
                  </label>
                  <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    type="text"
                    className={styles.input}
                    placeholder="Votre nom"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    autoComplete="email"
                    type="email"
                    className={styles.input}
                    placeholder="votre@email.com"
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="subject">
                  Sujet
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  className={styles.input}
                  placeholder="Objet de votre message"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className={styles.textarea}
                  rows={5}
                  placeholder="Décrivez votre projet ou votre demande..."
                  required
                />
              </div>

              <button
                type="submit"
                className={`${styles.submitBtn} ${sent ? styles.sent : ''}`}
                disabled={loading}
              >
                {sent ? (
                  <>Message envoyé !</>
                ) : loading ? (
                  <>Envoi en cours...</>
                ) : (
                  <>Envoyer le message <Send size={16} className={styles.btnArrow} /></>
                )}
              </button>
              <p role="status" aria-live="polite">
                {loading ? 'Envoi en cours…' : sent ? 'Merci ! Votre message a bien été envoyé.' : ''}
              </p>
              {error && (
                <div role="alert" className={styles.errorMessage}>
                  <p>{error}</p>
                  {serviceError && <p className={styles.serviceError}>Réponse du service : {serviceError}</p>}
                  <a href={emailFallback} className={styles.fallbackLink}>Ouvrir mon application email avec ce message <ArrowRight size={14} aria-hidden="true" /></a>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
