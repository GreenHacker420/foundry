import { auth, signOut } from "@/lib/auth"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Home, ShoppingCart, LogOut, User, BarChart3, Users } from "lucide-react"
import DashboardHeader, { UserMenu } from "./DashboardHeader"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const session = await auth()
  
  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Navigation Header */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            {/* Left side - Logo and 3D Elements */}
            <DashboardHeader />

            {/* Center - Navigation */}
            <div className="flex items-center space-x-8">
              {/* Desktop Navigation */}
              <div className="hidden md:flex md:space-x-6">
                <Link
                  href="/dashboard"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Link>
                <Link
                  href="/dashboard/orders"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Orders
                </Link>
                <Link
                  href="/dashboard/analytics"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics
                </Link>
                <Link
                  href="/dashboard/staff"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Staff
                </Link>
              </div>
            </div>

            {/* Right side - User Menu and Sign Out */}
            <div className="flex items-center space-x-4">
              <UserMenu
                userImage={session.user?.image}
                userName={session.user?.name}
                userEmail={session.user?.email}
              />
              
              <form
                action={async () => {
                  "use server"
                  await signOut({ redirectTo: "/auth/signin" })
                }}
              >
                <button
                  type="submit"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-red-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors hover:scale-105 active:scale-95 transform duration-200"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  <span className="hidden md:block">Sign Out</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
            >
              <Home className="w-5 h-5 mr-3" />
              Home
            </Link>
            <Link
              href="/dashboard/orders"
              className="flex items-center px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
            >
              <ShoppingCart className="w-5 h-5 mr-3" />
              Orders
            </Link>
            <Link
              href="/dashboard/analytics"
              className="flex items-center px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
            >
              <BarChart3 className="w-5 h-5 mr-3" />
              Analytics
            </Link>
            <Link
              href="/dashboard/staff"
              className="flex items-center px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
            >
              <Users className="w-5 h-5 mr-3" />
              Staff
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="w-full py-6 px-4 sm:px-6 lg:px-8">
        <div className="w-full">
          {children}
        </div>
      </main>
    </div>
  )
}
