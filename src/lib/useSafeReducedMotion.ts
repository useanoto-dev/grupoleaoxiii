'use client'

import * as React from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Safe version of framer-motion's useReducedMotion that prevents SSR/client
 * hydration mismatches. Returns false consistently during server rendering and
 * initial hydration, then updates to the real preference after mount.
 */
export function useSafeReducedMotion(): boolean {
  const [mounted, setMounted] = React.useState(false)
  const reduced = useReducedMotion()
  React.useEffect(() => { setMounted(true) }, [])
  return mounted ? (reduced ?? false) : false
}
