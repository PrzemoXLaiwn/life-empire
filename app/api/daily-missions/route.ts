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
        level: true,
        strength: true,
        jobHistory: {
          where: {
            completedAt: {
              gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
            }
          },
          select: {
            hoursWorked: true
          }
        },
        crimeHistory: {
          where: {
            committedAt: {
              gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
            }
          },
          select: {
            success: true
          }
        },
        sentMessages: {
          where: {
            sentAt: {
              gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
            }
          }
        }
      }
    })

    if (!character) {
      return NextResponse.json({ error: 'Character not found' }, { status: 404 })
    }

    // Calculate progress based on real data
    const gymVisits = Math.floor(character.jobHistory.reduce((sum, job) => sum + job.hoursWorked, 0) / 2) // Assume 2 hours per visit
    const crimesCommitted = character.crimeHistory.filter(c => c.success).length
    const messagesSent = character.sentMessages.length

    const missions = [
      {
        id: '1',
        title: 'Train Your Body',
        description: 'Visit the gym 3 times',
        progress: Math.min(gymVisits, 3),
        maxProgress: 3,
        reward: '$5,000',
        icon: 'Dumbbell',
      },
      {
        id: '2',
        title: 'Criminal Activity',
        description: 'Successfully complete 5 crimes',
        progress: Math.min(crimesCommitted, 5),
        maxProgress: 5,
        reward: '$10,000 + 50 Rep',
        icon: 'Target',
      },
      {
        id: '3',
        title: 'Social Butterfly',
        description: 'Send 10 messages to other players',
        progress: Math.min(messagesSent, 10),
        maxProgress: 10,
        reward: '100 Rep',
        icon: 'MessageSquare',
      },
    ]

    return NextResponse.json({ missions })
  } catch (error) {
    console.error('GET /api/daily-missions error:', error)
    return NextResponse.json({ error: 'Failed to fetch daily missions' }, { status: 500 })
  }
}
