import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex min-h-11 min-w-11 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-sm border border-transparent text-[0.9375rem] leading-none font-semibold whitespace-nowrap no-underline transition-colors outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-60 aria-disabled:pointer-events-none aria-disabled:opacity-60 aria-busy:cursor-progress aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4.5",
  {
    variants: {
      variant: {
        cta: "bg-cta font-bold text-cta-foreground hover:bg-cta-hover hover:text-cta-hover-foreground",
        default: "bg-primary text-primary-foreground hover:bg-primary-700 hover:text-primary-foreground",
        outline: "border-border bg-card text-foreground hover:border-primary hover:text-primary",
        secondary: "border-border bg-card text-foreground hover:border-primary hover:text-primary",
        ghost: "bg-transparent text-foreground hover:bg-accent hover:text-foreground aria-expanded:bg-accent",
        link: "min-h-0 min-w-0 px-0 text-primary-700 underline-offset-4 hover:underline",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        default: "px-5",
        sm: "px-3.5",
        lg: "min-h-13 px-6.5 text-base",
        icon: "size-11 p-0",
        "icon-sm": "size-11 p-0",
        "icon-lg": "size-13 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    /** Spinner + label kept, aria-busy, disabled. */
    loading?: boolean
  }

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button"
  const busy = loading || undefined

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      aria-busy={busy}
      {...(asChild ? { "aria-disabled": disabled || busy } : { disabled: disabled || loading })}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {loading && <Loader2 className="animate-spin" aria-hidden="true" />}
          {children}
        </>
      )}
    </Comp>
  )
}

export { Button, buttonVariants }
