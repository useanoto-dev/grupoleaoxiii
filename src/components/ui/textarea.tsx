import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error = false, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[120px] w-full rounded-lg border bg-surface px-4 py-3',
          'text-sm text-text font-body',
          'placeholder:text-muted',
          'resize-y',
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
Textarea.displayName = 'Textarea'

export { Textarea }
