"use client"

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function PizzaOven() {
  const [isActive, setIsActive] = useState(false)
  const [steamParticles, setSteamParticles] = useState<number[]>([])

  useEffect(() => {
    // Generate steam particles
    const particles = Array.from({ length: 6 }, (_, i) => i)
    setSteamParticles(particles)
    
    // Auto-activate oven periodically
    const interval = setInterval(() => {
      setIsActive(true)
      setTimeout(() => setIsActive(false), 3000)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">
      <motion.div
        className="relative w-32 h-24 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        onClick={() => setIsActive(!isActive)}
      >
        {/* Oven Base */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-600 to-gray-800 rounded-lg shadow-xl">
          {/* Oven Door */}
          <div className="absolute inset-2 bg-gradient-to-br from-gray-900 to-black rounded border-2 border-gray-500">
            {/* Oven Window */}
            <div className="absolute top-2 left-2 right-2 h-8 bg-gradient-to-br from-orange-400 to-red-600 rounded opacity-80">
              {/* Fire effect inside */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-red-600 via-orange-500 to-yellow-400 rounded"
                  animate={{
                    opacity: [0.6, 1, 0.6],
                    scale: [0.95, 1.05, 0.95]
                  }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              )}
              
              {/* Pizza inside */}
              <motion.div
                className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full"
                animate={isActive ? {
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {/* Pizza toppings */}
                <div className="absolute top-1 left-1 w-1 h-1 bg-red-600 rounded-full"></div>
                <div className="absolute top-2 right-1 w-0.5 h-0.5 bg-green-500 rounded-full"></div>
                <div className="absolute bottom-1 left-2 w-0.5 h-0.5 bg-red-600 rounded-full"></div>
              </motion.div>
            </div>
            
            {/* Oven Handle */}
            <div className="absolute right-1 top-1/2 transform -translate-y-1/2 w-1 h-4 bg-gray-400 rounded-full"></div>
          </div>
          
          {/* Control Panel */}
          <div className="absolute bottom-1 left-2 right-2 h-2 bg-gray-700 rounded flex items-center justify-center space-x-1">
            <div className={`w-1 h-1 rounded-full ${isActive ? 'bg-red-500' : 'bg-gray-500'}`}></div>
            <div className={`w-1 h-1 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-500'}`}></div>
            <div className={`w-1 h-1 rounded-full ${isActive ? 'bg-blue-500' : 'bg-gray-500'}`}></div>
          </div>
        </div>

        {/* Steam Effects */}
        {isActive && steamParticles.map((particle) => (
          <motion.div
            key={particle}
            className="absolute w-2 h-2 bg-white rounded-full opacity-60"
            style={{
              left: `${20 + particle * 8}%`,
              top: '10%'
            }}
            animate={{
              y: [-5, -25, -45],
              opacity: [0, 0.6, 0],
              scale: [0.5, 1, 1.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: particle * 0.3,
              ease: "easeOut"
            }}
          />
        ))}
      </motion.div>
      
      {/* Oven Label */}
      <motion.div
        className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 font-medium"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {isActive ? '🔥 Baking...' : '🍕 Pizza Oven'}
      </motion.div>
    </div>
  )
}

// Chef Character Component
export function ChefCharacter() {
  const [isWorking, setIsWorking] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsWorking(true)
      setTimeout(() => setIsWorking(false), 2000)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="relative w-16 h-20 cursor-pointer"
      whileHover={{ scale: 1.1 }}
      onClick={() => setIsWorking(!isWorking)}
    >
      {/* Chef Hat */}
      <motion.div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-6 bg-white rounded-t-full border-b-2 border-gray-200"
        animate={isWorking ? {
          rotate: [0, 2, -2, 0]
        } : {}}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        {/* Hat band */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded"></div>
      </motion.div>

      {/* Chef Head */}
      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-pink-200 to-pink-300 rounded-full">
        {/* Eyes */}
        <div className="absolute top-2 left-1 w-1 h-1 bg-black rounded-full"></div>
        <div className="absolute top-2 right-1 w-1 h-1 bg-black rounded-full"></div>
        {/* Mustache */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-0.5 bg-gray-700 rounded-full"></div>
      </div>

      {/* Chef Body */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white rounded border border-gray-200">
        {/* Buttons */}
        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-0.5 h-0.5 bg-gray-400 rounded-full"></div>
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-0.5 h-0.5 bg-gray-400 rounded-full"></div>
        <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-0.5 h-0.5 bg-gray-400 rounded-full"></div>
      </div>

      {/* Chef Arms */}
      <motion.div
        className="absolute top-12 left-0 w-2 h-4 bg-white rounded"
        animate={isWorking ? {
          rotate: [0, 20, -20, 0]
        } : {}}
        transition={{ duration: 0.3, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-12 right-0 w-2 h-4 bg-white rounded"
        animate={isWorking ? {
          rotate: [0, -20, 20, 0]
        } : {}}
        transition={{ duration: 0.3, repeat: Infinity }}
      />

      {/* Pizza in hand when working */}
      {isWorking && (
        <motion.div
          className="absolute top-14 right-2 w-3 h-3 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full"
          animate={{
            y: [0, -2, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          <div className="absolute top-0.5 left-0.5 w-0.5 h-0.5 bg-red-600 rounded-full"></div>
          <div className="absolute bottom-0.5 right-0.5 w-0.5 h-0.5 bg-green-500 rounded-full"></div>
        </motion.div>
      )}

      {/* Work status */}
      <motion.div
        className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 font-medium whitespace-nowrap"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {isWorking ? '👨‍🍳 Cooking!' : '👨‍🍳 Chef Mario'}
      </motion.div>
    </motion.div>
  )
}
