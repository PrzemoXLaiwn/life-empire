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

    let character = await prisma.character.findUnique({
      where: { userId: user.id },
      include: { city: true }
    })

    if (!character) {
      return NextResponse.json({ character: null }, { status: 200 })
    }

    // AUTO-FIX: If character has no city, assign one automatically
    if (!character.cityId) {
      console.log('⚠️ Character has no city! Auto-fixing...')
      const defaultCity = await prisma.city.findFirst({
        where: { name: 'Los Santos' }
      })

      if (defaultCity) {
        character = await prisma.character.update({
          where: { userId: user.id },
          data: { cityId: defaultCity.id },
          include: { city: true }
        })
        console.log('✅ Auto-fixed character with city:', defaultCity.name)
      }
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
    let { cityId } = body

    // Check if character already exists
    const existing = await prisma.character.findUnique({
      where: { userId: user.id },
      include: { city: true }
    })

    if (existing) {
      // If existing character has no city, assign one
      if (!existing.cityId) {
        const defaultCity = await prisma.city.findFirst({
          where: { name: 'Los Santos' }
        })

        if (defaultCity) {
          const updated = await prisma.character.update({
            where: { userId: user.id },
            data: { cityId: defaultCity.id },
            include: { city: true }
          })
          console.log('✅ Fixed existing character with city:', defaultCity.name)
          return NextResponse.json({ character: updated })
        }
      }
      return NextResponse.json({ character: existing })
    }

    // If no cityId provided, get default city (Los Santos)
    if (!cityId) {
      console.log('⚠️ No cityId provided, using default city (Los Santos)')
      const defaultCity = await prisma.city.findFirst({
        where: { name: 'Los Santos' }
      })

      if (defaultCity) {
        cityId = defaultCity.id
      } else {
        // If Los Santos doesn't exist, get any city
        const anyCity = await prisma.city.findFirst()
        if (anyCity) {
          cityId = anyCity.id
          console.log('⚠️ Los Santos not found, using:', anyCity.name)
        } else {
          return NextResponse.json(
            { error: 'No cities available in database. Please run seed.' },
            { status: 500 }
          )
        }
      }
    }

    // Verify city exists
    const cityExists = await prisma.city.findUnique({
      where: { id: cityId }
    })

    if (!cityExists) {
      console.error('❌ Invalid city ID:', cityId)
      // Try to get default city as fallback
      const defaultCity = await prisma.city.findFirst()
      if (defaultCity) {
        cityId = defaultCity.id
        console.log('⚠️ Using fallback city:', defaultCity.name)
      } else {
        return NextResponse.json(
          { error: 'Invalid city ID and no fallback available' },
          { status: 400 }
        )
      }
    }

    // Create character with city
    const username = body.username || user.user_metadata?.username || user.email?.split('@')[0] || 'Player'
    const gender = body.gender || 'male'
    const avatar = body.avatar || 'crown'

    const character = await prisma.character.create({
      data: {
        userId: user.id,
        username: username,
        gender: gender,
        cityId: cityId,
        avatar: avatar,
        cash: 2000,
        energy: 100,
        health: 100,
        level: 1,
        experience: 0,
        reputation: 0,
        strength: 10,
      },
      include: { city: true }
    })

    console.log('✅ Character created successfully:', character.id, 'in city:', character.city?.name)
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