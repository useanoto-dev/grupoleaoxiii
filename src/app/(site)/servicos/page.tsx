import type { Metadata } from 'next'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { Services } from '@/components/sections/Services'

export const metadata: Metadata = {
  title: 'Serviços',
  description: 'Consultas médicas, exames laboratoriais, exames de imagem e muito mais. Conheça todos os serviços da Clínica Leão XIII.',
}

export default function ServicosPage() {
  return (
    <PageWrapper>
      <div className="pt-20">
        <Services />
      </div>
    </PageWrapper>
  )
}
