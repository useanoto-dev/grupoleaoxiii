import type { Metadata } from 'next'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { ConsultasMedicasContent } from '@/components/sections/ConsultasMedicasContent'

export const metadata: Metadata = {
  title: 'Consultas Médicas',
  description:
    'Mais de 18 especialidades médicas disponíveis na Clínica Leão XIII. Agende sua consulta com profissionais qualificados no interior do Maranhão.',
}

export default function ConsultasMedicasPage() {
  return (
    <PageWrapper>
      <ConsultasMedicasContent />
    </PageWrapper>
  )
}
