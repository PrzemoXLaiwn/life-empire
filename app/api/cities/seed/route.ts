import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST() {
  try {
    const cities = [
      // USA - Starting Cities
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
      },

      // UK - Requires Plane
      {
        name: 'London',
        country: 'UK',
        description: 'European crime hub. Sophisticated operations.',
        crimeBonus: 0,
        businessTaxRate: 0.30,
        policePresence: 80,
        gangActivity: 40,
        specializations: ['finance', 'tech']
      },
      {
        name: 'Manchester',
        country: 'UK',
        description: 'Industrial powerhouse with underground networks.',
        crimeBonus: 5,
        businessTaxRate: 0.22,
        policePresence: 60,
        gangActivity: 60,
        specializations: ['industrial', 'sports']
      },

      // Japan - Requires Plane
      {
        name: 'Tokyo',
        country: 'Japan',
        description: 'Yakuza territory. Advanced training and operations.',
        crimeBonus: 15,
        businessTaxRate: 0.28,
        policePresence: 50,
        gangActivity: 90,
        specializations: ['yakuza', 'tech']
      },
      {
        name: 'Osaka',
        country: 'Japan',
        description: 'Commercial hub with tech opportunities.',
        crimeBonus: 0,
        businessTaxRate: 0.26,
        policePresence: 65,
        gangActivity: 45,
        specializations: ['tech', 'commerce']
      }
    ]

    for (const city of cities) {
      await prisma.city.upsert({
        where: { name: city.name },
        update: city,
        create: city
      })
    }

    return NextResponse.json({ message: 'Cities seeded successfully', count: cities.length })
  } catch (error) {
    console.error('Error seeding cities:', error)
    return NextResponse.json({ error: 'Failed to seed cities' }, { status: 500 })
  }
}