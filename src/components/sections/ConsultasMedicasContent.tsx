'use client'

import * as React from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Stethoscope,
  Activity,
  Bone,
  Wind,
  Heart,
  Microscope,
  Brain,
  Scan,
  Baby,
  Leaf,
  Mic,
  Headphones,
  ArrowRight,
  CalendarCheck,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────

const AGENDAR_URL =
  'https://biodataweb.net/leao302/recursosCliente/agendaPaciente'

const specialties = [
  {
    id: 'clinica-geral',
    name: 'Clínica Geral',
    description:
      'Atendimento amplo para diagnóstico, prevenção e encaminhamento para especialistas.',
    icon: Stethoscope,
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    id: 'gastroenterologia',
    name: 'Gastroenterologia',
    description:
      'Cuidado especializado do sistema digestivo, incluindo esôfago, estômago e intestinos.',
    icon: Activity,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    id: 'reumatologia',
    name: 'Reumatologia',
    description:
      'Diagnóstico e tratamento de doenças autoimunes e do aparelho locomotor.',
    icon: Activity,
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
  },
  {
    id: 'ortopedia',
    name: 'Ortopedia',
    description:
      'Tratamento de lesões e doenças do sistema músculo-esquelético.',
    icon: Bone,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
  },
  {
    id: 'pneumologia',
    name: 'Pneumologia',
    description:
      'Especialidade voltada para doenças do aparelho respiratório e pulmões.',
    icon: Wind,
    iconBg: 'bg-cyan-100',
    iconColor: 'text-cyan-600',
  },
  {
    id: 'geriatria',
    name: 'Geriatria',
    description:
      'Atenção integral à saúde do idoso com abordagem humanizada e preventiva.',
    icon: Heart,
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600',
  },
  {
    id: 'endocrinologia',
    name: 'Endocrinologia',
    description:
      'Tratamento de distúrbios hormonais como diabetes, tireoide e obesidade.',
    icon: Microscope,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
  {
    id: 'urologia',
    name: 'Urologia',
    description:
      'Cuidados com o sistema urinário e saúde masculina com diagnóstico preciso.',
    icon: Microscope,
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-600',
  },
  {
    id: 'neurologia',
    name: 'Neurologia',
    description:
      'Diagnóstico e tratamento de doenças do sistema nervoso central e periférico.',
    icon: Brain,
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
  },
  {
    id: 'psiquiatria',
    name: 'Psiquiatria',
    description:
      'Saúde mental com avaliação, diagnóstico e acompanhamento psiquiátrico.',
    icon: Brain,
    iconBg: 'bg-fuchsia-100',
    iconColor: 'text-fuchsia-600',
  },
  {
    id: 'cardiologia',
    name: 'Cardiologia',
    description:
      'Prevenção, diagnóstico e tratamento de doenças do coração e vasos sanguíneos.',
    icon: Heart,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
  },
  {
    id: 'dermatologia',
    name: 'Dermatologia',
    description:
      'Cuidados com a pele, cabelos e unhas — do diagnóstico ao tratamento estético.',
    icon: Scan,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
  },
  {
    id: 'ginecologia',
    name: 'Ginecologia e Obstetrícia',
    description:
      'Saúde da mulher em todas as fases da vida, do pré-natal ao acompanhamento ginecológico.',
    icon: Baby,
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
  },
  {
    id: 'nutricao',
    name: 'Nutrição',
    description:
      'Orientação nutricional personalizada para saúde, emagrecimento e doenças crônicas.',
    icon: Leaf,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  {
    id: 'psicologia',
    name: 'Psicologia',
    description:
      'Apoio psicológico e psicoterapia para saúde emocional e bem-estar mental.',
    icon: Brain,
    iconBg: 'bg-sky-100',
    iconColor: 'text-sky-600',
  },
  {
    id: 'fonoaudiologia',
    name: 'Fonoaudiologia',
    description:
      'Avaliação e reabilitação da fala, voz, audição e deglutição.',
    icon: Mic,
    iconBg: 'bg-lime-100',
    iconColor: 'text-lime-600',
  },
  {
    id: 'pediatria',
    name: 'Pediatria',
    description:
      'Atenção integral à saúde infantil com profissionais especializados e cuidadosos.',
    icon: Baby,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-500',
  },
  {
    id: 'otorrino',
    name: 'Otorrinolaringologia',
    description:
      'Diagnóstico e tratamento de doenças do ouvido, nariz e garganta.',
    icon: Headphones,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-500',
  },
] as const

// ─────────────────────────────────────────────
// Card
// ─────────────────────────────────────────────

interface SpecialtyCardProps {
  specialty: (typeof specialties)[number]
  index: number
}

function SpecialtyCard({ specialty, index }: SpecialtyCardProps) {
  const Icon = specialty.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        'group bg-white rounded-2xl p-6 border border-border/60 shadow-sm',
        'hover:shadow-md hover:-translate-y-1 hover:border-primary/20',
        'transition-all duration-300 flex flex-col'
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          'flex h-12 w-12 items-center justify-center rounded-xl mb-4',
          'transition-transform duration-300 group-hover:scale-110',
          specialty.iconBg
        )}
      >
        <Icon
          className={cn('h-6 w-6', specialty.iconColor)}
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <h3 className="font-heading text-base font-semibold text-[#0a1628] mb-2">
        {specialty.name}
      </h3>
      <p className="font-body text-sm text-muted leading-relaxed flex-1 mb-4">
        {specialty.description}
      </p>

      {/* CTA */}
      <a
        href={AGENDAR_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-lg',
          'bg-primary/10 text-primary font-body text-sm font-medium',
          'hover:bg-primary hover:text-white',
          'transition-all duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50'
        )}
        aria-label={`Agendar consulta de ${specialty.name}`}
      >
        Agendar
        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </a>
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────

