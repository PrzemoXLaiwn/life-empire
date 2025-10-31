import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

/**
 * ✅ Pomocnicza funkcja sprawdzająca auth w API routes
 * Użyj zamiast duplikowania kodu auth w każdym endpoincie
 */
export async function requireAuth() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    throw new Error('Unauthorized')
  }

  return {
    user,
    userId: user.id,
    supabase
  }
}

/**
 * ✅ Wrapper dla API route handlers z automatycznym auth
 */
export function withAuth(
  handler: (request: Request, context: { user: any; userId: string; supabase: any }) => Promise<NextResponse>
) {
  return async (request: Request) => {
    try {
      const auth = await requireAuth()
      return await handler(request, auth)
    } catch (error) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
  }
}