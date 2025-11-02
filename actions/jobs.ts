'use server';

/**
 * Job System Server Actions
 *
 * Complete job mechanics including:
 * - Finding and applying for jobs
 * - Starting work shifts
 * - Completing shifts with rewards
 * - Job progression and promotions
 */

import { prisma } from '@/lib/prisma/client';
import { revalidatePath } from 'next/cache';
import { calculateJobPay, gameHoursToRealMinutes } from '@/lib/utils/calculations';
import { checkAndProcessLevelUp } from './character';
import type { ApiResponse } from '@/types';

// ========================================
// FIND JOBS
// ========================================

export async function getAvailableJobs(characterId: string): Promise<ApiResponse> {
  try {
    const character = await prisma.character.findUnique({
      where: { id: characterId },
    });

    if (!character) {
      return { success: false, error: 'Character not found' };
    }

    // Get all jobs that the character qualifies for
    const allJobs = await prisma.job.findMany({
      where: {
        requiredLevel: {
          lte: character.level,
        },
      },
      orderBy: [
        { category: 'asc' },
        { requiredLevel: 'asc' },
      ],
    });

    // Filter by skill requirements
    const availableJobs = allJobs.filter((job) => {
      const requiredSkills = job.requiredSkills as Record<string, number>;

      if (!requiredSkills || Object.keys(requiredSkills).length === 0) {
        return true; // No skill requirements
      }

      // Check if character meets all skill requirements
      return Object.entries(requiredSkills).every(([skill, required]) => {
        const characterSkill = (character as any)[skill] || 0;
        return characterSkill >= required;
      });
    });

    return {
      success: true,
      data: {
        available: availableJobs,
        currentJob: character.currentJobId,
      },
    };
  } catch (error) {
    console.error('Error getting available jobs:', error);
    return {
      success: false,
      error: 'Failed to get available jobs',
    };
  }
}

// ========================================
// APPLY FOR JOB
// ========================================

export async function applyForJob(characterId: string, jobId: string): Promise<ApiResponse> {
  try {
    const character = await prisma.character.findUnique({
      where: { id: characterId },
    });

    if (!character) {
      return { success: false, error: 'Character not found' };
    }

    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return { success: false, error: 'Job not found' };
    }

    // Check level requirement
    if (character.level < job.requiredLevel) {
      return {
        success: false,
        error: `You need to be level ${job.requiredLevel} to apply for this job`,
      };
    }

    // Check skill requirements
    const requiredSkills = job.requiredSkills as Record<string, number>;
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

    // Assign job to character
    const updatedCharacter = await prisma.character.update({
      where: { id: characterId },
      data: {
        currentJobId: jobId,
      },
      include: {
        currentJob: true,
      },
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        characterId: character.id,
        action: 'JOB_HIRED',
        details: {
          jobTitle: job.title,
          jobCategory: job.category,
          hourlyRate: job.hourlyRate,
        },
      },
    });

    // Create notification
    await prisma.notification.create({
      data: {
        characterId: character.id,
        type: 'success',
        title: 'Job Application Accepted!',
        message: `Congratulations! You've been hired as a ${job.title}. Hourly rate: $${job.hourlyRate}`,
      },
    });

    revalidatePath('/');

    return {
      success: true,
      data: updatedCharacter,
      message: `Successfully hired as ${job.title}!`,
    };
  } catch (error) {
    console.error('Error applying for job:', error);
    return {
      success: false,
      error: 'Failed to apply for job',
    };
  }
}

// ========================================
// START WORK SHIFT
// ========================================

