import { createElement } from "react"
import type { Metadata } from "next"

import { siteName, siteUrl } from "@/lib/site"

type MetadataInput = {
  title: string
  description: string
  path: string
  noindex?: boolean
  /** Path to an image in public/og/, e.g. "/og/home.png". */
  image?: string
}

/** Page metadata: unique title, description, canonical, Open Graph and Twitter tags. */
export function buildMetadata({ title, description, path, noindex, image }: MetadataInput): Metadata {
  const images = image ? [{ url: image, width: 1200, height: 630, alt: title }] : undefined
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName, locale: "en_GB", type: "website", images },
    twitter: { card: "summary_large_image", title, description, images: image ? [image] : undefined },
    ...(noindex && { robots: { index: false, follow: true } }),
  }
}

const absolute = (path: string) => new URL(path, siteUrl).toString()

/** Organization JSON-LD: confirmed fields only (name, URL and logo; no address until supplied). */
export function organization() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": absolute("/#msrcosmos"), name: "MSRcosmos", url: "https://www.msrcosmos.com/", logo: absolute("/images/msrcosmos-logo.svg"), brand: { "@id": absolute("/#vinci360") } },
      { "@type": "Brand", "@id": absolute("/#vinci360"), name: siteName },
    ],
  }
}

export function softwareApp() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteName,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: "Social media intelligence for your brand: mentions, reach, sentiment and trends in one view.",
    publisher: { "@type": "Organization", name: "MSRcosmos" },
  }
}

export function breadcrumb(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  }
}

export function faqPage(qas: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qas.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  }
}

/** Renders a JSON-LD script tag; `<` is escaped so content can't close the tag. */
export function JsonLd({ data }: { data: object }) {
  return createElement("script", {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(data).replace(/</g, "\\u003c") },
  })
}
