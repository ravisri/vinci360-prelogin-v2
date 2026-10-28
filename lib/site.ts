/** Site-wide constants. The production domain is not confirmed yet, so it comes from the environment. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "")

export const siteName = "vinci360°"

export const defaultTitle = "vinci360° — Social media intelligence"

export const defaultDescription =
  "vinci360° brings Facebook, X, YouTube and Instagram into one view: trends, sentiment, competitor comparison, promotable stories and reports for your brand."
