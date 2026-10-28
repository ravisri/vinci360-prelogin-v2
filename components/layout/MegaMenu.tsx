"use client"

import { useId, useRef, useState, type FocusEvent, type KeyboardEvent, type PointerEvent } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, LayoutGrid } from "lucide-react"

import { NavLink, useIsActive } from "@/components/layout/NavLink"
import { features, platformLink, primaryNav, overviewLink, type FeatureNavItem } from "@/content/navigation"
import { cn } from "@/lib/utils"

const row = "flex min-h-11 items-start gap-3 rounded-sm px-3 py-2.5 text-foreground no-underline hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ring"

function FeatureLink({ item }: { item: FeatureNavItem }) {
  const active = useIsActive(item.href)
  return (
    <Link href={item.href} aria-current={active ? "page" : undefined} className={cn(row, active && "bg-muted")}>
      <span aria-hidden="true" className={cn("mt-1.5 size-2.5 flex-none rounded-full", item.dotClass)} />
      <span>
        <span className={cn("block font-semibold", active && "font-bold")}>{item.label}</span>
        <span className="block text-[0.8125rem] text-muted-foreground">{item.blurb}</span>
      </span>
    </Link>
  )
}

/**
 * Desktop primary nav. "Platform" stays a real link to /features; hovering it, focusing anything in it, or
 * pressing the chevron opens the 7-feature panel (disclosure pattern, as the reference's hover / focus-within).
 * The panel is always in the HTML; closed it is `invisible`, so its links leave the tab order.
 */
export function MegaMenu() {
  const pathname = usePathname()
  const panelId = useId()
  const chevron = useRef<HTMLButtonElement>(null)
  // State when the chevron was pressed: pressing focuses it (which opens the panel) before the click toggles.
  const pressedOpen = useRef<boolean | null>(null)
  // Opened on a given path: navigating anywhere closes it without an effect.
  const [openOn, setOpenOn] = useState<string | null>(null)
  const open = openOn === pathname
  const show = () => setOpenOn(pathname)
  const hide = () => setOpenOn(null)

  // Mouse only: a tap fires pointerenter before click, which would open then instantly toggle shut.
  const onPointer = (e: PointerEvent, next: () => void) => e.pointerType === "mouse" && next()
  const onBlur = (e: FocusEvent<HTMLLIElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) hide()
  }
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && open) {
      // Focus first: it fires onFocus (show), and the hide queued after it wins.
      chevron.current?.focus()
      hide()
    }
  }

  return (
    <ul className="flex items-center gap-0.5">
      <li
        className="relative"
        onPointerEnter={(e) => onPointer(e, show)}
        onPointerLeave={(e) => onPointer(e, hide)}
        onFocus={show}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center rounded-sm hover:bg-accent px-3">
          <NavLink href={platformLink.href} className="px-0 hover:bg-transparent">
            {platformLink.label}
          </NavLink>
          <button
            ref={chevron}
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onPointerDown={() => (pressedOpen.current = open)}
            onClick={() => {
              const wasOpen = pressedOpen.current ?? open
              pressedOpen.current = null
              if (wasOpen) hide()
              else show()
            }}
            className="flex cursor-pointer items-center justify-start rounded-sm pl-1 text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring "
          >
            <ChevronDown size={16} aria-hidden="true" strokeWidth={2} className={cn("transition-transform duration-200 motion-reduce:transition-none pr-0! mr-0!", open && "rotate-180")} />
            <span className="sr-only">Show platform features</span>
          </button>
        </div>

        <div
          id={panelId}
          data-state={open ? "open" : "closed"}
          className={cn(
            // `before:` bridges the 8px gap so the pointer can travel from the link to the panel.
            "absolute top-full -left-2 z-10 mt-2 grid w-160 grid-cols-2 gap-x-4 gap-y-1 rounded-lg bg-card p-5 shadow-card before:absolute before:inset-x-0 before:-top-2 before:h-2",
            "duration-150 ease-out motion-reduce:transition-none",
            // Visible at once on open; on close, visibility waits for the fade-out to finish.
            open ? "visible translate-y-0 opacity-100 transition-[opacity,transform]" : "invisible translate-y-1 opacity-0 transition-[opacity,transform,visibility]",
          )}
        >
          <p className="col-span-full px-3 pt-1 pb-2.5 text-xs leading-none font-semibold tracking-[0.06em] text-muted-foreground uppercase">Platform features</p>
          {features.map((item) => (
            <FeatureLink key={item.href} item={item} />
          ))}
          <Link href={overviewLink.href} className={cn(row, "bg-muted hover:bg-accent")}>
            <LayoutGrid aria-hidden="true" strokeWidth={2} className="mt-0.5 size-5 flex-none text-primary" />
            <span>
              <span className="block font-semibold text-primary-700">{overviewLink.label}</span>
              <span className="block text-[0.8125rem] text-muted-foreground">{overviewLink.blurb}</span>
            </span>
          </Link>
        </div>
      </li>
      {primaryNav.map((item) => (
        <li key={item.href}>
          <NavLink href={item.href}>{item.label}</NavLink>
        </li>
      ))}
    </ul>
  )
}
