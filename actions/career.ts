'use server';

/**
 * Career Server Actions
 * Performance reviews, coworkers, side hustles, benefits
 */

import { prisma } from '@/lib/prisma/client';
import { revalidatePath } from 'next/cache';
import type { ApiResponse } from '@/types';

// ========================================
// PERFORMANCE REVIEWS
// ========================================

export async function getPerformanceReviews(characterId: string): Promise<ApiResponse> {
  try {
    const reviews = await prisma.performanceReview.findMany({
      where: { characterId },
      include: {
        job: {
          select: { title: true }
        }
      },
      orderBy: { reviewDate: 'desc' }
    });

    return {
      success: true,
      data: { reviews }
    };
  } catch (error) {
    console.error('Error fetching performance reviews:', error);
    return { success: false, error: 'Failed to fetch reviews' };
  }
}

// ========================================
// WORK RELATIONSHIPS
// ========================================

export async function getWorkRelationships(characterId: string): Promise<ApiResponse> {
  try {
    const coworkers = await prisma.workRelationship.findMany({
      where: {
        characterId,
        isActive: true
      },
      orderBy: [
        { role: 'asc' },
        { relationshipScore: 'desc' }
      ]
    });

    return {
      success: true,
      data: { coworkers }
    };
  } catch (error) {
    console.error('Error fetching work relationships:', error);
    return { success: false, error: 'Failed to fetch coworkers' };
  }
}

export async function interactWithCoworker(
  characterId: string,
  coworkerId: string,
  interactionType: 'chat' | 'help' | 'mentor' | 'network'
): Promise<ApiResponse> {
  try {
    const character = await prisma.character.findUnique({
      where: { id: characterId }
    });

    const coworker = await prisma.workRelationship.findUnique({
      where: { id: coworkerId }
    });

    if (!character || !coworker) {
      return { success: false, error: 'Character or coworker not found' };
    }

    // Energy cost for interactions
    const energyCost = 5;
    if (character.energy < energyCost) {
      return { success: false, error: 'Not enough energy!' };
    }

    let relationshipChange = 0;
    let message = '';
    let bonuses: any = {};

    switch (interactionType) {
      case 'chat':
        // Random relationship change based on helpfulness
        relationshipChange = Math.floor(Math.random() * (coworker.helpfulness / 20)) + 1;
        message = `Had a nice chat with ${coworker.name}. Relationship improved!`;
        bonuses.experience = 5;
        break;

      case 'help':
        // Ask for help - better if they're helpful
        if (coworker.helpfulness > 50) {
          relationshipChange = Math.floor(Math.random() * 3) + 1;
          bonuses.experience = 15;
          bonuses.intelligence = 1;
          message = `${coworker.name} helped you out! Learned something new.`;
        } else {
          relationshipChange = -2;
          message = `${coworker.name} wasn't very helpful...`;
        }
        break;

      case 'mentor':
        if (!coworker.canMentor) {
          return { success: false, error: 'This person cannot mentor you' };
        }
        relationshipChange = 3;
        const skills = ['communication', 'leadership', 'creativity', 'timeManagement'];
        const randomSkill = skills[Math.floor(Math.random() * skills.length)];
        bonuses[randomSkill] = Math.floor(Math.random() * 3) + 2;
        bonuses.experience = 25;
        message = `${coworker.name} mentored you! +${bonuses[randomSkill]} ${randomSkill}`;
        break;

      case 'network':
        if (!coworker.canNetwork) {
          return { success: false, error: 'This person cannot help with networking' };
        }
        relationshipChange = 2;
        bonuses.reputation = Math.floor(coworker.influence / 10);
        bonuses.experience = 20;
        message = `${coworker.name} introduced you to their network! +${bonuses.reputation} reputation`;
        break;
    }

    // Update coworker relationship
    await prisma.workRelationship.update({
      where: { id: coworkerId },
      data: {
        relationshipScore: { increment: relationshipChange },
        totalInteractions: { increment: 1 },
        lastInteraction: new Date()
      }
    });

    // Update character
    const updates: any = {
      energy: { decrement: energyCost }
    };
    if (bonuses.experience) updates.experience = { increment: bonuses.experience };
    if (bonuses.intelligence) updates.intelligence = { increment: bonuses.intelligence };
    if (bonuses.reputation) updates.reputation = { increment: bonuses.reputation };
    if (bonuses.communication) updates.communication = { increment: bonuses.communication };
    if (bonuses.leadership) updates.leadership = { increment: bonuses.leadership };
    if (bonuses.creativity) updates.creativity = { increment: bonuses.creativity };
    if (bonuses.timeManagement) updates.timeManagement = { increment: bonuses.timeManagement };

    await prisma.character.update({
      where: { id: characterId },
      data: updates
    });

    revalidatePath('/dashboard/career/coworkers');

    return {
      success: true,
      message,
      data: { relationshipChange, bonuses }
    };
  } catch (error) {
    console.error('Error interacting with coworker:', error);
    return { success: false, error: 'Interaction failed' };
  }
}

