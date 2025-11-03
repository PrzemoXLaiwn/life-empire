import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// ✅ Chronione ścieżki - wymagają logowania
const protectedPaths = [
  '/dashboard',
  '/profile',
  '/crimes',
  '/cities',
  '/chat'
]

// ✅ API routes które wymagają auth
const protectedApiPaths = [
  '/api/character',
  '/api/crime',
  '/api/chat'
  // '/api/cities' removed - needed for registration flow
]

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ✅ Sprawdź czy to chroniona ścieżka
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))
  const isProtectedApi = protectedApiPaths.some(path => pathname.startsWith(path))

  if (isProtectedPath || isProtectedApi) {
    try {
      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.getUser()

      // ✅ Jeśli nie ma użytkownika - przekieruj do logowania
      if (!user) {
        if (isProtectedApi) {
          // Dla API zwróć 401
          return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
          )
        }
        // Dla stron przekieruj do login
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set('redirect', pathname)
        return NextResponse.redirect(loginUrl)
      }
    } catch (error) {
      console.error('Proxy auth error:', error)
      
      if (isProtectedApi) {
        return NextResponse.json(
          { error: 'Authentication failed' },
          { status: 401 }
        )
      }
      
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // ✅ Dodaj custom headers do response
  const response = NextResponse.next()
  
  // Rate limiting info (opcjonalne)
  response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  
  return response
}

// ✅ Konfiguracja - na jakich ścieżkach proxy działa
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}