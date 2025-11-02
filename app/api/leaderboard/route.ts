import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const topPlayers = await prisma.character.findMany({
      take: 10,
      orderBy: [
        { level: 'desc' },
        { reputation: 'desc' },
        { cash: 'desc' }
      ],
      select: {
        id: true,
        username: true,
        avatar: true,
        customAvatar: true,
        level: true,
        reputation: true,
        cash: true,
        currentJob: {
          select: {
            title: true
          }
        },
        gang: {
          select: {
            name: true
          }
        }
      }
    })

    const leaderboard = topPlayers.map((player, index) => ({
      rank: index + 1,
      id: player.id,
      username: player.username,
      avatar: player.customAvatar || player.avatar || 'crown',
      level: player.level,
      reputation: player.reputation,
      cash: player.cash,
      job: player.currentJob?.title || 'Unemployed',
      gang: player.gang?.name || null
    }))

    return NextResponse.json({ leaderboard })
  } catch (error) {
    console.error('GET /api/leaderboard error:', error)
    return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 })
  }
}
