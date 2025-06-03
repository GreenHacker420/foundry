"use client"

import { motion } from "framer-motion"
import PizzaOven, { ChefCharacter } from "./3D/PizzaOven"
import DarkModeToggle from "./DarkModeToggle"

export default function DashboardHeader() {
  return (
    <div className="flex items-center space-x-6">
      <div className="flex-shrink-0 flex items-center space-x-4">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
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
  return (
    <div className="flex items-center space-x-4">
      {/* Dark Mode Toggle */}
      <DarkModeToggle />

      <div className="flex items-center space-x-3">
        {userImage && (
          <motion.img
            className="h-10 w-10 rounded-full border-2 border-orange-200 dark:border-orange-600"
            src={userImage}
            alt={userName || 'User'}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          />
        )}
        <div className="hidden md:block">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {userName}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {userEmail}
          </div>
        </div>
      </div>
    </div>
  )
}
