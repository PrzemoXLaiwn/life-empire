import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  console.log('🔵 GET /api/stats/global - Start');
  
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
          bankBalance: true
        }
      }),
      prisma.business.count(),
      prisma.gang.count()
    ])

    const totalCash = (totalWealth._sum.cash || 0) + (totalWealth._sum.bankBalance || 0)

    console.log('✅ GET /api/stats/global - Success');
    
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
    console.error('❌ GET /api/stats/global error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch stats',
        details: error instanceof Error ? error.message : 'Unknown error',
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