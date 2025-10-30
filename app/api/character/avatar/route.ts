import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

export async function PUT(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { avatar } = await request.json()

    if (!avatar) {
      return NextResponse.json({ error: 'Avatar required' }, { status: 400 })
    }

    const validAvatars = ['crown', 'skull', 'fire', 'star', 'diamond', 'rocket', 'robot', 'ninja', 'pirate', 'alien']
    if (!validAvatars.includes(avatar)) {
      return NextResponse.json({ error: 'Invalid avatar' }, { status: 400 })
    }

    const character = await prisma.character.update({
      where: { userId: user.id },
      data: { avatar } as any
    })

    return NextResponse.json({ character })
  } catch (error) {
    console.error('PUT /api/character/avatar error:', error)
    return NextResponse.json({ error: 'Failed to update avatar' }, { status: 500 })
  }
}