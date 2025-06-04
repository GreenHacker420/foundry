"use client"

import { signOut } from "next-auth/react"
import ModernNavbar from "./ModernNavbar"

interface ModernDashboardLayoutClientProps {
  children: React.ReactNode
  userImage?: string | null
  userName?: string | null
  userEmail?: string | null
}

export default function ModernDashboardLayoutClient({ 
  children, 
  userImage, 
  userName, 
  userEmail 
}: ModernDashboardLayoutClientProps) {
  
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/auth/signin" })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <ModernNavbar
        userImage={userImage}
        userName={userName}
        userEmail={userEmail}
        onSignOut={handleSignOut}
      />
      
      {/* Main Content */}
      <main className="w-full py-6 px-4 sm:px-6 lg:px-8">
        <div className="w-full">
          {children}
        </div>
      </main>
    </div>
  )
}
