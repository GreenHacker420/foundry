# Pizza Order Dashboard

**Developer:** Harsh Hirawat

## Project Overview

A modern, full-stack web application for managing pizza orders with Google OAuth authentication. This application provides a comprehensive dashboard for pizza order management with an intuitive, responsive interface. Built with Next.js 15, TypeScript, Tailwind CSS, and NextAuth.js v5.

### Key Features
- **Google OAuth Authentication**: Secure login using Google accounts
- **Protected Routes**: Dashboard pages are protected and require authentication
- **Order Management**: View, search, filter, and sort pizza orders
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI**: Clean, intuitive interface with status indicators and visual feedback
- **3D Interactive Elements**: Advanced pizza-themed animations and visualizations
- **Dark Mode Support**: Seamless theme switching with system preference detection

## Local Development Setup

### Prerequisites
- Node.js 18 or higher
- npm, yarn, or pnpm package manager
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
   ```

3. **Environment Configuration**

   Create a `.env.local` file in the root directory with the following variables:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here-change-in-production
   GOOGLE_CLIENT_ID=your-google-client-id-here
   GOOGLE_CLIENT_SECRET=your-google-client-secret-here
   ```

   **Important:**
   - DO NOT commit your actual OAuth client secret to the repository
   - Generate a secure random string for `NEXTAUTH_SECRET` (you can use: `openssl rand -base64 32`)
   - Obtain `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` from Google Cloud Console (see setup instructions below)

4. **Google OAuth Setup**

   To configure Google OAuth credentials:

   a. Go to [Google Cloud Console](https://console.cloud.google.com/)
   b. Create a new project or select an existing one
   c. Enable the Google+ API
   d. Navigate to "APIs & Services" > "OAuth consent screen"
   e. Configure the consent screen with your app information
   f. Go to "APIs & Services" > "Credentials"
   g. Click "Create Credentials" > "OAuth 2.0 Client IDs"
   h. Choose "Web application"
   i. Add authorized redirect URIs:
      - For development: `http://localhost:3000/api/auth/callback/google`
      - For production: `https://yourdomain.com/api/auth/callback/google`
   j. Copy the Client ID and Client Secret to your `.env.local` file

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Assumptions Made and Challenges Faced

### Assumptions Made
- Users have basic familiarity with React and Next.js development
- Google OAuth is the preferred authentication method for the target audience
- The application will primarily be used on modern browsers with JavaScript enabled
- Pizza order data structure follows a standard format with common fields (ID, customer, pizza type, status, etc.)
- Real-time updates are important for order management workflow
- Mobile responsiveness is crucial for restaurant staff who may use tablets or phones

### Challenges Faced
- **NextAuth.js v5 Beta**: Working with the beta version required careful handling of breaking changes and limited documentation
- **Real-time Updates**: Implementing Server-Sent Events (SSE) for live order updates while maintaining connection stability
- **Mobile Responsiveness**: Creating a complex data table that works well on small screens without losing functionality
- **State Management**: Managing real-time order updates while preserving user interactions (search, filters, sorting)
- **Production Deployment**: Configuring OAuth redirects correctly for custom domains vs. Vercel default domains
- **TypeScript Integration**: Ensuring full type safety across the application, especially with NextAuth.js v5 types
- **Performance Optimization**: Balancing real-time features with application performance and memory usage

## Third-Party Libraries Used

Beyond Next.js, NextAuth.js, and Tailwind CSS, this project uses the following third-party libraries:

### Core Dependencies
- **@auth/core** (^0.39.1) - Core authentication library for NextAuth.js v5
- **lucide-react** (^0.511.0) - Modern icon library with React components
- **clsx** (^2.1.1) - Utility for constructing className strings conditionally
- **react-hot-toast** (^2.5.2) - Elegant toast notifications for React

### 3D and Animation Libraries
- **@splinetool/react-spline** (^4.0.0) - 3D scene integration for interactive pizza elements
- **@splinetool/runtime** (^1.9.99) - Runtime for Spline 3D scenes
- **three** (^0.177.0) - 3D graphics library for advanced visualizations
- **@types/three** (^0.177.0) - TypeScript definitions for Three.js
- **framer-motion** (^12.15.0) - Production-ready motion library for React animations

### Data Visualization
- **recharts** (^2.15.3) - Composable charting library built on React components

### Development Dependencies
- **@tailwindcss/postcss** (^4) - PostCSS plugin for Tailwind CSS v4
- **@types/node** (^20) - TypeScript definitions for Node.js
- **@types/react** (^19) - TypeScript definitions for React
- **@types/react-dom** (^19) - TypeScript definitions for React DOM
- **eslint** (^9) - JavaScript/TypeScript linting utility
- **eslint-config-next** (15.3.3) - ESLint configuration for Next.js projects
- **typescript** (^5) - TypeScript language support

### Key Features Enabled by Libraries
- **3D Pizza Visualizations**: Spline and Three.js enable interactive 3D pizza models and loaders
- **Smooth Animations**: Framer Motion provides fluid transitions and micro-interactions
- **Toast Notifications**: React Hot Toast delivers user feedback for actions
- **Flexible Icons**: Lucide React offers a comprehensive, customizable icon set
- **Data Charts**: Recharts enables analytics dashboards with pizza order metrics
- **Conditional Styling**: clsx simplifies dynamic CSS class management
