import { IconLayoutDashboard, type Icon } from "@tabler/icons-react"

import { ADMIN_ROUTES } from "@/features/admin/routes"

export type AdminNavItem = {
  title: string
  href: string
  icon: Icon
}

// Add a new admin section here, then create its route under
// app/admin-portal/(portal)/<segment>/page.tsx.
export const ADMIN_NAV: AdminNavItem[] = [
  { title: "Dashboard", href: ADMIN_ROUTES.root, icon: IconLayoutDashboard },
]
