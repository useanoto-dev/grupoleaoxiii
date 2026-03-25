import type { Metadata } from 'next'
import Image from 'next/image'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { Badge } from '@/components/ui/badge'
import { Phone, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Convênios',
  description:
    'Conheça os planos de saúde aceitos na Clínica Leão XIII: Bradesco Saúde, UniHosp Saúde, Humana Saúde e Medplan. Atendemos também por conta própria.',
}

const plans = [
  {
    id: 'bradesco',
    name: 'Bradesco Saúde',
    logo: '/logos-convenio/bradesco.svg',
  },
  {
    id: 'unihosp',
    name: 'UniHosp Saúde',
    logo: '/logos-convenio/unihosp.webp',
  },
  {
    id: 'humana',
    name: 'Humana Saúde',
    logo: '/logos-convenio/humana-saude.webp',
  },
  {
    id: 'medplan',
    name: 'Medplan',
    logo: '/logos-convenio/medplan.png',
  },
] as const

const locations = [
  { name: 'Pedreiras', address: 'Av. Rio Branco, 838A' },
  { name: 'Igarapé Grande', address: 'Av. João Carvalho, 67' },
  { name: 'Poção de Pedra', address: 'Av. Manoel Máximo, 48' },
  { name: 'Joselândia', address: 'Rua Dr. José Falcão' },
]

export default function ConveniosPage() {
  return (
    <PageWrapper>
      {/* ── Hero ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#013A6E] to-[#0a1628] py-24 md:py-32">
        <div className="absolute inset-0 opacity-[0.06]" aria-hidden="true">
          <svg className="w-full h-full">
            <defs>
              <pattern id="cv-cross" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
                <rect x="20" y="8" width="8" height="32" rx="2" fill="white" />
                <rect x="8" y="20" width="32" height="8" rx="2" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cv-cross)" />
          </svg>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Badge className="mb-4 px-4 py-1.5 bg-white/15 text-white border-white/20 text-sm">
            Convênios
          </Badge>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            Planos de saúde aceitos
          </h1>
          <p className="font-body text-lg text-white/75 leading-relaxed">
            A Clínica Leão XIII dispõe de diversas especialidades médicas, exames laboratoriais
            e exames de imagem para atender nossos pacientes com qualidade e conforto.
          </p>
        </div>
      </div>

      <div className="bg-background py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

          {/* ── Logos dos convênios ── */}
          <div>
            <div className="text-center mb-12">
              <Badge variant="default" className="mb-4 px-4 py-1.5 text-sm">
                Convênios aceitos
              </Badge>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#0a1628]">
                Trabalhamos com estes planos
              </h2>
              <p className="font-body text-base text-muted mt-3 max-w-xl mx-auto">
                Consulte a unidade mais próxima para confirmar disponibilidade do seu plano.
              </p>
            </div>

            {/* Grid de logos — destaque */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className="flex flex-col items-center justify-center gap-4 bg-white rounded-2xl border border-border/60 shadow-card px-6 py-8 hover:shadow-elevated hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative w-full h-20">
                    <Image
                      src={plan.logo}
                      alt={`Convênio ${plan.name}`}
                      fill
                      sizes="(max-width: 640px) 40vw, 200px"
                      className="object-contain"
                    />
                  </div>
                  <span className="font-body text-sm font-semibold text-text text-center leading-tight">
                    {plan.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Particular */}
            <div className="mt-6 max-w-3xl mx-auto">
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center">
                <p className="font-heading text-lg font-bold text-[#0a1628] mb-2">
                  Atendimento Particular
                </p>
                <p className="font-body text-sm text-muted">
                  Realizamos atendimento particular em todas as nossas especialidades e exames.
                  Entre em contato para saber os valores.
                </p>
              </div>
            </div>
          </div>

          {/* ── Unidades e contato ── */}
          <div>
            <div className="text-center mb-10">
              <Badge variant="default" className="mb-4 px-4 py-1.5 text-sm">
                Nossas unidades
              </Badge>
              <h2 className="font-heading text-3xl font-bold text-[#0a1628]">
                Onde nos encontrar
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {locations.map((loc) => (
                <div
                  key={loc.name}
                  className="bg-white rounded-2xl p-5 border border-border/60 shadow-card flex flex-col gap-3"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                      <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                    </div>
                    <h3 className="font-heading text-sm font-bold text-[#0a1628]">
                      {loc.name}
                    </h3>
                  </div>
                  <p className="font-body text-xs text-muted leading-relaxed">
                    {loc.address} · Centro
                  </p>
                  <a
                    href="tel:+559936427578"
                    className="flex items-center gap-1.5 font-body text-xs text-primary font-medium hover:underline underline-offset-2"
                  >
                    <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                    (99) 3642-7578
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </PageWrapper>
  )
}
