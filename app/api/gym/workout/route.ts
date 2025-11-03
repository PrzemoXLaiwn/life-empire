import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma/client'

const ENERGY_COSTS: Record<string, number> = {
  'bench-press': 20,
  'treadmill': 15,
  'agility-course': 25,
  'speed-training': 20,
  'yoga': 10
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { workout, stat, gain, score, xp, rating, energyCost: requestEnergyCost } = await request.json()

    if (!workout || !stat || typeof gain !== 'number') {
      return NextResponse.json({ error: 'Invalid workout data' }, { status: 400 })
    }

    // Get character
    const character = await prisma.character.findUnique({
      where: { userId: user.id }
    })

    if (!character) {
      return NextResponse.json({ error: 'Character not found' }, { status: 404 })
    }

    // Use energy cost from request or fallback to default
    const energyCost = requestEnergyCost || ENERGY_COSTS[workout] || 20
    if (character.energy < energyCost) {
      return NextResponse.json({ error: 'Not enough energy' }, { status: 400 })
    }

    // Calculate actual gain (diminishing returns based on current stat level)
    const currentStatValue = (character as any)[stat] || 10
    const diminishingFactor = Math.max(0.1, 1 - (currentStatValue / 150))
    const actualGain = Math.max(1, Math.floor(gain * diminishingFactor))

    // Cap at 100
    const newStatValue = Math.min(100, currentStatValue + actualGain)

    // Calculate XP gain with diminishing returns
    const xpToAdd = xp || 0
    const newXP = character.xp + xpToAdd

    // Update character (XP and stat)
    const updateData: any = {
      [stat]: newStatValue,
      energy: Math.max(0, character.energy - energyCost),
      xp: newXP
    }

    const updated = await prisma.character.update({
      where: { userId: user.id },
      data: updateData
    })

    console.log(`✅ Workout complete: ${workout} (${rating || 'N/A'}) | ${stat} +${actualGain} (${currentStatValue} -> ${newStatValue}) | XP +${xpToAdd}`)

    return NextResponse.json({
      success: true,
      statGain: actualGain,
      newStatValue,
      xpGained: xpToAdd,
      energyRemaining: updated.energy,
      score,
      rating
    })
  } catch (error) {
    console.error('❌ POST /api/gym/workout error:', error)
    return NextResponse.json(
      { error: 'Failed to save workout' },
      { status: 500 }
    )
  }
}
