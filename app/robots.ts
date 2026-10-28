import type { MetadataRoute } from "next"

import { siteUrl } from "@/lib/site"

/** /login is not disallowed so crawlers can read its noindex meta tag. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
