import type { Metadata } from 'next'
import { PageWrapper } from '@/components/layout/PageWrapper'

export const metadata: Metadata = {
  title: 'Médicos',
  description: 'Conheça a equipe médica da Clínica Leão XIII. Profissionais qualificados em diversas especialidades.',
}

export default function MedicosPage() {
  return (
    <PageWrapper>
      <section className="py-20 md:py-32 bg-background pt-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 font-body">
            Nossa equipe
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#1a2e08] mb-6">
            Nossos Médicos
          </h1>
          <p className="font-body text-lg text-muted leading-relaxed">
            Profissionais altamente qualificados e dedicados ao seu cuidado.
            Em breve você poderá conhecer toda a nossa equipe aqui.
          </p>
        </div>
      </section>
    </PageWrapper>
  )
}
