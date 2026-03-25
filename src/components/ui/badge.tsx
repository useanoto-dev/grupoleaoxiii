import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  [
    'inline-flex items-center justify-center',
    'rounded-full px-2.5 py-0.5',
    'text-xs font-medium font-body',
    'transition-colors duration-200',
    'border',
  ].join(' '),
  {
    variants: {
      variant: {
        default: [
          'bg-primary/10 text-primary border-primary/20',
          'hover:bg-primary/20',
        ].join(' '),
        success: [
          'bg-cta/10 text-green-700 border-cta/20',
          'hover:bg-cta/20',
        ].join(' '),
        warning: [
          'bg-amber-50 text-amber-700 border-amber-200',
          'hover:bg-amber-100',
        ].join(' '),
        destructive: [
          'bg-red-50 text-red-700 border-red-200',
          'hover:bg-red-100',
        ].join(' '),
        outline: [
          'bg-transparent text-text border-border',
          'hover:bg-gray-50',
        ].join(' '),
        secondary: [
          'bg-secondary/10 text-text border-secondary/20',
          'hover:bg-secondary/20',
        ].join(' '),
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
