// app/api/reviews/latest/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '3')

    // ✅ Używamy ActivityLog jako "reviews" - wysokopoziomowi gracze
    const topPlayers = await prisma.character.findMany({
      where: {
        level: { gte: 50 } // Tylko gracze 50+ level
      },
      orderBy: [
        { level: 'desc' },
        { reputation: 'desc' }
      ],
      take: limit,
      select: {
        id: true,
        username: true,
        avatar: true,
        customAvatar: true,
        level: true,
        currentJob: {
          select: {
            title: true,
            category: true
          }
        },
        gang: {
          select: {
            name: true
          }
        },
        createdAt: true
      }
    })

    // Generuj "reviews" na podstawie ścieżki gracza
    const reviews = topPlayers.map(player => {
      let careerPath = 'Mixed Path'
      let review = ''

      if (player.currentJob) {
        if (player.currentJob.category === 'EXECUTIVE') {
          careerPath = 'Legal Career Path'
          review = `Started from the bottom, now I'm a ${player.currentJob.title}. Hard work pays off!`
        } else {
          careerPath = 'Legal Path'
          review = `Working as ${player.currentJob.title}. Building my empire legally!`
        }
      } else if (player.gang) {
        careerPath = 'Criminal Path'
        review = `Leading ${player.gang.name}. The streets respect power!`
      } else {
        review = `Level ${player.level} and still climbing. This game is addictive!`
      }

      return {
        id: player.id,
        username: player.username,
        avatar: player.customAvatar || player.avatar || 'crown',
        level: player.level,
        careerPath,
        review,
        createdAt: player.createdAt.toISOString()
      }
    })

    return NextResponse.json({
      success: true,
      data: reviews
    })
  } catch (error) {
    console.error('Failed to fetch reviews:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}