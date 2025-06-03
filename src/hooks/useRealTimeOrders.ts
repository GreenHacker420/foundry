"use client"

import { useState, useEffect, useCallback, useRef } from 'react'
import { PizzaOrder, OrderUpdate, RealTimeConnection } from '@/types'

interface UseRealTimeOrdersOptions {
  initialOrders: PizzaOrder[]
  enableRealTime?: boolean
  reconnectInterval?: number
  maxReconnectAttempts?: number
}

interface UseRealTimeOrdersReturn {
  orders: PizzaOrder[]
  connection: RealTimeConnection
  updateOrder: (orderId: string, updates: Partial<PizzaOrder>) => void
  reconnect: () => void
}

export function useRealTimeOrders({
  initialOrders,
  enableRealTime = true,
  reconnectInterval = 5000,
  maxReconnectAttempts = 5
}: UseRealTimeOrdersOptions): UseRealTimeOrdersReturn {
  const [orders, setOrders] = useState<PizzaOrder[]>(initialOrders)
  const [connection, setConnection] = useState<RealTimeConnection>({
    connected: false,
    connectionType: 'offline',
    reconnectAttempts: 0
  })

  const eventSourceRef = useRef<EventSource | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const heartbeatIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const updateOrder = useCallback((orderId: string, updates: Partial<PizzaOrder>) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, ...updates, lastUpdated: new Date().toISOString() }
          : order
      )
    )
  }, [])

  const handleOrderUpdate = useCallback((update: OrderUpdate) => {
    updateOrder(update.orderId, {
      status: update.status,
      progress: update.progress,
      estimatedDeliveryTime: update.estimatedDeliveryTime,
      lastUpdated: update.timestamp
    })
  }, [updateOrder])

  const startHeartbeat = useCallback(() => {
    if (heartbeatIntervalRef.current) {
      clearInterval(heartbeatIntervalRef.current)
    }

    heartbeatIntervalRef.current = setInterval(() => {
      setConnection(prev => ({
        ...prev,
        lastHeartbeat: new Date().toISOString()
      }))
    }, 30000) // 30 seconds
  }, [])

  const connectSSE = useCallback(() => {
    if (!enableRealTime) return

    try {
      // Close existing connection
      if (eventSourceRef.current) {
        eventSourceRef.current.close()
      }

      const eventSource = new EventSource('/api/orders/stream')
      eventSourceRef.current = eventSource

      eventSource.onopen = () => {
        setConnection(prev => ({
          ...prev,
          connected: true,
          connectionType: 'sse',
          reconnectAttempts: 0
        }))
        startHeartbeat()
        console.log('✅ Real-time connection established')
      }

      eventSource.onmessage = (event) => {
        try {
          const update: OrderUpdate = JSON.parse(event.data)
          handleOrderUpdate(update)
        } catch (error) {
          console.error('Failed to parse order update:', error)
        }
      }

      eventSource.addEventListener('heartbeat', () => {
        setConnection(prev => ({
          ...prev,
          lastHeartbeat: new Date().toISOString()
        }))
      })

      eventSource.onerror = () => {
        setConnection(prev => ({
          ...prev,
          connected: false
        }))

        if (connection.reconnectAttempts < maxReconnectAttempts) {
          setConnection(prev => ({
            ...prev,
            reconnectAttempts: prev.reconnectAttempts + 1
          }))

          reconnectTimeoutRef.current = setTimeout(() => {
            console.log(`🔄 Attempting to reconnect (${connection.reconnectAttempts + 1}/${maxReconnectAttempts})`)
            connectSSE()
          }, reconnectInterval)
        } else {
          setConnection(prev => ({
            ...prev,
            connectionType: 'offline'
          }))
          console.log('❌ Max reconnection attempts reached. Going offline.')
        }
      }

    } catch (error) {
      console.error('Failed to establish SSE connection:', error)
      setConnection(prev => ({
        ...prev,
        connected: false,
        connectionType: 'offline'
      }))
    }
  }, [enableRealTime, connection.reconnectAttempts, maxReconnectAttempts, reconnectInterval, handleOrderUpdate, startHeartbeat])

  const reconnect = useCallback(() => {
    setConnection(prev => ({
      ...prev,
      reconnectAttempts: 0
    }))
    connectSSE()
  }, [connectSSE])

  const cleanup = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close()
      eventSourceRef.current = null
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
      reconnectTimeoutRef.current = null
    }
    if (heartbeatIntervalRef.current) {
      clearInterval(heartbeatIntervalRef.current)
      heartbeatIntervalRef.current = null
    }
  }, [])

  useEffect(() => {
    if (enableRealTime) {
      connectSSE()
    }

    return cleanup
  }, [enableRealTime, connectSSE, cleanup])

  // Cleanup on unmount
  useEffect(() => {
    return cleanup
  }, [cleanup])

  return {
    orders,
    connection,
    updateOrder,
    reconnect
  }
}
