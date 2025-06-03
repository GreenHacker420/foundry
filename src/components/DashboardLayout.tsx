import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import DashboardLayoutClient from "./DashboardLayoutClient"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const session = await auth()

  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <DashboardLayoutClient
      userImage={session.user?.image}
      userName={session.user?.name}
      userEmail={session.user?.email}
    >
      {children}
    </DashboardLayoutClient>
  )
}
