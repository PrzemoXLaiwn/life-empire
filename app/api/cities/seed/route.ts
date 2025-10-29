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
        incomeBonus: 10,
        crimeBonus: 5,
        trainingBonus: 0,
        businessBonus: 0,
        minLevel: 1,
        requiresCar: false,
        requiresPlane: false
      },
      {
        name: 'Liberty City',
        country: 'USA',
        description: 'East coast powerhouse. Perfect for building business empires.',
        incomeBonus: 0,
        crimeBonus: 0,
        trainingBonus: 5,
        businessBonus: 15,
        minLevel: 1,
        requiresCar: false,
        requiresPlane: false
      },
      {
        name: 'Vice City',
        country: 'USA',
        description: 'Tropical paradise with underground connections.',
        incomeBonus: 5,
        crimeBonus: 10,
        trainingBonus: 5,
        businessBonus: 5,
        minLevel: 15,
        requiresCar: true,  // Wymaga samochodu
        requiresPlane: false
      },
      
      // UK - Requires Plane
      {
        name: 'London',
        country: 'UK',
        description: 'European crime hub. Sophisticated operations.',
        incomeBonus: 15,
        crimeBonus: 0,
        trainingBonus: 10,
        businessBonus: 10,
        minLevel: 25,
        requiresCar: false,
        requiresPlane: true  // Wymaga samolotu
      },
      {
        name: 'Manchester',
        country: 'UK',
        description: 'Industrial powerhouse with underground networks.',
        incomeBonus: 10,
        crimeBonus: 5,
        trainingBonus: 5,
        businessBonus: 5,
        minLevel: 30,
        requiresCar: true,
        requiresPlane: true
      },
      
      // Japan - Requires Plane
      {
        name: 'Tokyo',
        country: 'Japan',
        description: 'Yakuza territory. Advanced training and operations.',
        incomeBonus: 5,
        crimeBonus: 15,
        trainingBonus: 20,
        businessBonus: 5,
        minLevel: 35,
        requiresCar: false,
        requiresPlane: true
      },
      {
        name: 'Osaka',
        country: 'Japan',
        description: 'Commercial hub with tech opportunities.',
        incomeBonus: 20,
        crimeBonus: 0,
        trainingBonus: 10,
        businessBonus: 15,
        minLevel: 40,
        requiresCar: true,
        requiresPlane: true
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