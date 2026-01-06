import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Rotas públicas - não requerem autenticação
  const publicRoutes = ['/login', '/register']
  const isPublicRoute = publicRoutes.some(route => request.nextUrl.pathname.startsWith(route))

  // Se for rota pública, permitir acesso
  if (isPublicRoute) {
    return NextResponse.next()
  }

  // Para rotas protegidas, permitir acesso (a validação será feita no cliente via localStorage)
  // O middleware não consegue acessar localStorage, então deixamos passar
  // A proteção real será feita nos componentes do lado do cliente
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

