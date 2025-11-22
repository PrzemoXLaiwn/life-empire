'use server';

/**
 * BitLife-Style Job System
 *
 * Features:
 * - Browse and apply for jobs
 * - Simple "Work" button (no shifts)
 * - Annual salary system
 * - Performance tracking
 * - Promotion mechanics
 * - Work ethic affecting results
 */

import { prisma } from '@/lib/prisma/client';
import { revalidatePath } from 'next/cache';
import type { ApiResponse } from '@/types';

// ========================================
// GET AVAILABLE JOBS
// ========================================

export async function getAvailableJobs(characterId: string): Promise<ApiResponse> {
  try {
    const character = await prisma.character.findUnique({
      where: { id: characterId },
      include: { currentJob: true },
    });

    if (!character) {
      return { success: false, error: 'Character not found' };
    }

    // Get all jobs matching character's qualifications
    const allJobs = await prisma.job.findMany({
      where: {
        requiredLevel: { lte: character.level },
      },
      orderBy: [
        { category: 'asc' },
        { annualSalary: 'desc' },
      ],
    });

    // Filter by education and skill requirements
    const availableJobs = allJobs.filter((job) => {
      // Check education level (only if job requires education beyond NONE)
      if (job.requiredEducation && job.requiredEducation !== 'NONE') {
        const educationLevels = ['NONE', 'ELEMENTARY', 'HIGH_SCHOOL', 'UNIVERSITY', 'GRADUATE', 'TRADE_SCHOOL'];
        const charEduIndex = educationLevels.indexOf(character.educationLevel || 'NONE');
        const reqEduIndex = educationLevels.indexOf(job.requiredEducation);

        if (charEduIndex < reqEduIndex) return false;
      }

      // Check specific major requirement
      if (job.requiredMajor && character.major !== job.requiredMajor) {
        return false;
      }

      // Check skill requirements
      const requiredSkills = job.requiredSkills as Record<string, number> || {};
      for (const [skill, required] of Object.entries(requiredSkills)) {
        const characterSkill = (character as any)[skill] || 0;
        if (characterSkill < required) return false;
      }

      return true;
    });

    return {
      success: true,
      data: {
        available: availableJobs,
        currentJob: character.currentJob,
      },
    };
  } catch (error) {
    console.error('❌ Error getting available jobs:', error);
    return { success: false, error: 'Failed to load jobs' };
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

    // Quit current job if any
    if (character.currentJobId) {
      await prisma.jobHistory.create({
        data: {
          characterId: character.id,
          jobId: character.currentJobId,
          startedAt: character.lastPaycheck || new Date(),
          completedAt: new Date(),
          reasonLeft: 'Quit',
          yearsWorked: character.yearsInJob,
          avgPerformance: character.performanceRating,
        },
      });
    }

    // Hire character
    await prisma.character.update({
      where: { id: characterId },
      data: {
        currentJobId: job.id,
        annualSalary: job.annualSalary,
        yearsInJob: 0,
        performanceRating: 75,
        workEthic: 'STANDARD',
        lastPromotion: null,
        lastSalaryReview: null,
        lastPaycheck: null,
      },
    });

    revalidatePath('/dashboard/jobs');

    return {
      success: true,
      message: `You got the job! Welcome to ${job.title}. Salary: $${job.annualSalary.toLocaleString()}/year`,
    };
  } catch (error) {
    console.error('❌ Error applying for job:', error);
    return { success: false, error: 'Failed to apply for job' };
  }
}

// ========================================
// WORK (Daily Action)
// ========================================

