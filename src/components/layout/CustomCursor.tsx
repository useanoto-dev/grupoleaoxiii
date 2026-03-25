'use client'

import * as React from 'react'
import { motion, useMotionValue } from 'framer-motion'

function isInteractive(el: EventTarget | null): boolean {
  if (!(el instanceof Element)) return false
  return !!el.closest(
    'a, button, [role="button"], input, textarea, select, label, [tabindex]:not([tabindex="-1"])'
  )
}

export function CustomCursor() {
  const [visible,  setVisible]  = React.useState(false)
  const [hovering, setHovering] = React.useState(false)
  const [clicking, setClicking] = React.useState(false)

  // Posição do mouse — começa fora da tela
  const mouseX = useMotionValue(-1000)
  const mouseY = useMotionValue(-1000)

  // Não renderiza em touch/tablet (pointer: coarse)
  const [hasMouse] = React.useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
  )

  React.useEffect(() => {
    if (!hasMouse) return

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setVisible(true)
      setHovering(isInteractive(e.target))
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)
    const onDown  = () => setClicking(true)
    const onUp    = () => setClicking(false)

    document.addEventListener('mousemove',  onMove,  { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mousedown',  onDown)
    document.addEventListener('mouseup',    onUp)

    return () => {
      document.removeEventListener('mousemove',  onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mousedown',  onDown)
      document.removeEventListener('mouseup',    onUp)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMouse])

  if (!hasMouse) return null

  return (
    <>
      {/* ── Dot ── segue o mouse exato */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: mouseX, y: mouseY }}
        initial={{ opacity: 0, scale: 1 }}
        animate={{
          opacity: visible ? 1 : 0,
          scale:   clicking ? 0.5 : hovering ? 0 : 1,
        }}
        transition={{
          opacity: { duration: 0.15 },
          scale:   { duration: 0.12, ease: 'easeOut' },
        }}
      >
        <div
          style={{
            transform: 'translate(-50%, -50%)',
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: '#1B63A3',
          }}
        />
      </motion.div>
    </>
  )
}

export default CustomCursor
