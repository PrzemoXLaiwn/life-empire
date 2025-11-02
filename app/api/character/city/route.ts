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

    const { cityId } = await request.json()

    if (!cityId) {
      return NextResponse.json({ error: 'City ID required' }, { status: 400 })
    }

    // Verify city exists
    const city = await prisma.city.findUnique({
      where: { id: cityId }
    })

    if (!city) {
      return NextResponse.json({ error: 'City not found' }, { status: 404 })
    }

    // Get or create character
    let character = await prisma.character.findUnique({
      where: { userId: user.id }
    })

    if (!character) {
      // Create character if doesn't exist
      const username = user.user_metadata?.username || user.email?.split('@')[0] || 'Player'
      character = await prisma.character.create({
        data: {
          userId: user.id,
          username: username,
          cityId: cityId
        }
      })
    } else {
      // Update existing character
      character = await prisma.character.update({
        where: { userId: user.id },
        data: { cityId }
      })
    }

    return NextResponse.json({ 
      message: `Successfully moved to ${city.name}`,
      character 
    })
  } catch (error) {
    console.error('❌ POST /api/character/city error:', error)
    return NextResponse.json(
      { error: 'Failed to update city' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const character = await prisma.character.findUnique({
      where: { userId: user.id },
      include: { city: true }  // DODAJ TO!
    })

    if (!character) {
      return NextResponse.json({ error: 'Character not found' }, { status: 404 })
    }

    return NextResponse.json({ character })
  } catch (error) {
    console.error('GET /api/character error:', error)
    return NextResponse.json({ error: 'Failed to fetch character' }, { status: 500 })
  }
}