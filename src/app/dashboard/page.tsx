import { auth } from "@/lib/auth"
import ModernDashboardLayout from "@/components/ModernDashboardLayout"
import DashboardHomeContent from "@/components/DashboardHomeContent"

export default async function DashboardHome() {
  const session = await auth()

  return (
    <ModernDashboardLayout>
      <DashboardHomeContent
        userImage={session?.user?.image}
        userName={session?.user?.name}
      />
    </ModernDashboardLayout>
  )
}
