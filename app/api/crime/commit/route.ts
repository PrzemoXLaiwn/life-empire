import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'

const CRIMES = {
  pickpocket: {
    name: 'Pickpocket',
    energyCost: 10,
    minReward: 50,
    maxReward: 200,
    successRate: 95,
    xpReward: 5,
    jailTimeOnFail: 15,
  },
  shoplift: {
    name: 'Shoplift',
    energyCost: 15,
    minReward: 200,
    maxReward: 500,
    successRate: 90,
    xpReward: 10,
    jailTimeOnFail: 30,
  },
  car_theft: {
    name: 'Car Theft',
    energyCost: 25,
    minReward: 1000,
    maxReward: 5000,
    successRate: 75,
    xpReward: 25,
    jailTimeOnFail: 60,
  },
  house_robbery: {
    name: 'House Robbery',
    energyCost: 30,
    minReward: 5000,
    maxReward: 20000,
    successRate: 60,
    xpReward: 50,
    jailTimeOnFail: 120,
  },
  bank_heist: {
    name: 'Bank Heist',
    energyCost: 50,
    minReward: 50000,
    maxReward: 200000,
    successRate: 40,
    xpReward: 150,
    jailTimeOnFail: 360,
  },
}

export async function POST(request: NextRequest) {
  try {
    // ✅ NAPRAWIONE: Prawidłowe uwierzytelnianie przez Supabase!
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = user.id // ✅ BEZPIECZNE - nie można podrobić!

    const { crimeId } = await request.json()
    const crime = CRIMES[crimeId as keyof typeof CRIMES]

    if (!crime) {
      return NextResponse.json({ error: 'Invalid crime' }, { status: 400 })
    }

    // Get character with city
    const character = await prisma.character.findUnique({
      where: { userId },
      include: { city: true }
    })

    if (!character) {
      return NextResponse.json({ error: 'Character not found' }, { status: 404 })
    }

    // Validate
    if (character.energy < crime.energyCost) {
      return NextResponse.json({ 
        error: `Not enough energy! Need ${crime.energyCost}, have ${character.energy}` 
      }, { status: 400 })
    }

    if (character.jailTime > 0) {
      return NextResponse.json({ 
        error: `You are in jail for ${character.jailTime} more minutes!` 
      }, { status: 400 })
    }

    // Apply city bonuses
    let successRate = crime.successRate
    let minReward = crime.minReward
    let maxReward = crime.maxReward

    if (character.city) {
      successRate = Math.min(99, successRate + character.city.crimeBonus)
      const incomeMultiplier = 1 + (character.city.incomeBonus / 100)
      minReward = Math.floor(minReward * incomeMultiplier)
      maxReward = Math.floor(maxReward * incomeMultiplier)
    }

    // Calculate success
    const random = Math.random() * 100
    const isSuccess = random <= successRate

    // Get username for events
    const username = user.user_metadata?.username || user.email?.split('@')[0] || 'Player'

    let updatedCharacter
    let result

    if (isSuccess) {
      // SUCCESS
      const moneyGained = Math.floor(
        Math.random() * (maxReward - minReward + 1) + minReward
      )

      const newXP = character.xp + crime.xpReward
      const levelUp = newXP >= character.xpNeeded

      updatedCharacter = await prisma.character.update({
        where: { id: character.id },
        data: {
          money: character.money + moneyGained,
          energy: character.energy - crime.energyCost,
          xp: levelUp ? newXP - character.xpNeeded : newXP,
          level: levelUp ? character.level + 1 : character.level,
          xpNeeded: levelUp ? Math.floor(character.xpNeeded * 1.5) : character.xpNeeded,
          maxEnergy: levelUp ? character.maxEnergy + 5 : character.maxEnergy,
          maxHealth: levelUp ? character.maxHealth + 10 : character.maxHealth,
          crimesCommitted: character.crimesCommitted + 1,
          criminalReputation: character.criminalReputation + crime.xpReward,
        },
        include: { city: true }
      })

      await prisma.crimeHistory.create({
        data: {
          character: { connect: { id: character.id } },
          crimeType: crimeId,
          success: true,
          moneyGained,
          xpGained: crime.xpReward,
        }
      })

      await prisma.gameEvent.create({
        data: {
          type: 'crime',
          message: `${username} successfully committed ${crime.name} and earned $${moneyGained.toLocaleString()}!`,
          userId: userId,
          username: username
        }
      })

      result = {
        success: true,
        message: `Success! You stole $${moneyGained.toLocaleString()} and gained ${crime.xpReward} XP!${character.city ? ` (${character.city.incomeBonus > 0 ? `+${character.city.incomeBonus}% ` : ''}City Bonus Applied)` : ''}`,
        moneyGained,
        xpGained: crime.xpReward,
        leveledUp: levelUp,
      }
    } else {
      // FAILED
      updatedCharacter = await prisma.character.update({
        where: { id: character.id },
        data: {
          energy: character.energy - crime.energyCost,
          jailTime: crime.jailTimeOnFail,
        },
        include: { city: true }
      })

      await prisma.crimeHistory.create({
        data: {
          character: { connect: { id: character.id } },
          crimeType: crimeId,
          success: false,
          jailTime: crime.jailTimeOnFail,
        }
      })

      await prisma.gameEvent.create({
        data: {
          type: 'crime',
          message: `${username} got caught attempting ${crime.name} and was sent to jail for ${crime.jailTimeOnFail} minutes!`,
          userId: userId,
          username: username
        }
      })

      result = {
        success: false,
        message: `Caught! You've been sent to jail for ${crime.jailTimeOnFail} minutes!`,
        jailTime: crime.jailTimeOnFail,
      }
    }

    return NextResponse.json({
      ...result,
      character: updatedCharacter
    })
  } catch (error) {
    console.error('Crime commit error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}