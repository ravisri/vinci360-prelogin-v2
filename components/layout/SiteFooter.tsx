import { Logo } from "@/components/layout/Logo"
import { MsrcosmosLink } from "@/components/layout/MsrcosmosLink"
import { NavLink } from "@/components/layout/NavLink"
import { copyright, footerBlurb, footerColumns } from "@/content/navigation"

/** Site footer: brand column, Platform / Solutions / Company / Legal link columns, copyright bar. */
export function SiteFooter() {
  return (
    <footer data-site-footer="" className="border-t border-border bg-card pt-16 pb-8">
      <div className="container-site flex flex-col gap-10">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-[1.4fr_repeat(4,minmax(0,1fr))]">
          <div className="flex flex-col gap-3">
            <Logo />
            <p className="max-w-65 text-sm text-muted-foreground">{footerBlurb}</p>
            <p className="text-[0.8125rem] text-muted-foreground">
              Powered by <MsrcosmosLink />
            </p>
          </div>
          {footerColumns.map((col) => (
            <nav key={col.id} aria-labelledby={col.id}>
              <h2 id={col.id} className="mb-3.5 text-sm leading-none font-bold tracking-normal">
                {col.heading}
              </h2>
              <ul className="flex flex-col gap-0.5 text-sm">
                {col.items.map((item) => (
                  <li key={item.href}>
                    <NavLink href={item.href} variant="footer">
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="flex flex-wrap justify-between gap-3 border-t border-border pt-6 text-[0.8125rem] text-muted-foreground">
          <span>{copyright}</span>
          <span>Powered by MSRcosmos</span>
        </div>
      </div>
    </footer>
  )
}
