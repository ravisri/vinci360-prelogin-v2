import type { MetadataRoute } from "next"

import { ctaLink, features, legalNav, platformLink, primaryNav } from "@/content/navigation"
import { siteUrl } from "@/lib/site"

/** Indexable routes only; /login is noindex and left out. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", platformLink.href, ...features.map((f) => f.href), ...primaryNav.map((n) => n.href), ctaLink.href, ...legalNav.map((n) => n.href)]
  return [...new Set(paths)].map((path) => ({
    url: new URL(path, siteUrl).toString(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }))
}
