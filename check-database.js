/**
 * Quick script to check if database has Report table
 * Run: node check-database.js
 */

const { PrismaClient } = require('@prisma/client')

async function checkDatabase() {
  const prisma = new PrismaClient()

  try {
    console.log('🔍 Checking database...\n')

    // Try to count reports
    try {
      const reportCount = await prisma.report.count()
      console.log('✅ Report table exists!')
      console.log(`📊 Current reports in database: ${reportCount}`)
    } catch (error) {
      console.log('❌ Report table does NOT exist or Prisma Client not generated')
      console.log('💡 Run: npx prisma generate')
      process.exit(1)
    }

    // Check enums
    console.log('\n📋 Checking if we can access Report enums...')
    const { ViolationType, ReportStatus } = require('@prisma/client')

    if (ViolationType && ReportStatus) {
      console.log('✅ Enums are available!')
      console.log('   ViolationType:', Object.keys(ViolationType).join(', '))
      console.log('   ReportStatus:', Object.keys(ReportStatus).join(', '))
    } else {
      console.log('❌ Enums not found')
    }

    // Get latest reports
    console.log('\n📥 Latest 5 reports:')
    const latestReports = await prisma.report.findMany({
      take: 5,
      orderBy: { submittedAt: 'desc' },
      include: {
        reporter: {
          select: { username: true }
        },
        target: {
          select: { username: true }
        }
      }
    })

    if (latestReports.length === 0) {
      console.log('   No reports yet. Submit your first one at /report')
    } else {
      latestReports.forEach((report, idx) => {
        console.log(`   ${idx + 1}. ${report.reporter.username} → ${report.target.username} (${report.violationType}) - ${report.status}`)
      })
    }

    console.log('\n✅ Database check complete!')
    console.log('🚀 System is ready to use!\n')

  } catch (error) {
    console.error('❌ Error:', error.message)
    if (error.message.includes('report')) {
      console.log('\n💡 Solution: Run npx prisma generate')
    }
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

checkDatabase()