export async function startWorkShift(
  characterId: string,
  hours: number
): Promise<ApiResponse> {
  try {
    const character = await prisma.character.findUnique({
      where: { id: characterId },
      include: {
        currentJob: true,
      },
    });

    if (!character) {
      return { success: false, error: 'Character not found' };
    }

    if (!character.currentJob) {
      return { success: false, error: 'You don\'t have a job. Apply for one first!' };
    }

    const job = character.currentJob;

    // Validate shift duration
    const availableDurations = job.shiftDurations as number[];
    if (!availableDurations.includes(hours)) {
      return {
        success: false,
        error: `Invalid shift duration. Available: ${availableDurations.join(', ')} hours`,
      };
    }

    // Check energy requirements
    const energyNeeded = hours * job.energyCostPerHour;
    if (character.energy < energyNeeded) {
      return {
        success: false,
        error: `Not enough energy. Need ${energyNeeded}, have ${character.energy}`,
      };
    }

    // Check if already working (check for incomplete job history)
    const existingShift = await prisma.jobHistory.findFirst({
      where: {
        characterId: character.id,
        completedAt: null,
      },
    });

    if (existingShift) {
      return {
        success: false,
        error: 'You\'re already working a shift!',
      };
    }

    // Calculate completion time
    const startedAt = new Date();
    const realMinutes = gameHoursToRealMinutes(hours); // Convert game hours to real minutes with 10x speed
    const completedAt = new Date(startedAt.getTime() + realMinutes * 60 * 1000);

    // Create job history entry
    const jobHistory = await prisma.jobHistory.create({
      data: {
        characterId: character.id,
        jobId: job.id,
        hoursWorked: hours,
        startedAt,
        // completedAt will be null until shift completes
      },
    });

    // Deduct energy immediately
    await prisma.character.update({
      where: { id: characterId },
      data: {
        energy: character.energy - energyNeeded,
      },
    });

    revalidatePath('/');

    return {
      success: true,
      data: {
        jobHistory,
        expectedCompletion: completedAt,
        energySpent: energyNeeded,
      },
      message: `Started ${hours}-hour shift. Will complete in ${Math.ceil(realMinutes)} minutes (real-time).`,
    };
  } catch (error) {
    console.error('Error starting work shift:', error);
    return {
      success: false,
      error: 'Failed to start work shift',
    };
  }
}

// ========================================
// COMPLETE WORK SHIFT
// ========================================

export async function completeWorkShift(
  characterId: string,
  jobHistoryId: string
): Promise<ApiResponse> {
  try {
    const character = await prisma.character.findUnique({
      where: { id: characterId },
    });

    if (!character) {
      return { success: false, error: 'Character not found' };
    }

    const jobHistory = await prisma.jobHistory.findUnique({
      where: { id: jobHistoryId },
      include: {
        job: true,
      },
    });

    if (!jobHistory) {
      return { success: false, error: 'Job history not found' };
    }

    if (jobHistory.characterId !== characterId) {
      return { success: false, error: 'This shift doesn\'t belong to you' };
    }

    if (jobHistory.completedAt) {
      return { success: false, error: 'Shift already completed' };
    }

    const job = jobHistory.job;

    // Calculate if enough time has passed
    const now = new Date();
    const realMinutesRequired = gameHoursToRealMinutes(jobHistory.hoursWorked);
    const timeElapsed = (now.getTime() - jobHistory.startedAt.getTime()) / (1000 * 60); // minutes

    if (timeElapsed < realMinutesRequired) {
      const remainingMinutes = Math.ceil(realMinutesRequired - timeElapsed);
      return {
        success: false,
        error: `Shift not complete yet. ${remainingMinutes} minutes remaining.`,
      };
    }

    // Calculate rewards
    const basePay = job.hourlyRate * jobHistory.hoursWorked;
    const totalPay = calculateJobPay(job.hourlyRate, jobHistory.hoursWorked, character.management);
    const experienceGained = job.experiencePerHour * jobHistory.hoursWorked;

    // Calculate skill gains
    const skillGains = job.skillGains as Record<string, number>;
    const skillUpdates: Record<string, number> = {};

    if (skillGains && Object.keys(skillGains).length > 0) {
      Object.entries(skillGains).forEach(([skill, gain]) => {
        const currentValue = (character as any)[skill] || 0;
        skillUpdates[skill] = Math.min(100, currentValue + gain * jobHistory.hoursWorked);
      });
    }

    // Calculate stress gain
    const stressGain = job.stressCostPerHour * jobHistory.hoursWorked;
    const newStress = Math.min(100, character.stress + stressGain);

    // Update character
    const updatedCharacter = await prisma.character.update({
      where: { id: characterId },
      data: {
        cash: character.cash + totalPay,
        experience: character.experience + experienceGained,
        stress: newStress,
        ...skillUpdates,
      },
    });

    // Update job history
    await prisma.jobHistory.update({
      where: { id: jobHistoryId },
      data: {
        completedAt: now,
        totalPay,
        experienceGained,
      },
    });

    // Create transaction record
    await prisma.transaction.create({
      data: {
        characterId: character.id,
        type: 'JOB_SALARY',
        amount: totalPay,
        isDirtyMoney: false,
        source: job.title,
        description: `${jobHistory.hoursWorked}-hour shift`,
      },
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        characterId: character.id,
        action: 'SHIFT_COMPLETED',
        details: {
          jobTitle: job.title,
          hoursWorked: jobHistory.hoursWorked,
          pay: totalPay,
          experienceGained,
          skillGains: skillUpdates,
        },
      },
    });

    // Create notification
    await prisma.notification.create({
      data: {
        characterId: character.id,
        type: 'success',
        title: 'Shift Completed!',
        message: `Earned $${totalPay.toLocaleString()} and ${experienceGained} XP from ${jobHistory.hoursWorked}-hour shift as ${job.title}.`,
      },
    });

    // Check for level up
    const levelUpResult = await checkAndProcessLevelUp(characterId);

    revalidatePath('/');

    return {
      success: true,
      data: {
        character: updatedCharacter,
        rewards: {
          pay: totalPay,
          experience: experienceGained,
          skillGains: skillUpdates,
          stressGain,
        },
        levelUp: levelUpResult.success ? levelUpResult.data : null,
      },
      message: `Shift completed! Earned $${totalPay.toLocaleString()} and ${experienceGained} XP.`,
    };
  } catch (error) {
    console.error('Error completing work shift:', error);
    return {
      success: false,
      error: 'Failed to complete work shift',
    };
  }
}

