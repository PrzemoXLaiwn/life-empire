/**
 * Life Empire - Game Calculation Utilities
 *
 * All game mechanic calculations in one place
 */

import {
  GAME_SPEED_MULTIPLIER,
  BASE_XP_REQUIREMENT,
  BASE_MAX_ENERGY,
  BASE_MAX_HEALTH,
  ENERGY_BONUS_PER_5_LEVELS,
  HEALTH_BONUS_PER_10_LEVELS,
  STRESS_EFFECTS,
  HEAT_EFFECTS,
  MAX_HEAT_LEVEL,
} from '../constants/game';
import type { CharacterStats, SuccessCalculation } from '@/types';

// ========================================
// LEVELING CALCULATIONS
// ========================================

/**
 * Calculate XP required for next level
 * Formula: 100 * (level ^ 1.5)
 */
export function calculateXPRequired(level: number): number {
  return Math.floor(BASE_XP_REQUIREMENT * Math.pow(level, 1.5));
}

/**
 * Calculate level from total XP
 */
export function calculateLevelFromXP(xp: number): number {
  let level = 1;
  let totalXP = 0;

  while (totalXP <= xp) {
    totalXP += calculateXPRequired(level);
    level++;
  }

  return level - 1;
}

/**
 * Check if character should level up
 */
export function shouldLevelUp(currentXP: number, xpNeeded: number): boolean {
  return currentXP >= xpNeeded;
}

/**
 * Calculate level-up rewards
 */
export function calculateLevelUpRewards(newLevel: number) {
  const statPoints = 5;
  const cashBonus = newLevel * 1000;
  const maxEnergyIncrease = (newLevel % 5 === 0) ? 5 : 0;
  const maxHealthIncrease = (newLevel % 10 === 0) ? 10 : 0;

  const unlockedFeatures: string[] = [];
  if (newLevel === 3) unlockedFeatures.push('Can join gangs');
  if (newLevel === 5) unlockedFeatures.push('Can commit moderate crimes');
  if (newLevel === 10) unlockedFeatures.push('Can start businesses');
  if (newLevel === 15) unlockedFeatures.push('Can create gang');
  if (newLevel === 20) unlockedFeatures.push('Can participate in heists');
  if (newLevel === 25) unlockedFeatures.push('Can buy properties');
  if (newLevel === 30) unlockedFeatures.push('Can access stock market');
  if (newLevel === 50) unlockedFeatures.push('Can become gang boss');

  return {
    newLevel,
    statPoints,
    cashBonus,
    maxEnergyIncrease,
    maxHealthIncrease,
    unlockedFeatures,
  };
}

// ========================================
// ENERGY & HEALTH CALCULATIONS
// ========================================

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
 * Calculate energy regeneration
 * Returns energy to add based on minutes passed
 */
export function calculateEnergyRegen(minutesPassed: number): number {
  // 1 energy per minute real-time
  return Math.floor(minutesPassed);
}

/**
 * Calculate energy cost for activity
 */
export function calculateEnergyCost(
  baseEnergyCost: number,
  duration: number,
  stamina: number
): number {
  // Higher stamina reduces energy cost
  const staminaReduction = stamina / 100 * 0.2; // Max 20% reduction at 100 stamina
  const finalCost = baseEnergyCost * duration * (1 - staminaReduction);
  return Math.max(1, Math.floor(finalCost));
}

// ========================================
// TIME CALCULATIONS
// ========================================

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
  return (gameHours * 60 * 60) / GAME_SPEED_MULTIPLIER;
}

/**
 * Convert game hours to real-time minutes
 */
export function gameHoursToRealMinutes(gameHours: number): number {
  return (gameHours * 60) / GAME_SPEED_MULTIPLIER;
}

/**
 * Calculate time remaining in a readable format
 */
