'use server';

/**
 * Crime System Server Actions
 *
 * Complete crime mechanics including:
 * - Crime execution with success/failure
 * - Heat system and police response
 * - Arrests and jail time
 * - Skill-based success rates
 * - Crew crimes (multiplayer)
 */

import { prisma } from '@/lib/prisma/client';
import { revalidatePath } from 'next/cache';
import {
  calculateCrimeSuccessRate,
  rollSuccess,
  calculateCrimeReward,
  calculateArrestChance,
  randomInRange,
  calculateSkillGain,
} from '@/lib/utils/calculations';
import { checkAndProcessLevelUp, updateHealth } from './character';
import type { ApiResponse, CrimeResult } from '@/types';

// ========================================
// GET AVAILABLE CRIMES
// ========================================

export async function getAvailableCrimes(characterId: string): Promise<ApiResponse> {
  try {
    const character = await prisma.character.findUnique({
      where: { id: characterId },
      include: {
        city: true,
        district: true,
      },
    });

    if (!character) {
      return { success: false, error: 'Character not found' };
    }

    // Get all crimes the character qualifies for
    const allCrimes = await prisma.crime.findMany({
      where: {
        requiredLevel: {
          lte: character.level,
        },
      },
      orderBy: [
        { tier: 'asc' },
        { requiredLevel: 'asc' },
      ],
    });

    // Filter by skill requirements
    const availableCrimes = allCrimes.filter((crime) => {
      const requiredSkills = crime.requiredSkills as Record<string, number>;

      if (!requiredSkills || Object.keys(requiredSkills).length === 0) {
        return true;
      }

      return Object.entries(requiredSkills).every(([skill, required]) => {
        const characterSkill = (character as any)[skill] || 0;
        return characterSkill >= required;
      });
    });

    return {
      success: true,
      data: {
        available: availableCrimes,
        cityBonus: character.city?.crimeBonus || 0,
        districtDanger: character.district?.dangerLevel || 50,
        currentHeat: character.heatLevel,
      },
    };
  } catch (error) {
    console.error('Error getting available crimes:', error);
    return {
      success: false,
      error: 'Failed to get available crimes',
    };
  }
}

// ========================================
// COMMIT CRIME
// ========================================

