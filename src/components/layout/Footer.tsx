import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'

const navLinks = [
  { label: 'Início', href: '/' },
  { label: 'Sobre a Clínica', href: '/sobre' },
  { label: 'Trabalhe Conosco', href: '/trabalhe-conosco' },
  { label: 'Convênios', href: '/convenios' },
  { label: 'Contato', href: '/contato' },
]

const serviceLinks = [
  { label: 'Consultas Médicas', href: '/consultas-medicas' },
  { label: 'Exames mais comuns', href: '/exames' },
  { label: 'Convênios', href: '/convenios' },
]

const units = [
  {
    name: 'Pedreiras',
    address: 'Av. Rio Branco, 838A – Centro',
    city: 'Pedreiras – MA',
    phone: '(99) 3642-7578',
  },
  {
    name: 'Igarapé Grande',
    address: 'Av. João Carvalho, 67 – Centro',
    city: 'Igarapé Grande – MA',
    phone: '(99) 3642-7578',
  },
  {
    name: 'Poção de Pedra',
    address: 'Av. Manoel Máximo, 48 – Centro',
    city: 'Poção de Pedra – MA',
    phone: '(99) 3642-7578',
  },
  {
    name: 'Joselândia',
    address: 'Rua Dr. José Falcão – Centro',
    city: 'Joselândia – MA',
    phone: '(99) 3642-7578',
  },
]

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

const linkClass = cn(
  'text-white/70 hover:text-white transition-colors duration-200',
  'font-body text-sm leading-relaxed',
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded'
)

export function Footer() {
  return (
    <footer
      className="bg-[#0A2540] text-white/80"
      aria-label="Rodapé do site"
    >
      {/* Main Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Column 1: Brand + Social */}
          <div className="flex flex-col gap-5">
            <Link
              href="/"
              className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-lg w-fit"
              aria-label="Clínica Leão XIII - Voltar ao início"
            >
              <Image
                src="/logo%20branca.png"
                alt="Clínica Leão XIII"
                width={208}
                height={78}
                className="h-14 w-auto object-contain group-hover:opacity-90 transition-opacity duration-200"
              />
            </Link>

            <p className="text-sm text-white/60 font-body leading-relaxed max-w-xs">
              Cuidando da sua saúde com excelência, tecnologia e humanização.
              Há mais de 20 anos ao lado de você e sua família.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/clinicaleaoxiii"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-lg',
                  'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white',
                  'transition-all duration-200',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40',
                  'cursor-pointer'
                )}
                aria-label="Instagram da Clínica Leão XIII"
              >
                <InstagramIcon className="h-4.5 w-4.5" />
              </a>
              <a
                href="https://facebook.com/clinicaleaoxiii"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-lg',
                  'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white',
                  'transition-all duration-200',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40',
                  'cursor-pointer'
                )}
                aria-label="Facebook da Clínica Leão XIII"
              >
                <FacebookIcon className="h-4.5 w-4.5" />
              </a>
              <a
                href={`https://wa.me/5599981905654?text=${encodeURIComponent(
                  'Olá! Gostaria de agendar uma consulta.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-lg',
                  'bg-white/10 text-white/70 hover:bg-[#25D366]/30 hover:text-[#25D366]',
                  'transition-all duration-200',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40',
                  'cursor-pointer'
                )}
                aria-label="WhatsApp da Clínica Leão XIII"
              >
                <WhatsAppIcon className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Links Rápidos */}
          <div className="flex flex-col gap-4">
            <h3 className="font-heading text-sm font-semibold text-white uppercase tracking-wider">
              Links Rápidos
            </h3>
            <ul className="flex flex-col gap-2" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Serviços */}
          <div className="flex flex-col gap-4">
            <h3 className="font-heading text-sm font-semibold text-white uppercase tracking-wider">
              Serviços
            </h3>
            <ul className="flex flex-col gap-2" role="list">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA Block */}
            <div className="mt-2 rounded-xl bg-white/10 border border-white/20 p-4">
              <p className="text-sm font-medium text-white font-body mb-2">
                Agende sua consulta
              </p>
              <p className="text-xs text-white/60 font-body mb-3">
                Atendimento rápido e humanizado.
              </p>
              <a
                href={`https://wa.me/5599981905654?text=${encodeURIComponent(
                  'Olá! Gostaria de agendar uma consulta.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-lg px-3 py-2',
                  'bg-cta text-white text-xs font-medium font-body',
                  'hover:bg-cta/90 transition-colors duration-200',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-cta/50',
                  'cursor-pointer'
                )}
              >
                <WhatsAppIcon className="h-3.5 w-3.5" />
                Agendar pelo WhatsApp
              </a>
            </div>
          </div>

          {/* Column 4: Unidades */}
          <div className="flex flex-col gap-4">
            <h3 className="font-heading text-sm font-semibold text-white uppercase tracking-wider">
              Nossas Unidades
            </h3>
            <ul className="flex flex-col gap-4" role="list">
              {units.map((unit) => (
                <li key={unit.name} className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-white font-body">
                    {unit.name}
                  </span>
                  <span className="text-xs text-white/60 font-body leading-snug">
                    {unit.address}
                  </span>
                  <span className="text-xs text-white/60 font-body">
                    {unit.city}
                  </span>
                  <a
                    href={`tel:${unit.phone.replace(/\D/g, '')}`}
                    className={cn(
                      'text-xs text-blue-300 hover:text-white font-medium font-body',
                      'transition-colors duration-200 w-fit',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded'
                    )}
                  >
                    {unit.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-white/50 font-body">
              &copy; 2026 Clínica Leão XIII. Todos os direitos reservados.
            </p>
            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-4">
              <p className="text-xs text-white/40 font-body">
                CNPJ: 00.000.000/0001-00
              </p>
              <p className="text-xs text-white/40 font-body">
                CRM-MA: 0000 | CFM
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
