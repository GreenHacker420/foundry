import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  try {
    const { nextUrl } = req
    const isLoggedIn = !!req.auth

    // Protect dashboard routes
    if (nextUrl.pathname.startsWith('/dashboard')) {
      if (!isLoggedIn) {
        return NextResponse.redirect(new URL('/auth/signin', nextUrl))
      }
    }

    // Redirect logged-in users away from auth pages
    if (nextUrl.pathname.startsWith('/auth') && isLoggedIn) {
      return NextResponse.redirect(new URL('/dashboard', nextUrl))
    }

    return NextResponse.next()
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.next()
  }
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
