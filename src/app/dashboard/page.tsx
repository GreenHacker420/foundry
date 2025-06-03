import { auth } from "@/lib/auth"
import DashboardLayout from "@/components/DashboardLayout"
import DashboardHomeContent from "@/components/DashboardHomeContent"

export default async function DashboardHome() {
  const session = await auth()

  return (
    <DashboardLayout>
      <DashboardHomeContent
        userImage={session?.user?.image}
        userName={session?.user?.name}
      />
    </DashboardLayout>
  )
}
