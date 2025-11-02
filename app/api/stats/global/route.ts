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
      prisma.character.count(),
      
      prisma.character.count({
        where: {
          lastActive: {
            gte: new Date(Date.now() - 15 * 60 * 1000)
          }
        }
      }),
      
      prisma.character.aggregate({
        _sum: {
          cash: true,
          bankBalance: true,
          dirtyCash: true
        }
      }),
      
      // ✅ FIXED: Poprawne query dla Business
      prisma.business.count({
        where: {
          ownerId: {
            not: null
          }
        }
      }),
      
      prisma.gang.count({
        where: {
          isActive: true
        }
      })
    ])

    const totalWealthSum = 
      (totalWealth._sum?.cash || 0) + 
      (totalWealth._sum?.bankBalance || 0) +
      (totalWealth._sum?.dirtyCash || 0)

    return NextResponse.json({
      success: true,
      data: {
        totalPlayers: totalPlayers || 0,
        onlinePlayers: onlinePlayers || 0,
        totalWealth: totalWealthSum,
        totalBusinesses: totalBusinesses || 0,
        totalGangs: totalGangs || 0,
        lastUpdated: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('Failed to fetch global stats:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}