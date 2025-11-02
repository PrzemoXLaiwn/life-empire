import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const activities = await prisma.activityLog.findMany({
      take: 20,
      orderBy: { timestamp: 'desc' },
      include: {
        character: {
          select: {
            username: true,
            avatar: true
          }
        }
      }
    })

    const formattedActivities = activities.map(activity => ({
      id: activity.id,
      type: activity.action.includes('crime') ? 'danger' :
            activity.action.includes('level') ? 'info' :
            activity.action.includes('job') ? 'success' : 'info',
      message: `${activity.character.username}: ${activity.action}`,
      time: new Date(activity.timestamp).toLocaleString(),
      icon: activity.action.includes('crime') ? 'Target' :
            activity.action.includes('level') ? 'Star' :
            activity.action.includes('job') ? 'Briefcase' : 'Activity'
    }))

    return NextResponse.json({ activities: formattedActivities })
  } catch (error) {
    console.error('GET /api/activity error:', error)
    return NextResponse.json({ error: 'Failed to fetch activities' }, { status: 500 })
  }
}
