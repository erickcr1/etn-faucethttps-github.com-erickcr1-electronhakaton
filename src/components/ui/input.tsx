import * as React from "react"

import { cn } from "@lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-8 w-full rounded-lg bg-white border text-black border-input px-3 py-1 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gray-200 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm hover:border-gray-400 focus-visible:border-gray-400 transition-all dark:text-white dark:border-gray-800 dark:hover:border-gray-600 dark:bg-transparent dark:focus-visible:ring-gray-800",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
