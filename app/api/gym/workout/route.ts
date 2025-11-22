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
    // Diminishing returns only kick in after stat reaches 50+
    const currentStatValue = (character as any)[stat] || 10
    let actualGain = gain

    if (currentStatValue >= 50) {
      // Apply diminishing returns only for stats 50+
      const diminishingFactor = Math.max(0.5, 1 - ((currentStatValue - 50) / 100))
      actualGain = Math.max(1, Math.floor(gain * diminishingFactor))
    }

    // Cap at 100
    const newStatValue = Math.min(100, currentStatValue + actualGain)

    // Calculate XP gain with diminishing returns
    const xpToAdd = xp || 0
    const newXP = character.experience + xpToAdd

    // Update best scores
    const currentBestScores = (character.gymBestScores as any) || {}
    const currentBest = currentBestScores[workout] || 0
    const newBest = Math.max(currentBest, score || 0)
    const isNewRecord = score > currentBest

    const updatedBestScores = {
      ...currentBestScores,
      [workout]: newBest
    }

    // Update character (XP, stat, best scores, and workout stats)
    const updateData: any = {
      [stat]: newStatValue,
      energy: Math.max(0, character.energy - energyCost),
      experience: newXP
    }

    // Add gym tracking fields only if they exist in the schema
    if ('gymBestScores' in character) {
      updateData.gymBestScores = updatedBestScores
    }
    if ('totalWorkouts' in character) {
      updateData.totalWorkouts = { increment: 1 }
    }
    if ('perfectWorkouts' in character && rating === 'PERFECT') {
      updateData.perfectWorkouts = { increment: 1 }
    }

    const updated = await prisma.character.update({
      where: { userId: user.id },
      data: updateData
    })

    console.log(`✅ Workout complete: ${workout} (${rating || 'N/A'}) | ${stat} +${actualGain} (${currentStatValue} -> ${newStatValue}) | XP +${xpToAdd} | Score: ${score}${isNewRecord ? ' 🆕 NEW RECORD!' : ''}`)

    return NextResponse.json({
      success: true,
      statGain: actualGain,
      newStatValue,
      xpGained: xpToAdd,
      energyRemaining: updated.energy,
      score,
      rating,
      isNewRecord,
      bestScore: newBest,
      character: updated // Return full updated character data
    })
  } catch (error) {
    console.error('❌ POST /api/gym/workout error:', error)
    return NextResponse.json(
      { error: 'Failed to save workout' },
      { status: 500 }
    )
  }
}
