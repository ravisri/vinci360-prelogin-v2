"use client"

import type { ComponentProps } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

const styles = {
  header:
    "inline-flex min-h-11 items-center gap-1.5 rounded-sm px-3.5 text-[0.9375rem] font-medium text-foreground no-underline hover:bg-accent hover:text-foreground aria-[current=page]:font-bold aria-[current=page]:underline aria-[current=page]:decoration-primary aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8",
  footer:
    "inline-block py-1.5 text-muted-foreground no-underline hover:text-foreground aria-[current=page]:font-semibold aria-[current=page]:text-foreground aria-[current=page]:underline aria-[current=page]:underline-offset-4",
  sheet:
    "flex min-h-11 items-center rounded-sm px-3 text-base font-medium text-foreground no-underline hover:bg-accent hover:text-foreground aria-[current=page]:font-bold aria-[current=page]:underline aria-[current=page]:decoration-primary aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-6",
}

/** True when `href` is the current page, or a parent section of it (Platform on /features/*). */
export function useIsActive(href: string) {
  const pathname = usePathname()
  const path = href.split("?")[0]
  if (href.includes("?")) return false
  return pathname === path || (path !== "/" && pathname.startsWith(`${path}/`))
}

/** Link that marks itself with aria-current="page" (bold + underline) when active. */
export function NavLink({
  href,
  variant = "header",
  className,
  ...props
}: ComponentProps<typeof Link> & { href: string; variant?: keyof typeof styles }) {
  const active = useIsActive(href)
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(styles[variant], className)}
      {...props}
    />
  )
}
