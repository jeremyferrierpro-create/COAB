import * as React from "react"
import { cn } from "../../lib/utils"

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="flex items-start space-x-2">
        <input
          type="checkbox"
          ref={ref}
          className={cn(
            "peer h-5 w-5 shrink-0 rounded-sm border border-coab-gray-light bg-white focus:outline-none focus:ring-2 focus:ring-coab-blue disabled:cursor-not-allowed disabled:opacity-50 accent-coab-blue",
            error && "border-coab-red focus:ring-coab-red",
            className
          )}
          aria-invalid={!!error}
          {...props}
        />
      </div>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
