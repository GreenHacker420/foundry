"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    setIsAnimating(true)
    
    setTimeout(() => {
      const newTheme = !isDark
      setIsDark(newTheme)
      
      if (newTheme) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      }
      
      setTimeout(() => setIsAnimating(false), 1000)
    }, 500)
  }

  return (
    <div className="relative">
      <motion.button
        className={`
          relative w-16 h-8 rounded-full p-1 transition-colors duration-300
          ${isDark ? 'bg-gray-700' : 'bg-orange-200'}
        `}
        onClick={toggleTheme}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Toggle Track */}
        <motion.div
          className={`
            w-6 h-6 rounded-full shadow-lg flex items-center justify-center
            ${isDark ? 'bg-gray-900' : 'bg-orange-500'}
          `}
          animate={{
            x: isDark ? 32 : 0
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30
          }}
        >
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.div
                key="moon"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <Moon className="w-4 h-4 text-yellow-300" />
              </motion.div>
            ) : (
              <motion.div
                key="pizza"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                {/* Pizza Icon */}
                <div className="w-4 h-4 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full relative">
                  <div className="absolute top-0.5 left-1 w-0.5 h-0.5 bg-red-600 rounded-full"></div>
                  <div className="absolute bottom-0.5 right-0.5 w-0.5 h-0.5 bg-green-500 rounded-full"></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Background Icons */}
        <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
          <motion.div
            animate={{ 
              opacity: isDark ? 0.3 : 0.7,
              scale: isDark ? 0.8 : 1
            }}
          >
            <Sun className="w-3 h-3 text-orange-600" />
          </motion.div>
          <motion.div
            animate={{ 
              opacity: isDark ? 0.7 : 0.3,
              scale: isDark ? 1 : 0.8
            }}
          >
            <Moon className="w-3 h-3 text-gray-400" />
          </motion.div>
        </div>
      </motion.button>

      {/* Pizza to Moon Transformation Animation */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Transformation particles */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-1 h-1 rounded-full ${
                  isDark ? 'bg-yellow-300' : 'bg-orange-400'
                }`}
                style={{
                  left: '50%',
                  top: '50%'
                }}
                animate={{
                  x: [0, (Math.cos(i * 45 * Math.PI / 180) * 30)],
                  y: [0, (Math.sin(i * 45 * Math.PI / 180) * 30)],
                  opacity: [1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.1,
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tooltip */}
      <motion.div
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {isDark ? '🌙 Dark Mode' : '🍕 Light Mode'}
      </motion.div>
    </div>
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
