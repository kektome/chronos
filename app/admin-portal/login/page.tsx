import type { Metadata } from "next"

import { AdminLoginPage } from "@/features/admin/pages/admin-login-page"

export const metadata: Metadata = {
  title: "Sign in · Admin portal",
  robots: { index: false, follow: false },
}

export default function Page() {
  return <AdminLoginPage />
}
