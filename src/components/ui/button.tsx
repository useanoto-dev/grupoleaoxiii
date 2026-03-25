'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'font-body font-medium text-sm',
    'rounded-lg transition-all duration-200',
    'cursor-pointer select-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'whitespace-nowrap',
  ].join(' '),
  {
    variants: {
      variant: {
        default: [
          'bg-primary text-white shadow-sm',
          'hover:bg-primary/90 hover:shadow-md',
          'active:scale-[0.98]',
          'focus-visible:ring-primary',
        ].join(' '),
        cta: [
          'bg-cta text-white shadow-sm',
          'hover:bg-cta/90 hover:shadow-md',
          'active:scale-[0.98]',
          'focus-visible:ring-cta',
        ].join(' '),
        outline: [
          'border border-primary text-primary bg-transparent',
          'hover:bg-primary/5 hover:shadow-sm',
          'active:scale-[0.98]',
          'focus-visible:ring-primary',
        ].join(' '),
        ghost: [
          'bg-transparent text-text',
          'hover:bg-primary/10 hover:text-primary',
          'active:scale-[0.98]',
          'focus-visible:ring-primary',
        ].join(' '),
        link: [
          'bg-transparent text-primary underline-offset-4',
          'hover:underline',
          'focus-visible:ring-primary',
          'h-auto px-0 py-0',
        ].join(' '),
        destructive: [
          'bg-red-600 text-white shadow-sm',
          'hover:bg-red-700 hover:shadow-md',
          'active:scale-[0.98]',
          'focus-visible:ring-red-600',
        ].join(' '),
      },
      size: {
        sm: 'h-9 px-3 text-xs rounded-md',
        default: 'h-11 px-5 text-sm',
        lg: 'h-12 px-8 text-base rounded-xl',
        icon: 'h-11 w-11 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {asChild ? children : (
          <>
            {loading && (
              <Loader2
                className="animate-spin shrink-0"
                size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16}
                aria-hidden="true"
              />
            )}
            {children}
          </>
        )}
      </Comp>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
