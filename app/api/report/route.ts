// app/api/report/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

// ========================================
// RATE LIMITING
// ========================================
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(identifier: string, maxAttempts: number, windowMs: number): {
  allowed: boolean
  remaining: number
  resetAt: number
} {
  const now = Date.now()
  const userLimit = rateLimitStore.get(identifier)

  if (!userLimit || now > userLimit.resetAt) {
    rateLimitStore.set(identifier, { count: 1, resetAt: now + windowMs })
    return { allowed: true, remaining: maxAttempts - 1, resetAt: now + windowMs }
  }

  if (userLimit.count >= maxAttempts) {
    return { allowed: false, remaining: 0, resetAt: userLimit.resetAt }
  }

  userLimit.count++
  return { allowed: true, remaining: maxAttempts - userLimit.count, resetAt: userLimit.resetAt }
}

// ========================================
// INPUT SANITIZATION
// ========================================
function sanitizeInput(text: string): string {
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim()
}

// ========================================
// VALIDATION
// ========================================
const VALID_VIOLATION_TYPES = [
  'multi-accounting',
  'botting',
  'rmt',
  'exploiting',
  'harassment',
  'spam',
  'hate-speech',
  'account-sharing',
  'impersonation',
  'other'
]

function validateReportData(data: any): { valid: boolean; error?: string } {
  if (!data.targetUsername || typeof data.targetUsername !== 'string') {
    return { valid: false, error: 'Target username is required' }
  }

  if (!data.violationType || !VALID_VIOLATION_TYPES.includes(data.violationType)) {
    return { valid: false, error: 'Invalid violation type' }
  }

  if (!data.description || typeof data.description !== 'string' || data.description.length < 20) {
    return { valid: false, error: 'Description must be at least 20 characters' }
  }

  if (data.description.length > 2000) {
    return { valid: false, error: 'Description must be less than 2000 characters' }
  }

  if (!data.incidentDate) {
    return { valid: false, error: 'Incident date is required' }
  }

  const incidentDate = new Date(data.incidentDate)
  if (isNaN(incidentDate.getTime())) {
    return { valid: false, error: 'Invalid incident date' }
  }

  if (incidentDate > new Date()) {
    return { valid: false, error: 'Incident date cannot be in the future' }
  }

  return { valid: true }
}

// ========================================
// CALCULATE PRIORITY
// ========================================
async function calculateReportPriority(
  targetId: string,
  violationType: string
): Promise<'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'> {
  // Check previous reports against this user
  const previousReports = await prisma.report.count({
    where: {
      targetId,
      status: { in: ['PENDING', 'INVESTIGATING'] }
    }
  })

  // Critical violations
  if (['botting', 'rmt', 'exploiting'].includes(violationType)) {
    return previousReports >= 2 ? 'CRITICAL' : 'HIGH'
  }

  // Serious violations
  if (['multi-accounting', 'harassment', 'hate-speech'].includes(violationType)) {
    return previousReports >= 3 ? 'HIGH' : 'MEDIUM'
  }

  // Minor violations
  return previousReports >= 5 ? 'MEDIUM' : 'LOW'
}

