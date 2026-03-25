import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded',
        'bg-gradient-to-r from-gray-100 to-gray-200',
        className
      )}
      aria-hidden="true"
      {...props}
    />
  )
}

export { Skeleton }