export async function doWork(characterId: string): Promise<ApiResponse> {
  try {
    const character = await prisma.character.findUnique({
      where: { id: characterId },
      include: { currentJob: true },
    });

    if (!character) {
      return { success: false, error: 'Character not found' };
    }

    if (!character.currentJob) {
      return { success: false, error: 'You don\'t have a job!' };
    }

    const job = character.currentJob;

    // Check energy requirement
    const energyNeeded = job.energyPerWork;
    if (character.energy < energyNeeded) {
      return {
        success: false,
        error: `Not enough energy! Need ${energyNeeded}, have ${character.energy}`,
      };
    }

    // Calculate work results based on work ethic
    let performanceChange = 0;
    let bonusMultiplier = 1.0;

    switch (character.workEthic) {
      case 'LAZY':
        performanceChange = Math.random() < 0.3 ? -2 : -1;
        bonusMultiplier = 0.8;
        break;
      case 'STANDARD':
        performanceChange = Math.random() < 0.5 ? 1 : 0;
        bonusMultiplier = 1.0;
        break;
      case 'HARD_WORKER':
        performanceChange = Math.random() < 0.7 ? 2 : 1;
        bonusMultiplier = 1.2;
        break;
      case 'WORKAHOLIC':
        performanceChange = Math.random() < 0.8 ? 3 : 2;
        bonusMultiplier = 1.5;
        break;
    }

    // Update performance rating (0-100 range)
    const newPerformance = Math.max(0, Math.min(100, character.performanceRating + performanceChange));

    // Daily pay (annual salary / 365 days)
    const dailyPay = Math.floor((job.annualSalary / 365) * bonusMultiplier);

    // Experience gain
    const xpGain = job.experiencePerWork;

    // Years in job increment (1 day = ~0.0027 years)
    const yearsIncrement = 0.0027;

    // Work hours (8 hour workday)
    const hoursWorked = 8;

    // Check probation status
    let probationUpdate: any = {};
    let probationMessage = '';
    
    if (character.onProbation && character.probationDaysLeft > 0) {
      const newProbationDays = character.probationDaysLeft - 1;
      probationUpdate.probationDaysLeft = newProbationDays;
      
      // Check if performance meets requirement
      if (newPerformance < character.probationPerformanceRequired) {
        // FAILED PROBATION - Fire character
        await prisma.character.update({
          where: { id: characterId },
          data: {
            currentJobId: null,
            annualSalary: 0,
            yearsInJob: 0,
            performanceRating: 75,
            onProbation: false,
            probationDaysLeft: 0,
            badReferenceUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
          },
        });
        
        // Add to job history
        await prisma.jobHistory.create({
          data: {
            characterId: character.id,
            jobId: character.currentJobId!,
            startedAt: character.lastPaycheck || new Date(),
            completedAt: new Date(),
            reasonLeft: 'Fired - Failed Probation',
            yearsWorked: character.yearsInJob,
            avgPerformance: character.performanceRating,
          },
        });
        
        return {
          success: false,
          error: `🔥 FIRED! Performance too low during probation (${newPerformance}% < ${character.probationPerformanceRequired}%). Bad reference added for 30 days.`,
        };
      }
      
      // Check if probation completed
      if (newProbationDays === 0) {
        probationUpdate.onProbation = false;
        probationUpdate.liedOnResume = false;
        probationMessage = '\n\n🎉 PROBATION PASSED! You are now a permanent employee!';
      } else {
        probationMessage = `\n\n⚠️ Probation: ${newProbationDays} days left (${newPerformance}% / ${character.probationPerformanceRequired}%)`;
      }
    }

    // Update character
    const updatedCharacter = await prisma.character.update({
      where: { id: characterId },
      data: {
        cash: { increment: dailyPay },
        energy: { decrement: energyNeeded },
        experience: { increment: xpGain },
        performanceRating: newPerformance,
        yearsInJob: { increment: yearsIncrement },
        lastPaycheck: new Date(),
        totalWorkHours: { increment: hoursWorked },
        ...probationUpdate,
      },
    });

    // Check for level up
    if (updatedCharacter.experience >= updatedCharacter.xpNeeded) {
      await checkAndProcessLevelUp(characterId);
    }

    // Check for quarterly performance review (every 3 months = ~90 work days)
    const reviewDue = await checkPerformanceReview(characterId, character.currentJobId!, character, job);

    // Random Work Events (30% chance)
    let eventMessage = '';
    let bonusCash = 0;
    let bonusXP = 0;
    let skillGain: { skill: string; amount: number } | null = null;

    if (Math.random() < 0.3) {
      const event = generateWorkEvent(character, job);
      eventMessage = event.message;
      bonusCash = event.bonusCash || 0;
      bonusXP = event.bonusXP || 0;
      skillGain = event.skillGain || null;

      // Apply event bonuses
      const eventUpdates: any = {};
      if (bonusCash > 0) eventUpdates.cash = { increment: bonusCash };
      if (bonusXP > 0) eventUpdates.experience = { increment: bonusXP };
      if (skillGain) eventUpdates[skillGain.skill] = { increment: skillGain.amount };

      if (Object.keys(eventUpdates).length > 0) {
        await prisma.character.update({
          where: { id: characterId },
          data: eventUpdates,
        });
      }
    }

    revalidatePath('/dashboard/jobs');
    revalidatePath('/dashboard');

    let message = `Work completed! +$${dailyPay.toLocaleString()} | +${xpGain} XP`;

    if (performanceChange > 0) {
      message += ` | Performance ↑ ${newPerformance}%`;
    } else if (performanceChange < 0) {
      message += ` | Performance ↓ ${newPerformance}%`;
    }

    // Add event message if any
    if (eventMessage) {
      message += `\n\n🎲 ${eventMessage}`;
      if (bonusCash > 0) message += ` (+$${bonusCash})`;
      if (bonusXP > 0) message += ` (+${bonusXP} XP)`;
      if (skillGain) message += ` (+${skillGain.amount} ${skillGain.skill})`;
    }

    // Add performance review message if one occurred
    if (reviewDue && reviewDue.message) {
      message += `\n\n📊 ${reviewDue.message}`;
    }
    
    // Add probation message
    if (probationMessage) {
      message += probationMessage;
    }

    return {
      success: true,
      message,
      data: {
        dailyPay,
        xpGain,
        performanceRating: newPerformance,
        performanceChange,
        event: eventMessage || null,
        performanceReview: reviewDue || null,
      },
    };
  } catch (error) {
    console.error('❌ Error working:', error);
    return { success: false, error: 'Failed to complete work' };
  }
}

