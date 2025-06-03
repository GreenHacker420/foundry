import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import ModernDashboardLayoutClient from "./ModernDashboardLayoutClient"

interface ModernDashboardLayoutProps {
  children: React.ReactNode
}

export default async function ModernDashboardLayout({ children }: ModernDashboardLayoutProps) {
  const session = await auth()
  
  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <ModernDashboardLayoutClient
      userImage={session.user?.image}
      userName={session.user?.name}
      userEmail={session.user?.email}
    >
      {children}
    </ModernDashboardLayoutClient>
  )
}
