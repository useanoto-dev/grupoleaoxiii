'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

// ─────────────────────────────────────────────
// Medical cross SVG background
// ─────────────────────────────────────────────

function CrossPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.05]"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="ph-cross"
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
      <rect width="100%" height="100%" fill="url(#ph-cross)" />
    </svg>
  )
}

// ─────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────

interface Crumb {
  label: string
  href?: string
}

interface PageHeroProps {
  badge?: string
  title: string
  subtitle?: string
  breadcrumb?: Crumb[]
  className?: string
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export function PageHero({
  badge,
  title,
  subtitle,
  breadcrumb,
  className,
}: PageHeroProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden bg-gradient-to-br from-[#063E84] via-primary to-[#0a1628]',
        'pt-28 pb-14 md:pt-36 md:pb-16',
        className
      )}
    >
      <CrossPattern />

      {/* Soft blobs */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-white/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        {breadcrumb && breadcrumb.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs text-white/50 font-body mb-5"
          >
            <Link
              href="/"
              className="hover:text-white/80 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded"
            >
              Início
            </Link>
            {breadcrumb.map((crumb, i) => (
              <React.Fragment key={i}>
                <ChevronRight className="h-3 w-3" aria-hidden="true" />
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-white/80 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/80">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {/* Badge */}
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-4"
          >
            <Badge className="px-4 py-1.5 bg-white/15 text-white border-white/25 text-sm">
              {badge}
            </Badge>
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16 }}
            className="font-body text-lg text-white/75 leading-relaxed max-w-2xl"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  )
}

export default PageHero
