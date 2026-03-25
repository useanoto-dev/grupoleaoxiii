import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Página não encontrada',
  description: 'A página que você procura não foi encontrada.',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-[#f0f7ff]">
      <div className="text-center max-w-md">
        <p className="font-heading font-bold text-[#1B63A3] text-7xl mb-4">404</p>
        <h1 className="font-heading text-2xl font-bold text-[#0a1628] mb-3">
          Página não encontrada
        </h1>
        <p className="font-body text-sm text-[#64748b] mb-8 leading-relaxed">
          A página que você procura não existe ou foi movida.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1B63A3] text-white font-body font-semibold text-sm hover:bg-[#2472B6] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B63A3]/50"
        >
          Voltar ao início
        </Link>
      </div>
    </main>
  )
}
