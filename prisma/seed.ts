/**
 * Life Empire - Database Seed Data
 *
 * Populates the database with initial game content:
 * - Cities and Districts
 * - Jobs (all levels)
 * - Crimes (all tiers)
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data (in development only)
  if (process.env.NODE_ENV === 'development') {
    console.log('🗑️  Clearing existing data...');
    await prisma.crime.deleteMany();
    await prisma.job.deleteMany();
    await prisma.district.deleteMany();
    await prisma.city.deleteMany();
  }

  // ========================================
  // SEED CITIES
  // ========================================
  console.log('🏙️  Seeding cities...');

  const losSantos = await prisma.city.create({
    data: {
      name: 'Los Santos',
      country: 'USA',
      description: 'City of angels and crime. High-risk, high-reward opportunities in street crime and gang operations.',
      crimeBonus: 15,
      businessTaxRate: 0.21,
      policePresence: 60,
      gangActivity: 80,
      specializations: ['drug_production', 'gang_activity', 'street_crime'],
    },
  });

  const libertyCity = await prisma.city.create({
    data: {
      name: 'Liberty City',
      country: 'USA',
      description: 'Financial capital with mafia presence. Perfect for business empires and money laundering.',
      crimeBonus: 5,
      businessTaxRate: 0.25,
      policePresence: 70,
      gangActivity: 60,
      specializations: ['finance', 'organized_crime', 'money_laundering'],
    },
  });

  const miamiBeach = await prisma.city.create({
    data: {
      name: 'Miami Beach',
      country: 'USA',
      description: 'Paradise for money laundering through casinos and luxury businesses.',
      crimeBonus: 10,
      businessTaxRate: 0.19,
      policePresence: 50,
      gangActivity: 50,
      specializations: ['money_laundering', 'luxury_lifestyle', 'drug_trafficking'],
    },
  });

  const london = await prisma.city.create({
    data: {
      name: 'London',
      country: 'UK',
      description: 'Sophisticated crime scene. High-class robberies and financial fraud opportunities.',
      crimeBonus: 3,
      businessTaxRate: 0.20,
      policePresence: 75,
      gangActivity: 40,
      specializations: ['white_collar_crime', 'international_finance', 'high_class_heists'],
    },
  });

  const tokyo = await prisma.city.create({
    data: {
      name: 'Tokyo',
      country: 'Japan',
      description: 'Tech hub with Yakuza influence. Perfect for tech startups and organized crime.',
      crimeBonus: 8,
      businessTaxRate: 0.23,
      policePresence: 80,
      gangActivity: 70,
      specializations: ['tech_industry', 'yakuza', 'cybercrime'],
    },
  });

  const mexicoCity = await prisma.city.create({
    data: {
      name: 'Mexico City',
      country: 'Mexico',
      description: 'Cartel territory. Highest drug production profits but dangerous.',
      crimeBonus: 20,
      businessTaxRate: 0.15,
      policePresence: 40,
      gangActivity: 95,
      specializations: ['drug_cartel', 'drug_production', 'smuggling'],
    },
  });

  console.log(`✅ Created ${6} cities`);

  // ========================================
  // SEED DISTRICTS
  // ========================================
  console.log('🏘️  Seeding districts...');

  // Los Santos Districts
  const lsDowntown = await prisma.district.create({
    data: {
      cityId: losSantos.id,
      name: 'Downtown',
      type: 'DOWNTOWN',
      dangerLevel: 40,
      wealthLevel: 80,
      policePresence: 75,
      allowedBusinessTypes: ['RESTAURANT', 'TECH_STARTUP', 'OFFICE', 'RETAIL', 'NIGHTCLUB'],
    },
  });

  const lsBusiness = await prisma.district.create({
    data: {
      cityId: losSantos.id,
      name: 'Financial District',
      type: 'BUSINESS',
      dangerLevel: 20,
      wealthLevel: 90,
      policePresence: 80,
      allowedBusinessTypes: ['TECH_STARTUP', 'OFFICE', 'FINANCE', 'CONSULTING'],
    },
  });

  const lsIndustrial = await prisma.district.create({
    data: {
      cityId: losSantos.id,
      name: 'Industrial Zone',
      type: 'INDUSTRIAL',
      dangerLevel: 50,
      wealthLevel: 40,
      policePresence: 40,
      allowedBusinessTypes: ['WAREHOUSE', 'FACTORY', 'CAR_DEALERSHIP'],
    },
  });

  const lsGhetto = await prisma.district.create({
    data: {
      cityId: losSantos.id,
      name: 'Grove Street',
      type: 'GHETTO',
      dangerLevel: 90,
      wealthLevel: 20,
      policePresence: 30,
      allowedBusinessTypes: ['CAR_WASH', 'PAWN_SHOP', 'LIQUOR_STORE'],
    },
  });

  const lsWaterfront = await prisma.district.create({
    data: {
      cityId: losSantos.id,
      name: 'Santa Monica Pier',
      type: 'WATERFRONT',
      dangerLevel: 35,
      wealthLevel: 85,
      policePresence: 55,
      allowedBusinessTypes: ['CASINO', 'NIGHTCLUB', 'RESTAURANT', 'HOTEL'],
    },
  });

  // Liberty City Districts
  await prisma.district.createMany({
    data: [
      {
        cityId: libertyCity.id,
        name: 'Manhattan',
        type: 'BUSINESS',
        dangerLevel: 25,
        wealthLevel: 95,
        policePresence: 85,
        allowedBusinessTypes: ['TECH_STARTUP', 'OFFICE', 'FINANCE', 'CONSULTING', 'RESTAURANT'],
      },
      {
        cityId: libertyCity.id,
        name: 'Brooklyn',
        type: 'RESIDENTIAL',
        dangerLevel: 45,
        wealthLevel: 60,
        policePresence: 60,
        allowedBusinessTypes: ['RESTAURANT', 'RETAIL', 'SERVICES', 'CAR_WASH'],
      },
      {
        cityId: libertyCity.id,
        name: 'Bronx',
        type: 'GHETTO',
        dangerLevel: 85,
        wealthLevel: 25,
        policePresence: 35,
        allowedBusinessTypes: ['CAR_WASH', 'PAWN_SHOP', 'LIQUOR_STORE'],
      },
    ],
  });

  // Miami Beach Districts
  await prisma.district.createMany({
    data: [
      {
        cityId: miamiBeach.id,
        name: 'South Beach',
        type: 'WATERFRONT',
        dangerLevel: 30,
        wealthLevel: 90,
        policePresence: 50,
        allowedBusinessTypes: ['CASINO', 'NIGHTCLUB', 'RESTAURANT', 'HOTEL', 'RETAIL'],
      },
      {
        cityId: miamiBeach.id,
        name: 'Business Bay',
        type: 'BUSINESS',
        dangerLevel: 20,
        wealthLevel: 85,
        policePresence: 70,
        allowedBusinessTypes: ['TECH_STARTUP', 'OFFICE', 'FINANCE', 'RESTAURANT'],
      },
    ],
  });

  // Tokyo Districts
  await prisma.district.createMany({
    data: [
      {
        cityId: tokyo.id,
        name: 'Shibuya',
        type: 'DOWNTOWN',
        dangerLevel: 35,
        wealthLevel: 85,
        policePresence: 75,
        allowedBusinessTypes: ['TECH_STARTUP', 'RETAIL', 'RESTAURANT', 'NIGHTCLUB'],
      },
      {
        cityId: tokyo.id,
        name: 'Akihabara Tech District',
        type: 'BUSINESS',
        dangerLevel: 20,
        wealthLevel: 80,
        policePresence: 80,
        allowedBusinessTypes: ['TECH_STARTUP', 'OFFICE', 'RETAIL'],
      },
      {
        cityId: tokyo.id,
        name: 'Industrial Bay',
        type: 'INDUSTRIAL',
        dangerLevel: 40,
        wealthLevel: 50,
        policePresence: 50,
        allowedBusinessTypes: ['WAREHOUSE', 'FACTORY'],
      },
    ],
  });

  console.log('✅ Created districts for all cities');

  // ========================================
  // SEED JOBS
  // ========================================
  console.log('💼 Seeding jobs...');

  // ENTRY LEVEL JOBS
  const fastFoodWorker = await prisma.job.create({
    data: {
      title: 'Fast Food Worker',
      category: 'ENTRY_LEVEL',
      description: 'Serve customers at a fast food restaurant. Entry-level position.',
      requiredLevel: 0,
      requiredSkills: {},
      annualSalary: 31200, // $15/hour * 2080 hours/year
      energyPerWork: 10,
      stressPerWork: 15,
      experiencePerWork: 10,
      skillGains: { stamina: 1 },
      injuryRisk: 0,
      stressLevel: 15,
    },
  });

  const deliveryDriver = await prisma.job.create({
    data: {
      title: 'Delivery Driver',
      category: 'ENTRY_LEVEL',
      description: 'Deliver packages and food around the city.',
      requiredLevel: 0,
      requiredSkills: { driving: 10 },
      annualSalary: 37440, // $18/hour * 2080 hours/year
      energyPerWork: 12,
      stressPerWork: 10,
      experiencePerWork: 12,
      skillGains: { driving: 2 },
      injuryRisk: 0.05,
      stressLevel: 10,
    },
  });

  const warehouseWorker = await prisma.job.create({
    data: {
      title: 'Warehouse Worker',
      category: 'ENTRY_LEVEL',
      description: 'Load and unload cargo, manage inventory.',
      requiredLevel: 0,
      requiredSkills: { strength: 15 },
      annualSalary: 35360, // $17/hour * 2080 hours/year
      energyPerWork: 15,
      stressPerWork: 12,
      experiencePerWork: 10,
      skillGains: { strength: 1 },
      injuryRisk: 0.1,
      stressLevel: 12,
    },
  });

  const taxiDriver = await prisma.job.create({
    data: {
      title: 'Taxi Driver',
      category: 'ENTRY_LEVEL',
      description: 'Drive passengers around the city. Tips included.',
      requiredLevel: 0,
      requiredSkills: { driving: 20 },
      annualSalary: 41600, // $20/hour * 2080 hours/year
      energyPerWork: 10,
      stressPerWork: 8,
      experiencePerWork: 15,
      skillGains: { driving: 2, charisma: 1 },
      injuryRisk: 0.05,
      stressLevel: 8,
    },
  });

  // SKILLED JOBS
  const securityGuard = await prisma.job.create({
    data: {
      title: 'Security Guard',
      category: 'SKILLED',
      description: 'Protect property and people. Requires physical fitness.',
      requiredLevel: 3,
      requiredSkills: { strength: 25 },
      annualSalary: 62400, // $30/hour * 2080 hours/year
      energyPerWork: 8,
      stressPerWork: 20,
      experiencePerWork: 20,
      skillGains: { shooting: 1, strength: 1 },
      injuryRisk: 0.15,
      stressLevel: 20,
    },
  });

  const accountant = await prisma.job.create({
    data: {
      title: 'Accountant',
      category: 'SKILLED',
      description: 'Manage financial records and taxes. Opens money laundering mechanics.',
      requiredLevel: 5,
      requiredSkills: { intelligence: 35, accounting: 20 },
      annualSalary: 93600, // $45/hour * 2080 hours/year
      energyPerWork: 12,
      stressPerWork: 25,
      experiencePerWork: 30,
      skillGains: { accounting: 3, intelligence: 1 },
      injuryRisk: 0,
      stressLevel: 25,
    },
  });

  const itSpecialist = await prisma.job.create({
    data: {
      title: 'IT Specialist',
      category: 'SKILLED',
      description: 'Maintain computer systems and networks. Opens cybercrime mechanics.',
      requiredLevel: 5,
      requiredSkills: { intelligence: 40, hacking: 25 },
      annualSalary: 104000, // $50/hour * 2080 hours/year
      energyPerWork: 10,
      stressPerWork: 18,
      experiencePerWork: 35,
      skillGains: { hacking: 3, intelligence: 2 },
      injuryRisk: 0,
      stressLevel: 18,
    },
  });

  const realEstateAgent = await prisma.job.create({
    data: {
      title: 'Real Estate Agent',
      category: 'SKILLED',
      description: 'Sell properties and earn commissions.',
      requiredLevel: 5,
      requiredSkills: { charisma: 35, negotiation: 20 },
      annualSalary: 83200, // $40/hour * 2080 hours/year
      energyPerWork: 12,
      stressPerWork: 22,
      experiencePerWork: 25,
      skillGains: { negotiation: 3, charisma: 2 },
      injuryRisk: 0,
      stressLevel: 22,
    },
  });

  // PROFESSIONAL JOBS
  const seniorAccountant = await prisma.job.create({
    data: {
      title: 'Senior Accountant',
      category: 'PROFESSIONAL',
      description: 'Lead financial operations for large organizations.',
      requiredLevel: 8,
      requiredSkills: { intelligence: 50, accounting: 40 },
      annualSalary: 156000, // $75/hour * 2080 hours/year
      energyPerWork: 15,
      stressPerWork: 30,
      experiencePerWork: 45,
      skillGains: { accounting: 4, management: 2 },
      injuryRisk: 0,
      stressLevel: 30,
    },
  });

  const lawyer = await prisma.job.create({
    data: {
      title: 'Lawyer',
      category: 'PROFESSIONAL',
      description: 'Represent clients in legal matters. Can reduce jail sentences.',
      requiredLevel: 10,
      requiredSkills: { intelligence: 60, charisma: 50 },
      annualSalary: 249600, // $120/hour * 2080 hours/year
      energyPerWork: 18,
      stressPerWork: 35,
      experiencePerWork: 60,
      skillGains: { negotiation: 3, intelligence: 2 },
      injuryRisk: 0,
      stressLevel: 35,
    },
  });

  const investmentBanker = await prisma.job.create({
    data: {
      title: 'Investment Banker',
      category: 'PROFESSIONAL',
      description: 'Manage high-value investments. Stock market insider knowledge.',
      requiredLevel: 12,
      requiredSkills: { intelligence: 70, negotiation: 50 },
      annualSalary: 312000, // $150/hour * 2080 hours/year
      energyPerWork: 20,
      stressPerWork: 40,
      experiencePerWork: 80,
      skillGains: { negotiation: 5, intelligence: 3 },
      injuryRisk: 0,
      stressLevel: 40,
    },
  });

  // EXECUTIVE JOB
  const corporateExecutive = await prisma.job.create({
    data: {
      title: 'Corporate Executive',
      category: 'EXECUTIVE',
      description: 'Top-tier corporate position with equity compensation.',
      requiredLevel: 15,
      requiredSkills: { intelligence: 65, management: 60 },
      annualSalary: 416000, // $200/hour * 2080 hours/year
      energyPerWork: 15,
      stressPerWork: 45,
      experiencePerWork: 100,
      skillGains: { management: 5, negotiation: 3 },
      injuryRisk: 0,
      stressLevel: 45,
    },
  });

  console.log(`✅ Created ${12} jobs`);

  // ========================================
  // SEED CRIMES
  // ========================================
  console.log('🔫 Seeding crimes...');

  // PETTY CRIMES (Tier 1)
  await prisma.crime.create({
    data: {
      name: 'Pickpocketing',
      category: 'THEFT',
      tier: 'PETTY',
      description: 'Steal from unsuspecting pedestrians. Low risk, low reward.',
      requiredLevel: 0,
      requiredSkills: { stealth: 10 },
      requiredItems: [],
      crewSize: { min: 1, max: 1 },
      duration: 5,
      energyCost: 5,
      baseSuccessRate: 60,
      skillWeight: { stealth: 0.6, charisma: 0.4 },
      minReward: 50,
      maxReward: 500,
      experienceReward: 20,
      heatGain: 0.5,
      heatOnFail: 1.0,
      arrestChance: 0.3,
      injuryChance: 0,
      deathRisk: 0,
    },
  });

  await prisma.crime.create({
    data: {
      name: 'Shoplifting',
      category: 'THEFT',
      tier: 'PETTY',
      description: 'Steal merchandise from stores. Watch out for security.',
      requiredLevel: 0,
      requiredSkills: { stealth: 15 },
      requiredItems: [],
      crewSize: { min: 1, max: 1 },
      duration: 10,
      energyCost: 8,
      baseSuccessRate: 65,
      skillWeight: { stealth: 0.7, charisma: 0.3 },
      minReward: 100,
      maxReward: 800,
      experienceReward: 25,
      heatGain: 0.5,
      heatOnFail: 1.0,
      arrestChance: 0.4,
      injuryChance: 0,
      deathRisk: 0,
    },
  });

  await prisma.crime.create({
    data: {
      name: 'Car Theft (Old Models)',
      category: 'VEHICLE_THEFT',
      tier: 'PETTY',
      description: 'Steal old cars and sell to chop shops.',
      requiredLevel: 2,
      requiredSkills: { lockpicking: 20, driving: 25 },
      requiredItems: ['lockpick'],
      crewSize: { min: 1, max: 1 },
      duration: 15,
      energyCost: 15,
      baseSuccessRate: 50,
      skillWeight: { lockpicking: 0.5, driving: 0.3, stealth: 0.2 },
      minReward: 500,
      maxReward: 2000,
      experienceReward: 40,
      heatGain: 1.0,
      heatOnFail: 1.5,
      arrestChance: 0.5,
      injuryChance: 0,
      deathRisk: 0,
    },
  });

  // MINOR CRIMES (Tier 2)
  await prisma.crime.create({
    data: {
      name: 'Burglary (Residential)',
      category: 'BURGLARY',
      tier: 'MINOR',
      description: 'Break into homes and steal valuables. Risky if homeowner is present.',
      requiredLevel: 3,
      requiredSkills: { stealth: 30, lockpicking: 25 },
      requiredItems: ['lockpick', 'mask'],
      crewSize: { min: 1, max: 2 },
      duration: 30,
      energyCost: 20,
      baseSuccessRate: 45,
      skillWeight: { stealth: 0.5, lockpicking: 0.4, strength: 0.1 },
      minReward: 1000,
      maxReward: 5000,
      experienceReward: 60,
      heatGain: 1.5,
      heatOnFail: 2.0,
      arrestChance: 0.6,
      injuryChance: 0.1,
      deathRisk: 0,
    },
  });

  await prisma.crime.create({
    data: {
      name: 'Car Theft (Luxury Models)',
      category: 'VEHICLE_THEFT',
      tier: 'MINOR',
      description: 'Steal high-end vehicles with advanced security systems.',
      requiredLevel: 5,
      requiredSkills: { lockpicking: 40, hacking: 30, driving: 40 },
      requiredItems: ['lockpick', 'hacking_device'],
      crewSize: { min: 1, max: 2 },
      duration: 25,
      energyCost: 25,
      baseSuccessRate: 35,
      skillWeight: { lockpicking: 0.3, hacking: 0.4, driving: 0.3 },
      minReward: 5000,
      maxReward: 20000,
      experienceReward: 80,
      heatGain: 2.0,
      heatOnFail: 2.5,
      arrestChance: 0.7,
      injuryChance: 0,
      deathRisk: 0,
    },
  });

  await prisma.crime.create({
    data: {
      name: 'Drug Dealing (Street)',
      category: 'DRUG_DEALING',
      tier: 'MINOR',
      description: 'Sell drugs on the street. High heat if caught.',
      requiredLevel: 4,
      requiredSkills: { charisma: 25, stealth: 20 },
      requiredItems: ['drugs'],
      crewSize: { min: 1, max: 1 },
      duration: 60,
      energyCost: 15,
      baseSuccessRate: 55,
      skillWeight: { charisma: 0.4, stealth: 0.4, intelligence: 0.2 },
      minReward: 2000,
      maxReward: 8000,
      experienceReward: 70,
      heatGain: 1.0,
      heatOnFail: 2.5,
      arrestChance: 0.8,
      injuryChance: 0.05,
      deathRisk: 0,
    },
  });

  // MODERATE CRIMES (Tier 3)
  await prisma.crime.create({
    data: {
      name: 'Store Robbery',
      category: 'ROBBERY',
      tier: 'MODERATE',
      description: 'Rob convenience stores and gas stations. Police respond quickly.',
      requiredLevel: 7,
      requiredSkills: { shooting: 30, charisma: 25 },
      requiredItems: ['weapon', 'mask'],
      crewSize: { min: 1, max: 2 },
      duration: 15,
      energyCost: 30,
      baseSuccessRate: 40,
      skillWeight: { shooting: 0.3, charisma: 0.4, driving: 0.3 },
      minReward: 3000,
      maxReward: 10000,
      experienceReward: 100,
      heatGain: 2.0,
      heatOnFail: 3.0,
      arrestChance: 0.85,
      injuryChance: 0.3,
      deathRisk: 0.05,
    },
  });

  await prisma.crime.create({
    data: {
      name: 'ATM Hacking',
      category: 'HACKING',
      tier: 'MODERATE',
      description: 'Hack ATMs to withdraw cash. Requires technical skills.',
      requiredLevel: 8,
      requiredSkills: { hacking: 50, intelligence: 40 },
      requiredItems: ['hacking_device', 'laptop'],
      crewSize: { min: 1, max: 1 },
      duration: 20,
      energyCost: 20,
      baseSuccessRate: 45,
      skillWeight: { hacking: 0.7, intelligence: 0.3 },
      minReward: 5000,
      maxReward: 15000,
      experienceReward: 120,
      heatGain: 1.5,
      heatOnFail: 2.0,
      arrestChance: 0.6,
      injuryChance: 0,
      deathRisk: 0,
    },
  });

  await prisma.crime.create({
    data: {
      name: 'Armored Truck Heist',
      category: 'ROBBERY',
      tier: 'MODERATE',
      description: 'Intercept armored trucks transporting cash. High risk, high reward.',
      requiredLevel: 10,
      requiredSkills: { shooting: 50, driving: 45 },
      requiredItems: ['heavy_weapons', 'vehicles', 'explosives'],
      crewSize: { min: 2, max: 4 },
      duration: 45,
      energyCost: 50,
      baseSuccessRate: 30,
      skillWeight: { shooting: 0.5, driving: 0.3, strength: 0.2 },
      minReward: 20000,
      maxReward: 80000,
      experienceReward: 200,
      heatGain: 3.0,
      heatOnFail: 4.0,
      arrestChance: 0.9,
      injuryChance: 0.5,
      deathRisk: 0.15,
    },
  });

  // SERIOUS CRIMES (Tier 4)
  await prisma.crime.create({
    data: {
      name: 'Jewelry Store Heist',
      category: 'ROBBERY',
      tier: 'SERIOUS',
      description: 'Rob high-end jewelry stores. Requires planning and skilled crew.',
      requiredLevel: 12,
      requiredSkills: { shooting: 60, hacking: 40, driving: 50 },
      requiredItems: ['heavy_weapons', 'hacking_device', 'getaway_cars', 'masks'],
      crewSize: { min: 3, max: 5 },
      duration: 60,
      energyCost: 60,
      baseSuccessRate: 25,
      skillWeight: { shooting: 0.4, hacking: 0.3, driving: 0.3 },
      minReward: 50000,
      maxReward: 200000,
      experienceReward: 400,
      heatGain: 3.5,
      heatOnFail: 4.5,
      arrestChance: 0.95,
      injuryChance: 0.6,
      deathRisk: 0.2,
    },
  });

  await prisma.crime.create({
    data: {
      name: 'Drug Lab Raid (Rival)',
      category: 'ASSAULT',
      tier: 'SERIOUS',
      description: 'Raid rival gang drug lab. Violent and extremely dangerous.',
      requiredLevel: 15,
      requiredSkills: { shooting: 70, stealth: 50 },
      requiredItems: ['heavy_weapons', 'body_armor'],
      crewSize: { min: 3, max: 6 },
      duration: 45,
      energyCost: 70,
      baseSuccessRate: 30,
      skillWeight: { shooting: 0.6, stealth: 0.3, strength: 0.1 },
      minReward: 30000,
      maxReward: 100000,
      experienceReward: 350,
      heatGain: 2.5,
      heatOnFail: 3.5,
      arrestChance: 0.7,
      injuryChance: 0.8,
      deathRisk: 0.15,
    },
  });

  // MAJOR CRIMES (Tier 5)
  await prisma.crime.create({
    data: {
      name: 'Bank Heist',
      category: 'ROBBERY',
      tier: 'MAJOR',
      description: 'The ultimate heist. Rob a bank vault. Requires perfect coordination.',
      requiredLevel: 20,
      requiredSkills: { shooting: 75, hacking: 70, driving: 70 },
      requiredItems: ['heavy_weapons', 'hacking_devices', 'explosives', 'multiple_vehicles', 'hostage_plan'],
      crewSize: { min: 4, max: 6 },
      duration: 90,
      energyCost: 80,
      baseSuccessRate: 20,
      skillWeight: { shooting: 0.35, hacking: 0.35, driving: 0.3 },
      minReward: 100000,
      maxReward: 500000,
      experienceReward: 800,
      heatGain: 4.0,
      heatOnFail: 5.0,
      arrestChance: 1.0,
      injuryChance: 0.7,
      deathRisk: 0.25,
    },
  });

  // EXTREME CRIMES (Tier 6)
  await prisma.crime.create({
    data: {
      name: 'Casino Heist',
      category: 'ROBBERY',
      tier: 'EXTREME',
      description: 'The biggest score. Rob a casino vault. Extreme danger, life-changing reward.',
      requiredLevel: 25,
      requiredSkills: { shooting: 85, hacking: 85, intelligence: 80 },
      requiredItems: ['top_tier_weapons', 'advanced_hacking_gear', 'inside_man', 'multiple_escape_plans'],
      crewSize: { min: 5, max: 8 },
      duration: 120,
      energyCost: 100,
      baseSuccessRate: 15,
      skillWeight: { shooting: 0.3, hacking: 0.4, intelligence: 0.3 },
      minReward: 500000,
      maxReward: 2000000,
      experienceReward: 1500,
      heatGain: 5.0,
      heatOnFail: 5.0,
      arrestChance: 1.0,
      injuryChance: 0.85,
      deathRisk: 0.4,
    },
  });

  await prisma.crime.create({
    data: {
      name: 'Assassination (Contract)',
      category: 'MURDER',
      tier: 'EXTREME',
      description: 'Accept assassination contracts. Affects mental state significantly.',
      requiredLevel: 20,
      requiredSkills: { shooting: 80, stealth: 75 },
      requiredItems: ['sniper_rifle', 'silencer'],
      crewSize: { min: 1, max: 2 },
      duration: 0, // Variable based on planning
      energyCost: 50,
      baseSuccessRate: 35,
      skillWeight: { shooting: 0.6, stealth: 0.4 },
      minReward: 50000,
      maxReward: 500000,
      experienceReward: 600,
      heatGain: 3.0,
      heatOnFail: 5.0,
      arrestChance: 0.9,
      injuryChance: 0.2,
      deathRisk: 0.3,
    },
  });

  console.log(`✅ Created ${14} crimes`);

  console.log('✅ Database seeding complete!');
  console.log(`
    📊 Summary:
    - Cities: 6
    - Districts: ~20
    - Jobs: 12
    - Crimes: 14
  `);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
