import * as React from "react"
import { cn } from "../../lib/utils"

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string
  options: { value: string; label: string }[]
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, options, ...props }, ref) => {
    return (
      <div className="space-y-1 w-full">
        <select
          ref={ref}
          className={cn(
            "flex h-11 w-full rounded-xl border border-coab-gray-light bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-coab-blue disabled:cursor-not-allowed disabled:opacity-50 transition-shadow appearance-none",
            error && "border-coab-red focus:ring-coab-red",
            className
          )}
          aria-invalid={!!error}
          {...props}
        >
          <option value="" disabled>
            Sélectionner...
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-sm text-coab-red font-medium">{error}</p>}
      </div>
    )
  }
)
Select.displayName = "Select"

export { Select }
