import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

// GET - Pobierz rolę użytkownika
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    console.log('[API /api/user/role] Request received')
    console.log('[API /api/user/role] User ID:', user?.id)

    if (!user) {
      console.log('[API /api/user/role] No user - returning 401')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Pobierz użytkownika z bazy
    console.log('[API /api/user/role] Fetching user from database...')
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { id: true, email: true, role: true }
    })

    console.log('[API /api/user/role] Database user:', dbUser)

    if (!dbUser) {
      console.log('[API /api/user/role] User not found in database - returning USER')
      return NextResponse.json({ role: 'USER' })
    }

    console.log('[API /api/user/role] Returning role:', dbUser.role)
    return NextResponse.json({ role: dbUser.role, email: dbUser.email })
  } catch (error) {
    console.error('❌ [API /api/user/role] Error:', error)
    return NextResponse.json({ role: 'USER', error: String(error) })
  }
}
