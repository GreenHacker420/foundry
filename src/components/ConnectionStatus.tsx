"use client"

import { RealTimeConnection } from '@/types'
import { Wifi, WifiOff, RefreshCw, AlertTriangle } from 'lucide-react'
import clsx from 'clsx'

interface ConnectionStatusProps {
  connection: RealTimeConnection
  onReconnect?: () => void
  compact?: boolean
}

export default function ConnectionStatus({ 
  connection, 
  onReconnect,
  compact = false 
}: ConnectionStatusProps) {
  const getStatusConfig = () => {
    if (connection.connected) {
      return {
        icon: Wifi,
        label: 'Connected',
        description: `Real-time updates via ${connection.connectionType.toUpperCase()}`,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200'
      }
    }

    if (connection.connectionType === 'offline') {
      return {
        icon: WifiOff,
        label: 'Offline',
        description: 'No real-time updates available',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200'
      }
    }

    return {
      icon: AlertTriangle,
      label: 'Reconnecting',
      description: `Attempt ${connection.reconnectAttempts}/5`,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    }
  }

  const config = getStatusConfig()
  const Icon = config.icon

  if (compact) {
    return (
      <div className={clsx(
        'flex items-center space-x-2 px-2 py-1 rounded-full text-xs',
        config.bgColor,
        config.color
      )}>
        <Icon className={clsx(
          'w-3 h-3',
          !connection.connected && connection.connectionType !== 'offline' && 'animate-spin'
        )} />
        <span className="font-medium">{config.label}</span>
        {!connection.connected && connection.connectionType !== 'offline' && (
          <button
            onClick={onReconnect}
            className="ml-1 p-0.5 hover:bg-white hover:bg-opacity-50 rounded"
            title="Retry connection"
          >
            <RefreshCw className="w-3 h-3" />
          </button>
        )}
      </div>
    )
  }

  return (
    <div className={clsx(
      'flex items-center justify-between p-3 rounded-lg border',
      config.bgColor,
      config.borderColor
    )}>
      <div className="flex items-center space-x-3">
        <div className={clsx(
          'flex items-center justify-center w-8 h-8 rounded-full bg-white bg-opacity-50'
        )}>
          <Icon className={clsx(
            'w-4 h-4',
            config.color,
            !connection.connected && connection.connectionType !== 'offline' && 'animate-spin'
          )} />
        </div>
        
        <div>
          <div className={clsx('text-sm font-medium', config.color)}>
            {config.label}
          </div>
          <div className={clsx('text-xs opacity-75', config.color)}>
            {config.description}
          </div>
          {connection.lastHeartbeat && (
            <div className={clsx('text-xs opacity-60', config.color)}>
              Last update: {new Date(connection.lastHeartbeat).toLocaleTimeString()}
            </div>
          )}
        </div>
      </div>

      {!connection.connected && connection.connectionType !== 'offline' && onReconnect && (
        <button
          onClick={onReconnect}
          className={clsx(
            'flex items-center space-x-1 px-3 py-1 rounded-md text-xs font-medium transition-colors',
            'bg-white bg-opacity-50 hover:bg-opacity-75',
            config.color
          )}
        >
          <RefreshCw className="w-3 h-3" />
          <span>Retry</span>
        </button>
      )}
    </div>
  )
}
