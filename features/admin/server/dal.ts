import "server-only"

import { redirect } from "next/navigation"
import { cache } from "react"

import { ADMIN_ROUTES } from "@/features/admin/routes"
import { readSession } from "@/features/admin/server/session"

/**
 * Secure check for admin pages, data access and Server Actions.
 * Call it in every protected page/action — layouts don't re-render on
 * navigation, so they are not a reliable place for auth checks.
 */
export const verifyAdminSession = cache(async () => {
  const session = await readSession()
  if (!session) redirect(ADMIN_ROUTES.login)
  return { username: session.sub }
})
