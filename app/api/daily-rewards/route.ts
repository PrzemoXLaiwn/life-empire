import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

/**
 * Daily Rewards System
 * GET  - Fetch reward status and history
 * POST - Claim today's reward
 */

const REWARD_AMOUNTS = [
  1000, 2000, 3000, 5000, 7500, 10000, 15000, 20000, 25000, 30000,
  35000, 40000, 45000, 50000, 60000, 70000, 80000, 90000, 100000, 110000,
  120000, 140000, 160000, 180000, 200000, 220000, 240000, 260000, 300000, 350000
]

async function testPrismaConnection() {
  try {
    await prisma.$queryRaw`SELECT 1`
    console.log('✅ Prisma connection OK')
    return true
  } catch (error) {
    console.error('❌ Prisma connection FAILED:', error)
    return false
  }
}

export async function GET() {
  try {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('🎁 [DAILY-REWARDS GET] Request started')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

    const dbOk = await testPrismaConnection()
    if (!dbOk) {
      return NextResponse.json(
        { success: false, error: 'Database connection failed' },
        { status: 500 }
      )
    }

    console.log('🔐 [AUTH] Checking authentication...')
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError) {
      console.error('❌ [AUTH] Authentication error:', authError.message)
      return NextResponse.json(
        { success: false, error: 'Authentication failed: ' + authError.message },
        { status: 401 }
      )
    }

    if (!user) {
      console.log('⚠️  [AUTH] No user found in session')
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Please log in.' },
        { status: 401 }
      )
    }

    console.log('✅ [AUTH] User authenticated:', user.id)

    console.log('👤 [CHARACTER] Finding character for user:', user.id)
    const character = await prisma.character.findUnique({
      where: { userId: user.id },
      select: { 
        id: true, 
        username: true,
        cash: true,
        createdAt: true 
      }
    })

    if (!character) {
      console.error('❌ [CHARACTER] Character not found for user:', user.id)
      return NextResponse.json(
        { success: false, error: 'Character not found. Please create a character first.' },
        { status: 404 }
      )
    }

    console.log('✅ [CHARACTER] Found:', {
      id: character.id,
      username: character.username,
      cash: character.cash
    })

    console.log('📋 [REWARDS] Fetching claimed rewards...')
    const claimedRewards = await prisma.dailyReward.findMany({
      where: { characterId: character.id },
      select: { day: true, claimedAt: true },
      orderBy: { claimedAt: 'desc' }
    })

    console.log(`✅ [REWARDS] Found ${claimedRewards.length} claimed rewards`)
    if (claimedRewards.length > 0) {
      console.log('   Latest claims:', claimedRewards.slice(0, 3).map(r => `Day ${r.day}`).join(', '))
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const claimedToday = claimedRewards.some(r => {
      const claimDate = new Date(r.claimedAt)
      claimDate.setHours(0, 0, 0, 0)
      return claimDate.getTime() === today.getTime()
    })

    const claimedDays = claimedRewards.map(r => r.day)
    let currentStreak = 0
    
    if (claimedDays.length > 0) {
      for (let day = 1; day <= 30; day++) {
        if (claimedDays.includes(day)) {
          currentStreak++
        } else {
          break
        }
      }
    }

    const nextDay = claimedToday
      ? currentStreak + 1
      : Math.min(currentStreak + 1, 30)

    console.log('📊 [CALCULATION] Status:', {
      currentStreak,
      claimedToday,
      nextDay,
      totalClaimed: claimedDays.length
    })

    const rewards = REWARD_AMOUNTS.map((amount, index) => ({
      day: index + 1,
      amount,
      claimed: claimedDays.includes(index + 1)
    }))

    const response = {
      success: true,
      rewards: {
        currentStreak: Math.min(currentStreak, 30),
        maxStreak: 30,
        canClaimToday: !claimedToday,
        nextDay: nextDay <= 30 ? nextDay : 1,
        rewards
      }
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('✅ [SUCCESS] GET /api/daily-rewards completed')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

    return NextResponse.json(response)

  } catch (error) {
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.error('❌❌❌ [ERROR] Critical error in GET /api/daily-rewards')
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.error('Error type:', error?.constructor?.name)
    console.error('Error message:', error instanceof Error ? error.message : String(error))
    
    if (error instanceof Error && error.stack) {
      console.error('Stack trace:', error.stack)
    }

    if (error && typeof error === 'object' && 'code' in error) {
      const prismaError = error as { code: string; meta?: any }
      console.error('Prisma error code:', prismaError.code)
      
      switch (prismaError.code) {
        case 'P1001':
          console.error('→ Cannot reach database server. Check DATABASE_URL.')
          break
        case 'P1008':
          console.error('→ Operations timed out. Database may be slow.')
          break
        case 'P2002':
          console.error('→ Unique constraint violation')
          break
        case 'P2025':
          console.error('→ Record not found')
          break
        default:
          console.error('→ Unknown Prisma error')
      }

      if (prismaError.meta) {
        console.error('Error meta:', prismaError.meta)
      }
    }

    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch daily rewards',
        details: process.env.NODE_ENV === 'development' 
          ? (error instanceof Error ? error.message : String(error))
          : undefined
      }, 
      { status: 500 }
    )
  }
}

