"use server"

import { deliver } from "@/lib/mail"

export type WalkthroughState = { status: "idle" | "success" | "invalid" | "error"; email: string }

/** Same check as the other forms: something@something.tld, no spaces. */
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/**
 * CTA band "Leave your work email": emails a walkthrough request to CONTACT_TO (support@vinci360.com),
 * Reply-To the visitor. Honeypot hits "succeed" silently. See `deliver` for the no-SMTP case.
 */
export async function requestWalkthrough(_prev: WalkthroughState, formData: FormData): Promise<WalkthroughState> {
  const email = String(formData.get("email") ?? "").trim()
  if (!emailPattern.test(email)) return { status: "invalid", email }
  if (formData.get("website")) return { status: "success", email }

  const source = String(formData.get("source") ?? "").slice(0, 200) || "/"
  const ok = await deliver("walkthrough", {
    subject: `Walkthrough request: ${email} wants a Vinci360 walkthrough`,
    heading: "New walkthrough request",
    replyTo: email,
    rows: [
      ["Request", "Set up a walkthrough of Vinci360"],
      ["Work email", email],
      ["Page", source],
    ],
  })
  return { status: ok ? "success" : "error", email }
}
