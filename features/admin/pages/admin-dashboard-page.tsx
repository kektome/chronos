import { verifyAdminSession } from "@/features/admin/server/dal"

export async function AdminDashboardPage() {
  const { username } = await verifyAdminSession()

  return (
    <div className="flex flex-col gap-1">
      <h1 className="font-heading text-2xl font-medium">Dashboard</h1>
      <p className="text-sm text-muted-foreground">
        Signed in as <span className="font-medium">{username}</span>.
      </p>
    </div>
  )
}
