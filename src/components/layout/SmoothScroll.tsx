'use client'

import * as React from 'react'

// Native scroll is GPU-accelerated. CSS scroll-behavior: smooth (in globals.css)
// handles smooth anchoring without JS overhead.
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
