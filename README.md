# Pizza Order Dashboard

A modern, full-stack web application for managing pizza orders with Google OAuth authentication. Built with Next.js 15, TypeScript, Tailwind CSS, and NextAuth.js v5.

## 🍕 Project Overview

This application provides a comprehensive dashboard for pizza order management with the following features:

- **Google OAuth Authentication**: Secure login using Google accounts
- **Protected Routes**: Dashboard pages are protected and require authentication
- **Order Management**: View, search, filter, and sort pizza orders
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI**: Clean, intuitive interface with status indicators and visual feedback

## 🚀 Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js v5
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 📋 Features

### Authentication System
- Google OAuth integration with NextAuth.js v5
- Automatic redirect to dashboard after login
- Protected dashboard routes with middleware
- Session management and secure logout

### Dashboard Pages
1. **Welcome Page** (`/dashboard`)
   - Personalized greeting with user's Google profile
   - Quick stats overview
   - Navigation to other sections
   - Recent activity feed

2. **Orders Page** (`/dashboard/orders`)
   - Comprehensive orders table with sortable columns
   - Search functionality (customer name, order ID, pizza type)
   - Status-based filtering
   - Visual status indicators with color coding
   - Responsive table design

### Order Management
- **Order Details**: ID, Customer Name, Pizza Type, Quantity, Date, Status
- **Status Types**: Pending, Preparing, Out for Delivery, Delivered, Cancelled
- **Sorting**: Click column headers to sort by any field
- **Filtering**: Filter orders by status
- **Search**: Real-time search across multiple fields

## 🛠️ Local Development Setup

### Prerequisites
- Node.js 18+
- npm, yarn, or pnpm
- Google Cloud Console account for OAuth setup

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd foundry
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Configuration**

   Create a `.env.local` file in the root directory:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here-change-in-production
   GOOGLE_CLIENT_ID=your-google-client-id-here
   GOOGLE_CLIENT_SECRET=your-google-client-secret-here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Google OAuth Setup Guide

### Step 1: Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API

### Step 2: Configure OAuth Consent Screen
1. Navigate to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type
3. Fill in the required information:
   - App name: "Pizza Order Dashboard"
   - User support email: Your email
   - Developer contact information: Your email

### Step 3: Create OAuth 2.0 Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Add authorized redirect URIs:
   - For development: `http://localhost:3000/api/auth/callback/google`
   - For production: `https://yourdomain.com/api/auth/callback/google`
5. Copy the Client ID and Client Secret to your `.env.local` file

### Step 4: Test the Integration
1. Start your development server
2. Navigate to the application
3. Click "Sign in with Google"
4. Complete the OAuth flow

## 📁 Project Structure

```
src/
├── app/
│   ├── api/auth/[...nextauth]/     # NextAuth.js API routes
│   ├── auth/signin/                # Sign-in page
│   ├── dashboard/                  # Protected dashboard pages
│   │   ├── orders/                 # Orders management page
│   │   └── page.tsx               # Dashboard home
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Home page (redirects to dashboard)
├── components/
│   ├── DashboardLayout.tsx        # Dashboard layout with navigation
│   └── OrdersTable.tsx            # Orders table component
├── data/
│   └── mockOrders.ts              # Mock pizza order data
├── lib/
│   └── auth.ts                    # NextAuth.js configuration
├── types/
│   └── index.ts                   # TypeScript type definitions
└── middleware.ts                  # Route protection middleware
```

## 🚀 Deployment Instructions

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables in Vercel dashboard

3. **Environment Variables**
   Add these to your Vercel project settings:
   ```
   NEXTAUTH_URL=https://your-domain.vercel.app
   NEXTAUTH_SECRET=your-production-secret-key
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

4. **Update Google OAuth Settings**
   - Add your production domain to authorized redirect URIs
   - Update OAuth consent screen if needed

### Alternative: Deploy to Railway

1. **Connect Repository**
   - Go to [Railway](https://railway.app)
   - Connect your GitHub repository

2. **Configure Environment Variables**
   - Add the same environment variables as above
   - Update NEXTAUTH_URL to your Railway domain

## 🎨 UI/UX Features

### Design Principles
- **Mobile-First**: Responsive design starting from 320px width
- **Accessibility**: WCAG 2.1 AA compliant design
- **Modern Aesthetics**: Clean, professional interface
- **Intuitive Navigation**: Clear visual hierarchy and user flow

### Visual Elements
- **Color Coding**: Status-based color indicators for orders
- **Interactive Elements**: Hover states and smooth transitions
- **Loading States**: Visual feedback for async operations
- **Error Handling**: User-friendly error messages

## 🔧 Development Features

### Code Quality
- **TypeScript**: Full type safety throughout the application
- **ESLint**: Code linting and formatting
- **Component Architecture**: Reusable, modular components
- **Server Actions**: Modern Next.js server-side functionality

### Performance
- **App Router**: Latest Next.js routing system
- **Optimized Images**: Next.js Image component
- **Font Optimization**: Google Fonts with Next.js font optimization
- **Bundle Optimization**: Automatic code splitting and optimization

## 🧪 Testing Recommendations

To ensure the application works correctly, test the following scenarios:

1. **Authentication Flow**
   - Sign in with Google
   - Access protected routes
   - Sign out functionality

2. **Dashboard Functionality**
   - Navigation between pages
   - User profile display
   - Responsive design on different screen sizes

3. **Orders Management**
   - Table sorting by different columns
   - Search functionality
   - Status filtering
   - Mobile table responsiveness

## 🔮 Future Enhancements

Potential improvements and features for future development:

- **Real-time Updates**: WebSocket integration for live order updates
- **Order Creation**: Add new order functionality
- **Status Management**: Update order status directly from dashboard
- **Analytics Dashboard**: Charts and metrics for order insights
- **Export Functionality**: Export orders to CSV/PDF
- **Pagination**: Handle large datasets with pagination
- **Advanced Filtering**: Date range, customer filters
- **Notifications**: Email/SMS notifications for order updates
- **Multi-tenant Support**: Support for multiple restaurants
- **Order History**: Detailed order tracking and history

## 🐛 Troubleshooting

### Common Issues

1. **OAuth Errors**
   - Verify Google Cloud Console configuration
   - Check redirect URIs match exactly
   - Ensure environment variables are set correctly

2. **Build Errors**
   - Clear `.next` folder and rebuild
   - Check for TypeScript errors
   - Verify all dependencies are installed

3. **Styling Issues**
   - Ensure Tailwind CSS is properly configured
   - Check for conflicting CSS classes
   - Verify responsive breakpoints

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For questions or support, please open an issue in the GitHub repository.
