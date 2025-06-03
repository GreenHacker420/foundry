"use client"

import { motion } from 'framer-motion'
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Area, AreaChart
} from 'recharts'
import { TrendingUp, Pizza, Clock, DollarSign } from 'lucide-react'
import { mockOrders } from '@/data/mockOrders'
import { useMemo } from 'react'

// Sample data for analytics
const dailySalesData = [
  { day: 'Mon', pizzas: 45, revenue: 675 },
  { day: 'Tue', pizzas: 52, revenue: 780 },
  { day: 'Wed', pizzas: 38, revenue: 570 },
  { day: 'Thu', pizzas: 61, revenue: 915 },
  { day: 'Fri', pizzas: 78, revenue: 1170 },
  { day: 'Sat', pizzas: 95, revenue: 1425 },
  { day: 'Sun', pizzas: 67, revenue: 1005 }
]

const hourlyOrderData = [
  { hour: '9AM', orders: 2 }, { hour: '10AM', orders: 5 }, { hour: '11AM', orders: 8 },
  { hour: '12PM', orders: 15 }, { hour: '1PM', orders: 22 }, { hour: '2PM', orders: 18 },
  { hour: '3PM', orders: 12 }, { hour: '4PM', orders: 8 }, { hour: '5PM', orders: 14 },
  { hour: '6PM', orders: 25 }, { hour: '7PM', orders: 32 }, { hour: '8PM', orders: 28 },
  { hour: '9PM', orders: 20 }, { hour: '10PM', orders: 12 }, { hour: '11PM', orders: 6 }
]

const COLORS = ['#FF6B35', '#F7931E', '#FFD23F', '#06FFA5', '#3B82F6', '#8B5CF6', '#EF4444']

export default function OrderAnalytics() {
  // Process mock orders for analytics
  const analyticsData = useMemo(() => {
    const pizzaTypes = mockOrders.reduce((acc, order) => {
      acc[order.pizzaType] = (acc[order.pizzaType] || 0) + order.quantity
      return acc
    }, {} as Record<string, number>)

    const statusDistribution = mockOrders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const topPizzas = Object.entries(pizzaTypes)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([name, value]) => ({ name, value }))

    const statusPieData = Object.entries(statusDistribution)
      .map(([name, value]) => ({ name, value }))

    return { topPizzas, statusPieData, pizzaTypes, statusDistribution }
  }, [])

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <motion.div
        className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-xl shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">📊 Pizza Analytics Dashboard</h2>
            <p className="opacity-90">Real-time insights into your pizza business</p>
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Pizza className="w-12 h-12" />
          </motion.div>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Orders"
          value={mockOrders.length}
          icon={<Pizza className="w-6 h-6" />}
          color="bg-blue-500"
          trend="+12%"
        />
        <MetricCard
          title="Revenue Today"
          value="$1,247"
          icon={<DollarSign className="w-6 h-6" />}
          color="bg-green-500"
          trend="+8%"
        />
        <MetricCard
          title="Avg Delivery Time"
          value="28 min"
          icon={<Clock className="w-6 h-6" />}
          color="bg-purple-500"
          trend="-5%"
        />
        <MetricCard
          title="Customer Rating"
          value="4.8/5"
          icon={<TrendingUp className="w-6 h-6" />}
          color="bg-orange-500"
          trend="+0.2"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Sales Trend */}
        <motion.div
          className="bg-white p-6 rounded-xl shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            📈 Daily Sales Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dailySalesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#f97316', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: 'white'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="pizzas" 
                stroke="#f97316" 
                fill="url(#colorGradient)"
                strokeWidth={3}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Top Pizza Types */}
        <motion.div
          className="bg-white p-6 rounded-xl shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            🍕 Top Pizza Types
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.topPizzas}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#f97316', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: 'white'
                }}
              />
              <Bar dataKey="value" fill="#f97316" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Order Status Distribution */}
        <motion.div
          className="bg-white p-6 rounded-xl shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            📊 Order Status Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analyticsData.statusPieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {analyticsData.statusPieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Peak Hours Heatmap */}
        <motion.div
          className="bg-white p-6 rounded-xl shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            🕐 Peak Ordering Hours
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={hourlyOrderData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#f97316', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: 'white'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="orders" 
                stroke="#f97316" 
                strokeWidth={3}
                dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#f97316', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  )
}

// Metric Card Component
function MetricCard({ 
  title, 
  value, 
  icon, 
  color, 
  trend 
}: { 
  title: string
  value: string | number
  icon: React.ReactNode
  color: string
  trend: string
}) {
  const isPositive = trend.startsWith('+')
  
  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-lg"
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          <div className={`flex items-center mt-2 text-sm ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            <span>{trend}</span>
            <span className="ml-1">vs last week</span>
          </div>
        </div>
        <div className={`${color} p-3 rounded-lg text-white`}>
          {icon}
        </div>
      </div>
    </motion.div>
  )
}
