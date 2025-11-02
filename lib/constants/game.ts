/**
 * Life Empire - Game Constants
 *
 * All game mechanics calculations are based on these constants
 * with a 10x time acceleration (1 real minute = 10 game minutes)
 */

// ========================================
// TIME SYSTEM
// ========================================
export const GAME_SPEED_MULTIPLIER = 10;
export const REAL_MINUTE_TO_GAME_MINUTES = 10;
export const GAME_HOUR_IN_REAL_SECONDS = 360; // 6 minutes real time = 1 game hour

// ========================================
// ENERGY SYSTEM
// ========================================
export const BASE_MAX_ENERGY = 100;
export const ENERGY_REGEN_PER_MINUTE = 1; // Real-time minute
export const ENERGY_BONUS_PER_5_LEVELS = 5;
export const ENERGY_WARNING_THRESHOLD = 20;

// Energy costs
export const ENERGY_COSTS = {
  JOB_PER_HOUR: 10,
  PETTY_CRIME: 5,
  MINOR_CRIME: 15,
  MODERATE_CRIME: 30,
  SERIOUS_CRIME: 50,
  MAJOR_CRIME: 70,
  EXTREME_CRIME: 100,
  HEIST: 80,
  TRAVEL_CITY: 10,
} as const;

// ========================================
// HEALTH SYSTEM
// ========================================
export const BASE_MAX_HEALTH = 100;
export const HEALTH_BONUS_PER_10_LEVELS = 10;

// Health restoration
export const HEALTH_RESTORATION = {
  HOSPITAL_FULL: 5000,
  FIRST_AID: { amount: 30, cost: 500 },
  DOCTOR_VISIT: { amount: 50, cost: 2000 },
  REST_PER_4_HOURS: 10,
} as const;

// ========================================
// LEVELING SYSTEM
// ========================================
export const MAX_LEVEL = 100;
export const BASE_XP_REQUIREMENT = 100;

// Level-up rewards
export const LEVEL_UP_REWARDS = {
  STAT_POINTS: 5,
  CASH_MULTIPLIER: 1000, // Level * 1000
} as const;

// Feature unlocks by level
export const LEVEL_UNLOCKS = {
  JOIN_GANG: 3,
  MODERATE_CRIMES: 5,
  START_BUSINESS: 10,
  CREATE_GANG: 15,
  PARTICIPATE_HEISTS: 20,
  BUY_PROPERTIES: 25,
  STOCK_MARKET: 30,
  BECOME_GANG_BOSS: 50,
} as const;

// ========================================
// ATTRIBUTE SYSTEM
// ========================================
export const BASE_ATTRIBUTE_VALUE = 10;
export const MAX_ATTRIBUTE_VALUE = 100;

export const ATTRIBUTES = {
  STRENGTH: 'strength',
  INTELLIGENCE: 'intelligence',
  CHARISMA: 'charisma',
  STAMINA: 'stamina',
} as const;

// ========================================
// SKILL SYSTEM
// ========================================
export const BASE_SKILL_VALUE = 0;
export const MAX_SKILL_VALUE = 100;
export const SKILL_DECAY_PER_MONTH = 1;

export const CRIMINAL_SKILLS = {
  SHOOTING: 'shooting',
  DRIVING: 'driving',
  STEALTH: 'stealth',
  LOCKPICKING: 'lockpicking',
  HACKING: 'hacking',
} as const;

export const BUSINESS_SKILLS = {
  MANAGEMENT: 'management',
  NEGOTIATION: 'negotiation',
  ACCOUNTING: 'accounting',
  MARKETING: 'marketing',
} as const;

// ========================================
// CHARACTER CREATION
// ========================================
export const STARTING_CHARACTER = {
  LEVEL: 1,
  EXPERIENCE: 0,
  CASH: 1000,
  DIRTY_CASH: 0,
  BANK_BALANCE: 0,
  HEALTH: 100,
  MAX_HEALTH: 100,
  ENERGY: 100,
  MAX_ENERGY: 100,
  REPUTATION: 0,
  HEAT_LEVEL: 0,
  MENTAL_STATE: 100,
  STRESS: 0,
} as const;

