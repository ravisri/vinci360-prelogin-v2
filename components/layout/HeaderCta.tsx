"use client"

import type { ComponentProps } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { ctaLink } from "@/content/navigation"

/**
 * The filled "Request a demo" button. On /request-demo it jumps to the form (#form) and is marked
 * as the current page; everywhere else it opens /request-demo.
 */
export function HeaderCta({ className, ...props }: Omit<ComponentProps<typeof Link>, "href">) {
  const here = usePathname() === ctaLink.href
  return (
    <Button variant="cta" asChild className={className}>
      <Link href={here ? "#form" : ctaLink.href} aria-current={here ? "page" : undefined} {...props}>
        {ctaLink.label}
      </Link>
    </Button>
  )
}
