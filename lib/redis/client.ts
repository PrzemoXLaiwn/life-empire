/**
 * Redis Client for Caching
 *
 * Used for:
 * - Session caching
 * - Game state caching
 * - Leaderboard caching
 * - Rate limiting
 */

import { Redis } from '@upstash/redis';

// NOTE: You need to add these environment variables to your .env file:
// UPSTASH_REDIS_REST_URL=your_upstash_url
// UPSTASH_REDIS_REST_TOKEN=your_upstash_token

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

/**
 * Cache keys namespace convention:
 * - user:{userId} - User data
 * - character:{characterId} - Character data
 * - leaderboard:{type} - Leaderboard data
 * - session:{sessionId} - Session data
 * - ratelimit:{ip}:{action} - Rate limiting
 */

export default redis;

// Helper functions for common caching patterns

export async function cacheCharacter(characterId: string, data: any, ttl: number = 300) {
  await redis.set(`character:${characterId}`, JSON.stringify(data), { ex: ttl });
}

export async function getCachedCharacter(characterId: string) {
  const data = await redis.get(`character:${characterId}`);
  return data ? JSON.parse(data as string) : null;
}

export async function invalidateCharacter(characterId: string) {
  await redis.del(`character:${characterId}`);
}

export async function cacheLeaderboard(type: string, data: any[], ttl: number = 60) {
  await redis.set(`leaderboard:${type}`, JSON.stringify(data), { ex: ttl });
}

export async function getCachedLeaderboard(type: string) {
  const data = await redis.get(`leaderboard:${type}`);
  return data ? JSON.parse(data as string) : null;
}

export async function checkRateLimit(
  identifier: string,
  limit: number = 10,
  window: number = 60
): Promise<{ allowed: boolean; remaining: number }> {
  const key = `ratelimit:${identifier}`;
  const current = await redis.incr(key);

  if (current === 1) {
    await redis.expire(key, window);
  }

  return {
    allowed: current <= limit,
    remaining: Math.max(0, limit - current),
  };
}
