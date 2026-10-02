import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Syne } from 'next/font/google'
import './globals.scss'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Tafita.dev — Développeuse Full Stack',
  description:
    'Portfolio de TAFITANIAINA Perline — Développeuse Full Stack Next.js · React · NestJS',
  openGraph: {
    title: 'TAFITANIAINA Perline — Développeuse Full Stack',
    description: 'Découvrez mes projets web, mes compétences et mon parcours avec React, Next.js et NestJS.',
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary',
    title: 'TAFITANIAINA Perline — Développeuse Full Stack',
    description: 'Projets web, compétences et parcours avec React, Next.js et NestJS.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="fr"
      className={`${plusJakartaSans.variable} ${syne.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
