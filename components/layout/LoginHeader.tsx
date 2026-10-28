import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { HeaderCta } from "@/components/layout/HeaderCta"
import { Logo } from "@/components/layout/Logo"
import { Button } from "@/components/ui/button"
import { login } from "@/content/login"

/** Minimal header for /login: logo, "Back to website" (lg+) and the filled "Request a demo". */
export function LoginHeader() {
  return (
    <header className="flex h-16 flex-none items-center justify-between border-b border-border bg-muted px-4 lg:h-18 lg:px-10">
      <Logo />
      <nav aria-label="Site" className="flex items-center gap-1">
        <Button variant="ghost" asChild className="hidden lg:inline-flex">
          <Link href="/">
            <ArrowLeft aria-hidden="true" strokeWidth={2} />
            {login.back}
          </Link>
        </Button>
        <HeaderCta className="px-3 lg:px-4" />
      </nav>
    </header>
  )
}
