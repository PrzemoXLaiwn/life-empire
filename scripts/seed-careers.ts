/**
 * Seed script for Education and Career data
 * Run with: npx ts-node scripts/seed-careers.ts
 */

import { PrismaClient } from '@prisma/client';
import { EDUCATION_DATA } from '../lib/data/education-data';
import { CAREER_LADDERS } from '../lib/data/career-data';

const prisma = new PrismaClient();

async function seedEducation() {
  console.log('🎓 Seeding Education data...');

  let count = 0;
  for (const edu of EDUCATION_DATA) {
    const existing = await prisma.education.findUnique({
      where: { name: edu.name },
    });

    if (existing) {
      // Update existing
      await prisma.education.update({
        where: { name: edu.name },
        data: edu,
      });
      console.log(`  ✓ Updated: ${edu.name}`);
    } else {
      // Create new
      await prisma.education.create({
        data: edu,
      });
      console.log(`  + Created: ${edu.name}`);
      count++;
    }
  }

  console.log(`✅ Education seeded! (${count} new, ${EDUCATION_DATA.length - count} updated)\n`);
}

async function seedCareers() {
  console.log('💼 Seeding Career ladders...');

  const careerLadders = [
    { name: 'Fast Food', jobs: CAREER_LADDERS.fastFood },
    { name: 'Technology', jobs: CAREER_LADDERS.tech },
    { name: 'Business', jobs: CAREER_LADDERS.business },
    { name: 'Medical', jobs: CAREER_LADDERS.medical },
    { name: 'Law', jobs: CAREER_LADDERS.law },
    { name: 'Law Enforcement', jobs: CAREER_LADDERS.police },
  ];

  let totalCreated = 0;
  let totalUpdated = 0;

  for (const ladder of careerLadders) {
    console.log(`\n📊 ${ladder.name} Career:`);

    // First pass: create/update all jobs
    const jobIds = new Map<string, string>();

    for (const jobData of ladder.jobs) {
      const existing = await prisma.job.findFirst({
        where: { title: jobData.title },
      });

      if (existing) {
        // Update (without nextJobId for now)
        const { nextJobTitle, ...updateData } = jobData as any;
        await prisma.job.update({
          where: { id: existing.id },
          data: updateData,
        });
        jobIds.set(jobData.title, existing.id);
        console.log(`  ✓ Updated: ${jobData.title}`);
        totalUpdated++;
      } else {
        // Create (without nextJobId for now)
        const { nextJobTitle, ...createData } = jobData as any;
        const created = await prisma.job.create({
          data: createData,
        });
        jobIds.set(jobData.title, created.id);
        console.log(`  + Created: ${jobData.title} ($${jobData.annualSalary.toLocaleString()}/year)`);
        totalCreated++;
      }
    }

    // Second pass: link jobs together (career progression)
    for (const jobData of ladder.jobs) {
      if (jobData.nextJobTitle) {
        const currentJobId = jobIds.get(jobData.title);
        const nextJobId = jobIds.get(jobData.nextJobTitle);

        if (currentJobId && nextJobId) {
          await prisma.job.update({
            where: { id: currentJobId },
            data: { nextJobId },
          });
          console.log(`  → ${jobData.title} ⟹  ${jobData.nextJobTitle}`);
        }
      }
    }
  }

  console.log(`\n✅ Careers seeded! (${totalCreated} new, ${totalUpdated} updated)\n`);
}

async function main() {
  try {
    console.log('🌱 Starting Career & Education Seed...\n');

    await seedEducation();
    await seedCareers();

    console.log('🎉 All done! Career system ready.\n');

    // Show stats
    const eduCount = await prisma.education.count();
    const jobCount = await prisma.job.count();

    console.log('📊 Database Stats:');
    console.log(`  - Education options: ${eduCount}`);
    console.log(`  - Career positions: ${jobCount}`);

  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
