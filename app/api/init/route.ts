import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * Initialize database with essential data (cities only)
 * This endpoint ensures cities are available for character creation
 */
export async function POST() {
  try {
    console.log('🚀 Initializing database with cities...')

    // Seed cities
    const cities = [
      {
        name: 'Los Santos',
        country: 'USA',
        description: 'City of angels and crime. High-risk, high-reward opportunities.',
        crimeBonus: 5,
        businessTaxRate: 0.20,
        policePresence: 60,
        gangActivity: 70,
        specializations: ['crime', 'entertainment']
      },
      {
        name: 'Liberty City',
        country: 'USA',
        description: 'East coast powerhouse. Perfect for building business empires.',
        crimeBonus: 0,
        businessTaxRate: 0.25,
        policePresence: 70,
        gangActivity: 50,
        specializations: ['business', 'finance']
      },
      {
        name: 'Vice City',
        country: 'USA',
        description: 'Tropical paradise with underground connections.',
        crimeBonus: 10,
        businessTaxRate: 0.18,
        policePresence: 40,
        gangActivity: 80,
        specializations: ['drugs', 'nightlife']
      }
    ]

    for (const city of cities) {
      await prisma.city.upsert({
        where: { name: city.name },
        update: city,
        create: city
      })
    }

    const cityCount = await prisma.city.count()

    console.log(`✅ Database initialized: ${cityCount} cities`)

    return NextResponse.json({
      success: true,
      message: 'Database initialized successfully',
      data: {
        citiesCreated: cityCount
      }
    })
  } catch (error) {
    console.error('❌ Error initializing database:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to initialize database',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
