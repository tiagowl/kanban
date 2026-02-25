import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Middleware disabled: was causing MIDDLEWARE_INVOCATION_FAILED on Vercel Edge.
// Auth is enforced in client-side pages (login/register redirect, protected routes).
export function middleware(_request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  // Unreachable path so middleware is never invoked (avoids Edge 500)
  matcher: ['/__middleware_off'],
}

