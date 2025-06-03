"use client"

import { motion } from 'framer-motion'
import { OrderProgress, OrderStage } from '@/types'
import { Circle, ChefHat, Flame, Truck, CheckCircle } from 'lucide-react'

interface OrderConveyorBeltProps {
  progress: OrderProgress
  orderId: string
  compact?: boolean
}

const STAGE_POSITIONS = {
  received: 0,
  preparing: 25,
  baking: 50,
  'out-for-delivery': 75,
  delivered: 100
}

const STAGE_CONFIG = {
  received: {
    icon: Circle,
    label: 'Received',
    color: 'bg-blue-500',
    emoji: '📥'
  },
  preparing: {
    icon: ChefHat,
    label: 'Preparing',
    color: 'bg-yellow-500',
    emoji: '👨‍🍳'
  },
  baking: {
    icon: Flame,
    label: 'Baking',
    color: 'bg-orange-500',
    emoji: '🔥'
  },
  'out-for-delivery': {
    icon: Truck,
    label: 'Out for Delivery',
    color: 'bg-purple-500',
    emoji: '🚚'
  },
  delivered: {
    icon: CheckCircle,
    label: 'Delivered',
    color: 'bg-green-500',
    emoji: '✅'
  }
}

export default function OrderConveyorBelt({ progress, orderId, compact = false }: OrderConveyorBeltProps) {
  const currentPosition = STAGE_POSITIONS[progress.currentStage]
  
  if (compact) {
    return <CompactConveyorBelt progress={progress} orderId={orderId} />
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg">
      {/* Conveyor Belt Track */}
      <div className="relative h-16 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-400 rounded-lg shadow-inner overflow-hidden">
        {/* Belt Movement Animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600 to-transparent opacity-30"
          animate={{
            x: [-100, 400]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Belt Lines */}
        <div className="absolute inset-0 flex items-center">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-0.5 h-8 bg-gray-600 opacity-50 mx-2"
              animate={{
                x: [-40, 360]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.1
              }}
            />
          ))}
        </div>

        {/* Pizza Order on Belt */}
        <motion.div
          className="absolute top-2 w-12 h-12 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full shadow-lg flex items-center justify-center"
          animate={{
            left: `${currentPosition}%`
          }}
          transition={{
            duration: 1,
            ease: "easeInOut"
          }}
          style={{
            transform: 'translateX(-50%)'
          }}
        >
          {/* Pizza Toppings */}
          <div className="relative w-8 h-8 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-full">
            <div className="absolute top-1 left-2 w-1 h-1 bg-red-600 rounded-full"></div>
            <div className="absolute top-3 right-1 w-0.5 h-0.5 bg-green-500 rounded-full"></div>
            <div className="absolute bottom-1 left-1 w-0.5 h-0.5 bg-red-600 rounded-full"></div>
            <div className="absolute bottom-2 right-2 w-1 h-1 bg-red-600 rounded-full"></div>
          </div>
          
          {/* Order ID Badge */}
          <div className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs px-1 py-0.5 rounded-full font-bold">
            {orderId.slice(-2)}
          </div>
        </motion.div>
      </div>

      {/* Stage Stations */}
      <div className="flex justify-between items-center mt-6">
        {progress.stages.map((stage, index) => {
          const config = STAGE_CONFIG[stage.stage]
          const Icon = config.icon
          const isActive = stage.stage === progress.currentStage
          const isCompleted = stage.completed

          return (
            <motion.div
              key={stage.stage}
              className="flex flex-col items-center space-y-2"
              whileHover={{ scale: 1.1 }}
            >
              {/* Station */}
              <motion.div
                className={`
                  relative w-16 h-16 rounded-lg shadow-lg flex items-center justify-center
                  ${isCompleted ? config.color : 'bg-gray-300'}
                  ${isActive ? 'ring-4 ring-orange-400 ring-opacity-50' : ''}
                `}
                animate={isActive ? {
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    '0 4px 6px rgba(0, 0, 0, 0.1)',
                    '0 8px 25px rgba(251, 146, 60, 0.3)',
                    '0 4px 6px rgba(0, 0, 0, 0.1)'
                  ]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Icon className={`w-8 h-8 ${isCompleted ? 'text-white' : 'text-gray-500'}`} />
                
                {/* Activity Indicator */}
                {isActive && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [1, 0.5, 1]
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </motion.div>

              {/* Station Label */}
              <div className="text-center">
                <div className={`text-sm font-medium ${isCompleted ? 'text-gray-900' : 'text-gray-500'}`}>
                  {config.emoji} {config.label}
                </div>
                {stage.timestamp && (
                  <div className="text-xs text-gray-400">
                    {new Date(stage.timestamp).toLocaleTimeString()}
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Progress Bar */}
      <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
        <motion.div
          className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full"
          animate={{
            width: `${currentPosition}%`
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </div>

      {/* Estimated Time */}
      {progress.estimatedMinutesRemaining && progress.estimatedMinutesRemaining > 0 && (
        <motion.div
          className="mt-3 text-center text-sm text-gray-600"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ⏱️ Estimated completion: {progress.estimatedMinutesRemaining} minutes
        </motion.div>
      )}
    </div>
  )
}

// Compact version for table rows
function CompactConveyorBelt({ progress, orderId }: { progress: OrderProgress, orderId: string }) {
  const currentPosition = STAGE_POSITIONS[progress.currentStage]

  return (
    <div className="relative w-full h-8 bg-gray-200 rounded-full overflow-hidden">
      {/* Mini conveyor belt */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50"
        animate={{ x: [-50, 200] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />

      {/* Progress fill */}
      <motion.div
        className="absolute left-0 top-0 h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full"
        animate={{ width: `${currentPosition}%` }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />

      {/* Mini pizza */}
      <motion.div
        className="absolute top-1 w-6 h-6 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full shadow-sm flex items-center justify-center"
        animate={{ left: `${currentPosition}%` }}
        transition={{ duration: 1, ease: "easeInOut" }}
        style={{ transform: 'translateX(-50%)' }}
      >
        <div className="w-4 h-4 bg-yellow-200 rounded-full relative">
          <div className="absolute top-0.5 left-1 w-0.5 h-0.5 bg-red-600 rounded-full"></div>
          <div className="absolute bottom-0.5 right-0.5 w-0.5 h-0.5 bg-green-500 rounded-full"></div>
        </div>
      </motion.div>

      {/* Stage emoji indicator */}
      <div className="absolute right-2 top-1 text-sm">
        {STAGE_CONFIG[progress.currentStage].emoji}
      </div>
    </div>
  )
}
