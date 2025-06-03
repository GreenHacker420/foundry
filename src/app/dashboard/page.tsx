import { auth } from "@/lib/auth"
import DashboardLayout from "@/components/DashboardLayout"
import Link from "next/link"
import { ShoppingCart, TrendingUp, Clock, CheckCircle } from "lucide-react"

export default async function DashboardHome() {
  const session = await auth()

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <div className="flex items-center space-x-4">
            {session?.user?.image && (
              <img
                className="h-16 w-16 rounded-full border-2 border-orange-200"
                src={session.user.image}
                alt={session.user.name || 'User'}
              />
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Hello, {session?.user?.name || 'User'}! 👋
              </h1>
              <p className="text-gray-600 mt-1">
                Welcome to your pizza order management dashboard
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">20</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Delivered</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">4</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">6</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/dashboard/orders"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors group"
            >
              <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200">
                <ShoppingCart className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">View All Orders</h3>
                <p className="text-sm text-gray-600">Manage and track pizza orders</p>
              </div>
            </Link>

            <div className="flex items-center p-4 border border-gray-200 rounded-lg opacity-50">
              <div className="p-2 bg-gray-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-500">Analytics</h3>
                <p className="text-sm text-gray-400">Coming soon...</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Order PZA018 delivered</p>
                <p className="text-xs text-gray-600">Stephanie Walker - Spicy Italian</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <Clock className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Order PZA020 received</p>
                <p className="text-xs text-gray-600">Laura Young - Pepperoni</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Order PZA019 in preparation</p>
                <p className="text-xs text-gray-600">Brian Hall - Margherita</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
