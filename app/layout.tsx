import type { Metadata } from "next"
import { Inter, Plus_Jakarta_Sans } from "next/font/google"

import "./globals.css"
import { Providers } from "@/components/providers"
import { JsonLd, organization } from "@/lib/seo"
import { defaultDescription, defaultTitle, siteName, siteUrl } from "@/lib/site"
import { cn } from "@/lib/utils"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-jakarta",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: defaultTitle, template: "%s | vinci360°" },
  description: defaultDescription,
  applicationName: siteName,
  openGraph: {
    siteName,
    title: defaultTitle,
    description: defaultDescription,
    locale: "en_GB",
    type: "website",
    url: "/",
  },
  twitter: { card: "summary_large_image", title: defaultTitle, description: defaultDescription },
}

/** Without JS, Motion's server-rendered initial state must not hide content. */
const noScriptMotion =
  "[data-motion]{opacity:1!important;transform:none!important}[data-draw]{stroke-dasharray:none!important;stroke-dashoffset:0!important}"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-GB" className={cn(inter.variable, jakarta.variable)}>
      <body>
        <noscript>
          <style>{noScriptMotion}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only rounded-sm bg-foreground px-4 py-3 font-semibold text-background no-underline focus:not-sr-only focus:fixed focus:top-3 focus:left-4 focus:z-100"
        >
          Skip to content
        </a>
        <Providers>
          {children}
        </Providers>
        <JsonLd data={organization()} />
      </body>
    </html>
  )
}
