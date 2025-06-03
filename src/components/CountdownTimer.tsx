"use client"

import { useState, useEffect } from 'react'
import { Clock, AlertCircle } from 'lucide-react'
import clsx from 'clsx'

interface CountdownTimerProps {
  targetTime: string // ISO string
  onExpired?: () => void
  showIcon?: boolean
  variant?: 'default' | 'compact' | 'badge'
  urgentThreshold?: number // minutes
}

interface TimeRemaining {
  hours: number
  minutes: number
  seconds: number
  total: number
}

export default function CountdownTimer({ 
  targetTime, 
  onExpired,
  showIcon = true,
  variant = 'default',
  urgentThreshold = 10
}: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 0
  })

  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date().getTime()
      const target = new Date(targetTime).getTime()
      const difference = target - now

      if (difference <= 0) {
        setTimeRemaining({ hours: 0, minutes: 0, seconds: 0, total: 0 })
        if (!isExpired) {
          setIsExpired(true)
          onExpired?.()
        }
        return
      }

      const hours = Math.floor(difference / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)
      const totalMinutes = Math.floor(difference / (1000 * 60))

      setTimeRemaining({ hours, minutes, seconds, total: totalMinutes })
      setIsExpired(false)
    }

    calculateTimeRemaining()
    const interval = setInterval(calculateTimeRemaining, 1000)

    return () => clearInterval(interval)
  }, [targetTime, isExpired, onExpired])

  const isUrgent = timeRemaining.total <= urgentThreshold && timeRemaining.total > 0
  const formatTime = (value: number) => value.toString().padStart(2, '0')

  if (variant === 'badge') {
    return (
      <span className={clsx(
        'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
        isExpired 
          ? 'bg-red-100 text-red-800' 
          : isUrgent 
            ? 'bg-yellow-100 text-yellow-800' 
            : 'bg-blue-100 text-blue-800'
      )}>
        {showIcon && (
          <Clock className={clsx(
            'w-3 h-3 mr-1',
            isUrgent && 'animate-pulse'
          )} />
        )}
        {isExpired ? 'Overdue' : `${timeRemaining.total}m`}
      </span>
    )
  }

  if (variant === 'compact') {
    return (
      <div className={clsx(
        'flex items-center space-x-1 text-sm',
        isExpired 
          ? 'text-red-600' 
          : isUrgent 
            ? 'text-yellow-600' 
            : 'text-gray-600'
      )}>
        {showIcon && (
          <Clock className={clsx(
            'w-4 h-4',
            isUrgent && 'animate-pulse'
          )} />
        )}
        <span className="font-mono">
          {isExpired 
            ? 'Overdue' 
            : timeRemaining.hours > 0 
              ? `${formatTime(timeRemaining.hours)}:${formatTime(timeRemaining.minutes)}:${formatTime(timeRemaining.seconds)}`
              : `${formatTime(timeRemaining.minutes)}:${formatTime(timeRemaining.seconds)}`
          }
        </span>
      </div>
    )
  }

  return (
    <div className={clsx(
      'flex items-center space-x-2 p-3 rounded-lg border',
      isExpired 
        ? 'bg-red-50 border-red-200 text-red-700' 
        : isUrgent 
          ? 'bg-yellow-50 border-yellow-200 text-yellow-700' 
          : 'bg-blue-50 border-blue-200 text-blue-700'
    )}>
      {showIcon && (
        <div className={clsx(
          'flex items-center justify-center w-8 h-8 rounded-full',
          isExpired 
            ? 'bg-red-100' 
            : isUrgent 
              ? 'bg-yellow-100' 
              : 'bg-blue-100'
        )}>
          {isExpired ? (
            <AlertCircle className="w-4 h-4" />
          ) : (
            <Clock className={clsx(
              'w-4 h-4',
              isUrgent && 'animate-pulse'
            )} />
          )}
        </div>
      )}
      
      <div className="flex-1">
        <div className="text-sm font-medium">
          {isExpired ? 'Delivery Overdue' : 'Estimated Delivery'}
        </div>
        <div className="text-lg font-mono font-bold">
          {isExpired 
            ? 'Please contact customer' 
            : timeRemaining.hours > 0 
              ? `${formatTime(timeRemaining.hours)}:${formatTime(timeRemaining.minutes)}:${formatTime(timeRemaining.seconds)}`
              : `${formatTime(timeRemaining.minutes)}:${formatTime(timeRemaining.seconds)}`
          }
        </div>
        {!isExpired && (
          <div className="text-xs opacity-75">
            {timeRemaining.total === 1 ? '1 minute' : `${timeRemaining.total} minutes`} remaining
          </div>
        )}
      </div>
    </div>
  )
}
