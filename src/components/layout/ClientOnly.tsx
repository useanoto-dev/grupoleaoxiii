'use client'

import dynamic from 'next/dynamic'

export const CustomCursor = dynamic(() => import('./CustomCursor'), { ssr: false })
export const CookieBanner = dynamic(() => import('./CookieBanner'), { ssr: false })
