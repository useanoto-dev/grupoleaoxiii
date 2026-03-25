'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'

const WHATSAPP_URL =
  'https://wa.me/5599981905654?text=' +
  encodeURIComponent('Olá! Gostaria de agendar uma consulta.')

function useShowFAB() {
  const [show, setShow] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      // Show FAB after user scrolls past the hero (approx. one viewport height)
      setShow(window.scrollY > window.innerHeight * 0.6)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return show
}

export function WhatsAppFAB() {
  const show = useShowFAB()
  const [tooltipVisible, setTooltipVisible] = React.useState(false)

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="whatsapp-fab"
          initial={{ opacity: 0, scale: 0.5, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 40 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
          }}
          className="fixed bottom-6 right-6 z-50"
        >
          {/* Tooltip */}
          <AnimatePresence>
            {tooltipVisible && (
              <motion.div
                key="tooltip"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.15 }}
                className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap"
                role="tooltip"
              >
                <div className="rounded-lg bg-gray-900 px-3 py-1.5 shadow-lg">
                  <p className="text-xs font-medium text-white font-body">
                    Fale conosco no WhatsApp
                  </p>
                </div>
                {/* Arrow */}
                <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pulse Ring */}
          <span
            className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30"
            aria-hidden="true"
          />

          {/* Button */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#20b858] hover:shadow-xl active:scale-95 transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/50 cursor-pointer"
            aria-label="Fale conosco no WhatsApp"
            onMouseEnter={() => setTooltipVisible(true)}
            onMouseLeave={() => setTooltipVisible(false)}
            onFocus={() => setTooltipVisible(true)}
            onBlur={() => setTooltipVisible(false)}
          >
            <WhatsAppIcon className="h-7 w-7" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default WhatsAppFAB
