import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const character = await prisma.character.findUnique({
      where: { userId: user.id },
      select: {
        id: true,
        createdAt: true,
        cash: true
      }
    })

    if (!character) {
      return NextResponse.json({ error: 'Character not found' }, { status: 404 })
    }

    // Get claimed rewards for this character
    const claimedRewards = await prisma.dailyReward.findMany({
      where: { characterId: character.id },
      select: { day: true, claimedAt: true }
    })

    // Calculate current streak
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    const claimedDays = claimedRewards.map(r => r.day).sort((a, b) => a - b)

    // Check if claimed today
    const claimedToday = claimedRewards.some(r => {
      const claimDate = new Date(r.claimedAt)
      return claimDate.toDateString() === today.toDateString()
    })

    let currentStreak = 0

    if (claimedToday) {
      // Calculate streak including today
      const todayClaim = claimedRewards.find(r => new Date(r.claimedAt).toDateString() === today.toDateString())
      if (todayClaim) {
        const todayDay = todayClaim.day
        for (let d = todayDay; d >= 1; d--) {
          if (claimedDays.includes(d)) {
            currentStreak++
          } else {
            break
          }
        }
      }
    } else {
      // Calculate potential streak if claimed today
      if (claimedDays.length === 0) {
        currentStreak = 1
      } else {
        const lastDay = Math.max(...claimedDays)
        const lastClaimDate = claimedRewards.find(r => r.day === lastDay)?.claimedAt
        if (lastClaimDate) {
          const daysSinceLastClaim = Math.floor((today.getTime() - lastClaimDate.getTime()) / (1000 * 60 * 60 * 24))
          if (daysSinceLastClaim === 1) {
            // Continue streak
            let prevStreak = 0
            for (let d = lastDay; d >= 1; d--) {
              if (claimedDays.includes(d)) {
                prevStreak++
              } else {
                break
              }
            }
            currentStreak = prevStreak + 1
          } else {
            // Reset streak
            currentStreak = 1
          }
        } else {
          currentStreak = 1
        }
      }
    }

    const rewards = {
      currentStreak: Math.min(currentStreak, 7),
      maxStreak: 7,
      canClaimToday: !claimedToday,
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

    return NextResponse.json({ rewards })
  } catch (error) {
    console.error('GET /api/daily-rewards error:', error)
    return NextResponse.json({ error: 'Failed to fetch daily rewards' }, { status: 500 })
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
      select: {
        id: true,
        cash: true
      }
    })

    if (!character) {
      return NextResponse.json({ error: 'Character not found' }, { status: 404 })
    }

    // Check if already claimed today
    const today = new Date()
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)

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
      select: { day: true }
    })

    const claimedDays = claimedRewards.map(r => r.day).sort((a, b) => a - b)
    let nextDay = 1

    for (let day = 1; day <= 7; day++) {
      if (!claimedDays.includes(day)) {
        nextDay = day
        break
      }
    }

    // If all days claimed, reset to day 1
    if (nextDay > 7) {
      nextDay = 1
    }

    const rewardAmounts = [1000, 2000, 3000, 5000, 7500, 10000, 15000]
    const rewardAmount = rewardAmounts[nextDay - 1] || 1000

    // Create the reward claim
    await prisma.dailyReward.create({
      data: {
        characterId: character.id,
        day: nextDay
      }
    })

    // Update character cash
    await prisma.character.update({
      where: { id: character.id },
      data: {
        cash: character.cash + rewardAmount
      }
    })

    // Create transaction record
    await prisma.transaction.create({
      data: {
        characterId: character.id,
        type: 'INCOME',
        amount: rewardAmount,
        source: 'Daily Reward',
        description: `Daily reward for day ${nextDay}`
      }
    })

    return NextResponse.json({
      success: true,
      reward: {
        day: nextDay,
        amount: rewardAmount
      }
    })
  } catch (error) {
    console.error('POST /api/daily-rewards error:', error)
    return NextResponse.json({ error: 'Failed to claim daily reward' }, { status: 500 })
  }
}
