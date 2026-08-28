import * as React from "react"
import { cn } from "../../lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div className="space-y-1 w-full">
        <input
          type={type}
          className={cn(
            "flex h-11 w-full rounded-xl border border-coab-gray-light bg-white px-3 py-2 text-sm placeholder:text-coab-gray focus:outline-none focus:ring-2 focus:ring-coab-blue disabled:cursor-not-allowed disabled:opacity-50 transition-shadow",
            error && "border-coab-red focus:ring-coab-red",
            className
          )}
          ref={ref}
          aria-invalid={!!error}
          {...props}
        />
        {error && <p className="text-sm text-coab-red font-medium">{error}</p>}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
