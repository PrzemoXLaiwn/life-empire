'use server'

/**
 * Events Server Actions
 * Handles game events feed and event creation
 */

import { prisma } from '@/lib/prisma/client'

/**
 * Get game events with optional filtering
 */
export async function getGameEvents(filter?: string, limit: number = 50, offset: number = 0) {
  try {
    const where = filter && filter !== 'all'
      ? { type: filter }
      : {}

    const events = await prisma.gameEvent.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    })

    const total = await prisma.gameEvent.count({ where })

    return {
      events,
      total,
      hasMore: total > offset + limit,
    }
  } catch (error) {
    console.error('Error fetching game events:', error)
    return { error: 'Failed to fetch events' }
  }
}

/**
 * Create a game event
 */
export async function createGameEvent(
  type: string,
  message: string,
  userId?: string,
  username?: string,
  avatar?: string
) {
  try {
    const event = await prisma.gameEvent.create({
      data: {
        type,
        message,
        userId,
        username,
        avatar,
      }
    })

    return { event, success: true }
  } catch (error) {
    console.error('Error creating game event:', error)
    return { error: 'Failed to create event' }
  }
}

/**
 * Create a crime event
 */
export async function createCrimeEvent(
  username: string,
  crimeName: string,
  success: boolean,
  reward?: number,
  avatar?: string
) {
  const message = success
    ? `${username} successfully committed ${crimeName}${reward ? ` for $${reward.toLocaleString()}!` : '!'}`
    : `${username} was arrested for ${crimeName}`

  return createGameEvent('CRIME', message, undefined, username, avatar)
}

/**
 * Create a job event
 */
export async function createJobEvent(
  username: string,
  jobTitle: string,
  hours: number,
  avatar?: string
) {
  const message = `${username} completed a ${hours}-hour shift as ${jobTitle}`
  return createGameEvent('JOB', message, undefined, username, avatar)
}

/**
 * Create a level up event
 */
export async function createLevelUpEvent(
  username: string,
  level: number,
  avatar?: string
) {
  const message = `${username} reached level ${level}!`
  return createGameEvent('LEVEL_UP', message, undefined, username, avatar)
}

/**
 * Create a gang event
 */
export async function createGangEvent(
  message: string,
  username?: string,
  avatar?: string
) {
  return createGameEvent('GANG', message, undefined, username, avatar)
}

/**
 * Create a business event
 */
export async function createBusinessEvent(
  message: string,
  username?: string,
  avatar?: string
) {
  return createGameEvent('BUSINESS', message, undefined, username, avatar)
}

/**
 * Create a system event
 */
export async function createSystemEvent(message: string) {
  return createGameEvent('SYSTEM', message)
}

/**
 * Get events for a specific user
 */
export async function getUserEvents(userId: string, limit: number = 50) {
  try {
    const events = await prisma.gameEvent.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    })

    return { events }
  } catch (error) {
    console.error('Error fetching user events:', error)
    return { error: 'Failed to fetch user events' }
  }
}

/**
 * Get events involving user's gang
 */
export async function getGangEvents(gangId: string, limit: number = 50) {
  try {
    // Get gang members
    const gang = await prisma.gang.findUnique({
      where: { id: gangId },
      include: {
        members: {
          select: { id: true }
        }
      }
    })

    if (!gang) {
      return { error: 'Gang not found' }
    }

    const memberIds = gang.members.map(m => m.id)

    // Get events from gang members or about the gang
    const events = await prisma.gameEvent.findMany({
      where: {
        OR: [
          { type: 'GANG' },
          { userId: { in: memberIds } }
        ]
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    })

    return { events }
  } catch (error) {
    console.error('Error fetching gang events:', error)
    return { error: 'Failed to fetch gang events' }
  }
}

/**
 * Get city events
 */
export async function getCityEvents(cityId: string, limit: number = 50) {
  try {
    // Get characters in this city
    const characters = await prisma.character.findMany({
      where: { cityId },
      select: { id: true }
    })

    const characterIds = characters.map(c => c.id)

    // Get events from characters in this city
    const events = await prisma.gameEvent.findMany({
      where: {
        userId: { in: characterIds }
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    })

    return { events }
  } catch (error) {
    console.error('Error fetching city events:', error)
    return { error: 'Failed to fetch city events' }
  }
}
