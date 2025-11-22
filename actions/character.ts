'use server';

/**
 * Character Management Server Actions
 *
 * All character-related operations including:
 * - Character creation
 * - Character updates
 * - Leveling up
 * - Energy/health management
 */

import { prisma } from '@/lib/prisma/client';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { STARTING_CHARACTER, calculateXPRequired, calculateMaxEnergy, calculateMaxHealth } from '@/lib/constants/game';
import type { CharacterCreationForm, ApiResponse } from '@/types';

// ========================================
// CHARACTER CREATION
// ========================================

export async function createCharacter(formData: CharacterCreationForm): Promise<ApiResponse> {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: 'Not authenticated' };
    }

    // Ensure user exists in Prisma database
    let prismaUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!prismaUser) {
      prismaUser = await prisma.user.create({
        data: {
          id: user.id,
          email: user.email || '',
        },
      });
    }

    // Validate input
    if (!formData.username || formData.username.length < 3 || formData.username.length > 20) {
      return { success: false, error: 'Username must be 3-20 characters' };
    }

    if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      return { success: false, error: 'Username can only contain letters, numbers, and underscores' };
    }

    // Check if user already has a character
    const existingCharacter = await prisma.character.findUnique({
      where: { userId: user.id },
    });

    if (existingCharacter) {
      return { success: false, error: 'You already have a character' };
    }

    // Check username uniqueness
    const usernameExists = await prisma.character.findUnique({
      where: { username: formData.username },
    });

    if (usernameExists) {
      return { success: false, error: 'Username already taken' };
    }

    // Validate city exists
    const city = await prisma.city.findUnique({
      where: { id: formData.cityId },
      include: { districts: true },
    });

    if (!city || city.districts.length === 0) {
      return { success: false, error: 'Invalid city selected' };
    }

    // Select a random starting district in the city
    const randomDistrict = city.districts[Math.floor(Math.random() * city.districts.length)];

    // Create character with starting values
    const character = await prisma.character.create({
      data: {
        userId: user.id,
        username: formData.username,
        avatar: formData.avatar || 'crown',

        // Level & XP
        level: STARTING_CHARACTER.LEVEL,
        experience: STARTING_CHARACTER.EXPERIENCE,
        xpNeeded: calculateXPRequired(STARTING_CHARACTER.LEVEL),

        // Finances
        cash: STARTING_CHARACTER.CASH,
        dirtyCash: STARTING_CHARACTER.DIRTY_CASH,
        bankBalance: STARTING_CHARACTER.BANK_BALANCE,

        // Health & Energy
        health: STARTING_CHARACTER.HEALTH,
        maxHealth: STARTING_CHARACTER.MAX_HEALTH,
        energy: STARTING_CHARACTER.ENERGY,
        maxEnergy: STARTING_CHARACTER.MAX_ENERGY,

        // Status
        reputation: STARTING_CHARACTER.REPUTATION,
        heatLevel: STARTING_CHARACTER.HEAT_LEVEL,
        mentalState: STARTING_CHARACTER.MENTAL_STATE,
        stress: STARTING_CHARACTER.STRESS,

        // Location
        cityId: city.id,
        districtId: randomDistrict.id,
      },
    });

    // Create initial activity log
    await prisma.activityLog.create({
      data: {
        characterId: character.id,
        action: 'CHARACTER_CREATED',
        details: {
          city: city.name,
          district: randomDistrict.name,
        },
      },
    });

    // Create welcome notification
    await prisma.notification.create({
      data: {
        characterId: character.id,
        type: 'info',
        title: 'Welcome to Life Empire!',
        message: `Welcome to ${city.name}, ${character.username}! Start your criminal empire in ${randomDistrict.name}.`,
      },
    });

    revalidatePath('/');

    return {
      success: true,
      data: character,
      message: 'Character created successfully!',
    };
  } catch (error) {
    console.error('Error creating character:', error);
    return {
      success: false,
      error: 'Failed to create character',
    };
  }
}

// ========================================
// CHARACTER RETRIEVAL
// ========================================

