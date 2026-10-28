import type { ReactNode } from "react"

import { LoginHeader } from "@/components/layout/LoginHeader"

/** Auth pages: minimal header only (logo, Back to website, Request a demo); no site footer. */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <LoginHeader />
      {children}
    </div>
  )
}
