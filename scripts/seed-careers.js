/**
 * Seed script for Education and Career data
 * Run with: node scripts/seed-careers.js
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Education data
const EDUCATION_DATA = [
  {
    name: 'Public High School',
    type: 'HIGH_SCHOOL',
    major: null,
    requiredLevel: 1,
    requiredEducation: 'NONE',
    requiredGPA: 0,
    requiredInt: 0,
    tuitionCost: 0,
    durationYears: 4,
    intelligenceGain: 15,
    charismaGain: 5,
    skillGains: {},
    description: 'Standard public education. Free for all citizens.',
    isAvailable: true,
  },
  {
    name: 'MIT',
    type: 'UNIVERSITY',
    major: 'Computer Science',
    requiredLevel: 5,
    requiredEducation: 'HIGH_SCHOOL',
    requiredGPA: 3.8,
    requiredInt: 70,
    tuitionCost: 200000,
    durationYears: 4,
    intelligenceGain: 30,
    charismaGain: 10,
    skillGains: { hacking: 25, intelligence: 15 },
    description: 'Massachusetts Institute of Technology - Top tier Computer Science program.',
    isAvailable: true,
  },
  {
    name: 'Stanford University',
    type: 'UNIVERSITY',
    major: 'Computer Science',
    requiredLevel: 5,
    requiredEducation: 'HIGH_SCHOOL',
    requiredGPA: 3.7,
    requiredInt: 65,
    tuitionCost: 180000,
    durationYears: 4,
    intelligenceGain: 28,
    charismaGain: 12,
    skillGains: { hacking: 20, intelligence: 12 },
    description: 'Stanford University - Elite Computer Science and Technology.',
    isAvailable: true,
  },
  {
    name: 'State University',
    type: 'UNIVERSITY',
    major: 'Computer Science',
    requiredLevel: 5,
    requiredEducation: 'HIGH_SCHOOL',
    requiredGPA: 2.5,
    requiredInt: 40,
    tuitionCost: 60000,
    durationYears: 4,
    intelligenceGain: 20,
    charismaGain: 8,
    skillGains: { hacking: 15, intelligence: 8 },
    description: 'Affordable state university with decent CS program.',
    isAvailable: true,
  },
  {
    name: 'Harvard Business School',
    type: 'UNIVERSITY',
    major: 'Business',
    requiredLevel: 5,
    requiredEducation: 'HIGH_SCHOOL',
    requiredGPA: 3.8,
    requiredInt: 60,
    tuitionCost: 220000,
    durationYears: 4,
    intelligenceGain: 25,
    charismaGain: 20,
    skillGains: { management: 25, negotiation: 20, accounting: 15 },
    description: 'Harvard Business School - Premier business education.',
    isAvailable: true,
  },
  {
    name: 'Community College',
    type: 'UNIVERSITY',
    major: 'Business',
    requiredLevel: 5,
    requiredEducation: 'HIGH_SCHOOL',
    requiredGPA: 2.0,
    requiredInt: 30,
    tuitionCost: 20000,
    durationYears: 2,
    intelligenceGain: 12,
    charismaGain: 8,
    skillGains: { management: 10, accounting: 8 },
    description: 'Affordable 2-year business program.',
    isAvailable: true,
  },
  {
    name: 'Johns Hopkins',
    type: 'UNIVERSITY',
    major: 'Medicine',
    requiredLevel: 5,
    requiredEducation: 'HIGH_SCHOOL',
    requiredGPA: 3.9,
    requiredInt: 75,
    tuitionCost: 240000,
    durationYears: 4,
    intelligenceGain: 35,
    charismaGain: 10,
    skillGains: { intelligence: 20 },
    description: 'Johns Hopkins - Elite pre-medical program.',
    isAvailable: true,
  },
  {
    name: 'Yale University',
    type: 'UNIVERSITY',
    major: 'Law',
    requiredLevel: 5,
    requiredEducation: 'HIGH_SCHOOL',
    requiredGPA: 3.8,
    requiredInt: 65,
    tuitionCost: 210000,
    durationYears: 4,
    intelligenceGain: 28,
    charismaGain: 22,
    skillGains: { charisma: 15, negotiation: 18 },
    description: 'Yale - Prestigious pre-law program.',
    isAvailable: true,
  },
  {
    name: 'Harvard Medical School',
    type: 'GRADUATE',
    major: 'Medicine',
    requiredLevel: 10,
    requiredEducation: 'UNIVERSITY',
    requiredGPA: 3.7,
    requiredInt: 80,
    tuitionCost: 400000,
    durationYears: 4,
    intelligenceGain: 40,
    charismaGain: 15,
    skillGains: { intelligence: 25 },
    description: 'Harvard Medical School - Train to become a doctor.',
    isAvailable: true,
  },
  {
    name: 'Harvard Law School',
    type: 'GRADUATE',
    major: 'Law',
    requiredLevel: 10,
    requiredEducation: 'UNIVERSITY',
    requiredGPA: 3.7,
    requiredInt: 70,
    tuitionCost: 350000,
    durationYears: 3,
    intelligenceGain: 35,
    charismaGain: 25,
    skillGains: { charisma: 20, negotiation: 25 },
    description: 'Harvard Law School - Elite legal education.',
    isAvailable: true,
  },
  {
    name: 'Police Academy',
    type: 'TRADE_SCHOOL',
    major: 'Law Enforcement',
    requiredLevel: 5,
    requiredEducation: 'HIGH_SCHOOL',
    requiredGPA: 2.5,
    requiredInt: 30,
    tuitionCost: 15000,
    durationYears: 1,
    intelligenceGain: 8,
    charismaGain: 10,
    skillGains: { shooting: 20, strength: 10, driving: 15 },
    description: 'Train to become a police officer.',
    isAvailable: true,
  },
];

// Career ladders (simplified - just fast food and tech for now)
const FAST_FOOD_LADDER = [
  {
    title: 'Fast Food Worker',
    category: 'ENTRY_LEVEL',
    description: 'Take orders and serve customers at a fast food restaurant.',
    requiredLevel: 1,
    requiredEducation: 'NONE',
    annualSalary: 18000,
    bonusPercentage: 0,
    energyPerWork: 20,
    stressPerWork: 8,
    experiencePerWork: 8,
    skillGains: {},
    requiredSkills: {},
    requiredStats: {},
    injuryRisk: 0.02,
    stressLevel: 7,
    yearsForPromotion: 2,
    minPerformance: 60,
    nextJobTitle: 'Crew Trainer',
  },
  {
    title: 'Crew Trainer',
    category: 'ENTRY_LEVEL',
    description: 'Train new employees and handle customer complaints.',
    requiredLevel: 2,
    requiredEducation: 'NONE',
    annualSalary: 22000,
    bonusPercentage: 5,
    energyPerWork: 22,
    stressPerWork: 10,
    experiencePerWork: 10,
    skillGains: { charisma: 1 },
    requiredSkills: {},
    requiredStats: {},
    injuryRisk: 0.01,
    stressLevel: 8,
    yearsForPromotion: 3,
    minPerformance: 65,
    nextJobTitle: 'Shift Manager',
  },
  {
    title: 'Shift Manager',
    category: 'SKILLED',
    description: 'Manage restaurant operations during your shift.',
    requiredLevel: 4,
    requiredEducation: 'NONE',
    annualSalary: 28000,
    bonusPercentage: 8,
    energyPerWork: 25,
    stressPerWork: 12,
    experiencePerWork: 12,
    skillGains: { management: 2, charisma: 1 },
    requiredSkills: {},
    requiredStats: {},
    injuryRisk: 0.01,
    stressLevel: 9,
    yearsForPromotion: 4,
    minPerformance: 70,
    nextJobTitle: 'Store Manager',
  },
  {
    title: 'Store Manager',
    category: 'PROFESSIONAL',
    description: 'Full responsibility for restaurant operations and profitability.',
    requiredLevel: 10,
    requiredEducation: 'NONE',
    requiredSkills: { management: 30, accounting: 15 },
    requiredStats: {},
    annualSalary: 45000,
    bonusPercentage: 15,
    energyPerWork: 30,
    stressPerWork: 18,
    experiencePerWork: 20,
    skillGains: { management: 4, accounting: 2 },
    injuryRisk: 0,
    stressLevel: 12,
    yearsForPromotion: 999,
    minPerformance: 80,
  },
];

const TECH_LADDER = [
  {
    title: 'Junior Developer',
    category: 'PROFESSIONAL',
    description: 'Write code and fix bugs under senior developer supervision.',
    requiredLevel: 5,
    requiredEducation: 'UNIVERSITY',
    requiredMajor: 'Computer Science',
    requiredSkills: { intelligence: 50, hacking: 20 },
    requiredStats: {},
    annualSalary: 65000,
    bonusPercentage: 10,
    energyPerWork: 25,
    stressPerWork: 12,
    experiencePerWork: 18,
    skillGains: { hacking: 3, intelligence: 2 },
    injuryRisk: 0,
    stressLevel: 8,
    yearsForPromotion: 2,
    minPerformance: 70,
    nextJobTitle: 'Software Developer',
  },
  {
    title: 'Software Developer',
    category: 'PROFESSIONAL',
    description: 'Design and implement software features independently.',
    requiredLevel: 7,
    requiredEducation: 'UNIVERSITY',
    requiredMajor: 'Computer Science',
    requiredSkills: { intelligence: 55, hacking: 30 },
    requiredStats: {},
    annualSalary: 85000,
    bonusPercentage: 12,
    energyPerWork: 27,
    stressPerWork: 14,
    experiencePerWork: 22,
    skillGains: { hacking: 4, intelligence: 3 },
    injuryRisk: 0,
    stressLevel: 10,
    yearsForPromotion: 3,
    minPerformance: 75,
    nextJobTitle: 'Senior Developer',
  },
  {
    title: 'Senior Developer',
    category: 'PROFESSIONAL',
    description: 'Lead technical projects and mentor junior developers.',
    requiredLevel: 10,
    requiredEducation: 'UNIVERSITY',
    requiredMajor: 'Computer Science',
    requiredSkills: { intelligence: 65, hacking: 45 },
    requiredStats: {},
    annualSalary: 120000,
    bonusPercentage: 15,
    energyPerWork: 30,
    stressPerWork: 16,
    experiencePerWork: 28,
    skillGains: { hacking: 5, intelligence: 4, management: 2 },
    injuryRisk: 0,
    stressLevel: 12,
    yearsForPromotion: 4,
    minPerformance: 80,
    nextJobTitle: 'Lead Developer',
  },
  {
    title: 'Lead Developer',
    category: 'EXECUTIVE',
    description: 'Architect major systems and lead development teams.',
    requiredLevel: 14,
    requiredEducation: 'UNIVERSITY',
    requiredMajor: 'Computer Science',
    requiredSkills: { intelligence: 70, hacking: 60, management: 30 },
    requiredStats: {},
    annualSalary: 160000,
    bonusPercentage: 18,
    energyPerWork: 32,
    stressPerWork: 18,
    experiencePerWork: 35,
    skillGains: { hacking: 5, intelligence: 5, management: 4 },
    injuryRisk: 0,
    stressLevel: 14,
    yearsForPromotion: 999,
    minPerformance: 82,
  },
];

async function seedEducation() {
  console.log('🎓 Seeding Education data...');

  let count = 0;
  for (const edu of EDUCATION_DATA) {
    const existing = await prisma.education.findUnique({
      where: { name: edu.name },
    });

    if (existing) {
      await prisma.education.update({
        where: { name: edu.name },
        data: edu,
      });
      console.log(`  ✓ Updated: ${edu.name}`);
    } else {
      await prisma.education.create({
        data: edu,
      });
      console.log(`  + Created: ${edu.name}`);
      count++;
    }
  }

  console.log(`✅ Education seeded! (${count} new)\n`);
}

async function seedCareerLadder(ladderName, jobs) {
  console.log(`\n📊 ${ladderName} Career:`);

  const jobIds = new Map();

  // First pass: create/update all jobs
  for (const jobData of jobs) {
    const { nextJobTitle, ...data } = jobData;

    // Add legacy hourlyRate (annual salary / 2080 hours per year)
    const dataWithLegacy = {
      ...data,
      hourlyRate: Math.round(data.annualSalary / 2080),
    };

    const existing = await prisma.job.findFirst({
      where: { title: jobData.title },
    });

    if (existing) {
      await prisma.job.update({
        where: { id: existing.id },
        data: dataWithLegacy,
      });
      jobIds.set(jobData.title, existing.id);
      console.log(`  ✓ Updated: ${jobData.title}`);
    } else {
      const created = await prisma.job.create({
        data: dataWithLegacy,
      });
      jobIds.set(jobData.title, created.id);
      console.log(`  + Created: ${jobData.title} ($${jobData.annualSalary.toLocaleString()}/year)`);
    }
  }

  // Second pass: link progression
  for (const jobData of jobs) {
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

async function main() {
  try {
    console.log('🌱 Starting Career & Education Seed...\n');

    await seedEducation();
    await seedCareerLadder('Fast Food', FAST_FOOD_LADDER);
    await seedCareerLadder('Technology', TECH_LADDER);

    console.log('\n🎉 Seed complete!\n');

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
