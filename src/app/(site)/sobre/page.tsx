import type { Metadata } from 'next'
import Image from 'next/image'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { Badge } from '@/components/ui/badge'
import { Heart, Eye, Target, Users, ShieldCheck, Lightbulb, Handshake } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sobre a Clínica',
  description:
    'Conheça a Clínica Leão XIII. Há mais de 20 anos sendo referência em saúde ambulatorial e diagnóstica no interior do Maranhão.',
}

const stats = [
  { value: '20+',     label: 'Anos de Experiência' },
  { value: '4',       label: 'Unidades no MA' },
  { value: '18+',     label: 'Especialidades' },
  { value: '10.000+', label: 'Pacientes Atendidos' },
]

const values = [
  { icon: ShieldCheck, title: 'Integridade',         description: 'Honestidade e conformidade legal em todas as nossas ações.' },
  { icon: Heart,       title: 'Humanismo',           description: 'Consideração genuína pelo bem-estar de cada paciente.' },
  { icon: Users,       title: 'Trabalho em Equipe',  description: 'Colaboração, responsabilidade social e foco no paciente.' },
  { icon: Lightbulb,   title: 'Inovação',            description: 'Tecnologia de ponta a serviço da saúde e do diagnóstico.' },
  { icon: Handshake,   title: 'Autorresponsabilidade', description: 'Parceria ativa entre clínica e paciente no cuidado da saúde.' },
]

const services = [
  'Exames laboratoriais com resultado em 24h',
  'Tomografia Computadorizada',
  'Raio-X',
  'Densitometria Óssea',
  'Mamografia',
  'Endoscopia Digestiva',
  'Ecocardiograma',
  'Ultrassonografia',
  'Eletrocardiograma (ECG)',
  'Consultas médicas em 18+ especialidades',
]

const BUILDING_PHOTO_1 = 'https://clinicaleaoxiii.com.br/wp-content/uploads/2021/09/IMG_9456.jpg'
const BUILDING_PHOTO_2 = 'https://clinicaleaoxiii.com.br/wp-content/uploads/2021/09/DSC_0433.jpg'