export async function POST() {
  try {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('🎁 [DAILY-REWARDS POST] Claim request started')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

    const dbOk = await testPrismaConnection()
    if (!dbOk) {
      return NextResponse.json(
        { success: false, error: 'Database connection failed' },
        { status: 500 }
      )
    }

    console.log('🔐 [AUTH] Checking authentication...')
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      console.error('❌ [AUTH] Authentication failed')
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    console.log('✅ [AUTH] User authenticated:', user.id)

    console.log('👤 [CHARACTER] Finding character...')
    const character = await prisma.character.findUnique({
      where: { userId: user.id },
      select: { 
        id: true, 
        username: true,
        cash: true 
      }
    })

    if (!character) {
      console.error('❌ [CHARACTER] Character not found')
      return NextResponse.json(
        { success: false, error: 'Character not found' },
        { status: 404 }
      )
    }

    console.log('✅ [CHARACTER] Found:', character.username, '| Cash:', character.cash)

    console.log('🔍 [VALIDATION] Checking if already claimed today...')
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
      console.log('⚠️  [VALIDATION] Already claimed today (Day', existingClaim.day, ')')
      return NextResponse.json(
        { success: false, error: 'Already claimed today' },
        { status: 400 }
      )
    }

    console.log('✅ [VALIDATION] Can claim today')

    console.log('📋 [REWARDS] Fetching claim history...')
    const claimedRewards = await prisma.dailyReward.findMany({
      where: { characterId: character.id },
      select: { day: true },
      orderBy: { day: 'asc' }
    })

    const claimedDays = claimedRewards.map(r => r.day)
    console.log('📊 [REWARDS] Claimed days:', claimedDays.sort((a, b) => a - b))
    
    let nextDay = 1
    for (let day = 1; day <= 30; day++) {
      if (!claimedDays.includes(day)) {
        nextDay = day
        break
      }
    }

    if (claimedDays.length >= 30) {
      console.log('🔄 [RESET] All 30 days claimed, resetting cycle...')
      await prisma.dailyReward.deleteMany({
        where: { characterId: character.id }
      })
      nextDay = 1
      console.log('✅ [RESET] Cycle reset complete')
    }

    const rewardAmount = REWARD_AMOUNTS[nextDay - 1] || 1000
    const newBalance = character.cash + rewardAmount

    console.log('💰 [REWARD] Claiming Day', nextDay)
    console.log('   Amount:', rewardAmount.toLocaleString())
    console.log('   Old balance:', character.cash.toLocaleString())
    console.log('   New balance:', newBalance.toLocaleString())

    console.log('💾 [DATABASE] Executing transaction...')
    
    await prisma.$transaction([
      prisma.dailyReward.create({
        data: {
          characterId: character.id,
          day: nextDay
        }
      }),
      
      prisma.character.update({
        where: { id: character.id },
        data: { cash: newBalance }
      }),
      
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

    console.log('✅ [DATABASE] Transaction completed successfully')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('✅ [SUCCESS] POST /api/daily-rewards completed')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

    return NextResponse.json({
      success: true,
      reward: {
        day: nextDay,
        amount: rewardAmount,
        newBalance
      }
    })

  } catch (error) {
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.error('❌❌❌ [ERROR] Critical error in POST /api/daily-rewards')
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.error('Error type:', error?.constructor?.name)
    console.error('Error message:', error instanceof Error ? error.message : String(error))
    
    if (error instanceof Error && error.stack) {
      console.error('Stack trace:', error.stack)
    }

    if (error && typeof error === 'object' && 'code' in error) {
      const prismaError = error as { code: string }
      console.error('Prisma error code:', prismaError.code)
      
      switch (prismaError.code) {
        case 'P2002':
          console.error('→ Duplicate claim detected (race condition)')
          return NextResponse.json(
            { success: false, error: 'Already claimed today' },
            { status: 400 }
          )
        case 'P2025':
          console.error('→ Character not found during update')
          return NextResponse.json(
            { success: false, error: 'Character not found' },
            { status: 404 }
          )
      }
    }
    
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to claim daily reward',
        details: process.env.NODE_ENV === 'development'
          ? (error instanceof Error ? error.message : String(error))
          : undefined
      }, 
      { status: 500 }
    )
  }
}