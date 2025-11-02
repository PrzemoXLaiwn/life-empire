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

    if (character.inJail && character.jailReleaseAt && character.jailReleaseAt > new Date()) {
      const minutesLeft = Math.ceil((character.jailReleaseAt.getTime() - Date.now()) / 60000)
      return NextResponse.json({
        error: `You are in jail for ${minutesLeft} more minutes!`
      }, { status: 400 })
    }

    // Apply city bonuses
    let successRate = crime.successRate
    let minReward = crime.minReward
    let maxReward = crime.maxReward

    if (character.city) {
      const crimeBonus = Number(character.city.crimeBonus)
      successRate = Math.min(99, successRate + crimeBonus)
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

      const newXP = character.experience + crime.xpReward
      const levelUp = newXP >= character.xpNeeded

      updatedCharacter = await prisma.character.update({
        where: { id: character.id },
        data: {
          dirtyCash: character.dirtyCash + moneyGained,
          energy: character.energy - crime.energyCost,
          experience: levelUp ? newXP - character.xpNeeded : newXP,
          level: levelUp ? character.level + 1 : character.level,
          xpNeeded: levelUp ? Math.floor(character.xpNeeded * 1.5) : character.xpNeeded,
          maxEnergy: levelUp ? character.maxEnergy + 5 : character.maxEnergy,
          maxHealth: levelUp ? character.maxHealth + 10 : character.maxHealth,
          reputation: character.reputation + crime.xpReward,
        },
        include: { city: true }
      })

      // TODO: Create CrimeHistory record once Crime records are seeded
      // await prisma.crimeHistory.create({
      //   data: {
      //     character: { connect: { id: character.id } },
      //     crime: { connect: { id: crimeId } },
      //     success: true,
      //     reward: moneyGained,
      //     experienceGained: crime.xpReward,
      //   }
      // })

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
        message: `Success! You stole $${moneyGained.toLocaleString()} (dirty cash) and gained ${crime.xpReward} XP!`,
        moneyGained,
        xpGained: crime.xpReward,
        leveledUp: levelUp,
      }
    } else {
      // FAILED - Set jail release time
      const jailReleaseAt = new Date(Date.now() + crime.jailTimeOnFail * 60000)

      updatedCharacter = await prisma.character.update({
        where: { id: character.id },
        data: {
          energy: character.energy - crime.energyCost,
          inJail: true,
          jailReleaseAt: jailReleaseAt,
        },
        include: { city: true }
      })

      // TODO: Create CrimeHistory record once Crime records are seeded
      // await prisma.crimeHistory.create({
      //   data: {
      //     character: { connect: { id: character.id } },
      //     crime: { connect: { id: crimeId } },
      //     success: false,
      //   }
      // })

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