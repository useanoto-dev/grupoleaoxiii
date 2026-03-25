import type { Metadata, Viewport } from 'next'
import { Figtree, Noto_Sans } from 'next/font/google'
import './globals.css'
import { CustomCursor, CookieBanner } from '@/components/layout/ClientOnly'

// ─────────────────────────────────────────────
// Font Definitions
// ─────────────────────────────────────────────

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
})

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

// ─────────────────────────────────────────────
// Metadata
// ─────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL('https://clinicaleaoxiii.com.br'),
  title: {
    default: 'Clínica Leão XIII',
    template: 'Clínica Leão XIII | %s',
  },
  description:
    'Saúde e tecnologia mais perto de você. Consultas médicas, exames laboratoriais e de imagem em 4 unidades no Maranhão.',
  keywords: [
    'clínica médica',
    'consultas médicas',
    'exames laboratoriais',
    'exames de imagem',
    'Pedreiras MA',
    'Igarapé Grande MA',
    'Poção de Pedra MA',
    'Joselândia MA',
    'Maranhão',
    'saúde',
    'médico',
    'cardiologia',
    'dermatologia',
    'pediatria',
    'ginecologia',
    'ortopedia',
    'clínico geral',
  ],
  authors: [{ name: 'Clínica Leão XIII' }],
  creator: 'Clínica Leão XIII',
  publisher: 'Clínica Leão XIII',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://clinicaleaoxiii.com.br',
    siteName: 'Clínica Leão XIII',
    title: 'Clínica Leão XIII — Saúde e tecnologia mais perto de você',
    description:
      'Consultas médicas, exames laboratoriais e de imagem em 4 unidades no Maranhão. Agende sua consulta online.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Clínica Leão XIII — Saúde e tecnologia mais perto de você',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clínica Leão XIII — Saúde e tecnologia mais perto de você',
    description:
      'Consultas médicas, exames laboratoriais e de imagem em 4 unidades no Maranhão.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://clinicaleaoxiii.com.br',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1B63A3' },
    { media: '(prefers-color-scheme: dark)', color: '#063E84' },
  ],
}

// ─────────────────────────────────────────────
// Structured Data
// ─────────────────────────────────────────────

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: 'Clínica Leão XIII',
  description: 'Consultas médicas, exames laboratoriais e de imagem em 4 unidades no Maranhão.',
  url: 'https://clinicaleaoxiii.com.br',
  telephone: '+55-99-3642-7578',
  email: 'contato@clinicaleaoxiii.com.br',
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: 'Av. Rio Branco, 838A',
      addressLocality: 'Pedreiras',
      addressRegion: 'MA',
      addressCountry: 'BR',
    },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '07:00',
      closes: '12:00',
    },
  ],
  sameAs: ['https://instagram.com/clinicaleaoxiii'],
}

// ─────────────────────────────────────────────
// Root Layout
// ─────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${figtree.variable} ${notoSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to external origins used in the page */}
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://www.youtube-nocookie.com" />
        <link rel="dns-prefetch" href="https://biodataweb.net" />
        <link rel="dns-prefetch" href="https://wa.me" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#f0f7ff] text-[#0a1628] font-body antialiased" suppressHydrationWarning>
        <CustomCursor />
        <CookieBanner />
        <div id="theme-root" className="flex flex-col min-h-screen">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          {children}
        </div>
      </body>
    </html>
  )
}