export async function getCurrentCharacter(): Promise<ApiResponse> {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: 'Not authenticated' };
    }

    const character = await prisma.character.findUnique({
      where: { userId: user.id },
      include: {
        city: true,
        district: true,
        currentJob: true,
        gang: true,
        gangMembership: true,
      },
    });

    if (!character) {
      return { success: false, error: 'Character not found' };
    }

    // Track daily login and update days played
    const now = new Date();
    const lastLogin = new Date(character.lastLoginDate);
    const hoursSinceLastLogin = (now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60);

    // If more than 24 hours since last login
    if (hoursSinceLastLogin >= 24) {
      const daysSinceLastLogin = Math.floor(hoursSinceLastLogin / 24);

      const updates: any = {
        daysPlayed: { increment: 1 },
        lastLoginDate: now,
      };

      // Update streak (reset if more than 1 day gap)
      if (daysSinceLastLogin === 1) {
        updates.loginStreak = { increment: 1 };
      } else if (daysSinceLastLogin > 1) {
        updates.loginStreak = 1; // Reset streak
      }

      // Apply updates
      await prisma.character.update({
        where: { id: character.id },
        data: updates,
      });
    }

    // Update energy based on time passed
    const updatedCharacter = await updateEnergyRegen(character.id);

    return {
      success: true,
      data: updatedCharacter || character,
    };
  } catch (error) {
    console.error('Error getting character:', error);
    return {
      success: false,
      error: 'Failed to get character',
    };
  }
}

// ========================================
// ENERGY REGENERATION
// ========================================

export async function updateEnergyRegen(characterId: string): Promise<any> {
  try {
    const character = await prisma.character.findUnique({
      where: { id: characterId },
    });

    if (!character) return null;

    // Calculate time passed in minutes
    const now = new Date();
    const lastUpdate = character.lastEnergyUpdate;
    const minutesPassed = Math.floor((now.getTime() - lastUpdate.getTime()) / (1000 * 60));

    if (minutesPassed < 1) {
      return character; // No update needed
    }

    // Calculate energy to regenerate (1 per minute)
    const energyToAdd = minutesPassed;
    const newEnergy = Math.min(character.maxEnergy, character.energy + energyToAdd);

    // Update character
    const updatedCharacter = await prisma.character.update({
      where: { id: characterId },
      data: {
        energy: newEnergy,
        lastEnergyUpdate: now,
      },
      include: {
        city: true,
        district: true,
        currentJob: true,
        gang: true,
        gangMembership: true,
      },
    });

    return updatedCharacter;
  } catch (error) {
    console.error('Error updating energy:', error);
    return null;
  }
}

// ========================================
// LEVEL UP SYSTEM
// ========================================

