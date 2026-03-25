'use client'

import * as React from 'react'
import Image from 'next/image'
import { motion, useInView, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSafeReducedMotion } from '@/lib/useSafeReducedMotion'

// ─────────────────────────────────────────────
// Gallery data — fotos reais da Clínica Leão XIII
// ─────────────────────────────────────────────

const photos = [
  {
    id: 1,
    src: 'https://clinicaleaoxiii.com.br/wp-content/uploads/2021/09/284463d6-bc10-447b-ad9a-e8d8aa8e183e.jpg',
    alt: 'Recepção principal da Clínica Leão XIII',
    caption: 'Recepção Principal',
    tag: 'Destaque',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    id: 2,
    src: 'https://clinicaleaoxiii.com.br/wp-content/uploads/2021/09/22c85093-b297-4002-b2c2-0f99ada26366.jpg',
    alt: 'Sala de espera da clínica',
    caption: 'Sala de Espera',
    tag: null,
    span: '',
  },
  {
    id: 3,
    src: 'https://clinicaleaoxiii.com.br/wp-content/uploads/2021/09/fab4a51b-fff8-4e62-a0ac-9fe74e940327.jpg',
    alt: 'Setor de laboratório de análises clínicas',
    caption: 'Laboratório de Análises',
    tag: null,
    span: '',
  },
  {
    id: 4,
    src: 'https://clinicaleaoxiii.com.br/wp-content/uploads/2021/09/8748dd1f-bf08-4481-b641-ff39188052d3.jpg',
    alt: 'Corredor interno da clínica',
    caption: 'Área de Atendimento',
    tag: null,
    span: 'md:col-span-2',
  },
  {
    id: 5,
    src: 'https://clinicaleaoxiii.com.br/wp-content/uploads/2021/09/7c5ba91a-5c09-462e-a09d-b88c6c576b2d.jpg',
    alt: 'Equipamentos modernos de diagnóstico',
    caption: 'Equipamentos de Diagnóstico',
    tag: null,
    span: '',
  },
  {
    id: 6,
    src: 'https://clinicaleaoxiii.com.br/wp-content/uploads/2021/09/d7b9b354-d101-49b4-91b6-e8a11fdd347b.jpg',
    alt: 'Consultório médico equipado',
    caption: 'Consultório Médico',
    tag: null,
    span: '',
  },
  {
    id: 7,
    src: 'https://clinicaleaoxiii.com.br/wp-content/uploads/2021/09/66d6537d-4fd6-46a0-a13d-b2678ec38f2b.jpg',
    alt: 'Infraestrutura interna da Clínica Leão XIII',
    caption: 'Infraestrutura',
    tag: null,
    span: '',
  },
  {
    id: 8,
    src: 'https://clinicaleaoxiii.com.br/wp-content/uploads/2021/09/4d881b94-392b-4447-a112-7a7a798b7564.jpg',
    alt: 'Instalações modernas da clínica',
    caption: 'Área de Apoio',
    tag: null,
    span: '',
  },
] as const

type Photo = typeof photos[number]

// ─────────────────────────────────────────────
// Background — diagonal beams entering from corners
// multiply blend mode for white bg
// ─────────────────────────────────────────────

function GalleryBg({ reduced }: { reduced: boolean }) {
  if (reduced) return null
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">

      {/* Top-left corner beam */}
      <motion.div
        className="absolute"
        style={{
          width: 700, height: 700,
          top: '-30%', left: '-20%',
          background: 'radial-gradient(circle, rgba(27,99,163,0.07) 0%, transparent 65%)',
          filter: 'blur(70px)',
          mixBlendMode: 'multiply',
        }}
        animate={{ x: [0, 50, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Bottom-right beam */}
      <motion.div
        className="absolute"
        style={{
          width: 600, height: 600,
          bottom: '-20%', right: '-15%',
          background: 'radial-gradient(circle, rgba(36,114,182,0.06) 0%, transparent 65%)',
          filter: 'blur(80px)',
          mixBlendMode: 'multiply',
        }}
        animate={{ x: [0, -40, 0], y: [0, -35, 0], scale: [1.1, 0.9, 1.1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
      />

      {/* Center subtle glow */}
      <motion.div
        className="absolute"
        style={{
          width: 400, height: 400,
          top: '35%', left: '40%',
          background: 'radial-gradient(circle, rgba(122,184,232,0.05) 0%, transparent 65%)',
          filter: 'blur(50px)',
          mixBlendMode: 'multiply',
        }}
        animate={{ scale: [1, 1.35, 1], x: [-20, 20, -20] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />

      {/* Grain */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
          opacity: 0.022,
        }}
      />

      {/* Animated horizontal scan line */}
      <motion.div
        className="absolute left-0 right-0 h-[1px]"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(27,99,163,0.15) 50%, transparent 100%)',
        }}
        animate={{ top: ['-2%', '102%'], opacity: [0, 0.8, 0.8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 10 }}
      />
    </div>
  )
}

// ─────────────────────────────────────────────
// Photo card — alternates left / right entrance
// ─────────────────────────────────────────────

interface PhotoCardProps {
  photo: Photo
  index: number
  isInView: boolean
  reduced: boolean
  onOpen: (photo: Photo) => void
}

function PhotoCard({ photo, index, isInView, reduced, onOpen }: PhotoCardProps) {
  // Odd index → from right, even → from left; first card (big) from below
  const getInitial = () => {
    if (reduced) return { opacity: 0 }
    if (index === 0) return { opacity: 0, y: 80 }
    return index % 2 === 0
      ? { opacity: 0, x: -120 }
      : { opacity: 0, x: 120 }
  }

  // Mouse parallax on image
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const imgX = useSpring(mouseX, { stiffness: 120, damping: 20 })
  const imgY = useSpring(mouseY, { stiffness: 120, damping: 20 })

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced) return
    const rect = e.currentTarget.getBoundingClientRect()
    const cx = (e.clientX - rect.left) / rect.width - 0.5
    const cy = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(cx * 18)
    mouseY.set(cy * 12)
  }

  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      initial={getInitial()}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.075,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        'group relative overflow-hidden rounded-2xl cursor-pointer',
        'bg-slate-200',
        photo.span,
        photo.span.includes('row-span-2') ? 'min-h-[360px]' : 'min-h-[200px] md:min-h-[180px]'
      )}
      onClick={() => onOpen(photo)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="button"
      aria-label={`Ampliar: ${photo.caption}`}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpen(photo) }}
    >
      <motion.div className="absolute inset-0" style={{ x: imgX, y: imgY, scale: 1.08 }}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
        loading={index < 2 ? 'eager' : 'lazy'}
      />
      </motion.div>

      {/* Permanent gradient for legibility */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Hover overlay */}
      <div
        className={cn(
          'absolute inset-0 transition-opacity duration-400',
          'bg-gradient-to-t from-[#063E84]/90 via-[#1B63A3]/50 to-transparent',
          'opacity-0 group-hover:opacity-100'
        )}
        aria-hidden="true"
      />

      {/* Tag badge */}
      {photo.tag && (
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase bg-white/20 backdrop-blur-sm text-white border border-white/20">
            {photo.tag}
          </span>
        </div>
      )}

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
        <div className="flex items-center justify-between">
          <span className="font-heading text-sm font-semibold text-white drop-shadow-sm">
            {photo.caption}
          </span>
          <div className={cn(
            'flex h-8 w-8 items-center justify-center rounded-full',
            'bg-white/20 backdrop-blur-sm',
            'opacity-0 group-hover:opacity-100 transition-opacity duration-300'
          )}>
            <ZoomIn className="h-4 w-4 text-white" aria-hidden="true" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// Lightbox
