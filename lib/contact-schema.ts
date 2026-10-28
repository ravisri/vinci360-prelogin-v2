import { z } from "zod"

import { contactForm, contactRoles, contactTopics } from "@/content/contact"

const e = contactForm.errors
/** Same check as the reference: something@something.tld, no spaces. */
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const required = (msg: string) => z.string().trim().min(1, msg)

/** Contact form, shared by the client form and the server action. */
export const contactSchema = z.object({
  topic: z.enum(contactTopics),
  first: required(e.first),
  last: required(e.last),
  email: required(e.email).regex(emailPattern, e.emailInvalid),
  company: z.string().trim(),
  role: z.union([z.enum(contactRoles), z.literal("")]),
  message: required(e.message).max(contactForm.messageMax),
  consent: z.boolean().refine((v) => v, e.consent),
  /** Honeypot: people never see it, bots fill it. */
  website: z.string(),
})

export type ContactValues = z.infer<typeof contactSchema>

export const contactDefaults: ContactValues = {
  topic: "General question",
  first: "",
  last: "",
  email: "",
  company: "",
  role: "",
  message: "",
  consent: false,
  website: "",
}

/** Error-summary order, as in the reference. */
export const contactErrorOrder = ["first", "last", "email", "message", "consent"] as const
