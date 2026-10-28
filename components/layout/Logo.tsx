import Link from "next/link"

import { cn } from "@/lib/utils"

/** Wordmark "vinci360°" with the primary-coloured degree sign. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="vinci360° home"
      className={cn(
        "font-heading text-[1.3125rem] leading-none font-extrabold tracking-[-0.02em] text-foreground no-underline lg:text-[1.4375rem]",
        className
      )}
    >
      vinci360<span className="text-primary">°</span>
    </Link>
  )
}
