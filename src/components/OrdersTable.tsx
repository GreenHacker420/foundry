"use client"

import React, { useState, useMemo } from "react"
import { mockOrders } from "@/data/mockOrders"
import { PizzaOrder, OrderStatus } from "@/types"
import { Search, Filter, ChevronUp, ChevronDown, Clock, Zap } from "lucide-react"
import clsx from "clsx"
import { useRealTimeOrders } from "@/hooks/useRealTimeOrders"
import OrderProgressIndicator from "./OrderProgressIndicator"
import CountdownTimer from "./CountdownTimer"
import ConnectionStatus from "./ConnectionStatus"
import OrderConveyorBelt from "./3D/OrderConveyorBelt"
import Interactive3DCard from "./3D/Interactive3DCard"

type SortField = 'id' | 'customerName' | 'pizzaType' | 'quantity' | 'orderDate' | 'status'
type SortDirection = 'asc' | 'desc'

const statusColors = {
  'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'Preparing': 'bg-blue-100 text-blue-800 border-blue-200',
  'Out for Delivery': 'bg-purple-100 text-purple-800 border-purple-200',
  'Delivered': 'bg-green-100 text-green-800 border-green-200',
  'Cancelled': 'bg-red-100 text-red-800 border-red-200',
}

export default function OrdersTable() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'All'>('All')
  const [sortField, setSortField] = useState<SortField>('orderDate')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

  // Use real-time orders hook
  const { orders, connection, reconnect } = useRealTimeOrders({
    initialOrders: mockOrders,
    enableRealTime: true
  })

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const toggleRowExpansion = (orderId: string) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev)
      if (newSet.has(orderId)) {
        newSet.delete(orderId)
      } else {
        newSet.add(orderId)
      }
      return newSet
    })
  }

  const filteredAndSortedOrders = useMemo(() => {
    let filtered = orders.filter(order => {
      const matchesSearch =
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.pizzaType.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === 'All' || order.status === statusFilter

      return matchesSearch && matchesStatus
    })

    return filtered.sort((a, b) => {
      let aValue: any = a[sortField]
      let bValue: any = b[sortField]

      if (sortField === 'orderDate') {
        aValue = new Date(aValue).getTime()
        bValue = new Date(bValue).getTime()
      } else if (sortField === 'quantity') {
        aValue = Number(aValue)
        bValue = Number(bValue)
      } else {
        aValue = String(aValue).toLowerCase()
        bValue = String(bValue).toLowerCase()
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
      return 0
    })
  }, [orders, searchTerm, statusFilter, sortField, sortDirection])

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null
    return sortDirection === 'asc' ? 
      <ChevronUp className="w-4 h-4" /> : 
      <ChevronDown className="w-4 h-4" />
  }

  return (
    <div className="space-y-4">
      {/* Connection Status */}
      <ConnectionStatus
        connection={connection}
        onReconnect={reconnect}
        compact={true}
      />

      <div className="bg-white rounded-lg shadow-sm border">
        {/* Filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by customer name, order ID, or pizza type..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as OrderStatus | 'All')}
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Preparing">Preparing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('id')}
              >
                <div className="flex items-center space-x-1">
                  <span>Order ID</span>
                  <SortIcon field="id" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('customerName')}
              >
                <div className="flex items-center space-x-1">
                  <span>Customer Name</span>
                  <SortIcon field="customerName" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('pizzaType')}
              >
                <div className="flex items-center space-x-1">
                  <span>Pizza Type</span>
                  <SortIcon field="pizzaType" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('quantity')}
              >
                <div className="flex items-center space-x-1">
                  <span>Quantity</span>
                  <SortIcon field="quantity" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('orderDate')}
              >
                <div className="flex items-center space-x-1">
                  <span>Order Date</span>
                  <SortIcon field="orderDate" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center space-x-1">
                  <span>Status</span>
                  <SortIcon field="status" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center space-x-1">
                  <Zap className="w-4 h-4" />
                  <span>Progress</span>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>Delivery Timer</span>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedOrders.map((order) => (
              <React.Fragment key={order.id}>
                <tr className={clsx(
                  'hover:bg-gray-50 transition-colors duration-200',
                  order.lastUpdated && new Date(order.lastUpdated).getTime() > Date.now() - 10000 && 'bg-orange-50'
                )}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                    {order.lastUpdated && new Date(order.lastUpdated).getTime() > Date.now() - 10000 && (
                      <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 animate-pulse">
                        Updated
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.customerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.pizzaType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.orderDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={clsx(
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
                      statusColors[order.status]
                    )}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.progress ? (
                      <OrderConveyorBelt
                        progress={order.progress}
                        orderId={order.id}
                        compact={true}
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">No progress data</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.estimatedDeliveryTime && order.status !== 'Delivered' && order.status !== 'Cancelled' ? (
                      <CountdownTimer
                        targetTime={order.estimatedDeliveryTime}
                        variant="badge"
                        showIcon={false}
                      />
                    ) : order.status === 'Delivered' ? (
                      <span className="text-green-600 text-sm font-medium">✓ Delivered</span>
                    ) : order.status === 'Cancelled' ? (
                      <span className="text-red-600 text-sm font-medium">✗ Cancelled</span>
                    ) : (
                      <span className="text-gray-400 text-sm">No timer</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => toggleRowExpansion(order.id)}
                      className="text-orange-600 hover:text-orange-900 font-medium"
                    >
                      {expandedRows.has(order.id) ? 'Hide Details' : 'View Details'}
                    </button>
                  </td>
                </tr>

                {/* Expanded Row */}
                {expandedRows.has(order.id) && (
                  <tr key={`${order.id}-expanded`} className="bg-gray-50">
                    <td colSpan={9} className="px-6 py-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Progress Details */}
                        <div className="lg:col-span-2">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Order Progress - 3D Conveyor Belt</h4>
                          {order.progress ? (
                            <OrderConveyorBelt
                              progress={order.progress}
                              orderId={order.id}
                              compact={false}
                            />
                          ) : (
                            <p className="text-gray-500 text-sm">No progress information available</p>
                          )}
                        </div>

                        {/* Delivery Timer */}
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-3">Delivery Information</h4>
                          {order.estimatedDeliveryTime && order.status !== 'Delivered' && order.status !== 'Cancelled' ? (
                            <CountdownTimer
                              targetTime={order.estimatedDeliveryTime}
                              variant="default"
                              showIcon={true}
                            />
                          ) : order.status === 'Delivered' ? (
                            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                              <div className="text-green-700 font-medium">Order Delivered Successfully</div>
                              <div className="text-green-600 text-sm">
                                Delivered at: {order.progress?.actualDeliveryTime ?
                                  new Date(order.progress.actualDeliveryTime).toLocaleString() :
                                  'Time not recorded'
                                }
                              </div>
                            </div>
                          ) : order.status === 'Cancelled' ? (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                              <div className="text-red-700 font-medium">Order Cancelled</div>
                              <div className="text-red-600 text-sm">
                                This order has been cancelled and will not be delivered.
                              </div>
                            </div>
                          ) : (
                            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                              <div className="text-gray-700 font-medium">No Delivery Information</div>
                              <div className="text-gray-600 text-sm">
                                Delivery time will be available once the order is confirmed.
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

        {/* Results Summary */}
        <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-700">
              Showing {filteredAndSortedOrders.length} of {orders.length} orders
            </p>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span>Real-time updates: {connection.connected ? '✓ Active' : '✗ Inactive'}</span>
              {connection.lastHeartbeat && (
                <span>Last update: {new Date(connection.lastHeartbeat).toLocaleTimeString()}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