// ========================================
// MENTAL STATE & STRESS
// ========================================
export const MENTAL_STATE = {
  MAX: 100,
  MIN: 0,
  WARNING_THRESHOLD: 50,
  CRITICAL_THRESHOLD: 30,
} as const;

export const STRESS = {
  MAX: 100,
  MIN: 0,
  BREAKDOWN_THRESHOLD: 100,
  WARNING_THRESHOLD: 60,
  CRITICAL_THRESHOLD: 80,
} as const;

// Stress effects
export const STRESS_EFFECTS = {
  MODERATE: { threshold: 60, efficiency: -0.1 },
  HIGH: { threshold: 80, efficiency: -0.25, mistakeChance: 0.1 },
  EXTREME: { threshold: 90, efficiency: -0.5, mistakeChance: 0.25 },
} as const;

// ========================================
// HEAT SYSTEM
// ========================================
export const MAX_HEAT_LEVEL = 5;

export const HEAT_EFFECTS = {
  LEVEL_1: { patrolIncrease: 0.2, randomStops: 0.1, arrestChance: 0.15 },
  LEVEL_2: { patrolIncrease: 0.4, randomStops: 0.2, arrestChance: 0.3, businessAudits: true },
  LEVEL_3: { patrolIncrease: 0.6, randomStops: 0.3, arrestChance: 0.45, businessAudits: true },
  LEVEL_4: { patrolIncrease: 0.8, randomStops: 0.4, arrestChance: 0.6, travelRestricted: true },
  LEVEL_5: { patrolIncrease: 1.0, randomStops: 0.5, arrestChance: 0.75, shootOnSight: true },
} as const;

// ========================================
// GANG SYSTEM
// ========================================
export const GANG_CREATION = {
  MIN_LEVEL: 15,
  COST: 50000,
  MIN_REPUTATION: 30,
  MAX_HEAT: 3,
} as const;

export const GANG_LIMITS = {
  MAX_MEMBERS: 20,
  MAX_BOSS: 1,
  MAX_UNDERBOSS: 1,
  MAX_CAPO: 3,
  MAX_SOLDIER: 7,
  MAX_MEMBER: 8,
} as const;

export const GANG_RANKS = {
  BOSS: { salary: 'custom', permissions: ['all'] },
  UNDERBOSS: { salaryPercent: 0.30, permissions: ['invite', 'promote_below', 'kick_below', 'manage_territories', 'start_drug_ops'] },
  CAPO: { salaryPercent: 0.15, permissions: ['invite', 'promote_members', 'kick_members', 'lead_heists'] },
  SOLDIER: { salaryPercent: 0.10, permissions: ['participate_wars', 'commit_crimes', 'recruit'] },
  MEMBER: { salaryPercent: 0.05, permissions: ['participate_wars', 'commit_crimes'] },
} as const;

// Territory mechanics
export const TERRITORY = {
  CLAIM_COST: 10000,
  CLAIM_DURATION_HOURS: 24,
  MIN_MEMBERS_TO_CLAIM: 5,
  CRIME_CONTROL_GAIN: 5, // % per crime
  FULL_CONTROL_THRESHOLD: 100,
} as const;

// Gang war
export const GANG_WAR = {
  MIN_MEMBERS: 5,
  MIN_REPUTATION: 30,
  ATTACKER_FUND: 25000,
  DEFENDER_FUND: 20000,
  SKIRMISH_DURATION_DAYS: 3,
  PREPARATION_HOURS: 24,
} as const;

// ========================================
// CRIME SYSTEM
// ========================================
export const CRIME_TIERS = {
  PETTY: { minLevel: 0, heatMultiplier: 0.5 },
  MINOR: { minLevel: 3, heatMultiplier: 1.0 },
  MODERATE: { minLevel: 5, heatMultiplier: 1.5 },
  SERIOUS: { minLevel: 12, heatMultiplier: 2.5 },
  MAJOR: { minLevel: 18, heatMultiplier: 3.5 },
  EXTREME: { minLevel: 25, heatMultiplier: 5.0 },
} as const;

