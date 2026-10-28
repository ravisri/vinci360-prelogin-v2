"use client"

import { SiteFooter } from "@/components/layout/SiteFooter"
import { SiteHeader } from "@/components/layout/SiteHeader"
import { PausedChartMock } from "@/components/mocks/errors/PausedChartMock"
import { ErrorView } from "@/components/sections/ErrorView"
import { serverError } from "@/content/errors"

/** 500: client error boundary. Static copy only, so it renders even when page data fails. */
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <>
      <title>Something went wrong | vinci360°</title>
      <meta name="robots" content="noindex" />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="outline-none">
        <ErrorView
          variant="500"
          chip={serverError.chip}
          title={serverError.title}
          text={serverError.text}
          illustration={<PausedChartMock />}
          primary={{ ...serverError.primary, onClick: reset }}
          secondary={serverError.secondary}
        />
      </main>
      <SiteFooter />
    </>
  )
}
