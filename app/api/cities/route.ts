import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Remove auth check - cities should be public for registration
    const cities = await prisma.city.findMany({
      orderBy: { minLevel: 'asc' }
    })

    return NextResponse.json({ cities })
  } catch (error) {
    console.error('❌ GET /api/cities error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cities' },
      { status: 500 }
    )
  }
}