"use server"

import { timingSafeEqual } from "node:crypto"
import { redirect } from "next/navigation"

import { ADMIN_ROUTES } from "@/features/admin/routes"
import { verifyPassword } from "@/features/admin/server/password"
import { createSession, deleteSession } from "@/features/admin/server/session"

export type LoginState = {
  error?: string
  username?: string
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a)
  const right = Buffer.from(b)
  return left.length === right.length && timingSafeEqual(left, right)
}

export async function login(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const username = String(formData.get("username") ?? "").trim()
  const password = String(formData.get("password") ?? "")

  if (!username || !password) {
    return { error: "Enter your username and password.", username }
  }

  const expectedUsername = process.env.ADMIN_USERNAME
  const passwordHash = process.env.ADMIN_PASSWORD_HASH
  if (!expectedUsername || !passwordHash) {
    console.error("ADMIN_USERNAME / ADMIN_PASSWORD_HASH are not set.")
    return { error: "Admin login is not configured.", username }
  }

  // Always run the hash check so response time doesn't reveal valid usernames.
  const passwordOk = await verifyPassword(password, passwordHash)
  const usernameOk = safeEqual(username, expectedUsername)

  if (!usernameOk || !passwordOk) {
    return { error: "Invalid username or password.", username }
  }

  await createSession(expectedUsername)
  redirect(ADMIN_ROUTES.root)
}

export async function logout() {
  await deleteSession()
  redirect(ADMIN_ROUTES.login)
}