// ========================================
// QUIT JOB
// ========================================

export async function quitJob(characterId: string): Promise<ApiResponse> {
  try {
    const character = await prisma.character.findUnique({
      where: { id: characterId },
      include: { currentJob: true },
    });

    if (!character) {
      return { success: false, error: 'Character not found' };
    }

    if (!character.currentJobId) {
      return { success: false, error: 'You don\'t have a job!' };
    }

    // Add to job history
    await prisma.jobHistory.create({
      data: {
        characterId: character.id,
        jobId: character.currentJobId,
        startedAt: character.lastPaycheck || new Date(),
        completedAt: new Date(),
        reasonLeft: 'Quit',
        yearsWorked: character.yearsInJob,
        avgPerformance: character.performanceRating,
      },
    });

    // Clear job
    await prisma.character.update({
      where: { id: characterId },
      data: {
        currentJobId: null,
        annualSalary: 0,
        yearsInJob: 0,
        performanceRating: 75,
        lastPromotion: null,
        lastSalaryReview: null,
      },
    });

    revalidatePath('/dashboard/jobs');

    return {
      success: true,
      message: `You quit ${character.currentJob?.title}`,
    };
  } catch (error) {
    console.error('❌ Error quitting job:', error);
    return { success: false, error: 'Failed to quit job' };
  }
}

// ========================================
// CHANGE WORK ETHIC
// ========================================

export async function changeWorkEthic(
  characterId: string,
  newEthic: 'LAZY' | 'STANDARD' | 'HARD_WORKER' | 'WORKAHOLIC'
): Promise<ApiResponse> {
  try {
    await prisma.character.update({
      where: { id: characterId },
      data: { workEthic: newEthic },
    });

    revalidatePath('/dashboard/jobs');

    return {
      success: true,
      message: `Work ethic changed to ${newEthic}`,
    };
  } catch (error) {
    console.error('❌ Error changing work ethic:', error);
    return { success: false, error: 'Failed to change work ethic' };
  }
}

// ========================================
// REQUEST PROMOTION
// ========================================

