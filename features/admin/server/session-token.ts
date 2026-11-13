// Signed, stateless session tokens: base64url(payload).base64url(HMAC-SHA256).
// Kept free of `next/headers` so proxy.ts can import it too.
import { createHmac, timingSafeEqual } from "node:crypto"

export const SESSION_COOKIE = "chronos_admin_session"
export const SESSION_TTL_SECONDS = 60 * 60 * 8 // 8 hours

export type SessionPayload = {
  sub: string
  exp: number // unix seconds
}

function getSecret() {
  const secret = process.env.SESSION_SECRET
  if (!secret || secret.length < 32) {
    throw new Error(
      "SESSION_SECRET is missing or shorter than 32 characters. See .env.example."
    )
  }
  return secret
}

function sign(data: string) {
  return createHmac("sha256", getSecret()).update(data).digest("base64url")
}

export function createSessionToken(sub: string) {
  const payload: SessionPayload = {
    sub,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  }
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url")
  return { token: `${data}.${sign(data)}`, payload }
}

export function verifySessionToken(
  token: string | undefined
): SessionPayload | null {
  if (!token) return null

  const [data, signature] = token.split(".")
  if (!data || !signature) return null

  const expected = Buffer.from(sign(data), "base64url")
  const actual = Buffer.from(signature, "base64url")
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
    return null
  }

  try {
    const payload = JSON.parse(
      Buffer.from(data, "base64url").toString()
    ) as SessionPayload
    if (typeof payload.sub !== "string" || typeof payload.exp !== "number") {
      return null
    }
    if (payload.exp <= Math.floor(Date.now() / 1000)) return null
    return payload
  } catch {
    return null
  }
}