export function calculateTimeRemaining(endTime: Date): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
} {
  const now = new Date().getTime();
  const end = endTime.getTime();
  const diff = Math.max(0, end - now);

  return {
    total: diff,
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

// ========================================
// SUCCESS RATE CALCULATIONS
// ========================================

/**
 * Calculate success rate for crimes
 */
export function calculateCrimeSuccessRate(
  baseRate: number,
  characterStats: Partial<CharacterStats>,
  skillWeights: Record<string, number>,
  heatLevel: number,
  stress: number
): SuccessCalculation {
  // Calculate skill modifiers
  let skillModifiers = 0;
  Object.entries(skillWeights).forEach(([skill, weight]) => {
    const skillValue = (characterStats as any)[skill] || 0;
    skillModifiers += skillValue * weight;
  });

  // Attribute modifiers (general bonus)
  const attributeModifiers = 0; // Can be expanded based on specific attributes

  // Equipment modifiers (can be added later)
  const equipmentModifiers = 0;

  // Heat penalty
  const heatPenalty = -(heatLevel * 5); // -5% per heat star

  // Stress penalty
  const stressPenalty = stress >= STRESS_EFFECTS.EXTREME.threshold
    ? STRESS_EFFECTS.EXTREME.efficiency * 100
    : stress >= STRESS_EFFECTS.HIGH.threshold
    ? STRESS_EFFECTS.HIGH.efficiency * 100
    : stress >= STRESS_EFFECTS.MODERATE.threshold
    ? STRESS_EFFECTS.MODERATE.efficiency * 100
    : 0;

  // Calculate final rate
  const finalRate = Math.max(
    0,
    Math.min(
      100,
      baseRate + skillModifiers + attributeModifiers + equipmentModifiers + heatPenalty + stressPenalty
    )
  );

  return {
    baseRate,
    skillModifiers,
    attributeModifiers,
    equipmentModifiers,
    heatPenalty,
    stressPenalty,
    finalRate,
  };
}

/**
 * Determine if action succeeds based on success rate
 */
export function rollSuccess(successRate: number): boolean {
  const roll = Math.random() * 100;
  return roll <= successRate;
}

// ========================================
// REWARD CALCULATIONS
// ========================================

/**
 * Calculate crime reward
 */
export function calculateCrimeReward(
  minReward: number,
  maxReward: number,
  successRate: number,
  cityBonus: number
): number {
  // Higher success rate tends to give higher rewards within the range
  const range = maxReward - minReward;
  const successMultiplier = successRate / 100;
  const baseReward = minReward + (range * successMultiplier * (0.5 + Math.random() * 0.5));

  // Apply city bonus
  const finalReward = baseReward * (1 + cityBonus / 100);

  return Math.floor(finalReward);
}

/**
 * Calculate job pay
 */
export function calculateJobPay(
  hourlyRate: number,
  hoursWorked: number,
  managementSkill: number
): number {
  // Better management skill gives slight pay bonus
  const skillBonus = 1 + (managementSkill / 100 * 0.1); // Max 10% bonus
  return Math.floor(hourlyRate * hoursWorked * skillBonus);
}

// ========================================
// HEAT & POLICE CALCULATIONS
// ========================================

/**
 * Calculate arrest chance based on heat level
 */
export function calculateArrestChance(
  baseArrestChance: number,
  heatLevel: number,
  districtPolicePresence: number
): number {
  const clampedHeat = Math.min(MAX_HEAT_LEVEL, Math.max(0, heatLevel));
  const heatEffect = HEAT_EFFECTS[`LEVEL_${Math.floor(clampedHeat)}` as keyof typeof HEAT_EFFECTS];

  if (!heatEffect) return baseArrestChance;

  const heatModifier = heatEffect.arrestChance;
  const policeModifier = districtPolicePresence / 100;

  const finalChance = baseArrestChance * (1 + heatModifier) * (1 + policeModifier);

  return Math.min(1, finalChance);
}

/**
 * Calculate heat decay over time
 */
export function calculateHeatDecay(currentHeat: number, hoursPassed: number): number {
  // Heat decays by 0.1 per game hour if not committing crimes
  const decay = hoursPassed * 0.1;
  return Math.max(0, currentHeat - decay);
}

// ========================================
// STRESS & MENTAL STATE CALCULATIONS
// ========================================

/**
 * Calculate stress increase
 */
export function calculateStressIncrease(
  baseStress: number,
  heatLevel: number,
  businessCount: number,
  isGangLeader: boolean
): number {
  let stressIncrease = baseStress;

  // Heat adds stress
  stressIncrease += heatLevel * 5;

  // Multiple businesses add stress
  stressIncrease += businessCount * 2;

  // Gang leadership adds stress
  if (isGangLeader) {
    stressIncrease += 5;
  }

  return Math.min(100, stressIncrease);
}

/**
 * Calculate mental state change
 */
export function calculateMentalStateChange(
  stress: number,
  murdersCommitted: number,
  daysInJail: number
): number {
  let change = 0;

  // High stress decreases mental state
  if (stress > 80) {
    change -= 1;
  }

  // Murders decrease mental state
  change -= murdersCommitted * 5;

  // Jail time decreases mental state
  change -= daysInJail * 2;

  // Low stress increases mental state
  if (stress < 20) {
    change += 1;
  }

  return change;
}

/**
 * Get efficiency modifier based on stress and mental state
 */
export function getEfficiencyModifier(stress: number, mentalState: number): number {
  let modifier = 1.0;

  // Stress effects
  if (stress >= STRESS_EFFECTS.EXTREME.threshold) {
    modifier *= (1 + STRESS_EFFECTS.EXTREME.efficiency);
  } else if (stress >= STRESS_EFFECTS.HIGH.threshold) {
    modifier *= (1 + STRESS_EFFECTS.HIGH.efficiency);
  } else if (stress >= STRESS_EFFECTS.MODERATE.threshold) {
    modifier *= (1 + STRESS_EFFECTS.MODERATE.efficiency);
  }

  // Mental state effects
  if (mentalState < 50) {
    modifier *= 0.9; // -10% efficiency
  }
  if (mentalState < 30) {
    modifier *= 0.8; // -20% efficiency total
  }

  return modifier;
}

// ========================================
// BUSINESS CALCULATIONS
// ========================================

/**
 * Calculate business revenue
 */
export function calculateBusinessRevenue(
  baseRevenue: number,
  managementSkill: number,
  marketingSkill: number,
  marketScore: number
): number {
  const managementBonus = 1 + (managementSkill / 100 * 0.2); // Max 20% bonus
  const marketingBonus = 1 + (marketingSkill / 100 * 0.15); // Max 15% bonus
  const marketBonus = marketScore / 100;

  return Math.floor(baseRevenue * managementBonus * marketingBonus * marketBonus);
}

/**
 * Calculate business tax
 */
export function calculateBusinessTax(revenue: number, taxRate: number): number {
  return Math.floor(revenue * taxRate);
}

/**
 * Calculate business profit
 */
export function calculateBusinessProfit(
  revenue: number,
  expenses: number,
  taxRate: number
): number {
  const tax = calculateBusinessTax(revenue, taxRate);
  return revenue - expenses - tax;
}

// ========================================
// GANG CALCULATIONS
// ========================================

/**
 * Calculate gang war points
 */
export function calculateGangWarPoints(
  crimesCommitted: number,
  enemyKills: number,
  assetsDestroyed: number,
  defenseActions: number
): number {
  return (
    crimesCommitted * 10 +
    enemyKills * 50 +
    assetsDestroyed * 30 +
    defenseActions * 20
  );
}

/**
 * Calculate territory income
 */
export function calculateTerritoryIncome(
  districtWealth: number,
  controlPercentage: number,
  protectionMultiplier: number
): number {
  const baseIncome = districtWealth * protectionMultiplier;
  return Math.floor(baseIncome * (controlPercentage / 100));
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Clamp a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Calculate percentage
 */
export function calculatePercentage(current: number, max: number): number {
  return Math.floor((current / max) * 100);
}

/**
 * Format currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format large numbers
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

/**
 * Generate random number in range
 */
export function randomInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Calculate skill gain
 */
export function calculateSkillGain(
  currentSkill: number,
  baseGain: number,
  difficulty: number
): number {
  // Harder tasks give more skill gain, but diminishing returns at high skill
  const difficultyMultiplier = 1 + (difficulty / 100);
  const diminishingReturns = 1 - (currentSkill / 100 * 0.5); // Up to 50% reduction at max skill

  const gain = baseGain * difficultyMultiplier * diminishingReturns;

  return Math.max(1, Math.floor(gain));
}
