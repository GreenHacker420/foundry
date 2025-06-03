import { PizzaOrder, OrderProgress, OrderStage } from '@/types';

function createOrderProgress(currentStage: OrderStage, estimatedMinutesRemaining?: number): OrderProgress {
  const stages = [
    { stage: 'received' as OrderStage, estimatedDuration: 2 },
    { stage: 'preparing' as OrderStage, estimatedDuration: 8 },
    { stage: 'baking' as OrderStage, estimatedDuration: 12 },
    { stage: 'out-for-delivery' as OrderStage, estimatedDuration: 15 },
    { stage: 'delivered' as OrderStage, estimatedDuration: 0 }
  ]

  const currentIndex = stages.findIndex(s => s.stage === currentStage)

  return {
    currentStage,
    stages: stages.map((stage, index) => ({
      ...stage,
      completed: index <= currentIndex,
      timestamp: index <= currentIndex ? new Date(Date.now() - (stages.length - index) * 300000).toISOString() : undefined
    })),
    estimatedMinutesRemaining
  }
}

export const mockOrders: PizzaOrder[] = [
  {
    id: 'PZA001',
    customerName: 'John Smith',
    pizzaType: 'Margherita',
    quantity: 2,
    orderDate: '2024-01-15 14:30',
    status: 'Delivered',
    progress: createOrderProgress('delivered'),
    estimatedDeliveryTime: '2024-01-15 15:15',
    lastUpdated: '2024-01-15 15:15'
  },
  {
    id: 'PZA002',
    customerName: 'Sarah Johnson',
    pizzaType: 'Pepperoni',
    quantity: 1,
    orderDate: '2024-01-15 15:45',
    status: 'Out for Delivery',
    progress: createOrderProgress('out-for-delivery', 12),
    estimatedDeliveryTime: new Date(Date.now() + 12 * 60000).toISOString(),
    lastUpdated: new Date(Date.now() - 180000).toISOString()
  },
  {
    id: 'PZA003',
    customerName: 'Mike Davis',
    pizzaType: 'Veggie Supreme',
    quantity: 3,
    orderDate: '2024-01-15 16:20',
    status: 'Preparing',
    progress: createOrderProgress('preparing', 25),
    estimatedDeliveryTime: new Date(Date.now() + 25 * 60000).toISOString(),
    lastUpdated: new Date(Date.now() - 120000).toISOString()
  },
  {
    id: 'PZA004',
    customerName: 'Emily Wilson',
    pizzaType: 'Hawaiian',
    quantity: 1,
    orderDate: '2024-01-15 17:10',
    status: 'Pending',
    progress: createOrderProgress('received', 35),
    estimatedDeliveryTime: new Date(Date.now() + 35 * 60000).toISOString(),
    lastUpdated: new Date(Date.now() - 60000).toISOString()
  },
  {
    id: 'PZA005',
    customerName: 'David Brown',
    pizzaType: 'Meat Lovers',
    quantity: 2,
    orderDate: '2024-01-15 18:00',
    status: 'Delivered',
    progress: createOrderProgress('delivered'),
    estimatedDeliveryTime: '2024-01-15 18:45',
    lastUpdated: '2024-01-15 18:45'
  },
  {
    id: 'PZA006',
    customerName: 'Lisa Garcia',
    pizzaType: 'BBQ Chicken',
    quantity: 1,
    orderDate: '2024-01-15 18:30',
    status: 'Preparing',
    progress: createOrderProgress('baking', 18),
    estimatedDeliveryTime: new Date(Date.now() + 18 * 60000).toISOString(),
    lastUpdated: new Date(Date.now() - 300000).toISOString()
  },
  {
    id: 'PZA007',
    customerName: 'Robert Miller',
    pizzaType: 'Four Cheese',
    quantity: 2,
    orderDate: '2024-01-15 19:15',
    status: 'Pending',
    progress: createOrderProgress('received', 40),
    estimatedDeliveryTime: new Date(Date.now() + 40 * 60000).toISOString(),
    lastUpdated: new Date(Date.now() - 90000).toISOString()
  },
  {
    id: 'PZA008',
    customerName: 'Jennifer Taylor',
    pizzaType: 'Mushroom & Olive',
    quantity: 1,
    orderDate: '2024-01-15 19:45',
    status: 'Out for Delivery',
    progress: createOrderProgress('out-for-delivery', 8),
    estimatedDeliveryTime: new Date(Date.now() + 8 * 60000).toISOString(),
    lastUpdated: new Date(Date.now() - 420000).toISOString()
  },
  {
    id: 'PZA009',
    customerName: 'Christopher Lee',
    pizzaType: 'Spicy Italian',
    quantity: 3,
    orderDate: '2024-01-15 20:20',
    status: 'Delivered',
    progress: createOrderProgress('delivered'),
    estimatedDeliveryTime: '2024-01-15 21:05',
    lastUpdated: '2024-01-15 21:05'
  },
  {
    id: 'PZA010',
    customerName: 'Amanda White',
    pizzaType: 'Margherita',
    quantity: 1,
    orderDate: '2024-01-15 20:50',
    status: 'Cancelled',
    progress: createOrderProgress('received'),
    estimatedDeliveryTime: '2024-01-15 21:35',
    lastUpdated: '2024-01-15 20:55'
  },
  {
    id: 'PZA011',
    customerName: 'Kevin Anderson',
    pizzaType: 'Pepperoni',
    quantity: 2,
    orderDate: '2024-01-16 12:15',
    status: 'Preparing',
    progress: createOrderProgress('preparing', 22),
    estimatedDeliveryTime: new Date(Date.now() + 22 * 60000).toISOString(),
    lastUpdated: new Date(Date.now() - 240000).toISOString()
  },
  {
    id: 'PZA012',
    customerName: 'Michelle Thomas',
    pizzaType: 'Veggie Supreme',
    quantity: 1,
    orderDate: '2024-01-16 13:30',
    status: 'Pending',
    progress: createOrderProgress('received', 38),
    estimatedDeliveryTime: new Date(Date.now() + 38 * 60000).toISOString(),
    lastUpdated: new Date(Date.now() - 30000).toISOString()
  },
  {
    id: 'PZA013',
    customerName: 'James Jackson',
    pizzaType: 'Hawaiian',
    quantity: 2,
    orderDate: '2024-01-16 14:45',
    status: 'Out for Delivery',
    progress: createOrderProgress('out-for-delivery', 5),
    estimatedDeliveryTime: new Date(Date.now() + 5 * 60000).toISOString(),
    lastUpdated: new Date(Date.now() - 600000).toISOString()
  },
  {
    id: 'PZA014',
    customerName: 'Nicole Martinez',
    pizzaType: 'Meat Lovers',
    quantity: 1,
    orderDate: '2024-01-16 15:20',
    status: 'Delivered',
    progress: createOrderProgress('delivered'),
    estimatedDeliveryTime: '2024-01-16 16:05',
    lastUpdated: '2024-01-16 16:05'
  },
  {
    id: 'PZA015',
    customerName: 'Daniel Rodriguez',
    pizzaType: 'BBQ Chicken',
    quantity: 3,
    orderDate: '2024-01-16 16:10',
    status: 'Preparing',
    progress: createOrderProgress('baking', 15),
    estimatedDeliveryTime: new Date(Date.now() + 15 * 60000).toISOString(),
    lastUpdated: new Date(Date.now() - 360000).toISOString()
  },
  {
    id: 'PZA016',
    customerName: 'Rachel Clark',
    pizzaType: 'Four Cheese',
    quantity: 1,
    orderDate: '2024-01-16 17:00',
    status: 'Pending',
    progress: createOrderProgress('received', 32),
    estimatedDeliveryTime: new Date(Date.now() + 32 * 60000).toISOString(),
    lastUpdated: new Date(Date.now() - 45000).toISOString()
  },
  {
    id: 'PZA017',
    customerName: 'Mark Lewis',
    pizzaType: 'Mushroom & Olive',
    quantity: 2,
    orderDate: '2024-01-16 18:25',
    status: 'Out for Delivery',
    progress: createOrderProgress('out-for-delivery', 10),
    estimatedDeliveryTime: new Date(Date.now() + 10 * 60000).toISOString(),
    lastUpdated: new Date(Date.now() - 480000).toISOString()
  },
  {
    id: 'PZA018',
    customerName: 'Stephanie Walker',
    pizzaType: 'Spicy Italian',
    quantity: 1,
    orderDate: '2024-01-16 19:40',
    status: 'Delivered',
    progress: createOrderProgress('delivered'),
    estimatedDeliveryTime: '2024-01-16 20:25',
    lastUpdated: '2024-01-16 20:25'
  },
  {
    id: 'PZA019',
    customerName: 'Brian Hall',
    pizzaType: 'Margherita',
    quantity: 2,
    orderDate: '2024-01-16 20:15',
    status: 'Preparing',
    progress: createOrderProgress('preparing', 28),
    estimatedDeliveryTime: new Date(Date.now() + 28 * 60000).toISOString(),
    lastUpdated: new Date(Date.now() - 150000).toISOString()
  },
  {
    id: 'PZA020',
    customerName: 'Laura Young',
    pizzaType: 'Pepperoni',
    quantity: 1,
    orderDate: '2024-01-16 21:00',
    status: 'Pending',
    progress: createOrderProgress('received', 42),
    estimatedDeliveryTime: new Date(Date.now() + 42 * 60000).toISOString(),
    lastUpdated: new Date(Date.now() - 15000).toISOString()
  }
];
