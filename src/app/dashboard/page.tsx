import { auth } from "@/lib/auth"
import DashboardLayout from "@/components/DashboardLayout"
import Link from "next/link"
import { ShoppingCart, TrendingUp, Clock, CheckCircle, BarChart3, Users } from "lucide-react"
import Interactive3DCard, { FloatingPizzaIcon } from "@/components/3D/Interactive3DCard"
import PizzaLoader from "@/components/3D/PizzaLoader"
import { motion } from "framer-motion"

export default async function DashboardHome() {
  const session = await auth()

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <Interactive3DCard className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg p-8 border border-orange-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              {session?.user?.image && (
                <motion.img
                  className="h-20 w-20 rounded-full border-4 border-orange-300 dark:border-orange-600 shadow-lg"
                  src={session.user.image}
                  alt={session.user.name || 'User'}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              <div>
                <motion.h1
                  className="text-4xl font-bold text-gray-900 dark:text-white"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Hello, {session?.user?.name || 'User'}! 👋
                </motion.h1>
                <motion.p
                  className="text-gray-600 dark:text-gray-300 mt-2 text-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Welcome to your advanced pizza order management dashboard
                </motion.p>
              </div>
            </div>
            <div className="hidden lg:block">
              <PizzaLoader size="lg" variant="wobble" showText={false} />
            </div>
          </div>
        </Interactive3DCard>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Interactive3DCard className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <motion.div
                className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl"
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                <ShoppingCart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </motion.div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Orders</p>
                <motion.p
                  className="text-3xl font-bold text-gray-900 dark:text-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  20
                </motion.p>
              </div>
            </div>
          </Interactive3DCard>

          <Interactive3DCard className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <motion.div
                className="p-3 bg-green-100 dark:bg-green-900 rounded-xl"
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </motion.div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Delivered</p>
                <motion.p
                  className="text-3xl font-bold text-gray-900 dark:text-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  5
                </motion.p>
              </div>
            </div>
          </Interactive3DCard>

          <Interactive3DCard className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <motion.div
                className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-xl"
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </motion.div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
                <motion.p
                  className="text-3xl font-bold text-gray-900 dark:text-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  4
                </motion.p>
              </div>
            </div>
          </Interactive3DCard>

          <Interactive3DCard className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <motion.div
                className="p-3 bg-orange-100 dark:bg-orange-900 rounded-xl"
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                <TrendingUp className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </motion.div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">In Progress</p>
                <motion.p
                  className="text-3xl font-bold text-gray-900 dark:text-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  6
                </motion.p>
              </div>
            </div>
          </Interactive3DCard>
        </div>

        {/* Quick Actions */}
        <Interactive3DCard className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            🚀 Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Interactive3DCard
              className="group"
              enableTilt={true}
              enableGlow={true}
            >
              <Link
                href="/dashboard/orders"
                className="flex flex-col items-center p-6 border border-gray-200 dark:border-gray-600 rounded-xl hover:border-orange-300 hover:bg-orange-50 dark:hover:bg-gray-700 transition-all duration-300"
              >
                <motion.div
                  className="p-4 bg-orange-100 dark:bg-orange-900 rounded-xl group-hover:bg-orange-200 dark:group-hover:bg-orange-800 mb-4"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <ShoppingCart className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                </motion.div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white text-center">View All Orders</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">Manage and track pizza orders</p>
              </Link>
            </Interactive3DCard>

            <Interactive3DCard
              className="group"
              enableTilt={true}
              enableGlow={true}
            >
              <Link
                href="/dashboard/analytics"
                className="flex flex-col items-center p-6 border border-gray-200 dark:border-gray-600 rounded-xl hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-300"
              >
                <motion.div
                  className="p-4 bg-blue-100 dark:bg-blue-900 rounded-xl group-hover:bg-blue-200 dark:group-hover:bg-blue-800 mb-4"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <BarChart3 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </motion.div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white text-center">Analytics</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">View business insights</p>
              </Link>
            </Interactive3DCard>

            <Interactive3DCard
              className="group"
              enableTilt={true}
              enableGlow={true}
            >
              <Link
                href="/dashboard/staff"
                className="flex flex-col items-center p-6 border border-gray-200 dark:border-gray-600 rounded-xl hover:border-purple-300 hover:bg-purple-50 dark:hover:bg-gray-700 transition-all duration-300"
              >
                <motion.div
                  className="p-4 bg-purple-100 dark:bg-purple-900 rounded-xl group-hover:bg-purple-200 dark:group-hover:bg-purple-800 mb-4"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </motion.div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white text-center">Staff Dashboard</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">Gamified staff tracking</p>
              </Link>
            </Interactive3DCard>

            <Interactive3DCard
              className="group"
              enableTilt={true}
              enableGlow={true}
            >
              <div className="flex flex-col items-center p-6 border border-gray-200 dark:border-gray-600 rounded-xl opacity-60">
                <motion.div
                  className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl mb-4"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <TrendingUp className="h-8 w-8 text-gray-400" />
                </motion.div>
                <h3 className="text-lg font-medium text-gray-500 text-center">More Features</h3>
                <p className="text-sm text-gray-400 text-center mt-2">Coming soon...</p>
              </div>
            </Interactive3DCard>
          </div>
        </Interactive3DCard>

        {/* Floating Pizza Types */}
        <Interactive3DCard className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            🍕 Popular Pizza Types
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {['Margherita', 'Pepperoni', 'Veggie Supreme', 'Hawaiian', 'Meat Lovers'].map((pizzaType, index) => (
              <motion.div
                key={pizzaType}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <FloatingPizzaIcon
                  pizzaType={pizzaType}
                  size="lg"
                  onClick={() => console.log(`Clicked ${pizzaType}`)}
                />
              </motion.div>
            ))}
          </div>
        </Interactive3DCard>

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
