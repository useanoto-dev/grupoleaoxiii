'use client'

import * as React from 'react'
import {
  FlaskConical,
  Scan,
  Heart,
  Activity,
  ChevronDown,
  CalendarCheck,
  Clock,
  FileText,
  ClipboardList,
  Microscope,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

// ─────────────────────────────────────────────
// Types & Data
// ─────────────────────────────────────────────

const AGENDAR_URL =
  'https://biodataweb.net/leao302/recursosCliente/agendaPaciente'

interface ExamDetail {
  procedure: string
  duration: string
  result: string
  preparation: string
}

interface Exam {
  id: string
  name: string
  icon: React.ElementType
  iconBg: string
  iconColor: string
  detail?: ExamDetail
}

const laboratoriais: Exam[] = [
  {
    id: 'hemograma',
    name: 'Hemograma Completo',
    icon: FlaskConical,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    detail: {
      procedure: 'Coleta de sangue por punção venosa periférica.',
      duration: '5–10 minutos',
      result: 'Disponível no mesmo dia',
      preparation:
        'Jejum de 3 horas recomendado. Informe ao técnico todos os medicamentos em uso.',
    },
  },
  {
    id: 'colesterol',
    name: 'Colesterol Total e Frações (HDL/LDL/VLDL)',
    icon: FlaskConical,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    id: 't4-livre',
    name: 'T4 Livre',
    icon: FlaskConical,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    id: 'urocultura',
    name: 'Urocultura com Antibiograma',
    icon: FlaskConical,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    id: 'covid',
    name: 'COVID-19 (RT-PCR / Sorológico)',
    icon: Microscope,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    detail: {
      procedure: 'Coleta por swab nasal (RT-PCR) ou punção venosa (sorológico).',
      duration: '5–10 minutos',
      result: 'Disponível no mesmo dia',
      preparation: 'Sem preparo especial. Informe sintomas recentes ao atendente.',
    },
  },
]

const imagem: Exam[] = [
  {
    id: 'mamografia',
    name: 'Mamografia',
    icon: Scan,
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
    detail: {
      procedure:
        'Compressão da mama entre as placas do mamógrafo para obter imagens de raios X.',
      duration: '15–30 minutos',
      result: 'Laudo disponível no mesmo dia',
      preparation:
        'Use roupas de duas peças. Prefira agendar entre o 5º e o 10º dia após o início da menstruação. Não use desodorante ou talco no dia.',
    },
  },
  {
    id: 'raio-x',
    name: 'Raio-X',
    icon: Scan,
    iconBg: 'bg-cyan-100',
    iconColor: 'text-cyan-600',
  },
  {
    id: 'ultrassonografia',
    name: 'Ultrassonografia',
    icon: Scan,
    iconBg: 'bg-cyan-100',
    iconColor: 'text-cyan-600',
  },
  {
    id: 'tomografia',
    name: 'Tomografia Computadorizada',
    icon: Scan,
    iconBg: 'bg-cyan-100',
    iconColor: 'text-cyan-600',
  },
  {
    id: 'densitometria',
    name: 'Densitometria Óssea',
    icon: Scan,
    iconBg: 'bg-cyan-100',
    iconColor: 'text-cyan-600',
  },
  {
    id: 'endoscopia',
    name: 'Endoscopia Digestiva',
    icon: Scan,
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-600',
  },
  {
    id: 'ecocardiograma',
    name: 'Ecocardiograma',
    icon: Heart,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-500',
  },
  {
    id: 'eletrocardiograma',
    name: 'Eletrocardiograma',
    icon: Activity,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
  },
]

// ─────────────────────────────────────────────
// Accordion exam card
// ─────────────────────────────────────────────

function ExamCard({ exam }: { exam: Exam }) {
  const [open, setOpen] = React.useState(false)
  const Icon = exam.icon
  const hasDetail = !!exam.detail

  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-border/60 shadow-sm',
        'hover:shadow-md transition-all duration-300',
        open && 'border-primary/20 shadow-md'
      )}
    >
      <button
        type="button"
        onClick={() => hasDetail && setOpen((v) => !v)}
        className={cn(
          'w-full flex items-center gap-4 p-5 text-left',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-2xl',
          !hasDetail && 'cursor-default'
        )}
        aria-expanded={hasDetail ? open : undefined}
        aria-controls={hasDetail ? `exam-detail-${exam.id}` : undefined}
      >
        {/* Icon */}
        <div
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-xl shrink-0',
            exam.iconBg
          )}
        >
          <Icon
            className={cn('h-5 w-5', exam.iconColor)}
            aria-hidden="true"
          />
        </div>

        {/* Name */}
        <span className="font-heading text-sm font-semibold text-[#0a1628] flex-1">
          {exam.name}
        </span>

        {/* Chevron (only when detail exists) */}
        {hasDetail && (
          <ChevronDown
            className={cn(
              'h-4 w-4 text-muted shrink-0 transition-transform duration-300',
              open && 'rotate-180'
            )}
            aria-hidden="true"
          />
        )}
      </button>

      {/* Expandable detail */}
      {hasDetail && exam.detail && (
        <div
          id={`exam-detail-${exam.id}`}
          role="region"
          aria-label={`Detalhes de ${exam.name}`}
          className={cn(
            'overflow-hidden transition-all duration-300',
            open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="px-5 pb-5 pt-0 border-t border-border/40">
            <dl className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 shrink-0 mt-0.5">
                  <ClipboardList className="h-4 w-4 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <dt className="font-body text-xs text-muted mb-0.5">Procedimento</dt>
                  <dd className="font-body text-sm text-text leading-relaxed">
                    {exam.detail.procedure}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 shrink-0 mt-0.5">
                  <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <dt className="font-body text-xs text-muted mb-0.5">Duração</dt>
                  <dd className="font-body text-sm text-text">{exam.detail.duration}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 shrink-0 mt-0.5">
                  <FileText className="h-4 w-4 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <dt className="font-body text-xs text-muted mb-0.5">Resultado</dt>
                  <dd className="font-body text-sm text-text">{exam.detail.result}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 shrink-0 mt-0.5">
                  <ClipboardList className="h-4 w-4 text-amber-600" aria-hidden="true" />
                </div>
                <div>
                  <dt className="font-body text-xs text-muted mb-0.5">Preparação</dt>
                  <dd className="font-body text-sm text-text leading-relaxed">
                    {exam.detail.preparation}
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────
// Category section
// ─────────────────────────────────────────────

function ExamCategory({
  title,
  exams,
  badgeLabel,
}: {
  title: string
  exams: Exam[]
  badgeLabel: string
}) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium font-body">
          {badgeLabel}
        </span>
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#0a1628]">
          {title}
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {exams.map((exam) => (
          <ExamCard key={exam.id} exam={exam} />
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────

export function ExamesContent() {
  return (
    <>
      {/* ── Hero ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#013A6E] to-[#0a1628] py-20 md:py-28">
        <div className="absolute inset-0 opacity-[0.06]" aria-hidden="true">
          <svg className="w-full h-full">
            <defs>
              <pattern
                id="ex-cross"
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
            <rect width="100%" height="100%" fill="url(#ex-cross)" />
          </svg>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center pt-12">
          <Badge className="mb-4 px-4 py-1.5 bg-white/15 text-white border-white/20 text-sm">
            Laboratório &amp; Imagem
          </Badge>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            Exames mais comuns
          </h1>
          <p className="font-body text-lg text-white/75 leading-relaxed">
            Exames laboratoriais e de imagem com resultados rápidos e
            equipamentos modernos — tudo em um só lugar.
          </p>
        </div>
      </div>

      {/* ── Exam listings ── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Note about expandable cards */}
          <p className="font-body text-sm text-muted text-center">
            Clique nos exames destacados para ver detalhes de procedimento,
            duração, resultado e preparação.
          </p>

          <ExamCategory
            title="Exames Laboratoriais"
            badgeLabel="Laboratório"
            exams={laboratoriais}
          />

          <ExamCategory
            title="Exames de Imagem"
            badgeLabel="Imagem"
            exams={imagem}
          />
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
            Agende seus exames agora
          </h2>
          <p className="font-body text-lg text-white/75 leading-relaxed mb-8">
            Resultados rápidos e confiáveis. Agende online e escolha o melhor
            horário para você.
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
            Agendar exame
          </a>
        </div>
      </section>
    </>
  )
}
