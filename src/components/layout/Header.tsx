'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, ChevronDown, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'

type DropdownChild = { label: string; href: string }

type NavItem =
  | { label: string; href: string; dropdown?: undefined }
  | { label: string; href?: undefined; dropdown: DropdownChild[] }

const navItems: NavItem[] = [
  { label: 'Início', href: '/' },
  {
    label: 'Nossa Clínica',
    dropdown: [
      { label: 'Sobre a Clínica', href: '/sobre' },
      { label: 'Trabalhe Conosco', href: '/trabalhe-conosco' },
    ],
  },
  { label: 'Convênios', href: '/convenios' },
  { label: 'Consultas Médicas', href: '/consultas-medicas' },
  { label: 'Exames', href: '/exames' },
  { label: 'Contato', href: '/contato' },
]

function useScrollPosition() {
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrolled
}

export function Header() {
  const pathname = usePathname()
  const scrolled = useScrollPosition()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [dropdownOpen, setDropdownOpen] = React.useState(false)

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  React.useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const isActive = (item: NavItem): boolean => {
    if (item.dropdown) {
      return item.dropdown.some((child) => pathname.startsWith(child.href))
    }
    if (item.href === '/') return pathname === '/'
    return pathname.startsWith(item.href)
  }

  const isChildActive = (href: string) => pathname.startsWith(href)

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* Camada de fundo desktop — fade suave via framer-motion */}
        <motion.div
          className="absolute inset-0 hidden lg:block pointer-events-none"
          animate={{
            backgroundColor: scrolled ? 'rgba(255,255,255,0.96)' : 'rgba(255,255,255,0)',
            boxShadow: scrolled
              ? '0 1px 0 0 rgba(0,0,0,0.08), 0 2px 12px 0 rgba(0,0,0,0.06)'
              : '0 0 0 0 rgba(0,0,0,0)',
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ backdropFilter: scrolled ? 'blur(12px)' : 'none' }}
          aria-hidden="true"
        />
        {/* Fundo mobile — sempre branco */}
        <div
          className="absolute inset-0 lg:hidden pointer-events-none bg-white/96 shadow-[0_1px_0_0_rgba(0,0,0,0.08)]"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-20">
            {/* Logo */}
            <Link
              href="/"
              className={cn(
                'flex items-center group focus:outline-none rounded-lg',
                scrolled
                  ? 'focus-visible:ring-2 focus-visible:ring-primary/50'
                  : 'focus-visible:ring-2 focus-visible:ring-white/50'
              )}
              aria-label="Clínica Leão XIII - Página inicial"
            >
              {/* Mobile: sempre logo colorida */}
              <Image
                src="/logo%20color.webp"
                alt="Clínica Leão XIII"
                width={208}
                height={78}
                className="h-14 w-auto object-contain group-hover:opacity-90 transition-opacity duration-300 lg:hidden"
                priority
              />
              {/* Desktop: branca no topo, colorida ao scrollar */}
              <Image
                src={scrolled ? '/logo%20color.webp' : '/logo%20branca.png'}
                alt="Clínica Leão XIII"
                width={208}
                height={78}
                className="h-14 w-auto object-contain group-hover:opacity-90 transition-opacity duration-300 hidden lg:block"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden lg:flex items-center gap-1"
              aria-label="Navegação principal"
            >
              {navItems.map((item, index) => {
                if (item.dropdown) {
                  const active = isActive(item)
                  return (
                    <div
                      key={`dropdown-${index}`}
                      className="relative"
                      onMouseEnter={() => setDropdownOpen(true)}
                      onMouseLeave={() => setDropdownOpen(false)}
                    >
                      <button
                        type="button"
                        className={cn(
                          'relative flex items-center gap-1 px-3 py-2 text-sm font-medium font-body rounded-lg',
                          'transition-colors duration-200',
                          'focus:outline-none focus-visible:ring-2',
                          scrolled
                            ? [
                                'focus-visible:ring-primary/50',
                                active
                                  ? 'text-primary'
                                  : 'text-text hover:text-primary hover:bg-primary/5',
                              ]
                            : [
                                'focus-visible:ring-white/50',
                                active
                                  ? 'text-white'
                                  : 'text-white/85 hover:text-white hover:bg-white/10',
                              ]
                        )}
                        aria-haspopup="true"
                        aria-expanded={dropdownOpen}
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            'h-3.5 w-3.5 transition-transform duration-200',
                            dropdownOpen && 'rotate-180'
                          )}
                          aria-hidden="true"
                        />
                        {active && (
                          <motion.div
                            layoutId="activeNavLink"
                            className={cn(
                              'absolute bottom-0 left-3 right-3 h-0.5 rounded-full',
                              scrolled ? 'bg-primary' : 'bg-white'
                            )}
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          />
                        )}
                      </button>

                      <AnimatePresence>
                        {dropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.18, ease: 'easeOut' }}
                            className="bg-white rounded-xl shadow-elevated border border-border/60 p-2 absolute top-full mt-2 left-0 min-w-[200px]"
                          >
                            {item.dropdown.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={cn(
                                  'block px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/5 hover:text-primary transition-colors',
                                  isChildActive(child.href)
                                    ? 'text-primary bg-primary/5'
                                    : 'text-text'
                                )}
                                aria-current={isChildActive(child.href) ? 'page' : undefined}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                }

                // Regular nav item
                const active = isActive(item)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'relative px-3 py-2 text-sm font-medium font-body rounded-lg',
                      'transition-colors duration-200',
                      'focus:outline-none focus-visible:ring-2',
                      scrolled
                        ? [
                            'focus-visible:ring-primary/50',
                            active
                              ? 'text-primary'
                              : 'text-text hover:text-primary hover:bg-primary/5',
                          ]
                        : [
                            'focus-visible:ring-white/50',
                            active
                              ? 'text-white'
                              : 'text-white/85 hover:text-white hover:bg-white/10',
                          ]
                    )}
                    aria-current={active ? 'page' : undefined}
                  >
                    {item.label}
                    {active && (
                      <motion.div
                        layoutId="activeNavLink"
                        className={cn(
                          'absolute bottom-0 left-3 right-3 h-0.5 rounded-full',
                          scrolled ? 'bg-primary' : 'bg-white'
                        )}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Desktop Right Actions */}
            <div className="hidden lg:flex items-center gap-2.5">
              {/* Resultados — destaque primário */}
              <a
                href="https://portal.worklabweb.com.br/resultados-on-line/178"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'flex items-center gap-2 text-sm font-semibold font-body px-4 py-2 rounded-lg',
                  'transition-all duration-200',
                  'focus:outline-none focus-visible:ring-2',
                  scrolled
                    ? 'bg-primary/10 text-primary hover:bg-primary/20 focus-visible:ring-primary/50'
                    : 'bg-white/15 text-white hover:bg-white/25 backdrop-blur-sm focus-visible:ring-white/50'
                )}
                aria-label="Ver resultados de exames online"
              >
                <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
                Ver Resultados
              </a>

              {/* Agendar Consulta */}
              <Button
                asChild
                variant="cta"
                size="default"
                className="font-medium"
              >
                <a
                  href="https://biodataweb.net/leao302/recursosCliente/agendaPaciente"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Agendar Consulta
                </a>
              </Button>
            </div>

            {/* Mobile Hamburger */}
            <button
              type="button"
              className={cn(
                'lg:hidden flex h-11 w-11 items-center justify-center rounded-lg',
                'transition-colors duration-200 cursor-pointer',
                'focus:outline-none focus-visible:ring-2',
                // Mobile: sempre cor escura (fundo branco). Desktop: segue scroll.
                scrolled
                  ? 'text-text hover:bg-primary/5 hover:text-primary focus-visible:ring-primary/50'
                  : 'text-text hover:bg-primary/5 hover:text-primary focus-visible:ring-primary/50 lg:text-white lg:hover:bg-white/10 lg:focus-visible:ring-white/50'
              )}
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {mobileOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={cn(
              'fixed inset-0 top-16 z-40 lg:hidden',
              'bg-white/98 backdrop-blur-md',
              'overflow-y-auto'
            )}
            aria-label="Menu mobile"
          >
            <div className="mx-auto max-w-7xl px-4 py-6 flex flex-col gap-6">
              {/* Nav Links */}
              <nav
                className="flex flex-col gap-1"
                aria-label="Navegação mobile"
              >
                {navItems.map((item, index) => {
                  if (item.dropdown) {
                    return (
                      <motion.div
                        key={`mobile-dropdown-${index}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.2 }}
                      >
                        {/* Section header — non-clickable */}
                        <span className="flex items-center px-4 py-2 text-xs font-semibold uppercase tracking-wider text-text/50 select-none">
                          {item.label}
                        </span>
                        {item.dropdown.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              'flex items-center pl-6 pr-4 py-3 text-base font-medium font-body rounded-xl',
                              'transition-colors duration-200',
                              'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
                              isChildActive(child.href)
                                ? 'bg-primary/10 text-primary'
                                : 'text-text hover:bg-primary/5 hover:text-primary'
                            )}
                            aria-current={isChildActive(child.href) ? 'page' : undefined}
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )
                  }

                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          'flex items-center px-4 py-3 text-base font-medium font-body rounded-xl',
                          'transition-colors duration-200',
                          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
                          isActive(item)
                            ? 'bg-primary/10 text-primary'
                            : 'text-text hover:bg-primary/5 hover:text-primary'
                        )}
                        aria-current={isActive(item) ? 'page' : undefined}
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>

              {/* Divider */}
              <div className="h-px bg-border" />

              {/* Actions */}
              <motion.div
                className="flex flex-col gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.2 }}
              >
                <Button asChild variant="cta" size="lg" className="w-full font-medium">
                  <a
                    href="https://biodataweb.net/leao302/recursosCliente/agendaPaciente"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                  >
                    Agendar Consulta
                  </a>
                </Button>

                <a
                  href="https://portal.worklabweb.com.br/resultados-on-line/178"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex h-12 items-center justify-center gap-2 rounded-xl',
                    'bg-primary/10 border border-primary/20 text-primary font-medium font-body text-base',
                    'hover:bg-primary/15 transition-colors duration-200',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
                    'cursor-pointer'
                  )}
                  aria-label="Ver resultados de exames online"
                >
                  <ExternalLink className="h-4.5 w-4.5" aria-hidden="true" />
                  Ver Resultados
                </a>

                <a
                  href={`https://wa.me/5599981905654?text=${encodeURIComponent(
                    'Olá! Gostaria de agendar uma consulta.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'flex h-12 items-center justify-center gap-2.5 rounded-xl',
                    'bg-[#25D366] text-white font-medium font-body text-base',
                    'transition-opacity duration-200 hover:opacity-90',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/50',
                    'cursor-pointer'
                  )}
                  aria-label="Fale conosco no WhatsApp"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Fale pelo WhatsApp
                </a>

                <a
                  href="tel:+5599981905654"
                  className={cn(
                    'flex h-12 items-center justify-center gap-2.5 rounded-xl',
                    'border border-border text-text font-medium font-body text-base',
                    'hover:bg-primary/5 hover:text-primary hover:border-primary/30',
                    'transition-colors duration-200',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
                    'cursor-pointer'
                  )}
                  aria-label="Ligar para a clínica"
                >
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  (99) 9 8190-5654
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
