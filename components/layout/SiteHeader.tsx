import Link from "next/link"

import { Button } from "@/components/ui/button"
import { HeaderCta } from "@/components/layout/HeaderCta"
import { Logo } from "@/components/layout/Logo"
import { MegaMenu } from "@/components/layout/MegaMenu"
import { MobileNav } from "@/components/layout/MobileNav"
import { loginLink, showLogin } from "@/content/navigation"

/** Sticky site header: logo, primary nav with mega menu (lg+), Log in (when `showLogin`), Request a demo, mobile sheet (<lg). */
export function SiteHeader() {
  return (
    <header data-site-header="" className="sticky top-0 z-50 h-(--header-h) border-b border-border bg-background">
      <div className="container-site flex h-full items-center gap-7">
        <Logo />
        <nav aria-label="Primary" className="hidden flex-1 lg:block">
          <MegaMenu />
        </nav>
        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          {showLogin && (
            <Button variant="ghost" size="sm" asChild>
              <Link href={loginLink.href} className="font-medium">
                {loginLink.label}
              </Link>
            </Button>
          )}
          <HeaderCta className="hidden sm:inline-flex" />
          <MobileNav className="lg:hidden" />
        </div>
      </div>
    </header>
  )
}
