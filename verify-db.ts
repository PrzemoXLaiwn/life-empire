import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function verifyDatabase() {
  try {
    console.log('🔍 Verifying database...\n');

    const cities = await prisma.city.count();
    const districts = await prisma.district.count();
    const jobs = await prisma.job.count();
    const crimes = await prisma.crime.count();

    console.log('📊 Database Counts:');
    console.log('├─ Cities:', cities);
    console.log('├─ Districts:', districts);
    console.log('├─ Jobs:', jobs);
    console.log('└─ Crimes:', crimes);
    console.log('');

    // Get sample data
    const sampleCities = await prisma.city.findMany({ take: 3 });
    console.log('🏙️  Sample Cities:');
    sampleCities.forEach(city => {
      console.log(`   - ${city.name} (${city.country})`);
    });

    console.log('\n✅ Database verification complete!');
  } catch (error) {
    console.error('❌ Verification failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

verifyDatabase();
