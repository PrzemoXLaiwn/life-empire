import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma/client'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const character = await prisma.character.findUnique({
      where: { userId: user.id }
    })

    if (!character) {
      return NextResponse.json({ error: 'Character not found' }, { status: 404 })
    }

    // Get statistics
    const [
      totalMoneyEarned,
      vehiclesOwned,
      propertiesOwned,
      businessesOwned,
      totalCrimes,
      successfulCrimes,
      totalJobHours,
      totalArrests,
      heistsCompleted,
      weaponsOwned,
    ] = await Promise.all([
      // Total money earned from transactions
      prisma.transaction.aggregate({
        where: {
          characterId: character.id,
          type: { in: ['INCOME', 'CRIME_REWARD', 'JOB_SALARY', 'BUSINESS_PROFIT'] }
        },
        _sum: { amount: true }
      }),
      // Vehicles count
      prisma.vehicle.count({
        where: { characterId: character.id }
      }),
      // Properties count
      prisma.property.count({
        where: { characterId: character.id }
      }),
      // Businesses count
      prisma.business.count({
        where: { ownerId: character.id }
      }),
      // Total crimes
      prisma.crimeHistory.count({
        where: { characterId: character.id }
      }),
      // Successful crimes
      prisma.crimeHistory.count({
        where: { characterId: character.id, success: true }
      }),
      // Total hours worked
      prisma.jobHistory.aggregate({
        where: { characterId: character.id },
        _sum: { hoursWorked: true }
      }),
      // Total arrests
      prisma.arrest.count({
        where: { characterId: character.id }
      }),
      // Heists completed
      prisma.heistParticipant.count({
        where: {
          characterId: character.id,
          heist: { status: 'SUCCESS' }
        }
      }),
      // Weapons owned
      prisma.weapon.count({
        where: { characterId: character.id }
      })
    ])

    // Calculate additional stats
    const totalWealth = character.cash + character.bankBalance
    const crimeSuccessRate = totalCrimes > 0 ? ((successfulCrimes / totalCrimes) * 100).toFixed(1) : 0

    const stats = {
      // Financial
      totalMoneyEarned: totalMoneyEarned._sum.amount || 0,
      currentWealth: totalWealth,
      cash: character.cash,
      bankBalance: character.bankBalance,
      dirtyCash: character.dirtyCash,

      // Assets
      vehiclesOwned,
      propertiesOwned,
      businessesOwned,
      weaponsOwned,

      // Criminal
      totalCrimes,
      successfulCrimes,
      failedCrimes: totalCrimes - successfulCrimes,
      crimeSuccessRate: parseFloat(crimeSuccessRate as string),
      totalArrests,
      deathCount: character.deathCount,

      // Progression
      level: character.level,
      experience: character.experience,
      reputation: character.reputation,

      // Work
      totalJobHours: totalJobHours._sum.hoursWorked || 0,

      // Heists
      heistsCompleted,

      // Criminal Skills
      shooting: character.shooting,
      driving: character.driving,
      stealth: character.stealth,
      hacking: character.hacking,

      // Physical Stats (Gym Trainable)
      strength: character.strength,
      stamina: character.stamina,
      endurance: (character as any).endurance || 10,
      speed: (character as any).speed || 10,
      agility: (character as any).agility || 10,

      // Other Attributes
      intelligence: character.intelligence,
      charisma: character.charisma,

      // Other
      daysPlayed: Math.floor((Date.now() - character.createdAt.getTime()) / (1000 * 60 * 60 * 24)),
    }

    return NextResponse.json({ stats })
  } catch (error) {
    console.error('❌ GET /api/stats/character error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}