export async function requestPromotion(characterId: string): Promise<ApiResponse> {
  try {
    const character = await prisma.character.findUnique({
      where: { id: characterId },
      include: { currentJob: true },
    });

    if (!character || !character.currentJob) {
      return { success: false, error: 'No current job' };
    }

    const job = character.currentJob;

    // Check if eligible for promotion
    if (character.yearsInJob < job.yearsForPromotion) {
      return {
        success: false,
        error: `You need ${job.yearsForPromotion} years in this job. You have ${character.yearsInJob.toFixed(1)} years.`,
      };
    }

    if (character.performanceRating < job.minPerformance) {
      return {
        success: false,
        error: `Performance too low! Need ${job.minPerformance}%, have ${character.performanceRating}%`,
      };
    }

    // Check if there's a promotion job
    if (!job.nextJobId) {
      return {
        success: false,
        error: 'No promotion available for this position',
      };
    }

    const promotionJob = await prisma.job.findUnique({
      where: { id: job.nextJobId },
    });

    if (!promotionJob) {
      return { success: false, error: 'Promotion job not found' };
    }

    // Grant promotion
    await prisma.character.update({
      where: { id: characterId },
      data: {
        currentJobId: promotionJob.id,
        annualSalary: promotionJob.annualSalary,
        yearsInJob: 0,
        lastPromotion: new Date(),
        performanceRating: 75, // Reset to baseline
      },
    });

    // Add to job history
    await prisma.jobHistory.create({
      data: {
        characterId: character.id,
        jobId: job.id,
        startedAt: character.lastPaycheck || new Date(),
        completedAt: new Date(),
        reasonLeft: 'Promoted',
        yearsWorked: character.yearsInJob,
        avgPerformance: character.performanceRating,
        promotionsEarned: 1,
      },
    });

    revalidatePath('/dashboard/jobs');

    return {
      success: true,
      message: `Promoted to ${promotionJob.title}! New salary: $${promotionJob.annualSalary.toLocaleString()}/year`,
    };
  } catch (error) {
    console.error('❌ Error requesting promotion:', error);
    return { success: false, error: 'Failed to request promotion' };
  }
}

// ========================================
// WORK EVENTS GENERATOR
// ========================================

function generateWorkEvent(character: any, job: any) {
  const events = [
    // Positive Events
    {
      message: "Boss praised your work! Your performance impressed management.",
      bonusCash: Math.floor(job.annualSalary / 365 * 0.5),
      bonusXP: 20,
      skillGain: { skill: 'leadership', amount: 2 },
      weight: 20,
    },
    {
      message: "Completed a special project successfully!",
      bonusCash: Math.floor(job.annualSalary / 365 * 0.3),
      bonusXP: 15,
      skillGain: { skill: 'creativity', amount: 3 },
      weight: 15,
    },
    {
      message: "Helped a colleague solve a problem. Good teamwork!",
      bonusXP: 10,
      skillGain: { skill: 'communication', amount: 2 },
      weight: 25,
    },
    {
      message: "Finished all tasks early. Excellent time management!",
      bonusXP: 12,
      skillGain: { skill: 'timeManagement', amount: 3 },
      weight: 20,
    },
    {
      message: "Got a surprise bonus from management!",
      bonusCash: Math.floor(job.annualSalary / 365),
      bonusXP: 5,
      weight: 10,
    },
    // Neutral/Learning Events
    {
      message: "Attended a training session. Learned new skills!",
      bonusXP: 25,
      skillGain: { skill: 'intelligence', amount: 2 },
      weight: 15,
    },
    {
      message: "Mentored a new employee. Teaching is learning twice!",
      bonusXP: 15,
      skillGain: { skill: 'leadership', amount: 3 },
      weight: 12,
    },
    {
      message: "Handled a difficult client with professionalism.",
      bonusXP: 18,
      skillGain: { skill: 'negotiation', amount: 2 },
      weight: 10,
    },
    // Minor Setbacks (no penalties, just flavor)
    {
      message: "Coffee machine broke. Day dragged on...",
      bonusXP: 5,
      weight: 8,
    },
    {
      message: "Long boring meeting. At least you practiced patience.",
      bonusXP: 3,
      skillGain: { skill: 'charisma', amount: 1 },
      weight: 12,
    },
  ];

  // Weighted random selection
  const totalWeight = events.reduce((sum, e) => sum + e.weight, 0);
  let random = Math.random() * totalWeight;

  for (const event of events) {
    random -= event.weight;
    if (random <= 0) {
      return event;
    }
  }

  return events[0]; // Fallback
}