export default function SobrePage() {
  return (
    <PageWrapper>

      {/* ── HERO — foto real de fundo ──────────────────── */}
      <div className="relative overflow-hidden py-24 md:py-36 min-h-[420px] flex items-center">
        <div className="absolute inset-0" aria-hidden="true">
          <Image src={BUILDING_PHOTO_1} alt="Fachada da Clínica Leão XIII" fill sizes="100vw"
            className="object-cover object-center" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/80 via-[#013A6E]/70 to-[#0a1628]/85" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/60 via-transparent to-[#0a1628]/30" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,22,40,0.6)_100%)]" />
        </div>
        <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
          <svg className="w-full h-full">
            <defs>
              <pattern id="sb-cross" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
                <rect x="20" y="8" width="8" height="32" rx="2" fill="white" />
                <rect x="8" y="20" width="32" height="8" rx="2" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#sb-cross)" />
          </svg>
        </div>
        <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 text-center pt-12">
          <Badge className="mb-4 px-4 py-1.5 bg-white/15 text-white border-white/20 text-sm backdrop-blur-sm">
            Nossa história
          </Badge>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Sobre a Clínica Leão XIII
          </h1>
          <p className="font-body text-lg text-white/80 leading-relaxed">
            Há mais de 20 anos sendo referência em saúde ambulatorial e diagnóstica no interior do Maranhão.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10" aria-hidden="true">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg"
            className="w-full h-10" preserveAspectRatio="none">
            <path d="M0 40L48 36.7C96 33.3 192 26.7 288 26.7C384 26.7 480 33.3 576 35C672 36.7 768 33.3 864 30C960 26.7 1056 23.3 1152 23.3C1248 23.3 1344 26.7 1392 28.3L1440 30V40H0Z" fill="white" />
          </svg>
        </div>
      </div>

      {/* ── STATS BAR ─────────────────────────────────── */}
      <div className="bg-white border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-heading text-3xl sm:text-4xl font-bold text-primary mb-1">{s.value}</p>
                <p className="font-body text-sm text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── QUEM SOMOS + FOTOS ────────────────────────── */}
      <div className="bg-background py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="default" className="mb-4 px-4 py-1.5 text-sm">Quem somos</Badge>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#0a1628] mb-6 leading-tight">
                Cuidando de você com excelência
              </h2>
              <p className="font-body text-base sm:text-lg text-muted leading-relaxed mb-4">
                A Clínica Leão XIII, situada na Avenida Rio Branco, nº 528, centro de Pedreiras (MA),
                oferece diversas especialidades médicas, exames laboratoriais e exames de imagem
                para atender nossos pacientes com qualidade e conforto.
              </p>
              <p className="font-body text-base sm:text-lg text-muted leading-relaxed">
                Com 4 unidades distribuídas entre Pedreiras, Igarapé Grande, Poção de Pedra e
                Joselândia, levamos saúde de qualidade cada vez mais perto de você e sua família.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-elevated">
                <Image src={BUILDING_PHOTO_1} alt="Fachada moderna da Clínica Leão XIII"
                  fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover object-center" />
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-elevated mt-6">
                <Image src={BUILDING_PHOTO_2} alt="Vista externa da Clínica Leão XIII"
                  fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover object-center" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MISSÃO E VISÃO — faixa full-width escura + glass cards ── */}
      <div className="relative overflow-hidden py-20 md:py-28">

        {/* Foto real da fachada como fundo com overlay forte */}
        <div className="absolute inset-0" aria-hidden="true">
          <Image src={BUILDING_PHOTO_2} alt="" fill sizes="100vw"
            className="object-cover object-center" />
          {/* Overlay azul escuro cobrindo quase tudo — deixa só um toque da foto */}
          <div className="absolute inset-0 bg-[#0a1628]/92" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#063E84]/40 via-[#013A6E]/20 to-transparent" />
        </div>

        {/* Orbs de luz azul no fundo */}
        <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-[#2472B6]/20 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute -bottom-32 right-1/4 w-80 h-80 rounded-full bg-[#1B63A3]/15 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#063E84]/10 blur-3xl pointer-events-none" aria-hidden="true" />

        {/* Conteúdo */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-white/40 text-xs tracking-[0.25em] uppercase font-body mb-3">
              Nossa essência
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white leading-tight">
              Missão &amp; Visão
            </h2>
          </div>

          {/* Glass cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">

            {/* Missão */}
            <div
              className="rounded-2xl p-8 flex flex-col gap-6"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow:
                  '0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
              }}
            >
              {/* Ícone */}
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl shrink-0"
                style={{
                  background: 'rgba(122, 184, 232, 0.15)',
                  border: '1px solid rgba(122, 184, 232, 0.25)',
                }}
              >
                <Target className="h-7 w-7 text-[#7ab8e8]" aria-hidden="true" />
              </div>

              {/* Texto */}
              <div>
                <h3 className="font-heading text-2xl font-bold text-white mb-3">
                  Missão
                </h3>
                <p className="font-body text-white/70 leading-relaxed">
                  Prestar serviços de saúde com atendimento humanizado, de alta qualidade
                  diagnóstica, priorizando o bem-estar do paciente e trazendo conforto em
                  cada consulta e exame.
                </p>
              </div>

              {/* Linha decorativa na base */}
              <div
                className="mt-auto h-px"
                style={{
                  background: 'linear-gradient(90deg, rgba(122,184,232,0.4) 0%, rgba(122,184,232,0.05) 100%)',
                }}
              />
            </div>

            {/* Visão */}
            <div
              className="rounded-2xl p-8 flex flex-col gap-6"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow:
                  '0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
              }}
            >
              {/* Ícone */}
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl shrink-0"
                style={{
                  background: 'rgba(122, 184, 232, 0.15)',
                  border: '1px solid rgba(122, 184, 232, 0.25)',
                }}
              >
                <Eye className="h-7 w-7 text-[#7ab8e8]" aria-hidden="true" />
              </div>

              {/* Texto */}
              <div>
                <h3 className="font-heading text-2xl font-bold text-white mb-3">
                  Visão
                </h3>
                <p className="font-body text-white/70 leading-relaxed">
                  Ser referência na prestação de serviços ambulatoriais e diagnósticos
                  no interior do Maranhão, reconhecida pela excelência no atendimento
                  e pela inovação em saúde.
                </p>
              </div>

              {/* Linha decorativa na base */}
              <div
                className="mt-auto h-px"
                style={{
                  background: 'linear-gradient(90deg, rgba(122,184,232,0.4) 0%, rgba(122,184,232,0.05) 100%)',
                }}
              />
            </div>

          </div>
        </div>

        {/* Wave de saída */}
        <div className="absolute bottom-0 left-0 right-0 z-10" aria-hidden="true">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg"
            className="w-full h-10" preserveAspectRatio="none">
            <path d="M0 40L48 36.7C96 33.3 192 26.7 288 26.7C384 26.7 480 33.3 576 35C672 36.7 768 33.3 864 30C960 26.7 1056 23.3 1152 23.3C1248 23.3 1344 26.7 1392 28.3L1440 30V40H0Z" fill="#f4f8fc" />
          </svg>
        </div>
      </div>

      {/* ── VALORES ───────────────────────────────────── */}
      <div className="bg-background py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <Badge variant="default" className="mb-4 px-4 py-1.5 text-sm">Nossos valores</Badge>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#0a1628]">
              O que nos guia
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => {
              const Icon = v.icon
              return (
                <div key={v.title}
                  className="bg-white rounded-2xl p-6 border border-border/60 shadow-sm flex gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 shrink-0 mt-0.5">
                    <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-bold text-[#0a1628] mb-1">{v.title}</h3>
                    <p className="font-body text-sm text-muted leading-relaxed">{v.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── SERVIÇOS ──────────────────────────────────── */}
      <div className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <Badge variant="default" className="mb-4 px-4 py-1.5 text-sm">O que oferecemos</Badge>
            <h2 className="font-heading text-3xl font-bold text-[#0a1628]">Serviços disponíveis</h2>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
            {services.map((s) => (
              <li key={s} className="flex items-center gap-3 font-body text-sm text-text">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 shrink-0">
                  <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

    </PageWrapper>
  )
}
