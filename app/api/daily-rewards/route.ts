import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

// Types
interface DailyRewardRecord {
  day: number
  claimedAt: Date
}

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const character = await prisma.character.findUnique({
      where: { userId: user.id },
      select: { id: true, createdAt: true, cash: true }
    })

    if (!character) {
      return NextResponse.json({ error: 'Character not found' }, { status: 404 })
    }

    // Get claimed rewards
    const claimedRewards = await prisma.dailyReward.findMany({
      where: { characterId: character.id },
      select: { day: true, claimedAt: true },
      orderBy: { claimedAt: 'desc' }
    }) as DailyRewardRecord[]

    // Calculate streak
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Check if claimed today
    const claimedToday = claimedRewards.some((r: DailyRewardRecord) => {
      const claimDate = new Date(r.claimedAt)
      claimDate.setHours(0, 0, 0, 0)
      return claimDate.getTime() === today.getTime()
    })

    // Get claimed days
    const claimedDays = claimedRewards.map((r: DailyRewardRecord) => r.day)

    // Calculate current streak
    let currentStreak = 0
    if (claimedDays.length > 0) {
      // Count consecutive days from 1
      for (let day = 1; day <= 7; day++) {
        if (claimedDays.includes(day)) {
          currentStreak++
        } else {
          break
        }
      }
    }

    // If not claimed today but have streak, show potential next day
    const nextDay = claimedToday 
      ? currentStreak + 1 
      : Math.min(currentStreak + 1, 7)

    const rewards = {
      currentStreak: Math.min(currentStreak, 7),
      maxStreak: 7,
      canClaimToday: !claimedToday,
      nextDay: nextDay <= 7 ? nextDay : 1,
      rewards: [
        { day: 1, claimed: claimedDays.includes(1), amount: 1000 },
        { day: 2, claimed: claimedDays.includes(2), amount: 2000 },
        { day: 3, claimed: claimedDays.includes(3), amount: 3000 },
        { day: 4, claimed: claimedDays.includes(4), amount: 5000 },
        { day: 5, claimed: claimedDays.includes(5), amount: 7500 },
        { day: 6, claimed: claimedDays.includes(6), amount: 10000 },
        { day: 7, claimed: claimedDays.includes(7), amount: 15000 }
      ]
    }

    return NextResponse.json({ success: true, rewards })
  } catch (error) {
    console.error('GET /api/daily-rewards error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch daily rewards' }, 
      { status: 500 }
    )
  }
}

export async function POST() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const character = await prisma.character.findUnique({
      where: { userId: user.id },
      select: { id: true, cash: true }
    })

    if (!character) {
      return NextResponse.json({ error: 'Character not found' }, { status: 404 })
    }

    // Check if already claimed today
    const today = new Date()
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const endOfDay = new Date(startOfDay)
    endOfDay.setDate(endOfDay.getDate() + 1)

    const existingClaim = await prisma.dailyReward.findFirst({
      where: {
        characterId: character.id,
        claimedAt: {
          gte: startOfDay,
          lt: endOfDay
        }
      }
    })

    if (existingClaim) {
      return NextResponse.json({ error: 'Already claimed today' }, { status: 400 })
    }

    // Get claimed rewards to determine next day
    const claimedRewards = await prisma.dailyReward.findMany({
      where: { characterId: character.id },
      select: { day: true },
      orderBy: { day: 'asc' }
    }) as { day: number }[]

    const claimedDays = claimedRewards.map((r: { day: number }) => r.day)
    
    // Determine next day in sequence
    let nextDay = 1
    for (let day = 1; day <= 7; day++) {
      if (!claimedDays.includes(day)) {
        nextDay = day
        break
      }
    }

    // If all 7 days claimed, reset to day 1
    if (claimedDays.length >= 7) {
      // Delete old claims and start fresh
      await prisma.dailyReward.deleteMany({
        where: { characterId: character.id }
      })
      nextDay = 1
    }

    const rewardAmounts = [1000, 2000, 3000, 5000, 7500, 10000, 15000]
    const rewardAmount = rewardAmounts[nextDay - 1] || 1000

    // Use transaction to ensure atomicity
    await prisma.$transaction([
      // Create reward claim
      prisma.dailyReward.create({
        data: {
          characterId: character.id,
          day: nextDay
        }
      }),
      
      // Update character cash
      prisma.character.update({
        where: { id: character.id },
        data: { cash: character.cash + rewardAmount }
      }),
      
      // Create transaction record
      prisma.transaction.create({
        data: {
          characterId: character.id,
          type: 'INCOME',
          amount: rewardAmount,
          source: 'Daily Reward',
          description: `Daily login reward - Day ${nextDay}`
        }
      })
    ])

    return NextResponse.json({
      success: true,
      reward: {
        day: nextDay,
        amount: rewardAmount,
        newBalance: character.cash + rewardAmount
      }
    })
  } catch (error) {
    console.error('POST /api/daily-rewards error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to claim daily reward' }, 
      { status: 500 }
    )
  }
}