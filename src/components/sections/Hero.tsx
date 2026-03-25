'use client'

import * as React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import { useSafeReducedMotion } from '@/lib/useSafeReducedMotion'

// ─────────────────────────────────────────────
// Stats data — numeric + formatter
// ─────────────────────────────────────────────

const statsData = [
  {
    num: 10000,
    format: (n: number) => {
      if (n >= 1000) {
        const t = Math.floor(n / 1000)
        const r = n % 1000
        return `${t}.${String(r).padStart(3, '0')}`
      }
      return `${n}`
    },
    suffix: '+',
    label: 'PACIENTES ATENDIDOS',
  },
  {
    num: 18,
    format: (n: number) => `${n}`,
    suffix: '+',
    label: 'ESPECIALIDADES MÉDICAS',
  },
  {
    num: 4,
    format: (n: number) => `${n}`,
    suffix: '',
    label: 'UNIDADES NO MARANHÃO',
  },
  {
    num: 20,
    format: (n: number) => `${n}`,
    suffix: '+',
    label: 'ANOS DE EXPERIÊNCIA',
  },
] as const

function StatNumber({ stat }: { stat: typeof statsData[number] }) {
  return (
    <>
      {stat.format(stat.num)}
      {stat.suffix}
    </>
  )
}

// ─────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────

