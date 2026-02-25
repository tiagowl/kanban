import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  try {
    const pathname = request.nextUrl?.pathname ?? ''
    const publicRoutes = ['/login', '/register']
    const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route))

    if (isPublicRoute) {
      return NextResponse.next()
    }

    return NextResponse.next()
  } catch {
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    '/((?!api|_next|favicon.ico).*)',
  ],
}

