import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Página não encontrada',
  description: 'A página que você procura não foi encontrada.',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <main id="main-content" className="min-h-screen flex flex-col items-center justify-center px-4 bg-background">
      <div className="text-center max-w-md">
        <p className="font-heading font-bold text-primary text-7xl mb-4">404</p>
        <h1 className="font-heading text-2xl font-bold text-text mb-3">
          Página não encontrada
        </h1>
        <p className="font-body text-sm text-muted mb-8 leading-relaxed">
          A página que você procura não existe ou foi movida.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-body font-semibold text-sm hover:bg-secondary transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
        >
          Voltar ao início
        </Link>
      </div>
    </main>
  )
}
