import ModernDashboardLayout from "@/components/ModernDashboardLayout"
import StaffDashboard from "@/components/Gamification/StaffDashboard"

export default function StaffPage() {
  return (
    <ModernDashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Staff Performance</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Gamified staff tracking with achievements and leaderboards
            </p>
          </div>
        </div>

        <StaffDashboard />
      </div>
    </ModernDashboardLayout>
  )
}
