import ModernDashboardLayout from "@/components/ModernDashboardLayout"
import OrdersTable from "@/components/OrdersTable"

export default function OrdersPage() {
  return (
    <ModernDashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pizza Orders</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage and track all pizza orders
            </p>
          </div>
        </div>

        <OrdersTable />
      </div>
    </ModernDashboardLayout>
  )
}
