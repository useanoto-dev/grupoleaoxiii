import type { Metadata } from 'next'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { ExamesContent } from '@/components/sections/ExamesContent'

export const metadata: Metadata = {
  title: 'Exames mais comuns',
  description:
    'Conheça os exames laboratoriais e de imagem realizados na Clínica Leão XIII — hemograma, ultrassonografia, mamografia, tomografia e muito mais.',
}

export default function ExamesPage() {
  return (
    <PageWrapper>
      <ExamesContent />
    </PageWrapper>
  )
}
