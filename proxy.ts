import { NextResponse, type NextRequest } from "next/server"

import { ADMIN_ROUTES, isAdminPath } from "@/features/admin/routes"
import {
  SESSION_COOKIE,
  verifySessionToken,
} from "@/features/admin/server/session-token"

// Optimistic check from the cookie only (no DB). Pages still call
// verifyAdminSession() as the real line of defense.
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (isAdminPath(pathname)) {
    const session = verifySessionToken(
      request.cookies.get(SESSION_COOKIE)?.value
    )
    const isLogin = pathname === ADMIN_ROUTES.login

    if (!session && !isLogin) {
      return NextResponse.redirect(new URL(ADMIN_ROUTES.login, request.nextUrl))
    }
    if (session && isLogin) {
      return NextResponse.redirect(new URL(ADMIN_ROUTES.root, request.nextUrl))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin-portal", "/admin-portal/:path*"],
}