// ========================================
// GET CAREER LADDER
// ========================================

export async function getCareerLadder(jobId: string): Promise<ApiResponse> {
  try {
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return { success: false, error: 'Job not found' };
    }

    // Build career ladder by following nextJobId chain
    const ladder: any[] = [];
    let currentJob = job;

    // Go backwards to find start of ladder
    const allJobs = await prisma.job.findMany();
    while (true) {
      const previousJob = allJobs.find(j => j.nextJobId === currentJob.id);
      if (!previousJob) break;
      currentJob = previousJob;
    }

    // Now go forward to build complete ladder
    ladder.push(currentJob);
    while (currentJob.nextJobId) {
      const nextJob = allJobs.find(j => j.id === currentJob.nextJobId);
      if (!nextJob) break;
      ladder.push(nextJob);
      currentJob = nextJob;
    }

    return {
      success: true,
      data: { ladder },
    };
  } catch (error) {
    console.error('❌ Error getting career ladder:', error);
    return { success: false, error: 'Failed to get career ladder' };
  }
}

// Helper function for level up check
async function checkAndProcessLevelUp(characterId: string) {
  const character = await prisma.character.findUnique({
    where: { id: characterId },
  });

  if (!character) return;

  if (character.experience >= character.xpNeeded) {
    const newLevel = character.level + 1;
    const newXpNeeded = Math.floor(character.xpNeeded * 1.5);

    await prisma.character.update({
      where: { id: characterId },
      data: {
        level: newLevel,
        xpNeeded: newXpNeeded,
        experience: character.experience - character.xpNeeded,
      },
    });
  }
}

// ========================================
// PERFORMANCE REVIEW SYSTEM
// ========================================

async function checkPerformanceReview(characterId: string, jobId: string, character: any, job: any) {
  try {
    // Check if 3 months (90 days) have passed since last review or job start
    const lastReview = await prisma.performanceReview.findFirst({
      where: { characterId, jobId },
      orderBy: { reviewDate: 'desc' },
    });

    const daysSinceReview = lastReview
      ? Math.floor((Date.now() - lastReview.reviewDate.getTime()) / (1000 * 60 * 60 * 24))
      : Math.floor(character.yearsInJob * 365);

    // Quarterly review (every 90 days)
    if (daysSinceReview < 90) {
      return null;
    }

    // Generate performance review
    const now = new Date();
    const quarter = Math.floor((now.getMonth() / 3) + 1);
    const year = now.getFullYear();

    // Calculate ratings based on performance and skills
    const basePerformance = character.performanceRating;
    const productivity = Math.min(100, Math.max(0, basePerformance + (character.intelligence - 50) / 5));
    const quality = Math.min(100, Math.max(0, basePerformance + (character.timeManagement - 50) / 5));
    const teamwork = Math.min(100, Math.max(0, basePerformance + (character.communication - 50) / 5));
    const punctuality = Math.min(100, Math.max(0, basePerformance + (character.workEthic === 'WORKAHOLIC' ? 10 : character.workEthic === 'HARD_WORKER' ? 5 : 0)));

    const overall = Math.floor((productivity + quality + teamwork + punctuality) / 4);

    // Determine outcomes based on overall rating
    let salaryIncrease = 0;
    let bonusAwarded = 0;
    let promoted = false;
    let warning = false;
    let managerNotes = '';

    if (overall >= 90) {
      // Excellent performance
      salaryIncrease = Math.floor(job.annualSalary * 0.08); // 8% raise
      bonusAwarded = Math.floor(job.annualSalary * 0.15); // 15% bonus
      managerNotes = 'Outstanding work! You consistently exceed expectations and are a valuable asset to the team.';
    } else if (overall >= 75) {
      // Good performance
      salaryIncrease = Math.floor(job.annualSalary * 0.05); // 5% raise
      bonusAwarded = Math.floor(job.annualSalary * 0.08); // 8% bonus
      managerNotes = 'Great performance! Keep up the good work.';
    } else if (overall >= 60) {
      // Meets expectations
      salaryIncrease = Math.floor(job.annualSalary * 0.03); // 3% raise
      bonusAwarded = Math.floor(job.annualSalary * 0.03); // 3% bonus
      managerNotes = 'You meet expectations. There\'s room for improvement in some areas.';
    } else if (overall >= 40) {
      // Below expectations - warning
      warning = true;
      managerNotes = 'Performance is below expectations. We need to see improvement in the next quarter.';
    } else {
      // Poor performance - serious warning
      warning = true;
      managerNotes = 'Performance is unsatisfactory. Immediate improvement is required or termination may be considered.';
    }

    // Create performance review record
    await prisma.performanceReview.create({
      data: {
        characterId,
        jobId,
        quarter,
        year,
        productivityRating: Math.floor(productivity),
        qualityRating: Math.floor(quality),
        teamworkRating: Math.floor(teamwork),
        punctualityRating: Math.floor(punctuality),
        overallRating: overall,
        managerNotes,
        salaryIncrease,
        bonusAwarded,
        promoted,
        warning,
      },
    });

    // Apply salary increase and bonus
    if (salaryIncrease > 0 || bonusAwarded > 0) {
      const updates: any = {};
      if (salaryIncrease > 0) updates.annualSalary = { increment: salaryIncrease };
      if (bonusAwarded > 0) updates.cash = { increment: bonusAwarded };

      await prisma.character.update({
        where: { id: characterId },
        data: updates,
      });
    }

    // Generate coworker relationships on first review
    if (!lastReview) {
      await generateWorkRelationships(characterId, job.title);
    }

    let message = `PERFORMANCE REVIEW - Q${quarter} ${year}\n`;
    message += `Overall Rating: ${overall}%\n`;
    if (salaryIncrease > 0) message += `Salary Increase: +$${salaryIncrease.toLocaleString()}/year\n`;
    if (bonusAwarded > 0) message += `Bonus: +$${bonusAwarded.toLocaleString()}\n`;
    if (warning) message += `⚠️ Performance Warning!\n`;
    message += `Manager: "${managerNotes}"`;

    return {
      message,
      overall,
      salaryIncrease,
      bonusAwarded,
      warning,
    };
  } catch (error) {
    console.error('Error checking performance review:', error);
    return null;
  }
}

