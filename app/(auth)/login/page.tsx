import { Suspense } from "react"
import Link from "next/link"
import { ArrowLeft, ChevronDown } from "lucide-react"

import { MsrcosmosLink } from "@/components/layout/MsrcosmosLink"
import { LoginCard } from "@/components/login/LoginCard"
import { LoginPreviewMock } from "@/components/mocks/login/LoginPreviewMock"
import { login } from "@/content/login"
import { ctaLink, legalNav } from "@/content/navigation"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({ title: "Log in", description: login.description, path: "/login", noindex: true })

const textLink = "inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-primary-700 no-underline hover:underline"

export default function LoginPage() {
  return (
    <div className="grid flex-1 lg:grid-cols-2">
      <main id="main" tabIndex={-1} className="flex flex-col items-center px-4 pt-2 pb-8 outline-none lg:px-6 lg:pt-10 lg:pb-6">
        <div className="flex w-full max-w-100 flex-col gap-3 lg:my-auto lg:gap-3.5">
          <Link href="/" className={`${textLink} lg:hidden`}>
            <ArrowLeft aria-hidden="true" strokeWidth={2} className="size-4" />
            {login.back}
          </Link>
          <span className="self-start rounded-full border border-primary-200 bg-primary-tint px-3 py-1.5 text-xs font-semibold text-primary-700">
            {login.chip}
          </span>
          <h1 id="lh" tabIndex={-1} className="text-[1.875rem] leading-[1.1] font-extrabold tracking-[-0.02em] outline-none lg:text-h1-compact">
            {login.title}
          </h1>
          <p className="text-body text-muted-foreground">{login.intro}</p>

          <Suspense>
            <LoginCard />
          </Suspense>

          <div className="mt-1.5 text-[0.90625rem]">
            <p>
              {login.newTo.text}{" "}
              <Link href={ctaLink.href} className={textLink}>
                {login.newTo.link}
              </Link>
            </p>
            <p>
              {login.questions.text}{" "}
              <Link href="/contact" className={textLink}>
                {login.questions.link}
              </Link>
            </p>
          </div>

          <details className="group mt-2 rounded-lg border border-border bg-card lg:hidden">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 p-3 [&::-webkit-details-marker]:hidden">
              <span className="flex items-center gap-3">
                <span aria-hidden="true" className="on-dark flex h-10 w-14 items-end gap-0.75 rounded-sm bg-background p-1.5">
                  <span className="h-[40%] flex-1 bg-border" />
                  <span className="h-[65%] flex-1 bg-border" />
                  <span className="h-[50%] flex-1 bg-border" />
                  <span className="h-[90%] flex-1 bg-primary" />
                </span>
                <h2 className="text-base font-bold">{login.what.title}</h2>
              </span>
              <ChevronDown aria-hidden="true" strokeWidth={2} className="size-5 transition-transform group-open:rotate-180" />
            </summary>
            <p className="px-3 pb-3 text-sm">
              {login.what.body}{" "}
              <Link href="/features" className="font-semibold text-primary-700">
                {login.what.link}
              </Link>
              .
            </p>
          </details>
        </div>

        <footer className="mt-6 flex w-full max-w-100 flex-col items-start text-[0.78125rem] text-muted-foreground lg:flex-row lg:flex-wrap lg:items-center lg:gap-x-3.5 lg:gap-y-1.5">
          {legalNav.map((l, i) => (
            <span key={l.href} className="contents">
              {i > 0 && (
                <span aria-hidden="true" className="hidden lg:inline">
                  ·
                </span>
              )}
              <Link href={l.href} className="inline-flex min-h-8 items-center text-muted-foreground">
                {l.label}
              </Link>
            </span>
          ))}
          <span aria-hidden="true" className="hidden lg:inline">
            ·
          </span>
          <span>© 2026</span>
          <span aria-hidden="true" className="hidden lg:inline">
            ·
          </span>
          <span className="inline-flex items-center gap-1.5">
            Powered by <MsrcosmosLink />
          </span>
        </footer>
      </main>

      <aside aria-label={login.preview.label} className="on-dark hidden flex-col justify-center overflow-hidden rounded-l-lg bg-background px-13 py-12 text-foreground lg:flex">
        <LoginPreviewMock />
      </aside>
    </div>
  )
}
