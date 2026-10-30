import { z } from "zod"

import { demoFocus, demoForm, demoRoles } from "@/content/demo"

const e = demoForm.errors
/** Same check as the reference: something@something.tld, no spaces. */
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const required = (msg: string) => z.string().trim().min(1, msg)

/** Request-a-demo form, shared by the client form and the server action. */
export const demoSchema = z.object({
  type: z.enum(["demo", "trial"]),
  first: required(e.first),
  last: required(e.last),
  email: required(e.email).regex(emailPattern, e.emailInvalid),
  company: required(e.company),
  role: z.union([z.enum(demoRoles), z.literal("")]),
  brand: z.string().trim(),
  competitors: z.array(z.string().trim().min(1)).max(demoForm.competitors.max),
  keyword: z.string().trim(),
  focus: z.array(z.enum(demoFocus)),
  notes: z.string().max(demoForm.notesMax),
  consent: z.boolean().refine((v) => v, e.consent),
  /** Honeypot: people never see it, bots fill it. */
  website: z.string(),
})

export type DemoValues = z.infer<typeof demoSchema>

export const demoDefaults: DemoValues = {
  type: "demo",
  first: "",
  last: "",
  email: "",
  company: "",
  role: "",
  brand: "",
  competitors: [],
  keyword: "",
  focus: [],
  notes: "",
  consent: false,
  website: "",
}

/** Error-summary order, as in the reference. */
export const demoErrorOrder = ["first", "last", "email", "company", "consent"] as const
