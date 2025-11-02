/**
 * Test endpoint to verify report system is working
 * GET /api/report/test
 */

import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Check if all dependencies are available
    const checks = {
      prisma: false,
      redis: false,
      zod: false,
      authHelpers: false
    }

    // Test Prisma import
    try {
      const { prisma } = await import('@/lib/prisma')
      checks.prisma = !!prisma
    } catch (error) {
      console.error('Prisma import failed:', error)
    }

    // Test Redis import
    try {
      const redis = await import('@/lib/redis/client')
      checks.redis = !!redis.default
    } catch (error) {
      console.error('Redis import failed:', error)
    }

    // Test Zod validation import
    try {
      const { reportSubmissionSchema } = await import('@/lib/validations/report')
      checks.zod = !!reportSubmissionSchema
    } catch (error) {
      console.error('Zod validation import failed:', error)
    }

    // Test Auth helpers import
    try {
      const { requireAuth } = await import('@/lib/auth-helpers')
      checks.authHelpers = !!requireAuth
    } catch (error) {
      console.error('Auth helpers import failed:', error)
    }

    const allPassing = Object.values(checks).every(v => v === true)

    return NextResponse.json({
      status: allPassing ? 'success' : 'partial',
      message: allPassing
        ? 'All report system dependencies are working!'
        : 'Some dependencies are missing',
      checks,
      instructions: allPassing
        ? 'Report system is ready to use. Visit /report to submit a report.'
        : 'Please run: npx prisma generate'
    })

  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: 'System check failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
