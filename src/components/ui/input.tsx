import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error = false, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-11 w-full rounded-lg border bg-surface px-4 py-2',
          'text-sm text-text font-body',
          'placeholder:text-muted',
          'transition-all duration-200',
          'focus:outline-none focus:ring-2',
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50',
          error
            ? [
                'border-red-500',
                'focus:border-red-500 focus:ring-red-500/20',
              ].join(' ')
            : [
                'border-border',
                'focus:border-primary focus:ring-primary/20',
              ].join(' '),
          className
        )}
        ref={ref}
        aria-invalid={error ? true : undefined}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