// ========================================
// QUIT JOB
// ========================================

export async function quitJob(characterId: string): Promise<ApiResponse> {
  try {
    const character = await prisma.character.findUnique({
      where: { id: characterId },
      include: {
        currentJob: true,
      },
    });

    if (!character) {
      return { success: false, error: 'Character not found' };
    }

    if (!character.currentJob) {
      return { success: false, error: 'You don\'t have a job' };
    }

    const jobTitle = character.currentJob.title;

    // Check for incomplete shifts
    const incompleteShift = await prisma.jobHistory.findFirst({
      where: {
        characterId: character.id,
        completedAt: null,
      },
    });

    if (incompleteShift) {
      return {
        success: false,
        error: 'Complete or cancel your current shift before quitting',
      };
    }

    // Remove job
    await prisma.character.update({
      where: { id: characterId },
      data: {
        currentJobId: null,
      },
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        characterId: character.id,
        action: 'JOB_QUIT',
        details: {
          jobTitle,
        },
      },
    });

    revalidatePath('/');

    return {
      success: true,
      message: `You quit your job as ${jobTitle}`,
    };
  } catch (error) {
    console.error('Error quitting job:', error);
    return {
      success: false,
      error: 'Failed to quit job',
    };
  }
}

// ========================================
// GET JOB HISTORY
// ========================================

export async function getJobHistory(
  characterId: string,
  limit: number = 10
): Promise<ApiResponse> {
  try {
    const history = await prisma.jobHistory.findMany({
      where: {
        characterId,
        completedAt: {
          not: null,
        },
      },
      include: {
        job: true,
      },
      orderBy: {
        completedAt: 'desc',
      },
      take: limit,
    });

    // Calculate totals
    const totals = {
      totalHours: history.reduce((sum, h) => sum + h.hoursWorked, 0),
      totalPay: history.reduce((sum, h) => sum + h.totalPay, 0),
      totalXP: history.reduce((sum, h) => sum + h.experienceGained, 0),
    };

    return {
      success: true,
      data: {
        history,
        totals,
      },
    };
  } catch (error) {
    console.error('Error getting job history:', error);
    return {
      success: false,
      error: 'Failed to get job history',
    };
  }
}

// ========================================
// GET CURRENT SHIFT STATUS
// ========================================

export async function getCurrentShiftStatus(characterId: string): Promise<ApiResponse> {
  try {
    const currentShift = await prisma.jobHistory.findFirst({
      where: {
        characterId,
        completedAt: null,
      },
      include: {
        job: true,
      },
    });

    if (!currentShift) {
      return {
        success: true,
        data: { isWorking: false },
      };
    }

    const now = new Date();
    const realMinutesRequired = gameHoursToRealMinutes(currentShift.hoursWorked);
    const completionTime = new Date(
      currentShift.startedAt.getTime() + realMinutesRequired * 60 * 1000
    );
    const timeRemaining = Math.max(0, completionTime.getTime() - now.getTime());
    const isComplete = timeRemaining === 0;

    return {
      success: true,
      data: {
        isWorking: true,
        shift: currentShift,
        expectedPay: currentShift.job.hourlyRate * currentShift.hoursWorked,
        expectedXP: currentShift.job.experiencePerHour * currentShift.hoursWorked,
        completionTime,
        timeRemaining,
        isComplete,
      },
    };
  } catch (error) {
    console.error('Error getting shift status:', error);
    return {
      success: false,
      error: 'Failed to get shift status',
    };
  }
}
