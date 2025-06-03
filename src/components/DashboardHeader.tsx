"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import PizzaOven, { ChefCharacter } from "./3D/PizzaOven"
import DarkModeToggle from "./DarkModeToggle"

export default function DashboardHeader() {
  return (
    <div className="flex items-center space-x-6">
      <div className="flex-shrink-0 flex items-center space-x-4">
        <motion.div
          className="text-3xl cursor-pointer"
        >
          🍕
        </motion.div>
        <span className="text-xl font-bold text-gray-900 dark:text-white">
          Pizza Dashboard
        </span>
      </div>

      {/* 3D Interactive Elements */}
      <div className="hidden lg:flex items-center space-x-6">
        <PizzaOven />
        <ChefCharacter />
      </div>
    </div>
  )
}

// Separate component for user menu
export function UserMenu({ userImage, userName, userEmail }: {
  userImage?: string | null
  userName?: string | null
  userEmail?: string | null
}) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div className="flex items-center space-x-4">
      {/* Dark Mode Toggle */}
      <DarkModeToggle />

      <div className="flex items-center space-x-3">
        {/* Profile Picture with Fallback */}
        <div className="relative">
          {userImage && !imageError ? (
            <motion.img
              className="h-10 w-10 rounded-full border-2 border-orange-200 dark:border-orange-600 object-cover"
              src={userImage}
              alt={userName || 'User'}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              style={{
                opacity: imageLoaded ? 1 : 0,
                transition: 'opacity 0.2s ease-in-out'
              }}
            />
          ) : (
            <div className="h-10 w-10 rounded-full border-2 border-orange-200 dark:border-orange-600 bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {userName ? userName.charAt(0).toUpperCase() : 'U'}
              </span>
            </div>
          )}

          {/* Loading indicator */}
          {userImage && !imageLoaded && !imageError && (
            <div className="absolute inset-0 h-10 w-10 rounded-full border-2 border-orange-200 dark:border-orange-600 bg-gray-200 dark:bg-gray-700 animate-pulse" />
          )}
        </div>

        <div className="hidden md:block">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {userName || 'User'}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {userEmail || 'No email'}
          </div>
        </div>
      </div>
    </div>
  )
}