// ========================================
// SIDE HUSTLES
// ========================================

export async function getAvailableSideHustles(characterId: string): Promise<ApiResponse> {
  try {
    // For now, return hardcoded hustles
    // In production, these would come from database
    const hustles = [
      {
        id: 'freelance-web',
        name: 'Freelance Web Design',
        type: 'Freelance',
        description: 'Build websites for small businesses',
        requiredSkill: 'creativity',
        requiredSkillLevel: 20,
        setupCost: 500,
        minEarnings: 200,
        maxEarnings: 1000,
        isPassive: false,
        passiveIncomeRate: 0,
        energyCost: 20,
        timeRequirement: 4,
        successRate: 70,
        isActive: true
      },
      {
        id: 'uber-driver',
        name: 'Rideshare Driver',
        type: 'Gig',
        description: 'Drive people around for extra cash',
        requiredSkill: 'driving',
        requiredSkillLevel: 30,
        setupCost: 0,
        minEarnings: 50,
        maxEarnings: 200,
        isPassive: false,
        passiveIncomeRate: 0,
        energyCost: 15,
        timeRequirement: 2,
        successRate: 90,
        isActive: true
      },
      {
        id: 'stock-trading',
        name: 'Stock Trading',
        type: 'Investment',
        description: 'Invest in stocks for long-term gains',
        requiredSkill: 'intelligence',
        requiredSkillLevel: 40,
        setupCost: 2000,
        minEarnings: 0,
        maxEarnings: 500,
        isPassive: true,
        passiveIncomeRate: 50,
        energyCost: 10,
        timeRequirement: 1,
        successRate: 60,
        isActive: true
      },
      {
        id: 'youtube-channel',
        name: 'YouTube Channel',
        type: 'Passive',
        description: 'Create content and earn ad revenue',
        requiredSkill: 'creativity',
        requiredSkillLevel: 30,
        setupCost: 1000,
        minEarnings: 100,
        maxEarnings: 500,
        isPassive: true,
        passiveIncomeRate: 75,
        energyCost: 25,
        timeRequirement: 3,
        successRate: 50,
        isActive: true
      }
    ];

    return {
      success: true,
      data: { hustles }
    };
  } catch (error) {
    console.error('Error fetching side hustles:', error);
    return { success: false, error: 'Failed to fetch side hustles' };
  }
}

export async function getMySideHustles(characterId: string): Promise<ApiResponse> {
  try {
    const hustles = await prisma.sideHustle.findMany({
      where: {
        characterId,
        isActive: true
      },
      orderBy: { startedAt: 'desc' }
    });

    return {
      success: true,
      data: { hustles }
    };
  } catch (error) {
    console.error('Error fetching my side hustles:', error);
    return { success: false, error: 'Failed to fetch your hustles' };
  }
}

