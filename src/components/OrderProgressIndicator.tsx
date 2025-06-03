"use client"

import { OrderProgress } from '@/types'
import { Clock, ChefHat, Flame, Truck, CheckCircle, Circle } from 'lucide-react'
import clsx from 'clsx'

interface OrderProgressIndicatorProps {
  progress: OrderProgress
  compact?: boolean
  showTimer?: boolean
}

const STAGE_CONFIG = {
  received: {
    icon: Circle,
    label: 'Received',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  preparing: {
    icon: ChefHat,
    label: 'Preparing',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100'
  },
  baking: {
    icon: Flame,
    label: 'Baking',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100'
  },
  'out-for-delivery': {
    icon: Truck,
    label: 'Out for Delivery',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  delivered: {
    icon: CheckCircle,
    label: 'Delivered',
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  }
}

export default function OrderProgressIndicator({ 
  progress, 
  compact = false, 
  showTimer = true 
}: OrderProgressIndicatorProps) {
  if (compact) {
    return <CompactProgressIndicator progress={progress} showTimer={showTimer} />
  }

  return (
    <div className="space-y-4">
      {showTimer && progress.estimatedMinutesRemaining !== undefined && progress.estimatedMinutesRemaining > 0 && (
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>
            Estimated delivery: {progress.estimatedMinutesRemaining} minutes
          </span>
        </div>
      )}
      
      <div className="space-y-3">
        {progress.stages.map((stage, index) => {
          const config = STAGE_CONFIG[stage.stage]
          const Icon = config.icon
          const isActive = stage.stage === progress.currentStage
          const isCompleted = stage.completed
          
          return (
            <div key={stage.stage} className="flex items-center space-x-3">
              <div className={clsx(
                'flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300',
                isCompleted 
                  ? `${config.bgColor} ${config.color}` 
                  : 'bg-gray-100 text-gray-400',
                isActive && 'ring-2 ring-offset-2 ring-orange-500 animate-pulse'
              )}>
                <Icon className="w-4 h-4" />
              </div>
              
              <div className="flex-1">
                <div className={clsx(
                  'text-sm font-medium transition-colors duration-300',
                  isCompleted ? 'text-gray-900' : 'text-gray-500'
                )}>
                  {config.label}
                </div>
                {stage.timestamp && (
                  <div className="text-xs text-gray-500">
                    {new Date(stage.timestamp).toLocaleTimeString()}
                  </div>
                )}
              </div>
              
              {index < progress.stages.length - 1 && (
                <div className={clsx(
                  'w-px h-6 transition-colors duration-300',
                  isCompleted ? 'bg-gray-300' : 'bg-gray-200'
                )} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function CompactProgressIndicator({ progress, showTimer }: { progress: OrderProgress, showTimer: boolean }) {
  const completedStages = progress.stages.filter(s => s.completed).length
  const totalStages = progress.stages.length
  const progressPercentage = (completedStages / totalStages) * 100

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-gray-700">
          {STAGE_CONFIG[progress.currentStage].label}
        </span>
        {showTimer && progress.estimatedMinutesRemaining !== undefined && progress.estimatedMinutesRemaining > 0 && (
          <span className="text-gray-500 flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{progress.estimatedMinutesRemaining}m</span>
          </span>
        )}
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      <div className="flex justify-between">
        {progress.stages.map((stage) => {
          const config = STAGE_CONFIG[stage.stage]
          const Icon = config.icon
          const isCompleted = stage.completed
          const isActive = stage.stage === progress.currentStage
          
          return (
            <div
              key={stage.stage}
              className={clsx(
                'flex items-center justify-center w-6 h-6 rounded-full transition-all duration-300',
                isCompleted 
                  ? `${config.bgColor} ${config.color}` 
                  : 'bg-gray-100 text-gray-400',
                isActive && 'ring-2 ring-orange-500 animate-pulse'
              )}
            >
              <Icon className="w-3 h-3" />
            </div>
          )
        })}
      </div>
    </div>
  )
}
