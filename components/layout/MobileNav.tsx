"use client"

import Link from "next/link"
import { Menu, PlayCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { NavLink } from "@/components/layout/NavLink"
import { features, loginLink, platformLink, primaryNav, tourLink } from "@/content/navigation"
import { HeaderCta } from "@/components/layout/HeaderCta"
import { cn } from "@/lib/utils"

/** Mobile/tablet navigation in a right-hand Sheet (focus trapped, Esc closes, focus returns to the trigger). */
export function MobileNav({ className }: { className?: string }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu" className={className}>
          <Menu aria-hidden="true" strokeWidth={2} className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-sm gap-0 overflow-y-auto bg-background p-0 sm:max-w-sm">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <nav aria-label="Mobile" className="flex flex-col gap-1 px-4 pt-16 pb-6">
          <SheetClose asChild>
            <NavLink href={platformLink.href} variant="sheet">
              {platformLink.label}
            </NavLink>
          </SheetClose>
          <ul className="mb-2 flex flex-col">
            {features.map((item) => (
              <li key={item.href}>
                <SheetClose asChild>
                  <NavLink href={item.href} variant="sheet" className="gap-3 pl-5 text-[0.9375rem] font-medium">
                    <span aria-hidden="true" className={cn("size-2.5 flex-none rounded-full", item.dotClass)} />
                    {item.label}
                  </NavLink>
                </SheetClose>
              </li>
            ))}
            <li>
              <SheetClose asChild>
                <Link
                  href={tourLink.href}
                  className="mt-1 flex min-h-11 items-center gap-3 rounded-sm bg-muted px-5 text-[0.9375rem] font-semibold text-primary-700 no-underline hover:bg-accent"
                >
                  <PlayCircle aria-hidden="true" strokeWidth={2} className="size-5 text-primary" />
                  {tourLink.label}
                </Link>
              </SheetClose>
            </li>
          </ul>
          {primaryNav.map((item) => (
            <SheetClose asChild key={item.href}>
              <NavLink href={item.href} variant="sheet">
                {item.label}
              </NavLink>
            </SheetClose>
          ))}
          <Separator className="my-4" />
          <div className="flex flex-col gap-2">
            <SheetClose asChild>
              <Button variant="outline" asChild>
                <Link href={loginLink.href}>{loginLink.label}</Link>
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <HeaderCta />
            </SheetClose>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
