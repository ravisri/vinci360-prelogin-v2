/** Site-wide constants. The production domain is not confirmed yet, so it comes from the environment. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "")

export const siteName = "vinci360°"

export const defaultTitle = "vinci360° — Social media intelligence"

export const defaultDescription =
  "vinci360° brings the conversation about your brand into one view: trends, sentiment, competitor comparison, promotable stories and reports, across social media."
