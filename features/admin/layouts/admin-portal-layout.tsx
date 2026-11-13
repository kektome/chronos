import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AdminSidebar } from "@/features/admin/components/admin-sidebar"

// Shell only. Auth is checked in each page via verifyAdminSession().
// `open` pins the sidebar on desktop (it can't be collapsed); on mobile it
// stays a drawer opened by the trigger, which is hidden from md up.
export function AdminPortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider open>
      <AdminSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1 md:hidden" />
          <Separator orientation="vertical" className="mr-2 h-4 md:hidden" />
          <span className="text-sm text-muted-foreground">Admin portal</span>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
