import type { Metadata } from 'next'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { ContactSection } from '@/components/sections/ContactSection'

export const metadata: Metadata = {
  title: 'Agendar Consulta',
  description:
    'Agende sua consulta online em qualquer unidade da Clínica Leão XIII. Pedreiras, Igarapé Grande, Poção de Pedra e Joselândia.',
}

export default function ContatoPage() {
  return (
    <PageWrapper>
      <ContactSection />
    </PageWrapper>
  )
}
