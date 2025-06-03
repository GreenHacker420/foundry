import { auth, signOut } from "@/lib/auth"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Home, ShoppingCart, LogOut, User } from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const session = await auth()
  
  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl">🍕</span>
                <span className="ml-2 text-xl font-bold text-gray-900">
                  Pizza Dashboard
                </span>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:ml-10 md:flex md:space-x-8">
                <Link
                  href="/dashboard"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50 rounded-md transition-colors"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Link>
                <Link
                  href="/dashboard/orders"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50 rounded-md transition-colors"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Orders
                </Link>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                {session.user?.image && (
                  <img
                    className="h-8 w-8 rounded-full"
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                  />
                )}
                <div className="hidden md:block">
                  <div className="text-sm font-medium text-gray-900">
                    {session.user?.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {session.user?.email}
                  </div>
                </div>
              </div>
              
              <form
                action={async () => {
                  "use server"
                  await signOut({ redirectTo: "/auth/signin" })
                }}
              >
                <button
                  type="submit"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-md transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  <span className="hidden md:block">Sign Out</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50 rounded-md"
            >
              <Home className="w-5 h-5 mr-3" />
              Home
            </Link>
            <Link
              href="/dashboard/orders"
              className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50 rounded-md"
            >
              <ShoppingCart className="w-5 h-5 mr-3" />
              Orders
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}
