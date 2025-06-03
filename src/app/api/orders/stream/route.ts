import { NextRequest } from 'next/server'
import { OrderUpdate, OrderStatus, OrderProgress, OrderStage } from '@/types'

// Simulated order updates for demonstration
const ORDER_IDS = [
  'PZA001', 'PZA002', 'PZA003', 'PZA004', 'PZA005',
  'PZA006', 'PZA007', 'PZA008', 'PZA009', 'PZA010',
  'PZA011', 'PZA012', 'PZA013', 'PZA014', 'PZA015',
  'PZA016', 'PZA017', 'PZA018', 'PZA019', 'PZA020'
]

const STATUS_PROGRESSION: OrderStatus[] = [
  'Pending',
  'Preparing', 
  'Out for Delivery',
  'Delivered'
]

const STAGE_PROGRESSION: OrderStage[] = [
  'received',
  'preparing',
  'baking',
  'out-for-delivery',
  'delivered'
]

const STAGE_DURATIONS = {
  received: 2,
  preparing: 8,
  baking: 12,
  'out-for-delivery': 15,
  delivered: 0
}

function createOrderProgress(currentStage: OrderStage, estimatedMinutesRemaining?: number): OrderProgress {
  const stages = STAGE_PROGRESSION.map(stage => ({
    stage,
    completed: STAGE_PROGRESSION.indexOf(stage) <= STAGE_PROGRESSION.indexOf(currentStage),
    timestamp: STAGE_PROGRESSION.indexOf(stage) <= STAGE_PROGRESSION.indexOf(currentStage) 
      ? new Date().toISOString() 
      : undefined,
    estimatedDuration: STAGE_DURATIONS[stage]
  }))

  return {
    currentStage,
    stages,
    estimatedMinutesRemaining
  }
}

function generateRandomUpdate(): OrderUpdate {
  const orderId = ORDER_IDS[Math.floor(Math.random() * ORDER_IDS.length)]
  const statusIndex = Math.floor(Math.random() * STATUS_PROGRESSION.length)
  const status = STATUS_PROGRESSION[statusIndex]
  const stage = STAGE_PROGRESSION[statusIndex]
  
  const estimatedMinutesRemaining = status === 'Delivered' 
    ? 0 
    : Math.floor(Math.random() * 30) + 5

  const progress = createOrderProgress(stage, estimatedMinutesRemaining)
  
  const estimatedDeliveryTime = status === 'Delivered' 
    ? new Date().toISOString()
    : new Date(Date.now() + estimatedMinutesRemaining * 60000).toISOString()

  return {
    orderId,
    status,
    progress,
    timestamp: new Date().toISOString(),
    estimatedDeliveryTime
  }
}

export async function GET(request: NextRequest) {
  // Set up Server-Sent Events headers
  const headers = new Headers({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Cache-Control'
  })

  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    start(controller) {
      // Send initial connection message
      const initialMessage = `data: ${JSON.stringify({ 
        type: 'connection', 
        message: 'Connected to real-time order updates',
        timestamp: new Date().toISOString()
      })}\n\n`
      controller.enqueue(encoder.encode(initialMessage))

      // Send heartbeat every 30 seconds
      const heartbeatInterval = setInterval(() => {
        try {
          const heartbeat = `event: heartbeat\ndata: ${JSON.stringify({ 
            timestamp: new Date().toISOString() 
          })}\n\n`
          controller.enqueue(encoder.encode(heartbeat))
        } catch (error) {
          console.error('Heartbeat error:', error)
          clearInterval(heartbeatInterval)
        }
      }, 30000)

      // Send random order updates every 5-15 seconds
      const updateInterval = setInterval(() => {
        try {
          const update = generateRandomUpdate()
          const message = `data: ${JSON.stringify(update)}\n\n`
          controller.enqueue(encoder.encode(message))
        } catch (error) {
          console.error('Update error:', error)
          clearInterval(updateInterval)
          clearInterval(heartbeatInterval)
        }
      }, Math.random() * 10000 + 5000) // 5-15 seconds

      // Cleanup function
      const cleanup = () => {
        clearInterval(heartbeatInterval)
        clearInterval(updateInterval)
      }

      // Handle client disconnect
      request.signal.addEventListener('abort', () => {
        cleanup()
        try {
          controller.close()
        } catch (error) {
          console.error('Error closing controller:', error)
        }
      })

      // Auto-cleanup after 10 minutes to prevent memory leaks
      setTimeout(() => {
        cleanup()
        try {
          controller.close()
        } catch (error) {
          console.error('Error closing controller after timeout:', error)
        }
      }, 600000) // 10 minutes
    }
  })

  return new Response(stream, { headers })
}