export async function checkAndProcessLevelUp(characterId: string): Promise<ApiResponse> {
  try {
    const character = await prisma.character.findUnique({
      where: { id: characterId },
    });

    if (!character) {
      return { success: false, error: 'Character not found' };
    }

    // Check if ready to level up
    if (character.experience < character.xpNeeded) {
      return { success: false, message: 'Not enough XP to level up' };
    }

    const newLevel = character.level + 1;
    const newXPNeeded = calculateXPRequired(newLevel);

    // Calculate bonuses
    const cashBonus = newLevel * 1000;
    const maxEnergyIncrease = (newLevel % 5 === 0) ? 5 : 0;
    const maxHealthIncrease = (newLevel % 10 === 0) ? 10 : 0;

    // Determine unlocked features
    const unlockedFeatures: string[] = [];
    if (newLevel === 3) unlockedFeatures.push('Can join gangs');
    if (newLevel === 5) unlockedFeatures.push('Can commit moderate crimes');
    if (newLevel === 10) unlockedFeatures.push('Can start businesses');
    if (newLevel === 15) unlockedFeatures.push('Can create gang');
    if (newLevel === 20) unlockedFeatures.push('Can participate in heists');
    if (newLevel === 25) unlockedFeatures.push('Can buy properties');
    if (newLevel === 30) unlockedFeatures.push('Can access stock market');
    if (newLevel === 50) unlockedFeatures.push('Can become gang boss');

    // Update character
    const updatedCharacter = await prisma.character.update({
      where: { id: characterId },
      data: {
        level: newLevel,
        experience: character.experience - character.xpNeeded, // Carry over excess XP
        xpNeeded: newXPNeeded,
        cash: character.cash + cashBonus,
        maxEnergy: character.maxEnergy + maxEnergyIncrease,
        maxHealth: character.maxHealth + maxHealthIncrease,
        energy: character.maxEnergy + maxEnergyIncrease, // Restore to new max
        health: character.maxHealth + maxHealthIncrease, // Restore to new max
      },
    });

    // Create notification
    await prisma.notification.create({
      data: {
        characterId: character.id,
        type: 'levelup',
        title: `Level Up! You're now level ${newLevel}!`,
        message: `You earned $${cashBonus.toLocaleString()} and gained 5 stat points to distribute!${
          unlockedFeatures.length > 0 ? `\n\nUnlocked: ${unlockedFeatures.join(', ')}` : ''
        }`,
      },
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        characterId: character.id,
        action: 'LEVEL_UP',
        details: {
          oldLevel: character.level,
          newLevel,
          cashBonus,
          unlockedFeatures,
        },
      },
    });

    revalidatePath('/');

    return {
      success: true,
      data: {
        character: updatedCharacter,
        levelUp: {
          newLevel,
          cashBonus,
          maxEnergyIncrease,
          maxHealthIncrease,
          unlockedFeatures,
          statPoints: 5,
        },
      },
      message: `Congratulations! You reached level ${newLevel}!`,
    };
  } catch (error) {
    console.error('Error processing level up:', error);
    return {
      success: false,
      error: 'Failed to process level up',
    };
  }
}

// ========================================
// DISTRIBUTE STAT POINTS
// ========================================

export async function distributeStatPoints(
  characterId: string,
  stats: {
    strength?: number;
    intelligence?: number;
    charisma?: number;
    stamina?: number;
  }
): Promise<ApiResponse> {
  try {
    const character = await prisma.character.findUnique({
      where: { id: characterId },
    });

    if (!character) {
      return { success: false, error: 'Character not found' };
    }

    // Calculate total points being spent
    const totalPoints = (stats.strength || 0) + (stats.intelligence || 0) +
                        (stats.charisma || 0) + (stats.stamina || 0);

    if (totalPoints > 5) {
      return { success: false, error: 'Cannot spend more than 5 points at once' };
    }

    // Validate stat caps (max 100)
    const newStrength = character.strength + (stats.strength || 0);
    const newIntelligence = character.intelligence + (stats.intelligence || 0);
    const newCharisma = character.charisma + (stats.charisma || 0);
    const newStamina = character.stamina + (stats.stamina || 0);

    if (newStrength > 100 || newIntelligence > 100 || newCharisma > 100 || newStamina > 100) {
      return { success: false, error: 'Stats cannot exceed 100' };
    }

    // Update character stats
    const updatedCharacter = await prisma.character.update({
      where: { id: characterId },
      data: {
        strength: newStrength,
        intelligence: newIntelligence,
        charisma: newCharisma,
        stamina: newStamina,
      },
    });

    revalidatePath('/');

    return {
      success: true,
      data: updatedCharacter,
      message: 'Stat points distributed successfully!',
    };
  } catch (error) {
    console.error('Error distributing stat points:', error);
    return {
      success: false,
      error: 'Failed to distribute stat points',
    };
  }
}

// ========================================
// UPDATE CHARACTER LOCATION
// ========================================

