/**
 * Notification Helper Functions
 * Centralized notification creation for moderators and users
 */

import { prisma } from '@/lib/prisma'

export interface NotificationData {
  characterId: string
  type: string
  title: string
  message: string
  link?: string
}

/**
 * Create a notification for a character
 */
export async function createNotification(data: NotificationData) {
  try {
    await prisma.notification.create({
      data: {
        characterId: data.characterId,
        type: data.type,
        title: data.title,
        message: data.message,
        link: data.link,
        isRead: false
      }
    })
  } catch (error) {
    console.error('Failed to create notification:', error)
    // Don't throw - notifications are non-critical
  }
}

/**
 * Notify all moderators about a new report
 * In a real implementation, you'd have a moderator role system
 * For now, we'll use GameEvent to log for admin visibility
 */
export async function notifyModeratorsAboutReport(reportData: {
  reportId: string
  reporterUsername: string
  targetUsername: string
  violationType: string
  priority: number
}) {
  try {
    // Log to game events for admin visibility
    await prisma.gameEvent.create({
      data: {
        type: 'moderation_report',
        message: `[PRIORITY ${reportData.priority}] New ${reportData.violationType} report: ${reportData.reporterUsername} reported ${reportData.targetUsername}`,
        userId: null,
        username: 'SYSTEM',
        avatar: null
      }
    })

    // TODO: In production, implement:
    // 1. Email notifications to moderators
    // 2. Discord webhook for mod channel
    // 3. In-app notifications for online moderators
    // 4. SMS for high-priority reports

    console.log('📢 MODERATOR ALERT:', {
      reportId: reportData.reportId,
      priority: reportData.priority,
      violationType: reportData.violationType,
      reporter: reportData.reporterUsername,
      target: reportData.targetUsername
    })
  } catch (error) {
    console.error('Failed to notify moderators:', error)
  }
}

/**
 * Notify the reporter about report status update
 */
export async function notifyReporterAboutStatus(
  reporterCharacterId: string,
  reportId: string,
  status: string
) {
  const statusMessages = {
    INVESTIGATING: 'Your report is now under investigation by our moderation team.',
    RESOLVED: 'Your report has been resolved. Thank you for helping keep our community safe.',
    DISMISSED: 'Your report has been reviewed and dismissed. If you have additional evidence, please submit a new report.'
  }

  const message = statusMessages[status as keyof typeof statusMessages] || 'Your report status has been updated.'

  await createNotification({
    characterId: reporterCharacterId,
    type: 'report_update',
    title: 'Report Status Update',
    message,
    link: `/reports/${reportId}`
  })
}

/**
 * Calculate report priority based on violation type and history
 */
export async function calculateReportPriority(
  targetCharacterId: string,
  violationType: string
): Promise<number> {
  // High priority violation types
  const highPriorityTypes = ['CHEATING', 'EXPLOITING', 'REAL_MONEY_TRADING']
  const mediumPriorityTypes = ['HARASSMENT', 'ACCOUNT_SHARING']

  let priority = 1 // Default low priority

  // Check violation type
  if (highPriorityTypes.includes(violationType)) {
    priority = 4
  } else if (mediumPriorityTypes.includes(violationType)) {
    priority = 2
  }

  try {
    // Check if there are previous pending reports against this user
    const previousReports = await prisma.report.count({
      where: {
        targetId: targetCharacterId,
        status: {
          in: ['PENDING', 'INVESTIGATING']
        }
      }
    })

    // Increase priority if multiple reports exist
    if (previousReports >= 3) {
      priority = 5 // Critical - multiple reports
    } else if (previousReports >= 1) {
      priority = Math.min(5, priority + 1) // Bump up priority
    }
  } catch (error) {
    console.error('Failed to check previous reports:', error)
  }

  return priority
}
