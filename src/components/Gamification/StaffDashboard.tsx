"use client"

import { motion } from 'framer-motion'
import { Trophy, Star, Target, Zap, Award, TrendingUp } from 'lucide-react'
import { useState, useEffect } from 'react'

interface StaffMember {
  id: string
  name: string
  role: string
  avatar: string
  stats: {
    ordersDelivered: number
    customerRating: number
    onTimeDeliveries: number
    totalEarnings: number
  }
  badges: Badge[]
  level: number
  xp: number
  xpToNext: number
}

interface Badge {
  id: string
  name: string
  description: string
  icon: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  unlockedAt: string
}

const mockStaffData: StaffMember[] = [
  {
    id: '1',
    name: 'Mario Rossi',
    role: 'Delivery Driver',
    avatar: '👨‍🍳',
    stats: {
      ordersDelivered: 127,
      customerRating: 4.9,
      onTimeDeliveries: 95,
      totalEarnings: 2340
    },
    badges: [
      { id: '1', name: 'Speed Demon', description: '50 deliveries under 20 minutes', icon: '⚡', rarity: 'rare', unlockedAt: '2024-01-10' },
      { id: '2', name: 'Customer Favorite', description: '4.8+ rating for 30 days', icon: '⭐', rarity: 'epic', unlockedAt: '2024-01-15' }
    ],
    level: 12,
    xp: 2450,
    xpToNext: 550
  },
  {
    id: '2',
    name: 'Luigi Verde',
    role: 'Pizza Chef',
    avatar: '👨‍🍳',
    stats: {
      ordersDelivered: 89,
      customerRating: 4.7,
      onTimeDeliveries: 82,
      totalEarnings: 1890
    },
    badges: [
      { id: '3', name: 'Pizza Master', description: 'Perfect 100 pizzas', icon: '🍕', rarity: 'legendary', unlockedAt: '2024-01-08' }
    ],
    level: 9,
    xp: 1820,
    xpToNext: 680
  }
]