// ========================================
// BUSINESS SYSTEM
// ========================================
export const BUSINESS_TYPES = {
  RESTAURANT: { minInvestment: 50000, taxMultiplier: 1.0 },
  CAR_WASH: { minInvestment: 30000, taxMultiplier: 0.8 },
  TECH_STARTUP: { minInvestment: 100000, taxMultiplier: 1.2 },
  CASINO: { minInvestment: 500000, taxMultiplier: 1.5 },
  NIGHTCLUB: { minInvestment: 150000, taxMultiplier: 1.1 },
  RETAIL: { minInvestment: 40000, taxMultiplier: 0.9 },
  WAREHOUSE: { minInvestment: 80000, taxMultiplier: 0.7 },
} as const;

// ========================================
// TRAVEL SYSTEM
// ========================================
export const TRAVEL = {
  PASSPORT_COST: 500,
  SAME_COUNTRY_COST: { min: 100, max: 500 },
  DIFFERENT_COUNTRY_COST: { min: 500, max: 2000 },
  ENERGY_COST: 10,
  PRIVATE_JET_COST: 10000,
  MAX_HEAT_FOR_TRAVEL: 4,
} as const;

// ========================================
// DEATH PENALTIES
// ========================================
export const DEATH_PENALTIES = {
  CASH_LOSS_PERCENT: 0.5,
  DIRTY_MONEY_LOSS_PERCENT: 1.0,
  RESPAWN_HEALTH_PERCENT: 0.5,
  REPUTATION_LOSS: 20,
  PROTECTION_PERIOD_HOURS: 24,
} as const;

// ========================================
// ITEM COSTS
// ========================================
export const ITEM_COSTS = {
  FOOD: 50,
  ENERGY_DRINK: 200,
  LOCKPICK: 50,
  MASK: 100,
  HACKING_DEVICE: 500,
  LAPTOP: 1000,
} as const;

// ========================================
// CALCULATION HELPERS
// ========================================

/**
 * Calculate XP required for next level
 * Formula: 100 * (level ^ 1.5)
 */
export function calculateXPRequired(level: number): number {
  return Math.floor(BASE_XP_REQUIREMENT * Math.pow(level, 1.5));
}

/**
 * Calculate max energy based on level
 */
export function calculateMaxEnergy(level: number): number {
  const bonuses = Math.floor(level / 5);
  return BASE_MAX_ENERGY + (bonuses * ENERGY_BONUS_PER_5_LEVELS);
}

/**
 * Calculate max health based on level
 */
export function calculateMaxHealth(level: number): number {
  const bonuses = Math.floor(level / 10);
  return BASE_MAX_HEALTH + (bonuses * HEALTH_BONUS_PER_10_LEVELS);
}

/**
 * Convert real-time minutes to game minutes
 */
export function realMinutesToGameMinutes(realMinutes: number): number {
  return realMinutes * GAME_SPEED_MULTIPLIER;
}

/**
 * Convert game hours to real-time seconds
 */
export function gameHoursToRealSeconds(gameHours: number): number {
  return gameHours * GAME_HOUR_IN_REAL_SECONDS;
}

/**
 * Calculate success rate with skill weights
 */
export function calculateSuccessRate(
  baseRate: number,
  skills: { skill: number; weight: number }[]
): number {
  const skillBonus = skills.reduce((acc, { skill, weight }) => {
    return acc + (skill * weight);
  }, 0);

  return Math.min(100, baseRate + skillBonus);
}

/**
 * Calculate stress effect on efficiency
 */
export function getStressEfficiency(stress: number): number {
  if (stress >= STRESS_EFFECTS.EXTREME.threshold) {
    return STRESS_EFFECTS.EXTREME.efficiency;
  }
  if (stress >= STRESS_EFFECTS.HIGH.threshold) {
    return STRESS_EFFECTS.HIGH.efficiency;
  }
  if (stress >= STRESS_EFFECTS.MODERATE.threshold) {
    return STRESS_EFFECTS.MODERATE.efficiency;
  }
  return 0;
}
