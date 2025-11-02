import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const character = await prisma.character.findUnique({
      where: { userId: user.id },
      select: { id: true }
    })

    if (!character) {
      return NextResponse.json({ error: 'Character not found' }, { status: 404 })
    }

    const notifications = await prisma.notification.findMany({
      where: { characterId: character.id },
      orderBy: { createdAt: 'desc' },
      take: 10
    })

    return NextResponse.json({ notifications })
  } catch (error) {
    console.error('GET /api/notifications error:', error)
    return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 })
  }
}
