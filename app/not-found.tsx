import type { Metadata } from "next"

import { SiteFooter } from "@/components/layout/SiteFooter"
import { SiteHeader } from "@/components/layout/SiteHeader"
import { EmptyChartMock } from "@/components/mocks/errors/EmptyChartMock"
import { ErrorView } from "@/components/sections/ErrorView"
import { notFound } from "@/content/errors"

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
}

/** 404: rendered by the root layout only, so it brings the site header and footer itself. */
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="outline-none">
        <ErrorView
          variant="404"
          chip={notFound.chip}
          title={notFound.title}
          text={notFound.text}
          illustration={<EmptyChartMock />}
          primary={notFound.primary}
          secondary={notFound.secondary}
        />
      </main>
      <SiteFooter />
    </>
  )
}
