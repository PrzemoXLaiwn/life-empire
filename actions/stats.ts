'use server'

/**
 * Stats Server Actions
 * Handles player statistics, leaderboards, and analytics
 */

import { prisma } from '@/lib/prisma/client'
import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'

/**
 * Get comprehensive player statistics
 */
export async function getPlayerStats(characterId: string) {
  try {
    const character = await prisma.character.findUnique({
      where: { id: characterId },
      include: {
        city: true,
        gang: true,
      }
    })

    if (!character) {
      return { error: 'Character not found' }
    }

    // Get crime history stats
    const crimeHistory = await prisma.crimeHistory.findMany({
      where: { characterId },
      include: { crime: true }
    })

    const totalCrimes = crimeHistory.length
    const successfulCrimes = crimeHistory.filter(c => c.success).length
    const totalCrimeRewards = crimeHistory.reduce((sum, c) => sum + c.reward, 0)
    const biggestCrimeReward = Math.max(...crimeHistory.map(c => c.reward), 0)

    // Get job history stats
    const jobHistory = await prisma.jobHistory.findMany({
      where: { characterId },
      include: { job: true }
    })

    const totalJobs = jobHistory.length
    const totalHoursWorked = character.totalWorkHours // Use new tracking field
    const totalJobEarnings = jobHistory.reduce((sum, j) => sum + j.totalPay, 0)
    const longestShift = Math.max(...jobHistory.map(j => j.hoursWorked), 0)

    // Get activity history for last 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const recentTransactions = await prisma.transaction.findMany({
      where: {
        characterId,
        timestamp: { gte: thirtyDaysAgo }
      },
      orderBy: { timestamp: 'desc' }
    })

    // Calculate daily earnings for chart
    const dailyEarnings = Array(7).fill(0).map((_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (6 - i))
      const dayStart = new Date(date.setHours(0, 0, 0, 0))
      const dayEnd = new Date(date.setHours(23, 59, 59, 999))

      const dayEarnings = recentTransactions
        .filter(t => t.timestamp >= dayStart && t.timestamp <= dayEnd && t.amount > 0)
        .reduce((sum, t) => sum + t.amount, 0)

      return {
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        amount: dayEarnings
      }
    })

    // Calculate crimes by type
    const crimesByType: Record<string, number> = {}
    crimeHistory.forEach(c => {
      const type = c.crime.category
      crimesByType[type] = (crimesByType[type] || 0) + 1
    })

    // Calculate XP gained over time
    const xpHistory = Array(7).fill(0).map((_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (6 - i))
      return {
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        xp: Math.floor(Math.random() * 500) // TODO: Track actual XP history
      }
    })

    // Calculate net worth
    const netWorth = character.cash + character.bankBalance + character.dirtyCash

    // Calculate current streak (days played consecutively)
    const activityLogs = await prisma.activityLog.findMany({
      where: { characterId },
      orderBy: { timestamp: 'desc' },
      take: 30
    })

    let currentStreak = 0
    let lastDate = new Date()

    for (const log of activityLogs) {
      const logDate = new Date(log.timestamp)
      const daysDiff = Math.floor((lastDate.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24))

      if (daysDiff <= 1) {
        currentStreak++
        lastDate = logDate
      } else {
        break
      }
    }

    return {
      overview: {
        netWorth,
        totalCrimes,
        totalJobs,
        level: character.level,
        experience: character.experience,
        xpNeeded: character.xpNeeded,
      },
      charts: {
        dailyEarnings,
        crimesByType: Object.entries(crimesByType).map(([type, count]) => ({
          type,
          count
        })),
        xpHistory,
      },
      personalRecords: {
        biggestCrimeReward,
        longestShift,
        mostMoneyInDay: Math.max(...dailyEarnings.map(d => d.amount), 0),
        currentStreak,
      }
    }
  } catch (error) {
    console.error('Error fetching player stats:', error)
    return { error: 'Failed to fetch stats' }
  }
}

/**
 * Get leaderboards
 */
export async function getLeaderboards() {
  try {
    // Top by Level
    const topByLevel = await prisma.character.findMany({
      take: 10,
      orderBy: { level: 'desc' },
      select: {
        id: true,
        username: true,
        level: true,
        avatar: true,
        customAvatar: true,
      }
    })

    // Top by Net Worth
    const allCharacters = await prisma.character.findMany({
      select: {
        id: true,
        username: true,
        cash: true,
        bankBalance: true,
        dirtyCash: true,
        avatar: true,
        customAvatar: true,
      }
    })

    const topByNetWorth = allCharacters
      .map(c => ({
        ...c,
        netWorth: c.cash + c.bankBalance + c.dirtyCash
      }))
      .sort((a, b) => b.netWorth - a.netWorth)
      .slice(0, 10)

    // Top by Reputation
    const topByReputation = await prisma.character.findMany({
      take: 10,
      orderBy: { reputation: 'desc' },
      select: {
        id: true,
        username: true,
        reputation: true,
        avatar: true,
        customAvatar: true,
      }
    })

    return {
      topByLevel,
      topByNetWorth,
      topByReputation,
    }
  } catch (error) {
    console.error('Error fetching leaderboards:', error)
    return { error: 'Failed to fetch leaderboards' }
  }
}

/**
 * Get current user's character ID from session
 */
export async function getCurrentCharacterId() {
  try {
    const cookieStore = await cookies()
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return { error: 'Not authenticated' }
    }

    const character = await prisma.character.findUnique({
      where: { userId: user.id },
      select: { id: true }
    })

    if (!character) {
      return { error: 'Character not found' }
    }

    return { characterId: character.id }
  } catch (error) {
    console.error('Error getting character ID:', error)
    return { error: 'Failed to get character' }
  }
}
