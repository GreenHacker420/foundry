export interface PizzaOrder {
  id: string;
  customerName: string;
  pizzaType: string;
  quantity: number;
  orderDate: string;
  status: 'Pending' | 'Preparing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  estimatedDeliveryTime?: string; // ISO string for estimated delivery
  progress?: OrderProgress;
  lastUpdated?: string; // ISO string for last status update
}

export interface OrderProgress {
  currentStage: OrderStage;
  stages: OrderStageInfo[];
  estimatedMinutesRemaining?: number;
  actualDeliveryTime?: string;
}

export interface OrderStageInfo {
  stage: OrderStage;
  completed: boolean;
  timestamp?: string; // ISO string
  estimatedDuration: number; // minutes
}

export type OrderStage = 'received' | 'preparing' | 'baking' | 'out-for-delivery' | 'delivered';

export interface OrderUpdate {
  orderId: string;
  status: OrderStatus;
  progress?: OrderProgress;
  timestamp: string;
  estimatedDeliveryTime?: string;
}

export interface RealTimeConnection {
  connected: boolean;
  lastHeartbeat?: string;
  connectionType: 'sse' | 'websocket' | 'polling' | 'offline';
  reconnectAttempts: number;
}

export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export type OrderStatus = PizzaOrder['status'];
