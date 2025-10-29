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

    // Check if exists
    const existing = await prisma.character.findUnique({
      where: { userId: user.id },
      include: { city: true }
    })

    if (existing) {
      return NextResponse.json({ character: existing })
    }

    // Create with city
    const character = await prisma.character.create({
      data: {
        userId: user.id,
        cityId: cityId,
        money: 1000,
        energy: 100,
        maxEnergy: 100,
        health: 100,
        maxHealth: 100,
        level: 1,
        xp: 0,
        xpNeeded: 100,
        age: 18,
        ageInDays: 0,
        reputation: 0,
        rank: 1,
        strength: 10,
        defense: 10,
        speed: 10,
        dexterity: 10,
        crimesCommitted: 0,
        jailTime: 0,
        criminalReputation: 0,
        hasDriverLicense: false,
        hasCar: false,
        hasPlane: false,
        lastEnergyRegen: new Date(),
        lastHealthRegen: new Date(),
        lastAgeIncrement: new Date(),
      },
      include: { city: true }
    })

    return NextResponse.json({ character }, { status: 201 })
  } catch (error) {
    console.error('❌ POST /api/character error:', error)
    return NextResponse.json(
      { error: 'Failed to create character' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { ...updates } = body

    const character = await prisma.character.update({
      where: { userId: user.id },
      data: updates,
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