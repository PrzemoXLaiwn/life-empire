import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { JobCategory, CrimeCategory, CrimeTier, GangRank, BusinessType } from '@prisma/client'

export async function POST() {
  try {
    console.log('Starting database cleanup...')

    // Clear existing data
    await clearExistingData()

    console.log('Database cleanup completed successfully!')
    return NextResponse.json({
      message: 'Database cleaned successfully - no mock data added',
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error cleaning database:', error)
    return NextResponse.json({
      error: 'Failed to clean database',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

async function clearExistingData() {
  console.log('Clearing existing fake data...')

  // Clear in reverse dependency order, but keep real user data
  await prisma.dailyReward.deleteMany()
  await prisma.notification.deleteMany()
  await prisma.activityLog.deleteMany()
  await prisma.report.deleteMany()
  await prisma.friendship.deleteMany()
  await prisma.message.deleteMany()
  await prisma.transaction.deleteMany()
  await prisma.arrest.deleteMany()
  await prisma.stockHolding.deleteMany()
  await prisma.cryptoHolding.deleteMany()
  await prisma.weapon.deleteMany()
  await prisma.inventoryItem.deleteMany()
  await prisma.vehicle.deleteMany()
  await prisma.property.deleteMany()
  await prisma.businessEmployee.deleteMany()
  await prisma.business.deleteMany()
  await prisma.drugInventory.deleteMany()
  await prisma.drugOperation.deleteMany()
  await prisma.gangWar.deleteMany()
  await prisma.gangTerritory.deleteMany()
  await prisma.gangMember.deleteMany()
  await prisma.gang.deleteMany()
  await prisma.heistParticipant.deleteMany()
  await prisma.heist.deleteMany()
  await prisma.crimeHistory.deleteMany()
  await prisma.crime.deleteMany()
  await prisma.jobHistory.deleteMany()
  await prisma.job.deleteMany()
  await prisma.district.deleteMany()
  await prisma.city.deleteMany()

  // Only delete fake characters (sample ones), keep real user characters
  await prisma.character.deleteMany({
    where: {
      username: {
        in: [
          'Tony_Soprano', 'Walter_White', 'Bruce_Wayne', 'James_Bond', 'Yakuza_Boss',
          'Street_Kid', 'Business_Tycoon', 'Hacker_Pro'
        ]
      }
    }
  })

  // Delete fake users (sample ones), keep real users
  await prisma.user.deleteMany({
    where: {
      email: {
        in: [
          'sample-tony_soprano@sample.com',
          'sample-walter_white@sample.com',
          'sample-bruce_wayne@sample.com',
          'sample-james_bond@sample.com',
          'sample-yakuza_boss@sample.com',
          'sample-street_kid@sample.com',
          'sample-business_tycoon@sample.com',
          'sample-hacker_pro@sample.com'
        ]
      }
    }
  })
}