export async function commitCrime(
  characterId: string,
  crimeId: string
): Promise<ApiResponse<CrimeResult>> {
  try {
    const character = await prisma.character.findUnique({
      where: { id: characterId },
      include: {
        city: true,
        district: true,
      },
    });

    if (!character) {
      return { success: false, error: 'Character not found' };
    }

    const crime = await prisma.crime.findUnique({
      where: { id: crimeId },
    });

    if (!crime) {
      return { success: false, error: 'Crime not found' };
    }

    // Validate character can commit this crime
    if (character.level < crime.requiredLevel) {
      return {
        success: false,
        error: `You need to be level ${crime.requiredLevel} to commit this crime`,
      };
    }

    // Check energy
    if (character.energy < crime.energyCost) {
      return {
        success: false,
        error: `Not enough energy. Need ${crime.energyCost}, have ${character.energy}`,
      };
    }

    // Check if in jail
    if (character.inJail) {
      return {
        success: false,
        error: 'You cannot commit crimes while in jail',
      };
    }

    // Check if dead
    if (character.isDead) {
      return {
        success: false,
        error: 'You are dead. Respawn first',
      };
    }

    // Check skill requirements
    const requiredSkills = crime.requiredSkills as Record<string, number>;
    if (requiredSkills && Object.keys(requiredSkills).length > 0) {
      const missingSkills: string[] = [];

      Object.entries(requiredSkills).forEach(([skill, required]) => {
        const characterSkill = (character as any)[skill] || 0;
        if (characterSkill < required) {
          missingSkills.push(`${skill}: ${characterSkill}/${required}`);
        }
      });

      if (missingSkills.length > 0) {
        return {
          success: false,
          error: `Missing skill requirements: ${missingSkills.join(', ')}`,
        };
      }
    }

    // Calculate success rate
    const skillWeight = crime.skillWeight as Record<string, number>;
    const successCalculation = calculateCrimeSuccessRate(
      crime.baseSuccessRate,
      {
        stealth: character.stealth,
        lockpicking: character.lockpicking,
        hacking: character.hacking,
        shooting: character.shooting,
        driving: character.driving,
        charisma: character.charisma,
        strength: character.strength,
        intelligence: character.intelligence,
      },
      skillWeight,
      character.heatLevel,
      character.stress
    );

    // Roll for success
    const success = rollSuccess(successCalculation.finalRate);

    // Calculate rewards/penalties
    let reward = 0;
    let experienceGained = crime.experienceReward;
    let heatGained = success ? crime.heatGain : crime.heatOnFail;
    let arrested = false;
    let injured = false;
    let healthLost = 0;

    if (success) {
      // Successful crime
      reward = calculateCrimeReward(
        crime.minReward,
        crime.maxReward,
        successCalculation.finalRate,
        character.city?.crimeBonus || 0
      );

      // Bonus XP for high difficulty
      if (successCalculation.finalRate < 50) {
        experienceGained = Math.floor(experienceGained * 1.5);
      }
    } else {
      // Failed crime - check for arrest
      const districtPolicePresence = character.district?.policePresence || 50;
      const arrestChance = calculateArrestChance(
        crime.arrestChance,
        character.heatLevel,
        districtPolicePresence
      );

      arrested = Math.random() < arrestChance;

      // Check for injury
      if (crime.injuryChance > 0) {
        injured = Math.random() < crime.injuryChance;
        if (injured) {
          healthLost = randomInRange(10, 50);
        }
      }

      // Reduce XP on failure
      experienceGained = Math.floor(experienceGained * 0.3);
    }

    // Calculate skill gains
    const skillGains: Record<string, number> = {};
    if (skillWeight && Object.keys(skillWeight).length > 0) {
      Object.keys(skillWeight).forEach((skill) => {
        const currentSkill = (character as any)[skill] || 0;
        const gain = calculateSkillGain(
          currentSkill,
          success ? 2 : 1, // More gain on success
          crime.tier === 'EXTREME' ? 100 : crime.tier === 'MAJOR' ? 80 : 50
        );
        skillGains[skill] = Math.min(100, currentSkill + gain);
      });
    }

    // Update character
    const newHeat = Math.min(5, character.heatLevel + heatGained);
    const newStress = Math.min(100, character.stress + (success ? 5 : 15));

    const updates: any = {
      energy: character.energy - crime.energyCost,
      heatLevel: newHeat,
      stress: newStress,
      experience: character.experience + experienceGained,
      ...skillGains,
    };

    if (success) {
      updates.dirtyCash = character.dirtyCash + reward;
    }

    // Handle injury
    if (injured) {
      updates.health = Math.max(0, character.health - healthLost);
    }

    // Handle arrest
    if (arrested) {
      const jailDays = Math.floor(crime.tier === 'EXTREME' ? 7 : crime.tier === 'MAJOR' ? 5 : crime.tier === 'SERIOUS' ? 3 : 1);
      const jailMinutes = jailDays * 24 * 60 / 10; // Game days to real minutes with 10x speed
      const releaseAt = new Date(Date.now() + jailMinutes * 60 * 1000);

      updates.inJail = true;
      updates.jailReleaseAt = releaseAt;

      // Create arrest record
      await prisma.arrest.create({
        data: {
          characterId: character.id,
          crimeType: crime.name,
          evidence: Math.floor(Math.random() * 100),
          sentenceDays: jailDays,
          bail: crime.tier === 'EXTREME' ? 100000 : crime.tier === 'MAJOR' ? 50000 : 10000,
          arrestedAt: new Date(),
          releaseAt,
        },
      });
    }

    const updatedCharacter = await prisma.character.update({
      where: { id: characterId },
      data: updates,
    });

    // Create crime history
    await prisma.crimeHistory.create({
      data: {
        characterId: character.id,
        crimeId: crime.id,
        success,
        reward,
        experienceGained,
        heatGained,
        arrested,
        injured,
        healthLost,
      },
    });

    // Create transaction if successful
    if (success && reward > 0) {
      await prisma.transaction.create({
        data: {
          characterId: character.id,
          type: 'CRIME_REWARD',
          amount: reward,
          isDirtyMoney: true,
          source: crime.name,
        },
      });
    }

    // Log activity
    await prisma.activityLog.create({
      data: {
        characterId: character.id,
        action: success ? 'CRIME_SUCCESS' : 'CRIME_FAILED',
        details: {
          crimeName: crime.name,
          reward,
          experienceGained,
          arrested,
          injured,
          healthLost,
        },
      },
    });

    // Create notification
    let notificationMessage = '';
    if (success) {
      notificationMessage = `Successfully committed ${crime.name}! Earned $${reward.toLocaleString()} (dirty money) and ${experienceGained} XP.`;
    } else if (arrested) {
      notificationMessage = `Failed ${crime.name} and got arrested! Sentenced to ${Math.floor((updates.jailReleaseAt.getTime() - Date.now()) / 60000)} minutes in jail.`;
    } else if (injured) {
      notificationMessage = `Failed ${crime.name} and got injured! Lost ${healthLost} health.`;
    } else {
      notificationMessage = `Failed ${crime.name}. Better luck next time.`;
    }

    await prisma.notification.create({
      data: {
        characterId: character.id,
        type: success ? 'success' : 'error',
        title: success ? 'Crime Successful!' : 'Crime Failed!',
        message: notificationMessage,
      },
    });

    // Check for level up
    const levelUpResult = await checkAndProcessLevelUp(characterId);

    // Handle death from injury
    if (injured && updates.health === 0) {
      await updateHealth(characterId, 0, 'Died from crime injury');
    }

    revalidatePath('/');

    const result: CrimeResult = {
      success,
      reward,
      experienceGained,
      heatGained,
      arrested,
      injured,
      healthLost,
      message: notificationMessage,
    };

    return {
      success: true,
      data: result,
      message: notificationMessage,
    };
  } catch (error) {
    console.error('Error committing crime:', error);
    return {
      success: false,
      error: 'Failed to commit crime',
    };
  }
}

