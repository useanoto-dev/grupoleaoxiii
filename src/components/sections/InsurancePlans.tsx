'use client'

import * as React from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, CreditCard } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useSafeReducedMotion } from '@/lib/useSafeReducedMotion'

// ─────────────────────────────────────────────
// Planos reais da Clínica Leão XIII
// ─────────────────────────────────────────────

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
  {
    id: 'particular',
    name: 'Atendimento Particular',
    logo: null,
  },
] as const

// ─────────────────────────────────────────────
// Orbiting mesh-gradient background
// multiply blend for light bg
// ─────────────────────────────────────────────

function MeshBackground({ reduced }: { reduced: boolean }) {
  if (reduced) return null
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div className="aurora-blob svc-blob-1" />
      <div className="aurora-blob svc-blob-2" />
    </div>
  )
}

// ─────────────────────────────────────────────
// Single logo card for the marquee
// ─────────────────────────────────────────────

interface MarqueeCardProps {
  plan: typeof plans[number]
  /** aria-hidden when this is a duplicated clone */
  ariaHidden?: boolean
}

function MarqueeCard({ plan, ariaHidden }: MarqueeCardProps) {
  return (
    <div
      aria-hidden={ariaHidden}
      className="shrink-0 bg-white rounded-2xl border border-[#d0dde8] px-8 py-5 flex flex-col items-center justify-center gap-2"
      style={{ boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)', minWidth: '180px' }}
    >
      {plan.logo ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={plan.logo}
          alt={`Logo ${plan.name}`}
          width={120}
          height={48}
          style={{ width: 120, height: 48, objectFit: 'contain' }}
        />
      ) : (
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1B63A3]/10">
          <CreditCard className="h-6 w-6 text-[#1B63A3]" aria-hidden="true" />
        </div>
      )}
      <span className="font-body text-xs font-semibold text-[#0a1628] text-center leading-tight">
        {plan.name}
      </span>
    </div>
  )
}

// ─────────────────────────────────────────────
// Infinite Marquee
// ─────────────────────────────────────────────

function InfiniteMarquee() {
  const [paused, setPaused] = React.useState(false)

  // Duplicate 4x for seamless loop (translateX(-50%) lands back at start)
  const items = [...plans, ...plans, ...plans, ...plans]

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        maskImage:
          'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        style={{
          animation: `marquee 20s linear infinite`,
          animationPlayState: paused ? 'paused' : 'running',
          display: 'flex',
          gap: '1.5rem',
          width: 'max-content',
        }}
      >
        {items.map((plan, index) => (
          <MarqueeCard
            key={`${plan.id}-${index}`}
            plan={plan}
            ariaHidden={index >= plans.length}
          />
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Static grid fallback (reduced motion)
// ─────────────────────────────────────────────

function StaticGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
      {plans.map((plan) => (
        <div
          key={plan.id}
          className="bg-white rounded-2xl border border-[#d0dde8] px-8 py-5 flex flex-col items-center justify-center gap-2"
          style={{ boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)' }}
        >
          {plan.logo ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={plan.logo}
              alt={`Logo ${plan.name}`}
              width={120}
              height={48}
              style={{ width: 120, height: 48, objectFit: 'contain' }}
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1B63A3]/10">
              <CreditCard className="h-6 w-6 text-[#1B63A3]" aria-hidden="true" />
            </div>
          )}
          <span className="font-body text-xs font-semibold text-[#0a1628] text-center leading-tight">
            {plan.name}
          </span>
        </div>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────

export function InsurancePlans() {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const reduced = useSafeReducedMotion()

  return (
    <section
      ref={ref}
      className="relative py-16 md:py-24 bg-background overflow-hidden"
      aria-labelledby="insurance-heading"
    >
      <MeshBackground reduced={reduced} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header — enters from left */}
        <div className="flex flex-col items-center text-center mb-12 lg:mb-16">
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, x: -80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <Badge variant="default" className="mb-4 px-4 py-1.5 text-sm">
              Convênios
            </Badge>
          </motion.div>

          <motion.h2
            id="insurance-heading"
            className="font-heading text-3xl sm:text-4xl font-bold text-[#0a1628] mb-4 leading-tight"
            initial={reduced ? { opacity: 0 } : { opacity: 0, x: -80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            Planos de saúde aceitos
          </motion.h2>

          <motion.p
            className="font-body text-base text-muted mb-8 leading-relaxed max-w-xl"
            initial={reduced ? { opacity: 0 } : { opacity: 0, x: -80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          >
            Trabalhamos com convênios selecionados para garantir que o seu
            atendimento seja acessível e sem burocracia. Consulte a sua unidade
            mais próxima.
          </motion.p>

          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, x: -80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <Button asChild variant="outline" className="font-medium">
              <Link href="/convenios">
                Mais informações
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Logos — infinite marquee or static grid */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          {reduced ? <StaticGrid /> : <InfiniteMarquee />}
        </motion.div>

      </div>
    </section>
  )
}

export default InsurancePlans