export default function StaffDashboard() {
  const [selectedStaff, setSelectedStaff] = useState<StaffMember>(mockStaffData[0])
  const [showAchievement, setShowAchievement] = useState(false)

  useEffect(() => {
    // Simulate achievement unlock
    const timer = setTimeout(() => {
      setShowAchievement(true)
      setTimeout(() => setShowAchievement(false), 3000)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-xl shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">🎮 Staff Leaderboard</h2>
            <p className="opacity-90">Track performance, earn badges, level up!</p>
          </div>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Trophy className="w-12 h-12 text-yellow-300" />
          </motion.div>
        </div>
      </motion.div>

      {/* Staff Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockStaffData.map((staff) => (
          <motion.div
            key={staff.id}
            className={`
              p-4 rounded-xl cursor-pointer transition-all duration-300
              ${selectedStaff.id === staff.id 
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg' 
                : 'bg-white hover:bg-gray-50 shadow-md'
              }
            `}
            onClick={() => setSelectedStaff(staff)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-4">
              <div className="text-3xl">{staff.avatar}</div>
              <div className="flex-1">
                <h3 className="font-bold">{staff.name}</h3>
                <p className={`text-sm ${selectedStaff.id === staff.id ? 'text-white opacity-90' : 'text-gray-600'}`}>
                  {staff.role} • Level {staff.level}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-medium">{staff.stats.customerRating}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">{staff.stats.ordersDelivered}</div>
                <div className={`text-xs ${selectedStaff.id === staff.id ? 'text-white opacity-90' : 'text-gray-500'}`}>
                  Orders
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Selected Staff Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stats */}
        <div className="lg:col-span-2 space-y-6">
          {/* Level Progress */}
          <motion.div
            className="bg-white p-6 rounded-xl shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Level Progress</h3>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                <span className="font-bold text-lg">{selectedStaff.xp} XP</span>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <motion.div
                  className="bg-gradient-to-r from-orange-500 to-red-500 h-4 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${(selectedStaff.xp / (selectedStaff.xp + selectedStaff.xpToNext)) * 100}%` 
                  }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>Level {selectedStaff.level}</span>
                <span>{selectedStaff.xpToNext} XP to Level {selectedStaff.level + 1}</span>
              </div>
            </div>
          </motion.div>

          {/* Performance Stats */}
          <div className="grid grid-cols-2 gap-4">
            <StatCard
              title="Orders Delivered"
              value={selectedStaff.stats.ordersDelivered}
              icon={<Target className="w-6 h-6" />}
              color="bg-blue-500"
              suffix=""
            />
            <StatCard
              title="Customer Rating"
              value={selectedStaff.stats.customerRating}
              icon={<Star className="w-6 h-6" />}
              color="bg-yellow-500"
              suffix="/5"
            />
            <StatCard
              title="On-Time Rate"
              value={selectedStaff.stats.onTimeDeliveries}
              icon={<TrendingUp className="w-6 h-6" />}
              color="bg-green-500"
              suffix="%"
            />
            <StatCard
              title="Total Earnings"
              value={selectedStaff.stats.totalEarnings}
              icon={<Award className="w-6 h-6" />}
              color="bg-purple-500"
              prefix="$"
            />
          </div>
        </div>

        {/* Badges */}
        <motion.div
          className="bg-white p-6 rounded-xl shadow-lg"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
            Achievements
          </h3>
          
          <div className="space-y-3">
            {selectedStaff.badges.map((badge) => (
              <motion.div
                key={badge.id}
                className={`
                  p-3 rounded-lg border-2 transition-all duration-300
                  ${getRarityStyle(badge.rarity)}
                `}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{badge.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-medium">{badge.name}</h4>
                    <p className="text-xs text-gray-600">{badge.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Unlocked: {new Date(badge.unlockedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Locked Badges */}
            <div className="p-3 rounded-lg border-2 border-gray-200 bg-gray-50 opacity-60">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">🔒</div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-500">Pizza Perfectionist</h4>
                  <p className="text-xs text-gray-400">Deliver 200 orders with 5-star rating</p>
                  <p className="text-xs text-gray-400 mt-1">Progress: 127/200</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Achievement Notification */}
      <motion.div
        className={`
          fixed top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 
          text-white p-4 rounded-xl shadow-lg z-50 max-w-sm
          ${showAchievement ? 'block' : 'hidden'}
        `}
        initial={{ x: 400, opacity: 0 }}
        animate={{ 
          x: showAchievement ? 0 : 400, 
          opacity: showAchievement ? 1 : 0 
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex items-center space-x-3">
          <div className="text-3xl">🏆</div>
          <div>
            <h4 className="font-bold">Achievement Unlocked!</h4>
            <p className="text-sm opacity-90">Speed Demon - 50 fast deliveries!</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function StatCard({ 
  title, 
  value, 
  icon, 
  color, 
  prefix = '', 
  suffix = '' 
}: {
  title: string
  value: number
  icon: React.ReactNode
  color: string
  prefix?: string
  suffix?: string
}) {
  return (
    <motion.div
      className="bg-white p-4 rounded-xl shadow-lg"
      whileHover={{ scale: 1.02, y: -2 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-xl font-bold text-gray-900 mt-1">
            {prefix}{value}{suffix}
          </p>
        </div>
        <div className={`${color} p-2 rounded-lg text-white`}>
          {icon}
        </div>
      </div>
    </motion.div>
  )
}

function getRarityStyle(rarity: string) {
  const styles = {
    common: 'border-gray-300 bg-gray-50',
    rare: 'border-blue-300 bg-blue-50',
    epic: 'border-purple-300 bg-purple-50',
    legendary: 'border-yellow-300 bg-yellow-50 shadow-lg'
  }
  return styles[rarity as keyof typeof styles] || styles.common
}