// ========================================
// WORK RELATIONSHIPS SYSTEM
// ========================================

async function generateWorkRelationships(characterId: string, jobTitle: string) {
  try {
    // Generate 3-5 random coworkers
    const numCoworkers = Math.floor(Math.random() * 3) + 3; // 3-5 people

    const firstNames = ['John', 'Sarah', 'Mike', 'Emily', 'David', 'Lisa', 'Tom', 'Jessica', 'Chris', 'Amanda', 'Kevin', 'Rachel', 'Brian', 'Nicole', 'Steve', 'Jennifer'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Anderson', 'Taylor', 'Thomas', 'Moore', 'Jackson', 'White'];

    const roles = ['Coworker', 'Coworker', 'Coworker', 'Manager', 'Senior Colleague'];
    const departments = ['Sales', 'IT', 'HR', 'Marketing', 'Operations', 'Finance'];

    for (let i = 0; i < numCoworkers; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const name = `${firstName} ${lastName}`;
      const role = roles[Math.min(i, roles.length - 1)];

      // Determine relationship attributes
      const influence = Math.floor(Math.random() * 50) + (role === 'Manager' ? 50 : role === 'Senior Colleague' ? 30 : 20);
      const helpfulness = Math.floor(Math.random() * 60) + 40;
      const competitiveness = Math.floor(Math.random() * 70) + 20;

      // Starting relationship is neutral to slightly positive
      const relationshipScore = Math.floor(Math.random() * 30) - 10; // -10 to +20

      await prisma.workRelationship.create({
        data: {
          characterId,
          name,
          role,
          department: departments[Math.floor(Math.random() * departments.length)],
          relationshipScore,
          influence,
          helpfulness,
          competitiveness,
          canMentor: role === 'Manager' || role === 'Senior Colleague',
          canRecommend: role === 'Manager',
          canNetwork: influence > 60,
        },
      });
    }

    console.log(`Generated ${numCoworkers} work relationships for character ${characterId}`);
  } catch (error) {
    console.error('Error generating work relationships:', error);
  }
}