export function Hero() {
  const shouldReduceMotion = useSafeReducedMotion()
  const [videoReady, setVideoReady] = React.useState(false)

  React.useEffect(() => { setVideoReady(true) }, [])

  // Ref na section inteira — ativa counters assim que entra na viewport
  const sectionRef = React.useRef<HTMLElement>(null)
  // Scroll parallax — watermark sobe enquanto o usuário desce
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const watermarkY = useTransform(scrollYProgress, [0, 1], ['0%', shouldReduceMotion ? '0%' : '-35%'])

  const dur = shouldReduceMotion ? 0 : 0.65

  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: dur, delay: shouldReduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] as const },
    }),
  }

  const fadeRight = {
    hidden: { opacity: 0, x: 32 },
    visible: (delay = 0) => ({
      opacity: 1,
      x: 0,
      transition: { duration: dur, delay: shouldReduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] as const },
    }),
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#013A6E]"
      aria-label="Seção principal"
    >
      {/* ── YouTube video background ──────────── */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div
          className={[
            'absolute top-1/2 left-1/2',
            '-translate-x-1/2 -translate-y-1/2',
            'w-screen h-[56.25vw]',
            'min-h-full min-w-[177.78vh]',
            'pointer-events-none',
          ].join(' ')}
        >
          {videoReady && (
            <iframe
              src="https://www.youtube.com/embed/nL47gz4bw4A?autoplay=1&mute=1&loop=1&playlist=nL47gz4bw4A&start=160&controls=0&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&disablekb=1&playsinline=1&enablejsapi=0"
              allow="autoplay; fullscreen"
              className="w-full h-full"
              style={{ border: 'none' }}
              title="Vídeo de fundo da Clínica Leão XIII"
            />
          )}
        </div>

        {/* Fallback escuro */}
        <div className="absolute inset-0 -z-10 bg-[#013A6E]" />

        {/* Overlay escuro para contraste com o conteúdo */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#013A6E]/85 via-[#063E84]/70 to-[#013A6E]/88" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#013A6E]/60 via-transparent to-transparent" />
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(1,58,110,0.55)_100%)]" />
      </div>

      {/* ── Large text watermark — parallax ──── */}
      <motion.div
        aria-hidden="true"
        className="absolute right-0 top-1/2 z-0 pointer-events-none select-none overflow-hidden"
        style={{
          writingMode: 'vertical-rl',
          rotate: '180deg',
          translateY: '-50%',
          y: watermarkY,
        }}
      >
        <span
          className="font-heading font-bold text-white"
          style={{
            fontSize: '20vw',
            lineHeight: 1,
            opacity: 0.08,
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap',
          }}
        >
          LEÃO XIII
        </span>
      </motion.div>

      {/* ── Main content ─────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20 md:pt-32 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left column ─────────────────── */}
          <div>
            {/* Eyebrow */}
            <motion.p
              variants={fadeUp}
              custom={0}
              initial="hidden"
              animate="visible"
              className="text-white/50 text-xs tracking-[0.3em] uppercase font-body mb-6"
            >
              PEDREIRAS · IGARAPÉ GRANDE · POÇÃO DE PEDRA · JOSELÂNDIA
            </motion.p>

            {/* H1 — reveal por linha */}
            <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] mb-6">
              {(['Saúde que', 'transforma', 'vidas'] as const).map((line, i) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.8, delay: shouldReduceMotion ? 0 : 0.08 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {line}{i === 2 && <span className="text-[#7ab8e8]">.</span>}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              custom={0.2}
              initial="hidden"
              animate="visible"
              className="text-white/60 text-base md:text-lg font-body leading-relaxed mt-6 max-w-sm"
            >
              Atendimento humanizado com tecnologia de ponta. Consultas, exames
              laboratoriais e de imagem em 4 unidades no Maranhão.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              custom={0.3}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap items-center gap-3 mt-8"
            >
              {/* Primary — Agendar Consulta */}
              <a
                href="https://biodataweb.net/leao302/recursosCliente/agendaPaciente"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'inline-flex h-12 items-center justify-center px-7 rounded-full',
                  'bg-cta text-white text-sm font-semibold',
                  'hover:bg-[#056316] transition-all duration-200',
                  'shadow-[0_4px_24px_rgba(6,132,25,0.35)]',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60',
                )}
              >
                Agendar Consulta
              </a>

              {/* Secondary — Ver Resultados */}
              <a
                href="https://portal.worklabweb.com.br/resultados-on-line/178"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'inline-flex h-12 items-center justify-center px-7 rounded-full',
                  'border border-white/25 text-white/90 text-sm font-semibold',
                  'hover:bg-white/10 hover:border-white/40 transition-all duration-200',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50',
                )}
              >
                Ver Resultados
              </a>

              {/* WhatsApp icon-only */}
              <a
                href={`https://wa.me/5599981905654?text=${encodeURIComponent(
                  'Olá! Gostaria de agendar uma consulta.',
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Fale conosco pelo WhatsApp"
                className={cn(
                  'h-12 w-12 rounded-full flex items-center justify-center',
                  'bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366]',
                  'hover:bg-[#25D366]/25 transition-all duration-200',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/50',
                )}
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>
            </motion.div>

            {/* Mobile stats — 2×2 grid, hidden on lg+ */}
            <motion.div
              variants={fadeUp}
              custom={0.4}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 gap-4 pt-8 mt-8 border-t border-white/10 lg:hidden"
            >
              {statsData.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="font-heading font-bold text-[#7ab8e8] text-3xl leading-none tabular-nums">
                    <StatNumber stat={stat} />
                  </span>
                  <span className="font-body text-white/50 text-xs tracking-widest uppercase mt-1.5 leading-snug">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right column — editorial stats ── */}
          <div className="hidden lg:flex flex-col justify-center gap-0 items-end">
            {statsData.map((stat, i) => (
              <React.Fragment key={stat.label}>
                <motion.div
                  variants={fadeRight}
                  custom={0.2 + i * 0.08}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col items-end py-7 w-full max-w-xs"
                >
                  <span className="font-heading font-bold text-[#7ab8e8] text-5xl md:text-6xl leading-none tabular-nums">
                    <StatNumber stat={stat} />
                  </span>
                  <span className="font-body text-white/40 text-xs tracking-widest uppercase mt-2">
                    {stat.label}
                  </span>
                </motion.div>

                {/* Divider — not after last item */}
                {i < statsData.length - 1 && (
                  <div className="w-full max-w-xs h-px bg-white/10" />
                )}
              </React.Fragment>
            ))}
          </div>

        </div>
      </div>

      {/* ── Scroll indicator ─────────────────── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 cursor-default"
        animate={shouldReduceMotion ? {} : { y: [0, 7, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
        style={{ visibility: shouldReduceMotion ? 'hidden' : 'visible' }}
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-white/35 font-body">
          Scroll
        </span>
        <ChevronDown className="h-4 w-4 text-white/35" />
      </motion.div>

      {/* ── Bottom wave ──────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 z-10" aria-hidden="true">
        <svg
          viewBox="0 0 1440 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-16 text-white"
          preserveAspectRatio="none"
        >
          <path
            d="M0 64L48 58.7C96 53.3 192 42.7 288 42.7C384 42.7 480 53.3 576 56C672 58.7 768 53.3 864 48C960 42.7 1056 37.3 1152 37.3C1248 37.3 1344 42.7 1392 45.3L1440 48V64H1392C1344 64 1248 64 1152 64C1056 64 960 64 864 64C768 64 672 64 576 64C480 64 384 64 288 64C192 64 96 64 48 64H0Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  )
}

export default Hero
