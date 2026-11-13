import type { Metadata } from "next"

import { AdminPortalLayout } from "@/features/admin/layouts/admin-portal-layout"

export const metadata: Metadata = {
  title: "Admin portal",
  robots: { index: false, follow: false },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminPortalLayout>{children}</AdminPortalLayout>
}
