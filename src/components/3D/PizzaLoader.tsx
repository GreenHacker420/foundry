"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'

interface PizzaLoaderProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'spinner' | 'bounce' | 'wobble'
  showText?: boolean
  text?: string
}

export default function PizzaLoader({ 
  size = 'md', 
  variant = 'spinner',
  showText = true,
  text = 'Loading delicious pizza...'
}: PizzaLoaderProps) {
  const [isHovered, setIsHovered] = useState(false)

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  }

  const animations = {
    spinner: {
      animate: { rotate: 360 },
      transition: { duration: 2, repeat: Infinity, ease: "linear" }
    },
    bounce: {
      animate: { y: [0, -10, 0] },
      transition: { duration: 1, repeat: Infinity, ease: "easeInOut" }
    },
    wobble: {
      animate: { 
        rotate: [0, 5, -5, 0],
        scale: isHovered ? 1.1 : 1
      },
      transition: { 
        rotate: { duration: 0.5, repeat: Infinity },
        scale: { duration: 0.2 }
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <motion.div
        className={`${sizeClasses[size]} relative cursor-pointer`}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        {...animations[variant]}
      >
        {/* Pizza Base */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg">
          {/* Crust */}
          <div className="absolute inset-1 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full">
            {/* Cheese */}
            <div className="absolute inset-2 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-full">
              {/* Pepperoni */}
              <div className="absolute top-2 left-3 w-2 h-2 bg-red-600 rounded-full shadow-sm"></div>
              <div className="absolute top-4 right-2 w-1.5 h-1.5 bg-red-600 rounded-full shadow-sm"></div>
              <div className="absolute bottom-3 left-2 w-1.5 h-1.5 bg-red-600 rounded-full shadow-sm"></div>
              <div className="absolute bottom-2 right-3 w-2 h-2 bg-red-600 rounded-full shadow-sm"></div>
              
              {/* Basil leaves */}
              <div className="absolute top-3 left-4 w-1 h-1 bg-green-500 rounded-full"></div>
              <div className="absolute bottom-4 right-4 w-1 h-1 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* 3D Effect Shadow */}
        <div className="absolute -bottom-1 -right-1 w-full h-full bg-orange-600 rounded-full opacity-30 blur-sm"></div>
        
        {/* Sparkle Effects */}
        {isHovered && (
          <>
            <motion.div
              className="absolute -top-2 -left-2 w-1 h-1 bg-yellow-300 rounded-full"
              animate={{ 
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 1, repeat: Infinity, delay: 0 }}
            />
            <motion.div
              className="absolute -top-1 -right-3 w-1 h-1 bg-yellow-300 rounded-full"
              animate={{ 
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
            />
            <motion.div
              className="absolute -bottom-2 -left-3 w-1 h-1 bg-yellow-300 rounded-full"
              animate={{ 
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
            />
          </>
        )}
      </motion.div>

      {showText && (
        <motion.p
          className="text-sm text-gray-600 font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {text}
        </motion.p>
      )}
    </div>
  )
}

// Pizza Slice Loader variant
export function PizzaSliceLoader({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-18 h-18'
  }

  return (
    <motion.div
      className={`${sizeClasses[size]} relative`}
      animate={{ rotate: 360 }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
    >
      {/* Pizza Slice Shape */}
      <div
        className="w-full h-full bg-gradient-to-br from-yellow-400 to-orange-500 relative"
        style={{
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
        }}
      >
        {/* Cheese drip effect */}
        <div
          className="absolute inset-1 bg-gradient-to-br from-yellow-200 to-yellow-300"
          style={{
            clipPath: 'polygon(50% 10%, 10% 90%, 90% 90%)'
          }}
        >
          {/* Toppings */}
          <div className="absolute top-4 left-1/2 w-1 h-1 bg-red-600 rounded-full transform -translate-x-1/2"></div>
          <div className="absolute top-6 left-1/3 w-0.5 h-0.5 bg-green-500 rounded-full"></div>
          <div className="absolute top-6 right-1/3 w-0.5 h-0.5 bg-red-600 rounded-full"></div>
        </div>
      </div>
    </motion.div>
  )
}
