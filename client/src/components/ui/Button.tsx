import * as React from "react"
import { cn } from "../../lib/utils"
import { Loader2 } from "lucide-react"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "senior" | "junior" | "outline" | "ghost" | "danger"
  size?: "default" | "sm" | "lg" | "icon"
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", isLoading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={isLoading || props.disabled}
        className={cn(
          "inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-coab-black text-white hover:bg-coab-black-light focus-visible:ring-coab-black": variant === "default",
            "bg-coab-blue text-white hover:bg-coab-blue-dark focus-visible:ring-coab-blue": variant === "senior",
            "bg-coab-orange text-white hover:bg-coab-orange-dark focus-visible:ring-coab-orange": variant === "junior",
            "bg-coab-red text-white hover:bg-coab-red/90 focus-visible:ring-coab-red": variant === "danger",
            "border-2 border-coab-gray-light bg-transparent hover:bg-coab-cream-light text-coab-black focus-visible:ring-coab-gray": variant === "outline",
            "hover:bg-coab-cream-light text-coab-black": variant === "ghost",
            "h-11 px-4 py-2": size === "default", // Accessible touch target size (44px)
            "h-9 rounded-lg px-3": size === "sm",
            "h-14 rounded-2xl px-8 text-lg": size === "lg",
            "h-11 w-11": size === "icon",
          },
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }
