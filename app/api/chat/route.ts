import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

// ✅ Prosta funkcja sanityzacji (BEZ zewnętrznych bibliotek!)
function sanitizeMessage(text: string): string {
  return text
    .replace(/</g, '&lt;')   // < → &lt;
    .replace(/>/g, '&gt;')   // > → &gt;
    .replace(/"/g, '&quot;') // " → &quot;
    .replace(/'/g, '&#x27;') // ' → &#x27;
    .replace(/\//g, '&#x2F;') // / → &#x2F;
    .trim()
}

// ✅ Rate limiting store (prosty in-memory)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

// ✅ Funkcja sprawdzająca rate limit
function checkRateLimit(userId: string): boolean {
  const now = Date.now()
  const userLimit = rateLimitStore.get(userId)

  // Jeśli nie ma wpisu lub minęła minuta - resetuj
  if (!userLimit || now > userLimit.resetAt) {
    rateLimitStore.set(userId, { count: 1, resetAt: now + 60000 }) // 1 minuta
    return true
  }

  // Sprawdź czy nie przekroczył limitu (10 wiadomości/minutę)
  if (userLimit.count >= 10) {
    return false
  }

  // Zwiększ licznik
  userLimit.count++
  return true
}

export async function POST(request: Request) {
  try {
    // ✅ Prawidłowe uwierzytelnianie
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // ✅ Rate limiting
    if (!checkRateLimit(user.id)) {
      return NextResponse.json(
        { error: 'Too many messages. Please wait a minute.' },
        { status: 429 }
      )
    }

    const { message } = await request.json()

    if (!message || !message.trim()) {
      return NextResponse.json({ error: 'Message required' }, { status: 400 })
    }

    if (message.length > 200) {
      return NextResponse.json({ error: 'Message too long (max 200 chars)' }, { status: 400 })
    }

    // ✅ SANITYZACJA - usuń HTML/JavaScript!
    const sanitizedMessage = sanitizeMessage(message)

    const username = user.user_metadata?.username || user.email?.split('@')[0] || 'Player'
    
    // Get character avatar
    const character = await prisma.character.findUnique({
      where: { userId: user.id },
      select: { avatar: true } // ✅ Tylko avatar, nie cały obiekt
    })

    const chatMessage = await prisma.chatMessage.create({
      data: {
        userId: user.id,
        username,
        avatar: character?.avatar || 'crown',
        message: sanitizedMessage // ✅ Oczyszczona wiadomość!
      }
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