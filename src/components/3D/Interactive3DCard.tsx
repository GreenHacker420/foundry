"use client"

import { motion } from 'framer-motion'
import { useState, useRef } from 'react'

interface Interactive3DCardProps {
  children: React.ReactNode
  className?: string
  intensity?: number
  enableTilt?: boolean
  enableGlow?: boolean
  enableFloat?: boolean
}

export default function Interactive3DCard({
  children,
  className = '',
  intensity = 10,
  enableTilt = true,
  enableGlow = true,
  enableFloat = false
}: Interactive3DCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || !enableTilt) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY
    
    setMousePosition({ x: mouseX, y: mouseY })
  }

  const tiltX = enableTilt ? (mousePosition.y / 10) * intensity : 0
  const tiltY = enableTilt ? -(mousePosition.x / 10) * intensity : 0

  return (
    <motion.div
      ref={cardRef}
      className={`relative transform-gpu ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setMousePosition({ x: 0, y: 0 })
      }}
      onMouseMove={handleMouseMove}
      animate={{
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        y: 0
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
    >
      {/* Glow effect */}
      {enableGlow && isHovered && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg opacity-20 blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          exit={{ opacity: 0 }}
        />
      )}

      {/* Card content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Shine effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10 rounded-lg"
          animate={{
            x: [-100, 100]
          }}
          transition={{
            duration: 0.6,
            ease: "easeInOut"
          }}
          style={{
            transform: `rotateZ(${Math.atan2(mousePosition.y, mousePosition.x) * (180 / Math.PI)}deg)`
          }}
        />
      )}
    </motion.div>
  )
}

// Cheese Pull Button Effect
export function CheesePullButton({
  children,
  onClick,
  className = '',
  variant = 'primary'
}: {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary'
}) {
  const [isPressed, setIsPressed] = useState(false)
  const [showCheese, setShowCheese] = useState(false)

  const baseClasses = {
    primary: 'bg-gradient-to-r from-orange-500 to-red-500 text-white',
    secondary: 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white'
  }

  return (
    <motion.button
      className={`
        relative px-6 py-3 rounded-lg font-medium shadow-lg overflow-hidden
        ${baseClasses[variant]} ${className}
      `}
      onMouseEnter={() => setShowCheese(true)}
      onMouseLeave={() => setShowCheese(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
    >
      {/* Cheese stretch effect */}
      {showCheese && (
        <motion.div
          className="absolute bottom-0 left-1/2 w-2 bg-gradient-to-b from-yellow-300 to-yellow-400 rounded-b-full"
          initial={{ height: 0, x: '-50%' }}
          animate={{ 
            height: isPressed ? 20 : 10,
            x: '-50%'
          }}
          exit={{ height: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      )}

      {/* Button content */}
      <span className="relative z-10">{children}</span>

      {/* Bubble effect */}
      {isPressed && (
        <motion.div
          className="absolute inset-0 bg-white opacity-20 rounded-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.button>
  )
}

// Floating Pizza Icon
export function FloatingPizzaIcon({
  pizzaType,
  size = 'md',
  onClick
}: {
  pizzaType: string
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  }

  const getPizzaConfig = (type: string) => {
    const configs = {
      'Margherita': { base: 'from-yellow-300 to-orange-400', toppings: ['🍅', '🧀'] },
      'Pepperoni': { base: 'from-yellow-300 to-orange-400', toppings: ['🍕', '🧀'] },
      'Veggie Supreme': { base: 'from-yellow-300 to-orange-400', toppings: ['🥬', '🍅', '🧀'] },
      'Hawaiian': { base: 'from-yellow-300 to-orange-400', toppings: ['🍍', '🥓', '🧀'] },
      'Meat Lovers': { base: 'from-yellow-300 to-orange-400', toppings: ['🥓', '🍖', '🧀'] },
      'BBQ Chicken': { base: 'from-yellow-300 to-orange-400', toppings: ['🍗', '🧅', '🧀'] },
      'Four Cheese': { base: 'from-yellow-200 to-yellow-300', toppings: ['🧀', '🧀', '🧀'] },
      'Mushroom & Olive': { base: 'from-yellow-300 to-orange-400', toppings: ['🍄', '🫒', '🧀'] },
      'Spicy Italian': { base: 'from-yellow-300 to-orange-400', toppings: ['🌶️', '🍕', '🧀'] }
    }
    return configs[type as keyof typeof configs] || configs['Margherita']
  }

  const config = getPizzaConfig(pizzaType)

  return (
    <motion.div
      className={`
        ${sizeClasses[size]} relative cursor-pointer
        bg-gradient-to-br ${config.base} rounded-full shadow-lg
        border-4 border-yellow-200
      `}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      animate={{
        y: 0,
        rotate: 0,
        scale: 1
      }}
      transition={{
        duration: 0.2
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Pizza toppings */}
      <div className="absolute inset-2 flex items-center justify-center flex-wrap">
        {config.toppings.map((topping, index) => (
          <motion.span
            key={index}
            className="text-xs"
            animate={{}}
            transition={{
              duration: 0.5,
              delay: index * 0.1
            }}
          >
            {topping}
          </motion.span>
        ))}
      </div>

      {/* Hover glow */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-orange-400 rounded-full opacity-20 blur-md"
          initial={{ scale: 0 }}
          animate={{ scale: 1.2 }}
          exit={{ scale: 0 }}
        />
      )}

      {/* Pizza type label */}
      <motion.div
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700 whitespace-nowrap"
        animate={{ opacity: isHovered ? 1 : 0.7 }}
      >
        {pizzaType}
      </motion.div>
    </motion.div>
  )
}
