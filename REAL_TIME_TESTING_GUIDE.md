# Real-Time Order Updates - Testing Guide

## 🧪 Testing the Real-Time Features

This guide will help you test all the new real-time order status update features that have been implemented.

## 🚀 Quick Start Testing

1. **Start the Development Server**
   ```bash
   npm run dev
   ```

2. **Navigate to Orders Page**
   - Go to `http://localhost:3000`
   - Sign in with Google (if not already signed in)
   - Navigate to `/dashboard/orders`

3. **Verify Real-Time Connection**
   - Look for the connection status indicator at the top of the orders table
   - Should show "Connected" with a green indicator
   - If you see "Reconnecting" or "Offline", check the browser console for errors

## 📋 Feature Testing Checklist

### ✅ Connection Status
- [ ] Green "Connected" indicator appears at top of orders table
- [ ] Connection type shows "SSE" (Server-Sent Events)
- [ ] Last update timestamp updates every 30 seconds (heartbeat)
- [ ] If you close/reopen the tab, connection re-establishes automatically

### ✅ Live Order Updates
- [ ] Orders automatically update every 5-15 seconds
- [ ] Recently updated orders show orange background briefly
- [ ] "Updated" badge appears next to order ID for recent changes
- [ ] Status changes are reflected immediately in the table

### ✅ Progress Indicators
- [ ] Each order shows a progress bar with current stage
- [ ] Progress stages display correct icons:
  - 📥 Received (Circle icon)
  - 👨‍🍳 Preparing (Chef hat icon)
  - 🔥 Baking (Flame icon)
  - 🚚 Out for Delivery (Truck icon)
  - ✅ Delivered (Check circle icon)
- [ ] Current stage has animated pulse effect
- [ ] Completed stages show in color, pending stages in gray

### ✅ Countdown Timers
- [ ] Active orders show countdown badges (e.g., "12m")
- [ ] Timers count down in real-time (updates every second)
- [ ] Urgent orders (< 10 minutes) show yellow background
- [ ] Delivered orders show "✓ Delivered"
- [ ] Cancelled orders show "✗ Cancelled"

### ✅ Expandable Order Details
- [ ] "View Details" button expands each order row
- [ ] Expanded view shows full progress timeline
- [ ] Detailed countdown timer with hours:minutes:seconds
- [ ] Progress stages show completion timestamps
- [ ] "Hide Details" button collapses the row

### ✅ Visual Feedback
- [ ] Recently updated orders highlight in orange
- [ ] Smooth animations for progress indicators
- [ ] Pulse effects on active stages
- [ ] Color-coded status badges
- [ ] Responsive design on mobile devices

## 🔧 Advanced Testing

### Connection Resilience
1. **Test Reconnection**
   - Open browser developer tools (F12)
   - Go to Network tab and throttle to "Offline"
   - Status should change to "Offline"
   - Re-enable network
   - Should automatically reconnect within 5 seconds

2. **Test Server Restart**
   - Stop the development server (Ctrl+C)
   - Status should show "Reconnecting"
   - Restart server (`npm run dev`)
   - Should reconnect automatically

### Performance Testing
1. **Multiple Tabs**
   - Open the orders page in multiple browser tabs
   - Each tab should maintain its own connection
   - Updates should appear in all tabs simultaneously

2. **Long Running**
   - Leave the page open for 10+ minutes
   - Connection should remain stable
   - Heartbeat should continue every 30 seconds

## 🐛 Troubleshooting

### Common Issues

1. **Connection Shows "Offline"**
   - Check browser console for errors
   - Verify the SSE endpoint is accessible: `http://localhost:3000/api/orders/stream`
   - Restart the development server

2. **No Real-Time Updates**
   - Check if the connection status shows "Connected"
   - Look for JavaScript errors in browser console
   - Verify the orders table is using the real-time hook

3. **Progress Indicators Not Showing**
   - Check if orders have `progress` data in mock data
   - Verify OrderProgressIndicator component is rendering
   - Check for TypeScript errors

4. **Timers Not Counting Down**
   - Verify orders have `estimatedDeliveryTime` set
   - Check if CountdownTimer component is receiving valid dates
   - Look for console errors related to date parsing

### Debug Information

**Browser Console Commands:**
```javascript
// Check current connection status
console.log('Connection status:', window.realTimeConnection);

// Monitor SSE events
const eventSource = new EventSource('/api/orders/stream');
eventSource.onmessage = (event) => console.log('SSE Event:', event.data);
```

**Network Tab:**
- Look for `/api/orders/stream` connection
- Should show "EventStream" type
- Connection should remain open (not close immediately)

## 📊 Expected Behavior

### Normal Operation
- Connection establishes within 2-3 seconds
- Orders update every 5-15 seconds randomly
- Progress indicators animate smoothly
- Timers update every second
- No console errors

### Simulated Order Updates
The system simulates realistic pizza order progression:
- Orders move through stages: Received → Preparing → Baking → Out for Delivery → Delivered
- Estimated delivery times range from 5-42 minutes
- Updates occur randomly to simulate real kitchen operations

## 🎯 Success Criteria

✅ **All features working correctly if:**
- Connection status shows "Connected" consistently
- Orders update automatically without page refresh
- Progress indicators show current stage with animations
- Countdown timers count down in real-time
- Expandable details work smoothly
- No JavaScript errors in console
- Responsive design works on mobile

## 📝 Reporting Issues

If you encounter any issues:

1. **Check Browser Console** for JavaScript errors
2. **Check Network Tab** for failed requests
3. **Note Browser/OS** you're testing on
4. **Record Steps** to reproduce the issue
5. **Screenshot/Video** of the problem if possible

## 🚀 Next Steps

After testing, you can:
- Deploy to Vercel to test in production
- Customize the update intervals in the SSE endpoint
- Add more order statuses or progress stages
- Implement WebSocket fallback for better performance
- Add sound notifications for order updates
