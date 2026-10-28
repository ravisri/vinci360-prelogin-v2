import { login } from "@/content/login"

const e = login.errors
/** Same check as the contact form: something@something.tld, no spaces. */
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export type LoginField = "email" | "password"
export type LoginErrors = Partial<Record<LoginField, string>>

export function emailError(value: string) {
  const v = value.trim()
  if (!v) return e.email
  if (!emailPattern.test(v)) return e.emailInvalid
  return undefined
}

export function passwordError(value: string) {
  return value ? undefined : e.password
}

/** Errors in summary order (email, then password). */
export function validateLogin(values: { email: string; password: string }): LoginErrors {
  const errors: LoginErrors = {}
  const em = emailError(values.email)
  const pw = passwordError(values.password)
  if (em) errors.email = em
  if (pw) errors.password = pw
  return errors
}

/** Mock sign-in: 1s delay; the password "wrong" fails, anything else succeeds. No real auth. */
export const mockLogin = (password: string) =>
  new Promise<{ ok: boolean }>((resolve) => setTimeout(() => resolve({ ok: password !== "wrong" }), 1000))

/** Mock reset email: 1s delay, always succeeds. */
export const mockReset = () => new Promise<void>((resolve) => setTimeout(resolve, 1000))