// ========================================
// POST - Submit Report
// ========================================
export async function POST(request: Request) {
  try {
    // 1. AUTHENTICATION
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        {
          error: 'Authentication required',
          message: 'You must be logged in to submit a report'
        },
        { status: 401 }
      )
    }

    // 2. GET REPORTER CHARACTER
    const reporterCharacter = await prisma.character.findUnique({
      where: { userId: user.id },
      select: { id: true, username: true, level: true }
    })

    if (!reporterCharacter) {
      return NextResponse.json(
        {
          error: 'Character not found',
          message: 'You must create a character before submitting reports'
        },
        { status: 404 }
      )
    }

    // 3. RATE LIMITING - 3 reports per hour
    const rateLimitResult = checkRateLimit(
      reporterCharacter.id,
      3,
      3600000 // 1 hour
    )

    if (!rateLimitResult.allowed) {
      const resetMinutes = Math.ceil((rateLimitResult.resetAt - Date.now()) / 60000)

      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          message: `You can only submit 3 reports per hour. Please try again in ${resetMinutes} minutes.`,
          resetAt: new Date(rateLimitResult.resetAt).toISOString(),
          remaining: 0
        },
        { status: 429 }
      )
    }

    // 4. PARSE AND VALIDATE REQUEST BODY
    const body = await request.json()
    const validation = validateReportData(body)

    if (!validation.valid) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          message: validation.error
        },
        { status: 400 }
      )
    }

    // 5. SANITIZE INPUTS
    const sanitizedData = {
      targetUsername: sanitizeInput(body.targetUsername),
      violationType: body.violationType,
      description: sanitizeInput(body.description),
      evidence: body.evidence ? sanitizeInput(body.evidence) : null,
      incidentDate: new Date(body.incidentDate)
    }

    // 6. CHECK IF TARGET USER EXISTS
    const targetCharacter = await prisma.character.findUnique({
      where: { username: sanitizedData.targetUsername },
      select: { id: true, username: true, userId: true }
    })

    if (!targetCharacter) {
      return NextResponse.json(
        {
          error: 'Target player not found',
          message: `No player found with username "${sanitizedData.targetUsername}". Please verify the username.`
        },
        { status: 404 }
      )
    }

    // 7. PREVENT SELF-REPORTING
    if (targetCharacter.id === reporterCharacter.id) {
      return NextResponse.json(
        {
          error: 'Invalid report',
          message: 'You cannot report yourself'
        },
        { status: 400 }
      )
    }

    // 8. CHECK FOR DUPLICATE RECENT REPORTS
    const recentDuplicateReport = await prisma.report.findFirst({
      where: {
        reporterId: reporterCharacter.id,
        targetId: targetCharacter.id,
        violationType: sanitizedData.violationType,
        submittedAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
        }
      }
    })

    if (recentDuplicateReport) {
      return NextResponse.json(
        {
          error: 'Duplicate report',
          message: 'You already submitted a similar report for this player in the last 24 hours.'
        },
        { status: 409 }
      )
    }

    // 9. CALCULATE PRIORITY
    const priority = await calculateReportPriority(
      targetCharacter.id,
      sanitizedData.violationType
    )

    // 10. CREATE REPORT IN DATABASE
    const report = await prisma.report.create({
      data: {
        reporterId: reporterCharacter.id,
        targetId: targetCharacter.id,
        violationType: sanitizedData.violationType,
        description: sanitizedData.description,
        evidence: sanitizedData.evidence,
        incidentDate: sanitizedData.incidentDate,
        priority,
        status: 'PENDING'
      },
      include: {
        reporter: {
          select: { username: true }
        },
        target: {
          select: { username: true }
        }
      }
    })

    // 11. LOG ACTIVITY
    await prisma.activityLog.create({
      data: {
        characterId: reporterCharacter.id,
        action: 'report_submitted',
        details: {
          reportId: report.id,
          targetUsername: targetCharacter.username,
          violationType: sanitizedData.violationType,
          priority
        }
      }
    }).catch(err => {
      console.error('Failed to log activity:', err)
    })

    // 12. CREATE GAME EVENT
    await prisma.gameEvent.create({
      data: {
        type: 'report',
        message: `Report submitted: ${sanitizedData.violationType} - ${reporterCharacter.username} reported ${targetCharacter.username}`,
        userId: user.id,
        username: reporterCharacter.username
      }
    })

    // 13. SUCCESS RESPONSE
    return NextResponse.json({
      success: true,
      message: 'Your report has been submitted successfully. Our moderation team will review it within 24-48 hours.',
      data: {
        reportId: report.id,
        submittedAt: report.submittedAt,
        status: report.status,
        priority: report.priority,
        remainingReports: rateLimitResult.remaining - 1
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Report submission error:', error)

    return NextResponse.json(
      {
        error: 'Internal server error',
        message: 'Failed to submit report. Please try again later.'
      },
      { status: 500 }
    )
  }
}

// ========================================
// GET - Get User's Reports
// ========================================
export async function GET(request: Request) {
  try {
    // Authentication required
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get character
    const character = await prisma.character.findUnique({
      where: { userId: user.id },
      select: { id: true }
    })

    if (!character) {
      return NextResponse.json(
        { error: 'Character not found' },
        { status: 404 }
      )
    }

    // Get user's reports
    const reports = await prisma.report.findMany({
      where: {
        reporterId: character.id
      },
      include: {
        target: {
          select: {
            username: true,
            avatar: true
          }
        }
      },
      orderBy: {
        submittedAt: 'desc'
      },
      take: 20
    })

    return NextResponse.json({
      success: true,
      reports: reports.map((report) => ({
        id: report.id,
        targetUsername: report.target.username,
        violationType: report.violationType,
        status: report.status,
        priority: report.priority,
        submittedAt: report.submittedAt,
        resolvedAt: report.resolvedAt
      }))
    })

  } catch (error) {
    console.error('Get reports error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reports' },
      { status: 500 }
    )
  }
}