// ========================================
// REDUCE HEAT
// ========================================

export async function reduceHeat(
  characterId: string,
  method: 'bribe' | 'lay_low' | 'lawyer'
): Promise<ApiResponse> {
  try {
    const character = await prisma.character.findUnique({
      where: { id: characterId },
    });

    if (!character) {
      return { success: false, error: 'Character not found' };
    }

    if (character.heatLevel === 0) {
      return { success: false, error: 'You have no heat' };
    }

    let cost = 0;
    let heatReduction = 0;

    switch (method) {
      case 'bribe':
        cost = Math.floor(character.heatLevel * 10000);
        heatReduction = Math.min(character.heatLevel, 1.0);
        break;
      case 'lay_low':
        // Free but takes time (24 hours game time = 144 minutes real-time)
        cost = 0;
        heatReduction = 0.5;
        break;
      case 'lawyer':
        cost = 50000;
        heatReduction = Math.min(character.heatLevel, 2.0);
        break;
    }

    if (character.cash < cost) {
      return {
        success: false,
        error: `Not enough money. Need $${cost.toLocaleString()}, have $${character.cash.toLocaleString()}`,
      };
    }

    // Update character
    await prisma.character.update({
      where: { id: characterId },
      data: {
        cash: character.cash - cost,
        heatLevel: Math.max(0, character.heatLevel - heatReduction),
      },
    });

    // Create transaction
    if (cost > 0) {
      await prisma.transaction.create({
        data: {
          characterId: character.id,
          type: 'EXPENSE',
          amount: cost,
          isDirtyMoney: false,
          source: `Heat reduction (${method})`,
        },
      });
    }

    revalidatePath('/');

    return {
      success: true,
      message: `Reduced heat by ${heatReduction.toFixed(1)}⭐${cost > 0 ? ` for $${cost.toLocaleString()}` : ''}`,
    };
  } catch (error) {
    console.error('Error reducing heat:', error);
    return {
      success: false,
      error: 'Failed to reduce heat',
    };
  }
}

// ========================================
// PAY BAIL
// ========================================