export async function updateCharacterLocation(
  characterId: string,
  cityId: string,
  districtId?: string
): Promise<ApiResponse> {
  try {
    const character = await prisma.character.findUnique({
      where: { id: characterId },
    });

    if (!character) {
      return { success: false, error: 'Character not found' };
    }

    // Validate city
    const city = await prisma.city.findUnique({
      where: { id: cityId },
      include: { districts: true },
    });

    if (!city) {
      return { success: false, error: 'City not found' };
    }

    // If no district specified, pick random one
    let targetDistrictId = districtId;
    if (!targetDistrictId) {
      const randomDistrict = city.districts[Math.floor(Math.random() * city.districts.length)];
      targetDistrictId = randomDistrict.id;
    }

    // Validate district
    const district = await prisma.district.findUnique({
      where: { id: targetDistrictId },
    });

    if (!district || district.cityId !== cityId) {
      return { success: false, error: 'Invalid district' };
    }

    // Update location
    const updatedCharacter = await prisma.character.update({
      where: { id: characterId },
      data: {
        cityId,
        districtId: targetDistrictId,
      },
      include: {
        city: true,
        district: true,
      },
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        characterId: character.id,
        action: 'LOCATION_CHANGE',
        details: {
          fromCity: character.cityId,
          toCity: cityId,
          toDistrict: district.name,
        },
      },
    });

    revalidatePath('/');

    return {
      success: true,
      data: updatedCharacter,
      message: `Traveled to ${city.name}, ${district.name}`,
    };
  } catch (error) {
    console.error('Error updating location:', error);
    return {
      success: false,
      error: 'Failed to update location',
    };
  }
}

// ========================================
// HEALTH MANAGEMENT
// ========================================

export async function updateHealth(
  characterId: string,
  amount: number,
  reason?: string
): Promise<ApiResponse> {
  try {
    const character = await prisma.character.findUnique({
      where: { id: characterId },
    });

    if (!character) {
      return { success: false, error: 'Character not found' };
    }

    const newHealth = Math.max(0, Math.min(character.maxHealth, character.health + amount));
    const isDead = newHealth === 0;

    // Update health
    const updatedCharacter = await prisma.character.update({
      where: { id: characterId },
      data: {
        health: newHealth,
        isDead,
        deathCount: isDead ? character.deathCount + 1 : character.deathCount,
      },
    });

    // Handle death
    if (isDead) {
      // Death penalties
      const cashLoss = Math.floor(character.cash * 0.5);
      const dirtyCashLoss = character.dirtyCash;

      await prisma.character.update({
        where: { id: characterId },
        data: {
          cash: character.cash - cashLoss,
          dirtyCash: 0,
          health: Math.floor(character.maxHealth * 0.5),
          isDead: false,
          reputation: Math.max(0, character.reputation - 20),
        },
      });

      // Create death notification
      await prisma.notification.create({
        data: {
          characterId: character.id,
          type: 'error',
          title: 'You Died!',
          message: `You lost $${cashLoss.toLocaleString()} and all your dirty money ($${dirtyCashLoss.toLocaleString()}). Respawned at hospital.`,
        },
      });
    }

    revalidatePath('/');

    return {
      success: true,
      data: updatedCharacter,
      message: amount > 0 ? `Restored ${amount} health` : `Lost ${Math.abs(amount)} health`,
    };
  } catch (error) {
    console.error('Error updating health:', error);
    return {
      success: false,
      error: 'Failed to update health',
    };
  }
}

// ========================================
// GET CHARACTER STATS
// ========================================

export async function getCharacterStats(characterId: string): Promise<ApiResponse> {
  try {
    const character = await prisma.character.findUnique({
      where: { id: characterId },
      include: {
        city: true,
        district: true,
        currentJob: true,
        gang: {
          include: {
            gangMembers: true,
            territories: {
              include: {
                district: true,
              },
            },
          },
        },
        businesses: true,
        vehicles: true,
        properties: true,
        weapons: true,
      },
    });

    if (!character) {
      return { success: false, error: 'Character not found' };
    }

    // Calculate total net worth
    const netWorth =
      character.cash +
      character.bankBalance +
      character.businesses.reduce((sum, b) => sum + b.investmentCost, 0) +
      character.vehicles.reduce((sum, v) => sum + v.purchasePrice, 0) +
      character.properties.reduce((sum, p) => sum + p.purchasePrice, 0);

    return {
      success: true,
      data: {
        character,
        stats: {
          netWorth,
          totalBusinesses: character.businesses.length,
          totalVehicles: character.vehicles.length,
          totalProperties: character.properties.length,
          totalWeapons: character.weapons.length,
          gangTerritoriesControlled: character.gang?.territories.length || 0,
        },
      },
    };
  } catch (error) {
    console.error('Error getting character stats:', error);
    return {
      success: false,
      error: 'Failed to get character stats',
    };
  }
}
