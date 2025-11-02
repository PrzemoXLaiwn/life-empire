import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const character = await prisma.character.findUnique({
      where: { userId: user.id },
      include: { city: true }
    })

    if (!character) {
      return NextResponse.json({ character: null }, { status: 200 })
    }

    return NextResponse.json({ character })
  } catch (error) {
    console.error('❌ GET /api/character error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch character' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { cityId } = body

    // Validate cityId
    if (!cityId) {
      return NextResponse.json(
        { error: 'City ID is required' },
        { status: 400 }
      )
    }

    // Verify city exists
    const cityExists = await prisma.city.findUnique({
      where: { id: cityId }
    })

    if (!cityExists) {
      return NextResponse.json(
        { error: 'Invalid city ID' },
        { status: 400 }
      )
    }

    // Check if character already exists
    const existing = await prisma.character.findUnique({
      where: { userId: user.id },
      include: { city: true }
    })

    if (existing) {
      return NextResponse.json({ character: existing })
    }

    // Create character with city
    const username = user.user_metadata?.username || user.email?.split('@')[0] || 'Player'
    const character = await prisma.character.create({
      data: {
        userId: user.id,
        username: username,
        cityId: cityId,
        cash: 1000,
        energy: 100,
        health: 100,
        level: 1,
        experience: 0,
        reputation: 0,
        strength: 10,
        avatar: 'crown',
      },
      include: { city: true }
    })

    console.log('✅ Character created successfully:', character.id)
    return NextResponse.json({ character }, { status: 201 })
  } catch (error: any) {
    console.error('❌ POST /api/character error:', error)

    // Better error messages
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Character already exists for this user' },
        { status: 409 }
      )
    }

    if (error.code === 'P2003') {
      return NextResponse.json(
        { error: 'Invalid city reference' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create character. Please try again.' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    // ✅ Prawidłowe uwierzytelnianie
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    // ✅ WHITELIST - tylko te pola można zmieniać przez frontend!
    const allowedUpdates: any = {}

    // Dozwolone pola (bezpieczne do edycji przez użytkownika)
    if (body.hasOwnProperty('cityId')) allowedUpdates.cityId = body.cityId
    if (body.hasOwnProperty('avatar')) allowedUpdates.avatar = body.avatar
    if (body.hasOwnProperty('customAvatar')) allowedUpdates.customAvatar = body.customAvatar
    
    // ❌ NIE POZWALAJ na zmianę tych pól (tylko serwer może je zmieniać):
    // - money
    // - level
    // - xp
    // - health
    // - energy
    // - crimesCommitted
    // - criminalReputation
    // - strength, defense, speed, dexterity

    // Jeśli nie ma żadnych dozwolonych zmian
    if (Object.keys(allowedUpdates).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      )
    }

    const character = await prisma.character.update({
      where: { userId: user.id },
      data: allowedUpdates,
      include: { city: true }
    })

    return NextResponse.json({ character })
  } catch (error) {
    console.error('❌ PATCH /api/character error:', error)
    return NextResponse.json(
      { error: 'Failed to update character' },
      { status: 500 }
    )
  }
}