export async function payBail(characterId: string, arrestId: string): Promise<ApiResponse> {
  try {
    const character = await prisma.character.findUnique({
      where: { id: characterId },
    });

    if (!character) {
      return { success: false, error: 'Character not found' };
    }

    const arrest = await prisma.arrest.findUnique({
      where: { id: arrestId },
    });

    if (!arrest) {
      return { success: false, error: 'Arrest record not found' };
    }

    if (arrest.characterId !== characterId) {
      return { success: false, error: 'This arrest doesn\'t belong to you' };
    }

    if (arrest.released) {
      return { success: false, error: 'Already released' };
    }

    if (character.cash < arrest.bail) {
      return {
        success: false,
        error: `Not enough money for bail. Need $${arrest.bail.toLocaleString()}, have $${character.cash.toLocaleString()}`,
      };
    }

    // Pay bail and release
    await prisma.character.update({
      where: { id: characterId },
      data: {
        cash: character.cash - arrest.bail,
        inJail: false,
        jailReleaseAt: null,
      },
    });

    await prisma.arrest.update({
      where: { id: arrestId },
      data: {
        released: true,
        releaseAt: new Date(),
      },
    });

    // Create transaction
    await prisma.transaction.create({
      data: {
        characterId: character.id,
        type: 'EXPENSE',
        amount: arrest.bail,
        isDirtyMoney: false,
        source: 'Bail payment',
      },
    });

    revalidatePath('/');

    return {
      success: true,
      message: `Paid $${arrest.bail.toLocaleString()} bail and released from jail`,
    };
  } catch (error) {
    console.error('Error paying bail:', error);
    return {
      success: false,
      error: 'Failed to pay bail',
    };
  }
}

// ========================================
// CHECK JAIL STATUS
// ========================================

export async function checkJailStatus(characterId: string): Promise<ApiResponse> {
  try {
    const character = await prisma.character.findUnique({
      where: { id: characterId },
    });

    if (!character) {
      return { success: false, error: 'Character not found' };
    }

    if (!character.inJail) {
      return {
        success: true,
        data: { inJail: false },
      };
    }

    // Check if sentence is complete
    if (character.jailReleaseAt && new Date() >= character.jailReleaseAt) {
      // Auto-release
      await prisma.character.update({
        where: { id: characterId },
        data: {
          inJail: false,
          jailReleaseAt: null,
        },
      });

      return {
        success: true,
        data: { inJail: false, autoReleased: true },
        message: 'You have been released from jail!',
      };
    }

    // Get current arrest
    const currentArrest = await prisma.arrest.findFirst({
      where: {
        characterId,
        released: false,
      },
      orderBy: {
        arrestedAt: 'desc',
      },
    });

    const timeRemaining = character.jailReleaseAt
      ? character.jailReleaseAt.getTime() - Date.now()
      : 0;

    return {
      success: true,
      data: {
        inJail: true,
        releaseAt: character.jailReleaseAt,
        timeRemaining,
        arrest: currentArrest,
        canPayBail: currentArrest ? character.cash >= currentArrest.bail : false,
      },
    };
  } catch (error) {
    console.error('Error checking jail status:', error);
    return {
      success: false,
      error: 'Failed to check jail status',
    };
  }
}

// ========================================
// GET CRIME HISTORY
// ========================================

export async function getCrimeHistory(
  characterId: string,
  limit: number = 10
): Promise<ApiResponse> {
  try {
    const history = await prisma.crimeHistory.findMany({
      where: {
        characterId,
      },
      include: {
        crime: true,
      },
      orderBy: {
        committedAt: 'desc',
      },
      take: limit,
    });

    // Calculate totals
    const totals = {
      totalCrimes: history.length,
      successfulCrimes: history.filter((h) => h.success).length,
      totalEarnings: history.reduce((sum, h) => sum + h.reward, 0),
      totalXP: history.reduce((sum, h) => sum + h.experienceGained, 0),
      timesArrested: history.filter((h) => h.arrested).length,
      timesInjured: history.filter((h) => h.injured).length,
    };

    return {
      success: true,
      data: {
        history,
        totals,
      },
    };
  } catch (error) {
    console.error('Error getting crime history:', error);
    return {
      success: false,
      error: 'Failed to get crime history',
    };
  }
}
