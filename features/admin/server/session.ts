import "server-only"

import { cookies } from "next/headers"

import { ADMIN_ROUTES } from "@/features/admin/routes"
import {
  createSessionToken,
  SESSION_COOKIE,
  SESSION_TTL_SECONDS,
  verifySessionToken,
} from "@/features/admin/server/session-token"

export async function createSession(username: string) {
  const { token } = createSessionToken(username)
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: ADMIN_ROUTES.root,
    maxAge: SESSION_TTL_SECONDS,
  })
}

export async function readSession() {
  const cookieStore = await cookies()
  return verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value)
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete({ name: SESSION_COOKIE, path: ADMIN_ROUTES.root })
}