// ─────────────────────────────────────────────

interface LightboxProps {
  photo: Photo
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

function Lightbox({ photo, onClose, onPrev, onNext }: LightboxProps) {
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, onPrev, onNext])

  React.useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={photo.caption}
    >
      <button
        className={cn(
          'absolute top-4 right-4 z-20',
          'flex h-10 w-10 items-center justify-center rounded-full',
          'bg-white/10 hover:bg-white/20 text-white/80 hover:text-white',
          'transition-all duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50'
        )}
        onClick={onClose}
        aria-label="Fechar"
      >
        <X className="h-5 w-5" />
      </button>

      <button
        className={cn(
          'absolute left-4 top-1/2 -translate-y-1/2 z-20',
          'flex h-12 w-12 items-center justify-center rounded-full',
          'bg-white/10 hover:bg-white/20 text-white/80 hover:text-white',
          'transition-all duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50'
        )}
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        aria-label="Anterior"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        className={cn(
          'absolute right-4 top-1/2 -translate-y-1/2 z-20',
          'flex h-12 w-12 items-center justify-center rounded-full',
          'bg-white/10 hover:bg-white/20 text-white/80 hover:text-white',
          'transition-all duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50'
        )}
        onClick={(e) => { e.stopPropagation(); onNext() }}
        aria-label="Próxima"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <motion.div
        key={photo.id}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-4xl mx-16 aspect-video rounded-xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(max-width: 1024px) 90vw, 900px"
          className="object-cover"
          priority
        />
        <div className="absolute bottom-0 left-0 right-0 px-5 py-3 bg-gradient-to-t from-black/70 to-transparent">
          <p className="text-white font-heading text-sm font-semibold">
            {photo.caption}
          </p>
        </div>
      </motion.div>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/40 text-xs font-body tracking-widest">
        {photo.id} / {photos.length}
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────

export function Gallery() {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const reduced = useSafeReducedMotion()

  const [activeIndex, setActiveIndex] = React.useState<number | null>(null)

  const openPhoto = React.useCallback((photo: Photo) => {
    const idx = photos.findIndex((p) => p.id === photo.id)
    setActiveIndex(idx)
  }, [])

  const closePhoto = React.useCallback(() => setActiveIndex(null), [])

  const prevPhoto = React.useCallback(() => {
    setActiveIndex((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null))
  }, [])

  const nextPhoto = React.useCallback(() => {
    setActiveIndex((i) => (i !== null ? (i + 1) % photos.length : null))
  }, [])

  return (
    <>
      <section
        ref={ref}
        className="relative py-16 md:py-24 bg-white overflow-hidden"
        aria-labelledby="gallery-heading"
      >
        <GalleryBg reduced={reduced} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header — top entrance */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <motion.div
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: -45 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-primary text-xs tracking-[0.25em] uppercase font-body font-semibold mb-2">
                Nossa Estrutura
              </p>
              <h2
                id="gallery-heading"
                className="font-heading text-3xl sm:text-4xl font-bold text-[#0a1628] leading-tight"
              >
                Conheça nosso ambiente
              </h2>
            </motion.div>
            <motion.p
              className="font-body text-sm text-muted max-w-xs sm:text-right leading-relaxed"
              initial={reduced ? { opacity: 0 } : { opacity: 0, x: 80 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              Clique nas fotos para ampliar — instalações modernas e acolhedoras
            </motion.p>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px]">
            {photos.map((photo, index) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                index={index}
                isInView={isInView}
                reduced={reduced}
                onOpen={openPhoto}
              />
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeIndex !== null && (
          <Lightbox
            photo={photos[activeIndex]}
            onClose={closePhoto}
            onPrev={prevPhoto}
            onNext={nextPhoto}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default Gallery
