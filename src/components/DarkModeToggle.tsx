"use client"

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Check current state from DOM (which was set by the inline script)
    const currentlyDark = document.documentElement.classList.contains('dark')
    setIsDark(currentlyDark)

    // Also check localStorage to ensure consistency
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark)

    // If there's a mismatch, fix it
    if (currentlyDark !== shouldBeDark) {
      if (shouldBeDark) {
        document.documentElement.classList.add('dark')
        setIsDark(true)
      } else {
        document.documentElement.classList.remove('dark')
        setIsDark(false)
      }
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark

    // Update state first
    setIsDark(newTheme)

    // Apply theme changes immediately to DOM
    if (newTheme) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
    )
  }

  return (
    <motion.button
      className={`
        relative flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 cursor-pointer
        ${isDark
          ? 'bg-gray-700 hover:bg-gray-600 text-yellow-300'
          : 'bg-orange-100 hover:bg-orange-200 text-orange-600'
        }
      `}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleTheme()
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      type="button"
    >
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 180 : 0,
          scale: 1
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut"
        }}
      >
        {isDark ? (
          <Moon className="w-5 h-5" />
        ) : (
          <Sun className="w-5 h-5" />
        )}
      </motion.div>
    </motion.button>
  )
}

// Enhanced Dark Mode Provider
export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <motion.div
      className="min-h-screen transition-colors duration-300"
      initial={false}
    >
      {children}
    </motion.div>
  )
}