export function ConsultasMedicasContent() {
  const gridRef = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(gridRef, { once: false, margin: '-80px' })

  return (
    <>
      {/* ── Hero ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#013A6E] to-[#0a1628] py-20 md:py-28">
        <div className="absolute inset-0 opacity-[0.06]" aria-hidden="true">
          <svg className="w-full h-full">
            <defs>
              <pattern
                id="cm-cross"
                x="0"
                y="0"
                width="48"
                height="48"
                patternUnits="userSpaceOnUse"
              >
                <rect x="20" y="8" width="8" height="32" rx="2" fill="white" />
                <rect x="8" y="20" width="32" height="8" rx="2" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cm-cross)" />
          </svg>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center pt-12">
          <Badge className="mb-4 px-4 py-1.5 bg-white/15 text-white border-white/20 text-sm">
            Especialidades
          </Badge>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            Consultas Médicas
          </h1>
          <p className="font-body text-lg text-white/75 leading-relaxed">
            Mais de 18 especialidades disponíveis com profissionais qualificados
            e atendimento humanizado no interior do Maranhão.
          </p>
        </div>
      </div>

      {/* ── Specialties grid ── */}
      <section
        className="py-16 md:py-24 bg-background"
        aria-labelledby="specialties-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              id="specialties-heading"
              className="font-heading text-3xl sm:text-4xl font-bold text-[#0a1628] mb-4"
            >
              Nossas especialidades
            </h2>
            <p className="font-body text-base sm:text-lg text-muted max-w-xl mx-auto">
              Encontre o especialista certo para cuidar da sua saúde
            </p>
          </div>

          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isInView &&
              specialties.map((specialty, index) => (
                <SpecialtyCard
                  key={specialty.id}
                  specialty={specialty}
                  index={index}
                />
              ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-16 bg-gradient-to-br from-[#0a1628] via-[#013A6E] to-[#0a1628]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <CalendarCheck
            className="mx-auto h-12 w-12 text-white/60 mb-6"
            aria-hidden="true"
          />
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
            Pronto para cuidar da sua saúde?
          </h2>
          <p className="font-body text-lg text-white/75 leading-relaxed mb-8">
            Agende sua consulta online de forma rápida e fácil. Escolha o
            especialista e o horário que melhor se encaixa na sua rotina.
          </p>
          <a
            href={AGENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'inline-flex items-center gap-2 h-14 px-10 rounded-xl',
              'bg-white text-[#0a1628] font-body font-semibold text-base',
              'hover:bg-white/90 hover:shadow-lg hover:-translate-y-0.5',
              'transition-all duration-200',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50'
            )}
          >
            <CalendarCheck className="h-5 w-5" aria-hidden="true" />
            Agende sua consulta agora
          </a>
        </div>
      </section>
    </>
  )
}
