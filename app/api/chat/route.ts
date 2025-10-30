import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { message } = await request.json()

    if (!message || !message.trim()) {
      return NextResponse.json({ error: 'Message required' }, { status: 400 })
    }

    if (message.length > 200) {
      return NextResponse.json({ error: 'Message too long (max 200 chars)' }, { status: 400 })
    }

    const username = user.user_metadata?.username || user.email?.split('@')[0] || 'Player'
    
    // Get character - POBIERZ CAŁY OBIEKT
    const character = await prisma.character.findUnique({
      where: { userId: user.id }
    })

    // CAST DO any aby TypeScript nie narzekał
    const avatarValue = (character as any)?.avatar || 'crown'

    const chatMessage = await prisma.chatMessage.create({
      data: {
        userId: user.id,
        username,
        avatar: avatarValue,
        message: message.trim()
      } as any
    })

    return NextResponse.json({ message: chatMessage })
  } catch (error) {
    console.error('POST /api/chat error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const messages = await prisma.chatMessage.findMany({
      take: 50,
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ messages: messages.reverse() })
  } catch (error) {
    console.error('GET /api/chat error:', error)
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
  }
}