export async function startSideHustle(characterId: string, hustleId: string): Promise<ApiResponse> {
  try {
    // This is a simplified version - in production you'd fetch from DB
    const availableHustles = [
      { id: 'freelance-web', name: 'Freelance Web Design', setupCost: 500, minEarnings: 200, maxEarnings: 1000, type: 'Freelance', description: 'Build websites', energyCost: 20, timeRequirement: 4, successRate: 70, isPassive: false, passiveIncomeRate: 0, requiredSkill: 'creativity', requiredSkillLevel: 20 },
      { id: 'uber-driver', name: 'Rideshare Driver', setupCost: 0, minEarnings: 50, maxEarnings: 200, type: 'Gig', description: 'Drive people', energyCost: 15, timeRequirement: 2, successRate: 90, isPassive: false, passiveIncomeRate: 0, requiredSkill: 'driving', requiredSkillLevel: 30 },
      { id: 'stock-trading', name: 'Stock Trading', setupCost: 2000, minEarnings: 0, maxEarnings: 500, type: 'Investment', description: 'Invest in stocks', energyCost: 10, timeRequirement: 1, successRate: 60, isPassive: true, passiveIncomeRate: 50, requiredSkill: 'intelligence', requiredSkillLevel: 40 },
      { id: 'youtube-channel', name: 'YouTube Channel', setupCost: 1000, minEarnings: 100, maxEarnings: 500, type: 'Passive', description: 'Create content', energyCost: 25, timeRequirement: 3, successRate: 50, isPassive: true, passiveIncomeRate: 75, requiredSkill: 'creativity', requiredSkillLevel: 30 }
    ];

    const hustle = availableHustles.find(h => h.id === hustleId);
    if (!hustle) {
      return { success: false, error: 'Side hustle not found' };
    }

    const character = await prisma.character.findUnique({
      where: { id: characterId }
    });

    if (!character) {
      return { success: false, error: 'Character not found' };
    }

    if (character.cash < hustle.setupCost) {
      return { success: false, error: 'Not enough cash!' };
    }

    // Create side hustle
    await prisma.sideHustle.create({
      data: {
        characterId,
        name: hustle.name,
        type: hustle.type,
        description: hustle.description,
        requiredSkill: hustle.requiredSkill,
        requiredSkillLevel: hustle.requiredSkillLevel,
        setupCost: hustle.setupCost,
        minEarnings: hustle.minEarnings,
        maxEarnings: hustle.maxEarnings,
        isPassive: hustle.isPassive,
        passiveIncomeRate: hustle.passiveIncomeRate,
        energyCost: hustle.energyCost,
        timeRequirement: hustle.timeRequirement,
        successRate: hustle.successRate
      }
    });

    // Deduct setup cost
    await prisma.character.update({
      where: { id: characterId },
      data: {
        cash: { decrement: hustle.setupCost }
      }
    });

    revalidatePath('/dashboard/career/side-hustles');

    return {
      success: true,
      message: `Started ${hustle.name}!`
    };
  } catch (error) {
    console.error('Error starting side hustle:', error);
    return { success: false, error: 'Failed to start side hustle' };
  }
}

export async function workOnSideHustle(characterId: string, hustleId: string): Promise<ApiResponse> {
  try {
    const character = await prisma.character.findUnique({
      where: { id: characterId }
    });

    const hustle = await prisma.sideHustle.findUnique({
      where: { id: hustleId }
    });

    if (!character || !hustle) {
      return { success: false, error: 'Character or hustle not found' };
    }

    if (character.energy < hustle.energyCost) {
      return { success: false, error: 'Not enough energy!' };
    }

    // Check success
    const success = Math.random() * 100 < hustle.successRate;
    const earnings = success
      ? Math.floor(Math.random() * (hustle.maxEarnings - hustle.minEarnings + 1)) + hustle.minEarnings
      : 0;

    // Update hustle
    await prisma.sideHustle.update({
      where: { id: hustleId },
      data: {
        totalEarned: { increment: earnings },
        timesWorked: { increment: 1 },
        lastWorked: new Date()
      }
    });

    // Update character
    await prisma.character.update({
      where: { id: characterId },
      data: {
        cash: { increment: earnings },
        energy: { decrement: hustle.energyCost },
        experience: { increment: 10 }
      }
    });

    revalidatePath('/dashboard/career/side-hustles');

    return {
      success: true,
      message: success
        ? `Work completed! Earned $${earnings.toLocaleString()}`
        : 'Work failed. Better luck next time!'
    };
  } catch (error) {
    console.error('Error working on side hustle:', error);
    return { success: false, error: 'Failed to work on hustle' };
  }
}


// ========================================
// BENEFITS & EXPENSES
// ========================================

export async function getJobBenefits(characterId: string): Promise<ApiResponse> {
  try {
    const benefits = await prisma.jobBenefit.findMany({
      where: {
        characterId,
        isActive: true
      },
      include: {
        job: {
          select: { title: true }
        }
      },
      orderBy: { startedAt: "desc" }
    });

    return {
      success: true,
      data: { benefits }
    };
  } catch (error) {
    console.error("Error fetching job benefits:", error);
    return { success: false, error: "Failed to fetch benefits" };
  }
}

export async function getWorkExpenses(characterId: string): Promise<ApiResponse> {
  try {
    const expenses = await prisma.workExpense.findMany({
      where: { characterId },
      orderBy: { paidAt: "desc" },
      take: 50
    });

    return {
      success: true,
      data: { expenses }
    };
  } catch (error) {
    console.error("Error fetching work expenses:", error);
    return { success: false, error: "Failed to fetch expenses" };
  }
}
