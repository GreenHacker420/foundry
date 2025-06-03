import DashboardLayout from "@/components/DashboardLayout"
import OrdersTable from "@/components/OrdersTable"

export default function OrdersPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Pizza Orders</h1>
            <p className="text-gray-600 mt-1">
              Manage and track all pizza orders
            </p>
          </div>
        </div>

        <OrdersTable />
      </div>
    </DashboardLayout>
  )
}
