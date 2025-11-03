// app/api/stats/global/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const [
      totalPlayers,
      onlinePlayers,
      totalWealth,
      totalBusinesses,
      totalGangs
    ] = await Promise.all([
      // Total players
      prisma.character.count(),

      // Online players (active in last 15 minutes)
      prisma.character.count({
        where: {
          lastActive: {
            gte: new Date(Date.now() - 15 * 60 * 1000)
          }
        }
      }),

      // Total wealth (sum of all cash + bank)
      prisma.character.aggregate({
        _sum: {
          cash: true,
          bankBalance: true
        }
      }),

      // Total businesses
      prisma.business.count(),

      // Total gangs
      prisma.gang.count()
    ])

    const totalCash = (totalWealth._sum.cash || 0) + (totalWealth._sum.bankBalance || 0)

    return NextResponse.json({
      success: true,
      data: {
        totalPlayers,
        onlinePlayers,
        totalWealth: totalCash,
        totalBusinesses,
        totalGangs,
        lastUpdated: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('Failed to fetch global stats:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch stats',
        data: {
          totalPlayers: 0,
          onlinePlayers: 0,
          totalWealth: 0,
          totalBusinesses: 0,
          totalGangs: 0,
          lastUpdated: new Date().toISOString()
        }
      },
      { status: 500 }
    )
  }
}