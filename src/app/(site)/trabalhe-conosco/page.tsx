import type { Metadata } from 'next'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { TrabalheConoscoHero } from '@/components/sections/TrabalheConoscoHero'
import { TrabalheConoscoForm } from '@/components/sections/TrabalheConoscoForm'

export const metadata: Metadata = {
  title: 'Trabalhe Conosco',
  description:
    'Faça parte do banco de talentos da Clínica Leão XIII. Envie seu currículo e contribua com a saúde de milhares de pessoas no interior do Maranhão.',
}

export default function TrabalheConoscoPage() {
  return (
    <PageWrapper>
      <TrabalheConoscoHero />
      <TrabalheConoscoForm />
    </PageWrapper>
  )
}
