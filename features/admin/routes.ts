export const ADMIN_ROUTES = {
  root: "/admin-portal",
  login: "/admin-portal/login",
} as const

export function isAdminPath(pathname: string) {
  return (
    pathname === ADMIN_ROUTES.root ||
    pathname.startsWith(`${ADMIN_ROUTES.root}/`)
  )
}
