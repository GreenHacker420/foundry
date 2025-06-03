import DashboardLayout from "@/components/DashboardLayout"
import OrderAnalytics from "@/components/Analytics/OrderAnalytics"

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Comprehensive insights into your pizza business performance
            </p>
          </div>
        </div>

        <OrderAnalytics />
      </div>
    </DashboardLayout>
  )
}
